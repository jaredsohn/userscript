// ==UserScript==
// @name          jpopsuki 'your torrents' page bottom link adder
// @namespace     http://otterish.co.uk
// @description   adds a link to jump to the bottom of the your torrents page
// @include       http://mullemeck.serveftp.org*/jps_beta/?page=usertorrents*
// ==/UserScript==

(function(){

document.getElementsByTagName('th')[0].innerHTML += " [<a href=#bottom title='To the bottom of the page!'>end</a>]";
document.body.innerHTML += "<a name='bottom'>";

})();