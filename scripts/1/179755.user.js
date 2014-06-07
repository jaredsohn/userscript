// ==UserScript==
// @name           ja_automatik
// @namespace      test
// @description    ja_automatik
// @copyright      2013+
// @version        1.1
// @license        BSD
// @updateURL      http://www.rokrudit.de/ja/userscript/ja.user.js
// @downloadURL    http://www.rokrudit.de/ja/userscript/ja.user.js
// @grant          unsafeWindow
// @grant          GM_xmlhttpRequest
// @grant          GM_addStyle
// @grant          GM_getResourceText
// @grant          GM_getResourceURL
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_registerMenuCommand
// @run-at         document-start
// @resource
// @resource
// @include        http://www.justanswer.de/expert/question-list-s.aspx
// ==/UserScript==
(function()
{

         initMyBookmarklet();

         function initMyBookmarklet()
         {
                 (window.myBookmarklet = function()
                 {
                         document.getElementById("ctl00_header_pnlMenuLinks").style.display="none";
//alert("Hello World");

		})();
	}
})();