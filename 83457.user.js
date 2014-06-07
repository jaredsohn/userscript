// ==UserScript==
// @name           ELR SpamBot
// @namespace      js
// @include        http://www.elitelinerider.com/theshoutbox.php*
// ==/UserScript==

if(getCookie("spammsg")==""){
setCookie("spammsg","Default value",9001);
}
txt = getCookie("spammsg");

if(getCookie("spambot") == ""){
setCookie("spambot","stopped",9001);
}else if(getCookie("spambot") == "stopped"){
var btn = document.createElement("input");
btn.type = "button";
btn.value = "Start Spambot!"
btn.style.position = "absolute";
btn.style.top = "5px";
btn.style.left = "500px";
btn.style.border = "2px outset darkred"
btn.style.backgroundColor = "darkred";
btn.addEventListener("click",startSpam,false);
document.body.appendChild(btn);
var text = document.createElement("input");
text.type = "text";
text.value = getCookie("spammsg");
text.style.position = "absolute";
text.style.top = "5px";
text.style.left = "400px";
text.style.width = "96px";
text.style.border = "2px outset black"
text.style.backgroundColor = "white";
text.id = "spammsg";
document.body.appendChild(text);
}else{
var btn = document.createElement("input");
btn.type = "button";
btn.value = "Stop Spambot!"
btn.style.position = "absolute";
btn.style.top = "5px";
btn.style.left = "500px";
btn.style.border = "2px outset darkred"
btn.style.backgroundColor = "darkred";
btn.addEventListener("click",stopSpam,false);
document.body.appendChild(btn);
say(txt);
}

function startSpam(){setCookie("spambot","started",9001);setCookie("spammsg",document.getElementById("spammsg").value,9001);say(txt)}
function stopSpam(){setCookie("spambot","stopped",9001);say(txt)}

function say(str){
	document.getElementById("shouttype").value = str.substring(0,490);
	document.getElementById("shoutform").submit();
}

function setCookie(c_name,value,expiredays){
	var exdate = new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toUTCString());
}

function getCookie(c_name){
	if(document.cookie.length>0){
		c_start=document.cookie.indexOf(c_name + "=");
		if(c_start!=-1){
			c_start=c_start + c_name.length+1;
			c_end=document.cookie.indexOf(";",c_start);
			if(c_end==-1) c_end=document.cookie.length;
    		return unescape(document.cookie.substring(c_start,c_end));
   		}
	}
	return "";
}