// ==UserScript==
// @name       Add to Playlist
// @namespace  http://www.pslib.cz/richard.hozak/
// @version    0.5
// @description  Adds youtube video to playlist.
// @include http://www.youtube.com/watch?*
// @include https://www.youtube.com/watch?*
// @include http://www.youtube.com/results?*
// @include https://www.youtube.com/results?*
// @include http://www.youtube.com/playlist?*
// @include https://www.youtube.com/playlist?*
// @match http://www.youtube.com/watch?*
// @match https://www.youtube.com/watch?*
// @match http://www.youtube.com/results?*
// @match https://www.youtube.com/results?*
// @match http://www.youtube.com/playlist?*
// @match https://www.youtube.com/playlist?*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js
// @copyright  2012+, Richard Hozák
// ==/UserScript==

var url = document.location.href;
var buttonHTML = '<span><button class=" yt-uix-button yt-uix-button-text yt-uix-tooltip yt-uix-button-empty" style="margin-top:4px; margin-left:5px;" type="button" title="" id="add-to-playlist" data-force-position="true" data-position="bottomright" data-orientation="vertical" role="button" data-tooltip-text="Přidat do playlistu" data-content-id="yt-uix-tooltip2-content"><span class="yt-uix-button-icon-wrapper"><img src="http://www.pslib.cz/richard.hozak/arrow_down.png"><span class="yt-uix-button-valign"></span></span></button></span>';
if (url.indexOf("://www.youtube.com/playlist?") !== -1)
{
    /*
     * crap
     * 
    alert("playlist page");
    var playlistfeed = document.getElementById("gh-activityfeed");
    
    var list = playlistfeed.getElementsByTagName("ol")[0];
    var li = list.getElementsByTagName("li");
    for (var i = 0; i < li.length; i++) 
    {
        element = li[i];
        //element.innerHTML = element.innerHTML + "test";
        //alert(element);
        var videoDiv = element.getElementsByTagName("div")[0];
        var videoInfo = videoDiv.getElementsByClassName("video-info ")[0].getElementsByClassName("video-overview yt-grid-fluid")[0];
        var id = "add-to-playlist-" + i;
        videoInfo.innerHTML = videoInfo.innerHTML + makeButton(id);
        var buttonP = document.getElementById(id);
        //alert(buttonP);
        //buttonP.addEventListener("click", function(){ alert("asd"); }, true);
        buttonP.onclick = function(){addUrl("asd");};
        //buttonP.setAtrribute('onClick', 'javascript:addUrl(' + id + ');');
    }
    playlistfeed.innerHTML = "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>" + playlistfeed.innerHTML;
    */
    
    
    
    $(".playlist-video-item-base-content").removeClass("watched");
    $("div").remove(".video-thumb-watched");
    //var button = makePlaylistButton();
    $(".video-index").after(makePlaylistButton());
    $(".add-to-playlist-button").css("float","right").css("height","80px").css("width","80px");
    
    //$(".add-to-playlist-button").css("top","50%");
    
    /*
     * old working crap
     * 
    $("#gh-activityfeed").on("click", function(event){
        var butt = event.target.parentNode.parentNode;
        if (butt.className.indexOf("add-to-playlist-button") > -1)
        {
            var href = butt.parentNode.parentNode.getElementsByClassName("thumb-container")[0];
            var link = href.getElementsByClassName("yt-uix-sessionlink")[0];
            var linkhref = $(link).attr("href");
            var url = "http://www.youtube.com" + linkhref;
            addUrl(url);
            //alert(url);
        }
    });
     */
    
    $("#gh-activityfeed").on("click", function(event){
        var id = $(event.target).closest(".playlist-video-item-base-content").find(".addto-button").attr("data-video-ids");
        var url = "http://www.youtube.com/watch?v=" + id;
        addUrl(url);
    });
}
else
{  
    //alert("video page");
    var h = document.getElementById('watch7-action-buttons');
    h.innerHTML = h.innerHTML + makeButton("add-to-playlist");
    var button = document.getElementById("add-to-playlist");
    button.addEventListener('click', addToPlaylist, true);
}

function addToPlaylist()
{
    var postData = { 
        "url": url
    };
    $.post("http://localhost:58403", postData);
}

function addUrl(urlname)
{
    //alert(urlname);
    var postData = { 
        "url": urlname 
    };
    $.post("http://localhost:58403", postData);
}

function makeButton(id)
{
    return '<span><button class=" yt-uix-button yt-uix-button-text yt-uix-tooltip yt-uix-button-empty" style="margin-top:4px; margin-left:5px;" type="button" title="" id="' + id + '" data-force-position="true" data-position="bottomright" data-orientation="vertical" role="button" data-tooltip-text="Přidat do playlistu" data-content-id="yt-uix-tooltip2-content"><span class="yt-uix-button-icon-wrapper"><img src="http://www.pslib.cz/richard.hozak/arrow_down.png"><span class="yt-uix-button-valign"></span></span></button></span>';
}

function makePlaylistButton()
{
    var urltag = 'url="' + url + '"';
    var b = '<button class=" yt-uix-button yt-uix-button-text yt-uix-tooltip yt-uix-button-empty add-to-playlist-button" style="margin-top:4px; margin-left:5px;" type="button" title="" data-force-position="true" data-position="bottomright" data-orientation="vertical" role="button" data-tooltip-text="Přidat do playlistu" data-content-id="yt-uix-tooltip2-content"><span class="yt-uix-button-icon-wrapper"><img src="http://www.pslib.cz/richard.hozak/arrow_down.png"><span class="yt-uix-button-valign"></span></span></button>';
    return '<span class="add-to-playlist-span">' + b + "</span>";
}
