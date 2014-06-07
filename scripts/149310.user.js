// ==UserScript==
// @name       Jing.fm scrobbler
// @namespace  http://blog.haohaolee.com/
// @version    0.0.1
// @description  scrobble songs from jing.fm to last.fm
// @match      http://jing.fm/*
// @require    https://raw.github.com/haohaolee/gmscrobber/master/simple_scrobbler_user.js
// @license    FreeBSD License. Portions dual-licensed under the MIT (Expat) License and GPLv2.
// ==/UserScript==

//log = GM_log;

var init = function(){
  log('Start jing.fm scrobbling');
  var current_song;
  var mscInfo = unsafeWindow.Gns.mscInfo; // hook mscInfo which is called when fetching songs' information
  var player = unsafeWindow.Player;
  unsafeWindow.Gns.mscInfo = function(e){
      log("enter song information fetching...");
      var artist = e.result && e.result.cmps_info && e.result.cmps_info.singer;
      var title = player.music[player.pos].name;
      var duration = player.music[player.pos].duration;
      log(artist + "-" + title + " is recorded with " + duration + 's');
      if(artist && title && duration)
      {
          current_song = {'artist':artist, 'title': title, 'duration': duration};
      }
      mscInfo.call(this, e);
  };
  
  var next = player.next; //hook next() called at the end of a song
  player.next = function(e){
      log("switch to next song...");
      current_song = null;
      next.call(this, e);
  };
  
  scrobber.setSongInfoFN(function(){

      if(current_song != null) {

         var playtime = player.actualCurrentTime;

         log(current_song.artist + "-" + current_song.title + " is playing at " + playtime + 's');
         return {'artist': current_song.artist,
                 'title': current_song.title,
                 'duration': current_song.duration,
                 'playTime': playtime};
       }
      log("no song currently...");
      return {};

  }, {checktime: 3000});
  

};

var scrobber = new Scrobbler({
  name: 'Jing.fm Scrobbler',
  ready: init
});

