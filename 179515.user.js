// ==UserScript==
// @name          NOW Fixer
// @version      0.0.1
// @author       Danny Kendall
// @description  Skip silly download previews on Nottingham Trent Universities VLE.
// @require	 http://code.jquery.com/jquery-1.10.2.min.js
// @domain          userscripts.org
// @domain          ntu.ac.uk
// @domain          www.ntu.ac.uk
// @match          https://*now.ntu.ac.uk/*
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM_xmlhttpRequest
// @grant           GM_addStyle
// @grant           GM_log
// @run-at          document-start
// @priority        9001
// ==/UserScript==


$(document).ready(function(){
$('#d2l_1_7_101').trigger('click');
});
