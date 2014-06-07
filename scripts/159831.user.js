// ==UserScript==
// @name           Amir's 8Track Downloader
// @namespace      Overload119
// @include        http://*8tracks.com/*/*
// @version        0.9
// ==/UserScript==

var stylesheetText = ['.player_progress_bar_meter { height: 24px; color: #fff; text-shadow: 0 0 4px #fff; text-align: center; line-height: 24px; overflow: hidden; user-select: none; }',
  '.player_progress_bar { margin-bottom: 8px; height: 24px; }',
  '.player_progress_indicator { width: 40px; height: 24px; display: block; left: 0; bottom: 77px; position: absolute; z-index: 10; text-align: center; color: #fff; background-color: rgba(34,34,34,0.0)} ',
  '.player_progress_indicator::before { content: ""; position: absolute; width:0px; height:0px; display:block; border-left: 2px solid transparent; border-right: 2px solid transparent; border-top: 27px solid rgba(34,34,34,0.8); top: 14px; left: 19px;}',
  '#amirs8trackdownloader { background-color:#FFFFFF;padding:8px;border-radius:4px;margin-bottom:11px;border:1px solid #DDD; }',
  '.download textarea { background-color: transparent; overflow: hidden; font-family: Arial; height: 16px; resize: none; text-align: center; width: 99%; border: 0; border-bottom: 1px dashed #E7E7E7; margin: 0; padding:4px 0;}',
  '.download { padding: 0px 0px 24px 0px; border-bottom: 1px solid #999; box-shadow: inset 0px 3px 7px #B9B9B9; margin-top:10px; border-radius:7px; }',
  '.download a { margin-top: 0px; font-weight: bold; color: #00045F; margin-left: 6px; margin-right: 6px; }',
  '#amirs8trackdownloader footer { margin: 0; text-align: center; font-size: 11px; }',
  '#player_volume_indicator { float: right; margin-top: 7px; width: 40px; text-align: center; }'
].join('');


var Amirs8TracksDownloader = function() {

  var at8d_songPosition = 0;
  var at8d_songDuration = 0;


  function GetTimestamp(seconds) {
    var m = parseInt(seconds/60) % 60;
    var s = seconds % 60;
    return m + ":" + (s  < 10 ? "0" + s : s);
  }

  var plusScrubberBar = function() {
    TRAX.mixPlayer.bind('whilePlaying', function(positionInSec, durationInSec) { 
      at8d_songPosition = positionInSec;
      at8d_songDuration = durationInSec;
    });

    $('#player_progress_bar').prepend('<div class="player_progress_indicator"></div>');
    $('#player_progress_bar').hover(function() {
      if(at8d_songDuration !== 0) {
        $('.player_progress_indicator').fadeIn(150);
      }
    }, function() {
      $('.player_progress_indicator').fadeOut(150);
    });
    $('#player_progress_bar').mousemove(function(event) {
      var x = event.pageX - $('#player_progress_bar').offset().left - 19;
      var max = $('#player_progress_bar').width();
      var percent = x / max;
      var timePercent = percent+0.045;

      if(timePercent < 0 || timePercent > 1 || at8d_songDuration === 0) {
        return;
      }

      $('.player_progress_indicator').css({ left: (percent*100).toString() + '%' });
      $('.player_progress_indicator').text(GetTimestamp(Math.floor(timePercent*at8d_songDuration)));
    });

    $('#player_progress_bar').click(function(event) {
      var x = event.pageX - $('#player_progress_bar').offset().left - 19;
      var max = $('#player_progress_bar').width();
      var percent = x / max;
      var timePercent = percent+0.045;

      if(soundManager.soundIDs.length > 0) {
        var position = at8d_songDuration*timePercent*1000;
        var soundID = soundManager.soundIDs[soundManager.soundIDs.length-1]
        soundManager.setPosition(soundID, position);
        var t = setTimeout(function() {
          $('#player_progress_bar_meter').width(parseInt(at8d_songPosition / at8d_songDuration * 100, 10) + '%');   
          clearTimeout(t);      
        }, 0);
      }

    });
  }

  var plusSkip = function () {
    $('#player_skip_button').click(function(evt) {
      TRAX.mixPlayer.next();
      evt.preventDefault();
      evt.stopPropagation();
    });
  }

  var plusVolume = function() {
    var indicator = $('<div id="player_volume_indicator">--</div>');
    var max = $('#player_volume_slider').width();

    $('#player_controls_right').append(indicator);

    // Initial value
    var vWidth = $('#player_volume_slider div.ui-slider-range.ui-widget-header.ui-slider-range-min').width();
    $('#player_volume_indicator').text(Math.floor(vWidth/max*100).toString() + '%');


    TRAX.mixPlayerView.$volumeSlider.mousemove(function() {
      var max = $('#player_volume_slider').width();
      var vWidth = $('#player_volume_slider div.ui-slider-range.ui-widget-header.ui-slider-range-min').width();
      $('#player_volume_indicator').text(Math.floor(vWidth/max*100).toString() + '%');

    });
    TRAX.mixPlayerView.$volumeSlider.mouseleave(function() {
      var max = $('#player_volume_slider').width();
      var vWidth = $('#player_volume_slider div.ui-slider-range.ui-widget-header.ui-slider-range-min').width();
      $('#player_volume_indicator').text(Math.floor(vWidth/max*100).toString() + '%');
    });   
  }

  
  var song_repeat = false;
  var song_repeatChecker = null;
  function ToggleRepeat() {
    if(song_repeat) {
      if(song_repeatChecker) {
        clearInterval(song_repeatChecker);
      }

      $('#song_repeat').text('Turn on Repeat');
      song_repeat = false;
    } else {
      song_repeatChecker = setInterval(function() {
        if(at8d_songDuration - at8d_songPosition <= 1) {
          var soundID = soundManager.soundIDs[soundManager.soundIDs.length-1]
          soundManager.setPosition(soundID, 0);
        }
      }, 500);

      $('#song_repeat').text('Turn off Repeat');
      song_repeat = true;
    }
  }

  function SkipToEnd() {
    var skipper = setInterval(function() {
      $('#player_skip_button').click();
      if(TRAX.mixPlayer.set.at_last_track) {
        clearInterval(skipper);
      }
    }, 500);
  }

  // Prepare elements
  var $container = $('<div id="amirs8trackdownloader"></div>');
  $container.append('');

  $songRepeatBtn = $('<a id="song_repeat" class="white_button">Turn on Repeat</a>').click(ToggleRepeat).appendTo($container);
  $songRepeatBtn = $('<a id="song_repeat" class="white_button">Skip to End of Mix</a>').click(SkipToEnd).appendTo($container);
  
  $("#sidebar").prepend($container);      

  plusScrubberBar();
  plusSkip();
  plusDownload();
  plusVolume();

  $('.player_progress_indicator').hide();
  $('#player_progress_bar_meter').text("AMIR'S 8TRACK DOWNLOADER");
};

var stylesheet = document.createElement("style");
stylesheet.textContent = stylesheetText;
document.body.appendChild(stylesheet);

var script = document.createElement("script");
script.setAttribute("type", "text/javascript");
script.textContent = "$(document).ready(function(){ (" + Amirs8TracksDownloader.toString() + ")(); });";
document.body.appendChild(script);



// JavaScript Document// ==UserScript==
// @name           Amir's 8Track Downloader
// @namespace      Overload119
// @include        http://*8tracks.com/*/*
// @version        0.8
// ==/UserScript==

var executeBrowserContext = function(funcOrString) {
    var code = 'javascript:(' + encodeURIComponent(funcOrString.toString()) + ')();';
    location.href = code;
};

executeBrowserContext(function(){	

	var btnSkipCode = function(){
		if( !TRAX.mixPlayer.isPlaying() ) 
			TRAX.mixPlayer.play(); 

		var d = setInterval(function() { 				
			if(TRAX.mixPlayer.set.at_end || TRAX.mixPlayer.set.at_last_track){
				clearInterval(d); 
				return;
			}			
			
			}, 500);
	}	
	

	
	var html_container = "<div id='8trackPlus' style='background-color:#FFFFFF;padding:8px;border-radius:14px;margin-bottom:11px;border:1px solid #DDD;'><h4><a href='http://userscripts.org/scripts/show/125828'>Amir's 8 Track Downloader</a></h4> \
	<p>Version: 0.9 & 0.8 combined <span style='font-size:10px;font-weight:Bold'>Edited by Methral</span></p> \
	<p>When a track starts to play, a download link for that track will appear below. </p> <p>You can click the gray background and hit <span style='font-weight:bold'>Ctrl-C</span> to copy, then name the file accordingly.</p><p><span style='font-weight:Bold'>Right-click</span> the songname one below and click <span style='font-weight:Bold'>Save Link As</span>.</p> \
	<p>With Mozila Firefox and DownThemAll! addon, you can use *flattext*.*ext* renaming mask to download playlist with files named properly.</p> \
	<div id='8tpa' style='position:absolute;background-color:Yellow; display:none; padding: 1px;margin-left:50px;margin-top:0px'>Ctrl-C to copy this filename.</div>\
	<br/><div id='8trackPlus_songList'></div></div>";

	var EightTracks = {
	
		html: html_container,
		init: function(){
			document.body.addEventListener('DOMNodeInserted',this,false);
			document.body.addEventListener('click',this,true);	
			$("#sidebar").prepend(this.html);			
			
			$("#player_progress_bar").css("height", "14px");
			$("#player_progress_bar").css("margin-bottom", "10px");
			$("#player_progress_bar").css("padding", "4px");
			$("#player_progress_bar_meter").css("height", "14px");
			
			$("#player_progress_bar").hover(function(){
					$(this).css("cursor", "pointer");
					
				}, function() {
					$(this).css("cursor", "default");
				}				
			);
			
		},
		handleEvent: function(evt){
			var target = evt.target;
			switch(evt.type){
				case 'DOMNodeInserted':
					if(target.classList && target.classList.contains('track')){
						var url = TRAX.mixPlayer.track.get('track_file_stream_url');
						var songId = TRAX.mixPlayer.track.get('id');
						var songArtist = TRAX.mixPlayer.track.attributes.performer;						
						var songTitle = TRAX.mixPlayer.track.attributes.name;		

						$("#8trackPlus_songList").prepend("<div style='border:none solid #DDD;padding-bottom:20px;'> \
							<textarea style='background-color:#EEE;resize:none;overflow:hidden;width:100%;border:none;font-family:\"Arial\";height:1.2em;font-size:11px;' onclick='$(\"#8tpa\").fadeIn(500, function(){ $(this).fadeOut(1500);});this.focus();this.select();'>"+songArtist+" - "+songTitle+"</textarea></br><a style='float:left;;font-family:\"Arial\";height:1.2em;font-size:11px;' href='"+url+"'>"+songArtist+" - "+songTitle+"</a>\
							</div>"); //Changed this
					}
				return;

			}
		}
	};
	
	EightTracks.init();
});


