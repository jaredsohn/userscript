// ==UserScript==
// @name          Telemeter for Adobe Flash Player 10 and higher
// @description   Makes the Telemeter Flash chart compatible with  Adobe's Flash Player 10 and higher
// @include       https://services.telenet.be/lngtlm/flashcheck/flashcheck.html*
// @version       0.1
// ==/UserScript==
instantaneousRedirect();
function instantaneousRedirect()
{
document.location.replace("https://services.telenet.be/lngtlm/flashcheck/success.html"); 
}