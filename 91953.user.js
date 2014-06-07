// ==UserScript==
// @name         YMail Neo Fixes
// @namespace    sy1bzbn
// @description  Increases vertical space available in YMail Neo & other version/build specific bugs
// @include      *
// ==/UserScript==
// 
if(/mail.yahoo.com\/neo\//.test(location.href)){
	GM_addStyle('.ad_slug_table,#slot_LREC,#tgtLREC,#tgtMON,#slot_SKY,#tgtSKY,#slot_MON,#slot_MIP4,#uh .upsell{ display:none !important; } #search{ margin-top:9px !important; } #uh .links{ display:none !important; } #ymail-image{ width:240px !important; height:32px !important; } #uh h1{ position:fixed !important; top:40px; right:10px; width:160px !important; overflow:hidden !important; z-index:1; } .withsky #uh h1{ right:170px; } #uh h1 a{ margin:5px 0 0 !important; } .nav-bar .tabs{ padding-left:16px !important; padding-right:160px !important; } .withsky .nav-bar .tabs{ padding-right:320px !important; } .nav-bar{ top:45px !important; } #main{ top:75px !important; } #shellnavigation,#shellcontent{ top:110px !important; } div.withouttoolbar #shellnavigation,div.withouttoolbar #shellcontent{ top:75px !important; } .snippet{ margin-right:24% !important; } #searchweb{ position:absolute; right:3px; top:10px; z-index:1; display:none; }');
	document.getElementById('search').addEventListener('keydown', function(e){
		var evt;
		if(window.event) evt=window.event;
		else if(e) evt=e;
		if(evt.ctrlKey && evt.shiftKey)
			document.getElementById('searchweb').style.display='block';
	}, false); 
	document.getElementById('search').addEventListener('keyup', function(e){
		document.getElementById('searchweb').style.display='none';
	}, false);
	document.getElementById('searchweb').addEventListener('click', function(e){
		document.getElementById('searchweb').style.display='none';
	}, false);
}
if(/\/\/[^.]+.yom.mail.yahoo.net\//.test(location.href)){
	GM_addStyle('.message-header{ min-width:600px !important; } .message-header h3{ margin:15px 200px -2px 29px !important; } .message-header h3 a.subanchor{ width:100% !important; white-space:pre-wrap !important; }');
}
