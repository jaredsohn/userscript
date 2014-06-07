/*
 * Title:  GMAIL Make it Comfortable [v0.1]
 * Description: Greasemonkey script for Firefox to change the appearance of GMail.
 * Author: KAFLAN
 * Updated: 4/2/2007
 *
 */

// ==UserScript==
// @name           GMAIL Make it Comfortable [v0.1]
// @namespace      http://kaflan/gmailmic
// @description    Make your GMAIL more comfortable for reading messages. Hide adds, stretch message window for necessary size, and other fixes. Author: Dmitry Kaflan. E-Mail: kaflan@mail.ru, ICQ: 195007021, MSN: kaflan@atis.ws, Skype: kaflan.
// @include        http://mail.google.com/*
// ==/UserScript==

function getNodeByTagAndAttribute(tag, attrName, attrValue, nodeToSearch)
{
	var node = document.evaluate("//" + tag + "[@" + attrName + "='" + attrValue + "']", 
		nodeToSearch == null ? document : nodeToSearch, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );

	return node.singleNodeValue;
}

try
{
// Removing google ads
var rh = getNodeByTagAndAttribute('DIV', 'id', 'rh');
if (rh != null)
	rh.parentNode.removeChild(rh);

// Resizing message content
var fic = getNodeByTagAndAttribute('DIV', 'id', 'fic');
if (fic != null)
	fic.style.marginRight = 0;

// Resizing answer text box
var tbTableTd = getNodeByTagAndAttribute('td', 'style', 'height: 100%; width: 80ex;', fic); //document.evaluate("//td[@style='height: 100%; width: 80ex;']", fic, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
if (tbTableTd != null)
	tbTableTd.style.width = "100%";

// Resizing gray line
var lnTableDiv = getNodeByTagAndAttribute('div', 'style', 'border-top: 2px solid rgb(170, 170, 170); width: 50%;', fic);
if (lnTableDiv != null)
	lnTableDiv.style.width = "100%";

// Moving "answer" menu
window.addEventListener("mousedown", attachAnswerMenuEvent, false);

//Fixes google defect: "answer" menu didnt move to necessary place after resizing
window.addEventListener("resize", resizeEvent, false);

}
catch (e)
{
	alert("Something going wrong with GMAIL_Make_it_Comfortable (v0.1) script (Greasemonkey).\r\n" +
		"May be google change this page, so script cant recognize it. Contact script developer for update.\r\n" +
		"E-mail: kaflan@mail.ru, ICQ: 195007021, Skype: kaflan, MSN: kaflan@atis.ws");
}

function resizeEvent()
{
	var awMenuSpan = getNodeByTagAndAttribute('span', 'id', '_so_1');
	var pos = findPos(awMenuSpan);
	var awMenuDiv = getNodeByTagAndAttribute('div', 'id', 'om_1');
	awMenuDiv.style.left = pos[0] + awMenuSpan.scrollWidth - 5 - awMenuDiv.clientWidth;
}

function attachAnswerMenuEvent()
{
	var awMenuSpan = getNodeByTagAndAttribute('span', 'id', '_so_1');
	if (awMenuSpan != null)
		awMenuSpan.addEventListener("click", moveMenu, false);
}

function moveMenu()
{
	var pos = findPos(this);
	var awMenuDiv = getNodeByTagAndAttribute('div', 'id', 'om_1');
	awMenuDiv.style.left = pos[0] + this.scrollWidth - 5 - awMenuDiv.clientWidth;
}

function findPos(obj) 
{
	var curleft = curtop = 0;
	if (obj.offsetParent) 
	{
		curleft = obj.offsetLeft
		curtop = obj.offsetTop
		while (obj = obj.offsetParent) 
		{
			curleft += obj.offsetLeft
			curtop += obj.offsetTop
		}
	}
	return [curleft,curtop];
}
