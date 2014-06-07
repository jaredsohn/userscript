// ==UserScript==
// @name           Declutter Facebook Newsfeed
// @namespace      http://thepool.wordpress.com
// @description    Removes unwanted News Feed items
// @include        http://*.facebook.com/home.php*
// ==/UserScript==

window.addEventListener("load", function(e)
{
    // Get all page div tags
    var divs = document.getElementsByTagName("div")

    // Find the News Feed Section
    for (var i=0; i < divs.length; i++)
        if (divs[i].className.match(/home_main_item/))
            break

    // Initialize variables
    var newsFeed = divs[i]
    var newsItems = divs[i].childNodes

    // Cycle through the News Feed
    // Remove all feeds which the user has manually clicked not interested
    // Only show basic news items (e.g. add friend/wall posts/events/photos/videos/marketplace)
    for (var i=newsItems.length-1; i > 0; i--)
    {
        if (newsItems[i].className.match(/one_liner_cluster/))
             for(var j=newsItems[i].childNodes.length-1; j >= 0; j--)
                 if(!newsItems[i].childNodes[j].className.match(/feed_date_header|approve_friend|wall_post|rsvp|photos|videos|marketplace/) ||
                 newsItems[i].className.match(/demote_on/))
                     newsItems[i].removeChild(newsItems[i].childNodes[j])

        if(!newsItems[i].className.match(/one_liner_cluster/))
            if(!newsItems[i].className.match(/feed_date_header|approve_friend|wall_post|event|photos|videos|marketplace/) ||
            newsItems[i].className.match(/demote_on/) || newsItems[i].childNodes[0].className == "bumper" ||
            (newsItems[i].className.match(/feed_date_header/) &&
            (i == newsItems.length-1 || newsItems[i+1].className.match(/feed_date_header/))))
                newsFeed.removeChild(newsItems[i])
    }

}, false)