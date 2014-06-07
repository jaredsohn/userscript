// ==UserScript==
// @name			OGame Redesign : Short Header (V. 1.03)
// @version			1.03
// @namespace		Gollaoum
// @copyright		2009 Gollaoum
// @description		Minimize the header when is possible.
// @include			http://*.ogame.*/game/index.php?page=*
// ==/UserScript==

	function Eval(exp) {return document.evaluate(exp, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;}

	if (Eval('//a[@class="toggleHeader"]') && document.getElementById('planet').getAttribute('class') != 'shortHeader') {
		unsafeWindow.$('#planet').toggleClass('shortHeader');
		unsafeWindow.$(".c-left").toggleClass('shortCorner');
		unsafeWindow.$(".c-right").toggleClass('shortCorner');
		unsafeWindow.changeCookie(Eval('//script[contains(string(),"cookieName")]').innerHTML.match(/cookieName = ['|"]([a-z0-9]{32})['|"]/)[1]);
	}