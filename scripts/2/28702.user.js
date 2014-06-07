// ==UserScript==
// @name          Dell Chat Online
// @namespace     http://www.glyff.net/
// @description   Fixes usability issues with Dell Chat Online.
// @include       http://support.dell.com/support/topics/global.aspx/support/chat/hardware_chat*
// @include       https://chat*.*.dell.com/netagent/scripts/srvgate.dll*
// ==/UserScript==

var elements;

// Remove the target attribute of the form tag so it will not open in a new window
elements = document.getElementsByName("formSupportRequestEnterTag");
if (elements.length == 1)
{
	var form = elements[0];
	form.target = null;
}

// Change the href of the submit button so myOpenWindow is not called and a new window is not opened
var submitLink = document.getElementById("ctl23");
if (submitLink)
{
	submitLink.href = "javascript:document.formSupportRequestEnterTag.submit();";
}

// Change the frameset tag to only have one frame taking up the entire space
var frameset = document.getElementById("NAFRAMESET");
if (frameset)
{
	frameset.rows = "*";
}

// Remove the top frame from the frameset
elements = document.getElementsByName("PushFrame");
if (elements.length == 1)
{
	var pushFrame = elements[0];
	pushFrame.parentNode.removeChild(pushFrame);
}
