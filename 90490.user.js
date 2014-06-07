// ==UserScript==
// @name           Google_insert search word
// @namespace      syobon
// @author         syobon
// @homepage       http://blog.syobon.info
// @description    Googleの検索結果に検索ワードを追記
// @include        http://*google.*/search?*
// @include        http://*google.*/images?*
// @include        http://*google.*/products?*
// ==/UserScript==

(function(){
	function escapeHTML(s) {
		return s.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/&/g,"&amp;").replace(/"/g,"&quot;");
	}
	var obj = document.getElementById("resultStats") || document.getElementById("result-count"); if (!obj) return;
	/^http:\/\/.+?google\.(.+?)\/(\w+?)\?(?:.+?&|)q=(.+?)(?:&|$)/.exec(location.href);
	var tld = RegExp.$1, search = RegExp.$2, q = decodeURIComponent(RegExp.$3), words = decodeURIComponent(RegExp.$3.replace(/\+/g,' ')).match(/([-+]?".+?"|[^"\s　]+)/g);
	if (location.href.match(/\?.+(&tbs=.+?)&/)){var tbs=RegExp.$1;}
	var html = [];
	for(var i=0,l=words.length; i<l; i++) {
		if (i<(l-2) && words[i+1].match(/^(AND|OR)$/i)) { words[i] = [words[i]].concat(words.splice(i+1,2)).join(" "); l -= 2; i--; continue; }
		html.push("<a href=\"http://www.google." + tld + "/" + search + "?q="+encodeURI(words[i].replace(/^[-+]/,""))+(tbs?tbs:"")+"\" style=\"text-decoration:none;\">" + escapeHTML(words[i]) + "</a>" +
			"<a href=\"http://www.google." + tld + "/" + search + "?q=" + encodeURI(words.slice(0,i).concat(words.slice(i+1)).join(" ")) + (tbs?tbs:"") +
			"\" style=\"text-decoration: none; color: red;\">×</a>");
	}
	obj.innerHTML = html.join(" ") + " の検索結果 " + obj.innerHTML;
	// for Scriptish
	if (typeof GM_setClipboard != "undefined") {
		var button = document.createElement("button");
		button.style.fontSize = "80%"; button.style.padding = 0;
		button.textContent = "copy"
		obj.insertBefore(button, obj.firstChild);
		button.addEventListener("click", function(){
			GM_setClipboard(q);
		}, false);
	}
})();