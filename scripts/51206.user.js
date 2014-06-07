// ==UserScript==
          // @name        Trac attachments
          // @homepage    http://cyprio.net/
          // @version     0.0.1
          // @namespace   http://cyprio.net/greasemonkey/
          // @description	Turn trac attachment page links to their "raw" equivalent
          // @include     *trac*
          // ==/UserScript==
          
          var as = document.getElementsByTagName("a");
          for (var i = 0; i < as.length; i++) {
            if ( as[i].href.match(/attachment/) ) {
              as[i].href = as[i].href.replace("attachment", "raw-attachment");
            }
          }