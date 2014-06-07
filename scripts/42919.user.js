// ==UserScript==
// @name           Show Fallen Players In GLB Replay
// @namespace      pbr
// @description    Shows players who've fallen on replay page player lists.
// @version        09.02.22
// ==/UserScript==

/*
 *
 * pabst did this 9/22/09+
 *
 */

window.setTimeout(
    function() {
        var rr = false;
        try {
            if (replayRewrite) {
                rr = true;
            }
        }
        catch (e) {
//          console.log(e);
            rr = false;
        }

        if (rr == false) {
            fall_main(unsafeWindow.play_data);
            createFallOutput(unsafeWindow.play_data);
        }
    }
, 100);

var namelist = null;
var downList = null;
var fakeList = null;

function fall_main(arr) {
    namelist = new Array();
    downList = new Array(); downList[0] = new Array();
    fakeList = new Array(); fakeList[0] = new Array();

    var fall=0;
    var juke=0;
    if (arr == null) return;

    var lastFrame = arr[0];
    if (lastFrame == null) return;

	for (var cf=1; cf<arr.length; cf++) {
        downList[cf] = new Array();
        fakeList[cf] = new Array();
        var thisFrame = arr[cf];
        for (var p=0; p<lastFrame.length; p++) {
            var lastPosition = lastFrame[p];
            var idx = findIndex(lastPosition.id, thisFrame);
            var thisPosition = thisFrame[idx];
            if (thisPosition == null) continue;

            if (thisPosition.p != lastPosition.p) {
                if (thisPosition.p != null) {
                    if (thisPosition.p == 1) {
                        fall++;
                        downList[cf].push(thisPosition.id+"");
                    }
                    else if (thisPosition.p == 2) {
                        juke++;
                        fakeList[cf].push(thisPosition.id+"");
                    }
                    else {
                        console.log("wtf : "+thisPosition.p);
                    }
                }
            }
        }
        lastFrame = thisFrame;
    }
    console.log(fall+" downList; "+juke+" fakeList");

    var names = document.getElementsByClassName("player_name");
    for (var l=0; l<names.length; l++) {
        var h = names[l].firstChild.href;
        var id = h.substring(h.indexOf("=")+1);
        namelist[id] = names[l].childNodes[1];
        namelist[id].textContent += " ";
    }
}

function resetFalls() {
    var names = document.getElementsByClassName("player_name");
    for (var l=0; l<names.length; l++) {
        var child = names[l].childNodes[1];
        if (l == 0) {
            //console.log("0 -- "+child.textContent.split(" ")[0]);
            //console.log("1 -- "+child.textContent.split(" ")[1]);
        }
        child.textContent = " "+child.textContent.split(" ")[1]+" ";
    }
}

function createFallOutput(arr) {
    for (var cf=0; cf<arr.length; cf++) {
        fallOutput(cf);
    }
}

function fallOutput(cf) {
    try {
        if (fakeList[cf] == null) {
            console.log("f=null : "+cf);
            console.log(fakeList[cf].length+" -- "+downList[cf].length);
        }
        for (var j=0; j<fakeList[cf].length; j++) {
            var child = namelist[fakeList[cf][f]];
            child.textContent += "F";
        }
    }
    catch (e) {
        //console.log(e);
    }

    try {
        if (downList[cf] == null) {
            console.log("d=null : "+cf);
            console.log(fakeList[cf].length+" -- "+downList[cf].length);
        }
        for (var f=0; f<downList[cf].length; f++) {
            var child = namelist[downList[cf][f]];
            child.textContent += "d";
        }
    }
    catch (e) {
        //console.log(e);
    }
}

function findIndex(player, arr) {
    var output = -1;
    for (var i=0; i<arr.length; i++) {
        if (player == arr[i].id) {
            output = i;
            break;
        }
    }
    if (output == -1) {
        console.log("this is -1 : "+player+" -- "+arr.length);
    }
    return output;
}

