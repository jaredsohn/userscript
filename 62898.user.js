// ==UserScript==
// @name           Set the beta style to Google
// @namespace      http://www.google.com
// @include        http://www.google.*
// ==/UserScript==

if(!/\.google\.com$/.test(location.host)){
    redirectToGoogle();
    convertGoogle();
}else{
    convertGoogle();
}

function redirectToGoogle(){
    location.href = "http://www.google.com/ncr";
}

function convertGoogle(){
    document.cookie="PREF=ID=20b6e4c2f44943bb:U=4bf292d46faad806:TM=1249677602:LM=1257919388:S=odm0Ys-53ZueXfZG;path=/;domain=.google.com";
}