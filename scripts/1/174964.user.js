// ==UserScript==
// @name           SteamGifts Thanks
// @version        1.3
// @namespace      steamgifts
// @description    Automatically comments thanks when entering giveaway.
// @include        http://www.steamgifts.com/giveaway/*
// @grant          none
// ==/UserScript==

var enter = document.querySelector('.rounded.view.submit_entry');
if (enter){
    $('.submit_entry').attr('href', '#');
    var sub = function(ev){
        var comment = $('#body').val();
        if(comment == ""){ comment = 'Thanks.'; }
        
        var posting = $.post(window.location.href, { form_key:  $("input[name='form_key']").val(), enter_giveaway: '1', body: comment, parent_id: '0', submit_comment: 'Sumbit Comment' } );
        
        $('.submit_entry').html('Processing...');
		$('.submit_entry').unbind('click');
        
        posting.done(function(){
            location.reload();
        });
        posting.fail(sub);
    }
	$('.submit_entry').unbind('click').bind('click', sub);
}