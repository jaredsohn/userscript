// ==UserScript==
// @name           AllianceBoard++
// @description    by Darth Brunus
// @version        1.1
// @include        http://uni2.playstarfleet.com/alliances/show/*
// @include        http://uni2.playstarfleet.com/topics/show/*
// @include        http://playstarfleet.com/alliances/show/*
// @include        http://playstarfleet.com/topics/show/*
// @include        http://playstarfleetextreme.com/alliances/show/*
// @include        http://playstarfleetextreme.com/topics/show/*
// @include        http://uni2.playstarfleetextreme.com/alliances/show/*
// @include        http://uni2.playstarfleetextreme.com/topics/show/*
// ==/UserScript==

if(location.pathname.match(/^\/(alliances|topics).*/)) {
	// Put confirmation on deletes
	var docLinks = document.getElementsByTagName("a");
	for(var i = 0; i < docLinks.length; i++) {
		if(docLinks[i].textContent.toUpperCase() == "DELETE") {
			docLinks[i].setAttribute("onclick", "if(confirm('Are you sure?')) { " + docLinks[i].getAttribute("onclick") + " };");
		}
	}
	
	// Align left the topic subjects
	var subjects = document.getElementsByClassName("subject");
	for(var i = 0; i < subjects.length; i++) {
		subjects[i].setAttribute("style", "text-align: left");
	}
}

// Parse BB code
if(location.pathname.match(/^\/topics.*/)) {
	var linksArray = document.getElementsByTagName("a");
	
	var msgArray = document.getElementsByClassName("body");
	for(var i = 0; i < msgArray.length; i++) {
		var re = new RegExp("\\[(b|i|u)\\](.*?)\\[\/\\1\\]", "gi");
		msgArray[i].innerHTML = msgArray[i].innerHTML.replace(re, "<$1>$2</$1>");
		
		re = new RegExp("\\[url\\](.*?)\\[/url\\]", "gi");
		msgArray[i].innerHTML = msgArray[i].innerHTML.replace(re, "<a href='$1'>$1</a>");
		
		re = new RegExp("\\[url=\"([^\\]]*?)\"\\](.*?)\\[/url\\]", "gi");
		msgArray[i].innerHTML = msgArray[i].innerHTML.replace(re, "<a href='$1'>$2</a>");
		
		re = new RegExp("\\[size=\"([^\\]<>;\"]*?)\"\\](.*?)\\[/size\\]", "gi");
		msgArray[i].innerHTML = msgArray[i].innerHTML.replace(re, "<span style='font-size: $1pt'>$2</span>");
		
		re = new RegExp("\\[font=\"([^\\]<>;\"]*?)\"\\](.*?)\\[/font\\]", "gi");
		msgArray[i].innerHTML = msgArray[i].innerHTML.replace(re, "<span style='font-family: $1'>$2</span>");
		
		re = new RegExp("\\[img\\](.*?)\\[/img\\]", "gi");
		msgArray[i].innerHTML = msgArray[i].innerHTML.replace(re, "<img src='$1' />");
		
		re = new RegExp("\\[color=\"([^\\]<>;\"]*?)\"\\](.*?)\\[/color\\]", "gi");
		msgArray[i].innerHTML = msgArray[i].innerHTML.replace(re, "<span style='color: $1'>$2</span>");
	}
}