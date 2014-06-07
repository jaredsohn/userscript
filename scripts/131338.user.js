// ==UserScript==
// @name           AlanLomaxPlaylist
// @namespace      org.random.alp
// @description    Use culturalequity.org as a playlist
// @include        http://research.culturalequity.org/*
// @require	   http://code.jquery.com/jquery-latest.min.js
// @require	   http://jplayer.org/latest/js/jquery.jplayer.min.js
// @require	   http://jplayer.org/latest/js/jplayer.playlist.min.js
// @require	   http://jplayer.org/latest/js/jquery.jplayer.inspector.js
// ==/UserScript==
var playerHTML = '<a id="alp_show_playlist" href="javascript:;" style="display:none">Toggle player!</a><div id="alp_player" style="display:none;z-index:100;position:absolute;width:100%;background:rgba(0,0,0,0.8);" ><div style="display:none;" id="alp_jplayer_1" class="jp-jplayer"></div>\
		<div id="alp_container_1" class="jp-audio" style="color:black">\
			<div class="jp-type-playlist">\
				<div class="jp-gui jp-interface">\
					<ul class="jp-controls">\
						<li><a href="javascript:;" class="jp-previous" tabindex="1">previous</a></li>\
						<li><a href="javascript:;" class="jp-play" tabindex="1">play</a></li>\
						<li><a href="javascript:;" class="jp-pause" tabindex="1">pause</a></li>\
						<li><a href="javascript:;" class="jp-next" tabindex="1">next</a></li>\
						<li><a href="javascript:;" class="jp-stop" tabindex="1">stop</a></li>\
						<li><a href="javascript:;" class="jp-mute" tabindex="1" title="mute">mute</a></li>\
						<li><a href="javascript:;" class="jp-unmute" tabindex="1" title="unmute">unmute</a></li>\
						<li><a href="javascript:;" class="jp-volume-max" tabindex="1" title="max volume">max volume</a></li>\
					</ul>\
					<div class="jp-progress">\
						<div class="jp-seek-bar">\
							<div class="jp-play-bar"></div>\
\
						</div>\
					</div>\
					<div class="jp-volume-bar">\
						<div class="jp-volume-bar-value"></div>\
					</div>\
					<div class="jp-current-time"></div>\
					<div class="jp-duration"></div>\
					<ul class="jp-toggles">\
						<li><a href="javascript:;" class="jp-shuffle" tabindex="1" title="shuffle">shuffle</a></li>\
						<li><a href="javascript:;" class="jp-shuffle-off" tabindex="1" title="shuffle off">shuffle off</a></li>\
						<li><a href="javascript:;" class="jp-repeat" tabindex="1" title="repeat">repeat</a></li>\
						<li><a href="javascript:;" class="jp-repeat-off" tabindex="1" title="repeat off">repeat off</a></li>\
					</ul>\
				</div>\
				<div class="jp-playlist">\
					<ul>\
						<li></li>\
					</ul>\
				</div>\
				<div class="jp-no-solution">\
					<span>Update Required</span>\
					To play the media you will need to either update your browser to a recent version or update your <a href="http://get.adobe.com/flashplayer/" target="_blank">Flash plugin</a>.\
				</div>\
			</div>\
		</div><div id="jplayer_inspector_1"></div></div>\
        <style type="text/css">\
            div#alp_player {\
            width:100%;\
            -moz-column-count: 3;\
            -moz-column-gap: 20px;\
            -webkit-column-count: 3;\
            -webkit-column-gap: 20px;\
            column-count: 3;\
            column-gap: 0px;\
            }\
            div#alp_player div.jp-audio {\
            width: 90%;\
            padding: 10px;\
            }\
            div#alp_player div.jp-progress {\
            width: 100%;\
            margin-top: 10px;\
            }\
            div#alp_player div.jp-volume-bar {\
            width: 100%;\
            margin-top: 10px;\
            }\
            div#alp_player div.jp-interface {\
            margin-bottom: 10px;\
            }\
        </style>';

function lastWord(o) {
  return (""+o).replace(/[\s-]+$/,'').split(/[\s-]/).pop();
}

var count = 0;
var debug = false;

function get_songs_from_page(strPage, playlist){
	$(strPage).find('table#parent tr.even,table#parent tr.odd').each(function(index){
		var title = $(this).find('td:first-child a').text();
       		if(title.length < 5){
			title = $(this).find('td:nth-child(2) a').text();
	        }
		var artist = $(this).next().find('td:first-child table tbody tr:nth-child(2) td:nth-child(2)').text();
		var link = $(this).find('div#jp_container a').attr('href');
        debug && console.log('found '+title);
        var object = {title: title, artist: artist, mp3: link, free: true};
        playlist.add(object);
        count++;
	});
}

$(function(){
    $('#alp_show_playlist').hide();
        
	var mp3s = new Array();
	var player = '#alp_jplayer_1';
	var player_container = '#alp_container_1';

	// mp3s = get_songs_from_page(mp3s, $('body');

	var pages = lastWord($('table.pageTable td.pageResultTD').text());
	var baseUrl = $('table.pageTable td.pageNumberTD a:first-child').attr('href');
    if(baseUrl==undefined){
        baseUrl = $('table.pageTable td.pageNumberTD a:nth-child(2)').attr('href');
        if(baseUrl)
            baseUrl = baseUrl.replace("\-p=2", "\-p=_X_")
        debug && console.log('url was undefined');
    }else{
        debug && console.log('base url '+baseUrl);
        baseUrl = baseUrl.replace("\-p=1", "\-p=_X_")
    }
    
    var playlist;
    
    if(true){
        $('div#page').prepend(playerHTML);
	    $('head').append('<link href="http://jplayer.org/latest/skin/pink.flag/jplayer.pink.flag.css" rel="stylesheet" type="text/css" />');
	        
		playlist = new jPlayerPlaylist(
		    {
		        jPlayer: player,
		        cssSelectorAncestor: player_container,
		    }, mp3s, {
		        solution: "html",
		        supplied: "mp3",
		        errorAlerts: false,
		        warningAlerts: false,
		        wmode: "window",
		        swfPath: "scripts",
		        volume: 1,
		        preload: "auto",
                playlistOptions: {
                    enableRemoveControls: true
                },
		    }
		);

        if(pages==1){
            get_songs_from_page($('body'), playlist);
            $('#alp_show_playlist').show();
            $('#alp_show_playlist').click(function(){
                $('#alp_player').slideToggle();
            });
        } else {
            var reqcounter = pages;
            for(i=1; i<=pages; i++){
                var url = baseUrl;
                url = url.replace('\-p=_X_', '\-p='+i);
                $.get( url,
                    function (data, status, jqXHR){
                        reqcounter--;
                        debug && console.log(data+' returned '+status);
                        if(status == 'success'){
                            get_songs_from_page($(data), playlist);
                        }
                        if(reqcounter == 0 && count > 0){
                            $('#alp_show_playlist').show();
                            $('#alp_show_playlist').click(function(){
                                $('#alp_player').slideToggle();
                            });
                        }
                    }
                );
            }
        }
        
	}
});