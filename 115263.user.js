// ==UserScript==
// @name           Userscripts.org easy copy
// @description    Kodları Kolayca Kopyalayın!
// @version        1.0
// @author         Ali Deniz Özgül (Maxcod2)
// @include        https://userscripts.org/scripts/review/*
// @include        http://userscripts.org/scripts/review/*
// ==/UserScript==

(function () {

var source = document.getElementById("source");
if (source) {
	var butt = document.createElement("input");
	butt.setAttribute("type", "button");
	butt.setAttribute("value", "Kodu Seç");
        butt.setAttribute("title", "Tıklayın! kod seçilecektir,seçili koda sağ tıklayıp 'kopyala'yı seçin.");
	butt.addEventListener("click", function(e) {
		var nsource = document.getElementById("nsource");
		if (nsource == null) {
			nsource = document.createElement("textarea");
			nsource.setAttribute("id", "nsource");
			nsource.style.width = "94%";
			nsource.style.margin = "32px auto 0 auto";
			nsource.textContent = source.textContent;
			nsource.addEventListener("focus", function(e) { this.select(); }, false);
			source.parentNode.insertBefore(nsource, source);
			source.parentNode.appendChild(nsource);
		}
		if (source.style.display != "none") {
			source.style.display = "none";
			nsource.style.display = "block";
			nsource.focus();
		} else {
			source.style.display = "block";
			nsource.style.display = "none";
		}
	}, false);
	source.parentNode.insertBefore(butt, source);
}

})();