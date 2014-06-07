// ==UserScript==
// @name           Lala Growl Notification
// @namespace      http://sites.google.com/site/chethanpandarinath/
// @include        lala.com
// @description    Enables Growl Notifications from the Lala player in Firefox.  Requires Yip: http://abcdefu.wordpress.com/2009/06/09/introducing-yip-an-unified-notification-system-for-the-web/
// @author         Chethan Pandarinath
// ==/UserScript==

function toEmbed() {
  if (Player && !Player.g.__lala_Growl_updatePlaybackNowPlaying) {
    //console.debug("Entering Function")
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
}
var embedded=0;

function embedFunction(s) {
  //console.debug("Embedding Function");
  document.body.appendChild(document.createElement('script')).innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
embedded=1;
}

function embedString(s) {
  //console.debug("Embedding String");
  document.body.appendChild(document.createElement('script')).innerHTML=s;
  embedded=1;
}

if (!embedded) {
  embedFunction(toEmbed);
  embedString("toEmbed();");
 }

