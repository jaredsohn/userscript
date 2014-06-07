// ==UserScript==
// @name           outputz4googledocs
// @namespace      outputz4googledocs
// @description    Outputz for Google Docs
// @include        http://docs.google.com/Doc*
// @version        1.1
// @lastupdate     2008/11/23 23:03:00
// ==/UserScript==

// author yasutomo57jp (@gmail.com)

(function(){
	var outputz_key="[enter your outputz key]";




	var outputz_uri="http://docs.google.com";







	var textCount=function(){
		return document.getElementById('wys_frame').contentDocument.body.innerHTML.replace(/<.*?>|\s+/g, '').length
	}

	// text length when loaded
	var count=textCount();

	var post2outputz=function(){
		// text length when unload
		var lastcount=textCount();
		
		var diff = lastcount - count;
		if(diff <= 0) return;

		var request_body = "key="+encodeURIComponent(outputz_key)+"&"
						+ "uri="+encodeURIComponent(outputz_uri)+"&"
						+ "size="+diff;
		
		GM_xmlhttpRequest({
			url:"http://outputz.com/api/post",
			method:"POST",
			headers:{
				"Content-Type":"application/x-www-form-urlencoded",
			},
			data:request_body
		});
		count = lastcount;
		return;
	}
	
	//for save buttons
	document.getElementById('writely-button-save').addEventListener("click",post2outputz,false);
	document.getElementById('w-save').addEventListener("click",post2outputz,false);
	//for window closing
	window.addEventListener("unload",post2outputz,false);
})();

