// ==UserScript==
// @name        BairiPiyaAutoVoter
// @grant       Chetas Rao
// @include     http://www.tellytadka.net/*
// @version     3.0.0
// ==/UserScript==
inputs = document.getElementsByTagName("input");
var checkedyes = 0;
var radios=0;
var firstradio=0;
var foundradio=false;
var i=0;
for(i=0;i<inputs.length;i++)
{
	if(inputs[i].type=="radio")
		{
			if(!foundradio)
			{
				firstradio = i;
				foundradio = true;
			}
			radios++;
			if(inputs[i].value.toLowerCase()=="399")
			{
				inputs[i].checked = true;
				inputs[i].click();
				document.body.focus();
			}
			else
			{
				inputs[i].checked = false;
			}
		}
	
}
unsafeWindow.poll_vote(45);
setTimeout("location.reload(true);",3000);
