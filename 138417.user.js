// ==UserScript==
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

						$("#8trackPlus_songList").prepend("<div style='border-top:1px solid #DDD;padding-top:4px;'> \
												<textarea style='background-color:#EEE;resize:none;overflow:hidden;width:100%;border:none;font-family:\"Arial\";height:2.4em' onclick='$(\"#8tpa\").fadeIn(500, function(){ $(this).fadeOut(1500);});this.focus();this.select();'>"+songArtist+" - "+songTitle+"</textarea>\
												<a href='javascript:(function(){TRAX.mixPlayer.unloadTrack(); TRAX.mixPlayer.playWithSm("+songId+", \""+url+"\")})();'>PLAY NOW</a><a style='float:right;' href='"+url+"'>DOWNLOAD</a></div>");
						
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