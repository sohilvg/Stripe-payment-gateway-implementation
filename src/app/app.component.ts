import { Component } from "@angular/core";
// import { Router } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
@Injectable()
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  form: FormGroup;
  orders = [];
  currencyvalue = [];
  ipAddress: any;

  // constructor(private router: Router) {}
  public allDone = false;
  country: any;
  currencyCode: any;
  // selectedItem = "INDIA";
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient // private appService: ABTestService
  ) {
    this.http.get<{ ip: string }>("http://ip-api.com/json").subscribe(data => {
      console.log("th data", data);
      this.ipAddress = data;
      this.country = this.ipAddress.country;
      console.log("code", this.country);
      let url = `https://restcountries.eu/rest/v2/name/${this.country}?fullText=true`;
      this.http.get<{}>(url).subscribe(Data => {
        console.log("th data", Data[0].currencies[0].code);
        this.currencyCode = Data[0].currencies[0].code;
      });
    });

    // this.form = this.formBuilder.group({
    //   orders: [""]
    // });
    // of(this.getOrders()).subscribe(orders => {
    //   this.orders = orders;
    //   this.form.controls.orders.patchValue(this.orders[0].id);
    // });
  }

  // getOrders() {
  //   return [
  //     { id: "AMD", name: "Armenia" },
  //     { id: "AUD", name: "Australia" },
  //     { id: "EUR", name: "Austria" },
  //     { id: "AZN", name: "Azerbaijan" },
  //     { id: "AMD", name: "Armenia" },
  //     { id: "EUR", name: "Belgium" },
  //     { id: "BTN", name: "Bhutan" },
  //     { id: "EUR", name: "France" },
  //     { id: "INR", name: "India	" },
  //     { id: "JPY", name: "Japan" },
  //     { id: "UAH", name: "Ukraine" },
  //     { id: "USD", name: "United States" }
  //   ];
  // }

  // submit() {
  //   // let currencyvalue = this.form.value;
  //   // console.log(currencyvalue);
  //   // console.log("order", this.orders);
  // }
  // Topayment() {
  //   // this.router.navigateByUrl("/pages/payment/payment-done");
  // }
  pay = [
    {
      money: 200,
      value: 20000
    },
    {
      money: 300,
      value: 30000
    },
    {
      money: 400,
      value: 40000
    }
  ];
  newpay: Number;

  openCheckout(event) {
    this.newpay = event.target.value;
    var user = this;
    var handler = (<any>window).StripeCheckout.configure({
      key: "pk_test_JUeNhWSwK3XbhChuKtAqZsdd00oVL62BWl", // your pk test key from stripe
      locale: "auto",
      token: function(token: any) {
        console.log(token);
        user.allDone = true;
      }
    });

    handler.open({
      name: "test Stripe Payment",
      description: "Stripe",
      amount: this.newpay,
      currency: this.currencyCode
    });
  }
}
