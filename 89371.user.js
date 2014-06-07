// ==UserScript==
// @name           Du lämnar nu flashback utan en jobbig mellanstation.
// @namespace      eskil
// @description    Used for removing an annoying feature when browsing the flashback.org forums. 
// @version        1.0
// @include        http://flashback.org/leave.php*
// @include        https://flashback.org/leave.php*
// @include        http://www.flashback.org/leave.php*
// @include        https://www.flashback.org/leave.php*
// ==/UserScript==

      /*
       * This script is based on what I found here:
       * http://snipplr.com/view/799/get-url-variables/
       *
       * Many thanks,
       *
       * Erik Kinding
       */

      function getUrl()
      {
            var vars = [], hash;
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for(var i = 0; i < hashes.length; i++)
            {
                  hash = hashes[i].split('=');
                  vars.push(hash[0]);
                  vars[hash[0]] = hash[1];
            }

            return vars['u'];
      }
      
     var redir = unescape(getUrl());
     location.replace(redir);