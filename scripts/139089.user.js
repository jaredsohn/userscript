// ==UserScript==
// @name           Quran Scroller
// @namespace      Quran
// @version        18
// @description    Provide scrollers to quran.com
// @include        http://quran.com/*
// @include        http://www.quran.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==
var css=".wide{padding:0;margin:0;text-align:justify;width:100%!important}.positioner{position:fixed;top:20%}.container{background:#333;position:fixed;top:20%;padding:2px;border-radius:15px;border:3px outset #282828;overflow:auto;z-index:1000}.bar{background:#333;position:fixed;top:20%;padding:2px;border-radius:15px;border:3px outset #282828;overflow:auto;z-index:1000;background:#333;text-align:center;right:5px;width:90px}.baseButton{cursor:pointer;display:block;width:100%;height:16px;border-top:1px solid #666;background-color:#333}.baseButton:hover{background-color:#666}.button{cursor:pointer;display:block;width:100%;height:16px;border-top:1px solid #666;background-color:#333;border-bottom:1px solid #333;color:#e3e3e3!important}.button:hover{background-color:#666}.button.first{border-radius:15px 15px 0 0}.button.last{border-radius:0 0 15px 15px}.button.marked{background:transparent url('http://diknows.com/files/iconic/raster/white/map_pin_fill_8x12.png') no-repeat center right}.button #text,.button #lock,.button #pause{display:inline-block;float:left;visibility:hidden;min-width:12px;padding-right:2px;height:100%;vertical-align:middle}.button #lock{background:transparent url('http://diknows.com/files/iconic/raster/white/lock_fill_9x12.png') no-repeat center left}.button #lock:hover{background-image:url('http://diknows.com/files/iconic/raster/green/lock_fill_9x12.png')}.button #lock.locked{background-image:url('http://diknows.com/files/iconic/raster/white/unlock_fill_9x12.png')}.button #lock.locked:hover{background-image:url('http://diknows.com/files/iconic/raster/green/unlock_fill_9x12.png')}.button #pause{background:transparent url('http://diknows.com/files/iconic/raster/white/pause_9x12.png') no-repeat center left}.button #pause:hover{background-image:url('http://diknows.com/files/iconic/raster/green/pause_9x12.png')}.button #pause.paused{background-image:url('http://diknows.com/files/iconic/raster/white/play_9x12.png')}.button #pause.paused:hover{background-image:url('http://diknows.com/files/iconic/raster/green/play_9x12.png')}.cButton{cursor:pointer;display:block;width:100%;height:16px;border-top:1px solid #666;background-color:#333;border-bottom:1px solid #333;color:#e3e3e3!important;background-color:#333}.cButton:hover{background-color:#666}.cButton.first{border-radius:15px 15px 0 0}.cButton.last{border-radius:0 0 15px 15px}.cButton.marked{background:transparent url('http://diknows.com/files/iconic/raster/white/map_pin_fill_8x12.png') no-repeat center right}.cButton #text,.cButton #lock,.cButton #pause{display:inline-block;float:left;visibility:hidden;min-width:12px;padding-right:2px;height:100%;vertical-align:middle}.cButton #lock{background:transparent url('http://diknows.com/files/iconic/raster/white/lock_fill_9x12.png') no-repeat center left}.cButton #lock:hover{background-image:url('http://diknows.com/files/iconic/raster/green/lock_fill_9x12.png')}.cButton #lock.locked{background-image:url('http://diknows.com/files/iconic/raster/white/unlock_fill_9x12.png')}.cButton #lock.locked:hover{background-image:url('http://diknows.com/files/iconic/raster/green/unlock_fill_9x12.png')}.cButton #pause{background:transparent url('http://diknows.com/files/iconic/raster/white/pause_9x12.png') no-repeat center left}.cButton #pause:hover{background-image:url('http://diknows.com/files/iconic/raster/green/pause_9x12.png')}.cButton #pause.paused{background-image:url('http://diknows.com/files/iconic/raster/white/play_9x12.png')}.cButton #pause.paused:hover{background-image:url('http://diknows.com/files/iconic/raster/green/play_9x12.png')}.cButton.last{background:-moz-linear-gradient(top,#333 0,#7f7f7f 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(0%,#333),color-stop(100%,#7f7f7f));background:-webkit-linear-gradient(top,#333 0,#7f7f7f 100%);background:-o-linear-gradient(top,#333 0,#7f7f7f 100%);background:-ms-linear-gradient(top,#333 0,#7f7f7f 100%);background:linear-gradient(to bottom,#333 0,#7f7f7f 100%)}.cButton.last:hover{background:#666}.box{background:#333;position:fixed;top:20%;padding:2px;border-radius:15px;border:3px outset #282828;overflow:auto;z-index:1000;right:20%;height:60%;width:60%;color:#333}.closer{position:fixed;top:20%;right:20%;z-index:1002}.bookmarks{cursor:pointer;display:block;width:100%;height:16px;border-top:1px solid #666;background-color:#333;border-bottom:1px solid #333;color:#e3e3e3!important;background-color:#333;display:inline-block}.bookmarks:hover{background-color:#666}.bookmarks.first{border-radius:15px 15px 0 0}.bookmarks.last{border-radius:0 0 15px 15px}.bookmarks.marked{background:transparent url('http://diknows.com/files/iconic/raster/white/map_pin_fill_8x12.png') no-repeat center right}.bookmarks #text,.bookmarks #lock,.bookmarks #pause{display:inline-block;float:left;visibility:hidden;min-width:12px;padding-right:2px;height:100%;vertical-align:middle}.bookmarks #lock{background:transparent url('http://diknows.com/files/iconic/raster/white/lock_fill_9x12.png') no-repeat center left}.bookmarks #lock:hover{background-image:url('http://diknows.com/files/iconic/raster/green/lock_fill_9x12.png')}.bookmarks #lock.locked{background-image:url('http://diknows.com/files/iconic/raster/white/unlock_fill_9x12.png')}.bookmarks #lock.locked:hover{background-image:url('http://diknows.com/files/iconic/raster/green/unlock_fill_9x12.png')}.bookmarks #pause{background:transparent url('http://diknows.com/files/iconic/raster/white/pause_9x12.png') no-repeat center left}.bookmarks #pause:hover{background-image:url('http://diknows.com/files/iconic/raster/green/pause_9x12.png')}.bookmarks #pause.paused{background-image:url('http://diknows.com/files/iconic/raster/white/play_9x12.png')}.bookmarks #pause.paused:hover{background-image:url('http://diknows.com/files/iconic/raster/green/play_9x12.png')}.bookmarks.last{background:-moz-linear-gradient(top,#333 0,#7f7f7f 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(0%,#333),color-stop(100%,#7f7f7f));background:-webkit-linear-gradient(top,#333 0,#7f7f7f 100%);background:-o-linear-gradient(top,#333 0,#7f7f7f 100%);background:-ms-linear-gradient(top,#333 0,#7f7f7f 100%);background:linear-gradient(to bottom,#333 0,#7f7f7f 100%)}.bookmarks.last:hover{background:#666}.bookmarkContainer .bookmark{cursor:pointer;display:block;width:100%;height:16px;border-top:1px solid #666;background-color:#333;border-bottom:1px solid #333;color:#e3e3e3!important;background-color:#333;display:inline-block;text-align:right;width:80%}.bookmarkContainer .bookmark:hover{background-color:#666}.bookmarkContainer .bookmark.first{border-radius:15px 15px 0 0}.bookmarkContainer .bookmark.last{border-radius:0 0 15px 15px}.bookmarkContainer .bookmark.marked{background:transparent url('http://diknows.com/files/iconic/raster/white/map_pin_fill_8x12.png') no-repeat center right}.bookmarkContainer .bookmark #text,.bookmarkContainer .bookmark #lock,.bookmarkContainer .bookmark #pause{display:inline-block;float:left;visibility:hidden;min-width:12px;padding-right:2px;height:100%;vertical-align:middle}.bookmarkContainer .bookmark #lock{background:transparent url('http://diknows.com/files/iconic/raster/white/lock_fill_9x12.png') no-repeat center left}.bookmarkContainer .bookmark #lock:hover{background-image:url('http://diknows.com/files/iconic/raster/green/lock_fill_9x12.png')}.bookmarkContainer .bookmark #lock.locked{background-image:url('http://diknows.com/files/iconic/raster/white/unlock_fill_9x12.png')}.bookmarkContainer .bookmark #lock.locked:hover{background-image:url('http://diknows.com/files/iconic/raster/green/unlock_fill_9x12.png')}.bookmarkContainer .bookmark #pause{background:transparent url('http://diknows.com/files/iconic/raster/white/pause_9x12.png') no-repeat center left}.bookmarkContainer .bookmark #pause:hover{background-image:url('http://diknows.com/files/iconic/raster/green/pause_9x12.png')}.bookmarkContainer .bookmark #pause.paused{background-image:url('http://diknows.com/files/iconic/raster/white/play_9x12.png')}.bookmarkContainer .bookmark #pause.paused:hover{background-image:url('http://diknows.com/files/iconic/raster/green/play_9x12.png')}.bookmarkContainer .bookmark.last{background:-moz-linear-gradient(top,#333 0,#7f7f7f 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(0%,#333),color-stop(100%,#7f7f7f));background:-webkit-linear-gradient(top,#333 0,#7f7f7f 100%);background:-o-linear-gradient(top,#333 0,#7f7f7f 100%);background:-ms-linear-gradient(top,#333 0,#7f7f7f 100%);background:linear-gradient(to bottom,#333 0,#7f7f7f 100%)}.bookmarkContainer .bookmark.last:hover{background:#666}.bookmarkContainer .bookmarkClose{cursor:pointer;display:block;width:100%;height:16px;border-top:1px solid #666;background-color:#333;border-bottom:1px solid #333;color:#e3e3e3!important;background-color:#333;display:inline-block;width:20%;color:#e81818!important}.bookmarkContainer .bookmarkClose:hover{background-color:#666}.bookmarkContainer .bookmarkClose.first{border-radius:15px 15px 0 0}.bookmarkContainer .bookmarkClose.last{border-radius:0 0 15px 15px}.bookmarkContainer .bookmarkClose.marked{background:transparent url('http://diknows.com/files/iconic/raster/white/map_pin_fill_8x12.png') no-repeat center right}.bookmarkContainer .bookmarkClose #text,.bookmarkContainer .bookmarkClose #lock,.bookmarkContainer .bookmarkClose #pause{display:inline-block;float:left;visibility:hidden;min-width:12px;padding-right:2px;height:100%;vertical-align:middle}.bookmarkContainer .bookmarkClose #lock{background:transparent url('http://diknows.com/files/iconic/raster/white/lock_fill_9x12.png') no-repeat center left}.bookmarkContainer .bookmarkClose #lock:hover{background-image:url('http://diknows.com/files/iconic/raster/green/lock_fill_9x12.png')}.bookmarkContainer .bookmarkClose #lock.locked{background-image:url('http://diknows.com/files/iconic/raster/white/unlock_fill_9x12.png')}.bookmarkContainer .bookmarkClose #lock.locked:hover{background-image:url('http://diknows.com/files/iconic/raster/green/unlock_fill_9x12.png')}.bookmarkContainer .bookmarkClose #pause{background:transparent url('http://diknows.com/files/iconic/raster/white/pause_9x12.png') no-repeat center left}.bookmarkContainer .bookmarkClose #pause:hover{background-image:url('http://diknows.com/files/iconic/raster/green/pause_9x12.png')}.bookmarkContainer .bookmarkClose #pause.paused{background-image:url('http://diknows.com/files/iconic/raster/white/play_9x12.png')}.bookmarkContainer .bookmarkClose #pause.paused:hover{background-image:url('http://diknows.com/files/iconic/raster/green/play_9x12.png')}.bookmarkContainer .bookmarkClose.last{background:-moz-linear-gradient(top,#333 0,#7f7f7f 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(0%,#333),color-stop(100%,#7f7f7f));background:-webkit-linear-gradient(top,#333 0,#7f7f7f 100%);background:-o-linear-gradient(top,#333 0,#7f7f7f 100%);background:-ms-linear-gradient(top,#333 0,#7f7f7f 100%);background:linear-gradient(to bottom,#333 0,#7f7f7f 100%)}.bookmarkContainer .bookmarkClose.last:hover{background:#666}.bookmarkContainer.last{background:-moz-linear-gradient(top,#333 0,#7f7f7f 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(0%,#333),color-stop(100%,#7f7f7f));background:-webkit-linear-gradient(top,#333 0,#7f7f7f 100%);background:-o-linear-gradient(top,#333 0,#7f7f7f 100%);background:-ms-linear-gradient(top,#333 0,#7f7f7f 100%);background:linear-gradient(to bottom,#333 0,#7f7f7f 100%);border-radius:0 0 10px 10px}.bookmarkContainer.last:hover{background:#666}.bookmarkContainer.last .bookmark{border-radius:0 0 0 10px;background:-moz-linear-gradient(top,#333 0,#7f7f7f 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(0%,#333),color-stop(100%,#7f7f7f));background:-webkit-linear-gradient(top,#333 0,#7f7f7f 100%);background:-o-linear-gradient(top,#333 0,#7f7f7f 100%);background:-ms-linear-gradient(top,#333 0,#7f7f7f 100%);background:linear-gradient(to bottom,#333 0,#7f7f7f 100%)}.bookmarkContainer.last .bookmark:hover{background:#666}.bookmarkContainer.last .bookmarkClose{border-radius:0 0 10px 0;background:-moz-linear-gradient(top,#333 0,#7f7f7f 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(0%,#333),color-stop(100%,#7f7f7f));background:-webkit-linear-gradient(top,#333 0,#7f7f7f 100%);background:-o-linear-gradient(top,#333 0,#7f7f7f 100%);background:-ms-linear-gradient(top,#333 0,#7f7f7f 100%);background:linear-gradient(to bottom,#333 0,#7f7f7f 100%)}.bookmarkContainer.last .bookmarkClose:hover{background:#666}.rTButton{cursor:pointer;display:block;width:100%;height:16px;border-top:1px solid #666;background-color:#333;width:20%;display:inline-block;color:#18e818!important}.rTButton:hover{background-color:#666}.lTButton{cursor:pointer;display:block;width:100%;height:16px;border-top:1px solid #666;background-color:#333;width:20%;display:inline-block;color:#18e818!important;color:#e81818!important}.lTButton:hover{background-color:#666}.mTButton{cursor:pointer;display:block;width:100%;height:16px;border-top:1px solid #666;background-color:#333;width:20%;display:inline-block;color:#18e818!important;color:#e81818!important;width:60%;color:#25c2e5!important;border-right:0;border-left:0}.mTButton:hover{background-color:#666}.stop{color:white;background:black}.brief{padding:15px;line-height:1.2em;text-align:justify;color:#e3e3e3;font-size:100%}.selected{background-color:#8c0e0e!important}";
//"
$(document).ready(function(){
    $( "<style>"+css+"</style>" ).appendTo( "head" );
    var autoMove = localStorage.getItem("auto");
    var lastSpeed  = 0;
    var bar = $("<div>").attr("id","scroll-bar").addClass("bar");
    var button = $("<a>").addClass("button");
    var cbutton = $("<div>").addClass("cButton");
    var scrolldelay=null;
    var stopScroll = function () { 
        clearInterval(scrolldelay); 
        scrolldelay=null;
        clearProgress();
    };

    /**
     * Scrolls a page one pixel at a time every times milliseconds
     * @param times The time interval in milliseconds to scroll down a pageScroll
     */
    var paused = false;
    var locked = false;
    var lastScrollY =  null;
    var progressBar = null;
    var clearProgress = function(){ 
        clearInterval(progressBar);
        progressBar = null;
        $('#progress',bar).css('width','1px');
    };
    var pageScroll = function (times) { 
        stopScroll();
        scrolldelay = setInterval(function(){
            if(!paused){
                window.scrollBy(0,1);
                if(autoMove && lastScrollY === window.scrollY && progressBar===null) {
                    window.scrollBy(0,1);
                    if(autoMove && lastScrollY === window.scrollY && progressBar===null) {
                        var time = Math.ceil(times * $(window).height() / 90 );
                        console.log("Next surah after : "+ time*90 +" ms.");
                        var i=1;
                        progressBar = setInterval(function () { 
                            if(autoMove && lastScrollY === window.scrollY && progressBar !== null) {
                                i++;
                                if(i>=88){
                                    clearProgress();
                                    window.scrollBy(0,1);
                                    stopScroll();
                                    nextHandler();
                                }else{
                                    window.scrollBy(0,1);
                                    if(autoMove && lastScrollY === window.scrollY && progressBar !== null ) {
                                        // Make progress bar
                                        $('#progress',bar).css('width',i+'px');
                                    }else{
                                        clearProgress();
                                    }
                                }
                            }else{
                                clearProgress();
                            }
                        }, time) ;
                    }
                }else{
                    lastScrollY = window.scrollY;
                }
            }
        },times);
    };

    var pause = function(){
        var $this = $(this);
        if( $this.hasClass('paused') ){
            $this.removeClass('paused');
            paused = false;
        }else{
            $this.addClass('paused');
            paused = true;
        }
        return false;
    };
    var lock = function(){
        var $this = $(this);
        if( $this.hasClass('locked') ){
            $this.removeClass('locked');
            locked = false;
        }else{
            $this.addClass('locked');
            locked = true;
        }
        return false;
    };

    var getId = function(slowness){
        return "scroller-"+slowness;
    };
    var buttonHover = function(button,slowness){
        if(locked || paused || ( window.scrollY && lastSpeed === slowness)) {
            return;
        }
        clear(button);
        pageScroll(slowness);
        lastSpeed = slowness;
        localStorage.setItem("lastSpeed",lastSpeed);
        button.addClass("selected");
        $('#pause',button).css('visibility','visible');
        $('#lock',button).css('visibility','visible');
        $('#text',button).css('visibility','visible');
    };
    var mkButton = function (slowness){
        var color = 127-slowness;
        var id=getId(slowness);
        var normalCss = { "background-color":"rgba("+color+","+color+","+color+",1)" };
        var b = button.clone().attr("id",id)
            .append( $('<a>').attr('id','pause').html("&nbsp;").click(pause))
            .append( $('<a>').attr('id','lock').html("&nbsp;").click(lock))
            .append( $('<a>').attr('id','text'))
            .css(normalCss).hover(function(){
                buttonHover($(this),slowness);
        }).click(function(){
            if($(this).hasClass("marked")){
                $(this).removeClass("marked");
                localStorage.removeItem(id,"blah");
            }else{
                $(this).addClass("marked");
                localStorage.setItem(id,"blah");
            }
        });
        if(localStorage.getItem(id)){
            b.addClass("marked");
        }
        return b;
    };

    var bookmarks_name  = document.URL+"_bookmarks";

    var getBookmarks = function(){
        var bookmarks = localStorage.getItem(bookmarks_name);
        if(typeof bookmarks === "undefined" || bookmarks === null){
            bookmarks = {};
        }else{
            bookmarks = JSON.parse(bookmarks);
        }
        return bookmarks;
    };

    var setBookmarks = function(bookmarks){
        localStorage.setItem(bookmarks_name,JSON.stringify(bookmarks));
    };

    var bookmark = function(){
        var mark = window.scrollY;
        var bookmarks = getBookmarks();
        bookmarks['m'+mark] = {"name":"m"+mark,"position":mark};
        showBookmark('m'+mark,mark);
        setBookmarks(bookmarks);
    };

    var removeBookmark = function (bookmark) { 
        var bookmarks = getBookmarks();
        delete bookmarks[bookmark];
        setBookmarks(bookmarks);
        $('div:last',bar).removeClass('last');
        $('div#'+bookmark, bar).remove();
        $('div:last',bar).addClass('last');
    };

    var showBookmark = function(mark,position){
        $('div:last',bar).removeClass('last');
        bar.append($("<div>").attr('id',mark).addClass("bookmarkContainer").append(
                    $("<a>").addClass("bookmark").text(mark).click(function(){
                        window.scrollTo(0,position);
                    })
                    ).append(
                        $("<a>").addClass( "bookmarkClose" ).html("&mdash;").click(function(){
                            removeBookmark(mark);
                        })
                    ));
        $('div:last',bar).addClass('last');
    };

    var loadBookmarks = function(){
        var bookmarks = getBookmarks();
        for(var key in bookmarks ) {
            if ( bookmarks.hasOwnProperty(key)){
                showBookmark(key,bookmarks[key].position);
            }
        }
    };

    // Visually appending the buttons to the right floating bar
    var SPEED_LEVELS=11;
    for(var i=1; i<=255; i+=(255/SPEED_LEVELS)){
        if ( i <= 1 ) {
            bar.append(mkButton(Math.ceil(i/2)).addClass("first").text("Fast"));
        }else{
            bar.append(mkButton(Math.ceil(i/2)));
        }
    }

    var clear = function (elm){
        var siblings = elm.siblings('a.button',bar);
        locked = false;
        paused = false;
        var autoButton = $('#auto',bar);
        if(autoButton.hasClass("selected")){
            siblings.removeClass("selected");
            autoButton.addClass("selected");
        }else{
            siblings.removeClass("selected");
            localStorage.removeItem("lastSpeed");
            lastSpeed = 0 ;
        }
        // siblings.first().text("Fast");
        siblings.each(function(){
            $('#pause',this).css('visibility','hidden').removeClass("paused");
            $('#text',this).css('visibility','hidden');
            $('#lock',this).css('visibility','hidden').removeClass("locked");
        });
        $('.stop',bar).text ("Stop");
    };

    var stopHandler = function () { 
        stopScroll();
        clear($('.stop',bar));
    };

    var selector = 'div.leftBoxSubSurah select',
        selected = ' option:selected';
    var selectedSurah = $(selector+selected);
    var nextHandler = function(){
        $(selector).val(selectedSurah.next().val()).change();
    };
    var prevHandler = function(){
        $(selector).val(selectedSurah.prev().val()).change();
    };
    var autoHandler = function(){
        var autoButton = $("#auto",bar);
        if(autoButton.hasClass("selected")){
            localStorage.removeItem("auto");
            autoButton.removeClass("selected");
        }else{
            localStorage.setItem("auto","true");
            autoButton.addClass("selected");
        }
    };
    var halfButton = {'width':'50%','display':'inline-block'};
    // Appending the clear button to the end of buttons bar
    bar
        .append( button.clone().addClass("stop").text("Stop").click(stopHandler) )
        .append( button.clone().addClass("next").css(halfButton).attr("title","Next Surah").text("<").click(nextHandler) )
        .append( button.clone().addClass("prev").css(halfButton).attr("title","Previous Surah").text(">").click(prevHandler) )
        .append( button.clone().attr("id","leaving").append(
                    $('<a>').attr('id','progress').css({
                        'width':'1px',
                        'background-color':'#F8F8F8',
                        'display':'inline-block',
                        'float': 'left',
                        'height' : '18px'
                    })))
        .append( button.clone().attr("id","auto").text("Auto").click(autoHandler) )
        .append( cbutton.clone().addClass('last').text("Mark").click(bookmark) );

    // Putting the bar before the document 
    $("body").prepend(bar);

    loadBookmarks();

    if(typeof autoMove !== "undefined" && autoMove !== null){
        lastSpeed = localStorage.getItem("lastSpeed");
        if(typeof lastSpeed !== "undefined" && lastSpeed !== null){
            buttonHover($('#'+getId(lastSpeed),bar),lastSpeed);
            $('#auto',bar).addClass('selected');
        }
    }

});
