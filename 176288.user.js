// ==UserScript==
// @name           Hide McMillan definitions on OneLook
// @namespace      http://mathrick.org/userscripts/hidemcmillan
// @description    Since McMillan is useless as a dictionary, remove its quick definitions from OneLook. The pronunciation links are retained.
// @version        0.2
// @match http://onelook.com/*
// @match http://www.onelook.com/*
// ==/UserScript==

function hideXPath(xpath) {
    var xpathResult = document.evaluate( xpath, document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
    for( var i = 0; i < xpathResult.snapshotLength; i++ ) {
        node = xpathResult.snapshotItem(i);
        node.style.display = "none";
    }
}

(function ()
 {
     let selectors = ["id('def_text')",
                      "id('def_text')/following-sibling::br[position() < 3]", 
                      "id('mm_logo')",
                      "id('mm_logo')/parent::*/preceding-sibling::font[1]",
                      "id('mm_logo')/parent::*/following-sibling::br[position() < 4]"];

     for (i in selectors)
     {
         hideXPath(selectors[i])
     }
 })()
