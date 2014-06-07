// ==UserScript==
// @name           [TE] Zarządzanie wiadomościami
// @version        0.1.1
// @namespace      -
// @description    Dodaje możliwość sortowania wiadomości.
// @include        http://*.czaswojny.interia.pl/*a=msg*
// ==/UserScript==

/* Jest to wczesne stadium rozwoju skryptu mającego na celu ułatwienie 
 * gry graczom Time Edge (www.czaswojny.interia.pl)
 * 
 * Skrypt działa w 100% poprawnie w epoce pierwszej.
 * 
 * Powinien działać na wszystkich serwerach.
 * 
 * Ze względu na brak dostępu do wyższych epok nie jestem tego w stanie 
 * sprawdzić i w razie czego poprawić błędów.
 * 
 * Jeżeli zauważyłeś jakiś błąd w skrypcie, bądź nie działa on poprawnie
 * napisz na oficjalnym forum gry, w temacie założonym przeze mnie.
 */

var messagesList = new Array();
var iPlace = 0;

function countMessages() {
	var i = 0;
	var lookfor = -1;
	
	while (lookfor == -1) {
		var item = document.getElementsByTagName('b')[i].innerHTML;
		var lookfor = item.search('W SKRZYNCE');
		
		if (lookfor != -1) {
			var item = item.replace('WIADOMOŚCI W SKRZYNCE:','');
			var item = item.replace(' ',''); 	
			var item = item.replace('/', '')
			
			allMessages = item.slice(3,6);
			ownMessages = item.slice(0,2);
			
			allMessages = parseInt(allMessages);
			ownMessages = parseInt(ownMessages);
			
			
			if (ownMessages > allMessages) {
				ownMessages = allMessages;
			}
			
		}
		i += 1;
	}
}

function getMessageId() {
	var lookfor = -1;
	var iInput = 0;
	
	message = document.getElementsByTagName("input")[iInput].id;
	lookfor = message.search('msgid');
		
	while (lookfor == -1) {
		message = document.getElementsByTagName("input")[iInput].id;
		lookfor = message.search('msgid');
			
		if (lookfor != -1) {
			messageId = message.replace('msgid_','');
			messagesList[0] = messageId;
		}
		
		iInput += 1;
	}

	for (i = 0; i <= ownMessages-2; i++) {
		message = document.getElementsByTagName("input")[iInput + i].id;
		
		messageId = message.replace('msgid_','');
		messagesList[i+1] = messageId;
	}
}

function checkMessages(messageName) {
	var iMsg = 0;
	var lookfor = -1;
	
	while (lookfor == -1) {
			messageContent = document.getElementsByTagName("a")[iMsg].href;
			lookfor = messageContent.search('a=msg&do=view&mid=');
			
			if (lookfor != -1) {
				messageContent = document.getElementsByTagName("a")[iMsg].innerHTML;
				
				phrase = messageContent.search(messageName);
					if (phrase != -1) {
						document.getElementById('msgid_' + messagesList[0]).checked=true;
					}
			}
			iMsg += 1;
	}
	
	for (i = 0; i <= ownMessages; i++) {
		messageContent = document.getElementsByTagName("a")[iMsg + i].innerHTML;
		phrase = messageContent.search(messageName);
			if (phrase != -1) {
				document.getElementById('msgid_' + messagesList[i+1]).checked=true;
			}
	}
}

function insertBox() {	
	txt1 = document.getElementsByTagName('form')[0].innerHTML;
	a = txt1.indexOf('<div')
	b = txt1.indexOf('</div>');
	//alert(a);
	//alert(b);
	
	div1 = txt1.slice(a,b);
	//alert(div1);
	
	c = txt1.indexOf('<div',7);
	d = txt1.lastIndexOf('</div>');
	
	div2 = txt1.slice(c,d);
	//alert(div2);
	
	document.getElementsByTagName('form')[0].innerHTML = div1 + '</div>\
		<div id="sortBar" style="margin: 0 20px 0 0 ; text-align: right; color:#DDD;"> \
		Wyszukiwanie wiadomości (Uwaga! Funkcja zwraca uwagę na wielkość znaków!)&nbsp;&nbsp;&nbsp;\
		<input type="text" id="sortBox" name="searchBox" style="width: 100px;"/>\
		</div>'	 + div2;
}

function insertButton() {
	place = document.getElementById('sortBar');
	
	sortButton = document.createElement('input');
		sortButton.type = 'button';
		sortButton.value = 'sortuj';
		sortButton.addEventListener('click',sortIt,false);
		sortButton.setAttribute('id','sortButton');
		sortButton.setAttribute('class','button');
		place.appendChild(sortButton);
}

function sortIt() {
	sortText = document.getElementById('sortBox').value;
	
	if (sortText != '') {
		checkMessages(sortText);
	}
}

countMessages();
getMessageId();
insertBox();
insertButton();