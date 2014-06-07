// ==UserScript==
// @name		Enjin DKP Member Sort
// @namespace	http://userscripts.org/users/500049
// @description	Sort Enjin's Add Raid Participants list alphabetically
// @include		http://*.enjin.com/dkp*
// @version		1
// @grant		GM_registerMenuCommand
// ==/UserScript==

function findUsername(labelUser){
	return labelUser.textContent;
}

function uSort(a, b){
	return a.username > b.username;
}

function sortMemberList(){
	
	var divMemeberList, arrayUserLabels = new Array(), i, j;
	var newContents = "";
	
	divMemberList = document.getElementById("dkp_member_name");
	
	for (i in divMemberList.childNodes){
		if(divMemberList.childNodes[i].tagName = "LABEL"){
			arrayUserLabels.push({username:findUsername(divMemberList.childNodes[i]), userLabel:divMemberList.childNodes[i].outerHTML});
		}
	}
	
	arrayUserLabels.sort(uSort);
	
	for (j in arrayUserLabels){
		newContents = newContents + arrayUserLabels[j].userLabel;
	}

	divMemberList.innerHTML = newContents;
	
}

GM_registerMenuCommand("Sort Member List",sortMemberList, "S");