import { Injectable, signal, WritableSignal } from '@angular/core';
import { Profile } from '../interfaces/profiles';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor() {
    const profileLocalStorage = localStorage.getItem('profile');
    if (profileLocalStorage) this.profile.set(JSON.parse(profileLocalStorage));
  }

  profile: WritableSignal<Profile | undefined> = signal(undefined);

  saveDetails(profile: Profile) {
    localStorage.setItem('profile', JSON.stringify(profile));
    this.profile.set(profile);
  }
}
