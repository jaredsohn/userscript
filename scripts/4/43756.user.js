// ==UserScript==
// @name           Replay Rewrite - WALLER KNIGHTS
// @description    Adds the Waller field to the replay rewrite.
// @namespace      pbr
// @include        http://goallineblitz.com/game/replay.pl?game_id=*&pbp_id=*
// @include        http://goallineblitz.com/game/home.pl
// @require        http://userscripts.org/scripts/source/28938.user.js
// @require        http://userscripts.org/scripts/source/31566.user.js       
// @require        http://userscripts.org/scripts/source/29460.user.js
// @require        http://userscripts.org/scripts/source/31573.user.js
// @require        http://userscripts.org/scripts/source/32044.user.js
// @require        http://userscripts.org/scripts/source/42919.user.js
// @version        1
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

var showFallenPlayers = true;
var disablePlayerOverlays = false; //true can improve performance with decal layers

// XML stadium descriptions are at the bottom of this file
var useXMLDescription = false;

// if XML descriptions = true, set the booleans to image types you want to see.
// if XML descriptions = false, set the booleans to image types you want to see and set the addresses here.
// 1080x480
var enableFieldLayer = true;
var fieldImage = "http://i633.photobucket.com/albums/uu60/alpinegolfers/Waller.jpg";

// 1080x480
var enableLineLayer = false;
var lineImage = "http://img527.imageshack.us/img527/3776/glblinesyk7.png";

// 480x91 including outline
var enableLowerDecalLayer = false;
var northEndZoneImage = "http://i10.photobucket.com/albums/a136/ggakma/GLB/ENDZONES/endzone-glb-top.jpg";
var southEndZoneImage = "http://i10.photobucket.com/albums/a136/ggakma/GLB/ENDZONES/endzone-glb-bottom.jpg";

// x & y size MUST be set to the size of your image
var enableMiddleDecalLayer = false;
var middleDecalImage = "http://img184.imageshack.us/img184/320/glblogotx0.png";
var middleDecalImageX = 224; //set to the x-axis length of your image if not using xml
var middleDecalImageY = 140; //set to the y-axis length of your image if not using xml

// 1080x480
var enableUpperDecalLayer = false;
var upperDecalImage = "http://img515.imageshack.us/img515/9223/glboverlaymappedto100vu7.png";

// you can modify the previous variables


// don't screw with these
var replayRewrite = true;
var alternatePlayers = false; //not functional
var showFallText = false;  //not functional

var currentPlay = -1;
var lastPlay = -1;
var plays = [];

var playDone = false;
var playPaused = false;

var prePlayTimer = null;
var postPlayTimer = null;
var playFinishedTimer = null;

var httpRequest = null;

var frameSpeed = unsafeWindow.frameSpeed - parseInt(unsafeWindow.frameSpeed*0.15);
var frameTimer = null;

window.setTimeout( function() {
		if ((window.location+"").indexOf("home.pl") != -1) {
			pbr_replay_highlight_main();
		}
		else {
			clearTimeout(unsafeWindow.frameTimer);
			unsafeWindow.frameTimer = null;
			
			pbp();
			restructurePage();
			
            resetPlay();
            runOtherScripts();
            if (alwaysPause == true) {
                playPaused = false;
                pauseReplay();
            }
            else {
                playPaused = false;
                setTimeout(beginPlay,preDelay);
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
    if (alternatePlayers == true) { //not functional
    	var players = document.getElementsByClassName("player_icon");
    	for (var i=0; i<players.length; i++) {
    		var img = players[i].childNodes[0];
    		if (img == null) continue;
    		var z = playerLayerZ;
    		if (img.src.indexOf("ball.gif") != -1) {//broken
        		//img.src = img.src.replace("http://goallineblitz.com/images/","path to your ball.gif image");
    			z++;
    		}
    		else if (players[i].id == "los") {
    			z--;
    		}
    		else if (players[i].id == "fdm") {
    			z--;
    		}
    		else {//broken
    			//img.src = img.src.replace("http://goallineblitz.com/images/","http://i10.photobucket.com/albums/a136/ggakma/GLB/");
    		}
    		//console.log(players[i].id);
        	var s = players[i].getAttribute("style"); if (s == null) s = "";
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
        	var s = players[i].getAttribute("style"); if (s == null) s = "";
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
    if (useXMLDescription == true) {
        var hometeam = document.getElementsByClassName("team_name")[1].innerHTML;
        hometeam = hometeam.slice(hometeam.indexOf("team_id=")+"team_id=".length);
        hometeam = hometeam.slice(0,hometeam.indexOf('"'));
	console.log("hometeam is "+hometeam);

        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(xmlDescription, "application/xml");
        var teams = xmlDoc.getElementsByTagName("team");
        console.log("number of teams in XML = "+teams.length);
        var found = false;
        for (var i=0; i<teams.length; i++) {
            var t = teams[i];
            if (t.getAttribute("id") == hometeam) {
                if (setImages(t) == true) {
                    fieldGraphicsInsert();
                    found = true;
                    break;
                }
            }
        }
        if (found == false) {
            for (var i=0; i<teams.length; i++) {
                var t = teams[i];
                if (t.getAttribute("id") == "-1") {
                    if (setImages(t) == true) {
                        fieldGraphicsInsert();
                        break;
                    }
                }
            }
        }
    }
    else {
        fieldGraphicsInsert();
    }
}

function setImages(t) {
    var change = false;
    var f = t.getElementsByTagName("field")[0];
    if (f != null) {
        fieldImage = f.textContent;
	if (f.textContent.length == 0) fieldImage = null;
        change = true;
    }
    else fieldImage = null;
    
    var l = t.getElementsByTagName("line")[0];
    if (l != null) {
        lineImage = l.textContent;
	if (l.textContent.length == 0) lineImage = null;
        change = true;
    }
    else lineImage = null;

    var n = t.getElementsByTagName("north")[0];
    if (n != null) {
        northEndZoneImage = n.textContent;
	if (n.textContent.length == 0) northEndZoneImage = null;
        change = true;
    }
    else northEndZoneImage = null;

    var s = t.getElementsByTagName("south")[0];
    if (s != null) {
        southEndZoneImage = s.textContent;
	if (s.textContent.length == 0) southEndZoneImage = null;
        change = true;
    }
    else southEndZoneImage = null;

    var u = t.getElementsByTagName("upper")[0];
    if (u != null) {
        upperDecalImage = u.textContent;
	if (u.textContent.length == 0) upperDecalImage = null;
        change = true;
    }
    else upperDecalImage = null;

    var m = t.getElementsByTagName("middle")[0];
    if (m != null) {
        middleDecalImage = m.textContent;
	if (m.textContent.length == 0) middleDecalImage = null;
	else {
		middleDecalImageX = parseInt(m.getAttribute("xsize"));
		middleDecalImageY = parseInt(m.getAttribute("ysize"));
		change = true;
		if ((middleDecalImageX == null) || (middleDecalImageY == null)) {
		    alert("Replay Rewrite: Image sizes for middle decal aren't included! Fix it!")
		    change = false;
		}
	}
    }
    else middleDecalImage = null;

    //console.log(middleDecalImage+" --- "+middleDecalImageX);
    return change;
}

function fieldGraphicsInsert() {
	if ((enableFieldLayer == true) && (fieldImage != null)) {
        var field = document.getElementById("replay_area");
        field.style.backgroundImage = "url("+fieldImage+")";
	}

    if ((enableLowerDecalLayer == true) && (northEndZoneImage != null) && (southEndZoneImage != null)) {
		var d = document.getElementById("lowerdecals");
		if (d == null) {
			var repdiv = document.getElementById("replay_area");
			var parstyle = repdiv.getAttribute("style");
			if (parstyle == null) parstyle = "";
			
			div = document.createElement("div");
			div.setAttribute("style","position:absolute; z-index:"+lowerDecalLayerZ+";");
			div.setAttribute("id","lowerdecals");	
			div.zIndex=lowerDecalLayerZ;

			var img = document.createElement("img");
			img.src = northEndZoneImage;
			img.setAttribute("style","position: absolute; top:0px; left:0px; z-index:"+lowerDecalLayerZ+";");
			img.zIndex=lowerDecalLayerZ;
			div.appendChild(img);
			
			var img = document.createElement("img");
			img.src = southEndZoneImage;
			img.setAttribute("style","position: absolute; top:988px; left:0px; z-index:"+lowerDecalLayerZ+";");
			img.zIndex=lowerDecalLayerZ;
			div.appendChild(img);
			
			repdiv.appendChild(div);
		}
    }
    
	if ((enableLineLayer == true) && (lineImage != null)) {
		var d = document.getElementById("linelayer");
		if (d == null) {
			var repdiv = document.getElementById("replay_area");
			
			div = document.createElement("div");
			div.setAttribute("style","position:absolute; z-index:"+lineLayerZ+";");
			div.setAttribute("id","linelayer");	
			div.zIndex=lineLayerZ;
		
			var img = document.createElement("img");
			img.src = lineImage;
			img.setAttribute("style","position: absolute; z-index:"+lineLayerZ+";");
			img.zIndex=lineLayerZ;
			div.appendChild(img);
			
			repdiv.appendChild(div);
		}
    }

    if ((enableMiddleDecalLayer == true) && (middleDecalImage != null)) {
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
			var imgysize = middleDecalImageX;
			var imgxsize = middleDecalImageY; //set to the y-axis length of your image
			var img = document.createElement("img");
			img.src = middleDecalImage;
			img.setAttribute("style","position: absolute; top:"+(540-(imgysize>>1))+"px; left:"+(240-(imgxsize>>1))+"px; z-index:"+middleDecalLayerZ+";");
			img.zIndex=middleDecalLayerZ;
			div.appendChild(img);
			
			repdiv.appendChild(div);
		}
    }

    if ((enableUpperDecalLayer == true) && (upperDecalImage != null)) {
		var d = document.getElementById("upperdecals");
		if (d == null) {
			var repdiv = document.getElementById("replay_area");
			
			div = document.createElement("div");
			div.setAttribute("style","position:absolute; z-index:"+upperDecalLayerZ+";");
			div.setAttribute("id","upperdecals");	
			div.zIndex=upperDecalLayerZ;
		
			var img = document.createElement("img");
			img.src = upperDecalImage;
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
		var inter = s[4];
		
		output = att+" / "+cmp+", "+y.toFixed(0)+" yards";
		if (td != 0) output += ", "+td+" td";
		if (inter != 0) output += ", "+inter+" int";
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
	var btn = document.createElement("div");
	btn.setAttribute("id","button_panel");
	btn.setAttribute("style","margin-left:25px;");
	
	var pn = document.getElementsByClassName("prev_next")[0];
	pn.parentNode.removeChild(pn);
	
	var teams = document.getElementsByClassName("team");
	left.appendChild(teams[0].parentNode.removeChild(teams[0]));
    teams = document.getElementsByClassName("team");
	right.appendChild(teams[0].parentNode.removeChild(teams[0]));
	
	var content = document.getElementById("content");
	content.appendChild(div);

	var info = document.getElementById("replay_info");
	var p = info.getElementsByClassName("small_head play");
	var dnd = p[0];
	var dsc = p[1];
	dnd.setAttribute("style","text-align:center;");
    if (alwaysShowPlayText == false) {
    	dsc.setAttribute("style","visibility: hidden");
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
	var a = control.getElementsByTagName("a");
	for (var i=0; i<a.length; i++) {
		var c = a[i];
		c.setAttribute("onClick","");
		if (c.text == "Pause") {
			c.addEventListener("click",pauseReplay,true);
		}
		else if (c.text == "Play") {
			c.addEventListener("click",play,true);
		}
		else if (c.innerHTML.indexOf("Rew") != -1) {
			c.addEventListener("click",rew,true);
		}
		else if (c.innerHTML.indexOf("FF") != -1) {
			c.addEventListener("click",ff,true);
		}
	}
}

function pauseReplay() {
    console.log("before pauseReplay: pP="+playPaused);
	if (playDone == true) {
		if (postPlayTimer != null) {
			clearTimeout(postPlayTimer);
			postPlayTimer = null;
		}
		playDone = false;
		playPaused = true;
	}
	else {
		playPaused = !playPaused;
	}
	
	if (playPaused == true) {
		clearTimeout(frameTimer);
		frameTimer = null;
	}
	else {
		if (playDone == false) {
			play();
		}
	}
    console.log("after pauseReplay: pP="+playPaused);
}

function input(evt) {
	if (postPlayTimer != null) {
		clearTimeout(postPlayTimer);
		postPlayTimer = null;
	}
	
	if (playFinishedTimer != null) {
    	clearTimeout(playFinishedTimer);
        playFinishedTimer = null;
	}

	if (prePlayTimer != null) {
		clearTimeout(prePlayTimer);
		prePlayTimer = null;
	}

	if (playPaused != true) {
		pauseReplay();
	}
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
		pauseReplay(); //unpause
		assignButtons();
		handleFieldGoal(currentPlay);
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
	/*
	if ((id >= plays.length) || (id == currentPlay) || (id < 0)) {
		var s = div.getAttribute("style");
		if (s == null) s = "";
		div.setAttribute("style","visibility:hidden;"+s);
	}
	*/
	return div;
}

function assignButtons() {
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
	
	var newinfo = div.getElementsByClassName("small_head play");
	var info = document.getElementsByClassName("small_head play")
	
	info[0].innerHTML = newinfo[0].innerHTML +"&nbsp;&nbsp;";
    if (alwaysShowPlayText == false) {
    	info[1].setAttribute("style","visibility:hidden");
    }
    else {
    	info[1].setAttribute("style","text-align:center");
    }
	info[1].textContent = newinfo[1].textContent;
	
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
	var idx = page.responseText.indexOf("var players =");
	if (idx != -1) {
		if (playPaused == false) {
			pauseReplay(); //pause everything
		}
		var p = page.responseText.slice(idx+"var players =".length);
		p = p.slice(0,p.indexOf("var play_data"));
		var pd = page.responseText.slice(page.responseText.indexOf("var play_data =")+"var play_data =".length);
		pd = pd.slice(0,pd.indexOf(";"));
		
		var newplayers = null;
		var newplay_data = null;
		eval("newplayers = "+p);
		newplay_data = eval(pd);
		
		if (newplayers != null) unsafeWindow.players = newplayers;
		if (newplay_data != null) unsafeWindow.play_data = newplay_data;

		currentFrame = 0;
		unsafeWindow.currentFrame = 0;
		
		resetPlay();
		runOtherScripts();

        if (alwaysPause == true) {
            playPaused = false;
            pauseReplay();
        }
        else {
            playPaused = false;
            setTimeout(beginPlay,preDelay);
        }
 	}
	else {
		console.log("am I in here?");
		pauseReplay();
	}
}

function beginPlay() {
	if (postPlayTimer != null) {
		clearTimeout(postPlayTimer);
		postPlayTimer = null;
	}
    runOtherScripts();
	if (playPaused == true) {
		return;
	}
    play();
	playerGraphicsUpdate();	
}

function playIsFinished() {
	if (playFinishedTimer != null) {
		clearTimeout(playFinishedTimer);
		playFinishedTimer = null;
	}
	if (postPlayTimer != null) {
		clearTimeout(postPlayTimer);
		postPlayTimer = null;
	}
	if (playPaused == true) {
		return;
	}
	playDone = false;
	if (document.getElementById("autoplay").checked == false) {
		currentFrame = 0;
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

function drawBall() {
	var playerId = null;
	var pd = play_data;
	var frame = currentFrame;
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

function runOtherScripts() {
    if (alternatePlayers == true) {
    	playerGraphicsUpdate();
    }
	if (highlightPlayers == true) {
		// highlight my players
		pbr_replay_highlight_main();
	}


	// ------- copied from GLB javascript, originally by tciss -------------------
	var fdcolor = "yellow";
	var play_container = document.getElementById("replay_area");
	var dirt = document.getElementsByClassName("play");
	var dir = dirt[0];
	var dirText = dir.innerHTML;
	var ytg = "";
	if(dirText.indexOf(" inches ")!=-1) {
		ytg = '.3';
	}
	else {   
		if(dirText.indexOf(" G on ")!=-1) {
			// later
		}
		else {
			var p2 = dirText.indexOf(" &amp; ")+7;
			var p1 = dirText.indexOf(" on ");
			ytg = dirText.substring(p2,p1);
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
	diff = (greater / Math.abs(greater))*(12+3 + ytg*9);
	los = parseFloat(play_data[0][0].y) * 3;
	div = document.createElement('div');
	div.id = 'fdm';
	div.className = 'player_icon';
	div.style.top  = (los + diff) + 'px';
	div.style.width = '480px';
	div.style.height = '2px';
	div.style.backgroundColor = fdcolor;
	s = div.getAttribute("style");
	s += "z-index:"+(playerLayerZ-1)+";";
	div.setAttribute("style",s);
	div.style.zIndex = playerLayerZ-1;
	play_container.appendChild(div);
	//end fdm
}

function change(address, page) {
	clearTimeout(frameTimer); frameTimer = null;
	clearTimeout(postPlayTimer); postPlayTimer = null;
	clearTimeout(prePlayTimer); prePlayTimer = null;

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

			thisQuarter = document.getElementById("sb: "+(play.quarter-1)+" "+play.team);
			if (thisQuarter.innerHTML == "-") thisQuarter.innerHTML = 0;
	
			thisTotal = document.getElementById("sb: 5 "+play.team);
			if (thisTotal.innerHTML == "-") thisTotal.innerHTML = 0;
			
			if (play.score != 0) {
				qscore = parseFloat(thisQuarter.innerHTML);
				if (isNaN(qscore) == true) qscore = 0;
				qscore += play.score;
				thisQuarter.innerHTML = qscore;
				
				tscore = parseFloat(thisTotal.innerHTML);
				if (isNaN(tscore) == true) tscore = 0;
				tscore += play.score;
				thisTotal.innerHTML = tscore;
			}
		}
	}
	else {
		for (var i=last-1; i>=curr; i--) {
			var play = plays[i];
			thisQuarter = document.getElementById("sb: "+(play.quarter-1)+" "+play.team);
			thisTotal = document.getElementById("sb: 5 "+play.team);
			
			if (play.score != 0) {
				qscore = parseFloat(thisQuarter.innerHTML);
				if (isNaN(qscore) == true) qscore = 0;
				qscore -= play.score;
				thisQuarter.innerHTML = qscore;
				
				tscore = parseFloat(thisTotal.innerHTML);
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
	d.innerHTML = scoreboard.innerHTML.replace("team_row winner","team_row");

	var parent = document.getElementById("restructure");
	parent.firstChild.appendChild(d);	
}


var play_data = null;
var currentFrame = 0;
var playerDiv = new Array();
var playerOvr = new Array();
var replayArea = null;
var lastTime = -1;

function render() {
	//console.log("render: pP="+playPaused+" : pFT="+(playFinishedTimer == null)+" : cF="+currentFrame+" / "+play_data.length);
	//console.log(playPaused);
	//console.log(playFinishedTimer == null);
	if (playPaused == true) {
		return;
	}
	if (playFinishedTimer != null) {
		return;
	}
	
	if (lastTime == -1) {
		lastTime = new Date().getTime();
		if (alwaysPause == true) {
			playPaused = true;
			return;
		}
		else {
			frameTimer = setTimeout(render,preDelay);
            return;
		}
	}
	
	if (currentFrame < play_data.length) {
		var newTime = new Date().getTime();
		var diff = newTime - lastTime;
		//console.log(diff);
		if (diff < frameSpeed) {
			frameTimer = setTimeout(render,0);
			return;
		}
		//console.log("render : "+currentFrame+" -- "+diff+" | "+frameSpeed);
		
		//draw frame here
		drawFrame();
		currentFrame++;
		lastTime = new Date().getTime();
	}
	
	if (currentFrame > play_data.length-1) {
		//console.log(currentFrame+" --- "+(play_data.length-1));
		clearTimeout(frameTimer);
		frameTimer = null;
		
		var p = document.getElementsByClassName("small_head play");
		p[1].setAttribute("style","text-align: center;");
		
		currentFrame = 0;
		playDone = true;
		if (playFinishedTimer == null) {
			playFinishedTimer = setTimeout(playIsFinished,postDelay);
		}
	}
	else {
		frameTimer = setTimeout(render,0);
	}
}

function play() {
	if (frameTimer != null) {
		clearTimeout(frameTimer);
		frameTimer = null;
	}
    if (showFallText == true) {
        resetFalls();
    }
    playPaused = false;
	render();
}

function findPlayer(player, arr) {
    var output = -1;
    for (var i=0; i<arr.length; i++) {
        if (player.id == arr[i].id) {
            output = i;
            break;
        }
//        console.log(player.id+" -- "+arr[i].id);
    }
    //console.log(player.id+" <--> "+arr[output].id);
//    console.log(" : returning "+output);
    if (output == -1) {
        console.log("this is -1 : "+player.id);
    }
    return output;
}

function fixFrames() {
    var pd = new Array();
	for (var cf=0; cf<unsafeWindow.play_data.length-1; cf++) {
		var arr = new Array();
		var arr2 = null;
		for (var i = 0; i < unsafeWindow.play_data[cf].length; i++) {
			var data = unsafeWindow.play_data[cf][i];
			arr.push(data);
//            console.log(data.id+" -- "+data.x+" -- "+data.y+" -- "+data.p);
			if (unsafeWindow.frameSpeed == 50) {
				if (arr2 == null) {
					arr2 = new Array();
				}
				var data2 = unsafeWindow.play_data[cf + 1][i];
				if (data2 != null) {
					if (data2.id != data.id) {
						//fix player order change
						var bool = false;
						for (var pl=0; pl<unsafeWindow.play_data[cf + 1].length; pl++) {
							if (unsafeWindow.play_data[cf + 1][pl].id == data.id) {
								data2 = unsafeWindow.play_data[cf + 1][pl];
								bool = true;
								break;
							}
						}
						if (bool == false) {
							console.log("replayRewrite.fixFrames bool : I shouldn't happen.");
						}
					}
				}

				if (data2 == null) {
					/*
					console.log("why are they not the same length?");
					console.log("a) "+unsafeWindow.play_data[cf].length);
					console.log("b) "+unsafeWindow.play_data[cf+1].length);
					console.log(cf+":"+(cf+1)+" -- "+unsafeWindow.play_data.length);
					console.log(i+" <> "+data+" |||| "+data2);
					*/
				}
				else {
					var d = new Object();
					d.id = data.id;
					d.x = (data.x + data2.x) / 2;
					d.y = (data.y + data2.y) / 2;
					d.z = (data.z + data2.z) / 2;
					if (data2.p != null) d.p = data2.p;
					arr2.push(d);
				}
			}
		}
		pd.push(arr);
		if (arr2 != null) {
			pd.push(arr2);
		}
		//console.log(arr.length+" -- "+arr2.length);
	}
	pd.push(unsafeWindow.play_data[unsafeWindow.play_data.length-1]);
	console.log(unsafeWindow.play_data.length+" --> "+pd.length);
	return pd;
}

function resetPlay() {
	var players = document.getElementsByClassName("player_icon");
	while (players.length > 0) {
		players[0].parentNode.removeChild(players[0]);
		players = document.getElementsByClassName("player_icon");
	}
	
	players = document.getElementsByClassName("player_icon_overlay");
	while (players.length > 0) {
		players[0].parentNode.removeChild(players[0]);
		players = document.getElementsByClassName("player_icon_overlay");
	}
	
	playDone = false;
	playerDiv = new Array();
	playerOvr = new Array();
	play_data = fixFrames();
	currentFrame = 0;
	drawFrame();
//	setTimeout(render, preDelay);
	setTimeout(play, preDelay);

    if (showFallText == true) {
        fall_main(play_data);
    }
}

function drawFrame() {
	var frame = play_data[currentFrame];
	if (frame == null) {
		return;
	}
	for (var i = 1; i < frame.length; i++) {
		var data = frame[i];
		drawPlayer(data.id, data.x, data.y, data.z, data.p);
	}
	drawPlayer('ball', frame[0].x, frame[0].y, frame[0]['z']);
	drawBall();
	positionFrame();
    if (showFallText == true) {
        if (unsafeWindow.frameSpeed == 50) {
            if ( (currentFrame%2) == 0) {
                //console.log("falloutput for "+currentFrame+" -- "+unsafeWindow.frameSpeed+" : "+(currentFrame>>1));
                fallOutput(currentFrame>>1);
            }
        }
        else {
            //console.log("falloutput for "+currentFrame+" -- "+unsafeWindow.frameSpeed+" : "+(currentFrame));
            fallOutput(currentFrame);
        }
    }
}

function drawPlayer(id, x, y, z, p) {
//if (p != null) console.log("mine: "+id+"("+x+","+y+","+z+","+p+")");
	if (replayArea == null) {
		replayArea = document.getElementById("replay_area");
	}

	if (playerDiv[id] == null) {
		var oldDiv = document.getElementById(id);
		if (oldDiv != null) {
			oldDiv.parentNode.removeChild(oldDiv);
		}
		var oldOvr = document.getElementById(id+"_overlay");
		if (oldOvr != null) {
			oldOvr.parentNode.removeChild(oldOvr);
		}

		if (id != "ball") {
			var div = document.createElement('div');
			div.className = 'player_icon';
			div.id = id;
			div.innerHTML = '<img src="/images/' + unsafeWindow.players[id].position + '.png">';
			
			var div_overlay = document.createElement('div');
			div_overlay.className = 'player_icon_overlay';
			div_overlay.id = id + '_overlay';
			div_overlay.innerHTML = '<img src="/images/spacer.gif" style="width: 100%; height: 100%" onmouseover="set_tip(\'' + unsafeWindow.players[id].name.replace(/\\/g, '\\\\').replace(/'/g, "\\" + '&#39;').replace(/"/g, '&quot;') + '\', 0, 1, 1, 1)" onmouseout="unset_tip()" onclick="viewPlayer(\'' + id + '\')">';
			playerDiv[id] = div;
			playerOvr[id] = div_overlay;
			if (disablePlayerOverlays == false) {
				replayArea.appendChild(playerOvr[id]);
			}
			replayArea.appendChild(playerDiv[id]);
		}
		else {
			var div = document.createElement('div');
			div.id = 'ball';
			div.className = 'player_icon';
			
			div.innerHTML = '<img src="/images/ball.gif" style="width: 100%; height=100%;">';
			playerDiv["ball"] = div;
			replayArea.appendChild(playerDiv["ball"]);
		}
	}
	
//	console.log("mine: "+id+"("+x+","+y+","+z+")");
	if (id == "ball") {
		var w = 100; var h = 100;
		if (z != null) {
			w = Math.min(w+(z-4)*3,200);
			h = Math.min(h+(z-4)*3,200);
		}
		
		playerDiv["ball"].style.left = parseInt((x * 3) - 3) + 'px';
		playerDiv["ball"].style.top  = parseInt((y * 3) - 6) + 'px';
		playerDiv["ball"].style.width = parseInt(10 * (w / 100)) + 'px';
		playerDiv["ball"].style.height = parseInt(17 * (h / 100)) + 'px';
	}
	else {
		var nx = x*3-6; var ny = y*3-6;
		playerDiv[id].style.left = nx + 'px';
		playerDiv[id].style.top  = ny + 'px';
		playerOvr[id].style.left = nx + 'px';
		playerOvr[id].style.top  = ny + 'px';
		if (showFallenPlayers == true) {
			if ((p == null) || (currentFrame == 0)) {
			    if (playerDiv[id].firstChild.style.width == "12px") {
				playerDiv[id].firstChild.style.width = "16px";
				playerOvr[id].firstChild.style.width = "16px";
			    }
			}
			else {
				playerDiv[id].firstChild.style.width = "12px";
				playerOvr[id].firstChild.style.width = "12px";
			}
		}
	}
}

function handleFieldGoal(play) {
	var p = plays[play];
	var shp = document.getElementsByClassName("small_head play");
	shp[0].innerHTML = p.timeRemaining+" "+p.down+" & "+p.togo+" on "+p.marker;
	shp[1].innerHTML = p.play;
	
	unsafeWindow.play_data = [unsafeWindow.play_data[0]];
	play_data = [unsafeWindow.play_data[0]];
	if (unsafeWindow.play_data[0] != null) {
		playFinishedTimer = null;
		resetPlay();
	}
}

function positionFrame() {
	var ball = playerDiv["ball"];
	
	var y_spot = parseInt(ball.style.top);
	if (y_spot <= 200) {
		replayArea.style.top = '0px';
	}
	else if (y_spot >= 880) {
		replayArea.style.top = '-680px';
	}
	else {
		replayArea.style.top = '-' + (y_spot - 200) + 'px';
	}
}

function ff() {
	if (playPaused == true) {
		var pdl = play_data.length;
		currentFrame = (pdl+currentFrame+1)%pdl;
		drawFrame();
	}
	else {
		frameSpeed = frameSpeed/2;
	}
}

function rew() {
	if (playPaused == true) {
		var pdl = play_data.length;
		currentFrame = (pdl+currentFrame-1)%pdl;
		drawFrame();
	}
	else {
		frameSpeed = frameSpeed*2;
	}
}

//these fields have yard lines already. DISABLE THE LINE LAYER.
//fields[fields.length] = 'http://img517.imageshack.us/img517/2792/glbfieldgrassph5.jpg';
//fields[fields.length] = 'http://img517.imageshack.us/img517/2551/glbfieldturfhl0.jpg';
//fields[fields.length] = 'http://img517.imageshack.us/img517/811/glbfieldwornwh2.jpg';
//fields[fields.length] = 'http://img215.imageshack.us/img215/5927/glbfieldsloppyweatheryf1.jpg';
//fields[fields.length] = 'http://img205.imageshack.us/img205/2179/glbfieldsnowvs1.jpg';
//fields[fields.length] = 'http://img523.imageshack.us/img523/6463/glbfieldrb0.gif';

// upper decal images
//img.src = "http://img409.imageshack.us/img409/8636/northshadowxf1.png";
//img.src = "http://img510.imageshack.us/img510/1931/eastshadowhs0.png";
//img.src = "http://img515.imageshack.us/img515/9223/glboverlaymappedto100vu7.png";

/*
 * To add a stadium for a particular team, just copy/paste a new <team> --> </team> block.
 * set the id to that team's ID number and insert their particular images in the appropriate places.
 * The xsize/ysize options MUST BE SET for the mid field image.
 *
 * The block for id# -1 is the default stadium to use if no ID match can be found.
 */
var xmlDescription = '\n\
<root>\n\
\n\
    <team id="-1">\n\
        <field></field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="224" ysize="140"></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="0">\n\
        <field></field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="6467">\n\
        <field>http://i41.tinypic.com/2j4asxu.jpg</field>\n\
        <line></line>\n\
        <north>http://i39.tinypic.com/5arviu.jpg</north>\n\
        <south>http://i44.tinypic.com/1pbj40.jpg</south>\n\
        <middle xsize="250" ysize="250">http://i43.tinypic.com/2q3wwav.gif</middle>\n\
        <upper>http://i40.tinypic.com/2uhbbqr.png</upper>\n\
    </team>\n\
    <team id="6465">\n\
        <field>http://i40.tinypic.com/2qmet6h.jpg</field>\n\
        <line></line>\n\
        <north>http://i43.tinypic.com/2qnqyog.jpg</north>\n\
        <south>http://i41.tinypic.com/2n5d14.jpg</south>\n\
        <middle xsize="250" ysize="250">http://i42.tinypic.com/2qci44w.gif</middle>\n\
        <upper>http://i40.tinypic.com/2uhbbqr.png</upper>\n\
    </team>\n\
    <team id="6459">\n\
        <field>http://i41.tinypic.com/2j4asxu.jpg</field>\n\
        <line></line>\n\
        <north>http://i41.tinypic.com/hv5j83.jpg</north>\n\
        <south>http://i39.tinypic.com/es973k.jpg</south>\n\
        <middle xsize="250" ysize="250">http://i44.tinypic.com/2jdl5pj.gif</middle>\n\
        <upper>http://i40.tinypic.com/2uhbbqr.png</upper>\n\
    </team>\n\
    <team id="6466">\n\
        <field>http://img517.imageshack.us/img517/2551/glbfieldturfhl0.jpg</field>\n\
        <line></line>\n\
        <north>http://i41.tinypic.com/293buw2.jpg</north>\n\
        <south>http://i43.tinypic.com/2607v9d.jpg</south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="6473">\n\
        <field>http://i41.tinypic.com/2j4asxu.jpg</field>\n\
        <line></line>\n\
        <north>http://i44.tinypic.com/jpe7pw.jpg</north>\n\
        <south>http://i39.tinypic.com/zbbyg.jpg</south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="6471">\n\
        <field>http://i40.tinypic.com/2qmet6h.jpg</field>\n\
        <line></line>\n\
        <north>http://i39.tinypic.com/28sa13d.jpg</north>\n\
        <south>http://i43.tinypic.com/2yzflg3.jpg</south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="4122">\n\
        <field>http://i41.tinypic.com/2j4asxu.jpg</field>\n\
        <line></line>\n\
        <north>http://i40.tinypic.com/35mql1d.jpg</north>\n\
        <south>http://i43.tinypic.com/nn8m4m.jpg</south>\n\
        <middle xsize="250" ysize="250">http://i40.tinypic.com/2cgdg5l.gif</middle>\n\
        <upper>http://img409.imageshack.us/img409/8636/northshadowxf1.png</upper>\n\
    </team>\n\
    <team id="6477">\n\
        <field>http://i41.tinypic.com/2j4asxu.jpg</field>\n\
        <line></line>\n\
        <north>http://i43.tinypic.com/23kqfww.jpg</north>\n\
        <south>http://i43.tinypic.com/2hx7hi8.jpg</south>\n\
        <middle xsize="250" ysize="250">http://i44.tinypic.com/33b368y.gif</middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="4209">\n\
        <field>http://i41.tinypic.com/2j4asxu.jpg</field>\n\
        <line></line>\n\
        <north>http://i39.tinypic.com/mmv0hu.jpg</north>\n\
        <south>http://i42.tinypic.com/2q03wpd.jpg</south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper>http://img515.imageshack.us/img515/9223/glboverlaymappedto100vu7.png</upper>\n\
    </team>\n\
    <team id="6488">\n\
        <field>http://i41.tinypic.com/2j4asxu.jpg</field>\n\
        <line></line>\n\
        <north>http://i40.tinypic.com/xm0bhf.jpg</north>\n\
        <south>http://i40.tinypic.com/20tf2uq.jpg</south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper>http://i40.tinypic.com/2uhbbqr.png</upper>\n\
    </team>\n\
    <team id="6482">\n\
        <field>http://i41.tinypic.com/2j4asxu.jpg</field>\n\
        <line></line>\n\
        <north>http://i40.tinypic.com/2v0xydw.jpg</north>\n\
        <south>http://i42.tinypic.com/2uem9ty.jpg</south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper>http://img515.imageshack.us/img515/9223/glboverlaymappedto100vu7.png</upper>\n\
    </team>\n\
    <team id="6484">\n\
        <field>http://i40.tinypic.com/2qmet6h.jpg</field>\n\
        <line></line>\n\
        <north>http://i39.tinypic.com/t8xf08.jpg</north>\n\
        <south>http://i39.tinypic.com/t8xf08.jpg</south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="817">\n\
        <field>http://i43.tinypic.com/ab6r68.jpg</field>\n\
        <line></line>\n\
        <north>http://i39.tinypic.com/66ympi.jpg</north>\n\
        <south>http://i41.tinypic.com/2le04n7.jpg</south>\n\
        <middle xsize="250" ysize="250">http://i42.tinypic.com/20itcgn.gif</middle>\n\
        <upper></upper>\n\
    </team>\n\
    <team id="6479">\n\
        <field>http://img517.imageshack.us/img517/2551/glbfieldturfhl0.jpg</field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper>http://i40.tinypic.com/2uhbbqr.png</upper>\n\
    </team>\n\
    <team id="6487">\n\
        <field>http://i43.tinypic.com/ab6r68.jpg</field>\n\
        <line></line>\n\
        <north>http://i40.tinypic.com/2dl2cfa.jpg</north>\n\
        <south>http://i40.tinypic.com/dy7fgn.jpg</south>\n\
        <middle xsize="250" ysize="250">http://i43.tinypic.com/20u7u2o.gif</middle>\n\
        <upper>http://i40.tinypic.com/2uhbbqr.png</upper>\n\
    </team>\n\
</root>\n\
';
