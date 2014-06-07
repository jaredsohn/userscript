// ==UserScript==
// @name Simple user ignore script for IPB 1.3.x 
// @version v0.42ß
// @author Lulu
// @include http://forum.hwsw.hu/*
// @execlude *
// ==/UserScript==

/*
	Copyright (C) 2009 by Lulu

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program. If not, see <http://www.gnu.org/licenses/>.
*/

var users = [];
var cookieName = "ipbUserHide";
for (var i = 0; i < document.cookie.split('; ').length; i++) {
var oneCookie = document.cookie.split('; ')[i].split('=');
	if (oneCookie[0] == cookieName) {
		users = oneCookie[1].split(', ');
		break;
	}
}

if (window.location.href.indexOf("showuser") > 0) {
	var addRemoveUser = function(event) {
		for(j = 0; j < document.cookie.split('; ').length; j++ ) {
			var oneCookie = document.cookie.split('; ')[j].split('=');
			if (oneCookie[0] == cookieName) {
				users = oneCookie[1].split(', ');
				break;
			}
		}
	var user = escape(event.target.parentNode.textContent);
	notFound = true;
	for (var j = 0; j < users.length; j++) {
		if (users[j] == user) {
			users.splice(j, 1);
			notFound = false;
		}
	}
	if (notFound)
		users.push(user);
	if (users.length > 0) {
		var date = new Date();
		var days = 3650;
		date.setTime(date.getTime() + (days*24*60*60*1000));
		var expires = '; expires=' + date.toGMTString();
		var value = users.join(', ');
		document.cookie = cookieName + '=' + value + expires + '; path=/';
	} else {
		document.cookie = cookieName + '=;expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/';
		}
	window.alert(unescape(user) + (notFound ? ' hozzáadva a tiltó listához' : ' eltávolítva a tiltó listáról')
		+ '\n\n'
		+ '(ez az oldal automatikusan frissül)\n');
	event.preventDefault();
	window.location.reload();
	};

	if ((unescape(oneCookie[1])).indexOf(document.getElementById("profilename").textContent)!=-1) {
		var toggler = document.createElement('img');
		toggler.setAttribute('title', "Ide kattintva engedélyezheted a tagot...");
		toggler.setAttribute('style', 'padding-left: 10px; padding-top: 5px');
		toggler.setAttribute('src', "data:image/gif;base64,"+
		"R0lGODlhLAANAMQAALO8qePj4/Hx8bvEstvb29HR0cPEwlVtkaKtnMvMzf///+7v78vUwitEbEBX" +
		"fEpihmd7mTpRdVFojEZdgTZQefX19U5okUJchdfX1+fn5/j4+Pv7++Xl5eDg4P39/VpvkSH5BAAA" +
		"AAAALAAAAAAsAA0AAAX/4CeOZGmeaDowzNqykOctMj3X+K3bvCwyn4lI+EF8NpkNUplcOptQpnSz" +
		"+E0OBwd2MjgENJpvGCwuk8/jdGAj6n4SH4kW4KhUOpUPXv+590d4eX0dg4MVGj8SEwoLEBISCBIC" +
		"HQICFpSXFhaWCZedlpObmpyVGW0RBwoKeREADwQLCwQXBLO2F7S4FwsJtLeztLICIq4SChgfFA8I" +
		"FBkZGBkUBtEGFBgY1tbY0RTd1dfaGVUfAxMUCBMNEw7oGQXOBQ0NBRgN0/byDc8N1/z2Gf8yECLX" +
		"wMGFgg4aIHBQIECAhgEMNCwwsaFEig8rVnxoqoiDhB8LImjQoUOCkidNJ6JcqbJlypcdOgIAgGBm" +
		"TZoQOGDgoJPnzp5Afwr1SVRniqNIk44IAQA7");
		toggler.addEventListener('click', addRemoveUser, true);
		document.getElementById("profilename").appendChild(toggler);
	} else {
		var toggler = document.createElement('img');
		toggler.setAttribute('title', "Ide kattintva letilthatod a tagot...");
		toggler.setAttribute('style', 'padding-left: 10px; padding-top: 5px');
		toggler.setAttribute('src', "data:image/gif;base64,"+
		"R0lGODlhIgANAMQAANHR0bW/rPHx8dvb26WvoVVtkTdQd0Rcg8LCwsrLzMvUw+7v70BXfCxEa///" +
		"/0pihmd7mU9oj7/Itqy3opqmj97e3tfX1/X19ePj4+fn5/v7+/j4+ODg4OXl5f39/VpvkSH5BAAA" +
		"AAAALAAAAAAiAA0AAAXy4CeOZGmep6QoKrtCnrfEs0zfti0q3yH6n8lHk9EQjcWjMpncHQqFZzRQ" +
		"wGw2Vuw1y91eMyLqJ/GJMAoBxuXCuYzY7s9a7l5zNiJJ5OBYQCIRFBECFQICERUVg4iKioiMAnES" +
		"BgUODm4GEw8DCwsDB6CeB5yjBwmgCZ0YIpoRDhYfBg8TBhkZFhkGCBYGvAa/vLi9twt5BwYEBw2g" +
		"FAcZALYN0gAWDbvWDRYA2dDFHwENDAzh4wQMABgY6AAI6+4YCOnxGAMi5uPi4RQNHBwJ/f/8ARwo" +
		"0B+YbwEIBEi4kACEDhY6QJQYcaLFihVRaNyIIgQAOw==");
		toggler.addEventListener('click', addRemoveUser, true);
		document.getElementById("profilename").appendChild(toggler);
	}
}

if (window.location.href.indexOf("showtopic") > 0) {

quote = document.evaluate(
	'//table[@width=\"95%\"]/tbody',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

	var toggleQuote = function(event) {
		var displayStateQ = event.target.getAttribute('displaystateQ');
		if (displayStateQ == 'none')
			displayStateQ = '';
		else
			displayStateQ = 'none';
		event.target.setAttribute('displaystateQ', displayStateQ);
		containingRowQ = event.target.previousSibling;
		var innerTags = containingRowQ.getElementsByTagName('*');
		for (var x = 0; x < innerTags.length; x++) {
			var tagClass = innerTags[x].getAttribute('class');
				innerTags[x].style.display = displayStateQ;
		containingRowQ.style.display = displayStateQ;
		}
		event.preventDefault();
	};

for (var i = 0; i < quote.snapshotLength; i++) {
	for (var j in users) {
		if (quote.snapshotItem(i).textContent.indexOf(unescape(users[j]))!=-1) {
			var spanQ = document.createElement('span');
			spanQ.appendChild(document.createTextNode('[be/ki]'));
			spanQ.setAttribute('displaystateQ', 'none');
			spanQ.setAttribute('style', 'color: #FF0101; font-size: 80%');
			spanQ.addEventListener('click', toggleQuote, true);
			quote.snapshotItem(i).style.display = 'none';
			quote.snapshotItem(i).parentNode.appendChild(spanQ);
		}
	}
}

post = document.evaluate(
	'//table',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

	var togglePost = function(event) {
		var displayState = event.target.getAttribute('displaystate');
		if (displayState == 'none')
			displayState = '';
		else
			displayState = 'none';
		event.target.setAttribute('displaystate', displayState);
			if (window.opera) {
				containingRow = event.target.parentNode.parentNode.nextSibling;
			}
			else {
				containingRow = event.target.parentNode.parentNode.nextSibling.nextSibling;
			}
		var innerTags = containingRow.getElementsByTagName('*');
		for (var x = 0; x < innerTags.length; x++) {
			var tagClass = innerTags[x].getAttribute('class');
				innerTags[x].style.display = displayState;
		containingRow.style.display = displayState;
		}
		event.preventDefault();
	};

for (var i = 0; i < post.snapshotLength; i++) {
	for (var j in users) {
		if (post.snapshotItem(i).rows[0].cells[0].textContent == unescape(users[j])) {
			var span = document.createElement('span');
			span.appendChild(document.createTextNode('[be/ki]'));
			span.setAttribute('displaystate', 'none');
			span.setAttribute('style', 'color: #FF0101; font-size: 80%');
			span.addEventListener('click', togglePost, true);
			post.snapshotItem(i).rows[0].cells[0].innerHTML = "<table width=\"150\">" + post.snapshotItem(i).rows[0].cells[0].innerHTML + "</table>";
			post.snapshotItem(i).rows[1].style.display = 'none';
			post.snapshotItem(i).rows[0].cells[0].appendChild(span);
		}
	}
}
}

if (window.location.href.indexOf("showforum") > 0) {
topic = document.evaluate(
	'//td[7]',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

for (var i = 0; i < topic.snapshotLength; i++) {
	for (var j in users) {
		if (topic.snapshotItem(i).textContent.indexOf(unescape(users[j]))!=-1) {
			topic.snapshotItem(i).style.opacity="0.25";
		}
	}
}
}

if (window.location.href.indexOf("getactive") > 0) {
topic = document.evaluate(
	'//td[8]',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

for (var i = 0; i < topic.snapshotLength; i++) {
	for (var j in users) {
		if (topic.snapshotItem(i).textContent.indexOf(unescape(users[j]))!=-1) {
			topic.snapshotItem(i).style.opacity="0.25";
		}
	}
}
}