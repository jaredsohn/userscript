// ==UserScript==
// @name           LDRize Checker
// @namespace      http://d.hatena.ne.jp/Constellation/
// @include        http://*
// @description    so as to apply Microformats to your blog.
// @author         Constellation
// @version        0.0.1
// ==/UserScript==

var CONSTANT = false;
var SHORTCUTKEY = true;
var hAtom = 'hAtom 0.1';
var xFolk = 'xFolk RC1';
var time = 1000;

if (!window.Minibuffer || !window.LDRize) return;

if (CONSTANT){
  var siteinfo = window.LDRize.getSiteinfo();
  if(siteinfo) window.Minibuffer.status("LDRizeChecker", siteinfo.name);
}

[
  {
    name: 'LDRizeChecker::Show',
    command: function(stdin){
      var siteinfo = window.LDRize.getSiteinfo();
      if(siteinfo) window.Minibuffer.status("LDRizeChecker", siteinfo.name, time);
      return stdin;
    },
  },
  {
    name: 'LDRizeChecker::hAtom',
    command: function(stdin){
      var siteinfo = window.LDRize.getSiteinfoByName(hAtom);
      if(siteinfo){
        window.Minibuffer.status("LDRizeChecker", "set hAtom", time);
        window.LDRize.setSiteinfo(siteinfo);
      }else{
        window.Minibuffer.status("LDRizeChecker", "can't apply hAtom", time);
      }

      return stdin;
    }
  },
  {
    name: 'LDRizeChecker::xFolk',
    command: function(stdin){
      var siteinfo = window.LDRize.getSiteinfoByName(xFolk);
      if(siteinfo){
        window.Minibuffer.status("LDRizeChecker", "set xFolk", time);
        window.LDRize.setSiteinfo(siteinfo);
      }else{
        window.Minibuffer.status("LDRizeChecker", "can't apply xFolk", time);
      }
      return stdin;
    }
  }
]
.forEach(function(obj){
  window.Minibuffer.addCommand(obj);
});

if(SHORTCUTKEY)
[
  {
    key: 'g w',
    description: 'LDRizeChecker::Show',
    command: function(){
      window.Minibuffer.execute('LDRizeChecker::Show');
    }
  },
  {
    key: 'g h',
    description: 'LDRizeChecker::hAtom',
    command: function(){
      window.Minibuffer.execute('LDRizeChecker::hAtom');
    }
  },
  {
    key: 'g x',
    description: 'LDRizeChecker::xFolk',
    command: function(){
      window.Minibuffer.execute('LDRizeChecker::xFolk');
    }
  }
]
.forEach(function(obj){
  window.Minibuffer.addShortcutkey(obj);
});
