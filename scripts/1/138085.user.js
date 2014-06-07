// ==UserScript==
// @name Show Password For every Webpage
// @namespace PasswordShower
// @version 1.0
// @description Show all the password field available in the webpage
// ==/UserScript==


(function()
{
	var inp=document.getElementsByTagName('input');
	var len=inp.length;
	for(var i=0;i<len;i++)
	{
		if(inp[i].getAttribute('type')=='password')
		{
			inp[i].setAttribute('type','text');
		}
	}

})();
