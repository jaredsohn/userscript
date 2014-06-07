// ==UserScript==
// @name           FW Auto Attacker Configurator
// @namespace      FWAA
// @include        http://afsrv.freewar.de/freewar/internal/*/item.php*
// @include        http://afsrv.freewar.de/freewar/internal/*/item.php
// ==/UserScript==
document.body.innerHTML = "<div id='autoaconfig'></div>" + document.body.innerHTML;
var aacon = document.getElementById("autoaconfig");
aacon.align = "center";
var btn1 = document.createElement("input");
btn1.type = "button";
btn1.value = "Auto-Attack";
var s = btn1.style
s.padding = "0px";
s.margin = "0px";
s.border = "1px solid gray";
if(localStorage.getItem("aa_config_attack") == 1) {
	s.background = "#C0FF00";
         btn1.title = "Auto-Angriff deaktivieren";
}else{
	s.background = "#FFBF00";
         btn1.title = "Auto-Angriff aktivieren";
}
function changeConfig() {
	if(localStorage.getItem("aa_config_attack") == 1) {
		btn1.style.background = "#FFBF00";
                 btn1.title = "Auto-Angriff aktivieren";
		localStorage.setItem("aa_config_attack",0)
	}else{
		btn1.style.background = "#C0FF00";
                 btn1.title = "Auto-Angriff deaktivieren";
		localStorage.setItem("aa_config_attack",1)
                 window.parent.frames[1].location.href = window.parent.frames[1].location.href;
	}
}
function killFocus() {
	this.blur();
	return false;
}
s.color = "black";
s.fontSize = "12px";
s.fontFamily = "Arial";
btn1.addEventListener("click", changeConfig, true);
btn1.addEventListener("focus", killFocus, true);

var btn2 = document.createElement("input");
btn2.type = "button";
btn2.value = "Auto-Aufheb";
var s = btn2.style
s.padding = "0px";
s.margin = "0px";
s.border = "1px solid gray";
if(localStorage.getItem("aa_config_drops") == 1) {
	s.background = "#C0FF00";
         btn2.title = "Auto-Angriff deaktivieren";
}else{
	s.background = "#FFBF00";
         btn2.title = "Auto-Angriff aktivieren";
}
function changeConfig2() {
	if(localStorage.getItem("aa_config_drops") == 1) {
		btn2.style.background = "#FFBF00";
                 btn2.title = "Auto-Aufheb aktivieren";
		localStorage.setItem("aa_config_drops",0)
	}else{
		btn2.style.background = "#C0FF00";
                 btn2.title = "Auto-Aufheb deaktivieren";
		localStorage.setItem("aa_config_drops",1)
                 window.parent.frames[1].location.href = window.parent.frames[1].location.href;
	}
}
s.color = "black";
s.fontSize = "12px";
s.fontFamily = "Arial";
btn2.addEventListener("click", changeConfig2, true);
btn2.addEventListener("focus", killFocus, true);

var btn3 = document.createElement("input");
btn3.type = "button";
btn3.value = "Manuelle eingabe ...";
var s = btn3.style
s.padding = "0px";
s.margin = "0px";
s.border = "1px solid gray";
s.background = "#FFFFFF";
function changeConfig3() {
	var c = prompt("NPC-Namen eingeben","");
         var n = c;
	var store = localStorage.getItem("attack_npc_list")
	if(store != null) {
		store = store.split("|");
	}else{
		store = new Array();
	}
        	var r = false;
	for(var i = 0;i < store.length;i++) {
		if(store[i] == n) {
                		r = true;
                		break;
                	}
        	}
	if(r == false) {
		store[store.length] = n;+
                 alert("Das Angreifen des NPC's \"" + n + "\" wurde aktiviert.")
         }else{
         	var r = false;
		for(var i = 0;i < store.length;i++) {
			if(store[i] == n) {
                 		r = true;
                 		break;
                 	}
         	}
                 if(r == true) {
                 	var p = "";
                 	for(var i = 0;i < store.length;i++) {
                                 if(store[i] != n) {
                 			if(p != "") {
						p += "|";
                         		}
                         		p += store[i];
                                 }
                 	}
                 	localStorage.setItem("attack_npc_list",p);
                 }
                 alert("Das Angreifen des NPC's \"" + n + "\" wurde deaktiviert.")
	}
	var p = "";
	for(var i = 0;i < store.length;i++) {
		if(p!="") {
			p += "|";
		}
		p += store[i];
	}
	localStorage.setItem("attack_npc_list",p);
}
s.color = "black";
s.fontSize = "12px";
s.fontFamily = "Arial";
btn3.addEventListener("click", changeConfig3, true);
btn3.addEventListener("focus", killFocus, true);

btn1.style.width="100px";
btn2.style.width="100px";
btn3.style.width="209px";

aacon.appendChild(btn1);
aacon.appendChild(document.createTextNode(" | "));
aacon.appendChild(btn2);
aacon.appendChild(document.createElement("br"));
aacon.appendChild(btn3);

var hr = document.createElement("hr");
hr.noshade = true;
hr.size = 1;
hr.color = "black";

aacon.appendChild(hr);

var ps = document.getElementsByTagName("p");
var offs = 0;
if(ps[4].innerHTML.indexOf("Lebenspunkte") > -1) {
	localStorage.setItem("autoattack_lp",ps[4].getElementsByTagName("span")[0].getElementsByTagName("b")[0].innerHTML);
}else{
	localStorage.setItem("autoattack_lp",ps[3].getElementsByTagName("span")[0].getElementsByTagName("b")[0].innerHTML);
         offs -= 1;
}
var next_block = ps[7 + offs];
if(next_block.childNodes.length == 2) {
	localStorage.setItem("autoattack_atk",next_block.innerHTML.substr(23));
}else{
	var a = next_block.innerHTML.substr(23);
         a = a.substr(0,a.indexOf(" ")) - 0;
         var s = next_block.innerHTML.substr(23);
         s = s.substr(s.indexOf(" "));
         s = s.substr(s.indexOf(">") + 2);
         s = s.substr(0,s.indexOf("<")) - 0;
         a += s;
	localStorage.setItem("autoattack_atk",a);
}

var next_block = ps[9 + offs];
if(next_block.childNodes.length == 2) {
         var a = next_block.innerHTML.substr(28);
         localStorage.setItem("autoattack_def",next_block.innerHTML.substr(28));
}else{
	var a = next_block.innerHTML.substr(28);
         a = a.substr(0,a.indexOf(" ")) - 0;
         var s = next_block.innerHTML.substr(28);
         s = s.substr(s.indexOf(" "));
         s = s.substr(s.indexOf(">") + 2);
         s = s.substr(0,s.indexOf("<")) - 0;
         a += s;
	localStorage.setItem("autoattack_def",a);
}