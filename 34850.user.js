// ==UserScript==
// @name           Replay Rewrite
// @description    Adds some new features to the replay page.
// @namespace      pbr
// @include        http://goallineblitz.com/game/replay.pl?game_id=*&pbp_id=*
// @include        http://goallineblitz.com/game/home.pl
// @require        http://userscripts.org/scripts/source/28938.user.js
// @require        http://userscripts.org/scripts/source/31566.user.js       
// @require        http://userscripts.org/scripts/source/31567.user.js
// @require        http://userscripts.org/scripts/source/31573.user.js
// @require        http://userscripts.org/scripts/source/32044.user.js
// @version        08.10.02
// ==/UserScript==

/* 
 * 
 * pabst did this 08/07/31+
 *
 * 
 */

// ---------- main ----------------
	
// you can modify the following variables
var autoplay = false;
var preDelay = 3000;
var postDelay = 4500;
var alwaysPause = false;
var alwaysShowPlayText = false;
var highlightPlayers = true;
var alternatePlayers = false;

var enableFieldLayer = true;       //the field
var enableLowerDecalLayer = false;  //end zone images
var enableLineLayer = false;        //yardlines
var enableMiddleDecalLayer = false; //field graphics
var enableUpperDecalLayer = false;  //used for shadowing, only have retractable roof right now

var disablePlayerOverlays = false; //true can improve performance with decal layers
// you can modify the previous variables

var currentPlay = -1;
var lastPlay = -1;
var plays = [];

var playDone = false;
var playPaused = false;

var prePlayTimer = null;
var pauseCheckTimer = null;
var postPlayTimer = null;
var playFinishedTimer = null;

var httpRequest = null;

window.setTimeout( function() {
		if ((window.location+"").indexOf("home.pl") != -1) {
			pbr_replay_highlight_main();
		}
		else {
			document.addEventListener("page loaded",changePlays,true);
			pbp();
			restructurePage();
			
			playFinishedTimer = setInterval(isPlayFinished,3000);
			//console.log("playFinishedTimer started");

            if (alwaysPause == true) {
                playPaused = false;
                pauseReplay();
            }
		}
}, 100);

// ---------- end main ------------

var fieldLayerZ = 0;
var lowerDecalLayerZ = 128;
var lineLayerZ = 256;
var middleDecalLayerZ = 384;
var playerLayerZ = 512;
var upperDecalLayerZ = 768;
var iconOverlayLayerZ = 1024;

function playerGraphicsUpdate() {
    if (alternatePlayers == true) {
    	var players = document.getElementsByClassName("player_icon");
    	for (var i=0; i<players.length; i++) {
    		var img = players[i].childNodes[0];
    		if (img == null) continue;
    		var z = playerLayerZ;
    		if (img.src.indexOf("ball.gif") != -1) {
        		//img.src = img.src.replace("http://goallineblitz.com/images/","path to your ball.gif image");
    			z++;
    		}
    		else if (players[i].id == "los") {
    			z--;
    		}
    		else if (players[i].id == "fdm") {
    			z--;
    		}
    		else {
    			//img.src = img.src.replace("http://goallineblitz.com/images/","http://i10.photobucket.com/albums/a136/ggakma/GLB/");
    		}
    		console.log(players[i].id);
        	var s = players[i].getAttribute("style");
        	s += "z-index:"+z+";";
        	players[i].setAttribute("style",s);
        	players[i].zIndex = z;
    	}
    }
    else {
    	var players = document.getElementsByClassName("player_icon");
    	for (var i=0; i<players.length; i++) {
    		var z = playerLayerZ;
    		if (players[i].id == "los") {
    			z--;
    		}
    		else if (players[i].id == "fdm") {
    			z--;
    		}
        	var s = players[i].getAttribute("style");
        	s += "z-index:"+z+";";
        	players[i].setAttribute("style",s);
        	players[i].zIndex = z;
    	}
    }
    
	if (disablePlayerOverlays == false) {
		var playerdivs = document.getElementsByClassName("player_icon_overlay");	
		for (var i=0; i<playerdivs.length; i++) {
			var s = playerdivs[i].getAttribute("style");
			if (s == null) {
				s = "z-index:"+iconOverlayLayerZ+";";
			}
			else if (s.indexOf("z-index") == -1) {
				s += "z-index:"+iconOverlayLayerZ+";";
			}
			playerdivs[i].setAttribute("style",s);
		}
	}
}

function fieldGraphicsUpdate() {
	if (enableFieldLayer == true) { //1080x480
        var fields = [];
        fields[fields.length] = 'http://img527.imageshack.us/img527/4992/cannibalfield2sj1.jpg';

        //these fields have yard lines already. DISABLE THE LINE LAYER.
        //fields[fields.length] = 'http://img517.imageshack.us/img517/2792/glbfieldgrassph5.jpg';
        //fields[fields.length] = 'http://img517.imageshack.us/img517/2551/glbfieldturfhl0.jpg';
        //fields[fields.length] = 'http://img517.imageshack.us/img517/811/glbfieldwornwh2.jpg';
        //fields[fields.length] = 'http://img215.imageshack.us/img215/5927/glbfieldsloppyweatheryf1.jpg';
        //fields[fields.length] = 'http://img205.imageshack.us/img205/2179/glbfieldsnowvs1.jpg';
        //fields[fields.length] = 'http://img523.imageshack.us/img523/6463/glbfieldrb0.gif';
        var field = document.getElementById("replay_area");
        var hometeam = document.getElementsByClassName("team_name")[2].innerHTML;
        hometeam = hometeam.slice(hometeam.indexOf("team_id=")+"team_id=".length);
        hometeam = hometeam.slice(0,hometeam.indexOf('"'));
        field.style.backgroundImage = "url("+fields[parseInt(hometeam)%fields.length]+")";
	}

    if (enableLowerDecalLayer == true) {
		var d = document.getElementById("lowerdecals");
		if (d == null) {
			var repdiv = document.getElementById("replay_area");
			var parstyle = repdiv.getAttribute("style");
			if (parstyle == null) parstyle = "";
			
			div = document.createElement("div");
			div.setAttribute("style","position:absolute; z-index:"+lowerDecalLayerZ+";");
			div.setAttribute("id","lowerdecals");	
			div.zIndex=lowerDecalLayerZ;

			//north end zone - 480x91 including outline
			var img = document.createElement("img");
			img.src = "http://i10.photobucket.com/albums/a136/ggakma/GLB/ENDZONES/endzone-glb-top.jpg";
			img.setAttribute("style","position: absolute; top:0px; left:0px; z-index:"+lowerDecalLayerZ+";");
			img.zIndex=lowerDecalLayerZ;
			div.appendChild(img);
			
			//south end zone - 480x91 including outline
			var img = document.createElement("img");
			img.src = "http://i10.photobucket.com/albums/a136/ggakma/GLB/ENDZONES/endzone-glb-bottom.jpg";
			img.setAttribute("style","position: absolute; top:988px; left:0px; z-index:"+lowerDecalLayerZ+";");
			img.zIndex=lowerDecalLayerZ;
			div.appendChild(img);
			
			repdiv.appendChild(div);
		}
    }
    
	if (enableLineLayer == true) { //1080x480
		var d = document.getElementById("linelayer");
		if (d == null) {
			var repdiv = document.getElementById("replay_area");
			
			div = document.createElement("div");
			div.setAttribute("style","position:absolute; z-index:"+lineLayerZ+";");
			div.setAttribute("id","linelayer");	
			div.zIndex=lineLayerZ;
		
	        var lines = [];
	        lines[lines.length] = "http://img527.imageshack.us/img527/3776/glblinesyk7.png";
	        
			var img = document.createElement("img");
			img.src = lines[0];
			img.setAttribute("style","position: absolute; z-index:"+lineLayerZ+";");
			img.zIndex=lineLayerZ;
			div.appendChild(img);
			
			repdiv.appendChild(div);
		}
    }

    if (enableMiddleDecalLayer == true) {
		var d = document.getElementById("middledecals");
		if (d == null) {
			var repdiv = document.getElementById("replay_area");
			var parstyle = repdiv.getAttribute("style");
			if (parstyle == null) parstyle = "";
			
			div = document.createElement("div");
			div.setAttribute("style","position:absolute; z-index:"+middleDecalLayerZ+";");
			div.setAttribute("id","middledecals");	
			div.zIndex=middleDecalLayerZ;

			//50 yard line image 
			var imgysize = 224; //set to the y-axis length of your image
			var imgxsize = 140; //set to the x-axis length of your image
			var img = document.createElement("img");
			img.src = "http://img184.imageshack.us/img184/320/glblogotx0.png";
			img.setAttribute("style","position: absolute; top:"+(540-(imgysize>>1))+"px; left:"+(240-(imgxsize>>1))+"px; z-index:"+middleDecalLayerZ+";");
			img.zIndex=middleDecalLayerZ;
			div.appendChild(img);
			
			repdiv.appendChild(div);
		}
    }

    if (enableUpperDecalLayer == true) { //1080x480
		var d = document.getElementById("upperdecals");
		if (d == null) {
			var repdiv = document.getElementById("replay_area");
			
			div = document.createElement("div");
			div.setAttribute("style","position:absolute; z-index:"+upperDecalLayerZ+";");
			div.setAttribute("id","upperdecals");	
			div.zIndex=upperDecalLayerZ;
		
			var img = document.createElement("img");
			img.src = "http://img515.imageshack.us/img515/9223/glboverlaymappedto100vu7.png";
			img.setAttribute("style","position: absolute; opacity:0.45; z-index:"+upperDecalLayerZ+";");
			img.zIndex=upperDecalLayerZ;
			div.appendChild(img);
			
			repdiv.appendChild(div);
		}
    }
}

function restructureInfo() {
	playerGraphicsUpdate();
	fieldGraphicsUpdate();
	
	var offOrder = ["WR1","WR3","LOT","LG","C","RG","ROT","TE","WR5","WR4","WR2","QB","HB","FB"];
	var defOrder = ["CB1","CB3","ROLB","RDE","RILB","DT","MLB","NT","LILB","LDE","LOLB","CB4","CB2","FS","SS"];
	
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
			stop += stats.playerDefensiveRushStats[0][rush][3];
			dft += stats.playerDefensiveRushStats[0][rush][4];
		}
		if (pass != -1) {
			tk += stats.playerDefensivePassStats[0][pass][0];
			miss += stats.playerDefensivePassStats[0][pass][1];
			stop += stats.playerDefensivePassStats[0][pass][3];
			dft += stats.playerDefensivePassStats[0][pass][4];
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
    if (alwaysShowPlayText == false) {
    	dsc.setAttribute("style","text-align:center;visibility:collapse;");
    }
    else {
    	dsc.setAttribute("style","text-align:center");
    }
	replay.insertBefore(dsc,replay.firstChild);
	replay.insertBefore(dnd,replay.firstChild);
	
	div.appendChild(banner);
	div.appendChild(left);
	center.appendChild(btn);
	center.appendChild(replay.parentNode.removeChild(replay));
	center.appendChild(info);
	div.appendChild(center);
	div.appendChild(right);	
	
	var control = document.getElementById("controls");
	for each (var c in control.childNodes) {
		if (c.text == "Pause") {
			c.setAttribute("onclick","");
			c.setAttribute("onClick","");
			c.onclick = "";
			c.addEventListener("click",pauseReplay,true);
		}
		if (c.text == "Play") {
			c.setAttribute("onclick","");
			c.setAttribute("onClick","");
			c.onclick = "";
			c.addEventListener("click",playReplay,true);
		}
	}
}

function playReplay() {
	playPaused = false;
	if (playDone == false) {
		unsafeWindow.play();
	}
}

function pauseReplay() {
	//console.log(playPaused+" -- "+!playPaused);
	playPaused = !playPaused;
	if (playPaused == true) {
		unsafeWindow.pause();
	}
	else {
		if (playDone == false) {
			unsafeWindow.play();
		}
	}
}

function handleFieldGoal(play) {
	unsafeWindow.pause();
	unsafeWindow.currentFrame = 0;
	unsafeWindow.play_data = [unsafeWindow.play_data[0]];
	unsafeWindow.resetPlay();
	unsafeWindow.play();
		
	var p = plays[play];
	var shp = document.getElementsByClassName("small_head play");
	shp[0].innerHTML = p.timeRemaining+" "+p.down+" & "+p.togo+" on "+p.marker;
	shp[1].innerHTML = p.play;
}

function input(evt) {
	if (postPlayTimer != null) {
		clearTimeout(postPlayTimer);
		//console.log("postPlayTimer stopped");
		postPlayTimer = null;
	}
	
	clearInterval(playFinishedTimer);
	//console.log("playFinishedTimer stopped");
	playFinished = null;
	
	if (prePlayTimer != null) {
		clearTimeout(prePlayTimer);
		//console.log("prePlayTimer stopped");
		prePlayTimer = null;
	}
	
	if (pauseCheckTimer != null) {
		clearTimeout(pauseCheckTimer);
		//console.log("pauseCheckTimer stopped");
		pauseCheckTimer = null;
	}
	
	unsafeWindow.pause();
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
		handleFieldGoal(currentPlay);
		assignButtons();
		setTimeout(playIsFinished, 6000);
		//console.log("playIsFinishedTimer started");
	}
	else {
		if (httpRequest != null) {
			httpRequest.abort();
		}
		httpRequest = getInetPage(address,change, evt.target);
	}
}

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

function assignButtons() {
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
		saved = check.checked;
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
    if (alwaysShowPlayText == false) {
    	info[1].setAttribute("style","text-align:center;visibility:collapse;");
    }
    else {
    	info[1].setAttribute("style","text-align:center;");
    }
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
		p = p.slice(0,p.indexOf("var play_data"));
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
		prePlayTimer = setTimeout(beginPlay,preDelay);
		//console.log("prePlayTimer started");

        if (alwaysPause == true) {
            playPaused = false;
            pauseReplay();
        }
 	}
	else {
		console.log(page+" is not a good page");
		unsafeWindow.pause();
	}
}

function beginPlay() {
	//console.log("beginPlay");
	if (postPlayTimer != null) {
		clearTimeout(postPlayTimer);
		//console.log("postPlayTimer stopped");
		postPlayTimer = null;
	}
	if (playPaused == true) {
		clearTimeout(pauseCheckTimer);
		//console.log("pauseCheckTimer stopped");
		pauseCheckTimer = setTimeout(beginPlay,3000);
		//console.log("pauseCheckTimer started");
		return;
	}
    runOtherScripts();
	unsafeWindow.play();
	
	playerGraphicsUpdate();
}

function playIsFinished() {
	//console.log("playIsFinished");
	if (postPlayTimer != null) {
		clearTimeout(postPlayTimer);
		//console.log("postPlayTimer stopped");
		postPlayTimer = null;
	}
	if (playPaused == true) {
		clearTimeout(pauseCheckTimer);
		//console.log("pauseCheckTimer stopped");
		pauseCheckTimer = setTimeout(playIsFinished,3000);
		//console.log("pauseCheckTimer started");
		return;
	}
	playDone = false;
	if (document.getElementById("autoplay").checked == false) {
		//console.log("autoplay is false, restarting play");
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
}

function isPlayFinished() {	
	//console.log("isPlayFinished");
	if (postPlayTimer != null) {
		return;
	}
	if (playPaused == true) {
		return;
	}
	if (playDone == true) {
		playDone = false;
		if ((postPlayTimer == null) && (playFinishedTimer != null)) {
			postPlayTimer = setTimeout(playIsFinished,postDelay);
			//console.log("postPlayTimer started");
		}
	}
}

function drawBall() {
	var playerId = null;
	var pd = unsafeWindow.play_data;
	var frame = unsafeWindow.currentFrame;
	var b = pd[frame];
	if (b == null) {
		playDone = true;
		return;
	}
	b = b[0];
	
	var el = document.getElementById("pbrball");
	if (el != null) {
		s = el.parentNode.lastChild.innerHTML;
		var idx = s.indexOf("player_id=")+"player_id=".length;
		var idx2 = s.slice(idx).indexOf('"');
		var id = s.slice(idx,idx+idx2);
		id = parseInt(id);
		var unchanged = pd[frame].some(
			function(el) { 
				if (el.id != id) return false;
				if (el.x != b.x) return false;
				if (el.y != b.y) return false;
				return true;
			}
		);
		if (unchanged == true) return;
	}
	
	var poss = pd[frame].filter(
		function(el) {
			if (el.x != b.x) return false;
			if (el.y != b.y) return false;
			return true;
		}
	);
	if (poss.length > 1) playerId = poss[1].id;

	if (el != null) {
		el.parentNode.removeChild(el);
	}
	if (playerId != null) {
		for each (var l in document.links) {			
			var s = "player_id="+playerId;
			if ((l+"").indexOf(s) != -1) {
				var div = document.createElement('div');
				div.id = 'pbrball';
				div.className = 'player_icon';
				div.innerHTML = '<img src="/images/ball.gif">';
				l.parentNode.parentNode.insertBefore(div, l.parentNode.parentNode.firstChild);
				break;
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

unsafeWindow.initialize = function () {
	var repdiv = document.getElementsByClassName("player_icon_overlay");
	while (repdiv.length != 0) {
		repdiv[0].parentNode.removeChild(repdiv[0]);
	}
	var repdiv = document.getElementsByClassName("player_icon");
	while (repdiv.length != 0) {
		repdiv[0].parentNode.removeChild(repdiv[0]);
	}
	
	for (var i = 1; i < unsafeWindow.play_data[unsafeWindow.currentFrame].length; i++) {
		var data = unsafeWindow.play_data[unsafeWindow.currentFrame][i];
		unsafeWindow.drawPlayer(data.id, data.x, data.y);
	}
	// Draw ball
	unsafeWindow.drawPlayer('ball', unsafeWindow.play_data[unsafeWindow.currentFrame][0].x, 
				unsafeWindow.play_data[unsafeWindow.currentFrame][0].y);
}
	
	
function runOtherScripts() {
    if (alternatePlayers == true) {
    	playerGraphicsUpdate();
    }
	if (highlightPlayers == true) {
		// highlight my players
		pbr_replay_highlight_main();
	}

	//needed for first down marker
	var play_data = unsafeWindow.play_data;
	var currentFrame = unsafeWindow.currentFrame;
	
	// ------- copied from GLB javascript, originally by tciss -------------------
	var fdcolor = "yellow";
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
			if (dirText.substring(5,p2).indexOf("4") != -1) {
				fdcolor = "red";
			}
		}
	}
	// ----------------- end -------------------
	

	//line of scrimmage
	var greater=0;
	for (var i=1; i<play_data[0].length; i++) {
		if (play_data[0][i].y > play_data[0][0].y) greater++;
		else greater--;
	}
	var diff = (greater / Math.abs(greater))*(12+3 + 0*9);
	var los = parseFloat(play_data[0][0].y) * 3;
	
	var ls = document.getElementById("los");
	if (ls != null) {
		ls.parentNode.removeChild(ls);
	}
	var div = document.createElement('div');
	div.id = 'los';
	div.className = 'player_icon';
	div.style.top  = (los + diff) + 'px';
	div.style.width = '480px';
	div.style.height = '2px';
	div.style.backgroundColor = 'blue';
	var s = div.getAttribute("style");
	s += "z-index:"+(playerLayerZ-1)+";";
	div.setAttribute("style",s);
	div.style.zIndex = playerLayerZ-1;
	play_container.appendChild(div);
	//end los
	
	//first down marker
	var fdm = document.getElementById("fdm");
	if (fdm != null) {
		fdm.parentNode.removeChild(fdm);
	}
	var diff = (greater / Math.abs(greater))*(12+3 + ytg*9);
	var los = parseFloat(play_data[0][0].y) * 3;
	var div = document.createElement('div');
	div.id = 'fdm';
	div.className = 'player_icon';
	div.style.top  = (los + diff) + 'px';
	div.style.width = '480px';
	div.style.height = '2px';
	div.style.backgroundColor = fdcolor;
	var s = div.getAttribute("style");
	s += "z-index:"+(playerLayerZ-1)+";";
	div.setAttribute("style",s);
	div.style.zIndex = playerLayerZ-1;
	play_container.appendChild(div);
	//end fdm
}

function change(address, page) {
	clearTimeout(postPlayTimer);
	//console.log("postPlayTimer stopped");
	httpRequest = null;
	assignButtons();
	changeInfo(page);	
	changePlays(page);
	updateScoreboard();
	playFinishedTimer = setInterval(isPlayFinished,3000);
	//console.log("playFinishedTimer started");
}

function pbp() {
	var href = window.location.toString();
	href = href.replace("replay.pl","game.pl");
	
	var idx = href.indexOf("&pbp_id");
	href = href.slice(0,idx) + "&mode=pbp";

	getInetPage(href,pbpHandler);
}

function pbpHandler(address, page) {
	var prev = null;
	var next = null;
	loadPBPSimple(page);
	
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
	
	var count = curr-last;
	if (count > 0) {
		for (var i=Math.max(0,last); i!=curr; i++) {
			var play = plays[i];

			var thisQuarter = document.getElementById("sb: "+(play.quarter-1)+" "+play.team);
			if (thisQuarter.innerHTML == "-") thisQuarter.innerHTML = 0;
	
			var thisTotal = document.getElementById("sb: 5 "+play.team);
			if (thisTotal.innerHTML == "-") thisTotal.innerHTML = 0;
			
			if (play.score != 0) {
				var qscore = parseFloat(thisQuarter.innerHTML);
				if (isNaN(qscore) == true) qscore = 0;
				qscore += play.score;
				thisQuarter.innerHTML = qscore;
				
				var tscore = parseFloat(thisTotal.innerHTML);
				if (isNaN(tscore) == true) tscore = 0;
				tscore += play.score;
				thisTotal.innerHTML = tscore;
			}
		}
	}
	else {
		for (var i=last-1; i>=curr; i--) {
			var play = plays[i];
			var thisQuarter = document.getElementById("sb: "+(play.quarter-1)+" "+play.team);
			var thisTotal = document.getElementById("sb: 5 "+play.team);
			
			if (play.score != 0) {
				var qscore = parseFloat(thisQuarter.innerHTML);
				if (isNaN(qscore) == true) qscore = 0;
				qscore -= play.score;
				thisQuarter.innerHTML = qscore;
				
				var tscore = parseFloat(thisTotal.innerHTML);
				if (isNaN(tscore) == true) tscore = 0;
				tscore -= play.score;
				thisTotal.innerHTML = tscore;
			}
		}
	}

	var clock = document.getElementsByClassName("clock");
	var shp = document.getElementsByClassName("small_head play");
	var t = shp[0].innerHTML;
	clock[1].innerHTML = t.split(" ")[0];
	
	restructureInfo();

	yac_main(unsafeWindow.players, unsafeWindow.play_data);	
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
