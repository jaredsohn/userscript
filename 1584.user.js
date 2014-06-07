// ==UserScript==
// @name            Flickr More Home
// @namespace       http://plutor.org/
// @description     Increases the amount of content on your Flickr home page
// @include         http://flickr.com/
// @include         http://www.flickr.com/
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

// DONE 2010-06-28
// * Ten images per row
// * Fix for new photostream HTML

// CONFIG lists the URLs for each type and the number
// of rows of images to display.  Default is 1 for yours,
// and 2 for everyone else's.
var CONFIG = {
    "recent-uploads-box": {
        url_element: ".hd h2 a",
        count: 1
    },
    "photos-from-box": {
        url: "http://www.flickr.com/photos/friends/",
        count: 2
    },
    "photos-of-box": {
        url: "http://www.flickr.com/photosof/contacts/",
        count: 2
    },
    "y-groups": {
        url_element: ".bd h3 a",
        count: 2
    }
};

// CACHE_AGE represents the number of seconds to wait from one update of the
// home page images to the next.  Clicking the "Refresh" button in the upper
// right corner of the home page will avoid this.
//
// 0 is "never cache", but there's no real reason to use anything but the
// default (15 minutes)
var CACHE_AGE = 15 * 60;     // 15 minutes

// THROBBER_SRC is the throbber image to use while loading
var THROBBER_SRC = 'data:image/gif;base64,R0lGODlhEAAQAOMIAAAAABoaGjMzM0xMTGZmZoCAgJmZmbKysv///////////////////////////////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQBCgAIACwAAAAAEAAQAAAESBDJiQCgmFqbZwjVhhwH9n3hSJbeSa1sm5GUIHSTYSC2jeu63q0D3PlwCB1lMMgUChgmk/J8LqUIAgFRhV6z2q0VF94iJ9pOBAAh+QQBCgAPACwAAAAAEAAQAAAESPDJ+UKgmFqbpxDV9gAA9n3hSJbeSa1sm5HUMHTTcTy2jeu63q0D3PlwDx2FQMgYDBgmk/J8LqWPQuFRhV6z2q0VF94iJ9pOBAAh+QQBCgAPACwAAAAAEAAQAAAESPDJ+YSgmFqb5xjV9gQB9n3hSJbeSa1sm5EUQXQTADy2jeu63q0D3PlwDx2lUMgcDhgmk/J8LqUPg+FRhV6z2q0VF94iJ9pOBAAh+QQBCgAPACwAAAAAEAAQAAAESPDJ+cagmFqbJyHV9ggC9n3hSJbeSa1sm5FUUXRTEDy2jeu63q0D3PlwDx3FYMgAABgmk/J8LqWPw+FRhV6z2q0VF94iJ9pOBAAh+QQBCgAPACwAAAAAEAAQAAAESPDJ+QihmFqbZynV9gwD9n3hSJbeSa1sm5GUYXSTIDy2jeu63q0D3PlwDx3lcMgEAhgmk/J8LqUPAOBRhV6z2q0VF94iJ9pOBAAh+QQBCgAPACwAAAAAEAAQAAAESPDJ+UqhmFqbpzHV9hAE9n3hSJbeSa1sm5HUcXTTMDy2jeu63q0D3PlwDx0FAMgIBBgmk/J8LqWPQOBRhV6z2q0VF94iJ9pOBAAh+QQBCgAPACwAAAAAEAAQAAAESPDJ+YyhmFqb5znV9hQF9n3hSJbeSa1sm5EUAHQTQTy2jeu63q0D3PlwDx0lEMgMBhgmk/J8LqUPgeBRhV6z2q0VF94iJ9pOBAAh+QQBCgAPACwAAAAAEAAQAAAESPDJ+c6hmFqbJwDV9hgG9n3hSJbeSa1sm5FUEHRTUTy2jeu63q0D3PlwDx1FIMgQCBgmk/J8LqWPweBRhV6z2q0VF94iJ9pOBAA7';

//
// =============================================================================
//

var PHOTOS_PER_ROW = 10;
var now = Math.floor((new Date().getTime())/1000);
var debug = 0;

function fmh_init() {
    $(".tt-col1").add(".tt-col2").css(
        {
            float: 'none',
            display: 'block',
            width: 'auto'
        }
    );

    get_more('recent-uploads-box');
    get_more('photos-from-box');
    get_more('photos-of-box');
    get_more('y-groups');
};

function get_more(id) {
    var area = $("#" + id);
    if (!area.get()) return;

    // Check cache
    var cache = load_cache(id);
    if (cache) {
        if (debug) GM_log("Using the cache for " + id);
        handle_more(id, cache, "", "");
    } else {
        // Show throbber
        area.find('ul.tt-thumbs').append(
            $('<li><img src="' + THROBBER_SRC + '"></li>').css('margin-top', '30px')
        );

        // Get more
        var more_url = CONFIG[id].url;
        if (more_url == undefined) {
            if (debug) GM_log("url_element is " + CONFIG[id].url_element + " for " + id);
            more_url = area.closest('.tt-block').find(CONFIG[id].url_element).eq(0).attr("href");
            if (id == 'y-groups' && more_url != undefined)
                more_url += 'pool/'; // Ugh
        }
        if (debug) GM_log( "Getting " + more_url + " for " + id );
        if (more_url == undefined) return;

        $.get(
            more_url,
            {},
            function(data, stat) { handle_more(id, new Array(), data, stat) }
        );
    }
}

function handle_more(id, photos, data, stat) {
    var area = $("#" + id);
    if (!area.get()) return;

    var page = $(data);
    var thispage = 0;

    // Get all the photos from the page
    page.find(".Photo, p.RecentPhotos, p.PoolList").each( function() {
        // Change the imgs to thumbnails
        var container = $(this);
        var img = container.find("img.pc_img");
        var src = img.attr('src');
        src = src.replace(/(_\w)?\.jpg$/i, "_s.jpg");
        var href = img.parent().attr('href');
        var title = img.attr('alt');
        var name = container.children("a").text();
        var namelink = container.children("a").attr('href');
        if (name && namelink)
            name = '<a href="' + namelink + '">' + name + '</a>'

        photos.push( {
            'src': src,
            'href': href,
            'title': title,
            'name': name
        } );
        thispage++;
    } );

    if (debug) GM_log( "Got " + photos.length + " for " + id );

    // If there were any, but not enough, get another page
    var wanted = CONFIG[id].count * PHOTOS_PER_ROW;
    if (photos.length < wanted && thispage > 0) {
        if (page.find("a.Next").length > 0) {
            // Get more
            var more_url = page.find("a.Next").eq(0).attr("href");
            if (debug) GM_log("Getting " + more_url + " for " + id);
            if (more_url) {
                $.get( more_url, {},
                       function(data, stat) { handle_more(id, photos, data, stat) }
                     );
                return
            }
        }

        if (debug) GM_log("Can't get more for " + id);
    } else {
        while (photos.length > wanted)
            photos.pop();
    }

    // Save to cache
    save_cache(id, photos);
 
    // Display
    var nameprefix = "From ";
    if (id == "photos-of-box") nameprefix = "A photo of ";

    var list = area.find('ul.tt-thumbs');
    list.empty();
    for (var i in photos) {
        var p = photos[i];
        if (debug) GM_log( "Appending '" + p.title + "' to " + id );
        var o = $('<li><span class="photo_container pc_s"><a title="' +
                  p.title + '" href="' + p.href +
                  '"><img height="75" width="75" class="pc_img" alt="' +
                  p.title + '" src="' + p.src + '"/></a></span>' +
                  (p.name ? '<br>' + nameprefix + p.name : "") +
                  '</li>');
        o.appendTo( list );
    }
}

function save_cache( id, list ) {
    var data = {
        'stamp': now,
        'list': list
    };
    GM_setValue(id, data.toSource());
    if (debug) GM_log("Saved cache for " + id);
}

function load_cache( id ) {
    // No cache for y-groups, Ugh
    if (id == 'y-groups') return;

    var data = GM_getValue( id );
    if (data) {
        try {
            data = eval(data);
        } catch (e) {
            if (debug) GM_log("Error evaluating cache: " + e);
            return null;
        }

        if (data && data.stamp && data.list) {
            if (debug) GM_log("Got cache for " + id + " stamped " + data.stamp);
            if (now - data.stamp <= CACHE_AGE) {
                return data.list;
            }
        }
    }

    if (debug) GM_log("No cache found for " + id);
    return null;
}

fmh_init();

