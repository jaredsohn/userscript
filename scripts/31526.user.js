// ==UserScript==
// @name        WeeWar
// @namespace   http://jnewland.com
// @description Fluid userscript for WeeWar. Disables email notifications and provides Growl, dock badge, and sound notifications. Also hides controls by default.
// @include     http://*weewar.com*/game*
// @author      Jesse Newland
// ==/UserScript==

(function () {
  if (window.fluid) {
    var title = document.title;
    
    //are we in a game?
    if (title.search("Game:") > -1 ) {
      
      //hide controls
      toggleControls();
      
      //grab the game name
      var game_name_start = title.search("Game: ");
      var game_name_end = title.search(" on Weewar.com");
      var game_name = title.slice(game_name_start+6,game_name_end);
      
      //disable email notifications
      if ($('emailNotification').checked) {
          window.fluid.showGrowlNotification({
            description: "Disabling email notifications", 
            title: game_name,
            priority: 1, 
            sticky: false,
            identifier: "email_disable",
            icon: "http://weewar.com/images/weewar200.jpg"
          });
        command( 'email_no', triangleExclude );
        $('emailNotification').checked = false;
      }
      
      //is it your turn?
      if (title.search("Your turn") == 0) {
        
        //set a dock badge
        window.fluid.dockBadge = "Your turn!";
        
        //sound notification
        window.fluid.playSoundNamed("Morse");
        
        //growl notifications
        window.fluid.showGrowlNotification({
          description: "It's your turn!", 
          title: game_name,
          priority: 1, 
          sticky: true,
          identifier: "your_turn",
          //fix this plz todd
          onclick: function() { window.fluid.activate() },
          icon: "http://weewar.com/images/weewar200.jpg"
        });
      } else {
        window.fluid.dockBadge = "";
      }
    }


  }
})();