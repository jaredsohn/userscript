// ==UserScript==
// @name       GrommrMinusSkype
// @namespace  http://www.grommr.com/
// @version    0.1
// @description  Filters out skype resquests from the global and local newsfeeds on Grommr
// @match      http://www.grommr.com/*
// @copyright  2012+, tooea53hy
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==
function gshowNextPosts(action, skip) {
    if (lastSkip == 0 || skip < lastSkip) {
        lastSkip = skip;
        $("#scroll-link").css('visibility', 'visible');
        $.ajax({ type: 'GET', url: action + '?skip=' + skip, cache: false, success: function (result) {
            $("#scroll-link").remove();
            $("#posts").append(result);
            filterPosts($('div.post'));
        }, error: function () {
                $("#scroll-link").remove();
        }});
	}
}
function filterPosts(posts) {
    var postFilter = /skype/i;
    for(var i=0; i<posts.length; i++) {
        if ($(posts[i]).html().match(postFilter)) {
            $(posts[i]).hide();
        }
    }
    $('#scroll-link').attr('onclick', 'g' + $('#scroll-link').attr('onclick'));
}
function checkForLoadedPosts() {
	var posts = $('div.post');
    if (posts.length > 0) {
        filterPosts(posts);
    } else {
        window.setTimeout(checkForLoadedPosts, 200);
    }
}
function appendScript(func) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = func.toString();
    document.getElementsByTagName('body')[0].appendChild(script);
}
$(document).ready(function() {
    appendScript(gshowNextPosts);
    appendScript(filterPosts);
    checkForLoadedPosts();
});
