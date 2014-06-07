// ==UserScript==

// @name           MySpace - Faster Messaging

// @namespace      CstrzRock (cstrzrock@gmail.com)

// @description    This script auto clicks the reply button while viewing a message and automatically places the cursor in the CAPTCHA box when it is necessary to enter one.

// @include        http://messaging.myspace.com/index.cfm?fuseaction=mail.readmessage&*

// @include        http://messaging.myspace.com/index.cfm?fuseaction=mail.reply&*

// @include        http://messaging.myspace.com/index.cfm?fuseaction=mail.message&*
// @exclude        *&type=Saved*

// ==/UserScript==



if (

	document.getElementById("ctl00_ctl00_ctl00_cpMain_cpMain_messagingMain_ReadMessage_ReplyButton")

)

{	document.getElementById("ctl00_ctl00_ctl00_cpMain_cpMain_messagingMain_ReadMessage_ReplyButton").click();

};



if (

	document.getElementById("ctl00_ctl00_ctl00_cpMain_cpMain_messagingMain_SendMessage_captcha_captchaResponseTextBox") 

)

{	document.getElementById("ctl00_ctl00_ctl00_cpMain_cpMain_messagingMain_SendMessage_captcha_captchaResponseTextBox").focus();

};

