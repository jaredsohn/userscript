// ==UserScript==
// @name Kongregate Chat /r Function
// @include http://www.kongregate.com/games/*
// @require http://userscripts.org/scripts/source/49229.user.js
// ==/UserScript==

// Nabb, 1st May 2009: nabb.trap17.com
// fixed? June 7th

// This script will add the /r feature, a shorthand for reply to whisper.
// When '/r ' is typed, it will be replaced with '/w name ' where name is
// username of the last user who sent a message. In the event that you
// have no received any messages, it will be replaced with '/w '.

setTimeout("nL=0;nFE((z='ChatDialogue.prototype.')+'receivedPrivateMessage',x='dMessage(',x+'nL=');nFA(z+'onKeyPress',\"(z=this._input_node).value=='/r'&&a.keyCode==32&&(z.value='/w'+(nL?' '+nL:''))\")",100)