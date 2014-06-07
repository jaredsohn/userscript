// ==UserScript==
// @id             youtubeslimfeed@labm0nkey
// @name           Youtube Slimfeed
// @version        1.5.2
// @namespace      
// @author         labm0nkey
// @description    Reduces size of each subscription item and removes or makes more visible which video was watched
// @require        http://code.jquery.com/jquery-latest.min.js
// @include        http://www.youtube.com/feed/subscriptions
// @include        https://www.youtube.com/feed/subscriptions
// @include        http://youtube.com/feed/subscriptions/*
// @include        http://*.youtube.com/feed/subscriptions/*
// @include        https://youtube.com/feed/subscriptions/*
// @include        https://*.youtube.com/feed/subscriptions/*
// resource       css style.css
// @run-at         document-end
// @icon	       data:image/png;base64,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

// ==/UserScript==

//google chrome fix
if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported") > -1)) {
    this.GM_getValue = function (key, def) {
        return localStorage[key] || def;
    };
    this.GM_setValue = function (key, value) {
        return localStorage[key] = value;
    };
    this.GM_deleteValue = function (key) {
        return delete localStorage[key];
    };
}

(function ($) {

    var debug = false;
    // classes
    var c = {
        slim: {
            watched: ".slim-watched",
            hidden: ".slim-hidden",
            clicked: ".slim-clicked",
            item: ".slim-item",
            resize: ".slim-resize",
            slimmed: ".slim-slimmed",
            toggle: ".toggleHide"
        },
        yt: {
            item: ".feed-item-container",
            menu: ".feed-item-action-menu",
            thumb: ".yt-lockup-thumbnail",
            navigation: "#channel-navigation-menu",
            feed: ".individual-feed",
            container: ".feed-container"
        }
    };

    if (debug) {
        for (var i in c) {
            console.log(i, c[i]);
            for (var a in c[i]) {
                console.log(a, $(c[i][a]));
            }
        }
    }

    // options
    var o = {
        hidden: {name: "sf.hidden", "default": true},
        watchedShow: {name: "sf.watched.show", "default": "Show watched"},
        watchedHide: {name: "sf.watched.hide", "default": "Hide watched"}
    };

    function dot(str) {
        return str.substring(1);
    }

    $.fn.slimHide = function () {
        return this.each(function () {
            $(this).find(c.yt.thumb + " .watched").each(function () {
                var list = $(this).closest(c.yt.item);
                list.addClass(dot(c.slim.watched));

                if (getSF(o.hidden))
                    list.addClass(dot(c.slim.hidden));
                else
                    list.removeClass(dot(c.slim.hidden));
            });

            $(this).find(".yt-lockup-tile a, .yt-lockup-thumbnail a").each(function () {
                $(this).mouseup(function () {
                    var list = $(this).closest(c.yt.item);
                    if (!list.hasClass(dot(c.slim.watched)))
                        list.addClass(dot(c.slim.clicked));
                });
            });
        });
    };

    $.fn.slimStyle = function () {
        return this.each(function () {
            if (!$(this).hasClass(dot(c.slim.slimmed))) {
                $(this).addClass(dot(c.slim.slimmed));
                $(this).addClass(dot(c.slim.item));
                if ($(this).find(c.slim.resize).length == 0) {
                    var resize = $(document.createElement('div')).addClass(dot(c.slim.resize));

                    resize.click(function () {
                        $(this).closest(c.yt.item).toggleClass(dot(c.slim.item));
                    });
                    resize.prependTo($(this).find(c.yt.menu));
                }

                $(this).find(c.yt.thumb).on({
                    mouseenter: function (e) {
                        $("body").append("<p id='sf-preview'><img src='" + $(this).find('.yt-thumb-clip img').attr('src') + "' alt='Image preview' /></p>");
                        var p = $(this).offset();
                        var preview = $("#sf-preview");
                        var width = preview.outerWidth();
                        preview
                            .css("top", p.top - 1)
                            .css("left", (p.left - width));
                    },
                    mouseleave: function () {
                        $("#sf-preview").remove();
                    }
                });
            }
            $(this).slimHide();
        });
    };

    var cssTxt = "";
    if (debug) {
        cssTxt = GM_getResourceText("css");
    } else {
        cssTxt = ".branded-page-v2-col-container{max-width:900px;margin:0 auto}.feed-list{overflow:hidden}.feed-list .feed-item-container.legacy-style{margin:0}.feed-list .feed-item-container.legacy-style.legacy-style:first-child{margin-top:0}.feed-list .feed-item-container.legacy-style .post-item:hover .feed-item-action-menu{right:0}.feed-list .feed-item-container.legacy-style .post-item .feed-item-main{width:100%;margin:0}.feed-list .feed-item-container.legacy-style .post-item .feed-item-main>div{padding-left:76px}.feed-list .feed-item-container.legacy-style .post-item .feed-author-bubble-container{height:100%;width:38px;position:absolute;top:0;left:0;border-right:1px solid #e2e2e2;background:#f3f3f3}.feed-list .feed-item-container.legacy-style .post-item .feed-author-bubble-container .feed-author-bubble{margin:0;padding:0;background:none;height:100%;width:100%}.feed-list .feed-item-container.legacy-style .post-item .feed-author-bubble-container .feed-author-bubble .feed-item-author{margin:2px}.feed-list .feed-item-container.legacy-style .post-item .feed-author-bubble-container .feed-author-bubble .feed-item-author .video-thumb{width:32px;background:#fff;border:1px solid #d3d3d3}.feed-list .feed-item-container.legacy-style .post-item .feed-author-bubble-container .feed-author-bubble .feed-item-author .video-thumb img{width:34px;height:34px}.feed-list .feed-item-container.legacy-style .post-item .feed-item-action-menu{background:#f1f1f1;right:-33px;top:0;height:38px;width:32px;-webkit-transition:right 0.3s ease;-moz-transition:right 0.3s ease;-o-transition:right 0.3s ease;transition:right 0.3s ease;border-left:1px solid #e2e2e2;border-bottom:1px solid #e2e2e2;z-index:30}.feed-list .feed-item-container.legacy-style .post-item .feed-item-action-menu .yt-uix-button-feed-item-action-menu{padding:0;height:100%;width:16px}.feed-list .feed-item-container.legacy-style .post-item .feed-item-action-menu .slim-resize{float:left;width:10px;height:24px;margin:7px 3px;z-index:99;cursor:pointer;background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAYCAYAAAAoG9cuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAHlJREFUeNpiZEACq9asNwBS64E4MCwk8AJMnBFNwX4gFgDiD0DsCFPIiEUBDMAVMuJQgKKQBUg4APFEqGA9koJGKO3AiObw/zA20Bq4HBMDEYB6ioY3GIwhDkpPBUhpCVtS+QBKTwdwJLp6WKIjLvkSnREIZSmAAAMApsw4GVv+GT8AAAAASUVORK5CYII=');background-repeat:no-repeat}.feed-list .slim-item.legacy-style{margin:0;-webkit-transition:background 0.5s ease;-moz-transition:background 0.5s ease;-o-transition:background 0.5s ease;transition:background 0.5s ease}.feed-list .slim-item.legacy-style .post-item{height:38px;border-bottom:1px solid #e2e2e2}.feed-list .slim-item.legacy-style .post-item .feed-item-main{margin:0;padding:0;position:absolute;width:auto;top:0;left:38px;right:0;height:38px;min-height:38px;-webkit-transition:right 0.3s ease;-moz-transition:right 0.3s ease;-o-transition:right 0.3s ease;transition:right 0.3s ease}.feed-list .slim-item.legacy-style .post-item .feed-item-main>div{padding:0}.feed-list .slim-item.legacy-style .post-item .feed-item-main .feed-item-header{position:absolute;top:0;left:68.59615384615384px;margin:0;background:#f1f1f1;height:16px;border-bottom:1px solid #e2e2e2;border-right:1px solid #e2e2e2;padding:0 8px;z-index:10;overflow:hidden;max-width:400px}.feed-list .slim-item.legacy-style .post-item .feed-item-main .feed-item-header .feed-item-actions-line{height:100%;display:block;line-height:16px;font-size:12px}.feed-list .slim-item.legacy-style .post-item .feed-item-main .feed-item-header .feed-item-actions-line>a{font-weight:bold}.feed-list .slim-item.legacy-style .post-item .feed-item-main .feed-item-header .feed-item-actions-line .feed-item-owner{height:100%;display:inline-block;border-right:1px solid #e2e2e2;padding-right:8px;margin-right:6px;font-size:11px}.feed-list .slim-item.legacy-style .post-item .feed-item-main .feed-item-main-content{position:absolute;top:0;left:0;right:0;height:38px}.feed-list .slim-item.legacy-style .post-item .feed-item-main .feed-item-main-content .feed-item-content-wrapper{border:0}.feed-list .slim-item.legacy-style .post-item .feed-item-main .feed-item-main-content .feed-item-post{display:none}.feed-list .slim-item.legacy-style .post-item .feed-item-main .feed-item-main-content .yt-lockup{margin:0;height:38px}.feed-list .slim-item.legacy-style .post-item .feed-item-main .feed-item-main-content .yt-lockup .yt-lockup-thumbnail{margin:0;height:38px;border-right:1px solid #e2e2e2}.feed-list .slim-item.legacy-style .post-item .feed-item-main .feed-item-main-content .yt-lockup .yt-lockup-thumbnail .watched-badge{left:0}.feed-list .slim-item.legacy-style .post-item .feed-item-main .feed-item-main-content .yt-lockup .yt-lockup-thumbnail .yt-uix-sessionlink{height:38px}.feed-list .slim-item.legacy-style .post-item .feed-item-main .feed-item-main-content .yt-lockup .yt-lockup-thumbnail .yt-uix-sessionlink .yt-thumb{height:38px;width:67.59615384615384px}.feed-list .slim-item.legacy-style .post-item .feed-item-main .feed-item-main-content .yt-lockup .yt-lockup-thumbnail .yt-uix-sessionlink .yt-thumb img{height:38px;width:67.59615384615384px}.feed-list .slim-item.legacy-style .post-item .feed-item-main .feed-item-main-content .yt-lockup .yt-lockup-content{position:absolute;top:0;left:67.59615384615384px;right:0;height:38px;overflow:visible}.feed-list .slim-item.legacy-style .post-item .feed-item-main .feed-item-main-content .yt-lockup .yt-lockup-content .yt-lockup-title{margin:0;position:absolute;bottom:0;left:0;height:23px;padding:0 8px}.feed-list .slim-item.legacy-style .post-item .feed-item-main .feed-item-main-content .yt-lockup .yt-lockup-content .yt-lockup-title a{height:23px;line-height:23px;font-size:12px}.feed-list .slim-item.legacy-style .post-item .feed-item-main .feed-item-main-content .yt-lockup .yt-lockup-content .yt-lockup-meta{margin:0;position:absolute;top:0;right:0;background:#f1f1f1;height:16px;border-bottom:1px solid #e2e2e2;border-left:1px solid #e2e2e2;padding:0}.feed-list .slim-item.legacy-style .post-item .feed-item-main .feed-item-main-content .yt-lockup .yt-lockup-content .yt-lockup-meta .yt-lockup-meta-info{height:16px;line-height:16px;font-size:11px}.feed-list .slim-item.legacy-style .post-item .feed-item-main .feed-item-main-content .yt-lockup .yt-lockup-content .yt-lockup-meta .yt-lockup-meta-info li{padding:0 8px;font-weight:bold}.feed-list .slim-item.legacy-style .post-item .feed-item-main .feed-item-main-content .yt-lockup .yt-lockup-content .yt-lockup-meta .yt-lockup-meta-info li:before{content:none}.feed-list .slim-item.legacy-style .post-item .feed-item-main .feed-item-main-content .yt-lockup .yt-lockup-content .yt-lockup-meta .yt-lockup-meta-info li:last-child{display:none}.feed-list .slim-item.legacy-style .post-item .feed-item-main .feed-item-main-content .yt-lockup .yt-lockup-content .yt-lockup-meta .yt-lockup-meta-info li:first-child+li{border-left:1px solid #e2e2e2}.feed-list .slim-item.legacy-style .post-item .feed-item-main .feed-item-main-content .yt-lockup .yt-lockup-content .yt-lockup-description{display:none}.feed-list .slim-item.legacy-style .post-item .feed-item-main .feed-item-main-content .yt-lockup.yt-lockup-playlist .yt-lockup-content .yt-lockup-meta{display:none}.feed-list .slim-item.legacy-style .post-item .feed-item-main .feed-item-main-content .yt-lockup.yt-lockup-playlist .yt-lockup-content .yt-lockup-playlist-items{display:block;position:absolute;top:0;right:0;height:auto;max-height:38px;max-width:160px;-webkit-transition:all 0.3s ease;-moz-transition:all 0.3s ease;-o-transition:all 0.3s ease;transition:all 0.3s ease;z-index:20;overflow:hidden;border-bottom:0}.feed-list .slim-item.legacy-style .post-item .feed-item-main .feed-item-main-content .yt-lockup.yt-lockup-playlist .yt-lockup-content .yt-lockup-playlist-items .yt-lockup-playlist-item{padding:0 8px;height:19px;line-height:19px}.feed-list .slim-item.legacy-style .post-item .feed-item-main .feed-item-main-content .yt-lockup.yt-lockup-playlist .yt-lockup-content .yt-lockup-playlist-items .yt-lockup-playlist-item:hover{background:#f8f8f8}.feed-list .slim-item.legacy-style .post-item .feed-item-main .feed-item-main-content .yt-lockup.yt-lockup-playlist .yt-lockup-content .yt-lockup-playlist-items:hover{border-right:1px solid #e2e2e2;max-height:60px;max-width:320px;z-index:999}.feed-list .slim-item.legacy-style .post-item .feed-item-main .feed-item-main-content .channel-lockup{height:38px;margin:0;box-shadow:none}.feed-list .slim-item.legacy-style .post-item .feed-item-main .feed-item-main-content .channel-lockup .feed-item-thumb{width:67.59615384615384px;height:38px;text-align:center;margin:0}.feed-list .slim-item.legacy-style .post-item .feed-item-main .feed-item-main-content .channel-lockup .feed-item-thumb .video-thumb{width:38px}.feed-list .slim-item.legacy-style .post-item .feed-item-main .feed-item-main-content .channel-lockup .feed-item-thumb .video-thumb img{width:38px}.feed-list .slim-item.legacy-style .post-item .feed-item-main .feed-item-main-content .channel-lockup .feed-item-content{position:relative;height:100%;padding:0}.feed-list .slim-item.legacy-style .post-item .feed-item-main .feed-item-main-content .channel-lockup .feed-item-content .feed-item-channel-rec-text{position:absolute;bottom:0;left:0;right:0;padding:0 8px;height:20px;line-height:20px}.feed-list .slim-item.legacy-style .post-item .feed-item-main .feed-item-main-content .channel-lockup .feed-item-content .feed-subscribe-button{margin:8px}.feed-list .slim-item.legacy-style:hover{background:#f4fce8 !important}.feed-list .slim-item.legacy-style:hover .feed-item-main{right:32px;opacity:1}.feed-list .slim-item.legacy-style.slim-watched{background:#f3f3f3}.feed-list .slim-item.legacy-style.slim-watched .feed-item-main{opacity:.7}.feed-list .slim-item.legacy-style.slim-clicked{background:#fcfbe3}.feed-list .slim-item.legacy-style.slim-clicked .feed-item-main{opacity:.7}.feed-list .slim-item.legacy-style.slim-hidden{display:none}#sf-preview{width:200px;z-index:19999999999;position:absolute;border:1px solid #e2e2e2;background:#f1f1f1;padding:2px}#sf-preview img{width:100%}.feed-header{margin:0;height:38px}.feed-header .feed-manage-link{height:35px !important}.feed-header #channel-navigation-menu li{margin-left:4px}.feed-header #channel-navigation-menu li .yt-uix-button-epic-nav-item,.feed-header #channel-navigation-menu li .epic-nav-item-heading{height:32px;line-height:32px;box-shadow:none}";
    }

    GM_addStyle(cssTxt);

    $(c.yt.navigation).append('<li class="' + dot(c.slim.toggle) + '"><h2 class="epic-nav-item-heading">' + (getSF(o.hidden) ? getSF(o.watchedShow) : getSF(o.watchedHide)) + '</h2></li>');

    $(c.yt.container).on('DOMNodeInserted', function (event) {
        if ($(event.target).hasClass(dot(c.yt.item))) {
            $(event.target).slimStyle();
            console.log("slimStyle");
        }
    });

    // first run
    $(c.yt.feed).find(c.yt.item).slimStyle();

    $(c.slim.toggle).click(function () {
        setSF(o.hidden, !getSF(o.hidden));
        $(c.yt.feed).find(c.yt.item).slimHide();
        $(c.slim.toggle + " h2").text(getSF(o.hidden) ? getSF(o.watchedShow) : getSF(o.watchedHide));
    });

    function getSF(key) {
        if (GM_getValue(key.name) == undefined) {
            setSF(key, key.default);
            return key.default;
        } else {
            return GM_getValue(key.name, name);
        }
    }

    function setSF(key, value) {
        GM_setValue(key.name, value);
    }
})
    (jQuery);
