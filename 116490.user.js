// ==UserScript==
// @name          EksiDuyuru Mesaj Alarmı - beta
// @author        MBraiN <mbbrain[at]gmail[dot]com>
// @namespace     http://www.eksiduyuru.com
// @description   Yeni bir mesaj geldiğinde sizi uyarır.
// @include       http://www.eksiduyuru.com/*
// ==/UserScript==

var $;

    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
    
            GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
            GM_JQ.type = 'text/javascript';
            GM_JQ.async = true;
    
            GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
        }
        GM_wait();
    })();

    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 100);
        } else {
            $ = unsafeWindow.jQuery.noConflict(true);
            letsJQuery();
        }
    }

    function letsJQuery() {
	
		$.noConflict()
		
		if($('li.spsm-msg01')[0]){
			$('<div id="alertbox">Yeni Bir Mesajınız Var!</div>')
				.css({padding: '10px', background: '#AB0000', color: '#FFFFFF', position: 'fixed',top: '0', width: '99%'})
				.prependTo('body')
				.fadeIn('slow')
				.animate({opacity: 1.0}, 300);
		}
		
		startAnim();
		
    }
	
	
	function fadeIn() {
  $("#alertbox").animate({opacity:0},500);
  setTimeout(fadeOut,350);
}

function fadeOut() {
  $("#alertbox").animate({opacity:1},500);
  setTimeout(fadeIn,350);
}

function startAnim() {
  setTimeout(fadeIn,300);
}
