// ==UserScript==
// @name            The West - Forts Manager [SOM] (beta)
// @namespace       http://userscripts.org/scripts/show/94510
// @description     Script for The-West : Forts Manager [SOM - Scripts-O-Maniacs] [Multilingual] (v1.1.5b)
// @copyright       2010-2011, Zyphir Randrott (The-West fr1)
// @author          Zyphir Randrott
// @website         http://scripts-o-maniacs.leforum.eu
// @license         GPL version 3 or any later version; http://www.gnu.org/licenses/gpl.html
// @license         (CC); http://creativecommons.org/licenses/by-nc-sa/2.0/be/
// @include         http://*.the-west.*/game.php*
// @include         http://userscripts.org/scripts/source/94510.meta.js
// @version         1.1.5b
//
// @history         1.1.5b SOM Manager display fix
// @history         1.1.5a Added SOM Manager
// @history         1.1.5 Language fix.
// @history         1.1.4 Added Dutch translations, thanks to Leones.
// @history         1.1.3 Bugfix on dormitory popup using special characters. Thanks to laccy for reporting and town invitation.
// @history         1.1.2 Added Hungarian translations, thanks to laccy.
// @history         1.1.1 Added Czech translations, thanks to Taubda.
// @history         1.1.0 Added Polish translations, thanks to Darius II.
// @history         1.0.9 Added Russian translations, thanks to Nikitos-barbos.
// @history         1.0.8 Minor layout improvement
// @history         1.0.8 Auto-updater upgrade for Chrome compatibility
// @history         1.0.8 Added Greek translations (thanks to TEObest1), Portuguese/Brazilian (thanks to Marcos Bercke) & Spanish (thanks to KaZaC).
// @history         1.0.8 New script version number structure (Chrome compatible)
// @history         1.07 Bug fix (was happening in case of allied forts without barracks). Thanks to SirEthan for reporting and town invitation.
// @history         1.06 Added German translations, thanks to SirEthan.
// @history         1.05 1.30 compatibility (-> please uninstall any previous version)
// @history         1.05 Added: transit times calculation from the last task position
// @history         1.05 "Go to fort" icon goes red when a fort is under attack or when you take part to a battle
// @history         1.05 Chrome fix
// @history         1.04 "Go to fort" icon is not anymore added when you are townless
// @history         1.04 Map scrolling to your unique fort is now disabled (was happening to users with only 1 fort owned/shared)
// @history         1.04 External forts are now listed when you take part to the battle
// @history         1.04 Added details pop-up when forts are under attack
// @history         1.03 Monkeyupdater replaced by Script Updater "PhasmaExMachina" (Firefox only)
// @history         1.02 -> Improved version : script "Forts Manager"
// @history         1.02 Displays forts sizes, travel times and barracks levels
// @history         1.02 Direct access to barracks
// @history         1.02 Ability to find barracks you share through your ally (max 2 hours around you)
// @history         1.02 Script usable even if you only share barracks through your ally ("Go to fort" icon is added)
// @history         1.02 Forts highlighted when under attack
// @history         1.02 Now Chrome compatible
// @history         1.01 Fixed line breaks on fort names
// @history         1.00 -> Initial release : script "Sort Forts"
// @history         1.00 Ability to sort your forts by proximity
// ==/UserScript==

// ------------------------------------------------------------------------
// ©Copyright 2010-2011 Zyphir Randrott <zyphir.randrott@gmail.com>
// This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.
//
//    This program is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    You should have received a copy of the GNU General Public License
//    along with this program.  If not, see <http://www.gnu.org/licenses/>.
// -------------------------------------------------------------------------------------
//    Content licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 2.0 Belgium License.
//    See <http://creativecommons.org/licenses/by-nc-sa/2.0/be/>.
// -------------------------------------------------------------------------------------------------------

var fm_version = "1.1.5b";


var url = window.location.href;
if (url.indexOf(".the-west.") != -1) {



  var insertBeforeElement = document.getElementById('left_top');
  var newScriptElement = document.createElement('script');
  newScriptElement.setAttribute('type', 'text/javascript');
  var myScript = "var fm_version = '"+fm_version+"';";
  newScriptElement.innerHTML = myScript;
  insertBeforeElement.parentNode.insertBefore(newScriptElement, insertBeforeElement);




(function(f){var d=document,s=d.createElement('script');s.setAttribute('type','application/javascript');s.textContent = '('+f.toString()+')()';(d.body||d.head||d.documentElement).appendChild(s);s.parentNode.removeChild(s)})(function(){

/*
If you want me to add another language, you can send an e-mail to zyphir.randrott@gmail.com.
Make your translation using the structure below and I will update the script as soon as possible ;)
*/

var fm_lang = {
	AFORTSNEARBY: 'Allied barracks nearby',
	AFORTSATTACKED: 'Allied barracks threatened',
	FORTSATTACK: 'Other forts attacked',
	FORTSDEFENSE: 'Other forts defended',
	SEARCHMORE: 'Search for barracks',
	PLEASEWAIT: 'Please wait...',
	NORESULTS: 'No results',
	UPDATING: '<b>New data!</b> Updating...',
	SORTBYPROXIMITY: 'Sort by <b>proximity</b>',
	SORTBYTYPE: 'Sort by <b>type</b>',
	CLOSE: '<b>Close</b>',
	AUTHOR: '<b>Author</b>',
	GOTOFORT: '<b>Go to fort</b>',
	WAYPOINT: '<b>Waypoint</b>: Enable transit times calculation from the last position in your task list',
};
var fm_langs = {};
fm_langs.fr = {
	AFORTSNEARBY: 'Casernes alliées proches',
	AFORTSATTACKED: 'Casernes alliées menacées',
	FORTSATTACK: 'Autres forts attaqués',
	FORTSDEFENSE: 'Autres forts défendus',
	SEARCHMORE: 'Chercher les casernes',
	PLEASEWAIT: 'Veuillez patienter...',
	NORESULTS: 'Aucun résultat',
	UPDATING: '<b>Nouvelles données!</b> Mise à jour...',
	SORTBYPROXIMITY: 'Trier par <b>proximité</b>',
	SORTBYTYPE: 'Trier par <b>type</b>',
	CLOSE: '<b>Fermer</b>',
	AUTHOR: '<b>Auteur</b>',
	GOTOFORT: '<b>Va au fort</b>',
	WAYPOINT: '<b>Etape</b>: Active le calcul des temps de trajet depuis la dernière position de votre liste de tâches',
};
fm_langs.de = { // SirEthan
	AFORTSNEARBY: 'Verbündete Kasernen in der Nähe', 
	AFORTSATTACKED: 'Verbündete Kasernen unter Angriff', 
	FORTSATTACK: 'Andere attackierte Forts', 
	FORTSDEFENSE: 'Andere verteidigte Forts', 
	SEARCHMORE: 'Kasernen suchen', 
	PLEASEWAIT: 'Bitte warten...', 
	NORESULTS: 'Kein Ergebnis', 
	UPDATING: '<b>Neue Daten!</b> Wird erneuert...', 
	SORTBYPROXIMITY: 'Sortieren nach <b>Nähe</b>', 
	SORTBYTYPE: 'Sortieren nach <b>Typ</b>', 
	CLOSE: '<b>Schließen</b>', 
	AUTHOR: '<b>Autor</b>', 
	GOTOFORT: '<b>Gehe zu Fort</b>', 
	WAYPOINT: '<b>Wegpunkt</b>: Aktiviere Wegzeitberechnung von der letzten Position in deiner Arbeitsliste', 
};
fm_langs.gr = { // TEObest1
	AFORTSNEARBY: 'Συμμαχικοί στρατόνες που είναι κοντά',  
	AFORTSATTACKED: 'Συμμαχικοί στρατόνες που απειλούνται',  
	FORTSATTACK: 'Άλλα οχυρά που επιτίθενται',  
	FORTSDEFENSE: 'Άλλα οχυρά που αμύνονται',  
	SEARCHMORE: 'Αναζήτησε οχυρά',  
	PLEASEWAIT: 'Παρακαλώ, περιμένετε...',  
	NORESULTS: 'Δεν βρέθηκε τίποτα',  
	UPDATING: '<b>Κανούργια δεδομένα!</b> Ενημέρωση...',  
	SORTBYPROXIMITY: 'Κατέταξε με βάση την <b>εγγύτητα</b>',  
	SORTBYTYPE: 'Κατέταξε με βάση τον <b>τύπο</b>',  
	CLOSE: '<b>Κλείσιμο</b>',  
	AUTHOR: '<b>Δημιουργός</b>',  
	GOTOFORT: '<b>Πήγαινε στο οχυρό</b>',  
	WAYPOINT: '<b>Ενέργεια:</b> Αν ενεργοποιήσεις την ιδιότητα, θα υπολογίζει τον χρόνο από την τελευταία εργασία στην ουρά εργασιών',
};
fm_langs.br = { // Marcos Bercke
	AFORTSNEARBY: 'Fortes aliados próximos',
	AFORTSATTACKED: 'Fortes aliados sendo atacados',
	FORTSATTACK: 'Outros fortes sendo atacados',
	FORTSDEFENSE: 'Outros fortes sendo defendidos',
	SEARCHMORE: 'Procurar por barracas',
	PLEASEWAIT: 'Aguarde um momento...',
	NORESULTS: 'Sem resultados',
	UPDATING: '<b>Novos dados!</b> Atualizando...',
	SORTBYPROXIMITY: 'Alinhar por <b>proximidade</b>',
	SORTBYTYPE: 'Alinhar por <b>tipo</b>',
	CLOSE: '<b>Fechar</b>',
	AUTHOR: '<b>Autor</b>',
	GOTOFORT: '<b>Ir ao forte</b>',
	WAYPOINT: '<b>Localidade</b>: Permitir o trânsito de cálculo desde a última posição na lista de tarefas',
};
fm_langs.pt =  fm_langs.br;
fm_langs.es = { // KaZaC
    AFORTSNEARBY: 'Fuertes aliados cercanos',
    AFORTSATTACKED: 'Fuertes aliados amenazados',
    FORTSATTACK: 'Otros fuertes atacados',
    FORTSDEFENSE: 'Otros fuertes defendidos',
    SEARCHMORE: 'Buscar fuertes',
    PLEASEWAIT: 'Por favor, espere...',
    NORESULTS: 'Sin resultados',
    UPDATING: '<b>¡Nuevos datos!</b> Actualizando...',
    SORTBYPROXIMITY: 'Ordenar por <b>proximidad</b>',
    SORTBYTYPE: 'Ordenar por <b>tipo</b>',
    CLOSE: '<b>Cerrar</b>',
    AUTHOR: '<b>Autor</b>',
    GOTOFORT: '<b>Ir al fuerte</b>',
    WAYPOINT: '<b>Ruta</b>: Permitir el calculo del tiempo de viaje desde la ultima posicion en la lista de tareas',
};
fm_langs.ru = { // Nikitos-barbos
	AFORTSNEARBY: 'Форты альянса',
	AFORTSATTACKED: 'Форты альянса атакуют',
	FORTSATTACK: 'Атака других фортов',
	FORTSDEFENSE: 'Защита лругих фортов',
	SEARCHMORE: 'Поиск казарм',
	PLEASEWAIT: 'Пожалуйста подождите...',
	NORESULTS: 'Нет результатов',
	UPDATING: '<b>Новые данные!</b> Загрузка...',
	SORTBYPROXIMITY: 'Сортировать по <b>расстоянию</b>',
	SORTBYTYPE: 'Сортировать по <b>типу</b>',
	CLOSE: '<b>Закрыть</b>',
	AUTHOR: '<b>Aвтор</b>',
	GOTOFORT: '<b>Идти к форту</b>',
	WAYPOINT: '<b>Точка отсчёта</b>: Включить отсчёт времени после выполнения последнего задания в очереди',
};
fm_langs.pl = { // Darius II
	AFORTSNEARBY: 'Pobliskie koszary koalicjanta',
	AFORTSATTACKED: 'Atakowane koszary koalicjanta',
	FORTSATTACK: 'Inne atakowane forty',
	FORTSDEFENSE: 'Inne bronione forty',
	SEARCHMORE: 'Wyszukaj koszary',
	PLEASEWAIT: 'Proszę czekać...',
	NORESULTS: 'Brak rezultatów',
	UPDATING: '<b>Nowe dane!</b> Aktualizacja...',
	SORTBYPROXIMITY: 'Sortuj wg <b>odległości</b>',
	SORTBYTYPE: 'Sortuj wg <b>typu</b>',
	CLOSE: '<b>Zamknij</b>',
	AUTHOR: '<b>Autor</b>',
	GOTOFORT: '<b>Idź do fortu</b>',
	WAYPOINT: '<b>Punkt</b>: Włacz tranzyt, czas dojścia będzie uwzględniał punkty tranzytowe',
};
fm_langs.cz = { // Taubda
	AFORTSNEARBY: 'Spojenecká kasárna poblíž',
	AFORTSATTACKED: 'Spojenecká kasárna ohrožena',
	FORTSATTACK: 'Ostatní útoky',
	FORTSDEFENSE: 'Ostatní obrany',
	SEARCHMORE: 'Hledat kasárny',
	PLEASEWAIT: 'Čekejte prosím...',
	NORESULTS: 'Žádný výsledek',
	UPDATING: '<b>Nová data!</b> Nahrávám...',
	SORTBYPROXIMITY: 'Řadit podle <b>vzdálenosti</b>',
	SORTBYTYPE: 'Řadit podle <b>typu</b>',
	CLOSE: '<b>Zavřít</b>',
	AUTHOR: '<b>Autor</b>',
	GOTOFORT: '<b>Jít do pevnosti</b>',
	WAYPOINT: '<b>Cestovní bod</b>: Povolit časy výpočtu z posledního místa v seznamu úkolů', 
};
fm_langs.hu = { // laccy
	AFORTSNEARBY: 'Szövetséges erődök',
	AFORTSATTACKED: 'Támadott szövetséges erődök',
	FORTSATTACK: 'Más erődtámadások',
	FORTSDEFENSE: 'Más erődvédések',
	SEARCHMORE: 'Kaszárnyák keresése',
	PLEASEWAIT: 'Kérlek várj...',
	NORESULTS: 'Nincs eredmény',
	UPDATING: '<b>Új adat!</b> Frissítés...',
	SORTBYPROXIMITY: 'Szűrés <b>távolságra</b>',
	SORTBYTYPE: 'Szűrés <b>típusra</b>',
	CLOSE: '<b>Bezár</b>',
	AUTHOR: '<b>Szerző</b>',
	GOTOFORT: '<b>Menj az erődhöz</b>',
	WAYPOINT: '<b>Fordulópont</b>: Engedélyezze a munkalistád utolsó elemétől való távolság számítását', 
};
fm_langs.nl = { // Leones
	AFORTSNEARBY: 'Geallieerde barakken dichtbij',
	AFORTSATTACKED: 'Geallieerde barakken onder aanval',
	FORTSATTACK: 'Andere forten aangevallen',
	FORTSDEFENSE: 'Andere forten verdedigd',
	SEARCHMORE: 'Zoek naar barakken',
	PLEASEWAIT: 'Even geduld aub...',
	NORESULTS: 'Geen resultaten',
	UPDATING: '<b>Nieuwe data!</b> Updaten...',
	SORTBYPROXIMITY: 'Sorteer op <b>afstand</b>',
	SORTBYTYPE: 'Sorteer op <b>type</b>',
	CLOSE: '<b>Sluit</b>',
	AUTHOR: '<b>Auteur</b>',
	GOTOFORT: '<b>Ga naar fort</b>',
	WAYPOINT: '<b>Wegwijzer</b>: Schakel reistijd berekening in vanaf de laatste arbeid in je lijst',
};
var fm_langname = location.host.match(/(\D+)\d+\./);
if(fm_langname && fm_langs[fm_langname[1]]) fm_lang = fm_langs[fm_langname[1]];
//fm_lang = fm_langs['nl'];


  function fm_addGlobalStyle(css){
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) {return;}
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
  }

  function fm_getCookie(c_name){
	if (document.cookie.length>0){
	  c_start=document.cookie.indexOf(c_name + "=");
	  if (c_start!=-1){
		c_start=c_start + c_name.length+1;
		c_end=document.cookie.indexOf(";",c_start);
		if (c_end==-1) c_end=document.cookie.length;
		  return unescape(document.cookie.substring(c_start,c_end));
		}
	}
	return "";
  }
  
  function fm_setCookie(c_name,value,expiredays){
	var exdate=new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	document.cookie=c_name+ "=" +escape(value)+
	((expiredays==null) ? "" : ";expires="+exdate.toUTCString());
  }

  function fm_sortby(index,direction) {
	return function(a,b){
		a = a[index];
		b = b[index];
		return a == b ? 0 : (a < b ? -1*direction : direction)
		}
  }

  function fm_waypoint(){
	if($('waypoint').checked == true){
	  fm_setCookie('fortsmanager_waypoint', "true", 365)
	  fm_waypoint_flag = "checked";  
	}
	else{
	  fm_setCookie('fortsmanager_waypoint', "false", 365)  
	  fm_waypoint_flag = "";  
	}
  }

  function fm_set_actual_position(az){
	if (fm_waypoint_flag == "checked" && Tasks.tasks.length > 0){
	  for (var i=Tasks.tasks.length-1;i>=0;i--){
		if (Tasks.tasks[i].data_obj.to_x != undefined && Tasks.tasks[i].data_obj.to_y != undefined){
		  fm_actual_position = Tasks.tasks[i].data_obj.to_x+"_"+Tasks.tasks[i].data_obj.to_y;
		  fm_actual_position_x = Tasks.tasks[i].data_obj.to_x;
		  fm_actual_position_y = Tasks.tasks[i].data_obj.to_y;
		  break;
		}
		else{
		  fm_actual_position = pos.x+"_"+pos.y;
		  fm_actual_position_x = pos.x;
		  fm_actual_position_y = pos.y;
		}
	  }
	}
	else{
	  fm_actual_position = pos.x+"_"+pos.y;
	  fm_actual_position_x = pos.x;
	  fm_actual_position_y = pos.y;
	}
	return fm_actual_position;
  }

  function fm_calcprox(x, y){
	var from=WMap.coordWeirdToCoordNormal(fm_actual_position_x,fm_actual_position_y);
	var to=WMap.coordWeirdToCoordNormal(x,y);
	fm_disttime = Math.round(Math.sqrt((from.x-to.x)*(from.x-to.x)+(from.y-to.y)*(from.y-to.y))*Character.speed);
	return fm_disttime;
  }
   
  function fm_calctime(fm_disttime){
	var hours = Math.floor(fm_disttime/60);
	var minutes = fm_disttime%60;
	if (String(minutes).length == 1){
	  minutes="0"+minutes;
	}
	fm_transittime = hours + ":" + minutes;
	return fm_transittime;
  }

  function fm_lvl_fort_src(lvl, fm_fort_type){
	switch (parseInt(lvl)) {
	 case 1:
		switch (parseInt(fm_fort_type)) {
		 case 1:
		  lvl_fort_src ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGAgMAAACdogfbAAAADFBMVEUKLJ8HO+kEFk7///9GQvmNAAAABHRSTlP///8AQCqp9AAAAAFiS0dEAxEMTPIAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAbSURBVHjaY/j4geHzB4ZfHxgaGhhaFRhWLQAAWTgInnzhBcgAAAAASUVORK5CYII=";
		  break;
		 case 2:
		  lvl_fort_src ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAARUlEQVR42mNg+C/HwPBfjqGYc/7/pewv/8P4DMgScEFkCXMWv//mLH4ISXMWv//FnPPhGMaHSyxlf/l/KftLuCTcCHQMANPMOWY3zqPGAAAAAElFTkSuQmCC";
		  break;
		 case 3:
		  lvl_fort_src ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAARElEQVR42mO4JXeL4ZbcLQbBEOX/olUG/2F8BmQJGBtFgl1T4D+7pgBCB7umwH/BEGU4hvHhEqJVBv9FqwzgknAj0DEAY704EXkxZGUAAAAASUVORK5CYII=";
		  break;
		 case 4:
		  lvl_fort_src ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGAgMAAACdogfbAAAADFBMVEWfcAnpogdONQT///9BgFeiAAAABHRSTlP///8AQCqp9AAAAAFiS0dEAxEMTPIAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAbSURBVHjaY/j4geHzB4ZfHxgaGhhaFRhWLQAAWTgInnzhBcgAAAAASUVORK5CYII=";
		  break;
		 case 5:
		  lvl_fort_src ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGAgMAAACdogfbAAAADFBMVEWfGQrpHgdOCwT///8eZoETAAAABHRSTlP///8AQCqp9AAAAAFiS0dEAxEMTPIAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAbSURBVHjaY/j4geH3B4ZfHxgWLGBoVWBYtQAAW4gI5sDAywgAAAAASUVORK5CYII=";
		  break;
		 case 6:
		  lvl_fort_src ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAW0lEQVR42lXLoQ3AMAwEwAeWLNUkAQUlIUFhncQo03SZTpYBMsUXOW2BpX/dG4PAIJB75SzK6PhC5B9oS3ST90NbYu6VuVfex0Y3oZtwwX6dnEUXQltiXKzdhA8E6DooWlvBuAAAAABJRU5ErkJggg==";
		  break;
		}
		break;
	 case 2:
		switch (parseInt(fm_fort_type)) {
		 case 1:
		  lvl_fort_src ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGAgMAAACdogfbAAAADFBMVEUHO+kKLJ8EFk7///+s/uaAAAAABHRSTlP///8AQCqp9AAAAAFiS0dEAxEMTPIAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAaSURBVHjaY7B3YPhfwFC/gCEzgcEhgWHVAgAyNAXBGNaiowAAAABJRU5ErkJggg==";
		  break;
		 case 2:
		  lvl_fort_src ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAARUlEQVR42l2MSw0AIAxDeyAhM4ENXGBmgnZCHCrKhQ7C4SX9pZh1EWwQbsFZF/GGKsCGKw69DPYyCLegjFtQPj9FFlr/bPbXPFROyXsbAAAAAElFTkSuQmCC";
		  break;
		 case 3:
		  lvl_fort_src ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAARElEQVR42l2MKw4AIAxD67BMYDFTOA6z03DUXaaoLgTxkv5SjLOZMyEsnONs4g1V5EyUEG11ttUJC6eMhVO+PkUVWv9cTLE36ckmQXUAAAAASUVORK5CYII=";
		  break;
		 case 4:
		  lvl_fort_src ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGAgMAAACdogfbAAAADFBMVEXpogefcAlONQT///9Us6IcAAAABHRSTlP///8AQCqp9AAAAAFiS0dEAxEMTPIAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAaSURBVHjaY7B3YPhfwFC/gCEzgcEhgWHVAgAyNAXBGNaiowAAAABJRU5ErkJggg==";
		  break;
		 case 5:
		  lvl_fort_src ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGAgMAAACdogfbAAAADFBMVEXpHgefGQpOCwT////hf+myAAAABHRSTlP///8AQCqp9AAAAAFiS0dEAxEMTPIAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAaSURBVHjaY7B3YPi/gWH/AoasBAaHBIZVCwA4PAZCMjQjCgAAAABJRU5ErkJggg==";
		  break;
		 case 6:
		  lvl_fort_src ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAWUlEQVR42l2LoQ0AIRAEV5BcAgYEAoNB4agERTU0Q2UUQBWLuvB5MWZnFnE2bgLKSpYnC/EdN4HuDDcBhFH4F90ZIoxCqZ5SPbszXMk+EWdjnI0nyxNa60O59II6GIfJx+kAAAAASUVORK5CYII=";
		  break;
		}
		break;
	 case 3:
		switch (parseInt(fm_fort_type)) {
		 case 1:
		  lvl_fort_src ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAGAgMAAAByYGzlAAAADFBMVEUHO+kKLJ8EFk7///+s/uaAAAAABHRSTlP///8AQCqp9AAAAAFiS0dEAxEMTPIAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAaSURBVHjaY7C/wPDlDkP5C4asCAYHCYZVKwBBRgarESilbwAAAABJRU5ErkJggg==";
		  break;
		 case 2:
		  lvl_fort_src ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAGCAYAAAAPDoR2AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAS0lEQVR42mWMwQ3AMAgD/UCKWII12IJlGIhXhssU7qdBqH2cZM4y2OsQNExSi3sd/sWbQUOHFjS4BF2CSC3ewyWYWryu3026nKsvD/3RSMA0Qed/AAAAAElFTkSuQmCC";
		  break;
		 case 3:
		  lvl_fort_src ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAGCAYAAAAPDoR2AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAS0lEQVR42mWMoRFAMQhDcVgQtRgUrsMwTUdlmXxFj+sX70jCJbTORlnRRNOxzsYvaF1WdEXfsiIOAYeANB1tOASajs7u3OQ+Z+vlAz6yQPH3u/nbAAAAAElFTkSuQmCC";
		  break;
		 case 4:
		  lvl_fort_src ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAGAgMAAAByYGzlAAAADFBMVEXpogefcAlONQT///9Us6IcAAAABHRSTlP///8AQCqp9AAAAAFiS0dEAxEMTPIAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAaSURBVHjaY7C/wPDlDkP5C4asCAYHCYZVKwBBRgarESilbwAAAABJRU5ErkJggg==";
		  break;
		 case 5:
		  lvl_fort_src ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAGAgMAAAByYGzlAAAADFBMVEXpHgefGQpOCwT////hf+myAAAABHRSTlP///8AQCqp9AAAAAFiS0dEAxEMTPIAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAbSURBVHjaY7C/wPDlDcPuFwxZMxgcJBhWrQAARsIHP6LAG3UAAAAASUVORK5CYII=";
		  break;
		 case 6:
		  lvl_fort_src ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAGCAYAAAAPDoR2AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAYklEQVR42k2LoRHAIBAEXzDzM8EEgYjBROGoBEU1NENlFEAVG5H5BLFm905iL0xEdsZ1sJLyidBuVlImItU7JvJKizas3lG9Q0K70Xyi+cTkuI4/xl6IvbCSspL+0V7703gAQKlD+OeMUTQAAAAASUVORK5CYII=";
		  break;
		}
		break;
	}
	return lvl_fort_src;
  }


  function fm_battle_popup(fm_j){
	for (var i=0; i<fm_battles_array[0].length; i++) {
	  if (fm_battles_array[0][i] == "'"+fm_forts_array[fm_j].l_x+"_"+fm_forts_array[fm_j].l_y+"'"){
		if (fm_forts_array[fm_j]["l_owner"] == FM.lang.FORTSATTACK || fm_forts_array[fm_j]["l_type"] == 6) {
		  return escape(fm_battles_array[1][i].replace(/(\d+:\d+)/g,"<b>$1</b>")+"<br>"+fm_battles_array[2][i]+"<br><center><img src=\"images/fort/battle/divider.png\"><br>&nbsp;<img src=\"images/fort/battle/attacker_primary.png\" width=\"#width\" height=\"#height\"> <span style=\"color:#A50010;\">"+String(fm_forts_array[fm_j].l_defenders).replace("-2", "?").replace(/(\d+)/g,"<b>$1</b>")+"/"+String(fm_forts_array[fm_j].l_lvl).replace("1", "50").replace("2", "100").replace("3", "140").replace(/(\d+)/g,"<b>$1</b>")+"</span> | <span style=\"color:#0F6488;\">?/"+String(fm_forts_array[fm_j].l_lvl).replace("2", "84").replace("1", "42").replace("3", "120").replace(/(\d+)/g,"<b>$1</b>")+" <img src=\"images/fort/battle/defender_primary.png\" width=\"#width\" height=\"#height\"></center>");
		}
		else {
		  return escape(fm_battles_array[1][i].replace(/(\d+:\d+)/g,"<b>$1</b>")+"<br>"+fm_battles_array[2][i]+"<br><center><img src=\"images/fort/battle/divider.png\"><br>&nbsp;<img src=\"images/fort/battle/defender_primary.png\" width=\"#width\" height=\"#height\"> <span style=\"color:#0F6488;\">"+String(fm_forts_array[fm_j].l_defenders).replace("-2", "?").replace(/(\d+)/g,"<b>$1</b>")+"/"+String(fm_forts_array[fm_j].l_lvl).replace("2", "84").replace("1", "42").replace("3", "120").replace(/(\d+)/g,"<b>$1</b>")+"</span> | <span style=\"color:#A50010;\">?/"+String(fm_forts_array[fm_j].l_lvl).replace("1", "50").replace("2", "100").replace("3", "140").replace(/(\d+)/g,"<b>$1</b>")+" <img src=\"images/fort/battle/attacker_primary.png\" width=\"#width\" height=\"#height\"></center>");
		}
	  break;
	  }
	}
  }


  function fm_add_popup(obj, strpopup){
	obj.addMousePopup(new MousePopup(unescape(unescape(strpopup).replace(/\\/g,"%"))));
  }

  function fm_init(){
	if(Character.home_town != null) {
	  if (fm_getCookie('fortsmanager_waypoint') == ''){
		fm_setCookie('fortsmanager_waypoint', "false", 365);
		fm_waypoint_flag = "";  
	  }
	  else if(fm_getCookie('fortsmanager_waypoint') == "true"){	
		fm_waypoint_flag = "checked";  
	  }
	  else{
		fm_waypoint_flag = "";  
	  }
	  fm_actual_position = "0";
	  fm_saveposition = "0";
	  fm_save_list_forts = "0";
	  if($('scroll_to_fort_list').innerHTML.length == 137 || $('scroll_to_fort_list').innerHTML.length == 159){ // FF:98 - Chrome:100 -> 1.30 -> FF:137 - Chrome:159
		fm_verticalpos = parseInt($('chatwindow').getSize().size.y+40);
		fm_searchmore="only";
		fm_searchonly=true;
	  }
	  else{
		if($('scroll_to_fort_list').innerHTML == ""){
		  fm_verticalpos = parseInt($('chatwindow').getSize().size.y);
		  FortList.single=function(){};
		}
		else {
		  fm_verticalpos = 103;
		}
	  fm_searchmore=false;
	  fm_searchonly=false;
	  }
	  if (TheWestApi.version >= 1.30) fm_verticalpos = -25; // 1.30 
	  fm_addGlobalStyle('#scroll_to_fort_list {bottom:'+fm_verticalpos+'px; left:19px}');
	  fm_addGlobalStyle('#scroll_to_fort_list {width:auto;}');
	  fm_addGlobalStyle('#fort_list_closer {left:0px; margin : 0 auto; position:relative;}');
	  fm_addGlobalStyle('#new_fort_table td {vertical-align:top; padding:0px 0px 1px 3px;}');
	  fm_addGlobalStyle('#new_fort_table td.tdmiddle {vertical-align:middle;}');
	  fm_addGlobalStyle('#new_fort_table td.tdbottom {vertical-align:bottom;}');
	  $('footer_fort_overview_icon').addMousePopup(new MousePopup('<b>Forts Manager<\/b>'));
	
	  fm_tw_listforts = new Array(["1","20"],["89","53"],["41","155"],["94","303"],["1","420"],["59","377"],
							["1","724"],["93","652"],["58","648"],["8","934"],["92","847"],["38","900"],
							["194","115"],["110","88"],["149","175"],["186","308"],["113","457"],["148","410"],
							["117","571"],["190","705"],["148","649"],["104","934"],["194","854"],["153","895"],
							["291","30"],["209","168"],["240","102"],["207","434"],["296","427"],["259","367"],
							["212","644"],["295","702"],["256","636"],["289","896"],["207","768"],["247","895"],
							["315","220"],["395","2"],["354","125"],["389","280"],["311","302"],["354","350"],
							["394","721"],["309","515"],["348","635"],["395","902"],["321","770"],["346","893"],
							["499","245"],["408","76"],["453","148"],["404","472"],["493","404"],["443","396"],
							["404","594"],["490","627"],["444","626"],["416","894"],["499","869"],["452","877"],
							["594","97"],["514","74"],["550","107"],["596","376"],["507","483"],["542","408"],
							["514","705"],["593","516"],["554","650"],["506","769"],["593","891"],["560","870"],
							["696","129"],["604","214"],["646","116"],["610","444"],["698","303"],["655","376"],
							["612","673"],["691","574"],["651","597"],["603","992"],["690","801"],["643","868"],
							["739","31"],["707","11"],["754","164"],["795","397"],["705","442"],["751","373"],
							["706","557"],["797","587"],["755","664"],["703","891"],["790","982"],["743","823"],
							["898","177"],["806","226"],["848","127"],["806","256"],["894","473"],["845","380"],
							["802","701"],["894","529"],["854","642"],["805","977"],["896","857"],["840","954"],
							["908","105"],["991","52"],["950","73"],["998","489"],["907","268"],["938","321"],
							["923","713"],["994","535"],["947","648"],["915","943"],["994","805"],["947","835"]);
	
	  new Ajax('game.php?window=fort_overview', {
		method:'post',
		data:{},
		onComplete:function(data) {
		  //alert(data);
		  //alert(data.substring(25000));
		  fm_search_list_forts = new RegExp("<div id=\\\\\"ownforts\\\\\">\.+<div id=\\\\\"lastbattle\\\\\">");
		  fm_search_list_forts = data.match(fm_search_list_forts);
		  fm_search_battle_forts = new RegExp("<div id=\\\\\"incomingbattle\\\\\">\.+<div id=\\\\\"ownforts\\\\\">");
		  fm_search_battle_forts = data.match(fm_search_battle_forts);
		  fm_search_coord_battle_forts = new RegExp("'\\d+_\\d+'", "g");
		  fm_search_coord_battle_forts = String(String(fm_search_battle_forts).match(fm_search_coord_battle_forts));
		  fm_search_time_battle_forts = new RegExp("<strong>[^<]+<\\\\\/strong>[^<]+<\\\\\/span>", "g");
		  fm_search_time_battle_forts = String(String(fm_search_battle_forts).match(fm_search_time_battle_forts)).replace(/<\\\/span>/g,"").replace(/<\\\/strong>/g,"</strong>");
		  fm_search_attacker_battle_forts = new RegExp("<strong>[^)]+<\\\\\\\\\\\\/strong>[^)]+\\\\\"\\)", "g");
		  fm_search_attacker_battle_forts = String(data.match(fm_search_attacker_battle_forts)).replace(/\\\"\)/g,"").replace(/<\\\\\\\/strong>/g,"</strong>").replace(/\\\\/g,"\\");
		  fm_battles_array = new Array;
		  fm_battles_array[0] = fm_search_coord_battle_forts.split(",");
		  fm_battles_array[1] = fm_search_time_battle_forts.split(",");
		  fm_battles_array[2] = fm_search_attacker_battle_forts.split(",");
  
		  fm_make_array(fm_searchmore, fm_search_list_forts);
		}
	  }).request();
	}
  }

  function fm_make_array(getsearchmore, fm_search_list_forts){
	fm_searchmore = getsearchmore;
	if (fm_actual_position == "0"){
	  fm_set_actual_position("1");
	}
	fm_saveposition=fm_actual_position_x+"_"+fm_actual_position_y;
	fm_savecharspeed=Character.speed;
	FM.fort = {};
	  for (i=0;i<fm_tw_listforts.length;i++){
		FM.fort["_"+fm_tw_listforts[i][0]+"_"+fm_tw_listforts[i][1]+"_"] = {};
		FM.fort["_"+fm_tw_listforts[i][0]+"_"+fm_tw_listforts[i][1]+"_"].x = fm_tw_listforts[i][0];
		FM.fort["_"+fm_tw_listforts[i][0]+"_"+fm_tw_listforts[i][1]+"_"].y = fm_tw_listforts[i][1];
		FM.fort["_"+fm_tw_listforts[i][0]+"_"+fm_tw_listforts[i][1]+"_"].duration = fm_calcprox(FM.fort["_"+fm_tw_listforts[i][0]+"_"+fm_tw_listforts[i][1]+"_"].x, FM.fort["_"+fm_tw_listforts[i][0]+"_"+fm_tw_listforts[i][1]+"_"].y);
		FM.fort["_"+fm_tw_listforts[i][0]+"_"+fm_tw_listforts[i][1]+"_"].size = (i%3)+1;
	  }
  
	if (fm_save_list_forts == "0"){
	  fm_save_list_forts = String(fm_search_list_forts);
	}
	else {
	  if (TheWestApi.version >= 1.30){
		fm_verticalpos = -25; // 1.30 
		fm_addGlobalStyle('#scroll_to_fort_list {bottom: '+fm_verticalpos+'px;}');
	  }
	  else{
		fm_addGlobalStyle('#scroll_to_fort_list {bottom:'+parseInt($('chatwindow').getSize().size.y+40)+'px;}');
	  }
	  $('scroll_to_fort_list').innerHTML = '<table id="new_fort_table" cellspacing="0"><tr><td><table><tr id="updating" style="display:inline"><td colspan="2" style="font-size: 8pt;" nowrap>'+FM.lang.UPDATING+'</td><td></td><td></td></tr></table></td></tr></table>';
	}
  
	fm_fortname_ind2 = 0;
	fm_fortowner_ind1 = fm_save_list_forts.indexOf("fortOverviewTitle\\\">", fm_fortname_ind2);
	fm_fortowner_ind2 = fm_save_list_forts.indexOf("<\\\/h2>", fm_fortowner_ind1);
	fm_fortowner = unescape((fm_save_list_forts.substring(fm_fortowner_ind1+20, fm_fortowner_ind2)).replace(/\\/g,"%"));
	fm_fortname_ind2=fm_fortowner_ind2+6;
	
	fm_tab_lines=0;
	fm_save_tab_lines=9999;
	fm_fortposx_ind1 = 1;
	fm_i=0;
	fm_fort_type = 1;
	fm_forts_array = new Array();
	fm_tmp_other_battles_array = new Array();
  
	while (fm_fortposx_ind1 > 0) {
	  if(fm_save_list_forts.indexOf("fortOverviewTitle\\\">", fm_fortname_ind2) < fm_save_list_forts.indexOf("scroll_map_to_pos(", fm_fortname_ind2) && fm_save_list_forts.indexOf("fortOverviewTitle\\\">", fm_fortname_ind2) != -1){
		fm_fortowner_ind1 = fm_save_list_forts.indexOf("fortOverviewTitle\\\">", fm_fortname_ind2);
		fm_fortowner_ind2 = fm_save_list_forts.indexOf("<\\\/h2>", fm_fortowner_ind1);
		fm_fortowner = unescape((fm_save_list_forts.substring(fm_fortowner_ind1+20, fm_fortowner_ind2)).replace(/\\/g,"%"));
		fm_fort_type = 2;
	  }
	  fm_fortposx_ind1 = fm_save_list_forts.indexOf("scroll_map_to_pos(", fm_fortname_ind2);
	  if (fm_fortposx_ind1 == -1) {
		break;}
	  fm_fortposx_ind2 = fm_save_list_forts.indexOf(",", fm_fortposx_ind1);
	  fm_fortposx = parseInt(fm_save_list_forts.substring(fm_fortposx_ind1+18, fm_fortposx_ind2));
	  fm_fortposy_ind2 = fm_save_list_forts.indexOf(")", fm_fortposx_ind2);
	  fm_fortposy = parseInt(fm_save_list_forts.substring(fm_fortposx_ind2+1, fm_fortposy_ind2));
	  fm_fortname_ind1 = fm_save_list_forts.indexOf("')\\\">", fm_fortposy_ind2);
	  fm_fortname_ind2 = fm_save_list_forts.indexOf("<\\\/a>", fm_fortname_ind1);
	  fm_fortname = unescape((fm_save_list_forts.substring(fm_fortname_ind1+5, fm_fortname_ind2)).replace(/\\/g,"%"));
	  fm_fortname_ind2 = fm_fortname_ind2+5;
	  fm_disttime = fm_calcprox(fm_fortposx, fm_fortposy);
	  
	  fm_forts_array[fm_i] = new Array(14);
	  fm_forts_array[fm_i]={l_index:fm_i, l_time:fm_disttime, l_fortname:fm_fortname, l_x:fm_fortposx, l_y:fm_fortposy, l_coord:fm_fortposx+"_"+fm_fortposy, l_owner:fm_fortowner, l_lvl:FM.fort["_"+fm_fortposx+"_"+fm_fortposy+"_"].size, l_type:fm_fort_type, l_id:"-1", l_stars:"-1", l_hotelpopup:"-1", l_battle:"-1", l_defenders:"-1"};
 		fm_tmp_other_battles_array[fm_i] = new Array(3);
		fm_tmp_other_battles_array[fm_i]={l_index:"-1", l_owner:"-1", l_type:"-1"};
 
	  fm_i++;
	}
  
	for(fm_j=0; fm_j<fm_i; fm_j++){
	  fm_get_ajax_data(fm_j);
	}

	fm_update_searchmore(fm_searchmore);
	fm_add_battles();
  }
  
  function fm_update_searchmore(getsearchmore){
	fm_searchmore = getsearchmore;
	$('footer_fort_overview_icon').parentNode.href = "javascript:FM.fm_check('"+fm_searchmore+"')";  
  }

  function fm_get_ajax_data(fm_i, fm_gx, fm_gy){
	if (fm_gx != undefined && fm_gy != undefined){
	  fm_x= fm_gx;
	  fm_y = fm_gy;
	}
	else{
	  fm_x = fm_forts_array[fm_i].l_x;
	  fm_y = fm_forts_array[fm_i].l_y;
	}
	new Ajax('game.php?window=fort&x=' + fm_x + '&y=' + fm_y, {
	  method:'post',
	  data:{},
	  onComplete:function(data) {
		//alert(data);
		fm_search_fort_id = new RegExp("fort_profile_(\\d+)_reopen");
		fm_search_fort_id = data.match(fm_search_fort_id);
		if (fm_search_fort_id != null){
		  fm_forts_array[fm_i]["l_id"] = fm_search_fort_id[1];
		  fm_search_battle = new RegExp("'fort_battlepage'");
		  fm_search_battle = data.match(fm_search_battle);
		  if (fm_search_battle != null){
			fm_forts_array[fm_i]["l_battle"] = 1;
			fm_search_fort_name = new RegExp("fort_name\\\\\" style=\\\\\"display: none;\\\\\">([^<]+)<\\\\\/div>");
			fm_search_fort_name = data.match(fm_search_fort_name);
			fm_forts_array[fm_i]["l_fortname"]=unescape((fm_search_fort_name[1]).replace(/\\/g,"%"));
			new Ajax('game.php?window=fort_battlepage&fort_id=' + fm_search_fort_id[1], {
			  method:'post',
			  data:{},
			  onComplete:function(data) {
				//alert(data);
				//alert(data.substring(10000));
				fm_search_defenders_battle_forts = new RegExp("\\[\\\\\"\.+\\\\\"\\]");
				fm_search_defenders_battle_forts = String(data.match(fm_search_defenders_battle_forts));
				fm_search_now_battle_forts = new RegExp("FortBattle.init\.+null,\.+Character.name");
				fm_search_now_battle_forts = String(data.match(fm_search_now_battle_forts));
				if ((fm_search_defenders_battle_forts != "\[\\\"ok\\\"\]" && fm_search_defenders_battle_forts != "null") || (fm_search_now_battle_forts != "null" && fm_search_now_battle_forts.indexOf("null") == -1)) {
				  tmparray_defenders = fm_search_defenders_battle_forts.split(",");
				  fm_search_side_battle_forts = new RegExp("\\\\\"defender\\\\\":true");
				  fm_search_side_battle_forts = data.match(fm_search_side_battle_forts);
				  fm_forts_array[fm_i]["l_defenders"] = tmparray_defenders.length;
				  if (fm_forts_array[fm_i]["l_owner"] == "fortattack" || fm_forts_array[fm_i]["l_owner"] == FM.lang.AFORTSATTACKED || fm_forts_array[fm_i]["l_owner"] == "-2") {
					fm_searchmore=false;
					fm_update_searchmore(fm_searchmore);
					if (fm_forts_array[fm_i]["l_stars"] == -1){
					  fm_forts_array[fm_i]["l_stars"] = -2;
					}
					if (fm_forts_array[fm_i]["l_hotelpopup"] == -1){
					  fm_forts_array[fm_i]["l_hotelpopup"] = -2;
					}
					if (fm_search_side_battle_forts != null){
					  fm_tmp_other_battles_array[fm_i]["l_index"] = fm_i+3000;
					  fm_tmp_other_battles_array[fm_i]["l_type"] = 4;
					  fm_tmp_other_battles_array[fm_i]["l_owner"] = FM.lang.FORTSDEFENSE;
					}
					else{
					  fm_tmp_other_battles_array[fm_i]["l_index"] = fm_i+4000;
					  fm_tmp_other_battles_array[fm_i]["l_type"] = 5;
					  fm_tmp_other_battles_array[fm_i]["l_owner"] = FM.lang.FORTSATTACK;
					}
				  }
				  else {
					fm_tmp_other_battles_array[fm_i]["l_owner"] = "-2";
					fm_tmp_other_battles_array[fm_i]["l_index"] = -2;
					fm_tmp_other_battles_array[fm_i]["l_type"] = -2;
				  }
				}
				else {
				  fm_forts_array[fm_i]["l_defenders"] = -2;
				  fm_tmp_other_battles_array[fm_i]["l_owner"] = "-2";
				  fm_tmp_other_battles_array[fm_i]["l_index"] = -2;
				  fm_tmp_other_battles_array[fm_i]["l_type"] = -2;
				}
			  }
			}).request();
		  }
		  else {
			fm_forts_array[fm_i]["l_battle"] = -2;
			fm_forts_array[fm_i]["l_defenders"] = -2;
			fm_tmp_other_battles_array[fm_i]["l_index"] = -2;
			fm_tmp_other_battles_array[fm_i]["l_owner"] = "-2";
			fm_tmp_other_battles_array[fm_i]["l_type"] = -2;
		  }
		  new Ajax('game.php?window=fort_building_barracks&fort_id=' + fm_search_fort_id[1], {
			method:'post',
			data:{},
			onComplete:function(data) {
			  //alert(data);
			  fm_search_fort_name = new RegExp("'\\);\\\\\">(\.+)<\\\\\/a><br");
			  fm_search_fort_name = data.match(fm_search_fort_name);
			  if (fm_search_fort_name != null){
				if (fm_forts_array[fm_i]["l_owner"] == FM.lang.AFORTSNEARBY){
				  fm_forts_array[fm_i]["l_type"] = 3;
				}
				if (fm_forts_array[fm_i]["l_owner"] == "fortattack"){
				  fm_forts_array[fm_i]["l_index"] = fm_i+2000;
				  fm_forts_array[fm_i]["l_type"] = 3;
				  fm_searchmore=false;
				  fm_update_searchmore(fm_searchmore);
				  fm_forts_array[fm_i]["l_owner"] = FM.lang.AFORTSATTACKED;
				}
				else {
				  fm_forts_array[fm_i]["l_index"] = fm_i+1000;
				}
				if (fm_gx != undefined && fm_gy != undefined){
				  fm_forts_array[fm_i]["l_fortname"]=unescape((fm_search_fort_name[1]).replace(/\\/g,"%"));
				}
				fm_search_hotel_stars = new RegExp("star(\\d+).png");
				fm_search_hotel_stars = data.match(fm_search_hotel_stars);
				fm_forts_array[fm_i]["l_stars"] = fm_search_hotel_stars[1];
				fm_search_hotel_popup = new RegExp("room_name\\\\\">.+<\\\\\/span> (.+)<\\\\\/td>\\\\n\\\\n");
				fm_search_hotel_popup = data.match(fm_search_hotel_popup);
				fm_forts_array[fm_i]["l_hotelpopup"] = (" "+fm_search_hotel_popup[1]+" ").replace(/( \d+ )/g,"<b>$1</b>");
			  }
			  else if (fm_gx != undefined && fm_gy != undefined && fm_search_fort_name == null){
				fm_forts_array[fm_i]["l_stars"] = -2;
				fm_forts_array[fm_i]["l_hotelpopup"] = -2;
				fm_forts_array[fm_i]["l_index"] = -2;
				fm_forts_array[fm_i]["l_owner"] = -2;
				fm_forts_array[fm_i]["l_type"] = -2;
			  }
  			  else{
				fm_forts_array[fm_i]["l_index"] = fm_i+1000;
				fm_forts_array[fm_i]["l_stars"] = -2;
				fm_forts_array[fm_i]["l_hotelpopup"] = -2;
			  }
			}
		  }).request();
		}
		else {
		  fm_forts_array[fm_i]["l_id"] = -2;
		  fm_forts_array[fm_i]["l_stars"] = -2;
		  fm_forts_array[fm_i]["l_hotelpopup"] = -2;
		  fm_forts_array[fm_i]["l_defenders"] = -2;
		  fm_forts_array[fm_i]["l_index"] = -2;
		  fm_forts_array[fm_i]["l_owner"] = -2;
		  fm_forts_array[fm_i]["l_type"] = -2;
		}
	  }
	}).request();
  }

  function fm_prepare_div(fm_i, fm_t){
	if (fm_forts_array[fm_i-1] != undefined){
	  for (fm_t; fm_t<fm_i; fm_t++){
		if (fm_forts_array[fm_t]["l_index"] == -1 || fm_forts_array[fm_t]["l_id"] == -1 || fm_forts_array[fm_t]["l_stars"] == -1 || fm_forts_array[fm_t]["l_hotelpopup"] == -1 || fm_forts_array[fm_t]["l_battle"] == -1 || fm_forts_array[fm_t]["l_defenders"] == -1 || fm_forts_array[fm_t]["l_owner"] == "fortattack" || fm_forts_array[fm_t]["l_type"] == -1 || fm_tmp_other_battles_array[fm_t]["l_index"] == -1 || fm_tmp_other_battles_array[fm_t]["l_owner"] == "-1" || fm_tmp_other_battles_array[fm_t]["l_type"] == -1 || (fm_tmp_other_battles_array[fm_t]["l_index"] != -1 && fm_tmp_other_battles_array[fm_t]["l_index"] != -2 && fm_forts_array[fm_t]["l_index"] == -2 && fm_searchmore == false) || (fm_tmp_other_battles_array[fm_t]["l_owner"] != "-1" && fm_tmp_other_battles_array[fm_t]["l_owner"] != "-2" && fm_forts_array[fm_t]["l_owner"] == "-2" && fm_searchmore == false) || (fm_tmp_other_battles_array[fm_t]["l_type"] != -1 && fm_tmp_other_battles_array[fm_t]["l_type"] != -2 && fm_forts_array[fm_t]["l_type"] == -2 && fm_searchmore == false)){
		  if (fm_tmp_other_battles_array[fm_t]["l_index"] != -1 && fm_tmp_other_battles_array[fm_t]["l_index"] != -2 && fm_forts_array[fm_t]["l_index"] == -2 && fm_searchmore == false){
			fm_forts_array[fm_t]["l_index"] = fm_tmp_other_battles_array[fm_t]["l_index"];
		  }
		  if (fm_tmp_other_battles_array[fm_t]["l_owner"] != "-1" && fm_tmp_other_battles_array[fm_t]["l_owner"] != "-2" && fm_forts_array[fm_t]["l_owner"] == "-2" && fm_searchmore == false){
			fm_forts_array[fm_t]["l_owner"] = fm_tmp_other_battles_array[fm_t]["l_owner"];
		  }
		  if (fm_tmp_other_battles_array[fm_t]["l_type"] != -1 && fm_tmp_other_battles_array[fm_t]["l_type"] != -2 && fm_forts_array[fm_t]["l_type"] == -2 && fm_searchmore == false){
			fm_forts_array[fm_t]["l_type"] = fm_tmp_other_battles_array[fm_t]["l_type"];
		  }
		  setTimeout(fm_prepare_div, 100, fm_i, fm_t);
		  break;
		}
		else {
		  if (fm_tmp_other_battles_array[fm_t]["l_type"] == 5 && fm_forts_array[fm_t]["l_owner"] == FM.lang.AFORTSATTACKED){
			fm_forts_array[fm_t]["l_type"] = 6;
		  }
		  if (fm_t == fm_i-1){
			if (fm_getCookie('fortsmanager')){
			  fm_make_div(fm_getCookie('fortsmanager'));
			}
			else {
			  fm_make_div('l_index');
			}
			if (fm_searchmore == true && fm_save_tab_lines == fm_tab_lines) {
			  $('searchmore').innerHTML = '<td colspan="2" style="font-size: 8pt;" nowrap><b>'+FM.lang.NORESULTS+'</b></td><td></td><td></td>';
			  $('searchmore').style.display="inline";
			  if (fm_save_tab_lines == 0 && fm_tab_lines == 0){
				$('footer_fort_overview_icon').parentNode.href = "javascript:FM.fm_show();"; 
				$('sortby').style.display = "none"; 
				$('waypoint').style.display = "none"; 
			  }
			}
			else if (fm_searchmore == true && fm_save_tab_lines != fm_tab_lines){
			  $('footer_fort_overview_icon').parentNode.href = "javascript:FM.fm_show();"; 
			}
			if (fm_searchonly != true){
			  fm_addGlobalStyle('#scroll_to_fort_list {bottom: '+fm_verticalpos+'px;}');
			}
		  }
		}
	  }
	}
	else{
	  $('footer_fort_overview_icon').parentNode.style.display = "inline";
	  if (fm_searchmore == true){
		$('scroll_to_fort_list').innerHTML = '<table id="new_fort_table" cellspacing="0"><tr><td><table><tr><td></td><td></td><td><div style="cursor: pointer;" id="fort_list_closer" onclick="FM.fm_hide();"></div></td></tr><tr id="searchmore" style="display:inline"><td colspan="2" style="font-size: 8pt;" nowrap><b>'+FM.lang.NORESULTS+'</b></td><td></td><td></td></tr></table></td></tr></table>';
		$('footer_fort_overview_icon').parentNode.href = "javascript:FM.fm_show();"; 
	  }
	}
  }

  function fm_make_div(index){
	fm_forts_array.sort(fm_sortby(index, 1));
	index == "l_index" ? index = "l_time" : index = "l_index";

	if (fm_searchmore != "only") {
	  fm_forts_div = '<table id="new_fort_table" cellspacing="0"><tr><td><table>';
	  fm_tab_lines = 0;
	  fm_bgpos = "-258";
	  for (fm_j=0; fm_j<fm_forts_array.length; fm_j++){
		if (fm_forts_array[fm_j].l_index != "-2") {
		  if (fm_tab_lines == 0){
			if (index == "l_time"){
			  fm_fortowner_title = fm_forts_array[fm_j].l_owner;
			  fm_sortby_popup = FM.lang.SORTBYPROXIMITY;
			}
			else {
			  fm_fortowner_title = '</strong><nobr><strong><span id="fm_author">Forts Manager</span></strong> <small><a href="http://userscripts.org/scripts/show/94510" target="blank">v'+fm_version+'</a></small></nobr><strong>';
			  fm_sortby_popup = FM.lang.SORTBYTYPE;
			}
			fm_forts_div = fm_forts_div +'<tr><td class="tdbottom" style="font-size: 8pt;"><strong>'+fm_fortowner_title+'</strong></td><td class="tdmiddle" align="right"><input id="waypoint" type="checkbox" onclick="FM.fm_waypoint(); FM.fm_hide();" '+fm_waypoint_flag+'></td><td><div id="sortby" style="cursor: pointer; background:url(../images/main/map_arrows.png) 20px 0px;  width: 20px; height: 20px; margin : 0 auto;" onclick="FM.fm_make_div(\''+index+'\'); FM.fm_setCookie(\'fortsmanager\',\''+index+'\',365);"></div></td><td><div style="cursor: pointer;" id="fort_list_closer" onclick="FM.fm_hide();"></div></td></tr>';
		  }
		  else if (fm_tab_lines%15==0){
			fm_forts_div = fm_forts_div +'</table></td><td><table><tr><td colspan="4">&nbsp;</td></tr>';
		  }
		  if (fm_forts_array[fm_j].l_owner != fm_fortowner_title && index == "l_time"){
			fm_forts_div = fm_forts_div +'<tr><td colspan="2" style="font-size: 8pt;"><strong>'+fm_forts_array[fm_j].l_owner+'</strong></td><td></td><td></td></tr>';
			fm_fortowner_title = fm_forts_array[fm_j].l_owner;
		  }
		  fm_forts_div = fm_forts_div +'<tr><td colspan="2" class="tdmiddle" align="left" nowrap><img onLoad="FM.fm_add_popup(this, escape(\''+FM.lang.GOTOFORT+'\'));" src="'+FM.fm_lvl_fort_src(fm_forts_array[fm_j].l_lvl, fm_forts_array[fm_j].l_type)+'" onclick="FM.fm_hide(); WMap.scroll_map_to_pos('+fm_forts_array[fm_j].l_x+','+fm_forts_array[fm_j].l_y+');" style="cursor:pointer;"> <a';
		  if (fm_forts_array[fm_j].l_battle == "1") {
			if(fm_bgpos != "-295"){
			  fm_addGlobalStyle('#footer_fort_overview_icon {background-position: -295px 0px;}');
			  fm_bgpos = "-295";
			}
			fm_forts_div = fm_forts_div +' style="color:#A50010;" onmouseover="this.style.color=\'\';" onmouseout="this.style.color=\'#A50010\';"';
		  }
		  fm_forts_div = fm_forts_div +' href="javascript: FM.fm_hide(); AjaxWindow.show(\'fort\', {x:'+fm_forts_array[fm_j].l_x+',y:'+fm_forts_array[fm_j].l_y+'}, \''+fm_forts_array[fm_j].l_x+'_'+fm_forts_array[fm_j].l_y+'\');">'+fm_forts_array[fm_j].l_fortname+'</a>'
  //		fm_forts_div = fm_forts_div +' href="javascript: FM.fm_hide(); AjaxWindow.show(\'fort\', {x:'+fm_forts_array[fm_j].l_x+',y:'+fm_forts_array[fm_j].l_y+'}, \''+fm_forts_array[fm_j].l_x+'_'+fm_forts_array[fm_j].l_y+'\');">Own/Allied Fort #'+fm_tab_lines+'</a>'
		  if (fm_forts_array[fm_j].l_battle == "1") {
			fm_forts_div = fm_forts_div +' <img onLoad="FM.fm_add_popup(this, \''+fm_battle_popup(fm_j)+'\');" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAA6lBMVEVcXV1OUFBXV1ZUUEtoZmaCdWR9dW5yamFuYVBwVzw6ODfg0L7ey7TTvaTUu5vQtI/GpHrAnG+9lWS7kFujfVJOSUVCQkNLTEyTjYrbw6aej3nArZS9o4Gvkm+6ilmqhVVhWlOHgXtgaXkxVZEySWoPJTK4YGTIgnGZfFfGsJMbSZPFi4rTnpb9tb2ccluPcEpbXlgGN3kjNUcpKTXmiJOKVUh+a0+li2p0a15TQS+yc3O6UEd9ZUeegmOMZlX5m6WWOieFcV2DZ0SPd1V1Xkafc1CaeE6kgVSyiVaWelelhFyReVktLCv///8RGKIhAAAATnRSTlP//////////////////////////////////////////////////////////////////////////////////////////////////////wCsTfvOAAAAAWJLR0RNgGggZQAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAONJREFUeNo9z9tSwkAMBuB0lxZSD2hpt6hIRWVBCyweVqUghwqFFff9X8dYZkyu/m8yyQSsrTgMABjnjFWsBQvM9arVGhWiYBbAOzo+Oa2fnQdBoxFGDsTNi8ur1nVAud1ObnxwOvXbu/uuL2WvFxog8B7gkSAdDNORognutsZPz92XdPAq9RtB5L5/ND0xkZmc6lkJn/NFppdTKbP5AfqrhdZaZumohDj/Qo2IZIh/OzjO1kptCqVypcormKPa7pIkLIrCEMCktlbb777ZG7Nf+THYWDAG1DzizBf0rRU//0XpF13EIrFK3TomAAAAAElFTkSuQmCC" onclick="FM.fm_hide(); AjaxWindow.show(\'fort_battlepage\',{fort_id:'+fm_forts_array[fm_j].l_id+'},\''+fm_forts_array[fm_j].l_id+'\');" width="12" height="12" style="cursor:pointer;">';
		  }
		  fm_forts_div = fm_forts_div +'&nbsp;</td><td class="tdmiddle" style="font-size: 8pt;" align="right">'+fm_calctime(fm_forts_array[fm_j].l_time)+'&nbsp;</td><td class="tdmiddle">'
		  if (fm_forts_array[fm_j].l_stars > -1) {
		  fm_forts_div = fm_forts_div +'<img onLoad="FM.fm_add_popup(this, escape(fm_forts_array['+fm_j+'].l_hotelpopup));" src="images/hotel_stars/star'+fm_forts_array[fm_j].l_stars+'.png" onclick="FM.fm_hide(); AjaxWindow.show(\'fort_building_barracks\',{fort_id:'+fm_forts_array[fm_j].l_id+'},\''+fm_forts_array[fm_j].l_id+'\');" width="16" height="16" style="cursor:pointer;">'
		  }
		  fm_forts_div = fm_forts_div +'</td></tr>';
		  fm_tab_lines++;
		}
		if (fm_j==fm_forts_array.length-1 && fm_tab_lines == 0){
		  fm_sortby_popup="";
		  fm_forts_div = fm_forts_div +'<tr><td class="tdbottom" style="font-size: 8pt;"><strong></strong></td><td class="tdmiddle" align="right"><input id="waypoint" type="checkbox" onclick="FM.fm_waypoint(); FM.fm_hide();" '+fm_waypoint_flag+'></td><td><div id="sortby" style="cursor: pointer; background:url(../images/main/map_arrows.png) 20px 0px;  width: 20px; height: 20px; margin : 0 auto;"></div></td><td><div style="cursor: pointer;" id="fort_list_closer" onclick="FM.fm_hide();"></div></td></tr>';
		}
	  }
	  fm_forts_div = fm_forts_div + '<tr id="searchmore" style="display:none"><td colspan="2" style="font-size: 8pt;"><a style="color:#143B50;" onmouseover="this.style.color=\'\';" onmouseout="this.style.color=\'#143B50\';" href="javascript:FM.fm_addmore();" onclick="$(\'sortby\').onclick=\'\'">'+FM.lang.SEARCHMORE+'</a></td><td></td><td></td></tr>';
	  fm_forts_div = fm_forts_div + '</table></td></tr></table>';
	  
	  $('scroll_to_fort_list').innerHTML = fm_forts_div;
	  FM.fm_add_popup($('sortby'), escape(fm_sortby_popup));
	  if (fm_searchmore != true) {
		$('searchmore').style.display="inline";
	  }
	  FM.fm_add_popup($('fort_list_closer'), escape(FM.lang.CLOSE));
	  FM.fm_add_popup($('waypoint'), escape(FM.lang.WAYPOINT));
	  if ($('fm_author') != null){
		FM.fm_add_popup($('fm_author'), escape(FM.lang.AUTHOR+': Zyphir Randrott'));
	  }
	}
	$('footer_fort_overview_icon').parentNode.style.display = "inline";
  }

  function fm_check(fm_searchmore){
	if (fm_searchmore == "only") {
	  fm_forts_div = '<table id="new_fort_table" cellspacing="0"><tr><td><table><tr id="searchmore" style="display:inline"><td class="tdbottom" style="font-size: 8pt;" nowrap><a style="color:#143B50;" onmouseover="this.style.color=\'\';" onmouseout="this.style.color=\'#143B50\';" href="javascript:FM.fm_addmore();">'+FM.lang.SEARCHMORE+'</a></td></td><td></td><td><div style="cursor: pointer;" id="fort_list_closer" onclick="FM.fm_hide();"></div></td></tr><td></td><td></td></tr></table></td></tr></table>';
	  $('scroll_to_fort_list').innerHTML = fm_forts_div;
	  FM.fm_add_popup($('fort_list_closer'), escape(FM.lang.CLOSE));
	}
	else{
	  if (fm_saveposition != fm_set_actual_position("2") || fm_savecharspeed!=Character.speed){
		fm_saveposition = fm_actual_position;
		fm_savecharspeed=Character.speed;
		fm_make_array('false');
	  }
	}
	$('scroll_to_fort_list').style.display = "inline";
  }

  function fm_show(){
	if (fm_saveposition != fm_set_actual_position("3") || fm_savecharspeed!=Character.speed){
	  fm_saveposition = fm_actual_position;
	  fm_savecharspeed=Character.speed;
	  if (fm_searchonly == true){
		fm_forts_array = new Array();
		fm_make_array('only');
		FM.fm_check('only');
	  }
	  else{
		fm_make_array('false');
	  }
	}
	$('scroll_to_fort_list').style.display = "inline";
  }

  function fm_hide(){
	$('scroll_to_fort_list').style.display = "none";
	if (fm_searchmore == true && fm_save_tab_lines == fm_tab_lines && fm_tab_lines != 0) {
	  $('searchmore').style.display="none";
	}
  }

  function fm_addmore(){
	fm_searchmore = true;
	fm_save_tab_lines = fm_tab_lines;
	$('searchmore').innerHTML = '<td colspan="2" style="font-size: 8pt;" nowrap>'+FM.lang.PLEASEWAIT+'</td><td></td><td></td>';

	for (var f in FM.fort){
	  if (fm_i > 0){
		for(fm_j=fm_i-1; fm_j>=0; fm_j--){
		  if (fm_forts_array[fm_j]["l_coord"] == FM.fort[f].x+"_"+FM.fort[f].y){
			fm_fort_exist = true;
			break;
		  }
		  else{
			fm_fort_exist = false;
		  }
		}
	  }
	  else{
		fm_fort_exist = false;
	  }
	  if (fm_fort_exist == false && FM.fort[f].duration < 120 && fm_search_coord_battle_forts.indexOf("'"+FM.fort[f].x+"_"+FM.fort[f].y+"'") == -1){ // Increasing this value will slow down the script and generate a lot of requests to The West servers. Moreover, it is useless. So please do not modify :)
		fm_forts_array[fm_i] = new Array(14);
		fm_forts_array[fm_i]={l_index:"-1", l_time:FM.fort[f].duration, l_fortname:"fortnearby", l_x:FM.fort[f].x, l_y:FM.fort[f].y, l_coord:FM.fort[f].x+"_"+FM.fort[f].y, l_owner:FM.lang.AFORTSNEARBY, l_lvl:FM.fort[f].size, l_type:"-1", l_id:"-1", l_stars:"-1", l_hotelpopup:"-1", l_battle:"-1", l_defenders:"-1"};
		fm_tmp_other_battles_array[fm_i] = new Array(3);
		fm_tmp_other_battles_array[fm_i]={l_index:"-1", l_owner:"-1", l_type:"-1"};
		fm_get_ajax_data(fm_i, FM.fort[f].x, FM.fort[f].y);
		fm_i++;
	  }
	}
	fm_prepare_div(fm_i, 0);
  }


  function fm_add_battles(){
	for (var f in FM.fort){
	  if (fm_i > 0){
		for(fm_j=fm_i-1; fm_j>=0; fm_j--){
		  if (fm_forts_array[fm_j]["l_coord"] == FM.fort[f].x+"_"+FM.fort[f].y){
			fm_fort_exist = true;
			break;
		  }
		  else{
			fm_fort_exist = false;
		  }
		}
	  }
	  else{
		fm_fort_exist = false;
	  }
	  if (fm_fort_exist == false && fm_search_coord_battle_forts.indexOf("'"+FM.fort[f].x+"_"+FM.fort[f].y+"'") != -1){
		fm_forts_array[fm_i] = new Array(14);
		fm_forts_array[fm_i]={l_index:"-1", l_time:FM.fort[f].duration, l_fortname:"fortattack", l_x:FM.fort[f].x, l_y:FM.fort[f].y, l_coord:FM.fort[f].x+"_"+FM.fort[f].y, l_owner:"fortattack", l_lvl:FM.fort[f].size, l_type:"-1", l_id:"-1", l_stars:"-1", l_hotelpopup:"-1", l_battle:"-1", l_defenders:"-1"};
		fm_tmp_other_battles_array[fm_i] = new Array(3);
		fm_tmp_other_battles_array[fm_i]={l_index:"-1", l_owner:"-1", l_type:"-1"};
		fm_get_ajax_data(fm_i, FM.fort[f].x, FM.fort[f].y);
		fm_i++;
	  }
	}
	fm_prepare_div(fm_i, 0);
  }

if(typeof window.FM == 'undefined'){
  try{
	window.FM = new Object();
	FM.lang = fm_lang;
	FM.fm_waypoint = fm_waypoint;
	FM.fm_make_div = fm_make_div;
	FM.fm_addmore = fm_addmore;
	FM.fm_add_popup = fm_add_popup;
	FM.fm_setCookie = fm_setCookie;
	FM.fm_lvl_fort_src = fm_lvl_fort_src;
	FM.fm_check = fm_check;
	FM.fm_show = fm_show;
	FM.fm_hide = fm_hide;
//	window.setTimeout(fm_init, 0);
	window.addEvent('domready', fm_init);
  }catch(e){alert(e)}
}


///////////* SOM Manager by Zyphir */////////////

  var som_scripts_list = [[20110529],['TW Pro+','92'+'414','Zyphir'],['Wardrobe','94'+'811','Dun'],['Shortcuts','92'+'957','Gzahab'],['Forts Manager','86'+'724','Zyphir'],['Notepad','99'+'336','Dun'],['ChatRoom','95'+'135','Y.'],['Duel Page','96'+'794','Dun'],['Vote on JA (fr)','98'+'477','Zyphir']];
  som_scripts_list[4].push(1, fm_version);

  function create_som_div(){
	  var som_scripts_div = document.createElement('div');
	  som_scripts_div.id = "som_scripts_div";
	  som_scripts_div.style.cssText = "position:absolute;float:left;font-Size:10px;left:-100px;bottom:15px;display:none;z-index:9999";
	  var som_scripts_div_table = '<table style="border: solid 1px #666666;background: url(../images/profile/settings_profile_input_bg.png);font-size:12px;vertical-align:top">';
	  for(i=1;i<som_scripts_list.length;i++){
		som_scripts_div_table += '<tr><td><img id="active_som_script_'+som_scripts_list[i][1]+'" src="/images/confirm_buttons/'+(som_scripts_list[i][3]==1?'yes':'no')+'.png" width="16" height="16" title="'+(som_scripts_list[i][4]?'<b>'+som_scripts_list[i][4]+'</b>':'')+'"></td><td><a href="http://userscripts.org/scripts/show/'+som_scripts_list[i][1]+'" target="_blank">'+som_scripts_list[i][0]+'</a></td><td>'+som_scripts_list[i][2]+'</td></tr>';
	  }
	  som_scripts_div_table += '</table>';
	  som_scripts_div.innerHTML = som_scripts_div_table;
	  document.getElementById('main_footnotes').appendChild(som_scripts_div);
  }

 if(document.getElementById('som_scripts_manager')){
	if(som_scripts_list[0] > document.getElementById('som_button').name){
		for(i=1;i<som_scripts_list.length;i++){
			if(document.getElementById('active_som_script_'+som_scripts_list[i][1])){
				if(document.getElementById('active_som_script_'+som_scripts_list[i][1]).src.indexOf('yes.png')!=-1){
					som_scripts_list[i].push(1, document.getElementById('active_som_script_'+som_scripts_list[i][1]).title);
				}
			}			
		}
		document.getElementById('som_scripts_div').parentNode.removeChild(document.getElementById('som_scripts_div'));
		create_som_div();
	}
	else if(document.getElementById('active_som_script_86'+'724')){
		document.getElementById('active_som_script_86'+'724').src="/images/confirm_buttons/yes.png";
		document.getElementById('active_som_script_86'+'724').title='<b>'+fm_version+'</b>';
	}
	else{
		document.getElementById('som_scripts_div').innerHTML = document.getElementById('som_scripts_div').innerHTML.replace("</table>","<tr><td><img id='active_som_script_94510' src='/images/confirm_buttons/yes.png' width='16' height='16' title='<b>"+fm_version+"</b>'></td><td><a href='http://userscripts.org/scripts/show/94510' target='_blank'>Forts Manager</a></td><td>Zyphir</td></tr></table>");
	}
 }
 else{
	function show_som_scripts(){
		if(document.getElementById('workbar_left')){
			if(document.getElementById('som_scripts_div').style.display == "none"){
			  document.getElementById('workbar_left').style.zIndex="1";
			  document.getElementById('som_scripts_div').style.display = "block";}
			else{
  			  document.getElementById('workbar_left').style.zIndex="5";
			  document.getElementById('som_scripts_div').style.display = "none";
			}
		}
	}
	window.show_som_scripts = show_som_scripts;
	var som_button = document.createElement('div');
	som_button.style.cssText = "position:absolute;float:left;font-Size:10px;left:-100px;top:5px";
	som_button.id = "som_button";
	som_button.name = som_scripts_list[0];
	som_button.innerHTML = '<div id="som_scripts_manager"><a href="javascript:window.show_som_scripts();"><img title="<b>SOM Scripts</b>" src="http://img574.imageshack.us/img574/6460/greasemonkeyico.png"></a></div>';
	document.getElementById('main_footnotes').appendChild(som_button);
	create_som_div();
 }

///////////* end SOM Manager */////////////


})

/***************************************************************
* DOM Storage Wrapper Class
* 
* Public members:
*     ctor({"session"|"local"}[, <namespace>])
*     setItem(<key>, <value>)
*     getItem(<key>, <default value>)
*     removeItem(<key>)
*     keys()
***************************************************************/
function Storage(type, namespace) {
	var object = this;

	if(typeof(type) != "string")
		type = "session";

	switch(type) {
		case "local": {
			object.storage = localStorage;
		} break;

		case "session": {
			object.storage = sessionStorage;
		} break;

		default: {
			object.storage = sessionStorage;
		} break;
	}

	if (!namespace || (typeof(namespace) != "string" && typeof(namespace) != "number"))
		namespace = "ScriptStorage";

	object.namespace = [namespace, "."].join("");

	object.setItem = function(key, value) {
		try {
			object.storage.setItem(escape([object.namespace, key].join("")), JSON.stringify(value));
		}
		catch(e) {
		}
	}

	object.getItem = function(key, defaultValue) {
		try {
			var value = object.storage.getItem(escape([object.namespace, key].join("")));
			if(value)
				return eval(value);
			else
				return defaultValue;
		}
		catch(e) {
			return defaultValue;
		}
	}

	object.removeItem = function(key) {
		try {
			object.storage.removeItem(escape([object.namespace, key].join("")));
		}
		catch(e) {
		}
	}

	object.keys = function() {
		var array = [];
		var i = 0;
		do {
			try {
				var key = unescape(object.storage.key(i++));
				if(key.indexOf(object.namespace) == 0 && object.storage.getItem(key))
					array.push(key.slice(object.namespace.length));
			}
			catch(e) {
				break;
			}
		} while(true);
		return array;
	}
}

/***************************************************************
* ScriptUpdater Class
* 
* Public members:
*     ScriptUpdater.check(<script id>, <current script version>[, <callback function>])
*     ScriptUpdater.forceCheck(<script id>, <current script version>[, <callback function>])
*     ScriptUpdater.forceNotice(<script id>, <current script version>[, <callback function>])
***************************************************************/
ScriptUpdater = {
	id: 74144,
	version: "1.03",
	scriptId: null,
	scriptCurrentVersion: null,
	scriptCallbackFunction: null,
	scriptUseNotice: null,
	scriptForceNotice: null,
	scriptMetaTags: null,
	scriptStorage: null,
	icons: {
		install: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALZSURBVBgZBcFLiFVlAADg7zzuPLzjzDjOMINMitIie5gF+UAkIZSgRQuXLZIWrY021dYIggJdJURElJsoqlWRYA9GshGFCNQeOjoTk6bjeOd5zzn/f07flzRNA459ObcHJ3cM9+1fq2prVa2qa+uh7mAZ9xCxiAV8iu9zgDqEvU9ODOx//dkxALBa1kNrZT202I2TZcVyEd28t+Lb66uHcTwHqEMYH+xJwNyDqJUk8oQsp7eV2tqbytJUK+OpyX5bhtojH07Pv58CxKoabOeEmuUy0al4UNDp0umysM5/KxG8eWbW/u1tj4+2xnKAWFUjG3tSqwWr3ShNEzmyjDQjk8gSaiRxyYUbiy7PduZzgFiW40P9mc56sFY00rSRpaQxkaVkGlmGJnNnqXDq7N9LOJYDhLLcNj7Y0uk2AjRkMZE2iGQaeZOqG2IrCmXY/s1rB+6nALEstk0M9VotG0lKliRSpEjw+YUjPjq3RxkKoSjEsoiQwvMnvusXQ09vK1VGUg1qjVrUqDWKUJoc3emVj3dbWeuEUJZLkEMoyrF2u0+aUEPD19OHNXVQ1kEZgy2bHrZzYq/l7qr766/m3VC0ub+SQyyLDXm7R56SpYlYJ0JdOvzYy2JTi3VUa8x35jwxecBKue7S7E+dXW+nI/nB42dGcWLPI1vdXmrcvBO1++iGUmxqtxb+UtVBqCtVrCwVy3Y/dNBKtZb+OjO1kMeyfA4vXLo6Y3E9t1I0qtjo6goxGB/cKtRRbGr/dmaNDEy4PHfe+etTd8vgSB6r6ukXD+3qf+ulfQDg6OnCJ7+8p6xL3VDaMfqofTuOuHhryrk/fl4tokPz7zRX8lhVM7fvdXx29qrhgX7Dg32G271OHv3dxg09entSvXnqmXcHJGm/6Ru/ad89dmrm9AdXIK9D+GLq4rXJqYvXtmEzNmMTNmGor6fV6utr6YxWfvjzR0P/vDGTh7GvAP4H2uh1wse2x/0AAAAASUVORK5CYII%3D",
		close: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIhSURBVDjLlZPrThNRFIWJicmJz6BWiYbIkYDEG0JbBiitDQgm0PuFXqSAtKXtpE2hNuoPTXwSnwtExd6w0pl2OtPlrphKLSXhx07OZM769qy19wwAGLhM1ddC184+d18QMzoq3lfsD3LZ7Y3XbE5DL6Atzuyilc5Ciyd7IHVfgNcDYTQ2tvDr5crn6uLSvX+Av2Lk36FFpSVENDe3OxDZu8apO5rROJDLo30+Nlvj5RnTlVNAKs1aCVFr7b4BPn6Cls21AWgEQlz2+Dl1h7IdA+i97A/geP65WhbmrnZZ0GIJpr6OqZqYAd5/gJpKox4Mg7pD2YoC2b0/54rJQuJZdm6Izcgma4TW1WZ0h+y8BfbyJMwBmSxkjw+VObNanp5h/adwGhaTXF4NWbLj9gEONyCmUZmd10pGgf1/vwcgOT3tUQE0DdicwIod2EmSbwsKE1P8QoDkcHPJ5YESjgBJkYQpIEZ2KEB51Y6y3ojvY+P8XEDN7uKS0w0ltA7QGCWHCxSWWpwyaCeLy0BkA7UXyyg8fIzDoWHeBaDN4tQdSvAVdU1Aok+nsNTipIEVnkywo/FHatVkBoIhnFisOBoZxcGtQd4B0GYJNZsDSiAEadUBCkstPtN3Avs2Msa+Dt9XfxoFSNYF/Bh9gP0bOqHLAm2WUF1YQskwrVFYPWkf3h1iXwbvqGfFPSGW9Eah8HSS9fuZDnS32f71m8KFY7xs/QZyu6TH2+2+FAAAAABJRU5ErkJggg%3D%3D",
		uso: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAh9JREFUeNp0krmLWnEQxyf7zLoajyIWXojIxkK0EiIGCRamCKQwEdIIgYQoQSR/wLY2goVVJGCa1BaL2liKBESFiOJFiMRb1xMVRbx+mfdA0RwDA4/3m+Mz3xmAf9hDNJ/P9zWXy935/f7A5eXlFfzPRCKROBgMfqvX62S5XBLabDbbh8M76zRYKpUqvF5vyGw2P+bz+cBisWCz2cB2u33wV2WFQvEoFArlW60WmUwmZLVakdFoRNxu9xd8Fp51UKlUWmS91ev11zweD5AZMAFmsxkgWhpDpsfKarVaE4lEqpVKhUynU4a73++TcrlMarUa6Xa7G7vd/u4QT93c3HzmcrlPSqUSiMVihrvX68F6vYZsNkvPcOFyuV5Uq9VuoVD4ztrv91wOhwMCgQAGgwEsFguYz+eMSyQSkMvlwGazqUAg8KnRaHSo4XA4Q9leYRdmHrpyJpMBehaDwQBCoRB2ux2gapRSqbymsP2PTqezsFqtz+6hpVIpprLRaGTw8BcgBVOo2WyOj8NbLJaP+Xx+k0gkCL00xGNEoJ2WOZlMznQ6nfVsFyaT6X273d4eAmkfj8ckHo+PNRrNSzrm4jRBq9XysDWF18Cg0OzpdPrO6XS+QRVvz6oj0nOch25NYrEYgxEOhxsymezpadyxA8p5HxUDXBTgSUA0Gv3pcDheI2LiNIE6fOAN/cKkK9RdUSwWkx6P5y0mZv+8ud8CDABidDMA4Sb2JAAAAABJRU5ErkJggg%3D%3D"
	},


	$: function(id) {
		return document.getElementById(id);
	},

	initialize: function(scriptId, scriptCurrentVersion, scriptCallbackFunction, scriptUseNotice, scriptForceNotice) {
		ScriptUpdater.scriptId = scriptId;
		ScriptUpdater.scriptCurrentVersion = scriptCurrentVersion;
		ScriptUpdater.scriptCallbackFunction = typeof(scriptCallbackFunction) == "function" ? scriptCallbackFunction : false;
		ScriptUpdater.scriptUseNotice = scriptUseNotice;
		ScriptUpdater.scriptForceNotice = scriptForceNotice;
		if(ScriptUpdater.scriptStorage == null) {
			ScriptUpdater.scriptStorage = new Storage("local", "ScriptUpdater." + scriptId);
		}
	},

	setValue: function(key, value) {
		if(ScriptUpdater.scriptStorage != null) {
			ScriptUpdater.scriptStorage.setItem(key, value);
		}
	},

	getValue: function(key, defaultValue) {
		if(ScriptUpdater.scriptStorage != null) {
			return ScriptUpdater.scriptStorage.getItem(key, defaultValue);
		}
		else {
			return defaultValue;
		}
	},

	getOffers: function() {
		var offers = ScriptUpdater.getValue("offers", "");
		return (typeof(offers) == "undefined" || typeof(offers.length) == "undefined" || typeof(offers.push) == "undefined") ? new Array() : offers;
	},

	addOffer: function(version) {
		var offers = ScriptUpdater.getOffers();
		offers.push(version);
		ScriptUpdater.setValue("offers", offers);
	},

	alreadyOffered: function(version) {
		var offers = ScriptUpdater.getOffers();
		for(var i = 0; i < offers.length; i++) {
			if(version.toString() == offers[i].toString())
				return true;
		}
		return false;
	},

	addStyle: function(css) {
		var head = document.getElementsByTagName("head")[0];
		if (!head)
			return;
		var style = document.createElement("style");
		style.type = "text/css";
		style.textContent = css;
		head.appendChild(style);
	},

	parseMetaTags: function(metaTags) {
	 function find_meta(element, index, array) {  
	   return (element.indexOf("// @") != -1);  
	 }  
		var headers = {};
		var name, prefix, header, key, value;
		var lines = metaTags.split(/\n/).filter(find_meta);
		for(var i in lines) {
			if(typeof(lines[i]) == "string") {
				name = lines[i].match(/\/\/ @(\S+)\s*.*/)[1];
				value = lines[i].match(/\/\/ @\S+\s*(.*)/)[1];
				key = name.split(/:/).reverse()[0];
				prefix = name.split(/:/).reverse()[1];
				
				if(prefix) {
					if(!headers[prefix]) {
						headers[prefix] = new Object;
					}
					header = headers[prefix];
				}
				else {
					header = headers;
				}
				
				if(header[key] && !(header[key] instanceof Array)) {
					header[key] = new Array(header[key]);
				}

				if(header[key] instanceof Array)
					header[key].push(value);

				else
					header[key] = value;
			}
		}
		return headers;
	},

	checkRemoteScript: function() {
		
		if(ScriptUpdater.scriptCurrentVersion && !ScriptUpdater.alreadyOffered(ScriptUpdater.scriptCurrentVersion)) {
			ScriptUpdater.addOffer(ScriptUpdater.scriptCurrentVersion);
		}
		
		var date = new Date();
		ScriptUpdater.setValue("lastCheck", parseInt(date.getTime()));

		var su_script=document.createElement('iframe');
		su_script.setAttribute('id', 'updater_94510');
		su_script.setAttribute('style', 'display:none;');
		su_script.src="http://userscripts.org/scripts/source/94510.meta.js";
		document.body.appendChild(su_script);

		window.addEventListener('message', onMessage, true);


		function onMessage(e){
		if (e.origin != "http://userscripts.org") return;
		  myversion = unescape(e.data);
		  if (myversion.substring(0, myversion.indexOf("/")) == 94510) gonextstep();
		}
		function gonextstep(){
			ScriptUpdater.scriptMetaTags = ScriptUpdater.parseMetaTags(myversion);
			ScriptUpdater.setValue("versionAvailable", ScriptUpdater.scriptMetaTags.version);
			if(ScriptUpdater.scriptForceNotice || (!ScriptUpdater.alreadyOffered(ScriptUpdater.scriptMetaTags.version) && ScriptUpdater.scriptUseNotice)) {
				if(!ScriptUpdater.alreadyOffered(ScriptUpdater.scriptMetaTags.version)) {
					ScriptUpdater.addOffer(ScriptUpdater.scriptMetaTags.version);
				}
				ScriptUpdater.showNotice();
			}
			if(typeof(ScriptUpdater.scriptCallbackFunction) == "function") {
				ScriptUpdater.scriptCallbackFunction(ScriptUpdater.scriptMetaTags.version);
			}
		}
	},

	getLastCheck: function() {
		return ScriptUpdater.getValue("lastCheck", 0);
	},

	getInterval: function() {
		var interval = ScriptUpdater.getValue("interval", 86400000);
		return (typeof(interval) == "undefined" || !interval.toString().match(/^\d+$/)) ? 86400000 : parseInt(interval.toString());
	},

	setInterval: function(interval) {
		ScriptUpdater.setValue("interval", parseInt(interval));
	},

	check: function(scriptId, scriptVersion, scriptCallbackFunction) {
		ScriptUpdater.initialize(scriptId, scriptVersion, scriptCallbackFunction, true, false);
		var date = new Date();
		if((date.getTime() - ScriptUpdater.getLastCheck()) > ScriptUpdater.getInterval()) {
			ScriptUpdater.checkRemoteScript();
		}
	},

	forceCheck: function(scriptId, scriptVersion, scriptCallbackFunction) {
		ScriptUpdater.initialize(scriptId, scriptVersion, scriptCallbackFunction, true, false);
		ScriptUpdater.checkRemoteScript();
	},

	forceNotice: function(scriptId, scriptVersion, scriptCallbackFunction) {
		ScriptUpdater.initialize(scriptId, scriptVersion, scriptCallbackFunction, true, true);
		ScriptUpdater.checkRemoteScript();
	},

	showNotice: function() {
		if(ScriptUpdater.scriptMetaTags.name && ScriptUpdater.scriptMetaTags.version) {
			ScriptUpdater.addStyle([
				["#ScriptUpdater", ScriptUpdater.scriptId, "Mask { position:fixed; width:100%; top:0; left:0; height:100%; background-color:#000; opacity:.7; z-index:9000; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "Body * { border:none; font-size:12px; color:#333; font-weight:normal; margin:0; padding:0; background:none; text-decoration:none; font-family:Helvetica Neue,Arial,Helvetica,sans-serif; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "Body { width:500px; margin:auto; top:125px; position:fixed; left:35%; text-align:left; background:#DED7C5; border:1px outset #333; padding:0; font-family:Arial; font-size:14px; -moz-border-radius:5px; cursor:default; z-index:9010; color:#333; padding-bottom:1em ; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "Body a { margin:0 .5em; text-decoration:underline; color:#000099; font-weight:bold; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "Body strong { font-weight:bold; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "Body h1 { font-size:13px; font-weight:bold; padding:.5em; border-bottom:1px solid #333; background-color:#999; margin-bottom:.75em; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "Body h2 { font-weight:bold; margin:.5em 1em; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "Body h1 a { font-size:13px; font-weight:bold; color:#fff; text-decoration:none; cursor:help; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "Body h1 a:hover { text-decoration:underline; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "Body table { width:auto; margin:0 1em; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "Body table tr th { padding-left:2em; text-align:right; padding-right:.5em; line-height:2em; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "Body table tr td { line-height:2em; font-weight:bold; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "Body li { list-style-type:circle; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "Body p { font-size:12px; font-weight:normal; margin:1em; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "History { margin:0 1em 1em 1em; max-height:150px; overflow-y:auto; border:1px inset #999; padding:0 1em 1em; width:448px; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "History ul { margin-left:2em; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "Close { float:right; cursor:pointer; height:14px; opacity:.5; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "Close:hover { opacity:.9; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "Footer { margin:.75em 1em; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "Footer input { border:1px outset #666; padding:3px 5px 5px 20px; background:no-repeat 4px center #eee; -moz-border-radius:3px; cursor:pointer; width:70px; float:right; margin-left:.5em; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "Footer input:hover { background-color:#f9f9f9; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "Footer select { border:1px inset #666; }"].join(""),
				""
			].join("\n"));

			var html = new Array();
			html.push(["<h2><a href=\"http://userscripts.org/scripts/show/", ScriptUpdater.id, "\" target=\"_blank\" title=\"About the Userscripts.org Script Updater\"><img src=\"", ScriptUpdater.icons.uso, "\" align=\"absmiddle\" style=\"margin-top:-2px;\"/></a><img id=\"ScriptUpdater", ScriptUpdater.scriptId, "Close\" src=\"", ScriptUpdater.icons.close, "\" title=\"Close\"/>Userscripts.org Updater</h2>"].join(""));

			if(!ScriptUpdater.scriptForceNotice) {
				html.push(["<p>There is a new version of <strong><a href=\"http://userscripts.org/scripts/show/", ScriptUpdater.scriptId, "\" target=\"_blank\" title=\"Go to script page\">", ScriptUpdater.scriptMetaTags.name, "</a></strong> available for installation.</p>"].join(""));
			}
			else {
				html.push(["<p><strong><a href=\"http://userscripts.org/scripts/show/", ScriptUpdater.scriptId, "\" target=\"_blank\" title=\"Go to script page\" style=\"margin:0; padding:0;\">", ScriptUpdater.scriptMetaTags.name, "</a></strong></p>"].join(""));
			}

			if(ScriptUpdater.scriptCurrentVersion) {
				html.push(["<p>You currently have version <strong>", ScriptUpdater.scriptCurrentVersion, "</strong> installed. The latest version is <strong>", ScriptUpdater.scriptMetaTags.version, "</strong></p>"].join(""));
			}

			if(ScriptUpdater.scriptMetaTags.history) {
				html.push(["<h2>Version History:</h2><div id=\"ScriptUpdater", ScriptUpdater.scriptId, "History\">"].join(""));

				var history = new Array();
				var version, desc;
				if(typeof(ScriptUpdater.scriptMetaTags.history) != "string") {
					for(var i = 0; i < ScriptUpdater.scriptMetaTags.history.length; i++) {
						version = ScriptUpdater.scriptMetaTags.history[i].match(/(\S+)\s+.*$/)[1];
						change = ScriptUpdater.scriptMetaTags.history[i].match(/\S+\s+(.*)$/)[1];
					
						history[version] = typeof(history[version]) == "undefined" ? new Array() : history[version];
						history[version].push(change);
					}
				}
				else {
						version = ScriptUpdater.scriptMetaTags.history.match(/(\S+)\s+.*$/)[1];
						change = ScriptUpdater.scriptMetaTags.history.match(/\S+\s+(.*)$/)[1];
					history[version] = typeof(history[version]) == "undefined" ? new Array() : history[version];
					history[version].push(change);
				}

				for(var v in history) {
					if(typeof(v) == "string" && v.match(/v?[0-9.]+[a-z]?/) || typeof(v) == "number") {
						html.push(["<div style=\"margin-top:.75em;\"><strong>v", v, "</strong></div><ul>"].join(""));
						for(var i = 0; i < history[v].length; i++) {
							html.push(["<li>", history[v][i], "</li>"].join(""));
						}
						html.push("</ul>");
					}
				}

				html.push("</div>");
			}

			html.push(["<div id=\"ScriptUpdater" + ScriptUpdater.scriptId + "Footer\">", "<input type=\"button\" id=\"ScriptUpdater", ScriptUpdater.scriptId, "CloseButton\" value=\"Close\" style=\"background-image:url(", ScriptUpdater.icons.close, ")\"/><input type=\"button\" id=\"ScriptUpdater" + ScriptUpdater.scriptId + "BodyInstall\" value=\"Install\" style=\"background-image:url(", ScriptUpdater.icons.install, ");\"/>", "Check this script for updates "].join(""));
			html.push(["<select id=\"ScriptUpdater", ScriptUpdater.scriptId, "Interval\">",
				"<option value=\"3600000\">every hour</option>",
				"<option value=\"21600000\">every 6 hours</option>",
				"<option value=\"86400000\">every day</option>",
				"<option value=\"604800000\">every week</option>",
				"<option value=\"0\">never</option>",
			"</select>"].join(""));
			html.push("</div>");

			var noticeBackground = document.createElement("div");
			noticeBackground.id = ["ScriptUpdater", ScriptUpdater.scriptId, "Mask"].join("");
			document.body.appendChild(noticeBackground);

			var noticeWrapper = document.createElement("div");
			noticeWrapper.setAttribute("style", "position:absolute; width:100%; top:0; left:0; z-index:9010; max-width:auto; min-width:auto; max-height:auto; min-height:auto;");
			noticeWrapper.id = ["ScriptUpdater", ScriptUpdater.scriptId, "BodyWrapper"].join("");

			var notice = document.createElement("div");
			notice.id = ["ScriptUpdater", ScriptUpdater.scriptId, "Body"].join("");
			notice.innerHTML = html.join("");

			noticeWrapper.appendChild(notice);

			document.body.appendChild(noticeWrapper);

			ScriptUpdater.$(["ScriptUpdater", ScriptUpdater.scriptId, "Close"].join("")).addEventListener("click", ScriptUpdater.closeNotice, true);
			ScriptUpdater.$(["ScriptUpdater", ScriptUpdater.scriptId, "CloseButton"].join("")).addEventListener("click", ScriptUpdater.closeNotice, true);
			ScriptUpdater.$(["ScriptUpdater", ScriptUpdater.scriptId, "BodyInstall"].join("")).addEventListener("click", function() {
				setTimeout(ScriptUpdater.closeNotice, 500);
				document.location = ["http://userscripts.org/scripts/source/", ScriptUpdater.scriptId, ".user.js"].join("");
			}, true);

			var selector = ScriptUpdater.$(["ScriptUpdater", ScriptUpdater.scriptId, "Interval"].join(""));
			for(var i = 0; i < selector.options.length; i++) {
				if(selector.options[i].value.toString() == ScriptUpdater.getInterval().toString())
					selector.options[i].selected = true;
			}

			ScriptUpdater.setInterval(selector.value);
			selector.addEventListener("change", function() {
				ScriptUpdater.setInterval(selector.value);
			}, true);

			window.addEventListener("keyup", ScriptUpdater.keyUpHandler, true);
		}
	},

	closeNotice: function() {
		document.body.removeChild(ScriptUpdater.$(['ScriptUpdater', ScriptUpdater.scriptId, 'BodyWrapper'].join("")));
		document.body.removeChild(ScriptUpdater.$(['ScriptUpdater', ScriptUpdater.scriptId, 'Mask'].join("")));
		window.removeEventListener("keyup", ScriptUpdater.keyUpHandler, true);
	},

	keyUpHandler: function(event) {
		switch(event.keyCode) {
			case 27:
				ScriptUpdater.closeNotice();
				break;
		}
	}
};

//ScriptUpdater.forceNotice(94510, fm_version);
//ScriptUpdater.forceCheck(94510, fm_version);
ScriptUpdater.check(94510, fm_version);

}
else
{
  (function(f){var d=document,s=d.createElement('script');s.setAttribute('type','application/javascript');s.textContent = '('+f.toString()+')()';(d.body||d.head||d.documentElement).appendChild(s);s.parentNode.removeChild(s)})(function(){
	function sendMessage(){
	  var dstWindow = window.parent;
	  mymessage = String(escape(document.body.textContent));
	  if(dstWindow.postMessage){
		dstWindow.postMessage('94510'+mymessage, '*');
	  }
	}
	sendMessage();
  })
}