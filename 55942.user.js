// ==UserScript==
// @name           NFSN FAQ Links
// @namespace      http://www.cjmweb.net/greasemonkey/
// @description    Add easy to copy links to NearlyFreeSpeech.NET's FAQ
// @include        https://members.nearlyfreespeech.net/*/support/faq*
// @include        https://members.nearlyfreespeech.net/faq*
// @grant          none
// @copyright 2009, Christopher J. Madsen (http://www.cjmweb.net)
// @license GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

// Find FAQ links that are a direct child of <li>:
//   (We don't want to get internal links from one FAQ to another.)
var allFAQs = document.evaluate(
    "//li/a[@id and (starts-with(@href,'/support/faq?q=') or starts-with(@href,'/faq?q='))]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

// Insert BBCode link before each title:
for (var i = 0; i < allFAQs.snapshotLength; i++) {
    var thisFAQ = allFAQs.snapshotItem(i);
    var url     = thisFAQ.href;

    var outerSpan = document.createElement('span');
    var innerSpan = document.createElement('span');
    var title     = thisFAQ.innerHTML;
    // Convert italics to BBCode (because I have HTML disabled in posts):
    title = title.replace(/<i>/g, '[i]');
    title = title.replace(/<\/i>/g, '[/i]');

    // Remove filters (if any) from URL:
    url = url.replace(/&(?:keywords|form)=[^&#]*/g, '');

    // Prepend FAQ title with hidden text containing BBCode link:
    outerSpan.appendChild(document.createTextNode('['));
    innerSpan.style.display = 'inline-block';
    innerSpan.style.overflow = 'hidden';
    innerSpan.style.height = '1px';
    innerSpan.style.width = '1px';
    innerSpan.appendChild(document.createTextNode(
      'url=' + url + ']FAQ: ' + title + '[/url'));
    outerSpan.appendChild(innerSpan);
    outerSpan.appendChild(document.createTextNode('] '));

    thisFAQ.parentNode.insertBefore(outerSpan, thisFAQ);
} // end for each link to FAQ
