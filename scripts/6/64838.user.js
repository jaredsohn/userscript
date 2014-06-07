// ==UserScript==
// @name           Travian Link Holder
// @namespace      Travian
// @author		Zalastax
// @version 	1
// @description Ad Links to your travian interface just like the Plus-account feature.
// @include 	http://*.travian*.*/*.php*
// @exclude 	http://*.travian*.*/hilfe.php*
// @exclude		http://*.travian*.*/log*.php*
// @exclude 	http://*.travian*.*/index.php*
// @exclude 	http://*.travian*.*/anleitung.php*
// @exclude 	http://*.travian*.*/impressum.php*
// @exclude 	http://*.travian*.*/anmelden.php*
// @exclude 	http://*.travian*.*/gutscheine.php*
// @exclude 	http://*.travian*.*/spielregeln.php*
// @exclude 	http://*.travian*.*/links.php*
// @exclude 	http://*.travian*.*/geschichte.php*
// @exclude 	http://*.travian*.*/tutorial.php*
// @exclude 	http://*.travian*.*/manual.php*
// @exclude 	http://*.travian*.*/manual.php*
// @exclude 	http://*.travian*.*/ajax.php*
// @exclude 	http://*.travian*.*/ad/*
// @exclude 	http://*.travian*.*/chat/*
// @exclude 	http://forum.travian*.*
// @exclude 	http://board.travian*.*
// @exclude 	http://shop.travian*.*
// @exclude 	http://*.travian*.*/activate.php*
// @exclude 	http://*.travian*.*/support.php*
// @exclude  	http://help.travian*.*
// @exclude 	*.css
// @exclude 	*.js

// ==/UserScript==

					window.ny = function(){
					var page = location.href;
var url = prompt("Insert URL adress here",page);
if(url == ""){
alert("that is nothing");
}
else if(url == "http://"){
	alert("you didn't ad anything");
}
else if(url == null){}
else{

var text = prompt("Insert URL text here","my link");
if(text == ""){
	alert("that is nothing");
}
else if(text == null){}
else{
 GM_setValue("localLink",printLink+"&bull <a href=\""+url+"\">"+text+"</a><br />");
 window.location.reload()
 }}}
 
 window.deleteAll = function(){
 var answer = confirm ("You are about to delete all your links! Continue?")
if (answer){
 GM_deleteValue("localLink");
 window.location.reload()
 }}
 window.showSwitch = function(){
 	visibilityVar = document.getElementById("visibilityContainer").style.visibility;
	if (visibilityVar =="visible"){
		document.getElementById("visibilityContainer").style.visibility = "hidden";
		GM_setValue("visibilityValue","hidden");
	}
	else{
		document.getElementById("visibilityContainer").style.visibility = "visible";
		GM_setValue("visibilityValue","visible");
	}
 }
 
 
        var divTag = document.createElement("div");
        divTag.id = "divContainer";
		divTag.setAttribute("align","left");
        
        divTag.style.margin = "0px auto";
		divTag.style.position = " absolute";
		var topVar = GM_getValue("posTop","190")+"px";
		divTag.style.top = topVar;
		var leftVar = GM_getValue("posLeft","690")+"px";
        divTag.style.left = leftVar;
		
        document.body.appendChild(divTag);
		
		
		var divTag = document.createElement("div");
        divTag.id = "changeVisibility";
        divTag.style.margin = "0px auto";
		divTag.innerHTML = "<p style=\" font-size:130%; font-weight:bold;\">Links</p>";
        document.getElementById("divContainer").appendChild(divTag);
		document.getElementById("changeVisibility").addEventListener("click", showSwitch, false);


        var divTag = document.createElement("div");
        divTag.id = "visibilityContainer";
		divTag.style.position = "relative"
		divTag.style.top = "-10px"
        divTag.style.margin = "0px auto";
		var setVisibility = GM_getValue("visibilityValue","visible");
		divTag.style.visibility = setVisibility;
        document.getElementById("divContainer").appendChild(divTag);
		
		
		
        var divTag = document.createElement("div");
        
        divTag.id = "div2";
        
        
        divTag.style.margin = "0px auto";
		divTag.style.align = "left"
		
		printLink = GM_getValue("localLink"," ");
        divTag.innerHTML = printLink;
        document.getElementById("visibilityContainer").appendChild(divTag);
		
		
		
        var divTag = document.createElement("div");
        
        divTag.id = "div1";
        
        
        divTag.style.margin = "0px auto";
		divTag.style.width = "14px";
		divTag.style.position = "relative";
		divTag.style.left = "-17px";
		divTag.style.top = "6px";
        document.getElementById("visibilityContainer").appendChild(divTag);
		divTag.innerHTML = "<a>+</a>";
		

document.getElementById("div1").addEventListener("click", ny, false);

        var divTag = document.createElement("div");
        
        divTag.id = "div3";
        
        
        divTag.style.margin = "0px auto";
		divTag.style.width = "10px"
		divTag.style.position = "relative"
		divTag.style.left = "-5px"
		divTag.style.top = "-10px"
        document.getElementById("visibilityContainer").appendChild(divTag);
		divTag.innerHTML = "<a>-</a>";
document.getElementById("div3").addEventListener("click", deleteAll, false);


		window.contentUpp = function()
			{
			var obj = document.getElementById("divContainer");
			var currentPosition = parseInt(obj.style.top)
			if (currentPosition <=10){
alert("Too long up")
			}
			else{
			var amountToMove = -10;

			obj.style.top = currentPosition+amountToMove+"px";
			var currentPosition = parseInt(obj.style.top)
			GM_setValue("posTop",currentPosition);
}}

		window.contentRight = function()
			{
			var obj = document.getElementById("divContainer");
			var currentPosition = parseInt(obj.style.left)
			var amountToMove = 10;

			obj.style.left = currentPosition+amountToMove+"px";
			var currentPosition = parseInt(obj.style.left)
			GM_setValue("posLeft",currentPosition);
}
		window.contentLeft = function()
			{
			var obj = document.getElementById("divContainer");
			var currentPosition = parseInt(obj.style.left)
						if (currentPosition <=10){
alert("Too long to the left")
			}
			else{
			var amountToMove = -10;

			obj.style.left = currentPosition+amountToMove+"px";
			var currentPosition = parseInt(obj.style.left)
			GM_setValue("posLeft",currentPosition);
			
}}
		window.contentDown = function()
			{
			var obj = document.getElementById("divContainer");
			var currentPosition = parseInt(obj.style.top)
			var amountToMove = 10;

			obj.style.top = currentPosition+amountToMove+"px";
			var currentPosition = parseInt(obj.style.top)
			GM_setValue("posTop",currentPosition);
}

		window.contentDown = function()
			{
			var obj = document.getElementById("divContainer");
			var currentPosition = parseInt(obj.style.top)
			var amountToMove = 10;

			obj.style.top = currentPosition+amountToMove+"px";
			var currentPosition = parseInt(obj.style.top)
			GM_setValue("posTop",currentPosition);
}

        window.linkSave = function(){
		printLink = GM_getValue("localLink"," ");
		links = prompt("Insert URL text here",printLink);
		GM_setValue("localLink",links);
		window.location.reload();
		}


        var divTag = document.createElement("div");
        
        divTag.id = "upArrow";
        
        
        divTag.style.margin = "0px auto";
		divTag.style.width = "15px";
		divTag.style.position = "relative"
		divTag.style.left = "35px"
		divTag.style.top = "-31px"
        document.getElementById("visibilityContainer").appendChild(divTag);
		divTag.innerHTML = "<img src=\"http://zalastax.co.cc/Bilder/arrows/up.gif\" />";
document.getElementById("upArrow").addEventListener("click", contentUpp, false);


        var divTag = document.createElement("div");
        
        divTag.id = "rightArrow";
        
        divTag.setAttribute("align","center");
        
        divTag.style.margin = "0px auto";
		divTag.style.position = "relative";
		divTag.style.width = "15px";
		divTag.style.left = "44px";
		divTag.style.top = "-31px";
        document.getElementById("visibilityContainer").appendChild(divTag);
		divTag.innerHTML = "<img src=\"http://zalastax.co.cc/Bilder/arrows/right.gif\" />";
document.getElementById("rightArrow").addEventListener("click", contentRight, false);

        var divTag = document.createElement("div");
        
        divTag.id = "leftArrow";
        
        divTag.setAttribute("align","center");
        
        divTag.style.margin = "0px auto";
		divTag.style.position = "relative";
		divTag.style.left = "24px";
		divTag.style.top = "-45px";
		divTag.style.width = "15px";
        document.getElementById("visibilityContainer").appendChild(divTag);
		divTag.innerHTML = "<img src=\"http://zalastax.co.cc/Bilder/arrows/left.gif\" />";
document.getElementById("leftArrow").addEventListener("click", contentLeft, false);

        var divTag = document.createElement("div");
        
        divTag.id = "downArrow";
        
        divTag.style.margin = "0px auto";
		divTag.style.position = "relative";
		divTag.style.left = "34px";
		divTag.style.top = "-46px";
		divTag.style.width = "15px";
        document.getElementById("visibilityContainer").appendChild(divTag);
		divTag.innerHTML = "<img src=\"http://zalastax.co.cc/Bilder/arrows/down.gif\" />";
document.getElementById("downArrow").addEventListener("click", contentDown, false);
		var innerTest =  document.getElementById("div2").innerHTML;
		
		var divTag = document.createElement("div");
        divTag.id = "div4";
		divTag.setAttribute("align","left");
        
        divTag.style.margin = "0px auto";
		divTag.style.width = "16px";
		divTag.style.position = "relative";
		divTag.style.top = "-70px";
		divTag.style.left = "10px";
        document.getElementById("visibilityContainer").appendChild(divTag);
		divTag.innerHTML = "<img src=\"http://www.finanstekniknorden.com/images/wrench_orange.gif\" />";

		document.getElementById("div4").addEventListener("click", linkSave, false);