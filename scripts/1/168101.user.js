// ==UserScript==
// @name           Remove Jebakan Betmen On Kaskus
// @author		   fauzieuy (http://fauzieuy.github.io)
// @version        1.0.0
// @description    remove jebakan betmen on kaskus, such as : link on spoiler
// @icon	       http://fauzieuy.github.io/myuserscripts/images/kaskus/jebmen.png
// @include        /^https?://(|www\.)kaskus.co.id/thread/*/
// @include        /^https?://(|www\.)kaskus.co.id/lastpost/*/
// @include        /^https?://(|www\.)kaskus.co.id/post/*/
// @include        /^https?://(|www\.)kaskus.co.id/group/discussion/*/
// @include        /^https?://(|www\.)kaskus.co.id/show_post/*/
// @require  	   http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant    GM_addStyle
// ==/UserScript==
/*- The @grant directive is needed to work around a design change
    introduced in GM 1.0.   It restores the sandbox.
*/

$('.spoiler a > .smallfont').unwrap();
$('.entry a > .spoiler').unwrap();