// ==UserScript==

// @name           Notify me of dead links checker

// @namespace      Yawn.

// @include        http://www.warez-bb.org/posting.php*

// ==/UserScript==

var allinput = document.getElementsByTagName('input');
for(i=0;i<allinput.length;i++)
{
	if(allinput[i].getAttribute('name') == 'send_pm')
	{
		allinput[i].setAttribute('checked', 'checked')
	}
}