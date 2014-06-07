// ==UserScript==
// @name        HTML5 TrackingQueryStripper
// @namespace   http://creazy.net/
// @include     *
// @version     1.1
// ==/UserScript==

(function () {

// Run if QueryString exists and enable to use pushState
if ( location.search && window.history.replaceState ) {

    //------------------------------------------------------------
    // strip params
    //------------------------------------------------------------
    var params = location.search.replace(/^\?/,'').split('&');
    var new_params = [];
    for ( var i=0; i<params.length; i++ ) {
        // SKIP RSS
        if ( params[i].match(/^ref=rss/) ) {}
        // SKIP Google Analytics
        else if ( params[i].match(/^utm_/) ) {}
        // SKIP Facebook Like
        else if ( params[i].match(/^(fb_action_ids|fb_action_types|fb_source|action_object_map|action_type_map|action_ref_map)/) ) {}
        
        // Other params
        else {
            new_params.push(params[i]);
        }
    }
    
    var search = (new_params.length)?'?'+new_params.join('&'):'';
    if ( search != location.search ) {
        window.history.replaceState(
            null,
            null,
            location.pathname+search
        );
    }
}

})();