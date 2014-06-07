// ==UserScript==
// @name           Roblox Signature bot V.2
// @namespace      iMarshall
// @description    Automatically adds a signature to Forum Posts and messages on Roblox.
// @include        *.roblox.com*
// @version        1.07
//
// @history        V1.01 Added a feature that automatically posts the previous message, similar to the Origional Roblox messaging system.
// @history        V1.02 Added friend requests to the mix. Now when sending friend requests, it will add a default message.
// @history        v1.03 Added auto signature to commenting on games and gears.
// @history        v1.04 Some symbols are edited to now automatically change the code to the symbol. ( & instead of &amp; )
// @history        v1.05 Updated my sig p; )
// @history        v1.06 Updated my sig again p; )
// @history        v1.1 I decided that I updated my siggy so much it deserved to be 1.1
// ==/UserScript==
(function() {






/* Set defaults. The signature variable is what will post as your signature
for everything. FRequest is the default message that will write itself into
the fried request message box. You can customize it however you'd like. */

var signature = "\n\n6 feet from the edge!";
var FRequest = "Be mi friend plzzzzz"





/* Below is the actual scripting. Only edit it if you know what you're doing. */


/* Are you replying to a message? */
//document.body.innerHTML = document.body.innerHTML.replace(/<\/body>/gi, "<div style='text-align:center'><a href='http://userscripts.org/scripts/show/107127' target='_blank'><img src='http://i1007.photobucket.com/albums/af196/hawk1242/RBXAutoSigBanner.png' alt='Photobucket'></a></div></body>"); 
/*For some reason this line is breaking the reply button, etc. I'll look into this :l */
if(document.getElementById("pBody"))
{
var replace = document.getElementById('pBody').innerHTML.replace(/<br>/gi, "\n");
replace = replace.replace(/&amp;/gi, "&"); /* Grarararararara. I got tired of  */
replace = replace.replace(/&lt;/gi, "<");  /* These symbols showing up as 'web */
replace = replace.replace(/&gt;/gi, ">");  /* code', so it replaces thems now. */
document.getElementById('ctl00_ctl00_cphRoblox_cphMyRobloxContent_rbxMessageEditor_txtBody').defaultValue = signature + "\n\nOriginal Message:\n-----\n" + replace;
}
/* Are you writing your own message? */
else if(document.getElementById('ctl00_ctl00_cphRoblox_cphMyRobloxContent_rbxMessageEditor_txtBody'))
{
document.getElementById('ctl00_ctl00_cphRoblox_cphMyRobloxContent_rbxMessageEditor_txtBody').defaultValue = signature;
}
/* Are you posting on the forums? */
else if(document.getElementById('ctl00_cphRoblox_Createeditpost1_PostForm_PostBody'))
{
document.getElementById('ctl00_cphRoblox_Createeditpost1_PostForm_PostBody').defaultValue = signature;
}
/* Are you sending a Friend Request? */
else if(document.getElementById('ctl00_cphRoblox_rbxMessageEditor_txtBody'))
{
document.getElementById('ctl00_cphRoblox_rbxMessageEditor_txtBody').defaultValue = FRequest + signature;
}
/* Are you leaving a comment on a gear or place? */
else if(document.getElementById('ctl00_cphRoblox_TabbedInfo_CommentaryTab_CommentsPane_NewCommentTextBox'))
{
document.getElementById('ctl00_cphRoblox_TabbedInfo_CommentaryTab_CommentsPane_NewCommentTextBox').defaultValue = signature;
}
/* Alpha Phase - Currency Trading system */
else if(document.getElementById('ctl00_cphRoblox_HaveAmountTextBox'))
{
/* This gets your current Tix and R$ */
var tix = document.getElementById('ctl00_BannerAlertsLoginView_BannerAlerts_Authenticated_rbxBannerAlert_rbxAlerts_TicketsAlertCaptionHyperLink').innerHTML.replace(/,/g, "");
var robux = document.getElementById('ctl00_BannerAlertsLoginView_BannerAlerts_Authenticated_rbxBannerAlert_rbxAlerts_RobuxAlertCaptionHyperLink').innerHTML.replace(/,/g, "");
/*If you have R$, it adds in that value into the box instead of Tix*/
if(robux > 0)
{
document.getElementById('ctl00_cphRoblox_HaveAmountTextBox').defaultValue = robux;
}
/* This stops the 'Trades must be over 20 Tix' error from popping up if you don't have enough. */
else if(tix < 20)
{
document.getElementById('ctl00_cphRoblox_HaveAmountTextBox').defaultValue = 20;
}
/* If you don't have R$, and have more than 20 tix, it will input however many Tix you have */
else
{
document.getElementById('ctl00_cphRoblox_HaveAmountTextBox').defaultValue = tix;
}
};
/* End of Currency Trading */

})();