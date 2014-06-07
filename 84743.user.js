// ==UserScript==
// @name           Freakshare Cleaner test
// @description    Removes crap
// @namespace      gotU
// @include        http://freakshare.net/files/*
// ==/UserScript==


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function main(){

//alert("main1");

var ii= document.getElementById('content').getElementsByTagName('div')[0].getElementsByTagName('div')[0].getElementsByTagName('table');
ii[0].deleteRow(0);
ii[0].deleteRow(0);
ii[0].deleteRow(0);
ii[0].deleteRow(0);
ii[0].deleteRow(0);
ii[0].deleteRow(0);
ii[0].deleteRow(0);
ii[0].deleteRow(0);
ii[0].deleteRow(0);
ii[0].deleteRow(0);
ii[0].deleteRow(0);

addGlobalStyle(
"#navigation,"+
"DIV.box:nth-of-type(1) tbody td:nth-of-type(3n+1),"+
"DIV.box:nth-of-type(1) tbody td:nth-of-type(3n+2),"+
"DIV.box:nth-of-type(2),"+
"#footer"+
"{ display: none ! important; }");


//alert("added1");

}


main();