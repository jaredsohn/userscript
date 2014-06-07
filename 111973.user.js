// ==UserScript==
// @name           stackoverflow-code-expando
// @namespace      stackoverflow
// @description    Click a code block with scroll bars and it automatically expands
// @include        http://*stackoverflow.com/*
// @include        http://*serverfault.com/*
// @include        http://*superuser.com/*
// @include        http://*.stackexchange.com/*
// @author         Alconja
// ==/UserScript==

var script = document.createElement("script");
script.type = "text/javascript";
script.innerHTML = "(" + expando.toString() + ")()";
document.body.appendChild(script);

function expando() {
	var maxHeight = null;
	$("pre").css("z-index", 1000).click(function() {
		var pre = $(this);
		var code = pre.children("code");
		if (code.length == 0) {
			return;
		}
		if (maxHeight === null) {
			maxHeight = pre.css("max-height");
		}
		if (pre.css("position") != "relative") {
			var oldWidth = pre.width();
			var codeWidth = Math.max(code.width(), oldWidth);
			var maxWidth = $(window).width() - 20;
			var width = Math.min(maxWidth, codeWidth);

			var maxLeft = (-1 * pre.offset().left) + 5;
			var idealLeft = (oldWidth - width) / 2.0;
			var left = Math.max(maxLeft, idealLeft);
			pre.css({width: width + "px", position: "relative", left: left + "px", maxHeight: "inherit"});
			if (width < codeWidth) {                //last ditch attempt to fit...
				var pc = 100 * width / codeWidth;
				pc = Math.max(pc, 70);              //any smaller & you can't read it...
				pre.css("font-size", pc + "%");
			}
		} else {
			pre.css({width: "auto", position: "static", maxHeight: maxHeight, fontSize: "100%"});
		}
	});
}