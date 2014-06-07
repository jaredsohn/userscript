// ==UserScript==
// @name       youtube2mp3
// @namespace  http://use.i.E.your.homepage/
// @version    0.82
// @description  Convert to MP3, from Youtube Clip
// @match      http*://www.youtube.com/*
// @match      http://www.video2mp3.net/*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @require    https://raw.github.com/jquery/jquery-ui/master/tests/jquery.simulate.js
// @copyright  2012+, You
// ==/UserScript==

(function ($) {
    /**
    * @function
    * @property {object} jQuery plugin which runs handler function once specified element is inserted into the DOM
    * @param {function} handler A function to execute at the time when the element is inserted
    * @param {bool} shouldRunHandlerOnce Optional: if true, handler is unbound after its first invocation
    * @example $(selector).waitUntilExists(function);
    */   
    $.fn.waitUntilExists	= function (handler, shouldRunHandlerOnce, isChild) {
        var found	= 'found';
        var $this	= $(this.selector);
        var $elements	= $this.not(function () { return $(this).data(found); }).each(handler).data(found, true);   
        if (!isChild) {
            (window.waitUntilExists_Intervals = window.waitUntilExists_Intervals || {})[this.selector] =
                window.setInterval(function () { $this.waitUntilExists(handler, shouldRunHandlerOnce,     
        true); }, 500);
        } else if (shouldRunHandlerOnce && $elements.length) {
            window.clearInterval(window.waitUntilExists_Intervals[this.selector]);
        }
		return $this;
	}
}(jQuery));

//youtube2mp3 auto download closes when download starts
$('#social-like, #social-share, #vine-plug').waitUntilExists(function(){ 
    setInterval(function(){ 
        self.close(); 
    }, 1000 );  });  

$('#do-download-video').waitUntilExists(function(){   
    $(this).simulate('click'); });

function youtube2mp3() {
    
    if( $('#youtube2mp3').size() == 0 ) {
        
        var youtube2mp3path_hq ='http://www.video2mp3.net/?url='+encodeURIComponent(document.URL)+"&hq=1";    
        $(  '<a id="youtube2mp3" class="yt-uix-button yt-uix-button-default" href="" target="_blank" data-link="'+youtube2mp3path_hq+'" style="margin-left: 8px; height: 22px;"><span class="yt-uix-button-content">MP3 HQ Download</span></a>'  )
          .insertBefore( "#watch7-views-info" ); 
        
    }
    
    $('#youtube2mp3').on('mousedown',function(e) {     
        var url = $(this).attr('data-link');
        if ( e.which != 3 ){
            if( e.which == 1 ){ window.open( url , '_blank' ); }  
            if( e.which == 2 ){ 
                window.open( url , '_blank' ); 
                e.preventDefault();
                return false;
            }
        }
    });
    
}

$(document).ready(function(){ 
    
    youtube2mp3();
    
    var youtube2mp3timerId = setInterval(function() {
        youtube2mp3();
    }, 2500);
    
});