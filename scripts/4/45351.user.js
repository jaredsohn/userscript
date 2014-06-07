// ==UserScript==
// @name           Economist Comments Expander
// @namespace      EconomistComments
// @description    Puts all the comments in the economist.com into one page.
// @include        http://www.economist.com/*displayStory.cfm?*mode=comment*
// ==/UserScript==

/*

Before adding a comment it's always good to see if anyone else has voiced similar opinions but the comments on the site are split up into many pages and it takes a long time to load each page.

This script adds an "expand" link next to the "first ...1 2 3.. last" links at the top so you can use a simple ctrl-f to find something in the comments.

*/

nHtml={
FindByXPath:function(obj,xpath) {
	var q=document.evaluate(xpath,obj,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
	if(q && q.singleNodeValue) { return q.singleNodeValue; }
	return null;
}
};

EconomistComments={
AddExpandLink:function() {
	var toppager=nHtml.FindByXPath(document,"//div[contains(@class,'toppager')]");
	if(!toppager) { return false; }
	var ul=toppager.childNodes[0];
	var a=document.createElement('a');
	a.href='javascript:;';
	a.innerHTML='&lt;Expand all pages after this page&gt;';
	a.addEventListener('click',function() {
		EconomistComments.ExpandComments();
	},false);
	var li=document.createElement('li');
	li.appendChild(a);
	li.className='pager-item';
	ul.insertBefore(li,ul.childNodes[0]);
	return true;
},
page:1,
url:'',
stop:0,
ExpandComments:function() {
	this.page=0;
	var url=location.href;

	var m=/page=([0-9]+)/.exec(url);
	if(m && m.length>0) {
		this.page=parseInt(m[1]);
	}
	url=url.replace(/#[^#]*$/,'');
	this.url=url.replace(/page=[0-9]+/g,'');
	this.ExpandCommentsNext();
},
ExpandCommentsNext:function() {
	if(this.stop) { return; }
	var commentsObj=nHtml.FindByXPath(document,"//div[contains(@class,'view-content')]");
	if(!commentsObj) { return; }
//	var commentsRe=new RegExp('view-content(.*)bottompager','m');
	var removeEndRe=new RegExp('</div>[^>]*$','im');
	var removeStartRe=new RegExp('^[^>]*>','im');
	this.page++;
	var page=this.page;
	GM_xmlhttpRequest({
		method:'GET',
		'url':this.url+'&page='+this.page,
		onload:function(response) {
			var div=document.createElement('div');
//			var commentsM=commentsRe.exec(response.responseText);
			var vcIdx=response.responseText.indexOf('view-content');
			var bpIdx=response.responseText.indexOf('bottompager');
			if(vcIdx<0 || bpIdx<0) { return; }
			var html=response.responseText.substring(vcIdx,bpIdx);
//			if(!commentsM || commentsM.length<1) { GM_log(response.responseText.length+","+c+","+b+'could not find comments, page:'+page); return; }
//			var html=commentsM[1];
			html=html.replace(removeEndRe,'');
			html=html.replace(removeStartRe,'');
			div.innerHTML="<b>Page "+(page+1)+"</b><br />"+html;
			//div.className='view-content';
			commentsObj.appendChild(div);
			if(response.responseText.indexOf('pager-next')>=0) {
				EconomistComments.ExpandCommentsNext();
			}
		},
		onerror:function(response) {
			GM_log("Error: "+response.status);
		}
	}
	);
}

};

window.addEventListener("load", function(e) {
	EconomistComments.AddExpandLink();
},false);
