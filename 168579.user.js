// ==UserScript==
// @name        Sankaku Fast Image Viewer
// @namespace   faleij
// @description View full image without being redirected
// @include     http://*.sankakucomplex.com*
// @include     https://*.sankakucomplex.com*
// @version     3.21
// @updateURL  	http://userscripts.org/scripts/source/168579.meta.js
// @resource    css     http://pastebin.com/raw.php?i=RctNLpPK&v=3.21
// ==/UserScript==
var $ = unsafeWindow.jQuery;
var $unsafeWindow = $(unsafeWindow);

$("<style type='text/css'/>").text(GM_getResourceText("css")).appendTo("head");

var loadingImage = "data:image/gif;base64,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";
var ErrorImage = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+Cjxzdmcgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogPCEtLSBDcmVhdGVkIHdpdGggU1ZHLWVkaXQgLSBodHRwOi8vc3ZnLWVkaXQuZ29vZ2xlY29kZS5jb20vIC0tPgogPGc+CiAgPHRpdGxlPkxheWVyIDE8L3RpdGxlPgogIDxnIGlkPSJzdmdfNSI+CiAgIDxnIGlkPSJzdmdfNiI+CiAgICA8cmVjdCB0cmFuc2Zvcm09Im1hdHJpeCgwLjE4NDg3NywgMC4xODQ4NzcsIC0wLjE4NDg3NywgMC4xODQ4NzcsIDI2LjMyNDYsIC05Ljk2MTQyKSIgaWQ9InN2Z18yIiBoZWlnaHQ9IjQ5IiB3aWR0aD0iMjIxIiB5PSI3My42MzUxNDgiIHg9Ii0xOS41NDAxNzYiIHN0cm9rZS13aWR0aD0iMCIgc3Ryb2tlPSIjMDAwMDAwIiBmaWxsPSIjRkYwMDAwIi8+CiAgICA8cmVjdCBpZD0ic3ZnXzMiIHRyYW5zZm9ybT0ibWF0cml4KC0wLjE4NDg3OCwgMC4xODQ4NzgsIC0wLjE4NDg3OCwgLTAuMTg0ODc4LCA2NC41MzA4LCAyNS4zNTAyKSIgaGVpZ2h0PSI0OSIgd2lkdGg9IjIyMSIgeT0iODMuMzU3NTIzIiB4PSItNC41NDc0OTIiIHN0cm9rZS13aWR0aD0iMCIgc3Ryb2tlPSIjMDAwMDAwIiBmaWxsPSIjRkYwMDAwIi8+CiAgIDwvZz4KICA8L2c+CiA8L2c+Cjwvc3ZnPg==";

var $settings = $("" +
    "<div style='margin-bottom: 1em;'>" +
    "   <h5>Image Display Mode</h5>" +
    "   <form action='' onsubmit='return false;'>" +
    "       <div>" +
    "           <select style='width: 13em;' id='displayMode' name='displayMode'>" +
    "               <option value='full'>Full</option>" +
    "               <option value='adaptive'>Adaptive</option>" +
    "               <option value='redirect'>Redirect (Off)</option>" +
    "           </select>" +
    "       </div>" +
    "   </form>" +
    "</div>"+
    "<div style='margin-bottom: 1em;'>" +
    "   <h5>Scroll Mode</h5>" +
    "   <form action='' onsubmit='return false;'>" +
    "       <div>" +
    "           <select style='width: 13em;' id='scrollMode' name='scrollMode'>" +
    "               <option value='image'>Image</option>" +
    "               <option value='window'>Window</option>" +
    "               <option value='none'>None</option>" +
    "           </select>" +
    "       </div>" +
    "   </form>" +
    "</div>" +
    "<div style='margin-bottom: 1em;'>" +
    "   <h5>Middle Mouse Button Action</h5>" +
    "   <form action='' onsubmit='return false;'>" +
    "       <div>" +
    "           <select style='width: 13em;' id='MMBAction' name='MMBAction'>" +
    "               <option value='newTab'>Open in New Tab</option>" +
    "               <option value='sameTab'>Open in Same Tab</option>" +
    "           </select>" +
    "       </div>" +
    "   </form>" +
    "</div>" +
    "<div style='margin-bottom: 1em;'>" +
    "   <h5>Show Image By</h5>" +
    "   <form action='' onsubmit='return false;'>" +
    "       <div>" +
    "           <select style='width: 13em;' id='showBy' name='showBy'>" +
    "               <option value='clicking'>Clicking</option>" +
    "               <option value='hovering'>Hovering</option>" +
    "           </select>" +
    "       </div>" +
    "   </form>" +
    "</div>");

var standardDisplayMode = "adaptive";
var standardScrollMode = "window";
var standardShowBy = "clicking";
var standardMMBAction = "newTab";

showBy = GM_getValue("showBy", standardShowBy);
displayMode = GM_getValue("displayMode", standardDisplayMode);
MMBAction =  GM_getValue("MMBAction", standardMMBAction);

$("#displayMode option[value='" + GM_getValue("displayMode", standardDisplayMode) + "']", $settings).attr("selected", "true");
$("#scrollMode option[value='" + GM_getValue("scrollMode", standardScrollMode) + "']", $settings).attr("selected", "true");
$("#MMBAction option[value='" + GM_getValue("MMBAction", standardMMBAction) + "']", $settings).attr("selected", "true");
$("#showBy option[value='" + GM_getValue("showBy", standardShowBy) + "']", $settings).attr("selected", "true");

$sidebar = $(".sidebar");
$sidebar.append($settings);

$("#displayMode", $settings).change(function () {
    setTimeout(function () {
        GM_setValue("displayMode", $("#displayMode :selected", $settings).val());
        displayMode = GM_getValue("displayMode", standardDisplayMode);
    }, 0);
});

$("#MMBAction", $settings).change(function () {
    setTimeout(function () {
        GM_setValue("MMBAction", $("#MMBAction :selected", $settings).val());
        MMBAction = GM_getValue("MMBAction", standardMMBAction);
    }, 0);
});

$("#showBy", $settings).change(function () {
    setTimeout(function () {
        GM_setValue("showBy", $("#showBy :selected", $settings).val());
        showBy = GM_getValue("showBy", standardShowBy);
    }, 0);
});

$("#scrollMode", $settings).change(function () {
    setTimeout(function () {
        GM_setValue("scrollMode", $("#scrollMode :selected", $settings).val());
    }, 0);
});

var imgCache = {};

function preloadImage(src,cb){
    if(imgCache.hasOwnProperty(src)){
        cb.call(imgCache[src]);
    }else{
        $("<img/>").attr("src", src).one('load',function(){
            imgCache[src] = this;
            cb.call(this);
        });
    }
}

function loadPage(src,cb){
    var $iframe = $("<iframe style='visibility:hidden;'/>");
    $iframe.one('load', function(){cb.call(this,$iframe)});
    $iframe.attr("src",src);
    $("body").append($iframe);
    return $iframe;
}

function openImage(img, src) {
    var that = this;
    img.one('load', function(){
        img.css({"opacity":"1.0"});
        img.parent().parent().css("background-image", "");

        setTimeout(function () {
            closeOpenImages();

            var fullWidth = that.width;
            var fullHeight = that.height;
            var vpHeight = $unsafeWindow.height();
            var vpWidth = $unsafeWindow.width();
            var thumbWidth = img.width();
            var thumbHeight = img.height();
            var offset = img.offset();

            var scale;
            switch (GM_getValue("displayMode", standardDisplayMode)) {
                case "full":
                    scale = fullHeight / thumbHeight;
                    break;
                case "adaptive":
                {
                    var h = Math.min(fullHeight, vpHeight);
                    var hscale = h / thumbHeight;

                    var w = Math.min(fullWidth, vpWidth);
                    var wscale = w / thumbWidth;

                    scale = Math.min(hscale, wscale);
                }
                    break;
            }

            var xtanslation = ($(document).scrollLeft()) -offset.left - (thumbWidth * 0.5) + ((vpWidth * 0.5));
            var ytranslation = 0;

            switch(GM_getValue("scrollMode", standardScrollMode)){
                case "image":
                    ytranslation = -(offset.top+thumbHeight*0.5 - ($unsafeWindow.scrollTop() + vpHeight*0.5));
                    break;
                case "window":
                    $('html, body').animate({
                        scrollTop: offset.top + thumbHeight * 0.5 - vpHeight * 0.5
                    }, 2000);
                    break;
                case "none":
                    break;
            }

            img.css({
                "-webkit-transform" :"translate(" + xtanslation + "px, " + ytranslation + "px) scale(" + scale + ")",
                "-moz-transform"    :"translate(" + xtanslation + "px, " + ytranslation + "px) scale(" + scale + ")",
                "box-shadow"        :"0px 0px "+ (35/scale) +"px #888888",
                "padding"           :"0px"
            });
            img.parent().parent().css("z-index", "5");
            img.attr("isLarge", "true");
        }, 1);
    });
    img.attr("src",src);
}

$unsafeWindow.bind("keydown",function(e){
    var openImage = $(".thumb a img[isLarge='true']");
    if(openImage.length === 1){
        var src = openImage.attr("src");
        var imgs = document.querySelectorAll(".thumb a img");

        var openIdx = -1;
        for(var idx in imgs){
            if(imgs[idx].src === src){
                openIdx = parseInt(idx);
                break;
            }
        }
        switch(e.keyCode) {
            case 39:
                closeOpenImages();
                imgs[++openIdx].click();
                break;
            case 37:
                closeOpenImages();
                imgs[--openIdx].click();
                break;
        }
    }
});

function closeOpenImages() {
    $(".thumb a img[isLarge='true']").each(function () {
        var img = $(this);
        img.attr("isLarge", "false");
        img.css({"-webkit-transform":"", "-moz-transform":"", "box-shadow":"none"});
        img.attr("src",img.attr("thumbSrc"));
        setTimeout(function () {
            if (img.attr("isLarge") !== "true") {
                img.css({"padding":""});
                img.parent().parent().css("z-index", "1");
            }
        }, 1000);
    });
}
var tags = {};
var $tag = null;

function addTags($iframe,key){
    var tag = tags[key] = $iframe.contents().find("#tag-sidebar").parent().clone().hide();
    $("h5",tag).text("Image Tags")
}

function showTag(key){
    if($tag !== null) $tag.fadeOut().remove();
    $tag = tags[key];
    $tag.appendTo($sidebar).fadeIn();
}

function imageInteract(){
        var href = this.href;
        var img = $("img", $(this));

        img.addClass("thumbTransition");

        if (img.attr("isLarge") !== "true") {
            if (img.attr("isLoaded") === "true") {

                img.css({"opacity":"0.3"});
                img.parent().parent().css("background-image", "url(" + loadingImage + ")");

                preloadImage(img.attr("fullSrc"), function () {
                    var that = this;
                    openImage.call(that, img, img.attr("fullSrc"));
                    showTag(href);
                });
            } else if(img.attr("isLoading") !== "true") {
                img.attr("isLoading", "true");

                img.css({"opacity":"0.3"});
                img.parent().parent().css("background-image", "url(" + loadingImage + ")");

                img.attr("thumbSrc",img.attr("src"));

                loadPage(href,function($iframe){
                    console.log("iframe loaded");
                    var src = $iframe.contents().find("#highres").attr("href");
                    var fimg = $iframe.contents().find("#image");

                    if(src!==undefined){
                        addTags($iframe,href);

                        fimg.load(function(){
                            $iframe.remove();

                            preloadImage(src, function () {
                                var that = this;
                                img.attr("isLoading", "false");
                                img.attr("isLoaded", "true");
                                img.attr("fullSrc",src);
                                openImage.call(that, img, src);
                                showTag(href);
                            });
                        });

                        fimg.attr("src",""); //force unload image
                        fimg.attr("src",src); //force reload
                    }else{
                        $iframe.remove();
                        img.parent().parent().css("background-image", "url(" + ErrorImage + ")");
                        setTimeout(function(){
                            img.attr("isLoading", "false");
                            img.css({"opacity":"1.0"});
                        },3000);
                    }
                });
            }
        }else{
            closeOpenImages();
        }
}

var mousex,mousey;
function stopWatch(){
    var $timer = $('<div class="timer"></div>');
    $timer.hide().appendTo("body").fadeIn(100);
    $timer.css({
        left:  mousex-20,
        top:   mousey-15
    });
    var timer;
    var timerCurrent = 0;
    var timerSeconds = 1;
    var timerFinish = new Date().getTime() + (timerSeconds * 1000);

    function drawTimer(percent) {
        $timer.html('<div class="percent"></div><div id="slice"' + (percent > 50 ? ' class="gt50"' : '') +
            '><div class="pie"></div>' + (percent > 50 ? '<div class="pie fill"></div>' : '') + '</div>');
        var deg = 360 / 100 * percent;
        $('#slice .pie',$timer).css({
            '-moz-transform': 'rotate(' + deg + 'deg)',
            '-webkit-transform': 'rotate(' + deg + 'deg)',
            '-o-transform': 'rotate(' + deg + 'deg)',
            'transform': 'rotate(' + deg + 'deg)'
        });
    }

    function intervalFn() {
        var seconds = (timerFinish - (new Date().getTime())) / 1000;
        if (seconds <= 0) {
            drawTimer(100);
            clearInterval(timer);
            $timer.fadeOut(100).remove();
        } else {
            var percent = 100 - ((seconds / timerSeconds) * 100);
            drawTimer(percent);
        }
    }

    var timer = setInterval(intervalFn,50);

    return function(){
        clearInterval(timer);
        $timer.fadeOut(100).remove();
    }
}

function decideAction(button){
    if(showBy==="clicking"){
        if (button === 0 && (displayMode !== "redirect")) {
            imageInteract.call(this);
            return true;
        }
    }else if("hovering"){
        if(this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(imageInteract.bind(this), 1000);
        this.stopWatch = stopWatch();
    }

    if(button === 1){
        if(MMBAction === "sameTab"){
            document.location = this.href;
            return true;
        }
    }

    return false;
}

$(".thumb a").live("click", function (e) {
    if(decideAction.call(this,e.button)){
        e.preventDefault();
        return false;
    }
});

$(".thumb a").live("mouseover", function (e) {
    decideAction.call(this)
});

$(".thumb a").live("mouseout", function (e) {
    if(this.timeout){
        clearTimeout(this.timeout);
        this.timeout = null;
        this.stopWatch();
        this.stopWatch = null;
    }
});

$(document).mousemove(function(e){
    mousex = e.pageX;
    mousey = e.pageY;
    $(".timer").css({
        left:  mousex-20,
        top:   mousey-15
    });
});