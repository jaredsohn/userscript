// pubmed2connotea
// version 0.1 BETA!
// 2005-11-24
// Copyright (c) 2005, Pierre Lindenbaum PhD
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// http://www.integragen.com
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.5.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "pubmed2connotea", and click Uninstall.
//
// --------------------------------------------------------------------

// ==UserScript==
// @name          pubmed2connotea
// @namespace     http://www.integragen.com
// @description   append a shortcut link used to add an entry in http://www.connotea.org when browsing NCBI pubmed
// @include       http://www.ncbi.nlm.nih.gov/entrez/*
// ==/UserScript==




function gm_xpath(expression,contextNode)
	{
	return document.evaluate(expression,contextNode,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	}

function getParameter(url,parameter)
	{
	if(url==null) return null;
	var a= url.indexOf("?");
	if(a==-1) return null;
	if(url.indexOf(parameter+"=")==-1) return null;
	var params= url.substring(a+1).split("&");
	var i=0;
	for(i=0;i<params.length;i++)
		{
		b= params[i].indexOf("=");
		if(b==-1) continue;
		var key = params[i].substring(0,b);
		if(key!=parameter) continue;
		return params[i].substring(b+1);
		}
	return null;
	}

function escapeURL(url)
{
var s="";
var i=0;

for(i=0;i< url.length;++i)
{
var c=url.charAt(i)
switch( c )
 {
 case ':': s+= '%3A'; break;
 case '/': s+= '%2F'; break;
 case '?': s+= '%3F'; break;
 case '=': s+= '%3D'; break;
 case '&': s+= '%26'; break;
 default : s+= c; break;
 }
}
return s;
}


function insertAnchors()
{

if(document.getElementsByTagName)
	{
	//hack found at http://erik.eae.net/archives/2005/06/10/22.21.42/#comment-5337
	var inputElements = document.getElementsByTagName("input");
	var i=0;
	for (i=0; inputElements[i]!=null; i++)
		{
		inputElements[i].setAttribute("autocomplete","off");
		}
	}


var prefix ="http://www.ncbi.nlm.nih.gov/entrez/query.fcgi?";
var allAnchors = gm_xpath("//a[@href]",document);



var i=0;
for(i=0; i<allAnchors.snapshotLength; i++)
	{
	a = allAnchors.snapshotItem(i);
	if(a.parentNode==null) continue;
	var href=a.href;	
	
	
	
	var index=href.indexOf(prefix);
	if(index==-1) continue;
	if(getParameter(href,"db")!="pubmed") continue;
	if(getParameter(href,"cmd")!="Retrieve") continue;
	if(getParameter(href,"itool")!=null) continue;
	
	var list_uids=getParameter(href,"list_uids");
	if(list_uids==null || list_uids.indexOf(",")!=-1) continue;
	
	var newanchor = document.createElement("a");
	newanchor.setAttribute("title","insert into www.connotea.org");
	newanchor.setAttribute("target","connotea"+i);
	newanchor.setAttribute("href","http://www.connotea.org/add?uri="+escapeURL(href)+"&button=Look%20Up");
	
	var img = document.createElement("img");
	img.setAttribute("alt","insert into www.connotea.org");
	img.setAttribute("src","http://www.connotea.org/connotea_icon.png");
	img.setAttribute("border","0");
	
	newanchor.appendChild(img);
	a.parentNode.insertBefore(newanchor,a);
	a.parentNode.insertBefore(document.createTextNode(" "),a);
	
	}
}


window.addEventListener("load", insertAnchors, false);





