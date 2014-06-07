// ==UserScript==
// @name       MW hax
// @namespace  http://use.i.E.your.homepage/
// @version    0.7
// @description  enter something useful
// @include    http://www.xtremetop100.com/*
// @include    http://www.top100arena.com/*
// @include    http://www.gtop100.com/*
// @include    http://www.mmorpgtoplist.com/*
// @include    http://topg.org/*
// @include    http://www.openwow.com/*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @copyright  2011+, You
// ==/UserScript==

$(document).ready(function(){
    var loc = location.href;
    //alert(loc);
    if(loc.substring(0,50) == "http://www.xtremetop100.com/in.php?site=1132296123")
        {location.href = "http://www.xtremetop100.com/out.php?site=1132296123"}
    else if (loc.substring(0,42) == "http://www.top100arena.com/in.asp?id=44178" || loc == "http://wow.top100arena.com/in.asp?id=44178&incentive=1071110")
        {location.href = "http://wow.top100arena.com/out.asp?id=44178"}
    else if (loc.substring(0,40) == "http://www.gtop100.com/in.php?site=41841" || loc == "http://www.gtop100.com/in.php?site=41841&cookie_test=true")
        {location.href = "http://www.gtop100.com/out.php?id=41841"}
    else if (loc.substring(0,46) == "http://www.mmorpgtoplist.com/in.php?site=27375")
        {location.href = "http://www.mmorpgtoplist.com/out.php?site=27375"}
    else if (loc.substring(0,25) == "http://topg.org/in-348911")
        {location.href = "http://topg.org/out-348911"}
    else if (loc.substring(0,30) == "http://www.openwow.com/vote=6")
        {location.href = "http://www.openwow.com/visit=6"}
})