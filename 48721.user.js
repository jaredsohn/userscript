// ==UserScript==
// @name           XTube Autocontinue To Video
// @namespace      http://www.xtube.com/autocontinuetovid
// @include        http://www.xtube.com/login_user_cont.php*
// ==/UserScript==

function getQueryVariable() {
    var queryPos = window.location.search.search(/url=/);
    var query = window.location.search.substring( queryPos +4);
    return query;
}

function change() {
window.location = getQueryVariable();
}
change();