// ==UserScript==
// @name          Scrollbars - Firefox better look
// @namespace     http://userstyles.org
// @description	  Change the scrollbars for a smaller and good looking ones.
// @author        halcon_rs
// @homepage      http://userstyles.org/styles/24425
// @include       http://*
// @include       https://*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "scrollbar * \nscrollbar scrollbarbutton { display: none ! important; }\nscrollbar scrollbarbutton { visibility: collapse !important }\n\n\nscrollbar[orient=\"vertical\"]{\nbackground: transparent url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAACCAYAAABsfz2XAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAhSURBVHjaYvj//z8DMvb39/+PLoaMmRhIBAAAAAD//wMAB6Qizv4lfkgAAAAASUVORK5CYII=\") ! important; \n\n-moz-appearance: none !important; \nbackground-color: transparent !important;\nopacity: .75 !important;\nmin-width: 9px !important;\nmax-width: 9px !important;\nmargin-top: 150px !important;\nmargin-bottom: 150px !important;\n}\n\n\n\nscrollbar[orient=\"vertical\"]:hover\n{\nopacity: 1 !important;\n-moz-appearance: none !important; \nbackground-color: transparent !important;\nmin-width: 9px !important;\nmax-width: 9px !important;\n}\n\n\n\n\n\n\n  scrollbar thumb[orient=\"vertical\"] \n{\nbackground: transparent url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAnSURBVHjaYmQofPWfgQjwv0+UkYGBgYGJgUQwqmGkaAAAAAD//wMA+/4EFULQY9sAAAAASUVORK5CYII=\") ! important; \n\n\n-moz-appearance: none !important; \n-moz-border-radius: 4px !important;\nmin-width: 8px !important;\nmax-width: 8px !important;\nborder: 1px !important;\n}\n\n\n\n  scrollbar thumb[orient=\"vertical\"]:hover \n\n{background: transparent url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAnSURBVHjaYmQofPWfgQjwv0+UkYGBgYGJgUQwqmGkaAAAAAD//wMA+/4EFULQY9sAAAAASUVORK5CYII=\") ! important; \n\n-moz-border-radius: 4px !important;\nborder: 0px !important;\n}\n\n\n\n\n\n\n\n\n\n\n\nscrollbar[orient=\"horizontal\"]{\nbackground: transparent url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAMCAYAAABIvGxUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAmSURBVHjaYvz//z8DAwMDAxMDFGAyGP39/f8zMDAwMBKhGA8DMAB8qAf8L6w8LwAAAABJRU5ErkJggg==\") ! important; \n\n-moz-appearance: none !important; \nbackground-color: transparent !important;\nopacity: .75 !important;\nmin-height: 9px !important;\nmax-height: 9px !important;\nmargin-left: 450px !important;\nmargin-right: 450px !important;\n}\n\n\n\n\nscrollbar[orient=\"horizontal\"]:hover\n{\nopacity: 1 !important;\n-moz-appearance: none !important; \nbackground-color: transparent !important;\nmin-height: 9px !important;\nmax-height: 9px !important;\nmargin-left: 450px !important;\nmargin-right: 450px !important;\n}\n\n\n\n\n\n\n  scrollbar thumb[orient=\"horizontal\"] \n{\nbackground: transparent url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAmSURBVHjaYmQofPWfgQTAxEAiGNUwODQw/v//n7Y2AAAAAP//AwCb0AVuQc6u0wAAAABJRU5ErkJggg==\") ! important; \n\n\n-moz-appearance: none !important; \n-moz-border-radius: 4px !important;\nmin-height: 8px !important;\nmax-height: 8px !important;\nborder: 1px !important;\nmargin-left: 0px !important;\n}\n\n\n\n  scrollbar thumb[orient=\"horizontal\"]:hover \n\n{background: transparent url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAmSURBVHjaYmQofPWfgQTAxEAiGNUwODQw/v//n7Y2AAAAAP//AwCb0AVuQc6u0wAAAABJRU5ErkJggg==\") ! important; \n\n-moz-border-radius: 4px !important;\nborder: 0px !important;\n}\n\n\n\n\n\n\n\nscrollcorner{opacity: 0 !important;}\n\nscrollbar scrollcorner:hover {background:transparent !important;}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();
