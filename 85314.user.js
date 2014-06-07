// ==UserScript==
// @name           Zabilješke za Basketsim igru
// @creator        Alijansa
// @namespace      http://www.basketsim.com/club.php?clubid=10010
// @description    Zabilješke za Basketsim igru
// @version        1.0
// @include        http://www.*basketsim.com/*
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
div.innerHTML = '<a onmousedown="var tbh = document.getElementById(\'gm_tobehiden\');if(tbh.style.display==\'none\'){tbh.style.display=\'block\';document.getElementById(\'gm_textarea\').focus();}else{tbh.style.display = \'none\';}return false;" title="Notebook">'+gdomain+'</a><div id="gm_tobehiden"><div id="gm_title"></div></div>';
div.id = "gm_notebook";
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
  menuCode.push("#gm_notebook {-moz-opacity:0.9;position:fixed;bottom:40px;right:1px;border:0px solid #ccc;font-size:12px;color:#333;background:#f1f1f1;padding:3px 5px 5px 5px;font-family:Arial,sans-serif}#gm_notebook a {color:#4AA02C;margin:2px;cursor:pointer}");
  menuCode.push("#gm_tobehiden {display:none;width:250px;height:600px;padding:5px}");  // Change display to block to show the notebook by default 
  menuCode.push("#gm_textarea {width:100%;height:100%;color:#000;font-family:monospace}");
  var style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = menuCode.join('');
  menuCode.length = 0;

  try { document.getElementsByTagName('head')[0].appendChild(style); }
  catch(e) {}

}