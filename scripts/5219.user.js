// Digg Comment Threshold Fix
// v0.1 BETA
// Copyright (c) 2006, Joris Roovers
// Last updated: 18/08/2006
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
// Many thanks to http://diveintogreasemonkey.org/ for great Tutorials and examples
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Digg Comment Threshold Fix
// @namespace     http://www.jorisroovers.com/index.php?lang=EN
// @description   Digg Comment Threshold Fix
// @include       http://digg.com/*
// @include       http://*.digg.com/*
// ==/UserScript==

var min_comment_rate=0; // Minimum Comment Rate - All comments with a lower rate will be closed - Adjust at will
var allLinks, thisLink;
var comment_id=Array();
var number_of_diggs=Array();
var stories_to_hide=Array();
allLinks = document.evaluate('//li[@id]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

for (var i = 0; i < allLinks.snapshotLength; i++) 
{
    thisLink = allLinks.snapshotItem(i);
	if (thisLink.id[0]=="c") // filter out all comments
	{
		var len=thisLink.id.length-1;
		cid=thisLink.id.substr(1,len);//comment id
		comment_id.push(cid);
	}
}

for(j=0;j<=(comment_id.length-1);j++)
{
	if(document.getElementById('strong-'+comment_id[j]))	
	{
	number_of_diggs[j]=document.getElementById('strong-'+comment_id[j]).innerHTML;
	}
}

for(h=0;h<=(number_of_diggs.length-1);h++)
{
	diggs=number_of_diggs[h].replace(/diggs/,"");
	diggs=diggs.replace(/digg/,"");
	diggs=parseInt(diggs.replace(/ /g,""),10);
	if (diggs < min_comment_rate)
	{
		stories_to_hide.push(comment_id[h]);
	}
}

for(k=0;k<=(stories_to_hide.length-1);k++)
{
	// Lay-out adjustments to digg
	var element=document.getElementById('c'+stories_to_hide[k]);
	element.className="c-bury";
	element=document.getElementById('cbody'+stories_to_hide[k]);
	element.setAttribute('style','display:none;');
	element=document.getElementById('colorthumbs'+stories_to_hide[k]);
	element.setAttribute('style','display:none;');
	element=document.getElementById('graythumbs'+stories_to_hide[k]);
	element.removeAttribute('style');
	element=document.getElementById('cshowlink'+stories_to_hide[k]);
	element.removeAttribute('style');
	element.innerHTML=element.innerHTML.replace(/comment buried/,"below viewing threshold");
}