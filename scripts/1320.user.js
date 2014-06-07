// Paypal Bank Block
// Author: Jed Brown
// License: None, have fun with it
// 
// ==UserScript==
// @name           PaypalBankBlock
// @namespace      http://jedbrown.net
// @description    Warns you when paying with your bank account (default), for those of us who prefer credit cards.
// @include        https://www.paypal.com/*
// ==/UserScript==

(function () {
	//alert("dude");
	
	var theSource = document.documentElement.innerHTML;
	var thepPpResult = theSource.match(/Instant Transfer:/g);
	if(thepPpResult.length>1){
        //Yay! Now lets have fun! - submit.x
        var allInputs = document.getElementsByTagName('input');
        for (var i = 0; i < allInputs.length; i++) {
            
            if(allInputs[i].name =="submit.x" ){
                var buttonAttribute = allInputs[i].getAttribute('onclick');
                myOnClick = "if(!confirm('You are about to pay with your Bank Account, are you sure?')){return false;} ";
                allInputs[i].setAttribute('onclick', myOnClick + buttonAttribute);
                buttonAttribute = allInputs[i].getAttribute('onclick');
                //Stop here
                //alert("Yep 2!");
                //i = allInputs.length;
            }
        }
        //alert("Yep!");
	}
}

)();