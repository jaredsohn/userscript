// ==UserScript==
// @name        Link Latest Bulletin
// @namespace   LinkLatestBulletin
// @autor       Andy Calderbank
// @description Create a link to the latest company bulletin.
// @include     http://truckingsim.com/*.php#*
// @include     http://truckingsim.com/*.php?*
// @include     http://truckingsim.com/*.php
// @version     1.2
// @updateURL   https://userscripts.org/scripts/source/179615.meta.js
// @downloadURL https://userscripts.org/scripts/source/179615.user.js
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_xmlhttpRequest
// ==/UserScript==

/* I am writing this script out of lazyness and hating to keep clicking through
 *  View My Company -> Bulletins -> Latestes link, every time there is a new one
 *  Or I can't recall where I am meant to be going.
 */
 
// Create a regex to check to see if we're on the view bulletin page.
// If we are, remember what page it is as this will be the page we link to on next reloads.
if (document.location.href.match(/https?:\/\/(?:www\.)?truckingsim\.com\/view_bulletin\.php\?id=(\d+)/)) {
	GM_setValue('Bulletin page to link to',document.location.href);
}

//Loop thought all the <a> tags to find the View Company link.
var menuLinks = document.getElementById('driver_menu').getElementsByTagName('a');

for (var i = 0; i < menuLinks.length; i++) {
    //If we've just loaded the script the var will be null so grab the info, also
    //If we have new bulletins we haven't read, make the latest bulletin our saved link.
    if (GM_getValue('Bulletin page to link to') == null || menuLinks[i].innerHTML.match(/View My Company \(\d+\)/)) {
        getDOC('http://truckingsim.com/view_company.php', function(doc) {
            var toplinks = doc.evaluate('//div[@id="bulletinContainer"]//a[1]', doc, null, XPathResult.ANY_TYPE, null);
            var toplink = toplinks.iterateNext();
            GM_setValue('Bulletin page to link to',toplink.href);
        });
    }
    //Append after the view my company link a new link to the latest bulletins.
    if (menuLinks[i].innerHTML.match(/View My Company( \(\d+\))?/)) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        var linkText = document.createTextNode('Latest Bulletin');
        li.appendChild(a);
        a.appendChild(linkText);
        a.title = 'Latest Bulletin';
        a.href = GM_getValue('Bulletin page to link to');
        menuLinks[i].parentNode.parentNode.insertBefore(li,menuLinks[i].parentNode.nextSibling);
    }
}

//Helper function to call a function on load of the XHR request so its DOM is parseable.
function getDOC(url, callback) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        onload: function (responseDetails) {
          var dt = document.implementation.createDocumentType("html", 
              "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd"),
            doc = document.implementation.createDocument('', '', dt),
            html = doc.createElement('html');

          html.innerHTML = responseDetails.responseText;
          doc.appendChild(html);
          callback(doc);
        }
    });
}