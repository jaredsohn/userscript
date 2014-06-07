// ==UserScript==
// @name           Replay Rewrite
// @namespace      tr
// @include        http://*goallineblitz.com/game/replay.pl?game_id=*&pbp_id=*
// @copyright      2009, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        09.08.10
// @require        http://userscripts.org/scripts/source/28938.user.js
// @require        http://userscripts.org/scripts/source/31573.user.js
// @require        http://userscripts.org/scripts/source/54630.user.js
// ==/UserScript==

/*
 *
 * pabst did this 09/07/21+
 *
 *
 */

const scriptName = "Replay Rewrite";
const scriptVersion = "09.08.10";
const scriptWebpage = "http://userscripts.org/scripts/show/31640";

// you can modify the following variables
///var autoplay = false;
var preDelay = 2000;
var postDelay = 2000;
var alwaysPause = false;

//changing this will cause the script to follow the account option
var alwaysShowPlayText = false;//(unsafeWindow.hide_scores != 1);

var showFallenPlayers = true; //should pancakes/falls/jukes be shown
// you can modify the previous variables

// don't screw with these
var replayRewrite = true;

var plays = null;
var currentPlay = -1;

var playDone = false;
var playPaused = false;

var prePlayTimer = null;
var postPlayTimer = null;
var playFinishedTimer = null;

var httpRequest = null;

var frameSpeed = unsafeWindow.frameSpeed - parseInt(unsafeWindow.frameSpeed*0.10);
var frameTimer = null;

var hometeam = unsafeWindow.home;


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
var thisScore = unsafeWindow.this_score;
var scoreUpdate = unsafeWindow.score_update;


window.setTimeout( 
	function() {
		unsafeWindow.pause();
		clearTimeout(unsafeWindow.frameTimer);
		unsafeWindow.frameTimer = null;

		main();
	}
, 1);

function main() {
	clearPlayers();
    addScriptTags();
	restructurePage();
	addPlayerLinks();
    pbpSetup();
}

function createButton(title, cls) {
	var btn = document.createElement("a");
	btn.className = "button left "+cls;
	btn.innerHTML = "<span>"+title+"</span>";
	return btn;
}

function addScriptTags() {
    var rrtag = document.createElement("div");
    rrtag.setAttribute("id","rrtag");

    var div = document.createElement("div");
    div.id = "active_list";
    div.innerHTML = "<b>Active GM Scripts</b>";
    rrtag.appendChild(div);

	var rrplay = document.createElement("input");
	rrplay.setAttribute("id","rrplay");
	rrplay.setAttribute("style","display:none; visibility:hidden;");
	rrplay.setAttribute("type","text");
	rrplay.setAttribute("value",window.location.toString());

    document.body.appendChild(rrtag);
    document.body.appendChild(rrplay);
    addToActive();
}

function restructurePage() {
	var playHeader = document.getElementById("replay_header");
	var playInfo = playHeader.childNodes[5];
	playInfo.id = "play_info";	
	var playDesc = playHeader.childNodes[7];
	playDesc.id = "play_outcome";
    if (alwaysShowPlayText == false) {
        playDesc.style.display = "block";
        playDesc.style.visibility = "hidden";
    }
    
	var color = document.getElementById("color_options");
    color.style.width = "190px";

    var pposs = createButton("<< Prev Poss","ppossbtn");
    var pplay = createButton("< Prev", "pplaybtn");
    var rst = createButton("Reset","resetbtn");
    var nplay = createButton("Next >", "nplaybtn");
    var nposs = createButton("Next Poss >>", "npossbtn");

    var btns = document.getElementsByClassName("button left");

    var rewbtn = document.createElement("a");
    rewbtn.className = "button left rewbtn";
    rewbtn.innerHTML = '<span class="button_ff_rw"><img src="/images/game/design/replay/button_rw.gif"/></span>';

    var pausebtn = document.createElement("a");
    pausebtn.setAttribute("class","button left pausebtn");
    pausebtn.innerHTML = '<span class="button_ff_rw"><img src="/images/game/design/replay/button_pause.gif"/></span>';

    var playbtn = document.createElement("a");
    playbtn.setAttribute("class","button left playbtn");
    playbtn.innerHTML = '<span class="button_ff_rw"><img src="/images/game/design/replay/button_play.gif"/></span>';

    var ffbtn = document.createElement("a");
    ffbtn.setAttribute("class","button left ffbtn");
    ffbtn.innerHTML = '<span class="button_ff_rw"><img src="/images/game/design/replay/button_ff.gif"/></span>';

	var control = document.getElementById("controls");
    control.style.width = "650px";
    control.style.marginLeft = "0px";
    while (control.childNodes.length > 0) {
        control.removeChild(control.firstChild);
    }

    control.appendChild(pposs);
    control.appendChild(pplay);
    control.appendChild(rst);
    control.appendChild(rewbtn);
    control.appendChild(pausebtn);
    control.appendChild(playbtn);
    control.appendChild(ffbtn);
    control.appendChild(nplay);
    control.appendChild(nposs);
    //nposs.style.visibility = "hidden";
    //pposs.style.visibility = "hidden";

	pposs.addEventListener("click",input,true);
	pplay.addEventListener("click",input,true);
    rst.addEventListener("click", reset, true);
    rewbtn.addEventListener("click",rew,true);
	playbtn.addEventListener("click",play,true);
	pausebtn.addEventListener("click",pauseReplay,true);
    ffbtn.addEventListener("click",ff,true);
	nplay.addEventListener("click",input,true);
	nposs.addEventListener("click",input,true);

    var div = document.createElement("div");
    div.setAttribute("style","float: right");
    div.style.marginRight = "10px";
    div.style.marginTop = "15px";
/*
    var aplay = document.createElement("input");
    aplay.id = "autoplay";
    aplay.type = "checkbox";
    aplay.checked = autoplay;

    div.innerHTML += "Auto-play&nbsp;";
    div.appendChild(aplay);

	var speed = document.getElementById("speed_option");
    speed.parentNode.insertBefore(div,speed);
    speed.parentNode.removeChild(speed);
*/
	var speed = document.getElementById("speed_option");
    speed.removeChild(speed.firstChild);
    speed.firstChild.innerHTML = "Change Speed";
    speed.removeChild(speed.childNodes[1]);

}

function pbpSetup() {
    var pbptag = document.createElement("div");
    pbptag.setAttribute("id","pbp");

    var pbp = document.getElementById("pbp");
    if (pbp == null) {
        document.body.appendChild(pbptag);

        var href = window.location.toString();
        href = href.replace("replay.pl","game.pl");
        var idx = href.indexOf("&pbp_id");
        href = href.slice(0,idx) + "&mode=pbp";

        getInetPage(href, importPBP);
        setTimeout(pbpSetup, 300);
        return;
    }
    else if (pbp.childNodes.length == 0) {
        setTimeout(pbpSetup, 300);
        return;
    }

    var page = new Object();
    page.responseText = pbp.innerHTML;
    if (plays == null) {
        loadPBPSimple(page);
    }

    resetPlay();
    //unsafeWindow.play_data = play_data.slice();
    buttonSetup();
    if (alwaysPause == false) {
        play();
    }
}

function buttonSetup(play) {
    var currentPlay = -1;
    if (play == null) {
        var addr = document.getElementById("rrplay").value;
        for (var i=0; i<plays.length; i++) {
            if (plays[i].replay == addr) {
                currentPlay = i;
                break;
            }
        }
    }
    else {
        currentPlay = play;
    }
    console.log("currentPlay = "+currentPlay);

	var control = document.getElementById("controls");
    var buttons = control.getElementsByClassName("button");
    for (var i=0; i<buttons.length; i++) {
        var b = buttons[i];
        if (b.firstChild.innerHTML == "Next &gt;") {
            b.id = Math.min(currentPlay+1, plays.length-1);
        }
        else if (b.firstChild.innerHTML == "Next Poss &gt;&gt;") {
            b.id = Math.min(currentPlay+100, findPoss(currentPlay,99));
        }
        else if (b.firstChild.innerHTML == "&lt; Prev") {
            b.id = Math.max(currentPlay-1, 0);
        }
        else if (b.firstChild.innerHTML == "&lt;&lt; Prev Poss") {
            b.id = Math.max(currentPlay-100, findPoss(currentPlay,-99));
        }
    }
}

function addPlayerLinks() {
	var links = document.getElementsByClassName("player_name");
	for (var i=0; i<links.length; i++) {
		var id = links[i].href.split("=")[1];
		links[i].id = "player_link_"+id;
	}
}

function clearPlayers() {
//console.log("clearPlayers");
	var area = document.getElementById("replay_area");
	while (area.getElementsByClassName("player_icon_overlay").length > 0) {
		area.removeChild(area.getElementsByTagName("div")[0]);
	}
}

function render() {
	//console.log("render: pP="+playPaused+" : pFT="+(playFinishedTimer == null)+" : cF="+currentFrame+" / "+play_data.length);
	//console.log(playPaused);
	//console.log(playFinishedTimer == null);
	if (playPaused == true) {
		return;
	}
	if (playFinishedTimer != null) {
        console.log("here");
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
		
		var p = document.getElementById("play_outcome");
        p.style.display = "block";
		p.style.visibility = "visible";
		
		currentFrame = 0;
		playDone = true;
        if (parseInt(thisScore) != 0) {
            var sdiv = null;
            if (scoreUpdate == "O") {
                sdiv = document.getElementById("off_score");
            }
            else {
                sdiv = document.getElementById("def_score");
            }
            sdiv.innerHTML = parseInt(sdiv.innerHTML) + parseInt(thisScore);
            sdiv.style.outlineStyle = "solid";
            sdiv.style.outlineColor = "white";
            sdiv.style.color = "gold";
            thisScore = 0;
        }
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

    var div = document.getElementById("rrplay");
    if (div.childNodes.length > 0) {
//        console.log("waiting ("+div.childNodes.length+") ...");
        setTimeout(play, 200);
        return;
    }
    playPaused = false;
	render();
}

function pauseReplay() {
console.log("pauseReplay");
	if (playDone == true) {
		if (postPlayTimer != null) {
			clearTimeout(postPlayTimer);
			postPlayTimer = null;
		}
		playPaused = true;
		playDone = false;
	}
	else {
		playPaused = !playPaused;
	}

    console.log("playDone is "+playDone);
	if (playPaused == true) {
		clearTimeout(frameTimer);
		frameTimer = null;
	}
	else {
		if (playDone == false) {
			play();
		}
	}
}

function findPlayer(player, arr) {
//console.log("findPlayer");
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
//console.log("fixFrames");
    var uwpd = new Array();
    for (var i=0; i<unsafeWindow.play_data.length; i++) {
        var a = new Array();
        for (var j=0; j<unsafeWindow.play_data[i].length; j++) {
			var d = new Object();
            d.id = unsafeWindow.play_data[i][j].id;
            d.x = unsafeWindow.play_data[i][j].x;
            d.y = unsafeWindow.play_data[i][j].y;
            d.z = unsafeWindow.play_data[i][j].z;
            if (unsafeWindow.play_data[i][j].p != null) {
                d.p = unsafeWindow.play_data[i][j].p;
            }
            a.push(d);
        }
        uwpd.push(a);
    }

    var pd = new Array();
	for (var cf=0; cf<uwpd.length-1; cf++) {
		var arr = new Array();
		var arr2 = null;
		for (var i = 0; i < uwpd[cf].length; i++) {
			var data = uwpd[cf][i];
			arr.push(data);
//            console.log(data.id+" -- "+data.x+" -- "+data.y+" -- "+data.p);
			if (unsafeWindow.frameSpeed == 50) {
				if (arr2 == null) {
					arr2 = new Array();
				}
				var data2 = uwpd[cf + 1][i];
				if (data2 != null) {
					if (data2.id != data.id) {
						//fix player order change
						var bool = false;
						for (var pl=0; pl<uwpd[cf + 1].length; pl++) {
							if (uwpd[cf + 1][pl].id == data.id) {
								data2 = uwpd[cf + 1][pl];
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
	pd.push(uwpd[uwpd.length-1]);

    cam_data = new Array();
    if (pd != null) {
        for (var i=0; i<pd.length; i++) {
            cam_data.push(0);
            if (pd[i] == null) break;

            if (pd[i].length < 23) {
                cam_data[i] = cam_data[i-1];
            }
            else {
                for (var p=0; p<pd[i].length; p++) {
                    cam_data[i] += pd[i][p].y;
                }
                cam_data[i] = cam_data[i]/pd[i].length;

                var ballTop = pd[i][0].y;
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
            pd[f][0].x = parseInt(pd[f][0].x - 3);
            pd[f][0].y = parseInt(pd[f][0].y - 6);
            if (pd[f][0].z != null) {
                pd[f][0].z = Math.min(100+(pd[f][0].z-4), 200)/100;
            }
            else {
                pd[f][0].z = 1;
            }
            for (var g=1; g<pd[f].length; g++) {
                pd[f][g].x = parseInt(pd[f][g].x - 6);
                pd[f][g].y = parseInt(pd[f][g].y - 6);
            }
        }
    }
    else {
        return new Array();
    }
//console.log("fixFrames end");
	return pd;
}

function resetPlay() {
//console.log("resetPlay");
	var players = document.getElementsByClassName("player_icon_overlay");
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

    if (playPaused == false) {
        setTimeout(play, preDelay);
    }
//console.log("resetPlay end");
}

function drawFrame() {
//console.log("drawFrame");
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
//console.log("createPlayerDot");
	if (playerOvr[id] == null) {
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

                if (p == null) {
                    div.src = '/images/dots/' + path + '/' + unsafeWindow.players[id].position + '.gif';
                }
                else {
                    div.src = '/images/spacer.gif';
                }
                div.style.backgroundImage = "url(/images/dots/" + color1 + ".gif)";
                //div.style.zIndex = playerLayerZ;
            }
            playerDiv[id] = div;

            var div_overlay = document.createElement('div');
            div_overlay.className = 'player_icon_overlay';
            div_overlay.id = id + '_overlay';
            div.addEventListener("click",function (e) {
                unsafeWindow.viewPlayer(id);
            },false);
            div.addEventListener("mouseover",function (e) {
                unsafeWindow.set_tip(unsafeWindow.players[id].name.replace(/\\/g, '\\\\').replace(/'/g, "\\" + '&#39;').replace(/"/g, '&quot;'), 0, 1, 1, 1);
            },false);
            div.addEventListener("mouseout",function (e) {
                unsafeWindow.unset_tip();
            },false);
            playerOvr[id] = div_overlay;

            playerOvr[id].appendChild(playerDiv[id]);
            replayArea.appendChild(playerOvr[id]);
		}
		else {
            var div_overlay = document.createElement('div');
            div_overlay.className = 'player_icon_overlay';
            div_overlay.id = id + '_overlay';
            div_overlay.style.zIndex = iconOverlayLayerZ;
            playerOvr[id] = div_overlay;
            
			var img = document.createElement('img');
			img.id = 'ball';
			img.className = 'player_icon';
			img.src = window.location.toString().split("game")[0]+"images/ball.gif";
            img.style.zIndex = playerLayerZ+1;
			playerDiv["ball"] = img;
			
			playerOvr["ball"].appendChild(playerDiv["ball"]);
			replayArea.appendChild(playerOvr["ball"]);
		}
	}

}

function drawPlayer(id, x, y, z, p) {
//console.log("drawPlayer");
//if (p != null) console.log("mine: "+id+"("+x+","+y+","+z+","+p+")");
//	console.log("mine: "+id+"("+x+","+y+","+z+")");
	if (playerOvr[id] == null) { 
        createPlayerDot(id, x, y, z, p);
    }
    else {
        if (p == null) {
            if (playerOvr[id].firstChild.src.toString().indexOf("spacer") != -1) {
                playerOvr[id].parentNode.removeChild(playerOvr[id]);
                playerOvr[id] = null;
                createPlayerDot(id, x, y, z, p);
            }
        }
        else {
            if (playerOvr[id].firstChild.src.toString().indexOf("spacer") == -1) {
                playerOvr[id].parentNode.removeChild(playerOvr[id]);
                playerOvr[id] = null;
                createPlayerDot(id, x, y, z, p);
            }
        }
    }
	if (id == "ball") {
		playerOvr["ball"].style.left = x+'px';
		playerOvr["ball"].style.top  = y+'px';
        if (isNaN(z) == false) {
            playerOvr["ball"].firstChild.style.width = parseInt(10 * z) + 'px';
            playerOvr["ball"].firstChild.style.height = parseInt(17 * z) + 'px';
        }
	}
	else {
        playerOvr[id].style.left = x + 'px';
        playerOvr[id].style.top  = y + 'px';
	}
}

function positionFrame() {
//console.log("positionFrame");
    replayArea.style.top = cam_data[currentFrame]+"px";
}

function ff() {
//console.log("ff");
	if (playPaused == true) {
		var pdl = play_data.length;
		currentFrame = (pdl+currentFrame+1)%pdl;
		drawFrame();
	}
	else {
		frameSpeed = frameSpeed/2;
	}
//console.log("ff: "+frameSpeed);
}

function rew() {
//console.log("rew");
	if (playPaused == true) {
		var pdl = play_data.length;
		currentFrame = (pdl+currentFrame-1)%pdl;
		drawFrame();
	}
	else {
		frameSpeed = frameSpeed*2;
	}
console.log("rew: "+frameSpeed);
}

function reset() {
//console.log("reset");
    playPaused = true;
    currentFrame = 0;
    drawFrame();
}

function beginPlay() {
//console.log("beginPlay is not done");
	if (postPlayTimer != null) {
		clearTimeout(postPlayTimer);
		postPlayTimer = null;
	}
	if (playPaused == true) {
		return;
	}
    resetBall();
    play();
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
    if (document.getElementById("use_continuous").checked == false) {
		currentFrame = 0;
		beginPlay();
	}
	else {
        var button = document.getElementsByClassName("nplaybtn")[0];
       	var evt = [];
       	evt.target = button.firstChild;
       	input(evt);
	}
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

	var id = evt.target.parentNode.getAttribute("id")+"";
	lastPlay = currentPlay;
	currentPlay = parseFloat(id);
    //console.log("lastPlay="+lastPlay+" -- currentPlay="+currentPlay);
	if (currentPlay == plays.length) {
//		currentPlay--;
//		assignButtons();
        console.log("do something about last play of the game");
		return;
	}

	var address = plays[currentPlay].replay+"";
    if (address == "[object XPCNativeWrapper [object Text]]") {
        buttonSetup(currentPlay);
        handleFieldGoal(currentPlay);
    }
    else {
        //console.log("next address = "+address);
    	evt.target.innerHTML = "Loading .";
        httpRequest = getInetPage(address, change, evt.target);
    }
}

function change(address, page) {
	clearTimeout(frameTimer); frameTimer = null;
	clearTimeout(postPlayTimer); postPlayTimer = null;
	clearTimeout(prePlayTimer); prePlayTimer = null;

	changeInfo(page);
	changePlays(page);
    buttonSetup(currentPlay);

    resetPlay();

    var rrplay = document.getElementById("rrplay");
    rrplay.value = address;

    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("change", true, true);
    rrplay.dispatchEvent(evt);

    var a = document.createElement("a");
    a.style.color = "white";
    a.innerHTML = "Share this play";
    a.href = address;

    var cont = document.getElementById("share_play");
    cont.removeChild(cont.firstChild);
    for (var i=0; i<cont.firstChild.childNodes.length; i++) {
        var el = cont.firstChild.childNodes[i];
        if (el.href != null) {
            var href = el.href.split("http://")[1];
            el.href = href+address;
        }
    }
    cont.insertBefore(a,cont.firstChild);
}

function changeInfo(page) {
//    console.log("changeInfo : "+page.responseText);
    
	var div = document.createElement("div");
	div.innerHTML = page.responseText;

    var desc = document.getElementById("play_outcome");
    if (alwaysShowPlayText == false) {
        desc.style.visibility = "hidden";
    }
    var new_p = div.getElementsByClassName("play")[0];
    var p = document.getElementsByClassName("play")[0];
    p.innerHTML = new_p.innerHTML;

    var timeytg = document.getElementById("time_ytg");
    var new_timeytg = div.getElementsByTagName("h1")[0];
    timeytg.innerHTML = new_timeytg.childNodes[1].innerHTML;

    timeytg.previousSibling.textContent = "Q"+plays[currentPlay].quarter+" ";

    var classes = ["ppossbtn","pplaybtn","nplaybtn","npossbtn"];
    var display = ["<< Prev Poss","< Prev","Next >","Next Poss >>"];
    for (var i=0; i<classes.length; i++) {
        var btn = document.getElementsByClassName(classes[i])[0];
        btn.innerHTML = "<span>"+display[i]+"</span>";
    }

    var offContainer = document.getElementById("offense_container");
    var defContainer = document.getElementById("defense_container");
    offContainer.style.visibility = "hidden";
    offContainer.style.display = "none";
    defContainer.style.visibility = "hidden";
    defContainer.style.display = "none";

    var containers = document.getElementsByClassName("primary_container");
    var new_containers = div.getElementsByClassName("primary_container");
    for (var i=0; i<new_containers.length; i++) {
        containers[i].innerHTML = new_containers[i].innerHTML;
        containers[i].setAttribute("style",new_containers[i].getAttribute("style"));
    }

    var containers = document.getElementsByClassName("secondary_container");
    var new_containers = div.getElementsByClassName("secondary_container");
    for (var i=0; i<new_containers.length; i++) {
        containers[i].innerHTML = new_containers[i].innerHTML;
        containers[i].setAttribute("style",new_containers[i].getAttribute("style"));
    }

    var players = document.getElementsByClassName("players");
    var new_players = div.getElementsByClassName("players");
    for (var i=0; i<new_players.length; i++) {
        players[i].innerHTML = new_players[i].innerHTML;
    }
    addPlayerLinks();

    var oscore = document.getElementById("off_score");
    var dscore = document.getElementById("def_score");

    thisScore = page.responseText.split("var this_score = ")[1];
    if (thisScore != null) {
        thisScore = thisScore.split(";")[0]
    }
    else {
        thisScore = 0;
    }

    if (page.responseText.indexOf("score_update = 'D';") != -1) {
        scoreUpdate = "D";
    }
    else {
        scoreUpdate = "O";
    }

    if (parseInt(thisScore) != 0) {
        if (scoreUpdate == "O") {
            oscore.innerHTML = parseInt(oscore.innerHTML) - parseInt(thisScore);
        }
        else {
            dscore.innerHTML = parseInt(dscore.innerHTML) - parseInt(thisScore);
        }
    }

    oscore.style.display = "block";
    oscore.style.visibility = "visible";
    dscore.style.display = "block";
    dscore.style.visibility = "visible";

    offContainer.style.visibility = "visible";
    offContainer.style.display = "block";
    defContainer.style.visibility = "visible";
    defContainer.style.display = "block";

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
		if (newplay_data != null) unsafeWindow.play_data = newplay_data.slice();

		currentFrame = 0;
		unsafeWindow.currentFrame = 0;

		//var rrplay = document.getElementById("rrplay");
        //rrplay.value = plays[currentPlay].replay;

        if (alwaysPause == true) {
            playPaused = false;
            pauseReplay();
        }
        else {
            playPaused = false;
        }
 	}
	else {
		console.log("am I in here?");
		pauseReplay();
	}
}

function handleFieldGoal(play) {
	var p = plays[play];

    var desc = document.getElementById("play_outcome");
    desc = desc.getElementsByClassName("play")[0];
    desc.innerHTML = p.play;

    if (p.score != 0) {
        var containers = document.getElementsByClassName("secondary_container");
        for (var i=0; i<containers.length; i++) {
            if (containers[i].firstChild.innerHTML == p.team) {
                var sdiv = null;
                if (i == 0) {
                    sdiv = document.getElementById("off_score");
                }
                else {
                    sdiv = document.getElementById("def_score");
                }
                sdiv.style.outlineStyle = "solid";
                sdiv.style.outlineColor = "white";
                sdiv.style.color = "gold";
                sdiv.innerHTML = parseInt(sdiv.innerHTML) + 3;
                break;
            }
        }
    }

    var timeytg = document.getElementById("time_ytg");
    timeytg.innerHTML = p.timeRemaining+" "+p.down+" & "+p.togo+" on "+p.marker;

    timeytg.previousSibling.textContent = "Q"+p.quarter+" ";

	unsafeWindow.play_data = [unsafeWindow.play_data[0]];
	play_data = unsafeWindow.play_data.slice();

    playDone = true;
	if (unsafeWindow.play_data[0] != null) {
		playFinishedTimer = null;
        pauseReplay();
        playPaused = false;
		resetPlay();
	}
    else { 
        alert("handleFieldGoal: uW.p_d is null"); 
    }
}

function resetBall() {
    var el = document.getElementById("pbrball");
    if (el != null) {
        var src = el.parentNode.previousSibling.previousSibling;
        if (src == null) {
            src = el.parentNode.nextSibling.nextSibling;
        }
        var img = src.childNodes[1].firstChild;
        el.firstChild.style.backgroundImage = img.style.backgroundImage.toString();
        el.removeAttribute("id");
    }
    else {
//        console.log("el is null");
    }

}

function drawBall() {
    if (poss_data[currentFrame] == null) {
    }
    else {
        if (currentFrame > 0) {
            if (poss_data[currentFrame-1] == poss_data[currentFrame]) {
                return;
            }
        }

        resetBall();
        playerId = poss_data[currentFrame];
        var l = document.getElementById("pos_dot_"+playerId);
        if (l != null) {
        	l.parentNode.id = "pbrball";
        	l.style.backgroundRepeat = "no-repeat";
        	l.style.backgroundImage = "url(/images/ball.gif)";
        }
    }
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
