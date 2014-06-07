// ==UserScript==
// @name       Change YouTube Embeds to IFrame 
// @namespace  http://guciek.github.com
// @version    0.9
// @description  This script modifies web pages to use iframes instead of flash objects for YouTube embeds.
// @match      http://*/*
// @copyright  Karol Guciek
// ==/UserScript==

function youtube_objs() {
	function youtubeplayer(id) {
		var e = document.createElement("iframe");
		e.style.border = "none";
		e.style.display = "block";
		e.src = "http://www.youtube.com/embed/"+id;
		return e;
	}
	function replace_obj(o, id) {
		var n = youtubeplayer(id);
		n.style.width = o.width ? o.width+"px" : o.style.width;
		n.style.height = o.height ? o.height+"px" : o.style.height;
		o.parentNode.replaceChild(n, o);
	}
	function process_obj(o) {
		var a = o.getElementsByTagName('param');
		for (var i = 0; i < a.length; i++) {
			var l = a[i].value.match(
				"https?://[w.]*youtube\\.com/[a-z]+/([^#&=]+)"
			);
			if (l && (l.length >= 2)) {
				replace_obj(o, l[1]);
				return true;
			}
		}
		return false;
	}
	function arraycopy(a) {
		var b = [];
		for (i in a) {
			b[i] = a[i];
		}
		return b;
	}
	var a = arraycopy(document.getElementsByTagName('object'));
	for (var i = 0; i < a.length; i++) { process_obj(a[i]); }
}
setTimeout(youtube_objs, 500);
