// JavaScript Document
// ==UserScript==
// @name           Праведный минусовальщик
// @author         Author rin
// @namespace      nefart
// @description    
// @include        http://nefart.ru/*
// @version        0.01
// ==/UserScript==

var exec = false;

var w = window.wrappedJSObject || window;

w.addEventListener('DOMContentLoaded', minusovator, true);
w.addEventListener('load', minusovator, true);

savevotec = [];

function restorevotec()
{
    for(var i in savevotec)
    {
	var postrights = document.getElementById(i);
	postrights.innerHTML = savevotec[i];
    }
}

function minusovator()
{
    if (exec)  
        return;
	
    exec = true;
    try
    {
        var postrights = document.getElementsByClassName("postright");

        for(var i=0; i<postrights.length; i++)
        {
            if (postrights[i].id.indexOf('votec') != -1)
            {
		var minusid = postrights[i].id.split('votec')[1];
		savevotec[postrights[i].id] = postrights[i].innerHTML;
		votecomm(minusid, 'minus');
            }
        }

	setTimeout("restorevotec()", 5000);
	setTimeout("restorevotec()", 7000);
	setTimeout("restorevotec()", 14000);
	setTimeout("restorevotec()", 21000);
	setTimeout("restorevotec()", 40000);
    }
    catch(error)
    {

    }
}
