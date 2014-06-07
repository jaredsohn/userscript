// ==UserScript==
// @name           chud
// @namespace      http://userscripts.org/users/72447
// @author         haliphax (http://userscripts.org/users/72447)
// @contributor    jimflexx (http://userscripts.org/users/117383)
// @description    Caddy Healer for Urban Dead
// @include        http://urbandead.com/map.cgi*
// @include        http://www.urbandead.com/map.cgi*
// ==/UserScript==


// sort players array based on hp (players[i][2])
function sortPlayers(a, b)
{
	return (a[2] - b[2]);
}

// display chud panel with player list
function chudList(players)
{

	var bgcolor= "Silver";
	var fak=false;
	for (var i=0; i< document.forms.length; i++) {
		if (document.forms[i].action == "http://www.urbandead.com/map.cgi?use-h") {
			fak=true;
		}
	}
	if (fak) { bgcolor = "pink"; }
		
	var divHtml = '<div id="chud" style="background-color:'+bgcolor+';color:Red;'
		+ 'border-width:2px;border-style:solid;border-color:red;padding:4px;">'

	for(var i = 0; i < players.length; i++) {
		divHtml += '<form name="chudf_' + players[i][0] + '" '
			+ 'action="map.cgi?use-h" method="post"><span style="color:Red;'
			+ 'text-decoration:underline;cursor:pointer;"';
		if(players[i][3] != null) divHtml += ' class="' + players[i][3] + '"';
		divHtml += '" onclick="chudf_' + players[i][0] + '.submit()" '
			+ 'title="Heal">' + players[i][1] + '</span>: ' + players[i][2]
			+ 'HP&nbsp;<input type="hidden" name="target" value="'
			+ players[i][0] + '" /></form><br />';
	}

	divHtml += '</div>'

	document.body.innerHTML = document.body.innerHTML.replace(/class="y">Donate<\/a>/i,
		'class="y">Donate</a><br />' + divHtml);
}

// main script body
var pnRegex = /<a.*?href="profile.cgi\?id=(\d+)"(?:\sclass="(.*?)")?>(.*?)<\/a>.*?\((\d+)/gi;
var matches = null;

var players = new Array();
var i = 0;
matches = pnRegex.exec(document.body.innerHTML);

while(matches != null) {
	if (matches[0].indexOf("class=\"trg\"")!=-1) {	
		players[i] = new Array();
		players[i][0] = matches[1];	// profile id
		players[i][1] = matches[3]; // name
		players[i][2] = matches[4]; // hit points
		players[i][3] = matches[2]; // href class (color)
		i++;
	}
	matches = pnRegex.exec(document.body.innerHTML);
}

if(players.length > 0) {
	players.sort(sortPlayers);
	chudList(players);
}
