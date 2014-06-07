// ==UserScript==
// @name           Визуализация транспортировок (Ikariam Military Cargo Expander)
// @namespace      ikariam
// @description	   Показывает значок юнита и количество в военном обзоре
// @homepage	   http://ika-info.ucoz.ru/
// @require        http://ika-info.ucoz.ru/scripts/Script_updater/script_updater.user.js
// @include        http://s*.ikariam.*/index.php?view=militaryAdvisorMilitaryMovements*
// @version	   0.02
// @history        0.02 Информация о предыдущих версиях отсутствует
// @author	   PhasmaExMachina
// ==/UserScript==

// --ScriptUpdater (added by ika-info.ucoz.ru)--
ScriptUpdater.check(65626, '0.02');
// --/ScriptUpdater--


GM_addStyle('.resourcesOnBoard h5 { display:none; }\
			.resourcesOnBoard .unitBox { width:35px; float:left; margin-top:4px; text-align:center; }\
			.resourcesOnBoard .unitBox img { width:20px; }\
			.resourcesOnBoard .unitBox .iconSmall { padding-top:4px; }\
			.resourcesOnBoard .count { text-align:center; font-weight:normal; font-size:10px; }\
			.resourcesOnBoard .icon { text-align:center; }\
			tr.own td:first-child + td {  }');

var elems = document.getElementById('mainview').getElementsByTagName('div');
for(var i = 0; i < elems.length; i++) {
	if(elems[i].className == 'tooltip2' && elems[i].innerHTML.match(/count/)) {
		try {
			var src = elems[i].innerHTML;
			var target = elems[i].parentNode;
			target.wrappedJSObject.onmouseover = null;
			target.style.cursor = "auto";
			target.innerHTML = "";
			target.innerHTML += '<table class="resourcesOnBoard" style="width:275px;">' + src + '</table>';	
		} catch(e) {}
	}
}