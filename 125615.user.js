// ==UserScript==
// @id             mspaPopoutFlash
// @name           Popout MSPA/Homestuck Flash
// @version        1.1
// @namespace      http://frz.cc/userscripts/
// @author         Frz
// @description    Allows opening Homestuck flash animations in a new window, thus allowing your to view them in fullscreen.
// @include        http://www.mspaintadventures.com/*
// @require		   https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @run-at         document-end
// ==/UserScript==

var popout = $('<div><a href="#">Popout</a></div>');
$(popout).click(function() {
	var f = $("embed").parent();
	$flashplayer = $("embed");
	$flashplayer.attr("id", "hsPopoutFlashplayer");

	var unsafeDoc = unsafeWindow.document;
	var script = unsafeDoc.createElement("script");
	script.setAttribute("type", "text/javascript")
	script.appendChild(unsafeDoc.createTextNode('document.getElementsByTagName("embed")[0].StopPlay();'))
	unsafeDoc.body.appendChild(script);
	
	win = document.open("http://www.mspaintadventures.com/magicPopout", "mspaFlashPopout", "");
	$flashplayer.appendTo("body");
	win.document.write(f.html());
	$flashplayer.appendTo(f);
	
	var fullscreenFlash = function() {
		var e = $(win.document).find("embed");
		if (e.length > 0) {
			//console.log("Manipulating new window", e);
			e.attr("width", "100%");
			e.attr("height", "100%");
			win.document.close();
		} else {
			setTimeout(fullscreenFlash, 500);
		}
	}
	fullscreenFlash();
});
setTimeout(function() {
	if ($("embed").length > 0) {
		//$("table[width=600][align=center]:eq(0)")
		$("embed").closest("table").find("a").closest("td").prepend(popout);
	}
}, 250);
