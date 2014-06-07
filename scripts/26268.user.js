// ==UserScript==
// @name           woot! auto buy it
// @namespace      vpoet
// @description    Automatically presses, 'buy it,' button for *.woot! orders.
// @include        https://*.woot.com/Member/OrderConfirmation.aspx
// ==/UserScript==
// adapted from auto select 3 bocs by njkrut

var doMyPostBack = function()
{
	if(theForm && buyitbutton)
	{
		eventTarget.value = 'ctl00$ctl00$ContentPlaceHolderMainContent$ContentPlaceHolderSecondaryContent$BuyButton';
		eventArgument.value = '';
		theForm.submit();
	} else {
		alert('Could Not Perform');
	}
}

var eventTarget = document.getElementById('__EVENTTARGET');
var eventArgument = document.getElementById('__EVENTARGUMENT');
var buyitbutton = document.getElementById('ctl00_ctl00_ContentPlaceHolderMainContent_ContentPlaceHolderSecondaryContent_BuyButton');
var theForm = document.getElementById('aspnetForm');


if (buyitbutton)
doMyPostBack();

