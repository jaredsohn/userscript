// ==UserScript==
// @name           Mod Caller Español
// @namespace      arreloco
// @include        http://www.kongregate.com/games/*
// ==/UserScript==
function makeScript(){
	var i = 'llamar_mod = function () {if(localStorage["llamar_mod"]==null){localStorage["llamar_mod"] = prompt("Elige un mensaje para llamar a los mods:\\r(no te olvides de incluir [sala] para que aparezca la sala en la que te encuentras.","[sala]");	mensaje = localStorage["llamar_mod"].split("[sala]")[0]+this.holodeck._chat_window._active_room._room.name+localStorage["llamar_mod"].split("[sala]")[1];}else{	mensaje = localStorage["llamar_mod"].split("[sala]")[0]+this.holodeck._chat_window._active_room._room.name+localStorage["llamar_mod"].split("[sala]")[1];};var users = new Array();var xmlhttp = new XMLHttpRequest();xmlhttp.open("GET", "http://www.kongregate.com/accounts/Moderadores/friends", false);xmlhttp.send();r = xmlhttp.responseText;r = r.split("table_wrap")[1].split("pagination")[0];s = r.split("<td");for(i in s){if(/playing/g.test(s[i])){users.push(s[i-1].split(">")[2].split("<")[0]);this.holodeck.insertPrivateMessagePrefixFor(users[Math.round(Math.random()*(users.length-1))] +" "+ mensaje)};};if(users.length==0){alert("No hay mods disponibles.");};}';
	script = document.createElement("script");
	script.innerHTML = i;
	document.getElementsByTagName("head")[0].appendChild(script);
}

list = new Array();
try{
	list = document.getElementsByClassName("chat_actions_container");
}catch(ex){
	return;
}

op = document.createElement("option");
op.setAttribute("class","action");
op.setAttribute("onclick","llamar_mod();");
op.innerHTML = "Llamar mod";
list[0].childNodes[1].appendChild(op);

setTimeout(makeScript, 1000);