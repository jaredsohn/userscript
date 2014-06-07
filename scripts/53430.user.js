// ==UserScript==
// @name           Vector Direct
// @namespace      reniris
// @description    Vector Softwear Direct Download
// @include        http://www.vector.co.jp/*
// ==/UserScript==
(function (){
	var down_button = '<img src="http://www.vector.co.jp/images/070801/btn_dl02_o.gif" border="0">'
	
	if(document.URL.indexOf("/filearea/") != -1)
		AddListLink();
	else if(document.URL.indexOf("/soft/") != -1)
		AddSoftLink();
	else if(document.URL.indexOf("/person/") != -1)
		AddPersonLink();
	
	function AddListLink(){
		var linklist = GetXpath('//div[@id="subbody"]/ul[@class="file_list"]/li');
		for( var i=0; i<linklist.snapshotLength; i++){
			SetDirectLink(linklist.snapshotItem(i));
		}
	}
	
	function AddSoftLink(){
		var downurl = GetDirectURL();
		var tagA = document.createElement("a");
		tagA.innerHTML = '<br>' + down_button;
		tagA.href = downurl;
		GetXpath('//div[@id="main"]/div[@class="center_top"]/h1').snapshotItem(0).appendChild(tagA);
	}
	
	function AddPersonLink(){
		var linklist = GetXpath('//table/tbody/tr/td');
		for( var i=0; i<linklist.snapshotLength; i++){
			var a = linklist.snapshotItem(i).getElementsByTagName("a");
			for( var j=0; j<a.length; j++){
				if(a[j].innerHTML != '戻る' && a[j].href.indexOf("http://www.vector.co.jp/soft/") != -1){
					SetPersonLink(a[j])
				}
			}
		}
	}
	
	function SetPersonLink(a){
		GM_xmlhttpRequest({
			method:"GET", 
			url:a.href,
			onload:function(res){
				var doc = ParseHTML(res.responseText);
				
				var tagA = document.createElement("a");
				tagA.innerHTML = down_button +  '<br>';
				tagA.href = GetDirectURL(doc);
					
				a.parentNode.replaceChild(tagA,a.nextSibling);
			}
		});
	}
	
	function ParseHTML(text) {
		var createHTMLDocument = function() {
			var xsl = (new DOMParser()).parseFromString(
				['<?xml version="1.0"?>',
				 '<stylesheet version="1.0" xmlns="http://www.w3.org/1999/XSL/Transform">',
				 '<output method="html"/>',
				 '</stylesheet>'].join("\n"), "text/xml");

			var xsltp = new XSLTProcessor();
			xsltp.importStylesheet(xsl);
			var doc = xsltp.transformToDocument(
				document.implementation.createDocument("", "", null));
			return doc;
		};

		var doc = createHTMLDocument();
		var range = doc.createRange();
		doc.appendChild(doc.createElement("html"));
		range.selectNodeContents(doc.documentElement);
		doc.documentElement.appendChild(
			range.createContextualFragment(text));
		return doc;
	}

	function GetDirectURL(doc){
		return GetXpath("//meta[@name='download']",doc).snapshotItem(0).content;
	}
	
	function SetDirectLink(snapshot){
		var a = snapshot.getElementsByTagName("a");

		GM_xmlhttpRequest({
			method:"GET", 
			url:a[0].href,
			onload:function(res){
				var doc = ParseHTML(res.responseText);
				var durl = GetDirectURL(doc);
				
				var link = document.createElement("a");
				link.innerHTML = 'DOWN!';
				link.href = durl;
				snapshot.appendChild(link);
			}
		});
	}
	
	function GetXpath(query,doc){
		if(doc == undefined)
			doc = document;
			
		return doc.evaluate(query, doc, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	}
})();

