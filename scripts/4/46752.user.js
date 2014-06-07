// ==UserScript==
// @name           Facebook | Evenemang överst
// @namespace      http://www.ronaldtroyer.com/
// @description    Reorders events to be at top of right column. Swedish hack by Mkn.
// @include        http://*facebook.com/home.php*
// @include        http://*facebook.com/home.php?*
// @include        https://*facebook.com/home.php*
// @include        https://*facebook.com/home.php?*
// ==/UserScript==

var eventsContent = '';

var divs = document.getElementsByTagName('div');										//Get all Divs
for (i=0; i<divs.length; i++) {															//Loop through divs
	
	if ((divs[i].innerHTML.match('<span class="UIHomeBox_Title">Evenemang</span>'))&&(divs[i].className.match('UIHomeBox'))) {		//If this is the events section
		eventsContent = divs[i].innerHTML;
		divs[i].innerHTML = '';
	}
	
}//end loop

var sidebar=document.getElementById('home_sidebar');
sidebar.innerHTML = '<div class="UIHomeBox">' + eventsContent + '</div>' + sidebar.innerHTML;