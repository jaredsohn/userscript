// ==UserScript==
// @name           UrlistCommand
// @namespace      http://d.hatena.ne.jp/koyachi/
// @description    command for minibuffer posting pinned urls to urlist.
// @include        *
// ==/UserScript==
//
// 2008-06-15 t.koyachi
//

(function(){
if(!window.Minibuffer) return;

function urlist(urls, title) {
  var notes = (title) ? title + "\n" : "";
  var postUrl = ['http://urlist.buffr.org/list/create?url_list=',
                 encodeURIComponent(urls.join("\n")),
                 '&notes=', encodeURIComponent(notes)
                 ].join("");
  window.open(postUrl);
}

window.Minibuffer.addCommand({
  name: 'urlist',
  command: function(stdin) {
    var args = this.args;
    var urls = [];
    if (!stdin.length) {
      // command line is just 'urlist'
      urls = [window.location.href];
      nodes = new Array(1);
    }
    else if(stdin.every(function(a){ return typeof a == 'string'})) {
      // command line is 'location | urlist'
      urls = stdin;
    }
    else if(stdin.every(function(a){return a && a.nodeName == 'A'})) {
      // command line is 'pinned-or-current-link | urlist'
      urls = stdin.map(function(node){return node.href});
    }

    if (args.length = 1) {
      // with title
      urlist(urls, args[0]);
    }
    else if (args.length) {
      console.log('unknown args...');
    }
    else {
      // urls only
      urlist(urls);
    }
  }
});
})();
