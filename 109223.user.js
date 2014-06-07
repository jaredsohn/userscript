// ==UserScript==
// @name           Hungarian quotesign
// @namespace      Bohocmasni
// @include        *
// kicsereli a ,,-t „-re
// ==/UserScript==

function KeyCheck(e)
{
	if (e.keyCode == 188) 
	{ setTimeout(runa,25); }

	if (e.keyCode == 222) 
	{ setTimeout(runf,25); }
}

function runa() 
{

	tomb = document.getElementsByTagName('textarea');
	for(i=0; tomb[i]; i++)
	{
		str=tomb[i].value;
		tomb[i].value=str.replace(",,","„");
	}
}

function runf() 
{

	tomb = document.getElementsByTagName('textarea');
	for(i=0; tomb[i]; i++)
	{
		str=tomb[i].value;
		tomb[i].value=str.replace('"','”');
	}
}



window.addEventListener('keydown', KeyCheck, true);
