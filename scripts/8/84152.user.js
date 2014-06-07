// ==UserScript==
// @name           ELR SB deisgn
// @namespace      js
// @include        http://www.elitelinerider.com/theshoutbox.php*
// ==/UserScript==

inp0 = document.createElement("input");
inp0.type = "button";
inp0.value = "Ignore user";
inp0.style.position = "absolute";
inp0.style.top = "8px";
inp0.style.left = "800px";
inp0.style.width = "100px";
inp0.style.border = "2px outset darkred"
inp0.style.backgroundColor = "darkred";
inp0.addEventListener("click",ignoreUser,false);
inp1 = document.createElement("input");
inp1.type = "text";
inp1.style.position = "absolute";
inp1.style.top = "8px";
inp1.style.left = "700px";
inp1.style.width = "97px";
inp1.id = "user";
inp2 = document.createElement("input");
inp2.type = "button";
inp2.value = "Goto channel";
inp2.style.position = "absolute";
inp2.style.top = "58px";
inp2.style.left = "800px";
inp2.style.width = "100px";
inp2.style.border = "2px outset darkred"
inp2.style.backgroundColor = "darkred";
inp2.addEventListener("click",channelChange,false);
inp3 = document.createElement("input");
inp3.type = "text";
inp3.value = "main";
inp3.style.position = "absolute";
inp3.style.top = "58px";
inp3.style.left = "700px";
inp3.style.width = "97px";
inp3.id = "ch";
inp4 = document.createElement("input");
inp4.type = "button";
inp4.value = "Poke user";
inp4.style.position = "absolute";
inp4.style.top = "33px";
inp4.style.left = "800px";
inp4.style.width = "100px";
inp4.style.border = "2px outset darkred"
inp4.style.backgroundColor = "darkred";
inp4.addEventListener("click",pokeUser,false);
inp5 = document.createElement("input");
inp5.type = "text";
inp5.style.position = "absolute";
inp5.style.top = "33px";
inp5.style.left = "700px";
inp5.style.width = "97px";
inp5.id = "poke";
document.body.appendChild(inp0);
document.body.appendChild(inp1);
document.body.appendChild(inp2);
document.body.appendChild(inp3);
document.body.appendChild(inp4);
document.body.appendChild(inp5);
document.getElementById("channeldiv").style.visibility = "hidden";
document.getElementById("submitted").style.visibility = "hidden";
document.getElementById("submitted").style.width = "0px";
document.getElementById("shouttype").style.visibility = "hidden";
document.getElementById("shouttype").style.width = "400px";
msgField = document.createElement("input");
msgField.id = "msgField";
msgField.addEventListener("keypress",shoutSubmit,false);
msgField.style.width = "400px";
msgField.style.position = "absolute";
msgField.style.left = "5px";
msgField.style.top = "280px"
document.body.appendChild(msgField);
//document.getElementById("shoutboxbacking").style.width = "500px";
//document.getElementById("shoutboxbacking").style.border = "1px solid white";
//document.getElementById("shoutboxbacking").style.border = "1px solid darkred";
document.getElementById("test").style.backgroundImage = "url(http://beta.bittipiilo.com/upload/elrbg.png)";
styleTag = document.createElement("style");
styleTag.innerHTML = "input{-webkit-border-radius: 4px;-moz-border-radius: 4px;background-color:white;}td{text-align:left}img{vertical-align: middle;} .sbmessage{width:400px;}";
document.body.appendChild(styleTag);
//document.body.innerHTML += "<iframe id='sendShout' src='http://example.com/' style=''></iframe>";
frame = document.createElement("iframe");
frame.id = "sendShout";
frame.src = "http://example.com/";
frame.setAttribute("style","width:0px;height:0px;visibility:0px");
document.body.appendChild(frame);
setTimeout("updateData()",500);
setTimeout("updateData()",1000);
setTimeout("updateData()",1500);
setTimeout("updateData()",2000);
function ignoreUser(){
	user = document.getElementById("user").value;
	say("/ignore "+user.split(" ").join("+"));
}

function shoutSubmit(e){
	if(e.keyCode == 13){
		document.getElementById("sendShout").src = "http://bittipiilo.com/elrsend.php?ch=main&msg="+this.value;
		this.value = null;
		
	}
}

function pokeUser(){
	user = document.getElementById("poke").value;
	say("/poke "+user.split(" ").join("+"));
}

function channelChange(){
channel = document.getElementById("ch").value;
window.document.location = 'theshoutbox.php?channel=' + channel;
}

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