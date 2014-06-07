// ==UserScript==
// @name         EarthLost Mobile UI
// @description  Mobile UI for EarthLost.de
// @version      0.3.2
// @copyright    (c) Bdiem 2012
// @homepage     http://userscripts.org/scripts/show/132777
// @updateURL    https://userscripts.org/scripts/source/132777.meta.js
//
// @match        http://*.earthlost.de/*
// @include      http://*.earthlost.de/*
//
// @require 	 http://code.jquery.com/jquery.min.js
// ==/UserScript==

(function(){
var navFrame,mainFrame,navFrame2;
var currentURL = (document.location+'');
var isRoot=document.getElementById("ifrm");

if ('undefined' != typeof document.getElementsByTagName('body')[0]){
	document.getElementsByTagName('body')[0].id="rootBody"; // set all to set the first; find a better solution!
}

function reID(){
	if (typeof document.getElementById("ifrm").contentDocument.body.getElementsByTagName("frame")[0] != 'undefined') {		
		navFrame = document.getElementById("ifrm").contentDocument.body.getElementsByTagName("frame")[0].contentDocument;	
		navFrame.getElementById('rootBody').id="navBody";	
	}

	if ('undefined' != typeof document.getElementById("ifrm").contentDocument.body.getElementsByTagName("frame")[1]) {		
		mainFrame = document.getElementById("ifrm").contentDocument.body.getElementsByTagName("frame")[1].contentDocument;
		mainFrame.getElementById('rootBody').id="mainBody";
	}

	if ('undefined' != typeof document.getElementById("ifrm").contentDocument.body.getElementsByTagName("frame")[2]) {		
		navFrame2 = document.getElementById("ifrm").contentDocument.body.getElementsByTagName("frame")[2].contentDocument; 
		navFrame2.getElementById('rootBody').id="nav2Body";
	}
}

function checkContext(){
	//console.log(document.getElementById("ifrm")); 
	if(isRoot) {
		console.log(document.getElementById("ifrm")); 
		if (document.getElementById("ifrm").contentDocument.body.getElementsByTagName("frame")[1]) {
			console.log(document.getElementById("ifrm").contentDocument.body.getElementsByTagName("frame")[1]); 
			reID();			
			//Testausgabe
			if(typeof mainFrame != 'undefined'){
				//alert(mainFrame.body.getElementsByTagName('table')[5].innerHTML);
				console.log(mainFrame.body.getElementsByTagName('table')[5].innerHTML);
			}			
		}
	}
				
	//	var t=setTimeout(function(){checkFrameLoad();},100);			
}

window.onload = function() {
	checkContext();	
}

//UI Manipulation
function changeUI() {
	// UI Manipulation
	var baseColor = '#FFF'; // '#BADA55';
	$('html,body').css('background', baseColor);
	$('html,body,table,div').css('border', 'none');
	$('td').css('background', baseColor);
	$('td').css('color','#000');
	$('tr[class=highlight] td').css('background', '#BADA55');
	$('img').css('display', 'none');
	$('img[src="http://images.earthlost.de/images/build.png"]').css('display','inline');
	$('img[src="http://images.earthlost.de/images/hunger.png"]').css('display','inline');
	$('img[src="http://images.earthlost.de/images/prod.png"]').css('display','inline');
	$('img[src="http://images.earthlost.de/images/alarm.png"]').css('display','inline');
	$('img[src="http://images.earthlost.de/images/science.png"]').css('display','inline');
	$('img[src="http://images.earthlost.de/images/happy.png"]').css('display','inline');
	$('img[src="http://images.earthlost.de/images/happy2.png"]').css('display','inline');
	$('img[src="http://images.earthlost.de/images/msg/0.png"]').css('display','inline');
	$('img[src="http://images.earthlost.de/images/msg/1.png"]').css('display','inline');
	$('img[src="http://images.earthlost.de/images/msg/2.png"]').css('display','inline');
	$('img[src="http://images.earthlost.de/images/msg/3.png"]').css('display','inline');
	$('img[src="http://images.earthlost.de/images/msg/4.png"]').css('display','inline');
	$('img[src="http://images.earthlost.de/images/msg/5.png"]').css('display','inline');
	$('img[src="http://images.earthlost.de/images/msg/6.png"]').css('display','inline');
	$('img[src="http://images.earthlost.de/images/msg/8.png"]').css('display','inline');
	$('img[src="http://images.earthlost.de/images/msg/9.png"]').css('display','inline');
	$('img[src="http://images.earthlost.de/images/msg/10.png"]').css('display','inline');
	$('img[src="http://images.earthlost.de/images/msg/13.png"]').css('display','inline');
	$('img[src="http://images.earthlost.de/images/msg/14.png"]').css('display','inline');
	$('img[src="http://images.earthlost.de/images/msg/19.png"]').css('display','inline');
	$('img[src="http://images.earthlost.de/images/msg/20.png"]').css('display','inline');
	
	$('a:link,a:hover').css('background', baseColor);
	$('a:link,a:hover').css('color', '#666');	
	
	// Sample: Add New Control
	var $muiMain = $('<div id="muiMain"/>');
	if(isRoot) {
		//$('#rootBody').append($muiMain); // Working!
	}
	$('#muiMain').append("<p><strong>Put Some Cool Stuff Here</strong></p>");
	$('#muiMain').css('background-color', 'rgba(120,140,55,0.5)');
	$('#muiMain').css('width', '100%');
	$('#muiMain').css('height', '100%');
	$('#muiMain').css('position', 'absolute');
	$('#muiMain').css('top', '0');
	$('#muiMain').css('left', '0');
	$('#muiMain').css('z-index', '99');
}

changeUI();

}());
