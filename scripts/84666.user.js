// ==UserScript==
// @name           OpenYoutube
// @namespace      None
// @description    OpenYoutube
// @include        http://www.youtube.com/watch?*
// @include        http://www.youtube.com/user/*
// ==/UserScript==

/*
 * This script is distributed in the public domain, for everyone to use, improve
 * and re-distribute.
 *
 * THIS SCRIPT IS PROVIDED ''AS IS'', blahblah, you've been warned, if
 * something goes wrong, too bad.
 */

/*
 * Features : 
 *     - Allows the user to read videos from youtube.com inside their browser,
 *       without running the Flash plugin.
 *     - Should be working well with Firefox and any browser that can run
 *       greasemonkey scripts.
 *
 * Tests :
 *     - Debian Sid, Iceweasel 3.5.10, totem-mozilla : Working (07/31/2010)
 *
 * TODO :
 *     - Get the list of available formats, and handle that part instead of just
 *     adding &fmt=34 at the end of every url.
 * 
 * Will never be done :
 *     - Compatibility with non-free browsers/video players/whatever. Because I
 *     just don't give a shit. But eh, you're free to improve the code so that
 *     it meets your needs.
 */

/*
 * In order to display the video in a regular video player inside our browser,
 * we need to find its source, needed as an argument of the "embed" tag. 
 *
 * The source has the following pattern (at least until the Youtube folks take
 * the crazy decision to change it, kr) :
 * 
 * http://www.youtube.com/get_video?video_id=<VIDEO_ID>&t=<T>&asv=
 *
 * - VIDEO_ID can be found in the URL (youtube.com/watch?v=VIDEO_ID)
 * - T is... well, I have no idea what the fuck that is.
 * - asv is empty. But needed. Why ? I don't know, man, I ain't designed the damn
 * website, now leave me alone.
 * 
 * Others arguments are optional.
 */


/*******************************************************************************
 *                  youtube.com/watch* specific functions                      *
 ******************************************************************************/
function build_video_src()
{
    video_url="http://www.youtube.com/get_video?video_id="
    video_url+=unsafeWindow.yt.config_.VIDEO_ID;

    /* Getting the flashvars and building the URL */
    player = document.getElementById("movie_player")
    flashvars = player.getAttribute("flashvars")
    fv_split = flashvars.split("&");
    for (var i = 0; i < fv_split.length; i++)
    {
        var split = fv_split[i].split("=");
        if (split[0] == "t")
        {
            video_url += "&amp;t="
            video_url += split[1];
            break;
        }
    }
    video_url += "&amp;asv"
    video_url += "&amp;fmt=34";

    return video_url;
}

/*
 * Let's take a look at the source of the page.
 *
 * We're interested in the part that handles the player :
 *
 * -<div id="watch-video-container">
 * --<div id="watch-video" class=" ">
 * ---<div id="watch-player" class="flash-player" ...>
 *
 * One would probably just edit the content of either the "flash-player" tag, or
 * the "watch-video" tag. Well, it does not work. Why ? I have no idea. What
 * happens is that the annoying "Get Flash, dumbass" message will be displayed
 * anyway.
 *
 * It appears that removing the content of the "watch-video-container" element ,
 * and then filling it in again with our parameters, does the trick.  
 */
function replace_video(video_src)
{
    /* Emptying watch-video-container */
    watch_video_container = document.getElementById("watch-video-container")
    watch_video_container.innerHTML=""

    /* Creating watch-video, similar to the "original" */
    watch_video = document.createElement("div")
    watch_video.setAttribute("id", "watch-video")
    watch_video.setAttribute("class", " ");

    /* Creating the watch_player, similar to the "original" */
    watch_player = document.createElement("div");
    watch_player.setAttribute("id", "watch-player");
    watch_player.setAttribute("class", "flash-player");

    /* Adding the video */
    embedded_video = document.createElement("embed");
    embedded_video.setAttribute("id", "no-flash-player");
    embedded_video.setAttribute("type", "video/flv");
    embedded_video.setAttribute("src", video_src);
    embedded_video.setAttribute("autoplay", "true");
    embedded_video.setAttribute("height", "388");
    embedded_video.setAttribute("width", "640");
    embedded_video.setAttribute("scale", "tofit");

    /* Putting it all up together */
    watch_player.appendChild(embedded_video);
    watch_video.appendChild(watch_player);
    watch_video_container.appendChild(watch_video);
}

/*
 * "Upgrade to Flash Player 10 for improed playback performance, blahblah".
 * Stfu, I dont want to use your crappy non-free player.
 */
function remove_annoying_flash_promo ()
{
    watch_panel = document.getElementById("watch-panel");
    if (!watch_panel)
        return

    flash10_promo_div = document.getElementById("flash10-promo-div");
    if (!flash10_promo_div)
        return
    
    watch_panel.removeChild(flash10_promo_div);
}
/*******************************************************************************
 *              End of youtube.com/watch* specific functions                   *
 ******************************************************************************/


/*******************************************************************************
 *                  youtube.com/user/* specific functions                      *
 ******************************************************************************/
function user_replace_player (video_id, token)
{
    //alert("Building...");
    video_src="http://www.youtube.com/get_video?video_id="
    video_src+=video_id;
    video_src+="&amp;t="+token;
    video_src+="&asv";
    video_src+="&ampt;fmt=34"; /* TODO : something more clever */

    playnav_player = document.getElementById("playnav-player");
    playnav_player.innerHTML=""

    embedded_video = document.createElement("embed");
    embedded_video.setAttribute("id", "movie_player");
    embedded_video.setAttribute("type", "video/flv");
    embedded_video.setAttribute("src", video_src);
    embedded_video.setAttribute("autoplay", "true");
    embedded_video.setAttribute("height", "388");
    embedded_video.setAttribute("width", "640");
    embedded_video.setAttribute("scale", "tofit");
   
    /* go */
    playnav_player.appendChild(embedded_video); 
    
}

function user_get_token_and_replace_video(video_id)
{
    /* 
     * In order not to get the following error :
     *
     * "Error: Greasemonkey access violation: unsafeWindow cannot call
     *  GM_xmlhttpRequest."
     *
     * we have to use the workaround described here :
     *
     * http://www.neaveru.com/wordpress/index.php/2008/05/09/
       greasemonkey-bug-domnodeinserted-event-doesnt-allow-gm_xmlhttprequest/
     */
    setTimeout(
        function ()
        {
            GM_xmlhttpRequest({
                method: 'GET',
                url: 'http://www.youtube.com/get_video_info?&video_id='+video_id,
                headers: {
                    'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                    'Accept': 'application/atom+xml,application/xml,text/xml',
                },
                onload: function(response) {
                    sp = response.responseText.split("&")
                    for (var i = 0; i < sp.length; i++)
                    {
                        var split = sp[i].split("=");
                        if (split[0] == "token")
                        {
                            token = split[1];
                            break;
                        }
                    }
                    user_replace_player(video_id, token);
                }
            });
        } ,0);
}
/*******************************************************************************
 *              End of youtube.com/user/* specific functions                   *
 ******************************************************************************/



/*******************************************************************************
 *                     Let's watch these damn videos.                          *
 ******************************************************************************/
if (window.location.href.match("http://www.youtube.com/watch?"))
{
    /* We've got to get the source of the video as soon as possible, otherwise
     * it just won't work. */
    video_src = build_video_src();
    replace_video(video_src);
    remove_annoying_flash_promo ();
}
else if(window.location.href.match("http://www.youtube.com/user/")) {
    /*
     * The user pages are quite a pain in the ass. 
     *
     * On youtube.com/user/<user_name>, we can get both the video id and the
     * token from the source of the page, which is quite fast.
     *
     * On pages loaded by clicking on a link on the right panel, we cant (or, at
     * least, I haven't found how). Since we may have to load these pages
     * directly (when a friend sends us an URL, for example), we have to find
     * another way of getting the video_id and the token. The video_id can be
     * found in the URL, and the token can be retrieved using an xml http
     * request. That might take some time, but we got no choice.
     *
     */
    video_id =""
    if (window.location.href.match("#"))
    {
        url = window.location.href;
        video_id = url.substring(url.lastIndexOf("/")+1, url.length);
        user_get_token_and_replace_video(video_id);
    }
    else
    {

        video_id = unsafeWindow['featuredVideoMetadata'].swf_args.video_id;
        token = unsafeWindow['featuredVideoMetadata'].swf_args.token;
        /* The token may not be found in the swf_args :( */
        if (token)
            user_replace_player(video_id, token);
        else
            user_get_token_and_replace_video(video_id);
    }

    /* Let's make sure the links on the right work. They will do the normal job
    * (old_play_video), and replace the flash player with our regular video 
    * player */
    old_play_video = unsafeWindow.playnav.playVideo;
    unsafeWindow.playnav.playVideo = function () {
        old_play_video(arguments[0], arguments[1], arguments[2]);
        user_get_token_and_replace_video(arguments[2]);
    }
}
