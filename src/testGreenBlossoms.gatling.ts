import {
  simulation,
  scenario,
  exec,
  pause,
  rampUsers,
  atOnceUsers,
  constantUsersPerSec
} from "@gatling.io/core";
import { http, status } from "@gatling.io/http";

export default simulation((setUp) => {
  const routes = [
    "/welcome",
    "/registro",
    "/login",
    "/home",
    "/home-usuario",
    "/arduino",
    "/planta-usuario",
    "/agregar-planta-usuario",
    "/editar-planta-usuario/15",
    "/reportes",
    "/perfil-usuario",
    "/admin",
    "/admin/productos",
    "/admin/productos/editar-planta/11",
    "/admin/productos/agregar-planta",
    "/admin/productos/categoria",
    "/admin/productos/categoria/agregar-categoria",
    "/admin/usuarios",
    "/admin/usuarios/modificar-usuario/21",
    "/admin/usuarios/agregar-usuario",
    "/admin/usuarios/roles",
    "/admin/usuarios/roles/agregar-rol",
    "/admin/usuarios/roles/editar-rol/62"
  ];

  const scenarios = routes.map((route) => {
    return scenario(`Scenario for ${route}`)
      .exec(
        http(`Request to ${route}`)
          .get(route)
          .check(status().is(200))
      )
      .pause(1);
  });

  const httpProtocol = http
    .baseUrl("http://localhost:8100") // Cambia esto a la URL base de tu aplicación si es diferente
    .acceptHeader("text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8")
    .acceptLanguageHeader("en-US,en;q=0.5")
    .acceptEncodingHeader("gzip, deflate")
    .userAgentHeader("Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/119.0");

  const populationBuilders = scenarios.map((scn) =>
    scn.injectOpen(
      rampUsers(1000).during(5), //Inyecta x usuarios durante un periodo de 5 seg
      atOnceUsers(100), //Inyecta x usuarios al mismo tiempo, osea de una, sirve para simular picos de carga repentinos
      constantUsersPerSec(10).during(60) // Inyecta 10 usuarios por 60 segundos, sirve para ver la resistencia de la app
    )
  );

  setUp(...populationBuilders).protocols(httpProtocol);
});