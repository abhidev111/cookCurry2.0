import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SearchByNameComponent } from './components/search-by-name/search-by-name.component';
import { SearchByIngredientsComponent } from './components/search-by-ingredients/search-by-ingredients.component';
//extras
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select'
//material
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { DetailedRecipeComponent } from './components/detailed-recipe/detailed-recipe.component';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { NetworkInterceptor } from './interceptors/network.interceptor';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';


// import{Matinput}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    SearchByNameComponent,
    SearchByIngredientsComponent,
    DetailedRecipeComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,

    //material
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule
    
  ],
  providers: [{
    provide : HTTP_INTERCEPTORS,
    useClass : NetworkInterceptor,
    multi :true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
