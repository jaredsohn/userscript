// ==UserScript==
// @name        mmmturkeybacon Enhanced HIT Information Capsule
// @author      mmmturkeybacon
// @description Changes the requester name to a link that searches
//              mturk for HITs by the requester. Adds a link* to the
//              average Turkopticon ratings for that requester. Adds
//              a contact link* for the requester. Displays 
//              hitAutoAppDelayInSeconds in a human readable format.
//              *If the requesterId can't be found, the link will
//              be to the Turkopticon search results for the requester
//              name and the contact link will be missing the requesterId
//              so it must be added by hand to the end of the contact URL.
// @namespace   http://userscripts.org/users/523367
// @match       https://www.mturk.com/mturk/accept*
// @match       https://www.mturk.com/mturk/preview*
// @match       https://www.mturk.com/mturk/continue*
// @match       https://www.mturk.com/mturk/submit
// @match       https://www.mturk.com/mturk/return*
// @require     http://code.jquery.com/jquery-latest.min.js
// @downloadURL http://userscripts.org/scripts/source/292575.user.js
// @updateURL   http://userscripts.org/scripts/source/292575.meta.js
// @version     1.1
// @grant       none
// ==/UserScript==

// API http://api.turkopticon.istrack.in/multi-attrs.php?ids=
//var base = 'http://turkopticon.istrack.in'; // mirror

var base_TO_URL = 'http://turkopticon.ucsd.edu/';
var base_searchbar_URL = 'https://www.mturk.com/mturk/searchbar?selectedSearchType=hitgroups';

var isAccepted = $('input[type="hidden"][name="isAccepted"]').val();
if (isAccepted == 'false')
{
    var requesterId = $('input[type="hidden"][name="requesterId"]').val();
}
else
{
    // Continued HITs don't have the requesterId in a hidden input or
    // the return URL. We could search the iframe src URL for the
    // requesterId but it might not be there either, so it's not worth
    // the extra processing time required.    

    // try to get requesterId from return URL
    var $return_URL = $('a[href^="/mturk/return?groupId="]');
    if ($return_URL.length > 0)
    {
        var requesterId = $return_URL.attr('href').split(/[&=]/)[3];
    }
}

/*
 * Before a HIT is accepted - accept hitId, hitReview hitId, and assignmentId are all the same.
    <form name="hitForm" method="GET" action="/mturk/accept">
        <input type="hidden" name="hitId" value="2NFBAT2D5NQYTXEZWYAG9TYP37L73N">

    <form name="hitForm" method="POST" action="/mturk/hitReview" style="display:inline;">
        <input type="hidden" name="groupId" value="2FH56XBAT2D5TIXJBDUQ4JH8YYQ40Y">
        <input type="hidden" name="hitId" value="2NFBAT2D5NQYTXEZWYAG9TYP37L73N">
        <input type="hidden" name="assignmentId" value="2NFBAT2D5NQYTXEZWYAG9TYP37L73N">

 * After a HIT is accepted - submit hitId and assignmentId are the same but hitReview hitId is different.
 * hitReview hitId is the ID referenced when emailing a requester through the contact form and in bonus
 * emails.
    <form name="hitForm" method="POST" action="/mturk/submit">
        <input type="hidden" name="hitId" value="21DPHIT3HVWA1CH28LAQ6175AN4CKV">

    <form name="hitForm" method="POST" action="/mturk/hitReview" style="display:inline;">
        <input type="hidden" name="groupId" value="2FH56XBAT2D5TIXJBDUQ4JH8YYQ40Y">
        <input type="hidden" name="hitId" value="2ZRNZW6HEZ6OKWPSDRZ6DGUPIWPZPI">
        <input type="hidden" name="assignmentId" value="21DPHIT3HVWA1CH28LAQ6175AN4CKV">
*/

var hitReview_hitId = $('form[name="hitForm"][action="/mturk/hitReview"]').children('input[name="hitId"]').val();
var requesterName_node = $('a[id="requester.tooltip"]:contains("Requester:")').parent().next();
var requesterName = requesterName_node.text().trim();
var requesterName_plus = requesterName.replace(/ /g, '+');


if (requesterId)
{
    var searchbar_URL = base_searchbar_URL+'&requesterId='+requesterId;
    var searchbar_link = '<a href="'+searchbar_URL+'" title="Search mturk by requesterId" target="_blank">'+requesterName+" ("+requesterId+")"+'</a>';
    
    var avg_TO_URL = base_TO_URL+'aves/'+requesterId;
    var avg_TO_link = '<a href="' + avg_TO_URL + '" title="Average of all Turkopticon ratings" target="_blank">Averaged Turkopticon Ratings</a>';
    //var contact_URL = 'https://www.mturk.com/mturk/contact?subject=Regarding+Amazon+Mechanical+Turk+HIT+'+hitReview_hitId+'&requesterId='+requesterId+'&requesterName='+requesterName_plus;
    var contact_URL = 'https://www.mturk.com/mturk/contact?subject=Regarding+Amazon+Mechanical+Turk+HIT+'+hitReview_hitId+'&requesterName='+requesterName_plus+'&requesterId='+requesterId;
    var contact_link = '<a href="'+contact_URL+'" title="Contact the Requester of this HIT" target="_blank">Contact Requester</a>';
    var link_row_html = avg_TO_link+'&nbsp;&nbsp;'+contact_link;
}
else
{
    var searchbar_URL = base_searchbar_URL+'&searchWords='+requesterName_plus;
    var searchbar_link = '<a href="'+searchbar_URL+'" title="Search mturk for requester name" target="_blank">'+requesterName+'</a>';
    var search_TO_url = base_TO_URL+'main/search?query='+requesterName_plus+'&commit=Search';
    var search_TO_link = '<a href="'+search_TO_url+'" title="Search Turkopticon for requester name" target="_blank">Search for Requester on Turkopticon</a>';
    var contact_URL = 'https://www.mturk.com/mturk/contact?subject=Regarding+Amazon+Mechanical+Turk+HIT+'+hitReview_hitId+'&requesterName='+requesterName_plus+'&requesterId=';
    var contact_link = '<a href="'+contact_URL+'" title="Contact the Requester of this HIT.\nThe requesterId is unavailable. It must be added by hand to the end of the contact URL." target="_blank">Contact Requester (requesterId must be added by hand!)</a>';
    var link_row_html = search_TO_link+'&nbsp;&nbsp;'+contact_link;
}

requesterName_node.html(searchbar_link);


var hitAutoAppDelayInSeconds = $('input[type="hidden"][name="hitAutoAppDelayInSeconds"]').val();
//hitAutoAppDelayInSeconds = 2*(86400) + 1*(3600) + 2*(60) + 2;
//hitAutoAppDelayInSeconds = 2*(86400) + 2*(60) + 2;
//hitAutoAppDelayInSeconds = 2*(60) + 2;
//hitAutoAppDelayInSeconds = 0;

// time formatting code modified from http://userscripts.org/scripts/show/169154
var days  = Math.floor((hitAutoAppDelayInSeconds/(60*60*24)));
var hours = Math.floor((hitAutoAppDelayInSeconds/(60*60)) % 24);
var mins  = Math.floor((hitAutoAppDelayInSeconds/60) % 60);
var secs  = hitAutoAppDelayInSeconds % 60;

var time_str = (days  == 0 ? '' : days  + (days  > 1 ? ' days '    : ' day '))    +
               (hours == 0 ? '' : hours + (hours > 1 ? ' hours '   : ' hour '))   + 
               (mins  == 0 ? '' : mins  + (mins  > 1 ? ' minutes ' : ' minute ')) + 
               (secs  == 0 ? '' : secs  + (secs  > 1 ? ' seconds ' : ' second '));

if (hitAutoAppDelayInSeconds == 0)
{
    time_str = "0 seconds";
}

var requesterName_row = $('a[id="requester.tooltip"]:contains("Requester:")').parent().parent();
requesterName_row.after('<tr><td colspan="11" valign="top" nowrap="" align="left"><b>&nbsp;Automatically Approved:&nbsp;&nbsp;</b>'+time_str+'</td></tr>');
requesterName_row.after('<tr><td colspan="11" valign="top" nowrap="" align="left">&nbsp;'+link_row_html+'</td></tr>');
