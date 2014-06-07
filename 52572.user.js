// ==UserScript==
// @name           In-Game Radio KoL Player
// @namespace      http://pseudochron.com
// @description    Inserts a Flash app into the menu pane that streams Radio KoL
// @include        http://*.kingdomofloathing.com/compactmenu.php*
// @include        http://*.kingdomofloathing.com/topmenu.php*
// @include        http://*.kingdomofloathing.com/maint.php*
// @include        http://*.kingdomofloathing.com/login.php*
// @include        http://127.0.0.1:680*/compactmenu.php*
// @include        http://127.0.0.1:680*/topmenu.php*
// @include        http://127.0.0.1:680*/maint.php*
// @include        http://127.0.0.1:680*/login.php*
// ==/UserScript==


URL = "http://209.9.238.5:8794/"

function createplayer(auto) {
	var embed = '<embed id="mpl" name="mpl" ';
	embed += 'src="http://pseudochron.com/kol/player.swf" ';
	embed += 'width="84" ';
	embed += 'height="14" ';
	embed += 'bgcolor="#ffffff" ';
	embed += 'allowscriptaccess="always" ';
	embed += 'flashvars="file=' + URL + ';stream.nsv&type=sound&skin=http://pseudochron.com/kol/kol.swf';
	if (auto) { embed += '&autostart=true'; }
	embed += '" ';
	embed += '/>';
	
	document.getElementById("player").innerHTML = embed;
}


window.update = function() {
	
	var d = new Date();
	var t = d.getTime();
	GM_setValue( "lastUpdate",t.toString() );
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: URL,
		headers: { 
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'text/html,application/atom+xml,application/xml,text/xml',
			'Cache-Control': 'no-cache',
		},
		onload: function(response) {
			var regexp = /.*Current Song.*?<b\b[^>]*>(.*?)<\/b>/;
			var songtitle = regexp.exec(response.responseText)[1];
			regexp = /.*Stream AIM.*?<a\b[^>]*>(.*?)<\/a>/;
			var dj = regexp.exec(response.responseText)[1];
			regexp = /.*Stream Genre.*?<b\b[^>]*>(.*?)<\/b>/;
			var showtitle = regexp.exec(response.responseText)[1];
			
// 			GM_log( [songtitle,dj,showtitle].join('\n') );
			var titleSpan = document.getElementById("songtitle");
			titleSpan.textContent = songtitle;
			
			if (String(window.location).match("compactmenu.php")) {
				titleSpan.setAttribute( "title", dj + " [" + showtitle + "]" );
			} else {
				var djSpan = document.getElementById("dj");
				if (dj == "" || dj == "NA") {
					djSpan.textContent = "[" + showtitle + "]";
				} else {
					djSpan.textContent = "DJ: " + dj;
					djSpan.setAttribute("title",showtitle);
				}
			}
		}
	});
}

function blank() {
	var titleSpan = document.getElementById("songtitle");
	titleSpan.textContent = "";
	
	if (! String(window.location).match("compactmenu.php")) {
		var djSpan = document.getElementById("dj");
		djSpan.textContent = "";
	}	
}

// if (String(window.location).match("menu.php")) {
			
var tr = document.getElementsByTagName("tr")[0];
var td = document.createElement('td');
td.setAttribute("class","tiny");

var intervalId = "";

var d = new Date();
var t = d.getTime();
// 	GM_log("t: "+t.toString()+" last: "+GM_getValue("lastUpdate","0"));

var autoResume = ( GM_getValue("playing",false) && (t < parseInt(GM_getValue("lastUpdate","0"))+120000) ); //120000

if ( autoResume ) {
	window.update();
	intervalId = window.setInterval  ( function() { window.update() }, 30000 );
}

playLink = td.appendChild(document.createElement('a'));
playLink.textContent = "play";
playLink.setAttribute('href','#');
playLink.setAttribute('onClick','window.document["mpl"].sendEvent("PLAY","1");');

playLink.addEventListener('click', function() {
	if (intervalId) { window.clearInterval ( intervalId ) };
	window.update();
	// updates song title and DJ name every 30 seconds
	intervalId = window.setInterval  ( function() { window.update() }, 30000 );
	GM_setValue("playing",true);
}, false);

td.appendChild( document.createTextNode(" ") );

stopLink = td.appendChild(document.createElement('a'));
stopLink.textContent = "stop";
stopLink.setAttribute('href','#');
stopLink.setAttribute('onClick','window.document["mpl"].sendEvent("STOP");');
stopLink.addEventListener('click', function() {
	blank();
	window.clearInterval ( intervalId );
	GM_setValue("playing",false);
}, false);

playerSpan = td.appendChild(document.createElement('span'));
playerSpan.id = "player";
playerSpan.textContent = " Error loading player. ";
playerSpan.setAttribute("style","vertical-align: bottom; position: relative; top: 2px;");

td.appendChild( document.createElement('br'));	
titleSpan = td.appendChild( document.createElement('span') );
titleSpan.id = "songtitle";
titleSpan.setAttribute("style","padding-right: 4px;");

if (! String(window.location).match("compactmenu.php")) {
	td.appendChild( document.createElement('br'));
	djSpan = td.appendChild( document.createElement('span') );
	djSpan.id = "dj";
}

tr.insertBefore(td, tr.firstChild);


createplayer( autoResume );
	
// }



