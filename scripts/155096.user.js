// ==UserScript==
// @name       ErepSpammer by xivrox
// @namespace  http://partiaimperialna.pl/tools/
// @version    0.2.1
// @description  spams the erep lists
// @include    http://www.erepublik.com/*/main/messages-compose/*
// @include    http://www.erepublik.com/*/main/messages-inbox
// @include    http://www.erepublik.com/*/main/party-members/*
// @require    http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @copyright  2012+, xivrox
// ==/UserScript==
var api_url = 'http://partiaimperialna.pl/tools/spam/api';
function updateMessage(subject, message) {
    if(window.location.href.match(/http:\/\/www.erepublik.com\/\w\w\/main\/messages-compose\/\d+/)) {
        $('#citizen_subject').val(subject);
        $('#citizen_message').text(message);
    }
}
 
function changeList(code) {
    $.post(api_url, {
        method: 'get_list_info',
        list_code: code
    }, function(data) {
        if(data.status == 'ok') {
            GM_setValue('list_code', code);
            updateMessage(data.subject, data.message);
        } else {
         	$('#x_spammer_code').val('ERROR');   
        }
    }, 'json');
}
function getList(code) {
    $.post(api_url, {
        method: 'get_list_info',
        list_code: code
    }, function(data) {
        if(data.status == 'ok') {
            updateMessage(data.subject, data.message);
        }
    }, 'json');
    
    match = window.location.href.match(/http:\/\/www.erepublik.com\/\w\w\/main\/messages-compose\/(\d+)/);
    $.post(api_url, {
        method: 'get_victim_info',
        list_code: code,
        victim_id: match[1]
    }, function(data) {
        if(data.status == 'ok') {
            if(data.spammed == 'yes') {
                var error = '<table class="error_message"><tbody><tr><td>Wstrzymaj się! Ta osoba została już zaspamowana, może spróbuj z kimś innym?</td></tr></tbody></table>';
                $(error).insertAfter('.msg_title_container');
            }
        }
    }, "json");
}
var _g_victim_id = 0;
function changeVictim(victim_id, timeout) {
    if(victim_id == 0) {
        setTimeout(function() { window.location.href="http://www.erepublik.com/en/main/messages-inbox" },timeout);
    } else {
        _g_victim_id = victim_id;
        setTimeout(function() { window.location.href="http://www.erepublik.com/en/main/messages-compose/"+_g_victim_id }, timeout);
    }
}
function showPanel() {
    var outer = '<div class="user_notify" id="x_spammer_panel" style="margin-top: 10px"></div>';
    var inner = '<input type="text" id="x_spammer_code" style="width: 60px;" /><button id="x_spammer_button">Load</button><br/><button id="x_spammer_remove">Remove</button>';
    $(outer).append(inner).appendTo('#large_sidebar');
    
    var current_code = GM_getValue('list_code',0);
    if(current_code != 0) {
        $('#x_spammer_code').val(current_code);
    }
    
    $('#x_spammer_button').click(function() {
    	changeList($('#x_spammer_code').val());
    });
    
    $('#x_spammer_remove').click(function() {
    	GM_setValue('list_code', 0);
        updateMessage('', '');
        $('#x_spammer_code').val('');
    });
}
var partyCurrentList = 0;
function fillFromParty() {
    $('#x_spammer_code').val('WORKING');
    
    var match = window.location.href.match(/http:\/\/www.erepublik.com\/\w\w\/main\/party-members\/(\d+)/);
    
    $.post(api_url, {
        method: 'add_party_list',
        content: $('#content').html(),
        list_code: partyCurrentList,
        party_id: match[1],
    }, function(data) {
        if(data.status == 'ok') {
            $('#x_spammer_code').val('OK');
            GM_setValue('list_code', partyCurrentList);
        } else {
            $('#x_spammer_code').val('ERROR');
        }
    }, "json");
}
function showPartyPanel() {
    var outer = '<div class="user_notify" id="x_spammer_panel" style="margin-top: 10px"></div>';
    var inner = '<input type="text" id="x_spammer_code" style="width: 60px;" placeholder="list code" /><button id="x_party_button">Add party</button><br/>';
    $(outer).append(inner).appendTo('#large_sidebar');
    
    var current_code = GM_getValue('list_code',0);
    if(current_code != 0) {
        $('#x_spammer_code').val(current_code);
    }
    
    $('#x_party_button').click(function() {
        partyCurrentList = $('#x_spammer_code').val();
    	fillFromParty();
    });
}
$(document).ready(function() {
    
    if(window.location.hash && window.location.hash[1] == '!') {
        var list_code = window.location.hash.slice(2);
        GM_setValue('list_code', list_code);
    }
    
    if(window.location.href.match(/http:\/\/www.erepublik.com\/\w\w\/main\/messages-compose\/\d+/)) {
        showPanel();
        
        var current_code = GM_getValue('list_code',0);
        if(current_code != 0) {
            getList(current_code);
        }
        
        $('#message_form > a').click(function() {
            match = window.location.href.match(/http:\/\/www.erepublik.com\/\w\w\/main\/messages-compose\/(\d+)/);
            var citizen_id = match[1];
            $.post(api_url, {
                method: 'next_victim',
                list_code: GM_getValue('list_code',0),
                victim_id: citizen_id
            }, function(data) {
                if(data.status == 'ok') {
                    //setTimeout('changeVictim('+data.next_victim_id+')',2000);
                    changeVictim(data.next_victim_id, 1000);
                } else {
                    alert('ERROR');
                }
            }, 'json');
        });
    }
    else if(window.location.href.match(/http:\/\/www.erepublik.com\/\w\w\/main\/party-members\/\d+/)) {
        showPartyPanel();
    }
});
   