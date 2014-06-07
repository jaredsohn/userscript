// ==UserScript==
// @name           Replay Rewrite
// @description    Originally created by pabst.  i only added a homefield for the chokeland traitors
// @namespace      pbr
// @include        http://goallineblitz.com/game/replay.pl?game_id=*&pbp_id=*
// @include        http://goallineblitz.com/game/home.pl
// @require        http://userscripts.org/scripts/source/28938.user.js
// @require        http://userscripts.org/scripts/source/31566.user.js       
// @require        http://userscripts.org/scripts/source/29460.user.js
// @require        http://userscripts.org/scripts/source/31573.user.js
// @require        http://userscripts.org/scripts/source/51633.user.js
// @require        http://userscripts.org/scripts/source/52054.user.js
// @copyright      2008, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        09.07.04
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

var showFallenPlayers = true; //should pancakes/falls/jukes be shown
var showShrinkAnimation = false; //shrink dots rather than erasing trim

var disablePlayerOverlays = false; //true can improve performance with decal layers

// XML stadium descriptions are at the bottom of this file
var useXMLDescription = true;
var useRemoteXML = true;

// if XML descriptions = true, set the booleans to image types you want to see.
// if XML descriptions = false, set the booleans to image types you want to see and set the addresses here.
// 1080x480
var enableFieldLayer = true;
var fieldImage = "http://img296.imageshack.us/img296/4293/smoothfieldpq9.jpg";

// 1080x480
var enableLineLayer = true;
var lineImage = "http://img527.imageshack.us/img527/3776/glblinesyk7.png";

// 480x91 including outline
var enableLowerDecalLayer = true;
var northEndZoneImage = "http://i10.photobucket.com/albums/a136/ggakma/GLB/ENDZONES/endzone-glb-top.jpg";
var southEndZoneImage = "http://i10.photobucket.com/albums/a136/ggakma/GLB/ENDZONES/endzone-glb-bottom.jpg";

// x & y size MUST be set to the size of your image
var enableMiddleDecalLayer = true;
var middleDecalImage = "http://img184.imageshack.us/img184/320/glblogotx0.png";
var middleDecalImageX = 224; //set to the x-axis length of your image if not using xml
var middleDecalImageY = 140; //set to the y-axis length of your image if not using xml

// 1080x480
var enableUpperDecalLayer = true;
var upperDecalImage = "http://img515.imageshack.us/img515/9223/glboverlaymappedto100vu7.png";

//0: use the CPU-intesive camera, 1: use the GLB default
var camType = 0;

// you can modify the previous variables


// don't screw with these
if (camType == 0) positionFrame = positionFrameComplex;
else positionFrame = positionFrameSimple;

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

var hometeam = unsafeWindow.home;

window.setTimeout( function() {
		if ((window.location+"").indexOf("home.pl") != -1) {
			pbr_replay_highlight_main();

            GM_setValue("gmlist","");
            var teams = document.getElementsByClassName("teamhead");
            var gmlist = "";
            for (var i=0; i<teams.length; i++) {
                 var name = teams[i].firstChild.innerHTML;
                 var id = teams[i].firstChild.href.toString();
                 id = id.slice(id.indexOf("=")+1);
                 gmlist += GM_getValue("gmlist")+id+":"+name+"\t";
            }
            if (gmlist.length > 0) gmlist = gmlist.slice(0,gmlist.length-1);
            GM_setValue("gmlist",gmlist);
            console.log("gmlist="+gmlist);
		}
		else {
			clearTimeout(unsafeWindow.frameTimer);
			unsafeWindow.frameTimer = null;

            if (alwaysPause == true) {
                playPaused = true;
            }

			pbp();
			restructurePage();
			
            if (alwaysPause == true) {
                playPaused = false;
                pauseReplay();
            }
            else {
                playPaused = false;
                //setTimeout(beginPlay,preDelay);
            }
            try {
                runOtherScripts();
            }
            catch (e) {
                console.log("--> "+e);
            }
            resetPlay();
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

function remoteXMLHandler(addr, page) {
    //console.log(page.responseText);
    var src = page.responseText.split('<div id="team_note_content"');
    if (src.length > 1) {
        src = '<div id="team_note_content"'+src[1];
        src = src.split("</div>")[0]+"</div";
        var div = document.createElement("div");
        div.innerHTML = src;
        src = div.textContent;
        //console.log(src);

        var xmlDesc = '<root><team id="'+hometeam+'">';
        var found = false;
        var tags = ["field","north","south","middle","upper"];
        for (var i=0; i<tags.length; i++) {
            var layer = "";
            var start = src.indexOf("<"+tags[i]);
            if (start != -1) {
                var end = src.indexOf("</"+tags[i]+">")+("</"+tags[i]+">").length;
                layer = src.slice(start, end);
                xmlDesc += layer;
                found = true;
            }
            //console.log(start+" -- "+end+" : "+layer);
        }
        if (found == true) {
            xmlDesc += '</team></root>';
            xmlDescription = xmlDesc;
        }
        console.log(xmlDescription);
        useRemoteXML = false;
    }
    else {
        console.log("No remote XML source");
    }
    fieldGraphicsUpdate();
}

function fieldGraphicsUpdate() {
    var graphics = document.getElementById("default_graphics");
    if (graphics.checked == true) return;
    
    if (useRemoteXML == true) {
        console.log("hometeam="+hometeam);
        var addr = "http://goallineblitz.com/game/team.pl?team_id="+hometeam;
        getInetPage(addr, remoteXMLHandler, null);
        useRemoteXML = false;
        useXMLDescription = true;
    }
    else if (useXMLDescription == true) {
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
    plays[currentPlay].formation = getFormation();

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
        var name = t.lastChild.getElementsByTagName("a")[0].innerHTML;
		//console.log(pos+") '"+name+"'");
		if ((pos.match("QB") != null) || (pos.match("ball.gif") != null)) {
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
		else if ((pos.match("OU") != null) || (pos.match("IN") != null) ||
		        (pos.match("BW") != null) || (pos.match("FW") != null)) {
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
    var rst = document.createElement("a");
    rst.innerHTML = "Reset";
    control.insertBefore(rst, control.childNodes[2]);

	var a = control.getElementsByTagName("a");
	for (var i=0; i<a.length; i++) {
		var c = a[i];
		c.setAttribute("onClick","");
        c.style.width = "65px";
		if (c.text == "Pause") {
			c.addEventListener("click",pauseReplay,true);
		}
		else if (c.text == "Play") {
			c.addEventListener("click",play,true);
		}
		else if (c.text == "Reset") {
            c.addEventListener("click", reset, true);
        }
		else if (c.innerHTML.indexOf("Rew") != -1) {
			c.addEventListener("click",rew,true);
		}
		else if (c.innerHTML.indexOf("FF") != -1) {
			c.addEventListener("click",ff,true);
		}
	}

    div = document.createElement("div");
    div.setAttribute("id","dai_container");
    div.style.width = "480px";
    control.appendChild(div);

    var test = document.createElement("input");
    test.setAttribute("type","button");
    test.setAttribute("value","Test OAI");
    test.addEventListener("click",testOAI,true);
    div.appendChild(test);

    test = document.createElement("input");
    test.setAttribute("type","button");
    test.setAttribute("value","Test DAI");
    test.addEventListener("click",testDAI,true);
    div.appendChild(test);

    var select = document.createElement("select");
    select.setAttribute("id","team_select");
    div.appendChild(select);

    var tms = GM_getValue("gmlist","").split("\t");
    for (var i=0; i<tms.length; i++) {
		var opt = document.createElement('option');
		opt.text = tms[i].split(":")[1];
        opt.value = tms[i].split(":")[0];
		select.add(opt,null);
    }

    var graphics = document.createElement("input");
    graphics.setAttribute("id","default_graphics");
    graphics.setAttribute("type","checkbox");
    graphics.checked = GM_getValue("RR-graphics","0") == "1";
    graphics.addEventListener("click",graphicsCheckbox,true);
    if (graphics.checked == true) GM_setValue("RR-graphics","1");
    else GM_setValue("RR-graphics","0");

    var text = document.createElement("text");
    text.innerHTML = " Use default field graphics";

    var cont = document.getElementById("dai_container");
    cont.parentNode.insertBefore(graphics, cont);
    cont.parentNode.insertBefore(text, cont);
}

function graphicsCheckbox() {
    var graphics = document.getElementById("default_graphics");
    if (graphics.checked == true) {
        GM_setValue("RR-graphics","1");
    }
    else {
        GM_setValue("RR-graphics","0");
        useXMLDescription = true;
        useRemoteXML = true;
        fieldGraphicsUpdate();
    }
}

function testDAI() {
    var play = plays[currentPlay];
    var oteam = document.getElementsByClassName("team_name")[3].childNodes[1].innerHTML;
    var dteam = document.getElementsByClassName("team_name")[4].childNodes[1].innerHTML;
    var oscore = document.getElementById("sb: 5 "+oteam).innerHTML;
    var dscore = document.getElementById("sb: 5 "+dteam).innerHTML;
    if (oscore == "-") oscore = 0;
    if (dscore == "-") dscore = 0;
    var score = Math.abs(dscore - oscore);
    var score_neg_pos = (dscore - oscore) / (score || 1);
    
    var qtr = play.quarter;
    var secs = play.timeRemaining.split(":");
    secs = parseInt(secs[0])*60+parseInt(secs[1]);
    var spotWho = play.marker.split(" ")[0];
    if (spotWho == "Opp") {
        spotWho = "own";
    }
    else {
        spotWho = "their";
    }
    var spot = play.marker.split(" ")[1];
    var down = play.down;
    var togo = play.togo;
    var formation = play.formation;
    var receivers = 2;
    if (formation == "Shotgun+5WR") {
        formation = "Shotgun";
        receivers = 5;
    }
    else if (formation == "Shotgun") {
        receivers = 3;
    }
    else if (formation.indexOf("Singleback+Big") != -1) {
        receivers = 2;
    }
    else if (formation.indexOf("Singleback") != -1) {
        receivers = 3;
    }
    else if (formation == "I+Big") {
        receivers = 1;
    }
    else if (formation == "I") {
        receivers = 2;
    }
    else if (formation == "Goal+Line") {
        receivers = 0;
    }
    var mytime = play.timeoutsRemaining[1];
    var opptime = play.timeoutsRemaining[0];
    var teamid = document.getElementById("team_select").value;
    var action = "Test";
    var post = "quarter="+qtr;
    post += "&time_remaining="+secs;
    post += "&spot_who="+spotWho;
    post += "&spot="+spot;
    post += "&down="+down;
    post += "&to_go="+togo;
    post += "&score_neg_pos="+score_neg_pos;
    post += "&score="+score;
    post += "&formation="+formation;
    post += "&receivers="+receivers;
    post += "&my_timeouts="+mytime;
    post += "&opponent_timeouts="+opptime;
    post += "&team_id="+teamid;
    post += "&action="+action;
    console.log(post);

    var address = "http://goallineblitz.com/game/team_defense_ai_test.pl?team_id="+teamid;
	return GM_xmlhttpRequest({
		method: 'POST',
		url: address,
        data: post,
		headers: {
		    'User-agent': 'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9) Gecko/2008052912 Firefox/3.0 Greasemonkey',
		    'Accept': 'text/html',
            'Host': 'goallineblitz.com',
            'Content-type': 'application/x-www-form-urlencoded'
	    },
	    onreadystatechange: function(page) {
	    	if (page.readyState == 4) {
				if (page.status != 200) {
					alert("pbr gm script: Error "+page.status+" loading "+address);
				}
				else {
                    var text = page.responseText;
                    var idx = text.indexOf('<div class="medium_head">Matching Input</div>');
                    text = text.slice(idx);
                    idx = text.indexOf('</div></div>');
                    text = text.slice(0,idx+'</div></div>'.length);

                    var dai = document.getElementById("dai");
                    if (dai == null) {
                        var cont = document.getElementById("dai_container");
                        dai = document.createElement("div");
                        dai.setAttribute("id","dai");
                        dai.style.textAlign = "left";
                        cont.appendChild(dai);
                    }
                    dai.innerHTML = "<b>Formation:</b> "+formation.replace("+"," ")+" ("+receivers+")<br>"+text;
                    //console.log(text);
				}
	    	}
		}
    });
}

function testOAI() {
    var play = plays[currentPlay];
    var oteam = document.getElementsByClassName("team_name")[3].childNodes[1].innerHTML;
    var dteam = document.getElementsByClassName("team_name")[4].childNodes[1].innerHTML;
    var oscore = document.getElementById("sb: 5 "+oteam).innerHTML;
    var dscore = document.getElementById("sb: 5 "+dteam).innerHTML;
    if (oscore == "-") oscore = 0;
    if (dscore == "-") dscore = 0;
    var score = Math.abs(oscore - dscore);
    var score_neg_pos = (oscore - dscore) / (score || 1);
    var qtr = play.quarter;
    var secs = play.timeRemaining.split(":");
    secs = parseInt(secs[0])*60+parseInt(secs[1]);
    var spotWho = play.marker.split(" ")[0];
    if (spotWho == "Opp") {
        spotWho = "their";
    }
    else {
        spotWho = "own";
    }
    var spot = play.marker.split(" ")[1];
    var down = play.down;
    var togo = play.togo;

    var mytime = play.timeoutsRemaining[0];
    var opptime = play.timeoutsRemaining[1];
    var teamid = document.getElementById("team_select").value;
    var action = "Test";
    var post = "quarter="+qtr;
    post += "&time_remaining="+secs;
    post += "&spot_who="+spotWho;
    post += "&spot="+spot;
    post += "&down="+down;
    post += "&to_go="+togo;
    post += "&score_neg_pos="+score_neg_pos;
    post += "&score="+score;
    post += "&my_timeouts="+mytime;
    post += "&opponent_timeouts="+opptime;
    post += "&team_id="+teamid;
    post += "&action="+action;
    console.log(post);

    var address = "http://goallineblitz.com/game/team_ai_test.pl?team_id="+teamid;
	return GM_xmlhttpRequest({
		method: 'POST',
		url: address,
        data: post,
		headers: {
		    'User-agent': 'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9) Gecko/2008052912 Firefox/3.0 Greasemonkey',
		    'Accept': 'text/html',
            'Host': 'goallineblitz.com',
            'Content-type': 'application/x-www-form-urlencoded'
	    },
	    onreadystatechange: function(page) {
	    	if (page.readyState == 4) {
				if (page.status != 200) {
					alert("pbr gm script: Error "+page.status+" loading "+address);
				}
				else {
                    var text = page.responseText;
                    var idx = text.indexOf('<div class="medium_head">Matching Input</div>');
                    text = text.slice(idx);
                    idx = text.indexOf('<div style="clear');
                    text = text.slice(0,idx);

                    var dai = document.getElementById("dai");
                    if (dai == null) {
                        var cont = document.getElementById("dai_container");
                        dai = document.createElement("div");
                        dai.setAttribute("id","dai");
                        dai.style.textAlign = "left";
                        cont.appendChild(dai);
                    }
                    dai.innerHTML = text;
                    //console.log(text);
				}
	    	}
		}
    });
}

function getFormation() {
    var offense = ["QB","HB","FB","TE","TE2","TE3","LOT","ROT","LG","RG","C","WR1","WR2","WR3","WR4","WR5","K","P"];
    var players = new Array();
    for (var i=0; i<document.images.length; i++) {
        var str = document.images[i].src;
        for (var j=0; j<offense.length; j++) {
            if (str.indexOf("/"+offense[j]+".gif") != -1) {
                while(str.indexOf("/") != -1) {
                    str = str.slice(str.indexOf("/")+1);
                }
                str = str.replace(".gif","");
                if (str == "TE") {
                    if (players["TE"] == null) {
                        players["TE"] = document.images[i];
                    }
                    else if (players["TE2"] == null) {
                        players["TE2"] = document.images[i];
                    }
                    else {
                        players["TE3"] = document.images[i];
                    }
                }
                else {
                    players[str] = document.images[i];
                }
                break;
            }
        }
    }
//    console.log(players);

    var formation = "Unknown";
    try {
        if (players["K"] != null) {
            formation = "Kickoff";
        }
        else if (players["P"] != null) {
            formation = "Punt";
        }
        else if (players["WR5"] != null) {
            formation = "Shotgun+5WR";
        }
        else if (players["TE3"] != null) {
            formation = "Goal+Line";
        }
        else if (diff(players["QB"].style.top, players["C"].style.top) > 25) {
            formation = "Shotgun";
        }
        else if ((diff(players["QB"].style.top, players["HB"].style.top) > 25) &&
                 (players["FB"] == null)) {
                 if (players["TE2"] == null) {
                     formation = "Singleback";
                 }
                 else {
                     formation = "Singleback+Big";
                 }
        }
        else if (diff(players["HB"].style.top, players["FB"].style.top) < 3) {
            formation = "Splitbacks+Pro";
        }
        else if (diff(players["HB"].style.left, players["FB"].style.left) < 3) {
            if (players["TE2"] != null) {
                formation = "I+Big";
            }
            else {
                formation = "I";
            }
        }
        else if ((diff(players["QB"].style.top, players["HB"].style.top) > 25) &&
                 (diff(players["WR1"].style.left, players["HB"].style.left) > diff(players["WR1"].style.left, players["FB"].style.left))) {
            formation = "I+Weak";
        }
        else if ((diff(players["QB"].style.top, players["HB"].style.top) > 25) &&
                 (diff(players["WR1"].style.left, players["HB"].style.left) < diff(players["WR1"].style.left, players["FB"].style.left))) {
            formation = "I+Strong";
        }
        /*
        else if ((diff(players["QB"].style.top, players["HB"].style.top) > 25) &&
                 (diff(players["TE"].style.left, players["HB"].style.left) > diff(players["TE"].style.left, players["FB"].style.left))) {
            formation = "I+Strong";
        }
        else if ((diff(players["QB"].style.top, players["HB"].style.top) > 25) &&
                 (diff(players["TE"].style.left, players["HB"].style.left) < diff(players["TE"].style.left, players["FB"].style.left))) {
            formation = "I+Weak";
        }
        */
    }
    catch (e) {
    }
    console.log("Formation = "+formation);
    return formation;
}

function diff(x, y) {
    var a = parseFloat(x);
    var b = parseFloat(y);
    return Math.max(a,b) - Math.min(a,b);
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

    var dai = document.getElementById("dai");
    if (dai != null) dai.innerHTML = "";
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
		var pt = page.responseText.slice(page.responseText.indexOf("var ptid =")+"var ptid =".length);
		pt = pt.slice(0,pt.indexOf(";"));

		var newplayers = null;
		var newplay_data = null;
		eval("newplayers = "+p);
		newplay_data = eval(pd);
        eval("ptid = "+pt);

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
    var el = document.getElementById("pbrball");
    if (poss_data[currentFrame] == null) {
        if (el != null) {
            el.parentNode.removeChild(el);
        }
    }
    else {
        if (currentFrame > 0) {
            if (poss_data[currentFrame-1] == poss_data[currentFrame]) {
                return;
            }
        }
        if (el != null) {
            el.parentNode.removeChild(el);
        }
        playerId = poss_data[currentFrame];
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
    var container = document.getElementsByClassName("content_container");
    for (var i=0; i<container.length; i++) {
        traceClear(container[i]);
    }
    var paths = [];
    while ((paths = document.getElementsByClassName("player_path")).length > 0) {
        var p = paths[0];
        p.parentNode.removeChild(p);
    }
    addInputs();
    tracemain();
    
    if (alternatePlayers == true) {
       	playerGraphicsUpdate();
    }
	if (highlightPlayers == true) {
		// highlight my players
   		pbr_replay_highlight_main();
	}
}

function createDownLines() {
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
	
    if (play_data[0] != null) {
        //line of scrimmage
        var greater=0;
        for (var i=1; i<play_data[0].length; i++) {
            if (play_data[0][i].y > play_data[0][0].y) greater++;
            else greater--;
        }
        var diff = (greater / Math.abs(greater));
        if (diff < 0) diff = -1;
        else diff = 7;
        //console.log(diff);
        var ps = document.getElementsByClassName("position");
        var pid = 999;
        for (var i=0; i<ps.length; i++) {
            if (ps[i].innerHTML == "C") {
                var a = ps[i].nextSibling.getElementsByTagName("a")[0];
                pid = a.href.slice(a.href.indexOf("=")+1);
                //console.log("name="+ps[i].nextSibling.firstChild.name);
                //pid = parseInt(ps[idx].nextSibling.firstChild.name);
                break;
            }
        }
        for (var i=0; i<play_data[0].length; i++) {
            if (play_data[0][i].id == pid) {
                pid = i;
                break;
            }
        }

        if (play_data[0][pid] != null) {
            var los = parseFloat(play_data[0][pid].y);
            var div = document.createElement('div');
            div.id = 'los';
            div.className = 'player_icon';
            div.style.top  = (los+diff) + 'px';
            div.style.width = '480px';
            div.style.height = '2px';
            div.style.backgroundColor = 'blue';
            div.style.zIndex = playerLayerZ-1;
            play_container.appendChild(div);
            //end los

            //first down marker
            diff = Math.abs(diff)/diff * ytg * 9 + diff;
            los = parseFloat(play_data[0][pid].y);
            div = document.createElement('div');
            div.id = 'fdm';
            div.className = 'player_icon';
            div.style.top  = (los + diff) + 'px';
            div.style.width = '480px';
            div.style.height = '2px';
            div.style.backgroundColor = fdcolor;
            div.style.zIndex = playerLayerZ-1;
            play_container.appendChild(div);
            //end fdm
        }
        else {
            console.log(play_data.length+" -- "+pid+" : play_data[0][pid] == null");
        }
    }
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
//	console.log(p);
 	
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
	var src = scoreboard.innerHTML;
	src = src.split("&amp;#");
	var text = src[0];
	for (var i=1; i<src.length; i++) {
	        var location = src[i].indexOf(";");
	        var after = String.fromCharCode(src[i].slice(0,location))+src[i].slice(location+1);
	        text += after;
	}
        scoreboard.innerHTML = text;
        
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

var cam_data = null;
var play_data = null;
var poss_data = null;
var currentFrame = 0;
var playerDiv = new Array();
var playerOvr = new Array();
var ptid = unsafeWindow.ptid;
var useDefaultColors = unsafeWindow.useDefaultColors;
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
        //diffarray.push(diff);
		if (diff < frameSpeed) {
			frameTimer = setTimeout(render,5);//frameSpeed-diff);
			return;
		}

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
        //console.log(diffarray);
        //diffarray = new Array();
	}
	else {
		frameTimer = setTimeout(render,5);//frameSpeed>>2);
	}
}
//var diffarray = new Array();

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
    //console.log("?");
    for (var i=0; i<arr.length; i++) {
        //console.log(player.id);
        if (player.id == arr[i].id) {
            output = i;
            if (player.id == "398334") console.log(player.id+" -- "+arr[i].id);
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
							console.log("replayRewrite.fixFrames bool : Player is missing from play_data. Position will be wrong.  f="+(cf+1)+"  pl="+data.id);
                            data2 = data;
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

    cam_data = new Array();
    if ((camType == 0) && (pd != null)) {
        for (var i=0; i<pd.length; i++) {
            cam_data.push(0);
            if (pd[i] == null) break;

            if (pd[i].length < 23) {
                cam_data[i] = cam_data[i-1];
            }
            else {
                for (var p=0; p<pd[i].length; p++) {
                    cam_data[i] += pd[i][p].y*3;
                }
                cam_data[i] = cam_data[i]/pd[i].length;

                var ballTop = pd[i][0].y*3;
                var top = cam_data[i] - 250;
                if (top+425 < ballTop) {
                    top = ballTop - 425;
                }
                else if (top+75 > ballTop) {
                    top = ballTop-75;
                }
                var val = 0 - top;
                val = Math.min(0, val);
                val = Math.max(val, -580);
                cam_data[i] = parseInt(val);
            }
        }
    }

    poss_data = new Array();
    if (pd[0] != null) {
        for (var f=0; f<pd.length; f++) {
            var current = null;
            var ball = pd[f][0];
            for (var p=1; p<pd[f].length; p++) {
                var player = pd[f][p];
                if (ball.y != player.y) continue;
                if ((ball.x != player.x) && (ball.x+2 != player.x)) continue;
                current = player.id;
                break;
            }
            poss_data.push(current);
        }
    }

    if (pd[0] != null) {
        for (var f=0; f<pd.length; f++) {
            pd[f][0].x = parseInt(pd[f][0].x*3 - 3);
            pd[f][0].y = parseInt(pd[f][0].y*3 - 6);
            if (pd[f][0].z != null) {
                pd[f][0].z = Math.min(100+(pd[f][0].z-4)*3, 200)/100;
            }
            else {
                pd[f][0].z = 1;
            }
            for (var g=1; g<pd[f].length; g++) {
                pd[f][g].x = parseInt(pd[f][g].x*3 - 6);
                pd[f][g].y = parseInt(pd[f][g].y*3 - 6);
            }
        }
    }
    else {
        return new Array();
    }
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

	createDownLines();

    currentFrame = 0;
	drawFrame();

    if (playPaused == false) {
        setTimeout(play, preDelay);
    }
}

function drawFrame() {
	var frame = play_data[currentFrame];
	if (frame == null) {
		return;
	}

	if (replayArea == null) {
		replayArea = document.getElementById("replay_area");
	}
	for (var i = 1; i < frame.length; i++) {
		var data = frame[i];
		drawPlayer(data.id, data.x, data.y, data.z, data.p);
	}
	drawPlayer('ball', frame[0].x, frame[0].y, frame[0]['z']);
	drawBall();
	positionFrame();
}

function createPlayerDot(id, x, y, z, p) {
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
            var div = document.createElement('img');
            div.className = 'player_icon';
            div.id = id;
            if (document.getElementById("use_colors").checked == true) {
                div.src = '/images/' + unsafeWindow.players[id].position + '.png';
            }
            else {
                var path = "";
                if (hometeam == ptid[id]) {
                    var color1 = unsafeWindow.home_color1;
                    var color2 = unsafeWindow.home_color2;
                    var border = unsafeWindow.home_border;
                    path = color2;
                    if (border != 0) {
                        path += "_border";
                    }
                    path += "_home";
                }
                else {
                    var color1 = unsafeWindow.away_color1;
                    var color2 = unsafeWindow.away_color2;
                    var border = unsafeWindow.away_border;
                    path = color2;
                    if (border != 0) {
                        path += "_border";
                    }
                }

                div.src = '/images/dots/' + path + '/' + unsafeWindow.players[id].position + '.gif';
                div.style.backgroundImage = "url(/images/dots/" + color1 + ".gif)";
                div.style.zIndex = playerLayerZ;
            }
            playerDiv[id] = div;

            var div_overlay = document.createElement('div');
            div_overlay.className = 'player_icon_overlay';
            div_overlay.id = id + '_overlay';
            div_overlay.innerHTML = '<img src="/images/spacer.gif" style="width: 100%; height: 100%; z-index: '+iconOverlayLayerZ+';" onmouseover="set_tip(\'' + unsafeWindow.players[id].name.replace(/\\/g, '\\\\').replace(/'/g, "\\" + '&#39;').replace(/"/g, '&quot;') + '\', 0, 1, 1, 1)" onmouseout="unset_tip()" onclick="viewPlayer(\'' + id + '\')">';
            div_overlay.style.zIndex = iconOverlayLayerZ;
            playerOvr[id] = div_overlay;

            replayArea.appendChild(playerDiv[id]);
            if (disablePlayerOverlays == false) {
                replayArea.appendChild(playerOvr[id]);
            }

		}
		else {
			var div = document.createElement('div');
			div.id = 'ball';
			div.className = 'player_icon';

			div.innerHTML = '<img src="/images/ball.gif" style="width: 100%; height=100%;">';
            div.style.zIndex = playerLayerZ;
			playerDiv["ball"] = div;
			replayArea.appendChild(playerDiv["ball"]);
		}
	}

}

function drawPlayer(id, x, y, z, p) {
//if (p != null) console.log("mine: "+id+"("+x+","+y+","+z+","+p+")");
//	console.log("mine: "+id+"("+x+","+y+","+z+")");
	if (playerDiv[id] == null) { 
        createPlayerDot(id, x, y, z, p);
    }
	if (id == "ball") {
//		var w = 100; var h = 100;
//		if (z != null) {
//			w = Math.min(w+(z-4)*3,200);
//			h = Math.min(h+(z-4)*3,200);
//            w = w+z;
//            h = h+z;
//		}
		
		playerDiv["ball"].style.left = x+'px';//parseInt((x * 3) - 3) + 'px';
		playerDiv["ball"].style.top  = y+'px';//parseInt((y * 3) - 6) + 'px';
		playerDiv["ball"].style.width = parseInt(10 * z) + 'px';
		playerDiv["ball"].style.height = parseInt(17 * z) + 'px';
	}
	else {
//        var nx = x*3-6; var ny = y*3-6;
        playerDiv[id].style.left = x + 'px';
        playerDiv[id].style.top  = y + 'px';
        playerOvr[id].style.left = x + 'px';
        playerOvr[id].style.top  = y + 'px';
		if (showFallenPlayers == true) {
			if ((p == null) || (currentFrame == 0)) {
                if (playerDiv[id].src == "http://goallineblitz.com/images/spacer.gif") {
                    playerDiv[id].parentNode.removeChild(playerDiv[id]);
                    playerDiv[id] = null;
                    playerOvr[id].parentNode.removeChild(playerOvr[id]);
                    playerOvr[id] = null;
                    createPlayerDot(id, x, y, z, null);
                    playerDiv[id].style.left = x + 'px';
                    playerDiv[id].style.top  = y + 'px';
                    playerOvr[id].style.left = x + 'px';
                    playerOvr[id].style.top  = y + 'px';
                    if (highlightPlayers == true) {
                        pbr_replay_highlight_main();
                    }
                }
                else if (playerDiv[id].style.width != "16px") {
                    var img = playerDiv[id].style.backgroundImage.toString();
                    img = img.replace("_small.gif",".gif");
                    playerDiv[id].style.width = "16px";
                    playerDiv[id].style.height = "16px";
                    playerDiv[id].style.backgroundImage = img;
                }
			}
			else {
                if (showShrinkAnimation == true) {
                    var img = playerDiv[id].style.backgroundImage.toString();
                    if (img.indexOf("_small.gif") == -1) {
                        img = img.replace(".gif","_small.gif");
                        playerDiv[id].style.width = "12px";
                        playerDiv[id].style.height = "12px";
                        playerDiv[id].style.backgroundImage = img;
                    }
                }
                else {
                    if (document.getElementById("use_colors").checked == false) {
                        if (playerDiv[id].src != "/images/spacer.gif") {
                            playerDiv[id].src = "/images/spacer.gif";
                        }
                    }
                }
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

function positionFrameComplex() {
    /*
    var ball = playerDiv["ball"];
    var ballTop = parseInt(ball.style.top);
    var top = cam_data[currentFrame] - 250;
    if (top+425 < ballTop) {
        top = ballTop - 425;
    }
    else if (top+50 > ballTop) {
        top = ballTop-50;
    }
    var val = 0 - top;
    val = Math.min(0, val);
    val = Math.max(val, -580);
    replayArea.style.top = val+'px';
    */
    replayArea.style.top = cam_data[currentFrame]+"px";
}

function positionFrameSimple() {
    var ball = playerDiv["ball"];
    var y_spot = parseInt(ball.style.top);
    if (y_spot <= 300) {
        replayArea.style.top = '0px';
    }
    else if (y_spot >= 880) {
        replayArea.style.top = '-580px';
    }
    else {
        replayArea.style.top = '-' + (y_spot - 300) + 'px';
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

function reset() {
    playPaused = true;
    currentFrame = 0;
    //resetPlay();
    drawFrame();
}

//these fields have yard lines already. DISABLE THE LINE LAYER.
//fields[fields.length] = 'http://img517.imageshack.us/img517/2792/glbfieldgrassph5.jpg';
//fields[fields.length] = 'http://img517.imageshack.us/img517/2551/glbfieldturfhl0.jpg';
//fields[fields.length] = 'http://img517.imageshack.us/img517/811/glbfieldwornwh2.jpg';
//fields[fields.length] = 'http://img215.imageshack.us/img215/5927/glbfieldsloppyweatheryf1.jpg';
//fields[fields.length] = 'http://img205.imageshack.us/img205/2179/glbfieldsnowvs1.jpg';
//fields[fields.length] = 'http://img523.imageshack.us/img523/6463/glbfieldrb0.gif';
//fields[fields.length] = 'http://img95.imageshack.us/img95/2734/myfield.jpg';

// upper decal images
//img.src = "http://img409.imageshack.us/img409/8636/northshadowxf1.png";
//img.src = "http://img510.imageshack.us/img510/1931/eastshadowhs0.png";
//img.src = "http://img515.imageshack.us/img515/9223/glboverlaymappedto100vu7.png";

//my unlined field
//"http://img296.imageshack.us/img296/4293/smoothfieldpq9.jpg"

// my lines
//"http://img527.imageshack.us/img527/3776/glblinesyk7.png"

//two GLB endzones
//north: "http://i10.photobucket.com/albums/a136/ggakma/GLB/ENDZONES/endzone-glb-top.jpg"
//south: "http://i10.photobucket.com/albums/a136/ggakma/GLB/ENDZONES/endzone-glb-bottom.jpg"

// GLB logo for the middle
// "http://img184.imageshack.us/img184/320/glblogotx0.png"; 224x140

/*
 * To add a stadium for a particular team, just copy/paste a new <team> --> </team> block.
 * set the id to that team's ID number and insert their particular images in the appropriate places.
 * The xsize/ysize options MUST BE SET for the mid field image.
 *
 * The block for id# -1 is the default stadium to use if no ID match can be found.
 */
var xmlDescription = '\n\
<root>\n\
    <team id="3154">\n\
        <field>http://goallineblitz.com/images/field.jpg</field>\n\
        <north>http://img88.imageshack.us/img88/7484/traitornorthendzone.jpg</north>\n\
        <south>http://img40.imageshack.us/img40/6049/traitorsouthendzone.jpg</south>\n\
        <middle xsize="200" ysize="190">http://img190.imageshack.us/img190/3831/midfieldal3.png</middle>\n\
        <upper>http://img510.imageshack.us/img510/1931/eastshadowhs0.png</upper>\n\
    </team>\n\
    <team id="-1">\n\
        <field></field>\n\
        <line></line>\n\
        <north></north>\n\
        <south></south>\n\
        <middle xsize="" ysize=""></middle>\n\
        <upper></upper>\n\
    </team>\n\
</root>\n\
';
