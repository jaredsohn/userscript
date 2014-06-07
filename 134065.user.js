// ==UserScript==
// @name           badoo chat lite
// @namespace      flifoune
// @include        http://badoo.com/connections/message/*
// ==/UserScript==
//

function removeBloat()
{
	var topHeader = document.getElementById('interlocutor');
	topHeader.style.display = 'none';
	var typeBox = document.getElementById('type');
	typeBox.style.background = '#ffffff';
	typeBox.style.margin = '0px';
	var messageBox = document.getElementById('messages');
	messageBox.style.background = '#ffffff';
	messageBox.style.margin = '0px';
	var userList = document.getElementById('userlist');
	userList.style.display = 'none';
	var correspondence = document.getElementById('correspondence');
	correspondence.style.top = '0px';

}

removeBloat();
