// ==UserScript==
// @author         huhgawz
// @version        1.0
// @name           OCC Ad Remover
// @namespace      com.huhgawzzyztemz.greasemonkey.scripts.occtools.AdRemover
// @description    Removes ads from OCC.com.mx
// @include        http://*.occ.com.mx/buscar_empleo/*
// @scriptsource   http://userscripts.org/scripts/show/104455
// ==/UserScript==

// New in v1.0 Removes ads from the search results page

var style = "#banner_occmatch, #resultadospatrocinadas, #right_col {display:none;} #left_col, #mastercont, #resultados, #resultados_content {width:100% !important;}";
GM_addStyle(style);