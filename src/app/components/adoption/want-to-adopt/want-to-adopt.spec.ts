import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { PetService } from '../../../services/pet';
import { WantToAdopt } from './want-to-adopt';

describe('WantToAdopt', () => {
  let component: WantToAdopt;
  let fixture: ComponentFixture<WantToAdopt>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WantToAdopt],
      providers: [
        {
          provide: PetService,
          useValue: { getAdoptionPets: () => of([]) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WantToAdopt);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
