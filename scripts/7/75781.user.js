// ==UserScript==
// @name           uso paste* preview
// @namespace      http://www.userscripts.org
// @include        http://userscripts.org/*
// @include        http://www.userscripts.org/*
// @include        http://pastebin.com/*#uso
// @include        http://www.pastebin.com/*#uso
// @include        http://pastebin.org/*#uso
// @include        http://www.pastebin.org/*#uso
// @include        http://pastebay.com/*#uso
// @include        http://www.pastebay.com/*#uso
// @require        http://usocheckup.dune.net/75781.js
// ==/UserScript==

(function() {

/*
 * userscripts.org
 */
if (window.location.href.search(/http:\/\/(www\.)?userscripts\.org/i) != -1) {
	window.addEventListener('message', function(e) {
											var hash = e.data.substring(1).split(';');
											var src = hash[0].substring(4);
											var height = hash[1].substring(7);
											var ifrs = document.getElementsByTagName('iframe');
											for (var i=0;i<ifrs.length;i++) {
												if (ifrs[i].src == src)
													ifrs[i].style.height = height+'px';
											}
										}, false);


	function insertAfter(parent, anchor, node) {
		if (anchor.nextSibling != undefined)
			parent.insertBefore(node, anchor.nextSibling);
		else
			parent.appendChild(node);
	}

	var links = document.getElementsByTagName('a');
	for (var i=0;i<links.length;i++) {
	if (links[i].href.search(/^http:\/\/(www\.)?(pastebin|pastebay)\.(com|org)\//i) != -1) {
		var ifr = document.createElement('iframe');
		ifr.src = links[i].href+'/#uso';
		insertAfter(links[i].parentNode, links[i], ifr);
		// ifr.style.position = 'relative';
		if (location.href.search(/userscripts\.org\/messages\//i) != -1) {
			ifr.style.marginLeft = '-220px';
			ifr.style.marginRight = '-220px';
			ifr.style.width = '950px';
		} else if (location.href.search(/userscripts\.org\/topics\//i) != -1) {
			ifr.style.marginLeft = '-20px';
			ifr.style.marginRight = '-20px';
			ifr.style.width = '834px';
		}
	}}
}


/*
 * pastebin.org | pastebin.com | pastebay.com
 */
if (window.location.href.search(/http:\/\/(www\.)?(pastebin|pastebay)\.(com|org)/i) != -1) {
	if (window.location.href.search(/http:\/\/(www\.)?(pastebin\.org|pastebay\.com)/i) != -1) {
		var t = document.body.firstChild;
		while (t.nextSibling != undefined) {
			var t2 = t.nextSibling;
			if (t.id == null || t.id == undefined || t.id.search(/^(content)$/i) == -1) {
				t.parentNode.removeChild(t);
			}
			t = t2;
		}
		
		t = document.body.firstChild.firstChild;
		while (t.nextSibling != undefined) {
			var t2 = t.nextSibling;
			if ((t.className == null && t.className == undefined) || t.className.search(/^(syntax)$/i) == -1) {
				t.parentNode.removeChild(t);
			}
			t = t2;
		}
		
		t = document.body;
		while (t.nextSibling != undefined && t.nextSibling != null) {
			t = t.nextSibling;
			if (t.style != undefined)
			t.style.display = 'none';
		}
		
		if (document.body.firstChild.firstChild.style == undefined) {
			document.body.firstChild.firstChild.textContent = 'Paste expired... :(';
			document.body.firstChild.style.border = '1px solid silver';
		} else {
			
			document.getElementById('content').style.padding = '0';
			document.getElementById('content').style.margin = '0';
			document.body.style.padding = '0';
			document.body.style.margin = '0';
			document.body.firstChild.firstChild.style.padding = '0';
			document.body.firstChild.firstChild.style.margin = '0';
			document.getElementsByTagName('ol')[0].style.margin = '0';
		}
	} else if (window.location.href.search(/http:\/\/(www\.)?pastebin\.com/i) != -1) {
		var t = document.body.firstChild;
		while (t.nextSibling != undefined) {
			var t2 = t.nextSibling;
			if (t.id == null || t.id == undefined || t.id.search(/^(container)$/i) == -1) {
				t.parentNode.removeChild(t);
			}
			t = t2;
		}
		
		t = document.body.firstChild.firstChild;
		while (t.nextSibling != undefined) {
			var t2 = t.nextSibling;
			if (t.id == null || t.id == undefined || t.id.search(/^(content_frame)$/i) == -1) {
				t.parentNode.removeChild(t);
			}
			t = t2;
		}
		
		t = document.body.firstChild.firstChild.firstChild;
		while (t.nextSibling != undefined) {
			var t2 = t.nextSibling;
			if (t.id == null || t.id == undefined || t.id.search(/^(content_right)$/i) == -1) {
				t.parentNode.removeChild(t);
			}
			t = t2;
		}
		
		t = document.body.firstChild.firstChild.firstChild.firstChild;
		while (t.nextSibling != undefined) {
			var t2 = t.nextSibling;
			if (t.id == null || t.id == undefined || t.id.search(/^(code_frame)$/i) == -1) {
				t.parentNode.removeChild(t);
			}
			t = t2;
		}
		
		t = document.body;
		while (t.nextSibling != undefined && t.nextSibling != null) {
			t = t.nextSibling;
			if (t.style != undefined)
			t.style.display = 'none';
		}
		
		document.getElementById('content_right').style.padding = '0';
		document.getElementById('content_right').style.margin = '0';
		document.getElementsByTagName('ol')[0].style.margin = '0';
	}
	
	window.addEventListener('load', function() {
										try {
											unsafeWindow.parent.postMessage('#src='+location.href+';height='+document.body.scrollHeight, "*");
										}catch(err){alert(err);}
									}, false);
}

})();