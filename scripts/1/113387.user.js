// ==UserScript==
// @name           ESPN - Default boxscore links to 90 sec refresh
// @namespace      userscripts.org
// @include        http://scores.espn.go.com/*/scoreboard*
// @include        http://scores.espn.go.com/*/gamecast?gameId=*
// ==/UserScript==
var anchors = document.body.getElementsByTagName("a");
for (i in anchors) {
    var anchor = anchors[i];
    var href = anchor.href;
    if (href && href.match(/boxscore/)) {
        href += "&refresh=90";
        anchor.href = href;
    }
}
