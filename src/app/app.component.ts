import {
  Component,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  ChangeDetectorRef
} from "@angular/core";
// import { Router } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NgForm } from "@angular/forms";
// import typings  from '../typings';
@Injectable()
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements AfterViewInit, OnDestroy {
  form: FormGroup;
  orders = [];
  currencyvalue = [];
  ipAddress: any;
  country: any;
  currencyCode: any;
  selectedItem = "INDIA";
  public allDone = false;
  amount: any;

  @ViewChild("cardInfo") cardInfo: ElementRef;

  card: any;
  cardHandler = this.onChange.bind(this);
  error: string;
  emailAddress: any;
  payvalue: EventTarget;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private cd: ChangeDetectorRef // private appService: ABTestService
  ) {
    this.http.get<{ ip: string }>("http://ip-api.com/json").subscribe(data => {
      this.ipAddress = data;
      this.country = this.ipAddress.country;
      let url = `https://restcountries.eu/rest/v2/name/${this.country}?fullText=true`;
      this.http.get<{}>(url).subscribe(Data => {
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
  lgbtnclick() {
    // const this.amount
    console.log("Error", this.amount);
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
      currency: this.currencyCode
    });
  }

  /*created card to get details */
  ngAfterViewInit() {
    const style = {
      base: {
        lineHeight: "24px",
        fontFamily: "monospace",
        fontSmoothing: "antialiased",
        fontSize: "19px",
        "::placeholder": {
          color: "purple"
        }
      }
    };
    this.card = elements.create("card", { style });
    this.card.mount(this.cardInfo.nativeElement);

    this.card.addEventListener("change", this.cardHandler);
  }
  ngOnDestroy() {
    this.card.removeEventListener("change", this.cardHandler);
    this.card.destroy();
  }

  onChange({ error }) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }

  async onSubmit(form: NgForm) {
    const { token, error } = await stripe.createToken(this.card, {
      email: this.emailAddress
    });

    if (error) {
      console.log("Something is wrong:", error);
    } else {
      console.log("Success!", token);
      // ...send the token to the your backend to process the charge
    }
    // constructor(private router: Router) {}

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
  }
}
