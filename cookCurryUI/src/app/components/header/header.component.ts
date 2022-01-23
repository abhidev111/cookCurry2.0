import { Component, OnInit } from '@angular/core';
import { DataserviceService } from 'src/app/services/dataservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loading$ = this.dataservice.loading$;
  constructor( private dataservice :DataserviceService  ) { }

  ngOnInit(): void {
  }

}
