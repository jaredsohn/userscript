// ==UserScript==
// @name        Ocado skip checkout walk
// @namespace   http://userscripts.org/users/587704
// @include     https://*.ocado.com/webshop/*
// @include     http://*.ocado.com/webshop/*
// @version     1
// @grant       none
// ==/UserScript==

// Two ways to check out - one is to fill basket without selecting a delivery slot then
// the 'select slot' page sends you straight into the checkout walk. In this case, 
// jump from the first page of the checkout walk straight to the payment page.
if (window.location.href.indexOf("/webshop/validateSlotChangeCheckout.do")!=-1 || window.location.href.indexOf("/webshop/beforeYouGoStart.do")!=-1) {
    window.location.href="https://"+window.location.hostname+"/webshop/setupHPPCheckout.do?skippedCheckoutWalk=A";
}

// Other is to choose a delivery slot before you shop. Detect this case by looking for
// the displaySlotDetails link, which only appears when you have a slot selected.
// If it's there, make the checkout button point straight to the payment page.
var elements = document.getElementsByTagName('a');
for (var i = 0; i < elements.length; i++) {
    if (elements[i].className=="linkWrap" && elements[i].href.indexOf("/webshop/displaySlotDetails.do")!=-1) {
        for (var j = 0; j < elements.length; j++) {
            if (elements[j].className=="button continue" && elements[j].href.indexOf("/webshop/startCheckout.do")!=-1) {
                elements[j].href="https://"+window.location.hostname+"/webshop/setupHPPCheckout.do?skippedCheckoutWalk=B";
                elements[j].innerHTML="Q Checkout";
            }
        }
    }
}