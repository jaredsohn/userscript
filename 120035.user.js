// ==UserScript==
// @name			vPopulus Shout Tabs
// @description		Brings the old shout tabs back
// @include			http://*.vpopulus.net/
// @copyright		ErepublikScripter
// @version			1.0
// @license			LGPL http://www.gnu.org/licenses/lgpl.html
// ==/UserScript==

var script=document.createElement('script');
script.type='text/javascript';
script.src='http://vpopulus.tk/scripts/tabs.js';
var body=document.getElementsByTagName('body');
body[0].appendChild(script);
