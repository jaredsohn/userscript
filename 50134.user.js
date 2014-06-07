          // ==UserScript==
          // @name           drytremover
          // @namespace      http://nobody.lv/?s=datori&r=1071
          // @description    draugiem.lv youtube clip removover for blogs
          // ==/UserScript==
          // Author: koko
          // Version: 0.1a1
          
          // add jQuery framework
          var GM_jQuery = document.createElement('script');
          GM_jQuery.src = 'http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js';
          GM_jQuery.type = 'text/javascript';
          document.getElementsByTagName('head')[0].appendChild(GM_jQuery);
          
          // wait for jQuery
          function GM_wait() {
          	if( typeof unsafeWindow.jQuery == 'undefined' ) {
          		window.setTimeout(GM_wait,100);
          	} else {
          		$ = unsafeWindow.jQuery;
          		GM_ready();
          	}
          }
          GM_wait();
          
          //nothint special :)
          function GM_ready() {
          	$('object').each(
          		function(i) {
          			var regexp = new RegExp('/.*src="([A-Za-z0-9\-_&;:\/\.]+)".*/');
          			var content = regexp.exec($(this).html()); 
          			content = content[1].replace('/v/', '/watch?v=');
          			$(this).parent().html('<a target="_blank" href="'+content+'">'+content+'</a>');
          		}
          	);
          }
          