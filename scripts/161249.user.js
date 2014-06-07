// ==UserScript==
// @author      Pedro Cardoso da Silva
// @name        Mirror Youtube videos
// @namespace   Peter'
// @description This script forces youtube to load videos using the HTML5 awesome player and allows the viewer to mirror the video instantly. This is a common practice used by dancers who want to learn a choreography. Many of them need to do the process of download a youtube video and mirroring it by themselves or wait for someone to reupload a mirrored one to youtube.
// @include     https://www.youtube.com/watch*
// @include     http://www.youtube.com/watch*
// @include     https://www.youtube.com/embed/*
// @include     http://www.youtube.com/embed/*
// @version     1.0
// @grant       none
// @icon        http://files.wikihelp.autodesk.com/inventor2011/icon_cmd_inv_2dsketch_mirror_cmd_32x32.png
// @require     http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

url = document.location;
patt= /v=.{11}/i;
video_id = patt.exec(url);
if(video_id != null) //Code to Watch page
{
    video_id = video_id[0].substr(2,13);
    document.getElementById("watch7-player").innerHTML="<iframe id=\"watch7-player-video\" name=\"watch7-player-video\" width=640 height=390 src=\"http://www.youtube.com/embed/" + video_id + "?autoplay=1&html5=1\" frameborder=0 allowfullscreen></iframe>";
}
else //Code to iframe page
{
    $('.progress-text').append(' - <button type="button" class="yt-mirror-button" onclick="mirrorIt()">Mirror It!</button>');
    $('head').append('<script type="text/javascript">function mirrorIt(){var a=$(\"video\");if(a){if(!a.hasClass(\"mirrored\")){a.css({\"-moz-transform\":\" scale(-1, 1)\",\"-webkit-transform\":\"scale(-1, 1)\",\"-o-transform\":\"scale(-1, 1)\",transform:\"scale(-1, 1)\",filter:\"FlipH\"});a.addClass(\"mirrored\")}else{a.css({\"-moz-transform\":\" scale(1, 1)\",\"-webkit-transform\":\"scale(1, 1)\",\"-o-transform\":\"scale(1, 1)\",transform:\"scale(1, 1)\",filter:\"\"});a.removeClass(\"mirrored\")}}};</script>');
    $('head').append('<style type="text/css">.yt-mirror-button {        -moz-border-radius:6px;        -moz-box-shadow:inset 0 1px 0 0 #f0f7fa;        -webkit-border-radius:6px;        -webkit-box-shadow:inset 0 1px 0 0 #f0f7fa;        background:linear-gradient(tobottom,#33bdef5%,#508ffa100%);        background-color:#33bdef;        border:1px solid #057fd0;        border-radius:6px;        box-shadow:inset 0 1px 0 0 #f0f7fa;        color:#fff;        display:inline-block;        filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="#33bdef",endColorstr="#508ffa",GradientType=0);        text-decoration:none;        text-shadow:0 -1px 0 #5b6178;    }        .yt-mirror-button:hover {        background:linear-gradient(tobottom,#508ffa5%,#33bdef100%);        background-color:#508ffa;        filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="#508ffa",endColorstr="#33bdef",GradientType=0);    }        .yt-mirror-button:active {        position:relative;        top:1px;    }</style>');
}


//Unminified function appended to head
function mirrorIt()
{
    var video = $('video');
    if(video)
    {
        if(!video.hasClass('mirrored'))
        {
            video.css({'-moz-transform':' scale(-1, 1)', '-webkit-transform': 'scale(-1, 1)', '-o-transform': 'scale(-1, 1)', 'transform': 'scale(-1, 1)', 'filter': 'FlipH'});
            video.addClass('mirrored');
        }
        else
        {
            video.css({'-moz-transform':' scale(1, 1)', '-webkit-transform': 'scale(1, 1)', '-o-transform': 'scale(1, 1)', 'transform': 'scale(1, 1)', 'filter': ''});
            video.removeClass('mirrored');
        }
    }
}

//Beautified CSS 
/*
.yt-mirror-button {
    -moz-border-radius:6px;
    -moz-box-shadow:inset 0 1px 0 0 #f0f7fa;
    -webkit-border-radius:6px;
    -webkit-box-shadow:inset 0 1px 0 0 #f0f7fa;
    background:linear-gradient(tobottom,#33bdef5%,#508ffa100%);
    background-color:#33bdef;
    border:1px solid #057fd0;
    border-radius:6px;
    box-shadow:inset 0 1px 0 0 #f0f7fa;
    color:#fff;
    display:inline-block;
    filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="#33bdef",endColorstr="#508ffa",GradientType=0);
    text-decoration:none;
    text-shadow:0 -1px 0 #5b6178;
}

.yt-mirror-button:hover {
    background:linear-gradient(tobottom,#508ffa5%,#33bdef100%);
    background-color:#508ffa;
    filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="#508ffa",endColorstr="#33bdef",GradientType=0);
}

.yt-mirror-button:active {
    position:relative;
    top:1px;
}
*/