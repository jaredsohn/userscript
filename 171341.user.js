// ==UserScript==
// @name       Baka-Tsuki Color Conversations
// @namespace  http://s4nji.com/
// @version    r1
// @description  Colors Baka-Tsuki light novel dialogues/conversations.
// @match      http://www.baka-tsuki.org/project/index.php?title=*
// @license        (CC) by-nc-sa 3.0
// ==/UserScript==

jQuery(document).ready( function() {
        
    jQuery.each (
        
        jQuery(".mw-content-ltr > p"),
        function() {
         
            if ( jQuery(this).html()[0] == '“' ) {
                
                jQuery(this).addClass('quwot');
                
            }
            
            if ( jQuery(this).html()[0] == '"' ) {
                
                jQuery(this).addClass('quwot');
                
            }
            
        }
        
    );

});