// JavaScript Document

// ==UserScript==
// @name           HellIncTools v1.0
// @namespace      http://userscripts.org/users/
// @author				 Hercules
// @version				 1.0
// @description    Message subject changer based on keywords
// @include        http://s*.ikariam.*/index.php*
//
// @require        http://messagemanager.googlecode.com/svn/messagemanager/helper_functions.js
// @require        http://messagemanager.googlecode.com/svn/messagemanager/lang_data.js
// @require        http://messagemanager.googlecode.com/svn/messagemanager/init_functions.js
// @require        http://messagemanager.googlecode.com/svn/messagemanager/setup_gui_functions.js
// @require        http://messagemanager.googlecode.com/svn/messagemanager/subject_transform_functi.js
// @require        http://messagemanager.googlecode.com/svn/messagemanager/send_message_functions.js
// @require        http://messagemanager.googlecode.com/svn/messagemanager/addressbook_functions.js
//
// ==/UserScript==


/*
Main function calls
*/
var languages = {
	"ua": {
		"safehouse"	: "Швидкий перехід",
		"sendSpy"	: "Send out spy",
		"spyWares"	: "Inspect warehouse",
		"spyMil"	: "Spy out garrison",
		"spyOnline"	: "Online status",
		"spyProtect"	: "Protection against level ",
		"homies"	: "Spies in defence"
	}
}

var imgServPath = "http://bloodygood.name/ikariam/plugin/hell_tools/";
var server = document.domain;
var parts = server.split(".");
var language = languages[parts[parts.length-1]];
if (typeof(language) == "undefined") { language = languages[parts[1]]; // for sn,lang.ikariam.com
if (typeof(language) == "undefined") { update = "all"; language = languages["org"] }}


function doGetCityId() {
// find out the id of the current city
	var match = document.location.toString().match(/id=(\d+)/);
	if (match)	{ return match[1] };
	var cities=document.getElementById("citySelect").getElementsByTagName("option");
	for (var i=0; i<cities.length; i++)
		{ if (cities[i].selected  ) { return cities[i].value }}
	return 0;
}

function doTheBlock(elementId, cityId) {
// city-view: put a box under element with elementId, show all relevant values for cityId
	var element = document.getElementById(elementId);
	var box = document.createElement('div');
	var safehouse = 1;//spyAVgetInt('safehouse', cityId, 0);
//	var townHall = 2;//spyAVgetInt('townHall', cityId, 1);
//	var homies = 3;//spyAVgetInt('homies', cityId, -1);
//	var hasSeenHideout = 4;//homies >= 0;
//	if (homies == -1) { homies = safehouse};
//	var hideoutAtt = parseInt((65+5*homies+2*(safehouse-townHall)) / 2); // the minimal level to get most informations from the town
	// var hideoutAtt = parseInt((5 + 5*homies+2*(safehouse-townHall) - 50) / 2); // alternative by GrAndAG
//	if (hideoutAtt < 1) {hideoutAtt=1}
//	if (hideoutAtt > 32) {hideoutAtt=32}
//	var protection = 5+2*(safehouse-hideoutAtt-townHall)+5*homies;
	var innerHTML = '<div class="dynamic" id="Hell.Inc.Tools">';
	innerHTML += '<h3 class="header">'+language["safehouse"]+'</h3>';
	innerHTML += '<div class="content">';
//	if ( hasSeenHideout ) { innerHTML += '<p>'+language["homies"]+': '+homies+'/'+safehouse+'</p>';} 
//	else { innerHTML += '<p>'+language["homies"]+': &le; '+homies+'</p>' };
//	innerHTML += '<p>'+language["spyProtect"]+hideoutAtt+'</p>';
	
	var lnkCreated = doLinkBody("http://s1.ikariam.com.ua/index.php?view=embassy&id=41030&position=7","Посольство",'092.png');
	innerHTML += '<p>'+lnkCreated+'</p>';

	innerHTML += '</div><div class="footer"></div></div>';
	box.innerHTML = innerHTML;
	element.parentNode.insertBefore(box, element.nextSibling);
}

function doLinkBody(lnkStr,lnkName,lnkImg) {
	if (lnkImg=='') {
		var lnkMade = '<a href="'+lnkStr+'">'+lnkName+'</a>';
	} else {
		var lnkMade = '<a href="'+lnkStr+'" title='+lnkName+'>'+imgServPath+'</a>';
	}
	return lnkMade;
}

function addShortCutBlock() {
//	alert ('worked');
	var cityId;
	cityId = doGetCityId();
	doTheBlock('reportInboxLeft', cityId); 
}
	alert ('worked');

addShortCutBlock();
