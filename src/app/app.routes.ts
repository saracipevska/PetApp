
// export const routes: Routes = [

import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { LostAndFound } from './components/lost-and-found/lost-and-found';
import { Lost } from './components/lost-and-found/lost/lost';
import { Found } from './components/lost-and-found/found/found';
import { Sales } from './components/sales/sales';
import { Food } from './components/sales/food/food';
import { Clothing } from './components/sales/clothing/clothing';
import { Supplements } from './components/sales/supplements/supplements';
// import { Other } from './components/sales/other/other';
import { Accessories } from './components/sales/accessories/accessories';
import { Veterinarian } from './components/veterinarian/veterinarian';
import { Adoption } from './components/adoption/adoption';
import { WantToAdopt } from './components/adoption/want-to-adopt/want-to-adopt';
import { HaveForAdoption } from './components/adoption/have-for-adoption/have-for-adoption';
import { All } from './components/lost-and-found/all/all';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'lost-and-found', component: LostAndFound },
  { path: 'lost-and-found/lost', component: Lost },
  { path: 'lost-and-found/found', component: Found },
  { path: 'sales', component: Sales },
  { path: 'sales/food', component: Food },
  { path: 'sales/accessories', component: Accessories },
  { path: 'sales/clothing', component: Clothing },
  { path: 'sales/supplements', component: Supplements },
  // { path: 'sales/other', component: Other },
  { path: 'veterinarian', component: Veterinarian },
  { path: 'adoption', component: Adoption },
  { path: 'adoption/want', component: WantToAdopt },
  { path: 'adoption/have', component: HaveForAdoption },
  { path: 'lost-and-found/all', component:All},
  { path: '**', redirectTo: '' }

];


