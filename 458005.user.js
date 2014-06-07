// ==UserScript==
// @name           FreeRice Multiplication Auto-Bot w/ Timer Disabler
// @author         Kanaanci
// @description    Bot for auto-solving multiplication problems on FreeRice.com, with a timer disabler to speed things up (no 2 second delay). You can change the problems to multiplication problems by clicking on "Change Subjects" and selecting "Multiplication Table". The script will not run until you have selected multiplication. 
// @include        http://www.freerice.com/index.php
// @include    	   http://freerice.com/index.php
// @include        http://freerice.com/#/multiplication-table/17507
// ==/UserScript==

function rice() {
	var subject = document.getElementsByName('SUBJECT')[0].value;
	if (subject!="Multiplication Table") {
		return;
	}
	
	document.getElementsByName('INFO2')[0].value = '';
	
	var questionsanswers = document.getElementsByName('INFO3')[0].value;
	var questionsanswers2 = questionsanswers.split('|');
	
	var question1 = questionsanswers2[0];
	var question2 = question1.split(' ');
	var questiona = question2[0];
	var questionb = question2[2];
	var answer = questiona * questionb;
	
	var i = 1;
	while(i < 5) {
		if(questionsanswers2[i] == answer) break;
		i++;
	}
	
	if (i < 5) {
		window.location = "javascript:submitForm('" + i + "')";
	}
	else {
		window.location = "javascript:submitForm('1')";
	}
}

rice();