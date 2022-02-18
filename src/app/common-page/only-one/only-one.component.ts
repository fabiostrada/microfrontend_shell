import { Component, OnInit } from '@angular/core';
import { StateService } from 'my-authenticator-lib';

@Component({
  selector: 'app-only-one',
  templateUrl: './only-one.component.html',
  styleUrls: ['./only-one.component.scss']
})
export class OnlyOneComponent implements OnInit {

  public property1!: string;

  constructor(private stateService: StateService) { }

  ngOnInit(): void {
    this.property1 = this.stateService.getProperty1();
    console.log(this.stateService.getProperty1());
  }

}
