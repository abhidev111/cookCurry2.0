import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
// import {recipeName} from ',/models/model'

import { map, startWith } from 'rxjs';
import { cuisineType, recipeDetails } from 'src/app/models/model';
import { DataserviceService } from 'src/app/services/dataservice.service';

@Component({
  selector: 'app-search-by-name',
  templateUrl: './search-by-name.component.html',
  styleUrls: ['./search-by-name.component.scss']
})

export class SearchByNameComponent implements OnInit {
  names!: any;
  recipeName: String = '';
  arr: String[] = [];
  mycontrol = new FormControl();
  filteredOptions: Observable<String[]> | undefined;
  recipeData: recipeDetails[] | undefined;
  got_data$ = new BehaviorSubject<boolean>(false);
  no_data_received: boolean = false;
  loading$ = this.dataservice.loading$;
  cuisineArr: any = [];
  dietArr: any = [];
  courseArr: any = [];

  selectedCuisine: any = [];
  selectedDiet: any = [];
  selectedCourse: any = [];

  constructor(private dataservice: DataserviceService) { }

  async ngOnInit(): Promise<void> {

    this.names = await lastValueFrom(this.dataservice.allRecipeNamesDisplay(), { defaultValue: 'No Data received' });
    console.log(this.names)

    for (var i of this.names) {
      this.arr[this.names.indexOf(i)] = i.recipe_name;
    }
    // for( let name in this.names){
    //   this.arr[this.names.indexOf(name)] = this.names[name];
    // }
    console.log(this.arr)





    this.filteredOptions = this.mycontrol.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    )


  }


  private _filter(value: string): String[] {
    const filterValue = value.toLowerCase();
    return this.arr.filter((option) => option.toLowerCase().includes(filterValue))
  }


  displayFn(subject: any) {
    return subject ? subject : undefined;
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
  }
  // getRecipeDet() {
  //   // console.log("***************",this.recipeName,"***************")
  //   this.dataservice.getRecipeWithName(this.recipeName).subscribe(data => {
  //     console.log(data);
  //     this.recipeData = data;
  //     this.no_data_received = false;
  //     this.got_data$.next(false);
  //     if (this.recipeData.length == 0) {
  //       console.log("no data ")
  //       this.no_data_received = true;
  //     }
  //     else {
  //       this.got_data$.next(true);
  //     }

  //   });
  // }

  getSelectedValue() {

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


    this.dataservice.getRecipeNamegivenFilter(this.recipeName, cuisineArray, dietArray, courseArray).subscribe((data: recipeDetails[]) => {
      console.log(data);
      this.recipeData = data;
      this.no_data_received = false;
      this.got_data$.next(false);
      if (this.recipeData.length == 0) {
        console.log("no data ")
        this.no_data_received = true;
      }
      else {
        this.got_data$.next(true);
      }

    }
    )
  }



}
