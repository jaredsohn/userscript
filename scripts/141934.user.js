// ==UserScript==
// @name           RepeatFM
// @namespace      org.kejun
// @description    FM单曲循环(纯属个人瞎玩, 要求Firefox4+)
// @include        http://douban.fm,http://douban.fm/*
// ==/UserScript==

var isRepeat = localStorage.getItem('is_repeat_fm')|0;

function importCSS(str) {
   var css = document.createElement('style');
   css.type = 'text/css';
   document.getElementsByTagName('head')[0].appendChild(css);

  if (css.styleSheet) {
      css.styleSheet.cssText = str;
  } else {
      css.appendChild(document.createTextNode(str));
  }
 
}

function init() {

  importCSS([
   '.repeat-favsong-button { position:absolute;right:40px;bottom:100px;width:100px;height:100px;opacity:0.2;border-radius:20px;cursor:pointer;background:url(data:image/png;base64,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) no-repeat center center; }',
   '.repeat-favsong-button:hover,',
   '.repeat-favsong-button.active { opacity:.6;background-color:#ddd; }'
  ].join(''));


  var button = document.createElement('div');
  button.className  = isRepeat? 'repeat-favsong-button active' : 'repeat-favsong-button';

  button.addEventListener('click', function(){
    if (this.className.indexOf('active') > 0) {
       this.title = '单曲循环关闭';
       isRepeat = 0;
    } else {
       this.title = '单曲循环开启';
       isRepeat = 1;
    }
    this.classList.toggle('active');
    localStorage.setItem('is_repeat_fm', isRepeat);
  } , false);

  document.body.appendChild(button);

  var oldHandler;
  var wait = setTimeout(function(){
    if (typeof unsafeWindow.extStatusHandler === 'undefined') {
      wait = setTimeout(arguments.callee, 100);
      return;
    }
    clearTimeout(wait);
    unsafeWindow.old_extStatusHandler = unsafeWindow.extStatusHandler;
    unsafeWindow.extStatusHandler = function(o) {
       var song = eval('(' + o + ')'),
           actions = {
             'e': function() {
               if (isRepeat) {
                  self.location.href = unsafeWindow.FM.getCurrentSongInfo().url;
               }
             }
           };
       actions[song.type] && actions[song.type]();
       unsafeWindow.old_extStatusHandler(o);
    };
  }, 100);
}

init();
