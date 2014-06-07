// ==UserScript==
// @name          MHA Target Links
// @namespace     http://apps.facebook.com/ability/*
// @include       http://apps.facebook.com/ability/*
// @include       http://apps.new.facebook.com/ability/*
// @exclude       http://apps.facebook.com/ability/group/*
// @exclude       http://apps.new.facebook.com/ability/group/*
// @description   Add links directly to a user's target page after every
//                link to their profile page.
// ==/UserScript==

var targetPic = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAI'+
	'AAAC0tAIdAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICE'+
	'AAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAFxJREFUKFOVUtkOADAE8%2F8%2Fv'+
	'S0hQp3bE1ZVB1H2ThqtoA89JyiIoV2OJats0QJ1e9epZAElffxQ3ToGwSjTxpDegaPkZh'+
	'yI6XQDenRzPbGs2%2F3HLm2jqzvB6Yaju4nxQMBLXFL8AAAAAElFTkSuQmCC';

function addGlobalStyle(css) { 
	var head, style; 
	head = document.getElementsByTagName('head')[0]; 
	if (!head) { return; } 
	style = document.createElement('style'); 
	style.type = 'text/css'; 
	style.innerHTML = css; 
	head.appendChild(style);
}

addGlobalStyle('' +
	'a.targetPic { \n' +
	' padding-left: 15px; background: center no-repeat; \n' +
	'} \n' +
	'a.targetPic { \n' +
	' background-image: url(' + targetPic + '); \n' +
	'} \n' +
	'a.targetPic:hover { \n' +
	' opacity: 0.5; \n' +
	'} \n' +
	'div.backgroundimage { \n' +
	'  display:inline; \n' +
	'  white-space: nowrap; \n' +
	'}');

var link, anchor, background, id;
for (var i=0; i<document.links.length; i++) {

	link = document.links[i];

	// filter non-profile links
	if(link.getAttribute('href').indexOf('targetUserId') != -1) {
		continue;
	}
	if(link.getAttribute('href').indexOf('ability/profile') == -1) {
		continue;
	}
	// Also, filter links that have parameters.
	if(link.getAttribute('href').indexOf('?') != -1) {
		continue;
	}

	// add background
	background = document.createElement('div');
	background.className = 'backgroundimage';
	link.parentNode.insertBefore(background, link.nextSibling);

	//add link
	id = link.getAttribute('href').substring(link.getAttribute('href').lastIndexOf('/')+1,link.getAttribute('href').length)
	anchor = document.createElement('a');
	anchor.href = 'http://apps.new.facebook.com/ability/target?targetUserId=' + id;
	anchor.title = 'Target';
	anchor.className = 'targetPic';
	background.appendChild(anchor);

	// add a space so it wraps nicely 
	link.parentNode.insertBefore(document.createTextNode(' '), 
		link.nextSibling);
}
