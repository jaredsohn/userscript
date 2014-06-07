// ==UserScript==
// @name           Photobucket Video Download Link
// @namespace      http://mywebsite.com/myscripts
// @description    Adds a download link for videos on photobucket.com
// @include        http://*.photobucket.com/*
// @include        http://photobucket.com/*
// ==/UserScript==
// v1.8

function getDocument(url) {
    GM_xmlhttpRequest({
        method:"GET",
        url:url,
        onload:function(details) {
			details.responseXML getter = getResponseXML;
			var u = details.responseXML.getElementsByTagName("asset");
			isolatePaths(u);
		}
    });
}

function isolatePaths(u) {
	var i; var b = new Array(); var bc = 0;
	for (i = 0; i<u.length; i++) {
		var atChk = u[i].getAttribute("path");
		if (atChk.match(/.flv$/i)) {
			b[bc] = atChk;
			bc = bc + 1;
		}
	}
	addLinks(b);
}

function addLinks(b) {
	var dv = document.createElement("div");
	dv.setAttribute("id", "dldivtop");
	for (bc = 0; bc<b.length;bc++) {
		var newOb = document.createElement("a");
		//newOb.id = 'dldiv'+bc;
		newOb.setAttribute("id", "dldiv"+bc);
		//newOb.href = 'http\:\/\/'+b[bc];
		newOb.setAttribute("href", "http\:\/\/"+b[bc]);
		newOb.setAttribute("style", "display:block!important; visibility: visible !important; z-index:10001!important; height:16px!important; width: auto !important; font-size:14px !important; color:black!important; background-color:#dddddd !important; margin-left:auto!important; margin-right:auto!important; text-align:center!important; font-size:94%!important; border: 1px dotted #bbbbbb !important;");
		newOb.textContent = "Possible Download Link";
		if ((b.length==3 && bc==1)||(b.length==5 && bc==3)||(b.length==1 && bc==0)) {
			newOb.textContent = "Probable Download Link";
			newOb.setAttribute("style", "font-size:116%!important; font-weight:bold!important; border: 1px dotted #bbbbbb !important; color:black!important; background-color:#ffcc22 !important; margin-left:auto!important; margin-right:auto!important; text-align:center!important; width: auto !important; display:block!important; visibility: visible !important; z-index:10001!important;");
		}
		dv.appendChild(newOb);
	}
	dv.setAttribute("style", "display:block!important; visibility: visible !important; z-index:10000!important; min-height:16px!important; min-width:160px!important; width:100%!important; background-color:yellow !important; color: white!important; text-align:center!important; margin-left:auto!important; margin-right:auto!important;");
	//document.body.insertBefore(dv, document.body.firstChild);
	if (document.getElementById("photoMetaData")) {var p = document.getElementById("photoMetaData");} else {var p = document.getElementById("mediaDescript");}
	p.insertBefore(dv, p.firshChild);
}

// thanks to ?	
function getResponseXML() {
  if(this._responseXML) {
    return this._responseXML;
  }
  return this._responseXML = new DOMParser().parseFromString(this.responseText,
      'text/xml'); // not sure if this should be application/xml - text/html is used for compatibility with normal XMLHttpRequest
}

var wclh = window.content.location.href.toString();
if (wclh.match(/\.pbr/)) {
	var a = document.getElementById("fullSizeCell").getElementsByTagName("script")[0];
	a = a.textContent.toString();
	a = a.split("SWFObject(")[1].split(";")[0];
	a = a.split("=")[1].split("&")[0];
	getDocument(unescape(a));
} else if (wclh.search("mediadetail")!=-1) {
	var a = unescape(wclh);
	a = a.split("file=")[1].split("&")[0];
	a = a.split("://")[1];
	var b = new Array(a);
	addLinks(b);
}
