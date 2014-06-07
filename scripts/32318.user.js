// ==UserScript==
// @name           FriendFeed Rejaw
// @namespace      http://www.justinkorn.com
// @description    Add Rejaw in a tab on FriendFeed 
// @include        http://friendfeed.com/*
// ==/UserScript==

/*
	FriendFeed Rjaw
	http://www.justinkorn.com
	code modified from http://ffapps.com/tabs/
	
	Version: 0.3
*/

(function() {

  function Rejaw_setup() {
	$('.settings').find('.l_tab:last').after('<td class="l_tab" style="padding-left: 10px;" id="tdtabtm"><div class="rounded bb" id="tabtm"><div class="t"><div class="l"><div class="r"><div class="tl"><div class="tr"><div class="body"><a id="tab-link-Rejaw" href="#"><img src="http://rejaw.com/images/logo/favicon.ico"></a></div></div></div></div></div></div></div></td>');
    $('#tab-link-Rejaw').click(function() {
			$('#subtabs').hide();
			$('#body').css("height","100%").html('<div class=iframe style="width:100%;height:100%;"><iframe id="content_iframe" marginWidth=0 marginHeight=0 src="http://rejaw.com/" frameBorder=0 style="width:100%;height:100%;overflow:auto;"></iframe></div>');
			$('.tabs').find('td').removeClass("selected");
			$('.tabs').find('td').find('.rounded').removeClass("white");
			$('.settings').find('#tabtm').addClass("white");
			$('.settings').find('#tdtabtm').addClass("selected");
		});
  }

  function lets_jquery() {
		Rejaw_setup();
	}

  function jquery_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(jquery_wait,100); }
    else { $ = unsafeWindow.jQuery; lets_jquery(); }
  }

  jquery_wait();

})();