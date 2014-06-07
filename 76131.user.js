// ==UserScript==
// @name           Hotkey
// @namespace      HKI
// @description    fermi
// @include        http://www.e-fermi.it/*
// ==/UserScript==
document.addEventListener('keypress',
function (evt) {
var code = evt.charCode;
alt = evt.altKey;
if(alt)
switch(code){
case 105:
window.location = "http://www.e-fermi.it/course/view.php?id=62";
break;
case 115:
window.location = "http://www.e-fermi.it/course/view.php?id=63";
break;
case 101:
window.location = "http://www.e-fermi.it/course/view.php?id=70";
break;
case 109:
window.location = "http://www.e-fermi.it/course/view.php?id=64";
break;
case 99:
window.location = "http://www.e-fermi.it/course/view.php?id=68";
break;
}
},
false
);