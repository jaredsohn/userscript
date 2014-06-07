// ==UserScript==
// @name           Patr0cle
// @namespace      http://userscripts.org/scripts/show/78544
// @include        http://www.planete-lolo.com/*
// @description    Toggle jQuery power
// @require       

// ==/UserScript==




var $$;


    (function(){
        GM_wait();
    })();


     function GM_wait() {
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
	
function planetelolo(e){
		if (e.attr('patr0cle')=='1'){
			e.attr('patr0cle','0');
			e.siblings().slideUp();}
		else {
			e.attr('patr0cle','1');
			e.siblings().slideDown();}
}



