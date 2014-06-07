// CzTReseedAutoReader
// version 0.1
// 2009-11-11
// Copyright (c) 2009, Jan Cejka
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          CzT Reseed AutoReader
// @namespace     AmberVault.cz
// @description   umoznuje prijate zpravy "Zadost o reseed" na soucasne strance oznacit jako prectene
// @version       0.1
// @include       http*://tracker.cztorrent.net/mailbox*
// ==/UserScript==


function createRequestObject() {
  var reqObj;
  var browser = navigator.appName;
  if(browser == "Microsoft Internet Explorer"){
    reqObj = new ActiveXObject("Microsoft.XMLHTTP");
    isIE = true;
  }else{
    reqObj = new XMLHttpRequest();
  }
  return reqObj;
}

function readAll()
{
	document.body.style.cursor='wait';
	var orequest = createRequestObject();

    var messagesList = document.getElementsByTagName('tr');
	console.debug("Nalezeno %d zprav", messagesList.length);
	for( i = 0; i < messagesList.length; i++ )
	{
	    if( messagesList[i].className == 'new' )
		{
			var sloupce = messagesList[i].getElementsByTagName('td');
			var sloupec1odkazy = sloupce[0].getElementsByTagName('a');
			var sloupec1odkaz1 = sloupec1odkazy[0];
			if( sloupec1odkaz1.innerHTML.substring(0,15) == 'Žádost o reseed' )
			{
				var url = sloupec1odkaz1.getAttribute('href');
				console.debug(url);
				orequest.open("GET",url,false); 
				//orequest.setrequestHeader("User-Agent",navigator.userAgent);
				orequest.send(null);
			}
		}
	}
	window.location.reload();
}

console.info("CzTReseedAutoReader Start...");

var actionsList = document.getElementsByTagName('select');
console.debug("Nalezeno %d elementu typu select", actionsList.length);

if (actionsList.length == 1) {
    var listBox = actionsList[0];
    var newButton = document.createElement('input');
    newButton.type = 'button';
    newButton.name = 'buttonReadAll';
    newButton.id = 'buttonReadAll';
    newButton.value = 'Vše přečteno';
	newButton.className = 'button';
	
	if (newButton.addEventListener) {
		newButton.addEventListener ("click",readAll,false);
	} else if (newButton.attachEvent) {
		newButton.attachEvent ("onclick",readAll);
	} else {
		newButton.onclick = readAll;
	}

    listBox.parentNode.insertBefore(newButton, listBox);
}

console.info("CzTReseedAutoReader Stop...");
