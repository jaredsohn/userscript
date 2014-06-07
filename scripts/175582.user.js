// ==UserScript==
// @name            Zelly's FurAffinity Direct File Links
// @description	    Changes all /view/ links on furaffinity.com to direct file links.
// @author          Zelly
// @homepage        http://userscripts.org/scripts/show/175582
// @updateURL       https://userscripts.org/scripts/source/175582.meta.js
// @downloadURL     https://userscripts.org/scripts/source/175582.user.js
// @version         0.015
// @include	    http*://www.furaffinity.net/*
// @grant           GM_xmlhttpRequest 
// ==/UserScript==

var objArray =  document.evaluate(
                    "//a[contains (@href, '/view/')]",
                    document,
                    null,
                    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                    null);

var totalViewLinks = objArray.snapshotLength;

function fetchPage(myPage, targetLink){
    GM_xmlhttpRequest({
                        method: 'GET',
                        url: myPage,
                        onload: function(response){
                                    var responseDoc = new DOMParser().parseFromString(response.responseText, "text/html");
                                    var downloadLinkArray = responseDoc.evaluate(
                                                    "//a[contains (@href, '/d.facdn.net/art/')]",
                                                    responseDoc,
                                                    null,
                                                    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                                                    null);
                                                    
                                    var downloadLink=downloadLinkArray.snapshotItem(0);
                                    targetLink.href=downloadLink;
                                }});}

for (var i=0;  i < totalViewLinks;  i++){
    var thisObject = objArray.snapshotItem (i);
    fetchPage(thisObject.href,thisObject);}