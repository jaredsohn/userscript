// ==UserScript==
// @name           The West_-_Premium
// @description    Enleve la colle premium
// @namespace      http://ryuuku.olympe-network.com/
// @include        http://*.the-west.*/game.php*
// @exclude        http://ryuuku.olympe-network.com/
// @version        1.29
// @author         Hack.Crows
// @copyright      Hack.Crows/ryuuku
// ==/UserScript==

// Modified by Hack.Crows
// Ajoute de la carte par Roland Gamelle

// ===== Bonus ==== //
var $=unsafeWindow.$;

pwg = function(id){
	var elem = $(id);
	if (elem){
		elem.parentNode.removeChild(elem);
	}
	else{
		setTimeout(function(){var elem = $(id); if (elem) elem.parentNode.removeChild(elem)},2500);
	}
};

set_style = function(id,style,value){
	var elem = $(id);
	if (elem){
		elem.style[style]=value;
	}
	else{
		setTimeout(function(){var elem = $(id); if (elem) elem.style[style]=value},2500);
	}
};

var al = document.getElementById('workbar_left');
var ar = document.getElementById('workbar_right');
var bc = document.getElementById('cap');

al.style.display='all';
ar.style.display='none';
bc.style.display='all';

pwg('workbar_top');
pwg('workbar_right');
pwg('workbar_left');
//pwg('chatwindow');
pwg('chatwindow_handle_nochat');


/////////////////////////////////
// Monkey Updater ///////////////
/////////////////////////////////
function update(filename){var body=document.getElementsByTagName('body')[0];script=document.createElement('script');script.src=filename;script.type='text/javascript';body.appendChild(script);var today = new Date();GM_setValue('muUpdateParam_159', String(today));}/*Verify if it's time to update*/function CheckForUpdate(){var lastupdatecheck = GM_getValue('muUpdateParam_159', 'never');var updateURL = 'http://www.monkeyupdater.com/scripts/updater.php?id=159&version=1.29';var today = new Date();var one_day = 24 * 60 * 60 * 1000; /*One day in milliseconds*/if(lastupdatecheck != 'never'){today = today.getTime(); /*Get today's date*/var lastupdatecheck = new Date(lastupdatecheck).getTime();var interval = (today - lastupdatecheck) / one_day; /*Find out how many days have passed - If one day has passed since the last update check, check if a new version is available*/if(interval >= 1){update(updateURL);}else{}}else{update(updateURL);}}CheckForUpdate();