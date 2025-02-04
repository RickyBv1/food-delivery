import { Injectable, signal, WritableSignal } from '@angular/core';
import { Config } from '../interfaces/config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() {
    fetch('/assets/data/configuration.json').then(res => {
      res.json().then(resJson => {
        this.configuration.set(resJson)
      })
    })
  }

  configuration:WritableSignal<Config> = signal({
    deliveryCost: 0,
    cartExpirationDays: 3
  })
}
