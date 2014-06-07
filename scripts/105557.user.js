// ==UserScript==
// @name           FW Auto Attacker Configurator
// @namespace      FWAA
// @include        http://85.125.222.229:8088/index.html??
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