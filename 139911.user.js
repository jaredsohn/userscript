// ==UserScript==
// @name        trim input value on blur
// @description remove leading and trailing whitespace from updated text input
// @namespace   http://eldar.cz/myf/
// @include     *
// @version     1
// ==/UserScript==
"use strict";

if(!String.prototype.trim)
{	var ws = /\s/
;	var wss = /^\s\s*/
;	var nilstr = ''
;	String.prototype.trim = function ()  
	{	var str = this.replace(wss,nilstr)
	;	var i = str.length
	;	while(ws.test(str.charAt(--i)))
	;	return str.slice(0,i+1)
	}
};

var inps =
	document.querySelectorAll
	?	document.querySelectorAll('input[type="text"],input:not([type])')
	:	[]; // shall we?
var inp;
var i = -1;
while(inp = inps[++i])
{	inp.addEventListener
	(	'blur'
	,	function()
		{	var trimed = this.value.trim()
		;	if ( trimed != this.value ) // && confirm('Trimable. Trim?') 
				this.value = trimed
		}
	,	true
	)
};
