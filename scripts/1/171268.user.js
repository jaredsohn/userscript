// ==UserScript==
// @name          Display Unread Count in Tab for OWA
// @namespace     www.jaredpavan.com
// @description   This will check for unread messages and put the unread count in the Outlook Web App tab.
// @include       https://usowan.*.com/owa/*
// ==/UserScript==

function update_unread() {
	//This madness climbs up the DOM to find the value for the # of unread messages. If there are no unread messages then we will receive an error, catch it, and note set unread messages to 0
	try
	{
		var CurrVal = document.getElementById('mailtree').getElementsByClassName('trNd')[1].childNodes[1].childNodes[1].childNodes[1].innerHTML;
	}
	catch(err)
	{
		var CurrVal = 0;
	}
	
	var CurTabVal = document.title.charAt(1);
	
	if (CurrVal != CurTabVal) {
		document.title = "(" + CurrVal + ") " + MasterTitle;
	}
}

var MasterTitle = document.title;
window.setInterval(update_unread, 1000);