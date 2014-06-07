// ==UserScript==
// @name           Amazon2 Kindle-free
// @namespace      localhost
// @include        http://www.amazon.co*
// ==/UserScript==

unsafeWindow.clean = function (nothing) {
	if(true ||
	   window.location.href.indexOf("search")!=-1 || 
	   window.location.href.indexOf("bestsellers")!=-1 ){
		var sections = document.getElementsByTagName('DIV');
		var banned = [/>.*kindle edition/gi, />.*kindle ebook/gi, 
						/>.*kindle store/gi, />.*kindle price/gi ];
		for (var i = 0; i < sections.length; i++) {
			section = sections[i];
			if(section.className.match(/^title/gi)) {
				for(var key in banned) {
					if (section.innerHTML.match(banned[key])!=null) {
						section.parentNode.parentNode.style.display = "none";
						break;
					}
				}
			}
		}

		var sections = document.getElementsByTagName('TBODY');
		var banned = [/>.*kindle edition/gi, />.*kindle ebook/gi, 
						/>.*kindle store/gi, />.*kindle price/gi ];
		for (var i = 0; i < sections.length; i++) {
			section = sections[i];
			if(section.id.match(/^kindle/gi)) {
				for(var key in banned) {
					if (section.innerHTML.match(banned[key])!=null) {
						section.style.display = "none";
						break;
					}
				}
			}
		}

		var sections = document.getElementsByTagName('TABLE');
		var banned = [/>.*kindle edition/gi, />.*kindle ebook/gi, 
						/>.*kindle store/gi, />.*kindle price/gi ];
		for (var i = 0; i < sections.length; i++) {
			section = sections[i];
			if(section.className.match(/^fiona/gi)) {
				for(var key in banned) {
					if (section.innerHTML.match(banned[key])!=null) {
						section.style.display = "none";
						break;
					}
				}
			}
		}

		var sections = document.getElementsByTagName('DIV');
		var banned = [/Get your Kindle/gi ];
		for (var i = 0; i < sections.length; i++) {
			section = sections[i];
			if(section.className.match(/fiona/gi)) {
				for(var key in banned) {
					if (section.innerHTML.match(banned[key])!=null) {
						section.style.display = "none";
						break;
					}
				}
			}
		}

		var sections = document.getElementsByTagName('DIV');
		var banned = [/>.*kindle edition/gi, />.*kindle ebook/gi, 
						/>.*kindle store/gi, />.*kindle price/gi ];
		for (var i = 0; i < sections.length; i++) {
			section = sections[i];
			if(section.className.match(/rankedItem/gi)) {
				for(var key in banned) {
					if (section.innerHTML.match(banned[key])!=null) {
						section.style.display = "none";
						break;
					}
				}
			}
		}
		
		var sections = document.getElementsByTagName('TD');
		var banned = [/>.*kindle edition/gi, />.*kindle ebook/gi, 
						/>.*kindle store/gi, />.*kindle price/gi ];
		for (var i = 0; i < sections.length; i++) {
			section = sections[i];
			if(section.className.match(/^toeType/gi)) {
				for(var key in banned) {
					if (section.innerHTML.match(banned[key])!=null) {
						section.parentNode.style.display = "none";
						break;
					}
				}
			}
		}
	}
};

unsafeWindow.cleaning = false;
unsafeWindow.clean();
//document.addEventListener('DOMAttrModified', unsafeWindow.clean, false);
document.addEventListener('DOMNodeInserted', function() {
				if(unsafeWindow.cleaning) return;
				unsafeWindow.cleaning = true;
				unsafeWindow.setTimeout( 
						function() {
								unsafeWindow.clean();
								unsafeWindow.cleaning = false;
						}, 250); }, false);

GM_addStyle(<><![CDATA[
	DIV[name="goKindleStaticPopDiv"], .kindleBanner {
	  display: none !important;
	}
]]></>.toString());

return;