// ==UserScript==
// @name           Use title and call number from UTNetCat
// @namespace      http://thomashallock.com/
// @description    Replaces the "Library Storage - Request Online OR ask at Circulation Desk" link on pages served at http://utdirect.utexas.edu/lib/utnetcat/brows.WBX with a link that passes the title and call number of the book to http://utdirect.utexas.edu/lib/utnetcat/lsf_request.WBX
// @include        http://utdirect.utexas.edu/lib/utnetcat/brows.WBX*
// @include        http://utdirect.utexas.edu/lib/utnetcat/index2.WBX*
// ==/UserScript==

// ff extension guid : {28d9410f-1831-43d0-90e5-7f2843affc50}

String.prototype.trim=function(){
    return this.replace(/^\s*|\s*$/g,'');
}

for(i=0; i < document.links.length; ++i) {
	l = document.links[i];
	if((l.href == "javascript:newWindow('lsf_request.WBX');")) {
		//url = "hello";
		url = "http://utdirect.utexas.edu/lib/utnetcat/lsf_request.WBX?s_item_title="+encodeURI(l.parentNode.childNodes[0].nodeValue.trim())+"&s_item_call_number="+encodeURI(l.parentNode.childNodes[10].nodeValue.trim());
		l.href = url;
//	} else {
//	document.write(l.href+"<br />");
	}
}

