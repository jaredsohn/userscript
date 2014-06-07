// ==UserScript==
// @name           StackExchange™ Slugified LinkSharer
// @namespace      http://shawnchin.github.com
// @description    Adds an extra link to share posts using full slugified URL
// @include        http://stackoverflow.com/questions/*
// @include        http://superuser.com/questions/*
// @include        http://serverfault.com/questions/*
// @include        http://meta.stackoverflow.com/questions/*
// @include        http://meta.superuser.com/questions/*
// @include        http://meta.serverfault.com/questions/*
// @include        http://stackapps.com/questions/*
// @include        http://askubuntu.com/questions/*
// @include        http://meta.askubuntu.com/questions/*
// @include        http://*.stackexchange.com/questions/*
// ==/UserScript==

function EmbedFunctionOnPageAndExecute(function_contents)
{
    var exec_script = document.createElement('script');
    exec_script.type = 'text/javascript';
    exec_script.textContent = "(" + function_contents.toString() + ")()";
    document.getElementsByTagName('head')[0].appendChild(exec_script);
}

EmbedFunctionOnPageAndExecute(function() {
    var base_url = "/" + window.location.href.split("/").slice(3,6).join("/");
    $(".post-menu").find("a:first").each(function() {
        var a_type = this.href.split("/")[3],
            post_id = this.id.split("-")[2];
            extra = (a_type == "q") ? "" : "/" + post_id + "#" + post_id,
            full_url = base_url + extra;
        
        $("<a />", {
            title : "Full permalink to this post",
            text : "+",
            href : full_url
            }).append($("<span/>", {text:"link"}).addClass("dno")) // dummy text to trigger magic popup
            .insertAfter(this);
    });
});