//Derived from hex stack overflow rep by kipthegreat
//http://userscripts.org/scripts/show/68543
//http://stackapps.com/questions/2342/hexadecimal-user-rep

// ==UserScript==
// @name          Octal Reputation for Stack Overflow
// @namespace     stackoverflow
// @description   Displays user reputation in octal on Stack Overflow
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
// @author        ctype.h - http://stackexchange.com/users/935723/ctype-h?tab=accounts
// ==/UserScript==

(function(){
   function with_jquery(f){
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.textContent = "(" + f.toString() + ")(jQuery)";
      document.body.appendChild(script);
   };

   with_jquery(function($){
      $('.reputation-score').each(function(){
         var title = $(this).attr('title');
         var text = $(this).text();
         var rep = 1;

         if(text.indexOf('k') < 0){
            rep = parseInt(text.replace(/,/g, ''));
         }else{
            rep = parseInt(title.replace(/\D/g, ''));

            //if no rep was in the tooltip, convert the truncated rep to hex
            if(isNaN(rep))
               rep = Math.round(1000 * parseFloat(text.replace(/[k,]/gi, '')));
         }

         $(this).text(rep.toString(8));
      });
   });
})();