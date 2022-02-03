import { Injectable } from '@angular/core';
import { StateService } from 'my-authenticator-lib';
import { StateConfig } from '../config/state-config';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(private stateService: StateService) { }

  public onlyOneIsAlreadyOpened(): boolean {
    let isOpened: boolean | undefined = this.stateService.getItem<boolean>(StateConfig.ONLY_ONE);
    return (!!isOpened && isOpened == true);
  }

  public openOnlyOne(): void {
    this.stateService.setItem(true, StateConfig.ONLY_ONE);
  }

  public closeOnlyOne(): void {
    this.stateService.setItem(false, StateConfig.ONLY_ONE);
  }
  
}
