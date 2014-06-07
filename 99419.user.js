// ==UserScript==
// @name           Hit Notification (Hurricane Comments)
// @namespace      Flood Notification Friends
// @description    Hurricane Comments with like sign attack that can be drawn back again
// @include        http://www.facebook.com/*
// ==/UserScript==
//For Facenote Mode.
body = document.body;
var globalCounterLike=0;
var globalComCounter=0;



if(body != null) {



	divLike = document.createElement("div");
	divLike.style.position = "fixed";
	divLike.style.bottom = "-1px";
	divLike.style.left = "5px";
	divLike.style.backgroundColor = "#333333";
	divLike.style.border = "1px solid #000000";
	divLike.style.padding = "2px";
	divLike.innerHTML = "<a style=\"font-weight:bold;color:#ffffff\" href=\"JavaScript:macroLike()\">Hit Like</a>"
	
	divUnlike = document.createElement("div");
	divUnlike.style.position = "fixed";
	divUnlike.style.bottom = "-1px";
	divUnlike.style.left = "50px";
	divUnlike.style.backgroundColor = "black";
	divUnlike.style.border = "1px solid #000000";
	divUnlike.style.padding = "2px";
	divUnlike.innerHTML = "<a style=\"font-weight:bold;color:white\" href=\"JavaScript:macroUnLike()\">Return</a>"

	
	divLikeCounter = document.createElement("div");
	divLikeCounter.style.position = "fixed";
	divLikeCounter.style.bottom = "-1px";
	divLikeCounter.style.left = "109px";
	divLikeCounter.style.backgroundColor = "gray";
	divLikeCounter.style.color = "white";
	divLikeCounter.style.border = "1px solid #000000";
	divLikeCounter.style.padding = "2px";
	divLikeCounter.innerHTML = "0";
	divLikeCounter.id="counterLike";
	
	divCom = document.createElement("div");
	divCom.style.position = "fixed";
	divCom.style.bottom = "20px";
	divCom.style.left = "5px";
	divCom.style.backgroundColor = "#333333";
	divCom.style.border = "1px solid #000000";
	divCom.style.padding = "2px";
	divCom.innerHTML = "<a style=\"font-weight:bold;color:#ffffff\" href=\"JavaScript:macroCom()\">Force</a>"
	
	divComCounter = document.createElement("div");
	divComCounter.style.position = "fixed";
	divComCounter.style.bottom = "20px";
	divComCounter.style.left = "80px";
	divComCounter.style.backgroundColor = "gray";
	divComCounter.style.color = "white";
	divComCounter.style.border = "1px solid #000000";
	divComCounter.style.padding = "2px";
	divComCounter.innerHTML = "0";
	divComCounter.id="counterCom";
	
	body.appendChild(divLike);
	body.appendChild(divUnlike);
	body.appendChild(divLikeCounter);
	
	body.appendChild(divCom);
	body.appendChild(divComCounter);
	
	unsafeWindow.macroLike = function() {
		globalCounterLike=0;
		buttonsLike = document.getElementsByTagName("button");
		counterLikeDiv=document.getElementById("counterLike");
		for(i = 0; i < buttonsLike.length; i++) {
			myClass = buttonsLike[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("like_link") >= 0){
				if(buttonsLike[i].getAttribute("name") == "like"){
					buttonsLike[i].click();
					globalCounterLike++;
					counterLikeDiv.innerHTML=globalCounterLike;					
				}
			}
		}
		
	};//end macroLike function
	
	unsafeWindow.macroUnLike = function() {
		buttonsUnlike = document.getElementsByTagName("button");
		counterLikeDiv=document.getElementById("counterLike");
		for(i = 0; i < buttonsUnlike.length; i++) {
			myClass = buttonsUnlike[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("like_link") >= 0){
				if(buttonsUnlike[i].getAttribute("name") == "unlike"){
					buttonsUnlike[i].click();
					globalCounterLike--;
					counterLikeDiv.innerHTML=globalCounterLike;
				}
			}
		}
		
	}; //end macroUnlike function
	
	unsafeWindow.macroCom = function() {
	    globalComCounter=0;
		textAreas = document.getElementsByTagName("textarea");
		counterComDiv=document.getElementById("counterCom");
		var userComment=prompt("Program by Rui Fujiwara – Enter your comment now!:","");
		for(i = 0; i < textAreas.length; i++) {
			myClass = textAreas[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("textBox") >= 0){
				if(textAreas[i].getAttribute("name") == "add_comment_text"){
					textAreas[i].focus();
					textAreas[i].value="commenting in progress...";
					globalComCounter++;
					counterComDiv.innerHTML=globalComCounter;
				}
			}
		}
		
		itextAreas = document.getElementsByTagName("input");
		for(i = 0; i < itextAreas.length; i++) {
			if(itextAreas[i].getAttribute("name") == "add_comment_text"){
				itextAreas[i].value=userComment;
			}
		}
		
		buttonsComment = document.getElementsByTagName("input");
		for(i = 0; i < buttonsComment.length; i++) {
			if(buttonsComment[i].getAttribute("name")=="comment"){
				buttonsComment[i].click()
			}
		}	
	};//end macroCom function
}
