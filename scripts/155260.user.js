// ==UserScript==
// @name		Enjin Calendar Sort
// @namespace	http://userscripts.org/users/500049
// @description	Sort Enjin's calendar attendance list alphabetically
// @include		http://*.enjin.com/events*
// @version		1
// @grant		GM_registerMenuCommand
// ==/UserScript==

function findUsername(divUser){
	var k;
	
	for (k in divUser.childNodes){
		if((' ' + divUser.childNodes[k].className + ' ').indexOf(' ' + 'username' + ' ') > -1){
			return divUser.childNodes[k].firstChild.innerHTML;
		}
	}
}

function uSort(a, b){
	return a.username > b.username;
}

function sortAttendList(){
	
	var elems = document.getElementsByTagName('*'),  divAttendList ,arrayUserDivs = new Array(), i, j, k;
	var x = "";
	
	for (i in elems) {
		if((' ' + elems[i].className + ' ').indexOf(' ' + 'scroller' + ' ') > -1){
			divAttendList = elems[i];
		}
	}
	
	for (j in divAttendList.childNodes){
		if((' ' + divAttendList.childNodes[j].className + ' ').indexOf(' ' + 'item-character' + ' ') > -1){
			arrayUserDivs.push({username:findUsername(divAttendList.childNodes[j]), userDiv:divAttendList.childNodes[j]});
		}
	}
	
	arrayUserDivs.sort(uSort);
	
	for (k in arrayUserDivs){
		divAttendList.removeChild(divAttendList.childNodes[0]);
	}
	
	for (k in arrayUserDivs){
		divAttendList.appendChild(arrayUserDivs[k].userDiv);
		
	}
	
}

GM_registerMenuCommand("Sort Attendance List",sortAttendList, "S");