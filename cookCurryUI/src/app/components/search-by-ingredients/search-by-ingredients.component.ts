import { Component, OnInit } from '@angular/core';
import { cuisineType, ingredientsType, recipeDetails } from 'src/app/models/model';
import { DataserviceService } from 'src/app/services/dataservice.service';

@Component({
  selector: 'app-search-by-ingredients',
  templateUrl: './search-by-ingredients.component.html',
  styleUrls: ['./search-by-ingredients.component.scss']
})
export class SearchByIngredientsComponent implements OnInit {
  cuisineArr: any = [];
  dietArr: any = [];
  courseArr: any = [];
  ingredientsArr: any = [];

  selectedIngredients: any = [];
  selectedCuisine: any = [];
  selectedDiet: any = [];
  selectedCourse: any = [];
  recipeData: recipeDetails[] | undefined;
  loading$ = this.dataservice.loading$;


  constructor(private dataservice: DataserviceService) { }

  ngOnInit(): void {

    this.dataservice.getIngredientsforFilters().subscribe((data: ingredientsType[]) => {
      console.log("---------ingredients--------");
      this.ingredientsArr = data;
      console.log(this.ingredientsArr);
    })


  }

  async bringFilterData() {

    //cuisine filter options  api
    await this.dataservice.getCuisinesforFilters().subscribe((data: cuisineType[]) => {
      console.log("---------cuisines--------");
      this.cuisineArr = data;
      console.log(this.cuisineArr);
    })
    //diet filter options
    await this.dataservice.getDietforFilters().subscribe((data: cuisineType[]) => {
      console.log("---------diets--------");
      this.dietArr = data;
      console.log(this.dietArr);
    })

    //course filter options
    await this.dataservice.getCourseforFilters().subscribe((data: cuisineType[]) => {
      console.log("---------courses--------");
      this.courseArr = data;
      console.log(this.courseArr);
    })

    // await this.dataservice.getIngredientsforFilters().subscribe((data: ingredientsType[]) => {
    //   console.log("---------igredients--------");
    //   this.ingredientsArr = data;
    //   console.log(this.ingredientsArr);
    // })


  }

  getSelectedValue() {

    let ingredientsArray: String[] = [];
    let cuisineArray = [];
    let dietArray: String[] = [];
    let courseArray: String[] = [];
    console.log(this.selectedCuisine);
    for (var i of this.selectedCuisine) {
      cuisineArray[this.selectedCuisine.indexOf(i)] = i.cuisinename;
    }
    for (var i of this.selectedDiet) {
      dietArray[this.selectedDiet.indexOf(i)] = i.dietname;
    }
    for (var i of this.selectedCourse) {
      courseArray[this.selectedCourse.indexOf(i)] = i.coursename;
    }
    for (var i of this.selectedIngredients) {
      console.log(1, i)
      ingredientsArray[this.selectedIngredients.indexOf(i)] = i.ingredient_name;
      console.log(i)
    }




    this.dataservice.getPossibleRecipeNamegivenFilter(ingredientsArray, cuisineArray, dietArray, courseArray).subscribe((data: recipeDetails[]) => {
      console.log(data);
      this.recipeData = data;
      if (this.recipeData.length == 0) {
        console.log("no data ")
      }

    }
    )
  }


}
