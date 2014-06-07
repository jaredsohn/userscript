// ==UserScript==
// @name        Ignore Hatena 2 column
// @namespace   http://lowreal.net/
// @include     http://d.hatena.ne.jp/*
// ==/UserScript==


(function () {
	var $N = function (name, attr, childs) {
		var ret = document.createElement(name);
		for (k in attr) {
			if (!attr.hasOwnProperty(k)) continue;
			v = attr[k];
			if (k == "class") {
				ret.className = v;
			} else {
				ret.setAttribute(k, v);
			}
		}
		switch (typeof childs) {
			case "string": {
				ret.appendChild(document.createTextNode(childs));
				break;
			}
			case "object": {
				for (var i = 0, len = childs.length; i < len; i++) {
					var child = childs[i];
					if (typeof child == "string") {
						ret.appendChild(document.createTextNode(child));
					} else {
						ret.appendChild(child);
					}
				}
				break;
			}
		}
		return ret;
	}

	var getStyle = function (element, style) {
		var css = document.defaultView.getComputedStyle(element, null);
		return css ? css.getPropertyValue(style) : null;
	}

	var show = GM_getValue("show", false);

	var sidebar = document.evaluate(
		"//div[@class='sidebar']",
		document,
		null,
		XPathResult.FIRST_ORDERED_NODE_TYPE,
		null).singleNodeValue;

	var main = document.evaluate(
		"//div[@class='main']",
		document,
		null,
		XPathResult.FIRST_ORDERED_NODE_TYPE,
		null).singleNodeValue;

	if (!sidebar) return;

	var toggle = function () {
		if (show) {
			sidebar.style.display = "block";
			main.style.margin = main._margin;
		} else{
			sidebar.style.display = "none";
			main._margin = getStyle(main, "margin");
			main.style.margin = "auto";
		}
		GM_setValue("show", show);
		show = !show;
	}
	toggle();

	var a_style = [
		"opacity: 0.8",
		"border: 1px solid #000",
		"background: #fff",
		"color: #000",
		"position: fixed",
		"top: 0.5em",
		"right: 0.5em",
		"font-size: 80%"
		].join(";");

	var button = $N("a", {
		style : a_style,
		href  : "javascript:void(0)"
		}, "Toggle Column");

	button.addEventListener("click", function (e) {
		e.stopPropagation();
		e.preventDefault();

		toggle();
	}, true);

	document.body.appendChild(button);


})();
