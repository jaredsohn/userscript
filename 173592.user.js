// ==UserScript==
// @name        DPD
// @namespace   mg007
// @description Dailymotion Downloader
// @include		*.dailymotion.com/playlist/*
// @include		*.dailymotion.com/video/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @require     https://gist.github.com/mihirgokani007/6069371/raw/9f4fdf39dcd44ed4f9e025ffb665ae61e2c2eaf8/GM_XHR.js
// @require     https://raw.github.com/dinbror/bpopup/master/jquery.bpopup.min.js
// @version     1.0
// @copyright	2012+, Mihir Gokani
// ==/UserScript==

/**********************************************
 * NOTE: 
 * We're using a forked varsion of GM_XHR
 * compatible with latest jQuery. It is forked from
 * http://courses.ischool.berkeley.edu/i290-4/f09/resources/gm_jq_xhr.js
 * Read more: http://www.monperrus.net/martin/greasemonkey+jquery+and+xmlhttprequest+together
 * and here: http://ryangreenberg.com/archives/2010/03/greasemonkey_jquery.php
 * and here: http://blogs.ischool.berkeley.edu/i290-04f09/2009/09/16/working-around-the-same-origin-policy-in-greasemonkey/
**********************************************/

// Meta
var NAME = 'Dailymotion Downloader';
var URL = 'http://userscripts.org/scripts/show/173592';
var AUTHOR = 'Mihir Gokani';

// Don't run on frames or iframes
if (window.top != window.self)  return;

var PREFIX = 'DPD_';

var DM_PLAYLIST_PART = /^(https?:\/\/)?(www\.)?(dailymotion\.com\/playlist\/)([^\/]*)([^#]*)(.*)$/i;
var DM_VIDEO_PART = /^(https?:\/\/)?(www\.)?(dailymotion\.com\/video\/)([^\/]*)([^#]*)(.*)$/i;

// REF: http://stackoverflow.com/a/5040502
// NOTE: Compare with === because {} is used
var URL_TYPE = {UNKNOWN: 'UNKNOWN', VIDEO: 'VIDEO', PLAYLIST: 'PLAYLIST'};
if(Object.freeze) Object.freeze(URL_TYPE);

var DM_VIDEO_FORMATS = [
    {'id':'stream_h264_hd1080_url', 'name':'Full HD', 'description':'Full High Definition MP4', 'size':'1920x1080'}, 
    {'id':'stream_h264_hd_url', 'name':'HD', 'description':'High Definition MP4', 'size':'1280x720'},
    {'id':'stream_h264_hq_url', 'name':'HQ', 'description':'Standard Definition MP4', 'size':'848x420'}, 
    {'id':'stream_h264_url', 'name':'LD', 'description':'Low Definition MP4', 'size':'512x384'}, 
    {'id':'stream_h264_ld_url', 'name':'LQ', 'description':'Very Low Definition MP4', 'size':'320x240'}];
if(Object.freeze) Object.freeze(DM_VIDEO_FORMATS);

var DM_PARSER = /info\s*=\s*\{(.*?)\}/i;

var DM_VIDEO_FIELDS = ['id', 'title', 'description', 'available_formats', 'aspect_ratio', 'duration', 'url', 'embed_url', 'status', 'mode', 'type', 'channel.id', 'channel.name', 'channel.description', 'owner.id', 'owner.username', 'owner.screenname', 'owner.description', 'owner.url', 'owner.gender', 'owner.status', 'owner.type'].join();
var DM_PLAYLIST_FIELDS = ['id', 'name', 'description', 'videos_total', 'owner.id', 'owner.username', 'owner.screenname', 'owner.description', 'owner.url', 'owner.gender', 'owner.status', 'owner.type'].join();

var VIDEO_LINKS = [];
var VIDEO_LINKS_STATS = {"TOTAL":0, "SUCCESS":0, "ERROR":0, "WAITING":0};
/* NOTE: TOTAL is total number of links (SUCCESS + ERROR + WAITING + not yet explored) 
    WAITING is number of links explored but no reply (success or error) is received yet */

var DOM_IDS = {"CONTAINER":"container", "GENERATED":"generated", "TITLE":"title", "INDEX":"index",
                "BUTTON":"button", "PROGRESS":"progress", "PROGRESS_MSG":"p_message"};
for (var key in DOM_IDS)
    if(DOM_IDS.hasOwnProperty(key))
        DOM_IDS[key] = PREFIX + DOM_IDS[key];
if(Object.freeze) Object.freeze(DOM_IDS);

var DM_SELECTORS = {"VIDEO_PAGE_INJECT":"h1.pl_video_pagetitle", "PLAYLIST_PAGE_INJECT":"#playlist_name"};
if(Object.freeze) Object.freeze(DM_SELECTORS);

var DM_TEMPLATES = {
    "CONTAINER": 
        '<div id="' + DOM_IDS.CONTAINER + '"></div>\n',
    "GENERATED":
        '<table id="' + DOM_IDS.GENERATED + '" border="1">\n' + 
        '<thead>\n' +
        '<tr>\n' + 
        '<th class="' + DOM_IDS.INDEX + '" style="width:5%; max-width:5%; min-width:5%;">Index</th>\n' + 
        '<th class="' + DOM_IDS.TITLE + '" style="width:45%; max-width:45%; min-width:45%;">Title</th>\n' + 
        '<th colspan="' + DM_VIDEO_FORMATS.length + '" style="width:50%; max-width:50%; min-width:50%;">Links</th>\n' +
        '</tr>\n' +
        '</thead>\n' +
        '<tbody>\n' +
        '</tbody>\n' +
        '</table>\n',
    "PROGRESS":
        '<div id="' + DOM_IDS.PROGRESS + '">\n' +
        '<div class="' + DOM_IDS.PROGRESS_MSG + '"></div>\n' + 
        '<div style="background-color:#00ff66"></div>\n' + 
        '<div style="background-color:#ff0066"></div>\n' + 
        '<div style="background-color:#0099ff"></div>\n' + 
        '</div>\n',
    "BUTTON": 
        '<button id="' + DOM_IDS.BUTTON + '" class="button" title="Download">\n' +
        '<span class="icon icon-list"></span>\n' +
        '</button>\n',
    "MSG_FETCHING":
        '<span class="icon icon-loading" style="float:none"></span>\n', // icon-loading
    "MSG_VIDEO_FETCHED":
        '<span class="icon icon-link"></span>\n', // icon-plus // icon-check // icon-link // icon-video_url // icon-hd_1 // icon-hd_2
    "MSG_VIDEO_UNAVAILABLE":
        '<span class="icon icon-minus"></span>\n', // icon-alert // icon-block // icon-minus
}

var DM_STYLES = {
    "#{DOM_IDS.CONTAINER}": 
        {'display':'none', 'width':'80%', 'height':'500px', 'text-align':'center', 'background-color':'#f5f5f5', 'border-radius':'5px', 'overflow':'auto', 'overflow-y':'scroll'},
    "#{DOM_IDS.GENERATED}":
        {'width':'80%', 'height':'100%', 'padding':'1%', 'margin':'auto', 'border-collapse':'collapse', 'border-spacing':'0', 'table-layout':'fixed'},
    "#{DOM_IDS.GENERATED} thead th, #{DOM_IDS.GENERATED} thead td":
        {'text-align':'center', 'font-weight':'bold', 'color':'#fff', 'background-color':'#292929', 'border':'1px solid #111', 'border-radius':'3px'},
    "#{DOM_IDS.GENERATED} th.{DOM_IDS.TITLE}, #{DOM_IDS.GENERATED} td.{DOM_IDS.TITLE}":
        {'overflow':'hidden', 'text-overflow':'ellipsis', 'white-space':'nowrap'},
    "#{DOM_IDS.PROGRESS}": 
        {'width':'80%', 'height':'33px', 'padding':'1%', 'margin':'auto', 'background-color':'#292929', 'border':'1px solid #111', 'border-radius':'3px'},
    "#{DOM_IDS.PROGRESS} > div":
        {'width':'0', 'height':'33%', 'line-height':'11px', 'text-align':'right', 'float':'left', 'color':'#fff', 'border-radius':'2px'},
    "#{DOM_IDS.PROGRESS} > div.{DOM_IDS.PROGRESS_MSG}":
        {'width':'100%', 'height':'66%', 'line-height':'22px', 'text-align':'center', 'float':'none', 'color':'#fff', 'background-color':'transparent', 'border-radius':'0'}
}
for (var key1 in DM_STYLES) {
    if(DM_STYLES.hasOwnProperty(key1)) {
        var key1x = key1;
        for (var key2 in DOM_IDS) {
            if(DOM_IDS.hasOwnProperty(key2)) {
                var re = new RegExp("\\{DOM_IDS." + key2 + "\\}", "g");
                key1x = key1x.replace(re, DOM_IDS[key2]);
            }
        }
        DM_STYLES[key1x] = DM_STYLES[key1];
        delete DM_STYLES[key1];
    }
}
if(Object.freeze) Object.freeze(DM_STYLES);


/* 
// In userscript, we specify script as @require and css as @resource.
// REF: http://stackoverflow.com/a/8688552

function add_resource(content, type) {
    var head, element;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    if (type && type.toUpperCase() === 'CSS') {
        element = document.createElement('style');
        element.type = 'text/css';
    } else {
        element = document.createElement('script');
        element.type = 'text/javascript';
    }
    element.innerHTML = content;
    head.appendChild(element);
}
*/

function clean(content) {
    return unescape(content)
            .replace (/\\u0025/g,'%')
            .replace (/\\u0026/g,'&')
            .replace (/\\/g,'')
            .replace (/\n/g,'');
}

function create_stylesheet(content) {
    // content string: 'h1 { background: red; min-width: 80%; }'
    // or object: 'h1': {background: 'red', 'min-width': '80%'}
    var head = document.getElementsByTagName('head')[0],
        style = document.createElement('style');
    
    if (!(typeof content == 'string' || content instanceof String)) {
        var tmp = "";
        for(var selector in content) {
            if(content.hasOwnProperty(selector)) {
                var rule = content[selector];
                if (!(typeof rule == 'string' || rule instanceof String)) {
                    var t = " { \n";
                    for(var prop in rule)
                        if(rule.hasOwnProperty(prop))
                            t += prop + ": " + rule[prop] + "; \n";
                    rule = t + "} ";
                }
                tmp += selector + rule + "\n\n";
            }
        }
        content = tmp;
    }

    style.type = 'text/css';
    if (style.styleSheet){
        style.styleSheet.cssText = content;
    } else {
        style.appendChild(document.createTextNode(content));
    }

    head.appendChild(style);
    return style;
}

function initialize_stats() {
    VIDEO_LINKS_STATS.TOTAL = 0;
    VIDEO_LINKS_STATS.SUCCESS = 0;
    VIDEO_LINKS_STATS.ERROR = 0;
    VIDEO_LINKS_STATS.WAITING = 0;
}

function show_popup(onOpen, onClose) {
    $("#" + DOM_IDS.CONTAINER).bPopup({
        modalClose: false, 
        modalColor: '#000',
        opacity: 0.8,
        positionStyle: 'fixed', //'fixed' or 'absolute'
        scrollBar: true,
        follow: [false, false],
        // onOpen: onOpen, // We do not want to fire before open
        onClose: onClose
    }, onOpen); // We want to fire after open
}

function reveal_url(url) {
    if(DM_PLAYLIST_PART.test(url))
        return {
            "type": URL_TYPE.PLAYLIST, 
            "raw_id": url.match(DM_PLAYLIST_PART)[4], 
            "original_url": url,
            "clean_url": url.replace(DM_PLAYLIST_PART, "http://www.$3$4"), 
            "info_url": url.replace(DM_PLAYLIST_PART, "https://api.$3$4"),
            "videos_url": url.replace(DM_PLAYLIST_PART, "https://api.$3$4/videos")
        };
    
    else if(DM_VIDEO_PART.test(url))
        return {
            "type": URL_TYPE.VIDEO, 
            "raw_id": url.match(DM_VIDEO_PART)[4], 
            "original_url": url,
            "clean_url": url.replace(DM_VIDEO_PART, "http://www.$3$4"), 
            "info_url": url.replace(DM_VIDEO_PART, "https://api.$3$4")
        };
    
    return {"url": url, "url_type": URL_TYPE.UNKNOWN};
}

function dm_fetch_playlist(url, params, callback) {
    
    console.log("START", "dm_fetch_playlist", url, params);
    
    if(!params.page) params.page = 0;
    params.page += 1;
    
    $.get(url, params, function(playlist_videos) {
        
        if(callback) 
            setTimeout(function() { callback(playlist_videos) }, 1);
        
        if(playlist_videos.has_more)
            setTimeout(function() { dm_fetch_playlist(url, params, callback) }, 1);
        
    }, 'json');

    console.log("STOP", "dm_fetch_playlist");
}

function dm_process_video_links() {
    
    console.log("START", "dm_process_video_links", VIDEO_LINKS.length);
    
    while(VIDEO_LINKS.length) {
        
        var video_info = VIDEO_LINKS.shift();
        dm_output(video_info);
        
        console.log("Processing: ", video_info);
        
        VIDEO_LINKS_STATS.WAITING += 1;
        update_progress();
        
        $.ajax(video_info.embed_url, {
            type: 'GET',
            dataType: 'html',
            context: video_info
        }).done(function(content, status, xhr) {
            VIDEO_LINKS_STATS.SUCCESS += 1;
            var direct_links = dm_find_direct_links(content);
            dm_output(this, direct_links);
            console.log("Processing: SUCCESS", status);
        }).fail(function(xhr, status, msg) {
            VIDEO_LINKS_STATS.ERROR += 1;
            console.log("Processing: ERROR", status, msg);
        }).always(function() {
            VIDEO_LINKS_STATS.WAITING -= 1;
            update_progress();
        });
    }
    
    console.log("STOP", "dm_process_video_links");
}

/**
@function find_direct_links Finds all urls in given content.
@returns A list of urls of same length as DM_VIDEO_FORMATS.
    Each element of list is either a url or null (in case when
    url for that format is not found).
*/    
function dm_find_direct_links(content) {
    console.log("START", "dm_find_direct_links");
    
    var m = content.match(DM_PARSER);
    if(m) {
        var content = m[1];
        var direct_links = [];
        var format, parser, url, i;
        for (var i in DM_VIDEO_FORMATS) {
            if(DM_VIDEO_FORMATS.hasOwnProperty(i)) {
                format = DM_VIDEO_FORMATS[i];
                parser = '"' + format.id + '":"(.*?)"';
                m = content.match(parser);
                direct_links.push(m ? clean(m[1]) : null);
            }
        }
        return direct_links;
    }
    return [null, null, null, null, null];
    
    console.log("STOP", "dm_find_direct_links");
}

function update_progress(msg) {
    console.log("START", "update_progress", msg, VIDEO_LINKS_STATS);
    
    var progress_options = {duration: 500, queue: false};
    var $progress = $("#" + DOM_IDS.PROGRESS);
    var progress_width = $progress.width();
    
    if(VIDEO_LINKS_STATS.TOTAL == 0) {
        
        $("div", $progress).eq(1).css('width', 0);
        $("div", $progress).eq(2).css('width', 0);
        $("div", $progress).eq(3).css('width', 0);
        
        if(typeof msg !== 'undefined') 
            $("div", $progress).eq(0).html(msg);

    } else {
        /*
        $("div", $progress).eq(1)
            .animate({width: progress_width * VIDEO_LINKS_STATS.SUCCESS/VIDEO_LINKS_STATS.TOTAL}, progress_options)
            .html(VIDEO_LINKS_STATS.SUCCESS);
        $("div", $progress).eq(2)
            .animate({width: progress_width * VIDEO_LINKS_STATS.ERROR/VIDEO_LINKS_STATS.TOTAL}, progress_options)
            .html(VIDEO_LINKS_STATS.ERROR);
        $("div", $progress).eq(3)
            .animate({width: progress_width * VIDEO_LINKS_STATS.WAITING/VIDEO_LINKS_STATS.TOTAL}, progress_options)
            .html(VIDEO_LINKS_STATS.WAITING);
        */
        $("div", $progress).eq(1)
            .css('width', 100*VIDEO_LINKS_STATS.SUCCESS/VIDEO_LINKS_STATS.TOTAL + "%")
            .html(VIDEO_LINKS_STATS.SUCCESS || "");
        $("div", $progress).eq(2)
            .css('width', 100*VIDEO_LINKS_STATS.ERROR/VIDEO_LINKS_STATS.TOTAL + "%")
            .html(VIDEO_LINKS_STATS.ERROR || "");
        $("div", $progress).eq(3)
            .css('width', 100*VIDEO_LINKS_STATS.WAITING/VIDEO_LINKS_STATS.TOTAL + "%")
            .html(VIDEO_LINKS_STATS.WAITING || "");
        
        if(typeof msg !== 'undefined') 
            $("div", $progress).eq(0).html(msg);
        else $("div", $progress).eq(0).html(
            "Total " + VIDEO_LINKS_STATS.TOTAL + " videos: " 
            + VIDEO_LINKS_STATS.SUCCESS + " success, " 
            + VIDEO_LINKS_STATS.ERROR + " error, " 
            + VIDEO_LINKS_STATS.WAITING + " in queue");
    }
    
    console.log("STOP", "update_progress");
}

function dm_output(video_info, direct_links) {
    
    console.log("START", "dm_output");
    
    var $generated = $("#" + DOM_IDS.GENERATED);
    var video_info_class = PREFIX + video_info.id;
    var $video_element = $("." + video_info_class, $generated);
    var video_info_index = $("tbody td." + DOM_IDS.INDEX, $generated).length + 1;
    
    var direct_links_given = !!direct_links;
    direct_links = direct_links || [null, null, null, null, null];
    
    if(!$video_element.length) { // Does not already exist; Add
        
        var content = '<tr class="' + video_info_class + '">';
        content += '<td class="' + DOM_IDS.INDEX + '">' + video_info_index + '</td>';
        content += '<td class="' + DOM_IDS.TITLE + '">' + video_info.title + '</td>';
        
        for(var i in DM_VIDEO_FORMATS) {
            if(DM_VIDEO_FORMATS.hasOwnProperty(i)) {
                var format = DM_VIDEO_FORMATS[i];
                content += '<td class="' + PREFIX + format.id + '">';
                if(!direct_links_given) 
                    content += DM_TEMPLATES.MSG_FETCHING;
                else if(direct_links[i]) 
                    content += '<a href="' + direct_links[i] + '">' + DM_TEMPLATES.MSG_VIDEO_FETCHED + '</a>';
                else 
                    content += DM_TEMPLATES.MSG_VIDEO_UNAVAILABLE;
                content += '</td>';
            }
        }
        content += "</tr>";
        
        // REF: http://stackoverflow.com/a/171049
        $("tbody", $generated).append(content);
    } 
    
    else if(direct_links_given) { // Already exists and direct_links is given; Update
        var content;
        for(var i in DM_VIDEO_FORMATS) {
            if(DM_VIDEO_FORMATS.hasOwnProperty(i)) {
                var format = DM_VIDEO_FORMATS[i];
                if(direct_links[i]) 
                    content = '<a href="' + direct_links[i] + '">' + DM_TEMPLATES.MSG_VIDEO_FETCHED + '</a>';
                else 
                    content = DM_TEMPLATES.MSG_VIDEO_UNAVAILABLE;
                $("td." + PREFIX + format.id, $video_element).html(content);
            }
        }
    }

    console.log("STOP", "dm_output");
}

$(function() {
    
    initialize_stats();
    create_stylesheet(DM_STYLES);
    
    $(DM_TEMPLATES.CONTAINER)
        .append(DM_TEMPLATES.PROGRESS)
        .append(DM_TEMPLATES.GENERATED)
        .appendTo('body');
    
    var urlx = reveal_url(window.location.href);
    var $button = $(DM_TEMPLATES.BUTTON);
    
    // If it is a video page
    if (urlx.type === URL_TYPE.VIDEO) {
      
        console.info("MODE: Single video");

        $button.addClass("expand_button").css("right", "50px")
                .appendTo(DM_SELECTORS.VIDEO_PAGE_INJECT).click(function() {
            
            show_popup(function() {
                
                console.log(PREFIX + "Loading...", urlx);
                update_progress("Loading...");
                
                $.get(urlx.info_url, {
                    fields: DM_VIDEO_FIELDS
                }, function(video_info) {
                    
                    console.log(PREFIX + "Received Video Info", video_info);
                    
                    VIDEO_LINKS_STATS.TOTAL = 1;
                    //VIDEO_LINKS_STATS.WAITING = 1;
                    update_progress();
                    
                    VIDEO_LINKS.push(video_info);
                    setTimeout(dm_process_video_links, 1);
                    
                }, 'json');
                
            });
            
        });
    }
    
    // If it is a playlist page
    else if (urlx.type === URL_TYPE.PLAYLIST) {
      
        console.info("MODE: Playlist");

        $button.appendTo(DM_SELECTORS.PLAYLIST_PAGE_INJECT).click(function() {

            show_popup(function() {
                
                console.log(PREFIX + "Loading...", urlx);
                update_progress("Loading...");
                
                $.get(urlx.info_url, {
                    fields: DM_PLAYLIST_FIELDS
                }, function(playlist_info) {
                    
                    console.log(PREFIX + "Received Playlist Info", playlist_info);
                    VIDEO_LINKS_STATS.TOTAL = playlist_info.videos_total;
                    
                    dm_fetch_playlist(urlx.videos_url, {
                        fields: DM_VIDEO_FIELDS,
                        limit: 20
                    }, function(playlist_videos) {
                        
                        console.log(PREFIX + "Received Playlist Videos", playlist_videos);
                        //VIDEO_LINKS_STATS.WAITING += playlist_videos.list.length;
                        //update_progress();
                        
                        VIDEO_LINKS.push.apply(VIDEO_LINKS, playlist_videos.list);
                        setTimeout(dm_process_video_links, 1);
                    });
                    
                }, 'json');
                
            });
            
        });
    }
});




