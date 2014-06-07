// ==UserScript==
// @name           Neopets : Pound : Pet Finder
// @version        0.1
// @namespace      http://userscripts.org/users/neocheats
// @description    At the Neopian Pound,  This script will find pets.
// @include        http://www.neopets.com/pound/get_adopt.phtml
// @include        http://www.neopets.com/pound/adopt.phtml
// ==/UserScript==

setTimeout("location.reload(true);",1000);


(function() {

if(document.indexOf('Pink') > -1){
alert('Pet found');
}

else if(document.indexOf('Green') > -1){
alert('Pet found');
}

})();