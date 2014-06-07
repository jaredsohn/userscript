// ==UserScript==
// @name           Virtonomica delete $ in technology_sellers_info
// @namespace      virtonomica
// @version        1.1
// @description    Deleted $ from technology_sellers_info
// @include        http://virtonomica.*/*/window/management_action/*/investigations/technology_sellers_info/*/*
// ==/UserScript==

var run = function() {
var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
$ = win.$;

$('td[align=right]').each(function() {

var str = this.textContent;
var len = str.length;
var newstr = '';
for(i =0; i< len-4; i++){
   newstr += str[i];
}

this.innerHTML = newstr;

});
}


// Грязный хак для Google Chrome >:]
if(typeof window.chrome != 'undefined') {
    var script = document.createElement("script");
    script.textContent = '(' + run.toString() + ')();';
    document.documentElement.appendChild(script);
} else {
    run();
}