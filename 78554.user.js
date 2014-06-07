// ==UserScript==
// @name           Patr0clev2
// @namespace      http://userscripts.org/scripts/show/78554
// @include        http://www.planete-lolo.com/*
// @description    Toggle jQuery power
// @require       

// ==/UserScript==







var $$;


    (function(){
	
		if (typeof unsafeWindow.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
    
            GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js';
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
        
		$$ = unsafeWindow.jQuery;
		$$('#announce > h2').attr('patr0cle','1');
		$$('#.blocktable > h2').attr('patr0cle','1');
		$$('.blockpost > h2').attr('patr0cle','1');
		

		
	$$('#announce > h2').click(function(){
		planetelolo($$(this));
	});
	
	$$('#.blocktable > h2').click(function(){
		planetelolo($$(this));
	});

	$$('.blockpost > h2').click(function(){
		planetelolo($$(this));
	});
	
        }
		
    }
	
function planetelolo(e){
		if (e.attr('patr0cle')=='1'){
			e.attr('patr0cle','0');
			e.siblings().slideUp();}
		else {
			e.attr('patr0cle','1');
			e.siblings().slideDown();}
}


