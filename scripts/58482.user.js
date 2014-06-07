// ==UserScript==
// @author      DominixZ
// @editor      DominixZ
// @namespace http://labs.jersure.com/greasemonkey/hide_task.js
// @name	    	Hide Tadalist Lists & Tasks
// @description	Hide all lists and tasks that finished.
// @include     http://*.tadalist.com/*
// @version     0.1
// ==/UserScript==
function $(xpath,root) { 
  xpath = xpath
    .replace(/((^|\|)\s*)([^/|\s]+)/g,'$2.//$3')
    .replace(/\.([\w-]+)(?!([^\]]*]))/g, '[@class="$1" or @class$=" $1" or @class^="$1 " or @class~=" $1 "]')
    .replace(/#([\w-]+)/g, '[@id="$1"]')
    .replace(/\/\[/g,'/*[');
  str = '(@\\w+|"[^"]*"|\'[^\']*\')';
  xpath = xpath
    .replace(new RegExp(str+'\\s*~=\\s*'+str,'g'), 'contains($1,$2)')
    .replace(new RegExp(str+'\\s*\\^=\\s*'+str,'g'), 'starts-with($1,$2)')
    .replace(new RegExp(str+'\\s*\\$=\\s*'+str,'g'), 'substring($1,string-length($1)-string-length($2)+1)=$2');
  var got = document.evaluate(xpath, root||document, null, 5, null), result=[];
  while (next = got.iterateNext())
    result.push(next);
  return result;
 }
 
if(typeof $("#completed_items")[0] != "undefined")
{
	$("#completed_items")[0].style.display = 'none';
}
if(typeof $(".completedlists")[0] != "undefined")
{
	$(".completedlists")[0].style.display = 'none';
}