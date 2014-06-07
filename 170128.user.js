// ==UserScript==
// @name        dxbooru: dx's random tweaks to boorus
// @namespace   dx
// @include     *://danbooru.donmai.us/*
// @include     *://hijiribe.donmai.us/*
// @include     *://sonohara.donmai.us/*
// @include     *://gelbooru.com/*
// @include     *://www.gelbooru.com/*
// @include     *://chan.sankakucomplex.com/*
// @include     *://idol.sankakucomplex.com/*
// @include     *://behoimi.org/*
// @include     *://www.behoimi.org/*
// @include     *://konachan.tld/*
// @include     *://yande.re/*
// @include     *://shimmie.katawa-shoujo.com/*
// @require     http://code.jquery.com/jquery-1.10.0.min.js
// @version     2.0.2
// @updateURL   https://userscripts.org/scripts/source/170128.meta.js
// @downloadURL https://userscripts.org/scripts/source/170128.user.js
// @icon        data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABABAMAAABYR2ztAAAAG1BMVEUhAAAAAACFbZqNdqGNd6GReqSSfaWXgamahqvxyi3NAAAAAXRSTlMAQObYZgAAAGVJREFUSMdjYBhEQBAroKcCQcEODEBfBdilQZheCrAHEUQR/RRgd+KogvJyQcE0IKC/gnIgCAUCYyAQFHRxUVKipwJjKFCCA0FBCEk/BUoYYFQBQgFS+TJAClBKWTooGOjaahAAAKy9X8A0GgnAAAAAAElFTkSuQmCC
// ==/UserScript==

// any additional sites might just work out of the box by adding to @include above

// here's a technical-ish summary of the differences between each supported kind of booru:
// danbooru 2.0
// - sites: danbooru.donmai.us
// - tags used: html5 tags like article, aside, header
// danbooru 1.0 (and compatible)
// - sites: behoimi (3dbooru), gelbooru, sankaku (chan, idol)
// - tags used: span.thumb#p1234 a img.preview
// moebooru:
// - yande.re, konachan
// - tags used: ul#post-list-posts li#p1234 div.inner a.thumb img.preview
// - usually has black background

// mark clicked links with half opacity
// danbooru 2.0, 1.0, moebooru
$(document).on("mousedown", "article a, span.thumb a, div.inner a.thumb", null, function(e) { $(this).css("opacity", 0.5);});

var style = [];

// fuck you header, nobody cares about you
// danbooru 2.0 only
style.push("header#top > h1 {float: left; font-size: 20px !important;}");

// smaller sidebar
// danbooru 2.0, 
style.push("div#page aside#sidebar, div#content div.sidebar {width: 170px;}");

// scale 150% on hover
// danbooru 2.0, 1.0, moebooru
style.push(
"article:hover, span.thumb:hover, div.inner:hover {overflow: visible !important;}",
"article:hover img, span.thumb:hover img, div.inner:hover a.thumb img.preview {",
"  position: relative;",
"  transform: scale(1.5, 1.5);",
"  box-shadow: 0 0 5px rgba(0,0,0, 0.3), 0 0 15px 8px white;",
"  z-index: 100;",
"}",
// yande.re only
"div.inner:hover a.thumb img.preview {box-shadow: 0 0 5px rgba(255,255,255, 0.3), 0 0 15px 8px black;}",
// danbooru fix
"#has-parent-relationship-preview, #has-children-relationship-preview {overflow: visible;}",
"#has-parent-relationship-preview article.post-preview, #has-children-relationship-preview article.post-preview {float: left;}"
);

GM_addStyle(style.join("\n"));