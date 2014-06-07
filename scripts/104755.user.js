// ==UserScript==
// @name           VBulletin Spam Remover
// @namespace      http://www.samliew.com
// @description    Helps you to delete VBulletin posts as spam
//
// @include        */inlinemod.php*
// @include        */search.php?*
// @include        */forumdisplay.php?*
// @include        */showthread.php?*
// ==/UserScript==

// Get current page location
var url = window.location.href;
var url_clean = (url.split('?'))[0];
var isBanPage = url.match(/\?do=spamconfirm/);
var elem = document.getElementsByTagName('input');
console.log(isBanPage);

try {
	var elem2 = document.getElementsByName('do');
	for(i=0; i<elem2.length; i++){
		if(elem2[i].tagName == "SELECT") {
			elem2[i].selectedIndex = 2;
		}
	}
} catch(e){}

for(item in elem) {
	try { item.checked = true; } catch(e) {}
}

// If delete page
if(isBanPage) {
	for(i=0; i<elem.length; i++){
		if(elem[i].name == "reason") {
			elem[i].value = "Spamming using bots. Perm ban.";
			break;
		}
	}
	
	document.getElementsByTagName('form')[2].submit();
} else { try {
	for(i=0; i<elem.length; i++){
		if(elem[i].name == "deletereason") {
			elem[i].value = "spam";
			break;
		}
	}
	
	document.getElementById('useraction_ban').checked = true;
	document.getElementsByTagName('form')[2].submit();
}catch(e){} }