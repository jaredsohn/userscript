// ==UserScript==
// @name        IRCCloud "All Away" Command
// @namespace   http://fluidapp.com
// @description Add a command to send /away messages to all networks.
// @include     http://irccloud.com/*
// @include     https://irccloud.com/*
// @author      Martin Dittus
// ==/UserScript==

// TODO: determine /away state when loading? (may differ between networks)
// James suggests:
// for (var k in controller.connectionViews) controller.connectionViews[k].connection.away
// (undefined for not away, string with the away message if away)

(function () {
  
  var isAway = false;
  var awayMessage = 'gone fishing.';

  function allAwayHandler(isAway, awayMessage) {
    var command = '/away';
    if (isAway==false) {
      command = command + ' ' + awayMessage;
    }
    for (var k in controller.connectionIds) {
      controller.msg(controller.connectionIds[k], '*', command);
    }
  }

  if (window.fluid) {
    // Inject link
    $('#settings').before('<a href="#" id="allAwayTrigger">All Away</a> | '); // wrong place, but works
    // $('#loggedInAs').after(' | <a href="#" id="allAwayTrigger">All Away</a>'); // right place, but interferes with IRCCloud's 'Settings' panel link injection

    // Set up event handler
    $('#allAwayTrigger').click(function() {
      allAwayHandler(isAway, awayMessage);
      isAway = !isAway;
      return false;
    });
  }
})();
