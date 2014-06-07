// ==UserScript==
// @name           TF2R Notifications
// @namespace      http://tf2calculator.com
// @description    Fixes styling and cleans up your TF2R experience.
// @version        1.4
// @include        http://tf2r.com/*
// ==/UserScript==


(function() {
	var embedMe = function() {

        // Functions
        function cleanNotif(){
            $('.notif:contains("sadly you didnt win")').children('.notifDel').click();
        }
        (function($){
            $.fn.moveTo = function(selector){
                return this.each(function(){
                    var cl = $(this).clone();
                    $(cl).appendTo(selector);
                    $(this).remove();
                });
            };
        })(jQuery);
        // Call functions if

        if($(".notif")[0]){
            cleanNotif();
        }
	};

	// Insert our function to the <head>, <body> or somewhere.
	var script = document.createElement('script');
	script.setAttribute('type', 'text/javascript');
	script.appendChild(document.createTextNode('('+ embedMe +')();'));
	(document.head || document.body || document.documentElement).appendChild(script);
})();