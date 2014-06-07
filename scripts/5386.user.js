// ==UserScript==
// @name           MySpace - Remove extra RE:
// @description    Takes out the RE:
// @include        http://messaging.myspace.com/index.cfm?fuseaction=mail.reply*
// ==/UserScript==

var b = document.getElementById("ctl00_ctl00_Main_Main_sendMessageControl_subjectTextBox");
var tempValue = b.value;

while(tempValue.indexOf("RE: ") >= 0)
{
    tempValue = tempValue.replace("RE: ","");
}

document.getElementById("ctl00_ctl00_Main_Main_sendMessageControl_subjectTextBox").value = "RE: " + tempValue;