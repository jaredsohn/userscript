// ==UserScript==
// @match http://*.vk.com/*
// @match http://*.vkontakte.ru/*
// @name vkontakte.keyboard
// @description vk.com keyboard player controls. Shift+→/shift+← to next/prev song, shift+↑,shift+↓ to volume control. shift+↓↓, shift+↑↑ to set volume to min/max
// @author Alexandr Subbotin
// @version 1.1
// ==/UserScript==
(function(window, undefined ) {
  var w;
  if (typeof unsafeWindow != undefined){
    w = unsafeWindow 
  } else {
    w = window;  
  }
  //Main executable function
  var fn = function(){
    document.addEventListener('keydown', function(e){
      var _a = window.audioPlayer;
      var setSuperVol = function(keyCode, val){
        //double up or down key set volume to 0 or 1
        var fn = function(e){if (e.keyCode == keyCode) setVol(val);};
        document.addEventListener('keydown',fn);
        setTimeout(function(){
          document.removeEventListener('keydown',fn);
        },200);
      }
      //set volume of player and move sliders to current volume posiiton;
      var setVol = function(val){_a.player.setVolume(val); var _row = ge('audio'+_a.id); var _gp = ge('gp'); val*=100; if (_row) ge('audio_vol_slider'+_a.id).style.left=val+'%'; if (_gp) ge('gp_vol_slider').style.left=val+'%';};
      if (e.shiftKey && e.keyCode == 39) _a.nextTrack();
      else if (e.shiftKey && e.keyCode == 37) _a.prevTrack();
      else if (e.shiftKey && e.keyCode == 38) {
        setVol(Math.min(_a.player.getVolume()+0.1,1));
        setSuperVol(38,1);
      }
      else if (e.shiftKey && e.keyCode == 40) {
        setVol(Math.max(_a.player.getVolume()-0.1,0));
        setSuperVol(40,0);
      }
    });
  };
  //Create <script> element, because we can't use window.audioPlayer here
  var js=document.createElement('script');
  js.text = '('+fn.toString()+")();"
	document.body.appendChild(js);
})(window);	