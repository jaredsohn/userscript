// ==UserScript==
// @name       SongzaToMp3
// @namespace  http://twitter.com/iphone4life4
// @version    0.1
// @description This will dwonload the current song playing on songza.com.
// @require	https://gist.github.com/BrockA/2625891/raw/waitForKeyElements.js
// @require http://code.jquery.com/jquery-2.0.0.min.js
// @match      http://songza.com/*
// @copyright  2013+, Manvir Singh
// @icon       https://dl.dropboxusercontent.com/u/19835281/icon.png
// ==/UserScript==
/********************************************************************************************************************
A note to developers: Use namespaces and DO NOT plot the global scope. =)
 
 What is namespacing?

In many programming languages, namespacing is a technique employed to avoid collisions with other objects or variables in the global namespace. 
They're also extremely useful for helping organize blocks of functionality in your application into easily manageable groups that can be uniquely identified.
 
**********************************************************************************************************************/
var video_url = 'http://www.youtube-mp3.org/redir?url=';
var video_link;
var iphone4life4 = {
    
    open_youtube_page: function(){
    	window.open(video_url + 'https://www.youtube.com' + video_link);
    },
    
    download_clicked: function(){
    	var artist = $('span.szi-artist').html();
        var song_name = $('span.szi-song').html();
        
        GM_xmlhttpRequest ( {
            method: "GET",
            url:    "http://www.youtube.com/results?search_query=" + song_name + ' by ' + artist,
            onload: function(response) {
              
                
                var div = document.createElement("div");
                div.style.width = "0";
                div.style.height = "0";
                div.innerHTML = response.responseText;
                div.setAttribute('id', 'youtube_page');
                document.body.appendChild(div);
                $('div#youtube_page').hide();
                $('div#youtube_page').find('div.promoted-videos.pyv-promoted-videos').remove();
                video_link = $('div#youtube_page').find('a.yt-uix-sessionlink.yt-uix-tile-link.yt-uix-contextlink').attr("href");
                iphone4life4.open_youtube_page();
                $('div#youtube_page').remove();
            },
        });
    },
    
    main: function(jNode) {
        jNode.append('<div id="button_download" class="btn">Download Mp3</div> ');
        document.getElementById('button_download').addEventListener('click', iphone4life4.download_clicked, false);
    }
};

if (window.top != window.self)  //don't run on frames or iframes
{
    //Optional: GM_log ('In frame');
    return;
}

waitForKeyElements ('div.szi-actions', iphone4life4.main);
