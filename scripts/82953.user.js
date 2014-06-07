// ==UserScript==
// @name           All Job Options
// @namespace      http://www.erepublik.com/en/newspaper/freedom-post-180922/1
// @include        http://economy.erepublik.com/*/market/job/*
// @description    Allows selection of the hidden "all" options for country and skill
// ==/UserScript==

var job = document.getElementById('skill_pane').getElementsByTagName('li');

all = job[0].getElementsByTagName('a');


all = all[0].href.split("/");
all[8] = "all";
all = all.join();
all = all.replace(/,/g,"/");


var newElement = document.createElement('li');
newElement.innerHTML = '<a href="' + all +'" title=""><span class="skiller"><strong>All</strong></span></a>';  	
job[0].parentNode.insertBefore(newElement, job[0]);



document.addEventListener('DOMNodeInserted', function(event) {

if (event.target.id == 'countryId_msdd'){

var job = document.getElementById('skill_pane').getElementsByTagName('li');

var again = job[1].getElementsByTagName('a');

again = again[0].href.split("/");
again[6] = "all";
again = again.join();
again = again.replace(/,/g,"/");


var element = event.target.getElementsByTagName('a');

var newElement = document.createElement('div');
newElement.innerHTML = '<a href="' + again +'" title=""><img  src="http://www.erepublik.com/images/flags/S/Erepublik.gif" align="left"> All</a>';  	
element[0].parentNode.insertBefore(newElement, element[0]);

element[1].innerHTML = "<hr />";

}

}, false);

