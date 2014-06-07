// ==UserScript==
// @name           Dont Delete All e-sim Alerts
// @namespace      http://userscripts.org/users/467084
// @version        0.3
// @description    Hides the "Delete All" button on the e-sim notification page
// @include        http://e-sim.org/notifications.html*
// @match          http://e-sim.org/notifications.html*
// ==/UserScript==

function hideDeleteAllButton()
{
	var forms = document.getElementsByTagName("form");
	for (var it in forms)
	{
		if (forms[it].method.toLowerCase()=="post" && forms[it].getAttribute("action")=="notifications.html")
		{
			var formElements = forms[it].elements;
			for (var ij in formElements)
			{
				if (formElements[ij].type=="submit" && formElements[ij].value=="Delete All")
				{
					formElements[ij].style.visibility="hidden";
				}
			}
		}
	}
}

hideDeleteAllButton();