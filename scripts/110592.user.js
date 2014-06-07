// ==UserScript==
// @name           Notifications
// @namespace      arreloco
// @include        http://www.kongregate.com/*
// ==/UserScript==

checkInfo = function(){
	var str = "";
	var user = this;
	user = user.active_user.getAttributes();
	var myMessages = new Object();
	myMessages = user.unread_shouts_count+user.unread_whispers_count;
	if (myMessages>0) {
		str = "...ten&eacute;s <a href=\"/accounts/"+user.username+"/messages\"> "+myMessages+(myMessages>1 ? " mensajes</a> nuevos " : " mensaje</a> nuevo");
		if(!/mensaje/g.test(document.getElementById("alert_box").innerHTML)){
			addDiv(str, "msg");
		}		
	}
	if(!/badge/g.test(document.getElementById("alert_box").innerHTML)){
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function(){
			if (xmlhttp.readyState==4 && xmlhttp.status==200){
				x = xmlhttp.responseText;
				json = JSON.parse(x);
				last = json[json.length-1];
				if(last.created_at!=localStorage["lastBadge"]){
					str = "...hay badges nuevas en el <br><a href=\""+last.games[0].url+"\">"+last.games[0].title+"</a>";
					localStorage["lastBadge"] = last.created_at;
				}
				if(/badge/g.test(str)){
					addDiv(str, "bdg");
				}
			}
		}
	xmlhttp.open("GET","http://www.kongregate.com/badges.json",true);
	xmlhttp.send();
	}
}
function addDiv(str, nature) {
	i = document.createElement("div");
	i.setAttribute("style", "margin: 5px; padding: 10px; border: 2px solid #FFAAAA; border-radius: 5px; background-color: #FFEEEE; top:-10px; ");
	i.innerHTML = "<b>Arre que...</b><br>"+str;
	alert_box = document.getElementById("alert_box");
	alert_box.appendChild(i);
}
setInterval(checkInfo, 20000);
setTimeout(function(){container = document.createElement("div"); container.setAttribute("id","alert_box"); container.setAttribute("style", "color: #440000; font-size:12px; position: fixed; width: 17%; text-align: left; top: 80%; left: 80%;"); document.getElementsByTagName('body')[0].appendChild(container);},5000);