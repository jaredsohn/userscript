// ==UserScript==
// @name           Logor
// @namespace      Lame noire
// @description    Permet de sauver les logins et mdp
// @include        http://*ogame.*/
// @include        http://*ogame.*/main/loginError*
// ==/UserScript==

var first = true;
var select = document.createElement("select");

function launch () {
	if(!first) return;
	first = false;
	
	var selectText = document.createElement("label");
	var space = document.createElement("span");
	var addAccount = document.createElement("span");
	var space2 = document.createElement("span");
	var removeAccount = document.createElement("span");
	
	clickOn('loginBtn');	
	makeSelect();

	addAccount.innerHTML = makeButton("+");
	removeAccount.innerHTML = makeButton("-");
	space.innerHTML = "\u00a0\u00a0\u00a0\u00a0";
	space2.innerHTML = "\u00a0\u00a0<font color='#619FC8'>/<font>\u00a0\u00a0";
	selectText.innerHTML = "Compte enregistrés";

	insertAfter(removeAccount, document.getElementById('passwordLogin'));
	insertAfter(space2, document.getElementById('passwordLogin'));
	insertAfter(addAccount, document.getElementById('passwordLogin'));
	insertAfter(space, document.getElementById('passwordLogin'));
	insertAfter(select, document.getElementById('passwordLogin'));
	insertAfter(selectText, document.getElementById('passwordLogin'));

	addAccount.addEventListener("click", function(event){addFunction();}, true);
	removeAccount.addEventListener("click", function(event){removeFunction();}, true);
}

function clickOn (idElem) {
	var evt = document.createEvent("MouseEvents");
	evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);  
	var cb = document.getElementById(idElem);
	cb.dispatchEvent(evt);
}

function makeSelect(){
	var text;
	var tmp;
	var account;
	for (var i=0; (account = GM_getValue(i, "")) != ""; i++) {
		tmp = account.split("|");
		text += "<option value='" + tmp[0] + " | " + tmp[1] + "'>" + tmp[0] + " | " + tmp[1] + "</option>";
	}
	select.innerHTML = text;
	selectChanged();
	select.addEventListener("change", function(event){selectChanged();}, true);
}

function selectChanged () {
	var account = GM_getValue(select.selectedIndex, "");
	if(account == "")
		return;
	var tmp = account.split("|");
	var temp;
	for (var i=0; (temp = document.getElementById('serverLogin').options[i]) != null ; i++) {
		if(temp.text == tmp[0]){
			temp.selected = true;
			//truc très bizarre pour que ca marche.
			var evt = document.createEvent("MouseEvents");
			evt.initMouseEvent("change", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);  
			var cb = document.getElementById('serverLogin');
			cb.dispatchEvent(evt);
			//fin truc bizarre
			break;
		}	
	}	
	document.getElementById('usernameLogin').value = tmp[1];
	document.getElementById('passwordLogin').value = tmp[2];
}

function addFunction () {
	var uni = document.getElementById('serverLogin').options[document.getElementById('serverLogin').selectedIndex].text;
	var user = document.getElementById('usernameLogin').value;
	var password = document.getElementById('passwordLogin').value;
	var number = GM_getValue("number", "");
	if(number == "") number = 0;
	GM_setValue(number, uni + "|" + user + "|" + password);
	GM_setValue("number", (number+1));
	makeSelect();
}

function removeFunction () {
	var accounts = new Array();
	var account;
	var index = select.selectedIndex;
	if(index == -1)
		return;
		
	for (var i=0; (account = GM_getValue(i, "")) != ""; i++) {
		if(i != index)
			accounts.push(account);
		GM_deleteValue(i);
	}
		
	for (var i=0; i < accounts.length; i++) {
		GM_setValue(i, accounts[i]);
	}
	GM_setValue("number", accounts.length);
	makeSelect();
}

function makeButton(text){return "<span style='cursor:pointer' class='textlabel'><font color='#619FC8'>" + text + "</font></span>"}

function insertAfter(elem, after) {
	var dad = after.parentNode;
	if(dad.lastchild == after)
		dad.appendChild(elem);
	else 
		dad.insertBefore(elem, after.nextSibling);
}

setInterval(launch,500);