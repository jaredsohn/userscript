// ==UserScript==
// @name           RedditGOD
// @author         eXtraMaster
// @namespace      redditgod
// @copyright      2013, Andy Tran (http://twitter.com/extradomination)
// @license        Licensed under the MIT license - http://opensource.org/licenses/mit-license.php
// @description    A Reddit enchancer that doesn't go overboard, until you've tried it...
// @include        htt*://*.reddit.*/*
// @version        2.0
// @encoding       UTF-8
// ==/UserScript==
/* EXTERNAL SCRIPTS */
function redditGodInclude() {

/**
 * jQuery Extended Cookie Plugin
 * Author: Frederick Giasson
 * Copyright (c) 2012 Structured Dynamics LLC 
 * Dual licensed under the MIT and GPL licenses
 *
 * The chunkedcookie function comes from the jQuery Cookie plugin available here:
 *   https://github.com/carhartl/jquery-cookie
 * Copyright (c) 2010 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses
 *
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
jQuery.cookie=function(key,value,options){var isStorageAvailable=false;if("localStorage"in window)try{window.localStorage.setItem("isStorageAvailable","true");isStorageAvailable=true;window.localStorage.removeItem("isStorageAvailable","true")}catch(PrivateBrowsingError){}if(arguments.length>1&&String(value)!=="[object Object]"){options=jQuery.extend({},options);if(options.maxChunkSize==undefined)options.maxChunkSize=3E3;if(options.maxNumberOfCookies==undefined)options.maxNumberOfCookies=20;if(options.useLocalStorage==
undefined)options.useLocalStorage=true;if(value===null||value===undefined){if(options.useLocalStorage&&isStorageAvailable!=false)localStorage.removeItem(key);for(var i=0;i<options.maxNumberOfCookies;i++){if(i==0)var exists=$.chunkedcookie(key);else var exists=$.chunkedcookie(key+"---"+i);if(exists!=null)$.chunkedcookie(key+"---"+i,null,options);else break}}else if(options.useLocalStorage&&isStorageAvailable!=false)localStorage.setItem(key,value);else{var exp=new RegExp(".{1,"+options.maxChunkSize+
"}","g");if(value.match!=undefined){var chunks=value.match(exp);for(var i=0;i<chunks.length;i++)if(i==0)$.chunkedcookie(key,chunks[i],options);else $.chunkedcookie(key+"---"+i,chunks[i],options)}else $.chunkedcookie(key,value,options)}return null}if(options==undefined){var options;if(arguments.length>1&&String(value)==="[object Object]")options=value;else options={};if(options.maxNumberOfCookies==undefined)options.maxNumberOfCookies=20;if(options.useLocalStorage==undefined)options.useLocalStorage=
true}if(isStorageAvailable!=false){var value=localStorage.getItem(key);if(value!=undefined&&value!=null)return value}var value="";for(var i=0;i<options.maxNumberOfCookies;i++){if(i==0)var val=$.chunkedcookie(key);else var val=$.chunkedcookie(key+"---"+i);if(val!=null)value+=val;else{if(i==0)return null;break}}return value};
jQuery.chunkedcookie=function(key,value,options){if(arguments.length>1&&String(value)!=="[object Object]"){options=jQuery.extend({},options);if(value===null||value===undefined)options.expires=-1;if(typeof options.expires==="number"){var days=options.expires,t=options.expires=new Date;t.setDate(t.getDate()+days)}value=String(value);return document.cookie=[encodeURIComponent(key),"=",options.raw?value:encodeURIComponent(value),options.expires?"; expires="+options.expires.toUTCString():"",options.path?
"; path="+options.path:"",options.domain?"; domain="+options.domain:"",options.secure?"; secure":""].join("")}options=value||{};var result,decode=options.raw?function(s){return s}:decodeURIComponent;return(result=(new RegExp("(?:^|; )"+encodeURIComponent(key)+"=([^;]*)")).exec(document.cookie))?decode(result[1]):null};
/**
 * json2.js
 * 2012-10-08
 * Public Domain.
 * http://www.JSON.org/js.html
 */
if(typeof JSON!=="object")JSON={};
(function(){function f(n){return n<10?"0"+n:n}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=
/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=
gap,partial,value=holder[key];if(value&&typeof value==="object"&&typeof value.toJSON==="function")value=value.toJSON(key);if(typeof rep==="function")value=rep.call(holder,key,value);switch(typeof value){case "string":return quote(value);case "number":return isFinite(value)?String(value):"null";case "boolean":case "null":return String(value);case "object":if(!value)return"null";gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==="[object Array]"){length=value.length;for(i=0;i<length;i+=
1)partial[i]=str(i,value)||"null";v=partial.length===0?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]";gap=mind;return v}if(rep&&typeof rep==="object"){length=rep.length;for(i=0;i<length;i+=1)if(typeof rep[i]==="string"){k=rep[i];v=str(k,value);if(v)partial.push(quote(k)+(gap?": ":":")+v)}}else for(k in value)if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);if(v)partial.push(quote(k)+(gap?": ":":")+v)}v=partial.length===0?"{}":gap?"{\n"+gap+partial.join(",\n"+
gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";gap=mind;return v}}if(typeof JSON.stringify!=="function")JSON.stringify=function(value,replacer,space){var i;gap="";indent="";if(typeof space==="number")for(i=0;i<space;i+=1)indent+=" ";else if(typeof space==="string")indent=space;rep=replacer;if(replacer&&typeof replacer!=="function"&&(typeof replacer!=="object"||typeof replacer.length!=="number"))throw new Error("JSON.stringify");return str("",{"":value})};if(typeof JSON.parse!=="function")JSON.parse=
function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==="object")for(k in value)if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined)value[k]=v;else delete value[k]}return reviver.call(holder,key,value)}text=String(text);cx.lastIndex=0;if(cx.test(text))text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)});if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse");}})();



}
var script = document.createElement('script');
redditGodInclude=redditGodInclude.toString();
script.appendChild(document.createTextNode(redditGodInclude.substring(redditGodInclude.search("\\)")+1,redditGodInclude.length)));
(document.body || document.head || document.documentElement).appendChild(script);
/* END EXTERNAL SCRIPTS */

// =============
/* REDDITGOD! */
/* eXtraMaster 2013 */
/* If you're reading this, please fork and help contribute to this project. Also, ignore JSLint.. */
/* jslint browser: true, regexp: true */
/* global  $,alert */
// =============
(function () {
    "use strict";

    function main() {
        /* INT VAR FIELD */
        var PreloadedImage, links, isLinkImage, allowedExt, version, a, linksa, isImage, fileExt, redditGodSpacer, permalink, isBlocked, redditGodBarIcon, redditGod, redditGODCookies, rGCookieName, rGImageActivated;
        /* VAR FIELD */
        PreloadedImage = [];
        isLinkImage = false;
        links = false;
        allowedExt = [".jpg", ".gif", ".png", ".bmp"];
        version = "2.0";
        a = 0;

        /* save feature is currently handled through localStorage or cookies, depending on the browser.. */
        /* INIT COOKIES */
        rGCookieName = "redditGOD";
        redditGODCookies = $.cookie(rGCookieName);
        if (redditGODCookies === null) {
            $.cookie(rGCookieName, "{}", {
                expires: 1000,
                path: "/"
            });
        }

        function refreshSettingsToke() {
            $(".arrow").parent().parent().stop().css({
                "background-color": "white",
                opacity: 1
            });
            $(".arrow").parent().parent().css({
                "background-color": "inherit"
            });
            $(".arrow").parent().parent().unbind('mouseenter mouseleave');
            $(".upmod").parent().parent().find(".entry").eq(0).stop().css({
                "background-color": "#FFF1ED"
            });
            $(".downmod").parent().parent().find(".entry").eq(0).stop().css({
                "background-color": "#EDEDFF"
            });
            $(".upmod,.downmod").each(function () {
                $(this).parent().parent().find(".entry").eq(0).stop().animate({
                    "opacity": 0.4
                }).hover(function () {
                    $(this).stop().animate({
                        "opacity": 1
                    })
                }, function () {
                    $(this).stop().animate({
                        "opacity": 0.4
                    })
                })
            });
        }
        /* This is the function that updates, stores, and refreshes the data about redditGOD on reddit */
        function rGUpdate(a, b) {
            redditGODCookies = $.cookie(rGCookieName);
            redditGODCookies = JSON.parse(redditGODCookies);
            redditGODCookies[a] = "" + b.toString();
            if (typeof redditGODCookies["autClose"] == "undefined") {
                redditGODCookies["autClose"] = "true";
            }
            if (typeof redditGODCookies["autClose2"] == "undefined") {
                redditGODCookies["autClose2"] = "true";
            }
            if (typeof redditGODCookies["nsfw"] == "undefined") {
                redditGODCookies["nsfw"] = "true";
            }
            if (typeof redditGODCookies["borders"] == "undefined") {
                redditGODCookies["borders"] = "true";
            }
            if (typeof redditGODCookies["toggle"] == "undefined") {
                redditGODCookies["toggle"] = "false";
            }
            if (typeof redditGODCookies["highlightsize"] == "undefined") {
                redditGODCookies["highlightsize"] = "true";
            }
            if (typeof redditGODCookies["injectImages"] == "undefined") {
                redditGODCookies["injectImages"] = "true";
            }
            if (typeof redditGODCookies["videoo"] == "undefined") {
                redditGODCookies["videoo"] = "true";
            }
            if (typeof redditGODCookies["deleted"] == "undefined") {
                redditGODCookies["deleted"] = "true";
            }
            rGImageActivated = redditGODCookies["autClose"];

            if (redditGODCookies["border"] == "true") {
                $(".side").css({
                    "border-left": "1px solid #000000",
                    "border-bottom": "1px solid #000000",
                    "padding": "10px"
                });
                $(".thing").css({
                    border: "1px solid black",
                    "padding": "4px"
                });
            } else {
                $(".side").css({
                    "border-left": "0px",
                    "border-bottom": "0px",
                    "padding": "0px"
                })
                $(".thing").css({
                    border: "0px",
                    "padding": "0px"
                });
            }
            if (redditGODCookies["toggle"] == "true") {
                $(".redditGODToggle").css({
                    "display": "inline"
                });
            } else {
                $(".redditGODToggle").hide();
            }

            if (redditGODCookies["highlightsize"] == "true") {
                $(".comments").css({
                    "font-size": "1.1em"
                });
                $(".hide-button").css({
                    "font-size": "1.05em"
                });
            } else {
                $(".comments").css({
                    "font-size": "1.0em"
                });
                $(".hide-button").css({
                    "font-size": "1.0em"
                });
            }

            refreshSettingsToke();
            $.cookie(rGCookieName, JSON.stringify(redditGODCookies), {
                expires: 1000,
                path: "/"
            });
        }
        /* Fills the cookie with one entry, and updates the entire thing.. */
        rGUpdate("testPost", "please ignore");
        /* Custom: Image displayer */
        function quickMeMeGen(abbb) {
            var p = /(?:qkme\.me|i\.qkme\.me|quickmeme\.com\/meme)(?:.*?)\/([^"&?\/ ]{4,10})/i;
            return (abbb.match(p)) ? "http://i.qkme.me/"+RegExp.$1+".jpg" : false;
        }

        function youtubeVideoGen(url) {
            var p = /(?:youtube(?:.*?)v\=|youtu\.be\/)([^"&?\/ ]{11})/i;
            return (url.match(p)) ? RegExp.$1 : false;
        }

        function aa() {
            function bb(commentss) {
                commentss.each(function () {
                    var that = $(this);
                    $(this).find("a").each(function () {
                        isLinkImage = false;
                        links = $(this).attr("href");
                        linksa = links;
                        if (links.search(/\?/) !== -1) {
                            links = links.split("?")[0];
                        }
                        isImage = false;
                        fileExt = links.substring((links.length - 4), links.length);
                        for (a = 0; a < allowedExt.length; a += 1) {
                            if (fileExt === allowedExt[a]) {
                                isImage = true;
                            }
                        }
                        links = linksa;
                        if (links.search("www.reddit.com/domain/") !== -1) {
                            isImage = false;
                        } else if (isImage) {
                            isLinkImage = links;
                        } else if (links.search("imgur") !== -1 && links.search("imgur.com/a/") === -1) {
                            links = links.replace(/imgur.com\/r\/(.*?)\//ig, "i.imgur.com/");
                            isLinkImage = links + ".jpg";
                        } else if (links.search("quickmeme") !== -1 || links.search("qkme.me") !== -1) {
                            isLinkImage = quickMeMeGen(links);
                        }

                        if (isLinkImage !== false || (youtubeVideoGen(links) !== false && redditGODCookies["videoo"]=="true")) {
                            isBlocked = "display:block";
                            if ((that.parent().find(".nsfw-stamp").length > 0 && redditGODCookies["nsfw"] == "true") || redditGODCookies["injectImages"] !== "true") {
                                isBlocked = "display:none";
                            }
                            $(this).before('<span class="flat-list buttons rounded imgd-stamp stamp redditGODToggle" style="font-size: medium; display: inline; border: none; padding-right: 4px; display: inline; white-space: nowrap; border-radius: 7px;' + ((redditGODCookies["toggle"] == "false") ? "display:none;" : "") + '"><acronym title="Toggable content" style="color: #167777; font-size: x-small; text-decoration: none; padding: 0 2px; border: 1px solid #29D8D8!important; border-radius: 3px;">tog</acronym></span>');
                            if (isLinkImage !== false) {
                                that.get(0).innerHTML += "<p class='injectedRedditGodInteractive'><img src='" + isLinkImage + "' style='" + isBlocked + ";max-width:70%;max-height:90%;'></p>";
                            }
                            if (youtubeVideoGen(links) !== false) {
                                /* Although reddit already has built in youtube support.. It should be removed and replaced with redditGOD!! */
                                that.get(0).innerHTML += '<p class="injectedRedditGodInteractive"><iframe width="640" height="480" src="//www.youtube-nocookie.com/embed/' + youtubeVideoGen(links) + '" frameborder="0" allowfullscreen style="' + isBlocked + '"></iframe></p>';
                            }

                            that.find("a").on("click", function () {
                                $(this).parent().parent().find(".injectedRedditGodInteractive").eq(0).children().stop().slideToggle();
                                return false;
                            });
                        }
                    });
                });
            }
            bb($(".md"));
            bb($(".title"));
            bb($(".expando"));
        }
        aa();
        $(".injectedRedditGodInteractive").on("dblclick", function () {
            $(this).children().stop().slideToggle();
            return false;
        });
        $(".up, .down").on("click", function () {
            refreshSettingsToke();
            if (rGImageActivated == "true") {
                $(this).parent().parent().find(".injectedRedditGodInteractive").eq(0).children().stop().slideUp();
            }
        });
        /* End: Image displayer */
if (redditGODCookies["autClose2"] == "true"){
        $(".upmod, .downmod").each(function () {
            $(this).parent().parent().find(".injectedRedditGodInteractive").children().css({
                "display": "none"
            })
        });
}
        /* lpt_see_deleted_comments_on_reddit-c7pna50: Comment Delete Viewer */

if (redditGODCookies["deleted"] == "true"){
            $(".grayed+.flat-list a:contains('permalink')").each(function (i, e) {
                var holder = $(e).parents(".entry");
                e.old = e.hostname;
                e.hostname = "www.unedditreddit.com";
                $.getJSON(e.href + "?callback=?", function (data) {
                    holder.find(".md>p").text((data == null) ? "[not found]" : data.content);
                    holder.find(".tagline>em").text(((data == null) ? "" : data.author + " ") + "[deleted]");
                    e.hostname = e.old;
                })
            });
}
        /* End: Comment Delete Viewer */

        /* Start addiction notification */
        setInterval(function () {
            alert("You've been on reddit for too long! Take a 15-minute break and treat yourself to a normal life. Start a new project, take a quick snack. Do whatever..");
        }, 1000 * 60 * 60 * 1.5);
        /* End addiction notification */


        /*$(".side").css({"position":"relative","z-index":926});*/

        /* RedditGod! */
        $("#header-bottom-right .separator:eq(1)").after('<span class="redditgod"><a href="javascript:$(\'#redditGOD\').stop().slideToggle()">redditGOD</></span><span class="separator">|</span>');
        redditGodSpacer = document.createElement('div');
        redditGodSpacer.setAttribute("class", "spacer");
        redditGodSpacer.setAttribute("id", "redditGOD");
        redditGodSpacer.setAttribute("style", "background-color:#D9FFF2;padding:10px;font-size:1.3em;display:none;");
        redditGodSpacer.innerHTML = "<h2 style='text-align:center'>redditGOD v" + version + "</h2><p style='text-align:left'>RedditGOD is a simple reddit enchancer by eXtraMaster. Think of it as a more basic version of RES</p><hr><h2 style='text-align:center'>Settings:</h2>";
        redditGodSpacer.innerHTML += "<p style='text-align:center'><a href='javascript:$(\".injectedRedditGodInteractive\").children().slideUp();'>Hide all additional content</a> | <a href='javascript:$(\".injectedRedditGodInteractive\").children().slideDown()'>Show all additional content</a></p>";
        redditGodSpacer.innerHTML += "<p style='text-align:center'><a href='javascript:$(\".arrow.up\").trigger(\"click\");'>UPTOKE EVERYTHING!</a> | <a href='javascript:$(\".arrow.down\").trigger(\"click\");'>downvote everything</a></p>";
        redditGodSpacer.innerHTML += "<p>Show additional content onload: <input type='checkbox' " + ((redditGODCookies["injectImages"] == "false") ? "" : "checked") + " onclick='rGUpdate(\"injectImages\",this.checked)'></p>";
        redditGodSpacer.innerHTML += "<p>Hide voted content onload: <input type='checkbox' " + ((redditGODCookies["autClose2"] == "false") ? "" : "checked") + " onclick='rGUpdate(\"autClose2\",this.checked)'></p>";
        redditGodSpacer.innerHTML += "<p>Enable additional videos: <input type='checkbox' " + ((redditGODCookies["videoo"] == "false") ? "" : "checked") + " onclick='rGUpdate(\"videoo\",this.checked)'></p>";
        redditGodSpacer.innerHTML += "<p>Automatically close image on vote: <input type='checkbox' " + ((redditGODCookies["autClose"] == "false") ? "" : "checked") + " onclick='rGUpdate(\"autClose\",this.checked)'></p>";
        redditGodSpacer.innerHTML += "<p>Automatically hide NSFW content: <input type='checkbox' " + ((redditGODCookies["nsfw"] == "false") ? "" : "checked") + " onclick='rGUpdate(\"nsfw\",this.checked)'></p>";
        redditGodSpacer.innerHTML += "<p>Add additional borders: <input type='checkbox' " + ((redditGODCookies["border"] == "false") ? "" : "checked") + " onclick='rGUpdate(\"border\",this.checked)'></p>";
        redditGodSpacer.innerHTML += "<p>Show togglable icon: <input type='checkbox' " + ((redditGODCookies["toggle"] == "false") ? "" : "checked") + " onclick='rGUpdate(\"toggle\",this.checked)'></p>";
        redditGodSpacer.innerHTML += "<p>Enable info far font size changer: <input type='checkbox' " + ((redditGODCookies["highlightsize"] == "false") ? "" : "checked") + " onclick='rGUpdate(\"highlightsize\",this.checked)'></p>";
        redditGodSpacer.innerHTML += "<p>Show deleted comments: <input type='checkbox' " + ((redditGODCookies["deleted"] == "false") ? "" : "checked") + " onclick='rGUpdate(\"deleted\",this.checked)'></p>";
        $(".side").prepend(redditGodSpacer);
        redditGodOverlay = document.createElement('div');
        redditGodOverlay.setAttribute("id", "redditGODOverlay");
        redditGodOverlay.setAttribute("style", "background-color:rgba(0,0,0,0.8);z-index:927;position:fixed;left:0px;top:0px;width:100%;height:100%;margin:0px;border:0px;padding:0px;");
        redditGodOverlay.innerHTML = "";

        /* Image overlay, to implement later... $("body").append(redditGodOverlay);
        redditGodOverlay2 = document.createElement('div');
        redditGodOverlay2.setAttribute("id", "redditGODOverlayImg");
        redditGodOverlay2.setAttribute("style", "z-index:928;");
        redditGodOverlay2.innerHTML = "<img id='redditGODOverlayImg1'>";
        $("body").append(redditGodOverlay2);
        $("#redditGODOverlay").on("click", function () {
            $("#redditGODOverlay").fadeOut();
            $("#redditGODOverlayImg").fadeOut();
        });
            $("#redditGODOverlay").hide();
            $("#redditGODOverlayImg").hide();*/


        /* One more update..... */
        rGUpdate("testPost", "please ignore");
    }
    var script = document.createElement('script');
    main = main.toString();
    script.appendChild(document.createTextNode(main.substring(main.search("\\)") + 1, main.length)));
    (document.body || document.head || document.documentElement).appendChild(script);
}());