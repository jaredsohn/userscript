// eBay Forum Custombuttons user script
// version 0.2.7
// 2008-02-08
// Copyright 2006-2008, thorbenhauer
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// -----------------------------------------------------------------------------
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
// -----------------------------------------------------------------------------
//
// ==UserScript==
// @name          eBay Forum Custom Buttons
// @namespace     http://userscripts.org/users/9022
// @description   http://userscripts.org/scripts/show/5509
// @include       http://forums*.ebay.tld/*thread.jspa?*
//                for Opera (which doesn't understand tld):
// @include       http://forums.ebay.com/*thread.jspa?*
// @include       http://forums.ebay.com.au/*thread.jspa?*
// @include       http://forums-be*.ebay.be/*thread.jspa?*
// @include       http://forums.ebay.ca/*thread.jspa?*
// @include       http://forums.ebay.fr/*thread.jspa?*
// @include       http://forums.ebay.com.hk/*thread.jspa?*
// @include       http://forums.ebay.in/*thread.jspa?*
// @include       http://forums.ebay.co.uk/*thread.jspa?*
// @include       http://forums.ebay.it/*thread.jspa?*
// @include       http://forums.ebay.com.my/*thread.jspa?*
// @include       http://forums.ebay.nl/*thread.jspa?*
// @include       http://forums.ebay.ph/*thread.jspa?*
// @include       http://forums.ebay.pl/*thread.jspa?*
// @include       http://forums.ebay.com.sg/*thread.jspa?*
// @include       http://forums.ebay.es/*thread.jspa?*
// ==/UserScript==
//
// -----------------------------------------------------------------------------
(function () { // function wrapper for Opera

const PNGS = new Array(
'data:image/png;base64,' +
'iVBORw0KGgoAAAANSUhEUgAAABQAAAAWBAMAAAAyb6E1AAAAMFBMVEX////U0Mj39/fu7u6AgIBA' +
'QEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACOef79AAAACXBIWXMAAAsTAAALEwEAmpwY' +
'AAAARUlEQVQImWNQggFVBkVBKHBlUDSGAiKYjCDKDC8zLS3ZLC0ZzEw2TjYDigOZaVCAyjRLNoMp' +
'QNZGvHOQmCouUODKEAoHAC42MMCnluFNAAAAAElFTkSuQmCC',

'data:image/png;base64,' +
'iVBORw0KGgoAAAANSUhEUgAAABQAAAAWBAMAAAAyb6E1AAAAMFBMVEX////U0Mj39/fu7u6AgIBA' +
'QEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACOef79AAAACXBIWXMAAAsTAAALEwEAmpwY' +
'AAAAQ0lEQVQI12NQggFVBkVBKHBlUDSGAqKYyQQUmCWbpaUZpyWD1ZoBgTEa0ywNxIIogAA40yzN' +
'mFTnwJkqLlDgyhAKBwCk1y8MahmpYgAAAABJRU5ErkJggg==',

'data:image/png;base64,' +
'iVBORw0KGgoAAAANSUhEUgAAABQAAAAWBAMAAAAyb6E1AAAAMFBMVEX////U0Mj39/fu7u6AgIBA' +
'QEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACOef79AAAACXBIWXMAAAsTAAALEwEAmpwY' +
'AAAAOklEQVQI12NQggFVBkVBKHBlUDSGAqKZZskIUXSmmXFyWhqcmWyMl5kGYqYlk+MGdKaKCxS4' +
'MoTCAQAauzALMLFhCQAAAABJRU5ErkJggg==',

'data:image/png;base64,' +
'iVBORw0KGgoAAAANSUhEUgAAABQAAAAWBAMAAAAyb6E1AAAAMFBMVEX////U0Mj39/fu7u6AgIBA' +
'QEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACOef79AAAACXBIWXMAAAsTAAALEwEAmpwY' +
'AAAAQklEQVQI12NQggFVBkVBKHBlUDSGAiKZackwZloaiA1imqWBEIQJFCKaidCGZBhQLA1hMRLT' +
'LBm3y1RcoMCVIRQOAI0AMTE9gMOpAAAAAElFTkSuQmCC',

'data:image/png;base64,' +
'iVBORw0KGgoAAAANSUhEUgAAABQAAAAWBAMAAAAyb6E1AAAAMFBMVEX////U0Mj39/fu7u6AgIBA' +
'QEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACOef79AAAAAWJLR0QAiAUdSAAAAAlwSFlz' +
'AAALEwAACxMBAJqcGAAAAAd0SU1FB9YJFhYKGIH5kL4AAAA8SURBVAjXY1CCAVUGRUEocGVQNIYC' +
'EpnJYEYagmkGYZrBmGlgABE1AwNMZhqQmUa+GxBMFRcocGUIhQMAvPUvJy0oQIwAAAAASUVORK5C' +
'YII=',

'data:image/png;base64,' +
'iVBORw0KGgoAAAANSUhEUgAAABQAAAAWBAMAAAAyb6E1AAAAMFBMVEX////U0Mj39/fu7u6AgIBA' +
'QEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACOef79AAAACXBIWXMAAAsTAAALEwEAmpwY' +
'AAAAB3RJTUUH1gkWFykTqUBUYAAAADpJREFUCNdjUIIBVQZFQShwZVA0hgKSmWnJZskQplmyGYyZ' +
'ZmxMNBNJG8iwtLRksp2j4gIFrgyhcAAABdMv+V6h9+UAAAAASUVORK5CYII='
);
const TITLES = new Array(
    'Click for strike tag',
    'Click for img tag',
    'Click for a tag',
    'Click for quote tag',
    'Decode selection',
    'Clear all'
);
const ALTS = new Array(
    'Click for strike tag',
    'Click for img tag',
    'Click for a tag',
    'Click for quote tag',
    'Decode selection',
    'Clear all'
);
const FUNC = new Array(
    postStrikeTag,
    postImgTag,
    postATag,
    postQuoteTag,
    decodeHTML,
    clearAll
);

var spellcheck = document.evaluate("//a[@name='spellcheck']/ancestor::td[1]",
    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null).snapshotItem(0);
if (spellcheck == null) {
    return; // requires function wrapper in Opera
}
var node = spellcheck.childNodes[0];
if (node.nodeType == 3) {
    spellcheck.removeChild(spellcheck.childNodes[0]);
}
var tarea = document.getElementById("body01");
var tr = document.evaluate("//table[@class='jive-font-buttons']//tr",
    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null).snapshotItem(0);
var emoticonsTd = document.evaluate(".//td[1]", tr, null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
emoticonsTd.innerHTML = "";
emoticonsTd.appendChild(createImg("images/emoticons-20x22.gif",
    "Show emoticons", "Show emoticons", showEmoticons));
var emoticonsDiv = initEmoticons();
var td = document.evaluate("//tr[@class='ebayPostform']" + 
    "/td[@class='jive-label']", document, null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
td.insertBefore(emoticonsDiv, tarea);
var elem;
for (var i = 0; i < PNGS.length; i++) {
    elem = document.createElement('td');
    elem.style.cursor = "pointer";
    elem.innerHTML = '<img src="' + PNGS[i] + '" title="' + TITLES[i] +
        '" width="20" height="22" border="0" alt="' + ALTS[i] + '" />';
    elem.addEventListener('click', FUNC[i], false); // true doesn't work in Opera
    tr.appendChild(elem);
}

function postStrikeTag(event) {
    postTag('<strike>', '</strike>');
}

function postImgTag(event) {
    postTag('<img src="', '" alt="" />');
}

function postATag(event) {
    postTag('<a href="', '"></a>');
}

function postQuoteTag(event) {
    postTag('<font color="#000099" size="-1">', '</font>');
}

function decodeHTML(event) {
    var strings = getStrings();
    strings[1] = strings[1].replace(/</g, "&lt;");
    strings[1] = strings[1].replace(/>/g, "&gt;");
    // strings[1] = strings[1].replace(/\"/g, "&quot;");
    //strings[1] = strings[1].replace(/\(/g, "&#x0028;");
    //strings[1] = strings[1].replace(/\)/g, "&#x0029;");
    tarea.value = strings[0] + strings[1] + strings[2];
    tarea.focus();
}

function clearAll(event) {
    tarea.value = "";
    tarea.focus();
}

function getStrings() {
    var selLength = tarea.textLength;
    var selStart = tarea.selectionStart;
    var selEnd = tarea.selectionEnd;
    if (selEnd == 1 || selEnd == 2) {
      selEnd = selLength;
    }
    var strings = new Array(3);
    strings[0] = tarea.value.substring(0, selStart);
    strings[1] = tarea.value.substring(selStart, selEnd)
    strings[2] = tarea.value.substring(selEnd, selLength);
    return strings;
}

function postTag(startTag, endTag) {
    var strings = getStrings();
    tarea.value = strings[0] + startTag + strings[1] + endTag + strings[2];
    tarea.focus();
}

function initEmoticons() {
    var iconDiv = document.createElement("div");
    iconDiv.style.display = "none";
    iconDiv.appendChild(createImg("images/emoticons/happy.gif", "happy", ":-)",
        postEmoticons));
    iconDiv.appendChild(createImg("images/emoticons/sad.gif", "sad", ":-(",
        postEmoticons));
    iconDiv.appendChild(createImg("images/emoticons/grin.gif", "grin", ":-D",
        postEmoticons));
    iconDiv.appendChild(createImg("images/emoticons/love.gif", "love", ":-x",
        postEmoticons));
    iconDiv.appendChild(createImg("images/emoticons/cool.gif", "cool", "B-)",
        postEmoticons));
    iconDiv.appendChild(createImg("images/emoticons/devil.gif", "devil", "]:)",
        postEmoticons));
    iconDiv.appendChild(createImg("images/emoticons/silly.gif", "silly", ":-p",
        postEmoticons));
    iconDiv.appendChild(createImg("images/emoticons/angry.gif", "angry", "X-(",
        postEmoticons));
    iconDiv.appendChild(createImg("images/emoticons/laugh.gif", "laugh", ":^O",
        postEmoticons));
    iconDiv.appendChild(createImg("images/emoticons/wink.gif", "wink", ";-)",
        postEmoticons));
    iconDiv.appendChild(createImg("images/emoticons/blush.gif", "blush", ":8}",
        postEmoticons));
    iconDiv.appendChild(createImg("images/emoticons/cry.gif", "cry", ":_|",
        postEmoticons));
    iconDiv.appendChild(createImg("images/emoticons/confused.gif", "confused",
        "?:|", postEmoticons));
    iconDiv.appendChild(createImg("images/emoticons/shocked.gif", "shocked",
        ":O", postEmoticons));
    iconDiv.appendChild(createImg("images/emoticons/plain.gif", "plain", ":|",
        postEmoticons));
    iconDiv.appendChild(createImg("images/back-to-16x16.gif", "close", "close",
        closeEmoticons));
    return iconDiv;
}

function createImg(URL, title, alt, func) {
    var img =  document.createElement("img");
    img.src = URL;
    img.title = title;
    img.alt = alt;
    img.setAttribute("style", "border: 0px; cursor: pointer;");
    img.addEventListener('click', func, false); // true doesn't work in Opera
    return img;
}

function postEmoticons(event) {
    var strings = getStrings();
    var alt = event.target.alt;
    tarea.value = strings[0] + alt + strings[2];
    emoticonsDiv.style.display = "none";
    tarea.focus();
}

function closeEmoticons(event) {
    emoticonsDiv.style.display = "none";
    tarea.focus();
}

function showEmoticons(event) {
    emoticonsDiv.style.display = "";
    tarea.focus();
}

})(); // function wrapper for Opera