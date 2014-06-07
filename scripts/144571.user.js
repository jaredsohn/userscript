// ==UserScript==
// @name        Faleij's Extended Like & Flag UI for ESPN
// @namespace   faleij
// @description Extends the user interface by displaying the first 7 names of those whom liked or flagged a post
// @include     http://*.go.com/*
// @updateURL  	http://userscripts.org/scripts/source/144571.meta.js
// @version     0.1.10
// @run-at      document-start
// ==/UserScript==
var func = function () {
    if (("Echo" in unsafeWindow)) {
        console.log(("Echo" in unsafeWindow));
        var Echo = unsafeWindow.Echo;
        if (("createPlugin" in unsafeWindow.Echo)) {
            (function ($) {
                var max = 7;

                var plugin = Echo.createPlugin({name:"ItemContentNormalizer", applications:["Stream"], init:function (plugin, application) {
                    plugin.extendRenderer("Item", "likes", plugin.renderers.Item.likes);
                    plugin.extendRenderer("Item", "body", plugin.renderers.bodyItemRenderer);
                    console.log("Faleijs Extended Like and Flag Plugin inited!");
                }});

                plugin.renderers = {"Item":{
                    "likes":function (element) {
                        var item = this;
                        var count = item.data.object.accumulators.likesCount || 0;
                        if (!count) {
                            element.hide();
                            return;
                        }
                        var html = "";
                        var title = "";
                        var len = item.data.object.likes.length;
                        for (var i = 0; i < len; i++) {
                            var actor = item.data.object.likes[i].actor;
                            if (i < max) {
                                html += "<a href=\"" + actor.id + "\"><img class=\"echo-user-list-item-avatar\" style=\"display: inline;height: 16px !important;width: auto !important;margin-right:3px;\" src=\"" + actor.avatar + "\">" + actor.title + "</a>" + (i === len - 1 ? " " : ", ");
                            } else {
                                title += actor.title + ", ";
                            }
                        }
                        if (item.data.object.likes.length > max) {
                            var other = item.data.object.likes.length - max;
                            html += "<span title=\"" + title.substr(0, title.length - 2) + "\">and " + other.toString() + " others like this.</span>";
                        } else {
                            html += " likes this.";
                        }
                        console.log(html);
                        element.append("<span>" + html + "</span>");
                        
                        //Flags
                        
                        var count = item.data.object.accumulators.flagsCount || 0;
                        
                        if (count) {
                            //var element = element.siblings(".echo-item-flags").first()
                            var count = item.data.object.accumulators.flagsCount || 0;
                            if (!count) {
                                element.hide();
                                return;
                            }
                            console.log(item.data.object.accumulators.flagsCount);
                            element.parent().append("<span class=\"echo-item-flags\">" + item.data.object.accumulators.flagsCount + " users has flagged this.</span>");
                        }
                        //
                        element.show();
                    }},
                    "bodyItemRenderer": function (element) {
                    var item = this;
                    var isFacebook = (item.data.source.name == "Facebook" && (!item.config.get("children.maxDepth") || item.id == item.conversation)) ? true : false;
                    var isYouTube = (item.data.source.name == "YouTube" && (!item.config.get("children.maxDepth") || item.id == item.conversation)) ? true : false;
                    if (!isFacebook && !isYouTube) {
                        item.data.object.content = item.data.object.content.replace(/<img(.*?)>/g, "");
                    }
                    if (!isYouTube) {
                        item.data.object.content = item.data.object.content.replace(/<iframe(.*?)<\/iframe>/g, "");
                        item.data.object.content = item.data.object.content.replace(/<iframe(.*?)>/g, "");
                    }
                    item.data.object.content = item.data.object.content.replace(/<object(.*?)<\/object>/g, "");
                    item.data.object.content = item.data.object.content.replace(/<embed(.*?)<\/embed>/g, "");
                    item.data.object.content = item.data.object.content.replace(/<embed(.*?)>/g, "");
                    item.parentRenderer("body", arguments);
                }
                };
                Echo.Plugins[plugin.name].init(Echo.Plugins["ItemContentNormalizer"], Echo.Stream);
            })(unsafeWindow.jQuery);
            console.log("RAN SCRIPT");
        } else {
            setTimeout(func, 1);
        }
    } else {
        setTimeout(func, 1);
    }
};
setTimeout(func, 1);