import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RiegoPlantaPage } from './riego-planta.page';

describe('RiegoPlantaPage', () => {
  let component: RiegoPlantaPage;
  let fixture: ComponentFixture<RiegoPlantaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RiegoPlantaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
