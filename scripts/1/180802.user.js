// ==UserScript==
// @name       LSx Username Checker
// @namespace  LSx Username Checker
// @version    0.2
// @updateURL https://userscripts.org/scripts/source/180802.meta.js
// @downloadURL https://userscripts.org/scripts/source/180802.user.js
// @description  When changing your username, this will check to see if it's available or not. It will turn the box green if available, and red if not.
// @match      http://*leak.sx/usercp.php?action=changename
// @copyright  2013+, Oscar Sanchez
// @icon http://leak.sx/uploads/ficons/member%20contests1.png
// @require http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @run-at document-end
// ==/UserScript==
(function(){v=$(".textbox[name^='n']");v.keyup(function(){try{clearTimeout(t)}catch(err){}t=setTimeout(function(){bgcs("221E0C");cusr()},300)});function bgcs(a){v.css("background","#"+a)}function cusr(){u=v.val().toLowerCase();$.get("xmlhttp.php?action=get_users&query="+u,function(x){if(x.toLowerCase().indexOf('>'+u+'<')>-1){bgcs("1A0909")}else{bgcs("0E1A09")}})}})();