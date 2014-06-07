// ==UserScript==
// @name        Vox Editing with WYSIWYG or HTML alternately
// @namespace   http://lowreal.net/
// @include     http://www.vox.com/compose*
// @include     http://*.vox.com/library/post/*
// @exclude     http://*.vox.com/services/editor/content*
// ==/UserScript==

(function () {
	var icon = <><![CDATA[
		data:image/gif;base64,
		R0lGODlhFgAWANU7APPz8+3t7cXFxenp6e7u7s/Pz/Hx8fX19ff39/r6+ujo
		6O/v7/T09Ozs7N/f3xAQEMjIyP39/f7+/oCAgI+Pj+fn5/v7+8nJyfz8/GBg
		YD4+PuHh4Z+fn5ubm0BAQCAgINra2uPj43x8fOTk5OLi4ri4uNzc3F1dXb+/
		v9PT09nZ2cvLy9XV1ampqcfHx+bm5uvr6/Ly8vb29vDw8Orq6srKyvn5+cTE
		xPj4+AAAAP///////wAAAAAAAAAAAAAAACH5BAEAADsALAAAAAAWABYAAAb/
		wN0GIrgZjbWk8ihYjYQgi0RHpdqu2KoExyJBLNWweIyr3cZoccRWTIdx4TXC
		6Kbi4PC1jEF33/ERCTIAMX1pf3cWOAcxMzc1NmMLHAU4Iip3CQgABjCPkVUO
		Ew85FzikJwU2gzOekFQFGTkfFAt/HR45Gi0ArZ9UEzkUVX9UKLq9rqAOsrS2
		cBy5GiXJv6Gjpac5GZWMMzTWYQodpiIOVAgMBgvgr1QSGIiICN4EA7/wCTgI
		Mv39BwcYNArQQAEdDPr2EIrBMIYBAzMIBIBBw5OABKs4RZQYoGPHBhQHiBRQ
		A4CMRgRAUqTBkqVIBTBDFJBZISWNARVe6NzJc4SJFhoVdsBI4UKAURdIkyaF
		AKEGCAM7ggAAOw==
	]]></>.toString().replace(/\s+/g, "");
	var iconHover = <><![CDATA[
		data:image/gif;base64,
		R0lGODlhFgAWANU7AK/a6avV5I6xvajR4KzW5ZW6x67Y6LTh8KfQ37Hc67Le
		7aHI1rfj85C0wAwOD7fk9KzX5rDb6qrU41xze7bi8qfP3i04PJG1wbXh8WeA
		iUVWXFlvd6XN26LK2BcdH53E0aTM2i45PXCLlXOPmXqYop3D0ENUWZi9y4qs
		uJ/G04WlsaPL2ZK2w5q/zZCzv6bP3a3Y56nS4arT4q/Z6bLd7JK1wrTg742w
		vLPf7gAAALjl9f///wAAAAAAAAAAAAAAACH5BAEAADsALAAAAAAWABYAAAb/
		wF2nIbgZjbWk8ihgcYQfzENHpdqu2OoD11o1MNWweIyr3cZoMcNWTIdx4bXC
		6Kbi4PA1LUJ33/EMBzQAM31pf3cYOAkzMDc1NmMQIwU4GyV3BwoABjKPkVUL
		Ew45FzikJgU2gzCekFQFGjkeGRB/IiE5FiQArZ9UEzkZVX9UKLq9rqALsrS2
		cCO5FirJv6Gjpac5GpWMMDHWYQgiphsLVAoRBhDgr1QPFIiICt4EA7/wBzgK
		NP39CQkiNAogAQEdCvr2EJrBcIYBAzAIBJARw5OAA6s4RZQYoGNHCRQHiBRQ
		AwCNRgRAUozBkqVIBDBBFJBZIWWMARVe6NzJk0OKFhoVdsg44UKAURdIkyZt
		0KDGBwM7ggAAOw==
	]]></>.toString().replace(/\s+/g, "");
	var iconActive = <><![CDATA[
		data:image/gif;base64,
		R0lGODlhFgAWAPeVALW0tLKysqqqqnV0dLi2uPLy8rGxsby8vL6/v3Fycbe3
		tdDQ0OHh4c7Ozv/+/0BAQOPk5K2trZGQkYmKifr6+8/Pz5+fn6enp6ioqIaG
		hv///dXV1bCwsPf39tjX142Njejo6Jubm5STk5eWlezs7MnJyoyMi7a2tvj2
		+MfGxvz7/Obl5Y+Qj9LS0oGAgoKCgrm5uf7//sfHx7+/v93d3YSDg+/v7+3t
		7bWysg8PD8fIyNvb2mBgYPT09LCtrbq6uIiIiMvLytPT1G9vb/7+/sXFxK6u
		rnp7e39+f8HAwK+vr9nZ2JWWlbq6ur69v7Ozs9vd3pOSksrKytfa2qmpqePj
		40ZGRhAQEBsbGwwMDf77/IiJhpubmLKxs8HBwktLS8LBwrK1srGvscLBwe/s
		7n+AgPb09qyrrqGfofT29LSytHV1dd/f3xkZGZeXmMzMzKKgoMbGyZiZmoCA
		gNra2XBwcLu5uYyKi87Q0LKysJiYl/z8++Li4vz8/vf29M3PzZiYmF9fYMPD
		w15dXXt7fc/Pzr28vHFxcbe6uL+/vXJyct3b3qmqqdTU066xrpKSkoaDhays
		rPn5+QAAAP///////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
		AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
		AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
		AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
		AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
		AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
		AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
		AAAAAAAAAAAAAAAAAAAAACH5BAEAAJUALAAAAAAWABYAAAj/ACshGJCgYIIB
		A44gQeKiBiQXLl7UYOFB4IsLFwQIiBTBCAcxAAAgaoIAjI4/Dbi0GHABA4aN
		HA0EAKCgiZMkRYIs2ABlEYshLWFGkAngxAEEXmS8EbKEAQgyE4a83MiBqAIY
		BwSVwMNzxQ0zKoAkgGnER4AnNH8g0LGgKYg0ezSomDBgYwQOMwkQ+EGgRIsd
		EEj40aKBEoU7A2Ia4IBDr5M4CwCToESJCGUKJo6csWqHQBdCVDwoakC5tAMV
		El6YVRNGAZpAWSYpWZFjEo8KpSl1GJHBEdooVia1WSMFQgFKFh5MeqCEkoYO
		TIDkOXFi0KQ6CzwYzz1jOSUHKJhMpwiAldGXSVjKVCmdfPmM7yhGTMBxYIyM
		BYYO1cZ9xTbu0pLwBkMSKRSyAQMF2GABbnOwkVtpEmxxQAoNeEDDZA9mSJkE
		EyRSghA0gNDDdxo++EgGRTQwhXF9xFDigx9kEMSBN0jiwIu5ESHBBw3QscJx
		hbmIYwEWNCJCCyJKgkIHFEji5JNOUtBBCiHwUQkDcHxgggkfSMCCHHq4EcKY
		IpQJSAA2VBIQADs=
	]]></>.toString().replace(/\s+/g, "");

	GM_addStyle([
		".editor-toolbar a.button.command-toggle-mode {",
			"background: url('",icon,"');",
		"}",
		".editor-toolbar a.button.command-toggle-mode:hover {",
			"background: url('",iconHover,"');",
		"}",
		".editor-toolbar a.button.command-toggle-mode.textmode ,",
		".editor-toolbar a.button.command-toggle-mode.textmode:hover {",
			"background: url('",iconActive,"');",
		"}",
		"#comment-editor {",
			"background: #fff !important;",
			"color: #000 !important;",
		"}"
	].join(""));
})();

location.href = "javascript:"+encodeURIComponent(uneval(function () {
	var toolbar = document.getElementById("compose-entry-toolbar") || document.getElementById("comment-editor-toolbar");
	var button  = h("<a href='javascript:void(156)' class='command-toggle-mode toolbar button' title='toggle mode'>ToggleMode</a>").firstChild;
	toolbar.insertBefore(button, document.getElementById("restore-post"));

	var update = function () {
		setTimeout(function () {
			if (app.editor.mode == "textarea") {
				DOM.addClassName(button, "textmode");
			} else {
				DOM.removeClassName(button, "textmode");
			}
		} ,0);
	};
	button.addEventListener("click", update, false);
	update();

	function h (s) {
		var d = document.createElement("div");
		d.innerHTML = s;
		return d;
	}
}))+"()";

