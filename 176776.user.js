// ==UserScript==
// @name         Steam Cards Link
// @namespace    iFantz7E.SteamCardsLink
// @version      0.1
// @description  Change all links from Steam Profile to Game Cards
// @match        http://steamcommunity.com/id/*/gamecards/*
// @match        http://steamcommunity.com/profiles/*/gamecards/*
// @copyright    2013, 7-elephant
// ==/UserScript==

function cardsLink()
{
    var url = document.documentURI;
    var patt = /^http[s]?:\/\/steamcommunity.com\/(id|profiles)\/[^\/]*/i;
    var urlTail = url.replace(patt,"");
    var pattProfile = /^http[s]?:\/\/steamcommunity.com\/(id|profiles)/i;

    var els = document.getElementsByTagName("div");

    for (var i in els) 
    {
        if (els[i].className == "badge_friends_have_earned_friends"
            || els[i].className == "badge_friendwithgamecard") 
        {
            var as = els[i].getElementsByTagName("a");

            for (var j in as)
            {
                var a = as[j];
                if (pattProfile.test(a.href))
                {
                    a.href = a.href + urlTail;
                }
            }
        }
    }
}
cardsLink();