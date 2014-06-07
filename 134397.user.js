// ==UserScript==

// @name          Better 4ducky

// @namespace     http://4ducky.ru

// @description   Improves 4ducky

// @include        http://4ducky.ru/*

// ==/UserScript==




var objs = document.getElementsByClassName('smalllink');
var info = document.getElementsByClassName('inboxalert');
if (objs)
{
    for (var i = 0; i < objs.length; i++){
		if(objs[i].innerHTML=="♥"){
			objs[i].innerHTML = "卐";
		}
	}
        
}
if(info)
{
	info[0].innerHTML = "卐";
	info[0].style.fontSize = "90%"
}
