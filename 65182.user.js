// ==UserScript==
// @name        toggleAutoPagerize
// @namespace   http://looxu.blogspot.com
// @description toggle switch AutoPagerize
// @include     http://*
// ==/UserScript==
(function(){
  if(window.AutoPagerize){
    var Toggle = {
      keyHandler : { 'I' : function(){ Toggle.fire(); } },
      specialKey : {},
      init : function(e){
        if( /INPUT|TEXTAREA/.test(e.target.tagName) ) return;
        var kcode = e.which || e.keyCode;
        var pressKey = (Toggle.specialKey[kcode]) ? Toggle.specialKey[kcode] : String.fromCharCode(kcode).toUpperCase();
        if( typeof Toggle.keyHandler[pressKey] == 'function' ){
          e.preventDefault();
          Toggle.keyHandler[pressKey].apply();
        }
      },
      fire : function(){
        if(window.AutoPagerize.AutoPagerObject){
          window.AutoPagerize.AutoPagerObject.stateToggle();
        }else{
          var ev = document.createEvent('Event');
          ev.initEvent('AutoPagerizeToggleRequest',true,false);
          document.dispatchEvent(ev);
        }
      }
    };
    window.addEventListener( (window.opera)?'keypress':'keydown',function(e){ Toggle.init(e); },false);
  }
})();
