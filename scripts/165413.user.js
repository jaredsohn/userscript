// ==UserScript==
// @name        NCSS Challenge Spacer
// @namespace   http://userscripts.org/users/514238
// @include     http://challenge.it.usyd.edu.au/*
// @version     1
// @grant       unsafeWindow
// ==/UserScript==

const WIDTH = 1320;
const LEFT = 40;
const TOP = 40;
const TRANSITION = 'opacity 0.25s linear 0s';
const CODE_HEIGHT = 200;
const TEXT_FONT = 'Ubuntu';
const CODE_FONT = 'Ubuntu Mono';

setTimeout(zzz, 2000);

function zzz() {
	var app = document.getElementById('app');
	var header = document.getElementById('header');
	var series_logo = document.getElementById('series_logo');
	var sidebar = document.getElementById('sidebar');
	var sidebar_tabs = document.getElementById('sidebar_tabs');
	var content = document.getElementById('content');
	
	var home_page = document.getElementById('home_page');
	
	var question_code = document.getElementById('question_code');
	
	var questions_container = document.getElementById('questions_container');
	var question_container = document.getElementById('question_container');
	var question_solution_container = document.getElementById('question_solution_container');
	var documents_container = document.getElementById('documents_container');
	var document_container = document.getElementById('document_container');
	var document_section_container = document.getElementById('document_section_container');
	
	document.body.style.fontFamily = TEXT_FONT;
	
	app.style.position = 'static';
	app.style.width = '100%';
	app.style.height = '100%';
	app.style.margin = '0';
	header.style.background = '#333333';
	series_logo.style.left = '20px';
	
	sidebar.style.position = 'fixed';
	sidebar.style.top = '93px';
	sidebar.style.left = '0px';
	sidebar.style.background = '#E6E6E6';
	
	sidebar_tabs.style.left = '0px';
	
	content.style.position = 'fixed';
	content.style.top = '0px';
	content.style.left = '217px';

	var elements = document.getElementsByClassName('tab');
	for(var i = 0, length = elements.length; i < length; i++) {
		elements[i].style.width = WIDTH + 'px';
	}

	var elements = document.getElementsByClassName('container container1');
	for(var i = 0, length = elements.length; i < length; i++) {
		elements[i].style.width = WIDTH + 'px';
	}

	home_page.style.width = WIDTH + 'px';
	
	questions_container.style.width = WIDTH + 'px';
	questions_container.style.transition = TRANSITION;
	
	question_container.style.width = WIDTH + 'px';
	question_container.style.left = (WIDTH + LEFT * 2) + 'px';
	question_container.style.transition = TRANSITION;
	
	question_solution_container.style.width = WIDTH + 'px';
	question_solution_container.style.left = ((WIDTH + LEFT * 2) * 2) + 'px';
	question_solution_container.style.transition = TRANSITION;
	
	documents_container.style.width = WIDTH + 'px';
	documents_container.style.transition = TRANSITION;
	
	document_container.style.width = WIDTH + 'px';
	document_container.style.left = (WIDTH + LEFT * 2) + 'px';
	document_container.style.transition = TRANSITION;
	
	document_section_container.style.width = WIDTH + 'px';
	document_section_container.style.left = ((WIDTH + LEFT * 2) * 2) + 'px';
	document_section_container.style.transition = TRANSITION;
	
	question_code.style.width = (WIDTH - 50) + 'px';
	question_code.style.height = CODE_HEIGHT.toString();
	question_code.style.fontFamily = CODE_FONT;
	
	// Make all hidden pages 0 opacity so they fade in when opacity is changed	
	question_container.style.opacity = '0';
	question_solution_container.style.opacity = '0';
	document_container.style.opacity = '0';
	document_section_container.style.opacity = '0';

	unsafeWindow.slideAndShowQuestionSets = function(s) {
		question_solution_container.style.opacity = '0';
		question_solution_container.style.left = ((WIDTH + LEFT * 2) * 2) + 'px';

		question_container.style.opacity = '0';
		question_container.style.left = (WIDTH + LEFT * 2) + 'px';

		questions_container.style.left = LEFT + 'px';
		questions_container.style.opacity = '1';
	}
	
	unsafeWindow.slideAndShowQuestion = function(s) {
		questions_container.style.opacity = '0';
		questions_container.style.left = ((WIDTH + LEFT) * -1) + 'px';
		
		question_container.style.left = LEFT + 'px';
		question_container.style.opacity = '1';
		
		question_solution_container.style.opacity = '0';
		question_solution_container.style.left = (WIDTH + LEFT * 2) + 'px';	
	}
	
	unsafeWindow.slideAndShowQuestionSolution = function(s) {
		questions_container.style.opacity = '0';
		questions_container.style.left = ((WIDTH + LEFT) * -2) + 'px';

		question_container.style.opacity = '0';
		question_container.style.left = ((WIDTH + LEFT) * -1) + 'px';
		
		question_solution_container.style.left = LEFT + 'px';
		question_solution_container.style.opacity = '1';
	}

	unsafeWindow.slideAndShowDocuments = function() {
		document_container.style.opacity = '0';
		document_container.style.left = (WIDTH + LEFT * 2) + 'px';
		
		documents_container.style.left = LEFT + 'px';
		documents_container.style.opacity = '1';
		
	}
	unsafeWindow.slideAndShowDocument = function() {
		documents_container.style.opacity = '0';
		documents_container.style.left = ((WIDTH + LEFT) * -1) + 'px';
		
		document_section_container.style.opacity = '0';
		document_section_container.style.left = (WIDTH + LEFT * 2) + 'px';
		
		document_container.style.left = LEFT + 'px';
		document_container.style.opacity = '1';		
	}
	unsafeWindow.slideAndShowDocumentSection = function() {
		document_container.style.opacity = '0';
		document_container.style.left = ((WIDTH + LEFT) * -1) + 'px';
		
		document_section_container.style.left = LEFT + 'px';
		document_section_container.style.opacity = '1';
	}
}