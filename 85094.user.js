// ==UserScript==
// @name           	Kongregate Textbox Extender
// @namespace     	http://matthewammann.com
// @description   	Enlarges texbox areas when writing PMs, shouts, your About Me section, and when replying to messages. Simply double-click to toggle normal/extended textbox. Custom length available in User Script Commands.
// @include        	http://www.kongregate.com/accounts/*
// @exclude        	http://www.kongregate.com/accounts/*/monitored
// @author			Matthew Ammann
// @version			1.1
// @date 			01/11/12
// ==/UserScript==

var mainShoutBox = document.getElementById("shout_content")
var path = location.pathname;
var pathArray = path.split("/");
var isWhisperPage = new Boolean(false);
var isShoutPage = new Boolean(false);
var firstClick = new Boolean(true);
var messagesArray;

GM_registerMenuCommand("Input Extended Texbox Length", inputPrompt)
var extendedLength = GM_getValue("textboxLength", "300px");

if(!parseInt(extendedLength, 10)) 
	extendedLength = "300px";

function inputPrompt()
{
	var input = prompt("Please enter the the desired texbox length (in pixels) as a number. The default extended length is 300.");
	var parsedInput = parseInt(input, 10);
	if(!parsedInput) 
		input = "300";
	
	input = String(input + "px");	
	extendedLength = input;
	GM_setValue("textboxLength", input);
}

if(mainShoutBox)
{
	addEvent(mainShoutBox);
	mainShoutBox.addEventListener("blur", blurHandler, false);
}

if(pathArray[3])
{
	if(pathArray[3] == "private_messages")
	{
		isWhisperPage = true;
		messagesArray = document.getElementsByClassName("whisper user_message");
		traverseMessages();
	}
	else if(pathArray[3] == "messages")
	{
		isShoutPage = true;
		messagesArray = document.getElementsByClassName("shout user_message");
		traverseMessages();
	}
	else if(pathArray[3] == "edit_profile")
	{
		var aboutMe = document.getElementById("user_about");
		aboutMe.addEventListener("dblclick", function(){toggleExpand(aboutMe)}, false);
	}
}	
else if(pathArray[1] == "accounts")
{
	messagesArray = document.getElementsByClassName("shout user_message");
	
	if(messagesArray)
		traverseMessages();
}
	
function traverseMessages()
{	
	for(i=0; i < messagesArray.length; i++)
	{
		var messageComments = messagesArray[i].getElementsByClassName("message_reply_container")[0].getElementsByClassName("message_comments")[0];	
		var replyTextbox = messageComments.getElementsByTagName("textarea")[0]
		addEvent(replyTextbox);
	}
}

function addEvent(element)
{
	if(firstClick)
		element.addEventListener("focus", function(){focusHandler(element)}, false);

	element.addEventListener("dblclick", function(){toggleExpand(element)}, false);
}

function focusHandler(element)
{
	firstClick = false;
	
	if(element.value.length == 0)
		element.style.setProperty("height", "auto" , "important");

	element.removeEventListener("focus", function(){focusHandler(element)}, false);
	
}

function toggleExpand(element)
{
	if(element.id == "shout_content") 
	{
		if(element.style.height == "24px" || element.style.height == extendedLength || firstClick == true)	
			element.style.setProperty("height", "auto" , "important");
		else
			element.style.setProperty("height", extendedLength , "important");
		
		firstClick = false;
	}
	else if(element.id == "user_about")
	{
		element.cols = "62"
		element.style.setProperty("height", extendedLength , "important");
	}
	else if(element.style.height == "55px" || element.style.height == "" || element.style.height == "auto")
		element.style.setProperty("height", extendedLength , "important");

	else
		element.style.setProperty("height", "55px" , "important");

	element.addEventListener("blur", blurHandler, false);
	element.focus();
}

function blurHandler()
{
	if(this.value.length == 0)
	{
		if(this.id == "shout_content")
			this.style.setProperty("height", "24px" , "important");
		else
			this.style.setProperty("height", "15px" , "important");
	}
	
	firstClick = true;
}