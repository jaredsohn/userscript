// ==UserScript==
// @name        SongTasteDownload
// @description 自动解析SongTaste歌曲URL，点击即可下载~
// @version     0.2
// @author      iSayme
// @namespace   http://www.onefloweroneworld.com
// @updateURL   https://userscripts.org/scripts/source/180479.meta.js
// @downloadURL https://userscripts.org/scripts/source/180479.user.js
// @include     http://www.songtaste.com/song/*
// ==/UserScript==

function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
    script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}

// the guts of this userscript
function getURL() {
    var song_id = /\d+/.exec(window.location.href)[0];
    //console.log(song_id);//GM_log(song_id);
    
    var strURL = $('a[href^=javascript:playmedia1]').attr('href').split('\'')[5];
    //console.log(strURL);//GM_log(strURL);
    
    $.ajax({
        type:'POST',
        url:'/time.php',
        cache:false,
        data:'str='+strURL+'&sid='+song_id,
        dataType:'html',
        success:function(url) {
            //console.log(url);//GM_log(url);
            $("#custom_1").attr("href", url);
        }
    });
}

// load jQuery and execute the main function
addJQuery(getURL);