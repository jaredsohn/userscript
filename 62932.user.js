// ==UserScript==
// @name           NMA-TV Direct Video Download Link
// @namespace      http://www.digivill.net/~joykillr
// @description    Gives a direct video download link on NMA-TV video page.
// @include        http://*.nmatv.com/video/*
// @include        http://nmatv.com/video/*
// ==/UserScript==

//v 1.1

function getResponseXML() {
  if(this._responseXML) {return this._responseXML;}
  return this._responseXML = new DOMParser().parseFromString(this.responseText,'text/xml');
}

function getDat(x) {
	GM_xmlhttpRequest({
		method:"GET",
		url:x,
		headers:{
			"User-Agent":"Mozilla/5.0 (Windows; U; Windows NT 5.1; en-GB; rv:1.8.1.6) Gecko/20070725 Firefox/2.0.0.6",
            "Accept":"application/xml,text/xml"
		},
		onload:function(details) {
			//details.responseXML getter = getResponseXML;
			//var ul = details.responseXML;
			//hackm(ul);
			var URLstring = new String(details.responseText);
			if (URLstring!=null&&URLstring!="") {
				//alert(URLstring);
				var l = isolate(URLstring);
				addDLLink(l);
			}
		}
	});
}


function hackm(llll) {
	if (llll.getElementsByTagName("file")[1]) {
		//hID = llll.getElementsByTagName("urlMOV1")[0].textContent.toString();
		hID = llll.getElementsByTagName("file")[1].innerHTML.toString();
		hID = hID.replace("\n","").replace("\ ","").replace("\<WBR\/\>","");
	}
	if (hID!=null&&hID!="") {addDLLink(hID);}
}

function isolate(u){
	u = u.split('\<\/track\>')[1];
	u = u.split('\<file\>')[1].split('\<\/file\>')[0];
	return u;
}

function addDLLink(lnlnl) {
	var lnnl = document.createElement("div");
	//nn.setAttribute("id","vid_dl_link");
	lnnl.innerHTML = '\<a\ href\=\"'+lnlnl+'\"\ style=\"z-index:10000 !important; height: auto !important; font-size:14px!important; color:black!important; text-align:center!important; margin-left:auto!important; margin-right:auto!important; \"\>Direct\ Download\ Link\ \<\/a\>';
	lnnl.setAttribute("style", "font-size:14px!important;dispay:block!important;visibility:visible!important;height:16px!important;min-width:160px!important;color:white!important;background-color:yellow!important;width:100%!important;margin-left:auto!important;margin-right:auto!important;text-align:center!important;");
	document.body.insertBefore(lnnl,document.body.firstChild);
}

//if (window.content.location.href.match(/video/i)) {
	var hid = window.content.location.href.match(/video\/[0-9]{1,8}/i).toString();
	hid = hid.split("/")[1];
	//alert(hid);
	var hiD = window.content.location.host.toString();
	var hId = window.content.location.protocol.toString();
	var idg = document.getElementsByTagName("script");
	for (var idga = 0; idga<idg.length; idga++) {
		if (idg[idga].textContent.indexOf("nv='http://www.nmatv.com/nv/")!=-1) {
			idg = idg[idga].textContent.toString();
			idg = idg.split("nv='")[1].split("'")[0];
			idg = idg.split("/");
			idg = idg[idg.length-1];
			//alert(idg);
			break;
		}
	}
	
	if (idg&&hId&&hiD) {
		if (typeof GM_xmlhttpRequest!="undefined") {getDat("http://www.nmatv.com/nuevonew/playlist.php?key="+idg)}
	else {addDLLink("http://www.nmatv.com/flvideo/"+hid+".flv");}
	}
