// ==UserScript==
// @name          Squatter Redirect
// @namespace     http://www.openfusion.net/tags/squatter_redirect
// @description   Auto-redirection from sites tagged as squatter domains on delicious
// @include       *
// @author        Gavin Carr <gavin@openfusion.com.au>
// @version       0.01
// ==/UserScript==

(function() {

 // Set the following variable if you want to be able to tag your
 // own squatter domains in delicious, and don't want to have to wait
 // until they are picked up / authorised by the squatter_redirect 
 // account. See the @namespace link above for details.
 var MY_DELICIOUS_USERNAME = '';

 // -----------------------------------------------------------------------
 // Shouldn't need to change anything below here

 // This is the 'official' squatter_redirect delicious account, that
 // curates/authorises other people's tags (to prevent domain squatters
 // from tagging real sites and breaking things).
 var SQUATTER_REDIRECT_USERNAME = 'squatter_redirect';

 var usernames = [ SQUATTER_REDIRECT_USERNAME ]
 if (MY_DELICIOUS_USERNAME) usernames.unshift(MY_DELICIOUS_USERNAME);

 // Do nothing for anything except top level windows
 if (window.top && window.top != window) return;

 // Query for a squatter_domain= tag by username
 for (u = 0; u < usernames.length; u++) {
   var deliciousURL = "http://feeds.delicious.com/v2/json/" + usernames[u] +
     "/squatter_domain=" + window.location.host;

   GM_xmlhttpRequest({
     method: 'GET',
     url: deliciousURL,
     onload: function(response) {
       var data, tag, redirect_match, squatter_redirect;
       if (response.status == 200) {
         data =  eval('(' + response.responseText + ')');
         if (data.length > 0 && data[0].t && typeof(data[0].t) == 'object') {
           // Iterate over tags, looking for a squatter_redirect= one
           for (i in data[0].t) {
             tag = data[0].t[i]; 
//           GM_log("tag: " + tag);
             if (redirect_match = tag.match(/^squatter_redirect=(.+)/i)) {
               squatter_redirect = redirect_match[1];
               if (! squatter_redirect.match(/^http/)) {
                 squatter_redirect = 'http://' + squatter_redirect;
               }
               GM_log("squatter_redirect found: " + squatter_redirect);
               window.location = squatter_redirect;
             }
           }
         }
       }
     },
   });
 }

})()
