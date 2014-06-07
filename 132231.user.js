// ==UserScript==
// @name           Jappy Green Garden - No Water/Dung Notification
// @namespace      jappy
// @developer      Arno Löwe - http://www.lion-design.com
// @version        0.1
// @description    Benachrichtigt bei fehlendem Wasser oder Dünger.
// @include        http://www.jappy.*/user/*/garden/garden
// ==/UserScript==

var originalTitel= unsafeWindow.document.title;
var notification, readyBefore=0;

with (unsafeWindow)
{
	setInterval(function()
	{
		var ranges= document.getElementsByClassName("rangeG3");
		var ready= 0;

		for( var i= 0, len= ranges.length; i < len; i++)
		{
			if(ranges[i].parentNode.childNodes.length > 3)
			{
				ready++;
			}

		}
		if(ready>0)
		{
			if(window.webkitNotifications)
			{
				if(readyBefore!=ready)
				{
					notification.close();
					notification = window.webkitNotifications.createNotification(false, ready + ' Feld(er) benötigt Wasser oder Dünger!', '');
					notification.show();
				}
			}
		}
		else
		{
			if(window.webkitNotifications)
			{
				notification.close();
			}
		}
		readyBefore=ready;
	}, 1000);

	if(window.webkitNotifications.checkPermission() == 0)
	{
		notification= window.webkitNotifications.createNotification(false, 'Felder benötigen Wasser oder Dünger.', '');
	}
	else
	{
	    window.webkitNotifications.requestPermission();
	}
}