// ==UserScript==
// @name           BADOO PREMIUM HACK by Ph0b0s
// @namespace      http://eu1.badoo.com/encounters
// @description    Allow regular users to access other users' profiles in the encounter mode. Only works once you rated at least one person!
// @include        http://*badoo.com/encounters/*
// ==/UserScript==

var URL1="";
var URL2="";

botones();


function justWait(){	//let the web to get loaded
	window.setTimeout(myfunc2,1000);
	return true;
}

function botones(){	//set the listener

	var yes = document.getElementsByClassName("meet_yes")[0]
	var maybe = document.getElementsByClassName("meet_maybe")[0]
	var no = document.getElementsByClassName("meet_no")[0]


	if(!yes || !maybe || !no){
		alert("Button not captured!");
	}else{

		yes.addEventListener("click", myfunc, true);
		maybe.addEventListener("click", myfunc, true);
		no.addEventListener("click", myfunc, true);
	}
	return true;
}

function myfunc(){	//get the user profile link
	var foovar = document.getElementById("following_photo_wrap").getElementsByTagName("img")[0].src;

	if(!foovar.length){
		alert("can not get the url, sozzz!");
	}else{
		URL1 ="http://www.badoo.com/0"+(""+foovar).split("/",8)[7];
		justWait();
	}

	return true;
}


function myfunc2(){	//check if the page has changed and add the profile link just after the user name
	URL2 = "http://www.badoo.com/0"+(""+(document.getElementById("following_photo_wrap").getElementsByTagName("img")[4].src)).split("/",8)[7];

	if(!URL2){ justWait(); } //if the web has not loaded yet


	if(URL1==URL2){
		alert("URL1 and URL2 are the same... I think you have a slow connection, update the timer interval!");
		justWait();
	}else{
		var pivot = document.getElementsByClassName("name dOvl-open-ex")[0]

		if(!pivot){
			alert("Can not get the pivot!");
		}else{
			
			var perfil = document.createElement("div");
			perfil.innerHTML="<div><a href='"+URL1+"'>LINK TO PROFILE</a></div>";
			pivot.parentNode.insertBefore(perfil, pivot.nextSibling);

			botones();
		}
	}
	return true;
}