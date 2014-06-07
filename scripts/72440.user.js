// ==UserScript==
// @name           Jira Canned Responses
// @namespace      bluej.freeshell.org
// @include        http://jira.remedymd.com/browse/*
// ==/UserScript==

if (!localStorage.getItem('responses')) {
	localStorage.setItem('responses', '(new),more information');
	localStorage.setItem('response:more information', 'Please include the standard ticket information:'
		+'\n\n-environment\n-recreation steps\n-URL\n-phys_id'
		+'\n-patient (if relevant)\n-current behavior\n-desired behavior'
		+'\n\nand we will investigate');
}

var commentFieldCell = document.getElementById('commentFieldArea').lastChild.previousSibling;
var p = document.createElement('p');
commentFieldCell.insertBefore(p, commentFieldCell.firstChild);

var refreshDropdown = function() {
	var responses = localStorage.getItem('responses').split(',');
	select.length = 0;
	for (var i = 0; i < responses.length; i++) {
		select.add(new Option(responses[i], responses[i]), null);
	}
}

var handleDropdown = function() {
	var response = this.value;
	if (response == '(new)') {return;}
	document.getElementById('comment').value = localStorage.getItem('response:'+response);
}

var select = document.createElement('select');
p.appendChild(select);
select.addEventListener('change', handleDropdown, true);
select.addEventListener('keypress', handleDropdown, true);
refreshDropdown();

var save = document.createElement('button');
save.innerHTML = 'Save';
p.appendChild(save);
save.addEventListener('click', function(e) {
	e.preventDefault();
	var response = select.value;
	if (response == '(new)') {
		response = prompt('New response name');
		if (!response) {return;}
		localStorage.setItem('responses', localStorage.getItem('responses')+','+response);
		refreshDropdown();
		select.selectedIndex = select.length - 1;
	}
	localStorage.setItem('response:'+response, document.getElementById('comment').value);
}, true);

var del = document.createElement('button');
del.innerHTML = 'Delete';
p.appendChild(del);
del.addEventListener('click', function(e) {
	e.preventDefault();
	var response = select.value;
	if (response == '(new)') {return;}
	if (!confirm('Delete '+response+'?')) {return;}
	localStorage.setItem('responses', localStorage.getItem('responses').replace(','+response, ''));
	refreshDropdown();
}, true);