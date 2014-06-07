// ==UserScript==// @name	Gruppenmarkierer// @version    1.0// @description  Markiert die Gruppen in der Übersicht mit den eingestellten Bildern// @author		--virus--// @include	  http://de*.die-staemme.de/*screen=overview_villages*// ==/UserScript==

var groups=new Array();
var column=3; // Position der "Gruppen"-Spalte

// Gruppen
/* In diesem Bereich die Gruppen aus DS als Array ablegen und das dazugehörige Bild angeben. Z.B.:
/* groups["Offgruppe"]="http://de18.die-staemme.de/graphic/dots/red.png?1";
/* groups["Deffgruppe"]="http://de18.die-staemme.de/graphic/dots/green.png?1";*/
// Ende Gruppen

var url = document.URL;
var result = url.split("mode=groups");

if(result.length!=1){ // Gruppenübersicht
	try{ // Versuche alle Dörfer einer Gruppe zuzuordnen
		rows=document.getElementById("group_assign_table").getElementsByTagName("tr");
		for(i=1;i<rows.length-1;i+=2){
			villageGroups=getVillageGroups(rows,i);
			for(group=0;group<villageGroups.length-1;group++){
				chkArray(villageGroups[group],rows[i].getElementsByTagName("td")[0]);
			}
		}
	}catch(Exception){;};
}

var groupItem=document.getElementById("paged_view_content").getElementsByTagName("td")[0]; // Übersicht markieren
for(link=0;link<groupItem.getElementsByTagName("a").length-1;link++){
	var groupNameOriginal=groupItem.getElementsByTagName("a")[link].firstChild.nodeValue;
	var groupName1=groupNameOriginal.split("[")[1];
	var groupName2=groupName1.split("]");
	var groupName=groupName2[groupName2.length-2];

	chkArray(groupName,groupItem.getElementsByTagName("a")[link]);
}

var focusGroup=groupItem.getElementsByTagName("strong")[0].firstChild.nodeValue.split(">")[1].split("<")[0];
chkArray(focusGroup,groupItem.getElementsByTagName("strong")[0]);

// functions

function getVillageGroups(table,intRow){ // Gruppen eines Dorfes als Array
	var stringGroups=table[intRow].getElementsByTagName("td")[column-1].firstChild.nodeValue;
	var arrayGroups=stringGroups.split(";");
	var backArrayGroups=new Array();
	for(var groupString=0;groupString<arrayGroups.length;groupString++){
		var temp=arrayGroups[groupString];
		if(temp[0]==" "){
			var temp2=temp;
			var temp=makeStringWithoutSpace(temp2);
		}
		backArrayGroups[groupString]=temp;
	}
	
	return backArrayGroups;
}
function chkArray(tempGroup,pos){ // Bild erzeugen
	if(groups[tempGroup]!=""){
		var pic=document.createElement("img");
		pic.src=groups[tempGroup];
		pos.appendChild(pic);
	}
}
function makeStringWithoutSpace(string){ // Angangsleerzeichen bei Strings entfernen
	var newString="";
	for(pos=1;pos<string.length;pos++){
		newString+=string[pos];
	}
	return newString;
}