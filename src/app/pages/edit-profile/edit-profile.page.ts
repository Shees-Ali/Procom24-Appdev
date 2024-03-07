import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from '../base/base';
import { FormGroup, Validators } from '@angular/forms';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage extends BasePage implements OnInit {
  User?: any;
  profileForm: FormGroup<any>;
  profileImage: string = '';
  Skills: any[] = [
    {
      skill: 'Batting',
      rating: 0,
    },
    {
      skill: 'Bowling',
      rating: 0,
    },
    {
      skill: 'Fielding',
      rating: 0,
    },
  ];
  constructor(injector: Injector) {
    super(injector);
    this.profileForm = this.formBuilder.group({
      last_name: ['', Validators.required],
      first_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      photoURL: [''],
      cnic: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      age: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getCurrentUser();
  }

  async getCurrentUser() {
    this.utility.showLoader();
    const res = await this.userService.getCurrentUser();
    console.log(res);
    if (res) {
      this.User = res;
      this.profileForm.patchValue({
        last_name: this.User.last_name || '',
        first_name: this.User.first_name || '',
        email: this.User.email || '',
        photoURL: this.User.photoURL || '',
        cnic: this.User.cnic || '',
        country: this.User.country || '',
        city: this.User.city || '',
        age: this.User.age || '',
      });
      if (this.User.skills) {
        this.Skills = this.User.skills;
      }
      if (this.User.photoURL !== "") {
        this.profileImage = this.User.photoURL;
      }
    }
    this.utility.hideLoader();
  }

  async save() {
    this.utility.showLoader();
    await this.skillService.setSkillsData(this.User.user_id, this.Skills);
    const form = this.profileForm.value;
    if (this.profileImage !== '') {
      form.photoURL = this.profileImage;
    }
    console.log(form);
    await this.userService.updateUser(this.User.user_id, form);
    this.utility.hideLoader();
    this.utility.presentSuccessToast("User Profile Updated!");
  }

  async onProfileFileChange($event: any) {
    if ($event.target.files && $event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL($event.target.files[0]); // read file as data url
      reader.onload = (event: any) => {
        // called once readAsDataURL is completed
        if (event.target.result) {
          let f = event.target.result;
          this.profileImage = f;
        }
      };
    }
  }

  updateMyProfileImage() {
    if (Capacitor.isNativePlatform()) {
      this.imageService.getPhoto().then((img) => {
        if (img) {
          this.profileImage = img;
        }
      });
    } else {
      let element: HTMLElement = document.getElementById(
        'imagefile'
      ) as HTMLElement;
      element.click();
    }
  }
}
