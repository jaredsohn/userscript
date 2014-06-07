// ==UserScript==
// @name           Amir's 8Track Downloader -- Revamped
// @namespace      Overload119, Edizzleeee
// @include        http://*8tracks.com/*/*
// @version        0.9 
// Changes: Fixed multiple download link problem
// ==/UserScript==

var executeBrowserContext = function(funcOrString) {
    var code = 'javascript:(' + encodeURIComponent(funcOrString.toString()) + ')();';
    location.href = code;
};

executeBrowserContext(function(){	

	var btnSkipCode = function(){
		if( !player_play_button.isPlaying() ) 
			player_play_button.play(); 

		var d = setInterval(function() { 				
			if(mixPlayer.set.at_end || mixPlayer.set.at_last_track){
				clearInterval(d); 
				return;
			}			
			mixPlayer.next(); 				
			}, 500);
	}	
	
	var btnRepeat = function() {
		var _state = $("#repeater").val();
		if( _state == "Turn On Repeat" ) {
			$("#repeater").val("Turn Off Repeat");
			var d = setInterval(function() {
				if( $("#repeater").val()  == "Turn On Repeat" ) {
					clearInterval(d);
				}
				var timeMili = mixPlayer.lastPositionInSec*1000;
				var songLength = (mixPlayer.smSound.duration ? mixPlayer.smSound.duration : mixPlayer.smSound.durationEstimate);	
				if( timeMili >= songLength-1500 ) {
					mixPlayer.goToPosition();
				}
			}, 500 );
		} else {
			$("#repeater").val("Turn On Repeat");
		}
	}
	
	var html_container = "<div id='8trackPlus' style='background-color:#FFFFFF;padding:8px;border-radius:14px;margin-bottom:11px;border:1px solid #DDD;'><h4><a href='http://userscripts.org/scripts/show/125828'>Amir's 8 Track Downloader</a></h4> \
	<p>Version: 0.8</p> \
	<p>Each time you hear a track, a download link for that track will appear below. <span style='font-weight:Bold'>Right-click</span> the <span style='font-weight:Bold'>DOWNLOAD</span> button and click <span style='font-weight:Bold'>Save Link As</span>. You can click the song name and hit <span style='font-weight:bold'>Crt-C</span> to copy, then name the file accordingly.</p>\
	<input type='button' class='white_button' onclick='javascript:("+btnSkipCode.toString()+")();' value='Skip To End Of Mix'/> \
	<input id='repeater' type='button' class='white_button' onclick='javascript:("+btnRepeat.toString()+")();' value='Turn On Repeat'/> \
	<div id='8tpa' style='background-color:Yellow; display:none; padding: 4px;'>Hit Crt-C to copy this filename.</div>\
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
						var url = mixPlayer.track.get('track_file_stream_url');
						var songId = mixPlayer.track.get('id');
						var songArtist = mixPlayer.track.attributes.performer;						
						var songTitle = mixPlayer.track.attributes.name;		

						$("#8trackPlus_songList").prepend("<div style='border-top:1px solid #DDD;padding-top:4px;'> \
												<textarea style='background-color:#EEE;resize:none;overflow:hidden;width:100%;border:none;font-family:\"Arial\";height:2.4em' onclick='$(\"#8tpa\").fadeIn(500, function(){ $(this).fadeOut(1500);});this.focus();this.select();'>"+songArtist+" - "+songTitle+"</textarea>\
												<a href='javascript:(function(){mixPlayer.unloadTrack(); mixPlayer.playWithSm("+songId+", \""+url+"\")})();'>PLAY NOW</a><a style='float:right;' href='"+url+"'><p>"+songArtist+" - "+songTitle+"</p></a></div>"); //Changed this
						
					}
				return;
					
				case 'click':					
					
					if( target.id === 'player_progress_bar' || target.id === 'player_progress_bar_meter' ){
					
						var xPos = evt.clientX;
						var xMin = $("#player_progress_bar").offset().left
						var xMax =  xMin + $("#player_progress_bar").width();
						var skipTo = (xPos-xMin)/(xMax-xMin);
						
						var songLength = (mixPlayer.smSound.duration ? mixPlayer.smSound.duration : mixPlayer.smSound.durationEstimate);	
						mixPlayer.goToPosition( songLength*skipTo );


					}
					else if(target.id === 'player_skip_button' && !evt.button){
						mixPlayer.next();
						evt.preventDefault();
						evt.stopPropagation();
					}
				return;
			}
		}
	};
	
	EightTracks.init();
});