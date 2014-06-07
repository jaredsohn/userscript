// ==UserScript==
// @name           "Plus" sur la page d'accueil Google Firefox
// @namespace      http://olivier.jeulin.free.fr/scripts
// @description    Rajoute le lien vers "Plus..." sur la page de Google Firefox
// @include        http://*google.*/firefox?client=firefox-a&rls=org.mozilla:*
// ==/UserScript==

function test_lng() {
    if (navigator.language == "fr") return "Plus";
    else return "More";
    return true;
    } 
var zone = document.getElementById("frame");
var table_0 = zone.getElementsByTagName('table') ;
var table_1 = table_0[1].getElementsByTagName('table') ;
var table_2 = table_1[0].getElementsByTagName('table') ;
var table_3 = table_2[0].getElementsByTagName('table') ;
var td_1 = table_3[0].getElementsByTagName('td');
var inner = td_1[0].innerHTML;
inner = inner.replace(/top: -5px;/,"top: -5px; font-size:70%");
inner += '\<font size\=\"-1\"\>\<b\>';
inner += '\<a class\=\"q\" href\=\"\/intl\/'+navigator.language+'\/options\/\">'+test_lng()+'&nbsp;&raquo;\<\/a\>';
inner += '\<\/b\>\<\/font\>';
td_1[0].innerHTML = inner;


