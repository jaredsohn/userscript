// ==UserScript==
// @name          Lecto-Session
// @author        Jonas Hansen
// @version       1.0
// @namespace     http://www.meinertz.org/
// @description   Forlænger automatisk din session på lectio
// @include       https://www.lectio.dk/lectio/*
// ==/UserScript==

(
function()
{
	if (typeof(unsafeWindow.sessionTimeout_CreateFrameProlonge) == "function")
	{
		unsafeWindow.sessionTimeout_CreateFrameProlonge = function(url)
		{
			url = document.location.href;
			var urllower = url.toLowerCase();

			var i = urllower.indexOf('/lectio/');
			var j = urllower.indexOf('/', i+8);
			var baseurl = url.substring(i, j);
			
			var xmlhttp = unsafeWindow.createXmlHttp();
			xmlhttp.open('GET', baseurl + '/login_check.aspx?JustPing=1', false);
			xmlhttp.send('');
			
			unsafeWindow.sessionTimeout_SetLatestConnectTime();
			unsafeWindow.sessionTimeout_StartDetection();
		}
	}
}
)();