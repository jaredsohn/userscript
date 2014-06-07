// ==UserScript==
// @name           quickStats
// @author         Julijan Andjelic aka RuleMaker
// @namespace      www.anketta.info
// @include        *hi-skill.us/
// @description    this script will make accessing your stats on hi-skill.us easier (assaultcube)
// ==/UserScript==

unsafeWindow=unsafeWindow || window;
var user=GM_getValue('user', false);

window.addEventListener('load', function() {
	//if just installed ask for username
	if (user==undefined || user===false) {
		user=prompt('HI-SKILL quickStats successfully installed. Please enter your username:');
		GM_setValue('user', user);
	}
	
	if (user==undefined || user===false) {return false;} //die if not user
	
	user=GM_getValue('user');
	
	document.getElementById('vc1').innerHTML='<div id="quickStats"></div>'+document.getElementById('vc1').innerHTML;
	var today=document.getElementById('col_1');
	var monthly=document.getElementById('col_2');
	var allTime=document.getElementById('col_3');
	
	today='Today: '+(checkIfListed(today)==undefined?'Not listed':checkIfListed(today))+'<br>';
	monthly='This month: '+(checkIfListed(monthly)==undefined?'Not listed':checkIfListed(monthly))+'<br>';
	allTime='All time: '+(checkIfListed(allTime)==undefined?'Not listed':checkIfListed(allTime));
	
	document.getElementById('quickStats').innerHTML='<b>'+user+'</b><br>'+today+monthly+allTime+'<br><a class="quickStats">change username</a>';
	
	document.getElementsByClassName('quickStats')[0].addEventListener('click', function() {changeUser();}, false);
	

}, false);


function checkIfListed(list) {
	//returns the position if listed
	list=list.getElementsByClassName('plist')[0];
	for (var i in list.getElementsByTagName('tr')) {
		if (i>=1) {
			var currentUser=list.getElementsByTagName('tr')[i].getElementsByTagName('td')[1].childNodes[0].textContent;
			if (currentUser==user) {
			//if found in list create anchor
			var name=list.getElementsByTagName('tr')[i].parentNode.parentNode.parentNode.getAttribute('id')+'_me';
			list.getElementsByTagName('tr')[i].getElementsByTagName('td')[1].childNodes[0].name=name;
			//list.getElementsByTagName('tr')[i].getElementsByTagName('td')[1].appendChild(a);
			return '<a href="#'+name+'">'+list.getElementsByTagName('tr')[i].getElementsByClassName('rank')[0].textContent+'</a>';
			}
		}
	}
}

function changeUser() {
	if (newUser=prompt('Enter your new username:')) {
		GM_setValue('user', newUser);
		window.location.reload();
	}
}
