// ==UserScript==
// @name           Uptobox Autodelete
// @description    Delete all files and folders of your Uptobox account
// @include        http://uptobox.com/?op=my_files*
// @grant       GM_xmlhttpRequest
// @version     1.00
// @homepageURL    http://userscripts.org/scripts/show/187092
// @updateURL      https://userscripts.org/scripts/source/187092.meta.js
// ==/UserScript==

// Put false to only check the current page and don't try to delete new files, put a number X to reload the page and delete files and folders every X seconds (by default 1) 
o_CheckEveryXSeconds = 1;

var linkElems = document.getElementsByTagName('a');
// Check every link on the page
for (var i = 0; i < linkElems.length; i++) {
    var currElem = linkElems[i];
    // Found a delete button?
    if (currElem.getAttribute('onclick') != null && (currElem.getAttribute('onclick') .indexOf('Confirmer la suppression') != - 1 || currElem.getAttribute('onclick').indexOf('Delete this') != - 1)) {
        // Send a request to delete this file/folder
        GM_xmlhttpRequest({
            method: 'GET',
            url: currElem.href,
        });
    }
}

// If checking every X second
if (o_CheckEveryXSeconds != false) {
    // Check again in 1 second (reload the page so our script will launch again)
    setTimeout(function () {
        window.location.reload();
    }, o_CheckEveryXSeconds * 1000);
}