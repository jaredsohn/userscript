// ==UserScript==
// @name           15Solver
// @namespace      KoLCtH
// @include        file:///D:/zips/games/KoL/js/testing%20pages/generate15.php
// @include        http://*kingdomofloathing.com/generate15.php*
// ==/UserScript==
var TOP = window.top.wrappedJSObject
if (!TOP.solution15)
{
	var moves = []
	var x = 0, y = 0
	$('img[alt]', true).forEach(function (a) 
	{
		var alt = a.getAttribute('alt').match(/(\d+).(\w)/)
		moves[alt[1]-1] = alt[2]
	})
	moves.forEach(function (h, i)
	{
		switch (h)
		{
			case 'r': x++; break;
			case 'b': y++; break;
			case 'l': x--; break;
			case 't': y--; break;
		}
		moves[i] = [x, y]
	})
	moves.pop()
	TOP.solution15 = moves
}
move()

function move()
{
	var pwd = $('a').href.match(/pwd=(\w+)/)[1]
	var nextMove = TOP.solution15.shift()
	if (!TOP.solution15[0])
		TOP.solution15 = null
	setTimeout(function (){window.location.href = 'http://' + window.location.host + '/generate15.php?x=' + nextMove[0] + '&y=' + nextMove[1] + '&action=move&pwd=' + pwd}, 2000)
}

function $(selector, all)
{
	if (all)
		return Array.slice.call(document.querySelectorAll(selector))
	else
		return document.querySelector(selector)
}
