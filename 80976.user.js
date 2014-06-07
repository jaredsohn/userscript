// ==UserScript==
// @name           RCConfirmer
// @namespace      elie
// @description    Confirm send in RC
// @include        http://apps.facebook.com/restaurantcity/*
// ==/UserScript==

//self.setTimeout(function() {self.location = "http://www.facebook.com/reqs.php";}, 700);
var sendBackButton = document.getElementsByName('sendit')[0];
//var sendBackButton = document.getElementsByClassName('inputbutton request_form_submit')[0].firstChild;
if (sendBackButton) {
	alert('1');
	//fireEvent(sendBackButton, 'click');
	////fireEvent(document.getElementsByClassName('inputbutton request_form_submit')[0].firstChild, 'click');
}
else {
	alert('2');
	//self.setTimeout(function() {self.location = "http://www.facebook.com/reqs.php";}, 2000);
	//self.setTimeout(function() {self.location = "http://www.facebook.com/reqs.php#confirm_43016202276_0";}, 1000);
}

function fireEvent(element, event)
{
	if (document.createEventObject)
	{
		// dispatch for IE
		var evt = document.createEventObject();
		return element.fireEvent('on' + event, evt)
	}
	else
	{
		// dispatch for firefox + others
		var evt = document.createEvent("HTMLEvents");
		evt.initEvent(event, true, true ); // event type,bubbling,cancelable
		return !element.dispatchEvent(evt);
	}
}
