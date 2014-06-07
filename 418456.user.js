// ==UserScript==
// @name        live js call
// @namespace   com.salmonapps.livejscall
// @include     http://dnpic.com/*
// @updateURL   http://userscripts.org/scripts/source/418456.meta.js
// @downloadURL http://userscripts.org/scripts/source/418456.user.js
// @version     2
// @grant       unsafeWindow
// @require     http://code.jquery.com/jquery-2.1.0.min.js

// ==/UserScript==
console.log('user script loaded');
this.$ = this.jQuery = jQuery.noConflict(true);
unsafeWindow.$ = this.$;

this.box = function() {
    $('#newbdez33_tool_box').remove();
    $.get('http://0.0.0.0:8033/box.php', function(h){
        
       var toolbox = $('<div />').attr('id', 'newbdez33_tool_box');
        toolbox.css('position', 'absolute');
        toolbox.css('top', 0);
        toolbox.css('left', 0);
        toolbox.width(300);
        toolbox.height(300);
        toolbox.css('background-color', 'white');
        toolbox.css('border-width', '2px');
        toolbox.css('border-color', 'black');
        toolbox.css('border-style', 'solid');
        $('body').append(toolbox);
        $('#newbdez33_tool_box').html(h);
        
        $.getScript('http://0.0.0.0:8033/box.js', function(data, textStatus, jqxhr) {
             console.log( "Load was performed." );
        });
    });
};

unsafeWindow.box = box;

unsafeWindow.box();


