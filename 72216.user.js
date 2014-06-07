// ==UserScript==
// @name           yet another google image relinker
// @namespace      none
// @include        http://images.google.tld/images?*
// @include        http://www.google.tld/images?*
// ==/UserScript==

var yagir = function () {
    var imgCont = document.querySelector("div#ImgCont table");
    if (imgCont == null) return;
    if (imgCont.hasAttribute("yagir")) return;
    imgCont.setAttribute("yagir", null);
    var rows = imgCont.rows;
    for (var ri = 0; ri < rows.length; ri=ri+2){
        var icells = rows[ri].cells;
        var tcells = rows[ri+1].cells;

        for (var ci = 0; ci < icells.length; ci++){
	    var anchor = icells[ci].firstElementChild;
	    var imgurl = anchor.href.match(/^http:\/\/[^\/]+\/imgres\?(?:.+?&)*?imgurl=([^&]+).*$/)[1];
	    var imgrefurl = anchor.href.match(/^http:\/\/[^\/]+\/imgres\?(?:.+?&)*?imgrefurl=([^&]+).*$/)[1];
	    anchor.href=decodeURIComponent(imgurl);

	    var ohost = tcells[ci].firstElementChild.querySelector("cite,font");
	    var ohosta = document.createElement("a");
	    ohosta.textContent = ohost.textContent;
	    ohost.textContent = "";
	    ohosta.href = decodeURIComponent(imgrefurl);
	    ohosta.setAttribute("style", "color: inherit;");
	    ohost.appendChild(ohosta);
    	}
    }
}

window.addEventListener("load", function(e){
    var win = e.target.wrappedJSObject.defaultView;
    if (win.dyn === undefined) return;
    // only relevant if JS enabled on google
    window.addEventListener("resize", yagir, false);
    // overwriting google functions for the 'options' menu to work correctly
    win.dyn._checkCanvasSize = win.dyn.checkCanvasSize;
    win.dyn.checkCanvasSize = function(){win.dyn._checkCanvasSize(); yagir();};
    win.dyn._setResults = win.dyn.setResults;
    win.dyn.setResults = function(a){win.dyn._setResults(a); yagir();};
}, false);

yagir();
