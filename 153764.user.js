// ==UserScript==
// @name          Deezer Unlimited
// @namespace     http://www.deezer.com/
// @description   Removes the limitations of the Discovery Mode in Deezer.
// @include       http://www.deezer.com/*
// @version       1.1
// ==/UserScript==

initialize = function() {
    stopAudioAdsTimer();
    adsTimeoutId = -1;
    clearTimeout(dzPlayer.logListenId);
    dzPlayer.setForbiddenListen(false);
    $('#push_abo').remove();
    if($('.mini').length) {
        menu.displayCover();
    }
};
	
repeat = function() {
    if($('#head').css('top') === '31px') {
        $('.deezernotifyclose').click();
    }
    if($('#facebox').length) {
        if(!$('#popin_login').length) {
            $.facebox.close();
        }
    }
    if($('#btnHq').length) {
		$('#btnHq').attr('onclick', 'dzPlayer.setHq(!dzPlayer.hq); return false;');
	}
};

$(window).load(function() {
    setTimeout(initialize, 1000);
    setInterval(repeat, 1000);
});
