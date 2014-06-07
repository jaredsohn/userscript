// ==UserScript==
// @name           Reply-Timer
// @namespace      http://www.userscripts.org/users/430392
// @description    Gives a timeout reminder.
// @include        *.ponychan.net/chan/*/res/*.html
// ==/UserScript==
var reply;
var c = 15;
var t;
var input = document.getElementsByTagName("input");
for (var i=0, max=input.length; i < max; i++)
	{
		if (input[i].value == 'Reply')
		{
			reply = input[i];
		}
	}
function countDown(e)
{
	if (c!=0)
	{
		e.value = "Reply (" + c + ")";
		c--;
		t = setTimeout(countDown,1000,e);
	}
	else
	{
		e.value = 'Reply';
	}
	
}
countDown(reply);