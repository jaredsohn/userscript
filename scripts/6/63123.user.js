// ==UserScript==
// @name		  KOC Floating Minibar version a
// @namespace	  http://userscripts.org/scripts/show/58824
// @description   Floating mini menu on top left of Kings Of Chaos website
// @version       0.5
// @require       http://usocheckup.dune.net/63123.js?maxage=3
// @include       http://kingsofchaos.com/*
// @include       https://kingsofchaos.com/*
// @include       http://*.kingsofchaos.com/*
// @include       https://*.kingsofchaos.com/*
// @exclude	   
// ==/UserScript==

// -=- Release Notes -=-
//	Version 0.5a
//	-Initial Code
//
// end notes

// Create floating menu bar
var menuBar = document.body.appendChild(document.createElement('div'));
	menuBar.setAttribute('id', 'menu');
	menuBar.style.border = '1px solid #777';
	menuBar.style.background = '#000';
	menuBar.style.position = 'fixed';
	menuBar.style.padding = 5;
	menuBar.style.top = 0;
	menuBar.style.left = 0;
// End floating menu bar

// Create links for menu
var myLink = document.createElement('a');
var href = document.createAttribute('href');
	myLink.setAttribute('href','http://www.kingsofchaos.com/base.php');
	myLink.innerHTML = '<b>[Command Center]</b>  ';
var spanAppend = document.getElementById('menu');
	spanAppend.appendChild(myLink);
	
	
var myLink = document.createElement('a');
var href = document.createAttribute('href');
	myLink.setAttribute('href','http://www.kingsofchaos.com/attack.php');
	myLink.innerHTML = '<b>[Attack]</b>  ';
var spanAppend = document.getElementById('menu');
	spanAppend.appendChild(myLink);
		
	
var myLink = document.createElement('a');
var href = document.createAttribute('href');
	myLink.setAttribute('href','http://www.kingsofchaos.com/attacklog.php');
	myLink.innerHTML = '<b>[Attack Log]</b>  ';
var spanAppend = document.getElementById('menu');
	spanAppend.appendChild(myLink);

	
var myLink = document.createElement('a');
var href = document.createAttribute('href');
	myLink.setAttribute('href','http://www.kingsofchaos.com/armory.php');
	myLink.innerHTML = '<b>[Armory]</b>';
var spanAppend = document.getElementById('menu');
	spanAppend.appendChild(myLink);

	
var myLink = document.createElement('a');
var href = document.createAttribute('href');
	myLink.setAttribute('href','http://www.kingsofchaos.com/alliances.php');
	myLink.innerHTML = '<b>[Alliances]</b>  ';
var spanAppend = document.getElementById('menu');
	spanAppend.appendChild(myLink);

	
var myLink = document.createElement('a');
var href = document.createAttribute('href');
	myLink.setAttribute('href','http://www.kingsofchaos.com/train.php');
	myLink.innerHTML = '<b>[Training]</b>  ';
var spanAppend = document.getElementById('menu');
	spanAppend.appendChild(myLink);

	
var myLink = document.createElement('a');
var href = document.createAttribute('href');
	myLink.setAttribute('href','http://www.kingsofchaos.com/intel.php');
	myLink.innerHTML = '<b>[Intel]</b>  ';
var spanAppend = document.getElementById('menu');
	spanAppend.appendChild(myLink);
	
	
var myLink = document.createElement('a');
var href = document.createAttribute('href');
	myLink.setAttribute('href','http://www.kingsofchaos.com/recruit.php');
	myLink.innerHTML = '<b>[Recruit]</b>  ';
var spanAppend = document.getElementById('menu');
	spanAppend.appendChild(myLink);

	
var myLink = document.createElement('a');
var href = document.createAttribute('href');
	myLink.setAttribute('href','http://www.kingsofchaos.com/mercs.php');
	myLink.innerHTML = '<b>[Mercs]</b>  ';
var spanAppend = document.getElementById('menu');
	spanAppend.appendChild(myLink);

	
var myLink = document.createElement('a');
var href = document.createAttribute('href');
	myLink.setAttribute('href','http://www.kingsofchaos.com/logout.php');
	myLink.innerHTML = '<b>[Logout]</b>  ';
var spanAppend = document.getElementById('menu');
	spanAppend.appendChild(myLink);
// End links