// ==UserScript==
// @name          Yahoo Mail Ad Removal
// @namespace     http://mtk.co.il/moppy
// @description	  removes the ads Motty Katan(c) Beta version. 06-02-2006 last updated 23/12/13
// @include       /^https?://.*\.mail\.yahoo\.com/neo/launch.*$/
// ==/UserScript==
//Change Log:
//10/02/06: removed duplicate include url.
//24/02/06 did I remove soething I shouldn't? or yahoo added more ads?
//anyhow added showLetter url to the include.
//17/03/06 BugFixed: attachments were hidden as well.
//26/03/06 iframe are now hidden by this script. changed "us.f516" to *
//         in the include urls just in case
//27/03/06 corrected the login url.(after session expired-relogin the url was without a questionmark)
//31/03/06 added compose url
//15/04/06 added url of Yahoo Mail Beta + removed iframe=hidden since it's deprecated
//27/04/06 added url for folders
//15/09/07 removed ugly code that was very noturious in making html emails and more disappear(Yahoo Clasic)
//         Yahoo Mail Beta support is now really supported all ads are removed.
//16/09/07 Yahoo Mail Beta added another iframe containing ads to hide.
//21/09/07 Yahoo Mail Beta expand both folder space and messages space automaticly
//18/09/09 Yahoo Mail Beta all is well, just the condition that I've used to detect the beta version
//         stopped working. I'm sorry. better condition. Yahoo mail classic doesn't work (code part A)
//18/10/09 removed Yahoo mail classic old code till further research. That fixed the reported problem with the attach button. Thanks for all the comments.
//16/02/10 Yahoo! did some changes to their code. New code had to be inserted. Happy Mardi Gras!
//19/02/10 Resize - dealt with. The pane(paper letter-I belive it's called in English) for chosing a background/theme for the message, now pops
//         over in the right side (instead of the left). much cleaner code. Publicity after sending a message
//         is now hidden too. Thanks for bringing it to my attention. Calender is still annoying.
//20/02/10 Scrollbar/flags not clickables bug fixed. Now the width is more dynamic and allows
//         stationary and search result to have their side and not to float over.
//20/02/10 Dealt with edge scenarios of switching between tabs (messages/search results).
//24/03/10 Dealt with little arrow for the publicity bar, showing over the messages
//18/05/10 Dealt with the new embed publicities.
//19/03/11 Added newest Yahoo! version NEO support - one line :)
//14/07/12 Yahoo! has a new (bugs included) version. As for me, currently I can't see tabs for messages
//         GM disactivated+cookies deleted. Anyhow, since the oneliner no longer work (for me at least).
//         I dived into their code and released a patch
//14/07/12 I apologise, the bug is not in Yahoo! or at least no more. Had some troubles with the script.
//         small bug, created an error which created differents malfunctions. 
//         Corrected the event with anonymous function, currently just a PATCH. using 2 seconds timeout.
//14/07/12 Patch#3: on message removal deal with the ad on the side bar.
//21/12/13 Till more digging in the code, applying a css temp solution
//21/12/13 Digged the code... Bye bye ads using javascript of the yui
//23/12/13 Updated include urls, using regEx to include also https 

//kill events
//unsafeWindow.yui.on("checkmail:succeeded",function deleteAds(){
unsafeWindow.NeoConfig.noDarla=1;
unsafeWindow.NeoConfig.hasAds=0;
document.body.className += " withoutad";