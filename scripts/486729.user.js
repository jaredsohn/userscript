// ==UserScript==
// @name        DeezerToSqueezebox
// @description Simple scripts that adds the ability to send Deezer Tracks/Albums to a SqueezeBox to play. Requires the Squeezebox Deezer plugin. Enter your server IP and Squeezebox mac in the script.
// @namespace   gerben
// @include     http://www.deezer.com/*
// @version     1
// @grant         GM_xmlhttpRequest
// @require       http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// ==/UserScript==

var squeezebox_mac = '00:11:22:33:44';
var squeezebox_server = '1.2.3.4:9000';

/**
 * Plays a deezer track by ID, you can find these numbers in the squeezebox playlist, and in the Deezer HTML
 * You can find all the commands in Request.pm on the squeezebox server
 * @var int id Deezer track ID
 * @var string command Either play or add
 */
function play_deezer_track(id,command = 'play',mediaType='mp3')
{
    var data = {
        'id' : 1,
        'method' : 'slim.request',
        'params' : [ 
            squeezebox_mac,
            [ 
                'playlist',
                command,
                'deezer://' + id + "." + mediaType
            ]
        ]   
    };
    
    GM_xmlhttpRequest({
        method: "POST",
        url: "http://" + squeezebox_server + "/jsonrpc.js",
        data: JSON.stringify(data),
        onerror: function(response) {},
        onload: function(response) {}
    });
}

function deezer_send_command(cmd)
{
    var data = {
        'id' : 1,
        'method' : 'slim.request',
        'params' : [ 
            squeezebox_mac,
            cmd
        ]   
    };
    
    GM_xmlhttpRequest({
        method: "POST",
        url: "http://" + squeezebox_server + "/jsonrpc.js",
        data: JSON.stringify(data),
        onerror: function(response) {},
        onload: function(response) {}
    });
}

function play_deezer_playlist()
{
    var track_ids = [];
    $('#tab_track_list_content tr.song,#naboo_album_tracks tr.song').each(function(){
        var track_id = $(this).attr('id').replace('naboo_datagrid_track_','');
        track_ids.push(track_id);
    });
    deezer_send_command(['playlist','clear']);
    for(var i = 0 ; i < track_ids.length ; i++) {
        play_deezer_track(track_ids[i],'add');
    }
    deezer_send_command(['play']);
}

var template_play = '<a href="#" class="squeeze-play" data-id="__data-id__"><img alt="play" src="http://' + squeezebox_server + '/html/images/b_play.gif"></a>';
var template_append = '<a href="#" class="squeeze-append" data-id="__data-id__"><img alt="play" src="http://' + squeezebox_server + '/html/images/b_add.gif"></a>';

function bind_squeeze_events()
{
    $('li[data-id] a span.sprite_icn_all').each(function(index){
        var track_id = $(this).parent().parent().parent().parent().attr('data-id');
        $(template_append.replace("__data-id__",track_id)).insertAfter($(this).parent());        
        $(template_play.replace("__data-id__",track_id)).insertAfter($(this).parent());
    });
    $('<col style="width: 60px;" class="squeezebox-controls"/>').insertAfter($('table.datagrid-table > colgroup col.position'));
    $('<th class="squeezebox-controls" style="width: 60px;"></th>').insertAfter($('table.datagrid-table > thead th.position'));
    
    $('tr.song').each(function(index) {
        var track_id = $(this).attr('id').replace('naboo_datagrid_track_','');
        $('<td class="squeeze-controls"></td>').insertAfter($(this).find('td.position'));
        $('td.squeeze-controls',this).append(template_play.replace("__data-id__",track_id));
        $('td.squeeze-controls',this).append(template_append.replace("__data-id__",track_id));
    });
    if($.find('#page_playlist #naboo_datagrid_listen').length == 1) {
        var playlist_id = window.location.href.match(/\d+/g)[0];
        $('<button class="btn btn-default" id="squeeze-play-playlist" data-id="' + playlist_id + '">Naar Squeezebox</button>').insertBefore($('#naboo_datagrid_listen'));        
    }
    if($.find('#page_album #naboo_datagrid_listen').length == 1) {
        var album_id = window.location.href.match(/\d+/g)[0];
        $('<button class="btn btn-default" id="squeeze-play-playlist" data-id="' + album_id + '">Naar Squeezebox</button>').insertBefore($('#naboo_datagrid_listen'));        
    }

    $('#squeeze-play-playlist').on('click',function() {
        play_deezer_playlist();
        return false;
    });    
    $('.squeeze-play').on('click',function() {
        play_deezer_track($(this).attr('data-id'),'play');
        return false;
    });
    $('.squeeze-append').on('click',function() {
        play_deezer_track($(this).attr('data-id'),'append');
        return false;
    });
    return false;
}

//$(document).on('EVENT.NAVIGATION.page_changed',bind_squeeze_events);
$( document ).ready(function(){
    var btn='<li><a style="font-size:10pt; color:#FFF;" href="#" id="btn-bind-squeeze-events">Squeezebox</a></li>';
    $(btn).insertBefore('#user_logged ul.nav li.dropdown');
    $('#btn-bind-squeeze-events').on('click',bind_squeeze_events);
});

