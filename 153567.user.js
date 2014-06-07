// ==UserScript==
// @name           QR-Code2coord.info
// @namespace      http://lifesuche.de/
// @description    Add QR-Code to geocaching.com
// @include        http://www.geocaching.com/seek/cache_details*
// @include        http://www.geocaching.com/map/*
// @include        http://www.geocaching.com/seek/cdpf.aspx*
// @include        http://www.geocaching.com/track/details.aspx*
// @include        http://www.geocaching.com/track/log.aspx*
// @include        http://www.geocaching.com/seek/log.aspx*
// @include        http://www.geocaching.com/geocache/*
// @icon           http://s3.amazonaws.com/uso_ss/icon/153567/large.jpg?1375521367
// @updateURL      http://userscripts.org/scripts/source/153567.user.js
// @version        1.08
// ==/UserScript==

try{
	document.getElementById('pnlDisplay');
	var header=document.getElementById('Header');
	var first	= header.children.item(0);
	var gc = document.getElementsByTagName('h1')[1].innerHTML.trim();
	first.innerHTML='<img style="vertical-align: top;" src="http://www.qrl8.de/qr.php/?d=http%3A%2F%2Fcoord.info%2F'+gc+'&op=0&s=3" border="0"><img src="/images/logo_print_bw.png" alt="Geocaching.com" />';
}
catch(err){
	try{
		var GCElement = document.getElementById('ctl00_ContentBody_LogBookPanel1_CoordInfoLinkControl1_uxCoordInfoCode');
		var GCCode    = GCElement.innerHTML;
		var x = document.createElement('div');
		x.setAttribute('id','QR-Code');
		x.setAttribute('style','position:absolute; top:6px; left:21px;');
		x.innerHTML='<img src="http://www.qrl8.de/qr.php/?d=http%3A%2F%2Fcoord.info%2F'+GCCode+'&op=0&s=3" border="0">';
		document.getElementById('Content').appendChild(x);
	}
	catch(err){
	}
	try{
		var map = document.getElementById('cacheDetailsTemplate');
	  var html = 'Log Visit</span></a><img src="http://www.qrl8.de/qr.php/?d=http%3A%2F%2Fcoord.info/{{=gc}}&op=0&s=3" border="0">';
    map.innerHTML = map.innerHTML.replace('Log Visit</span>', html);
	}
	catch(err){
		var GCElement = document.getElementById('ctl00_ContentBody_CoordInfoLinkControl1_uxCoordInfoCode');
		var GCCode    = GCElement.innerHTML;
		var x = document.createElement('div');
		x.setAttribute('id','QR-Code');
		x.innerHTML='<img src="http://www.qrl8.de/qr.php/?d=http%3A%2F%2Fcoord.info%2F'+GCCode+'&op=0&s=3" border="0">';
		try{
			x.setAttribute('style','position:absolute; top:0px; left:15px;');
			document.getElementById('ctl00_ContentBody_CacheInformationTable').appendChild(x);
		}
		catch(err){
			x.setAttribute('style','position:absolute; top:6px; left:21px;');
			document.getElementById('ctl00_uxBanManWidget').appendChild(x);
		}
	}
}