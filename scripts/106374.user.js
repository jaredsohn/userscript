// ==UserScript==
// @name          4land
// @namespace     http://www.4land.it/
// @description   4land Mymap full screen
// @include       http://4land.it/riservata/*
// @version       1.0
// @icon          http://wiki.greasespot.net/favicon.ico
// ==/UserScript==




var $;

// Add jQuery
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

// Check if jQuery's loaded
    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 100);
        } else {
            $ = unsafeWindow.jQuery.noConflict(true);
            letsJQuery();
        }
    }

// All your GM code must be inside this function
    function letsJQuery() {
        $(document).ready(function(){
        	
        	$("#loading").fadeOut(400,function(){
        		$("#map").before("<table width=100%><tr><td style=\"text-align:center;\"><button id=\"fullscreen\">FullScreen</button></td></tr></table>");
        		$('#fullscreen').hide();
        		$('#fullscreen').fadeIn(400);
        	});
        	
        	$('#fullscreen').click(function(e){
				e.preventDefault();
				
				
        		fullscreenMap();
      			
			
				$('#fullscreenmap').css('left',($('body').width()-$('#fullscreenmap').width())/2);
			
			
			});	
		
		  });
		  
		  function fullscreenMap(){
				
				if($('#fullscreenmap').html()==null){
				
					// copia la mappa e rimuove dal html doc la vecchia mappa
					var $mymap = $("#map");
					$mymap.attr('id','fullscreenmap');
					// nasconde tutto il contenuto del body
					$('body').children().fadeOut(1200,function(){
						$("#fullscreenmap").hide().fadeIn(1200);
					});
					// aggiunge in coda ai contenuti del body la nuova mappa
					$('body').append($mymap);
			 
					$('#fullscreenmap').height($(document).height());			
					$('#fullscreenmap').width('80%');
				}
        		else{
      				$('body').children().fadeOut(1200,function(){
      					$("#fullscreenmap").fadeIn(1200);
      				});
      			}
        			
			}
		 
    }

	