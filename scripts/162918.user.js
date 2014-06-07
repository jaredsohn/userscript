// ==UserScript==
// @name        Przypięte filmiki w znaleziskach na Wykopie
// @namespace   wykop_pinned_vidoes
// @include     http://*.wykop.pl/*
// @version     1.0
// ==/UserScript==


function PinnedVideos() {
    "use strict";
    var PinButton, PinToggle, PinStyle, PinStyleObject;
    PinStyle = ".pinnedvideo {position: fixed !important;display: block;left: 0;right: 0;"
       +"top: 0;z-index: 3;}"
       +"body.bigmargin {margin-top: 500px !important;}"
       + "#pin_switch {cursor:pointer;float:right;margin-right:40px;margin-top:40px;width: 96px;height:96px;"
       +"background-size:96px;background:url('http://i.imgur.com/lQ5A7A0.png')}"
       +".pin_switch_on{box-shadow: 0 0 20px 10px red;} .pin_switch_off{opacity: 0.6;}";
    PinStyleObject = $('<style />').text(
            PinStyle
       );
    
    PinButton = $('<div />')
        .addClass('pin_switch_off')
        .attr('id', 'pin_switch');
    PinToggle = function(e){
        var self, state, videoembed, body;
        self = $(this);
        state = self.hasClass('pin_switch_on');
        videoembed = $('.videoembed');
        body = $('body');
        if (state) {
            self.removeClass('pin_switch_on');
            self.addClass('pin_switch_off');
            videoembed.removeClass('pinnedvideo');
            body.removeClass('bigmargin');
        }
        else {
            self.removeClass('pin_switch_off');
            self.addClass('pin_switch_on');
            videoembed.addClass('pinnedvideo');
            body.addClass('bigmargin');
        }
    };
    
    
    PinButton.on('click', PinToggle);
    $('head').append(PinStyleObject);
    $('.videoembed .hold').prepend(PinButton);
    
}

function addJQuery(callback) {
    "use strict";
    var script;
    script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
}
if (typeof $ === 'undefined') {
	if (unsafeWindow.jQuery) {
		$ = unsafeWindow.jQuery;
		PinnedVideos();
	} else {addJQuery(PinnedVideos);}
} else {
    PinnedVideos();
}