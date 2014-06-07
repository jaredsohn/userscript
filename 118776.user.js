// ==UserScript==                                                               
// @name DeviantArt Link Embedder
// @namespace da_link_embed
// @description Embeds DeviantArt links on Reddit
// @version 1.0.1
// @include http://reddit.com/*
// @include http://reddit.com/*/comments/*
// @include http://www.reddit.com/*
// @include http://www.reddit.com/*/comments/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @match http://reddit.com/*
// @match http://reddit.com/*/comments/*
// @match http://www.reddit.com/*
// @match http://www.reddit.com/*/comments/*
// @match http://backend.deviantart.com/oembed?url=*
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}
addJQuery(main);

    //this CSS is stolen from RES
    //I want the result identical, so why make it different?
    GM_addStyle(".expando-button.image { vertical-align:top !important; float: left; width: 23px; height: 23px; max-width: 23px; max-height: 23px; display: inline-block; background-image: url('http://f.thumbs.redditmedia.com/ykyGgtUvyXldPc3A.png'); margin-right: 6px; cursor: pointer; padding: 0px;}");
    GM_addStyle(".expando-button.image.collapsed {background-position: 0px 0px;}");
    GM_addStyle(".expando-button.image.collapsed:hover {background-position: 0px -24px;}");
    GM_addStyle(".expando-button.image.expanded {background-position: 0px -48px;}");
    GM_addStyle(".expando-button.image.expanded:hover {background-position: 0px -72px;}");
    //This line is mine though
    GM_addStyle(".da-direct img {display: block !important;}");

function main() {
$("body").on("DOMNodeInserted", "div.entry:not(.da-scanned)", scan);
$("div.entry:not(.da-scanned)").each(scan);

function scan(){
    if ($(this).is("div.entry:not(.da-scanned):has(:not(.domain) > a)")) {
        $(this).addClass("da-scanned").find(":not(.domain)>a").filter("a[href*='deviantart.com'], a[href*='fav.me']").each(addEmbedder)
    }
}

function addEmbedder() {
    var wrapper = null;
    var isComment = $(this).is(".md *");
    (isComment?$(this):$(this).parent()).after(
        $("<a>").addClass("expando-button collapsed image toggleImage").attr({
            "href": "javascript:void(0);", "link": $(this).attr("href")
        }).click(function(){
            var button = $(this).toggleClass("collapsed expanded");
            if (wrapper) {
                wrapper.toggle();
            } else {
                $.getJSON("http://backend.deviantart.com/oembed?url="+escape(unescape(button.attr("link")))+"&format=jsonp&callback=?", function(data){
                    wrapper = $("<div>").addClass("da-direct").html(
                        $("<a>").attr({"href": data.url, "target": "_blank"}).html(
                            $("<img>").addClass("RESImage" ).attr("src", data.url)
                        )
                    );
                    (isComment?button:button.siblings(".expando").last()).after(wrapper);
                });
            }
        })
    );
}
}
