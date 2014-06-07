// ==UserScript==
// @name           One.lt_Alert
// @description    Bandymas nebepirmas, bet is pirmuju
// @include        http://*google.*
// @version        1.0
// @copyright      Tomas
// @license        Tomas Tomosiukas licenzijuoja
// ==/UserScript== 

//================================= Naudojamos svetaines ===============================

function init (){

//var x = document.getElementsByTagName('form').length;
var x = document.forms.namedItem("viewListAllFriendsForm");


var Links=new Array();
for (i=3; i<19; i++){
d = x.getElementsByTagName('a')[i];
Links[i] = window.open(d);
setTimeout(Links[i].close,12000);
}
alert("Zinute");

/*
for (i=3; i<6; i++){
setTimeout(Links[i].close,8000);
//Links[i].close();
//alert("Zinute");
}
*/

//setTimeout(location.href = x.getElementsByTagName('a')[1],150000);
//alert("Zinute");

//e = location.href;
//alert(y);
}

if (window.addEventListener) {
alert("Zinute1");
    window.addEventListener('load', init, false);
} else {
    document.attachEvent('onload', init);
alert("Zinute2");
}