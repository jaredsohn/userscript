// pubmed2connotea
// version 0.4 BETA!
// 2007-04-26
// Copyright (c) 2006, 2007, Pierre Lindenbaum PhD
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// http://www.integragen.com
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.6.4 or later: http://greasemonkey.mozdev.org/
// and Firefox 1.5 : http://www.mozilla.com/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "pubmed2connotea", and click Uninstall.
//
// 2006-07: changed for abstract-plus
// 2007-04: pubmed beta
//
// --------------------------------------------------------------------

// ==UserScript==
// @name          pubmed2connotea
// @namespace     http://www.integragen.com
// @description   insert a shortcut link used to add an entry in http://www.connotea.org or http://www.citeulike.org/ when browsing NCBI pubmed
// @include       http://www.ncbi.nlm.nih.gov/entrez/*
// @include       http://www.ncbi.nlm.nih.gov/sites/*
// @include       http://www.ncbi.nlm.nih.gov/pubmed/*

// ==/UserScript==



function gm_xpath(expression,contextNode)
	{
	return document.evaluate(expression,contextNode,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	}

function getParameter(url,parameter)
	{
	if(url==null) return null;
	parameter=parameter.toLowerCase();
	var a= url.indexOf("?");
	if(a==-1) return null;
	if(url.toLowerCase().indexOf(parameter+"=")==-1) return null;
	var params= url.substring(a+1).split("&");
	var i=0;
	for(i=0;i<params.length;i++)
		{
		b= params[i].indexOf("=");
		if(b==-1) continue;
		var key = params[i].substring(0,b).toLowerCase();
		if(key!=parameter) continue;
		return params[i].substring(b+1);
		}
	return null;
	}

function hasParameter(url,key,value)
	{
	var s= getParameter(url,key);
	return (s!=null && s.toLowerCase() == value.toLowerCase() );
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
}

var prefix="http://www.ncbi.nlm.nih.gov/pubmed/";
var allAnchors = gm_xpath("//a[@href]",document);

var i=0;
var prev=0;

for(i=0; i<allAnchors.snapshotLength; i++)
	{
	a = allAnchors.snapshotItem(i);
	if(a.parentNode==null) continue;
	var href=a.href;

	var index=href.indexOf(prefix);


        var list_uids="null";
	if(index==-1){
	    var templocation=href.indexOf("IdsFromResult");
	    if(templocation!=-1){
		list_uids=getParameter(href,"IdsFromResult");
		index=0;
	    }
	}

	if(index==-1) continue;

		if(href.indexOf("id=Limits")!=-1||
		   href.indexOf("id=Preview/Index")!=-1||
		   href.indexOf("id=History")!=-1||
		   href.indexOf("id=Clipboard")!=-1||
		   href.indexOf("id=Details")!=-1||
		   href.indexOf("filter=review&")!=-1
		   ) continue;		  

		if(list_uids=="null"){

		qlocation=href.indexOf("?");
		if(qlocation!=-1){
		    list_uids=href.substring(35,qlocation);//pmid starts at 35
		}
		}

		if(list_uids!=prev){

		href= "http://www.ncbi.nlm.nih.gov/entrez/query.fcgi?cmd=Retrieve&db=pubmed&dopt=Abstract&list_uids="+list_uids;
	      //href= "http://www.ncbi.nlm.nih.gov/entrez/query.fcgi?cmd=Retrieve&db=pubmed&list_uids="+list_uids;
                prev=list_uids;

	var newanchor = document.createElement("a");
	newanchor.setAttribute("title","insert into www.connotea.org");
	newanchor.setAttribute("target","connotea"+i+list_uids);
	//addpopup?continue=confirm
	//newanchor.setAttribute("href","http://www.connotea.org/addpopup?continue=confirm&uri="+escapeURL(href)+"&button=Look%20Up");
	newanchor.setAttribute("href","http://www.connotea.org/addpopup?continue=confirm&uri="+escapeURL(href));

	var img = document.createElement("img");
	img.setAttribute("alt","insert into www.connotea.org");
	img.setAttribute("src","http://www.connotea.org/connotea_icon.png");
	img.setAttribute("border","0");

	newanchor.appendChild(img);
	//GM_log(a.href);
	a.parentNode.insertBefore(newanchor,a);
	a.parentNode.insertBefore(document.createTextNode(" "),a);

	//now create link for citeulike

	newanchor = document.createElement("a");
	newanchor.setAttribute("title","insert into www.citeulike.org");
	newanchor.setAttribute("target","citeulike"+i);
	newanchor.setAttribute("href","http://www.citeulike.org/posturl?url="+escapeURL(href)+"&title=Entrez%20PubMed");

	img = document.createElement("img");
	img.setAttribute("alt","insert into www.citeulike.org");
	img.setAttribute("src","http://static.citeulike.org/img/note.gif");
	img.setAttribute("border","0");
	
	newanchor.appendChild(img);
	a.parentNode.insertBefore(newanchor,a);
	a.parentNode.insertBefore(document.createTextNode(" "),a);


	//now create link for del.icio.us

	newanchor = document.createElement("a");
	newanchor.setAttribute("title","insert into del.icio.us");
	newanchor.setAttribute("target","delicious"+i);
	newanchor.setAttribute("href","http://del.icio.us/post?url="+escapeURL(href));
	
	img = document.createElement("img");
	img.setAttribute("alt","insert into del.icio.us");
	img.setAttribute("src","http://del.icio.us/favicon.ico");
	img.setAttribute("border","0");
	
	newanchor.appendChild(img);
	a.parentNode.insertBefore(newanchor,a);
	a.parentNode.insertBefore(document.createTextNode(" "),a);
	
		}
	}


window.addEventListener("load", insertAnchors, false);
