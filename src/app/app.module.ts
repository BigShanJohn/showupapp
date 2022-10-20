import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SendComponent } from './send/send.component';
import { AgmCoreModule } from '@agm/core';
import { MapComponent } from './map/map.component';
import { SwitchProfileComponent } from './switch-profile/switch-profile.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SendConfirmationComponent } from './send-confirmation/send-confirmation.component';
import { SelectDriverComponent } from './select-driver/select-driver.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { IncomingComponent } from './incoming/incoming.component';
import { HistoryComponent } from './history/history.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component';
import { NotificationComponent } from './notification/notification.component';
import { ReferrerComponent } from './referrer/referrer.component';
import { PasswordComponent } from './password/password.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxCopyToClipboardModule } from 'ngx-copy-to-clipboard';
import { GetStartedComponent } from './get-started/get-started.component';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { ThirdComponent } from './third/third.component';
import {DpDatePickerModule} from 'ng2-date-picker';
import { ViewDriverComponent } from './view-driver/view-driver.component';
import { MessageComponent } from './message/message.component';
import { MessagesComponent } from './messages/messages.component';
import { FooterComponent } from './footer/footer.component';
import { DeliverComponent } from './deliver/deliver.component';
import { GpsComponent } from './gps/gps.component';
import { AgmDirectionModule } from 'agm-direction';
import { LicenseComponent } from './license/license.component';
import { InsuranceComponent } from './insurance/insurance.component';
import { RegistrationComponent } from './registration/registration.component';
import { DeliveriesComponent } from './deliveries/deliveries.component';   
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    SendComponent,
    MapComponent,
    SwitchProfileComponent,
    ForgotPasswordComponent,
    SendConfirmationComponent,
    SelectDriverComponent,
    SidebarComponent,
    IncomingComponent,
    HistoryComponent,
    SettingsComponent,
    ProfileComponent,
    NotificationComponent,
    ReferrerComponent,
    PasswordComponent,
    ContactUsComponent,
    GetStartedComponent,
    FirstComponent,
    SecondComponent,
    ThirdComponent,
    ViewDriverComponent,
    MessageComponent,
    MessagesComponent,
    FooterComponent,
    DeliverComponent,
    GpsComponent,
    LicenseComponent,
    InsuranceComponent,
    RegistrationComponent,
    DeliveriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    NgxCopyToClipboardModule,
    DpDatePickerModule,
    ToastrModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAUAnR3F5Ps0Z9yedR058rWSHQUbDHgDAo',
      libraries: ['places', 'directions']
    }),
    AgmDirectionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
