// ==UserScript==
// @name        FIMFiction - Cosmetic Changes
// @namespace   Selbi
// @include     http*://fimfiction.net/*
// @include     http*://www.fimfiction.net/*
// @version     1
// ==/UserScript==


// Show Like/Dislike Percentage
var likebar = document.getElementsByClassName('bar bar_like');
for (int=0; int<likebar.length; int++) {
	likebar[int].title = (Math.round(((likebar[int].style.width).replace('%',''))*100))/100 + '%';
}

// Highlight/Color Story Status
var bottom;
var alluls = document.getElementsByTagName('ul');

for (var int=0; int<alluls.length; int++) {
	if (alluls[int].className == "chapters") {
		bottom = alluls[int].getElementsByClassName('bottom')[0];
		bottom.innerHTML = bottom.innerHTML.replace("Complete",'<span style="text-shadow:#00FF00 0px 0px 6px">Complete</span>');
		bottom.innerHTML = bottom.innerHTML.replace("Incomplete",'<span style="text-shadow:#00AAFF 0px 0px 6px">Incomplete</span>');
		bottom.innerHTML = bottom.innerHTML.replace("On Hiatus",'<span style="text-shadow:#FFCC00 0px 0px 6px">On Hiatus</span>');
		bottom.innerHTML = bottom.innerHTML.replace("Cancelled",'<span style="text-shadow:#FF0000 0px 0px 6px">Canceled</span>');
	}
}

//No Header
$("#title").hide();
$(".header").css("margin-top", "21px");

// Other Background
var body = document.getElementsByTagName('body')[0];
body.style.backgroundImage = 'url(//i.imgur.com/1LBBPMA.png)';
body.style.backgroundColor = "#000000";