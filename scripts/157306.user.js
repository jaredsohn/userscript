// ==UserScript==
// @name       Webex automatic login
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Webex automatic login
// @match      https://roche.webex.com*/*
// @copyright  2012+, Kamil Kuliczkowski
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==

(function($) {
    var refreshTimeout = 15,
    	loginTimeout = 20,
        soundFile = 'http://coolicz.pl/roche/monkey/sounds/webex.mp3';
    
    if ($('input[name="joinnow"]').length && $('input[name="joinnow"]').attr('disabled')) {
        var $button = $('input[name="joinnow"]'),
            refreshTimeout,
        	counterInterval;
        
        $button.parents('tr:first').after('<tr><td align="center" style="padding-top:5px;" class="TblContentFont3"><div>Page will refresh in <span class="refreshNumber">' + refreshTimeout + '</span> sec...</div><div style="padding-top:5px;"><a style="text-decoration:none;font-weight:normal;" href="#" class="cancelRefresh button">Cancel automatic page refresh</a></div></td></tr>');
        var $tr = $button.parents('tr:first').next(),
            $counter = $tr.find('.refreshNumber');
        refreshTimeout = setTimeout(function() {
            location.href = location.href;
        }, refreshTimeout*1000);
        counterInterval = setInterval(function() {
            var c = parseInt($counter.text(), 10);
            $counter.text(--c);
            if (!c) {
            	clearInterval(counterInterval);   
            }
        }, 1000);
        $tr.find('.cancelRefresh').click(function() {
        	clearTimeout(refreshTimeout);
            clearInterval(counterInterval);
            $tr.remove();
            return false;
        });
        
    }
    else if($('input[name="PreJoinForm"]').length) {
        var $button = $('input[name="PreJoinForm"]'),
            clickTimeout,
        	counterInterval;
        
        //preload soundFile
        var audioHtml = '<audio id="webexRingTone" preload="auto" volume="1.0">' +
                            '<source src="' + soundFile + '" type="audio/mpeg" />' +
                        '</audio>';
        $('body').append(audioHtml);
        var player = document.getElementById('webexRingTone');
        
        $button.parents('tr:first').after('<tr><td align="center" style="padding-top:5px;" class="TblContentFont3"><div>Connecting in <span class="connectNumber">' + loginTimeout + '</span> sec...</div><div style="padding-top:5px;"><a style="text-decoration:none;font-weight:normal;" href="#" class="cancelLogin button">Cancel automatic login</a></div></td></tr>');
        var $tr = $button.parents('tr:first').next(),
            $counter = $tr.find('.connectNumber');
        clickTimeout = setTimeout(function() {
            player.play();
            $tr.remove();
            setTimeout(function() {
                $('input[name="PreJoinForm"]').trigger('click');
            }, 1300);
        }, loginTimeout*1000+100);
        counterInterval = setInterval(function() {
            var c = parseInt($counter.text(), 10);
            $counter.text(--c);
            if (!c) {
            	clearInterval(counterInterval);   
            }
        }, 1000);
        $tr.find('.cancelLogin').click(function() {
        	clearTimeout(clickTimeout);
            clearInterval(counterInterval);
            $tr.remove();
            return false;
        });
    }
})(jQuery);