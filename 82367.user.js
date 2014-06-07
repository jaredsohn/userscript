// ==UserScript==
// @name           Replay Rewrite
// @namespace      pbr/rr
// @include        http://*goallineblitz.com/game/replay.pl?game_id=*&pbp_id=*
// @copyright      2010, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        10.05.04
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
const scriptVersion = "10.05.04";
const scriptWebpage = "http://userscripts.org/scripts/show/31640";

// you can modify the following variables
var preDelay = 3000;
var postDelay = 3000;
var alwaysPause = false;

var alwaysShowPlayText = false;//(unsafeWindow.hide_scores != 1); // <--account option

var showFallenPlayers = true; //should pancakes/falls/jukes be shown
var showShrinkAnimation = false;

var offenseOnBottom = true;
var horizontalField = false;
var frameRate = 1000/unsafeWindow.frameSpeed; // <--account option

var visionDivSize = 2;
var visionDivSkip = 4;
// you can modify the previous variables

// don't screw with these
var ihavearealoperatingsystem = false;
var pancakeCheck = function() { 
    return;
};
if (showFallenPlayers == true) {
    if (showShrinkAnimation == true) {
        pancakeCheck = playerShrink;
    }
    else {
        pancakeCheck = playerTrim;
    }
}

var replayRewrite = true;

var plays = null;
var currentPlay = -1;

var playDone = false;
var playPaused = false;

var prePlayTimer = null;
var postPlayTimer = null;
var playFinishedTimer = null;

var httpRequest = null;

var frameSpeed = 925/frameRate;
var frameTimer = null;

var hometeam = unsafeWindow.home;
var showVision = true;
var showIcons = !unsafeWindow.drawIcons;

var vision_data = null;
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

var playerExtrasIn = new Array();
var playerExtrasOut = new Array();

var firstRun = true;
var ballMotionImg = null;

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
    bortFix();
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
    var repfoot = document.getElementById("replay_footer");
    repfoot.style.height = "90px";

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

    var area = document.getElementById("replay_area");
    area.style.width = "520px";
    area.style.height = "1160px";
    var fimg = area.style.backgroundImage;
    area.style.backgroundImage = "none";

    var img = document.createElement("img");
    if (fimg.toString().indexOf('url("') == 0) {
        console.log("firefox >3.6");
        img.src = fimg.slice(fimg.indexOf("/"),fimg.indexOf('")'));
    }
    else if (fimg.toString().indexOf('url(') == 0) {
        console.log("firefox <3.6");
        img.src = fimg.slice(fimg.indexOf("/"),fimg.indexOf(")"));
    }
    else {
        console.log("what firefox version is this?");
        console.log(fimg.toString());
        img.src = fimg.slice(fimg.indexOf("/"),fimg.indexOf(")"));
    }
    img.id = "field_image";
    img.style.zIndex = 0;
    area.appendChild(img);

    inp = document.createElement("input");
    inp.id = "use_vision";
    inp.type = "checkbox";
    var data = "0";
    if (GM_getValue) {
        data = GM_getValue("use_vision",1);
        if (data == "1") {
            inp.checked = true;
        }
        showVision = (data == "1");
    }

	var vs = document.getElementById("use_hidden_qb_vision");
	if (vs != null) {
		vs.parentNode.insertBefore(inp,vs);
		vs.parentNode.removeChild(vs);
		inp.nextSibling.textContent = " Show QB Vision";
	}
	else {
		var text = document.createElement("text");
		text.textContent = " Show QB Vision";
	    var options = document.getElementById("options_popup");
		options.appendChild(inp);
		options.appendChild(text);
		options.appendChild(document.createElement("br"));
	}
	inp.addEventListener("click",visionClicked,false);

    var br = document.createElement("br");
    inp = document.createElement("input");
    inp.id = "variable_framerate";
    inp.type = "checkbox";
    var data = "0";
    if (GM_getValue) {
        data = GM_getValue("variable_framerate",0);
        if (data == "1") {
            inp.checked = true;
        }
        ihavearealoperatingsystem = (data == "1");
    }

    var text = document.createElement("text");
    text.textContent = " Variable Framerate";
    var options = document.getElementById("options_popup");
    options.appendChild(br);
    options.appendChild(inp);
    options.appendChild(text);
    inp.addEventListener("click",framerateChanged,false);

	var inp = document.getElementById("use_hidden_icons");
	if (inp == null) {
		inp = document.createElement("input");
		inp.id = "use_hidden_icons";
		inp.type = "checkbox";
		text = document.createElement("text");
		text.textContent = " Hide Popup Icons";
		var options = document.getElementById("options_popup");
		options.appendChild(br);
		options.appendChild(inp);
		options.appendChild(text);
	}
	showIcons = !inp.checked;
	inp.addEventListener("click",iconsClicked,false);

	options.style.top = "626px";//parseInt(options.style.top)-100+"px";
	options.style.height = "100px";
}

function framerateChanged(e) {
    if (e.target.checked == false) {
        if (GM_setValue) {
            GM_setValue("variable_framerate",0);
        }
        ihavearealoperatingsystem = false;
        frameSpeed = 925/frameRate;
    }
    else {
        if (GM_setValue) {
            GM_setValue("variable_framerate",1);
        }
        ihavearealoperatingsystem = true;
    }
}

function iconsClicked(e) {
    if (e.target.checked == true) {
        showIcons = false;
    }
    else {
        showIcons = true;
    }
}

function visionClicked(e) {
    if (e.target.checked == false) {
        if (GM_setValue) {
            GM_setValue("use_vision",0);
        }
        showVision = true;
        var vis = document.getElementById("vision");
        if (vis != null) {
            vis.parentNode.removeChild(vis);
        }
    }
    else {
        if (GM_setValue) {
            GM_setValue("use_vision",1);
        }
        showVision = false;
    }
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
                document.getElementById("rrplay").setAttribute("index",i);
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

    var playText = plays[currentPlay].play;
    if ((playText.indexOf("Kickoff") == 0) || (playText.indexOf("Punt by ") == 0) || 
        (playText.indexOf(" attempted by ") != -1)) {
        ballMotionImg = "kicking-ball.gif";
    }
    else {
        ballMotionImg = "passing-ball.gif";
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
    var area = document.getElementById("replay_area");

    var list = area.getElementsByClassName("player_icon_overlay");
    while (list.length > 0) {
        list[0].parentNode.removeChild(list[0]);
        list = area.getElementsByClassName("player_icon_overlay");
    }

    list = area.getElementsByClassName("player_icon");
    while (list.length > 0) {
        list[0].parentNode.removeChild(list[0]);
        list = area.getElementsByClassName("player_icon");
    }

    list = area.getElementsByClassName("player_popup_icon");
    while (list.length > 0) {
        list[0].parentNode.removeChild(list[0]);
        list = area.getElementsByClassName("player_popup_icon");
    }
}

//var diffarray = new Array();
var startTime = 0;
var endTime = 0;
var adj = [0,0];

function ihavearealoperatingsystem() {
    //console.log("render: pP="+playPaused+" : pFT="+(playFinishedTimer != null)+" : cF="+currentFrame+" / "+play_data.length);
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

    if (currentFrame == 0) {
        startTime = new Date().getTime();
    }
    //console.log("a "+currentFrame+" --- "+(play_data.length));
    if (currentFrame < play_data.length) {
        var newTime = new Date().getTime();
        var diff = newTime - lastTime;
        //diffarray.push(diff);
        if (diff < frameSpeed) {
            frameTimer = setTimeout(render,frameSpeed-diff);
            return;
        }
        //draw frame here
        drawFrame();
        currentFrame++;
        if (1000/((newTime-lastTime)) < (frameRate-0.5)) {
            frameSpeed = frameSpeed * 0.95;
            adj[0]++;
        }
        else if (1000/((newTime-lastTime)) > (frameRate+0.5)) {
            frameSpeed = frameSpeed * 1.05;
            adj[1]++;
        }
        lastTime = newTime;
    }
	
    //console.log("b "+currentFrame+" --- "+(play_data.length));
    if (currentFrame > play_data.length-1) {
        endTime = new Date().getTime();
        console.log(startTime+" - "+endTime+" = "+(endTime-startTime)+" | "+play_data.length+" | "+(play_data.length/((endTime-startTime)/1000)).toFixed(2)+" - "+frameSpeed.toFixed(2)+" | "+frameRate+" ["+adj[0]+"/"+adj[1]+"]");
        //if (play_data.length/((endTime-startTime)/1000) < 19.5) frameSpeed = frameSpeed * 0.975;
        //if (play_data.length/((endTime-startTime)/1000) > 20.5) frameSpeed = frameSpeed * 1.025;
        //console.log(currentFrame+" --- "+(play_data.length-1));
        clearTimeout(frameTimer);
        frameTimer = null;
        adj = [0,0];
		
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
            //console.log("setting playIsFinished");
            playFinishedTimer = setTimeout(playIsFinished,postDelay);
        }
        else {
            console.log("not setting playIsFinished");
        }
    //console.log(diffarray);
    //diffarray = new Array();
    }
    else {
        frameTimer = setTimeout(render,frameSpeed>>2);
    }
}

function render() {
    //console.log("render: pP="+playPaused+" : pFT="+(playFinishedTimer != null)+" : cF="+currentFrame+" / "+play_data.length);
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

    if (currentFrame == 0) {
        startTime = new Date().getTime();
    }
    //console.log("a "+currentFrame+" --- "+(play_data.length));
    if (currentFrame < play_data.length) {
        var newTime = new Date().getTime();
        var diff = newTime - lastTime;
        if (ihavearealoperatingsystem == true) {
            //diffarray.push(diff);
            if (diff < frameSpeed) {
                frameTimer = setTimeout(render,frameSpeed-diff);
                return;
            }
            //draw frame here
            drawFrame();
            currentFrame++;
            if (1000/((newTime-lastTime)) < (frameRate-0.5)) {
                frameSpeed = frameSpeed * 0.95;
                adj[0]++;
            }
            else if (1000/((newTime-lastTime)) > (frameRate+0.5)) {
                frameSpeed = frameSpeed * 1.05;
                adj[1]++;
            }
            lastTime = newTime;
        }
        else {
            //diffarray.push(diff);
            if (diff < frameSpeed) {
                frameTimer = setTimeout(render,5);
                return;
            }
            //draw frame here
            drawFrame();
            currentFrame++;
            lastTime = newTime;
        }
    }

    //console.log("b "+currentFrame+" --- "+(play_data.length));
    if (currentFrame > play_data.length-1) {
        endTime = new Date().getTime();
        console.log(startTime+" - "+endTime+" = "+(endTime-startTime)+" | "+play_data.length+" | "+(play_data.length/((endTime-startTime)/1000)).toFixed(2)+" - "+frameSpeed.toFixed(2)+" | "+frameRate+"["+adj[0]+"/"+adj[1]+"]");
        clearTimeout(frameTimer);
        frameTimer = null;
        adj = [0,0];

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
            //console.log("setting playIsFinished");
            playFinishedTimer = setTimeout(playIsFinished,postDelay);
        }
        else {
            console.log("not setting playIsFinished");
        }
    //console.log(diffarray);
    //diffarray = new Array();
    }
    else {
        frameTimer = setTimeout(render,5);//frameSpeed>>2);
    }
}

function play() {
    if (frameTimer != null) {
        clearTimeout(frameTimer);
        frameTimer = null;
    }

    var div = document.getElementById("rrplay");
    if (div.childNodes.length > 0) {
        //console.log("waiting ("+div.childNodes.length+") ...");
        setTimeout(play, 200);
        return;
    }
    playPaused = false;
    render();
}

function pauseReplay() {
//    console.log("pauseReplay");
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

//    console.log("playDone is "+playDone);
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
    for (var i=0; i<arr.length; i++) {
        if (player.id == arr[i].id) {
            output = i;
            break;
        }
    }
    //console.log(player.id+" <--> "+arr[output].id);
    //console.log(" : returning "+output);
    if (output == -1) {
        console.log("this is -1 : "+player.id);
    }
    return output;
}

function bortFix() {
    if (firstRun == true) {
        for (var f=0; f<unsafeWindow.play_data.length; f++) {
            for (var p=0; p<unsafeWindow.play_data[f].length; p++) {
                unsafeWindow.play_data[f][p].x = (unsafeWindow.play_data[f][p].x - 20) / 3;
                unsafeWindow.play_data[f][p].y = (unsafeWindow.play_data[f][p].y - 40) / 3;
                if (unsafeWindow.frameSpeed != 100) {
                    if (unsafeWindow.play_data[f][p].tx != null) {
                        unsafeWindow.play_data[f][p].tx = (unsafeWindow.play_data[f][p].tx - 20) / 3;
                        unsafeWindow.play_data[f][p].ty = (unsafeWindow.play_data[f][p].ty - 40) / 3;
                    }
                }
            }
        }

        if (offenseOnBottom == true) {
            if (goingUp(unsafeWindow.play_data) == false) {
                for (var f=0; f<unsafeWindow.play_data.length; f++) {
                    for (var p = 0; p < unsafeWindow.play_data[f].length; p++) {
                        unsafeWindow.play_data[f][p].x = 160 - unsafeWindow.play_data[f][p].x;
                        unsafeWindow.play_data[f][p].y = 360 - unsafeWindow.play_data[f][p].y;
                        if (unsafeWindow.play_data[f][p].tx != null) {
                            unsafeWindow.play_data[f][p].tx = 160 - unsafeWindow.play_data[f][p].tx;
                            unsafeWindow.play_data[f][p].ty = 360 - unsafeWindow.play_data[f][p].ty;
                        }
                    }
                }
            }
        }

        firstRun = false;
    }
}

function goingUp(pd) {
    if (pd.length == 0) return 0;
    var count = 0;
    for (var i=1; i<pd[0].length; i++) {
        if (pd[0][0].y >= pd[0][i].y) {
            count++;
        }
        else {
            count--;
        }
    }
    return count > 0;
}

var rotation = null;

function fixFrames() {
    //console.log("fixFrames");
    var stime = new Date();
    var uwpd = new Array();
    for (var i=0; i<unsafeWindow.play_data.length; i++) {
        var a = new Array();
        for (var j=0; j<unsafeWindow.play_data[i].length; j++) {
            var u = unsafeWindow.play_data[i][j];
            var d = new Object();
            d.id = u.id;
            d.x = u.x;
            d.y = u.y;
            d.z = u.z;
            if (u.tx != null) {
                d.tx = u.tx;
                d.ty = u.ty;
            }
            if (u.p != null) {
                d.p = u.p;
            }
            if (u.icon != null) {
                d.icon = u.icon;
            }
            a.push(d);
        }
        uwpd.push(a);
    }
    var time = new Date() - stime;
    console.log("uwpd copy : "+time.toFixed(0)+"ms");

    var stime = new Date();
    var pd = new Array();
    for (var cf=0; cf<uwpd.length-1; cf++) {
        var arr = new Array();
        var arr2 = null;
        for (var i = 0; i < uwpd[cf].length; i++) {
            var data = uwpd[cf][i];
            arr.push(data);
            //console.log(data.id+" -- "+data.x+" -- "+data.y+" -- "+data.p+" -- "+data.tx+","+data.ty);
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

                    if (data.tx != null) {
                        d.tx = data.tx;
                        d.ty = data.ty;
                    }
                    if ((data.tx != null) && (data2.tx != null)) {
                        d.tx = (data.tx + data2.tx) / 2;
                        d.ty = (data.ty + data2.ty) / 2;
                    }
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
    var time = new Date() - stime;
    console.log("10-20 : "+time.toFixed(0)+"ms");

    var stime = new Date();
    if (pd[0] != null) {
        for (var f=0; f<pd.length; f++) {
            pd[f][0].x = parseInt(pd[f][0].x*3 + 20 - 3);
            pd[f][0].y = parseInt(pd[f][0].y*3 + 40 - 6);
            if (pd[f][0].z != null) {
                pd[f][0].z = Math.min(100+(pd[f][0].z-4)*3, 200)/100;
            }
            else {
                pd[f][0].z = 1;
            }
            if (pd[f][0].tx != null) {
                pd[f][0].tx = parseInt(pd[f][0].tx*3 + 20 - 3);
                pd[f][0].ty = parseInt(pd[f][0].ty*3 + 40 - 6);
            }
            for (var g=1; g<pd[f].length; g++) {
                pd[f][g].x = parseInt(pd[f][g].x*3 + 20 - 6);
                pd[f][g].y = parseInt(pd[f][g].y*3 + 40 - 6);
            }
        }
    }
    else {
        return new Array();
    }
    var time = new Date() - stime;
    console.log("multiply : "+time.toFixed(0)+"ms");

    var stime = new Date();
    vision_data = new Array();
    if (pd[0] != null) {
        for (var f=0; f<pd.length; f++) {
            var div = document.createElement("div");
            div.setAttribute("id","vision");
            div.style.position = "absolute";

            var ball = pd[f][0];
            if (ball.tx != null) {
                //console.log("("+ball.x+","+ball.y+") -1-to ("+ball.tx+","+ball.ty+")");
                var x1 = Math.round(ball.x);
                var y1 = Math.round(ball.y);
                var x2 = Math.round(ball.tx);
                var y2 = Math.round(ball.ty);
                if (ball.x > ball.tx) {
                    var temp = x1;
                    x1 = x2;
                    x2 = temp;

                    temp = y1;
                    y1 = y2;
                    y2 = temp;
                }
                //                console.log("("+x1+","+y1+") -2-to ("+x2+","+y2+")");

                div.style.left = (x1-1)+"px";
                div.style.top = (y1-1)+"px";
                div.style.width = Math.abs(x2-x1+2)+"px";
//                console.log(y2+"-"+y1+"+2 = "+(y2-y1+2));
                div.style.height = Math.abs(y2-y1+2)+"px";
                div.style.zIndex = 750;

                //                console.log("("+(ball.x-x1)+","+(ball.y-y1)+") -3-to ("+(ball.tx-x1)+","+(ball.ty-y1)+")");
                drawLine(div, parseInt(ball.x-x1), parseInt(ball.y-y1),
                    parseInt(ball.tx-x1), parseInt(ball.ty-y1));
                vision_data[f] = div;
            }
        }
    }
    var time = new Date() - stime;
    console.log("vision : "+time.toFixed(0)+"ms");

    var stime = new Date();
    poss_data = new Array();
    if (pd[0] != null) {
        for (var f=0; f<pd.length; f++) {
            var current = null;
            var ball = pd[f][0];
            for (var p=1; p<pd[f].length; p++) {
                var player = pd[f][p];
                if (ball.y != player.y) continue;
                var dx = Math.max(ball.x,player.x) - Math.min(ball.x,player.x);
                if ((dx != 0) && (dx != 3) && (dx != 9) || (ball.z != 1)) continue;
                current = player.id;
                break;
            }
            poss_data.push(current);
        }
    }
    var time = new Date() - stime;
    console.log("possession : "+time.toFixed(0)+"ms");

    var stime = new Date();
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
                val = Math.max(val, -660);
                cam_data[i] = parseInt(val);
            }
        }
    }
    var time = new Date() - stime;
    console.log("cam : "+time.toFixed(0)+"ms");

    var stime = new Date();
	var j=0;
	rotation = null;
	for (var i=0; i<pd.length-1; i++) {
//console.log(i+") "+pd[i][0].x+","+pd[i][0].y+","+pd[i][0].z);
		if (rotation == null) {
			if (pd[i][0].z > 1.07) {
				j=i;
				rotation = pd[i][0];
				rotation.start = i;
				for (var j=i; j<poss_data.length; j++) {
					if (poss_data[j] != null) {
						rotation.stop = j;
						break;
					}
				}
			}
		}
		else {
			if (rotation.x < pd[i+1][0].x) {
				mul = 1;
			}
			else {
				mul = -1;
			}
			if (rotation.y < pd[i+1][0].y) {
				mul = mul * -1;
			}
			else {
				mul = mul * 1;
			}
			rotation.val = mul * Math.atan(Math.abs(rotation.x-pd[i+1][0].x)/Math.abs(rotation.y-pd[i+1][0].y));
			rotation.val += 2*Math.PI;
			break;
		}
	}
	if (rotation == null) {
		rotation = 0;
		rotation.val = 0;
		rotation.start = pd.length;
		rotation.stop = pd.length;
	}
    var time = new Date() - stime;
    console.log("rotation ("+j+","+i+","+rotation.val+","+rotation.start+"/"+rotation.stop+"): "+time.toFixed(0)+"ms");

    var stime = new Date();
	playerExtrasIn = new Array();
	playerExtrasOut = new Array();

    for (var cf=0; cf<uwpd.length-1; cf++) {
        for (var i = 0; i < uwpd[cf].length; i++) {
            var data = uwpd[cf][i];
			var deletion = ["looked_off","im_open","pump_faked"];
			for (var dx=0; dx<deletion.length; dx++) {
				if (data.icon == deletion[dx]) {
					for (var j=cf+1; j<uwpd.length-1; j++) {
						if (uwpd[j][i].icon == deletion[dx]) {
							uwpd[j][i].icon = null;
						}
					}
				}
			}
		}
	}

    for (var cf=0; cf<uwpd.length-1; cf++) {
		var frame = cf;
		var exl = 6;
        if (unsafeWindow.frameSpeed == 50) {
			frame = cf*2;
			exl += exl;
		}
		var expire = frame+exl;

        for (var i = 0; i < uwpd[cf].length; i++) {
            var data = uwpd[cf][i];
			if (data.icon != null) {
				if (playerExtrasIn[frame] == null) {
					playerExtrasIn[frame] = new Array();
				}
				playerExtrasIn[frame].push([data.id,data.icon,data.x-12,data.y-16]);
				if ((data.icon.indexOf("sweat") != -1) || 
					(data.icon.indexOf("sad") != -1)) {
						expire = frame + 1;
				}
//				console.log(cf+": i="+i+" : f="+frame+" --> exp="+expire+") "+data.icon);

				if (playerExtrasOut[expire] == null) {
					playerExtrasOut[expire] = new Array();
				}
				playerExtrasOut[expire].push([data.id, data.icon]);
			}
		}
	}
	var time = new Date() - stime;
    console.log("extras : "+time.toFixed(0)+"ms");

    //console.log("fixFrames end");
    return pd;
}

function drawLine(div, x0, y0, x1, y1) {
    //console.log(x0+","+y0+" --> "+x1+","+y1);
    var gstep = 0;
    var slope = Math.abs(y1 - y0) > Math.abs(x1 - x0);
    if (slope) {
        var temp = x0;
        x0 = y0;
        y0 = temp;
        temp = x1;
        x1 = y1;
        y1 = temp;
    }
    if (x0 > x1) {
        var temp = x0;
        x0 = x1;
        x1 = temp;
        temp = y0;
        y0 = y1;
        y1 = temp;
    }
    var deltax = x1 - x0;
    var deltay = Math.abs(y1 - y0);
    var error = deltax << 1;
    var ystep;
    var y = y0;
    if (y0 < y1) {
        ystep = 1;
    }
    else {
        ystep = -1;
    }
    for (var x=x0; x<x1; x++) {
        if (gstep % visionDivSkip == 0) {
            if (slope) {
                plot(div,y,x);
            }
            else {
                plot(div,x,y);
            }
        }
        gstep++;
        error = error - deltay;
        if (error < 0) {
            y = y + ystep;
            error = error + deltax;
        }
    }
}

function plot(div, x,y) {
//    console.log(x+","+y+" -- "+visionDivSize);
    var d = document.createElement("div");
    d.style.backgroundColor = "white";
    d.style.position = "absolute";
    d.style.left = x+"px";
    d.style.top = y+"px";
    d.style.width = visionDivSize+"px";
    d.style.height = visionDivSize+"px";
    d.style.zIndex = "751";
    div.appendChild(d);
//console.log("("+d.style.left+","+d.style.top+")");
}

function resetPlay() {
    //console.log("resetPlay");
    clearPlayers();
    
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
        drawPlayer(data.id, data.x, data.y, data.z, data.p, data.icon);
    }
    drawPlayer('ball', frame[0].x, frame[0].y, frame[0]['z']);
    drawBall();

    if (showVision == true) {
        var vis = document.getElementById("vision");
        if (vis != null) {
            document.getElementById("replay_area").removeChild(vis);
        }
        if (frame[0].tx != null) {
            document.getElementById("replay_area").appendChild(vision_data[currentFrame]);
        }
    }

	if (playerExtrasOut[currentFrame] != null) {
		for (var i=0; i<playerExtrasOut[currentFrame].length; i++) {
			var d = playerExtrasOut[currentFrame][i];
//console.log("removing : "+d);
			var img = null;
			do {
				img = document.getElementById("player_extras_"+d[0]);
				if (img != null) {
					replayArea.removeChild(img);
				}
			}
			while (img != null);
		}
	}

	if (showIcons == true) {
		if (playerExtrasIn[currentFrame] != null) {
			for (var i=0; i<playerExtrasIn[currentFrame].length; i++) {
				var d = playerExtrasIn[currentFrame][i];
				var img = document.createElement("img");
				img.setAttribute("class","player_popup_icon");
				img.id = "player_extras_"+d[0];
				img.style.left = d[2]+"px";
				img.style.top = d[3]+"px";
                                img.style.zIndex = playerLayerZ+1;
				img.src = "http://goallineblitz.com/images/replay_icons/"+d[1]+".gif";
	//console.log("creating : "+d);
				replayArea.appendChild(img);
			}
		}
	}

    replayArea.style.top = cam_data[currentFrame]+"px";
}

function createPlayerDot(id, x, y, z, p) {
    if (playerDiv[id] == null) {
        var oldDiv = document.getElementById(id);
        if (oldDiv != null) {
            oldDiv.parentNode.removeChild(oldDiv);
        }

        if (id != "ball") {
            var div = document.createElement('img');
            div.className = 'player_icon';
            div.id = id;
            if (document.getElementById("use_colors").checked == true) {
                if (p != null) {
                    div.style.width = "13px";
                    div.style.height = "13px";
                }
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
                    div.style.backgroundImage = "url(\"/images/dots/" + color1 + ".gif\")";
                    div.src = '/images/dots/' + path + '/' + unsafeWindow.players[id].position + '.gif';
                }
                else {
                    if (showShrinkAnimation == true) {
                        div.src = '/images/dots/' + path + '/' + unsafeWindow.players[id].position + '.gif';
                        div.style.width = "13px";
                        div.style.height = "13px";
                        div.style.backgroundImage = "url(\"/images/dots/" + color1 + "_small.gif\")";
                        div.style.backgroundRepeat = "no-repeat";
                    }
                    else {
                        div.style.backgroundImage = "url(\"/images/dots/" + color1 + ".gif\")";
                        div.src = '/images/spacer.gif';
                    }
                }
                div.style.zIndex = playerLayerZ;
            }
            
            div.addEventListener("click",function (e) {
                unsafeWindow.viewPlayer(id);
            },false);
            div.addEventListener("mouseover",function (e) {
                unsafeWindow.set_tip(unsafeWindow.players[id].name.replace(/\\/g, '\\\\').replace(/'/g, "\\" + '&#39;').replace(/"/g, '&quot;'), 0, 1, 1, 1);
            },false);
            div.addEventListener("mouseout",function (e) {
                unsafeWindow.unset_tip();
            },false);

            playerDiv[id] = div;
            replayArea.appendChild(playerDiv[id]);
        }
        else {
            var img = document.createElement('img');
            img.id = 'ball';
            img.className = 'player_icon';
            img.src = "http://goallineblitz.com/images/ball.gif";
            img.style.zIndex = playerLayerZ+1;
            playerDiv["ball"] = img;
			
            replayArea.appendChild(playerDiv["ball"]);
        }
    }
}

function drawPlayer(id, x, y, z, p, icon) {
    //console.log("drawPlayer");
    //if (p != null) console.log("mine: "+id+"("+x+","+y+","+z+","+p+")");
    //console.log("mine: "+id+"("+x+","+y+","+z+")");
    if (playerDiv[id] == null) {
        createPlayerDot(id, x, y, z, p);
    }
    else {
        pancakeCheck(id, x, y, z, p);
    }
    if (id == "ball") {
		if (currentFrame == rotation.start) {
	        playerDiv["ball"].src = "http://goallineblitz.com/images/"+ballMotionImg;
			playerDiv["ball"].setAttribute("style","-moz-transform: rotate("+rotation.val+"rad); "+playerDiv["ball"].getAttribute("style"));
		}
		else if ((currentFrame >= rotation.stop) || (currentFrame == 0)) {
	        playerDiv["ball"].src = "http://goallineblitz.com/images/ball.gif";
			playerDiv["ball"].setAttribute("style",playerDiv["ball"].getAttribute("style").split(";",2)[1]);
				playerDiv["ball"].style.width = 10 + 'px';
				playerDiv["ball"].style.height = 17 + 'px';
				playerDiv["ball"].style.zIndex = playerLayerZ + 1;
		}
        if (isNaN(z) == false) {
            playerDiv["ball"].style.width = parseInt(10 * z) + 'px';
            playerDiv["ball"].style.height = parseInt(17 * z) + 'px';
		}
	    playerDiv["ball"].style.left = x+'px';
	    playerDiv["ball"].style.top  = y+'px';
    }
    else {
        playerDiv[id].style.left = x + 'px';
        playerDiv[id].style.top  = y + 'px';
    }
}

function playerShrink(id, x, y, z, p) {
    if (p == null) {
        if (playerDiv[id].style.width == "13px") {
            var bgc = playerDiv[id].style.backgroundColor;
            playerDiv[id].parentNode.removeChild(playerDiv[id]);
            playerDiv[id] = null;
            createPlayerDot(id, x, y, z, p);
            playerDiv[id].style.backgroundColor = bgc;
        }
    }
    else {
        if (playerDiv[id].style.width != "13px") {
            var bgc = playerDiv[id].style.backgroundColor;
            playerDiv[id].parentNode.removeChild(playerDiv[id]);
            playerDiv[id] = null;
            createPlayerDot(id, x, y, z, p);
            playerDiv[id].style.backgroundColor = bgc;
        }
    }
}

function playerTrim(id, x, y, z, p) {
    if (p == null) {
        if (playerDiv[id].src.toString().indexOf("spacer") != -1) {
            var bgc = playerDiv[id].style.backgroundColor;
            playerDiv[id].parentNode.removeChild(playerDiv[id]);
            playerDiv[id] = null;
            createPlayerDot(id, x, y, z, p);
            playerDiv[id].style.backgroundColor = bgc;
        }
    }
    else {
        if (playerDiv[id].src.toString().indexOf("spacer") == -1) {
            var bgc = playerDiv[id].style.backgroundColor;
            playerDiv[id].parentNode.removeChild(playerDiv[id]);
            playerDiv[id] = null;
            createPlayerDot(id, x, y, z, p);
            playerDiv[id].style.backgroundColor = bgc;
        }
    }
}

function ff() {
    //console.log("ff");
    if (playPaused == true) {
        var pdl = play_data.length;
        currentFrame = (pdl+currentFrame+1)%pdl;
        drawFrame();
    }
    else {
        frameRate += 3;
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
        frameRate -= 3;
        frameSpeed = frameSpeed*2;
    }
//console.log("rew: "+frameSpeed);
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
    //console.log("pIF");
    if (playFinishedTimer != null) {
        //console.log("1");
        clearTimeout(playFinishedTimer);
        playFinishedTimer = null;
    }
    if (postPlayTimer != null) {
        //console.log("2");
        clearTimeout(postPlayTimer);
        postPlayTimer = null;
    }
    if (playPaused == true) {
        //console.log("3");
        return;
    }
    //console.log("4");
    playDone = false;
    if (document.getElementById("use_continuous").checked == false) {
        //console.log("5");
        currentFrame = 0;
        beginPlay();
    }
    else {
        //console.log("6");
        var button = document.getElementsByClassName("nplaybtn")[0];
        if (document.getElementById("rrplay").getAttribute("index") == button.id) {
            //console.log("7");
            currentFrame = 0;
            beginPlay();
        }
        else {
            //console.log("8");
            var evt = [];
            evt.target = button.firstChild;
            input(evt);
        }
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
    document.getElementById("rrplay").setAttribute("index",currentPlay);
    //console.log("lastPlay="+lastPlay+" -- currentPlay="+currentPlay);
    if (currentPlay == plays.length) {
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
    //console.log("changeInfo : "+page.responseText);
    
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

        if (newplay_data.length == 0) {
            newplay_data = [unsafeWindow.play_data[0]];
            newplayers = unsafeWindow.players;
        }
        if (newplayers != null) unsafeWindow.players = newplayers;
        if (newplay_data != null) unsafeWindow.play_data = newplay_data.slice();


        if (offenseOnBottom == true) {
            if (goingUp(unsafeWindow.play_data) == false) {
                for (var f=0; f<unsafeWindow.play_data.length; f++) {
                    for (var p = 0; p < unsafeWindow.play_data[f].length; p++) {
                        unsafeWindow.play_data[f][p].x = 160 - unsafeWindow.play_data[f][p].x;
                        unsafeWindow.play_data[f][p].y = 360 - unsafeWindow.play_data[f][p].y;
                        if (unsafeWindow.play_data[f][p].tx != null) {
                            unsafeWindow.play_data[f][p].tx = 160 - unsafeWindow.play_data[f][p].tx;
                            unsafeWindow.play_data[f][p].ty = 360 - unsafeWindow.play_data[f][p].ty;
                        }
                    }
                }
            }
        }

        currentFrame = 0;
        unsafeWindow.currentFrame = 0;

        if (alwaysPause == true) {
            playPaused = false;
            pauseReplay();
        }
        else {
            playPaused = false;
        }
    }
    else {
        //console.log("am I in here?");
        unsafeWindow.play_data = [unsafeWindow.play_data[0]]
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
//console.log("el is null");
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
            l.style.backgroundImage = "url(\"/images/ball.gif\")";
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
