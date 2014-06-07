// ==UserScript==
// @namespace     tag:afafafafafaf@gmail.com,2007-02:userscript
// @name          Sztaki mod
// @description   Modifies a popular Hungarian dictionary site szotar.sztaki.hu that was acquired by Deutsche Telecom early 2008 and polluted with ads.
// @include       *://szotar.sztaki.hu/index.*
// @include       *://szotar.sztaki.hu/dict_search.php?*
// @include       *://dict.sztaki.hu/index.*
// @include       *://dict.sztaki.hu/dict_search.php?*
// ==/UserScript==


// Using the FireBug console for logging if available.
if (unsafeWindow.console)
{
   var GM_log = unsafeWindow.console.log;
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { GM_log("ERROR: <head> element not found."); return; }
    style = document.createElement('style');
    style.setAttribute('wigy', 'on');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

var globalcss =
'#content, #result, #footer { width: auto !important; }' +
'body { background-image: none !important; width: auto !important; margin: 20px !important; }';

var searchboxformdiv = document.getElementById('search-box-form');
var resultdiv = document.getElementById('result');
var contextMenu = document.getElementById('contextMenu');
var marketing = document.getElementById('marketing');

document.body.innerHTML = ''; // keeps all styles and scripts defined in head
if (searchboxformdiv)
{
  var searchboxdiv = document.createElement('div');
  searchboxdiv.setAttribute('id', 'search-box');
  document.body.appendChild(searchboxdiv);
  searchboxdiv.appendChild(searchboxformdiv);
}
if (resultdiv)
{
  document.body.appendChild(resultdiv);
}
if (contextMenu)
{
  document.body.appendChild(contextMenu);
}
if (marketing)
{
  marketing.parentNode.removeChild(marketing);
}
addGlobalStyle(globalcss);

if (GM_getValue) { // If supported
  var searchform = document.forms[0];
  var pronounce = document.getElementsByName('P')[0];
  var p_index = GM_getValue('p_index', pronounce.selectedIndex);
  pronounce.selectedIndex = p_index;

  searchform.addEventListener('submit', function() {
    var pronounce = document.getElementsByName('P')[0];
    var p_index = pronounce.selectedIndex;
    GM_setValue('p_index', p_index);
  }, false);
}

var searchboxinput = document.getElementById('searchBox');
if (searchboxinput)
{
  searchboxinput.focus();
}
