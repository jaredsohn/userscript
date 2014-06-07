// ==UserScript==
// @name        Show TrackID Soundcloud
// @namespace   http://s4nji.com
// @include     https://soundcloud.com/*/*
// @include     http://soundcloud.com/*/*
// @version     2
// @grant       none
// ==/UserScript==


// Run stuff
(function(){

// Function to insert stylesheet
unsafeWindow.addGlobalStyle = function(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}


// The core of the script
unsafeWindow.getTrackID = function() {

    var trackid;
    var thisURL = 'http://' + window.location.host + window.location.pathname
    
    $.get( "http://api.soundcloud.com/resolve.json?url=" + thisURL + "&client_id=7f8f52db282dbc6c9667b63feac2d032" )
    .done(function( data ) {
    trackid = data.id;
    
    // Output to console
    console.log(trackid);
            
    // Output to element after song title
    $(".listenContent .sc-media-content > .soundTitle__title").after("<span class='trackid'>"+trackid+"</span>");
    
    });

}


// Check if everything is ready
unsafeWindow.checkTrackID = function() {

    // Grab target hook element
    var target = $(".listenContent .sc-media-content > .soundTitle__title");
        
    // Check if it exists
    if ( typeof target === 'undefined' ) {
        
        // it didn't, reexecute this function in 500ms
        setTimeout('checkTrackID();', 500);
            
    } else {
            
        // All set, start script in 1 second
        setTimeout('getTrackID();', 1500);
            
    }
    
}
        

// Init
$(document).ready(function(){
    
    setTimeout('checkTrackID();', 500);
    addGlobalStyle( ".trackid {background: none repeat scroll 0 0 #F4F4F4;border: 1px dashed #BBBBBB;display: inline-block;font-size: 13px;height: 16px;margin-left: 10px;padding: 5px 8px;position: relative;text-align: center;top: -2px;vertical-align: middle;width: 80px;}" );
    addGlobalStyle( ".trackid:not(:hover):before {background: none repeat scroll 0 0 #F4F4F4;border: inherit;content: 'TrackID';height: inherit;left: -1px;padding: inherit;position: absolute;top: -1px;width: inherit;}" );
    
});

})();