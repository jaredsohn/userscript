// ==UserScript==
// @name          ABC login
// @version       0.1.1
// @namespace     http://www.ryanium.com/abclogin
// @description   Script for logging in the Agricultural Bank of China website
// @include       https://easyabc.95599.cn/commbank/netBank/zh_CN/CommLogin.aspx*
// @copyright     2009–2010, Ryan Li <ryan@ryanium.com>
// @licence       GPL version 3; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

// display captcha correctly
var images = document.getElementsByTagName('img');
for (i = 0; i < images.length; ++i) {
	images[i].src = images[i].src.replace(/%5C/i, '/');
}

// add name attribute for map #SecurePadMap
const mapId = 'SecurePadMap';
var map = document.getElementById(mapId);
map.setAttribute('name', mapId);
