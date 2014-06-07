// ==UserScript==
// @name           OGame 1.2 PM Fix (v1.1)
// @namespace      http://theelitist.net/ogame-12-pm-fix/
// @description    Fixes The numerous \n\n and backslashes in PMs
// @include        http://*.ogame.*/game/index.php?page=showmessage*
// ==/UserScript==

(function() {
    var body = document.getElementsByTagName('body')[0];
    body.innerHTML = body.innerHTML.replace(/\\\\\\/g, "");
    body.innerHTML = body.innerHTML.replace(/\\n/g, "<br />");
    body.innerHTML = body.innerHTML.replace(/\\'/g, "'");
})();