// ==UserScript==
//
//Displayable Name of your script 
// @name           46cents.com BASE SCRIPT
//
// brief description
// @description    Base script that sends data from account and receives scripts used for every account.   
//
//URI (preferably your own site, so browser can avert naming collisions
// @namespace      http://www.46cents.com/twk/
//
// Your name, userscript userid link (optional)   
// @author         Ovidiu Miclea (KaLa)
//
// If you want to license out
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html) 
//
//(optional) may be used by browsers to display an about link
// @homepage       http://www.46cents.com/twk/
//
//Version Number
// @version        1.0
//
// Urls process this user script on
// @include        http://gr*.fyletikesmaxes.gr/game.php?village=*
//
// Add any library dependencies here, so they are loaded before your script is loaded.
//
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js
// @require        https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.23/jquery-ui.min.js
//
// @history        1.0 first version
//
// ==/UserScript==

// Function Declaration
// Function Declaration
function getj(){
	var v = parseInt(localStorage.getItem('jval'));
	return v;
}
function resetj(){
	localStorage.setItem('jval', 0);
}
function updatej(){
	var v = parseInt(localStorage.getItem('jval'));
	var newval = v+4;
	localStorage.setItem('jval', newval);
}
function farm(){	
	$('.farm_icon_a').each(function(i){
		var j=getj();
		if(i == j){resetj();}
		if(i == j+4){updatej();}
		if(i > j && i <= j+4){
			$(this).removeClass('farm_icon_disabled').trigger('click');
		}	
	});
}

// Start script
window.onload = function(){
	if(game_data.screen = 'am_farm'){
		setInterval(function(){farm();}, 1000);
	}
}