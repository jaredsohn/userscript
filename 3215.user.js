// ==UserScript==
// @name           Heise Highlight
// @namespace      http://scheidtmann.ath.cs/greasemonkey-scripts
// @description    Highlight search terms in heise newsticker
// @include        http://heise.de/newsticker/
// @include        http://*.heise.de/newsticker/
// ==/UserScript==

function highlight( searchFor ) {

    // xpath 1.0 does not have toUpperCase. 
    // see http://www.w3.org/TR/1999/REC-xpath-19991116#function-translate
    var xpathStr = '//a[@href and contains('.concat(
                   'translate(text(),"abcdefghijklmnopqrstuvwxyzýýý","ABCDEFGHIJKLMNOPQRSTUVWXYZýýý")').concat(
                   ', "').concat(searchFor.toUpperCase()).concat('")]'); 
    // alert(xpathStr);

    var allLinks = document.evaluate(xpathStr,
                                     document,
                                     null,
                                     XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                                     null);

    // alert(allLinks.snapshotLength);
    var str, pos;

    for (var i = 0; i < allLinks.snapshotLength; i++) {
        var thisLink = allLinks.snapshotItem(i);

        // Make them hit you in the eye.
        thisLink.style.backgroundColor = 'yellow';

        // Display search term in bold.
        str = thisLink.innerHTML;
        pos = str.toUpperCase().indexOf(searchFor.toUpperCase());
   
        thisLink.innerHTML = thisLink.innerHTML.substr(0, pos) + '<b>' + 
            thisLink.innerHTML.substr(pos,searchFor.length) + '</b>' +
            thisLink.innerHTML.substr(pos+searchFor.length);
    }
}

highlight('Patent');
highlight('Linux');
highlight('GPL');
highlight('DVD');
