import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataserviceService } from 'src/app/services/dataservice.service';


@Component({
  selector: 'app-detailed-recipe',
  templateUrl: './detailed-recipe.component.html',
  styleUrls: ['./detailed-recipe.component.scss']
})

export class DetailedRecipeComponent implements OnInit {

  SerialNo: any;
  recipe: any;
  constructor(private _route: ActivatedRoute, private service: DataserviceService) { }

  ngOnInit(): void {
    this._route.params.subscribe(data => {
      this.SerialNo = data['srNo'];
      console.log(this.SerialNo)
    })

    this.service.getDetailedRecipeWithSrNo(this.SerialNo).subscribe((data) => {
      this.recipe = data;
      console.log(this.recipe)

    })

  }


}
