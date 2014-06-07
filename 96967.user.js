// ==UserScript==
// @name vv filter 4 facebook
// @description Version 1.0
// @author lintaba
// @namespace none
// @include http://*.facebook.*
// @include http://facebook.*
// ==/UserScript==

var blacklist=new RegExp("\ (?:vv|alekosz|kiszavazás|napinemszar[.]hu|beszolas[.]hu|aztadom[.]blog[.]hu)","i");
//szóközzel kezdődő |-vel elválasztott szavakat tartalmazókat szűri. az i kapcsoló miatt a kis és nagybetűs egyremegy
function filter(){
	var lines=document.querySelectorAll(".storyContent");
	for(var i=0;i<lines.length;i++){
		if(lines[i].__checked){continue;}//csak egyszer csekkoljon mindent
		lines[i].__checked=true;
		if(blacklist.test(lines[i].textContent)){
			lines[i].className+=" shit";
			//lines[i].style.opacity=0.2;
		}
	}
}

var s=document.createElement("style");
s.innerHTML=".shit{opacity:0.1;}.shit:hover{opacity:1;}";
//ezt lehet módosítani, ha gyengébb vagy erősebb szűrést akarsz rá

document.querySelector("head").appendChild(s);

filter();
setInterval(filter,1000);//muszáj a frissítések miatt