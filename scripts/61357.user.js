// ==UserScript==
// @name          Nibbledish Printer Friendly Page
// @description	  Printer Friendly support
// @author        cmd3187
// ==/UserScript==
(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml);@media print {\n    div#header, div#subnav_container, div#member_sidebar, ul#recipe_tools, div#recipe_pic_container_new, div#license_container_new, div#recipe_comments, div#related_recipes, div.ppclisting, div#ppc, div#footer {\ndisplay: none;\n}\n\ndiv#recipe_method {\nwidth: 100%;\nmargin: 0px;\nposition: absolute;\nleft: 0 px;\n}\n\n}";

GM_addStyle( css );
})();
