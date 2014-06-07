// ==UserScript==
// @name           TODOIST - Today
// @namespace      http://www.tuwe.se/todoisttoday
// @description    Sets "tod" as default date on "Add"-button clicks
// @include        http://todoist.com/*
// @include        http://www.todoist.com/*
// ==/UserScript==
document.getElementById('pe_items_controller').addEventListener("click", delay, true);

function delay(){
	window.setTimeout(today,500);	
}
function today(){
	var input = document.getElementsByName('due_date');
	for(var key in input){
		input[key].value = 'tod';
	}
}
