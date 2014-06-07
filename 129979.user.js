// ==UserScript==
// @name          FurAffinity re-squint-ifier
// @version       0.2
// @description   Makes FurAffinity thumbnails tiny again
// @include       *://*furaffinity.net/
// @include       *://*furaffinity.net/browse*
// @include       *://*furaffinity.net/gallery/*
// @include       *://*furaffinity.net/scraps/*
// @include       *://*furaffinity.net/favorites/*
// @include       *://*furaffinity.net/msg/submissions*
// @include       *://*furaffinity.net/search*
// ==/UserScript==

(function() {
    
    // set desired thumbnail size here (in pixels)
    var size = 120;
    
    // set desired delay until default sized thumbnail is shown here (in seconds)
    var popupDelay = 0.25;
    
    // set transition duration here (in seconds)
    var transitionDuration = 0.25;

    // Code starts here    
    // ========================================================================    
    
    // current default thumbnail size on FA
    var currentSize = 200;
    
    // calculate margin for default sized thumbnail
    var margin = Math.floor((currentSize - size) / -2);
    
    GM_addStyle(
    	getGalleryCss(size) +
        'center.flow a:hover {position:relative;z-index:10;margin:' + margin + 'px;-moz-transition: all ' + transitionDuration + 's ease-in-out ' + popupDelay + 's}' +
        'center.flow a:hover img {max-width:' + currentSize + 'px;max-height:' + currentSize + 'px;-moz-transition: all ' + transitionDuration + 's ease-in-out ' + popupDelay + 's}' +
    	'center.flow b {overflow:visible;}' + // needed for hover effect
    	'center.flow.nodesc span, center.flow.nodesc small {display:none}' // hack because we need to set overflow:visible
    );    
    
    function getGalleryCss(size) {
        return '' +
        'center.flow b {width:' + (size + 10) + 'px;}' +
        'center.flow.nodesc b {height:' + (size + 10) + 'px !important;}' +
        'center.flow.messagecenter.nodesc b {height:' + (size + 30) + 'px !important;}' +
        'center.flow u {height:' + (size + 10) + 'px;}' +
        'center.flow.with-titles-usernames b {height:' + (size + 54) + 'px;}' +
        'center.flow.with-titles b {height:' + (size + 40) + 'px;}' +
        'center.flow.with-checkboxes-titles-usernames b {height:' + (size + 76) + 'px;}' +
        'center.flow img {max-width:' + size + 'px;max-height:' + size + 'px;}';
    }
})();

