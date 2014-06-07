// WikiPaths : The Great Link Race
// version 0.1 BETA!
// 2008-01-30
// Copyright (c) 2008, Alex Abreu, Tim Szetela, Ithai Benjamin
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
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
// @name          WikiPaths : The Great Link Race
// @namespace     http://www.alexabreu.com/wiki
// @description   A link-based scavenger hunt within Wikipedia.
// @include       http://www.zh.wikipedia.org/wiki/Wikipedia:WikiPaths
// @include       http://zh.wikipedia.org/wiki/Wikipedia:WikiPaths
// @exclude       http://www.wikipedia.org
// @require   	  http://www.alexabreu.com/wiki/js/mootools-1.2.1.js
// @require   	  http://www.alexabreu.com/wiki/js/mootools-1.2-more.js
// @require   	  http://www.alexabreu.com/wiki/js/loadexternalfile.js     
// ==/UserScript==

var allAnchors;
var endPage = '0';
var currentPage = '1';
var wikipediaPath = "http://zh.wikipedia.org/wiki/";
var wikipathsURL = "http://zh.wikipedia.org/wiki/Wikipedia:WikiPaths";
var linkCounter = 0;
var gameStarted = false;
var startButton = new Element('div', {'id':'start-button', 'html': '<br /><br />開始'});
var leftPanel = new Element('div', {'id':'left-panel'});
var logo = new Element('IMG', {'id':'logo'});
var topFrame = new Element('div', {'id':'top-frame'});
var goalFrame = new Element('div', {'id':'goal-frame'});
var goal = new Element('div', {'id':'goal'});
var winFrame = new Element('div', {'id':'win-frame', 'html': '<br />Congratulations!<br />You Win!'});
var menuFrame = new Element('div', {'id':'menu-frame'});
var timerFrame = new Element('div', {'id':'timer-frame', 'text': 'Game Clock'});
var timerText = new Element('div');
var pathFrame = new Element('div', {'id':'path-frame', 'text': 'Link History'});
var pathItems = new Element('div', {'id':'path-items'});
var linkCountFrame = new Element('div', {'id':'link-count-frame', 'text': 'Link Count'});
var linkCount = new Element('div', {'id':'link-count'});
var goalToggle = new Element('div',{'id':'goal-toggle'});
var goalMaximize = new Element('div',{'id':'goal-maximize'});
var resetButton = new Element('a',{'id':'reset-button', 'href': wikipathsURL, 'text': 'restart'});



window.addEvent('domready', function() {
	
	loadExternalFile("http://www.alexabreu.com/wiki/css/wikipaths_v02.css", "css") ////dynamically load and add this .css file
	
	initializeGUI();
		
	if (!gameStarted) {
		show(startButton);
	}
	
	startButton.addEvent('click', function() {
		startGame();
	});
	
	
});

function initializeGUI() {
	var doc = document.body;
	logo.src = "http://www.alexabreu.com/wiki/assets/images/logo.png";
	doc.appendChild(leftPanel);
	leftPanel.adopt(menuFrame);
	leftPanel.adopt(timerFrame);
	leftPanel.adopt(linkCountFrame);
	leftPanel.adopt(pathFrame);
	doc.appendChild(logo);
	doc.appendChild(topFrame);
	doc.appendChild(goalFrame);
	doc.appendChild(winFrame);
	doc.appendChild(startButton);
	goalFrame.adopt(goal);
	timerFrame.adopt(timerText);
	pathFrame.adopt(pathItems);
	linkCountFrame.adopt(linkCount);
	menuFrame.adopt(resetButton);
	goalToggle.addEvent('click', function() {
		toggleGoalPosition();
	});
	goalMaximize.addEvent('click', function() {
		toggleMaximize();
	});
	calculateTime.delay(0, {time : 0});
} 

function toggleGoalPosition() {
	var toggleGoalPositionEffect = new Fx.Morph('goal-frame', {duration: 'short', transition: Fx.Transitions.Sine.easeOut});
	
	if ($('goal-frame').getStyle('height') != '40px') {
		toggleGoalPositionEffect.start({
			'height': '40px',
			'width': '500px'
		});
	}
	else {
		toggleGoalPositionEffect.start({
			'height': '200px',
			'width': '500px'
		});
	}
	$('goal').scrollTo(0,0);
}

function toggleMaximize() {
	var toggleGoalSizeEffect = new Fx.Morph('goal-frame', {duration: 'short', transition: Fx.Transitions.Sine.easeOut});
	
	if ($('goal-frame').getStyle('height') != '450px') {
		toggleGoalSizeEffect.start({
			'height': '450px',
			'width': '800px'
		});
	}
	else {
		toggleGoalSizeEffect.start({
			'height': '200px',
			'width': '500px'
		});
	}
	$('goal').scrollTo(0,0);
}

function startGame() {
	gameStarted = true;
	hide(startButton);
	getWikiPage('');
	getRandomEndPage.delay(100);
	//window.history.back(window.history.length * -1);
}

function hide(element) {
	element.set('styles', {'visibility':'hidden'});
}

function show(element) {
	element.set('styles', {'visibility':'visible'});
}

function getWikiPage(wikiURL) {
	var container = $('column-content').getElementById('content');
	if (wikiURL == "") {
		wikiURL = "http://zh.wikipedia.org/wiki/Special:Random";
	}
	var request = new Request.HTML({
								   	 url:wikiURL,
									 onRequest: function () { 
									 	container.set('text', 'Loading the Wikpedia article...');
  										container.addClass('ajax-loading');
										$(window).scrollTo(0,0);
									 },
									 onSuccess: function (responseTree, responseElements, responseHTML, responseJavaScript) {
												responseElements.each(function(element) {
													  if(element.get('id') == 'content') {
														    container.removeClass('ajax-loading');
															element.replaces(container);
															currentPage = element.getElementById('firstHeading').get('text');
															//location.replace(wikipediaPath + currentPage);
															var pathItem = new Element ('div', {'class': 'path-item'});
															var pathLink = new Element ('a', {'href': wikipediaPath + escape(currentPage), 'text': currentPage});
															pathLink.addEvent('click', function(e) {
																e.stop();
																getWikiPage(pathLink.get('href'));
															});
															pathItem.adopt(pathLink);
															pathItem.inject(pathItems, 'top');
															linkCounter = linkCounter + 1;
															$(linkCount).set('text', linkCounter);
															if (currentPage == endPage) {
																show($('win-frame'));
																//console.log('win');
															}
															else {
																hide($('win-frame'));
																//console.log(currentPage);
																//console.log(endPage);
															}
													  }
    											});
												redefineLinkEvent.delay(100, {isGoal : 0});
									 },
									 onFailure: function (responseTree, responseElements, responseHTML, responseJavaScript) {
			  									console.log('Unable to resolve wiki page.');
									 }
								   });
	request.send();
}

var calculateTime = function() {
	if (gameStarted) {
		this.time = this.time + 1;
		var minutes = Math.floor(this.time / 60);
		var seconds = this.time % 60;
		var timer = "";
		if (this.time < 60) {
			timer = "<h1>" + this.time + "</h1><p> s</p>";
		}
		else {
			timer = "<h1>" + minutes + "</h1><p> m </p><h1>" + seconds + "</h1><p> s</p>";
		}
		timerText.set('html',timer);
	}
	else {
		timerText.set('html', '<p>Waiting...</p>');
	}
	calculateTime.delay(1000, {time : this.time});
};

var redefineLinkEvent = function() {
  	var isGoal = this.isGoal;
	var container;
  	if (isGoal) {
		container = $('goal');
	}
	else {
		container = $('content');
	}
	//allAnchors = $(document.body).getElements('a');
	allAnchors = container.getElements('a');
	allAnchors.each(function(element) {
		element.addEvent('click', function(e) {
			e.stop();
			if (!element.get('href').contains('#')) {
				if (!isGoal) {
					//console.log('node');
					getWikiPage(element.get('href'));	
				}
				else {
					//console.log('goal');
				}
			}
			else {
				var scrollToID = element.get('href');
				scrollToID = scrollToID.replace("#", "");
				var scrollCoordinates = $(scrollToID).getCoordinates();
				
				if (isGoal) {
					container.scrollTo(0, scrollCoordinates.top - 200);
					container.getElementById('content-goal').highlight('#FFD33E', '#FFFFFF');
				}
				else {
					$(window).scrollTo(0, scrollCoordinates.top);
					container.highlight('#FFD33E', '#FFFFFF');
				}
			}
		});
	});
};

var getRandomEndPage = function() {
	var randomURL = "http://zh.wikipedia.org/wiki/Special:Random";
	var request = new Request.HTML({
								   	 url:randomURL,
									 onRequest: function () { 
										$('goal').scrollTo(0,0);
									 },
									 onSuccess: function (responseTree, responseElements, responseHTML, responseJavaScript) {
												responseElements.each(function(element) {
													  if(element.get('id') == 'content') {
													  	//element.set('styles', {'margin':'0px', 'padding':'0px 5px 0px 5px', 'background':'#FFFFFF'});
														$('goal').set('text', "");
														$('goal').set('html', "");
														element.set('id', 'content-goal');
														$('goal').adopt(element);
														$('goal').setStyle('visibility', 'visible');
														
														toggleGoalPosition();
													  }
													  else if (element.get('id') == 'firstHeading') {
													  	endPage = element.get('text');
														element.adopt(goalToggle);
														element.adopt(goalMaximize);
													  }
													  
    											}); 
												redefineLinkEvent.delay(0, {isGoal : 1});
									 },
									 onFailure: function (responseTree, responseElements, responseHTML, responseJavaScript) {
			  									console.log('Unable to resolve end page.');
									 }
								   });
	request.send();
};
