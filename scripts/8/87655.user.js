

// ==UserScript==
// @name           Sleeping Snowager
// @description    Visit the sleeping Snowager anytime!
// @include        http://www.neopets.com/winter/snowager.phtml*
// @owner          Coilvect at Neocodex, DarkZtar, Hiddenbelow, Neofriends
// ==/UserScript==


var b;
for (a = 0; a < document.forms.length; a++) {
        if (document.forms[a].getAttribute('action') == 'icecaves.phtml') {
                b = a;
                break;
        }
}
document.forms[b].setAttribute('method','get');
document.forms[b].setAttribute('action','snowager2.phtml');
var c;
for (a = 0; a < document.forms[b].childNodes.length; a++) {
        console.log(document.forms[b].childNodes[a].nodeType)
        if (document.forms[b].childNodes[a].nodeType == 1) {
                if (document.forms[b].childNodes[a].getAttribute('type') == 'submit') {
                        c = a;
                        break;
                }
        }
}
document.forms[b].childNodes[c].setAttribute('value','Steal a treasure anyways!');
setTimeout(function(){location.href = 'http://www.neopets.com/winter/snowager.phtml'},7200000);

