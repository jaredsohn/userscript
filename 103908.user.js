// ==UserScript==
// @name           StackExchange embedded YouTube in 16:9
// @namespace      stackexchange
// @description    Changes YouTube videos embedded in StackExchange pages to use widescreen format.
// @include       http://stackoverflow.com/*
// @include       http://meta.stackoverflow.com/*
// @include       http://superuser.com/*
// @include       http://meta.superuser.com/*
// @include       http://serverfault.com/*
// @include       http://meta.serverfault.com/*
// @include       http://askubuntu.com/*
// @include       http://meta.askubuntu.com/*
// @include       http://answers.onstartups.com/*
// @include       http://meta.answers.onstartups.com/*
// @include       http://nothingtoinstall.com/*
// @include       http://meta.nothingtoinstall.com/*
// @include       http://seasonedadvice.com/*
// @include       http://meta.seasonedadvice.com/*
// @include       http://crossvalidated.com/*
// @include       http://askdifferent.com/*
// @include       http://meta.crossvalidated.com/*
// @include       http://stackapps.com/*
// @include       http://*.stackexchange.com/*
// @exclude       http://chat.stackexchange.com/*
// @exclude       http://api.*.stackexchange.com/*
// @exclude       http://data.stackexchange.com/*
// @exclude       http://area51.stackexchange.com/*
// ==/UserScript==


(function() {
  
  function with_jquery(f) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.textContent = "(" + f.toString() + ")(jQuery)";
    document.body.appendChild(script);
  }; 
  
  with_jquery(function($) {
      var attrs = {width: 640, height: 360};
      if($.browser.webkit)
        attrs.height = 390; //for some reason, embedded YouTube player uses different settings in Chrome
      $('embed[src*="youtube"],embed[src*="youtu.be"]').attr(attrs).parent().css(attrs);
    }
  );
})();