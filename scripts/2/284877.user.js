// ==UserScript==
// @name         proxies: redirect to card view after adding proxy
// @description  magiccards.info
// @version      0.0.1
// @icon         https://raw2.github.com/solygen/userscripts/master/doc/icon/icon_032.png
// @namespace    https://github.com/solygen/userscripts
// @repository   https://github.com/solygen/userscripts.git
// @license      MIT
//
// @include      http://magiccards.info/proxy?add*
//
// @updateURL    https://rawgithub.com/solygen/userscripts/master/scripts-min/magiccards.info/proxies-min.user.js
// @downloadURL  https://rawgithub.com/solygen/userscripts/master/scripts-min/magiccards.info/proxies-min.user.js
// @homepage     https://github.com/solygen/userscripts
//
// ==/UserScript==

//redirect to calling page after added proxies
(function () {

    'use strict';

    window.history.back();
})();
