// ==UserScript==
// Copyright (c) 2013, Komrod
// Please Donate: http://www.komrod.com/faire-un-don/
// @name           Meetic profile message history
// @description    Add a message history count to the Meetic profile page
// @version	       0.77
// @include        http://www.meetic.fr/members/*
// @include        http://www.meetic.it/members/*
// @include        http://www.meetic.de/members/*
// @include        http://www.meetic.es/members/*
// @include        http://www.meetic.co.uk/members/*
// @include        http://www.meetic.com/members/*
// @include        http://www.meetic.be/members/*
// @include        http://www.meetic.dk/members/*
// @include        http://www.meetic.nl/members/*
// @include        http://www.meetic.at/members/*
// @include        http://www.meetic.se/members/*
// @include        http://www.meetic.ch/members/*
// @include        http://es.meetic.com/members/*
// @include        http://asia.meetic.com/members/*
// ==/UserScript==

// Create jQuery element
var gm_jquery = document.createElement('script');

// latest jquery
gm_jquery.src = 'http://code.jquery.com/jquery.min.js';
gm_jquery.type = 'text/javascript';

// Add JQuery
document.getElementsByTagName('head')[0].appendChild(gm_jquery);

// wait to load jquery
function gm_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(gm_wait, 100);
    } else {
        $ = unsafeWindow.jQuery;
        gm_start_script();
    }
}
gm_wait();

// Main script
function gm_start_script() {
    var profile_detected = false;
    
    var profile_name = '';
    var profile_id = '';
    
    var page_inbox = 0;
    var page_inbox_end = false;
    var page_inbox_link = '';
    var page_outbox = 0;
    var page_outbox_link = '';
    var page_outbox_end = false;
    
    $(document).ready(function() {
        if ($('.i-member-infos').length > 0) {
            GM_log("Profile detected. Start MEETIC profile history");
            profile_detected = true;
            profile_name = $('.i-member-name').html();
            history();
        }
    });
    
    function history() {
        if (profile_detected == false)
            return false;
        history_update();
        history_get_inbox();
        history_get_outbox();
    }
    
    function history_update() {
        if (profile_detected == false)
            return false;
        var total = page_inbox + page_outbox;
        var str = '';
        str += '	<table class="i-table-info gm_message_history">';
        str += '		<tbody>';
        str += '			<tr>';
        str += '				<th><div style="float:left;">History :</div><div style="float:left; color:#999;" id="gm_message_history_page"></div></th>';
        str += '				<td><div style="float:left;">' + total
        + ' message(s) </div>';
        if (page_inbox_end==false)
            str += '<div style="float:left; color:#FFF; background-color:#555; padding:0 4px 0 4px; margin-left:6px;" title="Received">'
            + page_inbox + '</div>';
        else
            str += '<div style="float:left; color:#FFF; background-color:#9b3c2f; padding:0 4px 0 4px; margin-left:6px;" title="Received">'
            + page_inbox + '</div>';
        if (page_outbox_end==false)
            str += '<div style="float:left; color:#FFF; background-color:#555; padding:0 4px 0 4px; margin-left:6px;" title="Sent">'
            + page_outbox + '</div></td>';
        else
            str += '<div style="float:left; color:#FFF; background-color:#33963d; padding:0 4px 0 4px; margin-left:6px;" title="Sent">'
            + page_outbox + '</div></td>';
        str += '			</tr>';
        str += '		</tbody>';
        str += '	</table>';
        $('.i-member-summary').css('width', '100%');
        $('.gm_message_history').remove();
        $('.i-member-summary').prepend(str);
        $('#gm_message_history td').css('padding', '3px').css('padding-left',
                                                              '6px');
        if (total > 0)
            $('#gm_message_history td')
            .css(
                'background',
                'url("http://stda.ilius.net/img/themes/bluesky/common/buttons.png") repeat-x scroll 0 -581px transparent');
    }
    
    function history_get_outbox(p) {
        if (profile_detected == false)
            return false;
        if (profile_name == '')
            return false;
        if (!p)
            p = 1;
        if (p > 30)
            return 0;
        var url = '/mailbox/index.php?type_bal=1&nbday=1';
        $
        .ajax({
            url : url + '&p=' + p,
            context : document.body,
            success : function(data) {
                var add = message_search($('#message_bals', data),
                                         'outbox', p);
                page_outbox += add;
                history_update();
            }
        });
    }
    
    function history_get_inbox(p) {
        if (profile_detected == false)
            return false;
        if (profile_name == '')
            return false;
        if (!p)
            p = 1;
        if (p>30)
            return 0;
        var url = '/mailbox/index.php?type_bal=0&nbday=1';
        history_update();
        $.ajax({
            url : url + '&p=' + p,
            context : document.body,
            success : function(data) {
                var add = message_search($('#message_bals', data), 'inbox', p);
                page_inbox += add;
                history_update();
            }
        });
    }
    
    function message_search(messages, type, p) {
        if (profile_detected == false)
            return false;
        console.log('Meetic message history: loading '+type+' page '+p);
        if (p>=30)
        {
            if (type == 'inbox')
                page_inbox_end = true;
            else
                page_outbox_end = true;
            return 0;
        }
        
        var nb = 0;
        var nb_messages = 0;
        
        $('.i-photo-member', messages).each(
            function(index) {
                nb_messages++;
                if ($(this).attr('alt').toLowerCase() == profile_name
                    .toLowerCase())
                    nb++;
            });
        if (nb_messages > 0) {
            p = p + 1;
            if (type == 'inbox')
                history_get_inbox(p);
            else
                history_get_outbox(p);
            if (type == 'inbox')
                page_inbox_end = false;
            else
                page_outbox_end = false;
        } else {
            if (type == 'inbox')
                page_inbox_end = true;
            else
                page_outbox_end = true;
        }
        return nb;
    }
    
    function link_search(messages, p) {
        if (profile_detected == false)
            return false;
        var link = '';
        $('.i-photo-member', messages).each(
            function(index) {
                if ($(this).attr('alt').toLowerCase() == profile_name
                    .toLowerCase()) {
                    return $(this).parent().get(0).attr('onclick');
                }
            });
        return '';
    }
}