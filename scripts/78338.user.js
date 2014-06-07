// ==UserScript==
// @name           Ogame Redesign: Acceleration messages section
// @namespace      Shuusaku
// @description    Car c'est plus mieux comme ca
// @include        http://*.ogame.*/game/index.php?page=*
// @version 3.0
// ==/UserScript==

(function(){
	if ( !unsafeWindow.$ ) return;

	var links = document.getElementsByTagName('link');
	for (var i=0; i<links.length; i++) {
		if (links[i].getAttribute('type')!=null && links[i].getAttribute('type').toLowerCase() == 'text/css' && links[i].getAttribute('href').toLowerCase().indexOf('01style.css') > -1) {
			var rules = document.styleSheets[0].cssRules;
			for (var i = 0; i < rules.length; i++)
				if (rules[i].type == 1 && rules[i].selectorText == ":active, :focus") {
					document.styleSheets[0].deleteRule(i);
					document.styleSheets[0].insertRule("a:active, a:focus { outline: none; }", i);
					break;
				}
		}
	}
})()