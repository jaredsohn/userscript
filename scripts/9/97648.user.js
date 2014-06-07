// ==UserScript==
// @name           test
// @description test
// @version       1
// @include http://stackexchange.com/*
// ==/UserScript==
var idx = 0;
// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJSONP(callback) {
	var accountContainers = document.getElementsByClassName('account-container');
	
	for (idx=0;idx<accountContainers.length;idx++) {
		var accountContainer = accountContainers[idx];


		var baseString = accountContainer.childNodes(1).href.replace('http://','http://api.').replace('.com/','.com/1.1/');
		var unacceptedURL = baseString.substring(0, baseString.lastIndexOf('/')) +'/questions/unaccepted';
		var JSONPName =  accountContainer.childNodes(1).href.replace('http://','');
		JSONPName = JSONPName.substring(0,JSONPName.indexOf('.com')).replace('.','');

		var script = document.createElement("script");
	 	script.setAttribute("src", unacceptedURL + "?jsonp="+JSONPName+"%3D");
	 	script.addEventListener('load', alert('hi');, false);
		document.body.appendChild(script);
	}
}

function main() {
		var accountElement = document.getElementsByClassName('account-container')('id');
		JSONPName = 'stackoverflow';
		var questions = window[JSONPName].questions;
	 	var i = 0;
		for (i=0;i<questions.length;i++) {
		   	var question = questions[i];
		   	var questionElement = document.createElement('a');

		   	var m_names = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
			var d = new Date(question.creation_date * 1000);
		  	var fdate = d.getDate() + " " + m_names[d.getMonth()]  + " " + d.getFullYear();


	   		questionElement.innerHTML =question.answer_count + ' ' + question.title + ' ' + fdate;
   			accountElement.appendChild(questionElement);
   			accountElement.appendChild(document.createElement('br'));
		}
}


// load jQuery and execute the main function
addJSONP(main);
