// ==UserScript==
// @name           ScrollCommand
// @namespace      http://d.hatena.ne.jp/Constellation/
// @description    Press j or k key , and scroll (in case that LDRize are not working on its page)
// @include        *
// @exclude        http://www.google.tld/reader/*
// @exclude        https://www.google.tld/reader/*
// @exclude        http://mail.google.tld/*
// @exclude        https://mail.google.tld/*
// @exclude        http://reader.livedoor.com/reader*
// @exclude        http://fastladder.com/reader*
// @author         Constellation
// @version        0.0.5
// ==/UserScript==

function boot(ev){
  //=========[Config]==================

  var SCROLLHEIGHT = 200;
  var TIME = 200;
  var SMOOTH = true;

  //=========[Application]=============

  if(ev) window.removeEventListener('GM_MinibufferLoaded', boot, false);
  if(!window.LDRize) return;
  var commands = [];

  var Class = function(){return function(){this.initialize.apply(this,arguments)}};
  var Scroll = new Class();

  Scroll.prototype = {
    initialize : function(down){
      this.down = down;
      this.height = 0;
      this.active = true;
      this.time = (new Date).getTime();
      this.go();
    }
  }
  if(SMOOTH){
    Scroll.prototype.go =  function(){
      if(!(Scroll.down == this.down)) return this.cancel();
      var self = this;
      var rate = ((new Date).getTime() - this.time) / TIME;
      if(rate >= 1){
        rate = 1;
        this.active = false;
      } else {
        var f = function(){self.go.call(self)};
        this.scl = setTimeout(f, 10);
      }
      var height = Math.round(SCROLLHEIGHT * (Math.sin((Math.PI * rate) / 2)));
      var value = height - this.height;
      this.height = height;
      if(!this.down) value = -(value);
      window.scrollBy(0, value);
    }
    Scroll.prototype.cancel = function(){
      clearTimeout(this.scl);
      this.active = false;
    }
  } else {
    Scroll.prototype.go = function(){
      if(this.down)
        window.scrollBy(0, SCROLLHEIGHT);
      else
        window.scrollBy(0, -SCROLLHEIGHT);
    }
    Scroll.prototype.cancel = function(){
    }
  }

  Scroll.next = function(){
    Scroll.down = true;
    var scroll = new Scroll(true);
  }
  Scroll.prev = function(){
    Scroll.down = false;
    var scroll = new Scroll(false);
  }

  if(window.LDRize.getSiteinfo() == undefined){
    commands.push({
      key:'j',
      description: 'scrollcommand::next',
      command: Scroll.next
    },
    {
      key:'k',
      description: 'scrollcommand::prev',
      command: Scroll.prev
    });
  }
  commands.push({
  key:'SPC',
  description: 'scrollcommand::next',
  command: Scroll.next
  },
  {
  key: "S-SPC",
  description: 'scrollcommand::prev',
  command: Scroll.prev
  });
  commands.forEach(window.Minibuffer.addShortcutkey);
}

if(window.Minibuffer){
  boot();
} else {
  window.addEventListener('GM_MinibufferLoaded', boot, false);
}
