const puppy = require("puppeteer");
let from = "";
let to = "";
let date = "DD/MM/YYYY";
let username = "";
let password = "";
let name = "";
let Age = "";
let number = "";
let address = "";
let pin = "";
let upi = "";

let tab;
async function main(){
     let browser = await puppy.launch({
        headless: false,
        defaultViewport: false,
        args:["--start-maximized"]
     });
     let tabs = await browser.pages();
     tab = tabs[0];
     await tab.goto("https://www.irctc.co.in/nget/train-search", {waitUntil: 'load', timeout: 0,});

     await tab.click('button[class="btn btn-primary"]', {delay : 200});


     //From
     await tab.type('input[aria-controls="pr_id_1_list"]', from, {delay: 200});
     await tab.keyboard.press("Enter");

     //To
     await tab.type('input[aria-controls="pr_id_2_list"]', to, {delay: 200});
     await tab.keyboard.press("Enter");

     //Date
     await tab.click('span[class="ng-tns-c59-10 ui-calendar"]');
     for(let i = 0; i < 2 ; i++){
         await tab.keyboard.press("ArrowDown");
      }
     for(let i = 0; i < 10; i++){
        await tab.keyboard.press("Backspace");
      }
     
     await tab.waitForTimeout(3000);

     await tab.type(".ng-tns-c59-10.ui-inputtext.ui-widget.ui-state-default.ui-corner-all.ng-star-inserted", date);
     await tab.keyboard.press("Enter");

      await tab.waitForSelector('div[class="link pre-avl ng-star-inserted"]');
      await tab.click('div[class="link pre-avl ng-star-inserted"]');
      await tab.waitForSelector('button[class="btnDefault train_Search ng-star-inserted"]');
      await tab.click('button[class="btnDefault train_Search ng-star-inserted"]');
      await tab.click('button[class="ng-tns-c57-14 ui-confirmdialog-acceptbutton ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-left ng-star-inserted"]');

      await tab.waitForSelector('input[name="userId"]', {visible: true});
      await tab.type('input[name="userId"]', username, {delay : 200});
      
      await tab.waitForSelector('input[name="pwd"]', {visible: true});
      await tab.type('input[name="pwd"]', password, {delay : 200});

      await tab.waitForTimeout(10000);

      //Login
      await tab.click('button[class="search_btn train_Search"]'); 

      //passenger details
      await tab.waitForSelector('input[placeholder="Passenger Name"]');
      await tab.type('input[placeholder="Passenger Name"]', name, {delay: 200});
      
      await tab.waitForSelector('input[placeholder="Age"]');
      await tab.type('input[placeholder="Age"]', Age, {delay: 200});
      
      await tab.click('select[formcontrolname="passengerGender"]');
      await tab.keyboard.down("ArrowDown");
      await tab.keyboard.press("Enter");
      // await tab.click('option[value="M"]'); //Male --> M, Female --> F, Transgender --> T
      
      await tab.click('select[formcontrolname="passengerBerthChoice"]');
      await tab.keyboard.down("ArrowDown");
      await tab.keyboard.press("Enter");
      // await tab.click('option[value="MB"]'); //Middle Berth

      await tab.waitForSelector('input[placeholder="Passenger mobile number"]', {visible: true});
      await tab.type('input[placeholder="Passenger mobile number"]', number, {delay: 200});

      await tab.waitForSelector('input[formcontrolname="address"]');
      await tab.type('input[formcontrolname="address"]', address, {delay: 200});

      await tab.waitForSelector('input[formcontrolname="pinCode"]');
      await tab.type('input[formcontrolname="pinCode"]', pin, {delay: 200});
      
      await tab.click('select[name="address-postOffice"]', {delay: 200});
      await tab.waitForTimeout(2000);
      await tab.keyboard.down("ArrowDown");
      await tab.keyboard.press("Enter");

      let travelPay = [];
      travelPay = await tab.$$('div[class="ui-radiobutton ui-widget"]');

      for(let i = 0; i <= travelPay.length; i++){
         if(i == 0){
            travelPay[i].click();
         }
         if(i == 3){
            travelPay[i].click();
         }
      }

      await tab.click('button[class="train_Search btnDefault"]', {delay: 200});
      await tab.waitForTimeout(10000);

      await tab.waitForSelector('button[class="train_Search btnDefault"]');
      await tab.click('button[class="train_Search btnDefault"]');

      let payMode = [];
      await tab.waitForSelector('div[class="bank-type col-xs-12 ng-star-inserted"]');
      payMode = await tab.$$('div[class="bank-type col-xs-12 ng-star-inserted"]');
      payMode[1].click();

      let phonePay = [];
      await tab.waitForSelector('div[class="col-pad col-xs-12 bank-text"]');
      phonePay = await tab.$$('div[class="col-pad col-xs-12 bank-text"]');
      phonePay[1].click();
      
      await tab.waitForSelector('button[class="btn btn-primary hidden-xs ng-star-inserted"]');
      await tab.click('button[class="btn btn-primary hidden-xs ng-star-inserted"]');

      //UPI id selection
      await tab.waitForSelector('li[id="Phone Pe"]'); //GooglePay--> id="Google Pay" ,same for others
      await tab.click('li[id="Phone Pe"]');

      await tab.waitForSelector('input[class="text menu-input-onesuffix sm-inp"]');
      await tab.type('input[class="text menu-input-onesuffix sm-inp"]', upi, {delay: 200});

      //verify
      await tab.waitForSelector('div[class="input-rg-prt"]');
      await tab.click('div[class="input-rg-prt"]');
      
      //Proceed
      await tab.waitForSelector('button[class="gpay-btn right"]');
      await tab.click('button[class="gpay-btn right"]');


}
main();