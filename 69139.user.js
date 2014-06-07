// ==UserScript==
// @name            Daring Fireball ShortURL Auto Refresh
// @author          Matt Grayson
// @namespace       daringFireballURLAutoRefresh
// @include         http://*df.ws*
// @version         0.1
// @license         MIT License; http://www.opensource.org/licenses/mit-license.php
// @datecreated     2010-02-16
// @dateupdated     2010-02-16
// @description     This userscript will autoreload pages linked to via DaringFireball 
//                  short URLs, thereby avoiding the annoying "Server not found" errors 
//                  in Firefox. See http://daringfireball.net/linked/2009/11/27/df-twitter
// ==/UserScript==

var daringFireballURLAutoRefresh = function() {
    var url = window.location.href;
    var decoded_url = decodeURIComponent(url.replace(/\+/g, " "));
    window.location = decoded_url;
}
daringFireballURLAutoRefresh();