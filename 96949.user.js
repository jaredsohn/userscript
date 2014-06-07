// ==UserScript==
// @name           redString
// @namespace      diary.ru
// @include        http://*diary.ru/*
// ==/UserScript==

function gID(id)
{
	return document.getElementById(id);
}

function redString()
{
	message = gID('message');
	if (message != null)
	{
		message.value = '<div style="display:inline;text-align:left;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>' + message.value;
		message.value = message.value.replace(/\n/g,'\n<div style="display:inline;text-align:left;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>');
	}
}

function redStringClear()
{
	message = gID('message');
	if (message != null)
	{
		message.value = message.value.replace(/<div style="display:inline;text-align:left;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<\/div>/g,"");
	}
}

/*Key Pressing Code*/
var isAlt = false;

function clicking(e) 
{
	var code;
	if (!e) var e = window.event;
	if (e.keyCode) code = e.keyCode;
	else if (e.which) code = e.which;
	if (code == 18)
		isAlt = true;
	var character = String.fromCharCode(code);
	if(character == 'R' && isAlt)
		redString();
	if(character == 'Q' && isAlt)
		redStringClear();
}
function keyUpper(e) 
{
	if (!e) var e = window.event;
	if (!e.altKey)
		isAlt = false;	
}

document.onkeydown = clicking;
document.onkeyup = keyUpper;
/*End*/