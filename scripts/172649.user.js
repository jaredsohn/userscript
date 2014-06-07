// ==UserScript==
// @name       Tumblr - Browse Multiple Tags
// @namespace  https://www.metalmetalland.com
// @require    http://code.jquery.com/jquery-2.0.3.js
// @version    1.0
// @description  Allows you to view multiple tags on the tagged page, e.g., "http://www.tumblr.com/tagged/cats,dogs" will let you view posts tagged with cats as well as posts tagged with dogs.
// @match      http://www.tumblr.com/tagged/*
// @copyright  2013+, ebol4
// ==/UserScript==

var tagStringi = window.location.href.substring(29); //Cut out the http://www.tumblr.com/tagged/ part of the URL
if(tagStringi.indexOf(",") == -1) {} //If we're not looking at multiple tags, we don't need to run the script

else {
    $('.no_posts_found').remove(); //Remove that background "No Post Found :(" thing if it's there.
    $('.post_container').children(':not(".new_post_buttons")').remove(); //Remove the initial posts, but not the new post buttons.
    
    var postsToDisplay = []; //Container for all the posts we're gonna display
    var lastPostIDs = []; //The last post of each tag's ID so we can fetch the next page.
    var lastPostURLs = []; //The last post of each tag's permalink
    var lastPostBeforeValues = [];
    var loading = 1;
    var tagsGoneOver = 0;
    var tagsArray = tagStringi.split(","); //Get an array of the tags we're looking up
    var throttled = throttle(function() {        
        if ((window.innerHeight + window.scrollY) >= $('.post').last().offset().top*0.95 && lastPostIDs[1] > 0 && loading == 0) {
            loading = 1;
            for(var i = 0; i < lastPostIDs.length; i++) {
                getBeforeValue(i);
            }
        }}, 1000);
    for(var ii = 0; ii<tagsArray.length; ii++) {
        getNextPage(ii); //technically this is getting the very first page, not the "nextPage."
        
    }
    $(window).scroll(throttled);
}//END OF SCRIPT

function getBeforeValue(qq) {
    //Stolen from XKit's Timestamps extension by StudioXenix: http://www.studioxenix.com/
    //Thank you for making XKit open-source!
    var json_page_parts = lastPostURLs[qq].replace("http://","").split("/");
    var json_page = "http://" + json_page_parts[0] + "/api/read/json?id=" + lastPostIDs[qq];
    GM_xmlhttpRequest({
        method: "GET",
        dataType: "json",
        url: json_page,
        onload: function(response) {
            var rs = (response.responseText);
            var xs = rs.search('"unix-timestamp":');
            var xe = rs.indexOf(',', xs + 17);
            var xd = rs.substring(xs + 17, xe);
            lastPostBeforeValues[qq] = new String(xd);
            getNextPage(qq,lastPostBeforeValues[qq]);
        }
    });
}
function getNextPage(valueLOL,beforeValue) {
    //tagsArray.forEach(function(value, index) {
    
    var pageToGet = "http://www.tumblr.com/tagged/"+tagsArray[valueLOL]+"?before="+beforeValue;
    
    $.ajax({
        type:'GET',
        url:pageToGet,
        success: function(data) {
            data.split('<li class="post_container">').forEach(function(value,postIndex) {
                if(value.indexOf("div") > -1) {
                    postsToDisplay.push(value);
                    if (postIndex === 10) {
                        lastPostIDs[valueLOL] = $(value).attr("data-post-id");
                        //Stolen from XKit's Timestamps extension by StudioXenix: http://www.studioxenix.com/
                        //Thank you for making XKit open-source!
                        var permalink = $(value).find(".permalink").attr('href');
                        if ($(value).find(".post_permalink").length > 0) 
                            permalink = $(value).find(".post_permalink").attr('href');
                        lastPostURLs[valueLOL] = permalink;
                    }
                }
            });
            tagsGoneOver++;
            if(tagsGoneOver == tagsArray.length)
                sortAndAppend();
        }
    });
    //});
}
function sortAndAppend() {
    postsToDisplay.sort(function(a,b) {
        return $(b).data("post-id")-$(a).data("post-id");
    });
    var prependThis = '<li class="post_container">';
    var postsCombined = "";
    for(var i = 0; i<postsToDisplay.length; i++) {
        postsToDisplay[i] = prependThis+postsToDisplay[i];
        postsCombined = postsCombined+postsToDisplay[i];
    }
    $('.posts').append(postsCombined);		
    
    //Reload Tumblr's stuff; liking posts, etc.
    //Stolen from XKit's Soft-Refresh plugin by StudioXenix: http://www.studioxenix.com/
    //Thank you for XKit!
    if (typeof Tumblr === "undefined") {
        window.top.Tumblr.Events.trigger("posts:load");
        window.top.Tumblr.AudioPlayer.update_all();
        window.top.Tumblr.Events.trigger("DOMEventor:updateRect");
    } else {
        Tumblr.Events.trigger("posts:load");
        Tumblr.AudioPlayer.update_all();
        Tumblr.Events.trigger("DOMEventor:updateRect");
    }
    loading = 0;
    tagsGoneOver = 0;
    postsToDisplay = [];
    postsCombined = "";
}

//Stolen from underscore.js! http://underscorejs.org/
//Thank you!
function throttle(func, wait, immediate) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    var later = function() {
        previous = new Date();
        timeout = null;
        result = func.apply(context, args);
    };
    return function() {
        var now = new Date();
        if (!previous && immediate === false) previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0) {
            clearTimeout(timeout);
            timeout = null;
            previous = now;
            result = func.apply(context, args);
        } else if (!timeout) {
            timeout = setTimeout(later, remaining);
        }
            return result;
    };
}