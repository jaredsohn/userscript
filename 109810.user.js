// ==UserScript==
// @name           Google+ Re-sharing Tweak
// @version    1.2.0
// @include        https://plus.google.com/*
// @include        http://plus.google.com/*
// @match		https://plus.google.com/*
// @match		http://plus.google.com/*
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
	var css = {
		"div.Tx":"display: none;",
    "div.Ux":"text-shadow: 0px 1px 0px #fff;"
  };
  var s = document.styleSheets[0];
	for (var e in css){
	  s.insertRule(e + '{' + css[e] + '}', s.cssRules.length);
	}
	
  var timer = 0;
  
  var nodeTarget = document.querySelector("#contentPane");
  if (!nodeTarget) nodeTarget = document.body;
	
	nodeTarget.addEventListener('DOMNodeInserted', function (){
		if (timer) return;
		timer = setTimeout(function () {
      $("div.Ux[role!='button']")
			.attr("role","button")
			.addClass("a-l-k e-b e-b-ca")
			.attr("tabindex","0")
			.click(function(){
				$(this).next(".Tx").toggle(500);
			});
      timer = 0;
    }, 300);
  });
});
