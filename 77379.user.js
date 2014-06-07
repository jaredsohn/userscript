// ==UserScript==
// @name           Facebook Unlike Button
// @namespace      Facebook
// @description    Adds an unlike button to facebook 'Pages'
// @include        http://www.facebook.com/pages/*
// ==/UserScript==

(function() {
	waitFor = function(c, fn, t) {
		if(x = c())
			fn(x);
		else
			setTimeout(function() {
				waitFor(c, fn, t);
			}, t);
	}
	//Wait for tabs to load
	waitFor(function() {
		return document.getElementById("profile_tabs");
	}, function(elem) {
		//Wait for unlike button to appear
		waitFor(function() {
			//Look for Unlike button
			var a = document.querySelector("#boxes_left + div > a:first-child");
			if(a != null && a.innerHTML == "Unlike")
				return a;
			return null;
		}, function(unlike) {
			//Create unlike button at the top
			var li = document.createElement("li")
			li.setAttribute("style", "float: right; margin-right: 50px;")
			var btn = document.createElement("a");
			btn.className = "uiButton uiButtonDefault uiButtonMedium";
			btn.style.margin = 0;
			var text = document.createElement("span");
			text.className = "uiButtonText";
			text.appendChild(document.createTextNode("Unlike"));
			btn.appendChild(text);
			li.appendChild(btn);
			elem.appendChild(li);
			//Add our click listener
			btn.addEventListener("click", function() {
				//Unlike button sometimes dissapears
				unlike = document.querySelector("#boxes_left + div > a:first-child");
				if(unlike != null) {
					var evt = unlike.ownerDocument.createEvent('MouseEvents');
					evt.initMouseEvent('click', true, true, unlike.ownerDocument.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
					unlike.dispatchEvent(evt);
					btn.parentNode.removeChild(btn);
				}
			}, true);
		}, 100);
	}, 100);
})();