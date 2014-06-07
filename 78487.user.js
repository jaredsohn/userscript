// ORIGINAL BY carlosr at What.cd
// Modified by trza for ptp.
// ==UserScript==
// @name           PassThePopcorn Hide Links
// @namespace      https://PassThePopcorn.org
// @description    Based off Carlosr's script @ what, I've modified it a bit further allowing you to hide many options of links
// @include        http*://passthepopcorn.me/*
// ==/UserScript==

//REMOVE COMMENTS IN FRONT OF THE 'Target[#]' to hide it.
//example: if you want all of them shown, comment all the 'targets' out.
//if you want all of them hidden, uncomment them all.

(function() {
var target = document.getElementById('userinfo_stats').getElementsByTagName('li'); /* User stats */

/* Hide "stats" */
//target[3].style.display = "none"; // REQUIRED
//target[2].style.display = "none"; // RATIO
//target[1].style.display = "none"; // DOWNLOAD
//target[0].style.display = "none"; // UPLOAD

var target2 = document.getElementById('userinfo_minor').getElementsByTagName('li'); /* User stats */

/* Hide "minor" stuff */
//target2[6].style.display = "none"; //friends
//target2[5].style.display = "none"; //comments
//target2[4].style.display = "none"; //subscriptions
//target2[3].style.display = "none"; //notifications
//target2[2].style.display = "none"; //bookmarks
//target2[1].style.display = "none"; //uploads
//target2[0].style.display = "none"; //inbox

var target3 = document.getElementById('userinfo_major').getElementsByTagName('li'); /* User stats */

/* Hide "Major" lists */
//target3[3].style.display = "none"; //Donate
//target3[2].style.display = "none"; //Bonus Points
//target3[1].style.display = "none"; //Invite
//target3[0].style.display = "none"; //UPload

})();