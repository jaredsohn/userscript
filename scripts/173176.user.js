// ==UserScript==
// @name        eastbaybot
// @namespace   checkoutBot
// @description foot check out bot
// @include     https://www.eastbay.com/checkout/
// @version     1
// ==/UserScript==

window.addEventListener('load', function(){
  
  var continue1 = document.getElementById("loginPaneNewUser");
  var billAddressPanel = document.getElementById("billAddressPane_edit");var billAddressPanel = document.getElementById("billAddressPane_edit");
  var shipAddressPanel = document.getElementById("shipAddressPane_edit");
  var shipMethodPanel = document.getElementById("shipMethodPane_edit");
  var paymentMethodPanel = document.getElementById("paymentMethodPane_edit");
  var billVisible = false; 
  var shipAddVisible = false;
  var shipMethodVisible = false; 
  var paymentMethodVisible = false; 
  
  continue1.click();
  function interval1() {
    return window.setInterval( function() {
     if (billAddressPanel.style.display == "block") {
        billVisible = true;
        var firstName = document.getElementById("billFirstName");
        var lastName = document.getElementById("billLastName");
        var billAddress = document.getElementById("billAddress1");
        var billCity = document.getElementById("billCity");
        var zip = document.getElementById("billPostalCode");
        var state = document.getElementById("billState");
        var phone = document.getElementById("billHomePhone");
        var email = document.getElementById("billEmailAddress");
        var emailconfirm = document.getElementById("billConfirmEmail");
            
        firstName.value = "Joshua";
        lastName.value = "Cornelison";
        billAddress.value = "6206 Addison Dr";
        billCity.value = "Mechanicsburg";
        state.value = "PA";
        zip.value = "17050";
        phone.value = "7178166865";
        email.value = "sneakerhead8806@gmail.com";
        emailconfirm.value = "sneakerhead8806@gmail.com";
            
        var continue2 = document.getElementById("billPaneContinue");
        continue2.click();     
     }
    }, 200);
  };
  
  function interval2() {
    return window.setInterval( function() {
     if (shipAddressPanel.style.display == "block") {
        shipAddVisible = true;
        var radioBtn = document.getElementById("shipPaneShipToBillAddress");
        var continue3 = document.getElementById("shipPaneContinue");            
        radioBtn.click();
        continue3.click();
     }
    }, 200);
  };
  
  function interval3() {
    return window.setInterval( function() {
     if (shipMethodPanel.style.display == "block") {
        shipMethodVisible = true;
        var shipMethod = document.getElementById("shipMethod0");
        var continue4 = document.getElementById("shipMethodPaneContinue");
        shipMethod.click();
        continue4.click();
     }
    }, 200);
  };

  function interval4(){
    return window.setInterval( function() {
     if (paymentMethodPanel.style.display == "block") {
        paymentMethodVisible = true;
        var continue5 = document.getElementById("payMethodPaneContinue");
        var creditCard = document.getElementById("cardVISA");
        var cardNumber = document.getElementById("payMethodPaneCardNumber");
        var expr = document.getElementById("payMethodPaneExpireMonth");
        var exprYear = document.getElementById("payMethodPaneExpireYear");
        var cvc = document.getElementById("payMethodPaneCVV");
                        
        creditCard.click();
        cardNumber.value="";
        expr.value=";
        exprYear.value="";
        cvc.value ="";
        continue5.click();        
     }
    }, 200);
  };
  
  var id1 = interval1(); 
  var id2 = interval2();
  var id3 = interval3();
  var id4 = interval4();
  
  window.setInterval( function(){
          if(billVisible){
            window.clearInterval(id1);
          }
          
          if(shipAddVisible){
            window.clearInterval(id2);
          }
          
          if(shipMethodVisible){
            window.clearInterval(id3);
          }

          if(paymentMethodVisible){
            window.clearInterval(id4);
          }
   }, 200); 
  
  
}, false);