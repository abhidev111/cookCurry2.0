import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DetailedRecipeComponent } from './components/detailed-recipe/detailed-recipe.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { SearchByIngredientsComponent } from './components/search-by-ingredients/search-by-ingredients.component';
import { SearchByNameComponent } from './components/search-by-name/search-by-name.component';


const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'searchByName', component: SearchByNameComponent },
  { path: 'searchByIngredients', component: SearchByIngredientsComponent },
  { path: 'detailedRecipe/:srNo', component: DetailedRecipeComponent },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
