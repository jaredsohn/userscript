// kingsage classic
// version 0.8
// 2011-05-05
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "kingsage classic", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name		kingsage classic
// @version		0.8
// @author		grafilicious
// @description classic (pre 1.3) view for kingsage
//
// @include		http://s*.kingsage.*/game.php*build_main*
// @include		http://s*.kingsage.*/game.php*build_barracks*
//
// @exclude		http://s*.kingsage.*/game.php*massrecruit*
// @exclude		http://s*.kingsage.*/game.php*research*
// @exclude		http://s*.kingsage.*/game.php*units*
// @exclude		http://s*.kingsage.*/game.php*sim_battle*
// @exclude		http://s*.kingsage.*/game.php*sim_spy*
// @exclude		http://s*.kingsage.*/game.php*losses*
//
// @history		10.06.11 - add- russian language version
// @history		17.05.11 - add - spanish language version
// @history		15.05.11 - add - french language version 
// @history		13.05.11 - add - script now chooses the language itself
// @history		12.05.11 - add - cz language version, thanks for the translation by Collo
// @history		11.05.11 - add - english version for worldwide use
// @history		11.05.11 - change - edited buildingtime items to fit the table better
// @history		10.05.11 - fix - other javscript functions work again for opera
// @history		10.05.11 - fix - added some excludes for minimizing side effects
// @history		09.05.11 - fix - renamed train button 
// @history		09.05.11 - fix - buildlist was displaced
// @history		09.05.11 - fix - minimap wouldnt work with opera
// ==/UserScript==

var iAmTheLanguage = location.host;
iAmTheLanguage = iAmTheLanguage.substring(iAmTheLanguage.indexOf('.')+1,iAmTheLanguage.length);

/*
 * entry point
 */

try{
	jQuery = unsafeWindow.jQuery;
	var language = selectLanguage(iAmTheLanguage);
		kingsageClassic();
}catch (e){
	var language = selectLanguage(iAmTheLanguage);
		kingsageClassic();
}

/*
 * select language
 */

function selectLanguage(lang){
	
	switch(lang) {
	
		case 'kingsage.de':
			return getGerman();
			break;
		
		case 'kingsage.org': 
			return getEnglish();
			break;
		
		case 'kingsage.cz':
			return getCzech();
			break;
			
		case 'kingsage.fr':
			return getFrench();
			break;
			
		case 'kingsage.es':
			return getSpanish();
			break;
	
		case 'kingsage.ru':
			return getRussian();
			break;
		
		default:
			return getEnglish();
	}
}

/*
 * language block
 */

function getEnglish() {

var languageEn = new Array();

languageEn['text_issueCommands'] = 'Issue Commands';
languageEn['text_attack'] = 'Attack';
languageEn['text_support'] = 'Support';
languageEn['text_spy'] = 'Spy';
languageEn['text_discharge'] = 'Discharge';
languageEn['text_unit'] = 'Unit';
languageEn['text_demand'] = 'Demand';
languageEn['text_time'] = 'Time (hh:mm:ss)';
languageEn['text_homeTotal'] = 'Home/ Total';
languageEn['text_train'] = 'Train';
languageEn['text_building'] = 'Building';
languageEn['text_buildingtime'] = 'Buildtime';
languageEn['text_build'] = 'Build';
languageEn['text_favorites'] = ' Favorites';
languageEn['text_own'] = ' Own';
languageEn['text_trend'] = ' Course';

return languageEn;
}

function getGerman() {

var languageGer = new Array()

languageGer['text_issueCommands'] = 'Befehle erteilen';
languageGer['text_attack'] = 'Angreifen';
languageGer['text_support'] = 'Unterstützen';
languageGer['text_spy'] = 'Spionieren';
languageGer['text_discharge'] = 'Entlassen';
languageGer['text_unit'] = 'Einheit';
languageGer['text_demand'] = 'Benötigt';
languageGer['text_time'] = 'Zeit (hh:mm:ss)';
languageGer['text_homeTotal'] = 'Zuhause/ Total';
languageGer['text_train'] = 'Ausbilden';
languageGer['text_building'] = 'Gebäude';
languageGer['text_buildingtime'] = 'Bauzeit';
languageGer['text_build'] = 'Ausbauen';
languageGer['text_favorites'] = ' Favoriten';
languageGer['text_own'] = ' Eigene';
languageGer['text_trend'] = ' Verlauf';

return languageGer;
}

function getCzech() {

var languageCz = new Array();

languageCz['text_issueCommands'] = 'Příkazy';
languageCz['text_attack'] = 'Útok';
languageCz['text_support'] = 'Podpora';
languageCz['text_spy'] = 'Špeh';
languageCz['text_discharge'] = 'Rozpustit';
languageCz['text_unit'] = 'Jednotka';
languageCz['text_demand'] = 'Suroviny';
languageCz['text_time'] = 'Čas (hh:mm:ss)';
languageCz['text_homeTotal'] = 'Doma/ Celkem';
languageCz['text_train'] = 'Trénink';
languageCz['text_building'] = 'Stavba';
languageCz['text_buildingtime'] = 'Stavební čas';
languageCz['text_build'] = 'Postavit';
languageCz['text_favorites'] = ' Oblíbené';
languageCz['text_own'] = ' Vlastní';
languageCz['text_trend'] = ' Kurz';

return languageCz;
}

function getFrench() {

var languageFr = new Array();

languageFr['text_issueCommands'] = 'Ordres';
languageFr['text_attack'] = 'Attaquer';
languageFr['text_support'] = 'Envoyer du renfort';
languageFr['text_spy'] = 'Espionner';
languageFr['text_discharge'] = 'Renvoyer';
languageFr['text_unit'] = 'Unité';
languageFr['text_demand'] = 'Coût';
languageFr['text_time'] = 'Temps (hh:mm:ss)';
languageFr['text_homeTotal'] = 'Dans le village / Total';
languageFr['text_train'] = 'Former';
languageFr['text_building'] = 'Bâtiment';
languageFr['text_buildingtime'] = 'Durée';
languageFr['text_build'] = 'Construire';
languageFr['text_favorites'] = ' Favoris';
languageFr['text_own'] = ' Propres';
languageFr['text_trend'] = ' Historique';

return languageFr;
}

function getSpanish() {

var languageEs = new Array();

languageEs['text_issueCommands'] = 'Ordenes';
languageEs['text_attack'] = 'Atacar';
languageEs['text_support'] = 'Apoyar';
languageEs['text_spy'] = 'Espiar';
languageEs['text_discharge'] = 'Liberar';
languageEs['text_unit'] = 'Unidad';
languageEs['text_demand'] = 'Recursos necesarios';
languageEs['text_time'] = 'Tiempo (hh:mm:ss)';
languageEs['text_homeTotal'] = 'En la colonia/ Total';
languageEs['text_train'] = 'Entrenar';
languageEs['text_building'] = 'Construcción';
languageEs['text_buildingtime'] = 'Tiempo de construccion';
languageEs['text_build'] = 'Edificio';
languageEs['text_favorites'] = ' Favoritos';
languageEs['text_own'] = ' Propios';
languageEs['text_trend'] = ' Recorrido';

return languageEs;
}

function getRussian() {

var languageRu = new Array();

languageRu['text_issueCommands'] = 'Заказ войск';
languageRu['text_attack'] = 'Атака';
languageRu['text_support'] = 'Поддержка';
languageRu['text_spy'] = 'Шпионаж';
languageRu['text_discharge'] = 'Распустить';
languageRu['text_unit'] = 'Юнит';
languageRu['text_demand'] = 'Стоимость';
languageRu['text_time'] = 'Время (чч:мм:сс)';
languageRu['text_homeTotal'] = 'Дома / Всего';
languageRu['text_train'] = 'Тренировка';
languageRu['text_building'] = 'Здание';
languageRu['text_buildingtime'] = 'Время строительства';
languageRu['text_build'] = 'Заказать';
languageRu['text_favorites'] = ' Избранное';
languageRu['text_own'] = ' Собств.поселения';
languageRu['text_trend'] = ' Курс';

return languageRu;
}
/*
 * the actual script
 */

function kingsageClassic(){

/*
 * variables
 */

var whereAmI = jQuery('body').attr('id');
var loca = location.host;
var arrow = '<img src="http://'+loca+'/img/arrow_right_raquo.png" alt="" />';

var image_res1 = '<img src="http://'+loca+'/img/res1.png">';
var image_res2 = '<img src="http://'+loca+'/img/res2.png">';
var image_res3 = '<img src="http://'+loca+'/img/res3.png">';
var image_worker = '<img src="http://'+loca+'/img/worker.png">';

/*
 * kingsage classic
 */
if(whereAmI == 'build_main' || whereAmI == 'build_main_build'){
	/*
	 * main -----------------------------------------------------------------------------------------------
	 */
	jQuery('.mainBuildList').children('br').remove();
	
	jQuery('.box').each(function() {
		
		var box_image = jQuery(this).children('.image').html();
		var box_name = jQuery(this).children('.name').html();
		var res1 = jQuery(this).children('.res1').html();
		var res2 = jQuery(this).children('.res2').html();
		var res3 = jQuery(this).children('.res3').html();
		var workers = jQuery(this).children('.workers').html();
		var buildtime = jQuery(this).children('.buildtime').html();
		var button = jQuery(this).children('.button').html();
		var sub = box_image.substring(box_image.lastIndexOf('/')+1, box_image.lastIndexOf('.')-1);
		box_image = '<img src="http://'+loca+'/img/buildings/'+sub+'.png">';
		box_name = box_name.replace('<br>', '');
		button = button.replace('color:#F7D48E;', ''); 
		button = button.replace('color:#C2C2C2;', '');
		
		// strips of the unnecessary "buildtime" string , hopefully in all languages
		buildtime = buildtime.substring(buildtime.indexOf(':')+2, buildtime.length);
		
		// FF 3.6 fix
		button = button.replace('color: rgb(194, 194, 194)', '');
		button = button.replace('color: rgb(247, 212, 142)', '');
		
		jQuery(this).replaceWith('<tr><td colspan="7">\
		<table class="noborder" cellspacing="0" cellpadding="0" style="width: 810px;  margin-top: 3px;">\
		<tbody><tr><td style="width: 7px; background: url(\'http://'+loca+'/img/modern/infocell_left.png\') repeat scroll 0% 0% transparent; margin: 0px; padding: 0px;"></td>\
		<td style="width: 795px; background: url(\'http://'+loca+'/img/modern/infocell_center.png\') repeat scroll 0% 0% transparent; margin: 0px; padding: 0px;">\
		<table cellspacing="0" cellpadding="0" style="width: 790px;"><tbody><tr><td class="nowrap" style="width: 200px;">'+box_image+box_name+'</td>\
		<td class="nowrap" style="width: 76px;">'+image_res2+res2+'</td><td class="nowrap" style="width: 76px;">'+image_res1+res1+'</td>\
		<td class="nowrap" style="width: 76px;">'+image_res3+res3+'</td><td class="nowrap" style="width: 46px;">'+image_worker+workers+'</td>\
		<td align="center" style="width: 120px;">'+buildtime+'</td><td style="text-align: center;">'+button+'</td></tr></tbody></table>\
		</td><td style="width: 8px; margin: 0px; padding: 0px;"><img src="http://'+loca+'/img/modern/infocell_right.png"></td></tr>');
		
		//jQuery(this).replaceWith('<tr><td>'+box_image+box_name+'</td><td>'+image_res2+res2+'</td><td>'+image_res1+res1+'</td>\
		//<td>'+image_res3+res3+'</td><td>'+image_worker+workers+'</td><td>'+buildtime+'</td><td>'+button+'</td></tr>');
	});
	
	jQuery('.boxDone').each(function() {
	
		var boxDone_image = jQuery(this).children('.image').html();
		var boxDone_name = jQuery(this).children('.name').html();
		
		var sub = boxDone_image.substring(boxDone_image.lastIndexOf('/')+1, boxDone_image.lastIndexOf('.')-1);
		boxDone_image = '<img src="http://'+loca+'/img/buildings/'+sub+'.png">';
		boxDone_name = boxDone_name.replace('<br>', '');
		
		jQuery(this).replaceWith('<tr><td colspan="7">\
		<table class="noborder" cellspacing="0" cellpadding="0" style="width: 810px; height: 25px; margin-top: 3px;">\
		<tbody><tr><td style="width: 7px; background: url(\'http://'+loca+'/img/modern/infocell_left.png\') repeat scroll 0% 0% transparent; margin: 0px; padding: 0px;"></td>\
		<td style="width: 795px; background: url(\'http://'+loca+'/img/modern/infocell_center.png\') repeat scroll 0% 0% transparent; margin: 0px; padding: 0px;">\
		<table cellspacing="0" cellpadding="0" style="width: 790px;"><tbody><tr><td colspan="7" class="nowrap">'+boxDone_image+boxDone_name+'</td>\
		</tr></tbody></table></td><td style="width: 8px; margin: 0px; padding: 0px;"><img src="http://'+loca+'/img/modern/infocell_right.png"></td></tr>');

	});
	
	
	jQuery('.mainBuildList').children('tr').wrapAll('<table name="build" class="borderlist" style="width: 820px;"></table>');
	jQuery('table[name*="build"]').prepend('<tr><th style="width: 207px;">'+language['text_building']+'</th><th colspan="4" style="width: 274px;">'+language['text_demand']+'</th>\
	<th style="width: 120px; text-align: center;">'+language['text_buildingtime']+'</th><th style="width: 160px; text-align: center;">'+language['text_build']+'</th></tr>');
		
} else if(whereAmI == 'build_barracks_command' || whereAmI == 'build_barracks') {
	/*
	 * barracks command -----------------------------------------------------------------------------------------------
	 */
	var arr = new Array();
	jQuery('.barracksCommand').children('br').remove();

	// collect data from view and remove items
	jQuery('.box').each(function() {
		
		var image = jQuery(this).children('.image').html();
		var quantity = jQuery(this).children('.quantity').html();
		var sub = image.substring(image.lastIndexOf('/')+1, image.lastIndexOf('_'));
		image = '<img src="http://'+loca+'/img/units/unit_'+sub+'.png">';
		arr.push('<td style="width: 150px;">'+image+quantity+'</td>');
		jQuery(this).remove();
		
	});

	// remodel data and add it to the page
	jQuery('.barracksCommand').prepend('<h2>'+language['text_issueCommands']+'</h2><table class="borderlist"><tr>'+arr[0]+arr[4]+arr[7]+arr[9]+'</tr>\
	<tr>'+arr[1]+arr[5]+arr[8]+'<td></td></tr>\
	<tr>'+arr[2]+arr[6]+'<td></td><td></td></tr>\
	<tr>'+arr[3]+'<td></td><td></td><td></td></tr></table>');


	// collect data from troop options
	jQuery('.boxOptions').each(function() {

		var sendx = jQuery(this).children('.sendX').html();
		var sendy = jQuery(this).children('.sendY').html();
		
		// var attack = jQuery(this).children('div[class*="attack"]').html();
		// var support = jQuery(this).children('div[class*="support"]').html();
		// var discharge = jQuery(this).children('div[class*="discharge"]').html();
		// var spy = jQuery(this).children('div[class*="espy"]').html();
		
		// var fav = jQuery(this).children('div[class*="favourites"]').html();
		// var own = jQuery(this).children('div[class*="villages"]').html();
		// var course = jQuery(this).children('div[class*="trend"]').html();
		
		var fav = '<span class="click" onclick="popup_mod(\'popup.php?s=targets&amp;m=favorites\', 350, 400);return false;">'+language['text_favorites']+'</span>';
		var own = '<span class="click" onclick="popup_mod(\'popup.php?s=targets&amp;m=own_villages\', 350, 400);return false;">'+language['text_own']+'</span>';
		var course = '<span class="click" onclick="popup_mod(\'popup.php?s=targets&amp;m=trend\', 350, 400);return false;">'+language['text_trend']+'</span>';
		
		//remodel buttons
		// attack = attack.replace('color:#F7D48E;', 'color:#000; background:#FF9999; border: 1px solid #C4A76E; padding: 2px 2px;');
		// spy = spy.replace('color:#F7D48E;', 'color:#000; background:#FF9999; border: 1px solid #C4A76E; padding: 2px 2px;');
		// support = support.replace('color:#F7D48E;', 'color:#000; background:#99D7F7; border: 1px solid #C4A76E; padding: 2px 2px;');
		// discharge = discharge.replace('color:#F7D48E;', 'color:#000; background:#FF9999; border: 1px solid #C4A76E; padding: 2px 2px;');
		
		// delete style="color:#F7D48E;" from shortlinks
		// fav = fav.replace('style="color:#F7D48E;"', '');
		// own = own.replace('style="color:#F7D48E;"', '');
		// course = course.replace('style="color:#F7D48E;"', '');
		
		jQuery(this).children('div').removeClass();

		var attack = '<input type="submit" name="attack" value="'+language['text_attack']+'" style="background:#FF9999;" />';
		var support = '<input type="submit" name="support" value="'+language['text_support']+'" style="background:#99D7F7;" />';
		var discharge = '<input type="submit" name="discharge" value="'+language['text_discharge']+'" style="background:#FF9999;" />';
		var spy = '<input type="submit" name="espy" value="'+language['text_spy']+'"  style="background:#FF9999;" />';
			
		jQuery(this).replaceWith('<table><tr><td>'+sendx+'</td><td>'+sendy+'</td><td valign="top">'+arrow+fav+'<br />'+arrow+own+'</td><td valign="top">'+arrow+course+'</td><td>'+attack+'</td><td>'+spy+'</td><td>'+support+'</td><td>'+discharge+'</td></tr></table> ');
		
	});

} else if(whereAmI == 'build_barracks_recruit') {
	/*
	 * barracks recruit -----------------------------------------------------------------------------------------------
	 */
	var button = '<input type="submit" value="'+language['text_train']+'">';
	
	jQuery('.mainBuildList').children('br').remove();
	//jQuery('.mainBuildList').prepend('<table class="borderlist" style="width: 820px;"><tbody><tr><th style="width: 150px;">Einheit</th><th colspan="4">Benötigt</th>\
	//<th style="width: 120px; text-align: center;">Zeit (hh:mm:ss)</th><th style="width: 150px; text-align: center;">Zuhause/ Gesamt</th><th style="width: 170px;">Ausbilden</th></tr></tbody class="kekse"></table>');
	
	jQuery('.box').each(function() {
		var box_image = jQuery(this).children('.image').html();
		var box_name = jQuery(this).children('.name').html();
		var res1 = jQuery(this).children('.res1').html();
		var res2 = jQuery(this).children('.res2').html();
		var res3 = jQuery(this).children('.res3').html();
		var workers = jQuery(this).children('.workers').html();
		var buildtime = jQuery(this).children('.buildtime').html();
		var quantity = jQuery(this).children('.quantity').html();
		//var button = jQuery(this).children('.button').html();
		var sub = box_image.substring(box_image.lastIndexOf('/')+1, box_image.lastIndexOf('_'));
		box_image = '<img src="http://'+loca+'/img/units/unit_'+sub+'.png">';
		
		// strips of the unnecessary "buildtime" string , hopefully in all languages
		buildtime = buildtime.substring(buildtime.indexOf(':')+2, buildtime.length);
		
		var arr = box_name.split('<br>');
		box_name = arr[0];
		var homeTotal = arr[1];
				
		jQuery(this).replaceWith('<tr><td>'+box_image+box_name+'</td><td>'+image_res2+res2+'</td><td>'+image_res1+res1+'</td>\
		<td>'+image_res3+res3+'</td><td>'+image_worker+workers+'</td><td>'+buildtime+'</td><td>'+homeTotal+'</td><td>'+quantity+'</td></tr>');
	});
	
	jQuery('.boxDone').each(function() {
		var boxDone_image = jQuery(this).children('.image').html();
		var boxDone_name = jQuery(this).children('.name').html();
		var boxDone_descriptionShort = jQuery(this).children('.descriptionShort').html();
		var boxDone_notResearched = jQuery(this).children('.notResearched').html();
		
		var sub = boxDone_image.substring(boxDone_image.lastIndexOf('/')+1, boxDone_image.lastIndexOf('_'));
		sub = sub.substring(0, sub.lastIndexOf('_'));
		boxDone_image = '<img src="http://'+loca+'/img/units/unit_'+sub+'.png">';
		
		boxDone_notResearched = boxDone_notResearched.replace('style="color:#F7D48E; font-size:9px;"', '');
		boxDone_notResearched = boxDone_notResearched.replace('style="color: rgb(247, 212 , 142)"', '');
	
		
		jQuery(this).replaceWith('<tr><td>'+boxDone_image+boxDone_name+'</td><td colspan="6">'+boxDone_descriptionShort+'</td><td>'+boxDone_notResearched+'</td></tr>');
	});
	
	jQuery('.mainBuildList').children('tr').wrapAll('<table name="recruit" class="borderlist" style="width: 820px;"></table>');
	
	jQuery('table[name*="recruit"]').prepend('<tr><th style="width: 150px;">'+language['text_unit']+'</th><th colspan="4">'+language['text_demand']+'</th>\
	<th style="width: 120px; text-align: center;">'+language['text_time']+'</th><th style="width: 150px; text-align: center;">'+language['text_homeTotal']+'</th><th style="width: 170px;">'+language['text_train']+'</th></tr>')
	jQuery('table[name*="recruit"]').append('<tr><td style="text-align: right;" colspan="8">'+button+'</td></tr>');
}
}