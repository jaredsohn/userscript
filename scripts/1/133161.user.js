// ==UserScript==
// @name           naredjenja_svs
// @namespace      Anatoxin
// @version        1.00
// @date           2012-05-12
// @description    eRepublik naredjenja za jedinicu S.V.S.
// @include        *.erepublik.com/*
// ==/UserScript==

var address = 'http://svs.wen9.com/naredjenja.html';            

var footer = document.getElementById('footer');
if  (footer) {
    var quicklinks = document.createElement("div");
    quicklinks.style.position = "absolute";
	quicklinks.style.left = "3px";
	quicklinks.style.top = "130px";
    quicklinks.innerHTML = '<div class="simple_yellow" id="side_bar"><p style="margin: 2px 0 1px 0; padding-top:1px; padding-bottom:7px;">' + 
    '<div style="float:center;">' + 
         '<b>Military orders:</b><br/>' + 
         '<iframe src="' + address + '" width="170" height="370" frameborder="0" allowTransparency="true"></iframe>' + 
	'</div>' + 
    '</div>';
    document.body.insertBefore(quicklinks, document.body.firstChild);
	footer.parentNode.removeChild(footer);

}