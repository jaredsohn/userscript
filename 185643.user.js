// ==UserScript==
// @name        Revenge Of Dotball
// @namespace   pbr/db
// @include     http://glb2*.warriorgeneral.com/game/replay/*
// @copyright   2013, pabst
// @license     (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/4.0/
// @version     14.05.05
// ==/UserScript==

var canvasWidth = 1024;
var canvasHeight = 740;
var imageSmoothing = false;

window.setTimeout(function() {
    main();
}, 1000);

var play_data = null;
var imageData = [];
var gameId = -1;
var playId = -1;

var glbColors = {};
var foreground = null;
var fgcontext = null;
var background = null;
var bgcontext = null;

function main() {
    try {
        unsafeWindow.glb2.replay.pause();
        unsafeWindow.Event.stopObserving("resize");
    }
    catch (e) {
        console.log(e);
    }

    console.log("Revenge of Dotball!!!");

    gameId = unsafeWindow.glb2.replay.game_id;
    playId = unsafeWindow.glb2.replay.pbp_id;
    console.log(gameId + "/" + playId);

    var thisPlay = "http://glb2.warriorgeneral.com/game/replay/" + gameId + "/" + playId;
    var str = "Click me if the animation gets slower after a while --- " + thisPlay;

    var a = document.createElement("a");
    a.setAttribute("id", "thisPlay");
    a.style.color = "black";
    a.innerHTML = str;
    a.href = thisPlay;

    var box = document.createElement("a");
    box.href = "/game/game/" + gameId;
    var s = document.createElement("span");
    s.setAttribute("class", "button");
    s.innerHTML = "Box Score";
    box.appendChild(s);

    var pbp = document.createElement("a");
    pbp.href = "/game/game/" + gameId + "/pbp";
    var s = document.createElement("span");
    s.setAttribute("class", "button");
    s.innerHTML = "Play by Play";
    pbp.appendChild(s);

    var hteam = unsafeWindow.glb2.replay.home_team.id;
    var ateam = unsafeWindow.glb2.replay.away_team.id;
    var matchup = document.createElement("a");
    matchup.href = "/game/compare_teams/" + hteam + "/" + ateam;
    var s = document.createElement("span");
    s.setAttribute("class", "button");
    s.innerHTML = "Matchup";
    matchup.appendChild(s);

    var content = document.getElementById("content");
    content.parentNode.insertBefore(matchup, content);
    content.parentNode.insertBefore(box, content);
    content.parentNode.insertBefore(pbp, content);
    content.parentNode.insertBefore(a, content);

    prepareImages();
    purgeContent();
    createCanvas();

    var addr = window.location.toString().slice(0, window.location.toString().indexOf("warrior"));
    GM_getInetPage(addr + "warriorgeneral.com/game/replay/" + gameId + "/" + playId + "/1",
            getPlayData, null);
}

function purgeContent() {

    var home = document.getElementById("home_team");
    var player = home.getElementsByClassName("player_name")[0];
    glbColors.home = [player.childNodes[0].style.color, player.style.backgroundColor];

    var away = document.getElementById("away_team");
    var player = away.getElementsByClassName("player_name")[0];
    glbColors.away = [player.childNodes[0].style.color, player.style.backgroundColor];

    console.log("h=" + unsafeWindow.glb2.replay.home_team.city + " ---- a=" + unsafeWindow.glb2.replay.away_team.city);
    console.log(glbColors.home + " --before-- " + glbColors.away);
    //fix Bort's direction reversal hack
    if (unsafeWindow.glb2.replay.play_info.quarter > 2) {
        var temp = glbColors.home;
        glbColors.home = glbColors.away;
        glbColors.away = temp;
    }
    console.log(glbColors.home + " --after-- " + glbColors.away);

    var container = document.getElementById("content");
    container.removeChild(container.childNodes[1]);

    var hover = document.getElementById("player_hover_box");
    if (hover != null)
        hover.parentNode.removeChild(hover); //null if not logged in

    delete unsafeWindow.glb2.playerSprites;
}

function getPlayData(address, page) {
    console.log(address);
    var thisPlay = "http://glb2.warriorgeneral.com/game/replay/" + gameId + "/" + playId;
    var str = "Click me if the animation gets slower after a while --- " + thisPlay;

    var a = document.getElementById("thisPlay");
    a.innerHTML = str;
    a.href = thisPlay;


    try {
        play_data = null;
        play_data = JSON.parse(page.responseText, null);
    }
    catch (e) {
        alert("If you haven't done it, try starting the game from a play link on the play-by-play page.\n\n" + e + "\n\naddress=" + address + "\n\n" + page.responseText);
    }

    console.log("play_data (JSON): ");
    console.log(play_data);
    console.log("unsafeWindow.glb2: ");
    console.log(unsafeWindow.glb2);

    createCanvas();
    renderControls();
    renderReplayInfo();

    if (play_data.frames.length > 0) {
        fixFrames();

        var off = document.getElementById("offensePlay");
        if (off)
            off.parentNode.removeChild(off);
        var def = document.getElementById("defensePlay");
        if (def)
            def.parentNode.removeChild(def);

        prepareImages();
        preparePlayerImages();

        initPlayerCanvas();
        initTeamCanvas();

        renderPlayName();

        initialTime = null;
        currentTime = null;
        firstRun = true;
        isPlaying = true;

        render();
    }
    else {
        console.log("timeout");
    }
    /*        
     console.log("play_data (JSON): ");
     console.log(play_data);
     console.log("unsafeWindow.glb2: ");
     console.log(unsafeWindow.glb2);
     */
}

function getFromCanvas(src, w, h) {
    var image = new Image();
    image.src = src;

    var canvas = document.createElement("canvas");
    canvas.setAttribute("width", w);
    canvas.setAttribute("height", h);

    var context = canvas.getContext("2d");
    context.drawImage(image, 0, 0);

    return canvas;
}

function prepareImages() {
    var server = "http://glb.warriorgeneral.com";//goallineblitz.com";
    imageData["ball"] = getFromCanvas(server + "/images/ball.gif", 16, 16);
    imageData["passing-ball"] = getFromCanvas(server + "/images/passing-ball.gif", 16, 16); //fix me!!
    imageData["kicking-ball"] = getFromCanvas(server + "/images/kicking-ball.gif", 16, 16); //fix me!!
    imageData["field"] = getFromCanvas(server + "/images/game/fields/grassy_turf.jpg", 520, 1160);
    imageData["rwButton"] = getFromCanvas(server + "/images/game/design/replay/button_rw.gif");
    imageData["pauseButton"] = getFromCanvas(server + "/images/game/design/replay/button_pause.gif");
    imageData["playButton"] = getFromCanvas(server + "/images/game/design/replay/button_play.gif");
    imageData["ffButton"] = getFromCanvas(server + "/images/game/design/replay/button_ff.gif");

    var server = "http://glb2.warriorgeneral.com";
    imageData["homeAvatar"] = getFromCanvas(server + "/game/avatar/team/" + unsafeWindow.glb2.replay.home_team.id);
    imageData["awayAvatar"] = getFromCanvas(server + "/game/avatar/team/" + unsafeWindow.glb2.replay.away_team.id);

    if (document.getElementById("homeTeam") != null)
        document.getElementById("homeTeam").parentNode.removeChild(document.getElementById("homeTeam"));
    if (document.getElementById("homeTeamScore") != null)
        document.getElementById("homeTeamScore").parentNode.removeChild(document.getElementById("homeTeamScore"));
    if (document.getElementById("awayTeamScore") != null)
        document.getElementById("awayTeamScore").parentNode.removeChild(document.getElementById("awayTeamScore"));
    if (document.getElementById("awayTeam") != null)
        document.getElementById("awayTeam").parentNode.removeChild(document.getElementById("awayTeam"));
    if (document.getElementById("defensePlay") != null)
        document.getElementById("defensePlay").parentNode.removeChild(document.getElementById("defensePlay"));
    if (document.getElementById("offensePlay") != null)
        document.getElementById("offensePlay").parentNode.removeChild(document.getElementById("offensePlay"));
}

function getColor(idx) {
    var b = "00" + (idx % 8).toString(2);
    b = b.slice(b.length - 3);

    var color = "#";
    for (var i = 0; i < 3; i++) {
        var ch = b.slice(i, i + 1);
        if (ch === "0") {
            color += "00";
        }
        else {
            color += "D0";
        }
    }
    return color;
}
function preparePlayerImages() {
    for each (var p in play_data.players) {
//		if (imageData["player_"+p.id] != null) continue;

        var fcolormask = "white_border";
        var bcolormask = "black";

        var pos = p.pos;
        if (p.pos === "BTE")
            pos = "TE";
        else if (p.pos.indexOf("GLTE") === 0)
            pos = "TE";
        else if (p.pos.indexOf("CB3") === 0)
            pos = "CB";
        else if (p.pos.indexOf("CB4") === 0)
            pos = "CB";
        else if (p.pos.indexOf("CB5") === 0)
            pos = "CB";
        else if (p.pos.indexOf("SE") === 0)
            pos = "PH";
        else if (p.pos.indexOf("SB") === 0)
            pos = "PH";
        else if (p.pos.indexOf("DL") === 0)
            pos = "PH";
        else if (p.pos.indexOf("PP") === 0)
            pos = "PH";
        else if (p.pos.indexOf("ER") === 0)
            pos = "PH";
        else if (p.pos.indexOf("DE") === 0)
            pos = "PH";
        else if (p.pos.indexOf("DT") === 0)
            pos = "DT";
        else if (p.pos.indexOf("LB") === 0)
            pos = "PH";
        else if (p.pos.indexOf("FL") === 0)
            pos = "PH";
        else if (p.pos.indexOf("UB") === 0)
            pos = "PH";
        else if (p.pos.indexOf("IN") === 0)
            pos = "PH";
        else if (p.pos.indexOf("BW") === 0)
            pos = "PH";
        else if (p.pos.indexOf("OU") === 0)
            pos = "PH";
        else if (p.pos.indexOf("FW") === 0)
            pos = "PH";

        var bimage = new Image();
        bimage.src = "http://glb.warriorgeneral.com/images/dots/" + bcolormask + ".gif";

        var fimage = new Image();
        fimage.id = p.id;
        fimage.pos = p.pos;
        fimage.bimage = bimage;
        fimage.home = p.home;
        fimage.onload = function() {
            var fcolor = null;
            var bcolor = null;
            if (this.home) {
                fcolor = glbColors.home[0];
                bcolor = glbColors.home[1];
            }
            else {
                fcolor = glbColors.away[0];
                bcolor = glbColors.away[1];
            }

            var bworking = document.createElement("canvas");
            var bctx = bworking.getContext("2d");
            bctx.drawImage(bimage, 0, 0);
            bctx.fillStyle = bcolor;
            bctx.globalCompositeOperation = 'source-atop';
            bctx.fillRect(0, 0, 16, 16);

            var fworking = document.createElement("canvas");
            var fctx = fworking.getContext("2d");
            fctx.drawImage(this, 0, 0);
            fctx.fillStyle = fcolor;
            fctx.globalCompositeOperation = 'source-atop';
            fctx.fillRect(0, 0, 16, 16);

            var canvas = document.createElement("canvas");
            canvas.setAttribute("width", "16px");
            canvas.setAttribute("height", "16px");
            var context = canvas.getContext("2d");

            if (unsafeWindow.glb2.replay.myPlayerList.indexOf(parseInt(this.id)) !== -1) {
                var color = getColor(unsafeWindow.glb2.replay.myPlayerList.indexOf(parseInt(this.id)));
                context.fillStyle = color;
                context.fillRect(0, 0, 16, 16);

            }

            context.drawImage(bworking, 0, 0);
            context.drawImage(fworking, 0, 0);

            /*    //ridiculous security problem here
             var dataURL = canvas.toDataURL("image/png");
             if (p.pos == "QB") alert(  dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));
             var img = new Image();
             img.src = dataURL;
             imageData["player_"+this.id] = img;
             */
            imageData["player_" + this.id] = canvas;
            delete bworking;
            delete bctx;
            delete fworking;
            delete fctx;
            delete this.id;
            delete this.pos;
            delete this.bimage;
            delete this.home;
            delete canvas;
            delete context;
        };
        fimage.src = "http://glb.warriorgeneral.com/images/dots/" + fcolormask + "/" + pos + ".gif";

        hasit = null;
        playerLoadingComplete = true;
        console.log("preparePlayerImages is done");
    }
}

function createCanvas() {
    if (document.getElementById("background") != null)
        document.getElementById("background").parentNode.removeChild(document.getElementById("background"));
    if (document.getElementById("foreground") != null)
        document.getElementById("foreground").parentNode.removeChild(document.getElementById("foreground"));
    if (document.getElementById("replay_container") != null)
        document.getElementById("replay_container").parentNode.removeChild(document.getElementById("replay_container"));

    var container = document.createElement("div");
    container.setAttribute("id", "replay_container");
    container.style.width = canvasWidth + "px";
    container.style.height = canvasHeight + "px";

    document.getElementById("content").appendChild(container);
    prepareImages();

    initBackgroundCanvas();
    initForegroundCanvas();
    initReplayInfoCanvas();

    renderField();
}

function initBackgroundCanvas() {
    background = document.createElement("canvas");
    background.setAttribute("id", "background");
    background.setAttribute("width", "520px");
    background.setAttribute("height", "500px");

    background.style.position = 'absolute';
    background.style.top = "20px";
    background.style.left = "140px";
    background.style.left = "252px";

    bgcontext = background.getContext("2d");
    bgcontext.mozImageSmoothingEnabled = false;
    bgcontext.imageSmoothingEnabled = false;

    var container = document.getElementById("replay_container");
    container.appendChild(background);
}

function initForegroundCanvas() {
    foreground = document.createElement("canvas");
    foreground.setAttribute("id", "foreground");
    foreground.setAttribute("width", "520px");
    foreground.setAttribute("height", "500px");

    foreground.style.position = 'absolute';
    foreground.style.top = "20px";
    foreground.style.left = "140px";
    foreground.style.left = "252px";

    fgcontext = foreground.getContext("2d");
    fgcontext.mozImageSmoothingEnabled = imageSmoothing;
    fgcontext.imageSmoothingEnabled = imageSmoothing;

    var container = document.getElementById("replay_container");
    container.appendChild(foreground);

}

function initTeamCanvas() {
    var width = "140";
    var width = "252";
    var height = "86";

    if (document.getElementById("homeTeamScore") == null) {
        var ht = document.createElement("canvas");
        ht.setAttribute("width", width + "px");
        ht.setAttribute("height", "104px");
        ht.setAttribute("id", "homeTeamScore");

        htctx = ht.getContext("2d");
        var gradient = htctx.createLinearGradient(0, 0, width, 104);
        gradient.addColorStop(0, "rgb(100,100,100)");
        gradient.addColorStop(1, "rgb(40,40,40)");

        htctx.fillStyle = gradient;
        htctx.fillRect(0, 0, width, 104);
        htctx.lineWidth = 2;
        htctx.strokeStyle = "white";
        htctx.strokeRect(0, 0, width, 104);

        var size = 72;
        htctx.font = "bold " + size + "px sans-serif";
        htctx.fillStyle = "white";
        var str = play_data.home_score;
        var tSize = htctx.measureText(str);
        htctx.fillText(str, 240 - tSize.width, 60);
        htctx.drawImage(imageData["homeAvatar"], 2, 3, 247, 147);

        ht.style.position = 'absolute';
        ht.style.top = "20px";
        ht.style.left = "0px";

        var container = document.getElementById("replay_container");
        container.appendChild(ht);
    }

    if (document.getElementById("awayTeamScore") == null) {
        var at = document.createElement("canvas");
        at.setAttribute("width", width + "px");
        at.setAttribute("height", "104px");
        at.setAttribute("id", "awayTeamScore");

        atctx = at.getContext("2d");
        var gradient = htctx.createLinearGradient(0, 0, width, 104);
        gradient.addColorStop(0, "rgb(100,100,100)");
        gradient.addColorStop(1, "rgb(40,40,40)");

        atctx.fillStyle = gradient;
        atctx.fillRect(0, 0, width, 104);
        atctx.lineWidth = 2;
        atctx.strokeStyle = "white";
        atctx.strokeRect(0, 0, width, 104);

        var size = 72;
        atctx.font = "bold " + size + "px sans-serif";
        atctx.fillStyle = "white";
        var str = play_data.away_score;
        var tSize = atctx.measureText(str);
        atctx.fillText(str, 240 - tSize.width, 60);
        atctx.drawImage(imageData["awayAvatar"], 2, 3, 247, 147);

        at.style.position = 'absolute';
        at.style.top = "20px";
        at.style.left = "772px";

        var container = document.getElementById("replay_container");
        container.appendChild(at);
    }
}

function generatePlayerCanvas(player, isHome) {
    var p = play_data.players[player.id.toString()];

    var div = document.createElement("div");
    div.setAttribute("id", "player_" + player.id);
    div.setAttribute("class", "player component light last");
    div.style.border = "1px solid #ffffff";
    div.style.margin = "0px";
    div.style.width = "250px";

    var img = document.createElement("img");
    img.setAttribute("src", "/game/avatar/player/" + player.id);
    img.setAttribute("class", "avatar_tiny left");

    var posdiv = document.createElement("div");
    posdiv.setAttribute("class", player.position + " left player_position");
    posdiv.innerHTML = player.position;

    var namediv = document.createElement("div");
    namediv.setAttribute("style", "background: none repeat scroll 0% 0%;");
    if (isHome) {
        namediv.style.backgroundColor = glbColors.home[1];
    }
    else {
        namediv.style.backgroundColor = glbColors.away[1];
    }
    namediv.setAttribute("class", "player_name");
    namediv.style.padding = "0px";
    namediv.style.top = "0px";

    var a = document.createElement("a");
    a.href = "/game/player/" + player.id;
    a.innerHTML = p.first_name + " " + p.last_name;
    var len = measureText(10, p.first_name + " " + p.last_name);
    if (len > 125) {
        len = measureText(10, p.first_name.slice(0, 1) + ". " + p.last_name);
        if (len > 125) {
            a.innerHTML = p.first_name.slice(0, 1) + ". " + p.last_name.slice(0, 1) + ". AKA Jackass";
        }
        else {
            a.innerHTML = p.first_name.slice(0, 1) + ". " + p.last_name;
        }
    }

    var replays = document.createElement("img");
    replays.setAttribute("class", "player_replay_icon right");
    replays.setAttribute("id", "player_replays_" + gameId + "-" + player.id);
    replays.style.marginTop = "2px";
    replays.src = "/images/ui/player_replay_icon.gif";

    var next = document.createElement("a");
    next.setAttribute("class", "button play_btn noselect right");
    next.setAttribute("id", "next_player_replay_" + gameId + "-" + player.id);
    next.appendChild(document.createElement("div"));
    next.style.margin = "2px 1px 1px 1px";
    next.style.padding = "0px";
    next.style.height = "16px";

    var highlight = document.createElement("div");
    highlight.setAttribute("class", "smallButton right");
    highlight.setAttribute("id", "highlight_" + p.id);
    highlight.innerHTML = "HL";//"Highlight";
    highlight.style.fontSize = "9px";
    highlight.style.width = "16px";//"45px";

    var textposdiv = document.createElement("div");
    textposdiv.setAttribute("class", "player_data");
    textposdiv.innerHTML = "Assigned Position: " + player.pos;
    textposdiv.style.padding = "2px";

    var energydiv = document.createElement("div");
    energydiv.setAttribute("class", "player_energy");
    energydiv.style.width = "80px";
    energydiv.style.height = "7px";
    energydiv.style.top = "23px";

    var energybarmaxdiv = document.createElement("div");
    energybarmaxdiv.setAttribute("class", "player_max_energy_bar");
    energybarmaxdiv.setAttribute("id", "max_energy_" + player.id);
    energybarmaxdiv.style.width = "0%";

    var energybardiv = document.createElement("div");
    energybardiv.setAttribute("class", "player_energy_bar");
    energybardiv.setAttribute("id", "energy_" + player.id);
    energybardiv.style.width = "0%";
    energybardiv.style.fontSize = "9px";
    energybardiv.style.lineHeight = "7px";

    var moralediv = document.createElement("div");
    moralediv.setAttribute("class", "player_morale");
    moralediv.style.width = "80px";
    moralediv.style.height = "7px";
    moralediv.style.top = "33px";

    var moralebarmaxdiv = document.createElement("div");
    moralebarmaxdiv.setAttribute("class", "player_max_morale_bar");
    moralebarmaxdiv.setAttribute("id", "max_morale_" + player.id);
    moralebarmaxdiv.style.width = "0%";

    var moralebardiv = document.createElement("div");
    moralebardiv.setAttribute("class", "player_morale_bar");
    moralebardiv.setAttribute("id", "morale_" + player.id);
    moralebardiv.style.width = "0%";
    moralebardiv.style.fontSize = "9px";
    moralebardiv.style.lineHeight = "7px";

    div.appendChild(img);

    div.appendChild(posdiv);

    namediv.appendChild(a);
    namediv.appendChild(next);
//    namediv.appendChild(replays);
    namediv.appendChild(highlight);
    div.appendChild(namediv);

    div.appendChild(textposdiv);

    energydiv.appendChild(energybarmaxdiv);
    energydiv.appendChild(energybardiv);
    div.appendChild(energydiv);

    moralediv.appendChild(moralebarmaxdiv);
    moralediv.appendChild(moralebardiv);
    div.appendChild(moralediv);

    highlight.addEventListener('click', function(evt) {
        var id = parseInt(this.id.split("_")[1]);
        var idx = unsafeWindow.glb2.replay.myPlayerList.indexOf(id);
        if (idx === -1) {
            unsafeWindow.glb2.replay.myPlayerList.push(id);
            preparePlayerImages();
        }
        else {
            unsafeWindow.glb2.replay.myPlayerList.splice(idx, 1);
            preparePlayerImages();
        }
    }, false);

    /*
     prev.addEventListener('click', function(evt) {
     pausePressed();
     
     var playerId = this.id.split("-")[1];
     console.log("prev clicked : " + this.id + " :: " + playerId);
     
     var post = new XMLHttpRequest();
     var url = "http://glb2.warriorgeneral.com/game/player/" + playerId + "/replays";
     var data = "game_id=" + gameId;
     
     post.open("POST", url, true);
     post.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
     post.setRequestHeader("Content-length", data.length);
     post.setRequestHeader("Connection", "close");
     post.onreadystatechange = function() {
        if ((post.readyState === 4) && (post.status === 200)) {
            pausePressed();
            var div = document.createElement("div");
            div.innerHTML = this.responseText;

            var el = div.getElementsByClassName("play_btn");
            var plays = [];
            for (var i = el.length - 1; i >= 0; i--) {
                plays.push(el[i].href.split("?")[0]);
            }
            var next = plays.indexOf("http://glb2.warriorgeneral.com/game/replay/" + gameId + "/" + playId);
            next++;
            if (plays.length > next) {
                play_data.next_play_id = plays[next].split(gameId + "/")[1].split("?")[0];
                nextPlayPressed();
            }
            else {
                alert("No plays remaining.");
            }
        }
     };
     post.send(data);
     });
     */
    next.addEventListener('click', function(evt) {
        pausePressed();

        var playerId = this.id.split("-")[1];
        console.log("next clicked : " + this.id + " :: " + playerId);

        var post = new XMLHttpRequest();
        var url = "http://glb2.warriorgeneral.com/game/player/" + playerId + "/replays";
        var data = "game_id=" + gameId;

        post.open("POST", url, true);
        post.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        post.setRequestHeader("Content-length", data.length);
        post.setRequestHeader("Connection", "close");
        post.onreadystatechange = function() {
            if ((post.readyState === 4) && (post.status === 200)) {
                pausePressed();
                var div = document.createElement("div");
                div.innerHTML = this.responseText;

                var el = div.getElementsByClassName("play_btn");
                var plays = [];
                for (var i = 0; i < el.length; i++) {
                    plays.push(el[i].href.split("?")[0]);
                }
                var next = plays.indexOf("http://glb2.warriorgeneral.com/game/replay/" + gameId + "/" + playId);
                next++;
                if (plays.length > next) {
                    play_data.next_play_id = plays[next].split(gameId + "/")[1].split("?")[0];
                    nextPlayPressed();
                }
                else {
                    alert("No plays remaining.");
                }
            }
        };
        post.send(data);
    });

    return div;
}

function initPlayerCanvas() {
    var width = "140";
    var width = "252";
    var height = "36";

    if (document.getElementById("homeTeam") == null) {
        var container = document.getElementById("replay_container");
        var canvasH = document.createElement("div");
        canvasH.setAttribute("id", "homeTeam");
        canvasH.setAttribute("width", width + "px");
        canvasH.setAttribute("height", "480px");
        canvasH.style.position = 'absolute';
        canvasH.style.top = "124px";
        canvasH.style.left = "0px";
        container.appendChild(canvasH);
    }

    if (document.getElementById("awayTeam") == null) {
        var container = document.getElementById("replay_container");
        var canvasA = document.createElement("div");
        canvasA.setAttribute("id", "awayTeam");
        canvasA.setAttribute("width", width + "px");
        canvasA.setAttribute("height", "480px");
        canvasA.style.position = 'absolute';
        canvasA.style.top = "124px";
        canvasA.style.left = "772px";
        container.appendChild(canvasA);
    }

    for each (var p in play_data.parr) {
        if (p.id === "ball")
            continue;

        if (p.home === 1) {
            var div = document.getElementById("homeTeam");
            div.appendChild(generatePlayerCanvas(p, true));
        }
        else {
            var div = document.getElementById("awayTeam");
            div.appendChild(generatePlayerCanvas(p, null));
        }
    }

}

function getMousePosition(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function initReplayInfoCanvas() {
    var canvas = document.createElement("canvas");
    canvas.style.position = 'absolute';
    canvas.setAttribute("id", "replayInfo");
    canvas.setAttribute("width", canvasWidth + "px");
    canvas.setAttribute("height", "20px");

    var container = document.getElementById("replay_container");
    container.appendChild(canvas);

    var div = document.createElement("div");
    div.style.position = 'absolute';
    div.style.top = "520px";
    div.setAttribute("id", "playResults");
    div.setAttribute("width", canvasWidth + "px");
    div.setAttribute("height", "220px");

    var container = document.getElementById("replay_container");
    container.appendChild(div);
}

function renderField(frame, pct) {
    var y = 0;
    if (cam_data !== null) {
        var ydiff = cam_data[Math.min(frame + 1, cam_data.length - 1)] - cam_data[frame];
        y = cam_data[frame] + ydiff * pct;
    }

    bgcontext.drawImage(imageData["field"], 0, 0 - y, 520, 500, 0, 0, 520, 500);
    return y;
}

function renderReplayInfo() {
    if (imageData["replayInfo"] == null) {
        var canvas = document.createElement("canvas");
        canvas.setAttribute("width", canvasWidth + "px");
        canvas.setAttribute("height", "20px");
        var context = canvas.getContext("2d");

        var gradient = context.createLinearGradient(0, 0, 0, 20);
        gradient.addColorStop(0, "rgb(100,100,100)");
        gradient.addColorStop(1, "rgb(40,40,40)");

        context.lineWidth = 2;
        context.fillStyle = gradient;
        context.fillRect(0, 0, canvasWidth, 20);

        context.font = "bold 18px sans-serif";
        context.fillStyle = "#ffcc00";

        var info = "Q" + play_data.quarter;
        info += " " + Math.floor(play_data.time_remaining / 60) + ":";
        if ((play_data.time_remaining % 60) < 10)
            info += "0";
        info += (play_data.time_remaining % 60);
        info += " " + play_data.down + " and " + play_data.to_go;
        info += " on " + Math.round(play_data.los);

        var length = context.measureText(info.toString());
        context.fillText(info.toString(), (canvasWidth / 2) - length.width / 2, 16);

        context.fillStyle = "white";

        var str = unsafeWindow.glb2.replay.home_team.city + " " + unsafeWindow.glb2.replay.home_team.mascot;
        context.fillText(str, 4, 16);

        var str = unsafeWindow.glb2.replay.away_team.city + " " + unsafeWindow.glb2.replay.away_team.mascot;
        var tSize = context.measureText(str);
        context.fillText(str, canvasWidth - tSize.width, 16);

        imageData["replayInfo"] = canvas;
    }
    var canvas = document.getElementById("replayInfo");
    var context = canvas.getContext("2d");
    context.drawImage(imageData["replayInfo"], 0, 0);

    if (imageData["playResults"] == null) {
        var canvas = document.createElement("canvas");
        canvas.setAttribute("width", canvasWidth + "px");
        canvas.setAttribute("height", "100px");
        var context = canvas.getContext("2d");

        var gradient = context.createLinearGradient(0, 0, 0, 100);
        gradient.addColorStop(0, "rgb(100,100,100)");
        gradient.addColorStop(1, "rgb(40,40,40)");

        context.lineWidth = 2;
        context.fillStyle = gradient;
        context.fillRect(0, 0, canvasWidth, 220);

        var size = 14;
        var splits = play_data.description.split(" ");
        context.font = "bold " + size + "px sans-serif";
        context.fillStyle = "#ffcc00";

        var lines = 2;
        var working = splits[0];
        for (var i = 1; i < splits.length; i++) {
            var length = context.measureText(working + " " + splits[i]);
            if (length.width > 510) {
                lines++;
                context.fillText(working.toString(), 260, 0 + 16 * lines);
                working = splits[i];
            }
            else {
                working += " " + splits[i];
            }
        }
        lines++;
        context.fillText(working.toString(), 260, 0 + 16 * lines);
        imageData["playResults"] = canvas;
    }
//    console.log(play_data.description);

    var ri = document.getElementById("resultsImage");
    if (ri != null) {
        ri.parentNode.removeChild(ri);
    }

    var dataURL = imageData["playResults"].toDataURL("image/png");
    var img = document.createElement("img");
    img.setAttribute("id", "resultsImage");
    img.src = dataURL;

    var results = document.getElementById("playResults");
    results.appendChild(img);
}

function renderVitals(frame, pct, loc) {
    try {
        for (var i = play_data.frames[frame].length - 1; i >= 0; i--) {
            var p = play_data.frames[frame][i];

            if (p[0] === "ball")
                continue;

            var ene = document.getElementById("energy_" + p[0]);
            if (ene.style.width !== p[7] + "%") {
                ene.style.width = p[7] + "%";
                //            ene.innerHTML = p[7];
            }

            var enemax = document.getElementById("max_energy_" + p[0]);
            if (enemax.style.width !== p[8] + "%") {
                enemax.style.width = Math.max(parseInt(ene.style.width), p[8]) + "%";
            }

            var mor = document.getElementById("morale_" + p[0]);
            if (mor.style.width !== p[9] + "%") {
                mor.style.width = p[9] + "%";
                //            mor.innerHTML = p[9];
            }
        }
    }
    catch (e) {
//        console.log(e);
    }
}

var hasit = null; //fix me                    
var extraStateStrings = {//fix me too
    'clock_manager': 'Clock Manager',
    'goal_line_back': 'Goal Line Back',
    'goal_line_blocker': 'Goal Ln Blocker',
    'goal_line_stand': 'Goal Ln Stand',
    'tunnel_vision': 'Tunnel Vision',
    'closing_speed': 'Closing Speed',
    'first_step': 'First Step',
    'yac_attack': 'YAC Attack',
    'prime_time': 'Prime Time',
    'monster_hit': 'Monster Hit',
    'slot_machine': 'Slot Machine',
    'third_down_stopper': '3rd Dn Stopper',
    'pancake_chef': 'Pancake Chef',
    'quick_read': 'Quick Read',
    'head_fake': 'Head Fake',
    'stiff_arm': 'Stiff Arm',
    'trash_talk': 'Trash Talk',
    'unstoppable': 'Unstp. Force',
    'immovable': 'Immv. Object',
    'strong_arm': 'Strong Arm',
    'mr_reliable': 'Mr. Reliable',
    'shed_block': 'Shed Block',
    'get_low': 'Get Low',
    'on_the_run': 'On the Run',
    'death_grip': 'Death Grip',
    'leverage': 'Leverage',
    'pump_fake': 'Pump Fake',
    'pump_faked': 'Pump Faked',
    'pull_specialist': 'Pull Spec.',
    'follow_up': 'Follow Up',
    'tuck_and_run': 'Tuck and Run',
    'surge': 'Surge',
    'freight_train': 'Freight Train',
    'showboat': 'Showboat',
    'chase_down': 'Chase Down',
    'laces_out': 'Laces Out',
    'on_an_island': 'On an Island',
    'eyes_on_the_prize': 'Eyes on Prize',
    'opportunist': 'Opportunist',
    'pinned_deep': 'Pinned Deep',
    'three_and_out': 'Three & Out',
    'protect_the_lead': 'Protect Lead',
    'brace_for_impact': 'Brace 4 Impact',
    'celebration': 'Celebration',
    'coverage_commander': 'Cvg Cmdr',
    'stay_down': 'Stay Down',
    'grinder': 'Grinder',
    'entrapment': 'Entrapment',
    'inspire_fear': 'Inspire Fear',
    'youre_next': 'You\'re Next!',
    'hail_mary': 'Hail Mary',
    'catch_in_stride': 'Catch in Stride',
    'pick_six': 'Pick Six',
    'spin_cycle' : 'Spin Cycle',
    'juke' : 'Juke',
    'power_through' : 'Power Through'
};
var extraStateStringsLength = null;
function renderPlayers(frame, pct, loc) {
    for (var i = play_data.frames[frame].length - 2; i >= 0; i--) {
        var p = play_data.frames[frame][i];

        var id = p[0];
        if (imageData["player_" + id] == null)
            continue;

        var x1 = p[1];
        var y1 = p[2];

        var p2 = play_data.frames[Math.min(frame + 1, play_data.frames.length - 1)][i];
        var x2 = p2[1];
        var y2 = p2[2];

        var x = (x1 + (x2 - x1) * pct);
        var y = (y1 + (y2 - y1) * pct);

        //0 id
        //1,2,3 xyz
        //4 orientation nsew
        //5 state
        //6 v_ratio?
        //7 energy
        //8 max energy
        //9 morale

        if (imageData["player_" + id] != null) {
            fgcontext.drawImage(imageData["player_" + id], x, y + loc);

            if (p[5]) {
                var s = p[5].split("."); //looks like there's only 1 useable state string per frame
                for each (var str in s) {
                    if (str === "") continue;
//                    if (extraStateStrings[str] != null) {
                        fgcontext.font = "10px sans-serif";
                        fgcontext.fillStyle = "#ffffff";

                        var len = extraStateStringsLength[extraStateStrings[str]];
                        fgcontext.fillText(extraStateStrings[str], x - len, y + loc);
                        break;
//                    }
                }
            }
        }
        else {
            console.log(frame + " -- " + i + ") imageData[" + id + "] is null : " + p);
            preparePlayerImages();
        }
    }
}

function renderFirstDown(loc) {
    var delta = 6;

    var pos = (play_data.los + loc + delta);
    fgcontext.strokeStyle = "#0000ff";
    fgcontext.beginPath();
    fgcontext.moveTo(0, pos);
    fgcontext.lineTo(520, pos);
    fgcontext.stroke();

    var pos = (play_data.first_down + loc + delta);
    if (parseInt(play_data.down) === 4) {
        fgcontext.strokeStyle = "#ff0000";
    }
    else {
        fgcontext.strokeStyle = "#ffff00";
    }
    fgcontext.beginPath();
    fgcontext.moveTo(0, pos);
    fgcontext.lineTo(520, pos);
    fgcontext.stroke();
}

var offensePlaySmall = true;
var defensePlaySmall = true;
function renderPlayName() {
    /*
     console.log("plays are here:");
     console.log(imageData["offensePlaySmall"]);
     console.log(imageData["offensePlayLarge"]);
     console.log(imageData["defensePlaySmall"]);
     console.log(imageData["defensePlayLarge"]);
     */
    if (imageData["offensePlaySmall"] == null) {
        var width = 240;
        var height = 20;
        var size = 14;

        var offensePlay = createRectangle("offensePlay", width, height);
        var context = offensePlay.getContext("2d");

        context.fillStyle = "white";
        var info = play_data.offense_play.name;
        do {
            context.font = "bold " + size + "px sans-serif";
            var length = context.measureText(info.toString());
            size--;
        } while (length.width > width);
        context.fillText(info.toString(), (width / 2) - length.width / 2, 20);

        imageData["offensePlaySmall"] = offensePlay;
    }
    if (imageData["defensePlaySmall"] == null) {
        var width = 240;
        var height = 20;
        var size = 14;

        var defensePlay = createRectangle("defensePlay", width, height);
        var context = defensePlay.getContext("2d");

        context.fillStyle = "white";
        var info = play_data.defense_play.name;
        do {
            context.font = "bold " + size + "px sans-serif";
            var length = context.measureText(info.toString());
            size--;
        } while (length.width > width);
        context.fillText(info.toString(), (width / 2) - length.width / 2, 20);

        imageData["defensePlaySmall"] = defensePlay;
    }

    if (imageData["offensePlayLarge"] == null) {
        var width = 240;
        var height = 170;
        var size = 14;

        var textY = 20;
        if (direction === "up")
            textY = height;

        var offensePlay = createRectangle("offensePlay", width, height);
        var context = offensePlay.getContext("2d");

        context.fillStyle = "white";
        var info = play_data.offense_play.name;
        do {
            context.font = "bold " + size + "px sans-serif";
            var length = context.measureText(info.toString());
            size--;
        } while (length.width > width);
        context.fillText(info.toString(), (width / 2) - length.width / 2, textY);

        var oplay = new Image();
        oplay.src = "http://glb2.warriorgeneral.com/images/tactics/offense_plays/" +
                play_data.offense_play.id + ".gif";
        oplay.onload = function() {
            var context = imageData["offensePlayLarge"].getContext("2d");
            if (direction === "down") {
                context.scale(-1, -1);
                context.translate(-250, -194);
            }
            if (direction === "up")
                context.drawImage(oplay, 0, 0, 480, 300, 10, 10, 230, 144);
            else
                context.drawImage(oplay, 0, 0, 480, 300, 10, 25, 230, 144);
        };

        imageData["offensePlayLarge"] = offensePlay;
    }
    if (imageData["defensePlayLarge"] == null) {
        var width = 240;
        var height = 170;
        var size = 14;

        var textY = 20;
        if (direction === "up")
            textY = height;

        var defensePlay = createRectangle("defensePlay", width, height);
        var context = defensePlay.getContext("2d");

        context.fillStyle = "white";
        var info = play_data.defense_play.name;
        do {
            context.font = "bold " + size + "px sans-serif";
            var length = context.measureText(info.toString());
            size--;
        } while (length.width > width);
        context.fillText(info.toString(), (width / 2) - length.width / 2, textY);

        var dplay = new Image();
        dplay.src = "http://glb2.warriorgeneral.com/images/tactics/defense_plays/" +
                play_data.defense_play.id + ".jpg";
        dplay.onload = function() {
            var context = imageData["defensePlayLarge"].getContext("2d");
            if (direction === "down") {
                context.scale(-1, -1);
                context.translate(-250, -194);
            }
            if (direction === "up")
                context.drawImage(dplay, 0, 0, 480, 300, 10, 10, 230, 144);
            else
                context.drawImage(dplay, 0, 0, 480, 300, 10, 25, 230, 144);
        };

        imageData["defensePlayLarge"] = defensePlay;
    }
    /*
     console.log("plays are now here:");
     console.log(imageData["offensePlaySmall"]);
     console.log(imageData["offensePlayLarge"]);
     console.log(imageData["defensePlaySmall"]);
     console.log(imageData["defensePlayLarge"]);
     */
    if (imageData["offensePlay"] == null) {
        var width = 240;
        var height = 170;
        var size = 14;

        var top = "20px";
        if (direction === "up")
            top = (510 - height) + "px";

        var offensePlay = createRectangle("offensePlay", width, height);
        imageData["offensePlay"] = offensePlay;

        offensePlay.isSmall = true;
        offensePlay.getContext("2d").clearRect(0, 0, width + 10, height + 10);
        if (direction === "down")
            offensePlay.getContext("2d").drawImage(imageData["offensePlaySmall"], 0, 0);
        else
            offensePlay.getContext("2d").drawImage(imageData["offensePlaySmall"], 0, height - 20);

        offensePlay.style.position = 'absolute';
        offensePlay.style.left = 252 + "px";

        offensePlay.style.top = top;
        offensePlay.addEventListener('click', function(evt) {
            if (this.isSmall === true) {
                this.getContext("2d").drawImage(imageData["offensePlayLarge"], 0, 0);
            }
            else {
                this.getContext("2d").clearRect(0, 0, width + 10, height + 10);
                if (direction === "down")
                    offensePlay.getContext("2d").drawImage(imageData["offensePlaySmall"], 0, 0);
                else
                    offensePlay.getContext("2d").drawImage(imageData["offensePlaySmall"], 0, height - 20);
            }
            this.isSmall = !this.isSmall;
        }, false);

        var container = document.getElementById("replay_container");
        container.appendChild(offensePlay);

        /*            
         var width = 240;
         var height = 170;
         var size = 14;
         
         var offensePlay = createRectangle("offensePlay", width, height);
         
         imageData["offensePlay"] = offensePlay;
         
         offensePlay.isSmall = true;
         offensePlay.getContext("2d").clearRect(0, 0, width + 10, height + 10);
         offensePlay.getContext("2d").drawImage(imageData["offensePlaySmall"], 0, 0);
         
         offensePlay.style.position = 'absolute';
         offensePlay.style.left = 252 + "px";
         offensePlay.style.top = 20 + "px";
         offensePlay.addEventListener('click', function(evt) {
         var pos = getMousePosition(offensePlay, evt);
         if (this.isSmall === true) {
         this.getContext("2d").drawImage(imageData["offensePlayLarge"], 0, 0);
         }
         else {
         this.getContext("2d").clearRect(0, 0, width + 10, height + 10);
         this.getContext("2d").drawImage(imageData["offensePlaySmall"], 0, 0);
         }
         this.isSmall = !this.isSmall;
         }, false);
         
         var container = document.getElementById("replay_container");
         container.appendChild(offensePlay);
         */
    }
    if (imageData["defensePlay"] == null) {
        var width = 240;
        var height = 170;
        var size = 14;

        var top = "20px";
        if (direction === "up")
            top = (510 - height) + "px";

        var defensePlay = createRectangle("defensePlay", width, height);

        imageData["defensePlay"] = defensePlay;

        defensePlay.isSmall = true;
        defensePlay.getContext("2d").clearRect(0, 0, width + 10, height + 10);
        if (direction === "down")
            defensePlay.getContext("2d").drawImage(imageData["defensePlaySmall"], 0, 0);
        else
            defensePlay.getContext("2d").drawImage(imageData["defensePlaySmall"], 0, height - 20);

        defensePlay.style.position = 'absolute';
        defensePlay.style.left = 522 + "px";
        defensePlay.style.top = top;//20 + "px";
        defensePlay.addEventListener('click', function(evt) {
            if (this.isSmall === true) {
                this.getContext("2d").drawImage(imageData["defensePlayLarge"], 0, 0);
            }
            else {
                this.getContext("2d").clearRect(0, 0, width + 10, height + 10);
                if (direction === "down")
                    defensePlay.getContext("2d").drawImage(imageData["defensePlaySmall"], 0, 0);
                else
                    defensePlay.getContext("2d").drawImage(imageData["defensePlaySmall"], 0, height - 20);
            }
            this.isSmall = !this.isSmall;
        }, false);

        var container = document.getElementById("replay_container");
        container.appendChild(defensePlay);
    }
}

function createRectangle(id, w, h, r) {
    var x = 5;
    var y = 5;
    var radius = 10;
    if (r != null)
        radius = r;

    var r = x + w;
    var b = y + h;

    var canvas = document.createElement("canvas");
    canvas.setAttribute("id", id);
    canvas.setAttribute("width", (x + r) + "px");
    canvas.setAttribute("height", (y + b) + "px");
    var context = canvas.getContext("2d");

    var gradient = context.createLinearGradient(0, 0, 0, 20);
    gradient.addColorStop(0, "rgb(100,100,100)");
    gradient.addColorStop(1, "rgb(40,40,40)");
    context.fillStyle = gradient;
    context.strokeStyle = "white";
    context.lineWidth = "3";

    context.beginPath();
    context.moveTo(x + radius, y);
    context.lineTo(r - radius, y);
    context.quadraticCurveTo(r, y, r, y + radius);
    context.lineTo(r, y + h - radius);
    context.quadraticCurveTo(r, b, r - radius, b);
    context.lineTo(x + radius, b);
    context.quadraticCurveTo(x, b, x, b - radius);
    context.lineTo(x, y + radius);
    context.quadraticCurveTo(x, y, x + radius, y);
    context.closePath();
    context.stroke();
    context.fill();
    return canvas;
}

function measureText(size, str) {
    fgcontext.font = "bold " + size + "px sans-serif";
    var tSize = fgcontext.measureText(str.toString());
//    console.log(str+" @ "+size+" = "+tSize.width);
    return tSize.width;
}
function renderControls() {
    var w = 32;
    var h = 20;
    var size = 13;
    var spread = 6;
    var y = 0;
    var locations = [262];

    if (document.getElementById("prevPoss") == null) {
        var twidth = measureText(size, "< Prev Poss");
        var prevPoss = createRectangle("prevPoss", 8 + twidth, h);
        var bcontext = prevPoss.getContext("2d");
        bcontext.font = "bold " + size + "px sans-serif";
        bcontext.fillStyle = "#ffffff";
        bcontext.fillText("< Prev Poss", 9, 19);
        locations.push(locations[locations.length - 1] + 8 + twidth + spread);

        prevPoss.style.position = 'absolute';
        prevPoss.style.top = y + "px";
        prevPoss.style.left = locations[0] + "px";

        var container = document.getElementById("playResults");//replay_container");
        container.appendChild(prevPoss);
        prevPoss.addEventListener('click', function(evt) {
            var pos = getMousePosition(prevPoss, evt);
            console.log("prevPoss: " + pos.x + "," + pos.y);
            prevPossPressed();
        }, false);
    }

    if (document.getElementById("prevPlay") == null) {
        var twidth = measureText(size, "< Prev Play");
        var prevPlay = createRectangle("prevPlay", 8 + twidth, h);
        var bcontext = prevPlay.getContext("2d");
        bcontext.font = "bold " + size + "px sans-serif";
        bcontext.fillStyle = "#ffffff";
        bcontext.fillText("< Prev Play", 8, 19);
        locations.push(locations[locations.length - 1] + 8 + twidth + spread);

        prevPlay.style.position = 'absolute';
        prevPlay.style.top = y + "px";
        prevPlay.style.left = locations[1] + "px";

        var container = document.getElementById("playResults");//replay_container");
        container.appendChild(prevPlay);
        prevPlay.addEventListener('click', function(evt) {
            prevPlayPressed();
        }, false);
    }

    if (document.getElementById("rwButton") == null) {
        var rw = createRectangle("rwButton", w, h);
        rw.getContext("2d").drawImage(imageData["rwButton"], 11, 7);
        locations.push(locations[locations.length - 1] + w + spread);

        rw.style.position = 'absolute';
        rw.style.top = y + "px";
        rw.style.left = locations[2] + "px";

        var container = document.getElementById("playResults");//replay_container");
        container.appendChild(rw);
        rw.addEventListener('click', function(evt) {
            var pos = getMousePosition(rw, evt);
            console.log("rwButton: " + pos.x + "," + pos.y);
        }, false);
    }

    if (document.getElementById("pauseButton") == null) {
        var pause = createRectangle("pauseButton", w, h);
        pause.getContext("2d").drawImage(imageData["pauseButton"], 13, 7);
        locations.push(locations[locations.length - 1] + w + spread);

        pause.style.position = 'absolute';
        pause.style.top = y + "px";
        pause.style.left = locations[3] + "px";

        var container = document.getElementById("playResults");//replay_container");
        container.appendChild(pause);
        pause.addEventListener('click', function(evt) {
            pausePressed();
        }, false);
    }

    if (document.getElementById("playButton") == null) {
        var play = createRectangle("playButton", w, h);
        play.getContext("2d").drawImage(imageData["playButton"], 13, 7);
        locations.push(locations[locations.length - 1] + w + spread);

        play.style.position = 'absolute';
        play.style.top = y + "px";
        play.style.left = locations[4] + "px";

        var container = document.getElementById("playResults");//replay_container");
        container.appendChild(play);
        play.addEventListener('click', function(evt) {
            playPressed();
        }, false);
    }

    if (document.getElementById("ffButton") == null) {
        var ff = createRectangle("ffButton", w, h);
        ff.getContext("2d").drawImage(imageData["ffButton"], 11, 7);
        locations.push(locations[locations.length - 1] + w + spread);

        ff.style.position = 'absolute';
        ff.style.top = y + "px";
        ff.style.left = locations[5] + "px";

        var container = document.getElementById("playResults");//replay_container");
        container.appendChild(ff);
        ff.addEventListener('click', function(evt) {
            var pos = getMousePosition(ff, evt);
            console.log("ff: " + pos.x + "," + pos.y);
        }, false);
    }

    if (document.getElementById("nextPlay") == null) {
        var twidth = measureText(size, "Next Play >");
        var nextPlay = createRectangle("nextPlay", 8 + twidth, h);
        var bcontext = nextPlay.getContext("2d");
        bcontext.font = "bold " + size + "px sans-serif";
        bcontext.fillStyle = "#ffffff";
        bcontext.fillText("Next Play >", 9, 19);
        locations.push(locations[locations.length - 1] + 8 + twidth + spread);

        nextPlay.style.position = 'absolute';
        nextPlay.style.top = y + "px";
        nextPlay.style.left = locations[6] + "px";

        var container = document.getElementById("playResults");//replay_container");
        container.appendChild(nextPlay);
        nextPlay.addEventListener('click', function(evt) {
            var pos = getMousePosition(nextPlay, evt);
            console.log("nextPlay: " + pos.x + "," + pos.y);
            nextPlayPressed();
        }, false);
    }

    if (document.getElementById("nextPoss") == null) {
        var twidth = measureText(size, "Next Poss >>");
        var nextPoss = createRectangle("nextPoss", 8 + twidth, h);
        var bcontext = nextPoss.getContext("2d");
        bcontext.font = "bold " + size + "px sans-serif";
        bcontext.fillStyle = "#ffffff";
        bcontext.fillText("Next Poss >>", 9, 19);
        locations.push(locations[locations.length - 1] + 8 + twidth + spread);

        nextPoss.style.position = 'absolute';
        nextPoss.style.top = y + "px";
        nextPoss.style.left = locations[7] + "px";

        var container = document.getElementById("playResults");//replay_container");
        container.appendChild(nextPoss);
        nextPoss.addEventListener('click', function(evt) {
            var pos = getMousePosition(nextPoss, evt);
            console.log("nextPoss: " + pos.x + "," + pos.y);
            nextPossPressed();
        }, false);
    }
}
function prevPossPressed() {
    console.log("current = " + gameId + "/" + playId);
    if (play_data.prev_play_id === 0) {
        alert("This is the first possession.");
        return;
    }
    var get = new XMLHttpRequest();
    var url = "http://glb2.warriorgeneral.com/game/game/" + gameId + "/pbp";

    get.open("GET", url, true);
    get.onreadystatechange = function() {
        if ((get.readyState === 4) && (get.status === 200)) {
            pausePressed();

            var splits = this.responseText.split('href="/game/replay/' + gameId + '/' + playId)[0];
            splits = splits.split("<h1>Play By Play</h1>")[1];

            var div = document.createElement("div");
            div.innerHTML = splits;
//            document.body.appendChild(div);

            var i = 0;
            var play = null;
            var table = div.getElementsByTagName("table")[0];
            for each (var r in table.rows) {
                if ((play == null) && (r.className.indexOf("pbp_play_row") != -1)) {
                    play = r;
                }
                else if ((r.className === "pbp_divider") && (table.rows[r.rowIndex + 2])) {
                    play = null;
                }
            }

            play = play.getElementsByTagName("a")[0].href;
            gameId = play.split("/")[5];
            playId = play.split("/")[6];
            console.log("switching to " + gameId + "/" + playId);

            for each (var i in imageData)
                delete i;
            delete imageData;
            imageData = [];
            prepareImages();
            GM_getInetPage("http://glb2.warriorgeneral.com/game/replay/" + gameId + "/" + playId + "/1",
                    getPlayData, null);
        }
    };
    get.send();
}
function prevPlayPressed() {
    if (play_data.prev_play_id === 0) {
        alert("This is the first play.");
        return;
    }
    gameId = window.location.toString().split("/")[5];
    playId = play_data.prev_play_id;
    console.log("switching to " + gameId + "/" + playId);

    pausePressed();

    for each (var i in imageData)
        delete i;
    delete imageData;
    imageData = [];
    prepareImages();
    var addr = window.location.toString().slice(0, window.location.toString().indexOf("warrior"));
    GM_getInetPage(addr + "warriorgeneral.com/game/replay/" + gameId + "/" + playId + "/1",
            getPlayData, null);
}
function pausePressed() {
    isPlaying = false;
}
function playPressed() {
    isPlaying = true;
}
function nextPlayPressed() {
    if (play_data.next_play_id === 0) {
        alert("This is the last play.");
        return;
    }
    gameId = window.location.toString().split("/")[5];
    playId = play_data.next_play_id;
    console.log("switching to " + gameId + "/" + playId);

    pausePressed();

    for each (var i in imageData)
        delete i;
    delete imageData;
    imageData = [];
    prepareImages();
    var addr = window.location.toString().slice(0, window.location.toString().indexOf("warrior"));
    GM_getInetPage(addr + "warriorgeneral.com/game/replay/" + gameId + "/" + playId + "/1",
            getPlayData, null);
}
function nextPossPressed() {
    console.log("current = " + gameId + "/" + playId);

    var get = new XMLHttpRequest();
    var url = "http://glb2.warriorgeneral.com/game/game/" + gameId + "/pbp";

    get.open("GET", url, true);
    get.onreadystatechange = function() {
        if ((get.readyState === 4) && (get.status === 200)) {
            pausePressed();

            var splits = this.responseText.split('href="/game/replay/' + gameId + '/' + playId)[1];

            var div = document.createElement("div");
            div.innerHTML = "<table><thead><tbody>" + splits;
            document.body.appendChild(div);

            var i = 0;
            var play = null;
            var table = div.getElementsByTagName("table")[0];
            for each (var r in table.rows) {
                if (!r.innerHTML)
                    continue;

                if ((r.className === "pbp_divider") || (r.innerHTML.indexOf('<th colspan="6">3rd Quarter</th>') != -1)) { //no 3rd qtr divider
                    play = table.rows[r.rowIndex + 1];
                    break;
                }
            }
            if (play == null) {
                alert("This is the final possession.");
                playPressed();
                return;
            }
            play = play.getElementsByTagName("a")[0].href;
            gameId = play.split("/")[5];
            playId = play.split("/")[6];
            console.log("switching to " + gameId + "/" + playId);

            for each (var i in imageData)
                delete i;
            delete imageData;
            imageData = [];
            prepareImages();
            GM_getInetPage("http://glb2.warriorgeneral.com/game/replay/" + gameId + "/" + playId + "/1",
                    getPlayData, null);
        }
    };
    get.send();
}

var ballIdx = -1;
function renderBall(frame, pct, loc) {
    var left = play_data.frames[frame];
    var right = play_data.frames[Math.min(frame + 1, play_data.frames.length - 1)];

    var xdiff = right[ballIdx][1] - left[ballIdx][1];
    var ydiff = right[ballIdx][2] - left[ballIdx][2];
    var x = left[ballIdx][1] + xdiff * pct + 3;
    var y = left[ballIdx][2] + ydiff * pct + loc;

    if (imageData["ball"] != null) {
        if ((left[ballIdx][3] < 5) || (right[ballIdx][3] < 5)) {
            fgcontext.drawImage(imageData["ball"], x, y);
            imageData["rotated-ball"] = null;
        }
        else {
            if (imageData["rotated-ball"] == null) {
                var mul = 1;
                if (left[ballIdx][1] < right[ballIdx][1]) {
                    mul = 1;
                }
                else {
                    mul = -1;
                }
                if (left[ballIdx][2] < right[ballIdx][2]) {
                    mul = mul * -1;
                }
                else {
                    mul = mul * 1;
                }
                var rotation = mul * Math.atan(Math.abs(left[ballIdx][1] - right[ballIdx][1]) / Math.abs(left[ballIdx][2] - right[ballIdx][2]));
                rotation += 2 * Math.PI;

                var canvas = document.createElement("canvas");
                canvas.setAttribute("width", 16);
                canvas.setAttribute("height", 16);
                var context = canvas.getContext("2d");
                context.save();
                context.translate(8, 8);
                context.rotate(rotation);
                context.drawImage(imageData["ball"], -8, -8);
                context.restore();

                imageData["rotated-ball"] = canvas;
            }
            fgcontext.drawImage(imageData["rotated-ball"], x, y);
        }
    }
}

function drawFrame(frame, pct) {
    var loc = renderField(frame, pct);

    fgcontext.clearRect(0, 0, 520, 500);

    renderFirstDown(loc);
    if (play_data.frames.length > 0) {
        if (extraStateStringsLength == null) {
            extraStateStringsLength = [];
            console.log("building state string text lengths");
            for each (var state in extraStateStrings) {
                extraStateStringsLength[state] = Math.round(measureText(10, state) / 2) - 8;
            }
        }

        renderPlayers(frame, pct, loc);
        renderBall(frame, pct, loc);

        if (lastFrame !== currentFrame) {
            renderVitals(frame, pct, loc);
        }
    }
}

var direction = "up";
var firstRun = true;
var isPlaying = false;
var initialTime = null;
var currentTime = null;
var lastTime = null;
var frameMultiplier = 1;
var lastFrame;
var currentFrame;
var cld = false;

function render() {
    if (firstRun === true) {
        drawFrame(0, 0);
        renderVitals(0, 0, 0);
        if (!cld) { //fix me
            cld = true;
            setTimeout(predelay, 2500);
        }
        window.requestAnimationFrame(render);
        return;
    }
    else if ((isPlaying === false) && (initialTime != null)) {
        currentTime = Date.now();
        var diff = currentTime - lastTime;
        initialTime = initialTime + diff;
        lastTime = currentTime;
    }

    else if (isPlaying === true) {
        currentTime = Date.now();
        if (initialTime == null) {
            initialTime = currentTime;
        }
    }

    var diff = currentTime - initialTime;
    var frame = diff / 100 * frameMultiplier;
    pct = frame - Math.floor(frame);
    frame = Math.floor(frame) % play_data.frames.length;
    currentFrame = frame;

    drawFrame(frame, pct);

    if (isPlaying === true) {
        lastTime = currentTime;
        lastFrame = frame;
    }

    if (frame >= play_data.frames.length - 1) {
        initialTime = null;
        setTimeout(postdelay, 3500);
    }
    else {
//                setTimeout(function() { render(); }, 1000/30);
        window.requestAnimationFrame(render);
    }
}

function predelay() {
    firstRun = false;
    isPlaying = true;
    cld = false;
}
function postdelay() {
    drawFrame(0, 0);
    render();
}

function playerOrder(pos) {
    var arr = ["KR", "PR", "K", "P", "QB", "HB", "FB", "FB2", "TE", "BTE", "GLTE",
        "WR1", "WR2", "WR3", "WR4", "WR5",
        "LDE", "NT", "DT", "DT1", "DT2", "DT3", "DT4", "RDE", "DE1", "DE2",
        "LOLB", "LILB", "MLB", "RILB", "ROLB", "LB1", "LB2", "LB3",
        "CB", "CB1", "CB2", "CB3", "CB4", "CB5", "FS", "SS",
        "PH", "ST", "FL1", "FL2",
        "UB1", "TE1", "TE2", "UB2", "PH",
        "OU1", "OU2", "FW1", "FW2", "FW3", "OU3", "OU4", "BW1", "BW2", "BW3",
        "OU4", "OU5", "OU6", "IN1", "IN2", "IN3", "IN4", "IN5",
        "SE1", "SB1", "SB2",
        "ER1", "DL1", "DL2", "DL3", "DL4", "ER2", "SE2", "PP", "PP1", "PP2",
        "LOT", "LG", "C", "LS", "RG", "ROT"];

    if (arr.indexOf(pos) === -1) {
        console.log("not in playerOrder: " + pos);
        return 100;
    }
    return arr.indexOf(pos);
}
var cam_data = null;
var ballIdx = -1;
function fixFrames() {
    var stime = Date.now();
    var missing = 0;
    var newframes = [];
    for (var f = 0; f < play_data.frames.length; f++) {
        if (play_data.frames[f].length > 0) {
            newframes.push(play_data.frames[f]);
        }
        else {
            missing++;
        }
    }
    var time = Date.now() - stime;
    console.log("fixframes cut " + missing + " (why are frames missing?): " + time.toFixed(0) + "ms");

    var missing_strings = "";
    var stime = Date.now();
    console.log(extraStateStrings);
    for each (var f in play_data.frames) {
        for each (var p in f) {
            var trim = "";

            var split = p[5].split(".");
            for each (var s in split) {
                if (extraStateStrings[s] != null) {
                    trim = trim + s + ".";
                }
                else if (missing_strings.indexOf(s) == -1) {
                    missing_strings += s+" ";
                }
            }
            if (trim.length > 0)
                p[5] = trim;
            else 
                p[5] = null;
        }
    }
    console.log("Missing state string: '"+missing_strings+"'");
    var time = Date.now() - stime;
    console.log("fixframes trim state strings: " + time.toFixed(0) + "ms");

    var stime = Date.now();
    play_data.parr = new Array();
    for each (var p in play_data.players) {
        play_data.parr.push(p);
    }
    play_data.parr.sort(function(a, b) {
        var asum = 0;
        var bsum = 0;
        if (a.home != null)
            asum -= 100;
        if (b.home != null)
            bsum -= 100;
        return (playerOrder(a.pos) + asum) > (playerOrder(b.pos) + bsum);
    });
    var time = Date.now() - stime;
    console.log("fixframes sort: " + time.toFixed(0) + "ms");

    var stime = Date.now();
    var missing = 0;
    var fixed = [];
    fixed[0] = newframes[0];
    for (var p = 0; p < fixed[0].length; p++) {
        var id = fixed[0][p][0];
        if (id === "ball") {
            ballIdx = p;
            console.log("ballIdx=" + ballIdx);
        }
        for (var cf = 1; cf < newframes.length; cf++) {
            if (fixed[cf] == null)
                fixed[cf] = [];
            var found = false;
            for (var i = 0; i < newframes[cf].length; i++) {
                if (id === newframes[cf][i][0]) {
                    found = true;
                    fixed[cf].push(newframes[cf][i]);
                    break;
                }
            }
            if (!found) {
                fixed[cf].push(fixed[cf - 1][p]);
                missing++;
            }
        }
    }
    play_data.frames = fixed;
    var time = Date.now() - stime;
    console.log("fixframes rearrange(" + missing + " missing players): " + time.toFixed(0) + "ms");

    var stime = Date.now();
    play_data.los = Math.round(play_data.los * 3 + 40 - 6);
    play_data.first_down = Math.round(play_data.first_down * 3 + 40 - 6);
    for (var f = 0; f < play_data.frames.length; f++) {
        for (var p = 0; p < play_data.frames[f].length; p++) {
            if (imageSmoothing === true) {
                play_data.frames[f][p][1] = (play_data.frames[f][p][1] * 3 + 11);// + 20 - 3;
                play_data.frames[f][p][2] = (play_data.frames[f][p][2] * 3 + 40 - 6);
            }
            else {
                play_data.frames[f][p][1] = Math.round(play_data.frames[f][p][1] * 3 + 11);// + 20 - 3;
                play_data.frames[f][p][2] = Math.round(play_data.frames[f][p][2] * 3 + 40 - 6);
            }
        }
    }
    var time = Date.now() - stime;
    console.log("fixframes multiply: " + time.toFixed(0) + "ms");

    var stime = Date.now();
    if (play_data.los > play_data.first_down)
        direction = "up";
    else
        direction = "down";
//    	console.log("fixframes get direction ("+play_data.los+" < "+play_data.first_down+"): "+time.toFixed(0)+"ms");
    var time = Date.now() - stime;
    console.log("fixframes get direction (" + direction + "): " + time.toFixed(0) + "ms");

    var stime = Date.now();
    cam_data = new Array();
    if (play_data.frames !== null) {
        for (var i = 0; i < play_data.frames.length; i++) {
            cam_data[i] = 0;
            cam_data[i] = play_data.frames[i].reduce(function(sum, el) {
                if (!sum[2])
                    return (sum + el[2]);
                else
                    return (sum[2] + el[2]);
            });
            cam_data[i] = cam_data[i] / play_data.frames[i].length;

            var bally = play_data.frames[i][ballIdx][2];
            var diff = Math.abs(bally) - Math.abs(cam_data[i]);
            if (Math.abs(diff) > 150) {
                cam_data[i] = bally - 150 * (diff / Math.abs(diff));
            }
            cam_data[i] = cam_data[i] - 250;
            cam_data[i] = 0 - cam_data[i];
            cam_data[i] = Math.max(cam_data[i], -1160 + 500);
            cam_data[i] = Math.min(cam_data[i], 0);
        }
    }
    var time = Date.now() - stime;
    console.log("cam : " + time.toFixed(0) + "ms");
}

var frameCounter = 0;
var lastTime = 0;
var fps = [];
function measureFps() {
    frameCounter++;
    if (frameCounter > 100) {
        var now = Date.now();
        var delta = now - lastTime;
        fps.push(frameCounter / delta);

        frameCounter = 0;
        lastTime = now;
    }

    if (fps.length === 10) {
        var str = "";
        for each (var s in fps) {
            str += s + ", ";
        }
        console.log(fps);
        console.log(str);
        fps = [];
    }

}

function GM_getInetPage(address, func, target) {
    console.log("GM_getInetPage : " + address);
    GM_xmlhttpRequest({
        method: 'GET',
        url: address,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'application/atom+xml,application/xml,text/xml'
        },
        onload: function(page) {
            console.log("loaded: " + address);
            func(address, page);
        }
    });
}
