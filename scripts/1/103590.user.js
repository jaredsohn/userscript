// ==UserScript==
// @name          Fetlives
// @namespace     http://www.fetlife.hacks.com
// @description	  Various Tweaks For Fetlife, Including Ad-Killers, Picture Unprotectors, List Makers And Mass Messagers
// @include       http://www.fetlife.com/*
// @include       http://fetlife.com/*
// @version       0.1
// ==/UserScript==



//Picture Unprotector
var killme = document.getElementsByClassName("protect_pic"); for(var i=0;i<killme.length;i++)killme[i].style.display="none";

//Ad-Killer
killme = document.getElementsByClassName("ad_unit_v2"); for(var i=0;i<killme.length;i++)killme[i].style.display="none";
killme = document.getElementsByClassName("ads_container"); for(var i=0;i<killme.length;i++)killme[i].style.display="none";




//List Maker
function updatelinks(){
	var links = document.getElementsByClassName("pagination")[0].getElementsByTagName("a");
	for(var i=0;i<links.length;i++)links[i].hash=location.hash;
}

function getid(user){
	return user.getElementsByTagName("a")[0].href.match(/\d*$/)+";";
}

function updateusers(){
	var users = document.getElementsByClassName("user_in_list");
	for(var i=0;i<users.length;i++){
		users[i].onclick=function(){fix(this);};
		if(location.hash.match(eval("/[#;]"+getid(users[i])+"/")))
			users[i].style.backgroundColor="red";
	}
}

function fix(user){
	var id=getid(user);
	if(user.style.background=="red")
	{
		location.hash=location.hash.replace(eval("/([#;])"+id+"/"),"$1");
		user.style.backgroundColor="";
	}
	else
	{
		location.hash+=id;
		user.style.backgroundColor="red";
	}
	updatelinks();
}

function dump(){
	document.getElementsByClassName("span-20")[0].innerHTML="<h3>Here's Your List</h3><textarea style='width:100%' disabled='true'>"+location.hash.slice(1)+"</textarea>";
}

function selectall(){
	var users = document.getElementsByClassName("user_in_list");
	for(var i=0;i<users.length;i++) users[i].onclick();
}

function init(){
	document.getElementById("ads_container").innerHTML="<a id='dum'>(Dump List)</a><br/><br/><a id='selectal'>(Toggle Users)</a>";
	document.getElementById("dum").onclick=dump;
	document.getElementById("selectal").onclick=selectall;
	updatelinks();
	updateusers();
}

if(document.getElementsByClassName("user_in_list").length>0)init();



//Mass Messager
function massmess (){
	f = document.getElementById("new_conversation");
	e = f.elements;
	s = "";
	for (i = 0; i < e.length; i++) if ((n = e[i].name) && n != "with") s += e[i].name + "=" + encodeURIComponent(e[i].value) + "&";
	j = new Array();
	u = prompt("Who Are We Sending The Message To? (Enter User ID's, Separated With A Semicolon)", document.getElementsByName("with")[0].value);
	if (u) {
		u = u.split(";");
		for (i = 0; i < u.length; i++) if (!u[i].match(/^\d+$/)) {
			alert("Make sure you've entered User ID's separated by semicolons!");
			break
		}
		if (i == u.length) {
			for (i = 0; i < u.length; i++) {
				j[i] = new XMLHttpRequest();
				j[i].open(f.method, f.action, true);
				j[i].setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				j[i].send(s + "with=" + u[i]);
			}
		} else alert("Aborted");
	} else alert("Aborted");
}

if(location.href.match(/conversations\/new/)){document.getElementById("submit_button").innerHTML+='  <input type="button" id="massmes" value="Mass Message">'; document.getElementById("massmes").onclick=massmess;}