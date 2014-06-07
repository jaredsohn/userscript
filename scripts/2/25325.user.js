// ==UserScript==
// @name           MySpace - Faster Commenting
// @namespace      CstrzRock (cstrzrock@gmail.com)
// @description    Automatically places the cursor in the comment box when the comment page loads. It also selects the Post Comment Button automatically when you reach the comment confirmation page except for when a CAPTCHA appears, in which case the cursor is automatically placed in the CAPTCHA input box. There is also an option that allows the Post Comment button on the Confirm Comment page to be clicked automatically.
// @include        http://comment.myspace.com*
// ==/UserScript==

if (
	document.getElementById("ctl00_cpMain_UserWriteCommentsControl_commentTextBox")
        )
   {	document.getElementById("ctl00_cpMain_UserWriteCommentsControl_commentTextBox").focus();
};

if (
	document.getElementById("ctl00_cpMain_UserWriteCommentsControl_captcha_captchaResponseTextBox") 
        )
   {	document.getElementById("ctl00_cpMain_UserWriteCommentsControl_captcha_captchaResponseTextBox").focus();
}
// the default option selects the comment button on the comment confirm screen and does not click
 else {	document.getElementById("ctl00_cpMain_UserWriteCommentsControl_ConfirmPostButton").focus();
// the other option lets the comment button on the comment confirm screen be clicked automatically
// IF YOU WANT THE BUTTON CLICKED AUTOMATICALLY
// PLACE TWO FRONTSLASHES IN FRONT OF THE ELSE LINE ABOVE
// AND REMOVE THE TWO FRONTSLASHES FROM THE ELSE LINE BELOW
// else {	document.getElementById("ctl00_cpMain_UserWriteCommentsControl_ConfirmPostButton").click();
};
