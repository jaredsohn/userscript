// ==UserScript==
// @name        Growl Notifications
// @namespace   http://fluidapp.com
// @description Now playing Growl notifications for Lala //version 1.2: modified to work with Lala 2009 site redesign.  Also fixed bug that prevented a Growl notification for the first track when play was resumed.
// @include     *
// @author      Adam Nolley/Chethan Pandarinath
// @version     1.2
// ==/UserScript==

if (Player && !Player.g.__lala_Growl_updatePlaybackNowPlaying) {
  //Player.prototype.__lala_Growl_updatePlaybackNowPlaying = Player.g.updateNowPlaying;
  //Player.g.updateNowPlaying = function(event) {
  Player.prototype.__lala_Growl_updatePlaybackNowPlaying = Player.g.onPlayingStatusChange;
  Player.g.onPlayingStatusChange = function(event) {
    Player.g.__lala_Growl_updatePlaybackNowPlaying(event);
    if (Player.g.isPlaying()) {
      var song=Player.g.currentQueueTrack.song;
	
      window.fluid.showGrowlNotification({
	title: song.title, 
	description: song.artist + ((song.discTitle) ? "\n" + song.discTitle : ""),
	sticky: false,
	identifier: "Now Playing",
	icon: "http://album-images.lala.com/servlet/ArtWorkServlet/" + song.discLalaId
	});
    }
  };
 }
