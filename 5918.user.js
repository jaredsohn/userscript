// ==UserScript==
// @name           SweClockers clean up and full width
// @namespace      http://alvsbyn.nu/~anton
// @description    Strips right column, top banner, footer and sets forum to 100% width.
// @include        http://sweclockers.com/forum/*
// @include        http://www.sweclockers.com/forum/*
// ==/UserScript==

var bannerhorizontal = document.evaluate("//DIV[@class='bannerhorizontal']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
if (bannerhorizontal) bannerhorizontal.style.display = 'none';

var fluidwrapper = document.getElementById('fluidwrapper');
if (fluidwrapper) fluidwrapper.style.minWidth = '0';

var fixedarea = document.getElementById('fixedarea');
if (fixedarea) {
	fixedarea.style.display = 'none';
	fixedarea.style.padding = '0';
}

var fluidarea = document.getElementById('fluidarea');
if (fluidarea) {
	fluidarea.style.width = '100%';
	fluidarea.style.minHeight = '0';
	fluidarea.style.margin = '0';
}

var footer = document.getElementById('footer');
if (footer) footer.style.display = 'none';