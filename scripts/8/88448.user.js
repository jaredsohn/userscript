// ==UserScript==
// @name          Beyond Procrastination
// @namespace     http://dev.beyond-syntax.com/
// @description   Minimize time spent on "wasteful" (include'd) sites.
// @author        mjschultz
// @include       http://reddit.com/*
// @include       http://*.reddit.com/*
// @include       http://news.ycombinator.com/*
// @include       http://twitter.com/*
// @include       http://*.twitter.com/*
// @include       https://twitter.com/*
// @include       https://*.twitter.com/*
// @include       http://facebook.com/*
// @include       http://*.facebook.com/*
// @run-at        document-start
// ==/UserScript==

/* settings */
var settings = [];
settings['min_away'] = 180; // minutes
settings['max_visit'] = 20; // minutes
settings['global'] = false; // if true, apply to all sites this script runs on

var version = '1.0';

/* code */
if (true == settings['global'])
{
    time_key = 'initial-time_global';
}
else
{
    time_key = 'initial-time_' + location.host;
}
// convert min_away and max_visit to milliseconds
MIN_TO_MS = 60 * 1000;
min_away = settings['min_away'] * MIN_TO_MS;
max_visit = settings['max_visit'] * MIN_TO_MS;

/* a little Chrome-ifying */
if (!GM_getValue || GM_getValue.toString().indexOf("not supported") > -1)
{
    GM_getValue = function(key, def)
    {
        return localStorage[key] || def;
    };
    GM_setValue = function(key, value)
    {
        return localStorage[key]=value;
    };
}

/* get the initial visit time */
initial_time = GM_getValue(time_key);
current_time = new Date().getTime();
if (!initial_time)
{
    // create an initial time
    initial_time = current_time;
    GM_setValue(time_key, initial_time.toString());
}
else
{
    // make sure initial_time is number
    initial_time = parseInt(initial_time);
}

/* check if we've been away long enough (and reset initial visit time) */
if (current_time > (initial_time + max_visit + min_away))
{
    // we've been gone long enough, allow visiting and set initial time
    GM_setValue(time_key, current_time.toString());
}
/* check if we've overstayed our welcome */
else if (current_time > (initial_time + max_visit))
{
    // you've been here too long, go away
    stay_away = (initial_time + max_visit + min_away) - current_time;
    stay_away = Math.ceil(stay_away / MIN_TO_MS);
    ess = (stay_away == 1) ? "" : "s";

    // display the stay away time
    leave_msg = "<h1>Beyond Procrastination</h1>";
    leave_msg += "<p>You currently have 'Beyond Procrastination' installed on your browser.  This means that you don't want to spend too much time browsing certain web sites.</p>";
    leave_msg += "<p>You still need to work for <strong>at least "+stay_away+" minute"+ess+"</strong> before coming back!</p>";
    leave_msg += "<p><em>(If you are done working and want to visit this site, you can disable this script.  Just don't forget to re-enable it tomorrow!)</em></p>";
    leave_msg += "<p><a href=\"\">Reload</a></p>";
    leave_style = "width:75%;";
    leave_style += "margin:15px auto;";
    leave_style += "padding:5px;";
    leave_style += "border:1px solid black;";
    leave_style += "background-color:#eee;";
    document.body.innerHTML = "<div style=\""+leave_style+"\">"+leave_msg+"</div>";
}
// you're still allowed to view this site ... for now.
