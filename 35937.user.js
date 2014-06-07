// ==UserScript==
// @name           GLB Training Fix
// @namespace      pbr_tf
// @include        http://goallineblitz.com/game/training.pl?player_id=*
// @version        08.10.23
// ==/UserScript==

/*
 *
 * pabst did this 10/23/08+
 *
 */

window.setTimeout(
    function() {
        training_main();
    }
, 200);

var att = ["strength","speed","agility","jumping","stamina",
            "vision","confidence","blocking","tackling","throwing",
            "catching","carrying","kicking","punting"];
var att2 = [
            [3,7,8,9,11,12,13], //str
            [2,4,8],            //spd    
            [1,4,5,7,8,9],      //agi
            [0,4,5,8,10],       //jmp
            [1,2,3,6],          //sta
            [2,3,6,9,10,12,13], //vis
            [4,5,11],           //con
            [0,2],              //blk
            [0,1,2,3],          //tac
            [0,2,5],            //thr
            [3,5,11],           //cat
            [0,6,10],           //car
            [0,5],              //kck
            [0,5],              //pun
           ];

function training_main() {
    var d = document.getElementById("training_intense");
    var p = d.parentNode;
    var s1 = document.createElement("select");
    s1.setAttribute("id","firstselection");

    for (var i=0; i<att.length; i++) {
        var o = document.createElement("option");
        o.text = att[i];
        s1.add(o,null);
    }
    var div = document.createElement("div");
    div.innerHTML = "&nbsp;";
    p.appendChild(div);
    var div = document.createElement("div");
    div.setAttribute("style","text-align: center;");
    div.innerHTML = " - OR - ";
    p.appendChild(div);
    var div = document.createElement("div");
    div.innerHTML = "&nbsp;";
    p.appendChild(div);

    var div = document.createElement("div");
    var txt = document.createElement("b");
    txt.innerHTML = "Primary Attribute: ";
    div.appendChild(txt);
    txt.appendChild(s1);
    p.appendChild(div);

    var s2 = document.createElement("select");
    s2.setAttribute("id","secondselection");
    var div = document.createElement("div");
    var txt = document.createElement("b");
    txt.setAttribute("class","training_selection");
    txt.innerHTML = "Secondary Attribute: ";
    div.appendChild(txt);
    txt.appendChild(s2);
    p.appendChild(div);

    resetSelections();
    s1.addEventListener("change", function() { showSecondSelection(); }, true);
    s2.addEventListener("change", function() { setIntenseSelection(); }, true);

    var t = document.getElementById("training_type");
    t.addEventListener("change", function() { enableSelections(this); }, true);
    enableSelections(t);
    
    d.addEventListener("change", function() { resetSelections(); }, true);
}

function resetSelections(d) {
    var d = document.getElementById("training_intense");
    var s1 = document.getElementById("firstselection");
    var s2 = document.getElementById("secondselection");

    var strings = d.options[d.selectedIndex].text;
    strings = strings.split("+");
    strings[1] = strings[1].slice(0,strings[1].indexOf(","));
    strings[2] = strings[2].slice(0,strings[2].indexOf(")"));
    //console.log("resetting to "+strings[1]+" -- "+strings[2]);
    setSelect(s1, strings[1]);
    showSecondSelection();
    setSelect(s2, strings[2]);
    setIntenseSelection();
}

function setSelect(sel, txt) {
    //console.log("txt = "+txt);
    for (var i=0; i<sel.length; i++) {
        if (sel.options[i].text.indexOf(txt) != -1) {
            //console.log(sel.options[i].text+" -- "+txt);
            sel.selectedIndex = i;
            break;
        }
    }
}

function enableSelections(t) {
    var bool = true;
    if (t.value.indexOf("intense") != -1) {
        bool = false;
    }

    var f = document.getElementById("firstselection");
    var s = document.getElementById("secondselection");
    if (bool == true) {
        f.disabled = true;
        s.disabled = true;
    }
    else {
        f.disabled = false;
        s.disabled = false;
    }
}

function setIntenseSelection() {
    var f = document.getElementById("firstselection");
    var s = document.getElementById("secondselection");
    var d = document.getElementById("training_intense");
    for (var i=0; i<d.length; i++) {
        var o = d.options[i];
        if (o.text.indexOf("+"+f.value) != -1) {
            if (o.text.indexOf("+"+s.value) != -1) {
                d.selectedIndex = i;
                break;
            }
        }
    }
}

function showSecondSelection() {
    var f = document.getElementById("firstselection");
    var s = document.getElementById("secondselection");
    while (s.length > 0) {
        s.remove(0);
    }
    
    var t = f.options[f.selectedIndex].text;
    var idx = att.indexOf(t);
    for (var i=0; i<att2[idx].length; i++) {
        var o = document.createElement("option");
        o.text = att[att2[idx][i]];
        s.add(o,null);
    }
    setIntenseSelection();
}

