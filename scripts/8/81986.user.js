// ==UserScript==
// @name           eMusic For Last.fm
// @namespace      http://nonrational.org
// @description    include a link for music to emusic
// @include        http://*last.fm/*
// ==/UserScript==
(function () {

    GM_xmlhttpRequest({
        method: "GET",
        url: "http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js",
        onload: run
    });

    function run(details) {
        if (unsafeWindow.console) {
            var GM_log = unsafeWindow.console.log;
        }
        if (details.status != 200) {
            GM_log("no jQuery found!");
            return;
        }

        eval(details.responseText);
        var $ = jQuery;
        
        if($("#catalogueHead h1").length == 0){
            return;
        }

        var inner = $("#catalogueHead h1").html().replace(/(<.*\">)|(<\/a>)|(\(.*\))/g,"").replace(/\u2013/,"_").trim();
        //GM_log(inner);

        var artist,album,track;
        if(/<br>/.test(inner)){
            var data = inner.split("<br>");
            artist = data[0];
            album = data[1];
        } else if (/_/.test(inner)){
            var data = inner.split(" _ ");
            artist = data[0];
            track = data[1];
        } else {
            artist = inner;
        }
        
        //GM_log("artist:"+artist+"\nalbum:"+album+"\ntrack:"+track);
        
        var liContent = "\
                <li class='clearit'>\
                    <div class='icon'>\
                        <a target='_blank' href='http://emusic.com'>\
                            <img width='18' height='18' class='iconCover transparent_png' alt='' src='http://cdn.last.fm/flatness/medialinks/favicon_holder.png'>\
                            <img width='16' height='16' class='favicon transparent_png' alt='' src='http://www.emusic.com/favicon.ico'>\
                        </a>\
                    </div>\
                    <a class='provider' href=\"http://www.emusic.com/search.html?=Search%20All%20Music&mode=@MODE@&QT=@TEXT@\" target='_blank'>Find <i>@TEXT@</i> at eMusic</a>\
                </li>";
        
        if(track && artist){
            var trackLink = liContent.replace(/@TEXT@/g, track).replace(/@MODE@/,'s');
            $('ul.externalSources li.clearit:last').after(trackLink);
            var artistLink = liContent.replace(/@TEXT@/g, artist).replace(/@MODE@/,'a');
            $('ul.externalSources li.clearit:last').after(artistLink);
        } else if (album && artist){
            var albumLink = ("<div class='playlinks'><ul class='externalSources'>"+liContent+"</ul></div>").replace(/@TEXT@/g, album).replace(/@MODE@/,'b')   
            $("#buyContain1").after(albumLink);
            var artistLink = liContent.replace(/@TEXT@/g, artist).replace(/@MODE@/,'a');
            $('ul.externalSources li.clearit:last').after(artistLink);
        } else if (artist){
            $("#catalogueHead h1").after("<p>(<a href=\"http://www.emusic.com/search.html?=Search%20All%20Music&mode=a&QT="+artist+"\" target='_blank'>Find "+artist+" at eMusic</a>)<p>");
        } else {
            //NOOP
        }
    }

})();