// ==UserScript==
// @name           Facebook - Message and Chat Button
// @namespace      Facebook - Message and Chat Button
// @include        http://www.facebook.com/*
// ==/UserScript==

var messageTest = /Message/gi;
var chatTest = /Chat/gi;

start();
function start()
{

    var c;
    var t;
    if (c = document.getElementById('content')) {
    	addButton();
		c.addEventListener("DOMNodeInserted", function () { clearTimeout(t); t = setTimeout(addButton, 1); }, false);
	}

    delete c;
    return false;


}

function addButton(){
	if(document.getElementsByClassName("addedBtn").length != 0){
		return;
	}
	if(typeof document.getElementById("profile_action_send_message") !== "undefined"){
		var button = document.getElementById("profile_action_send_message");
	
		if(!button){
			setTimeout(addButton,1000);
			return;
		}
		if(button.className != "uiButton"){
			setTimeout(addButton,1000);
			return;
		}
		
		if(messageTest.test(button.innerHTML)){
			chatOrMsg = "msg";
		}else if(chatTest.test(button.innerHTML)){
			chatOrMsg = "chat";
		}

		if(chatOrMsg == "msg"){
			button.style.marginLeft = "5px";
			
			var userID = button.href.split(".php?id=")[1];
			var userName = stripHTML(document.getElementsByClassName("profileName ginormousProfileName fwb")[0].innerHTML).replace(/['"]/g,"");
			var chatBtn = document.createElement("li");
			chatBtn.className = "uiListItem  uiListHorizontalItemBorder uiListHorizontalItem addedBtn";
			//chatBtn.innerHTML = "<a class='uiButton' href='#' id='profile_action_send_message' onclick=\"Chat.openTab('"+userID+"', '"+userName+"', 'friend');\" rel='dialog'><i class='mrs img spritemap_67aga7 sx_5a6955'></i><span class='uiButtonText'>Chat</span></a>";
			chatBtn.innerHTML = "<a class='uiButton' href='#' id='profile_action_send_message' onclick=\"Chat.openTab('"+userID+"', '"+userName+"', 'friend');\" rel='dialog'><i class='mrs img sp_67aga7 sx_5a6955'></i><span class='uiButtonText'>Chat</span></a>";
			button.parentNode.insertBefore(chatBtn,button);
		}else if(chatOrMsg == "chat"){

			var pokeBtn = document.getElementById("profile_action_poke");
			
			pokeBtn.style.marginLeft = "5px";
			
			var btnOnClick = button.getAttribute("onclick");
			var userID = btnOnClick.split("\"")[1].split("\"")[0];
			var userName = stripHTML(document.getElementsByClassName("profileName ginormousProfileName fwb")[0].innerHTML);
			var chatBtn = document.createElement("li");
			chatBtn.className = "uiListItem  uiListHorizontalItemBorder uiListHorizontalItem addedBtn";
			chatBtn.innerHTML = "<a class='uiButton' href='/ajax/messaging/composer.php?id="+userID+"' id='profile_action_send_message' onclick='' rel='dialog'><i class='mrs img spritemap_67aga7 sx_5a6955'></i><span class='uiButtonText'>Send message</span></a>";
			pokeBtn.parentNode.insertBefore(chatBtn,pokeBtn);
		}
	}else{
		setTimeout(addButton,1000);
	}
}

function stripHTML(oldString) {

   var newString = "";
   var inTag = false;
   for(var i = 0; i < oldString.length; i++) {
   
        if(oldString.charAt(i) == '<') inTag = true;
        if(oldString.charAt(i) == '>') {
              if(oldString.charAt(i+1)=="<")
              {
              		//dont do anything
	}
	else
	{
		inTag = false;
		i++;
	}
        }
   
        if(!inTag) newString += oldString.charAt(i);

   }

   return newString;
}




function insertAfter(parent, node, referenceNode) {
  parent.insertBefore(node, referenceNode.nextSibling);
}
