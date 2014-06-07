// ==UserScript==
// @name           Leave Facebook Groups
// @namespace      http://www.darkixion.com/
// @description    Adds a link to quickly leave Facebook groups or reject Facebook group invitations
// @include        http://www.facebook.com/groups.php*
// ==/UserScript==


// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js';
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
   		$("td.actions a[href*='add']").closest('div.grouprow').addClass('invitation');

		$('div.grouprow').not('.invitation').find('td.actions a:last').after('<a class="quickremove" href="#'+$(this).closest('div.grouprow').attr('id')+'">Quick remove</a>');

		post_form_id = $('#post_form_id').val();
		
		$('a.quickremove').bind('click',function(){
			gid = $(this).closest('div.grouprow').attr('id').replace('grouprow','');

			$.post('http://www.facebook.com/ajax/group_actions_ajax.php',
				'__a=1&gid='+gid+'&post_form_id='+post_form_id+'&post_form_id_source=AsyncRequest&remove=1');
				
			$(this).closest('div.grouprow').fadeOut();
		});

		$('div.invitation').find('td.actions a:last').after('<a class="quickreject" href="#'+$(this).closest('div.invitation').attr('id')+'">Quick reject</a>');
		
		$('a.quickreject').bind('click',function(){
			gid = $(this).closest('div.invitation').attr('id').replace('grouprow','');

			$.post('http://www.facebook.com/groups.php',
				'gid='+gid+'&nr=1&decline=1&post_form_id='+post_form_id);

			$(this).closest('div.invitation').fadeOut();
		});

		$('a.quickremove, a.quickreject').attr('style','color:red;');
    }
	
