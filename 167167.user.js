// ==UserScript==
// @name     _Reload and click demo
// @include  *priceless.com/istanbul/offer/MasterCard-Tindersticks*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant    GM_addStyle
// ==/UserScript==
/*- The @grant directive is needed to work around a major design
    change introduced in GM 1.0.
    It restores the sandbox.
*/

var i;
waitForKeyElements ("#key-information", clickTargetButton);


function clickTargetButton () {

i=setInterval( clickHandler,100);

}

function clickHandler(){

if( $('#key-information').children().first().children().first().children().eq(1).children().first().text()!=="ÇOK YAKINDA"){

 $('#key-information').children().first().children().first().children().eq(1).trigger('click')
clearInterval(i);

}
else{
console.log("not ready");
;
}
 
}