// ==UserScript==
// @name           BelarcHotfixSearch
// @namespace      belarc
// @description    Searches Microsoft Download Center for relevant security hotfixes found using Belarc Advisor.
// @include        file:///C:/Program%20Files/Belarc/Advisor/System/tmp/%28*%29.html
// ==/UserScript==

// ChangeLog
// 9/13/08: initial creation
// 4/15/11: fixed include statement
// 4/15/11: added delay to correct parsing

// Post process the page after rendering.
window.addEventListener(
    'load', 
    function() {
        setTimeout(Main, 2000)
    },
    true);

function Main() {
 var loc = decodeURI(window.location);
 var msdownloads = "http://www.microsoft.com/downloads/results.aspx?pocId=&freetext=%s&DisplayLang=en";
 var links = document.getElementsByTagName('a');
 var td = document.getElementsByTagName('td');

 var linkCount = 0;

 for (var i = 0; i < links.length; i++) {
    var href = links[i].href;

    if (href.indexOf("qferefer?") > 0) {

        // finds the name of the hotfix
        var hotfix = href.substr(href.indexOf("?Q")+2);

        var link = document.createElement('a');
        link.href=    (msdownloads.replace(/%s/, hotfix));
        link.title=   "Download";
        link.target=  "_blank"; // launches in a new tab

        link.appendChild( document.createTextNode(' Find') );

        var parent = links[i].parentNode;
        if (parent) {
            parent.insertBefore(link, parent.nextSibling);
        }
    }
 }
}