// <![CDATA[
// ==UserScript==
// @name           Cuil with Google Search Option
// @namespace      http://html-apps.com/greasemonkey/cuil
// @description    Adds a Google search option to cuil.com results
// @include        http://*.cuil.com/*
// @include        https://*.cuil.com/*
// @license        http://creativecommons.org/licenses/by-sa/3.0/us/
// @version        5
// ==/UserScript==

var f = document.getElementById('form_q');
var t = document.getElementById('fld_q');
var s = document.createElement('span');
s.id='google_search_span';
s.innerHTML='<button onClick="window.location.href=\'http://www.google.com/search?q='+(encodeURIComponent(t.value)).replace(/'/,'\\\'')+'\';return false;">Google</button>';
f.appendChild(s);

var strTarget1='No results';
var strTarget2='Did you mean';
var blnFound=false;
function searchWithinNode(objNode,strTextToFind)
{
	var pos,skip,spannode,middlebit,endbit,middleclone;
	skip=0;
	if(objNode.nodeType==3)
	{
		console.log(objNode.data.toUpperCase());
		pos=objNode.data.toUpperCase().indexOf(strTextToFind.toUpperCase());
		if(pos>=0)
		{
			blnFound=true;
			skip=1;
		}
	}
	else if(objNode.nodeType==1&&objNode.childNodes&&objNode.tagName.toUpperCase()!="SCRIPT"&&objNode.tagName.toUpperCase!="STYLE")
	{
		for(var child=0;child<objNode.childNodes.length;++child)
		{
			child=child+searchWithinNode(objNode.childNodes[child],strTextToFind);
		}
	}
	return skip;
}
searchWithinNode(document.body,strTarget1);
if(blnFound)
{
	blnFound=false;
	searchWithinNode(document.body,strTarget2);
	if(!blnFound) window.location.href='http://www.google.com/search?q='+encodeURIComponent(t.value);
}

// ]]>
