// ==UserScript==
// @name         jutte moving
// @version       1.0.0
// @author       shimomire
// @namespace    http://2.pro.tok2.com/~reflection.shimomire.jutte
// @description  十手を動かす。
// @include      http://2.pro.tok2.com/~reflection/tournament-03-02.html
// @exclude
// ==/UserScript==

(function (d, func) {
	 var h = d.getElementsByTagName('head')[0];
	 var s1 = d.createElement("script");
	 s1.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js");
	 s1.addEventListener('load', function() {
	 var s2 = d.createElement("script");
	 s2.textContent = "jQuery.noConflict();(" + func.toString() + ")(jQuery);";
	 h.appendChild(s2);
	 }, false);
	 h.appendChild(s1);
})(document, function($) {
	var m=$("marquee[behavior=alternate]");
	m.css({position:"relative","padding-left":"24%","padding-right":"12%"});
	m.children().css({left:"33%"});
});