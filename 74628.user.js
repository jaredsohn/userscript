//Created by Chris Dasbach
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          endoftheinter live topics
// @namespace     http://www.chrisdasbach.com
// @description   Lets users have click to update topics/utilize live topics.
// @include       http://*boards.endoftheinter.net/showtopics.php?board=*
// @include       https://*boards.endoftheinter.net/showtopics.php?board=*
// ==/UserScript==


// =============== Set Up Variables =====================
var BTN_STRINGS = ['Live Topics (Off)','Live Topics (Slow)','Live Topics (Fast)'];
var SPEEDS = [-1,5000,500];

if (!GM_getValue('liveTopics')) {
	GM_setValue('liveTopics', 0);
}
var mode = GM_getValue('liveTopics');

//Grab some useful elements
var grid = document.getElementsByClassName('grid')[0];
var userbar = document.getElementsByClassName('userbar')[0];
var btn;

var xmlHttp;
var timer;
var boardNumber = getBoardNumber();

//Set up the button which will turn it to off, slow, or fast
function makeButton(){
	// Sperate the menu
	userbar.innerHTML += ' | ';
	//Btn part
	btn = document.createElement('a');
	btn.setAttribute('href','#');
	btn.setAttribute('id','liveTopics');
	btn.innerHTML = BTN_STRINGS[mode];
	userbar.appendChild(btn);
	btn.addEventListener('click',toggleLT,false);
}

//Get the url that we should query
function getBoardNumber(){
	var url = window.location.toString();
	url = url.substring(url.lastIndexOf('board=')+6)
	if(url.indexOf('#')!=-1){
		url = url.substring(0,url.indexOf('#'));
	}
	return url;
}

function toggleLT(){
	mode = (mode+1)%3;
	GM_setValue('liveTopics',mode);
	if(mode){
		startLiveTopics();
	}
	btn.innerHTML = BTN_STRINGS[mode];
	return false;
}

function startLiveTopics(){
	if(mode){
		ajax();
	}
}

function createRequest(){
	xmlHttp = new XMLHttpRequest();	
}

function ajax(){
	createRequest();
	var url = "showtopics.php?board=" + boardNumber;
	xmlHttp.open("GET", url, true);
	xmlHttp.onreadystatechange = StateChange;
	xmlHttp.send(null);
}

function StateChange(){
	if(xmlHttp.readyState == 4){
		newText = xmlHttp.responseText;
		newText = newText.substring(newText.indexOf('<tr>'),newText.lastIndexOf('</table>')+8);
		grid.innerHTML = newText;
		timer = setTimeout(startLiveTopics,SPEEDS[mode]);
	}
}

//================ Execution ============================

makeButton();
startLiveTopics();
