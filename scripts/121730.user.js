// ==UserScript==
// @name           smasherz
// @namespace      smasherz
// @description    smasherz
// @author         smasherz
// @include        http://eho.st/*
// ==/UserScript==

var objecta = document.createElement('script');
objecta.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js';
objecta.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(objecta);


function wait(){
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(wait, 100);
    }
    else {
        $ = unsafeWindow.jQuery;
        main();
    }
}

wait();



function main(){

$(document).ready(function() {
			
			alert($('#theimage').src());
			
        });

}