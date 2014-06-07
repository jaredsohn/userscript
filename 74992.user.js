// ==UserScript==
// @name           mojvideo video download linker
// @namespace      http://www.digivill.net/~joykillr
// @description    A mojvideo.com video download linker.  Gives a direct download link on mojvideo video page.  No third-party sites used and javascript not needed.
// @include        http://*.mojvideo.com/*
// @include        http://mojvideo.com/*
// ==/UserScript==

//v0.3

function getDocument(url) {
    GM_xmlhttpRequest({
        method:"GET",
        url:url,
        headers:{
            "User-Agent":"Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.1.5) Gecko/20091102 Firefox/3.5.5",
            "Accept":"application/xml,text/xml"
        },
        onload:function(details) {
			hackmnoxml(details.responseText);
        }
    });
}

function hackmnoxml(llb) {
	var hackID = llb.split("\<file\>")[1].split("\<")[0];
	if (hackID) {addhLink(hackID);}
}

function addhLink(nnl) {
	var nn = document.createElement("div");
	//nn.setAttribute("id","hackdlink");
	nn.innerHTML = '\<a\ href\=\"'+nnl+'\"\ style=\"z-index:1000 !important; height: auto !important; font-size:14px!important; color:black!important; text-align:center!important; margin-left:auto!important; margin-right:auto!important; \"\>Direct\ Download\ Link\ \<\/a\>';
	nn.setAttribute("style", "font-size:14px!important;dispay:block!important;visibility:visible!important;height:16px!important;min-width:160px!important;color:white!important;background-color:yellow!important;width:100%!important;margin-left:auto!important;margin-right:auto!important;text-align:center!important;");
	document.body.insertBefore(nn,document.body.firstChild);
}

if (window.content.location.href.match(/\/\w{20}$/)) {
		var hackid = window.content.location.href.match(/\/\w{20}$/).toString();
		hackid = hackid.substr(1);
	if (hackid) {getDocument("http://www.mojvideo.com/playerapi.php?v="+hackid+"&t=1&cache=");}
}
