// ==UserScript==
// @name          Wikipedia Copy Cleaner Extension
// @namespace     http://www.geocities.com/scriptrod/wcc
// @description	  Cleaner for wikipedia content (removes links and more). By Hex.
// @include       http://wikipedia.org/*
// @include       http://*.wikipedia.org/*
// ==/UserScript==
// By Hexclecticomicron. 2005.
// Notes: "Interface" in english, for now.
/*
javascript:document.write("<a href='file://D:/wpcopycleaner.user.js'>Wikipedia Copy Cleaner Greasemonkey Firefox Extension</a>");
*/
//
//


  window.get= function(id){
	return document.getElementById(id);
  }

  window.removeNode = function(n){
    if(n.hasChildNodes()) for(var k=0;k<n.childNodes.length;k++)
            n.parentNode.insertBefore(n.childNodes[k].cloneNode(true),n);
    n.parentNode.removeChild(n);
  }

  window.xpath = function(query){
	return document.evaluate(query, document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  }

  window.hd = function(id){var idd=id.style?id:get(id);
	try { idd.style.display="none"; }catch(err){}
  }

 window.clearContent = function(){ var a,i;
	if(get("wcc3").checked)	hd("toc");
	if(get("wcc4").checked){ hd("contentSub");
		hd("jump-to-nav"); hd("siteSub");
		a=xpath("//div[@id='content']//div[@class='editsection']");
		for(i=0;i<a.snapshotLength;i++)hd(a.snapshotItem(i));
	}
	if(get("wcc2").checked){
		if(!get("wcc1").checked){
		a=xpath("//div[@id='content']//a[not(@class='external text')]");
		for(i=0;i<a.snapshotLength;i++) removeNode(a.snapshotItem(i));
		}
		else {
		a=xpath("//div[@id='content']//a");
		for(i=0;i<a.snapshotLength;i++) removeNode(a.snapshotItem(i));
		}
	}
	if(get("wcc1").checked&&!get("wcc2").checked){
		a=xpath("//div[@id='content']//a[@class='external text']");
		for(i=0;i<a.snapshotLength;i++) removeNode(a.snapshotItem(i));
	}
	
	if(get("wcc5").checked){
	a=xpath("//div[@id='content']//div");
	for(i=0;i<a.snapshotLength;i++) 
		if(a.snapshotItem(i).className.substring(0,5)=="thumb")
		hd(a.snapshotItem(i));
	}

  event.preventDefault();
  }

 window.unclearContent = function(){
	get("content").innerHTML=get("originalContent").innerHTML;
  event.preventDefault();
  }


  window.addEventListener("load", function(e) {

var cfg= document.createElement("div");
cfg.className="portlet";
cfg.innerHTML='<h5>Wikipedia Copy Cleaner</h5><div class="pBody"><font size="-2">'+
	'<input id="wcc1" type="checkbox" title="If unchecked, leave external links" checked>Clear External Links<br>'+
	'<input id="wcc2" type="checkbox" title="If unckecked, leave wikipedia links" checked>Clear Wikipedia Links<br>'+
	'<input id="wcc3" type="checkbox" title="Hide completely the Contents table" checked>Hide Contents Table<br>'+
	'<input id="wcc4" type="checkbox" title="Hide \'From Wikipedia...\', redirect ref, jump to, [Edit] links etc." checked>Hide Wikipedia info<br>'+
	'<input id="wcc5" type="checkbox" title="Hide all tables/image tables, etc.">Hide All Tables<br>'+
//	'<input id="wcc6" type="checkbox" title="Enable/Disable Auto-Clear">Auto-Clear<br>'+
	'<input type="button" id="btnClear" value="Clear!"  class="searchButton" title="Cleaner the content."> '+
	'<input type="button" id="btnUnclear" value="Unclear"  class="searchButton" title="Back to uncleaned content."></font>'+
  '</div><div id="originalContent" style="display:none;"></div>';


var srch= get("p-search");
srch.parentNode.insertBefore(cfg, srch.nextSibling);
get("btnClear").addEventListener('click', clearContent, true);
get("btnUnclear").addEventListener('click', unclearContent, true);
get("originalContent").innerHTML=get("content").innerHTML;

  }, false);

