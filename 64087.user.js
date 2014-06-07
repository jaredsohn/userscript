// ==UserScript==
// @name           HackThat Plus
// @namespace      http://balcsida.hu
// @description    Plusz funkciók a HackThat-hez
// @include        http://www.hackthat.net/hu/*
// ==/UserScript==
GM_addStyle((<><![CDATA[#plusmenu { align:center; position:fixed; top: 0px; left: 0px; text-align: center; width: 100%; height: 28px; background-position: center; background-image:url('http://beta.hackthat.net/skins/codenameTNP/UI/upperbar.png'); background-repeat: no-repeat; vertical-align: middle; z-index: 100;]]></>).toString());
var plusmenu = document.createElement("div");
plusmenu.innerHTML = '<div id="plusmenu"><form id="form5" name="form5" method="post" action="http://www.hackthat.net/hu/commands/index.hack"> <input type="hidden" name="_target" value="35" /> <input type="hidden" name="_time" value="1500" /> <input name="start_cmd" type="submit" value="Tűzfal fejlesztése" /> <input type="hidden" name="source" id="source" value="1" /> <input type="hidden" name="CMD_ID" id="CMD_ID" value="19" /></form></div>';
document.body.insertBefore(plusmenu, document.body.firstChild);