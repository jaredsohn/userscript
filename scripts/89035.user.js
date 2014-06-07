// ==UserScript==
// @name          SeekSpeak
// @namespace     http://seekspeak.com
// @description   SeekSpeak is social search. Chat with people about their searches in real time.
// @include       *
// @exclude		  http://www.seekspeak.com/
// ==/UserScript==

(function() {
	String.prototype.startsWith = function(str) {
		return (this.match("^" + str) == str);
	}

	function seekSpeak() {
		var reactivateOnFocus = true;
		var originalPositionStyle;
		var currentlyVisible = false;

		originalPositionStyle = document.body.style.position;

		var iframe = document.createElement("iframe");
		var css = "position: fixed; top: 0px; right: 0px; border: none; height: 100%; width: 280px; z-index: -10; opacity: 0;";
		iframe.setAttribute("style", css);
		iframe.src = "http://www.seekspeak.com/greasemonkey/SeekSpeak_Greasemonkey.html#"
				+ window.location;

		addEventListener("message", receiveMessage);
		addEventListener("hashchange", onHashChange);
		addEventListener("focus", onFocus);
		addEventListener("blur", onBlur);

		document.body.appendChild(iframe);

		function addEventListener(event, func) {
			if (window.addEventListener) {
				window.addEventListener(event, func, false);
			} else if (window.attachEvent) {
				window.attachEvent('on' + event, func);
			}
		}

		function setVisible(visible) {
			var body = document.body;
			if (visible && !currentlyVisible) {
				body.style.position = "absolute";
				body.style.left = "0";
				body.style.width = "auto";
				body.style.right = "280px";
				body.style.overflowX = "auto";
				iframe.style.opacity = "1";
				iframe.style.zIndex = "10";
			} else if (!visible && currentlyVisible) {
				body.style.position = originalPositionStyle;
				body.style.left = "auto";
				body.style.right = "auto";
				iframe.style.opacity = "0";
				iframe.style.zIndex = "-10";
			}
			currentlyVisible = visible;
		}

		function receiveMessage(event) {
			var msg = event.data;
			if (msg == "showSidebar") {
				setVisible(true);
			} else if (msg == "hideSidebar") {
				setVisible(false);
			} else if (msg == "reactivateOnFocus") {
				reactivateOnFocus = true;
			} else if (msg == "noReactivateOnFocus") {
				reactivateOnFocus = false;
			} else if (msg == "onIFrameFocus") {
				onFocus();
			} else if (msg == "onIFrameBlur") {
				onBlur();
			}
		}

		function postMessage(message) {
			iframe.contentWindow.postMessage(message,
					"http://www.seekspeak.com");
		}

		function onHashChange() {
			var message = "newLocation=" + window.location;
			postMessage(message);
		}

		function maybeReactivate() {
			if (reactivateOnFocus) {
				postMessage("reactivate");
			}
			reactivateOnFocus = true;
		}

		function onFocus() {
			postMessage("windowFocus");
			setTimeout(maybeReactivate, 1);
		}

		function onBlur() {
			reactivateOnFocus = true;
			postMessage("windowBlur");
		}
	}

	function init() {
		function onIFrameFocus() {
			if (top.window != null) {
				top.window.postMessage("onIFrameFocus", "*");
			}
		}

		function onIFrameBlur() {
			if (top.window != null) {
				top.window.postMessage("onIFrameBlur", "*");
			}
		}

		function addEventListener(event, func) {
			if (window.addEventListener) {
				window.addEventListener(event, func, false);
			} else if (window.attachEvent) {
				window.attachEvent('on' + event, func);
			}
		}

		if (!(window.location.href.startsWith("http://www.seekspeak.com") || window.location.href
				.startsWith("http://seekspeak.com"))) {
			if (!top || window != window.top) {
				addEventListener("focus", onIFrameFocus);
				addEventListener("blur", onIFrameBlur);
			} else {
				var script = document.createElement("script");
				script.type = "application/javascript";
				script.textContent = "(" + seekSpeak + ")();";
				script.defer = "defer";
				document.getElementsByTagName("head")[0].appendChild(script);
			}
		}
	}
	init();
})();
