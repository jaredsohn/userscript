// ==UserScript==
// @name           notebook from zalmarri
// @creator        zalmarri
// @namespace      http://zalkonpe.9k.com/
// @description    Shows a little notebook at the right bottom of every page that stores any text you type in automatically. Each domain has his separate notebook which can be shown/hidden with a click.for tranian and all site 
// @version        2.01
// @include        *
// @exclude        http*://*.google.*/mail/*
// @exclude        http*://*.googlemail.*
// @exclude        file:///*
// history:        originally imported from buya's bigmap.
//                 modified by near 2010/03/16
//                 modified for multi-language by Dank 2010/03/20
//                 Language: English, Deutsch  03/20
//                 Language: Arabic by Dream1 03/21
//                 fixed the coordinate problem by Dream1 03/23
//                 Language: Greek by Stardust_gr 03/25
//                 Language: Spanish by DiegoAlexis2079 03/27
//                 modified by near for more languages 04/01
// ==/UserScript==

if (self == top) {

// VARIABLES
var e = document.domain.split(/\./);
gdomain = document.domain;
var gotit = GM_getValue(gdomain, '[Type notes for '+gdomain+']');
// FUNCTIONS
function saveit() {
  GM_setValue(gdomain, document.getElementById('gm_textarea').value);
  return false;
}
/* Insert HTML */
/* div */
var div = document.createElement('div');
div.innerHTML = '<a onmousedown="var tbh = document.getElementById(\'gm_tobehiden\');if(tbh.style.display==\'none\'){tbh.style.display=\'block\';document.getElementById(\'gm_textarea\').focus();}else{tbh.style.display = \'none\';}return false;" title="zalmarri">'+gdomain+'</a><div id="gm_tobehiden"><div id="gm_title"></div></div>';
div.id = "gm_zalmarri";
document.body.insertBefore(div, document.body.lastChild);
/*  textarea */
var textarea = document.createElement('textarea');
textarea.appendChild(document.createTextNode(gotit));
textarea.addEventListener('keyup', saveit, false);
textarea.addEventListener('click', saveit, false);
textarea.id = "gm_textarea";
var gm_title = document.getElementById('gm_title');
gm_title.parentNode.insertBefore(textarea, gm_title.nextSibling);
/* Insert CSS */
  var menuCode = new Array();
  menuCode.push("#gm_zalmarri {-moz-opacity:0.9;position:fixed;bottom:40px;right:5px;border:1px solid #ccc;font-size:10px;color:#940F82;background-color:#08CF1C;padding:3px 5px 5px 5px;font-family:Arial,sans-serif}#gm_zalmarri a {color:#05660F;margin:2px;cursor:pointer}");
  menuCode.push("#gm_tobehiden {display:none;width:400px;height:300px;padding:5px}");  // Change display to block to show the zalmarri by default
  menuCode.push("#gm_textarea {width:100%;height:100%;color:#000;background-image:url(http://i802.photobucket.com/albums/yy309/zalkonpe/marianna.jpg);font-family:monospace}");
  var style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = menuCode.join('');
  menuCode.length = 0;

  try { document.getElementsByTagName('head')[0].appendChild(style); }
  catch(e) {}

}