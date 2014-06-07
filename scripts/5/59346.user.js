// ==UserScript==
// @name           ABCNews Media Download Linker
// @namespace      http://www.digivill.net/~joykillr
// @description    This script gives a direct link on ABCNews video pages.  No third-party sites and javascript not needed.
// @include        http://*.abcnews.go.com/*
// @include        http://abcnews.go.com/*
// @include        http://*.media.abcnews.com/*
// @include        http://media.abcnews.com/*
// ==/UserScript==

//v 1.5

function getDocument(url) {
    GM_xmlhttpRequest({
        method:"GET",
        url:url,
        headers:{
            "User-Agent":"Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.1.15) Gecko/20101026 Firefox/3.5.15",
            "Accept":"application/xml,text/xml"
        },
        onload:function(details) {
			l1 = details.responseText.toString().split("media\:content")[1].split("url=\"")[1].split("\"")[0];
			if (l1) {addhLink(l1);}
        }
    });
}

function hackm(ll) {
	if (ll.getElementsByTagName("media:content")[0]) {hID = ll.getElementsByTagName("media:content")[0].getAttribute("url");}
	else {hID = ll.toString().split("media\:content")[1].split("url=\"")[1].split("\"")[0];}
	alert(hID);
	if (hID) {addhLink(hID);}
}

z2="x";n3="m";mr="1\/";f1="r";a3="ss";b9="t";c4="a";r2="ld";ld="d2";xml="data";ss="rm";go="com";
g="a\/";ldg="a\/";ldgg="\=";x="mr";ss="ss";lda="\/";z3=z2; n31="12"; n33="33";i="i";z1=z2; n4=n3;
n2=f1;c4a="\?";c4b="\!";c4e="d";xss=ldgg;a=xss;

function addhLink(nnl) {
	var nn = document.createElement("div");
	nn.innerHTML = '\<a\ href\=\"'+nnl+'\"\ style=\"z-index:10000 !important; height: auto !important; font-size:14px!important; color:black!important; text-align:center!important; margin-left:auto!important; margin-right:auto!important; \"\>Direct\ Download\ Link\ \<\/a\>';
	nn.setAttribute("style", "font-size:14px!important;dispay:block!important;visibility:visible!important;height:16px!important;min-width:160px!important;color:white!important;background-color:yellow!important;width:100%!important;margin-left:auto!important;margin-right:auto!important;text-align:center!important;");
	document.body.insertBefore(nn,document.body.firstChild);
}

function getResponseXML() {
  if(this._responseXML) {return this._responseXML;}
  return this._responseXML = new DOMParser().parseFromString(this.responseText,'text/xml');
}

function isolateID() {
var n10 = document.body.getElementsByTagName("script");
	for (var yy = 0; yy<n10.length; yy++){
		if (n10&&n10[yy].innerHTML) {
			var n11 = n10[yy].innerHTML.toString();
			if (n11&&n11.indexOf('"sectionsVideos"')!=-1) {
				yz = n11.split('"sectionsVideos"')[1].split('videoID=')[1].split("&")[0];
				var n12 = yz.charAt(0);
				if (!n12.match(/[0-9]/)){ 
					yz = yz.split(n12)[1].split(n12)[0];
				}
				break;
			}
		}
	}		
return yz;
}

function initiateReq(n16) {
	var hid = n16.toString();
	if (hid.indexOf("=")!=-1) {hid = hid.split("=")[1];}
	var hiD = window.content.location.host.toString();
	var hId = window.content.location.protocol.toString();
	if (hid&&hId&&hiD) {getDocument(hId+"\/\/"+hiD+lda+z3+n3+r2+c4+b9+ldg+n4+n2+a3+c4a+i+c4e+a+hid);}
}

var n16;

if (window.content.location.href.match(/id\=\d{1,9}/)) {
	n16 = window.content.location.href.match(/id\=\d{1,9}/).toString();
} else if (window.content.location.href.match(/\-\d{1,9}$/)) {
	n16 = window.content.location.href.match(/\-\d{1,9}$/).toString();
	if (n16.charAt(0)=="\-") {n16 = n16.split("\-")[1];}
} else if (window.content.location.href.match(/\-\d{1,9}\?/)) {
	n16 = window.content.location.href.match(/\-\d{1,9}\?/).toString();
	if (n16.charAt(0)=="\-") {n16 = n16.split("\-")[1];}
	if (n16.charAt(n16.length-1)=="\?") {n16 = n16.split("\?")[0];}
} else {n16 = isolateID();}

if (n16!=null&&n16!="") {
	if (n16.indexOf("\=")!=-1) {n16 = n16.split("=")[1];}
	initiateReq(n16);
}
