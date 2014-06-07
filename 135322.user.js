// ==UserScript==
// @name           Buff_Community
// @namespace      Buff_Community
// @description    Select-Buff-Types
// @include        http://www.buff-community.de/users/*
// @version        1.0.10
// @author         Karsten Wierschin
// @updateURL      http://userscripts.org/scripts/source/135322.meta.js
// ==/UserScript==

var selectStrikes = 0; 		// 0 - Strikes werden nicht ausgewählt; 1 - Strikes werden ausgewählt
var maxAcceptBuffs = 20; 	// 0 unendlich; > 0 maximale Anzahl der angenommenen Buffs
var maxLastLoginDays = 30; 	// Anzahl der Tage des letzten Login bis Freund rot makiert wird

if (document.location.href == "http://www.buff-community.de/users/index") {
	deadFriends();	
	setTimeout( function  (  ) {
								if ( document.getElementById('own-buffs-data') != null ){									
									showBuffTime()									
								} else {													
									setTimeout( arguments.callee , 500);
								}
								} , 500);
	
	window.addEventListener('load', insertIntoBody, true);	 }
if (document.location.href == "http://www.buff-community.de/users/findfriends") {
	deadFriends();
	findFriends();}


function insertIntoBody() {  
  // === bufflist Elemente hinzufügen  ===
  // Button "nimm alles" definieren
  var myBtnAll = document.createElement('input');
  myBtnAll.type = 'button';
  myBtnAll.value = 'nimm alles';
  myBtnAll.style.margin = '3px';
  myBtnAll.addEventListener("click", 
							  function() { multiChk(0); },
							  false);
    
  // Button "Fisch" definieren
  var myBtnFish = document.createElement('input');
  myBtnFish.type='button';
  myBtnFish.value = 'Fisch';
  myBtnFish.style.margin = '3px';
  myBtnFish.addEventListener("click", 
							  function() { multiChk(1); },
							  false);
  
  // Button "Stulle" definieren
  var myBtnSandwich = document.createElement('input');
  myBtnSandwich.type='button';
  myBtnSandwich.value = 'Stulle'; 
  myBtnSandwich.style.margin = '3px';
  myBtnSandwich.addEventListener("click", 
							  function() { multiChk(4); },
							  false);
  
  // Button "Korb" definieren
  var myBtnPicnic = document.createElement('input');
  myBtnPicnic.type='button';
  myBtnPicnic.value = 'Korb'; 
  myBtnPicnic.style.margin = '3px';
  myBtnPicnic.addEventListener("click", 
							  function() { multiChk(12); },
							  false);
  //TextNode definieren
  var myTxtNode = document.createTextNode("max. Buffs annehmen: ");
  							  
  // Input max Anzahl AcceptBuffs definieren
  var myTxtMaxAcceptBuffs = document.createElement('input');
  myTxtMaxAcceptBuffs.type = 'text';
  myTxtMaxAcceptBuffs.id = 'myTxtMaxAcceptBuffs';
  myTxtMaxAcceptBuffs.style.width = "25px";
  myTxtMaxAcceptBuffs.style.margin = '3px';
  myTxtMaxAcceptBuffs.value = maxAcceptBuffs;
  
  // === accepted-buffs-data Elemente hinzufügen ===  
  //TextNode definieren
  var myTxtNode2 = document.createTextNode("DropDown-Buffs auswählen: ")
  
  // Button "accepted-Fisch" definieren  
  var myBtnAcceptedFish = document.createElement('input');
  myBtnAcceptedFish.type='button';
  myBtnAcceptedFish.value = 'Fisch';
  myBtnAcceptedFish.style.margin = '3px';
  myBtnAcceptedFish.addEventListener("click", 
							  function() { multiSelect(1); },
							  false);
							  
  // Button "accepted-Stulle" definieren
  var myBtnAcceptedSandwich = document.createElement('input');
  myBtnAcceptedSandwich.type='button';
  myBtnAcceptedSandwich.value = 'Stulle';
  myBtnAcceptedSandwich.style.margin = '3px';
  myBtnAcceptedSandwich.addEventListener("click", 
							  function() { multiSelect(2); },
							  false);

  // Button "accepted-Korb" definieren
  var myBtnAcceptedPicnic = document.createElement('input');
  myBtnAcceptedPicnic.type='button';
  myBtnAcceptedPicnic.value = 'Korb';
  myBtnAcceptedPicnic.style.margin = '3px';
  myBtnAcceptedPicnic.addEventListener("click", 
							  function() { multiSelect(3); },
							  false);							  
  
  // Elemente hinzufügen
  document.getElementById('accepted-buffs').insertBefore(myBtnAcceptedPicnic, document.getElementById('accepted-buffs').firstChild);
  document.getElementById('accepted-buffs').insertBefore(myBtnAcceptedSandwich, document.getElementById('accepted-buffs').firstChild);
  document.getElementById('accepted-buffs').insertBefore(myBtnAcceptedFish, document.getElementById('accepted-buffs').firstChild);
  document.getElementById('accepted-buffs').insertBefore(myTxtNode2, document.getElementById('accepted-buffs').firstChild);
  
  document.getElementById('content').insertBefore(myBtnPicnic,document.getElementById('content').firstChild);
  document.getElementById('content').insertBefore(myBtnSandwich,document.getElementById('content').firstChild);
  document.getElementById('content').insertBefore(myBtnFish,document.getElementById('content').firstChild);
  document.getElementById('content').insertBefore(myBtnAll,document.getElementById('content').firstChild);   
  document.getElementById('content').insertBefore(myTxtMaxAcceptBuffs,document.getElementById('content').firstChild);
  document.getElementById('content').insertBefore(myTxtNode,document.getElementById('content').firstChild);
}

function multiSelect(m) {
	if (parseFloat(document.getElementById('accepted-buffs-count').innerHTML) == 0) return;	
	var acceptedBuffsSelect = document.getElementById('accepted-buffs-data').getElementsByTagName('select');
	
	// Alle akzeptierten Buffs durchlaufen
	for (var i = 0; i < acceptedBuffsSelect.length; i++) {		
		acceptedBuffsSelect[i].selectedIndex = 0; // alles deselektieren
		var acceptedBuffsOptions = acceptedBuffsSelect[i].getElementsByTagName('option');		
		// Alle options durchlaufen
		for (var j = 0; j < acceptedBuffsOptions.length; j++) {
			// Option auswählen
			if (parseFloat(acceptedBuffsOptions[j].value) == m)	acceptedBuffsSelect[i].selectedIndex = j;
		}
	}
}
 
function multiChk(m){	
	// Alle Tabellen durchlaufe		
	try{	
	var counter = 0;
	var acceptedBuffs = parseFloat(document.getElementById('accepted-buffs-count').innerHTML);
	maxAcceptBuffs = parseFloat(document.getElementById('myTxtMaxAcceptBuffs').value);		
	var Tables = document.getElementsByTagName('table');
		
	for (var i = 0; i < Tables.length; i++) {
		// Tabelle mit class bufflist finden			
		if(Tables[i].getAttribute('class') != 'bufflist') continue;		
		
		// Alle Zeilen der bufflist durchlaufen		
		var Trs = Tables[i].getElementsByTagName('tr');		
		for (var j = 0; j < Trs.length; j++) {
			if (Trs[j].getElementsByTagName('td').length == 0) continue;					    
			if(Trs[j].innerHTML.search("Strike") != -1 && selectStrikes == 0 ) continue; // Buffs mit Strike-Kennung übergehen
			
			// Bufftype auswählen / übergehen
			switch (m) {
			case 1:
				if(Trs[j].innerHTML.search("product-1.png") == -1) continue;
				break;
			case 4:
				if(Trs[j].innerHTML.search("product-1.png") == -1 && Trs[j].innerHTML.search("product-2.png") == -1) continue;
				break;
			case 12:
				if(Trs[j].innerHTML.search("product-3.png") == -1) continue;
				break;
			}			
			
			// CheckBox finden und aktivieren			
			var CheckBoxs = Trs[j].getElementsByTagName('input');
			for (var k = 0; k < CheckBoxs.length; k++) {	
				if ( maxAcceptBuffs > 0 && (acceptedBuffs + counter + 1) > maxAcceptBuffs) break;
				if (CheckBoxs[k].getAttribute('type') != "checkbox" || CheckBoxs[k].getAttribute('name') != "obmulti[]") continue;				
				CheckBoxs[k].checked=true;
				counter++;				
			}			
		}
	}
	} catch(e){
		alert(e);
	}
	
	var p = unsafeWindow;
	if (counter > 0) {
		if (window.navigator.vendor.match(/Google/)) {
			var div = document.createElement("div");
			div.setAttribute("onclick", "acceptMultiBuff('http://www.buff-community.de/');");
			p = div.onclick();
		} else { p.acceptMultiBuff('http://www.buff-community.de/'); // Wenn Buffs ausgewählt dann senden
		}
	}
	if (window.navigator.vendor.match(/Google/)) {
		var div2 = document.createElement("div");
		div2.setAttribute("onclick", "reloadFriendBuffs();");
		p = div2.onclick();
	} else { p.reloadFriendBuffs(); // Buffliste neu laden };
	}
}

//create function, it expects 2 values.
function insertAfter(newElement,targetElement) {
    //target is what you want it to go after. Look for this elements parent.
    var parent = targetElement.parentNode;
     
    //if the parents lastchild is the targetElement...
    if(parent.lastchild == targetElement) {
    //add the newElement after the target element.
    parent.appendChild(newElement);
    } else {
    // else the target has siblings, insert the new element between the target and it's next sibling.
    parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

// Frunde makieren
function findFriends() {
	var friendList = null;
	var onlineList = null;
	var ownrequest = null;
	
	friendList = document.getElementById('friendlist');
	onlineList = document.getElementById('find-friends-area');
	ownrequests = document.getElementById('ownrequests');
	
	if (friendList != null) friendList = friendList.getElementsByTagName('span');
	if (onlineList != null) onlineList = onlineList.getElementsByTagName('tr');
	if (ownrequests != null) ownrequests = ownrequests.getElementsByTagName('span');
		
	for (var i = 1; i < onlineList.length; i++) {		
		var td = onlineList[i].getElementsByTagName('td')[0].innerHTML.replace(/\n/g, "");
		var Ausdruck = /([\w-]+)/;
		Ausdruck.exec(td);	
		// Freunde grün markieren
		for (var j = 0; j < friendList.length; j++) {			
			if (friendList[j].innerHTML == RegExp.$1) {
				onlineList[i].getElementsByTagName('td')[0].innerHTML = "<b style='color:green'>" + onlineList[i].getElementsByTagName('td')[0].innerHTML + "</b";
				continue;
				}
		}	
		//gesendete Anfragen orange markieren
		if (ownrequests != null) {
			for (var j = 0; j < ownrequests.length; j++) {			
				if (ownrequests[j].innerHTML == RegExp.$1) {
					onlineList[i].getElementsByTagName('td')[0].innerHTML = "<b style='color:orange'>" + onlineList[i].getElementsByTagName('td')[0].innerHTML + "</b";
					continue;
					}
			}
		}
	}
}

// Freunde makieren welche zu lange offline sind
function deadFriends() {	
	try {
		var now = new Date();
		var friendList = document.getElementById('friendlist').getElementsByTagName('li');
		var h3Friends = document.getElementById('friend-area').getElementsByTagName('h3')[1];
			h3Friends.innerHTML = friendList.length + " Freunde";
		for (var i = 0; i < friendList.length; i++) {
			var lastLogin = friendList[i].innerHTML.match(/\d\d.\d\d.\d\d/).toString().split('.');		
						
			lastLogin = new Date(parseInt('20' + lastLogin[2],10), parseInt(lastLogin[1],10)-1, parseInt(lastLogin[0],10));
			//alert(lastLogin
			var days = Math.round((now - lastLogin)/(1000*60*60*24));
			if (days >= maxLastLoginDays) {
				//alert(days + " = " + now + " - " + lastLogin);
				friendList[i].style.color = 'white';
				friendList[i].style.backgroundColor = 'red';
			}		
		}
	} catch (e) {
		//alert(e);
	}
}

// Berechne der Zeit für Buffs in Abhängigkeit der BuffPoints und aktiven Buffs
function showBuffTime() {	
	try {
		var buffPoints 	= parseInt(document.getElementById('buff-points').getElementsByTagName('span')[0].innerHTML.replace(/\./g,''),10);		
		var anzBuffs 	= parseInt(document.getElementById('own-buffs-data').getElementsByTagName('h2')[0].innerHTML.match(/[\d]+/),10);			
		var stunden 	= round(buffPoints / anzBuffs / 4 * 3,2);
		var einTag		= anzBuffs * 32;	
		var myTxtNode = document.createTextNode("Buffpoints reichen für zusätzliche " + stunden + " Stunden aus | Du brauchst " + einTag + " Buffpoints für 24 Stunden");
		insertAfter(myTxtNode,document.getElementById('userinfo'))
	} catch (e) {
		//alert(e);
	}
}

function round(x, n)
{
  var a = Math.pow(10, n);
  return (Math.round(x * a) / a);
}

