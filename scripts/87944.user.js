// ==UserScript==
// @name        Chess
// @namespace   http://fluidapp.com
// @description Handles updating the dock icon if it's your move.
// @include     *
// @author      Brian Wigginton - <brianwigginton.at.gmail.dot.com>
// ==/UserScript==

(function () {
    if (window.fluid) {

			var myTurn = [];
			
			// my open chess games
			if(window.location['pathname'] == "/echess/myhome.html") {
				myTurn = document.getElementsByClassName('gmymv');
			
			// in chess game
			} else if(window.location['pathname'] == "/echess/game.html") {
				myTurn = document.getElementsByClassName('msg_game');
			}
			
			if(myTurn.length > 0) {
				window.fluid.dockBadge = "Turn";
				// window.fluid.addDockMenuItem("mytitle");
				window.fluid.showGrowlNotification({
					title: "Chess.com", 
					description: "Your Move", 
					priority: 1, 
					sticky: false,
					onclick: function() {
						window.fluid.unhide();
						window.fluid.activate();
					},
				});
			}
    }
})();