// ==UserScript==
// @name          Dshini Banner
// @include       http://www.dshini.net/*
// ==/UserScript==

var meineFunktion = " ";
function funktionDummy() {
	document.write(meineFunktion);

}

var arrayCounter = 1;
var as = document.getElementsByTagName('a');
for (aslen = 0;aslen < 3; aslen++){
//for (aslen = 0;aslen < as.length; aslen++){
	if (as[aslen].id.indexOf('user_image') > -1){
		
		 window.open( as[aslen].href);
		
		
	}
}


var images = document.getElementsByTagName('img');
var imlen = 0;
for (imlen=0;imlen<images.length;imlen++) {
	if (images[imlen].src.indexOf('http://media.dshini.net/images/banner/') > -1){
		document.title = "BANNER";
		
	}
}

var dshini_bottle = document.getElementById('dshini_bottle');
if (dshini_bottle){
document.title = "FLASCHENPOST";
}else 

var daily_logo = document.getElementById('dshini_daily_logo');
if (daily_logo){
	document.title = "LOGO";
	
	
	//daily_logo.innerHTML.indexOf('notifySwitchLoad');
	//daily_logo.innerHTML.indexOf('return false');
	//notifySwitchLoad('/de/games/api',
	// 'game= 40    dshini_logo&amp;logo=eedf410416a1e13da63 80  90ac37d2da 21a'
	// 'dai ly_logo'
	// 'daily_log 110 o_loading'
	// 'dshini_ 130 daily_logo'); 144 return false; "><img src="http://media 182
	//alert(daily_logo.innerHTML);
	//alert(daily_logo.innerHTML.indexOf('return false'));
	meineFunktion = daily_logo.innerHTML.substr(daily_logo.innerHTML.indexOf('notifySwitchLoad'),daily_logo.innerHTML.indexOf('return false')-daily_logo.innerHTML.indexOf('notifySwitchLoad'));
	
	var meineTeile = meineFunktion.split(',');
	meineTeile[0] = '/de/games/api' ;//meineTeile[0].substr(18,meineTeile[0].lastIndexOf("'")-5);
	meineTeile[1] = meineTeile[1].substr(2,meineTeile[1].lastIndexOf("'")-2);
	meineTeile[2] = meineTeile[2].substr(2,meineTeile[2].lastIndexOf("'")-2);
	meineTeile[3] = meineTeile[3].substr(2,meineTeile[3].lastIndexOf("'")-2);
	meineTeile[4] = meineTeile[4].substr(2,meineTeile[4].lastIndexOf("'")-2);

	//var daily_logo_a = daily_logo
	
	$("#daily_logo").trigger('click');

	//alert($().jquery); // check jQuery version
	//notifySwitchLoad(meineTeile[0],meineTeile[1],meineTeile[2],meineTeile[3],meineTeile[4]);
	
	
}else 

var as = document.getElementsByTagName('h3');
var aslen = 0;
for (aslen = 0;aslen < as.length; aslen++){
if (as[aslen].innerHTML.indexOf('Neu bei') > -1){
	as[aslen].innerHTML = as[aslen].innerHTML + <a href='#' onClick='open()'> <b>Alle Ã¶ffnen</b></a>
}
}





//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//DSHINZILLA!!!

GM_registerMenuCommand( "Dshinzilla AUS" , changeMode("0","asd") );
GM_registerMenuCommand( "Dshinzilla Schwer" , changeMode("6","hard") );
GM_registerMenuCommand( "Dshinzilla Mittel" , changeMode("4","normal") );
GM_registerMenuCommand( "Dshinzilla Leicht" , changeMode("2","easy") );

var mode;
var modeCaption;
function changeMode(newMode,caption){	
	mode = newMode;
	modeCaption = caption;
	//document.location.href = document.location.href;
}

var spiel = true;
var alldivlen = 0;
var nichtverloren = false;;
var kartenArray = new Array();
var allDivs = document.getElementsByTagName('div');
if (spiel){
for (alldivlen = 0;alldivlen<allDivs.length;alldivlen++){

	if (allDivs[alldivlen].innerHTML.indexOf('Finde '+mode) > -1){
		
		nichtverloren = true;		
		
	} else if (allDivs[alldivlen].innerHTML.indexOf('Du wurdest von Dshinzilla Ã¼berrascht') > -1){
		document.title = "VERLOREN";
		document.location.href = "http://www.dshini.net/de/games/start_dshinzilla/start/new/level/"+modeCaption;
	}
	
}

if (nichtverloren){
		var kartenlen = 0;
		var karten = document.getElementsByClassName('wishlist_big');
		for (kartenlen = 0;kartenlen < karten.length; kartenlen++){
					

										
			var karten_as = karten[kartenlen].getElementsByTagName('a');
			
			if (karten_as.length > 0){
				if (typeof karten_as[0] == 'object'){
				kartenArray.push("http://www.dshini.net/de/games/play_dshinzilla/card/" + karten_as[0].id);
				}
			}
			
			
		}
		
		var randomnumber = Math.floor(Math.random()*(kartenArray.length));	
		document.location.href = kartenArray[randomnumber];
		
}

}
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////