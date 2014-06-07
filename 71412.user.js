// ==UserScript==
// @name What.CD Posts Link
// @namespace http://userscripts.org/
// @description Subscriptions: Unread by default (grouped)
// @include http*://*what.cd*
// ==/UserScript==
(function() {
    var subscriptions = document.getElementById('userinfo_minor').getElementsByTagName('li')[4];
    subscriptions.innerHTML = "<a href=\"userhistory.php?action=subscriptions&showunread=1\">Subscriptions</a>";
})();
var p = document.getElementsByClassName('row');

for( var i=0; i<p.length; i++ ) {

  p[i].className += ' hidden';

}