// ==UserScript==
// @name           ELR SB++
// @namespace      js
// @include        http://www.elitelinerider.com/theshoutbox.php*
// ==/UserScript==

buttonStyle = "position:absolute;left:103px;width:100px;border:2px outset darkred;background-color: darkred;";

toolbox = document.createElement("fieldset");
toolbox.innerHTML = "<legend>ToolBox</legend>"
toolbox.id = "toolbox";
toolbox.setAttribute("style","-webkit-border-radius: 4px;-moz-border-radius: 4px;border:2px solid white;");
toolbox.style.position = "absolute";
toolbox.style.top = "8px";
toolbox.style.left = "670px";
toolbox.style.width = "203px";
toolbox.style.height = "220px";
toolbox.style.color ="white";
toolbox.style.fontFamily ="arial";
toolbox.style.fontSize ="12px";
toolbox.style.backgroundColor = "#440000";
document.body.appendChild(toolbox);


inp0 = document.createElement("input");
inp0.type = "button";
inp0.value = "Ignore user";
inp0.setAttribute("style",buttonStyle);
inp0.style.top = "3px";
inp0.addEventListener("click",ignoreUser,false);
inp1 = document.createElement("input");


inp1.type = "text";
inp1.style.position = "absolute";
inp1.style.top = "3px";
inp1.style.left = "0px";
inp1.style.width = "100px";
inp1.id = "user";


inp2 = document.createElement("input");
inp2.type = "button";
inp2.value = "Goto channel";
inp2.setAttribute("style",buttonStyle);
inp2.style.top = "53px";
inp2.addEventListener("click",channelChange,false);


inp3 = document.createElement("input");
inp3.type = "text";
inp3.value = "main";
inp3.style.position = "absolute";
inp3.style.top = "53px";
inp3.style.left = "0px";
inp3.style.width = "100px";
inp3.id = "ch";


inp4 = document.createElement("input");
inp4.type = "button";
inp4.value = "Poke user";
inp4.setAttribute("style",buttonStyle);
inp4.style.top = "28px";
inp4.addEventListener("click",pokeUser,false);


inp5 = document.createElement("input");
inp5.type = "text";
inp5.style.position = "absolute";
inp5.style.top = "28px";
inp5.style.left = "0px";
inp5.style.width = "100px";
inp5.id = "poke";

addImg = document.createElement("input");
addImg.type = "button";
addImg.value = "Add Image";
addImg.setAttribute("style",buttonStyle);
addImg.style.top = "88px";
addImg.style.left = "0px";
addImg.addEventListener("click",addImage,false);
document.getElementById("toolbox").appendChild(addImg);

addLnk = document.createElement("input");
addLnk.type = "button";
addLnk.value = "Add Link";
addLnk.setAttribute("style",buttonStyle);
addLnk.style.top = "88px";
addLnk.addEventListener("click",addLink,false);
document.getElementById("toolbox").appendChild(addLnk);

textEditor = document.createElement("table");
textEditor.innerHTML = "<tr><td>Bold</td><td><input type='checkbox' id='bold'></td></tr><tr><td>Italic</td><td><input type='checkbox' id='italic'></td></tr><tr><td>Underline</td><td><input type='checkbox' id='underline'></td></tr>";
textEditor.setAttribute("style","position:absolute;top:125px;left:10px;color:white;font-size:12px;");
document.getElementById("toolbox").appendChild(textEditor)

textSize = document.createElement("select");
textSize.innerHTML = "<option>0</option><option>2</option><option>4</option><option>6</option><option>8</option><option>10</option><option selected>12</option><option>14</option><option>16</option><option>18</option><option>20</option><option>22</option><option>24</option><option>26</option><option>28</option><option>30</option>";
textSize.id = "textsize";
textSize.setAttribute("style","top:150px;left:120px;position:absolute");
document.getElementById("toolbox").appendChild(textSize);

document.getElementById("toolbox").appendChild(inp0);
document.getElementById("toolbox").appendChild(inp1);
document.getElementById("toolbox").appendChild(inp2);
document.getElementById("toolbox").appendChild(inp3);
document.getElementById("toolbox").appendChild(inp4);
document.getElementById("toolbox").appendChild(inp5);
document.getElementById("channeldiv").style.visibility = "hidden";
document.getElementById("submitted").style.visibility = "hidden";
document.getElementById("submitted").style.width = "0px";
document.getElementById("shouttype").style.visibility = "hidden";
document.getElementById("shouttype").style.width = "400px";
msgField = document.createElement("input");
msgField.id = "msgField";
msgField.addEventListener("keypress",shoutSubmit,false);
msgField.style.width = "600px";
msgField.style.position = "absolute";
msgField.style.left = "170px";
msgField.style.top = "280px"
msgField.style.border = "2px solid darkred";
msgField.style.fontSize = "12px";
msgField.maxlength = 500;
//msgField.style.textAlign = "center";
document.body.appendChild(msgField);
//document.getElementById("shoutboxbacking").style.width = "500px";
//document.getElementById("shoutboxbacking").style.border = "1px solid white";
//document.getElementById("shoutboxbacking").style.border = "1px solid darkred";
document.getElementById("test").style.backgroundImage = "url(http://beta.bittipiilo.com/upload/elrbg.png)";
document.getElementById("test").style.backgroundColor = "darkred";
styleTag = document.createElement("style");
styleTag.innerHTML = "input{-webkit-border-radius: 5px;-moz-border-radius: 5px;background-color:white;}td{text-align:left}img{vertical-align: middle;} .sbmessage{width:400px;} .smileybox{visibility:hidden;height:0px;width:0px;}";
document.body.appendChild(styleTag);
//document.body.innerHTML += "<iframe id='sendShout' src='http://example.com/' style=''></iframe>";
frame = document.createElement("iframe");
frame.id = "sendShout";
frame.src = "http://example.com/";
frame.setAttribute("style","width:0px;height:0px;visibility:hidden");
document.body.appendChild(frame);
setTimeout("updateData()",500);
setTimeout("updateData()",1000);
setTimeout("updateData()",1500);
setTimeout("updateData()",2000);

fontT = document.getElementsByTagName("font");
for(i=0;i<fontT.length;i++){
if(fontT[i].innerHTML == "Maximum two smileys allowed."){
fontT[i].style.visibility = "hidden";
}
}
imgT = document.getElementsByTagName("img");
for(i=0;i<imgT.length;i++){
if(imgT[i].src == "refresh.png"){
imgT[i].style.visibility = "hidden";
}
}

function addImage(){
	url = prompt("Insert URL:","http://");
	if(url != null){
	document.getElementById("msgField").value += " [img]"+url+"[/img] ";
	}
	document.getElementById("msgField").focus();
}

function addLink(){
	url = prompt("Insert URL:","http://");
	if(url != null){
	document.getElementById("msgField").value += " [url]"+url+"[/url] ";
	}
	document.getElementById("msgField").focus();
}

function ignoreUser(){
	user = document.getElementById("user").value;
	say("/ignore "+user.split(" ").join("+"));
}

function shoutSubmit(e){
	if(e.keyCode == 13){
		gets = getUrlVars();
		channel = gets['channel'];
		b = document.getElementById("bold").checked;
		i = document.getElementById("italic").checked;
		u = document.getElementById("underline").checked;
		if(b==true){
		b=1;
		}else{
		b=0;
		}
		if(i==true){
		i=1;
		}else{
		i=0;
		}
		if(u==true){
		u=1;
		}else{
		u=0;
		}
		s = document.getElementById("textsize").value;
		document.getElementById("sendShout").src = "http://bittipiilo.com/elrsend.php?s="+s+"&b="+b+"&i="+i+"&u="+u+"&ch="+channel+"&msg="+escape(this.value.replace(/"/g,"[{quote}]"));
		this.value = null;
		
	}
}

function shoutAnyways(){
		gets = getUrlVars();
		channel = gets['channel'];
		b = document.getElementById("bold").checked;
		i = document.getElementById("italic").checked;
		u = document.getElementById("underline").checked;
		s = document.getElementById("textsize").value;
		if(b==true){
		b=1;
		}else{
		b=0;
		}
		if(i==true){
		i=1;
		}else{
		i=0;
		}
		if(u==true){
		u=1;
		}else{
		u=0;
		}
		document.getElementById("sendShout").src = "http://bittipiilo.com/elrsend.php?s="+s+"&b="+b+"&i="+i+"&u="+u+"&ch="+channel+"&msg="+escape(document.getElementById("msgField").value.replace(/"/g,"[{quote}]"));
		document.getElementById("msgField").value = null;
}

function getUrlVars(){
	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	for(var i = 0; i < hashes.length; i++){
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	return vars;
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
	document.getElementById("msgField").value = str.substring(0,490);
	shoutAnyways();
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