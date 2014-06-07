// ==UserScript==
// @name        mmmturkeybacon Turkopticon Ratings Standardizer for Forums
// @author      mmmturkeybacon
// @description Allows control over the way Turkopticon ratings are presented
//              on a forum. This script allows the user to show TO ratings images
//              while images are turned off for the forum, replace all the
//              of the different ratings symbols used with one symbol, show all
//              TO ratings as images only, and show all TO ratings as text only.
// @namespace   http://userscripts.org/users/523367
// @match       http://www.mturkgrind.com/threads/*
// @match       http://www.mturkgrind.com/showthread.php?*
// @match       http://mturkforum.com/showthread.php?*
// @require     http://code.jquery.com/jquery-latest.min.js
// @downloadURL http://userscripts.org/scripts/source/396262.user.js
// @updateURL   http://userscripts.org/scripts/source/396262.meta.js
// @version     0.93
// @grant       none
// ==/UserScript==

var SHOW_IMAGE_ONLY = true;
var SHOW_TEXT_ONLY = false;  // if SHOW_IMAGE_ONLY is true this is ignored
var REPLACE_SYMBOLS = false; // if SHOW_IMAGE_ONLY is true this is ignored

//var SYMBOL = '☢';
var SYMBOL = '#';

var TO_BAR_RATINGS_API_LINK = 'http://data.istrack.in/turkopticon.php?data=';

/* Replaces all links to image TO ratings with an image this is useful if you
 * are viewing the forum with images turned off.
 */
var $img_link = $('a[href^="'+TO_BAR_RATINGS_API_LINK+'"]');
if ($img_link.length > 0)
{
    $img_link.each(function()
    {
        $(this).after('<img src="'+$(this).attr('href')+'">');
        $(this).remove();
    });
}

/* Replaces all symbols used to represent text TO ratings to SYMBOL */
if (REPLACE_SYMBOLS == true && SHOW_IMAGE_ONLY == false)
{
    $('b:contains("TO Ratings:")').each(function()
    {
        var $symbols = $(this).nextUntil('a[href^="http://turkopticon.ucsd.edu/report?requester[amzn_id]="]').filter('font').children('b');
        $symbols.replaceWith('<b>'+SYMBOL+'</b>');
    });
}


if (SHOW_IMAGE_ONLY == true)
{/* Shows only image TO ratings and replaces text TO ratings with images */
    $('b:contains("TO Ratings:")').each(function()
    {
        if ($(this).next().next('img[src^="'+TO_BAR_RATINGS_API_LINK+'"]').length > 0)
        {
            if ($(this).next('br').next('img').next('br').next('font').children('b').length > 0)
            {
                remove_text_ratings($(this).next().next());
            }
        }
        else
        { // no image TO, so generate it
            if ($(this).next('br').next('font').children('b').length > 0)
            {
                var $before_comm = $(this).next().nextUntil('br').last();
                var comm = $before_comm.get(0).nextSibling.nodeValue.substring(1,5);
                var $before_pay = $before_comm.next().nextUntil('br').last();
                var pay = $before_pay.get(0).nextSibling.nodeValue.substring(1,5);
                var $before_fair = $before_pay.next().nextUntil('br').last();
                var fair = $before_fair.get(0).nextSibling.nodeValue.substring(1,5);
                var $before_fast = $before_fair.next().nextUntil('br').last();
                var fast = $before_fast.get(0).nextSibling.nodeValue.substring(1,5);

                $(this).next().after('<img src="'+TO_BAR_RATINGS_API_LINK+comm+','+pay+','+fair+','+fast+'"><br>');
                remove_text_ratings($(this).next().next());
            }
        }
    });
}
else if (SHOW_TEXT_ONLY == true)
{/* Shows only text TO ratings and replaces image TO ratings with text */
    $('img[src^="'+TO_BAR_RATINGS_API_LINK+'"]').each(function()
    {
        if ($(this).length > 0)
        {
            if ($(this).next('br').next('font').children('b').length == 0)
            { // no text TO, so generate it
                var ratings = $(this).attr('src').replace(TO_BAR_RATINGS_API_LINK, '').split(',');
                var toText = make_toText(ratings[0]);
                toText += "Communicativity<br>";
                toText += make_toText(ratings[1]);
                toText += "Generosity<br>";
                toText += make_toText(ratings[2]);
                toText += "Promptness<br>";
                toText += make_toText(ratings[3]);
                toText += "Fairness<br>";
                $(this).next().after(toText);
            }
            $(this).next().remove();
            $(this).remove();
        }
    });
}

function remove_text_ratings($obj)
{
    var $comm = $obj.next().nextUntil('br');
    var comm = $comm.last().get(0).nextSibling;
    var $pay = $comm.last().next().nextUntil('br');
    var pay = $pay.last().get(0).nextSibling;
    var $fair = $pay.last().next().nextUntil('br');
    var fair = $fair.last().get(0).nextSibling;
    var $fast = $fair.last().next().nextUntil('br');
    var fast = $fast.last().get(0).nextSibling;
    $comm.last().next().remove();
    $comm.remove();
    comm.parentNode.removeChild(comm);
    $pay.last().next().remove();
    $pay.remove();
    pay.parentNode.removeChild(pay);
    $fair.last().next().remove();
    $fair.remove();
    fair.parentNode.removeChild(fair);
    $fast.last().next().remove();
    $fast.remove();
    fast.parentNode.removeChild(fast);
}



/* generate text TO ratings
 * modified from MTurk Great HIT Export Updated
 */
function make_toText(rating)
{
    var toText = '';
    var i = 0;
    var color = 'green';
    var num = Math.floor(rating);

    switch (num)
    {
        case 0:
            color = 'red';
            break;
        case 1:
            color = 'red';
            break;
        case 2:
            color = 'orange';
            break;
        case 3:
            color = 'yellow';
            break;
        default:
            break;
    }
    toText += (num > 0 ? '<font color="'+color+'">' : '<br>');
    for (i; i < num; i++)
    {
        toText += '<b>'+SYMBOL+'</b>';
    }
    toText += (num > 0 ? '</font>' : '')
    if (i < 5)
    {
        toText += '<font color="white">';
        for (i; i < 5; i++)
        {
            toText += '<b>'+SYMBOL+'</b>';
        }
        toText += "</font>";
    }
    toText += ' '+Number(rating).toFixed(2)+' ';
    return toText;
}