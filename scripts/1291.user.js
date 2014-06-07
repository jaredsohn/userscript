// ==UserScript==
// @name        Embedded Player -> Link converter
// @namespace   http://zeekat.nl/downloads/greasemonkey/3voor12
// @description Replaces embedded Real/Quicktime/WindowsMedia player tags with a clickable link, so you can open them in an external player. Works well on 3voor12.vpro.nl and ifilm. With preliminary google video support.
// @include     http://3voor12.vpro.nl/*
// @include     http://www.vpro.nl/*
// @include     http://www.ifilm.com/*
// @include     http://video.google.com/*
// ==/UserScript==



(function() {
    function fakePlugins() {
//        GM_log("Faking plugins");
        navigator.plugins.refresh = function () { return true };
        navigator.plugins["Google VLC multimedia plugin 1.0"] =
        navigator.plugins["Google VLC multimedia plugin 1.0"] ||        
        {
           object: true,
           versionInfo: "Google VLC multimedia plugin 1.0"
        };
    }
    // get attribute values irrespective of case
    function iAtt(tag,name) {
         return( 
            tag.getAttribute( name ) ||
            tag.getAttribute( name.toUpperCase() ) ||
            tag.getAttribute( name.toLowerCase() )) ;
    }



    
    window.addEventListener("load", function() {
        function processTags(tagname,isRetry) {
            fakePlugins();
//            GM_log("Searching for "+tagname+" tags"+(isRetry ? " again" : "")+".");
            var tags = document.getElementsByTagName(tagname);
            for (var i = 0; i < tags.length; i++) {
                var tag = tags.item(i);
                GM_log("found tag '"+tag+"' of type '"+ iAtt(tag,"type")+"' width src '"+iAtt(tag,"src")+"' and target '"+iAtt(tag,"target")+"'");
           /*     for (var a in tag) {
                    GM_log(a+"="+tag[a]);
                }*/
                var typeMatch = new RegExp("(?:(?:audio|video)/(?:(x-(?:pn-)?realaudio(?:-plugin)?)|(quicktime)|(x-ms-.*|x-mplayer.*)|(.*)))|(application/x-(?:google-)vlc-plugin)$","i");
                var matches = typeMatch.exec(iAtt(tag,"type"));
                if (matches && matches.length > 0) {
                    var src = iAtt(tag,"src") || iAtt(tag,"target");
                    if (!src || src.length == 0) {
                        GM_log("tag has no src or target attribute... removing");
                        try {
                            tag.parentNode.removeChild(tag); // remove control bars etc.
                        }
                        catch (e) {
                            GM_log("remove failed with exception: "+e);
                        }
                    }
                    else {
                        GM_log("tag has src attibute... replacing");
                        var humanType;
                        var type;
                        if (matches[1]) {
                            humanType = 'Real';
                            type = 'audio/x-pn-realaudio';
                        }
                        else if (matches[2]) {
                            humanType = 'QuickTime';
                            type = 'video/quicktime';
                        }
                        else if (matches[3]) {
                            humanType = 'Windows Media';
                            type = matches[0];
                        }
                        else if (matches[4]) {
                            humanType = matches[4];
                            type = matches[4];
                        }
                        else if (matches[5]) {
                            humanType = "(Google) VLC";
                            type = matches[5];
                        }
                        var title = iAtt(tag,"title");
                        if (!title) {
                            title = src;
                        }
                        title = humanType+' stream: '+title;
                        var width = tag.style.width || iAtt(tag,"width");
                        var height = tag.style.height || iAtt(tag,"height");
                        var button = createButton(src,type,title,width,height);
                        tag.parentNode.replaceChild(button, tag);
                    }
                }
            }
            setTimeout(function() { processTags(tagname, true) },500);
        }
        processTags("object");
        processTags("embed");

        
     }, false);

    function createButton(src, type, title,width,height) {
        var link = document.createElement("a");
        link.type = type;
        if (src.match(/(rtsp|mms):\/\//i)) {
            link.href = 'data: '+type+', '+src;
        }
        else {
            link.href = src;
        }
        link.style.textDecoration = 'none';
        var button = document.createElement("button");
        button.appendChild(document.createTextNode(title));
        button.style.color = '#fff';
        button.style.backgroundColor = '#080';

        button.style.fontWeight = 'bold';
        if (width) {
            button.style.width = width;
        }
        if (height) {
            button.style.height = height;
        }
        link.appendChild(button);
        return link;
    }

})();

