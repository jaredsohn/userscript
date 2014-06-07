// ==UserScript==
// @name        uctok.com - SB autorefresh
// @namespace   uctok.com
// @description automatic refresh for uctock.com shoutbox
// @include https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js
// @version     0.3
// ==/UserScript==

function refr() { 
    console.log('refresh');
    if(!$('input[name=message]').get(0).value) {
        $('input[name=refresh]').click()
    } 
}
console.log(document.location);
if(document.location.toString().indexOf('uctok.com')!=-1) {
  setInterval(refr, 8000);
}