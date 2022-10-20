import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SendComponent } from './send/send.component';
import { SendConfirmationComponent } from './send-confirmation/send-confirmation.component';
import { SelectDriverComponent } from './select-driver/select-driver.component';
import { IncomingComponent } from './incoming/incoming.component';
import { HistoryComponent } from './history/history.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component';
import { NotificationComponent } from './notification/notification.component';
import { ReferrerComponent } from './referrer/referrer.component';
import { PasswordComponent } from './password/password.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { ThirdComponent } from './third/third.component';
import { MessageComponent } from './message/message.component';
import { MessagesComponent } from './messages/messages.component';
import { DeliverComponent } from './deliver/deliver.component';
import { GpsComponent } from './gps/gps.component';
import { LicenseComponent } from './license/license.component';
import { InsuranceComponent } from './insurance/insurance.component';
import { RegistrationComponent } from './registration/registration.component';   
import { DeliveriesComponent } from './deliveries/deliveries.component';   
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'send', component: SendComponent },
  { path: 'send-confirm', component: SendConfirmationComponent },
  { path: 'select-driver', component: SelectDriverComponent },
  { path: 'incoming', component: IncomingComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'notification', component: NotificationComponent },
  { path: 'referrer', component: ReferrerComponent },
  { path: 'password', component: PasswordComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'first', component: FirstComponent },
  { path: 'second', component: SecondComponent },
  { path: 'third', component: ThirdComponent },
  { path: 'message/:id', component: MessageComponent },
  { path: 'deliver/:id', component: DeliverComponent },
  { path: 'gps/:id', component: GpsComponent },
  { path: 'messages', component: MessagesComponent },
  { path: 'license', component: LicenseComponent },
  { path: 'insurance', component: InsuranceComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'deliveries', component: DeliveriesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
