// ==UserScript==
// @name           Player Paths On Replay
// @namespace      pbr/ppor
// @include        http://*goallineblitz.com/game/replay.pl?game_id=*&pbp_id=*
// @include        http://glb.warriorgeneral.com/game/replay.pl?game_id=*&pbp_id=*
// @copyright      2009, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        14.01.30
// @require        http://userscripts.org/scripts/source/54630.user.js
// ==/UserScript==

/*
 *
 * based on code by Cabrasher
 * pabst did this 08/06/26+
 *
 *
 */

var scriptName = "Player Paths";
var scriptVersion = "14.01.30";
var scriptWebpage = "http://userscripts.org/scripts/show/54519";

var tracedPlayers = new Array();
var step = 2;

window.setTimeout( function() {
    init();
}, 100);

function activate(e) {
    console.log("activate player tracing");
    lock();

    tracemain();

    unlock();
}

function tracemain() {
    var icons = document.getElementsByClassName("o_icon");
    for (var i=0; i<icons.length; i++) {
        icons[i].firstChild.removeAttribute("onclick");
        icons[i].firstChild.removeAttribute("onmouseover");
        icons[i].firstChild.removeAttribute("onmouseout");
    }
    icons = document.getElementsByClassName("d_icon");
    for (var i=0; i<icons.length; i++) {
        icons[i].firstChild.removeAttribute("onclick");
        icons[i].firstChild.removeAttribute("onmouseover");
        icons[i].firstChild.removeAttribute("onmouseout");
    }

    var paths = document.getElementsByClassName("player_path");
    while (paths.length > 0) {
        paths[0].parentNode.removeChild(paths[0]);
        paths = document.getElementsByClassName("player_path");
    }
    var o = document.getElementsByClassName("o_icon");
    for (var i=0; i<o.length; i++) {
        o[i].addEventListener("click",function (e) { playerClicked(e); }, false);
    }
    var o = document.getElementsByClassName("d_icon");
    for (var i=0; i<o.length; i++) {
        o[i].addEventListener("click",function (e) { playerClicked(e); }, false);
    }

    for (var i=0; i<tracedPlayers.length; i++) {
        //console.log(i+" : "+tracedPlayers[i]);
        var target = document.getElementById("pos_dot_"+tracedPlayers[i]);
        if (target != null) {
            var btn = new Object();
            btn.target = target.firstChild;
            playerClicked(btn);
        }
    }
}

function traceClear(div) {
    var inputs = [];
    while ((inputs = div.getElementsByTagName("input")).length > 0) {
        var box = inputs[0];
        box.parentNode.removeChild(box);
    }
}

function playerClicked(elemInput) {
    //console.log(elemInput.target+" : "+elemInput.target.parentNode.id);
    var id = elemInput.target.parentNode.id.split("_")[2];
    if (document.getElementById("line_"+id) != null) {
        var d = document.getElementById("line_"+id);
        d.parentNode.removeChild(d);
        for (var i=0; i<tracedPlayers.length; i++) {
            if (tracedPlayers[i] == id) {
                tracedPlayers.splice(i,1);
                break;
            }
        }
        return;
    }

    if (tracedPlayers.indexOf(id) == -1) {
        tracedPlayers.push(id);
    }

    var play_data = unsafeWindow.play_data;
    var arrColors = new Array('black', 'blue', 'red', 'yellow', 'purple', 'orange',' aqua', 'bisque', 'darkgray', 'lightskyblue', 'magenta', 'greenyellow', 'mintcream', 'salmon', 'tan', 'turquoise', 'silver', 'slateblue', 'plum', 'orangered', 'hotpink', 'goldenrod', 'white');
    for (var pl=0; pl<play_data[0].length; pl++) {

        if (play_data[0][pl].id == id) {
            var maxX = -1;
            var minX = 2000;
            var maxY = -1;
            var minY = 2000;

            var color = arrColors[pl%arrColors.length];
            var link = elemInput.target.parentNode.parentNode.parentNode.childNodes[2];
            if (link.style.color != "") {
                color = link.style.color;
            }
            var p = pl;
            var idx = pl;
            var divArray = new Array();
            for (var cf=0; cf<play_data.length-3; cf++) {
                try {
                    if (play_data[0][pl].id != play_data[cf+1][idx].id) {
                        for (var i=0; i<play_data[cf+1].length; i++) {
                            if (play_data[0][pl].id == play_data[cf+1][i].id) {
                                idx = i;
                                break;
                            }
                        }
                    }
                    var x1 = (play_data[cf][p].x)*3+20;
                    var y1 = (play_data[cf][p].y)*3+40;
                    var x2 = (play_data[cf+1][idx].x)*3+20;
                    var y2 = (play_data[cf+1][idx].y)*3+40;

                    minX = Math.min(minX,x1);
                    minX = Math.min(minX,x2);
                    maxX = Math.max(maxX,x1);
                    maxX = Math.max(maxX,x2);
                    minY = Math.min(minY,y1);
                    minY = Math.min(minY,y2);
                    maxY = Math.max(maxY,y1);
                    maxY = Math.max(maxY,y2);

                    if ((cf % step) == 0) {
                        divArray.push(makeDiv(x1, y1, 2, 2, color));
                    }
                    p = idx;
                }
                catch (e) {
                    console.log(e);
                }
            }

            if (divArray.length > 0) {
                var mainDiv = document.createElement('div');
                mainDiv.className = "player_path";
                mainDiv.id = 'line_' + id;
                mainDiv.style.left = Math.round(minX)+"px";
                mainDiv.style.top = Math.round(minY)+"px";
                mainDiv.style.width = Math.round((maxX-minX)+1)+"px";
                mainDiv.style.height = Math.round((maxY-minY)+1)+"px";
                mainDiv.style.zIndex = 500;

                for (var d=0; d<divArray.length; d++) {
                    mainDiv.appendChild(divArray[d]);
                }
                document.getElementById('replay_area').appendChild(mainDiv);
            }
        }
    }
}

function findPlayerToTrace(cf, id) {
    for (var pl=0; pl<play_data[cf].length; pl++) {
        if (play_data[cf][pl].id == id) {
            return pl;
        }
    }
    console.log("replayRewrite.trace : I shouldn't happen.");
    return -1;
}

function makeDiv(x, y, w, h, backColor) {
    var newDiv = document.createElement('div');
    newDiv.style.left = x + 'px';
    newDiv.style.top = y + 'px';
    newDiv.style.width = w + 'px';
    newDiv.style.height = h + 'px';
    newDiv.style.zIndex = 500;
    newDiv.style.backgroundColor= backColor;
    newDiv.className='player_icon';
    newDiv.id='ds';
    return newDiv;
}
