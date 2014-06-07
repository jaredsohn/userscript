// ==UserScript==
// @name           AllYourTube
// @namespace      http://userscripts.org/users/313966
// @description    are belong to us! ~ Prevents YouTube Videos from autoloading/-playing and fits them to a wider layout
// @include        http://*.youtube.com/watch?*
// @include        https://*.youtube.com/watch?*
// @match          http://*.youtube.com/watch?*
// @match          https://*.youtube.com/watch?*
// @version        0.2.5
// @license        GPL
// ==/UserScript==

(function(){
		document.getElementById("watch-sidebar").style.marginTop = "5px";
		
		var search = window.location.search;
		if (!search.match(/(&list=|&feature=plpp_)/)) {
		
			var playerDiv = document.getElementById("watch-player");
			var placeholder = document.createElement("div");
			placeholder.style.backgroundColor = "black";
			placeholder.style.textAlign = "center";
			placeholder.style.width = playerDiv.style.width = "970px"; //"854px";
			placeholder.style.height = playerDiv.style.height = "580px"; //"510px";
			placeholder.id = "watch-player-placeholder";
			
			
			playerDiv.parentNode.insertBefore(placeholder, playerDiv);
			playerDiv.style.display = "none";
			
			placeholder.loadfunc = function(){
				var placeholder = document.getElementById("watch-player-placeholder");
				placeholder.style.display = "none";
				document.getElementById("watch-player").style.display = "";
				document.body.removeEventListener("mousemove", placeholder.loadfunc, false);
			};
			
			document.body.addEventListener("mousemove", placeholder.loadfunc, false);
			
			// preview image instead of black box - uncomment to return to the awesome black rectangle
			var m = search.match(/\?v=(.{11})/);
			if (m && m[1])
				placeholder.innerHTML = '<img style="height:580px; margin-left:auto; margin-right:auto;" src="http://img.youtube.com/vi/'+m[1]+'/0.jpg">';
		}
		
		// insert new CSS to hide ads & stuff
		var newcss = document.createElement('style');
		newcss.type = "text/css";
		newcss.innerHTML = '\
		#__ffYoutube4, #watch-channel-brand-div { \
			display: none !important; \
		} \
		#shared-addto-menu { \
			height: 300px; \
		} \
		#addto-list-panel > .yt-uix-button-menu-item:first-child { \
			display: none; \
		} \
		#shared-addto-menu .playlists { \
			margin-top: 0; \
			border-top: 0; \
		} \
		#shared-addto-menu .playlists ul { \
			height: 228px; \
		} \
		';
		
		var head = document.getElementsByTagName('head')[0];
		head.appendChild(newcss);

})();