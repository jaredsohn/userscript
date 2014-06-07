// ==UserScript==
// @name           NCIX Newsletter Reward Points Auto-Reclaim
// @version        0.15
// @description    Immediately enters specified email when an NCIX Newsletter Reward page is detected.
// @include 	   http://secure1.ncix.com/newsletterrewards.cfm?claimno=*
// @namespace      http://scripts.lewisl.net/
// ==/UserScript==

function IsNCIXRewardPage(url)
{
	return ( url.substr(0,54) == "http://secure1.ncix.com/newsletterrewards.cfm?claimno=" );
}

(function() {

if( IsNCIXRewardPage( document.location.href ) )
{
	//Replace this email with your own
	var userEmail = "your@email.com";
	
	var emailTextBox = document.getElementsByName("email");
	emailTextBox[0].value = userEmail;
	
	var submitButton = document.getElementsByName("submit");
	submitButton[0].click();
}

})();