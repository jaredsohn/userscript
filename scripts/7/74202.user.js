var scr_version = <><![CDATA[
// ==UserScript==
// @name           Bandenkampf-Details
// @author         Peter L aus B (http://berlin.pennergame.de/change_please/3471184/)
// @namespace      peter_l_aus_b
// @description    Die Spieler und Banden bei der Statusseite von Bandenkämpfen verlinken.
// @version        0.3.18
// @version        0.3.18  Hotfix für Designänderung: Die Gegnerliste ist wieder da.
// @version        0.3.17  Anzeigen, ob man bereits gegen diesen Penner gekämpft hat.
// @version        0.3.12  Direktlinks zu den Nachrichten und Pennerzone (Danke für die Idee, MurfyMurf!)
// @version        0.3.9   Angreifbare Spieler und Spieler, von denen man angegriffen werden kann, hervorheben.
// @version        0.3.7   Nur einen Fehler ausgeben.
// @version        0.3.6   Anzeigen, ob man von Penner angegriffen werden kann.
// @version        0.3.5   Fix für Spielernamen länger als 16 Zeichen (Danke für den Hinweis, echterFlaschenhansi!)
// @version        0.3.3   ausführlicherer Ladestatus und Fehlerausgabe
// @version        0.3.1   Bessere Anzeige bei Spielern, die die Bande bereits verlassen haben.
// @version        0.3.0   Neues Update-System (Dank an Thomas Duerr!)
// @version        0.2.4   HTML-Antwort mittels Node.innerHTML verarbeiten (Danke für den Hinweis, Pennerlegende_Lulli!)
// @version        0.2.1   Hover-Effekt
// @version        0.2.0   Gegnerliste auf der Seite
// @version        0.1.2   Initialer Upload
// @include        http://*.pennergame.de/gang/fight/view/*/
// ==/UserScript==
]]></>.toString().match(/@version\s+([.\d]+)/)[1];

var ICONS = [
	['http://www.abload.de/img/0_0kopie7p3i.gif', 'http://www.abload.de/img/0_1kopieco8m.gif', 'http://i42.tinypic.com/fcutn5.png'],
	['http://www.abload.de/img/1_0kopieeqq0.gif', 'http://www.abload.de/img/1_1kopie4sob.gif', 'http://i42.tinypic.com/27zkeww.png'],
	['http://www.abload.de/img/2_0kopie6qrb.gif', 'http://www.abload.de/img/2_1kopieioyf.gif', 'http://i42.tinypic.com/21b807d.png']
];

var WEAK_OPPONENT   = "http://i42.tinypic.com/5yc9qh.jpg";
var STRONG_OPPONENT = "http://i42.tinypic.com/zyhf76_th.png";
var NO_OPPONENT     = "http://i42.tinypic.com/5x02za.png";
var BAD_SMILEY      = "http://i42.tinypic.com/21e7x9j.png";
var NO_SMILEY       = NO_OPPONENT;
var MESSAGE         = "http://i42.tinypic.com/2501c7q.gif";
var PENNERZONE      = "http://i42.tinypic.com/2lw8w5.png";

var SMILING_SMILEY  = "http://i42.tinypic.com/2mn3n7.png";
var CHANGE_PLEASE   = "http://berlin.pennergame.de/change_please/3471184/";

var THROBBER        = "http://i42.tinypic.com/6ymflx.png";

var ALREADY_FOUGHT  = "http://i42.tinypic.com/140kgvt.jpg";
var NO_FIGHT        = "http://i42.tinypic.com/2115ow1.jpg"

var GREEN  = "rgb(0,255,128)";
var RED    = "rgb(192,128,128)";
var YELLOW = "rgb(255,255,0)";

var STYLE =
	".zcenter { text-align: center; } \n" +
	"#pgmemberlist-table { width: 495px; } \n" +
	"#pgmemberlist-table thead { background-image: url(http://static.pennergame.de/img/pv4/icons/bg_tdhead.png); } \n" +
	"#pgmemberlist-table .admin { background-image: url(http://static.pennergame.de/img/pv4/shop/bl_DE/bande/admin.gif); } \n" +
	"#pgmemberlist-table .coadmin { background-image: url(http://static.pennergame.de/img/pv4/shop/bl_DE/bande/coadmin.gif); } \n" +
	"#pgmemberlist-table .member { background-image: url(http://static.pennergame.de/img/pv4/shop/bl_DE/bande/member.gif); } \n" +
	"#pgmemberlist-table th, #pgmemberlist-table td { padding: 8px; } \n" +
	"#pgmemberlist-table td { padding: 4px 8px; } \n" +
	"#pgmemberlist-table td { border-right: 1px solid #1d1d1d;  } \n" +
	"#pgmemberlist-table tr.even td { background-color: #2f2f2f;  } \n" +
	"#pgmemberlist-table tr.odd td { background-color: #343434; } \n" +
	"#pgmemberlist-table tr:hover td { background-color: #454545; } \n" +
	"#pgmemberlist-table td.last { border: none; } \n" +
	"th.pg-list-name { width: 150px; } \n" +
	"td.pg-list-rank { text-align: center; border: 1px solid red; } \n" +
	"td.pg-list-info a { display: block; float: left; width: 16px; height: 16px; margin-right: 5px; } \n" +
	".pg-list-name a { padding-left: 12px; background-repeat: no-repeat; background-position: 0% 60%; } \n";

var PARSER = new DOMParser();

var numPlayersToGet = 1;
var numGangsToGet   = 2;
var numStatusToGet  = 1;
var numPlayersGot   = 0;
var numGangsGot     = 0;
var numStatusGot    = 0;

var namesInUsersToGet = {};
var userInfos = {};
var lines = [];
var playerName = "<loading>";
var playerId = -1;
var gang1 = {};
var gang2 = {};
var throbber = {};
var opponentMembers = [];

function Alert(str) {
	if(Alert.once) {
		return;
	}
	Alert.once = true;
	alert(str);
}
Alert.once = false;

function decreaseCount(isGang) {
	if(isGang === true) {
		++numGangsGot;
	} else if(isGang === false) {
		++numPlayersGot;
	} else {
		++numStatusGot;
	}
	throbber.setStatus();
	if(numPlayersGot >= numPlayersToGet && numGangsGot >= numGangsToGet && numStatusGot >= numStatusToGet) {
		replaceLines();
	}
}

function isEnemy(name) {
	return userInfos[name].gang !== userInfos[playerName].gang;
}

function addUserToGet(name, usersToGet) {
	if(!namesInUsersToGet[name]) {
		namesInUsersToGet[name] = true;
		usersToGet.push(name);
		++numPlayersToGet;
		throbber.setStatus();
	}
}

function attackable(target, source) {
	if(!source) {
		source = playerName;
	}
	var a = userInfos[source].points * 0.8;
	var b = userInfos[target].points;
	var c = userInfos[source].points * 1.5;
	return a <= b && b <= c;
}

function regSince(name) {
	var date = userInfos[name].reg_since.match(/^(\d\d)\.(\d\d)\.(\d\d\d\d)$/);
	return new Date(date[3], date[2], date[1]);
}

function markUser(ev) {
	var userClass = ev.type === "mouseover" && document.querySelector(".user-name:hover");
	var yes, no;
	
	if(!userClass) {
		userClass = false;
		if(markUser.lastUserClass === userClass) {
			return;
		}
		yes = [];
		no = document.querySelectorAll(".user-name");
	} else {
		userClass = userClass.getAttribute("class").match(/(user-name-[^ ]+)/)[1];
		if(markUser.lastUserClass === userClass) {
			return;
		}
		yes = document.querySelectorAll(".user-name." + userClass);
		no = document.querySelectorAll(".user-name:not(." + userClass + ")");
	}
	
	for(var i = 0; i < yes.length; ++i) {
		yes[i].style.backgroundColor = "rgb(0,0,0)";
		yes[i].style.border = "1px solid red";
	}
	for(var i = 0; i < no.length; ++i) {
		no[i].style.backgroundColor = "inherit";
		no[i].style.border = "inherit";
	}
	
	markUser.lastUserClass = userClass;
}
markUser.lastUserClass = false;

function mkUserLink(name, highlight) {
	var result = document.createElement("a");
	if(highlight) {
		if(isEnemy(name)) {
			result.style.fontWeight = "bold";
			result.style.color = attackable(name) ? GREEN : RED;
		} else if(name === playerName) {
			result.style.color = YELLOW;
		}
	}
	result.setAttribute("href", "/profil/id:" + userInfos[name].id + "/");
	result.setAttribute("title",
		"Punkte: " + userInfos[name].points + ", \n" +
		"Registriert: " + userInfos[name].reg_since + ", \n" +
		"Cash: " + userInfos[name].cash/100 + "\u20AC"
	);
	result.appendChild(document.createTextNode(name));
	
	result.setAttribute("class", "user-name user-name-" + encodeURIComponent(name));
	result.addEventListener("mouseover", markUser, false);
	result.addEventListener("mouseout", markUser, false);
	return result;
}

function replaceLine(line) {
	var isEnemy1 = isEnemy(line.user1);
	var isEnemy2 = isEnemy(line.user2);
	
	var gangWon, gangWonText;
	if(isEnemy1 == isEnemy2) {
		gangWon = 2;
		gangWonText = "N/A";
	} else if(isEnemy1 ^ line.won) {
		gangWon = 1;
		gangWonText = "ja";
	} else {
		gangWon = 0;
		gangWonText = "nein";
	}
	
	var g1 = userInfos[line.user1].gang, g2 = userInfos[line.user2].gang, f1 = gang1.id, f2 = gang2.id;
	
	var incoming, incomingText;
	if(       (g1 === f1 && g2 !== f1) || (g1 !== f2 && g2 === f2)) {
		incoming = 0;
		incomingText = "nein";
	} else if((g1 === f2 && g2 !== f2) || (g1 !== f1 && g2 === f1)) {
		incoming = 1;
		incomingText = "ja";
	} else {
		incoming = 2;
		incomingText = "unbekannt";
	}
	
	var text = document.createElement("span");
	
	var img = text.appendChild(document.createElement("img"));
	img.setAttribute("alt", "");
	img.setAttribute("height", "12");
	img.setAttribute("width", "12");
	img.setAttribute("src", ICONS[gangWon][incoming]);
	img.setAttribute("title",
		"Eingehend: " + incomingText + ", \n" +
		"wir haben gewonnen: " + gangWonText
	);
	
	text.appendChild(document.createTextNode(" \xA0"));
	text.appendChild(mkUserLink(line.user1, true));
	text.appendChild(document.createTextNode(" hat gegen "));
	text.appendChild(mkUserLink(line.user2, true));
	text.appendChild(document.createTextNode(" " + (line.won ? "gewonnen" : "verloren") + "."));
	
	line.text.parentNode.replaceChild(text, line.text);
}

function loadHasFought(img, name) {
	GM_xmlhttpRequest({
		"method": "GET",
		"url":    "http://" + window.location.host + "/fight/fightlog/?q=" + encodeURIComponent(name),
		"onload": function(responseDetails) {
			var xmlDoc = document.createElement("div");
			xmlDoc.innerHTML = responseDetails.responseText;
			var imgs = xmlDoc.getElementsByClassName("tieritemA")[0].getElementsByTagName("img");
			var lost = 0, won = 0;
			for(var i = 0; i < imgs.length; ++i) {
				if(/\/0_.\.gif$/.test(imgs[i].getAttribute("src"))) {
					++lost;
				} else if(/\/1_.\.gif$/.test(imgs[i].getAttribute("src"))) {
					++won;
				}
			}
			if(lost > 0 || won > 0) {
				img.setAttribute("src", ALREADY_FOUGHT);
			}
			img.setAttribute("title", "Gewonnen: " + won + ", verloren: " + lost);
		}
	});
}

function replaceLines() {
	if(!replaceLines.once) {
		return;
	}
	replaceLines.once = false;
	
	for(var line; line = lines.shift();) {
		replaceLine(line);
	}
	
	var tableLine = document.querySelector("#content .listshop div[align=center] tr:nth-of-type(3)");
	var dest = tableLine.parentNode.insertBefore(tableLine.cloneNode(false), tableLine).appendChild(tableLine.querySelector("td").cloneNode(false));
	dest.setAttribute("colspan", "3");
	var table = dest.appendChild(document.createElement("table"));
	table.style.marginLeft = table.style.marginRight = "auto";
	table.setAttribute("id", "pgmemberlist-table");
	var thead = table.appendChild(document.createElement("thead")).appendChild(document.createElement("tr"));
	
	var th = thead.appendChild(document.createElement("th"));
	th.setAttribute("class", "zcenter");
	th.appendChild(document.createTextNode("Links"));
	
	th = thead.appendChild(document.createElement("th"));
	th.setAttribute("class", "zcenter");
	th.appendChild(document.createTextNode("Name"));
	
	th = thead.appendChild(document.createElement("th"));
	th.setAttribute("class", "zcenter");
	th.appendChild(document.createTextNode("Registriert"));
	
	th = thead.appendChild(document.createElement("th"));
	th.setAttribute("class", "zcenter");
	th.appendChild(document.createTextNode("Punkte"));
	
	var playerDate = regSince(playerName).getTime();
	
	for(var i = 0; i < opponentMembers.length; ++i) {
		var name = opponentMembers[i].name;
		var dateOff = Math.round((regSince(name).getTime() - playerDate) / (24*60*60*1000));
		var isAttackable = attackable(name);
		var user = mkUserLink(name, isAttackable);
		var userClass;
		switch(opponentMembers[i].status) {
			case(0): userClass = "";        break;
			case(1): userClass = "member";  break;
			case(2): userClass = "coadmin"; break; 
			case(3): userClass = "admin";   break;
		}
		user.setAttribute("class", (user.getAttribute("class")||"") + " " + userClass);
		
		var tr = table.appendChild(document.createElement("tr"));
		tr.setAttribute("class", "even change " + (i%2 ? "odd" : ""));
		
		var iconsTd = tr.appendChild(document.createElement("td"));
		iconsTd.style.whiteSpace = "nowrap";
		iconsTd.style.width = "52px";
		function addImg(src, title, href) {
			var a = iconsTd;
			if(href) {
				a = iconsTd.appendChild(document.createElement("a"));
				a.setAttribute("href", href);
			}
			var img = a.appendChild(document.createElement("img"));
			img.style.height = "12px";
			img.style.width = "12px";
			img.setAttribute("src", src);
			if(title) {
				img.setAttribute("title", title);
			}
			return img;
		}
		
		if(isAttackable) {
			addImg(
				dateOff > 0 ? WEAK_OPPONENT : STRONG_OPPONENT,
				name + " angreifen",
				"http://" + window.location.host + "/fight/?to=" + encodeURIComponent(name)
			);
		} else {
			addImg(NO_OPPONENT);
		}
		iconsTd.appendChild(document.createTextNode("\xA0"));
		addImg(MESSAGE, name + " eine Nachricht schreiben", "http://" + window.location.host + "/messages/write/?to=" + userInfos[name].id);
		iconsTd.appendChild(document.createTextNode("\xA0"));
		addImg(
			PENNERZONE,
			"Pennerzone-Infos zu " + name,
			"http://" + window.location.host.match(/^([^.]*)/)[1] + ".pennerzone.de/highscore/u" + userInfos[name].id + "-" + encodeURI(name) + ".html"
		);
		iconsTd.appendChild(document.createTextNode("\xA0"));
		var foughtImg = addImg(NO_FIGHT, "Läd ...", "http://" + window.location.host + "/fight/fightlog/?q=" + encodeURIComponent(name));
		loadHasFought(foughtImg, name);
		iconsTd.appendChild(document.createTextNode("\xA0"));
		if(attackable(playerName, name)) {
			addImg(BAD_SMILEY, name + " kann dich angreifen.");
		} else {
			addImg(NO_SMILEY);
		}
		
		var userTd = tr.appendChild(document.createElement("td"));
		userTd.appendChild(user);
		userTd.setAttribute("class", "pg-list-name");
		if(dateOff < 0 || !isAttackable) {
			user.style.fontWeight = "normal";
		}
		
		var userDateTd = tr.appendChild(document.createElement("td"));
		userDateTd.style.whiteSpace = "nowrap";
		var userPointsTd = tr.appendChild(document.createElement("td"));
		userPointsTd.style.whiteSpace = "nowrap";
		userPointsTd.appendChild(document.createTextNode(userInfos[name].points))
		if(dateOff < 0) {
			userDateTd.appendChild(document.createTextNode(-dateOff + " Tage länger"));
			user.style.color = userPointsTd.style.color = userDateTd.style.color = RED;
		} else if(dateOff == 0) {
			userDateTd.appendChild(document.createTextNode("am selben Tag"));
		} else if(dateOff > 0) {
			userDateTd.appendChild(document.createTextNode(dateOff + " Tage weniger"));
			user.style.color = userPointsTd.style.color = userDateTd.style.color = GREEN;
		}
		if(!isAttackable) {
			user.style.color = userPointsTd.style.color = userDateTd.style.color = "inherit";
			userPointsTd.style.fontSize = userDateTd.style.fontSize = "90%";
		}
	}
	
/*
	var byDest = table.appendChild(document.createElement("thead")).appendChild(document.createElement("tr")).appendChild(document.createElement("th"));
	byDest.setAttribute("colspan", "5");
	byDest.setAttribute("class", "zcenter new_fade");
	byDest.style.fontSize = "90%";
	byDest.appendChild(document.createTextNode("Bandenkampf-Details by "));
	var byA = byDest.appendChild(document.createElement("a"));
	byA.setAttribute("href", CHANGE_PLEASE);
	byA.appendChild(document.createTextNode("Peter L aus B"));
	byDest.appendChild(document.createTextNode(". Bitte spende mir! "));
	var byImg = byDest.appendChild(document.createElement("img"));
	byImg.setAttribute("src", SMILING_SMILEY);
	byImg.setAttribute("alt", ":-D");
	byImg.style.height = "8px";
	byImg.style.width = "8px";
*/
	
	throbber.parentNode.removeChild(throbber);
}
replaceLines.once = true;

function ajaxUserCall(responseDetails) {
	var xmlDoc = PARSER.parseFromString(responseDetails.responseText, "text/xml");
	var user_s = xmlDoc.getElementsByTagName("user");
	if(!user_s || !user_s[0]) {
		Alert("Es ist möglicherweise ein Fehler beim Laden der Spielerinformationen aufgetreten.\n"+
			"Die URL war: " + responseDetails.finalUrl + "\n\n" +
			"Drücke F5 falls es keinen Fortschritt gibt.");
		return;
	}
	
	var info = {};
	
	for(var argument = user_s[0].firstChild; argument; argument = argument.nextSibling) {
		if(!argument.tagName) continue;
		switch(argument.tagName) {
			case "name":      info.name      = argument.firstChild.data;         break;
			case "id":        info.id        = argument.firstChild.data;         break;
			case "points":    info.points    = Number(argument.firstChild.data); break;
			case "reg_since": info.reg_since = argument.firstChild.data;         break;
			case "cash":      info.cash      = Number(argument.firstChild.data); break;
			case "gang":      info.gang      = Number(argument.getElementsByTagName("id")[0].firstChild.data); break;
		}
	}
	
	userInfos[info.name] = info;
	if(info.id == playerId) {
		playerName = info.name;
	}
	
	decreaseCount(false);
}

function getUser(user) {
	GM_xmlhttpRequest({
		"method": "GET",
		"url":    "http://" + window.location.host + "/dev/api/user.getname.xml?name=" + encodeURIComponent(user),
		"onload": ajaxUserCall
	});
}

function ajaxGangMembers(responseDetails) {
	var xmlDoc = PARSER.parseFromString(responseDetails.responseText, "text/xml");
	var members = xmlDoc.querySelectorAll("Pennergame gang member_list member");
	if(!members) {
		Alert("Es ist möglicherweise ein Fehler beim Laden der Mitgliederliste aufgetreten.\n"+
			"Die URL war: " + responseDetails.finalUrl + "\n\n" +
			"Drücke F5 falls es keinen Fortschritt gibt.");
		return;
	}
	
	var usersToGet = [];
	
	for(var i = 0; i < members.length; ++i) {
		var info = {
			"id":     Number(members[i].getElementsByTagName("id")[0].firstChild.data),
			"name":   members[i].getElementsByTagName("name")[0].firstChild.data,
			"status": Number(members[i].getElementsByTagName("status")[0].firstChild.data)
		};
		opponentMembers.push(info);
		addUserToGet(info.name, usersToGet)
	}
	
	for(var user; user = usersToGet.shift();) {
		getUser(user);
	}
	
	decreaseCount(null);
}

function getGang(gang) {
	GM_xmlhttpRequest({
		"method": "GET",
		"url":    "http://" + window.location.host + "/dev/api/gang." + gang + ".xml",
		"onload": ajaxGangMembers
	});
}

function loadOpponents(gang) {
	if(!userInfos[playerName]) {
		function tryAgain() {
			loadOpponents(gang);
		}
		window.setTimeout(tryAgain, 50);
		return;
	}
	
	if(userInfos[playerName].gang === gang) {
		return;
	}
	
	getGang(gang);
}

function ajaxGangCall(responseDetails) {
	var xmlDoc = document.createElement("div");
	xmlDoc.innerHTML = responseDetails.responseText;
	var lines = xmlDoc.querySelectorAll("#content #highscore #hs_bande tr");
	if(!lines) {
		Alert("Es ist möglicherweise ein Fehler beim Laden der Banden-ID aufgetreten.\n"+
			"Die URL war: " + responseDetails.finalUrl + "\n\n" +
			"Drücke F5 falls es keinen Fortschritt gibt.");
		return;
	}
	
	for(var i = 0; i < lines.length; ++i) {
		var line = lines[i];
		try {
			var info = {
				"rang":    Number(line.querySelector(".col1").firstChild.data),
				"name":    line.querySelector(".col2 a").firstChild.data,
				"link":    line.querySelector(".col2 a"),
				"id":      Number(line.querySelector(".col2 a").getAttribute("href").match(/^.*:(\d+)\/$/)[1]),
				"points":  Number(line.querySelector(".col3").firstChild.data),
				"avg":     Number(line.querySelector(".col4").firstChild.data),
				"members": Number(line.querySelector(".col5").firstChild.data)
			};
			
			if(gang1.firstChild && gang1.firstChild.data === info.name) {
				info.line = gang1;
				gang1 = info;
			} else if(gang2.firstChild && gang2.firstChild.data === info.name) {
				info.line = gang2;
				gang2 = info;
			} else {
				continue;
			}
			
			info.link.setAttribute("title",
				"Point: " + info.points + " (\u2205 " + info.avg + "), \n" +
				"Platz: " + info.rang + ", \n" +
				"Mitglieder: " + info.members
			);
			info.line.parentNode.replaceChild(info.link, info.line);
			
			loadOpponents(info.id);
			decreaseCount(true);
			break;
		} catch(e) {
			//
		}
	}
}

function getGangId(gang) {
	GM_xmlhttpRequest({
		"method": "GET",
		"url":    "http://" + window.location.host + "/highscore/gang/?gang=" + encodeURIComponent(gang),
		"onload": ajaxGangCall
	});
}

function getPlayer() {
	GM_xmlhttpRequest({
		"method": "GET",
		"url":    "http://" + window.location.host + "/dev/api/user." + playerId + ".xml",
		"onload": ajaxUserCall
	});
}

function init() {
	if(!document.querySelectorAll) {
		Alert("Dein Browser ist veraltet.\nDas Script \"Bandenkampf-Details\" funktioniert erst ab Firefox 3.5!");
		return;
	}
	
	var usersToGet = [];
	
	var throbberImg = document.createElement("img");
	throbberImg.setAttribute("src", THROBBER);
	throbberImg.setAttribute("alt", "läd ...");
	throbberImg.setAttribute("height", "16");
	throbberImg.setAttribute("width", "16");
	var throbberStatus = document.createElement("span");
	throbberStatus.appendChild(document.createTextNode("Geladen: Spieler: 0/X, Gangs: 0/2"));
	throbber = document.createElement("span");
	throbber.appendChild(throbberImg);
	throbber.appendChild(document.createTextNode(" \xA0"));
	throbber.appendChild(throbberStatus);
	throbber.appendChild(document.createElement("br"));
	throbber.setStatus = function(playersLoaded, playersToLoads, gangsLoaded) {
		var text =
			"Spieler: " + numPlayersGot + "/" + numPlayersToGet + ", \n" +
			"Banden-IDs: " + numGangsGot + "/" + numGangsToGet + ", \n" +
			"Bandenmitgliederliste: " + numStatusGot + "/" + numStatusToGet;
		throbberStatus.replaceChild(document.createTextNode(text), throbberStatus.firstChild);
	}
	
	var throbberLine = document.querySelector("#content .listshop td div:nth-of-type(2) strong");
	throbberLine.insertBefore(throbber, throbberLine.firstChild);
	
	playerId = Number(document.querySelector("#my-profile a").getAttribute("href").match(/\/id:(\d+)\/$/)[1]);
	getPlayer(playerId);
	
	var gangs = document.querySelectorAll("#content .listshop td tr .b_name a");
	gang1 = gangs[0];
	gang2 = gangs[1];
	
	var divs = document.querySelectorAll("#content .listshop td div div");
	for(var i = 0; i < divs.length; ++i) {
		var text = divs[i].firstChild;
		if(!text || !text.data || !text.data.match) continue;
		var e = text.data.match(/^\s*(.+) hat gegen (.+) (gewonnen|verloren).\s*$/);
		if(!e) continue;
		lines.push({text: text, user1: e[1], user2: e[2], won: e[3] === "gewonnen"});
		addUserToGet(e[1], usersToGet);
		addUserToGet(e[2], usersToGet);
	}
	
	for(var user; user = usersToGet.shift();) {
		getUser(user);
	}
	
	getGangId(gang1.firstChild.data);
	getGangId(gang2.firstChild.data);
	
	var style = document.createElement("style");
	style.setAttribute("type", "text/css");
	style.appendChild(document.createTextNode(STYLE));
	document.querySelector("head").appendChild(style);
}

init();





// name          easy userscript updater snippet
// author        Thomas Duerr
// version       1.0.1
// date          2009-03-27

var userscriptUpdater = function(){
    var css = "div.greasemonkey_updater { font-size: 12px; background: #FFC; padding: 10px 15px; border-width: 1px 0; border-style: solid; border-color: #F90; margin: 0 0 30px; } " +
              "div.greasemonkey_updater h1 { font-size: 16px !important; margin: 0 0 5px 0; font-weight: bold; } " +
              "div.greasemonkey_updater .greasemonkey_updater_link_to_hide { float: right; text-align: right; width: 125px; font-size: 11px; font-weight: normal; } " +
              "div.greasemonkey_updater .greasemonkey_updater_link_to_hide a { color: #F00; } " +
              "div.greasemonkey_updater p { margin: 0 0 15px 0; font-size: 12px !important; line-height: 140%; color: #000; }";

    var config      = {
        checkInterval: 12*60*60,                                  // default check interval: check once a day [in seconds]
        injectInto:    document.getElementsByTagName("body")[0],  // default dom-node for the updater-message to be inserted
        updaterCss:    css                                        // default styles of updater message
    };
    var lastCheck   = GM_getValue("lastCheck", 0);
    var lastVersion = GM_getValue("lastVersion", 0);
    var currentTime = Math.round(new Date().getTime()/1000);
    var meta        = {
        name:       /@name\s+(.*)[\r\n]/,
        version:    /@version\s+([.\d]+)(?:\s+.*)?[\r\n]/,
        change:     /@change\s+(.*)[\r\n]/,
        depricated: /@depricated\s+(.*)[\r\n]/
    };
    var updater;

    // check remote userscript for version
    var checkRemoteUserscript = function(){
        GM_xmlhttpRequest({
            method:  "GET",
            url:     "http://userscripts.org/scripts/source/" + config.scriptId + ".meta.js",
            headers: {"User-agent": "Mozilla/4.0 (compatible) Greasemonkey", "Accept": "text/plain"},
            onload:  function(resp) {
                GM_setValue("lastCheck", currentTime);
                for(m in meta){meta[m] = (meta[m].exec(resp.responseText) ? meta[m].exec(resp.responseText)[1] : null);}
                if(isNewer(meta.version, config.currentVersion) && isNewer(meta.version, lastVersion)) {
                    GM_addStyle(config.updaterCss);
                    updater = build();
                }
            }
        });
    };

    // compare versions based on versioning scheme: major.minor[.bugfix]
    var isNewer = function(o, p){
        /(\d+)\.(\d+)(?:\.(\d+))?\|(\d+)\.(\d+)(?:\.(\d+))?/.exec(o + "|" + p);
        with(RegExp){
            if(parseInt($4 || "0") < parseInt($1 || "0")) return true;
            if(parseInt($5 || "0") < parseInt($2 || "0")) return true;
            if(parseInt($6 || "0") < parseInt($3 || "0")) return true;
        }
        return false;
    };

    // skip current update until next
    var skipUpdate = function(ev){
        ev.preventDefault();
        GM_setValue("lastVersion", meta.version);
        config.injectInto.removeChild(updater);
    };

    // initialization
    var initialize = function(options){

        // merge options into config
        for(prop in options){if(options[prop]){config[prop] = options[prop];}}

        // already checked for an update today?
        if(currentTime > (lastCheck + config.checkInterval)){
            checkRemoteUserscript();
        }
    };

    // build updater message and inject it into DOM
    var build = function(){
        var updater = document.createElement("div");
            updater.className = "greasemonkey_updater";
        var hide = document.createElement("div");
            hide.className = "greasemonkey_updater_link_to_hide";
        if(meta.depricated == null){
            var a_hide = document.createElement("a");
                a_hide.href = "";
                a_hide.addEventListener("click", skipUpdate, false);
            var a_span = document.createElement("span");
                a_span.appendChild(document.createTextNode("Skip until next Update!"));
            a_hide.appendChild(a_span);
            hide.appendChild(a_hide);
        }
        var h1 = document.createElement("h1");
            h1.appendChild(hide);
            h1.appendChild(document.createTextNode(meta.depricated == null ? "Greasemonkey UserScript Update Notification!" : "Depricated Greasemonkey UserScript!"));
        updater.appendChild(h1);
        var p = document.createElement("p");
        if(meta.depricated == null){
            var text = "There is an update available for <a href=\"http://userscripts.org/scripts/show/" + config.scriptId + "\">" + meta.name + "</a>.<br>";
                text += meta.change ? "<br>" + meta.change + "<br><br>" : "";
                text += "You are currently running version <b>" + config.currentVersion + "</b>, the newest version on userscripts.org is <b>" + meta.version + "</b>!<br><a href=\"http://userscripts.org/scripts/source/" + config.scriptId + ".user.js\">Update to Version " + meta.version + "</a>";
        } else {
            var text = "The userscript <a href=\"http://userscripts.org/scripts/show/" + config.scriptId + "\">" + meta.name + "</a> is now depricated.<br>";
                text += meta.depricated && meta.depricated != "true" ? "<br>" + meta.depricated + "<br><br>" : "";
                text += "Please remove your script! Thanks for using it.";
        }
        p.innerHTML = text;
        updater.appendChild(p);
        var first = config.injectInto && config.injectInto.firstChild;
        (first ? config.injectInto.insertBefore(updater, first) : config.injectInto.appendChild(updater));
        return updater;
    };

    return { init: initialize };
}();

// initialize updater
userscriptUpdater.init({
    scriptId:       "71975", // insert id of your userscript from userscripts.org!
    currentVersion: scr_version
});
