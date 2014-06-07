// ==UserScript==
// @name           netbios fix
// @namespace      script
// @require        http://userscripts.org/scripts/source/74144.user.js
// @include        http://films.iskra-net.ru/*
// @version	1.1
// @history	1.1 Добавлен автоапдейтер.
// @history	1.0 Релиз.
// ==/UserScript==
//-----------------------------------------------------------------------------
//	AutoUpdater
//-----------------------------------------------------------------------------
function updt()
{
  try {
	ScriptUpdater.forceCheck(84381);
       }
  catch(e) { };
}
updt();
function ntc()
{
  try {
	ScriptUpdater.forceNotice(84381);
       }
  catch(e) { };
}
GM_registerMenuCommand("Проверить на обновления сейчас", updt);
GM_registerMenuCommand("Показать историю и проверить одновременно", ntc);
//-----------------------------------------------------------------------------
//	End AutoUpdater
//-----------------------------------------------------------------------------

for (var i = 0; i < document.links.length; i++) {
   trackerLink = document.links[i];
   repl = new RegExp ("^(file:/*)", "i")
    if (repl.test(trackerLink.href)){
        trackerLink.href = "file://///"+"82.199.96.153/"+ RegExp.rightContext ;
	trackerLink.target="_blank"
	}
}