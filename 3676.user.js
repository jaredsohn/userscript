// ==UserScript==
// @name           Facebook StalkrNET
// @namespace      
// @description    Replaces the facebook logo with the StalkrNET logo
// @include        http://*.facebook.com/*
// ==/UserScript==

var stalkrNET = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIUAAABuCAMAAAA+hyBPAAAABGdBTUEAAK/INwWK6QAAABl0RVh0'+
'U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAA/UExURc7V5Z2sy2yDsvP1+bXB2EdjnjFQ'+
'kXiNuGB4q+bq8lRupYWXv5Gixdrg7MLL32F5ram20itKjG2EtP///ztZmNzRS4sAAAJESURBVHja'+
'7Nlrr6MgEAZgBuSA1+0u/P/futy0oJhYm6gneflgLVV5OozUdJh9QmNQQAEFFFBAAQUUUEABBRS7'+
'rWeMaXc4Y69LFJyIuk0vGWO4tW5bczPXb8jvpQPM0li2Px90QJHG+1wh5BMUYYQvFX4iVFcotHJ9'+
'gz6s8MHIFMU075xYKlQbqc1bni5tTKvWCi3cax8OsH3r+tnyRb9RqEr8FoUxulTI0b28YgSa0D/v'+
'dbmChyaPK1wkBLeyH5mlcEU3FXZq3LBdEyJUKCa3nZZ5mBXdHMoyL/hxhY97QKttdsbzM8XgNqNM'+
'iqbnLpvC3DSJcloRsoKRKu8R2TcsfpIrfI/Qc06+s9N2aVpmBQtNH1fQnIg6U/TinS2ZwiwXXClC'+
'ME5l59/00ZBGbN8Kf6JoBl5TmKGmkOKk4idbL6Y4jbOiiTfHJi/awOsqihTS04ox/HC8FoXKxthk'+
'p50nf6OIwTitcGmluM8D4dLB3wKKD1MIvKStIgymKooYjPUK/oEitX6ZXZNWMrFV2CEu11uFFN8o'+
'aIxnhHtDx9U8TJBhuqIIo04VhaVvFO5buMV26e3iG03EL3nU+nnEEx8UUEDxOxT/HtD+QAFFVYF/'+
'UaCAAgoooIACCiiggAKKhytQyfxIgUpmpviokkkVxeWVTF8eXCsur2QSFYx7KplEJeOWSibRinFH'+
'JZNozbihkkm0ZtxTyVyH4p5KZhx/o7i4krmjuLiSuau4tJK5o7i4krmjQCUTCiig+DUK1M2geKzi'+
'vwADACwxL69B2VLiAAAAAElFTkSuQmCC';

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

//addGlobalStyle('#pageheader { background-image: url('+stalkrNET+') ! important; }');

 
 addGlobalStyle('#sidebar a.go_home { background-image: url('+stalkrNET+') ! important; }');
 


//remove the ads


var allPagetags = new Array(); 					//Create an array

function doSomethingWithClasses(theclass) {
	
	var allPagetags=document.getElementsByTagName("*");	//Populate the array with all the page tags
	
	for (i=0; i<allPagetags.length; i++) {			//Cycle through the tags using a for loop

		if (allPagetags[i].className==theclass) {	//Pick out the tags with our class name

			allPagetags[i].style.display='none';	//Manipulate this in whatever way you want
		}
	}
} 

doSomethingWithClasses('sponsors');

var getP = new Array();


var getP = new Array();

function doSomethingWith(tag){

	var toMatch = /(facebook)/i;
	
	var getP = document.getElementsByTagName(tag);
	for (i=0; i<getP.length; i++){
		getP[i].innerHTML = getP[i].innerHTML.replace(toMatch, "stalkrNET");
	}
}

var getA = new Array();

function restoreLinks(tag, prop){

	var toMatch = /(stalkrNET)/i;
	
	var getA = document.getElementsByTagName(tag);
	
	for (i=0; i<getA.length; i++){
		getA[i].href = getA[i].href.replace(toMatch, "facebook");
	}
}

function restoreForm(tag){

	var toMatch = /(stalkrNET)/i;
	
	var getA = document.getElementsByTagName(tag);
	
	for (i=0; i<getA.length; i++){
		getA[i].action = getA[i].action.replace(toMatch, "facebook");
	}
}

function restoreImages(tag){

	var toMatch = /(stalkrNET)/i;
	
	var getA = document.getElementsByTagName(tag);
	
	for (i=0; i<getA.length; i++){
		getA[i].src = getA[i].src.replace(toMatch, "facebook");
	}
}


//doSomethingWith("p");
doSomethingWith("h2");
doSomethingWith("div");

restoreLinks("a");
restoreForm("form");
restoreImages("img");

var getHead = new Array();

function doSomethingWithHead(){

	var toMatch = /Facebook /;
	
	var getHead = document.title

	document.title = document.title.replace(toMatch, "stalkrNET ");
}

doSomethingWithHead();