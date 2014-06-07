// ==UserScript==
// @name            Voting
// @namespace       
// @description     Rock.Lviv.Ua Voting. Update: 2006-02-07
// @include         http*://www.rock.lviv.ua/*
// ==/UserScript==
// My first script

function br()
{
	return true;
}

document.forms['quest'].elements[0].checked = true;
document.forms['quest'].onsubmit=br;
document.forms['quest'].submit();