// ==UserScript==
// @name          Gondalworld Statistics
// @namespace     http://userscripts.org/scripts/edit_src/91214
// @description   member statistics for gondalworld.com
// @include       http://gondalworld.com/guilds/members
// ==/UserScript==


function getDays(s) {
	dateArray = s.split('.');
	sdate = new Date(dateArray[2],dateArray[1]-1,dateArray[0]);
	return (Math.round(((new Date().getTime()/1000.0)-(sdate.getTime()/1000.0))/86400.0));
}


function myGondalStats() {

	TablePayin = document.getElementById('table_payin');
	TableLvl = document.getElementById('table_lvl');
	TableLocation = document.getElementById('table_location');
	TableInfo = document.getElementById('table_info');
	TableInfluence = document.getElementById('table_influence');
	CountMembers = TablePayin.getElementsByTagName("tr").length - 1;

	retVal = 'Name' + ' | ' + 'Wochen' + ' | ' + 'Gold/Woche' + ' | ' + 'Ehre/Woche' + ' | ' + 'Einfluss/Woche' + '\n';

	for (i=1;i<=CountMembers;i++) {

		memberName = TablePayin.getElementsByTagName("tr")[i].cells[0].textContent;
		memberWeeks = Math.round(getDays(TableInfo.getElementsByTagName("tr") [i].cells[3].innerHTML)/7/0.1)/10;
		memberGold = Math.round(TablePayin.getElementsByTagName("tr")[i].cells[1].innerHTML/memberWeeks/0.1)/10;
		memberHonour = Math.round(TableLvl.getElementsByTagName("tr")[i].cells[2].innerHTML/memberWeeks/0.1)/10;
		memberInfluence = Math.round(TableInfluence.getElementsByTagName("tr")[i].cells[2].innerHTML/memberWeeks/0.1)/10;

		retVal = retVal + memberName + ' | ' +  memberWeeks + ' | ' + memberGold + ' | ';
		retVal = retVal + memberHonour + ' | ' + memberInfluence + '\n';
	}
	alert(retVal);
}

GM_registerMenuCommand('gondalworld stats', myGondalStats);