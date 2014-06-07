// ==UserScript==
// @name       FakePCHack
// @namespace  DiabolicHF
// @version    1.0
// @description  A fake hack that believes when you go to google.com / .co.uk you're being hacked when you're not. This can be used to trick co-workers, friends and family.
// @include    http://google.com/*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @copyright  2011+, by Diabolic
// ==/UserScript==

$(document).ready(function(){
    
	var url = document.location.href;
    alert(url);
    if(url == "http://www.google.com/" || url == "https://www.google.com/" "http://www.google.co.uk/" || url == "https://www.google.co.uk/"){
		hack();
    }
   
	
}
);

function hack(){
    alert("hi");
	if(prompt("Alert! You are PC is currently being hacked! press 1 to launch anti virus! :") != "1")
        {
		window.parent.location = "http://hackertyper.net/base";
            
	}
    else
    {
      prompt("anti virus launched");  
    }
}
alert("No help can be offered at this time, please try again later.");