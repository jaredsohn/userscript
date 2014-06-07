// ==UserScript==
// @name        pixeljointWider
// @namespace   http://felixnemis.mooo.com
// @description allow more horizontal room for pixel art
// @include     http://www.pixeljoint.com/*
// @version     1
// @grant       none
// ==/UserScript==

var wd = false;

function wide()
{
	var el = document.querySelector("#container");
	el.style.width = "100%";

	//var el = document.querySelector("#container div");
	//el.style.width = "100%";
}

function normal()
{
	var el = document.querySelector("#container");
	el.style.width = "";
}

function keyHandle(event)
{
	if (event.keyCode === 190)
	{
		if (wd)
		{
			wd = false;
			normal();
		}
		else
		{
			wd = true;
			wide();
		}
	}
}

document.addEventListener("keydown", keyHandle);

normal();