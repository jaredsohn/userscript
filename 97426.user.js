// ==UserScript==
// @name           Massive-Liking-Unliking-Commenting version 1.1
// @namespace      http://roushdat.wordpress.com
// @description    Do you want to show how much you like someone? Then why don't you like all the things likable on his or her profile? Maybe you can also put a little comment on items which are commentable as well :)
// @include        http://www.facebook.com/*
// ==/UserScript==
//Disclaimer: The author shall not be held responsible for misuse which might be derived from this script. The codes have been provided solely for educational purposes.
body = document.body;
var globalCounterLike=0;
var globalComCounter=0;



if(body != null) {



	divLike = document.createElement("div");
	divLike.style.position = "fixed";
	divLike.style.bottom = "-1px";
	divLike.style.left = "5px";
	divLike.style.backgroundColor = "#ee5454";
	divLike.style.border = "1px solid #e7322e";
	divLike.style.padding = "2px";
	divLike.innerHTML = "<a style=\"font-weight:bold;color:#ffffff\" href=\"JavaScript:macroLike()\">M-Like</a>"
	
	divUnlike = document.createElement("div");
	divUnlike.style.position = "fixed";
	divUnlike.style.bottom = "-1px";
	divUnlike.style.left = "50px";
	divUnlike.style.backgroundColor = "blue";
	divUnlike.style.border = "1px solid #e7322e";
	divUnlike.style.padding = "2px";
	divUnlike.innerHTML = "<a style=\"font-weight:bold;color:white\" href=\"JavaScript:macroUnLike()\">M-UnLike</a>"

	
	divLikeCounter = document.createElement("div");
	divLikeCounter.style.position = "fixed";
	divLikeCounter.style.bottom = "-1px";
	divLikeCounter.style.left = "109px";
	divLikeCounter.style.backgroundColor = "green";
	divLikeCounter.style.color = "white";
	divLikeCounter.style.border = "1px solid #e7322e";
	divLikeCounter.style.padding = "2px";
	divLikeCounter.innerHTML = "0";
	divLikeCounter.id="counterLike";
	
	divCom = document.createElement("div");
	divCom.style.position = "fixed";
	divCom.style.bottom = "20px";
	divCom.style.left = "5px";
	divCom.style.backgroundColor = "#ee5454";
	divCom.style.border = "1px solid #e7322e";
	divCom.style.padding = "2px";
	divCom.innerHTML = "<a style=\"font-weight:bold;color:#ffffff\" href=\"JavaScript:macroCom()\">M-Comment</a>"
	
	divComCounter = document.createElement("div");
	divComCounter.style.position = "fixed";
	divComCounter.style.bottom = "20px";
	divComCounter.style.left = "80px";
	divComCounter.style.backgroundColor = "green";
	divComCounter.style.color = "white";
	divComCounter.style.border = "1px solid #e7322e";
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
		var userComment=prompt("Please input your comment:","");
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
