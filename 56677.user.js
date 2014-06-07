// ==UserScript==
// @name           vimeo video download linker
// @namespace      http://www.digivill.net/~joykillr
// @description    A working video download linker.  Gives a direct download link on vimeo video page.  No third-party sites used and javascript not needed.
// @include        http://*.vimeo.com/*
// @include        http://vimeo.com/*
// ==/UserScript==

// 1.5

var hackauth, hackTTL, hackID;

function getDocument(url) {
    GM_xmlhttpRequest({
        method:"GET",
        url:url,
        headers:{
            "User-Agent":"Mozilla/5.0 (Windows; U; Windows NT 5.1; en-GB; rv:1.8.1.6) Gecko/20070725 Firefox/2.0.0.6",
            "Accept":"application/xml,text/xml"
        },
        onload:function(details) {
			//details.responseXML getter = getResponseXML;
			//var ul = details.responseXML;
			//hackm(ul);
			hackmnoxml(details.responseText);
        }
    });
}

function hackm(ll) {
	if (ll.getElementsByTagName("request_signature")[0]&&ll.getElementsByTagName("request_signature_expires")[0]&&ll.getElementsByTagName("nodeId")[0]) {
		hackauth = ll.getElementsByTagName("request_signature")[0].textContent.toString();
		hackTTL = ll.getElementsByTagName("request_signature_expires")[0].textContent.toString();
		hackID = ll.getElementsByTagName("nodeId")[0].textContent.toString();
	}
	if (hackTTL&&hackauth&&hackID) {addhLink("http://vimeo.com/moogaloop/play/clip:"+hackID+"/"+hackauth+"/"+hackTTL);}
}

function hackmnoxml(llb) {
	hackauth = llb.split("request_signature\>")[1].split("\<")[0];
	hackTTL = llb.split("request_signature_expires\>")[1].split("\<")[0];
	hackID = llb.split("nodeId\>")[1].split("\<")[0];
	if (hackTTL&&hackauth&&hackID) {addhLink("http\:\/\/vimeo.com\/moogaloop\/play\/clip\:"+hackID+"\/"+hackauth+"\/"+hackTTL+"\/\?q=sd");}
}

function addhLink(nnl) {
	var nn = document.createElement("div");
	//nn.setAttribute("id","hackdlink");
	nn.innerHTML = '\<a\ href\=\"'+nnl+'\"\ style=\"z-index:1000 !important; height: auto !important; font-size:14px!important; color:black!important; text-align:center!important; margin-left:auto!important; margin-right:auto!important; \"\>Direct\ Download\ Link\ \<\/a\>';
	nn.setAttribute("style", "font-size:14px!important;dispay:block!important;visibility:visible!important;height:16px!important;min-width:160px!important;color:white!important;background-color:yellow!important;width:100%!important;margin-left:auto!important;margin-right:auto!important;text-align:center!important;");
	document.body.insertBefore(nn,document.body.firstChild);
}

function getResponseXML() {
  if(this._responseXML) {return this._responseXML;}
  return this._responseXML = new DOMParser().parseFromString(this.responseText,'text/xml');
}

if (window.content.location.href.match(/vimeo.com\/\d{1,8}/)) {
	if (document.getElementById("clip_id")) {var hackid = document.getElementById("clip_id").getAttribute("value");}
	else {var hackid = window.content.location.href.match(/\d{1,8}$/)}
	if (hackid) {getDocument("http://vimeo.com/moogaloop/load/clip:"+hackid);}
}