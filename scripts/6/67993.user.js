// ==UserScript==
// @name           Pickjack Bot
// @namespace      none xD
// @description    A pickjack bot? That sorta fails horribly? xD
// @include           http://www.pickjack.com/take_10.php
// ==/UserScript==

inputs = document.getElementsByTagName("input");


for(i=0;i<inputs.length;i+=Math.floor(Math.random()*2)+1)
{
	if(inputs[i].type=="radio")
	{
		inputs[i].checked=true;
	}
	
}



for(i=0;i<inputs.length;i++)
{
	if((inputs[i].type.toLowerCase()=="image"))
	{
		next = inputs[i];
		break;
	}
}

next.focus();
next.click();
