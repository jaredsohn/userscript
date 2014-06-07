// ==UserScript==
// @name            HKGolden Add Google Search
// @description     Add Google Custom Search Engine,keep the default search
// @include         http://forum*.hkgolden.com/*
// ==/UserScript==

// Author:          Self Weight Chu
// Webpage:         https://sites.google.com/site/selfweightchu/
// Version:         0.8
// Date:            2011-05-11



var nform;
var searchArea = document.getElementById("searchstring");
if (searchArea && searchArea.parentNode) {
	var csepath= "http://pastehtml.com/view/1e4mnmp.html";
	var cseId = "005356466777725793158:sg_7mroaxk4";
	
	searchArea = searchArea.parentNode;
	var nf='<input type="hidden" name="cx" value="'+cseId+'"><input type="hidden" name="cof"value="GIMP:009900;T:000000;ALC:FF9900;GFNT:B0B0B0;LC:003F7D;BGC:FFFFFF;VLC:666666;GALT:36A200;FORID:9;"><input name="filter" type="hidden" value="0"><input type="hidden" name="source" value="'+window.location.href+'"/>';
	nform = document.createElement("form");
	nform.innerHTML = nf;
	nform.action = csepath;
    nform.id="nform";
	nform.acceptCharset="UTF-8";
	while (searchArea.hasChildNodes()) {
		nform.appendChild(searchArea.firstChild);
	}
	searchArea.appendChild(nform);
	var submitbtn = document.createElement("a")
	if (window.location.pathname!="/" && window.location.pathname!="/default.aspx") {
	submitbtn.style.display= "block";
	submitbtn.style.float= "right";
	submitbtn.style.styleFloat= "right";
	submitbtn.style.cssFloat="right";
	}
	submitbtn.innerHTML='Google';
	submitbtn.style.background="url(http://www.google.com/images/srpr/nav_logo39.png) bottom";
	submitbtn.style.textDecoration="none";
	submitbtn.style.padding="2px";
	submitbtn.style.border="1px solid #aaa";
	submitbtn.style.color="black";
	submitbtn.href="javascript:document.forms.nform.submit();";
	var searchstring = document.getElementById('searchstring');
	searchstring.name="q";
	var insb4;
	if (window.location.pathname=="/" || window.location.pathname=="/default.aspx") {insb4 = searchstring.nextElementSibling.nextElementSibling} else {insb4 = searchstring.previousElementSibling}
	nform.insertBefore(submitbtn, insb4);
}