import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { courseType, cuisineType, dietType, ingredientsType, recipeDetails, recipeName } from '../models/model';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  private _loading = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this._loading.asObservable();
  constructor(private http:HttpClient) { }

  showSpinner(){
    this._loading.next(true);
  }
  hideSpinner(){
    this._loading.next(false);
  }
  getRecipeNamegivenFilter(recipeName:String,cuisineArr: String[],dietArr:String[],courseArr:String[]){
    console.log("sdhfaisfaidfn",cuisineArr)
    return this.http.get<recipeDetails[]>('http://localhost:3000/allrecipeNames'+recipeName+':'+cuisineArr+':'+dietArr+':'+courseArr);
  }

  getPossibleRecipeNamegivenFilter(ingredientsArr:String[],cuisineArr: String[],dietArr:String[],courseArr:String[]){
    console.log(ingredientsArr, cuisineArr, dietArr, courseArr);
    return this.http.post<recipeDetails[]>('http://localhost:3000/allrecipeNamesWithIngredients',{
      "ingredientsArr" : ingredientsArr,
      "cuisineArr" :cuisineArr,
      "dietArr":dietArr,
      "courseArr":courseArr
    });
  }

  //don't touch
  allRecipeNamesDisplay(){
    return this.http.get<recipeName[]>('http://localhost:3000/RecipeNamesDisplay');
  }

  getRecipeWithName(recipeName:any){
    let url ='http://localhost:3000/recipeWithName'+ recipeName;
    console.log(url);
    return this.http.get<recipeDetails[]>(url);
  }

  getIngredientsforFilters(){
    let url = 'http://localhost:3000/getAllIngredients';
    return this.http.get<ingredientsType[]>(url);
  }

  getCuisinesforFilters(){
    let url = 'http://localhost:3000/getAllcuisines';
    return this.http.get<cuisineType[]>(url);
  }
  getDietforFilters(){
    let url = 'http://localhost:3000/getAlldiet';
    return this.http.get<dietType[]>(url);
  }
  getCourseforFilters(){
    let url = 'http://localhost:3000/getAllcourse';
    return this.http.get<courseType[]>(url);
  }

  getDetailedRecipeWithSrNo(srno:any){
    let srno_ = parseInt(srno,10); 
    let url = 'http://localhost:3000/getDetailedRecipeWithSrNo/'+srno_;
    console.log(url)
    return this.http.get<recipeDetails>(url);
  }
  
}
