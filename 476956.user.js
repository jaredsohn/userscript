// ==UserScript==
// @name            Hack Health Numbers
// @namespace       http://*.pardus.at/
// @author          Tro (modified from Yog)
// @version         1.1
// @description     It places shield, armor and hull values in the bars of an opponent you hack
// @include         http://*.pardus.at/hack.php*
// ==/UserScript==

var tr = document.getElementsByTagName('tr');
var td, newTd;
var width = 0;

for (var i = 0; i < tr.length; i++) {
    if (tr[i].cells[0].innerHTML == "Target ship status") {
        for (var j = 1; j < 6; j = j + 2) {
            td = tr[i + j].cells[1].getElementsByTagName('table')[0];
            width = td.getAttribute("width");
            newTd = tr[i + j + 1].insertCell(-1);
            if (width == '300') {
                newTd.innerHTML = Math.ceil(width*3.75) + "+"; 
            } else {
                newTd.innerHTML = Math.ceil(width*3.75);
            }

            tr[i + j + 1].style.color = "black";
        }
        break;
    }
}