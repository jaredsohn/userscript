// ==UserScript==
// @name           namecheapPR
// @author		dubayou
// @email		dubayou+NameCheapPR@gmail.com
// @namespace      http://www.dubayou.com/
// @description    Display PR along side Domain Name on Namecheap.com
// @include        http://www.namecheap.com/myaccount/domain-list.asp?*
// ==/UserScript==

//Url of images is my Server-Tools.org Server
//It runs most of my web scripts and basic tools to do my daily work.
//Its a slave..
//More stats can be found at 
//http://www.server-tools.org/


function trim(s){
if((s==null)||(typeof(s)!='string')||!s.length)return'';return s.replace(/^\s+/,'').replace(/\s+$/,'')}


//Loop through all domains listed and add pagerank image
var result = document.evaluate( "//input[@type='checkbox']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
if(result.snapshotLength < 1)	return;
for ( var i = 0; i < result.snapshotLength; i++ )
{
	thisElement = result.snapshotItem(i);
	thisText = trim(thisElement.value);
	if(!thisText)	thisText = trim(thisElement.text);
	newElement = document.createElement('span');
	
	newElement.innerHTML = '<img width=80 height=15 src="http://www.prsitecheck.com/pagerank.php?url=http://' + thisText + '&action=image"/>';
	thisElement.parentNode.insertBefore(newElement, thisElement.nextSibling);
}