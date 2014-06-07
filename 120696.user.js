// ==UserScript==
// @name           EMag Hide Top
// @namespace      EMag Hide Top
// @include        *emag.ro*
// @exclude     *.emag.ro/galerie-poze/*
// @author		WankaUSR
// @date		18-01-2013
// @version 	0.3
// @icon          http://s1.emagst.ro/favicon2.ico
// @description		EMag.ro Hide Top
// ==/UserScript==
// ==UserScript==
(function () {


document.styleSheets[document.styleSheets.length -1].insertRule("#top-banners { display:none; }", 0);
document.styleSheets[document.styleSheets.length -1].insertRule("#OpenxBanner_Sky2Diverse { display:none; }", 0);
document.styleSheets[document.styleSheets.length -1].insertRule("#OpenxBanner_LeftSkyHomepage { display:none; }", 0);
document.styleSheets[document.styleSheets.length -1].insertRule("#bbHp { display:none; }", 0);
document.styleSheets[document.styleSheets.length -1].insertRule("#content_footer { display:none; }", 0);

document.styleSheets[document.styleSheets.length -1].insertRule("#no_banner { }", 0);
document.body.className = 'no_banner';
document.body.id = 'nobanner';
var bodystyle = document.getElementById("nobanner");
bodystyle.setAttribute("style", "background: url('http://s1.emagst.ro/images/new/sprite_emag_7.png') repeat-x scroll 0 -1591px #E8EFF8; font: 12px 'Segoe UI','Lucida Grande',Arial; padding-top: 120px;  text-align: left;");
var content = document.getElementById("page-content"); 
content.setAttribute("style", "top:250px !important; width: 1000px; margin: 0 auto; background: none repeat scroll 0 0 transparent;");
var player = document.getElementById("mediaplayer1"); 
player.setAttribute("height", "358");

ticker_alerte_close();

})();
