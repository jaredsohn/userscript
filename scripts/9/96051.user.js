// ==UserScript==
// @author          Sebastian Ramirez   
// @name            Grooveshark Remote
// @version         1.0
// @description     Control Grooveshark Remotely
// @namespace       GroovesharkRemote
// @include         http://listen.grooveshark.com/#/*
// @include         http://localhost:8080/*
// ==/UserScript==

var GroovesharkRemote = function(){
	GroovesharkRemote = {};
	var interval = 0;
	var commands = new Object();
	commands.mute = function() { GS.player.setIsMuted(true); };
	commands.unMute = function() { GS.player.setIsMuted(false); };
	commands.nextSong = function() { GS.player.nextSong(); };
	commands.stopSong = function() { GS.player.stopSong(); };
	commands.resumeSong = function() { GS.player.resumeSong(); };
	commands.togglePlayPause = function() { if (GS.player.isPaused)
												GS.player.resumeSong();
											else
												GS.player.pauseSong(); };
	commands.previousSong = function() { GS.player.previousSong(); };	
	commands.getInfo = function() {			
												var currentSong = Grooveshark.getCurrentSongStatus();
												var currentQueue = GS.player.getCurrentQueue();
												var objToSend = new Object();
												objToSend.currentSong = currentSong;
												objToSend.currentQueue = currentQueue;
												request = new XMLHttpRequest();
												request.open("POST","http://localhost:8080/sendInfo",true);
												request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
												request.send(JSON.stringify(objToSend));
										
											};
	commands.toggleCrossfade = function() { 
			crossFade = GS.player.getCrossfadeEnabled();
			GS.player.setCrossfadeEnabled(!crossFade);
	};
	commands.toggleShuffle = function() {	
        	shuffle = GS.player.getShuffle();
            GS.player.setShuffle(!shuffle);
	};
	commands.seekTo = function( t ) {
			var dur = GS.player.getPlaybackStatus().duration;
			t = t / 1E3;
			GS.player.seekTo( t * dur);
	};
	commands.favoriteCurrentSong = function(){
		   Grooveshark.favoriteCurrentSong();
	};
	commands.toggleRepeat = function(){
		repeat = GS.player.getRepeat();
		GS.player.setRepeat( !repeat );
	};
	commands.playSongAt = function( i ){
		GS.player.playSong( i );
	};
	commands.addSongToQueue = function( song, index,playNow){
		GS.player.addSongsToQueueAt( song, index,playNow);
	};
	GroovesharkRemote.init = function(){
			if(document.location.host != "listen.grooveshark.com")
				return;
			setTimeout("GroovesharkRemote.sendRequest()",10000);
	};

	GroovesharkRemote.sendRequest = function(){
		url = "http://localhost:8080/getCommand";
		request = new XMLHttpRequest();
		request.onreadystatechange = function(){
			if(request.readyState==4 && request.status==200){
				commandObject = null;
				if( request.responseText.length != 0 ){
					   commandObject = JSON.parse( request.responseText);
                
				}

				GroovesharkRemote.executeCommand( commandObject );
				
				setTimeout("GroovesharkRemote.sendRequest()",interval);
			}
		};
	
		request.open("GET","http://localhost:8080/getCommand",true);
		request.send();
		
	};
	
	GroovesharkRemote.executeCommand = function(cmd){
	
		var commandToExecute;
		var parameters = "";
		
		if(cmd != null) {
			command = cmd["command"];
			parameters = cmd["parameters"];
			commandToExecute = commands[ command];
		}
		
		if(!commandToExecute){
				interval = 250;
		}
		
		else
			commandToExecute.apply(this,parameters);
			
		commandToExecute = commands["getInfo"];
		commandToExecute();

	};	
	

	
	GroovesharkRemote.init();
};


addFunction = function(func, exec) {
  		var script = document.createElement("script");
  		script.textContent = (exec ? "(" : "") + func.toString() + (exec ? ")();" : "");
  		document.body.appendChild(script);
	}
	
addFunction(GroovesharkRemote,true);