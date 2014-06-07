// ==UserScript==
// @author         Sergey Kuzmich (Umnyjcom) [http://umnyj.com]
// @name           Die techno-kitchen
// @namespace      http://userscripts.org/scripts/show/124574
// @description    US hiding posts by techno-kitchen at http://freehabr.ru
// @include        http://freehabr.ru/*
// ==/UserScript==

window.onload = cutTK();

var postList;

function cutTK()
{
	var wrapper = document.getElementById("wrapper");
	postList = wrapper.getElementsByClassName("topic");
	for(var topic = 0; topic < postList.length; topic++)
	{
		makeChoise(postList[topic]);
	}
}

function makeChoise(topic)
{
	var author = topic.getElementsByClassName("author");
	if(author[0].firstChild.innerHTML == "techno-kitchen")
	{
		topic.style.display = "none";
	}
}