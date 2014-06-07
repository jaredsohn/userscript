// ==UserScript==
// @name           Lockerz Restock Checker
// @namespace      http://lockerz.com
// @include        http://ptzplace.lockerz.com/*
// @version		   0.4
// @author         dunkle
// ==/UserScript==



// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(0); }
    }
    GM_wait();

// All your GM code must be inside this function


var timer = setInterval(toggleSomething, 1000);

    function letsJQuery(f) {
       if (f == 0) { alert('Script was started! Press OK.'); return;}
        var sizeOld = $('body').html().length + 250;

       		$.ajax({
			type: "GET",
			url: 'http://ptzplace.lockerz.com/',
			data : '',
			dataType: "html",
			complete: function(){},
			success: function(response){
                            var sizeNew = response.length;
                            //alert ('old:' + sizeOld + 'new:' + sizeNew);
                            if ( sizeOld < sizeNew ) {window.location.href='http://www.musli.net/files/audio/snezhnoe/09.mp3';}
                        }
		});


    }

    function toggleSomething() {
       var timeArray = new Array(60000, 61444, 62454, 63999, 65778, 68777, 70123, 72456,
                                75444,76888, 77456, 78987, 80435, 81433, 82432, 83554, 84333, 85111, 86777, 87888
                                                                          );

           letsJQuery(1);
           clearInterval(timer);
           timer = setInterval(toggleSomething, randRange(timeArray));
    }


    function randRange(data) {
           var newTime = data[Math.floor(data.length * Math.random())];
           return newTime;
    }