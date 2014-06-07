// ==UserScript==
// @name           rrtrace
// @namespace      pbr
// @description    you don't need this
// @include        http://goallineblitz.com/game/replay.pl*
// @version        09.03.19
// ==/UserScript==

var tracedPlayers = new Array();
var step = 2;

function tracemain() {
    var inputs = document.getElementsByTagName("input");
    for (var i=0; i<inputs.length; i++) {
        if (inputs[i].id.indexOf("trace_") == 0) {
            if (inputs[i].checked == true) {
                boxChecked(inputs[i]);
            }
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

function addInputs() {
    var arrPlayers = document.getElementsByClassName('player_name');
    for (var i=0; i<arrPlayers.length; i++) {
        var playerDiv = arrPlayers[i];
        var playerA = playerDiv.getElementsByTagName('a')[0];
        var playerID = playerA.href;
        playerID = playerID.split('player_id=')[1];
		
        var chkTrace = document.createElement('input');
        chkTrace.type='checkbox';
        chkTrace.id='trace_' + playerID;
        chkTrace.name= playerID;
        if (tracedPlayers.indexOf(playerID) != -1) {
            chkTrace.checked = true;
        }
        chkTrace.addEventListener('click', function() {
            boxChecked(this);
        }, false);
        
        playerDiv.insertBefore(chkTrace, playerA);
    }
}

function boxChecked(elemInput) {
//    console.log(tracedPlayers+" -- "+elemInput.name+" : "+elemInput.checked);
    if (elemInput.checked == true) {
        if (tracedPlayers.indexOf(elemInput.name) == -1) {
            tracedPlayers.push(elemInput.name);
        }

        var arrColors = new Array('black', 'blue', 'red', 'yellow', 'purple', 'orange',' aqua', 'bisque', 'darkgray', 'lightskyblue', 'magenta', 'greenyellow', 'mintcream', 'salmon', 'tan', 'turquoise', 'silver', 'slateblue', 'plum', 'orangered', 'hotpink', 'goldenrod', 'white');
        for (var pl=0; pl<play_data[0].length; pl++) {
            if (play_data[0][pl].id == elemInput.name) {
                if (document.getElementById("line_"+elemInput.name) != null) {
                    var d = document.getElementById("line_"+elemInput.name);
                    d.parentNode.removeChild(d);
                }
                var maxX = -1;
                var minX = 2000;
                var maxY = -1;
                var minY = 2000;

                var color = arrColors[pl%arrColors.length];
                var p = pl;
                var idx = pl;
                var divArray = new Array();
                for (var cf=0; cf<play_data.length-3; cf++) {
                    try {
                        if (play_data[0][pl].id != play_data[cf+1][idx].id) {
                            idx = findPlayerToTrace(cf+1, play_data[0][pl].id);
                            if (idx == -1) {
                                //wtf?
                                continue;
                            }
                        }
                        var x1 = play_data[cf][p].x*3;
                        var y1 = play_data[cf][p].y*3;
                        var x2 = play_data[cf+1][idx].x*3;
                        var y2 = play_data[cf+1][idx].y*3;

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
                    mainDiv.id = 'line_' + elemInput.name;
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
    else {
        var idx = tracedPlayers.indexOf(elemInput.name);
        if (idx != -1) {
            var tp = tracedPlayers.slice(0,idx);
            tracedPlayers = tp.concat(tracedPlayers.slice(idx+1));
        }

        var delDiv = document.getElementById('line_' + elemInput.name);
        delDiv.parentNode.removeChild(delDiv);
    }
//    console.log(tracedPlayers);
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

