// ==UserScript==
// @name           deviantEXPERIENCE:Partita
// @namespace      http://dancewiththesky.deviantart.com
// @description    A devious party with plenty of fun!
// @include        http://*.deviantart.com*
// ==/UserScript==

(function(){

  const EMOTE_SRCS = [
      "http://e.deviantart.com/emoticons/f/floating.gif",
      "http://e.deviantart.com/emoticons/s/sleep.gif",
      "http://e.deviantart.com/emoticons/p/pacman.gif",
      "http://e.deviantart.com/emoticons/s/sheepish.gif",
      "http://e.deviantart.com/emoticons/c/crazy.gif",
      "http://e.deviantart.com/emoticons/m/mwahaha.gif",
      "http://e.deviantart.com/emoticons/f/faint.gif",
      "http://e.deviantart.com/emoticons/o/ohmygod.gif",
      "http://e.deviantart.com/emoticons/s/smooch.gif",
      "http://e.deviantart.com/emoticons/g/glomp.gif",
      "http://e.deviantart.com/emoticons/t/threaten.gif",
      "http://e.deviantart.com/emoticons/a/abduction.gif",
      "http://e.deviantart.com/emoticons/c/cuddle.gif",
      "http://e.deviantart.com/emoticons/m/meditate.gif",
      "http://e.deviantart.com/emoticons/e/eek.gif",
      "http://e.deviantart.com/emoticons/b/bonk.gif",
      "http://e.deviantart.com/emoticons/b/bored.gif",
  ];

  const ANIMATION_RATE = 50; // standad animation rate in ms
  const ANIMATION_START_COUNT = 5;
  
  // WARNING: Register animation pathes here
  // before implementing them in startAnimation()
  const ANIMATION_PATHES = {
      0: "ZigZag",
      1: "GhostDance",
  };
  const MAX_ANIMATION_PATH_INDEX = 1; // Heck, no hashes in JavaScript ^^;
  
  function rand(min, max){
        var i = Math.floor(Math.random() * max);
        return (i < min)? i + min : i;
  }
  
  function setup(){
    var emotes = [];
  
    // initialize all emotes to absolute 0,0 and zIndex 9999
    for (var i = 0; i < EMOTE_SRCS.length; i++){
      emotes[i] = document.createElement('img');
      emotes[i].src = EMOTE_SRCS[i];
      emotes[i].style.position = "absolute";
      emotes[i].style.left = emotes[0].style.top = "0px";
      emotes[i].style.zIndex = "9999";
    }
    
    for (var x = currentAnimationPathIndex = 0; x < ANIMATION_START_COUNT; x++){ 
      var emote = emotes[x];
      document.getElementsByTagName('body')[0].appendChild(emote);
      
      // and pick a different animation
      // path for it, if available, or reuse
      if (currentAnimationPathIndex > MAX_ANIMATION_PATH_INDEX){
        currentAnimationPathIndex = 0;
      }
      eval("animate_" + ANIMATION_PATHES[currentAnimationPathIndex] + "(emote)");
      currentAnimationPathIndex++;
    }    
  }
  
///// ANIMATION PROCEDURES //////////////////////////////////////////////////////
  
  ///// Zig Zag ////////////////////////
  function animate_ZigZag(emote, state){
    // a workaround for missing default parameters in JavaScript 
    if (state == undefined){
      state = {
        "currentX" : rand(0, document.body.clientWidth - 100),
        "currentY" : rand(0, document.body.clientHeight - 100),
        "reverseX" : false,
        "reverseY" : false, 
      };
    }
  
    if (state["currentX"] == 0){
      state["reverseX"] = false;
    } else if (state["currentX"] == document.body.clientWidth - 100){ 
      state["reverseX"] = true;
    } 
    
    if (state["currentY"] == 0){
      state["reverseY"] = false;
    } else if (state["currentY"] == document.body.clientHeight - 100){ 
      state["reverseY"] = true;
    } 
        
    state["currentX"] = state["reverseX"]? state["currentX"] - 1 : state["currentX"] + 1;
    state["currentY"] = state["reverseY"]? state["currentY"] - 1 : state["currentY"] + 1;
    emote.style.left  = state["currentX"] + "px";
    emote.style.top   = state["currentY"] + "px";
    
    setTimeout(animate_ZigZag , ANIMATION_RATE, emote, state);
  }
  
  ///// Ghost Dance ////////////////
  function animate_GhostDance(emote){
    emote.style.opacity = Math.random();
    emote.style.left = rand(0, document.body.clientWidth - 100) + "px";
    emote.style.top = rand(0, document.body.clientHeight - 100) + "px";
    
    setTimeout(animate_GhostDance , ANIMATION_RATE * 20, emote);
  }
  
  
//////////// INTIALIZE //////////////////////////////////////////////////////////  
  
  setup();
  
})();