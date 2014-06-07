// ==UserScript==
// @name        Lachschon Username Changer
// @description Aendern von Usernamen und Woertern auf Lachschon
// @include     http://*lachschon.de/*
// ==/UserScript==

var userlist = new Array();
var userCount = 0;
function addUser(old_name, new_name){
	userlist[userCount] = new Array();
	userlist[userCount][0] = old_name;
	userlist[userCount][1] = new_name;
	userlist[userCount][2] = (old_name.charAt(old_name.length - 1) == 's');
	userlist[userCount][3] = (new_name.charAt(new_name.length - 1) == 's');
	userCount++;
}

//addUser("Name vorher", "Name nachher");
//Ab hier darf editiert werden----------------------------------------------------------------------------------------------
addUser("Quantum","Gottes Ebenbild");
addUser("Penis", "Pensi");
//Ab hier nicht mehr editieren-----------------------------------------------------------------------------------------------

function recursive_scan(node) {
	var cnodes = node.childNodes;
	for(var i=0; i<cnodes.length; i++) {
		if (cnodes[i].hasChildNodes()) recursive_scan(cnodes[i]);
		else if (cnodes[i].nodeType == 3)
			for (var j=0; j<userCount; j++) {
				rExp = new RegExp("\\b" + userlist[j][0] + "(s?)\\b('?)", "gi");
				if (cnodes[i].data.search(rExp)!=-1) {
					var strEnd;
					if (RegExp.$1.length > 0 && userlist[j][3]) strEnd="'";
					else if (RegExp.$2.length > 0 && !userlist[j][3]) strEnd="s";
					else strEnd = RegExp.$1 + RegExp.$2;
					cnodes[i].data = cnodes[i].data.replace(rExp, userlist[j][1] + strEnd);
				}
			}
	}
}

recursive_scan(document.getElementById("content"));