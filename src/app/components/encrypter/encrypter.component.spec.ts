import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncrypterComponent } from './encrypter.component';

describe('EncrypterComponent', () => {
  let component: EncrypterComponent;
  let fixture: ComponentFixture<EncrypterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncrypterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EncrypterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
