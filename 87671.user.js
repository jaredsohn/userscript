// ==UserScript==
// @name           anti marketgid on any site [crossbrowser]
// @namespace      http://userscripts.org/scripts/show/87671
// @version 1.1.1
// @history 1.1.1 Добавлена опция запрета/разрешения автоапдейтера.
// @history 1.1 Добавлен автоапдейтер для Firefox 
// @history 1.0 Финальный кроссбраузерный релиз
// @include        *
// ==/UserScript==

var updater=true; //значение true - разрешает автоапдейтер, false - запрещает

function init() {
 if (arguments.callee.done) return;
 arguments.callee.done = true;

var re = new RegExp(/MarketGid/)
var marketgid=document.getElementsByTagName('div')
for (var i=0; i<marketgid.length; i++)
	{
	 var m=re.test(marketgid[i].id)
	 if(m){marketgid[i].parentNode.removeChild(marketgid[i])}
	}
};

/* для Mozilla/Firefox/Opera 9 */
if (document.addEventListener) {
 document.addEventListener("DOMContentLoaded", init, false);
}

/* для Internet Explorer */
/*@cc_on @*/
/*@if (@_win32)
document.write("<script id=\"__ie_onload\" defer=\"defer\" src=\"javascript:void(0)\"><\/script>");
var script = document.getElementById("__ie_onload");
script.onreadystatechange = function() {
 if (this.readyState == "complete") {
 init(); 
 }
};
/*@end @*/

/* для Safari */
if (/WebKit/i.test(navigator.userAgent)) { // условие для Safari
 var _timer = setInterval(function() {
 if (/loaded|complete/.test(document.readyState)) {
 clearInterval(_timer);
 init(); 
  }
 }, 10);
}

/* для остальных браузеров */
window.onload = init;

//-----------------------------------------------------------------------------
//	AutoUpdater
//-----------------------------------------------------------------------------
if(updater){
function updt()
{
  try {
	ScriptUpdater.forceCheck(87671);
       }
  catch(e) { };
}
updt();
function ntc()
{
  try {
	ScriptUpdater.forceNotice(87671);
       }
  catch(e) { };
}
GM_registerMenuCommand("Проверить на обновления сейчас", updt);
GM_registerMenuCommand("Показать историю и проверить одновременно", ntc);
}
//-----------------------------------------------------------------------------
//	End AutoUpdater
//-----------------------------------------------------------------------------