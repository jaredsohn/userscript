// ==UserScript==
// @name do.del.icio.us
// @description Add a link and description to your del.icio.us feed using this handy keyboard shortcut [Ctrl+Shift+D]
// @namespace http://os.coretxt.net.nz/gm
// @include *
// ==/UserScript==

	/**
	 * @version       0.2 (alpha)
	 * @update        14/06/05 - added test for response failure
	 * @todo          (0.3) tag suggestion dialog
	 * @todo          ADD LICENSE INFORMATION
	 */

	function doDelicious() {
		var delPostTags = prompt("do.del.icio.us: Tags for this post:");
		
		if (delPostTags) {
		
		var delPostUrl = "http://del.icio.us/api/posts/add?";
		
		var delPostValues = [
			"url=" + window.location,
			"description=" + document.title,
			"tags=" + delPostTags,
			"extended=" + window.getSelection(),
			"dt=" + getISO8601Date()	
		];
		
		var delRequest = delPostUrl + encodeURI(delPostValues.join("&"));
		
		GM_xmlhttpRequest({
			method: "GET",
			url: delRequest,
			headers: { 
				"User-Agent":"core.os - greasemonkey",
    			"Accept":"text/html,text/xml"
			},
			onreadystatechange:function(http) {
				if (http.readyState == 4) {
					switch(http.status) {
						case 200:
						  if (/something went wrong/.test(http.responseText)) {
						      alert("del.icio.us: Something went wrong");
						  } else {
						  	  alert("Your post to del.icio.us was successful");
						  }
						  break;
					}
				}
			}
		});
		
		}
	}

	function getISO8601Date() {
		// based on Date.toISO8601String prototype by Paul Sowden
		// http://delete.me.uk/2005/03/iso8601.html
		var date = new Date();
		var zeropad = function(n) { return ((n < 10) ? '0' : '') + n; }
		var d = "";
		d += date.getUTCFullYear();
		d += "-" + zeropad(date.getUTCMonth() + 1);
		d += "-" + zeropad(date.getUTCDate());
		d += "T" + zeropad(date.getUTCHours()) + ":" + zeropad(date.getUTCMinutes());
		d += ":" + zeropad(date.getUTCSeconds()) + 'Z';
		return d;
	}

	function catchKey(e) {
		if (e.shiftKey && e.ctrlKey) {
			switch (e.keyCode) {
				case 68: doDelicious(); break;
			}
		}
	}

	GM_registerMenuCommand("do.del.icio.us Ctrl+Shift+D", doDelicious);

	window.addEventListener('keydown', catchKey, true);
