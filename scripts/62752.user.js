// ==UserScript==
// @name           Poneyvallee gene remover
// @namespace      p0n3yh4x scripts
// @description    Adds a button to remove all genes at once
// @include        http://*.poneyvallee.com/index.php?p=poney&id=*
// ==/UserScript==

var openRequests = 0;
var m = document.URL.match(/id=(\d+)/);
var theInput;
var theSelect;
var url = document.URL.match(/([^?]+)?/)[1];
var poney_id;
var removeButton;
if (m != null) 
	poney_id = m[1];

function do_req(url,data) {
	try {
		xhr = new XMLHttpRequest();
	} catch (error) {
		try {
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (error) {
			try {
				xhr = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (error) {
				xhr = false;
				return false;
			}
		}
	} 
	xhr.onreadystatechange = function() { 
		if (xhr.readyState == 4) {
			openRequests--;
			removeButton.value = openRequests + " genes left to remove...";
			if (openRequests <= 0) {
				removeButton.value = "Done!";
				window.location.reload();	
			}

		}
	}
	xhr.open("POST", url, true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.send(data);
}

function remove_genes(pid) {
	openRequests = theSelect.options.length -1;
	removeButton.value = openRequests + " genes left to remove...";
	for (var i = 1; i < theSelect.options.length; i++) {
		var gene = theSelect.options[i].value;
		do_req(url + '?a=retirergene', 'id=' + pid + '&gid=' + gene);
	}	
}
var forms = document.getElementsByTagName('form');
for (var i = 0; i < forms.length; i++) {
	if (forms[i].action.match(/a=retirergene$/)) {
		for (var j = 0; j < forms[i].childNodes.length; j++) {
			if (forms[i].childNodes[j].type == 'submit')
				theInput = forms[i].childNodes[j];
			if (forms[i].childNodes[j].name == 'gid')
				theSelect = forms[i].childNodes[j];
		}
	}
			
}
removeButton = document.createElement('input');
removeButton.type = 'button';
removeButton.value = 'Remove ALL genes';
removeButton.addEventListener('click', function() { if (confirm('Really remove ALL genes?')) { this.removeEventListener('click',arguments.callee, true); remove_genes(poney_id); } }, true);
if (theInput != null) {
	theInput.parentNode.insertBefore(removeButton, theInput.nextSibling.nextSibling);
	var elmLB = document.createElement('br');
	removeButton.parentNode.insertBefore(elmLB, removeButton.nextSibling);
}
