// ==UserScript==
// @name         Close web 8
// @namespace    http://devs.forumvi.com/
// @version      0.5
// @description  Drag the website to the bottom of the screen like when your close windows 8 metro apps.
// @copyright    2013+, Zzbaivong
// @include      *
// @updateURL    http://userscripts.org/scripts/source/182824.user.js
// @icon         http://imageshack.us/scaled/modthumb/843/jbdu.png
// @run-at       document-end
// ==/UserScript==
(function () {
	function e(a, c, b) {
		return parseInt(a) + (parseInt(c) - parseInt(a)) / 10 * b
	}
	var b = 0,
		h = 0,
		f = !0,
		c = document.getElementsByTagName("html")[0],
		a = document.getElementsByTagName("body")[0];
	c.onmousedown = function (a) {
		30 > a.clientY && (b = 1, c.style.cursor = "url('https://mail.google.com/mail/images/2/openhand.cur'),-webkit-grap", c.style["user-select"] = "none", c.style["-moz-user-select"] = "none", c.style["-webkit-user-select"] = "none")
	};
	c.onmouseup = function () {
		if (f) {
			if (1 == b) c.removeAttribute("style"), a.removeAttribute("style");
			else if (2 == b) {
				var d, k = a.style.left,
					l = a.style.top;
				d = setInterval(function () {
					var b = h++;
					if (10 == b) c.removeAttribute("style"), a.removeAttribute("style"), clearInterval(d), h = 0;
					else {
						var g = e(0.3, 1, b);
						a.style.transform = "scale(" + g + ")";
						a.style["-ms-transform"] = "scale(" + g + ")";
						a.style["-webkit-transform"] = "scale(" + g + ")";
						a.style.opacity = e(0.8, 1, b);
						a.style.width = e(1024, window.innerWidth, b) + "px";
						a.style.height = e(720, window.innerHeight, b) + "px";
						a.style.left = e(k, 0, b) + "px";
						a.style.top = e(l, 0, b) + "px"
					}
				}, 1)
			}
			b = 0
		}
	};
	c.onmousemove = function (d) {
		if (1 == b && 40 <= d.clientY) b = 2, c.style.cursor = "url('https://mail.google.com/mail/images/2/closedhand.cur'),-webkit-grapping", c.style.overflow = "hidden", c.style.background = "#666", a.style.transform = "scale(.3)", a.style["-ms-transform"] = "scale(.3)", a.style["-webkit-transform"] = "scale(.3)", a.style.position = "fixed", a.style.zIndex = "99999", a.style.opacity = ".8", a.style.width = "1024px", a.style.height = "720px", a.style.overflow = "hidden";
		else if (2 == b && f) {
			a.style.left = d.clientX - 512 + "px";
			a.style.top = d.clientY -
				254 + "px";
			var e = window.innerHeight;
			d.clientY > e / 100 * 65 && (f = !1, c.style.background = "#333", a.style.transform = "scale(.3) rotateY(180deg)", a.style["-ms-transform"] = "scale(.3) rotateY(180deg)", a.style["-webkit-transform"] = "scale(.3) rotateY(180deg)", a.style.transition = "transform .5s", a.style["-ms-transition"] = "-ms-transform .5s", a.style["-webkit-transition"] = "-webkit-transform .5s", setTimeout(function () {
				var b = parseInt(a.style.top),
					c = 0,
					d;
				d = setInterval(function () {
					parseInt(a.style.top) >= e - 254 ? (clearInterval(d),
						window.open("", "_self").close()) : a.style.top = b + 15 * c+++"px"
				}, 1)
			}, 500))
		}
	}
})();