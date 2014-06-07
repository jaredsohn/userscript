// ==UserScript==
// @name          Message History Manager (Mod mod)
// @namespace     http://diveintogreasemonkey.org/download/
// @description   Fixes and improvements for LL's message history pages. Fix for negative boardIDs by shaldengeki.
// @include       http://boards.endoftheinter.net/history.php*
// @include       https://boards.endoftheinter.net/history.php*
// @exclude       http://boards.endoftheinter.net/history.php*q=*
// @exclude       https://boards.endoftheinter.net/history.php*q=*
// ==/UserScript==

function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if (node === null)
		node = document;
	if (tag === null)
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (var i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

function gup(name) {
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(document.location.href);
  if (results == null) {
    return "";
  } else {
    return results[1];
  }
}

var totalPages = getElementsByClass("infobar", document, "div")[0].getElementsByTagName("span")[0].innerHTML;

if (document.location.href.indexOf("https") == -1) {
	var url = "http";
} else {
	var url = "https";
}

function coolCursor() {
	this.style.cursor = "pointer";	
}

var historyTable = getElementsByClass('grid', document, 'table')[0];

var fakeSpan = document.createElement("span");
fakeSpan.id = "fakeSpan";
if (gup("page")) {
	var nextpage = parseInt(gup("page"), 10) + 1;
} else {
	var nextpage = 2;
}
fakeSpan.className = nextpage;
document.body.appendChild(fakeSpan);

if (typeof GM_setValue == 'function') {
	function deleteRow() {
		GM_setValue('mhistory_' + this.id, 1);
		var tableRow = this.parentNode.parentNode;
		tableRow.parentNode.removeChild(tableRow);
	}
}

//Processes formatting of the current table
function addFormatting(element) {
	var historyTable = getElementsByClass('grid', element, 'table')[0];

	var rows = historyTable.getElementsByTagName("tr");
	for (var i = 1; i < rows.length; i++) {
		var row = rows[i];
		var cells = row.getElementsByTagName("td");
		var alllinks = cells[1].getElementsByTagName("a")
		for (var j = 0; j < alllinks.length; j++) {
			if (alllinks[j].href.indexOf('topic=') != -1) {
				var topiclink = alllinks[j];
			}	
		}
		var topicid = topiclink.href.match(/topic=[0-9]+/i).toString().replace(/topic=/i, "");
		
		//Checks if link is removed or not
		if (typeof GM_getValue == 'function') {
			while (GM_getValue("mhistory_" + topicid) == 1) {
				row.parentNode.removeChild(row);
				var row = rows[i];
				if (i > (rows.length - 1)) {
					var nomore = true;
					break;
				} else {
					cells = row.getElementsByTagName("td");
					var alllinks = cells[1].getElementsByTagName("a")
					for (var j = 0; j < alllinks.length; j++) {
						if (alllinks[j].href.indexOf('topic=') != -1) {
							var topiclink = alllinks[j];
						}	
					}
					topicid = topiclink.href.match(/topic=[0-9]+/i).toString().replace(/topic=/i, "");
				}
			}
		}
		
		if (nomore) {
			break;	
		}
		
		//Adds links to boards
		var boardid = topiclink.href.match(/board=-?[0-9]+/i)[0].replace(/board=/i, "");
		cells[0].innerHTML = "<a href='" + url + "://boards.endoftheinter.net/showtopics.php?board=" + boardid + "'>" + cells[0].innerHTML + "</a>";
		
		//Styles link if new posts
		if (cells[2].innerHTML.indexOf('(') != -1) {
			topiclink.style.fontWeight = "bold";
		}
		
		//Adds option to remove link
		if (typeof GM_getValue == 'function') {
			var removeLink = document.createElement("a");
			removeLink.addEventListener('click', deleteRow, true);
			removeLink.addEventListener('mouseover', coolCursor, true);
			removeLink.style.color = "red";
			removeLink.setAttribute("title", "Remove this link from your message history");
			removeLink.appendChild(document.createTextNode("X"));
			removeLink.id = topicid;
			cells[4].innerHTML += " ";
			cells[4].insertBefore(removeLink, null);
		}
	}
}

//Processes the new page as a new DOM document, applies the formatting, then inserts it row by row.
function processPage(XML) {
	var newPage = document.createElement("div");
	newPage.innerHTML = XML;
	var newRows = newPage.getElementsByTagName("tr");
	addFormatting(newPage);
	var newTr = document.getElementById('newTr');
	for (var j = 1; j < newRows.length; j++) {
		historyTable.tBodies[0].insertBefore(newRows[j], newTr);
	}
}

//Creates the cool loading GIF, uses Ajax to load up the next page.
function loadNextPage() {
	document.removeEventListener('scroll', scrollCheck, true);
	if (document.getElementById('smallTr')) {
		historyTable.tBodies[0].removeChild(document.getElementById('smallTr'));	
	}
	var newTr = document.createElement("tr");
	newTr.id = "newTr";
	newTr.className = "r0";
	historyTable.tBodies[0].insertBefore(newTr, null);

	var newTd = document.createElement("td");
	newTd.setAttribute("colspan", "5");
	newTd.style.textAlign = "center";
	newTd.style.padding = "5px 0";
	newTd.style.fontSize = "11px";
	newTr.appendChild(newTd);
	
	var loadingSpan = document.createElement("span");
	loadingSpan.innerHTML = "Loading next page ";
	
	var loadingImg = new Image();
	loadingImg.src = 'data:image/gif;base64,' +
		'R0lGODlhEAAQAPIAAP///2Zm/9ra/o2N/mZm/6Cg/rOz/r29/iH/C05FVFNDQVBFMi4wAwEAAAAh/hpD' +
		'cmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZ' +
		'nAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi6' +
		'3P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAs' +
		'AAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKp' +
		'ZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8D' +
		'YlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJU' +
		'lIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe8' +
		'2p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAAD' +
		'Mgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAA' +
		'LAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsR' +
		'kAAAOwAAAAAAAAAAAA==';
	newTd.appendChild(loadingSpan);
	newTd.appendChild(loadingImg);
	
	var nextpage = parseInt(document.getElementById('fakeSpan').className, 10);
	var ajax = new XMLHttpRequest();
	ajax.open('GET', url + '://boards.endoftheinter.net/history.php?page=' + nextpage, true);
	ajax.send(null);
	ajax.onreadystatechange = function() {
		if (ajax.readyState == 4) {
			if (ajax.status == 200) {
				processPage(ajax.responseText);
				newTr.parentNode.removeChild(newTr);
				if (nextpage < totalPages) {
					document.addEventListener('scroll', scrollCheck, true);
					document.getElementById('fakeSpan').className = nextpage + 1;
				}
			} else {
				alert("An error occurred loading the next page. Fuck shit.");
			}
		}
	}	
}

//Checks if scroll is at the bottom of the page
function scrollCheck() {
	if ((window.pageYOffset + window.innerHeight) == document.body.clientHeight) {
		loadNextPage();
	}
}

//Runs functions on the current document.
addFormatting(document);

//Checks if there are more pages, then checks if this page CAN be scrolled. Adds link if not, adds eventlistener if can.
if (nextpage <= totalPages) {
	if (window.pageYOffset == 0 && window.innerHeight >= document.body.clientHeight) {
		var smallTr = document.createElement('tr');
		smallTr.id = 'smallTr';
		var smallTd = document.createElement('td');
		smallTd.setAttribute('colspan', '5');
		smallTd.style.fontSize = "11px";
		smallTd.style.padding = "5px 0";
		smallTd.style.textAlign = "center";
		var smallLink = document.createElement('a');
		smallLink.appendChild(document.createTextNode("Load more..."));
		smallLink.addEventListener('click', loadNextPage, true);
		smallLink.addEventListener('mouseover', coolCursor, true);
		historyTable.tBodies[0].insertBefore(smallTr, null);
		smallTr.insertBefore(smallTd, null);
		smallTd.insertBefore(smallLink, null);
	} else {
		document.addEventListener('scroll', scrollCheck, true);
	}
}