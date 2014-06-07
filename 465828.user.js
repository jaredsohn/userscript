// ==UserScript==
// @name			SoundCloud L&L Nick2
// @namespace		http://www.nickscripts.com
// @version			0.3
// @description		Adds a listenability statistic to the stats area for all tracks. Also greys out tracks you've already listened to.
// @include			http://www.soundcloud.com/*
// @include			http://soundcloud.com/*
// @include			https://www.soundcloud.com/*
// @include			https://soundcloud.com/*
// ==/UserScript==


document.addEventListener('DOMContentLoaded',function(){
    
    $('#content').on('DOMNodeInserted', 'li.soundList__item', function(e) {
        if(!$(e.target).hasClass('soundList__item')) {
            return;
        }
        console.log("on handler"); 
        console.log(e.target);
    });
	
    
    $(document).ajaxSuccess(function(event, xhr, settings) {
        //
        if(settings.url.indexOf('tracks') == -1)return;
      console.log( "item length: "+ $('.soundList__item').length);
      console.log("ajaxSuccess"+ settings.url);
    });
});
