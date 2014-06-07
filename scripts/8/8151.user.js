// ==UserScript==
// @name          abc.times.lv liberator
// @namespace     http://userstyles.org
// @description	  Show all translations from abc.times.lv dictionary on one page for free 
// @author        Vladekk
// @homepage      http://vladekk.livejournal.com
// @include       http://abc.times.lv/*
// @include       https://abc.times.lv/*
// @include       http://*.abc.times.lv/*
// @include       https://*.abc.times.lv/*
// ==/UserScript==

//parse fetched page to find word
function suck_word_text(text) 
{
   var et=text.substring(text.indexOf("<div style=\"\""));
   var result=et.substring(0,et.indexOf("/div>")+5);
   return result;
}

//fetch page with word using xmlhttprequest and  parse it to find text	
function suck_word(link,inode,i) 
{
	
GM_xmlhttpRequest({
    method: 'GET',
    url: link,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'text/html,text/xml',
    },
    onload: function(responseDetails) {
        var worddiv="<br/>"+i+"."+suck_word_text(responseDetails.responseText);
		
		var newDiv=document.createElement('div')
		newDiv.innerHTML=worddiv;
		inode.parentNode.insertBefore(newDiv,inode);
		
    }
});

}
//before that node words will be inserted 
function insert_node() 
{
var allDivs, thisDiv;
var word;
allDivs = document.evaluate(
	//"//a[@href]",
	"//div[@style='']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	return allDivs.snapshotItem(0).nextSibling;
}

//get total count of words to suck
function suck_count () 
{

allElements = document.getElementsByTagName('div');
for (var i = 0; i < allElements.length; i++) {
    thisElement = allElements[i];
	var pageString=thisElement.innerHTML;
	
	if (thisElement.innerHTML.indexOf("\u041D\u0430\u0439\u0434\u0435\u043D\u043E")!=-1)
	{	
		if (pageString.indexOf("\u041D\u0430\u0439\u0434\u0435\u043D\u043E")!=-1) {
	
			var w1=pageString.indexOf("\u041D\u0430\u0439\u0434\u0435\u043D\u043E") + 8;
			var ns=pageString.substring(w1);
		
			var w2=ns.indexOf("\u0441\u043B\u043E\u0432")-1;
			var wcnt=parseInt(ns.substring(0,w2));
			return wcnt;
	
		}
	}
	
}
}



var inode=insert_node();

var max = suck_count ();

var stub="http://abc.times.lv/index.php?Page=";

for (var i=2;i<=max;i++) 
{	
	suck_word(stub+i,inode,i);
}
