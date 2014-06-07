// ==UserScript==
// @name           Torrentsmd Forum Ctrl+Enter Fix
// @namespace      http://userscripts.org/scripts/show/101303
// @description    TMD Ctrl+Enter Fix v0.1 by xUseR (http://www.torrentsmd.com/userdetails.php?id=96609)
// @include        http://www.torrentsmd.com/forum.php*
// @include        http://torrentsmd.com/forum.php*
// ==/UserScript==


(function(){
	var igm = document.getElementsByTagName("textarea")[0];
	var ctrlenterbyxuser = document.createElement("input");
	ctrlenterbyxuser.setAttribute("type","hidden");
	ctrlenterbyxuser.setAttribute("name","file_image");
	igm.parentNode.insertBefore(ctrlenterbyxuser, igm);
})();



