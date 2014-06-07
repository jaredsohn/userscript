// ==UserScript==
// @name           Custom Play Sort
// @namespace      pbr
// @include        http://goallineblitz.com/game/team_create_defense.pl?team_id=*
// @include        http://goallineblitz.com/game/team_create_defense.pl?team_id=*&play_id=*
// @include        http://goallineblitz.com/game/team_defense_ai.pl?team_id=*
// @version        09.04.28
// @copyright      2009, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// ==/UserScript==

var data = "";
var form = "";

var defaultTabs = "All\t3-4\t3-3 Nickel\t3-2 Dime\t4-3\t4-2 Nickel\t4-1 Dime\tQuarter\t";
var tabs = null;
var plays = new Array();
var formstr = null;

var farr = new Array();

window.setTimeout(
    function() {
        //GM_deleteValue("dpcsort_tabs");
        for (var i=0; i<10; i++) {
            //GM_deleteValue("dpcsort_tabs_"+i);
        }
        tabs = GM_getValue("dpcsort_tabs",defaultTabs);
        GM_setValue("dpcsort_tabs",tabs);

        formstr = tabs.split("\t");

        for (var i=0; i<formstr.length; i++) {
            var string = GM_getValue("dpcsort_tabs_"+i,null);
            console.log(formstr[i]+") "+string);
            
            farr[i] = new Array();
            if (string != null) {
                string = string.split("\t");
                for (var j=0; j<string.length; j++) {
                    if (string[j].length > 0) {
                        farr[i].push(string[j]);
                    }
                }
            }

        }
        for (var i=0; i<farr.length; i++) {
            console.log("farr["+i+"].length = ("+formstr[i]+") "+farr[i].length);
        }

        if (window.location.toString().indexOf("team_defense_ai.pl") != -1) {
            defense_ai_main();
        }
        else if ((window.location.toString().indexOf("play_id") == -1) ||
            (window.location.toString().indexOf("play_id=0") != -1)) {
            play_sort_main();
        }
        else {
            play_create_main();
        }
    }
, 100);

function defense_ai_main() {
    var list = document.getElementById("custom_plays");
    list.style.display = "none";

    var p = document.getElementsByClassName("custom_play");
    for (var i=0; i<p.length-1; i++) {
        var left = p[i];
        for (var j=i+1; j<p.length-1; j++) {
            var right = p[j];
            if (left.textContent.toLowerCase() > right.textContent.toLowerCase()) {
                temp = p[i].innerHTML;
                p[i].innerHTML = p[j].innerHTML;
                p[j].innerHTML = temp;
            }
        }
    }
    //console.log(list.innerHTML);

    var span = document.createElement("span");
    for (var i=0; i<formstr.length; i++) {
        if (formstr[i].length == 0) continue;
        
        var div = document.createElement("div");
        div.setAttribute("class","defense_play_tab");
        div.addEventListener("click", ai_tab_pressed, false);

        var a = document.createElement("a");
        a.innerHTML = formstr[i];
        div.appendChild(a);

        span.insertBefore(div, span.childNodes[i]);
    }

    list.insertBefore(span, list.firstChild);
    list.style.display = "";
}
function ai_tab_pressed() {
    var t = document.getElementById("custom_plays");
    t.style.visibility = "hidden";

    //console.log(this.firstChild.innerHTML);
    var idx = formstr.indexOf(this.firstChild.innerHTML);
    //console.log(idx);
    //console.log(GM_getValue("dpcsort_tabs_"+idx,"nothing"));

    var valid = GM_getValue("dpcsort_tabs_"+idx,"").split("\t");
    var p = document.getElementsByClassName("custom_play");
    for (var i=0; i<p.length; i++) {
        p[i].style.visibility = "visible";
        p[i].style.display = "";
        var id = p[i].innerHTML.indexOf("thumbnail=")+"thumbnail=".length;
        id = parseInt(p[i].innerHTML.slice(id));
        if (valid.indexOf(id.toString()) == -1) {
            p[i].style.visibility = "hidden";
            p[i].style.display = "none";
        }
        //console.log(id+" -- "+valid.indexOf(id)+" : "+valid);
    }

    t.style.visibility = "visible";
}

function play_create_main() {
    span = document.createElement("span");
    var sel = document.createElement("select");
    sel.setAttribute("id","tab_selection");

    for (var i=0; i<formstr.length; i++) {
        if (formstr[i].length == 0) continue;

        var o = document.createElement("option");
        if (formstr[i] != "All") {
            o.text = formstr[i];
        }
        else {
            o.text = "-select-";
        }
        sel.add(o,null);
    }
    span.appendChild(sel);

	var add = document.createElement("input");
	add.setAttribute("type","button");
	add.setAttribute("value","Add To Tab");
	add.setAttribute("id","add_tab_to_play_button");
	add.setAttribute("style","margin-left: 10px; margin-right: 10px");
	add.addEventListener("click",addPlayToTab,false);
	span.appendChild(add);

    var del = document.createElement("input");
	del.setAttribute("type","button");
	del.setAttribute("value","Remove From Tab");
	del.setAttribute("id","rem_play_from_tab_button");
	del.setAttribute("style","margin-left: 10px; margin-right: 10px");
	del.addEventListener("click",removePlayFromTab,false);
	span.appendChild(del);

    footer = document.getElementById("footer");
    footer.parentNode.insertBefore(span, footer);
}

function play_sort_main() {
    console.log("play sort main");
    var div = document.getElementsByClassName("tactic_container")[0];
    var table = div.getElementsByTagName("table")[0];
    table.style.display = "none";
    table.style.visibility = "hidden";

    plays = initial_page_load();
    sort_plays();
    get_formations();
    insert_bar();
    insert_controls();
    setTimeout(formationCheck, 500);

    table.style.display = "";
    table.style.visibility = "";
}

function get_formations() {
    for (var j=0; j<farr.length; j++) {
        for (var k=0; k<farr[j].length; k++) {
            for (var i=0; i<plays.length; i++) {
                if (plays[i].id == farr[j][k]) {
                    //console.log(plays[i].id+" - "+farr[j][k]);
                    plays[i].formation = formstr[j];
                    var el = document.getElementById("play_"+plays[i].id);
                    var cls = "All "+plays[i].formation+" "+el.getAttribute("class");
                    cls = cls.replace("missing","");
                    el.setAttribute("class",cls);
                }
            }
        }
    }

    for (var i=0; i<plays.length; i++) {
        if (plays[i].formation == null) {
            var addr = plays[i].link.cells[0].childNodes[2].href;
            //console.log(plays[i].name+" not found --> XXX : "+addr);
            getInetPage(addr, loadPlay, i);
        }
    }
}

function formationCheck() {
    var el = document.getElementsByClassName("missing");
    if (el.length > 0) {
        //console.log("waiting");
        setTimeout(formationCheck, 500);
    }
    else {
        console.log("all plays found");
        for (var i=0; i<farr.length; i++) {
            var str = "\t"+farr[i].toString().replace(/,/g,"\t")+"\t";
            GM_setValue("dpcsort_tabs_"+i,str);
            console.log("farr["+i+"] --> "+str);
        }

        var event = document.createEvent('MouseEvents');
        event.initEvent('click',true,true)

        var tab = document.getElementsByClassName("formation_tab");
        tab[0].dispatchEvent(event);
    }
}

function insert_controls() {
    var span = document.createElement("span");

	var blank = document.createElement("input");
	blank.setAttribute("type","text");
	blank.setAttribute("id","tab_input_button");
	blank.setAttribute("value","");
	blank.setAttribute("size","16");
	blank.setAttribute("style","margin-left: 10px; margin-right: 10px");
	span.appendChild(blank);

	var add = document.createElement("input");
	add.setAttribute("type","button");
	add.setAttribute("value","Create Tab");
	add.setAttribute("id","tab_create_button");
	add.setAttribute("style","margin-left: 10px; margin-right: 10px");
	add.addEventListener("click",createTab,false);
	span.appendChild(add);

    var footer = document.getElementById("footer");
    footer.parentNode.insertBefore(span, footer);

    span = document.createElement("span");
    var sel = document.createElement("select");
    sel.setAttribute("id","tab_selection");

    for (var i=0; i<formstr.length; i++) {
        if (formstr[i].length == 0) continue;
        
        var o = document.createElement("option");
        if (formstr[i] != "All") {
            o.text = formstr[i];
        }
        else {
            o.text = "-select-";
        }
        sel.add(o,null);
    }
    span.appendChild(sel);
    
	var del = document.createElement("input");
	del.setAttribute("type","button");
	del.setAttribute("value","Delete Tab");
	del.setAttribute("id","tab_delete_button");
	del.setAttribute("style","margin-left: 10px; margin-right: 10px");
	del.addEventListener("click",deleteTab,false);
	span.appendChild(del);

    footer = document.getElementById("footer");
    footer.parentNode.insertBefore(span, footer);

    var div = document.createElement("div");
    var inp = document.createElement("input");
    inp.setAttribute("type","button");
	inp.setAttribute("value","Reset Tabs");
    inp.setAttribute("id","reset_button");
	inp.setAttribute("style","margin-left: 10px; margin-right: 10px");
	inp.addEventListener("click",resetTabs,false);
    div.appendChild(inp);

    var count = document.createElement("input");
    count.setAttribute("type","button");
	count.setAttribute("value","Show Output Count");
    count.setAttribute("id","output_button");
	count.setAttribute("style","margin-left: 10px; margin-right: 10px");
	count.addEventListener("click",countOutputs,false);
    div.appendChild(count);
    
    footer = document.getElementById("footer");
    footer.parentNode.insertBefore(div, footer);
}

function countOutputs() {
    this.removeEventListener("click", countOutputs, false);
    var address = "http://goallineblitz.com/game/team_defense_ai.pl?team_id=";
    var id = window.location.toString().indexOf("team_id=")+"team_id=".length;
    id = parseInt(window.location.toString().slice(id)).toString();
    address += id;

    var table = document.getElementsByClassName("tactic_container")[0];
    table.style.visibility = "hidden";

	var req = new XMLHttpRequest();
	req.open( 'GET', address, true );
	req.onload = function() {
		if (this.status != 200) {
			alert("pbr gm script: Error "+this.status+" loading "+address);
		}
		else {
			console.log("loaded: "+address)
            var div = document.createElement("div");
            div.style.visibility = "hidden";
            var res = this.responseText;
            res = res.slice(res.indexOf("<body>")+6, res.indexOf("</body>"));
            div.innerHTML = res;
            var footer = document.getElementById("footer");
            footer.appendChild(div);

            var outputs = div.getElementsByClassName("output_option");
            for (var i=0; i<outputs.length; i++) {
                var span = outputs[i].getElementsByTagName("span");
                if (span.length > 0) {
                    var name = span[0].textContent;
                    if (name != "none") {
                        var p = document.getElementsByClassName("All");
                        for (var j=0; j<p.length; j++) {
                            var rowname = p[j].getElementsByTagName("a")[0].textContent;
                            if (rowname == name) {
                                var pspan = p[j].getElementsByTagName("span");
                                if (pspan.length == 0) {
                                    var spn = document.createElement("span");
                                    spn.innerHTML = "0";
                                    p[j].appendChild(spn);
                                }
                                pspan = p[j].getElementsByTagName("span")[0];
                                pspan.textContent = parseInt(pspan.textContent)+1;
                            }
                        }
                    }
                }
            }

            footer.removeChild(div);
            var table = document.getElementsByClassName("tactic_container")[0];
            table.style.visibility = "visible";
		}
	};

	req.send(null);
	return req;
}

function resetTabs() {
    var ret = confirm("This is not reversible.  Really reset all tabs?");
    if (ret == true) {
        GM_deleteValue("dpcsort_tabs");
        
        var i=0;
        while (true) {
            var v = GM_getValue("dpcsort_tabs_"+i, null);
            if (v != null) {
                GM_deleteValue("dpcsort_tabs_"+i);
                i++;
            }
            else {
                break;
            }
        }

        window.location.reload();
    }
}

function createTab() {
    var name = this.previousSibling.value;
    if (name.length > 0) {
        console.log("create this tab: "+name);
        var str = GM_getValue("dpcsort_tabs");
        str += name + "\t";
        GM_setValue("dpcsort_tabs",str);
        window.location.reload();
    }
}

function deleteTab() {
    var name = this.previousSibling.value;
    if (name.length > 0) {
        console.log("delete this tab: "+name);
        var idx = formstr.indexOf(name);
        if (idx != -1) {
            var str = GM_getValue("dpcsort_tabs");
            str = str.replace("\t"+name+"\t", "\t");
            GM_setValue("dpcsort_tabs", str);

            for (var i=idx; i<farr.length-1; i++) {
                GM_setValue("dpcsort_tabs_"+i, GM_getValue("dpcsort_tabs_"+(i+1), ""));
            }
            GM_deleteValue("dpcsort_tabs_"+(farr.length-1));
            window.location.reload();
        }
    }
}

function addPlayToTab() {
    var name = this.previousSibling.value;
    if (name.length > 0) {
        var id = window.location.toString();
        id = id.slice(id.indexOf("play_id=")+"play_id=".length);
        console.log("adding current play ("+id+") to this: "+name);

        var idx = formstr.indexOf(name);
        if (idx != -1) {
            var str = GM_getValue("dpcsort_tabs_"+idx);
            if (str.indexOf("\t"+id+"\t") == -1) {
                str += id+"\t";
                GM_setValue("dpcsort_tabs_"+idx, str);
                window.location.reload();
            }
        }
    }
}
function removePlayFromTab() {
    var name = this.previousSibling.previousSibling.value;
    if (name.length > 0) {
        var id = window.location.toString();
        id = id.slice(id.indexOf("play_id=")+"play_id=".length);
        console.log("removing current play ("+id+") from this: '"+name+"'");

        var idx = formstr.indexOf(name);
        if (idx != -1) {
            var str = GM_getValue("dpcsort_tabs_"+idx);
            if (str.indexOf("\t"+id+"\t") != -1) {
                str = str.replace("\t"+id+"\t","\t");
                GM_setValue("dpcsort_tabs_"+idx, str);
                window.location.reload();
            }
        }
    }
}

function insert_bar() {
    var cnt = document.getElementsByClassName("tactic_container")[0];
    var table = cnt.getElementsByTagName("table")[0];

    var bar = document.createElement("div");
    bar.setAttribute("class","tabs");

    for (var i=0; i<formstr.length; i++) {
        if (formstr[i].length == 0) continue;
        
        var div = document.createElement("div");
        div.setAttribute("class","subtab_off formation_tab");
        div.addEventListener("click",tabPressed, false);

        var a = document.createElement("a");
        a.innerHTML = formstr[i];
        div.appendChild(a);

        bar.appendChild(div);
    }
    table.parentNode.insertBefore(bar, table);

}

function tabPressed() {
    var classes = this.firstChild.innerHTML.split(" ");
    
    var div = document.getElementsByClassName("tactic_container")[0];
    var table = div.getElementsByTagName("table")[0];
    var rows = table.rows;
    for (var i=1; i<rows.length; i++) {
        var c = rows[i].getAttribute("class");
        
        var match = true;
        for (var j=0; j<classes.length; j++) {
            if (c.indexOf(classes[j]) == -1) {
                match = false;
                break;
            }
        }
        if (match == false) {
            rows[i].style.display = "none";
        }
        else {
            rows[i].style.display = "";
        }
    }

    var buttons = document.getElementsByClassName("subtab_on");
    if (buttons[1] != null) {
        var c = buttons[1].getAttribute("class");
        c = c.replace("subtab_on","subtab_off");
        buttons[1].setAttribute("class",c);
    }

    var c = this.getAttribute("class");
    c = c.replace("subtab_off","subtab_on");
    this.setAttribute("class",c);

    reset_row_colors();
}

function sort_plays() {
    plays.sort(indexSort);
    
    var div = document.getElementsByClassName("tactic_container")[0];
    var table = div.getElementsByTagName("table")[0];

    console.log(plays.length);
    for (var i=0; i<plays.length; i++) {
        var src = document.getElementById("play_"+plays[i].id);
        if (src != null) {
            if (src.rowIndex != i+1) {
                //console.log("swapping i="+i+" -- rowIndex="+src.rowIndex+" .. to "+(i+1));
                swapRow(table, src.rowIndex, i+1);
            }
        }
    }
}

function indexSort(a, b) {
    return a.name.toLowerCase() > b.name.toLowerCase();
}

function swapRow(table, s, d) {
    var src = table.rows[s];
    var dest = table.rows[d];

    var tempid = src.id;
    var temp0 = src.cells[0].innerHTML;
    var temp1 = src.cells[1].innerHTML;
    src.cells[0].innerHTML = dest.cells[0].innerHTML;
    src.cells[1].innerHTML = dest.cells[1].innerHTML;
    src.id = dest.id;
    dest.cells[0].innerHTML = temp0;
    dest.cells[1].innerHTML = temp1;
    dest.id = tempid;
}

function initial_page_load() {
    var output = new Array();
    var div = document.getElementsByClassName("tactic_container")[0];
    var table = div.getElementsByTagName("table")[0];

    for (var i=1; i<table.rows.length; i++) {
        var row = table.rows[i];
        var a = row.cells[0].getElementsByTagName("a")[0];
        
        var p = new Play();
        p.id = a.href.toString().split("play_id=")[1];
        p.name = a.innerHTML;
        p.link = row;

        row.setAttribute("id","play_"+p.id);
        row.setAttribute("class", " missing "+row.getAttribute("class"));
        //console.log(p.toString());
        output.push(p);
    }
    console.log("initial plays found = "+output.length);
    return output;
}

function reset_row_colors() {
    var div = document.getElementsByClassName("tactic_container")[0];
    var table = div.getElementsByTagName("table")[0];

    table.style.display = "none";
    var x = 0;
    for (var i=1; i<table.rows.length; i++) {
        var rows = table.rows[i];
        if (rows.style.display != "none") {
            var c = "alternating_color"+((x%2)+1);
            rows.className = rows.className.replace("alternating_color1",c);
            rows.className = rows.className.replace("alternating_color2",c);
            x++;
            //console.log(".");
        }
    }
    table.style.display = "";
}


function loadPlay(addr, page) {
    var fixstr = ["All","3-4","Nickel 3","Dime 3","4-3","Nickel","Dime","Quarter"];
    var id = parseInt(addr.slice(addr.indexOf("play_id=")+"play_id=".length));
    var idx = -1;
    for (var i=0; i<plays.length; i++) {
        if (plays[i].id == id) {
            idx = i;
            break;
        }
    }
    if (idx == -1) {
        console.log("custom play sort: I shouldn't happen : "+id+" : "+idx+" : "+addr);
    }

    try {
        var f = page.responseText.split('SELECTED>')[1];
        f = f.slice(0,f.indexOf('<'));
        for (var i=0; i<fixstr.length; i++) {
            if (f.slice(0,fixstr[i].length) == fixstr[i]) {
                plays[idx].formation = formstr[i];
                break;
            }
        }
//        console.log("f="+f+" -- "+plays[idx].toString());
    }
    catch (e) {
        plays[idx].formation = "4-3";
    }
    var el = document.getElementById("play_"+plays[idx].id);
    if (el != null) {
        var cls = "All "+plays[idx].formation+" "+el.getAttribute("class");
        cls = cls.replace("missing","");
        el.setAttribute("class",cls);

        var fidx = formstr.indexOf(plays[idx].formation);
        if (farr[fidx].indexOf(plays[idx].id) == -1) {
            farr[fidx].push(plays[idx].id);
//            console.log("farr["+fidx+"] : "+farr[fidx]);
        }
        if (farr[0].indexOf(plays[idx].id) == -1) {
            farr[0].push(plays[idx].id);
//            console.log("farr["+fidx+"] : "+farr[fidx]);
        }
    }
}

function Play() {
    this.id;
    this.name;
    this.link;
    this.index;
    this.formation;

    this.toString = function() {
        return this.index+") "+this.id+" - "+this.name+" : "+this.formation;
    }
}


function getInetPage(address, func) {
	//console.log("getInetPage -- '"+address+"'  -- "+(func+"").slice(0,(func+"").indexOf("{")));
	var req = new XMLHttpRequest();
	req.open( 'GET', address, true );
	req.onload = function() {
		if (this.status != 200) {
			alert("pbr gm script: Error "+this.status+" loading "+address);
		}
		else {
			//console.log("loaded: "+address)
			func(address,this);
		}
	};

	req.send(null);
	return req;
}
