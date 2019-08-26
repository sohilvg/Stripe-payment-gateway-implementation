import { Component } from "@angular/core";
// import { Router } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { of } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  form: FormGroup;
  orders = [];
  currencyvalue = [];

  // constructor(private router: Router) {}
  public allDone = false;
  // selectedItem = "INDIA";
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      orders: [""]
    });
    of(this.getOrders()).subscribe(orders => {
      this.orders = orders;
      this.form.controls.orders.patchValue(this.orders[0].id);
    });
  }
  getOrders() {
    return [
      { id: "AMD", name: "Armenia" },
      { id: "AUD", name: "Australia" },
      { id: "EUR", name: "Austria" },
      { id: "AZN", name: "Azerbaijan" },
      { id: "AMD", name: "Armenia" },
      { id: "EUR", name: "Belgium" },
      { id: "BTN", name: "Bhutan" },
      { id: "EUR", name: "France" },
      { id: "INR", name: "India	" },
      { id: "JPY", name: "Japan" },
      { id: "UAH", name: "Ukraine" },
      { id: "USD", name: "United States" }
    ];
  }

  submit() {
    // let currencyvalue = this.form.value;
    // console.log(currencyvalue);
    // console.log("order", this.orders);
  }
  Topayment() {
    // this.router.navigateByUrl("/pages/payment/payment-done");
  }
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
      currency: this.form.value.orders
    });
  }
}
