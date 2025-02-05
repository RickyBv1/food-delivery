import { Component, inject } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';

import { FormsModule } from '@angular/forms';
import { Profile } from '../../core/interfaces/profiles';
import { ProfileService } from '../../core/services/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  standalone: true,
})
export class ProfileComponent {
  headerService = inject(HeaderService);
  profileService = inject(ProfileService);
  router = inject(Router);

  ngOnInit(): void {
    this.headerService.title.set('Profile');
    if (this.profileService.profile()) {
      this.profile = { ...this.profileService.profile()! };
    }
  }

  profile: Profile = {
    name: '',
    address: '',
    deliveryDetails: '',
    phone: '',
  };

  saveProfileDetails() {
    this.profileService.saveDetails(this.profile);
    this.router.navigate(['/cart']);
  }
}
