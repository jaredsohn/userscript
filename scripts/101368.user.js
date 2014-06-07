// ==UserScript==
// @name            HKGolden Replace Default Search
// @description     Replace default search to Google Custom Search Engine
// @include         http://forum*.hkgolden.com/*
// ==/UserScript==

// Author:          Self Weight Chu
// Webpage:         https://sites.google.com/site/selfweightchu/
// Version:         0.7
// Date:            2011-04-28




var searchArea = document.getElementById("searchstring");
if (searchArea && searchArea.parentNode && searchArea.parentNode.nodeName == "DIV") {
	var csepath= "http://pastehtml.com/view/1e4mnmp.html";
	var cseId = "005356466777725793158:sg_7mroaxk4";
	var newFrom = '<input type="hidden" name="cx" value="'+cseId+'"><input type="hidden" name="cof"value="GIMP:009900;T:000000;ALC:FF9900;GFNT:B0B0B0;LC:003F7D;BGC:FFFFFF;VLC:666666;GALT:36A200;FORID:9;"><input name="filter" type="hidden" value="0"><input type="hidden" name="source" value="'+window.location.href+'"/><input style="float: left;" name="q" type="text" size="23"><select style="float: left;" name="as_qdr"><option value="all">不限時間</option><option value="d">過去 24 小時</option><optionvalue="w">過去 1 週</option><option value="m">過去 1 個月</option><option value="m3">過去 3 個月</option><option value="m6">過去 6 個月</option><option value="y">過去 1 年</option><option value="y5">過去 5 年</option></select>';
if (window.location.pathname=="/") {newFrom+='<br style="clear:both"/>';}
newFrom+='<input style="float: left;" type="image" name="sa" src="http://forum1.hkgolden.com/images/btn-search.gif"><br style="clear:both"><a style="font-size:x-small" href="/search.aspx">預設搜尋</a></br>'


	searchArea = searchArea.parentNode;
	while (searchArea.hasChildNodes()) {
        searchArea.removeChild(searchArea.firstChild);
    }
	var fm = document.createElement("form");
	fm.action = csepath;
	fm.innerHTML = newFrom;
	fm.acceptCharset="UTF-8";
	searchArea.appendChild(fm);
}