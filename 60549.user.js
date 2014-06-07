// ==UserScript==
// @name           FWZ Dom Enhancer
// @namespace      http://userscripts.org/users/livinskull
// @author         livinskull
// @version        1.00
// @include        http://www.forumwarz.com/domination
// @include        http://*.forumwarz.com/domination
// ==/UserScript==

var greet = document.getElementById('logged_in_status').getElementsByTagName('b')[0];
var ownName = greet.innerHTML.substring(greet.innerHTML.indexOf(', ')+2).toLowerCase();
var domBoard = document.getElementById('scoreboard').getElementsByTagName('table')[0];
var ownKlan = '';

for (i=1; i<domBoard.rows.length; i++) {
	if (domBoard.rows[i].getElementsByTagName('a')[0].innerHTML.replace('-<br>', '').toLowerCase() == ownName) {
		if (!(ownKlan = domBoard.rows[i].getElementsByTagName('a')[1]))
			ownKlan = '';
		else
			ownKlan = ownKlan.innerHTML.replace('<br>', '');
		break;
	}	
}

var newth = document.createElement('th');
newth.innerHTML = 'Moar Info';
newth.setAttribute('colspan', 2);
domBoard.rows[0].insertBefore(newth, domBoard.rows[0].childNodes[2]);

for (i=1; i<domBoard.rows.length; i++) {
	var newCell = document.createElement('td');
	var playername = domBoard.rows[i].getElementsByTagName('a')[0].innerHTML.replace('-<br>', '');
	var playerklan = domBoard.rows[i].getElementsByTagName('a')[1];

	if (typeof playerklan == "undefined")
		playerklan = "";
	else 
		playerklan = playerklan.innerHTML.replace('<br>', '');
		
	GM_log('Player: '+playername+' Klan: '+playerklan);
	newCell.setAttribute('id', 'moar_info_' + playername);
	domBoard.rows[i].insertBefore(newCell, domBoard.rows[i].childNodes[2]);
	
	var newCell2 = newCell.cloneNode(false);
	newCell2.setAttribute('id', 'moar_info1_' + playername);
	domBoard.rows[i].insertBefore(newCell2, domBoard.rows[i].childNodes[3]);
	requestInfo(playername, playerklan);
}


function requestInfo(name, klan) {
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://www.forumwarz.com/profiles/"+name,
		onload: function (resp) {
			var userId = resp.responseText.match(/<span id=\'tubmail\'><a href=\"\/inbox\/send_tubmail\/([0-9]+)\"/i)[1];
			
			var cell = document.getElementById('moar_info_'+name);
			cell.innerHTML = 'Lvl ' + resp.responseText.match(/Level:<\/td>\s*<td>([0-9]+)<\/td>/i)[1] + ' ';
			cell.innerHTML += resp.responseText.match(/Class:<\/td>\s*<td>([a-z- ]+)<\/td>/i)[1] + '<br/>';
			cell.innerHTML += '<a href=\"/inbox/send_tubmail/'+userId+'\"><img src=\"/images/header/mail.gif\" alt=\"TM\" title=\"Send Tubmail\"></a>';
		}
	});
	
	if (klan != "" && klan == ownKlan) {
		// Visits left
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://www.forumwarz.com/klans/visits",
			onload: function (resp) {
				var pattern = name+"<\/a><\/td>\\s*<td>[0-9]+<\/td>\\s*<td>[0-9]+<\/td>\\s*<td>([0-9]+)<\/td>";
				var regex = new RegExp(pattern, 'i');
				if (visitsLeft = regex.exec(resp.responseText)[1]) {
					var cell = document.getElementById('moar_info_'+name);
					cell.innerHTML += ' Visits: '+visitsLeft;
				}
			}
		});
		
		// dominated forums
		/*GM_xmlhttpRequest({
			method: "GET",
			url: "http://www.forumwarz.com/klans/visits",
			onload: function (resp) {
				var pattern = name+"<\/a><\/td>\\s*<td>[0-9]+<\/td>\\s*<td>[0-9]+<\/td>\\s*<td>([0-9]+)<\/td>";
				var regex = new RegExp(pattern, 'i');
				if (visitsLeft = regex.exec(resp.responseText)[1]) {
					var cell = document.getElementById('moar_info_'+name);
					cell.innerHTML += ' Visits: '+visitsLeft;
				}
			}
		});*/
	}
}