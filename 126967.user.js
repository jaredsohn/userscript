// ==UserScript==
// @name            NoVuzela
// @id              novuzela_dlswar
// @description     Kill all media by pressing [ESC] . Inspired by that insuferable plastic horn.
// @author          dlswar
// @license         public domain
// @icon            http://s3.amazonaws.com/uso_ss/icon/126967/thumb.png
// @homepage        http://userscripts.org/scripts/show/126967
// @updateURL       http://userscripts.org/scripts/source/126967.user.js
// @namespace       *
// @include         http*
// @exclude         http*://*vimeo.com*
// @exclude         http*://*youtube.com*
// @version         0.19
// ==/UserScript==
//
// This script is BSD licensed: e.g. do whatever you like with/to

// Anonymous function registering media-containing DOM nodes and an event for quick deletion 
(function(doc){

    var eventkey = 27;        // You can change this to a key of your choice.  See http://bit.ly/adUso
    var elements = new Array; // DOM nodes to check for media file
    var nodes    = new Array; // DOM nodes found to have media
    var RXext    = new RegExp("swf|ogg|wav|mp3|mp4|mov|wma", 'i' ); // file extensions in tag src attrbutes  
    var RXtyp    = new RegExp("flash|x-", 'i');// keywords in tag type attrbutes

    // List embeds with matching media types
    elements = doc.getElementsByTagName('embed');
    for( var i = 0; i < elements.length; i++ ){
        var node = elements[i];
        if( RXext.test(node.getAttribute('src')) || RXtyp.test(node.getAttribute('type')) ){ 
            nodes.push(node); } }

    // List object tags with matching media types.  These two operations are probably equivalent to simply listing all embeds/objects 
    elements = doc.getElementsByTagName('object');
    for( var i = 0; i < elements.length; i++ ){
        var node = elements[i];
        if( RXext.test(node.getAttribute('data')) || RXtyp.test(node.getAttribute('type')) ){ 
            nodes.push(node); } }

    // Memory cleanup (like it really matters)
    delete elements, node, RXext, RXtyp;  

    // Add to the list all nodes whose purpose is to simply make noise
    nodes = nodes.concat( doc.getElementsByTagName('bgsound') , doc.getElementsByTagName('audio') );

    // Function to delete all nodes in a list
    var removeNodes = function(nodes) { 
        for( var i = 0; i < nodes.length; i++ ){
            // getElementsByTagName() produces live lists, which won't concat into flat arrays.  therefore we recurse.
            if ( Array.isArray(nodes[i])) removeNodes(nodes[i]); 
            else nodes[i].parentNode.removeChild(nodes[i]); } }

    // Event to fire when we hit esc
    var NoVuzelaEvent = function(eventobject){
        if( eventobject.which == eventkey ){ //if it's the event key
            removeNodes(nodes); } } // Remove the media elements from the DOM

    // set an event listener that will hear our keypresses
    document.addEventListener( 'keydown', NoVuzelaEvent, false); 

})(document); // Run immediatley