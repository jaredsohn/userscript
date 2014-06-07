// ==UserScript==
// @name           Lockerz for YouTube
// @namespace      userscripts.org
// @description    Implements Lockerz "Play" player as a replacement for the default player on YouTube.
// @include        *
// @copyright      GaryX
// @licence        Creative Commons Attribution-Share Alike 3.0 Unported License; http://creativecommons.org/licenses/by-sa/3.0/
// @version        0.1
// @attribution    GaryX
// ==/UserScript==

var load_player = function(original_player, container, videoid, fmt, parameters) {

    videosrc = get_source_url(parameters["fmt_url_map"], fmt);

    if(parameters["iv_module"]){ // Check for annotations. Not done.
        if(parameters["iv_storage_server"]){
            annotationssrc = decodeURIComponent(parameters["iv_storage_server"])+"read2?video_id="+videoid;
        }else{
            annotationssrc = "http://www.google.com/reviews/y/read2?video_id="+videoid;
        }
    }

    var player = document.createElement("embed"); // Create player element.
    player.setAttribute("height", original_player.getAttribute("height"));
    player.setAttribute("width", original_player.getAttribute("width"));
    player.setAttribute("type", "application/x-shockwave-flash");
    player.setAttribute("src", "http://s.ytimg.com/yt/swf/watch_as3_newui-vfl159889.swf");
    player.setAttribute("id", original_player.getAttribute("id"));
    player.setAttribute("quality", original_player.getAttribute("quality")); // Not source video quality.
    player.setAttribute("allowscriptaccess", original_player.getAttribute("allowscriptaccess"));
    player.setAttribute("allowfullscreen", original_player.getAttribute("allowfullscreen"));
    player.setAttribute("flashvars", 'config={ '+
        'playList: [ { url: \'http://i.ytimg.com/vi/'+videoid+'/hqdefault.jpg\', overlayId: \'play\' }, { url: \''+encodeURIComponent(videosrc)+'\' '+
        '}],showPlayListButtons:false, initialScale: \'fit\', showLoopButton: false, allowResize: true, useNativeFullScreen:true'+
        ',autoBuffering:true,autoPlay:false,loop:false}');
    container.appendChild(player); // Insert player in container.
}

var load_embed = function(original_player, videoid) {
    var container = original_player.parentNode; // Get container
    container.removeChild(original_player); // Unload the original player from the DOM
    var callback = function(response) {
        if (response.status == 200){
            var parameters = to_array(response.responseText);
            if (parameters["status"] == "fail") {container.appendChild(original_player); document.body.removeEventListener("DOMNodeInserted", handle_event, false); return;}
            fmt = ""; // No way to set this yet.
            load_player(original_player, container, videoid, fmt, parameters);
        }else{ // If failure, revert to old player
            container.appendChild(original_player);
        }
    }
    GM_xmlhttpRequest({ // Get video info.
        method: "GET",
        url: "http://www.youtube.com/get_video_info?&video_id="+videoid+"&el=embedded&ps=default&eurl="+encodeURIComponent(url)+"&hl=en_US",
        onload: function(response) {callback(response);}
    });
}

var load_main = function(original_player) {
    var container = original_player.parentNode; // Get container
    container.removeChild(original_player); // Unload the original player from the DOM
    flashvars = to_array(original_player.getAttribute('flashvars')); // Put flashvars into an array.

    var urlfmt = url.match(/[^?&]*fmt=([^&]*)/) // Find first (and should be only) fmt query string in url.
    if (urlfmt && urlfmt[1]){ // Test for fmt query string.
        var fmt = urlfmt[1];
    }else{
        var fmt = "";
    }
    load_player(original_player, container, flashvars["video_id"], fmt, flashvars);
}

var get_source_url = function(raw, fmt) {
    var formaturlmapraw = decodeURIComponent(raw).split(",");
    var formaturlmap = new Array; // Put fmt_url_map into an array.
    for(i in formaturlmapraw){
        formaturlmap[formaturlmapraw[i].split("|")[0]] = formaturlmapraw[i].split("|")[1];
    }
    if(fmt && formaturlmap[fmt]){ // If no fmt or selected quality is not available, use the highest quality available.
        var videosrc = formaturlmap[fmt];
    }else{
        var allfmt = new Array('22','18','35','34','5'); // Each format code from high to low quality.
        for (i in allfmt){ // Find the first that is available which is the highest quality available.
            if ( formaturlmap[allfmt[i]] ) { var fmt=allfmt[i]; break; }
        }
        var videosrc = formaturlmap[fmt];
    }
    return videosrc;
}

var to_array = function(raw) {
    var raw = raw.split("&");
    var parameters = new Array;
    for(i in raw){
        parameters[raw[i].split("=")[0]] = raw[i].split("=")[1];
    }
    return parameters;
}


// Detect any embedded videos

var test_embed = new RegExp("http://www.youtube.com/v/*","");
var find_embedsrc = new RegExp("http://www.youtube.com/v/([^?&]*)");

var handle_embed = function(embed) {
        var embedsrc = embed.getAttribute('src');
        if (test_embed.test(embedsrc)){
            var embedid = embedsrc.match(find_embedsrc)[1];
            load_embed(embed, embedid);
        }
}

var handle_event = function(event) {
    if (event.target.tagName.toLowerCase() == "embed") {
        handle_embed(event.target);
    }
}

document.body.addEventListener("DOMNodeInserted", handle_event, false); // Monitor for inserted players

var embeds = document.getElementsByTagName('embed'); // Get players loaded before we started monitoring

var static_embeds = new Array; // Get around automatically updating DOM Nodelist
for (i in embeds) {
    static_embeds[i] = embeds[i];
}
for (i in static_embeds) {
    handle_embed(static_embeds[i]);
}

// Detect YouTube video

var url = document.location.toString();

var test_YouTube = new RegExp("http://www.youtube.com/*");
if (test_YouTube(url)) {
    original_player = document.getElementById('movie_player');  // Save a reference to the original player
    if (original_player) { // Fail if no movie_player
        load_main(original_player);
    }
}