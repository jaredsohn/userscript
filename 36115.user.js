// ==UserScript==
// @name           Show remaining time
// @namespace      asd
// ==/UserScript==
//start
GM_log('ikariam plus loaded');
// Building
var working_building=document.getElementById('cityCountdown');
var research = document.getElementById('currentResearch');
	function Building_updatetitle() {
		var username = document.getElementById('information').getElementsByTagName('ul')[0].getElementsByTagName('li')[2].textContent  ;
		var name= working_building.parentNode.parentNode.getElementsByTagName('a')[0].title;
		document.title=name+':'+working_building.innerHTML;
		window.setTimeout(Building_updatetitle, 1000);
	}

	if (working_building !== null ) {
		GM_log('loaded for Building');
		Building_updatetitle();
	}
//research
	function research_updatetitle() {
		document.title=research.getElementsByTagName('a')[0].title+':'+research.getElementsByTagName('div')[5].innerHTML;
		window.setTimeout(research_updatetitle, 1000);
	}
	if (research !== null ) {
		GM_log('loaded for research');
		research_updatetitle();
	}
	



//end
GM_log('ikariam plus end');