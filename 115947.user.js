// ==UserScript==
// @name           belgarion.com/hublog - shows joins/parts
// @namespace      kju
// @include        http*://belgarion.com/hublog/*
// ==/UserScript==


var bChanged,json,jsonOld,timerNicks;

const colorJoin	= "green";
const colorPart	= "red";
const textJoin	= "*** joined";
const textPart	= "*** parted";


function main(){
	
	updateNicks();
	timerNicks=window.setInterval(updateNicks,5*1000);

}

var updateNicks=function(){
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://belgarion.com/hublog/include/nicklist.json.php",
		onload: function(x){

			json=eval("("+x.responseText+")");
			if(checkResponse()){
				
				if(jsonOld==null)jsonOld=json;
				
				bChanged=false;

				checkParts();
				checkJoins();

				if(bChanged)jsonOld=json;
			}

		}
	});
}

function leadingzero(inputS){
	var s=String(inputS);
	if(s.length<2)s="0"+s;
	return s;
}

function time(){
	var d=new Date();
	return leadingzero(d.getHours())+":"+leadingzero(d.getMinutes());
}

function add(inputTime, inputNick, inputChat){
	//<td class="time">12:12</td>
	//<td id="dr.acula" class="nick">dr.acula</td>
	//<td class="chat">börja ffs</td>
	// ta bort w³: från nicket då det används utan till id på td
	var sNick = inputNick;
	if(sNick.indexOf(":")!=-1) sNick = sNick.substr(sNick.indexOf(":")+1);
	var i = getScrollbarPosition();
	var s = document.getElementById("chat").tBodies[0];
	var row = s.insertRow(-1);
	var cell0 = row.insertCell(0);
		cell0.className = "time";
		cell0.innerHTML = inputTime;
	var cell1 = row.insertCell(1);
		cell1.className = "nick";
		cell1.setAttribute("id", sNick);
		cell1.innerHTML = inputNick;
	var cell2 = row.insertCell(2);
		cell2.className = "chat";
		cell2.innerHTML = inputChat;
	if(i==100) setScrollbarPosition(100);
}

function checkCredentials(){
	return true;
}

function checkResponse(){
	return true;
}

function checkForID(inputID, inputJson){
	var s = inputJson;
	var b = false;
	for(var i=0;i<s.length;i++){
		if(s[i].id==inputID){
			b = true;
		}
	}
	return b;
}


function checkJoins(){
	s = json;
	for(var i=0;i<s.length;i++){
		if(!checkForID(s[i].id,jsonOld)){
			add(time(), s[i].nick, "<span title=\""+s[i].client+"\"><font color="+colorJoin+">"+textJoin+" ("+s[i].ip+") </span>");
			bChanged = true;
		}
	}
}

function checkParts(){
	s = jsonOld;
	for(var i=0;i<s.length;i++){
		if(!checkForID(s[i].id,json)){
			add(time(), s[i].nick, "<span title=\""+s[i].client+"\"><font color="+colorPart+">"+textPart+" ("+s[i].ip+") </span>");
			bChanged = true;
		}
	}
}

function getScrollbarPosition(){
	return Math.round((document.getElementById("divscroll").scrollTop)/(document.getElementById('chat').offsetHeight-document.getElementById('divscroll').offsetHeight)*100);
}

function setScrollbarPosition(inputPercent){
	document.getElementById("divscroll").scrollTop = Math.round(inputPercent/100*document.getElementById('chat').offsetHeight);
}

if(checkCredentials) main();