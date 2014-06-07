// ==UserScript==
// @name           Fold/Unfold Code Blocks
// @namespace      stackoverflow
// @description    Fold/Unfold Code Blocks
// @include        http://*stackoverflow.com/*
// @include        http://*superuser.com/*
// @include        http://*serverfault.com/*
// @include        http://*.stackexchange.com/*
// @exclude        http://codegolf.stackexchange.com/*
// @exclude        */reputation
// @exclude        */review/*
// @exclude        */suggested-edits/*
// @exclude        */posts/*
// ==/UserScript==

(function(){
  var start=function(){
    $("pre>code").each(function(){
      var self = $(this);
      var codes = self.text();
      codes = codes.replace(/[^!-\/:-?\[-`{-~]/g,'');
      while(/(.+)\1/.test(codes)){
        codes = codes.replace(/(.+)\1/g,'$1');
      }
      codes = codes.substr(0,75);
      if(codes){
        var parent = self.parent();
        codes = codes.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
        var place_holder = $('<pre style="text-align:center;"> ' + codes + ' </pre>');
        place_holder.insertBefore(parent);
        place_holder.click(function(){
          parent.toggle();
          place_holder.hide();
        });
        parent.click(function(){
          place_holder.toggle();
          parent.hide();
        });
        parent.hide();
      }
    });
  };

  if(window.$){
    start();
  }else{
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.textContent = "(" + start + ")();";
    document.body.appendChild(script);
  }
})();
