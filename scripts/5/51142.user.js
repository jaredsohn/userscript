// ==UserScript==
// @name           Pixiv Improvement
// @namespace      http://userscripts.org/users/94335
// @description    Changes action upon clicking an image in Pixiv to directly open the fullsize image in the same tab. Also adds the artist's Pixiv ID on the left under their username.
// @version        2.2
// @include        http://www.pixiv.net/member_illust.php?mode=medium&illust_id=*
// ==/UserScript==

var idLink;
var idNumber;
var thumbnail;
var bigImage;

// Finds the artist's Pixiv ID Number and adds it to the left sidebar
idLink = document.evaluate("//div/h2/span/a[contains(@href,'member.php')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
idNumber = idLink.href.substring(35);
idLink.innerHTML += "<br>(ID# " + idNumber + ")";

// Changes big image links to link directly to the image itself, and changes the target to the current tab
thumbnail = document.evaluate("//div/a[contains(@href,'mode=manga')]/img", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if (thumbnail == null)
{
	thumbnail = document.evaluate("//div/a[contains(@href,'mode=big')]/img", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	bigImage = thumbnail.src.replace(/\?[0-9]+$/,'').replace(/_m(....)$/,'$1');
	thumbnail.parentNode.href = bigImage;
}
thumbnail.parentNode.target = "_self";