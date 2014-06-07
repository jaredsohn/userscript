// ==UserScript==
// @name       FakeHack
// @namespace  basstaggerung
// @version    0.1
// @description  A fake hack. use it to scare your friends!IMPORTANT! THIS IS STILL IN BETA TESTING
// @include    http://google.com/*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @copyright  2011+, by basstaggerung
// ==/UserScript==

$(document).ready(function(){
    
	var url = document.location.href;
    alert(url);
    if(url == "http://www.google.com/" || url == "https://www.google.com/"){
		hack();
    }
   
	
}
);

function hack(){
    alert("hi");
	if(prompt("Alert! You are being hacked! press 1 to launch anti virus! :") != "1")
        {
		window.parent.location = "http://hackertyper.net/base";
            
	}
    else
    {
      prompt("anti virus launched");  
    }
}
alert("hi");
