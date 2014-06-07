// ==UserScript==
// @name          Heello Ping Extension
// @namespace     http://userstyles.org
// @description	  Split a long text, post all at once.
// @author        kawau
// @match         http://heello.com/*
// @match         https://heello.com/*
// ==/UserScript==


var obj;
var form,txar, pb;
var pcs;

function sendPPPing(pn){
    if (pn < pcs.length){
        obj = new XMLHttpRequest();
        obj.onreadystatechange = function(){readyStateChange(pn)};
        obj.open('POST', "https://heello.com/pings.json", true);
        obj.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        obj.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        obj.send("text="+encodeURIComponent(pcs[pn]));
    }
}

function readyStateChange(jj){
    if(obj.readyState == 4){
        sendPPPing(jj+1);
    }
}


function split140(abc){
    var tbl = [ 0, 1, 1, 1, 2, 3, 2, 3, 4, 3 ];
    var len = sj = 0;
    var bbb = 0;
    var x = y = 0;
    var sts = [];
    for (var i = 0, strlen = abc.length; i < strlen; i++){
        bbb = tbl[encodeURIComponent(abc.charAt(i)).length];
        if (len+bbb > sj+140){
            sts[x] = abc.substring(y,i);
            x += 1;
            y = i;
            sj = len;
        }
        len += bbb;
    }
    sts[x] = abc.substring(y);
    return sts;
}

function clickPPPing(){
    var splitlineFlag = false;//改行で区切らない
    var lines;
    var pstr = txar.value;
    if(pstr){
        if (!splitlineFlag) pstr = pstr.replace(/^\s+/, "").replace(/\s+$/, "").replace(/\s+/g, " ");
        lines = pstr.split("\n");
        for(var i=0, ilen=lines.length; i<ilen; i++){
            if(lines[i]){
                lines[i] = lines[i].replace(/^\s+/, "").replace(/\s+$/, "").replace(/\s+/g, " ");
                pcs = split140(lines[i]);
                sendPPPing(0);
            }
        }
        txar.value = "";
    }
}

function prePPPing(){
    form = document.getElementsByClassName("compose-form compose-mini", "form")[0];
    if(form){
        txar = form.getElementsByTagName("textarea")[0];
        pb = document.createElement("input");
        pb.setAttribute("type", "button");
        pb.className = "grey-button";
        pb.value = "Pings";
        pb.addEventListener("click", clickPPPing, false);
        form.appendChild(pb);
    }
}

prePPPing();
