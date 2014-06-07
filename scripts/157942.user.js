// ==UserScript==
// @name           Amir's 8Track Downloader
// @namespace      Overload119
// @include        http://*8tracks.com/*/*
// @version        0.9
// ==/UserScript==

var stylesheetText = ['.player_progress_bar_meter { height: 24px; color: #fff; text-shadow: 0 0 4px #fff; text-align: center; line-height: 24px; overflow: hidden; user-select: none; }',
  '.player_progress_bar { margin-bottom: 8px; height: 24px; }',
  '.player_progress_indicator { width: 40px; height: 24px; display: block; left: 0; bottom: 66px; position: absolute; z-index: 10; text-align: center; color: #fff; background-color: rgba(34,34,34,0.7)} ',
  '.player_progress_indicator::before { content: ""; position: absolute; width:0px; height:0px; display:block; border-left: 2px solid transparent; border-right: 2px solid transparent; border-top: 27px solid rgba(34,34,34,0.7); top: 24px; left: 19px;}',
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


  var plusDownload = function() {
    var createDownload = function(track_attributes) {
      if(track_attributes.name == undefined) { 
        return;
      }

      var $download = $('<div class="download"></div>');
      $download.append('<input type="hidden" value="' + track_attributes.id + '"/>');
      var $text = $('<textarea></textarea>');
      $text.val(track_attributes.performer + ' - ' + track_attributes.name);
      $text.focus(function() {
          var $this = $(this);
          $this.select();
          $this.mouseup(function() {
              $this.unbind("mouseup");
              return false;
          });
      });

      $download.append($text);

      var link_download = $('<a style="float:left">Download</a>');
      link_download.attr('href', track_attributes.track_file_stream_url);
      var link_play = $('<a href="javascript:void(0)" style="float:right">Play</a>');
      link_play.click(function() {
        var trackId = 't' + $(this).closest('.download').find('input[type="hidden"]').val(); 
        var streamUrl = $(this).siblings('a:first').attr('href');
        if( $(this).text() === 'Stop Playing' ) {
          soundManager.stop('custom_sound');
          soundManager.unload('custom_sound');  
          $('.download').find('a:last').text('Play');                 
        } else {          
          soundManager.stop('custom_sound');
          soundManager.unload('custom_sound');
          soundManager.play('custom_sound', {url: streamUrl});
          TRAX.mixPlayer.pause();
          $('.download').find('a:last').text('Play');
          $(this).text('Stop Playing');
        }       
      });

      $download.append(link_download);
      $download.append(link_play);

      $('#downloadbox').prepend($download);
    };

    TRAX.tracks.bind('add', function() { 
      var lastTrackIndex = TRAX.tracks.models.length-1;
      var lastAddedTrack = TRAX.tracks.models[lastTrackIndex];
      createDownload(lastAddedTrack.attributes);
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
  var $container = $('<div id="amirs8trackdownloader"><h4>Amir\'s 8Track Downloader</h1></div>');
  $container.append('<p>Version 0.9 <a href="http://userscripts.org/scripts/show/125828" target="_blank" style="float:right;">Check for Update</a></p>');
  $container.append('<p>Each time you hear a track, a download link for that track will appear below. <span style="font-weight:bold">Right-click</span> the <span style="font-weight:Bold">DOWNLOAD</span> button and click <span style="font-weight:bold">Save Link As</span> (in some browsers you can just click the download link and it will start). You can click the song name and hit <span style="font-weight:bold">Crt-C</span> to copy, then name the file accordingly.</p>');

  $songRepeatBtn = $('<a id="song_repeat" class="white_button">Turn on Repeat</a>').click(ToggleRepeat).appendTo($container);
  $songRepeatBtn = $('<a id="song_repeat" class="white_button">Skip to End of Mix</a>').click(SkipToEnd).appendTo($container);
  
  $container.append('<div id="downloadbox"></div>');  
  $container.append('<footer><a href="mailto:budgeneration@gmail.com">Contact Me</a></footer>');
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