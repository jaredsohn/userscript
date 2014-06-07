// ==UserScript==
// @name           Campusnet Coursenames
// @description    Changes names of courses so you can see what you are clicking
// @include        https://www.campusnet.dtu.dk/cnnet/*
// ==/UserScript==

//Make campusnet page wider, since your monitor has the space anyways :P
GM_addStyle("#outertable {width: 1000px; !important;}"); // default 970

//Amount of extra width to add to each course entry
ExtraWidth = 20;
GM_addStyle(".leftmenu {width: " +(170+ExtraWidth).toString() +"px; !important;}");


kurser = document.getElementById('outertable_secondrowtdtoc').childNodes[3].firstChild;

for (i=1;i<kurser.childNodes.length;i++) 
{
	title = kurser.childNodes[i].firstChild.title;
	//Remove course placement
	title = title.substr(0,title.lastIndexOf(' '));
	
	if (title.indexOf('Fagprojekt')!=-1){
		title = title.substr(0,6).concat('Fagprojekt');}
	
	//Wordfilters to your liking
	title = title.replace('Introduktion til Matematik og teknologi','Intro til MatTek');

	title = title.replace('Projektarbejde inden for ','Projekt i ');
	title = title.replace('billedanalyse og computer grafik','billedanalyse');
	title = title.replace(' Jan','');
	title = title.replace('Sandsynlighedsregning','Sandsynlighed');
	title = title.replace(' og datamodellering','');
	title = title.replace('Diskret matematik','Diskret');
	title = title.replace('Programmering af ','');

	title = title.replace('Matematik','Mat');	
	title = title.replace('Introduktion til ','');
	
	//Make the first letter uppercase
	title = title.slice(0,7).toUpperCase().concat(title.slice(7));

	//Add back braces around archived courses
	if (kurser.childNodes[i].firstChild.innerHTML.substr(0,1)=="[") {
		title = "[" + title + "]"
	}
	
	kurser.childNodes[i].firstChild.innerHTML = title;
	kurser.childNodes[i].firstChild.style.width = (154+ExtraWidth).toString()+'px';
	
}