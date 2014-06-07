// ==UserScript==
// @name           Battle.forums.light
// @namespace      Battle.forums.light
// @include        http://forums.battle.net/thread.html?*
// ==/UserScript==

// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://code.jquery.com/jquery-1.4.1.min.js';
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
        $('.resultbox .innerborder').closest('div').unwrap('div');
		$('.resultbox > .innerborder').find('td:first').css('background-image','none');
		var row = $('.resultbox > .innerborder').find('.miniadmin').css('position','relative').css('left','-9px').find('.btblue, .tool-icons').css('float','none').end().find('.tool-icons').css('position','relative').css('left','9px').end().parent();
		
		var admin = new Array();
		var j = 0;
		$('.resultbox > .innerborder').each(function(){
			admin[j] = $(this).find('.miniadmin:eq(0)').detach();
			j++;
		});
		
		row.remove();
		
		$('.resultbox > .innerborder').find('td:first > div:eq(3) > div:eq(1)').remove();
		$('.resultbox > .innerborder').find('td:first > div:eq(0)').remove();
		$('.resultbox > .innerborder').find('td:first > div:eq(0)').remove();
		$('.resultbox > .innerborder td > .breakWord').css('padding','3px').css('margin','0px').parent().css('height', '5px').parent().parent().parent().css('height', '5px');
		//$('.listinfo').remove();
		var i = 0;
		$('.icon-realm').each(function(){
			$(this).html("");
			admin[i++].appendTo(this).unwrap('.icon-realm').unwrap('.listinfo').find("img[src*='biohazard']").parent().remove();
		});
		
		$('.listinfo').remove();
		
		$('.resultbox > .innerborder').parent().parent().css('border-bottom','1px solid #014F84');
		$('.chardata b a').css('color','#FFAC04');
    }