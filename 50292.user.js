// ==UserScript== 
// @name           User Blocker
// @description    Ukrywa posty niechcianych uzytkownikow z mozliwoscia odslony postu.
// @include        http://eti.dragoart.info/*
// @include        http://eti2.dragoart.info/*
// @include        http://*.dragoart.info/*
// ==/UserScript==

var blackList = 'wafcio, aidecoe, młody';

function getNextSibling(n) {
	x = n.nextSibling;
	while (x.nodeType != 1) {
		x = x.nextSibling;
	}
	return x;
}

function buildUserPostTable(name) {
	var nameSpans = document.getElementsByClassName('name');
	if (!nameSpans) {
		return;
	}

	var userPosts = new Array();
	var userSize = nameSpans.length;
	for (var i = 0; i < userSize; i++) {
		var links = nameSpans[i].getElementsByTagName('a');
		if (links) {
			if (links[1].innerHTML == name) {
				userPosts[userPosts.length] = nameSpans[i].parentNode.parentNode;
			}
		}
	}
	return userPosts;
}

function countPoints(row, type) {
	if (!row) {
		return;
	}

	var idMatcher = null;
	if (type == 'zal') {
		idMatcher = 'zal_field_';
	} else if (type == 'pomogl') {
		idMatcher = 'thanks_field_';
	}
	
	if (idMatcher == null) {
		return;
	}

	var sum = 0;
	var spans = row.getElementsByTagName('span');
	for (var i = 0; i < spans.length; i++) {
		if (spans[i].id.match(idMatcher) != null) {
			var points = spans[i].getElementsByTagName('a');
			sum = points.length;
			break;
		}
	}
	return sum;
}

function blockUser(name) {
	var userPosts = buildUserPostTable(name);
	if (!userPosts || userPosts.length == 0) {
		return;
	}
	
	var userSize = userPosts.length;
	for (var i = 0; i < userSize; i++) {
		var row = userPosts[i];
		
		if (row) {
			row.style.display = "none";
			row.className = name + i;
		}
			
		var nextRow = getNextSibling(row);
		if (nextRow) {
			nextRow.style.display = "none";
			nextRow.className = name + i;
		}
		
		var newRow = nextRow.parentNode.insertRow(nextRow.rowIndex + 1);
		newRow.className = 'alt' + name + i;
		var cell = newRow.insertCell(0);
		var postManager = document.createElement('a');
		postManager.appendChild(document.createTextNode('Pokaz post ' + name));
		postManager.setAttribute('href', 'javascript:void(0);');
		cell.appendChild(postManager);
		postManager.id = name + i;
		postManager.addEventListener('click', function() {
			showPost(this.id);
		}, true);

		cell = newRow.insertCell(1);
		var negatives = document.createElement('span');
		negatives.appendChild(document.createTextNode('[-] ' + countPoints(nextRow, 'zal')));
		negatives.style.marginRight = 5;
		cell.appendChild(negatives);

		var positives = document.createElement('span');
		positives.appendChild(document.createTextNode('[+] ' + countPoints(nextRow, 'pomogl')));
		cell.appendChild(positives);
	}
}

function showPost(name) {
	var hiddenRows = document.getElementsByClassName(name);
	if (!hiddenRows) {
		return;
	}
	
	var rowsSize = hiddenRows.length;
	for (var i = 0; i < rowsSize; i++) {
		hiddenRows[i].style.display = '';
	}

	var altRows = document.getElementsByClassName('alt' + name);
	while (altRows) {
		altRows[0].parentNode.deleteRow(altRows[0].rowIndex);
		altRows = document.getElementsByClassName('alt' + name);
	}
}

function main() {
	var users = blackList.split(/ *, */);
	for (var i = 0; i < users.length; i++) {
		blockUser(users[i]);
	}
}

main();