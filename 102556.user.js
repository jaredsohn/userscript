// ==UserScript==
// @name                   	CiteULike - Automatic Attachments Preview
// @include 			   	http://www.citeulike.org/user/*
// @exclude 				http://www.citeulike.org/user/*/*
// @description            	Automatically reveals hidden image attachments.
// @version                	1.0
// @license                	GPL version 3 or any later version (http://www.gnu.org/copyleft/gpl.html)
// @author		           	dkitty ( http://userscripts.org/users/dkitty )
// @usoscript      			102556
// ==/UserScript==

if (document.getElementById('CiteULikeAAP'))
{
	return;
}

var attachments = document.evaluate("//a[contains(concat(' ',@class,' '),' article-item-attachment-preview ')]", 
							document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
							
var i = attachments.snapshotLength;
var attachmentElem;
var imgDivElem, imgElem;

while(i--)
{
	attachmentElem = attachments.snapshotItem(i);
	
	imgElem = document.createElement('img');
	imgElem.src = attachmentElem.getAttribute('class').match(/'link': '(.*?)'/)[1];
	
	imgDivElem = document.createElement('div');
	imgDivElem.id = 'CiteULikeAAP';
	imgDivElem.appendChild(imgElem);
	imgDivElem.appendChild(document.createElement('hr'));
	
	attachmentElem.parentNode.parentNode.parentNode.appendChild(imgDivElem);
}
