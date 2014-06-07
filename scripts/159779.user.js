// ==UserScript==
// @name           Youtube PlayAfter
// @namespace      YOUTUBEPLAYAFTER
// @description    Ajout d'un bouton "Lire à la suite" pour la gestion d'une playlist instantnée
// @author		   Raphael Perraudeau
// @include        http://www.youtube.com/*
// @include        https://www.youtube.com/*
// @require		   //ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// @version        0.13a
//  
// TODO:
//
//  * Amélioration de la fenetre de configuration
//  * Déplacer le lien de configuration du plugin en dehors du menu utilisateur pour le rentre accessible aux personnes non enregistrée sur youtube
//
// ==/UserScript==


var playlist;
var debug = true;

// uniquement sur la page principale (pas les iframes)
if (window.top == window.self){
	if(debug){console.log("Start");}
	
	// Fonction d'injection du javascript dans le body, avec un jQuery "no-conflict"
	function addJQuery(callback) {
		var script = document.createElement("script");
		script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js");
		script.addEventListener('load', function() {
			var script = document.createElement("script");
			script.textContent = "window.jQ=jQuery.noConflict(true);window.debug="+debug+";(" + callback.toString() + ")();";
			document.body.appendChild(script);
		}, false);
		document.body.appendChild(script);
	}
	
	if(debug){console.log("Main");}
	
	// Fonction Main: fonction a injecter dans le body
	function main() {
		//Ajout CSS
		jQ("head").append("\
			<style>\
				#body-container {position:relative;}\
				#popup { position:absolute; top:0px; left:0px; bottom:0px; width:100%;}\
				#popup div.background { position: absolute; z-index:101; top: 0px; left: 0px; right: 0px; bottom: 0px; width:100%; background:rgba(0,0,0,0.5)} \
				#popup div.inner{\
					overflow-y:auto; position: absolute; background: #ffffff; z-index: 102; color:#000000;\
					top:50px; left:20%; width: 60%; border:2px solid #333333; border-radius:20px; padding:15px;\
				}\
				#popup li {\
					border:1px solid #ccc;\
					padding: 2px;\
				}\
				#popup li img.remove:hover {\
					cursor: pointer;\
				}\
				#popup span.thumb {\
					display:inline-block;\
				}\
				#popup span.link{\
					width:50px; display:inline-block; height:30px;\
				}\
				#sidebar-expanded {\
					\
				}\
			</style>\
		");
		
		// Function performing page replacement when the video is finished
		playAfter = function(newState){
			var videoList;
			if(newState==0){
				videoList = JSON.parse(localStorage.playList);
				if(videoList!=null && videoList.length>0){
				
					var readingVideoId 	= jQ("#watch7-playlist-bar-next-button").data("thisvid");
					var nextVideoId		= jQ("#watch7-playlist-bar-next-button").data("vidindex");
					var nextUrl 		= videoList[nextVideoId][0];
					
					var t=setTimeout(function(){
						if(readingVideoId>=0){
							videoList.splice(readingVideoId ,1);
						}
						localStorage.playList = JSON.stringify(videoList);
						window.location.href = "//youtube.com/watch?v="+nextUrl;
					},2000);
				}
			}
		}
		
		// Fonction de verification de l'existance d'une video dans la playlist grâce à l'id de la vidéo
		inPlaylist = function(vidId)
		{
			var result = false;
			for(countVid in playlist)
			{
				if(playlist[countVid][0]==vidId){
					result = true;
				}
			}
			return result;
		}
		
		// Si la fonction de Storage existe, selon W3Schools:
		// "Web storage is supported in Internet Explorer 8+, Firefox, Opera, Chrome, and Safari."
		if(document.body && typeof(Storage)!=="undefined")
		{
			/********************************/
			/*      Get or Init Storage     */
			/********************************/
			if(!localStorage || !("init" in localStorage) || localStorage.init!=1){
				localStorage.init = 1;
				playlist = new Array();
				localStorage.playList = "";
			} else {
				if(localStorage.playList.length > 0){
					playlist = JSON.parse(localStorage.playList);
				}
				else {
					playlist = new Array();
				}
			}
			
			
			/************************/
			/*      Add Buttons     */
			/************************/
			//append playAfter button on action bar
			
			var img;
			if(playlist.indexOf(document.location.href)!==-1){
				img = "http://cdn1.iconfinder.com/data/icons/freeapplication/png/24x24/OK.png";
			} else {
				img = "http://hacker-law.net/multimedia/images/general/youtube-add.png";
			}
			jQ("#watch7-secondary-actions").append('<span><button class="yt-uix-button yt-uix-tooltip read-after this-url" role="button" title="Play after"><span class="yt-uix-button-content"><img src="'+img+'" /></span></button></span>');
			
			//append playAfter button on related videos
			jQ("#watch7-sidebar .contains-addto, #feed div.feed-item-thumb a, #search-results div.yt-lockup2-thumbnail a, #search-results div.yt-lockup-thumbnail a").each(function(){	
				var url, img;
				if(this.nodeName=="A"){
					url = jQ(this).attr("href");
				} else {
					url = jQ(this).parents("a").first().attr("href");
				}
				
				if(url.indexOf("v=")!==-1){
					url = url.split("v=")[1].split("&")[0];
					if(inPlaylist(url)){
						img = "http://cdn1.iconfinder.com/data/icons/freeapplication/png/24x24/OK.png";
					} else {
						img = "http://hacker-law.net/multimedia/images/general/youtube-add.png";
					}
					jQ(this).append('<button style="right:22px; bottom:-4px;" class="video-actions spf-nolink yt-uix-tooltip read-after" role="button" title="Play after"><span class="yt-uix-button-content"><img data-video-id="'+url+'" src="'+img+'" /></span></button>');
				}
			});
			
			//append an Option-popup-link in parameters
			jQ("ul#masthead-expanded-menu-list").append('<li class="masthead-expanded-menu-item readafter-option"><a href=""> Options ReadAfter </a></li>');

			
			/*****************/
			/*      HTML     */
			/*****************/
			
			//Add Playlist HTML
			function addPlaylistHTML()
			{
				var nbVideos = playlist.length;
				var playlistTray = '\
				<div id="watch7-playlist-tray-container" class="watch-sidebar yt-scrollbar yt-scrollbar-wide yt-scrollbar-dark player-height ">\
					<iframe id="watch7-playlist-tray-mask" src="" frameborder="0"></iframe>\
					<ol data-scroller-scroll-listener="" data-scroller-mousewheel-listener="" id="watch7-playlist-tray" class="yt-uix-scroller" data-scroll-action="yt.www.watch.lists.loadThumbnails">\
				';
				
				var readingVideoIndex = -1;
				for(var i = 0; i < playlist.length; i++) {
					if(playlist[i][0] === document.location.href.split("v=")[1].split("&")[0]) {
						var readingVideoIndex = i;
					}
				}
				//si la vidéo en cours ne fait pas partie de la playlist: on l'affiche en premier
				if(readingVideoIndex==-1){
					nbVideos+=1;
					videoId = document.location.href.split("v=")[1].split("&")[0];
					videoTitle = jQ('title').html().replace(" - Youtube", "");
					
					playlistTray += '\
						<li class="video-list-item yt-uix-scroller-scroll-unit " dta-video-clip-start="None" data-video-username="ggonza43" data-index="1" data-video-id="ZK2KhDBereo" data-video-title="Stratovarius - Move The Mountain" data-video-clip-end="None">\
							<a class="yt-uix-contextlink spf-link" href="/watch?v='+videoId+'" title="'+videoTitle+'" role="button">\
							<span class="stat count">&#9654;</span>\
							<span class="ux-thumb-wrap">\
								<span class="video-thumb  yt-thumb yt-thumb-64">\
									<span class="yt-thumb-default">\
										<span class="yt-thumb-clip">\
											<span class="yt-thumb-clip-inner">\
												<img data-thumb-manual="1" alt="" src="//i1.ytimg.com/vi/'+videoId+'/default.jpg" data-thumb="//i1.ytimg.com/vi/'+videoId+'/default.jpg" width="64">\
												<span class="vertical-align"></span>\
											</span>\
										</span>\
									</span>\
								</span>\
							</span>\
							<span dir="ltr" class="title">'+videoTitle+'</span>\
							<span class="stat attribution"></span></a>\
						</li>\
					';
				}
				
				previousVidIndex = (readingVideoIndex == 0 || readingVideoIndex == -1) ? parseFloat(playlist.length)-1 : readingVideoIndex-1;
				nextVidIndex = (readingVideoIndex == parseFloat(playlist.length)-1) ? 0 : readingVideoIndex+1;
				
				// ajout HTML des videos dans la playlist
				for(video in playlist){
					videoId = playlist[video][0];
					videoTitle = playlist[video][1];
					playing = (video==readingVideoIndex) ? " playlist-bar-item-playing" : "";
					
					playlistTray += addVideoToPlaylistHTML(videoId, videoTitle, playing)
				}
				
				playlistTray += '\
					</ol>\
					<div id="watch7-playlist-tray-trim">&nbsp;</div>\
				</div>\
				';
				jQ("#playlist-tray").html(playlistTray);
				
				// Ajout de la barre d'action (navigation)
				playlistBar = '\
				<div id="watch7-playlist-scrollfloater" class="watch7-playlist">\
					<div class="watch7-playlist-bar">\
						<div class="watch7-playlist-bar-left watch-content">\
							<div class="watch7-playlist-bar-notifications hid">        \
								<span class="autoplay-notification-1">Vidéo suivante dans 1</span>\
								<span class="autoplay-notification-2">Vidéo suivante dans 2</span>\
								<span class="autoplay-notification-3">Vidéo suivante dans 3</span>\
								<span class="autoplay-notification-4">Vidéo suivante dans 4</span>\
								<span class="autoplay-notification-5">Vidéo suivante dans 5</span>\
							</div>\
							<a class="title " href="">PlayAfter Temporary Playlist</a>\
						</div>\
						<div class="watch7-playlist-bar-right watch-sidebar watch7-playlist-bar-secondary-controls">\
							<span id="watch7-playlist-scrollfloater-autoplay-toggle" class="watch-sidebar">\
								<span id="scrollfloater-pause-text">Pause</span>\
								<span id="scrollfloater-resume-text">Reprendre</span>\
							</span>\
						</div>\
					</div>\
				</div>\
				<div id="watch7-playlist-data" class="watch7-playlist" data-list-title="PlayAfter Temporary Playlist" data-shareable="True" data-full-list-id="">\
					<div class="watch7-playlist-bar">\
					<div class="watch7-playlist-bar-left watch-content">\
						<div class="watch7-playlist-bar-notifications hid">\
							<span class="autoplay-notification-1">Vidéo suivante dans 1</span>\
							<span class="autoplay-notification-2">Vidéo suivante dans 2</span>\
							<span class="autoplay-notification-3">Vidéo suivante dans 3</span>\
							<span class="autoplay-notification-4">Vidéo suivante dans 4</span>\
							<span class="autoplay-notification-5">Vidéo suivante dans 5</span>\
						</div>\
						<a class="title " href="">PlayAfter Temporary Playlist</a>\
					</div>\
						<div class="watch7-playlist-bar-right yt-uix-button-panel watch-sidebar">\
							<div class="watch7-playlist-bar-secondary-controls">\
								<button style="display:none;" aria-label="Lecture automatique" role="button" data-button-toggle="true" onclick=";return false;" id="watch7-playlist-bar-autoplay-button" type="button" class="yt-uix-tooltip yt-uix-button yt-uix-button-size-default yt-uix-tooltip yt-uix-button-empty" title="Lecture automatique" data-tooltip-text="Lecture automatique">\
									<span class="yt-uix-button-icon-wrapper">\
										<img title="" alt="Lecture automatique" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" class="yt-uix-button-icon yt-uix-button-icon-playlist-bar-autoplay">\
										<span class="yt-uix-button-valign"></span>\
									</span>\
								</button>\
								<button type="button" onclick=";return false;" id="watch7-playlist-bar-toggle-button" class="yt-uix-tooltip yt-uix-button yt-uix-button-size-default yt-uix-button-empty" role="button">\
									<span class="yt-uix-button-icon-wrapper">\
										<img class="yt-uix-button-icon yt-uix-button-icon-playlist-bar-toggle" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="" title="">\
										<span class="yt-uix-button-valign"></span>\
									</span>\
								</button>\
							</div>\
							<div id="watch7-playlist-bar-controls" class="yt-uix-button-panel">\
								<a href="/watch?v='+playlist[previousVidIndex][0]+'" data-vidindex="'+previousVidIndex+'" data-thisvid="'+readingVideoIndex+'" class="yt-uix-button  yt-uix-tooltip spf-link yt-uix-button-size-default yt-uix-button-empty" id="watch7-playlist-bar-prev-button" title="Vidéo précédente"><img class="yt-uix-button-icon yt-uix-button-icon-playlist-bar-prev" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="" title=""></a>\
								<span id="watch7-playlist-index-and-length"><span id="watch7-playlist-current-index">1</span>/<span id="watch7-playlist-length">'+playlist.length+'</span></span>\
								<a href="/watch?v='+playlist[nextVidIndex][0]+'" data-vidindex="'+nextVidIndex+'" data-thisvid="'+readingVideoIndex+'" class="yt-uix-button  yt-uix-tooltip spf-link yt-uix-button-size-default yt-uix-button-empty" id="watch7-playlist-bar-next-button" title="Vidéo suivante"><img class="yt-uix-button-icon yt-uix-button-icon-playlist-bar-next" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="" title=""></a>\
							</div>\
						</div>\
					</div>\
				</div>\
				';
				jQ("#playlist").html(playlistBar);
				jQ("#watch7-sidebar").css("margin-top", "15px");
			}
			
			//Add Playlist HTML
			function addVideoToPlaylistHTML(videoId, videoTitle, playing)
			{
				videoHtml = '\
					<li class="video-list-item yt-uix-scroller-scroll-unit'+playing+'" dta-video-clip-start="None" data-video-username="" data-index="'+(parseFloat(video)+1)+'" data-video-id="'+videoId+'" data-video-title="'+videoTitle+'" data-video-clip-end="None">\
						<a class="yt-uix-contextlink spf-link" href="/watch?v='+videoId+'" title="'+videoTitle+'" role="button">\
						<span class="stat count">'+(parseFloat(video)+1)+'</span>\
						<span class="ux-thumb-wrap">\
							<span class="video-thumb  yt-thumb yt-thumb-64">\
								<span class="yt-thumb-default">\
									<span class="yt-thumb-clip">\
										<span class="yt-thumb-clip-inner">\
											<img data-thumb-manual="1" alt="" src="//i1.ytimg.com/vi/'+videoId+'/default.jpg" data-thumb="//i1.ytimg.com/vi/'+videoId+'/default.jpg" width="64">\
											<span class="vertical-align"></span>\
										</span>\
									</span>\
								</span>\
							</span>\
						</span>\
						<button aria-label="Supprimer de la playlist" role="button" title="Supprimer de la playlist" type="button" class="yt-playafter-remove-item yt-uix-button-playlist-remove-item spf-nolink yt-uix-button yt-uix-button-player-controls yt-uix-button-size-default yt-uix-button-has-icon yt-uix-tooltip yt-uix-button-empty" data-tooltip-text="Supprimer de la playlist"><span class="yt-uix-button-icon-wrapper"><img title="" alt="Supprimer de la playlist" src="https://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" class="yt-uix-button-icon yt-uix-button-icon-playlist-remove-item"></span></button>\
						<span dir="ltr" class="title">'+videoTitle+'</span>\
						<span class="stat attribution"></span></a>\
					</li>\
				';
				return videoHtml;
			}
			
			if(document.location.href.indexOf("v=")>=1 && document.location.href.indexOf("&list=")==-1 && jQ("#watch7-playlist-container").length==0 && playlist!=null && playlist.length>0)
			{
				addPlaylistHTML();
			}
			
			
			//PlayAfter Options-popup HTML:
			//TODO : à supprimer, apparement inutile depuis l'ajout des fonctions directement dans la playlist
			function getVideoList()
			{
				var playlistOptions = '<ul>';				
				for(video in playlist){
				
					videoId = playlist[video][0];
					videoTitle = playlist[video][1];
					playlistOptions+='\
					<li data-nb="'+video+'">\
						<span class="link">\
							<img class="remove" src="http://cdn1.iconfinder.com/data/icons/gnomeicontheme/24x24/actions/edit-delete.png" style="vertical-align:middle" />\
							'+(parseFloat(video)+1)+'\
						</span>\
						<span class="thumb"><img src="//i1.ytimg.com/vi/'+videoId+'/default.jpg"/></span>\
						<span>:\
							'+videoTitle+'\
						</span>\
					</li>';
				}
				playlistOptions += '</ul>';
				return playlistOptions;
			}
			
			/************************/
			/*      Add Events      */
			/************************/
			
			// click on playAfter Button:
			// add link to playlist
			jQ("button.read-after").on("click", function(e)
			{
				e.preventDefault();
				
				var url;
				if(debug){console.log("button read-after click:");}
				
				if(jQ(this).hasClass("this-url")){
					url = document.location.href.split("v=")[1].split("&")[0];
					title = jQ('title').html();
				} else {
					url = jQ(this).parents("a").first().attr("href").split("v=")[1].split("&")[0];
					if(jQ(this).parents("#search-results").length>0){
						title = jQ(this).parents("li").first().find(".yt-lockup-title span").html();
					} else {						
						title = jQ(this).parents("a").first().find("span.title").html();
					}
				}
				if(inPlaylist(url)!=false){
					if(confirm("Cette vidéo est dans votre liste,\n\n la supprimer ?")){
						var videoLi = jQ("li[data-video-id='"+url+"']");
						playlist.splice(videoLi.data('nb') ,1);
						localStorage.playList = JSON.stringify(playlist);
						videoLi.remove();
					}
				} else {
					playlist.push([url, title]);
					jQ("img", this).attr("src", "http://cdn1.iconfinder.com/data/icons/freeapplication/png/24x24/OK.png");
					jQ("img", this).attr("data-video-id", url);
					
					if(document.location.href.indexOf("v=")>=1 && document.location.href.indexOf("&list=")==-1 && jQ("#watch7-playlist-container").length==0 && jQ("#watch7-playlist-data").length==0)
					{
						addPlaylistHTML();
						if(debug){console.log("playlist html added !");}
					}
					else
					{
						$("#watch7-playlist-tray").append(addVideoToPlaylistHTML(url, title, ""));
						if(debug){console.log("video html added !");}
					}
				}
				localStorage.playList = JSON.stringify(playlist);
				this.blur();
				if(debug){console.log("video added !");}
				
				return false;
			});
			
			
			
			// open popup
			//TODO : à supprimer, apparement inutile depuis l'ajout des fonctions directement dans la playlist
			jQ("li.readafter-option a").on("click", function(){
				
				e.preventDefault();
				
				var playlistOptions = getVideoList();
			
				jQ("#body-container").append("\
					<div id='popup'>\
						<div class='background'>\
						</div>\
						<div class='inner'>\
							"+playlistOptions +"\
						</div>\
					</div>\
				");
				
				var nbImg = jQ("#popup span.thumb img").length;
				var countImg = 0;
				jQ("#popup span.thumb img").load(function(){
					countImg+=1;
					if(nbImg>=countImg){
						jQ('#popup').css('height', parseFloat(jQ('#popup div.inner').css('height'))+150+'px');
					}
				});
				return false;
			});
			
			//Click on popup background: close popup
			//TODO : à supprimer, apparement inutile depuis l'ajout des fonctions directement dans la playlist
			jQ("body").on("click", "#popup .background", function(){
				jQ(this).parents('#popup').first().remove();
			});
			
			// Click on a playlist link in popup: remove the link from playlist
			//TODO : à supprimer, apparement inutile depuis l'ajout des fonctions directement dans la playlist
			jQ("body").on("click", "#popup .inner li img.remove", function(){
				playlist.splice(jQ(this).parents("li").data('nb') ,1);
				localStorage.playList = JSON.stringify(playlist);
				
				var playlistOptions = getVideoList();
				
				jQ("body #popup .inner").html(playlistOptions);
			});
			
			// Click on the remove button in the playlist
			jQ("#player").on("click", "button.yt-playafter-remove-item", function(e){
				e.preventDefault();
				
				var videoLi = jQ(this).parents("li");
				playlist.splice(videoLi.data('nb') ,1);
				
				var img = jQ("img[data-video-id='"+videoLi.data('video-id')+"']");
				if(img.length>0){
					img.attr("src", "http://hacker-law.net/multimedia/images/general/youtube-add.png");
				}
				
				localStorage.playList = JSON.stringify(playlist);
				videoLi.remove();
				
				return false;
			});
			
			//Add event listener on vidéo after 5sec, pour être "sûr" que le lecteur est chargé
			//TODO: un peu bancale comme système, mais je n'ai pas trouvé mieux :/
			var t=setTimeout(function(){
				var player = document.getElementById("movie_player");
				if(player){
					player.addEventListener('onStateChange', 'playAfter', false);
				}
			},5000)
		}
	}
	if(debug){console.log("addJQuery");}
	
	// load jQuery and execute the main function
	addJQuery(main);
	
	if(debug){console.log("End !");}
}