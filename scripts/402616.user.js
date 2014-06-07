// ==UserScript==
// @name           Redirect YouTube 'Videos' Links Back to Uploads
// @namespace      RYVLBU
// @description    Undo YouTube's latest design changes, instead of 'Videos' links going to the new multiple category page, it will redirect right to the Uploads page, the way it used to be.
// @include        http://www.youtube.com/user/*/videos*
// @include        http://www.youtube.com/channel/*/videos*
// @include        https://www.youtube.com/user/*/videos*
// @include        https://www.youtube.com/channel/*/videos*
// @exclude 	   http://www.youtube.com/*sort*
// @exclude 	   https://www.youtube.com/*sort*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @author         drhouse
// @version        1.0.3
// ==/UserScript==

$(document).ready(function () {
    
        window.location.href = ( document.URL + "?sort=dd&view=0&shelf_id=1" );
    
});