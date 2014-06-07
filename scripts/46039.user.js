// ==UserScript==
// @name		Pandora.fm
// @description		Publish Pandora songs on Last.fm
// @author		Matthew Bauer
// @namespace		http://pandorafm.real-ity.com/
// @include		http://pandora.com/
// @include		http://www.pandora.com/
// ==/UserScript==

SongWasPaused = false;

SubmitSong = function(song){
	GM_log("http://pandorafm.real-ity.com/submit.php?song=" + encodeURIComponent(song.songName) + "artist="+encodeURIComponent(song.artistName));
	GM_xmlhttpRequest({
		method: 'GET',
		asynchronous: true,
		url: "http://pandorafm.real-ity.com/submit.php?song=" + encodeURIComponent(song.songName) + "artist="+encodeURIComponent(song.artistName),
		onload: function(responseDetails) {
			GM_log("Last.fm load");
			if (responseDetails.responseText == " \nThis song has been submitted to your Last.FM profile."){
				GM_log("Submitted");
			} else {
				GM_log(responseDetails.responseText);
			}
		},
                onerror: function(responseDetails) {
                        GM_log("Last.fm error");
                },
                onreadystatechange: function(responseDetails){
                        GM_log("Last.fm readystatechanged");
                }
	});
}

SongPlayed = function(song){
	GM_log("SongPlayed");
        if (!SongWasPaused) {
		SubmitSong(song);
		SongWasPaused = false;
	}
}

SongPaused = function(song){
	GM_log("SongPaused");
	SongWasPaused = true;
}

SongEnded = function(song){
	SongWasPaused = false;
	GM_log("SongEnded");
}

EventsError = function(error){
	GM_log("Error " + error.status + " " + error.value);
}

Pandora.setEventHandler("SongPlayed", SongPlayed);
Pandora.setEventHandler("SongPaused", SongPaused);
Pandora.setEventHandler("SongEnded", SongEnded);
Pandora.setEventHandler("EventsError", EventsError);
//Pandora.setEventHandler("StationPlayed", StationPlayed);
//Pandora.setEventHandler("StationEnded", StationPlayed);
//Pandora.setEventHandler("PandoraStarted", PandoraStarted);
//Pandora.setEventHandler("PandoraEnded", PandoraStarted);