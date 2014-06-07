// ==UserScript==
// @name Simple Homepage [BETA]
// @namespace http://myspace.com/TO1xy
// @description Makes the MySpace homepage very simple
// @include http://home.myspace.com/index.cfm?fuseaction=user
// @include http://www.myspace.com/index.cfm?fuseaction=user
// @include http://www.myspace.com/index.cfm?fuseaction=home
// @include http://home.myspace.com/index.cfm?fuseaction=home
// ==/UserScript==

// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

// All your GM code must be inside this function
    function letsJQuery() {

// Hides Bullshit Modules / Customizes Non-hidden Modules
	$('#module2,#module4,#module6,#module8,#module10,#module11,#module13,#module15,#module16,#module17,#module19,#module20').css('display','none');
	$('#module5').empty().addClass('userBadgeModule').removeClass('googleAdSenseModule').html($('#module2').html());
	$('#col1_1').css('width','758px');

// Fucking Status Box
	$('.pagethemes').html('<input id="toggle" type="button" value="Update Status" />');
	$('#module12').appendTo('.pagethemes').css({'position':'absolute','margin-left':'-336px','z-index':'666'}).hide();
	$('#toggle').click(function(){
		$('#module12').toggle();
	});
	$('#toggle').toggle(
		function(e){
		e.preventDefault();
		$(this).attr('value', 'Close Status');},
		function(e){
		e.preventDefault();    
		$(this).attr('value', 'Update Status');
	});
    }