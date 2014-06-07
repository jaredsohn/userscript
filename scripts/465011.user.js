// ==UserScript==
// @name            /r/dogecoin rocket animation
// @description     make the upvote rockets fly to the moon

if(window.location.pathname.indexOf('/r/dogecoin') !== -1){

    //add a new click handler to the upvotes
    jQuery('.unvoted .arrow.up').on('click',function(){
        //after a rocket is clicked
        var logoPosition = jQuery('#header-img').offset();
        var rocketPosition = jQuery(this).offset();
    
        //initiate the absolute position
        jQuery(this).css({'position':'absolute','z-index':'1000','top':rocketPosition.top+'px','left':rocketPosition.left});
    
        //animate the flight to the moon
        jQuery(this).animate({'top':(logoPosition.top+60)+'px','left':(logoPosition.left+50)+'px'},5000);
    });
}

// ==/UserScript==