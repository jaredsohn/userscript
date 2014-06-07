// ==UserScript==
// @name           FunkySouls paginator enhancement
// @namespace      ConstNT
// @description    Adds two buttons back and forward to enchance navigation through pages
// @include        http://funkysouls.com/*
// @include        http://*.funkysouls.com/*
// ==/UserScript==

var pages = document.getElementsByClassName('span');
var container = document.getElementsByClassName('td77')[0];
var prev = "data:image/png;base64,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";
var next = "data:image/png;base64,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";
var location_next = null;
var location_prev = null;

var cel = -1;

var posts = document.evaluate("//div[@class='txt']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
if (posts) {
	document.addEventListener('keyup', function (event) {fsNavigate(event.keyCode)}, false);
}

function fsNavigate (kc) {
	if (kc==221) { // next
		if (++cel >= posts.snapshotLength) {
			window.location.href = location_next;
		} else {
			posts.snapshotItem(cel).scrollIntoView();
		}
	}
	if (kc==219) { // prev
		if (--cel < 0) {
			window.location.href = location_prev;
		} else {
			posts.snapshotItem(cel).scrollIntoView();
		}
	}
}

if (container && pages) {
	for (var i=0; i<pages.length-1; i++) {
		if ((parseInt(pages[i+1].innerHTML)-parseInt(pages[i].innerHTML))>1) {
			try {
				var table = document.createElement('table');
				table.style.width = '100%';
				var row = document.createElement('tr');
				
				var cell = document.createElement('td');
				var img = new Image();
				img.src = prev;
				img.style.cursor = 'pointer';
				img.title = 'Page No. ' + parseInt(pages[i].innerHTML);
				location_prev = "http://funkysouls.com/"+parseInt(pages[i].innerHTML)+"index.html";
				img.addEventListener('click', function () {window.location.href = location_prev;},false);
				cell.appendChild(img);
				row.appendChild(cell);
				
				cell = document.createElement('td');
				cell.innerHTML = "&#173;";
				cell.style.width = '100%';
				row.appendChild(cell);
				
				cell = document.createElement('td');
				img = new Image();
				img.src = next;
				img.style.cursor = 'pointer';
				img.title = 'Page No. ' + parseInt(pages[i+1].innerHTML);
				location_next = "http://funkysouls.com/"+parseInt(pages[i+1].innerHTML)+"index.html";
				img.addEventListener('click', function () {window.location.href = location_next;},false);
				cell.appendChild(img);
				row.appendChild(cell);
				
				table.appendChild(row);
				
				table = container.insertBefore(table, container.firstChild);
			} catch (e) {
//				alert(e);
			}
		}
	}
}

