// MibbitFluid
// version 0.1

// ==UserScript==
// @name            MibbitFluid
// @version         0.1
// @namespace       http://honeyweb.wordpress.com/
// @description     Adds Fluid badges to Mibbit
// @include         *mibbit.com/chat*
// @author          Lucian Branescu Mihaila
// ==/UserScript==

(function() {
    
    // OPTIONS
    var notification = "!"  
    // /OPTIONS
    
    if (!window.fluid) return // abort if not in Fluid
    
    function watch() {
        if( document.title.indexOf("People said stuff!") != -1 &&
        window.fluid.dockBadge != notification )
        {
            window.fluid.dockBadge = notification
            window.fluid.playSoundNamed('Submarine')
        }
    }
    setInterval(function(){ watch() }, 2000)
    
    // TODO: username said
    // getElementsByTagName('span')
    // getElementById('connectspecific')
    
    window.addEventListener('focus', function(){window.fluid.dockBadge = ""} )

})()