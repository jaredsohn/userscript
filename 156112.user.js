// ==UserScript==
// @name       Proxfree Youtube resizer
// @namespace  http://www.shadowblades.net/cyx/
// @version    0.10
// @description  resizes the Flow Player used by Proxfree Youtube Proxy
// @match      http://*proxfree.com/*
// @copyright  2012+, Leonardo B. Morelli
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==
$(document).ready(function(){
    //alert('bam!');
    document.getElementById('FlowPlayer').width='900';
    document.getElementById('FlowPlayer').height='480';
    $('#watch7-sidebar').css('margin-top', '0px');
});

