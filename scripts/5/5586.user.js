// ==UserScript==
// @name           MySpace - Add Other Send Button.
// @description    Will add send button below the photo of the person you are replying to.
// @include        http://messaging.myspace.com/index.cfm?fuseaction=mail.reply*
// @Version/Date    1.0.0 9-11-2006
// ==/UserScript==




var BodyText = document.getElementById("UserDataNode0");

    NewSubmit = document.createElement('input');
    NewSubmit.type = "submit";
    NewSubmit.onclick= "return DisableAndSubmit(document.aspnetForm, this, 'Sending...', document.getElementById('ctl00_ctl00_Main_Main_sendMessageControl_subjectTextBox'));";
    NewSubmit.value = '-Send-';

BodyText.parentNode.insertBefore(NewSubmit, BodyText);
