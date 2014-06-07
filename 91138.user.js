// ==UserScript==
// @name           C2C open new messages in tabs
// @namespace      http://www.camptocamp.org
// @description    open new messages in tabs
// @include        http://www.camptocamp.org/forums/search.php*
// @include        http://www.camptocamp.org/forums/viewforum.php*
// ==/UserScript==

function openlinks (){
    var linksnew = document.evaluate(
        "//*[@class='newtext']//a",
        document.getElementById("vf"),
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);

    for (var i = linksnew.snapshotLength - 1; i >= 0; i--) {
        var elm = linksnew.snapshotItem(i);
        GM_openInTab(elm.href);
    }
}

function detectlang (){
    var linksnew = document.evaluate(
        "//*[@class='log_elt']//strong",
        document.getElementById("log"),
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);

    var lang = linksnew.snapshotItem(0).innerHTML;
    GM_log("detected language: "+lang);
    return lang;
}

var lang = detectlang();

var elmNewContent = document.createElement('a');
elmNewContent.href = '#';

if (lang == 'fr'){
  elmNewContent.appendChild(document.createTextNode('Ouvrir les nouveaux messages dans des onglets'));
}
else {
  elmNewContent.appendChild(document.createTextNode('Open new messages in tabs'));
}

var elmFoo = document.getElementById('brdwelcome');
elmFoo.parentNode.insertBefore(elmNewContent, elmFoo.nextSibling);
elmNewContent.style.cssFloat = 'right';

elmNewContent.addEventListener("click", openlinks, true);

