// ==UserScript==
// @name           OpenTed
// @namespace      None
// @description    OpenTed
// @include        http://www.ted.com/talks/*
// ==/UserScript==

/* I don't think we cant get width and height using JS, because these
 * properties are not defined insides "style" attributes, but in a separate
 * CSS file. So it's hard-coded. And it sucks. */
var PLAYER_WIDTH  = "562px";
var PLAYER_HEIGHT = "388px";
var player;



function get_player()
{
    return document.getElementById("videoPlayerSWF");
}

/*
 * The TED guys are nice enough to give us direct links to their videos, in both
 * normal and high quality.
 */
function get_video_links ()
{
    dls = document.getElementsByTagName("dl");
    for (i = 0; i < dls.length; i++)
    {
        if (dls[i].getAttribute("class") == "downloads")
        {
            dl = dls[i];
            /* Not breaking, cuz we need the last one */
        }    
    }

    if (!dl)
        return false;
    dts = dl.getElementsByTagName("dt");
    if (!dts)
        return false;

    nq_src = dts[0].childNodes[0].getAttribute("href");
    hq_src = dts[2].childNodes[0].getAttribute("href");

    return {'nq_src' : nq_src, 'hq_src': hq_src};
}

/*
 * Replaces TED's flash player by our own player.
 */
function replace_flash_player(src)
{
    player.innerHTML = "";
    video = document.createElement("embed");
    video.setAttribute("type", "video/flv");
    video.setAttribute("src", src);
    video.setAttribute("width", PLAYER_WIDTH);
    video.setAttribute("height", PLAYER_HEIGHT);
    video.setAttribute("autoplay", "true");
    player.appendChild(video);

    return video;
}

/*
 * Adds buttons to switch between normal and high quality.
 */
function add_quality_links()
{
    left_column = player.parentNode;

    quality_links = document.createElement("div");
    quality_links.style.width=PLAYER_WIDTH;
    quality_links.style.margin="10px 0 0 0";

    normal_quality_link = document.createElement("button");
    normal_quality_link.setAttribute("type", "button");
    normal_quality_link.appendChild(document.createTextNode("Normal quality"));
    normal_quality_link.addEventListener(
        "click",
        function () {
            video.setAttribute("src", nq_src);
        },
        false
    );

    high_quality_link = document.createElement("button");
    high_quality_link.setAttribute("type", "button");
    high_quality_link.appendChild(document.createTextNode("High quality"));
    high_quality_link.addEventListener(
        "click",
        function () {
            video.setAttribute("src", hq_src);
        },
        false
    );

    quality_links.appendChild(normal_quality_link);
    quality_links.appendChild(high_quality_link);
    left_column.insertBefore(quality_links, player.nextSibling);
}

function init()
{
    player = get_player();
    if (!player)
    {
        alert("Could not get player");
        return false;
    }

    video_links  = get_video_links();
    if (!video_links)
    {
        alert("Could not get video links");
        return false;
    }

    video = replace_flash_player(nq_src);

    add_quality_links();

    return true;
}

init();
