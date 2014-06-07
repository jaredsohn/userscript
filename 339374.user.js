// ==UserScript==
// @name        mmmturkeybacon Bad Link Fixer
// @author      mmmturkeybacon
// @description Sometimes requesters will leave off the protocol at the
//              beginning of a URL; for example, www.example.com instead of
//              http://www.example.com. This results in bad links that
//              look like https://www.mturkcontent.com/dynamic/www.example.com.
//              This script prepends "http://" to links that don't start with
//              "http" or "/".
//              I'm not sure if it makes sense for any HIT to use relative links.
//              It's possible this script might break valid relative links. It's
//              best to leave it disabled until you need it.
// @namespace   http://userscripts.org/users/523367
// @match       https://s3.amazonaws.com/mturk_bulk/hits*
// @match       https://www.mturkcontent.com/dynamic/hit?*
// @require     http://code.jquery.com/jquery-latest.min.js
// @downloadURL http://userscripts.org/scripts/source/339374.user.js
// @updateURL   http://userscripts.org/scripts/source/339374.meta.js
// @version     1.0
// @grant       none
// ==/UserScript==


var $bad_link = $('a:not([href^="http"], [href^="/"])');
$bad_link.each(function()
{
    $(this).attr('href', 'http://'+$(this).attr('href'));
});
