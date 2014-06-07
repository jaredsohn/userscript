// ==UserScript==
// @name       chat height fix
// @require    http://code.jquery.com/jquery-latest.min.js
// @require    http://dogerain.6te.net/ZeroClipboard.min.js
// @match      https://doge-dice.com/*
// @grant      GM_xmlhttpRequest
// @grant      GM_setClipboard
// @copyright  2014+, 1@wa.vg
// @version    2.3.3.7
// ==/UserScript==
// 1Je77H8nz2qihzEtXzvjXLaFDx7gpDWBHm for btc donations
// DJEBWizGYaHvkLzruPiLQDdD3v7a7M7uS5 for doge donations
// Thanks Nix for his better solution
function B() {
    var div = document.createElement( 'div' );
    $( div ).css({ 'float':'right' ,'border':'1px solid' });
    $( '.chatbutton' ).after( div ); 
    var input = document.createElement( 'input' );
    $( input ).val('600px');
    var button2 = document.createElement( 'button' );
    
    $( button2 ).text( "Change Size");
    $( button2 ).click( function ( e ) { 
        $(".chatscroll").css("height",$( input ).val());
        chatscroll.scroll(function () {
            chatscroll_height = chatscroll.height();
            var scroll_on_chat_timeout;
            var chatscroll_offset_top = chatscroll.offset().top + 300,
                chatlog_outerheight = chatlog.outerHeight() - 2;
            if (Math.ceil(chatscroll_height - chatlog.offset().top + chatscroll_offset_top) > chatlog_outerheight) {
                if (debug_chat_scrolling)
                    chatscroll.css({
                        background : "white"
                    });
                clearTimeout(scroll_on_chat_timeout);
                scroll_on_chat = true
            } else {
                scroll_on_chat = false;
                if (debug_chat_scrolling)
                    chatscroll.css({
                        background : "cyan"
                    });
                clearTimeout(scroll_on_chat_timeout);
                scroll_on_chat_timeout = setTimeout(function () {
                    if (debug_chat_scrolling)
                        chatscroll.css({
                            background : "yellow"
                        });
                    scroll_on_chat = true
                }, chat_scroll_freeze_time * 1e3)
            }
        });
    });
    $( div ).append( input );
    $( div ).append( button2 );
    
}

B(); 
