// ==UserScript==
// @name           Rapidshare Download Delay Bypass
// @namespace      http://www.digivill.net/~joykillr
// @description    Script for bypassing rapidshare countdown.  Allows use of Rapidshare without javascript enabled.  Does not bypass the 15 minute wait period between downloads.
// @include        http://*.rapidshare.com/*
// @include        http://rapidshare.com/*
// @include        http://*.rapidshare.de/*
// @include        http://rapidshare.de/*
// @include        https://*.rapidshare.com/*
// @include        https://rapidshare.com/*
// ==/UserScript==
// v 3.1b - 20110418

var getIt, DLbox;
function insertBox(passData) {
	DLbox = document.createElement("div");
	DLbox.innerHTML = passData;
	document.getElementById("inhaltbox").insertBefore(DLbox, document.getElementById("inhaltbox").firstChild);
	
	GM_addStyle("#dl,#premiumtable2{display:none!important;}");
}

function xpath(doc, xpath) {
	return doc.evaluate(xpath, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}
	
function getUrl(url, noLoad) {
	GM_xmlhttpRequest({
		method:"GET",
		url:url,
		headers:{
			"User-Agent":"Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.1.5) Gecko/20091102 Firefox/3.5.5",
            "Accept":"application/xml,text/xml"
		},
		onload:function(details) {
			var URLstring = new String(details.responseText);
			if (URLstring.indexOf("ERROR")!=-1) {
				if (URLstring.indexOf("Download ticket not ready.")!=-1) {
					addDLNotice("Wait 10 seconds and RELOAD/REFRESH the page");
				} else if (URLstring.match(/\d\ seconds/mi)) {
					addDLNotice(URLstring.match(/You\ need\ to\ wait\ \d{1,4}\ seconds/mi)+" and try again");
				} else if (URLstring.match(/download\ slots/mi)) {
					addDLNotice("No D/L Slots - Wait 1-2 minutes and RELOAD/REFRESH the page");
				} else if (URLstring.match(/Please\ stop\ flooding/mi)) {
					addDLNotice("Free D/L Slots still blocked - Wait 1 minute and RELOAD/REFRESH the page");
				} else if (URLstring.match(/RapidPro\ to\ download\ more\ files\ from\ your\ IP\ address/mi)) {
					addDLNotice("Your IP address is already downloading a file.");
				} else {addDLNotice("Unspecified Error - Try Again");} 
			} else if (URLstring!=null&&URLstring!="") {
				var l = createRSLink(URLstring.toString(), url);
				if (l!="nothingtodo") {
				addDLLink(l);
					/*if (noLoad=="load") {window.content.location.replace(encodeURI(l)); addDLLink(l);}
					else {addDLLink(l);}*/
				}
			}
		}
	});
}

function addDLNotice(n) {
var nm = document.createElement("div");
	nm.innerHTML = '\<a\ href\=\"\"\ style=\"z-index:65532 !important; height: auto !important; font-size:14px!important; color:black!important; text-align:center!important; margin-left:auto!important; margin-right:auto!important; \"\>'+n+'<\/a\>';
	nm.setAttribute("style", "font-size:14px!important;dispay:block!important;visibility:visible!important;height:16px!important;min-width:160px!important;color:white!important;background-color:yellow!important;width:100%!important;margin-left:auto!important;margin-right:auto!important;text-align:center!important;");
	document.body.insertBefore(nm,document.body.firstChild);
}

function addDLLink(l) {
if (!document.getElementById("hackdlink")) {
	var nn = document.createElement("div");
	nn.setAttribute("id","hackdlink");
	nn.innerHTML = '\<table\>\<tbody\>\<tr\>\<td\>\<a\ href\=\"'+l+'\"\ style=\"z-index:65534 !important; height: auto !important; font-size:14px!important; color:black!important; text-align:center!important; margin-left:auto!important; margin-right:auto!important; overflow:visible !important; position:fixed !important; top: 0 !important; left: auto !important; right: auto !important; \"\>Direct\ Download\ Link\ \<\/a\>\<\/td\>\<\/tr\>\<\/tbody\>\<\/table\>\<br \/\>\<br \/\>\<br \/\>';
	nn.setAttribute("style", "font-size:14px!important;dispay:block!important;visibility:visible!important;height:16px!important;min-width:160px!important;color:white!important;background-color:yellow!important;width:100%!important;margin-left:auto!important;margin-right:auto!important;text-align:center!important; overflow:visible !important; position:fixed !important; top: 0 !important; left: auto !important; right: auto !important;");
	document.body.insertBefore(nn,document.body.firstChild);
}}

function createRSLink(rsl, u) {
if (rsl) {
	if (rsl.indexOf("RSAPIDispatcher(")!=-1) {
		rsl = rsl.split("RSAPIDispatcher(")[1];
		rsl = rsl.split('"')[1].split('"')[0];
	}
	var rshost = rsl.split('DL:')[1].split(',')[0];
	var rsauth = rsl.split(',')[1].split(',')[0];
	var rsid = u.split('fileid=')[1].split('&')[0];
	var rsfn = u.split('filename=')[1].split('&')[0];
	var rslink = "http://"+rshost+"/cgi-bin/rsapi.cgi?sub=download_v1&editparentlocation=0&bin=1&fileid="+rsid+"&filename="+rsfn+"&dlauth="+rsauth;
	if (rsfn!=""&&rsauth!=""&&rsid!=""&&rshost!=""&&rshost.indexOf("rapidshare")!=-1) {
		return rslink;
	} else {
		return "nothingtodo";
	}
	}
}

function procNewRS(noLoad) {
GM_addStyle("#rs2010 {top: 16 !important;")
var newRSpoof, newRSLink;
	if (document.location.href.indexOf("rapidshare.com/files/")!=-1) {
		newRSpoof = document.location.href.split("rapidshare.com/files/")[1];
		newRSpoofID = newRSpoof.split("/")[0];
		newRSpoofFN = newRSpoof.split("/")[1];
	} else if (document.location.href.indexOf("#!download")!=-1) {
		newRSpoof = document.location.href.split("#!download")[1];
		newRSpoof = newRSpoof.split("|");
		newRSpoofID = newRSpoof[2];
		newRSpoofFN = newRSpoof[3];
	} else if (document.body.innerHTML.indexOf("#!download")!=-1) {
		newRSpoof = document.body.innerHTML.split("#!download")[1];
		newRSpoof = newRSpoof.split("|");
		newRSpoofID = newRSpoof[2];
		newRSpoofFN = newRSpoof[3];
	}
if (newRSpoof!=null&&newRSpoof!="") {
	newRSLink = "http://api.rapidshare.com/cgi-bin/rsapi.cgi?sub=download_v1&fileid="+newRSpoofID+"&filename="+newRSpoofFN;
}
if (newRSLink!=null&&newRSLink!="") {getUrl(newRSLink, noLoad)}
}

if (document.getElementById("dl")) {
	var screlms = document.getElementsByTagName("script");
	for (screx=0;screx<screlms.length;screx++) {
		if (screlms[screx].textContent.indexOf('form name="dlf"')!=-1){
			getIt = screlms[screx].textContent.toString();
			break;
			}
		}
	if (getIt.indexOf("unescape('")!=-1) {
		getIt = getIt.split("unescape('")[1].split("')")[0];
		getIt = unescape(getIt);
	} else {
		getIt = getIt.split('var tt = \'')[1].split('\<\/form>\';')[0];getIt = getIt + "\<\/form\>";
		getIt = getIt.replace(/\'\s*\+\s*\'/gim,'');
	}
	if (getIt!=null&&getIt!="") {insertBox(getIt);} //else {procNewRS();}
} else {procNewRS("load");}
//} else if (window.content.location.href.indexOf("http://rs")==-1) {procNewRS("load");}
//if (document.getElementById("js_downloaderror")) {
	if (document.body.textContent.indexOf("Download ticket not ready")!=-1) {
	var p = document.createElement("p");
	p.textContent = "SERVER-SIDE DELAY STILL ACTIVE - WAIT 15 SECONDS AND RELOAD THIS PAGE! KEEP TRYING!"
	document.body.appendChild(p);
		//procNewRS("noload");
	}