// ==UserScript==
// @name           Replay Rewrite
// @description    Adds some new features to the replay page.
// @namespace      pbr
// @include        http://goallineblitz.com/game/replay.pl?game_id=*&pbp_id=*
// @include        http://goallineblitz.com/game/home.pl
// @require        http://userscripts.org/scripts/source/31566.user.js       
// @require        http://userscripts.org/scripts/source/31567.user.js
// @version        08.08.11
// ==/UserScript==


// ---------- main ----------------
	
var highlightPlayers = true;
var autoplay = true;
var preDelay = 3000;
var postDelay = 3000;

var currentPlay = -1;
var lastPlay = -1;
var plays = [];

var playDone = false;

window.setTimeout( function() {
	if ((window.location+"").indexOf("home.pl") != -1) {
		console.log("here");
		pbr_replay_highlight_main();
	}
	else {
		console.log("there");
		document.addEventListener("page loaded",changePlays,true);
		pbp();
		restructurePage();
		
		setInterval(isPlayFinished,3000);
	}
}, 100);

// ---------- end main ------------

function restructureInfo() {
	var offOrder = ["WR1","WR3","LOT","LG","C","RG","ROT","TE","WR5","WR4","WR2","QB","HB","FB"];
	var defOrder = ["CB1","CB3","RDE","DT","NT","LDE","CB4","CB2","ROLB","RILB","MLB","LILB","LOLB","FS","SS"];
	
	var teams = document.getElementsByClassName("team");
	for each (var t in teams) {
		var clears = t.getElementsByClassName("clear");
		for (var i=clears.length-1; i>-1; i--) {
			t.removeChild(clears[i]);
		}
	}
	
	var players = document.getElementsByClassName("player_listing");
	//doing this twice until I get a sort working
	for (var i=players.length-1; i>-1; i--) {
		var p = players[i].parentNode;
		var t = p.removeChild(players[i]);
		t.setAttribute("style","clear:left;");
		//t.lastChild.firstChild.nextSibling.nodeValue = "";  //remove actual position
		p.appendChild(t);
	}
	
	var stats = new Stats();
	for (var i=0; i<currentPlay; i++) {
		playHandler(stats, new Drive(), plays[i]);
	}
	
	var players = document.getElementsByClassName("player_listing");
	for (var i=players.length-1; i>-1; i--) {
		var p = players[i].parentNode;
		var t = p.removeChild(players[i]);
		t.setAttribute("style","clear:left;");
		//t.lastChild.firstChild.nextSibling.nodeValue = "";  //remove actual position
		p.appendChild(t);
		
		var div = document.createElement("div");
		div.setAttribute("style","clear:left;margin-left:40px;margin-bottom:10px;");
		div.setAttribute("class","player_stats");
		
		var pos = t.firstChild.innerHTML;
		var name = t.firstChild.nextSibling.firstChild.innerHTML;
		//console.log(pos+") '"+name+"'");
		if (pos.match("QB") != null) {
			div.innerHTML = getPassingString(stats, name);
		}
		else if ((pos.match("HB") != null) || (pos.match("FB") != null)) {
			div.innerHTML = getRushingString(stats, name);
		}
		else if ((pos.match("WR") != null) || (pos.match("TE") != null)) {
			div.innerHTML = getReceivingString(stats, name);
		}
		else if (pos.match("KR") != null) {
			div.innerHTML = getReturnString(stats, name, true);
		}
		else if (pos.match("PR") != null) {
			div.innerHTML = getReturnString(stats, name, false);
		}
		else if ((pos.match("RS") != null) || (pos.match("OS") != null) ||
				(pos.match("LS") != null)) {
			div.innerHTML = getDefensiveSTString(stats, name);
		}
		else if ((pos.match("CB") != null) || (pos.match("S") != null)) {
			div.innerHTML = getDefensiveString(stats, name);
		}
		else if ((pos.match("G") != null) || (pos.match("C") != null) || 
				 (pos.match("OT") != null)) {
			div.innerHTML = getOffensiveLineString(stats, name);
		}
		else if (pos.match("K") != null) {
			div.innerHTML = getKickingString(stats, name);
		}
		else if (pos.match("P") != null) {
			div.innerHTML = getPuntingString(stats, name);
		}
		else {
			div.innerHTML = getDefensiveString(stats, name);
		}
		p.appendChild(div);		
	}
	
	console.log("exit ri");
}

function getPassingString(stats, name) {
	var output = "&nbsp;";
	var index = stats.playerPassingName[1].indexOf(name);
	if (index != -1) {
		var s = stats.playerPassingStats[1][index];
		var att = s[0];
		var cmp = s[1];
		var y = s[2];
		var td = s[3];
		var int = s[4];
		
		output = att+" / "+cmp+", "+y.toFixed(0)+" yards";
		if (td != 0) output += ", "+td+" td";
		if (int != 0) output += ", "+int+" int";
		//console.log(s);
	}
	return output;
}
function getRushingString(stats, name) {
	var output = "&nbsp;";
	var index = stats.playerRushingName[1].indexOf(name);
	if (index != -1) {
		var s = stats.playerRushingStats[1][index];
		var att = s[0];
		var y = s[1];
		//var td = s[?];
		
		output = att+" att, "+y.toFixed(0)+" yards";
		//if (td != 0) output += ", "+td+" td";
		//console.log(s);
	}
	return output;
}
function getReceivingString(stats, name) {
	var output = "&nbsp;";
	var index = stats.playerReceivingName[1].indexOf(name);
	if (index != -1) {
		var s = stats.playerReceivingStats[1][index];
		var tgt = s[1];
		var rec = s[0];
		var d = s[2];
		var y = s[3];
		//var td = s[?];
		
		output = "";
		if (tgt == rec) {
			output += rec+" rec, "+y.toFixed(0)+" yards";
		}
		else {
			output = tgt +" tgt";
			if (rec != 0) output += ", "+rec+" rec, "+y.toFixed(0)+" yards";
		}
		if (d != 0) output += ", "+d+" drop";
		//if (td != 0) output += ", "+td+" td";
		//console.log(s);
	}
	return output;
}
function getOffensiveLineString(stats, name) {
	return "&nbsp;";
}
function getDefensiveString(stats, name) {
	var output = "&nbsp;";
	var rush = stats.playerDefensiveRushName[0].indexOf(name);
	var pass = stats.playerDefensivePassName[0].indexOf(name);
	if (rush+pass != -2) {
		var tk=0; var miss=0; var stop=0; var dft=0; var pd=0;
		if (rush != -1) {
			tk += stats.playerDefensiveRushStats[0][rush][0];
			miss += stats.playerDefensiveRushStats[0][rush][1];
			stop += stats.playerDefensiveRushStats[0][rush][4];
			dft += stats.playerDefensiveRushStats[0][rush][5];
		}
		if (pass != -1) {
			tk += stats.playerDefensivePassStats[0][pass][0];
			miss += stats.playerDefensivePassStats[0][pass][1];
			stop += stats.playerDefensivePassStats[0][pass][4];
			dft += stats.playerDefensivePassStats[0][pass][5];
			pd += stats.playerDefensivePassStats[0][pass][7];
		}
		
		output = "";
		if (tk != 0) output += tk+" tkl";
		if (miss != 0) {
			if (output.length == 0) {
				output += "0 tkl";
			}
			output += ", "+miss+" miss";
		}
		if (stop != 0) output += ", "+stop+" stop";
		if (dft != 0) output += ", "+dft+" dft";
		if (pd != 0) {
			if (output.length != 0) {
				output += ", "+pd+" pd";
			}
			else {
				output += pd+" pd";
			}
		}
	}
	return output;
}
function getReturnString(stats, name, isKickRet) {
	var output = "&nbsp;";
	var rn = stats.playerKickReturnName;
	var rs = stats.playerKickReturnStats;
	if (isKickRet == false) {
		rn = stats.playerPuntReturnName;
		rs = stats.playerPuntReturnStats;
	}
	var index = rn[1].indexOf(name);
	
	if (index != -1) {
		var s = rs[1][index];
		var ret = s[0];
		var y = s[1];
		var td = s[3];
		
		output = ret+" ret, "+(y/ret).toFixed(1)+" avg";
		if (td != 0) output += ", "+td+" td";
		//console.log(s);
	}
	return output;
}
function getDefensiveSTString(stats, name) {
	var output = "&nbsp;";
	var index = stats.playerDefensiveSTName[0].indexOf(name);

	if (index != -1) {
		var tk = stats.playerDefensiveSTStats[0][index][0];
		var miss = stats.playerDefensiveSTStats[0][index][1];
			
		output = "";
		if (tk != 0) output += tk+" tkl";
		if (miss != 0) {
			if (output.length == 0) {
				output += "0 tkl";
			}
			output += ", "+miss+" miss";
		}
	}
	return output;
}
function getKickingString(stats, name) {
	var output = "&nbsp;";
	var index = stats.playerKickingName[0].indexOf(name);

	if (index != -1) {
		var k = stats.playerKickingStats[0][index][0];
		var y = stats.playerKickingStats[0][index][1];
		var tb = stats.playerKickingStats[0][index][3];
		
		output = "";
		if (k != 0) output += k+" att, "+(y/k).toFixed(1)+" avg";
		if (tb != 0) output += ", "+tb+" tb";
	}
	return output;
}
function getPuntingString(stats, name) {
	var output = "&nbsp;";
	console.log(stats.playerPuntingName[0]);
	console.log(stats.playerPuntingName[1]);
	var index = stats.playerPuntingName[0].indexOf(name);

	if (index != -1) {
		var p = stats.playerPuntingStats[0][index][0];
		var y = stats.playerPuntingStats[0][index][1];
		var tb = stats.playerPuntingStats[0][index][3];
		var in20 = stats.playerPuntingStats[0][index][4];
		
		output = "";
		if (p != 0) output += p+" att, "+(y/p).toFixed(1)+" avg";
		if (tb != 0) output += ", "+tb+" tb";
		if (in20 != 0) output += ", "+in20+" in 20";
	}
	return output;
}

function restructurePage() {



	var div = document.createElement("div");
	div.setAttribute("id","restructure");
	
	var banner = document.createElement("div");
	banner.setAttribute("style","width:74%;height:80px;margin-left:auto;margin-right:auto;");
	
	var left = document.createElement("div");
	left.setAttribute("style","position:absolute;left:0px;width:250px;border:1px solid #000000;text-align:left;");
	left.setAttribute("class","content_container");
	
	var center = document.createElement("div");
	center.setAttribute("style","margin-left:249px;margin-right:250px;");
	
	var right = document.createElement("div");
	right.setAttribute("style","position:absolute;right:0px;width:250px;border:1px solid #000000;text-align:left;");
	right.setAttribute("class","content_container");
	
	var replay = document.getElementById("replay");
	var btn = document.getElementsByClassName("prev_next")[0];
	btn.setAttribute("class","");
	btn.setAttribute("id","button_panel");
	btn.setAttribute("style","margin-left:25px;");
	
	var teams = document.getElementsByClassName("team");
	left.appendChild(teams[0].parentNode.removeChild(teams[0]));
	var teams = document.getElementsByClassName("team");
	right.appendChild(teams[0].parentNode.removeChild(teams[0]));
	
	var content = document.getElementById("content");
	content.appendChild(div);

	var info = document.getElementById("replay_info");
	var p = info.getElementsByClassName("small_head play");
	var dnd = p[0];
	var dsc = p[1];
	dnd.setAttribute("style","text-align:center;");
	dsc.setAttribute("style","text-align:center;visibility:collapse;");
	replay.insertBefore(dsc,replay.firstChild);
	replay.insertBefore(dnd,replay.firstChild);
	
	div.appendChild(banner);
	div.appendChild(left);
	center.appendChild(btn);
	center.appendChild(replay.parentNode.removeChild(replay));
	center.appendChild(info);
	div.appendChild(center);
	div.appendChild(right);	
}

function handleFieldGoal(play) {
	unsafeWindow.pause();
	unsafeWindow.currentFrame = 0;
	unsafeWindow.play_data = [unsafeWindow.play_data[0]];
	unsafeWindow.resetPlay();
	unsafeWindow.play();
		//unsafeWindow.initialize();
		
	var p = plays[play];
	var shp = document.getElementsByClassName("small_head play");
	shp[0].innerHTML = p.timeRemaining+" "+p.down+" & "+p.togo+" on "+p.marker;
	shp[1].innerHTML = p.play;
}

function input(evt) {
	evt.target.innerHTML = "Loading .";
	var id = evt.target.parentNode.getAttribute("id")+"";
	lastPlay = currentPlay;
	currentPlay = parseFloat(id);
	
	if (currentPlay == plays.length) {
		currentPlay--;
		assignButtons();
		return;
	}
	
	var address = plays[currentPlay].replay+"";
	
	if (address == "[object XPCNativeWrapper [object Text]]") {
		if (evt.target.innerHTML.match("Prev") != null) {
			handleFieldGoal(currentPlay);
		}
		else {
			handleFieldGoal(currentPlay);
		}
		assignButtons();
	}
	else {
		getInetPage(address,change, evt.target);
	}
}

function assignButtons() {

	function getButton(name,id) {
		var div = document.createElement("div");
		var a = document.createElement("a");
		a.innerHTML = name;
		div.setAttribute("class","tab");
		div.setAttribute("id",id);
		div.addEventListener("click",input,true);
		div.appendChild(a);
		if ((id >= plays.length) || (id == currentPlay) || (id < 0)) {
			var s = div.getAttribute("style");
			if (s == null) s = "";
			div.setAttribute("style","visibility:hidden;"+s);
		}
		return div;
	}
	
	var nextButton = null;
	var prevButton = null;
	
	var buttons = document.getElementsByClassName("tab");
	while (buttons.length != 0) {
		buttons[0].parentNode.removeChild(buttons[0]);
		buttons = document.getElementsByClassName("tab");
	}
	var saved = autoplay;
	var check = document.getElementById("autoplay");
	if (check != null) {
		console.log("!"+check);
		saved = check.checked;
		console.log("@"+saved);
		check.parentNode.removeChild(check);
	}
		
	var prevPossButton = getButton("< Prev Poss",findPoss(currentPlay,-99));
	var prevButton = getButton("< Prev Play",currentPlay-1);
	var nextButton = getButton("Next Play >",currentPlay+1);
	var nextPossButton = getButton("Next Poss >",findPoss(currentPlay,99));
	var autoplayBox = document.createElement("input");
	autoplayBox.setAttribute("id","autoplay");
	autoplayBox.setAttribute("type","checkbox");
	autoplayBox.checked = saved;
	
	var buttonPanel = document.getElementById("button_panel");
	buttonPanel.appendChild(prevPossButton);
	buttonPanel.appendChild(prevButton);
	buttonPanel.appendChild(nextButton);
	buttonPanel.appendChild(nextPossButton);
	buttonPanel.appendChild(autoplayBox);
}

function findPoss(idx, direction) {
	var play = plays[idx];
	var currTeam = play.team;
	
	if (direction > 0) {
		for (var i=idx+1; i<plays.length; i++) {
			if (plays[i].team != currTeam) {
				return i;
			}
		}
		return idx;
	}
	else if (direction < 0) {
		var i = idx;
		//console.log("curr="+plays[i]);
		for (i=i; i>0; i--) {
			if (plays[i].team != currTeam) {
				//console.log("prev1="+plays[i]);
				break;
			}
		}
		for (i=i-1; i>0; i--) {
			if (plays[i].team == currTeam) {
				//console.log("prev2="+plays[i+1]);
				return i+1;
			}
		}
		return 0;
	}
	return 0;
}



function changeInfo(page) {
	var div = document.createElement("div");
	div.innerHTML = page.responseText;
	
	var newteams = div.getElementsByClassName("team");
	var teams = document.getElementsByClassName("team");
	teams[0].innerHTML = newteams[0].innerHTML;
	teams[1].innerHTML = newteams[1].innerHTML;
	
	var newinfo = div.getElementsByClassName("small_head play")
	var info = document.getElementsByClassName("small_head play")
	info[0].innerHTML = newinfo[0].innerHTML+"&nbsp;&nbsp;";
	info[1].setAttribute("style","text-align:center;visibility:collapse;");
	info[1].innerHTML = newinfo[1].innerHTML;

	var link = document.getElementById("pbrlink");
	if (link != null) {
		link.parentNode.removeChild(link);
	}
	link = document.createElement("a");
	link.id = "pbrlink";
	link.innerHTML = "(link)";
	link.href = plays[currentPlay].replay;
	info[0].appendChild(link);
}



function changePlays(page) {
	var temp = [];
	temp.responseText = document.getElementsByTagName("body")[0].innerHTML; 
	changeInfo(temp);
	
	var idx = page.responseText.indexOf("var players =");
	if (idx != -1) {
		var p = page.responseText.slice(idx+"var players =".length);
		p = p.slice(0,p.indexOf(";"));
		var pd = page.responseText.slice(page.responseText.indexOf("var play_data =")+"var play_data =".length);
		pd = pd.slice(0,pd.indexOf(";"));
		
		var newplayers = null;
		var newplay_data = null;
		eval("newplayers = "+p);
		newplay_data = eval(pd);
		
		unsafeWindow.pause();
		if (newplayers != null) unsafeWindow.players = newplayers;
		if (newplay_data != null) unsafeWindow.play_data = newplay_data;
		
		unsafeWindow.currentFrame = 0;	
		unsafeWindow.initialize();
		unsafeWindow.resetPlay();
		unsafeWindow.updateFrame();
		
		runOtherScripts();
		setTimeout(beginPlay,preDelay);
	}
	else {
		console.log(page+" is not a good page");
		unsafeWindow.pause();
	}
	
	{
	if(document.getElementById('528508')){document.getElementById('528508').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=FD01.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/FD01.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('562593')){document.getElementById('562593').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=FD04.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/FD04.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('660154')){document.getElementById('660154').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=FD11.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/FD11.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('596722')){document.getElementById('596722').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=FD21.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/FD21.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('569140')){document.getElementById('569140').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=FD23.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/FD23.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('411639')){document.getElementById('411639').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=FD27.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/FD27.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('492298')){document.getElementById('492298').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=FD28.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/FD28.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('568699')){document.getElementById('568699').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=FD29.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/FD29.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('594775')){document.getElementById('594775').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=FD31.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/FD31.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('80331')){document.getElementById('80331').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=FD32.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/FD32.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('597135')){document.getElementById('597135').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=FD33.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/FD33.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('547140')){document.getElementById('547140').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=FD40.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/FD40.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('613078')){document.getElementById('613078').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=FD41.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/FD41.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('599788')){document.getElementById('599788').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=FD42.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/FD42.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('475138')){document.getElementById('475138').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=FD43.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/FD43.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('613124')){document.getElementById('613124').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=FD44.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/FD44.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('660046')){document.getElementById('660046').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=FD45.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/FD45.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('492728')){document.getElementById('492728').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=FD47.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/FD47.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('445308')){document.getElementById('445308').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=FD51.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/FD51.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('134682')){document.getElementById('134682').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=FD52.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/FD52.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('597594')){document.getElementById('597594').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=FD53.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/FD53.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('596310')){document.getElementById('596310').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=FD54.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/FD54.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('407822')){document.getElementById('407822').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=FD55.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/FD55.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('569081')){document.getElementById('569081').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=FD56.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/FD56.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('660391')){document.getElementById('660391').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=FD57.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/FD57.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('546443')){document.getElementById('546443').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=FD58.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/FD58.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('492437')){document.getElementById('492437').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=FD59.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/FD59.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('546449')){document.getElementById('546449').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=FD60.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/FD60.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('546461')){document.getElementById('546461').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=FD61.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/FD61.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('546466')){document.getElementById('546466').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=FD62.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/FD62.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('660198')){document.getElementById('660198').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=FD63.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/FD63.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('614380')){document.getElementById('614380').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=FD64.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/FD64.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('648543')){document.getElementById('648543').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=FD65.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/FD65.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('361848')){document.getElementById('361848').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=FD66.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/FD66.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('653646')){document.getElementById('653646').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=FD68.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/FD68.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('342552')){document.getElementById('342552').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=FD69.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/FD69.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('664169')){document.getElementById('664169').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=FD72.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/FD72.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('623998')){document.getElementById('623998').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=FD73.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/FD73.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('681709')){document.getElementById('681709').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=FD74.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/FD74.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('681689')){document.getElementById('681689').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=FD76.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/FD76.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('332025')){document.getElementById('332025').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=FD80.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/FD80.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('625964')){document.getElementById('625964').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=FD82.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/FD82.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('497560')){document.getElementById('497560').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=FD84.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/FD84.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('596867')){document.getElementById('596867').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=FD85.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/FD85.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('290745')){document.getElementById('290745').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=FD87.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/FD87.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('477845')){document.getElementById('477845').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=FD88.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/FD88.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('604851')){document.getElementById('604851').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=FD89.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/FD89.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('628865')){document.getElementById('628865').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=FD91.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/FD91.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('406539')){document.getElementById('406539').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=FD94.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/FD94.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('464489')){document.getElementById('464489').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=FD99.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/FD99.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('506997')){document.getElementById('506997').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=BB01.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/BB01.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('172709')){document.getElementById('172709').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=BB02.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/BB02.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('410441')){document.getElementById('410441').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=BB12.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/BB12.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('596842')){document.getElementById('596842').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=BB13.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/BB13.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('529256')){document.getElementById('529256').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=BB15.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/BB15.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('676835')){document.getElementById('676835').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=BB17.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/BB17.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('629430')){document.getElementById('629430').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=BB20.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/BB20.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('514423')){document.getElementById('514423').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=BB21.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/BB21.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('442046')){document.getElementById('442046').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=BB22.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/BB22.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('675143')){document.getElementById('675143').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=BB23.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/BB23.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('319588')){document.getElementById('319588').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=BB24.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/BB24.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('413419')){document.getElementById('413419').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=BB29.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/BB29.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('433353')){document.getElementById('433353').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=BB31.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/BB31.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('531145')){document.getElementById('531145').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=BB32.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/BB32.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('650596')){document.getElementById('650596').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=BB42.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/BB42.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('50097')){document.getElementById('50097').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=BB43.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/BB43.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('796128')){document.getElementById('796128').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=BB48.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/BB48.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('796127')){document.getElementById('796127').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=BB49.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/BB49.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('567808')){document.getElementById('567808').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=BB50.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/BB50.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('796137')){document.getElementById('796137').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=BB52.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/BB52.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('796140')){document.getElementById('796140').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=BB54.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/BB54.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('789938')){document.getElementById('789938').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=BB56.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/BB56.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('789948')){document.getElementById('789948').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=BB57.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/BB57.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('289398')){document.getElementById('289398').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=BB61.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/BB61.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('499387')){document.getElementById('499387').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=BB63.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/BB63.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('476843')){document.getElementById('476843').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=BB65.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/BB65.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('700871')){document.getElementById('700871').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=BB68.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/BB68.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('666732')){document.getElementById('666732').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=BB69.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/BB69.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('796211')){document.getElementById('796211').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=BB70.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/BB70.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('796210')){document.getElementById('796210').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=BB71.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/BB71.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('795564')){document.getElementById('795564').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=BB72.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/BB72.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('795574')){document.getElementById('795574').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=BB73.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/BB73.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('763294')){document.getElementById('763294').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=BB79.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/BB79.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('512334')){document.getElementById('512334').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=BB81.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/BB81.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('796083')){document.getElementById('796083').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=BB83.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/BB83.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('516733')){document.getElementById('516733').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=BB85.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/BB85.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('390933')){document.getElementById('390933').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=BB88.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/BB88.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('619236')){document.getElementById('619236').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=BB90.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/BB90.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('795961')){document.getElementById('795961').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=BB91.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/BB91.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('804355')){document.getElementById('804355').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=BB92.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/BB92.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('796066')){document.getElementById('796066').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=BB93.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/BB93.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('546435')){document.getElementById('546435').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=BB94.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/BB94.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('461672')){document.getElementById('461672').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=BB96.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/BB96.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('581543')){document.getElementById('581543').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=BB97.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/BB97.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('548963')){document.getElementById('548963').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=BB98.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/BB98.gif" border="0" alt="Photobucket"></a>';}
	if(document.getElementById('621759')){document.getElementById('621759').innerHTML = '<img src="<a href="http://s523.photobucket.com/albums/w355/bubbas73/?action=view&current=BB99.gif" target="_blank"><img src="http://i523.photobucket.com/albums/w355/bubbas73/BB99.gif" border="0" alt="Photobucket"></a>';}
}
	
}

function beginPlay() {
    runOtherScripts();
	unsafeWindow.play();
}



function playIsFinished() {
	if (document.getElementById("autoplay").checked == false) {
		console.log("autoplay is false, restarting play");
		unsafeWindow.currentFrame = 0;	
		unsafeWindow.initialize();
		unsafeWindow.resetPlay();
		unsafeWindow.updateFrame();
		beginPlay();
	}
	else {
        var buttons = document.getElementsByClassName("tab");
		for each (var b in buttons) {
            if(b.innerHTML.indexOf("Next Play")!=-1) {
            	var evt = [];
            	evt.target = b.firstChild;
            	input(evt);
            }
		}
	}
	playDone = false;
}

function isPlayFinished() {	
	if (playDone == true) {
		playDone = false;
		setTimeout(playIsFinished,postDelay);
	}
}

function drawBall() {
	var playerId = null;
	var pd = unsafeWindow.play_data;
	var frame = unsafeWindow.currentFrame;
	var b = pd[frame][0];
	
	for (var i=0; i<pd[frame].length; i++) {
		var p = pd[frame][i];
		if ((p.x == b.x) && (p.y == b.y)) {
			playerId = p.id;
		}
	}

	if (playerId != null) {
		var found = false;
		var el = document.getElementById("pbrball");
		for each (var l in document.links) {			
			var s = "player_id="+playerId;
			if ((l+"").indexOf(s) != -1) {
				if (el != null) {
					if (el.parentNode.innerHTML.indexOf('player_id="'+playerId+'"') != -1) {
						found = true;
						break;
					}
					else {
						el.parentNode.removeChild(el);
					}
				}
				var div = document.createElement('div');
				div.id = 'pbrball';
				div.className = 'player_icon';
				div.innerHTML = '<img src="/images/ball.gif">';
				l.parentNode.parentNode.insertBefore(div, l.parentNode.parentNode.firstChild);
				found = true;
				break;
			}
		}
		if (found == false) {
			if (el != null) {
				el.parentNode.removeChild(el);
			}
		}
	}
}

unsafeWindow.positionFrame = function () {
	var ball = unsafeWindow.$('ball');
	
	var y_spot = parseInt(ball.style.top);
	if (y_spot <= 200) {
		unsafeWindow.$('replay_area').style.top = '0px';
	}
	else if (y_spot >= 880) {
		unsafeWindow.$('replay_area').style.top = '-680px';
	}
	else {
		unsafeWindow.$('replay_area').style.top = '-' + (y_spot - 200) + 'px';
	}
}

unsafeWindow.nextFrame = function () {	
	drawBall();
	unsafeWindow.currentFrame++;
	if (unsafeWindow.currentFrame < unsafeWindow.play_data.length) {
		unsafeWindow.updateFrame();
	}
	else {
		unsafeWindow.pause();
		playDone = true;
		var p = document.getElementsByClassName("play");
		p[1].setAttribute("style","text-align:center;");
	}
}

function runOtherScripts() {
	if (highlightPlayers == true) {
		// highlight my players
		pbr_replay_highlight_main();
	}

	//needed for first down marker
	var play_data = unsafeWindow.play_data;
	var currentFrame = unsafeWindow.currentFrame;
	
	// ------- copied from GLB javascript, originally by tciss -------------------
	var play_container = document.getElementById("replay_area");
	var dirt = document.getElementsByClassName("play");
	var dir = dirt[0];
	var dirText = dir.innerHTML;
	var ytg = "";
	if(dirText.indexOf(" inches ")!=-1) {
		var ytg = '.3';
	}
	else {   
		if(dirText.indexOf(" G on ")!=-1) {
			// later
		}
		else {
			var p2 = dirText.indexOf(" &amp; ")+7;
			var p1 = dirText.indexOf(" on ");
			var ytg = dirText.substring(p2,p1);
		}
	}
	var dy = parseFloat(ytg)*9;
	if(parseFloat(play_data[currentFrame][1].y) > parseFloat(play_data[currentFrame][0].y)) {
		var fp = parseFloat(play_data[currentFrame][0].y) * 3+12;
		if(dirText.indexOf(" G on ")!=-1) {
			// later
		}
		else {
			var ltg = (parseFloat(fp) + parseFloat(dy));
			var div = document.createElement('div');
			div.id = 'ds';
			div.className = 'player_icon';
			play_container.appendChild(div);
			div.style.top  = (ltg) + 'px'; 
			div.style.width = '520px';
			div.style.height = '2px';
			div.style.backgroundColor = 'yellow';
			div.style.zIndex = 0;
		}
	}
	else {
		var fp = parseFloat(play_data[currentFrame][0].y) * 3-18;
		if(dirText.indexOf("G on ")!=-1) {
			// later
		}
		else {
			var ltg = (parseFloat(fp) - parseFloat(dy));
			var div = document.createElement('div');
			div.id = 'ds';
			div.className = 'player_icon';
			play_container.appendChild(div);
			div.style.top  = (ltg) + 'px';
			div.style.width = '520px';
			div.style.height = '2px';
			div.style.backgroundColor = 'yellow';
			div.style.zIndex = 0;
		}
	}
	// ----------------- end -------------------
}

function change(address, page) {
	assignButtons();
	changeInfo(page);	
	changePlays(page);
	updateScoreboard();
}

function pbp() {
	var href = window.location.toString();
	href = href.replace("replay.pl","game.pl");
	
	var idx = href.indexOf("&pbp_id");
	href = href.slice(0,idx) + "&mode=pbp";

	getInetPage(href,pbpHandler);
}

function rangeCheck(arr, i) {
	if (i < 0) return false;
	if (i >= arr.length) return false;
	return true;
}

function pbpHandler(address, page) {
	var prev = null;
	var next = null;
	loadPBP(page);
	
	for (var i=0; i<plays.length-1; i++) {
		if (plays[i].replay == window.location.href) {
			currentPlay = i;
			break;
		}
	}
	loadScoreboard(page);
	updateScoreboard();
	assignButtons(currentPlay-1, currentPlay+1);

	var clr = document.getElementsByClassName("clear");
	for each (var c in clr) {
		if (c == null) continue;
		c.parentNode.removeChild(c);
	}
	var p = eval(page);
	p.responseText = document.getElementsByTagName("body")[0].innerHTML;
	changePlays(p);
}

function updateScoreboard() {
	var last = lastPlay;
	var curr = currentPlay;
	
	var p = plays[curr];
	
	var thisQuarter = document.getElementById("sb: "+(p.quarter-1)+" "+p.team);
	var qscore = parseFloat(thisQuarter.innerHTML);
	if (isNaN(qscore) == true) qscore = 0;
	
	var thisTotal = document.getElementById("sb: 5 "+p.team);
	var tscore = parseFloat(thisTotal.innerHTML);
	if (isNaN(tscore) == true) tscore = 0;
	
	var count = (curr-last)/Math.abs(curr-last);
	for (var i=Math.max(0,last); i!=curr; i+=count) {
		var play = plays[i];
		
		var thisQuarter = document.getElementById("sb: "+(play.quarter-1)+" "+play.team);
		if (thisQuarter.innerHTML == "-") thisQuarter.innerHTML = 0;

		var thisTotal = document.getElementById("sb: 5 "+play.team);
		if (thisTotal.innerHTML == "-") thisTotal.innerHTML = 0;
		
		if (play.score != 0) {
			var qscore = parseFloat(thisQuarter.innerHTML);
			if (isNaN(qscore) == true) qscore = 0;
			qscore += play.score*count;
			thisQuarter.innerHTML = qscore;
			
			var tscore = parseFloat(thisTotal.innerHTML);
			if (isNaN(tscore) == true) tscore = 0;
			tscore += play.score*count;
			thisTotal.innerHTML = tscore;
		}
	}

	var clock = document.getElementsByClassName("clock");
	var shp = document.getElementsByClassName("small_head play");
	var t = shp[0].innerHTML;
	clock[1].innerHTML = t.split(" ")[0];
	
	restructureInfo();
}

function loadScoreboard(page) {
	var div = document.createElement("div");
	div.innerHTML = page.responseText;

	var css = document.createElement("link");
	css.setAttribute("href","/css/game/game.css");
	css.setAttribute("type","text/css");
	css.setAttribute("rel","stylesheet");
	var head = document.getElementsByTagName("head");
	head[0].appendChild(css);
	
	var scoreboard = findChild("scoreboard",div);
	var d = document.createElement("div");
	d.setAttribute("id","scoreboard");

	//fix scores
	var quarters = scoreboard.getElementsByClassName("quarter");
	for (var i=0; i<quarters.length; i++) {
		var q = quarters[i];
		var parent = q.parentNode;
		var tm = parent.getElementsByClassName("team_name");
		tm = tm[0].firstChild.innerHTML;
		if (q.parentNode.className.indexOf("alternating_color") == 0) {
			q.innerHTML = "-";
			q.setAttribute("id","sb: "+(i%5)+" "+tm);
		}
	}	
	var totals = scoreboard.getElementsByClassName("total");
	for (var i=0; i<totals.length; i++) {
		var t = totals[i];
		var parent = t.parentNode;
		var tm = parent.getElementsByClassName("team_name");
		tm = tm[0].firstChild.innerHTML;
		if (t.parentNode.className.indexOf("alternating_color") == 0) {
			t.innerHTML = "-";
			t.setAttribute("id","sb: 5 "+tm);
		}
	}
	d.innerHTML = scoreboard.innerHTML;

	var parent = document.getElementById("restructure");
	parent.firstChild.appendChild(d);	
}

function loadPBP(page) {
	var quarter = 0;
	var p = null;
	var team;
	plays = [];
	
	var div = document.createElement("div");
	div.innerHTML = page.responseText;
	var pbpTable = findChild("play_by_play_table",div);
	if (pbpTable == null) {
		console.log("pbpTable is null. exiting.");
		return;
	}
	   
	for each (htmlTableRowElement in pbpTable.rows) {
		var className = htmlTableRowElement.className;
		if (className == null) {
			continue;
		}
		if (className.match("pbp_quarter") != null) {
			quarter++;
		}
		else if (className.match("pbp_team") != null) {
			var coll = htmlTableRowElement.cells;
			var node = coll.item(0);
			var idx = 0;
			do {
				var s = node.innerHTML.slice(idx,node.innerHTML.length);
				var i = s.indexOf(" ");
				if (i != -1) idx += i + 1;
			} 
			while (i != -1);
			team = node.innerHTML.slice(0,idx-1);
		}
		else if (className.match("pbp_play_row") != null) {
			p = new Play();
			p.quarter = quarter;
			p.team = team;

			var coll = htmlTableRowElement.cells;
			for each (node in coll) {
				var cName = node.className;
				if (cName.match("pbp_time_remaining") != null) {
					p.timeRemaining = node.innerHTML;
				}
				else if (cName.match("pbp_marker") != null) {
					p.marker = node.innerHTML;
				}
				else if (cName.match("pbp_down") != null) {
					p.down = node.innerHTML.slice(0,1);
					p.togo = node.innerHTML.slice(node.innerHTML.indexOf("amp; ")+5);
				}
				else if (cName.match("pbp_replay") != null) {
					p.replay = node.firstChild;
				}
				else if (cName.match("pbp_play") != null) {
					p.play = node.firstChild.data;
					
					var playText = p.play;
					if (playText.indexOf("made [FG]") != -1) p.score = 3;
					else if (playText.indexOf("[TD]") != -1) p.score = 6;
					else if (playText.indexOf("[Safety]") != -1) p.score = 2;
					else p.score = 0;
					if (playText.indexOf(", PAT made by ") != -1) p.score += 1;
				}
			}
			plays.push(p);
		}
	}	
	console.log(plays.length);
}
	
function Play() {
	this.quarter;
	this.team;
	this.timeRemaining;
	this.marker;
	this.down;
	this.togo;
	this.play;
	this.replay;
	this.yards;
	this.score;
	this.toString = function() {
		return this.quarter+" : "+this.team+" - "+this.timeRemaining+" - "+
		this.marker+" - "+this.down+"&"+this.togo;
	}
}




























//---------------------------------- start game scout code ---------------------------------


/*
*
* based on code by tciss from www.goallineblitz.com
* pabst modified it 6/22/08+
*
*/


var showEverything = false;
var longPass = 15;
var mediumPass = 7.5;
var shortPass = 0;

var links = [];
var checkBoxes = [];
var storageStats;
var storageArr;

function fixEscapedText(str) {
	var s = str;
	while (s.indexOf('"') != -1) {
		s = s.replace('"',"&quot;");
	}
	while (s.indexOf("'") != -1) {
		s = s.replace("'","&#39;");
	}
	return s;
}

function trim(str) {
	var s = str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	return s.replace(/\n/," ");
}
//------------ end box score loading ------------------------



//------------ game scout start -----------------------------
function Stats() {
	this.team_name = [];
	this.team_possession = [0,0,0,0,0,0,0,0,0,0,0,0];
	this.team_penalty    = [0,0,0,0,0,0,0,0,0,0,0,0];
	
	this.team_att     = [0,0,0,0,0,0,0,0,0,0];
	this.team_yards   = [0,0,0,0,0,0,0,0,0,0];
	this.team_success = [0,0,0,0,0,0,0,0,0,0];
	this.team_firsts  = [0,0,0,0,0,0,0,0,0,0];

	this.team_pass_att    = [0,0,0,0,0,0];
	this.team_pass_comp   = [0,0,0,0,0,0];
	this.team_pass_yards  = [0,0,0,0,0,0];
	this.team_pass_firsts = [0,0,0,0,0,0];

	this.team_att_down     = [0,0,0,0,0,0,0,0];
	this.team_yards_down   = [0,0,0,0,0,0,0,0];
	this.team_success_down = [0,0,0,0,0,0,0,0];
	this.team_firsts_down  = [0,0,0,0,0,0,0,0];

	this.team_pass_att_down    = [0,0,0,0,0,0,0,0];
	this.team_pass_comp_down   = [0,0,0,0,0,0,0,0];
	this.team_pass_yards_down  = [0,0,0,0,0,0,0,0];
	this.team_pass_firsts_down = [0,0,0,0,0,0,0,0];

	this.team_quarter_totals = new Array(6);
	for (var i=0; i<6; i++) {
		this.team_quarter_totals[i] = [0,0,0,0,0,0,0,0,0,0,0,0];
	}

	this.playerRushingName = [[],[]];
	this.playerRushingStats = [[],[]];   //[att,yard,long,succ,fd]
	this.playerRushingStatsCombine = [true,true,false,true,true];

	this.playerPassingName = [[],[]];
	this.playerPassingStats = [[],[]];   //[comp,att,yard,td,int,pd,drop]
	this.playerPassingStatsCombine = [true,true,true,true,true,true,true];

	this.playerReceivingName = [[],[]];
	this.playerReceivingStats = [[],[]]; //[comp,att,drop,yard,long,yac,pd,fd]
	this.playerReceivingStatsCombine = [true,true,true,true,false,true,true,true];

	this.playerDefensiveName = [[],[]];
	this.playerDefensiveStats = [[],[]]; //[tot,rtack,rmiss,ptack,pmiss,sttack,stmiss]
	this.playerDefensiveStatsCombine = [true,true,true,true,true,true,true];

	this.playerDefensiveRushName = [[],[]];
	this.playerDefensiveRushStats = [[],[]]; //tack,miss,yards,ff,stop,defeat
	this.playerDefensivePassName = [[],[]];
	this.playerDefensivePassStats = [[],[]]; //tack,miss,yards,ff,stop,defeat,int,pd
	this.playerDefensiveSTName = [[],[]];
	this.playerDefensiveSTStats = [[],[]];   //tack,miss,yards,ff
	
	this.playerKickingName = [[],[]];
	this.playerKickingStats = [[],[]];   //[ko,yards,long,tb]
	this.playerKickingStatsCombine = [true,true,false,true];

	this.playerPuntingName = [[],[]];
	this.playerPuntingStats = [[],[]];   //[p,yards,long,tb,in20]
	this.playerPuntingStatsCombine = [true,true,false,true,true];

	this.playerKickReturnStats = [[],[]];
	this.playerKickReturnName = [[],[]]; //[kr,yards,long,td]
	this.playerKickReturnStatsCombine = [true,true,false,true];

	this.playerPuntReturnStats = [[],[]]; 
	this.playerPuntReturnName = [[],[]]; //[pr,yards,long,td]
	this.playerPuntReturnStatsCombine = [true,true,false,true];

	this.playerPenaltyName = [[],[]];
	this.playerPenaltyStats = [[],[]];   //[false start, offsides, encroachment]
	this.playerPenaltyStatsCombine = [true,true,true];
	
	this.distanceStats = new Array(4);
	for (var i=0; i<4; i++) {
		this.distanceStats[i]=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; 
		//>0cay - >5cay - >15cay
	}

	this.driveList = [[],[]];
}


//---------------------------------------------------------------------

function arraySum(arr,start) {
	var total = 0;
	for (var i=start; i<arr.length; i++) {
		total += arr[i];
	}
	return total;
}

function arrayPush(ct, arr1, data1, arr2, data2) {
	if (arr1 == null) console.log("arr1 is null");
	if (arr1[ct] == null) console.log("arr["+ct+"] is null");
	//console.log("ap arr1["+ct+"]--> "+arr1[ct]);
 var d = trim(data1);
	var index = arr1[ct].indexOf(d);
	if (index == -1) {
		index = arr1[ct].length;
		arr1[ct].push(d);
		arr2[ct].push(data2);
	}
	return index;
}

function convertTime(s) {
	if (s == null) {
		console.log("convertTime == null");
		return 0;
	}
	var v = s.split(':');
	return parseFloat(v[0])*60 + parseFloat(v[1]);
}

function yardReverse(marker) {
	var y = parseFloat(marker.slice(4));
	if (marker.indexOf("OWN") == 0) return "OPP "+y;
	else return "OWN "+y;
}

function kickDistance(start, add) {
	if ((start == null) || (add == null)) return 0;
	var y = parseFloat(start.slice(4));
	if (start.slice(0,3) == "OPP") {
		y = 100-y;
	}
	y += add;
	if (y < 50) {
		y = "OWN "+y;
	}
	else {
		y = 100 - y;
		y = "OPP "+y;
	}
	return y;
}

function yardAddition(start, add) {
	if ((start == null) || (add == null)) return 0;
	var y = parseFloat(start.slice(4));
	if (start.slice(0,3) == "OPP") {
		y += 50;
	}
	y += add;
	if (y < 50) {
		y = "OWN "+y;
	}
	else {
		y = 100 - y;
		y = "OPP "+y;
	}
	//console.log(start+" - "+add+" : "+y);
	return y;
}

function yardDiff(start, end) {
	if ((start == null) || (end == null)) return 0;
	var starty = parseFloat(start.slice(4));
	var endy = parseFloat(end.slice(4));
	//console.log(starty+"--"+endy);
	var yards = -1000;
	if (start.slice(0,3) == "OWN") {
		if (end.slice(0,3) == "OWN") {
			yards = endy - starty;
		}
		else {
			yards = 100-endy-starty;
		}
	}
	else if (start.slice(0,3) == "OPP") {
		if (end.slice(0,3) == "OPP") {
			yards = starty - endy;
		}
		else {
			yards = starty+endy-100;
		}
	}
	return yards;
}

function Drive() {
	this.quarter;
	this.startTime;
	this.endTime;
	this.driveBegan;
	this.driveEnded;
	this.numOfPlays = 0;
	this.netYards = 0;
	this.result;

	this.toString = function() {
		return this.quarter+" : "+this.startTime+" : "+this.endTime+" : " +
		this.timePoss+" : "+this.driveBegan+" : " +
		this.driveEnded+" : "+this.numOfPlays+" : " +
		yardDiff(this.driveBegan,this.driveEnded) +
		" : "+this.result;
	}
}

function Play() {
	this.quarter;
	this.team;
	this.timeRemaining;
	this.marker;
	this.down;
	this.togo;
	this.play;
	this.replay;
	this.yards;
	
	this.toString = function() {
		return this.quarter+" : "+this.team+" - "+this.timeRemaining+" - "+
		this.marker+" - "+this.down+"&"+this.togo;
	}
}

function penaltyHandler(stats, p) {
	var playText = p.play;

	var s1 = playText.indexOf(" penalty committed by ")
	var s2 = s1 + (" penalty committed by ").length;
	
	var penalty = playText.slice(0,s1);
	var player = playText.slice(s2);
	
	if (penalty == "False start") {
		var ct = current_team;
		var playerIndex = arrayPush(ct,stats.playerPenaltyName,player,
				stats.playerPenaltyStats,[0,0,0]);
		stats.playerPenaltyStats[ct][playerIndex][0] += 1;
		stats.team_penalty[ct*6+0] += 1;
		stats.team_penalty[ct*6+(parseFloat(p.quarter))] += 1;
	}
	else if (penalty == "Offside") {
		var ct = (current_team+1)%2;
		var playerIndex = arrayPush(ct,stats.playerPenaltyName,player,
				stats.playerPenaltyStats,[0,0,0]);
		stats.playerPenaltyStats[ct][playerIndex][1] += 1;
		stats.team_penalty[ct*6+0] += 1;
		stats.team_penalty[ct*6+(parseFloat(p.quarter))] += 1;
	}
	else if (penalty == "Encroachment") {
		var ct = (current_team+1)%2;
		var playerIndex = arrayPush(ct,stats.playerPenaltyName,player,
				stats.playerPenaltyStats,[0,0,0]);
		stats.playerPenaltyStats[ct][playerIndex][2] += 1;
		stats.team_penalty[ct*6+0] += 1;
		stats.team_penalty[ct*6+(parseFloat(p.quarter))] += 1;
	}
	else {
		console.log("report this!!! ==>> unknown penalty : "+penalty);
	}	
	
	return stats;
}

function defenseHandler(stats, shift, p, playType) { //playText, playType) {
	//defenders
	var playText = p.play;
	var ct = (current_team+1)%2;
	var dt = false;
	var s1 = playText.indexOf("[tackle: ");		
	if (s1 == -1) {
		s1 = playText.indexOf("[diving tackle: ");
		dt = true;
	}
	if (s1 != -1) {
		if (dt == false) s1 += "[tackle: ".length;
		else s1 += "[diving tackle: ".length;

		var s2 = playText.slice(s1).indexOf("]");
		s = playText.slice(s1,s1+s2);
		//s = trim(s); //am I necessary?
		//console.log(s);
		
		var defeat = false;
		var stop = 0.45;
		if (p.down == 2) stop = 0.6;
		if (p.down > 2) {
			stop = 1.0;
			defeat = true;
		}
		if (playType == "rush") {
			var playerIndex = arrayPush(ct,stats.playerDefensiveRushName,s,
					stats.playerDefensiveRushStats,[0,0,0,0,0,0]);
			stats.playerDefensiveRushStats[ct][playerIndex][0] += 1;
			stats.playerDefensiveRushStats[ct][playerIndex][2] += p.yards;
			if (p.yards < (p.togo*stop)) {
				stats.playerDefensiveRushStats[ct][playerIndex][3] += 1;
				if ((defeat == true) || (p.yards < 0)) {
					stats.playerDefensiveRushStats[ct][playerIndex][4] += 1;
				}
			}
			//console.log(stats.playerDefensiveRushName[ct][playerIndex]+" -- "+stats.playerDefensiveRushStats[ct][playerIndex]+" : "+p.play);		
		}
		else if (playType == "pass") {
			var playerIndex = arrayPush(ct,stats.playerDefensivePassName,s,
					stats.playerDefensivePassStats,[0,0,0,0,0,0,0,0]);
			stats.playerDefensivePassStats[ct][playerIndex][0] += 1;
			stats.playerDefensivePassStats[ct][playerIndex][2] += p.yards;
			if (p.yards < (p.togo*stop)) {
				stats.playerDefensivePassStats[ct][playerIndex][3] += 1;
				if ((defeat == true) || (p.yards < 0)) {
					stats.playerDefensivePassStats[ct][playerIndex][4] += 1;
				}
			}
		}
		else if (playType == "st") {
			var playerIndex = arrayPush(ct,stats.playerDefensiveSTName,s,
					stats.playerDefensiveSTStats,[0,0,0,0]);
			stats.playerDefensiveSTStats[ct][playerIndex][0] += 1;
			stats.playerDefensiveSTStats[ct][playerIndex][2] += p.yards;
		}
		else console.log("defenseHandler says WTF?!?!");
	}

	var string = p.play+"";
	while ( (s1 = string.indexOf("[missed tackle: ")) != -1) {
		string = string.slice(s1+"[missed tackle: ".length);
		s2 = string.indexOf("]");
		s = string.slice(0,s2); 
		//s = trim(s); // am I necessary?

		if (playType == "rush") {
			var playerIndex = arrayPush(ct,stats.playerDefensiveRushName,s,
					stats.playerDefensiveRushStats,[0,0,0,0,0,0]);
			stats.playerDefensiveRushStats[ct][playerIndex][1] += 1;
		}
		else if (playType == "pass") {
			var playerIndex = arrayPush(ct,stats.playerDefensivePassName,s,
					stats.playerDefensivePassStats,[0,0,0,0,0,0,0,0]);
			stats.playerDefensivePassStats[ct][playerIndex][1] += 1;
		}
		else if (playType == "st") {
			var playerIndex = arrayPush(ct,stats.playerDefensiveSTName,s,
					stats.playerDefensiveSTStats,[0,0,0,0]);
			stats.playerDefensiveSTStats[ct][playerIndex][1] += 1;
		}
		else console.log("defenseHandler says WTF?!?!");
		
		string = string.slice(s2);
	}
	
	//forced fumble
	string = p.play+"";
	if ( (s1 = string.indexOf("[forced fumble: ")) != -1) {
		string = string.slice(s1+"[forced fumble: ".length);
		s2 = string.indexOf("]");
		s = string.slice(0,s2); 
		
		if (playType == "rush") {
			var playerIndex = arrayPush(ct,stats.playerDefensiveRushName,s,
					stats.playerDefensiveRushStats,[0,0,0,0,0,0]);
			stats.playerDefensiveRushStats[ct][playerIndex][5] += 1;
		}
		else if (playType == "pass") {
			var playerIndex = arrayPush(ct,stats.playerDefensivePassName,s,
					stats.playerDefensivePassStats,[0,0,0,0,0,0,0,0]);
			stats.playerDefensivePassStats[ct][playerIndex][5] += 1;
		}
		else if (playType == "st") {
			var playerIndex = arrayPush(ct,stats.playerDefensiveSTName,s,
					stats.playerDefensiveSTStats,[0,0,0,0]);
			stats.playerDefensiveSTStats[ct][playerIndex][3] += 1;
		}
		else console.log("defenseHandler says WTF?!?!");
	}
	if (playType == "pass") {
		/*
		//intercepted by
		string = p.play+"";
		if ( (s1 = string.indexOf(" intercepted by ")) != -1) {
			string = string.slice(s1+" intercepted by ".length);
			//s2 = string.indexOf("(");
			s2 = Math.min(string.indexOf("("),string.indexOf("["));
			if (string.indexOf(", PAT m") != -1) {
				s2 = Math.min(s2,string.indexOf(", PAT m"));
			}
			s = string.slice(0,s2); 
			s = trim(s);
			
			if (string.indexOf("yd return") != -1) {
				var playerIndex = arrayPush(ct,stats.playerDefensivePassName,s,
						stats.playerDefensivePassStats,[0,0,0,0,0,0,0,0]);
				stats.playerDefensivePassStats[ct][playerIndex][6] += 1;
			}
		}
		*/
		
		//deflected by
		string = p.play+"";
		while ( (s1 = string.indexOf("[deflected by ")) != -1) {
			string = string.slice(s1+"[deflected by ".length);
			s2 = string.indexOf("]");
			s = string.slice(0,s2); 
			//s = trim(s); // am I necessary?
	
			if (string.indexOf("(incomplete)") != -1) {
				var playerIndex = arrayPush(ct,stats.playerDefensivePassName,s,
						stats.playerDefensivePassStats,[0,0,0,0,0,0,0,0]);
				stats.playerDefensivePassStats[ct][playerIndex][7] += 1;
			}
			string = string.slice(s2);
		}
		
		string = p.play+"";
		if ( (s1 = string.indexOf(" sacked by ")) != -1) {
			string = string.slice(s1+" sacked by ".length);
			s2 = string.indexOf(" (");
			s = string.slice(0,s2); 
			
			if (p.yards < 0) {
				var playerIndex = arrayPush(ct,stats.playerDefensivePassName,s,
						stats.playerDefensivePassStats,[0,0,0,0,0,0,0,0]);
				stats.playerDefensivePassStats[ct][playerIndex][0] += 1;
				stats.playerDefensivePassStats[ct][playerIndex][2] += p.yards;
				stats.playerDefensivePassStats[ct][playerIndex][3] += 1;
				stats.playerDefensivePassStats[ct][playerIndex][4] += 1;
			}
			else console.log("DH: fuckup?");
		}		
	}
	return stats;
}


function playHandler(stats, drive,p) {
	//console.log("playHandler loop: "+pages+" - "+p.replay);
	//console.log(p);
	//console.log(p.play);
	var playText = p.play;
	playText = trim(playText);
	var quarter = parseFloat(p.quarter);
	var down = parseFloat(p.down);
	var togo = -1;
	var minGain = -1;

	if (p.team == stats.team_name[0]) current_team = 0;
	else current_team = 1;

	try {
		try {
			if (p.togo ==  null) {
				p.togo = -1;
			}
			else if (p.togo == "G") {
				togo = parseFloat(p.marker.slice(4));
			}
			else if (p.togo.indexOf("inches") != -1) {
				togo = 0.5;
			}
			else {
				togo = parseFloat(p.togo);
			}
		}
		catch (err) {
			//console.log(err);
			togo = 0.5;
		}
		if (down == 1) {
			minGain = togo*0.40;
		}
		else if (down == 2) {
			minGain = togo*0.60;
		}
		else {
			minGain = togo;
		}
		var sp = -1;
		var ep = -1;
		var y = NaN;
		var yt;

		var line = playText;
		do {
			//unfortunately, some people have parentheses in their names
			sp = line.indexOf('(')+1;
			ep = line.indexOf(')');
			if ((sp == -1) || (ep == -1)) {
				//no parentheses left in this line
				y = NaN;
				break;
			}
			else {
				//one complete set of parentheses found
				yt = line.slice(sp,ep);
				if (yt.indexOf("incomplete") != -1) {
					y = 0;
				}
				else if (yt.indexOf("no gain") != -1) {
					y = 0;
				}
				else {
					y = parseFloat(yt);
				}
				line = line.slice(ep+1);

				if(yt.indexOf(" yd gain") != -1) {
					//y = y;
				}
				else if(yt.indexOf(" yd loss") != -1) {
					y = -y;
				}
			}
		} while (isNaN(y) == true);
	}
	catch (error) {
		console.log(error);
	}
	p.yards = y;

	if (drive.numOfPlays == 0) {
		drive.driveBegan = null;
		drive.quarter = quarter;
		lastDrive.endTime = p.timeRemaining;
	}
	if (drive.startTime == null) {
		drive.startTime = p.timeRemaining;
	}
	if (drive.driveBegan == null) {
		drive.driveBegan = p.marker;
	}
	drive.endTime = p.timeRemaining;
	drive.driveEnded = p.marker; // fix me?
	drive.numOfPlays++;
	//console.log(drive+" -- "+playText.slice(0,30));


	if ((playText.match(" rush") != null) || (playText.match(" pitch to ") != null)) {
		//console.log("rush "+playText.slice(0,20));

		var inside = true;
		if (playText.match(" pitch to ") != null) {
			inside = false;
		}

		if ((yt.indexOf(" yd return") != -1) || (playText.indexOf("(touchback)") != -1)) {
			//must have been a fumble here
			//can't include without calculating the position
			//and still won't know the direction of the run
			if (drive.numOfPlays == 1) {
				lastDrive.result = "Fumble";
				lastDrive.numOfPlays += 1;
				if (lastDrive.driveBegan == null) {
					lastDrive.driveBegan = p.marker;
				}
				lastDrive.driveEnded = p.marker;
				lastDrive.endTime = p.timeRemaining;

				drive.numOfPlays = 0;
				if (playText.indexOf("[TD]") != -1) {
					drive.result = "Touchdown";
					drive.driveEnded = "OPP 0";
					drive.driveStarted = p.marker;
				}
			}
			// can't display this stuff as I don't know
			// which team recovered if the play was the
			// first play of a drive
			// stats = defenseHandler(stats,0,p,"rush");
		}	
		else if(playText.indexOf("[SAFETY]") != -1) {
			//must have been a safety here
			//and, of course, it's a possession for the wrong team
			//ignoring it for now as we don't know where the runner was tackled
			if (drive.numOfPlays == 1) {
				lastDrive.result = "Safety";
			}
			stats = defenseHandler(stats,0,p,"rush");
		}	
		else {
			// 0 - 1 - 2 - 3 - 4
			var index = current_team * 5;
			var r1 = -1;
			var r2 = -1;
			var s;
			if (inside == false) {
				if ( (r2 = playText.indexOf(" to the left")) != -1) {
					//index += 0;
				}
				else if( (r2 = playText.indexOf(" up the middle")) != -1) {
					// sometimes outside runs get stuffed immediately, so
					// I'm just calling it a middle run regardless
					index += 2; 
				}
				else if ( (r2 = playText.indexOf(" to the right")) != -1) {
					index += 4;
				}
				r3 = playText.indexOf("[missed");
				if (r3 != -1) {
					if (playText[r3-1] == ' ') r3--;
					r2 = Math.min(r2,r3);
				}
				r3 = playText.indexOf(", out of bounds ");
				if (r3 != -1) {
					if (playText[r3-1] == ' ') r3--;
					r2 = Math.min(r2,r3);
				}
				r1 = playText.slice(0,r2).indexOf(" pitch to ")+" pitch to ".length;
				s = playText.slice(r1,r2);
				if ( (r2 = s.indexOf(", PAT m")) != -1) {
					s = s.slice(0,r2);
				}
			}
			else {
				if ( (r2=playText.indexOf(" to the left")) != -1) {
					index += 1;
				}
				else if ( (r2=playText.indexOf(" up the middle")) != -1) {
					index += 2;
				}
				else if ( (r2=playText.indexOf(" to the right")) != -1) {
					index += 3;
				}
				r1 = 0;
				r2 = playText.indexOf(" rush");
				r3 = playText.indexOf("[missed");
				if (r3 != -1) r2 = Math.min(r2,r3);
				s = playText.slice(r1,r2);
			}

			var playerIndex = arrayPush(current_team,stats.playerRushingName,s,
					stats.playerRushingStats,[0,0,0,0,0]);
			stats.team_att[index] += 1;
			stats.team_yards[index] += y;

			stats.team_quarter_totals[0][0+current_team*6] += 1;
			stats.team_quarter_totals[0][1+current_team*6] += y;
			stats.team_quarter_totals[quarter][0+current_team*6] += 1;
			stats.team_quarter_totals[quarter][1+current_team*6] += y;

			stats.team_att_down[(down-1)+(current_team*4)] += 1;
			stats.team_yards_down[(down-1)+(current_team*4)] += y;

			stats.playerRushingStats[current_team][playerIndex][0] += 1;
			stats.playerRushingStats[current_team][playerIndex][1] += y;
			stats.playerRushingStats[current_team][playerIndex][2] =
				Math.max(stats.playerRushingStats[current_team][playerIndex][2],y);		
			if (y >= minGain) {
				stats.team_success[index] += 1;
				stats.team_success_down[(down-1)+(current_team*4)] += 1;

				stats.team_quarter_totals[0][2+current_team*6] += 1;
				stats.team_quarter_totals[quarter][2+current_team*6] += 1;

				stats.playerRushingStats[current_team][playerIndex][3] += 1;
			}
			if (y >= togo) {
				stats.team_firsts[index] += 1;
				stats.team_firsts_down[(down-1)+(current_team*4)] += 1;
				stats.playerRushingStats[current_team][playerIndex][4] += 1;
			}

			stats = defenseHandler(stats,0,p,"rush");

			if (playText.indexOf("[TD]") != -1) {
				drive.result = "Touchdown";
				drive.driveEnded = "OPP 0";
			}
		}
		//console.log((down-1)+" "+((down-1)+current_team*4)+" "+downs[down_index].innerHTML+" "+playText);
	}
	else if (playText.indexOf(" pass to ") != -1) {		
		var index = current_team * 3;
		var dindex;

		var p1 = playText.indexOf(" pass to ")+" pass to ".length;
		var p2;
		if (playText.indexOf(" up the left side") != -1) {
			//index += 0;
			dindex = 0;
			p2 = playText.indexOf(" up the left side");
		}
		else if(playText.indexOf(" over the middle") != -1) {
			index += 1;
			dindex = 1;
			p2 = playText.indexOf(" over the middle");
		}
		else if (playText.indexOf(" up the right side") != -1) {
			index += 2;
			dindex = 2;
			p2 = playText.indexOf(" up the right side");
		}

		var d = current_team*9 + dindex*3;

		var s = playText.slice(p1,p2);
		var h = s.indexOf(", hurried by");
		if (h != -1) {
			s = s.slice(0,h);
		}

		var qbn = playText.slice(0,playText.indexOf(" pass to"));
		var qbIndex = arrayPush(current_team,stats.playerPassingName,qbn,
				stats.playerPassingStats,[0,0,0,0,0,0,0]);

		var playerIndex = arrayPush(current_team,stats.playerReceivingName,s,
				stats.playerReceivingStats,[0,0,0,0,0,0,0,0]);
		
		if ((yt.indexOf(" yd return") != -1) || (playText.indexOf("(touchback)") != -1)) {
			// some sort of turnover
			if ((playText.indexOf(" intercepted by ") != -1) &&
					(playText.indexOf("fumbled , recovered by") == -1)) {
				//intercepted & not fumbled

				stats.team_pass_att[(index+3)%6] += 1;
				stats.team_pass_att_down[((down-1)+(current_team*4)+4)%8] += 1;

				stats.team_quarter_totals[0][4+((current_team*6)+6)%12] += 1;
				stats.team_quarter_totals[quarter][4+((current_team*6)+6)%12] += 1;

				stats.playerPassingName[current_team].pop();
				stats.playerPassingStats[current_team].pop();
				stats.playerReceivingName[current_team].pop();
				stats.playerReceivingStats[current_team].pop();
				current_team = (current_team+1)%2;                

				var qbIndex = arrayPush(current_team,stats.playerPassingName,qbn,
						stats.playerPassingStats,[0,0,0,0,0,0,0]);
				var playerIndex = arrayPush(current_team,stats.playerReceivingName,s,
						stats.playerReceivingStats,[0,0,0,0,0,0,0,0]);
				stats.playerPassingStats[current_team][qbIndex][1] += 1;   //att
				stats.playerReceivingStats[current_team][playerIndex][1] += 1;
				stats.playerPassingStats[current_team][qbIndex][4] += 1;   //int
				if (playText.indexOf("[deflected by ") != -1) {
					stats.playerReceivingStats[current_team][playerIndex][6] += 1; //pd
					stats.playerPassingStats[current_team][qbIndex][6] += 1;
				}
				
				//can't do it yet
				//stats = defenseHandler(stats,2,p,"pass");
				current_team = (current_team+1)%2;
				if (drive.numOfPlays == 1) {
					lastDrive.result = "Interception";
					//console.log(lastDrive.endTime+" -- "+drive.startTime+" -- "+p.timeRemaining);
					lastDrive.numOfPlays += 1;
					lastDrive.endTime = p.timeRemaining;
					if (lastDrive.driveBegan == null) {
						lastDrive.driveBegan = p.marker;
					}
					//console.log(lastDrive+"\n\n"+drive);
					lastDrive.driveEnded = p.marker;

					drive.numOfPlays = 0;
					if (playText.indexOf("[TD]") != -1) {
						drive.result = "Touchdown";
						drive.driveEnded = "OPP 0";
						drive.driveStarted = p.marker;
					}
				}
			}
			else if ((playText.indexOf(" intercepted by ") != -1) &&
					(playText.indexOf("fumbled , recovered by") != -1)) { 
				// intercepted and fumbled
				// can't display this stuff as I don't know
				// which team recovered if the play was the
				// first play of a drive
				//stats = defenseHandler(stats,2,p,"pass");
				if (drive.numOfPlays == 1) {
					lastDrive.result = "Interception";
					//console.log(lastDrive.endTime+" -- "+drive.startTime+" -- "+p.timeRemaining);
					lastDrive.numOfPlays += 1;
					lastDrive.endTime = p.timeRemaining;
					if (lastDrive.driveBegan == null) {
						lastDrive.driveBegan = p.marker;
					}
					//console.log(lastDrive+"\n\n"+drive);
					lastDrive.driveEnded = p.marker;

					drive.numOfPlays = 0;
					if (playText.indexOf("[TD]") != -1) {
						drive.result = "Touchdown";
						drive.driveEnded = "OPP 0";
						drive.driveStarted = p.marker;
					}
				}
			}
			else if ((playText.indexOf(" intercepted by ") == -1) &&
					(playText.indexOf(" recovered by") != -1)) {
				stats.playerPassingName[current_team].pop();
				stats.playerPassingStats[current_team].pop();
				stats.playerReceivingName[current_team].pop();
				stats.playerReceivingStats[current_team].pop();
				// not intercepted, but fumbled reception
				// can't display this stuff as I don't know
				// which team recovered if the play was the
				// first play of a drive
				//stats = defenseHandler(stats,2,p,"pass");
				if (drive.numOfPlays == 1) {
					lastDrive.result = "Fumble";
					//console.log(lastDrive.endTime+" -- "+drive.startTime+" -- "+p.timeRemaining);
					lastDrive.numOfPlays += 1;
					lastDrive.endTime = p.timeRemaining;
					if (lastDrive.driveBegan == null) {
						lastDrive.driveBegan = p.marker;
					}
					//console.log(lastDrive+"\n\n"+drive);
					lastDrive.driveEnded = p.marker;

					drive.numOfPlays = 0;
					if (playText.indexOf("[TD]") != -1) {
						drive.result = "Touchdown";
						drive.driveEnded = "OPP 0";
						drive.driveStarted = p.marker;
					}
				}
			}
		}	
		else if (yt.indexOf("incomplete") != -1) {
			stats.team_pass_att[index] += 1;
			stats.team_pass_att_down[(down-1)+(current_team*4)] += 1;

			stats.team_quarter_totals[0][4+current_team*6] += 1;
			stats.team_quarter_totals[quarter][4+current_team*6] += 1;

			stats.playerPassingStats[current_team][qbIndex][1] += 1;
			stats.playerReceivingStats[current_team][playerIndex][1] += 1;
			if (yt.indexOf("dropped - incomplete") != -1) {
				stats.playerPassingStats[current_team][qbIndex][5] += 1;
				stats.playerReceivingStats[current_team][playerIndex][2] += 1;
			}
			if (playText.indexOf("[deflected by ") != -1) {
				stats.playerPassingStats[current_team][qbIndex][6] += 1;
				stats.playerReceivingStats[current_team][playerIndex][6] += 1;
				
				stats = defenseHandler(stats,2,p,"pass");
			}
		}
		else {
			stats.team_pass_comp[index] += 1;
			stats.team_pass_att[index] += 1;
			stats.team_pass_yards[index] += y;

			stats.team_quarter_totals[0][3+current_team*6] += 1;
			stats.team_quarter_totals[0][4+current_team*6] += 1;
			stats.team_quarter_totals[0][5+current_team*6] += y;
			stats.team_quarter_totals[quarter][3+current_team*6] += 1;
			stats.team_quarter_totals[quarter][4+current_team*6] += 1;
			stats.team_quarter_totals[quarter][5+current_team*6] += y;

			stats.team_pass_att_down[(down-1)+(current_team*4)] += 1;
			stats.team_pass_comp_down[(down-1)+(current_team*4)] += 1;
			stats.team_pass_yards_down[(down-1)+(current_team*4)] += y;

			stats.playerPassingStats[current_team][qbIndex][0] += 1;
			stats.playerPassingStats[current_team][qbIndex][1] += 1;
			stats.playerPassingStats[current_team][qbIndex][2] += y;

			stats.playerReceivingStats[current_team][playerIndex][0] += 1;
			stats.playerReceivingStats[current_team][playerIndex][1] += 1;
			stats.playerReceivingStats[current_team][playerIndex][3] += y;
			stats.playerReceivingStats[current_team][playerIndex][4] =
				Math.max(stats.playerReceivingStats[current_team][playerIndex][4],y);
			if (playText.indexOf("[deflected by ") != -1) {
				stats.playerPassingStats[current_team][qbIndex][6] += 1;
				stats.playerReceivingStats[current_team][playerIndex][6] += 1;
			}
			if (y >= togo) {
				stats.team_pass_firsts[index] += 1;
				stats.team_pass_firsts_down[(down-1)+(current_team*4)] += 1;
				stats.playerReceivingStats[current_team][playerIndex][7] += 1;
			}

			if (y >= longPass) {
				stats.distanceStats[0][d] += 1;
				stats.distanceStats[0][d+1] += 1;
				stats.distanceStats[0][d+2] += y;
			}
			else if (y >= mediumPass) {
				stats.distanceStats[1][d] += 1;
				stats.distanceStats[1][d+1] += 1;
				stats.distanceStats[1][d+2] += y;
			}
			else if (y >= shortPass) {
				stats.distanceStats[2][d] += 1;
				stats.distanceStats[2][d+1] += 1;
				stats.distanceStats[2][d+2] += y;
			}
			else {
				stats.distanceStats[3][d] += 1;
				stats.distanceStats[3][d+1] += 1;
				stats.distanceStats[3][d+2] += y;
			}

			//stats = defenseHandler(stats,2,playText,"pass");
			stats = defenseHandler(stats,2,p,"pass");

			if (playText.indexOf("[TD]") != -1) {
				drive.result = "Touchdown";
				drive.driveEnded = "OPP 0";
				stats.playerPassingStats[current_team][qbIndex][3] += 1;
			}
		}
		//console.log((down-1)+" "+((down-1)+current_team*4)+" "+downs[down_index].innerHTML+" "+playText);
	}
	else if (playText.indexOf("Kickoff by ") == 0) {
		var ct = (current_team+1)%2;
		var s1 = "Kickoff by ".length;

		var s2 = playText.slice(s1).indexOf(', ');
		var s = playText.slice(s1,s1+s2);
		var playerIndex = arrayPush(ct,stats.playerKickingName,s,
				stats.playerKickingStats,[0,0,0,0]);

		var s3 = playText.slice(s1+s2).indexOf(" yd");
		var len = parseInt(playText.slice(s1+s2+s3-3,s1+s2+s3),10);
		if (playText.indexOf(", fumbled") == -1) {
			stats.playerKickingStats[ct][playerIndex][0] += 1;
			stats.playerKickingStats[ct][playerIndex][1] += len;
			if (len > stats.playerKickingStats[ct][playerIndex][2]) {
				stats.playerKickingStats[ct][playerIndex][2] = len;
			}
			if (playText.indexOf("(touchback)") != -1) {
				stats.playerKickingStats[ct][playerIndex][3] += 1;
			}
			else if (playText.indexOf(" yd return)") != -1) {
				var ct = current_team;
				var namestr = playText.slice(playText.indexOf(" fielded by ")+" fielded by ".length);

				var yidx = namestr.indexOf(" yd return)")-6;
				yidx = yidx+namestr.slice(yidx).indexOf(" (");
				var y = parseFloat(namestr.slice(yidx+2));

				var namestr = namestr.slice(0,yidx);
				if (namestr.indexOf(" [missed tackle:") != -1) {
					namestr = namestr.slice(0,namestr.indexOf(" [missed tackle:"));
				}

				if (namestr.indexOf(", PAT m") != -1) {
					namestr = namestr.slice(0,namestr.indexOf(", PAT m"));
				}
				var playerIndex = arrayPush(ct, stats.playerKickReturnName,namestr,
						stats.playerKickReturnStats,[0,0,0,0]);
				stats.playerKickReturnName[ct][playerIndex] = namestr;
				stats.playerKickReturnStats[ct][playerIndex][0] += 1; 
				stats.playerKickReturnStats[ct][playerIndex][1] += y;
				if (y > stats.playerKickReturnStats[ct][playerIndex][2]) {
					stats.playerKickReturnStats[ct][playerIndex][2] = y;
				}
			}

			stats = defenseHandler(stats,4,p,"st");

			drive.startTime = p.timeRemaining;
			if (playText.indexOf("[TD]") != -1) {
				drive.driveBegan = kickDistance("OPP 30",-len);
				drive.driveEnded = "OPP 0";
				drive.result = "Touchdown";
				stats.playerKickReturnStats[ct][playerIndex][3] += 1;
			}
			else if (playText.indexOf("(touchback)") != -1) {
				drive.driveBegan = "OWN 20";
			}
			else {
				drive.driveBegan = kickDistance("OPP 30",-len+y);

			}
		}
		else {
			//a damn fumble
			if (drive.numOfPlays != 1) {
				stats.playerKickingName[ct].pop();
				stats.playerKickingStats[ct].pop();
				playerIndex = arrayPush(current_team,stats.playerKickingName,s,
						stats.playerKickingStats,[0,0,0,0]);
				stats.playerKickingStats[current_team][playerIndex][0] += 1;
				stats.playerKickingStats[current_team][playerIndex][1] += len;
				if (len > stats.playerKickingStats[current_team][playerIndex][2]) {
					stats.playerKickingStats[current_team][playerIndex][2] = len;
				}
			}
			else {
				//kicking team recovered
				stats.playerKickingStats[ct][playerIndex][0] += 1;
				stats.playerKickingStats[ct][playerIndex][1] += len;
				if (len > stats.playerKickingStats[ct][playerIndex][2]) {
					stats.playerKickingStats[ct][playerIndex][2] = len;
				}
			}
			// can't display this stuff as I don't know
			// which team recovered if the play was the
			// first play of a drive
			//stats = defenseHandler(stats,4,p,"st");
		}
	}
	else if (playText.indexOf("Punt by ") == 0) {
		var ct = (current_team+1)%2;
		var s1 = "Punt by ".length;

		var s2 = playText.slice(s1).indexOf(', ');
		var s = playText.slice(s1,s1+s2);
		var playerIndex = arrayPush(ct,stats.playerPuntingName,s,
				stats.playerPuntingStats,[0,0,0,0,0]);

		var lenstr = playText.slice(s1+s2+2);
		var len = parseFloat(lenstr);
		stats.playerPuntingStats[ct][playerIndex][0] += 1;
		stats.playerPuntingStats[ct][playerIndex][1] += len;
		if (len > stats.playerPuntingStats[ct][playerIndex][2]) {
			stats.playerPuntingStats[ct][playerIndex][2] = len;
		}
		var kd = kickDistance(p.marker,len);
		if (parseFloat(kd.slice(4)) < 20) {//inside 20?
				stats.playerPuntingStats[ct][playerIndex][4] += 1;
		}
		if (playText.indexOf(", fumbled") == -1) {
			//was a return, no fumbles
			if (playText.indexOf("(touchback)") != -1) {
				stats.playerPuntingStats[ct][playerIndex][3] += 1;
			}
			else if (playText.indexOf(" yd return)") != -1) {
				var ct = current_team;
				var namestr = playText.slice(playText.indexOf(" fielded by ")+" fielded by ".length);

				var yidx = namestr.indexOf(" yd return)")-6;
				yidx = yidx+namestr.slice(yidx).indexOf(" (");
				var y = parseFloat(namestr.slice(yidx+2));

				var namestr = namestr.slice(0,yidx);
				if (namestr.indexOf(" [missed tackle:") != -1) {
					namestr = namestr.slice(0,namestr.indexOf(" [missed tackle:"));
				}

				if (namestr.indexOf(", PAT m") != -1) {
					namestr = namestr.slice(0,namestr.indexOf(", PAT m"));
				}
				var playerIndex = arrayPush(ct, stats.playerPuntReturnName,namestr,
						stats.playerPuntReturnStats,[0,0,0,0]);
				stats.playerPuntReturnName[ct][playerIndex] = namestr;
				stats.playerPuntReturnStats[ct][playerIndex][0] += 1; 
				stats.playerPuntReturnStats[ct][playerIndex][1] += y;
				if (y > stats.playerPuntReturnStats[ct][playerIndex][2]) {
					stats.playerPuntReturnStats[ct][playerIndex][2] = y;
				}
			}
			stats = defenseHandler(stats,4,p,"st");

			lastDrive.result = "Punt";
			lastDrive.numOfPlays += 1;
			lastDrive.driveEnded = p.marker;

			drive.numOfPlays = 0;
			drive.startTime = p.timeRemaining;
			if (playText.indexOf("[TD]") != -1) {
				drive.driveBegan = kickDistance(p.marker,len);
				drive.driveBegan = yardReverse(drive.driveBegan);
				drive.driveEnded = "OPP 0";
				drive.result = "Touchdown";
				stats.playerPuntReturnStats[ct][playerIndex][3] += 1;
			}
			else if (playText.indexOf("(touchback)") != -1) {
				drive.driveBegan = "OWN 20";
			}
			else {
				drive.driveBegan = kickDistance(p.marker,-len+y);
			}
		}
		else {
			if (drive.numOfPlays == 1) {
				//punt was fumbled & return team recovered
				lastDrive.result = "Punt";
				lastDrive.numOfPlays += 1;
				lastDrive.driveEnded = p.marker;
				lastDrive.endTime = p.timeRemaining;

				drive.numOfPlays = 0;
				drive.startTime = p.timeRemaining;
			}
			else {
				//punt was fumbled & kickoff team recovered
				stats.playerPuntingName[ct].pop();
				stats.playerPuntingStats[ct].pop();
				ct = (ct+1)%2;
				var playerIndex = arrayPush(ct,stats.playerPuntingName,s,
						stats.playerPuntingStats,[0,0,0,0,0]);
				stats.playerPuntingStats[ct][playerIndex][0] += 1;
				stats.playerPuntingStats[ct][playerIndex][1] += len;
				if (len > stats.playerPuntingStats[ct][playerIndex][2]) {
					stats.playerPuntingStats[ct][playerIndex][2] = len;
				}
			}
			// can't display this stuff as I don't know
			// which team recovered if the play was the
			// first play of a drive
			//stats = defenseHandler(stats,4,p,"st");
		}
	}
	else if (playText.indexOf("yd field goal attempted by") != -1) {
		if (playText.indexOf(", missed") == (playText.length - ", missed".length)) {
			lastDrive.result = "Missed FG";
			lastDrive.endTime = p.timeRemaining;
			lastDrive.driveEnded = p.marker;
			lastDrive.numOfPlays++;
			drive.numOfPlays = 0;
		}
		else {
			drive.result = "FG";
		}
	}
	else if (playText.indexOf("[forced fumble:") == 0) {
		//sack with fumble
		//can't handle this right now since we don't know
		//which team has the ball
		if (drive.numOfPlays == 1) {
			//lost fumble on a sack
			if (playText.indexOf("[SAFETY]") != -1) {
				lastDrive.result = "Safety";
				lastDrive.numOfPlays += 1;
				lastDrive.driveEnded = p.marker;
				lastDrive.endTime = p.timeRemaining;

				drive.numOfPlays = 0;
				drive.startTime = p.timeRemaining;
			}
			else if (playText.indexOf("[forced fumble:") != -1) {
				lastDrive.result = "Fumble";
				lastDrive.numOfPlays += 1;
				lastDrive.driveEnded = p.marker;
				lastDrive.endTime = p.timeRemaining;

				drive.numOfPlays = 0;
				drive.startTime = p.timeRemaining;
				if (playText.indexOf("[TD]") != -1) {
					drive.driveEnded = "Opp 0";
					drive.result = "Touchdown";
				}
			}
		}
	}
	else if ((playText.match(" sacked by ") != null) ||
			(playText.indexOf("[tackle:") == 0) || 
			(playText.indexOf("[diving tackle:") == 0))  {		
		//sack without fumble
		//console.log("sack "+playText.slice(0,40));
		stats = defenseHandler(stats,2,p,"pass");
		
		if (drive.numOfPlays == 1) {
			//lost fumble on a sack
			if (playText.indexOf("[SAFETY]") != -1) {
				lastDrive.result = "Safety";
				lastDrive.numOfPlays += 1;
				lastDrive.driveEnded = p.marker;
				lastDrive.endTime = p.timeRemaining;

				drive.numOfPlays = 0;
				drive.startTime = p.timeRemaining;
			}
			else if (playText.indexOf("[forced fumble:") != -1) {
				lastDrive.result = "Fumble";
				lastDrive.numOfPlays += 1;
				lastDrive.driveEnded = p.marker;
				lastDrive.endTime = p.timeRemaining;

				drive.numOfPlays = 0;
				drive.startTime = p.timeRemaining;
				if (playText.indexOf("[TD]") != -1) {
					drive.driveEnded = "Opp 0";
					drive.result = "Touchdown";
				}
			}
		}
	}
	else if (playText.indexOf("penalty committed by") != -1) {
		//console.log("Penalty: "+playText.slice(0,40));
		stats = penaltyHandler(stats, p);
	}
	else {
		//something really wierd
		console.log("You shouldn't see me, so I'm probably a bug: '"+playText+"'");
	}

	if (playText.indexOf("turnover on downs") != -1) {
		drive.result = "Downs";
		//drive.driveEnded = p.marker;
	}

	if (lastTime == null) {
	}
	else {
		if (lastTime < convertTime(p.timeRemaining)) {
			stats.team_possession[current_team*6] += lastTime;
			stats.team_possession[current_team*6+quarter-1] += lastTime;
		}
		else {
			stats.team_possession[current_team*6] += lastTime - convertTime(p.timeRemaining);
			stats.team_possession[current_team*6+quarter] += lastTime - convertTime(p.timeRemaining);
		}
	}
	lastTime = convertTime(p.timeRemaining);

	//console.log(stats.playerRushingName);
	//console.log(stats.playerReceivingName);
	//console.log(stats.playerDefensiveName);
	return stats;
}

function findChild(id,node) {
	if (node.id != null) {
		//console.log(node.id);
	}
	if (node.id+"" == id+"") {
		return node;
	}
	for each (var c in node.childNodes) {
		var r = findChild(id,c);
		if (r != null) {
			return r;
		}
	}    
	return null;
}

var current_team = 0;
var lastTime = 900;
var quarter = 0;
var team;
var lastDrive = new Drive();


function gameScout(inetAddress,page,stats) {

	current_team = 0;
	lastTime = 900;
	quarter = 0;
	team;
	lastDrive = new Drive();
	var d = null;
	var p = null;
	var pbpTable = findChild("play_by_play_table",page);
	if (pbpTable == null) {
		console.log("pbpTable is null. exiting.");
		return stats;
	}
	   
	console.log("start");

	pages = pbpTable.rows.length;
	for each (htmlTableRowElement in pbpTable.rows) {
		var className = htmlTableRowElement.className;
		if (className == null) {
			continue;
		}
		if (className.match("pbp_quarter") != null) {
			quarter++;
			if (quarter == 3) {
				if (d != null) {
					if (d.result == null) {
						d.result = "End of Half";
					}
					d.endTime = "0:00";
					//console.log(d);
					lastDrive = d;
					stats.driveList[current_team].push(d);
					d = new Drive();
				}
			}
		}
		else if (className.match("pbp_team") != null) {
			var coll = htmlTableRowElement.cells;
			var node = coll.item(0);
			var idx = 0;
			do {
				var s = node.innerHTML.slice(idx,node.innerHTML.length);
				var i = s.indexOf(" ");
				if (i != -1) idx += i + 1;
			} 
			while (i != -1);
			team = node.innerHTML.slice(0,idx-1);

			var found = false;
			for each (t in stats.team_name) {
				if (t == team) {
					found = true;
					break;
				}
			}
			if (found == false) {
				stats.team_name.push(team);
			}
			if (d != null) {
				if (d.quarter != null) {
					//console.log(d);
					lastDrive = d;		
					stats.driveList[current_team].push(lastDrive);
				}
			}
			d = new Drive();
		}
		else if (className.match("pbp_play_row") != null) {
			p = new Play();
			p.quarter = quarter;
			p.team = team;

			var coll = htmlTableRowElement.cells;
			for each (node in coll) {
				var cName = node.className;
				if (cName.match("pbp_time_remaining") != null) {
					p.timeRemaining = node.innerHTML;
				}
				else if (cName.match("pbp_marker") != null) {
					p.marker = node.innerHTML;
				}
				else if (cName.match("pbp_down") != null) {
					p.down = node.innerHTML.slice(0,1);
					p.togo = node.innerHTML.slice(node.innerHTML.indexOf("amp; ")+5);
				}
				else if (cName.match("pbp_replay") != null) {
					p.replay = node.firstChild;
					//if (p.playText != null) {
					stats = playHandler(stats,d,p);
					//}
				}
				else if (cName.match("pbp_play") != null) {
					p.play = node.firstChild.data;
					
					var playText = p.play;
					if (playText.indexOf("made [FG]") != -1) p.score = 3;
					else if (playText.indexOf("[TD]") != -1) p.score = 6;
					else if (playText.indexOf("[Safety]") != -1) p.score = 2;
					else p.score = 0;
					if (playText.indexOf(", PAT made by ") != -1) p.score += 1;
				}
			}
		}
		else {
//			console.log("main loop removal : "+pages+" / "+pbpTable.rows.length);
		}

	}
	console.log("game over");

	d.endTime = "00:00";
	d.result = "End of Game";
	stats.driveList[current_team].push(d);

	//time of possession for last play
	if ((p.quarter != 5) && ((window.location.toString()).indexOf("quarter=5") == -1)) {
		stats.team_possession[current_team*6] += lastTime;
		stats.team_possession[current_team*6+p.quarter] += lastTime;
	}
	if (p.quarter == 1) {
		d.result = "End of Quarter";
	}
	console.log("main loop done");

	var pbp = findChild("pbp",page);
	if (pbp != null) {
		pbp.parentNode.removeChild(pbp);
	}

	var index = links.indexOf(inetAddress);
	storageArr[index] = stats;

	console.log("exiting gs run");

	return stats;
}