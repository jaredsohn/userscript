// ==UserScript==
// @name        mmmturkeybacon Add Contact Link To Turkopticon
// @author      mmmturkeybacon
// @description Adds a link to the requester's mturk contact form 
//              to Turkopticon reviews.
// @namespace   http://userscripts.org/users/523367
// @match       http://turkopticon.ucsd.edu/*
// @require     http://code.jquery.com/jquery-latest.min.js
// @downloadURL http://userscripts.org/scripts/source/482049.user.js
// @updateURL   http://userscripts.org/scripts/source/482049.meta.js
// @version     1.0
// @grant       none
// ==/UserScript==

var subject = 'Regarding+Amazon+Mechanical+Turk+HIT';

$('a[href^="/reports?id="]').each(function()
{
    var requesterId = $(this).attr('href').replace("/reports?id=","");
    $(this).parent().parent().append('<br><a href="https://www.mturk.com/mturk/contact?subject='+subject+'&requesterId='+requesterId+'">Contact Requester</a>');
    //var requesterName = $(this).text().trim().replace(/ /g,'+');
    //$(this).parent().parent().append('<br><a href="https://www.mturk.com/mturk/contact?subject='+subject+'&requesterId='+requesterId+'&requesterName='+requesterName+'">Contact Requester</a>');
});

