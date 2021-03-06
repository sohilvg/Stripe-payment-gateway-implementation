import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// import { ThemeModule } from "./@theme/theme.module";
// import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
// import {
//   NbSpinnerModule,
//   NbSidebarModule,
//   NbLayoutModule
// } from "@nebular/theme";
// import { HttpClient } from "@angular/common/http";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    // NbSidebarModule,
    // NbLayoutModule,
    // NgbModule,
    FormsModule,
    ReactiveFormsModule,
    // HttpClient,
    HttpClientModule

    // ThemeModule.forRoot(),
    // NbSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
