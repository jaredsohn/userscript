// ==UserScript==
// @name           YouLike
// @namespace      erlichmen.net
// @include        http://*youtube.com/watch*
// @version        1.0
// ==/UserScript==


var initFB ='\
        var GM_jQuery = document.createElement("script");\
        GM_jQuery.type = "text/javascript";\
        GM_jQuery.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js";\
        GM_jQuery.onload = function() {\
            function getUrlVars() {\
              var vars = [], hash;\
              var hashes = window.location.href.slice(window.location.href.indexOf("?") + 1).split("&");\
              for(var i = 0; i < hashes.length; i++) {\
                hash = hashes[i].split("=");\
                vars.push(hash[0]);\
                vars[hash[0]] = hash[1];\
              }\
              return vars;\
            }\
            $("html").attr("xmlns:og", "http://opengraphprotocol.org/schema/");\
            title = $("<meta></meta>");\
            title.attr("property", "og:title");\
            title.attr("content", "testing 1234");\
            $("head").append(title);\
            image = $("<meta></meta>");\
            image.attr("property", "og:image");\
            imageUrl = "http://i4.ytimg.com/vi/" + getUrlVars()["v"] + "/default.jpg";\
            image.attr("content", imageUrl);\
            $("head").append(image);\
            metaType = $("<meta></meta>");\
            metaType.attr("property", "og:type");\
            metaType.attr("content", "movie");\
            $("head").append(metaType);\
            fbLike = $("<iframe></iframe>");\
            href = window.location.protocol + "//" + window.location.hostname + $("link[rel=canonical]").attr("href");\
            fbLike.attr("src", "http://www.facebook.com/plugins/like.php?href="+escape(href)+"&amp;layout=standard&amp;show_faces=false&amp;width=450&amp;action=like&amp;colorscheme=light");\
            fbLike.attr("scrolling", "no");\
            fbLike.attr("frameborder", "0");\
            fbLike.attr("allowTransparency", "true");\
            fbLike.attr("style", "border:none; overflow:hidden; width:450px; height:px;margin-top:10px");\
            $("#watch-info").append(fbLike);\
          };\
        document.getElementsByTagName("head")[0].appendChild(GM_jQuery);'
               
var GM_InitFB = document.createElement('script');
GM_InitFB.type = 'text/javascript';
GM_InitFB.text = initFB;
document.getElementsByTagName('head')[0].appendChild(GM_InitFB);