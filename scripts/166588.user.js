// ==UserScript==
// @name       FeedWrangler full width
// @namespace  http://nerdi.es/
// @version    0.1
// @description  Make FeedWrangler use a larger portion of your screen
// @match      http://*feedwrangler*
// @copyright  none
// ==/UserScript==

var body = document.getElementsByTagName('body');
body[0].style.width = '100%';
document.getElementById('right-column').style.width = '80%';