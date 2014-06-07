// ==UserScript==
// @name           Re-Add SW TOR Cancel Subscription Button
// @namespace      http://userscripts.org/users/didero
// @author         didero
// @description    Since EA removed the button to cancel your subscription for users whose sub is about to auto-renew, I thought it'd be a good idea to add it back. I'm not exactly sure where the original button was, so I added it at the top of every page. If EA blocks the unsubscribe URL itself, this script won't change it though.
// @include        http://www.swtor.com/*
// @version        1.0
// ==/UserScript==

//*******CHOOSE ONE OF THESE BUTTONS BY REMOVING THE SLASHES FROM THE ONE YOU WANT, AND ADDING IT TO THE OTHER ONE
//*******Or even change it for the button you prefer. If you know the URL of the official image, you can edit it in too
//Blue button
//var cancelButtonImage = 'http://img210.imageshack.us/img210/4985/buttoncancelsubcustom.gif';
//Red Button
var cancelButtonImage = 'http://img407.imageshack.us/img407/1359/buttoncancelsubcustomre.gif';
//***CHANGE THE URL IF NECESSARY
var cancelUrl = 'http://account.swtor.com/user/subscription/Cancel';

/***DON'T EDIT BELOW THIS LINE, UNLESS YOU KNOW WHAT YOU'RE DOING****/

//First create the link itself
var cancelLink = document.createElement('a');
cancelLink.title = 'Cancel Subscription';
cancelLink.href = cancelUrl;

//Then make it a nice image, to match the rest of the site
var cancelImage = document.createElement('img');
cancelImage.src = cancelButtonImage;
cancelImage.border = '0';
cancelImage.alt = 'Cancel Subscription';
cancelImage.setAttribute('style', 'top: 7px; margin-top: 7px;');
cancelLink.appendChild(cancelImage);

//Finally, add the whole thing to the header (I don't have an account, so I don't know how to add it to the usual account controls)
var newDiv = document.createElement('div');
newDiv.id = 'cancel-subscription';
newDiv.appendChild(cancelLink);
var headerDiv = document.getElementById('headerContent');
if (headerDiv) headerDiv.insertBefore(newDiv, headerDiv.firstChild);