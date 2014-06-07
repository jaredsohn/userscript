// ==UserScript==
// @name            One-Click Video Streaming
// @namespace       http://blog.monstuff.com/archives/cat_greasemonkey.html
// @description     Adds an icon next to media files, which can be clicked to start streaming the media in a supported media player (such as VLC or mplayer).
// @include         http://your.home.server/*
// ==/UserScript==


 
function injectMe()
{
    // find all the links that should be instrumented
    function scanLinks() {
        var links = getLinks();

        for (var i=0; i < links.length; i++){
            var link = links[i];
            if (isMediaFile(link.href)) 
            {
                var span = document.createElement('span');
                var image = "data:image/x-icon,%00%00%01%00%01%00%10%10%02%00%00%00%00%00%B0%00%00%00%16%00%00%00(%00%00%00%10%00%00%00%20%00%00%00%01%00%01%00%00%00%00%00%80%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%FF%FF%00%00%FF%FF%00%00%E7%FF%00%00%E1%FF%00%00%E0%7F%00%00%E0%1F%00%00%E0%07%00%00%E0%03%00%00%E0%07%00%00%E0%1F%00%00%E0%7F%00%00%E1%FF%00%00%E7%FF%00%00%FF%FF%00%00%FF%FF%00%00%FF%FF%00%00";
                
                var code_str = "<a href=\"" + dataURI(link.href) + "\" ><img src=\"" + image + "\" style='border: 0px; padding-right: 5px;' /></a>";
                //" <a href=\"#\" onclick=\"deleteFile('" + link.href + "');\" ><img src=\"" + image + "\" style='border: 0px; padding-right: 5px;' /></a>";
                span.innerHTML = code_str;
                link.parentNode.insertBefore(span, link);
            }
        }
    }
  
    // returns true for avi files
    function isMediaFile(url) 
    {
        return endsWith(url, ".avi");
    }
    
    function endsWith (text, suffix) 
    {
        var endString = text.substring(text.length - suffix.length, text.length);
        return (endString == suffix);
    }
    
    function endsWithSlash(text) {
        return (text[text.length-1] == '/');
    }

    function match(url) {
        if (endsWithSlash(url)) {
            return true;
        }
        
        return true;
    }

    function getLinks() {
       var doc_links = document.links;
       var links = new Array();
       for (var i=0; i < doc_links.length; i++){
           links.push(doc_links[i]);
       }
       return links;
    }



    // generate data URI for each link
    // data:audio/x-Mpegurl;charset=utf-8,http%3A%2F%2Fbase.monstuff.com%2F(data)%2FVideo.avi 
    function dataURI(url) 
    {
        // This is an inline playlist file (such as m3u), with the url of the media.
        // When opened by the browser, this short text file will be passed by the browser to the media player.
        // The media player will open it as a playlist.
        return "data:audio/x-Mpegurl;charset=utf-8," + encodeURIComponent(url);
    }
    
    
    
    
    // insert icon and link
    
    


    if (!endsWithSlash(window.location.pathname)) { return; }
    scanLinks();

}


if (unsafeWindow) 
{
    unsafeWindow.eval(injectMe.toString());
    unsafeWindow.eval("injectMe();");
}
