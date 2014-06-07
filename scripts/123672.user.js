// ==UserScript==
// @name          FB bar remover
// @description   Remove the quite useless fecebook righ bar
// ==/UserScript==

(function()
{
    function addGlobalStyle(css) {
	try {
		var elmHead, elmStyle;
		elmHead = document.getElementsByTagName('head')[0];
		elmStyle = document.createElement('style');
		elmStyle.type = 'text/css';
		elmHead.appendChild(elmStyle);
		elmStyle.innerHTML = css;
	} catch (e) {
		if (!document.styleSheets.length) {
			document.createStyleSheet();
		}
		document.styleSheets[0].cssText += css;
	}
    }
    var css = '.ego_section{ display: none }';
    addGlobalStyle(css);
})();
