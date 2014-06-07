// eBay Answer Center Tweak user script
// version 0.2.5
// 2008-02-12
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
// @name          eBay Answer Center Tweak
// @namespace     http://userscripts.org/users/9022
// @description   http://userscripts.org/scripts/show/7058
// @include       http://answercent*.ebay.tld/thread.jspa?*
// @exclude       http://answercenter.ebay.it/thread.jspa?*
//                for Opera (which doesn't understand tld):
// @include       http://answercenter.ebay.com/thread.jspa?*
// @include       http://answercenter.ebay.com.au/thread.jspa?*
// @include       http://answercenter.ebay.ca/thread.jspa?*
// @include       http://answercenter.ebay.com.hk/thread.jspa?*
// @include       http://answercenter.ebay.com.my/thread.jspa?*
// @include       http://answercenter.ebay.com.sg/thread.jspa?*
// @include       http://answercenter.ebay.pl/thread.jspa?*
// @include       http://answercentre.ebay.co.uk/thread.jspa?*
// ==/UserScript==
//
// -----------------------------------------------------------------------------
(function () {
// Constants
const PNGS = new Array(
'images/emoticons-20x22.gif',

'images/text-bold-20x22.gif',

'images/text-italics-20x22.gif',

'images/text-underline-20x22.gif',

'images/text-pre-20x22.gif',

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
    'Click for emoticons',
    'Click for bold',
    'Click for italics',
    'Click for underline',
    'Click for pre tag',
    'Click for strike tag',
    'Click for img tag',
    'Click for a tag',
    'Click for quote tag',
    'Decode selection',
    'Clear all'
);
const ALTS = new Array(
    'Click for emoticons',
    'Click for bold',
    'Click for italics',
    'Click for underline',
    'Click for pre tag',
    'Click for strike tag',
    'Click for img tag',
    'Click for a tag',
    'Click for quote tag',
    'Decode selection',
    'Clear all'
);
const FUNC = new Array(
    showEmoticons,
    postBoldTag,
    postItalicsTag,
    postUnderlineTag,
    postPreTag,
    postStrikeTag,
    postImgTag,
    postATag,
    postQuoteTag,
    decodeHTML,
    clearAll
);
const QUOPNG = "data:image/png;base64," +
"iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBI" +
"WXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QgWFBAsqBARoAAAAodJREFUOMuNk0tIVHEUxn//O3fu" +
"nRkasUHpQU/IHmCbXFS0MEwKwkVhJbUQatODiMKMMIxeWtNDioIKshRpQF0VBFlQYNQ00CwKqlFw" +
"siDwkTNMinPvHe/9twjNsYE6cLa/7zvnfEcAu/m/sjW3++W+NcU1i+bO2TucSNxo6o40Ul5e3iil" +
"HM/RaSll2rKsdMZ20slU8ueeis2Dl+uOS5kYls+vBe2asg37VVVVFcBrmuZvGdvGNE0syyKTySCF" +
"iuYLcLK6zGN6l/lXrF9HKjnEap9bee3xHFAn/TmOgxACRVHQNA0pJW7dh+Lx01S9jJLCPhZvP01F" +
"xTZ6v8R48C7qJEdG7qnTh5RSIoTA5XLhzwugqFC/bQnLA1+pOvuI0eFe3n/4SFNTkN5IuCcSi99W" +
"cm1L0z24Vbh4bBNFga/sPNuFYTgkPrXQfqaYAmeASCzeLqV0sgBCCDTdgyLgwpFSFqReUHX+BRnL" +
"YDAa5FHnR0adtTQ0PwMwAFQppZiurAg4d3gdS80IOxq6sdIpBt8F6Qy95btYS92d53jdf0SnHCiK" +
"C0VA/cGNFNkRdl14Q8YYZSh6hYetb4jP2sLFUBi/N3vcKYCua8Tj/eSvrKLsfBJrfITh6CUe3Ovm" +
"W/5m7oeekucVSDsztfMsAEBz8122lJYwlhjgc1+CuzdfYa+qpiXUhQAmMiaapuV2AKAqgsLC2cT7" +
"e2i41cHCrYcIXm/FkWAYxu9suN1ZABUQACdqjzLL56O29hQTUtDW1kGe34ftSCzTyHVtOQkAIPbp" +
"M/mBAi5dvcH8+fMAME0Tx3GYGbaZDgB4/KTrLwld1//5omo4HP5RWVl5XQghc1mcGbTJ8nq9YwC/" +
"ALqxG8ITSuxtAAAAAElFTkSuQmCC";
const STARTTAG = '<font color="#000099" size="-1">';
const ENDTAG = '</font>';
// Form Import
var tld = document.domain.split(".ebay.")[1];
var threadTitleItem = document.evaluate("//p[@class = 'jive-breadcrumbs']/b/text()",
    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null).snapshotItem(0);
if (threadTitleItem != null) {
    var threadTitle = threadTitleItem.data;
} else {
    return;
}
threadTitle = threadTitle.replace(/\"/g, '\'');
var threadID;
var snap = document.evaluate("//a[starts-with(@href, " +
    "'watches!add.jspa?forumID=')]/@href", document, null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null).snapshotItem(0);
if (snap != null) {
    threadID = snap.value.split('&threadID=')[1];
} else {
    return;
}
var forumID = document.evaluate("//a[starts-with(@href, " +
    "'forum.jspa?forumID=')]/@href", document, null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null).snapshotItem(0).value.split('forum.jspa?forumID=')[1];
var anchor = document.evaluate("//div[@class = " + 
    "'jive-messagebox']/following-sibling::a[1]", document, null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
var label1, label2, label3, label4, label5;
switch (tld) {
    case "com":
        label1 = "Answer";
        label2 = "Subject:";
        label3 = "Watch this Question";
        label4 = "Preview";
        label5 = "Post Message";
        break;
    default:
        label1 = "Answer";
        label2 = "Subject:";
        label3 = "Watch this Question";
        label4 = "Preview";
        label5 = "Post Message";
        break;
}
var panel = document.createElement("div");
// Form
panel.innerHTML =
'<form action="post!post.jspa" method="post" name="postform" ' +
'onsubmit="return checkPost();">' +
'<input type="hidden" name="forumID" value="' + forumID + '">' +
'<input type="hidden" name="tid" value="">' +
'<input type="hidden" name="v" value="">' +
'<input type="hidden" name="doSpellCheck" value="">' +
'<input type="hidden" name="threadID" value="' + threadID + '">' +
'<input type="hidden" name="messageID" value="">' +
'<input type="hidden" name="reply" value="true">' +
'<input type="hidden" name="tempAttachmentID" value="-1">' +
'<div class="jive-post-form">' +
'<table cellpadding="3" cellspacing="2" border="0"><tr>' +
'<td class="jive-label" valign="top">' +
'<label for="body01">' + label1 + '</label>' +
'</td></tr><tr class="ebayPostform"><td class="jive-label" valign="top">' +
'<table class="jive-font-buttons" cellpadding="2" cellspacing="0" border="0">' +
'<tr></tr></table>' +
'<label for="subject">' + label2 + '</label><br>' +
'<input style="width: 100%" type="text" name="subject" value="' + threadTitle +
'"><br>' +
'<label for="body">Text:</label><br><textarea name="body" wrap="virtual" ' +
'cols="58" rows="12" tabindex="1" id="body01"></textarea></td></tr><tr><td>' +
'<input type="checkbox" name="addWatch" value="true" tabindex="2">' + label3 +
'</td></tr><tr><td>' +
'<input type="submit" name="doPreview" value="' + label4 + '" tabindex="3">' +
'</td></tr><tr><td><hr>' +
'<input type="submit" name="doPost" value="' + label5 + '" tabindex="4" ' +
'disabled="disabled"></td></tr></table></div></form>';
// Fetch data
anchor.parentNode.insertBefore(panel, anchor);
var v, tid, messageID;
var regExp1 = /<input\s+type="hidden"\s+name="v"\s+value="(.*)">/;
var regExp2 = /<input\s+type="hidden"\s+name="tid"\s+value="(.*)">/;
var regExp3 = /<input\s+type="hidden"\s+name="messageID"\s+value="(.*)">/;
var xmlHttp = new XMLHttpRequest();
if (xmlHttp) {
    xmlHttp.open('GET', 'http://' + document.domain + 
        '/post!reply.jspa?threadID=' + threadID, true);
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4) {
            evalRequest(xmlHttp);
        }
    }
    xmlHttp.send(null);
}
// Custom Buttons
var tarea = document.getElementById("body01");
var tr = document.evaluate("//table[@class='jive-font-buttons']//tr",
    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null).snapshotItem(0);
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
    elem.addEventListener('click', FUNC[i], false);
    tr.appendChild(elem);
}
// Accesskey
var form = document.evaluate("//form[@name='postform']", document, null, 
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
var newLabel = document.createElement("label");
newLabel.setAttribute("for", "body01");
newLabel.setAttribute("accesskey", "i");
form.appendChild(newLabel);
// Ctrl Enter Submits
var input = document.evaluate("//input[@name='doPost']", document, null, 
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);   
tarea.addEventListener("keydown",
    function(event) {
	    if (event.keyCode == 13 && event.ctrlKey) {
	        input.click();
	    }
    }, false
);
// Quote
var anchors = document.evaluate("//tr[@class = 'ebayACUserRow' or @class = " +
    "'ebayACRootUserRow' or @class = 'pinkliner']//a[@name]/ancestor::td[1]",
    document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var postings = document.evaluate("//div[@class='ebayACMessageBody']",
    document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var nicks = document.evaluate("//tr[@class = 'ebayACUserRow' or @class = " +
    "'ebayACRootUserRow' or @class = 'pinkliner']//a[@name]/" +
    "following-sibling::a[1]", document, null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var brIndex = document.evaluate("//tr[@class = 'ebayACUserRow' or @class = " +
    "'ebayACRootUserRow' or @class = 'pinkliner']/td/br[1]", document,
    null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < anchors.snapshotLength; i++) {
    anchors.snapshotItem(i).insertBefore(createImg(QUOPNG, "Quote posting",
        "quo" + i, quote), brIndex.snapshotItem(i));
}
// Functions
function postBoldTag(event) {
    postTag('<b>', '</b>');
}

function postItalicsTag(event) {
    postTag('<i>', '</i>');
}

function postUnderlineTag(event) {
    postTag('<u>', '</u>');
}

function postPreTag(event) {
    postTag('<pre>', '</pre>');
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
    img.addEventListener('click', func, false);
    return img;
}

function postEmoticons(event) {
    var strings = getStrings();
    tarea.value = strings[0] + '<img src="' + event.target.src + '" alt="' +
        event.target.alt + '" />' + strings[2];
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

function quote(event) {
    var ID = event.target.alt.slice(3, event.target.alt.length);
    var posting =  postings.snapshotItem(ID);
    var textNodes = document.evaluate(".//text()", posting, null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var nick = nicks.snapshotItem(ID).childNodes[0].data;
    var sep = "\n\n";
    if (tarea.value.length == 0) {
        sep = "";    
    }
    var quotes = new Array();
    var text;
    for (var i = 0; i < textNodes.snapshotLength; i++) {
        text = textNodes.snapshotItem(i).data;
        text = text.replace(/^\s*/, "");
        text = text.replace(/\s*$/, "");
        if (text.length > 0) {
            quotes.push(text);
        }
    }
    var s = tarea.value + sep + "@" + nick + "\n";
    for (var i = 0; i < quotes.length - 1; i++) {
        s = s + STARTTAG + quotes[i] + ENDTAG + "\n\n\n\n";
    }
    s = s + STARTTAG + quotes[quotes.length - 1] + ENDTAG + "\n\n";
    tarea.value = s;
}

function evalRequest(result) {
    var matches = regExp1.exec(result.responseText);
	if (matches) {
	    v = matches[1];
    }
	matches = regExp2.exec(result.responseText);
    if (matches) {
	    tid = matches[1];
	}
	matches = regExp3.exec(result.responseText);
	if (matches) {
	    messageID = matches[1];
	}
	var tempNode;
	if(v && tid && messageID) {
	    tempNode = document.evaluate("//input[@name='tid']", document, null,
	        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	    tempNode.value = tid;
	    tempNode = document.evaluate("//input[@name='v']", document, null,
	        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	    tempNode.value = v;
	    tempNode = document.evaluate("//input[@name='messageID']", document,
	        null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	        null).snapshotItem(0);
		tempNode.value = messageID;
		tempNode = document.evaluate("//input[@name='doPost']", document, null,
		    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	    tempNode.disabled = "";
	}
}

})();