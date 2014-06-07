// ==UserScript==
// @name           Bytingshark
// @namespace      Bytingshark
// @description    Add missing file size UI to Grooveshark!
// @include        http://preview.grooveshark.com/*
// @include        http://grooveshark.com/*
// ==/UserScript==

function Bytingshark(){
	if (typeof Grooveshark == "undefined"){

		setTimeout(Bytingshark, 1000);

	}else{

		// Find out app version
		var gs_app = typeof Grooveshark._lastStatus == "undefined" && typeof GS.Services.SWF != "undefined" ? 2 : 1;

		// We only need this CSS for new version of Grooveshark
		// http://stackoverflow.com/questions/524696/how-to-create-a-style-tag-with-javascript
		if (gs_app == 2){
			var css_content = "\
				#bytingshark {\
					display: none\
				}\
				.has-songs #bytingshark {\
					background: #1B1B1B;\
					font-size: 10px;\
					line-height: 10px;\
					color: #FFFFFF;\
					padding: 2px;\
					opacity: 0.7;\
					width: 40px;\
					text-align: center;\
					position: absolute;\
					display: block;\
				}",
				head = document.getElementsByTagName('head')[0],
				style = document.createElement('style');

			style.type = 'text/css';
			if(style.styleSheet){
				style.styleSheet.cssText = css_content;
			}else{
				style.appendChild(document.createTextNode(css_content));
			}

			head.appendChild(style);
		}

		Grooveshark.setSongStatusCallback(function(song){

			// Only update when song started playing
			if (song.status != "playing") return;
			
			if (gs_app == 1){

				// Old way
				var song_size = Grooveshark._lastStatus.bytesTotal;
				var size_element = null;

				if (song_size > 0){

					if ((size_element = document.getElementById("bytingshark")) == null){
						size_element = document.createElement("span");
						size_element.setAttribute("id", "bytingshark");
						size_element.style.marginLeft = "10px";
					}

					size_element.innerHTML = formatBytes(song_size, 2);
					document.getElementById("playerDetails_current_song").appendChild(size_element);

				}

			}else if (gs_app = 2){

				// New way
				var playback_status = GS.Services.SWF.getPlaybackStatus();
				var song_size = playback_status.bytesTotal != null ? playback_status.bytesTotal : null;

				var size_element = null;

				if ((size_element = document.getElementById("bytingshark")) == null && song_size > 0){
					size_element = document.createElement("div");
					size_element.setAttribute("id", "bytingshark");
					document.getElementById("now-playing").appendChild(size_element);
				}

				if (size_element != null){
					size_element.innerHTML = (song_size != null && song_size > 0 ? formatBytes(song_size, 1) : "");
				}

			}

		});

	}
}

// http://stackoverflow.com/questions/4258025/php-format-bytes-translation-to-javascript/4258080#4258080

function formatBytes(bytes, precision) {
	var units = ['b', 'KB', 'MB', 'GB', 'TB'];
	var bytes = Math.max(bytes, 0);
	var pow = Math.floor((bytes ? Math.log(bytes) : 0) / Math.log(1024));
	pow = Math.min(pow, units.length - 1);
	bytes = bytes / Math.pow(1024, pow);
	precision = (typeof(precision) == 'number' ? precision : 0);
	return (Math.round(bytes * Math.pow(10, precision)) / Math.pow(10, precision)) + ' ' + units[pow];
}

var s = document.createElement("script");
s.innerHTML = Bytingshark + formatBytes + " Bytingshark();";
document.body.appendChild(s);