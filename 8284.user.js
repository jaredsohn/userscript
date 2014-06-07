// Google Theme Time Fix
// version 0.2 beta
// 2007-05-20
// Author: Aaron McBride (http://www.apejet.org/aaron/)
// License: public domain (attribution appreciated)
// Description: This is my attempt to fix a bug in the Google personalized
//      home page theme system.  In my experience, the server selects
//      the wrong time (GMT, I think) the first time your personalized home
//      page is loaded per browser session.  This code changes the css href
//      based on your current system time.
// Changes:
// 0.2 - added: springscape, summerscape, and autumnscape
//
// ==UserScript==
// @name           Google Theme Time Fix
// @namespace      http://www.apejet.org/aaron/
// @description    Fixes the time problem with Google personalized home page themes.
// @include        http://www.google.com/ig*
// ==/UserScript==


(function() {


    var ext_css = document.getElementById("ext_css");
    if(ext_css)
    {
        var themePath = ext_css.href;
        var lastUnderPos = themePath.lastIndexOf('_');
        if(lastUnderPos != -1 && isTimeTheme(themePath))
        {
            themePath = themePath.substring(0, lastUnderPos + 1);
            ext_css.setAttribute("href", themePath + getThemeTime() + ".css");
        }
    }
})();

function isTimeTheme(themePath)
{
    var timeThemes = ['teahouse', 'cityscape', 'beach', 'sweetdreams', 'winterscape', 'springscape', 'summerscape', 'autumnscape'];
    for(var i = 0; i < timeThemes.length; i++)
    {
        if(themePath.indexOf(timeThemes[i]) != -1)
            return true;
    }
    return false;
}

function getThemeTime()
{
    var d = new Date();
    var h = d.getHours();
    var time = "noon";
    switch(h)
    {
        case 0:
        case 1:
            time = "midnight";
            break;
        case 2:
        case 3:
            time = "2am";
            break;
        case 4:
        case 5:
            time = "4am";
            break;
        case 6:
        case 7:
            time = "6am";
            break;
        case 8:
        case 9:
            time = "8am";
            break;
        case 10:
        case 11:
            time = "10am";
            break;
        case 12:
        case 13:
            time = "noon";
            break;
        case 14:
        case 15:
            time = "2pm";
            break;
        case 16:
        case 17:
            time = "4pm";
            break;
        case 18:
        case 19:
            time = "6pm";
            break;
        case 20:
        case 21:
            time = "8pm";
            break;
        case 22:
        case 23:
            time = "10pm";
            break;
    }
    
    //special pi time
    if(d.getHours() == 3 && d.getMinutes() == 14)
        time = "3.14am";
    
    return time;
}
