// ==UserScript==
// @name           hex stack overflow rep
// @namespace      stackoverflow
// @description    Displays user's rep in hexadecimal on stack overflow
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
// @author         Kip Robinson - http://stackoverflow.com/users/18511/kip
// ==/UserScript==

(function() {
   function with_jquery(f) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.textContent = "(" + f.toString() + ")(jQuery)";
    document.body.appendChild(script);
  }; 
  
  with_jquery(function($)
  {
    $('.reputation-score').each(function() {
      var title = $(this).attr('title');
      var text = $(this).text();
      var rep = 1;
      
      if(text.indexOf('k') < 0)
      {
        rep = parseInt(text.replace(/,/g, ''));
      }
      else
      {
        rep = parseInt(title.replace(/\D/g, ''));
        
        //if no rep was in the tooltip, convert the truncated rep to hex
        if(isNaN(rep))
          rep = Math.round(1000 * parseFloat(text.replace(/[k,]/gi, '')));
      }
      
      $(this).text('x' + rep.toString(16).toUpperCase());
      if(rep >= 0x10000)
        $(this).css('font-family', 'Arial Narrow,' + $(this).css('font-family'));
    });
  });
  
})();
