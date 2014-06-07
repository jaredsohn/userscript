// Familjeliv user script
// version 0.2
// 2010-05-26
// Copyright (c) 2010, Tonny Vildevall
//
//  ---------------------------------------------------------------------------------------------------------------------------------------
//
// This is  a Greasemonkey script.
//
// ---------------------------------------------------------------------------------------------------------------------------------------
//
// ==UserScript==
// @name		FLscript
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require    http://userscripts.org/scripts/source/62718.user.js
// @include 	http://www.familjeliv.se/*
// ==/UserScript==

Config.scriptName = "Script Options Demo";

Config.tabs = {
	"Jobbiga ämnen":{
		html:'<p>Här väljer du bort de ämen du itne vill ska visas.</p>',
		fields:{
			optionOne:{
				type:'checkbox',
				label:'Allmäna rubriker',
				text:'',
				value:false,
			},
			optionTwo:{
				type:'checkbox',
				label:'Fråga Experten',
				text:'',
				value:false,
			},
			optionTree:{
				type:'checkbox',
				label:'Planera barn',
				text:'',
				value:false,
			},
			optionFour:{
				type:'checkbox',
				label:'Svårt att få barnr',
				text:'',
				value:false,
			},
			optionFive:{
				type:'checkbox',
				label:'Adoption',
				text:'',
				value:false,
			},
			optionSix:{
				type:'checkbox',
				label:'Gravid',
				text:'',
				value:false,
			},
			optionSeven:{
				type:'checkbox',
				label:'Förälder',
				text:'',
				value:false,
			},
			optionEigth:{
				type:'checkbox',
				label:'Pappagruppen',
				text:'',
				value:false,
			},
			optionNine:{
				type:'checkbox',
				label:'Känsliga rummet',
				text:'',
				value:false,
			},
			optionTen:{
				type:'checkbox',
				label:'Sex & Samlevnad',
				text:'',
				value:false,
			},
			optionEleven:{
				type:'checkbox',
				label:'Änglarum',
				text:'',
				value:false,
			},
			optionTwelve:{
				type:'checkbox',
				label:'Medlemsgrupper',
				text:'',
				value:false,
			},
			optionThirtheen:{
				type:'checkbox',
				label:'Slutna dialoger',
				text:'',
				value:false,
			},
		}
	},
	"About":{
		html:'<p>När FL inte vill anpassa sig (eller du är onödigt krånglig) så anpassar det här scriptet FL åt dig.</p>',
	}
};



var allLinks, thisLink, hide ;
hide = Config.get('optionOne');
if (hide) {
 	allLinks= document.evaluate(
		"//td/a[starts-with(@href,'/Forum-5')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < allLinks.snapshotLength; i++){
		thisLink= allLinks.snapshotItem(i);
		cell= thisLink.parentNode;
		row = cell.parentNode;
		table = row.parentNode;
		table.removeChild(row);
	
	}
}
hide = Config.get('optionTwo');
if (hide) {
 	allLinks= document.evaluate(
		"//td/a[starts-with(@href,'/Forum-15')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < allLinks.snapshotLength; i++){
		thisLink= allLinks.snapshotItem(i);
		cell= thisLink.parentNode;
		row = cell.parentNode;
		table = row.parentNode;
		table.removeChild(row);
	
	}
}
hide = Config.get('optionTree');
if (hide) {
 	allLinks= document.evaluate(
		"//td/a[starts-with(@href,'/Forum-1')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < allLinks.snapshotLength; i++){
		thisLink= allLinks.snapshotItem(i);
		cell= thisLink.parentNode;
		row = cell.parentNode;
		table = row.parentNode;
		table.removeChild(row);
	
	}
}
hide = Config.get('optionFour');
if (hide) {
 	allLinks= document.evaluate(
		"//td/a[starts-with(@href,'/Forum-7')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < allLinks.snapshotLength; i++){
		thisLink= allLinks.snapshotItem(i);
		cell= thisLink.parentNode;
		row = cell.parentNode;
		table = row.parentNode;
		table.removeChild(row);
	
	}
}
hide = Config.get('optionFive');
if (hide) {
 	allLinks= document.evaluate(
		"//td/a[starts-with(@href,'/Forum-13')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < allLinks.snapshotLength; i++){
		thisLink= allLinks.snapshotItem(i);
		cell= thisLink.parentNode;
		row = cell.parentNode;
		table = row.parentNode;
		table.removeChild(row);
	
	}
}
hide = Config.get('optionSix');
if (hide) {
 	allLinks= document.evaluate(
		"//td/a[starts-with(@href,'/Forum-2')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < allLinks.snapshotLength; i++){
		thisLink= allLinks.snapshotItem(i);
		cell= thisLink.parentNode;
		row = cell.parentNode;
		table = row.parentNode;
		table.removeChild(row);
	
	}
}
hide = Config.get('optionSeven');
if (hide) {
 	allLinks= document.evaluate(
		"//td/a[starts-with(@href,'/Forum-3')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < allLinks.snapshotLength; i++){
		thisLink= allLinks.snapshotItem(i);
		cell= thisLink.parentNode;
		row = cell.parentNode;
		table = row.parentNode;
		table.removeChild(row);
	
	}
}
hide = Config.get('optionEight');
if (hide) {
 	allLinks= document.evaluate(
		"//td/a[starts-with(@href,'/Forum-6')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < allLinks.snapshotLength; i++){
		thisLink= allLinks.snapshotItem(i);
		cell= thisLink.parentNode;
		row = cell.parentNode;
		table = row.parentNode;
		table.removeChild(row);
	
	}
}
hide = Config.get('optionNine');
if (hide) {
 	allLinks= document.evaluate(
		"//td/a[starts-with(@href,'/Forum-4')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < allLinks.snapshotLength; i++){
		thisLink= allLinks.snapshotItem(i);
		cell= thisLink.parentNode;
		row = cell.parentNode;
		table = row.parentNode;
		table.removeChild(row);
	
	}
}
hide = Config.get('optionTen');
if (hide) {
 	allLinks= document.evaluate(
		"//td/a[starts-with(@href,'/Forum-9')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < allLinks.snapshotLength; i++){
		thisLink= allLinks.snapshotItem(i);
		cell= thisLink.parentNode;
		row = cell.parentNode;
		table = row.parentNode;
		table.removeChild(row);
	
	}
}
hide = Config.get('optionEleven');
if (hide) {
 	allLinks= document.evaluate(
		"//td/a[starts-with(@href,'/Forum-10')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < allLinks.snapshotLength; i++){
		thisLink= allLinks.snapshotItem(i);
		cell= thisLink.parentNode;
		row = cell.parentNode;
		table = row.parentNode;
		table.removeChild(row);
	
	}
}
hide = Config.get('optionTwelve');
if (hide) {
 	allLinks= document.evaluate(
		"//td/a[starts-with(@href,'/Forum-11')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < allLinks.snapshotLength; i++){
		thisLink= allLinks.snapshotItem(i);
		cell= thisLink.parentNode;
		row = cell.parentNode;
		table = row.parentNode;
		table.removeChild(row);
	
	}
}
hide = Config.get('optionThirteen');
if (hide) {
 	allLinks= document.evaluate(
		"//td/a[starts-with(@href,'/Forum-14')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < allLinks.snapshotLength; i++){
		thisLink= allLinks.snapshotItem(i);
		cell= thisLink.parentNode;
		row = cell.parentNode;
		table = row.parentNode;
		table.removeChild(row);
	
	}
}
var list = document.getElementById('leftNav');
var myItem = document.createElement('li');
myItem.setAttribute('class', 'item level1');
myItem.innerHTML = "<span='level1'><a  class='level1'>FLscript</a></span>";
list.appendChild(myItem);
myItem.addEventListener('click', Config.show, false);
