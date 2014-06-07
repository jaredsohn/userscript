// ==UserScript==
// @name            MAL Theme, randomly from a selection - Personal Version
// @version         1.3
// @description     Selects a random theme from themes created by other users
// @updateURL       https://userscripts.org/scripts/source/416980.meta.js
// @downloadURL     https://userscripts.org/scripts/source/416980.user.js	
// @include         http://*myanimelist.net/*
// @exclude         http://*myanimelist.net/rss.php*
// @grant           none
// @author          Silveress
// @copyright       2014+, Silveress
// ==/UserScript==

/////////////////////////////////////////////////////////////////////////
// Original script by -Ars- : http://userscripts.org/users/398167      //
// Original script by Shishio : http://userscripts.org/users/129167    //
// Original script by Shishio : http://userscripts.org/users/129172    //
// Original script by BlackShads : http://userscripts.org/users/170596 //
// Original script by BlackShads : http://userscripts.org/users/170595 //
/////////////////////////////////////////////////////////////////////////

	var bannerbg,
		bodybg,
		logobg,
		values = ["a","b","c","d","e"],
		valueToUse = values[Math.floor(Math.random() * values.length)];
		
	if (valueToUse=="a")
		{
		bannerbg="http://i59.tinypic.com/1z6b5fs.jpg";
		bodybg="http://i60.tinypic.com/j7w7co.jpg";
		logobg="http://i60.tinypic.com/25i2h3s.jpg";
		}
	if (valueToUse=="b")
		{
		bannerbg="";
		bodybg="http://i40.tinypic.com/32zkefb.jpg";
		logobg="http://cdn.myanimelist.net/images/mal-logo-small.jpg";
		}
	if (valueToUse=="c")
		{
		bannerbg="http://i40.tinypic.com/oggrwl.jpg";
		bodybg="http://i40.tinypic.com/2rm0ggk.jpg";
		logobg="http://i.imgur.com/uTNdKi8.png";
		}
	if (valueToUse=="d")
		{
		bannerbg="http://i1272.photobucket.com/albums/y388/TangoShadow/KurumiTheme/KurumiThemeTop_zpsc8fa0268.png";
		bodybg="http://oi39.tinypic.com/5nt1mt.jpg";
		logobg="http://i1272.photobucket.com/albums/y388/TangoShadow/KurumiTheme/KurumisAnimeList_zpscaadc0bc.png";
		}
		
	if (valueToUse=="e")
		{
		bannerbg = "http://i1272.photobucket.com/albums/y388/TangoShadow/TohkaTheme/TohkaOption1_zps717d5ec9.png?t=1370988382";
		bodybg= "http://oi42.tinypic.com/2ugdit4.jpg";
		logobg= "http://i1272.photobucket.com/albums/y388/TangoShadow/TohkaTheme/TohkasAnimeListFinal_zpsab6e3faf.png";
		}


// CSS
function addGlobalStyle(css) {
var head, style;
head = document.getElementsByTagName('head')[0];
if (!head) { return; }
style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = css;
head.appendChild(style);
}
    
	

// banner background shortcut (don't remove)
if ( !document.location.href.match('info.php|hidenav|hideheader') ) {
addGlobalStyle('#myanimelist { background: transparent url(" '+bannerbg+' ") no-repeat top center scroll !important; }');
}

// body background shortcut (don't remove)
if ( !document.location.href.match('info.php|hidenav|hideheader') ) {
addGlobalStyle('body { background: transparent url(" '+bodybg+' ") no-repeat top center fixed !important; z-index: 1 !important;}');
}

// custom logo shortcut (don't remove)
if ( !document.location.href.match('info.php|hidenav|hideheader') ) {
addGlobalStyle('#headerSmall { background: transparent url(" '+logobg+' ") no-repeat 0 0 scroll !important;}');
}

// custom logo shortcut (don't remove)
if ( !document.location.href.match('info.php|hidenav|hideheader') ) {
addGlobalStyle('#header { background: transparent url(" '+logobg+' ") no-repeat 0 0 scroll !important;}');
}


// Give space to banner and logo (adjustable)
if ( !document.location.href.match('info.php|hidenav|hideheader') ) {
addGlobalStyle('#headerSmall{ height:150px !important; }');
}


// Remove space between menus at top (adjustable)
if ( !document.location.href.match('info.php|hidenav|hideheader') ) {
addGlobalStyle('#roadblock{ padding:0px !important; }');
}


// Remove space above logo and banner (adjustable)
if ( !document.location.href.match('info.php|hidenav|hideheader') ) {
addGlobalStyle('body{ margin:0px !important; }');
}

// Extend Logo Link space (adjustable)
if ( !document.location.href.match('info.php|hidenav|hideheader') ) {
addGlobalStyle('#headerSmall a{ height:100px !important; }');
}
