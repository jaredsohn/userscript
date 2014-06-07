// ==UserScript==
// @name       把輸出結果移到上面
// @version    0.2
// @match      http://codecanaan.com/content/*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @updateURL  http://userscripts.org/scripts/source/160624.meta.js
// @downloadURL http://userscripts.org/scripts/source/160624.user.js
// @copyright  YunTech IM B10123003, 2013+
// ==/UserScript==
 
(function(){$(".tabbable .tab-content").after('<div id="-new-outputtop">'+$("#tab-stdoutput").html()+'</div>');$(".tabbable #-new-outputtop pre").css("height","160px");}());