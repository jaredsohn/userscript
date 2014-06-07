// ==UserScript==
// @name	messaging history downloader
// @author      Giuseppe Casalicchio http://www.histdown.tk
// @description adds download button for facebook messaging history
// @include     http://*.facebook.com/*
// @version     0.1
// ==/UserScript==

function onClick(msgonly, get, next){
 var get = get - 1;
 var getURL = document.location.href;
 var splitted = getURL.split("&");
 var output = splitted[0]+"&"+splitted[1]+"&msgs_only="+msgonly+"&thread_offset="+get+"&num_msgs="+next;

 if(msgonly==0){
  location.href = output; 
 } 
 else{
  var download = "http://www.histdown.tk/redirect/?"+output;
  window.open(download);
 }
}

function createInput(element, place){
 element.id = "id";
 element.class = "MessagingComposerBody";
 element.type = "text";
 element.placeholder = place;
 document.getElementById("MessagingInlineComposer").appendChild(element);
}

function createButton(value){
 var viewLog = document.createElement("div");
 viewLog.id = value;
 viewLog.className = "uiSelectorButton uiButton";
 viewLog.innerHTML = value;
 document.getElementById("MessagingInlineComposer").appendChild(viewLog);
}

input1 = document.createElement("input");
input2 = document.createElement("input");
createInput(input1, "go to message number");
createInput(input2, "get next X messages");

var button1 = "Select";
createButton(button1); 
document.getElementById(button1).addEventListener('click', function(event) { onClick(0, input1.value, input2.value); }, true);

var button2 = "Download";
createButton(button2); 
document.getElementById(button2).addEventListener('click', function(event) { onClick(1, input1.value, input2.value); }, true);