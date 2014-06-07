// ==UserScript==
// @name            League of Ligatures
// @version         0.9001
// @description     Fixes font sizing on chrome for leagueoflegends.com
// @match           *.leagueoflegends.com/*
// @copyright       2013+, Everspace
// @require         http://code.jquery.com/jquery-latest.js
// @run-at			document-end
// ==/UserScript==

$("h4").css({"font-weight":"bold",
             "font-family":"\"Gill Sans W04\",\"Gill Sans\",\"Gill Sans MT\",GillSans,Calibri,\"Trebuchet MS\",sans-serif"
            });

if(window.location.href.indexOf("forumdisplay.php") > -1)
{
    $(".table td a").css("font-size","1.15em");
}
else if(window.location.href.indexOf("showthread.php") > -1)
{
    $(".post-row .post-col-left .post-user").css({"font-size":"16px",
                                                  "font-weight":"bold"
                                                 });
}