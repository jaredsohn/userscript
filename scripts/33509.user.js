// ==UserScript==
// @name           Multicoluminator 0.1.0
// @namespace      mcx
// @description    Multicolumn layout for the <body>, or the selected <div>.
// @include        *
// ==/UserScript==

///// Versions history /////////////////////////////////
// 0.1.0: from Navid Zamani <navid.zamani[@]googlemail.com>
// - The first prototype. With the basic functionality.

///// To do ////////////////////////////////////////////
// - Enable multi-column layout for more than one element.
//   (Via css classes.)
// - Store the state relative to the page instead of globally.

GM_registerMenuCommand("Enable",mcxEnable);
GM_registerMenuCommand("Disable",mcxDisable);
GM_registerMenuCommand("Set area",mcxSetArea);
GM_registerMenuCommand("Set column width",mcxSetWidth);
GM_registerMenuCommand("Help & license",mcxAbout);

function mcxAbout(e) {
	window.location = 'data:text/html,<html><head><title>Multicoluminator</title><style type="text/css"> dt { font-weight: bold; } h1, h2, #CC { text-align: center; }</style></head><body><h1>Multicoluminator</h1><hr/><div><h2>Help</h2><dl><dt>Enable</dt><dd>Globally enables the Multicoluminator for the <code>&lt;div&gt;</code> around the selected element, or the <code>&lt;body&gt;</code>, if nothing is selected or as a fallback.</dd><dt>Disable</dt><dd>Globally disables the Multicoluminator.</dd><dt>Set area</dt><dd>Sets the multicolumnization area.</dd><dt>Set column width</dt><dd>Sets the (minimal) width for the columns. <code>30em</code> is the default, because <code>em</code> is relative to the font size and <code>30</code> gets you the most comfortable width.</dd></dl><dt>Help & license</dt><dd>This page.</dd></div><hr/><div id="CC"><h2>License</h2><a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/3.0/de/"><img alt="Creative Commons License" style="border-width:0" src="http://i.creativecommons.org/l/by-nc-sa/3.0/de/88x31.png" /></a><br /><span xmlns:dc="http://purl.org/dc/elements/1.1/" href="http://purl.org/dc/dcmitype/InteractiveResource" property="dc:title" rel="dc:type">Multicoluminator</span> von <span xmlns:cc="http://creativecommons.org/ns#" property="cc:attributionName">Navid Zamani</span> steht unter einer <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/3.0/de/">Creative Commons Namensnennung-Keine kommerzielle Nutzung-Weitergabe unter gleichen Bedingungen 3.0 Deutschland Lizenz</a>.</div></body></html>';
}

function mcxEnable(e) {
	if (!GM_getValue("enabled",false)) {
		GM_setValue("enabled",true);
		mcxSetArea(e)
	}
}

function mcxDisable(e) {
	if (GM_getValue("enabled",false)) {
		GM_setValue("enabled",false);
		location.reload();
	}
}

function mcxSetArea(e) {
	element = window.getSelection().anchorNode;
	if (element != null) {
		while (((element.nodeType != element.ELEMENT_NODE) ||
						(["div","body"].indexOf(element.tagName.toLowerCase()) == -1)
					) && (element.parentNode.parentNode != null)) {
			element = element.parentNode;	
		}
		element.id = "mcxElement";
		GM_setValue("element",true);
	} else {
		GM_setValue("element",false);
	}
	mcxRender();
}

function mcxSetWidth(e) {
	GM_setValue("width",
		prompt("Width of columns (as CSS value):", GM_getValue("width","30em"))
	);
	mcxRender();
}

function mcxRender() {
	if (GM_getValue("enabled")) {
		if (GM_getValue("elementSelected",false)) {
			style = document.getElementById("mcxElement").style;
		} else {
			if (document.getElementsByTagName("body")[0] == null) return;
			style = document.getElementsByTagName("body")[0].style;
		}
		style.setProperty("-moz-column-width",GM_getValue("width","30em"),"");
		style.setProperty("-moz-column-count","auto","");
	}
}

mcxRender();