// ==UserScript==
// @name            The West - Forts Manager [SOM]
// @namespace       http://userscripts.org/scripts/show/86724
// @description     Script for The-West : Forts Manager [SOM - Scripts-O-Maniacs] [Multilingual] (v1.1.7)
// @copyright       2010, Zyphir Randrott (The-West fr1)
// @author          Zyphir Randrott
// @release         Zyphir Randrott
// @website         http://scripts-o-maniacs.leforum.eu
// @license         GPL version 3 or any later version; http://www.gnu.org/licenses/gpl.html
// @license         (CC); http://creativecommons.org/licenses/by-nc-sa/2.0/be/
// @include         http://*.the-west.*/game.php*
// @include         http://userscripts.org/scripts/source/86724.meta.js*
// @include         http://userscripts.org/scripts/review/86724*
// @version         1.1.7
//
// @history         1.1.7|01/10/2011 Fix for some language servers that use special chars. Thanks to Beholder for reporting and town invitation.
// @history         1.1.6|25/09/2011 Fix for beta servers.
// @history         1.1.6|25/09/2011 Added Italian translations, thanks to Narulez.
// @history         1.1.6|25/09/2011 Automatic updater updated.
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
// ©Copyright 2010 Zyphir Randrott <zyphir.randrott@gmail.com>
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

var fm_version = "1.1.7";


var url = window.location.href;
if (url.indexOf(".the-west.") != -1) {



  var insertBeforeElement = document.getElementById('left_top');
  var newScriptElement = document.createElement('script');
  newScriptElement.setAttribute('type', 'text/javascript');
  var myScript = "var fm_version = '"+fm_version+"';";
  newScriptElement.innerHTML = myScript;
  insertBeforeElement.parentNode.insertBefore(newScriptElement, insertBeforeElement);




(function(f){var d=document,s=d.createElement('script');s.setAttribute('type','application/javascript');s.textContent = '('+f.toString()+')()';(d.body||d.head||d.documentElement).appendChild(s);s.parentNode.removeChild(s)})(function(){

		/////////////////////////////////////////////////////////
		// DÉCLARATION DES CONSTANTES
		/////////////////////////////////////////////////////////
		//MISE À JOUR
		var VERSION_SCRIPT 		= fm_version ;
		var NUMERO_SCRIPT		= "86724" ;
		var NB_HISTORY			= 5 ;
		var MENU_maj			= "ZYPH_" + NUMERO_SCRIPT + "_MAJ" ;
		var DELTA_maj 			= 24 * 3600 ; // 24 h en s

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
fm_langs.it = { //Narulez
	AFORTSNEARBY: 'Caserme alleate vicine',
	AFORTSATTACKED: 'Caserme alleate sotto attacco',
	FORTSATTACK: 'Altri forti attaccati',
	FORTSDEFENSE: 'Altri forti difesi',
	SEARCHMORE: 'Cerca caserme',
	PLEASEWAIT: 'Attendi...',
	NORESULTS: 'Nessun risultato',
	UPDATING: '<b>Nuovi dati!</b> Sto aggiornando...',
	SORTBYPROXIMITY: 'Ordina per <b>vicinanza</b>',
	SORTBYTYPE: 'Ordina per <b>tipo</b>',
	CLOSE: '<b>Chiudi</b>',
	AUTHOR: '<b>Autore</b>',
	GOTOFORT: '<b>Vai al forte</b>',
	WAYPOINT: '<b>Tappa</b>: Abilita il calcolo delle distanze dall\'ultima posizione della lista delle azioni',
};

var fm_langname = location.host.match(/(\D+)\d+\./);
if(fm_langname && fm_langs[fm_langname[1]]) fm_lang = fm_langs[fm_langname[1]];
//fm_lang = fm_langs['it'];


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
//				alert(data)
				fm_search_hotel_popup = new RegExp("room_name\\\\\">.+<\\\\\/span>[\\\\n]*[\\\\t]*\\s*(.+)<\\\\\/td>\\\\n\\\\n");
				fm_search_hotel_popup = data.match(fm_search_hotel_popup);
				fm_forts_array[fm_i]["l_hotelpopup"] = (" "+fm_search_hotel_popup[1]+" ").replace(/( \d+ )/g,"<b>$1</b>").replace(/\\t/g,"");
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
			  fm_fortowner_title = '</strong><nobr><strong><span id="fm_author">Forts Manager</span></strong> <small><a href="http://userscripts.org/scripts/show/86724" target="blank">v'+fm_version+'</a></small></nobr><strong>';
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


 ///////////* end SOM Manager */////////////


 
 	function maj_a_verifier()
	{
		//
		// Gestion de la màj toute les 24 h
		//

		var heure_dernier_maj = 0 ;
		//Lit le contenu de la variable
		var donnee = localStorage.getItem(MENU_maj) ;
		if (donnee != null)
		{
			heure_dernier_maj = donnee ;
		}

		//Récupération de l'heure actuelle (en s depuis 1970)
		var heure_actuelle = new Date().getTime() / 1000 ;
				
		//Calcul le delta entre la dernière vérif et maintenant
		var delta = heure_actuelle - heure_dernier_maj ;
		if (delta < DELTA_maj) 
		{
			return false ; //Pas de màj à vérifier
//			return true ; //Force la màj
		}
		else
		{
			return true ;
		}
	}

	//Fonction de traitement du retour du source de l'iframe
	function trait_ret_iframe(contenu_iframe)
	{
	  if (contenu_iframe.origin != "http://userscripts.org") return; //Sort si le retour n'est pas le contenu d'un script
	  var version_recuperee = unescape(contenu_iframe.data);
	  try{
		if (version_recuperee.match(/^\d+/) == NUMERO_SCRIPT) //vérifie si le message commence par le bon numéro de script 
		{
			var script_version = version_recuperee.match(/\/\/ @version+\s*(.*)/)[1]; //Récupération du contenu après @version
			if (script_version != VERSION_SCRIPT) //Ne fais rien si la version est identique
			{
				var script_nom = version_recuperee.match(/\/\/ @name+\s*(.*)/)[1]; //Récupération du contenu après @name
				var script_auteur = version_recuperee.match(/\/\/ @release+\s*(.*)/)[1]; //Récupération du contenu après @release 
				//
				//Travaille sur les variables @history
				//
				var tab_history = version_recuperee.match(/\/\/ @history+\s*(.*)/g); //Récupération du tableau des lignes

				//Initialisation des variables
				var version_history_precedente	= "" ;
				var nb_version_history_trouvee	= 0 ;
				var contenu_fenetre_history		= "<DIV STYLE='text-align:center;font-weight:bold'>"+script_nom+"<span style='font-size:9px'> "+VERSION_SCRIPT+"</span><span style='font-size:11px'>";
				contenu_fenetre_history	+= eval(TheWestApi.displayOutdated.toString().match(/(currentVersionMsg *= *)([^;]+)/)[2].replace("this.version", "\"<span style='color:rgb(34,34,136)'>"+script_version+"</span></span>\""));
				contenu_fenetre_history	+= "</DIV><DIV ID='script_history' STYLE='border:1px #DABF83 inset;overflow:auto;height: 250px;margin-top:3px;'><TABLE>";

				function make_script_history(his){
				  //Boucle qui parcourt les @history
				  for (var i=his; i<tab_history.length ; i++)
				  {
					  ligne	= tab_history[i].match(/\/\/ @history+\s*(.*)/)[1];
					  version_history_avec_espace	= ligne.match(/^[a-zA-Z0-9\.\-\|\/]*\s/)[0] ; //contient les n° de version
					  version_history_full = version_history_avec_espace.replace(/(^\s*)|(\s*$)/g,""); //suppression des espaces
					  version_history = version_history_full.split("|")[0];
					  version_history_date = version_history_full.split("|")[1] || "";
  
					  //Sort si le nb maximum d'historique est atteint
					  if (nb_version_history_trouvee >= NB_HISTORY && version_history != version_history_precedente) return i ;
					  if (i==(tab_history.length-1) && $("script_history_next")) $("script_history_next").style.display="none";
  
					  //Teste si la version a changé
					  if (version_history != version_history_precedente)
					  {
					  if (i>0) contenu_fenetre_history += "</UL></TD></TR>";
						  contenu_fenetre_history += "<TR><TD width='500px' style='border: solid 1px #666666;background: url(../images/profile/settings_profile_input_bg.png);font-size:12px;vertical-align:top;'><B>" + version_history + "</B> <span style='float:right;font-size:10px;font-style:italic'>"+version_history_date+"</span><BR><UL style='margin-bottom:4px;'>" ;
						  nb_version_history_trouvee++ ;
						  version_history_precedente = version_history ;
					  }
					  version_history_full=version_history_full.replace("|","\\|");
					  var reg = new RegExp(version_history_full + "+\s*(.*)");
					  texte_history = ligne.match(reg)[1];
					  contenu_fenetre_history += "<LI>" + texte_history + "</LI>" ;
					  
					  if (i==tab_history.length-1) contenu_fenetre_history += "</UL></TD></TR>";
				  }
				}
				var script_history_next = make_script_history(0)||0;
			  
				function make_script_history_next(){
					contenu_fenetre_history='';
					nb_version_history_trouvee = 0;
					script_history_next=make_script_history(script_history_next);
					$("script_history").firstChild.firstChild.innerHTML += contenu_fenetre_history;
				}
				window.make_script_history_next = make_script_history_next;

				contenu_fenetre_history += "</TABLE>";
				
				if(script_history_next>0 && script_history_next<tab_history.length)contenu_fenetre_history += "<div id='script_history_next' style='text-align:center;font-size:10px;margin-top:-3px'><a href='javascript:window.make_script_history_next();'>[+"+NB_HISTORY+"]</a></div>";

				contenu_fenetre_history += "</DIV>";
				
				contenu_fenetre_history	+= "<DIV style='float:left;font-size:10px;margin-top:2px;margin-left:4px'>"+eval(TheWestApi.displayOutdated.toString().match(/api.website *\?.+(?=['"]['"]\)*,'*\)* *"*\)*<\/div)/)[0].replace(" | ", "").replace(/api.website/g, "\"http://userscripts.org/scripts/show/"+NUMERO_SCRIPT+"\\\"\"+\"\\\" target='_blank'\"")+"\"\"")+"</DIV>";
				contenu_fenetre_history	+= "<DIV style='float:right;font-size:10px;margin-top:2px;margin-right:4px'>"+eval(TheWestApi.displayOutdated.toString().match(/api.author *\?.+(?=['"]['"]\)*,\(* *api.website *\?)/)[0].replace(" | ", "").replace(/api.author/g, "\""+script_auteur+"\"")+"\"\"")+"</DIV>";
				contenu_fenetre_history	+= "<BR><DIV STYLE='margin-bottom:-10px;text-align:center;font-weight:bold'>Install ?</DIV>";

				showMessage(contenu_fenetre_history, "Script Updater by [<a href='http://scripts-o-maniacs.leforum.eu' target='_blank'>SOM</a>]", 400, undefined, [["ok", function () {try{(typeof(safari) != "undefined" && safari)?window.open("http://userscripts.org/scripts/show/" + NUMERO_SCRIPT):location.href = "http://userscripts.org/scripts/source/" + NUMERO_SCRIPT + ".user.js";}catch(e){}}], ["cancel"]]);			
			}
			//Stocke l'heure de la dernière vérif
			var heure_actuelle = new Date().getTime() / 1000 ;
			localStorage.setItem(MENU_maj,heure_actuelle) ;
		}
	  }catch(e){
				//Réessaye 2h plus tard en cas d'erreur (timeout uso)
				var heure_actuelle = ((new Date().getTime() / 1000)-79200) ;
				localStorage.setItem(MENU_maj,heure_actuelle) ;
				}
	}

	if (maj_a_verifier())
	{
		//Test safari
		var navigateur = navigator.userAgent.toLowerCase();
		//Initialisation de la variable
		var scr_script = "http://userscripts.org/scripts/source/" + NUMERO_SCRIPT + ".meta.js";

		//Vu que pour chrome, il y a "safari", je teste avant la présence de chrome
		var chrome = navigateur.indexOf("chrome") + 1 ;
		if (!chrome)
		{
			safari = navigateur.indexOf("safari") + 1 ;
			if (safari)
			{
				var scr_script = "http://userscripts.org/scripts/review/" + NUMERO_SCRIPT;
			}
		}

		//
		//IFRAME
		//

		//Écriture dans une iframe le contenu de la source de l'en-tête du script
		var source_script=document.createElement('iframe');

		source_script.setAttribute('id', 'maj_' + NUMERO_SCRIPT);
		source_script.setAttribute('style', 'display:none;');
		//source_script.setAttribute('style', 'display:inline; position:absolute; width:500px; height:600px;');
		source_script.src = scr_script ;

		document.body.appendChild(source_script);
		// Fin de la génération de l'iframe

		// fix for iframe bad content loading
		var f=document.getElementsByTagName("iframe");
		for(var i=0;i<f.length;i++){
			if(f[i].src.substring(0,31)=="http://www.jeux-alternatifs.com") continue;
			if(f[i].src.substr(f[i].src.length-1)=="#") f[i].src=f[i].src.substr(0,f[i].src.length-1);
			else f[i].src=f[i].src+"#";
		} 

		//Ajout d'un évènement pour récupérer le contenu de l'iframe
		window.addEventListener('message', trait_ret_iframe, true);
	}

})
} // end if (url.indexOf(".the-west.") != -1)
else	//Cas du script exécuté dans l'iframe pour la mise à jour
{
	//Création d'une fonction globale pour tout le script
	(function(f){var d=document,s=d.createElement('script');s.setAttribute('type','application/javascript');s.textContent = '('+f.toString()+')()';(d.body||d.head||d.documentElement).appendChild(s);s.parentNode.removeChild(s)})(function(){

	/////////////////////////////////////////////////////////
	// DÉCLARATION DES CONSTANTES
	/////////////////////////////////////////////////////////
	var NUMERO_SCRIPT	= "86724" ;

	//Envoi des informations à la fenêtre principale
	function envoi_info(){
		var destination = window.parent;
		message = String(escape(document.body.textContent));

		//Indiquer le n° du script pour identifier la communication
		if(destination.postMessage) {
			destination.postMessage(NUMERO_SCRIPT + message, '*');
		}
	}
	envoi_info();
	})
}