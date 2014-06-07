// ==UserScript==
// @name           8tracks best script
// @namespace      Overload119
// @include        http://*8tracks.com/*/*
// @version        0.5
// ==/UserScript==

// Yamamaya did most of the work!

var executeBrowserContext = function(funcOrString) {
    var code = 'javascript:(' + encodeURIComponent(funcOrString.toString()) + ')();';
    location.href = code;
};

//TRAX.mixPlayer.goToPosition incorporate this somehow



executeBrowserContext(function(){	

	var btnSkipCode = function(){
		if( !TRAX.mixPlayer.isPlaying() ) 
			TRAX.mixPlayer.play(); 
			
		// Goto next track - Wait 5 seconds - Repeat

		var d = setInterval(function() { 
			
				
			if(TRAX.mixPlayer.set.at_end || TRAX.mixPlayer.set.at_last_track){
				clearInterval(d); 
				return;
			}
			
			TRAX.mixPlayer.next(); 	
			
			}, 1000);
	}	
	
	var btnRepeat = function() {
		var _state = $("#repeater").val();
		if( _state == "Turn On Repeat" ) {
			$("#repeater").val("Turn Off Repeat");
			var d = setInterval(function() {
				if( $("#repeater").val()  == "Turn On Repeat" ) {
					clearInterval(d);
				}
				var timeMili = TRAX.mixPlayer.lastPositionInSec*1000;
				var songLength = (TRAX.mixPlayer.smSound.duration ? TRAX.mixPlayer.smSound.duration : TRAX.mixPlayer.smSound.durationEstimate);	
				if( timeMili >= songLength-1000 ) {
					TRAX.mixPlayer.goToPosition( 0 );
				}
			}, 700 );
		} else {
			$("#repeater").val("Turn On Repeat");
		}
	}
	
	var html_container = "<div id='8trackPlus' style='background-color:#FFFFFF;padding:8px;border-radius:14px;box-shadow:2px 2px 20px 10px #DBDBD7;'><h3>8tracks Downloader</h3> \
	<p>Each time you hear a track, a download link for that track will appear below. <span style='font-weight:Bold'>Right-click</span> the <span style='font-weight:Bold'>DOWNLOAD</span> button and click <span style='font-weight:Bold'>Save Link As</span>.</p>\
	<input type='button' class='white_button' onclick='javascript:("+btnSkipCode.toString()+")();' value='Skip To End Of Mix'/> \
	<input id='repeater' type='button' class='white_button' onclick='javascript:("+btnRepeat.toString()+")();' value='Turn on Repeat'/> \
	<br/></div>";

	var EightTracks = {
	
		html: html_container,
		init: function(){
			document.body.addEventListener('DOMNodeInserted',this,false);
			document.body.addEventListener('click',this,true);	
			$("#description_html").append(this.html);
			
			
			$("#player_progress_bar").css("height", "14px")
			//$("#player_progress_bar").css("border", "1px solid Black");
			$("#player_progress_bar").css("margin-bottom", "10px");
			$("#player_progress_bar").css("padding", "4px");
			$("#player_progress_bar_meter").css("height", "14px")
			
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

						if( songArtist.length>40 )
							songArtist = songArtist.substring(0, 40)+"...";
						
						if( songTitle.length>40 )
							songTitle = songArtist.substring(0, 40)+"...";
						
						$("#8trackPlus").append("<p><b>"+songTitle+"</b> - "+songArtist+" <a href='javascript:(function(){TRAX.mixPlayer.unloadTrack(); TRAX.mixPlayer.playWithSm("+songId+", \""+url+"\")})();'>(Play)</a> <a href='"+url+"'><span style='float:right'>DOWNLOAD</span></a></p>");
						
					}
				return;
					
				case 'click':					
					
					if( target.id === 'player_progress_bar' || target.id === 'player_progress_bar_meter' ){
					
						var xPos = evt.clientX;
						var xMin = $("#player_progress_bar").offset().left
						var xMax =  xMin + $("#player_progress_bar").width();
						var skipTo = (xPos-xMin)/(xMax-xMin);
						
						var songLength = (TRAX.mixPlayer.smSound.duration ? TRAX.mixPlayer.smSound.duration : TRAX.mixPlayer.smSound.durationEstimate);	
						TRAX.mixPlayer.goToPosition( songLength*skipTo );


					}
					else if(target.id === 'player_skip_button' && !evt.button){
						TRAX.mixPlayer.next();
						evt.preventDefault();
						evt.stopPropagation();
					}
				return;
			}
		}
	};
	
	EightTracks.init();
});

