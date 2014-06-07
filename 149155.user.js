// ==UserScript==
// @name                        douban_home
// @namespace              		douban_home
// @version                     1.0
// @author                      Mescoda on http://mescoda.com/
// @description              	豆瓣新首页的功能增强（ 豆瓣猜错了和日记的首页展开
// @include                     http://www.douban.com/
// @include                     http://www.douban.com/#
// @grant        				GM_xmlhttpRequest
// @grant 						GM_getValue
// @grant 						GM_setValue

// ==/UserScript==

var scriptNode = document.createElement('script');
scriptNode.src = 'http://mescoda.com/dbhome/dbhome.js';
document.body.appendChild(scriptNode);