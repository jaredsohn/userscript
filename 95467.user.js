// ==UserScript==
// @name           permalink-comments
// @namespace      stackoverflow
// @description    provide permalink functionality for comments
// @include        http://stackoverflow.com/*
// @include        http://serverfault.com/*
// @include        http://superuser.com/*
// @include        http://meta.stackoverflow.com/*
// @include        http://meta.serverfault.com/*
// @include        http://meta.superuser.com/*
// @include        http://*.stackexchange.com/*
// @include        http://askubuntu.com/*
// @include        http://meta.askubuntu.com/*
// @include        http://answers.onstartups.com/*
// @include        http://meta.answers.onstartups.com/*
// @author         Benjamin Dumke

// ==/UserScript==
// Thanks to Shog9 for this idea for making the script work in both
// Chrome and Firefox:
// http://meta.stackoverflow.com/questions/46562
function with_jquery(f) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.textContent = "(" + f.toString() + ")(jQuery)";
    document.body.appendChild(script);
};

with_jquery(function($) {

    var apiKey = "NpdPm6xv60SiXoGdE7732Q";

    var putPermalinks = function() {
        $(".comment-date").each(function() {
            var content = $(this).find("span");
            if (content.length == 0)
                return;
            var link = $("<a />").attr("href", "#" + $(this).closest(".comment").attr("id")).attr("title", content.attr("title")).html(content.html());
            link.css({"text-decoration": content.css("text-decoration"), "color": content.css("color"), "border-bottom-width": content.css("border-bottom-width")});
            content.replaceWith(link);
        });
    };
    putPermalinks();
    $(document).ajaxComplete(putPermalinks);   
    
    var hash = window.location.hash;
    if (/^\/questions\/\d+/.test(window.location.pathname) && /^#comment-\d+$/.test(hash) && $(window.location.hash).length == 0)
    {
        var goThere = function() {
            if ($(hash).length > 0) {
                window.location.hash = "";
                window.location.hash = hash;
                $(document).unbind("ajaxComplete", goThere);
            }
        };
                
        window.apiCommentCallback = function (data) {
            if (data.comments.length != 1)
                return;
            var comment = data.comments[0];
            var jComments = $("#comments-" + comment.post_id);
            if (jComments.length == 0) {
                console.log("post isn't here");
                return;
            }
            var showAll = jComments.nextAll(".comments-link").last(); // the ".last()" is for compatibility with my reply-links script
            if (showAll.text().search("more") == -1) {
                console.log("post has no hidden comments")
                return;
            }
            $(document).ajaxComplete(goThere);
            showAll.click();
        };
        var url = "http://api." + window.location.host + "/1.0/comments/" + hash.replace("#comment-", "") + "?jsonp=window.apiCommentCallback&key=" + apiKey;
        $("<script type='text/javascript' src='" + url +"' />").appendTo("body");
    }
        
});
