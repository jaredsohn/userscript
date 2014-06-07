// ==UserScript==
// @name           goolive Userlink Tooltip
// @namespace      Author: DerDome
// @namespace      http://dev.domesdomain.de
// @description    Shows a tooltip when hovering a profile link. The tooltip contains quicklinks
// @description    to send a mail to the user, make a present, make a guestbookentry or block the user.
// @description    Zeigt einen Tooltip mit Schnellzugriff auf Nachricht, Geschenk, Gästebucheintrag an den Nutzer und
// @description    der Blockierfunktion für den Nuetzer über jedem Profil-Link an.
// @include        http://www.goolive.*
// ==/UserScript==

var id;
var actUsername;
var posX;
var posY;
var hideTimeOut;
var showTimeOut;
var nameIds = new Array();
var showMail;
var messagelink;
var showPresent;
var presentlink;
var showGuestbook;
var gblink;
var showBlock;
var blocklink;

// get the right top level domain
var tld = window.location.hostname.split(".");
tld = tld[tld.length-1];


// create menu entries
GM_registerMenuCommand("Nachricht ein/aus", toggleMail);
GM_registerMenuCommand("Geschenk ein/aus", togglePresent);
GM_registerMenuCommand("Gästebuch ein/aus", toggleGuestbook);
GM_registerMenuCommand("Blockieren ein/aus", toggleBlock);

// load params
loadParams();

// replace links with non-javascript-target-links with onmouse-events
replaceLinks();

// create necessary elements
var tooltip = document.createElement("div");
tooltip.style.display = 'block';
tooltip.style.position = 'absolute';
tooltip.addEventListener('mouseover', keepTip, true);
tooltip.addEventListener('mouseout', cancelTip, true);
document.body.appendChild(tooltip);

createEntries();

function createEntries() {
    while (tooltip.childNodes[0]) {
        tooltip.removeChild(tooltip.childNodes[0]);
    }
    if (showMail == true) {
        var messageimg = document.createElement("img");
        messageimg.setAttribute('src', 'http://static.goolive.org/media/static/images/butt_msg.gif');
        messagelink = document.createElement("a");
        messagelink.appendChild(messageimg);
        tooltip.appendChild(messagelink);
    }

    if (showPresent == true) {
        var presentimg = document.createElement("img");
        presentimg.setAttribute('src', 'http://static.goolive.org/media/presents/present.gif');
        presentimg.setAttribute('height', '15');
        presentimg.setAttribute('width', '15');
        presentlink = document.createElement("a");
        presentlink.appendChild(presentimg);
        tooltip.appendChild(presentlink);
    }

    if (showGuestbook == true) {
        var gbimg = document.createElement("img");
        gbimg.setAttribute('src', 'http://static.goolive.org/media/static/images/butt_edit.gif');
        gbimg.setAttribute('height', '13');
        gbimg.setAttribute('width', '13');
        gblink = document.createElement("a");
        gblink.appendChild(gbimg);
        tooltip.appendChild(gblink);
    }

    if (showBlock == true) {
        var blockimg = document.createElement("img");
        blockimg.setAttribute('src', 'http://static.goolive.org/media/static/images/butt_delete.gif');
        blockimg.setAttribute('height', '13');
        blockimg.setAttribute('width', '13');
        blocklink = document.createElement("a");
        blocklink.appendChild(blockimg);
        tooltip.appendChild(blocklink);
    }
}

function loadParams() {
    showMail = GM_getValue("showMail", true);
    showPresent = GM_getValue("showPresent", true);
    showGuestbook = GM_getValue("showGuestbook", true);
    showBlock = GM_getValue("showBlock", true);
}

function toggleMail() {
    toggle("Mail");
}
function togglePresent() {
    toggle("Present");
}
function toggleGuestbook() {
    toggle("Guestbook");
}
function toggleBlock() {
    toggle("Block");
}
function toggle(entry) {
    var act = GM_getValue("show"+entry);
    GM_setValue("show"+entry, !act);
    eval("show"+entry+" = "+(!act));
    createEntries();
}

function getIdForUser(uname) {

    GM_xmlhttpRequest(
    {
        method: 'GET',
        url: 'http://www.goolive.'+tld+'/index.php?ext=usersuche&action=results&searchstr=username,'+uname,
        onload: function(responseDetails) 
        {
            var searchString = new RegExp("JavaScript:JumpProfile[\(]'"+uname+"','([0-9]+).*", "i");
            var tmp = responseDetails.responseText.match(searchString);
            if (tmp != null) {
                id = tmp[1];
                nameIds[uname] = id;
                if (uname == actUsername) {
                    createLinks();
                }
            }
        },
        onerror: function(responseDetails) 
        {
            ;
        }
    });
}


function createLinks() {
    if (showMail == true)
        messagelink.href = "http://www.goolive."+tld+"/index.php?ext=messenger&show=writemsg&user_id="+id;
    if (showPresent == true)
        presentlink.href = "http://www.goolive."+tld+"/index.php?ext=vcard_presents&action=form&user_id="+id;
    if (showGuestbook == true)
        gblink.href = "http://www.goolive."+tld+"/guestbook"+id+".html";
    if (showBlock == true)
        blocklink.href = "javascript:if(confirm('Wirklich blocken?')){location.href = '/index.php?ext=blocklist&action=add&user_id="+id+"';}";
    actUsername = "";
    showTimeOut = window.setTimeout(showTip, 500);
}

function updateTip(e) {
	if (!e) var e = window.event;
    var pos = findPos(e.target);
    posX = pos[0]-11;
    posY = pos[1]-12;
    hideTip();
    keepTip();
    var href = e.target.getAttribute('href');
    if (href == null) { // in case of <a ...><b>text</b></a> links
        href = e.target.parentNode.getAttribute('href');
    }
    if (href != null) {
        var tmp = href.replace(/[^0-9]+/g, '');
        if (tmp.length == 0) {
            tmp = href.replace(/.*=/g, '');
            actUsername = tmp;
            if (nameIds[tmp] == null) {
                getIdForUser(tmp);
            }
            else {
                id = nameIds[tmp];
                createLinks();
            }
        }
        else {
            id = tmp
            createLinks();
        }
    }
}

function keepTip() {
    window.clearTimeout(hideTimeOut);
}

function hideTip() {
    tooltip.style.display = "none";
}

function showTip() {
    tooltip.style.top = (posY-5)+"px";
    tooltip.style.left = (posX+10)+"px";
    tooltip.style.display = 'block';
}

function cancelTip(e) {
    actUsername = "";
    window.clearTimeout(showTimeOut);
    hideTimeOut = window.setTimeout(hideTip, 800);
}

function replaceLinks()
{
	// Ein Array aller Profillinks holen
	var anchors=xpath("//a[contains(@href, 'JumpProfile')] | //a[contains(@href, 'vcard')]");
	var count=0;
	// href Attribut in jedem <a> Tag auf Javascript Link prüfen und gegebenenfalls durch direkten Link ersetzen.
	for (var i = 0; i < anchors.snapshotLength; i++) 
	{
			var anchor = anchors.snapshotItem(i);
			var href = anchor.href;

			// Prüfen ob der Link die Javascript-Funktion enthält...
			var index = href.indexOf("javascript:JumpProfile('");

			// ...Wenn ja, dann durch einen direkten Link ersetzen    
			if (index == 0) 
			{
				// NOTE Original Link-Format: javascript:JumpProfile('xxxxx','00000');

				// User-ID und Nickname extrahieren
				var id = href.split("'")[3];
				var nick = decodeURI(href.split("'")[1]);

				// Selbes Verhalten wie das Original JumpProfile beibehalten:
				// Bevorzugt User-ID verwenden, wenn keine angegeben ist den Nickname.

				// Link ersetzen
				if (id >=1 ) {
				    anchor.href="http://www.goolive."+tld+"/vcard"+id+".html";
				} else {
				    anchor.href="http://www.goolive."+tld+"/index.php?ext=user_showvcard&username="+nick;
				}
				anchor.addEventListener("mouseover", updateTip, true);
			    anchor.addEventListener("mouseout", cancelTip, true);
			} else {
			    var re = new RegExp(".*(vcard[0-9]+|showvcard).*");
			    if (href.match(re)) {
			        // actions hinzufügen
			        anchor.addEventListener("mouseover", updateTip, true);
			        anchor.addEventListener("mouseout", cancelTip, true);
			    }
			}
	}
}

// ################################
// Helper Functions
// ################################

// source: http://www.quirksmode.org/js/findpos.html
function findPos(obj) {
	var curleft = curtop = 0;
    if (obj.offsetParent) {
        do {
		    curleft += obj.offsetLeft;
		    curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
    }
    return [curleft,curtop];
}

// source: http://diveintogreasemonkey.org/patterns/match-attribute.html
function xpath(query) {
    return document.evaluate(query, document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

