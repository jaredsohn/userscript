// ==UserScript==
// @name           10 minute refresher
// @author         Alexander Artemenko http://aartemenko.com
// @namespace      svetlyak40wt
// @description    Refresher for the 10minutemail.com
// @include        http://10minutemail.com/10MinuteMail/*
// ==/UserScript==


function doSomething ( )
{
    var refresh_url = document.getElementById('j_id22').href;

    window.setTimeout(
        function()
        {
            window.location = refresh_url;
        },
        1000 * 60 * 3
    ) ;
}

doSomething();
