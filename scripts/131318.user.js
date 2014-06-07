// ==UserScript==
// @name           Readability Scroller
// @namespace      Readability
// @version        29
// @description    Widens the readablity screen and add scrolling buttons to the margin and adds the article to the reading list in the readability account, Counts how many minutes remaining to read the article, Add bookmarks in any place of the article and Generates article brief.
// @include        *.readability.com/read*
// @include        *.readability.com/articles/*
// @include        https://www.readability.com/articles/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==
var css=".wide{padding:0;margin:0;text-align:justify;width:100%!important}.positioner{position:fixed;top:20%}.container{background:#333;position:fixed;top:20%;padding:2px;border-radius:15px;border:3px outset #282828;overflow:auto;z-index:1000}.bar{background:#333;position:fixed;top:20%;padding:2px;border-radius:15px;border:3px outset #282828;overflow:auto;z-index:1000;background:#333;text-align:center;right:5px;width:90px}.baseButton{cursor:pointer;display:block;width:100%;height:16px;border-top:1px solid #666;background-color:#333}.baseButton:hover{background-color:#666}.button{cursor:pointer;display:block;width:100%;height:16px;border-top:1px solid #666;background-color:#333;border-bottom:1px solid #333;color:#e3e3e3!important}.button:hover{background-color:#666}.button.first{border-radius:15px 15px 0 0}.button.last{border-radius:0 0 15px 15px}.button.marked{background:transparent url('http://diknows.com/files/iconic/raster/white/map_pin_fill_8x12.png') no-repeat center right}.button #text,.button #lock,.button #pause{display:inline-block;float:left;visibility:hidden;min-width:12px;padding-right:2px;height:100%;vertical-align:middle}.button #lock{background:transparent url('http://diknows.com/files/iconic/raster/white/lock_fill_9x12.png') no-repeat center left}.button #lock:hover{background-image:url('http://diknows.com/files/iconic/raster/green/lock_fill_9x12.png')}.button #lock.locked{background-image:url('http://diknows.com/files/iconic/raster/white/unlock_fill_9x12.png')}.button #lock.locked:hover{background-image:url('http://diknows.com/files/iconic/raster/green/unlock_fill_9x12.png')}.button #pause{background:transparent url('http://diknows.com/files/iconic/raster/white/pause_9x12.png') no-repeat center left}.button #pause:hover{background-image:url('http://diknows.com/files/iconic/raster/green/pause_9x12.png')}.button #pause.paused{background-image:url('http://diknows.com/files/iconic/raster/white/play_9x12.png')}.button #pause.paused:hover{background-image:url('http://diknows.com/files/iconic/raster/green/play_9x12.png')}.cButton{cursor:pointer;display:block;width:100%;height:16px;border-top:1px solid #666;background-color:#333;border-bottom:1px solid #333;color:#e3e3e3!important;background-color:#333}.cButton:hover{background-color:#666}.cButton.first{border-radius:15px 15px 0 0}.cButton.last{border-radius:0 0 15px 15px}.cButton.marked{background:transparent url('http://diknows.com/files/iconic/raster/white/map_pin_fill_8x12.png') no-repeat center right}.cButton #text,.cButton #lock,.cButton #pause{display:inline-block;float:left;visibility:hidden;min-width:12px;padding-right:2px;height:100%;vertical-align:middle}.cButton #lock{background:transparent url('http://diknows.com/files/iconic/raster/white/lock_fill_9x12.png') no-repeat center left}.cButton #lock:hover{background-image:url('http://diknows.com/files/iconic/raster/green/lock_fill_9x12.png')}.cButton #lock.locked{background-image:url('http://diknows.com/files/iconic/raster/white/unlock_fill_9x12.png')}.cButton #lock.locked:hover{background-image:url('http://diknows.com/files/iconic/raster/green/unlock_fill_9x12.png')}.cButton #pause{background:transparent url('http://diknows.com/files/iconic/raster/white/pause_9x12.png') no-repeat center left}.cButton #pause:hover{background-image:url('http://diknows.com/files/iconic/raster/green/pause_9x12.png')}.cButton #pause.paused{background-image:url('http://diknows.com/files/iconic/raster/white/play_9x12.png')}.cButton #pause.paused:hover{background-image:url('http://diknows.com/files/iconic/raster/green/play_9x12.png')}.cButton.last{background:-moz-linear-gradient(top,#333 0,#7f7f7f 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(0%,#333),color-stop(100%,#7f7f7f));background:-webkit-linear-gradient(top,#333 0,#7f7f7f 100%);background:-o-linear-gradient(top,#333 0,#7f7f7f 100%);background:-ms-linear-gradient(top,#333 0,#7f7f7f 100%);background:linear-gradient(to bottom,#333 0,#7f7f7f 100%)}.cButton.last:hover{background:#666}.box{background:#333;position:fixed;top:20%;padding:2px;border-radius:15px;border:3px outset #282828;overflow:auto;z-index:1000;right:20%;height:60%;width:60%;color:#333}.closer{position:fixed;top:20%;right:20%;z-index:1002}.bookmarks{cursor:pointer;display:block;width:100%;height:16px;border-top:1px solid #666;background-color:#333;border-bottom:1px solid #333;color:#e3e3e3!important;background-color:#333;display:inline-block}.bookmarks:hover{background-color:#666}.bookmarks.first{border-radius:15px 15px 0 0}.bookmarks.last{border-radius:0 0 15px 15px}.bookmarks.marked{background:transparent url('http://diknows.com/files/iconic/raster/white/map_pin_fill_8x12.png') no-repeat center right}.bookmarks #text,.bookmarks #lock,.bookmarks #pause{display:inline-block;float:left;visibility:hidden;min-width:12px;padding-right:2px;height:100%;vertical-align:middle}.bookmarks #lock{background:transparent url('http://diknows.com/files/iconic/raster/white/lock_fill_9x12.png') no-repeat center left}.bookmarks #lock:hover{background-image:url('http://diknows.com/files/iconic/raster/green/lock_fill_9x12.png')}.bookmarks #lock.locked{background-image:url('http://diknows.com/files/iconic/raster/white/unlock_fill_9x12.png')}.bookmarks #lock.locked:hover{background-image:url('http://diknows.com/files/iconic/raster/green/unlock_fill_9x12.png')}.bookmarks #pause{background:transparent url('http://diknows.com/files/iconic/raster/white/pause_9x12.png') no-repeat center left}.bookmarks #pause:hover{background-image:url('http://diknows.com/files/iconic/raster/green/pause_9x12.png')}.bookmarks #pause.paused{background-image:url('http://diknows.com/files/iconic/raster/white/play_9x12.png')}.bookmarks #pause.paused:hover{background-image:url('http://diknows.com/files/iconic/raster/green/play_9x12.png')}.bookmarks.last{background:-moz-linear-gradient(top,#333 0,#7f7f7f 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(0%,#333),color-stop(100%,#7f7f7f));background:-webkit-linear-gradient(top,#333 0,#7f7f7f 100%);background:-o-linear-gradient(top,#333 0,#7f7f7f 100%);background:-ms-linear-gradient(top,#333 0,#7f7f7f 100%);background:linear-gradient(to bottom,#333 0,#7f7f7f 100%)}.bookmarks.last:hover{background:#666}.bookmarkContainer .bookmark{cursor:pointer;display:block;width:100%;height:16px;border-top:1px solid #666;background-color:#333;border-bottom:1px solid #333;color:#e3e3e3!important;background-color:#333;display:inline-block;text-align:right;width:80%}.bookmarkContainer .bookmark:hover{background-color:#666}.bookmarkContainer .bookmark.first{border-radius:15px 15px 0 0}.bookmarkContainer .bookmark.last{border-radius:0 0 15px 15px}.bookmarkContainer .bookmark.marked{background:transparent url('http://diknows.com/files/iconic/raster/white/map_pin_fill_8x12.png') no-repeat center right}.bookmarkContainer .bookmark #text,.bookmarkContainer .bookmark #lock,.bookmarkContainer .bookmark #pause{display:inline-block;float:left;visibility:hidden;min-width:12px;padding-right:2px;height:100%;vertical-align:middle}.bookmarkContainer .bookmark #lock{background:transparent url('http://diknows.com/files/iconic/raster/white/lock_fill_9x12.png') no-repeat center left}.bookmarkContainer .bookmark #lock:hover{background-image:url('http://diknows.com/files/iconic/raster/green/lock_fill_9x12.png')}.bookmarkContainer .bookmark #lock.locked{background-image:url('http://diknows.com/files/iconic/raster/white/unlock_fill_9x12.png')}.bookmarkContainer .bookmark #lock.locked:hover{background-image:url('http://diknows.com/files/iconic/raster/green/unlock_fill_9x12.png')}.bookmarkContainer .bookmark #pause{background:transparent url('http://diknows.com/files/iconic/raster/white/pause_9x12.png') no-repeat center left}.bookmarkContainer .bookmark #pause:hover{background-image:url('http://diknows.com/files/iconic/raster/green/pause_9x12.png')}.bookmarkContainer .bookmark #pause.paused{background-image:url('http://diknows.com/files/iconic/raster/white/play_9x12.png')}.bookmarkContainer .bookmark #pause.paused:hover{background-image:url('http://diknows.com/files/iconic/raster/green/play_9x12.png')}.bookmarkContainer .bookmark.last{background:-moz-linear-gradient(top,#333 0,#7f7f7f 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(0%,#333),color-stop(100%,#7f7f7f));background:-webkit-linear-gradient(top,#333 0,#7f7f7f 100%);background:-o-linear-gradient(top,#333 0,#7f7f7f 100%);background:-ms-linear-gradient(top,#333 0,#7f7f7f 100%);background:linear-gradient(to bottom,#333 0,#7f7f7f 100%)}.bookmarkContainer .bookmark.last:hover{background:#666}.bookmarkContainer .bookmarkClose{cursor:pointer;display:block;width:100%;height:16px;border-top:1px solid #666;background-color:#333;border-bottom:1px solid #333;color:#e3e3e3!important;background-color:#333;display:inline-block;width:20%;color:#e81818!important}.bookmarkContainer .bookmarkClose:hover{background-color:#666}.bookmarkContainer .bookmarkClose.first{border-radius:15px 15px 0 0}.bookmarkContainer .bookmarkClose.last{border-radius:0 0 15px 15px}.bookmarkContainer .bookmarkClose.marked{background:transparent url('http://diknows.com/files/iconic/raster/white/map_pin_fill_8x12.png') no-repeat center right}.bookmarkContainer .bookmarkClose #text,.bookmarkContainer .bookmarkClose #lock,.bookmarkContainer .bookmarkClose #pause{display:inline-block;float:left;visibility:hidden;min-width:12px;padding-right:2px;height:100%;vertical-align:middle}.bookmarkContainer .bookmarkClose #lock{background:transparent url('http://diknows.com/files/iconic/raster/white/lock_fill_9x12.png') no-repeat center left}.bookmarkContainer .bookmarkClose #lock:hover{background-image:url('http://diknows.com/files/iconic/raster/green/lock_fill_9x12.png')}.bookmarkContainer .bookmarkClose #lock.locked{background-image:url('http://diknows.com/files/iconic/raster/white/unlock_fill_9x12.png')}.bookmarkContainer .bookmarkClose #lock.locked:hover{background-image:url('http://diknows.com/files/iconic/raster/green/unlock_fill_9x12.png')}.bookmarkContainer .bookmarkClose #pause{background:transparent url('http://diknows.com/files/iconic/raster/white/pause_9x12.png') no-repeat center left}.bookmarkContainer .bookmarkClose #pause:hover{background-image:url('http://diknows.com/files/iconic/raster/green/pause_9x12.png')}.bookmarkContainer .bookmarkClose #pause.paused{background-image:url('http://diknows.com/files/iconic/raster/white/play_9x12.png')}.bookmarkContainer .bookmarkClose #pause.paused:hover{background-image:url('http://diknows.com/files/iconic/raster/green/play_9x12.png')}.bookmarkContainer .bookmarkClose.last{background:-moz-linear-gradient(top,#333 0,#7f7f7f 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(0%,#333),color-stop(100%,#7f7f7f));background:-webkit-linear-gradient(top,#333 0,#7f7f7f 100%);background:-o-linear-gradient(top,#333 0,#7f7f7f 100%);background:-ms-linear-gradient(top,#333 0,#7f7f7f 100%);background:linear-gradient(to bottom,#333 0,#7f7f7f 100%)}.bookmarkContainer .bookmarkClose.last:hover{background:#666}.bookmarkContainer.last{background:-moz-linear-gradient(top,#333 0,#7f7f7f 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(0%,#333),color-stop(100%,#7f7f7f));background:-webkit-linear-gradient(top,#333 0,#7f7f7f 100%);background:-o-linear-gradient(top,#333 0,#7f7f7f 100%);background:-ms-linear-gradient(top,#333 0,#7f7f7f 100%);background:linear-gradient(to bottom,#333 0,#7f7f7f 100%);border-radius:0 0 10px 10px}.bookmarkContainer.last:hover{background:#666}.bookmarkContainer.last .bookmark{border-radius:0 0 0 10px;background:-moz-linear-gradient(top,#333 0,#7f7f7f 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(0%,#333),color-stop(100%,#7f7f7f));background:-webkit-linear-gradient(top,#333 0,#7f7f7f 100%);background:-o-linear-gradient(top,#333 0,#7f7f7f 100%);background:-ms-linear-gradient(top,#333 0,#7f7f7f 100%);background:linear-gradient(to bottom,#333 0,#7f7f7f 100%)}.bookmarkContainer.last .bookmark:hover{background:#666}.bookmarkContainer.last .bookmarkClose{border-radius:0 0 10px 0;background:-moz-linear-gradient(top,#333 0,#7f7f7f 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(0%,#333),color-stop(100%,#7f7f7f));background:-webkit-linear-gradient(top,#333 0,#7f7f7f 100%);background:-o-linear-gradient(top,#333 0,#7f7f7f 100%);background:-ms-linear-gradient(top,#333 0,#7f7f7f 100%);background:linear-gradient(to bottom,#333 0,#7f7f7f 100%)}.bookmarkContainer.last .bookmarkClose:hover{background:#666}.rTButton{cursor:pointer;display:block;width:100%;height:16px;border-top:1px solid #666;background-color:#333;width:20%;display:inline-block;color:#18e818!important}.rTButton:hover{background-color:#666}.lTButton{cursor:pointer;display:block;width:100%;height:16px;border-top:1px solid #666;background-color:#333;width:20%;display:inline-block;color:#18e818!important;color:#e81818!important}.lTButton:hover{background-color:#666}.mTButton{cursor:pointer;display:block;width:100%;height:16px;border-top:1px solid #666;background-color:#333;width:20%;display:inline-block;color:#18e818!important;color:#e81818!important;width:60%;color:#25c2e5!important;border-right:0;border-left:0}.mTButton:hover{background-color:#666}.stop{color:white;background:black}.brief{padding:15px;line-height:1.2em;text-align:justify;color:#e3e3e3;font-size:100%}.selected{background-color:#8c0e0e!important}";
//"
// Click the link and automatically go to Readablility view
window.setTimeout( function(){$('#read-link').click();} , 8000 ) ;
$(document).ready(function(){
    var frame = $("iframe#read-frame");
    if(frame.length > 0 ){
        var article = frame.attr("src").split("?")[0];
        // similar behavior as an HTTP redirect
        if ( typeof window.location !== "undefined" ) {
            window.location.replace("https://www.readability.com"+article);
            return;
        }
    }
    $( "<style>"+css+"</style>" ).appendTo( "head" );

    // Removing all links, not to click them by mistake
    $("p a").removeAttr("href");

    $("#container").css({
        "padding-left":"0",
        "margin":"0 150px",
        "width":"80%",
        "max-width":"100%"});

    /**
     * The bar holding the buttons
     */
    var bar = $("<div>").attr("id","scroll-bar").addClass("bar");

    /**
     * Initial view of the button, that is cloned for each button
     */
    var button = $("<a>").addClass("button");
    var cbutton = $("<div>").addClass("cButton");

    /**
     * The variable used to hold the interval variable to be cleared later
     */
    var scrolldelay=null;

    /**
     * Clears the interval stored in scrolldelay
     */
    var stopScroll = function () { clearInterval(scrolldelay); };

    /**
     * Scrolls a page one pixel at a time every times milliseconds
     * @param times The time interval in milliseconds to scroll down a pageScroll
     */
    var time = 0;
    var paused = false;
    var locked = false;
    var pageScroll = function (elm,times) { 
        stopScroll();
        scrolldelay = setInterval(function(){
            if(!paused){
                window.scrollBy(0,1);
                var height = $('body').height();
                time = Math.ceil(((( height - window.scrollY )/1000.0 ) * times)/60.0);
                $('#text',elm).text(time+" Min");
            }
        },times);
    };

    var pause = function(){
        $this = $(this);
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
        $this = $(this);
        if( $this.hasClass('locked') ){
            $this.removeClass('locked');
            locked = false;
        }else{
            $this.addClass('locked');
            locked = true;
        }
        return false;
    };
    /**
     * Creates a new visual button, used to start page scrolling in a certain 
     * speed 
     * @param title The caption/text over the button
     * @param slowness The interval between each 1 pixel scroll of the page
     * @return The button jquery object that was created 
     */
    var mkButton = function (slowness){
        var color = 127-slowness;
        var id="marked"+color;
        var normalCss = { "background-color":"rgba("+color+","+color+","+color+",1)" };
        var b = button.clone().attr("id",id)
            .append( $('<a>').attr('id','pause').html("&nbsp;").click(pause))
            .append( $('<a>').attr('id','lock').html("&nbsp;").click(lock))
            .append( $('<a>').attr('id','text'))
            .css(normalCss).hover(function(){
                if(locked || paused){
                    return;
                }
                pageScroll(this,slowness);
                clear(this);
                $(this).addClass("selected");
                $('#pause',this).css('visibility','visible');
                $('#lock',this).css('visibility','visible');
                $('#text',this).css('visibility','visible');
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

    var fontsize = localStorage.getItem('fontsize');
    var showFont = function(){
        if ( ! fontsize || fontsize === "NaN" ){
            fontsize  = 100;
        }
        $('#fonts #m').html(fontsize+'%');
        return fontsize;
    };

    var sizeFont = function(size){
        $("p").css({"font-size" : size+"%"});
        localStorage.setItem('fontsize', size) ;
    };

    var increaseFont = function(){
        ++fontsize;
        sizeFont ( fontsize ) ;
        showFont();
    };

    var decreaseFont = function(){
        --fontsize;
        sizeFont ( fontsize ) ;
        showFont();
    };

    var hideFont = function(){
        $('#fonts #m').html('A');
    };

    var tButton = function(o){
        var lButton = $("<a>",{id:'l', class:'lTButton'}).html(o.lText).click (o.lInHandler).mouseout(o.lOutHandler); 
        var mButton = $("<a>",{id:'m', class:'mTButton'}).html(o.mText).mouseover (o.mInHandler).mouseout(o.mOutHandler);
        var rButton = $("<a>",{id:'r', class:'rTButton'}).html(o.rText).click (o.rInHandler).mouseout(o.rOutHandler);
        var button = $("<div>", {"id":o.id}).append(lButton).append(mButton).append(rButton);
        return button;
    };

    var fontButton = tButton ( {
        'id'    : 'fonts',
        'lText' : '&mdash;',
        'lInHandler' : decreaseFont,
        'lOutHandler' : hideFont,

        'mText' : 'A',
        'mInHandler' :  showFont,
        'mOutHandler' : hideFont,

        'rText' : '+',
        'rInHandler' : increaseFont,
        'rOutHandler' : hideFont 
    });

    //TODO: OPTIMIZE THIS TO USE ONLY THE ARTICLE ID not the full URL
    var bookmarks_name  = document.URL+"_bookmarks";

    /**
     * Gets the stored bookmarks json object of current page
     */
    var getBookmarks = function(){
        var bookmarks = localStorage.getItem(bookmarks_name);
        if(typeof bookmarks === "undefined" || bookmarks === null){
            bookmarks = {};
        }else{
            bookmarks = JSON.parse(bookmarks);
        }
        return bookmarks;
    };

    /**
     * Do the saving of the bookmarks
     */
    var setBookmarks = function(bookmarks){
        localStorage.setItem(bookmarks_name,JSON.stringify(bookmarks));
    };

    /**
     * Add current position of the page to the stored bookmarks 
     * in localStorage and shows it in the bar
     */
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

    /**
     * Adds a bookmark to the bar
     */
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

    /**
     * Shows the previously saved bookmarks
     */
    var loadBookmarks = function(){
        var bookmarks = getBookmarks();
        for(var key in bookmarks ) {
            if ( bookmarks.hasOwnProperty(key)){
                showBookmark(key,bookmarks[key].position);
            }
        }
    };


    // The brief function to make a brief out of the article
    var brief = function () { 
        var sentences = $("<div>").attr("id","brief").addClass("brief");
        $('p').each(function(){
            var text = $(this).text();
            var sentence = text.split(/\./);
            if(sentence.length > 0 && (''+text).indexOf('.') >= 0 ){
                sentences.append($('<span>').text(sentence[0]+'. '));
            }
        });
        return sentences;
    };

    // A flag to detect if the brief box is visible or not
    var briefVisible = false;

    var closeBox = function(){ 
        $('#box').remove();
        briefVisible = false;
    };
    var closer = $('<button>').addClass("closer").text('x').click(closeBox);

    var box = $("<div>").attr("id","box").addClass("box");

    /**
     * Shows a brief box and insert the brief html text inside it.
     */
    var showBox = function(text){
        // In case its visible already, close it.
        if ( briefVisible ) {
            closeBox () ;
            return;
        }
        $("section#container").prepend(box);
        briefVisible = true;
        $('#box').html(text).prepend(closer);
    };

    // Visually appending the buttons to the right floating bar
    var SPEED_LEVELS=10;
    for(var i=1; i<=255; i+=(255/SPEED_LEVELS)){
        if ( i <= 1 ) {
            bar.append(mkButton(Math.ceil(i/2)).addClass("first").text("Fast"));
        }else{
            bar.append(mkButton(Math.ceil(i/2)));
        }
    }

    var clear = function (elm){
        var siblings = $(elm).siblings('a.button',bar);
        locked = false;
        paused = false;
        siblings.removeClass("selected");
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
    // Appending the clear button to the end of buttons bar
    bar.append(button.clone().addClass("stop").text("Stop").click(stopHandler))
        .append(fontButton)
        .append(cbutton.clone().text("Brief") .click(function(){showBox(brief());}))
        .append(cbutton.clone().addClass('last').text("Mark").click(bookmark));


    // Putting the bar before the document 
    $("section#container").prepend(bar);

    // The element update after Readablility changed their layout
    $(".hentry").addClass("wide");
    // Clearing useless stuff 
    $(".ouvrage").parent().remove();

    // Removing useless stuff in wikipidia
    var removables = ['#footnotes', '#sources', '.reflist', 'sup',
        '.refbegin','#mw-normal-catlinks','.mw-articlefeedback','.bandeau-portail','.references-small'];

    /**
     * Removes all the elements matches the selectors in the passed array
     * @param removables The array holding selectors to select the elements to  be removed 
     */
    var remover = function(removables){
        for (var i=0;i<removables.length;i++){
            if($(removables[i]).length > 0) {
                $(removables[i]).remove();
            }
        }
    };
    /**
     * A clicker function, clicks over the element of the passed id
     * @param id The id of the element without the # of the selector
     */
    var clicker = function(id){
        var elem = document.getElementById(id);
        if ( elem ) {
            try {
                if (elem.click()) {
                    return true;
                }
            }
            catch(e) { /* This element does not support click */ }
            // attempt 2
            if (document.createEvent) {
                var evtObj = document.createEvent('MouseEvents');
                if (evtObj && elem.dispatchEvent && evtObj.initMouseEvent) {
                    evtObj.initMouseEvent( 'click', true, true, document.defaultView,
                            1, 0, 0, 0, 0, false, false, false, false, 0, null); 
                    return elem.dispatchEvent(evtObj);
                }
            }
            else if (document.createEventObject) {
                return elem.fireEvent('onclick');
            }
            return false;
        }
    };
    // Set font size to the previously set/saved font size 
    sizeFont(fontsize);
    // Remove useless elements ( specially from wikipedia ) 
    remover(removables);
    // Clicking the Read Later Button
    clicker('read-later-button');
    loadBookmarks();
});
