// ==UserScript==
// @name           WebCat NDC Cloud
// @namespace      http://masao.jpn.org
// @include        http://webcat.nii.ac.jp/cgi-bin/shsproc?id=*
// ==/UserScript==

Object.keys = Object.keys || function(o) {  
	var result = [];  
	for(var name in o) {  
		if (o.hasOwnProperty(name))  
			result.push(name);  
	}
	return result;  
};

(function(){
	var ncid = document.URL.substring( document.URL.lastIndexOf( "?id=" ) + 4 );
	if ( ncid.charAt(0) != "B" )
		return;
	GM_addStyle( 
		"div.ndc-cloud { width:45%; float:right; white-space:normal; }"
		+ "div.ndc-cloud span.cloud-item { padding:10px; font-family: sans-serif; }"
		+ "span.cloud-count  { font-size:xx-small; color: #ccc; }"
		+ "span.cloud-size-1 { font-size:xx-small; }"
		+ "span.cloud-size-2 { font-size:x-small; }"
		+ "span.cloud-size-3 { font-size:small; }"
		+ "span.cloud-size-4 { font-size:medium; }"
		+ "span.cloud-size-5 { font-size:large; }"
		+ "span.cloud-size-6 { font-size:x-large; }"
		+ "span.cloud-size-7 { font-size:xx-large; }"
	);
	var holdings = document.getElementsByTagName( "ol" )[0];
	var list = holdings.innerHTML.split( /\n/ );
	var count = {};
	var min = 0;
	var max = 1;
	for ( var i = 0; i < list.length; i++ ) {
		var matches = list[i].match(/^.*>.*?\b([0-9]{3}(\.[0-9]{1,})?(\-[0-9][0-9]?)?)\b.*$/);
		if ( matches ) {
			var callno = matches[1];
			if (!count[callno]) count[callno] = 0;
			count[callno] += 1;
			min = Math.min(min, count[callno]);
			max = Math.max(max, count[callno]);
		}
	}
	var range = max - min;
	range = Math.max(range, 4);
	var elem = '<div class="ndc-cloud">'
	var keys = Object.keys( count ).sort();
	for ( var i = 0; i < keys.length; i++ ) {
		var size = 1 + Math.round((count[keys[i]] - min) / range * 6);
		elem += '<span class="cloud-item"><span class="cloud-size-'+ size +'" style="font-size:" title="出現回数:'+ count[keys[i]] +'">'+ keys[i] +'<span class="cloud-count">('+ count[keys[i]] +')</span></span></span>\n';
	}
	elem += '</div>';
	holdings.innerHTML = elem + holdings.innerHTML;
})();


