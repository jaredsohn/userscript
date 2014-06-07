// ==UserScript==
// @name          post to CiteULike
// @description	  post current page to CiteULike with Ctrl+Shift+F (modified from post del.icio.us script)
// @include       *
// ==/UserScript==


function doCiteULike() {

		location.href='http://www.citeulike.org/posturl?username=USERNAME&url='+encodeURIComponent(location.href)+'&title='+encodeURIComponent(document.title);
		/*
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
						      alert("CiteULike: Something went wrong");
						  } else {
						  	  alert("Your post to del.icio.us was successful");
						  }
						  break;
					}
				}
			}
		});
		*/
	}
	
	
	function catchKey(e) {
		if (e.shiftKey && e.ctrlKey) {
			switch (e.keyCode) {
				case 70: doCiteULike(); break;
			}
		}
	}

	GM_registerMenuCommand("do.CiteULike Ctrl+Shift+F", doCiteULike);
	window.addEventListener('keydown', catchKey, true);

