// ==UserScript==
// @name           Memrise Review Panel - Confirm use of Tab & Down buttons
// @description    Displays an popup window if the Tab or [down arrow] button is pressed before answering a question.  This will hopefully prevent missing a question due to accidental typos.
// @match          http://www.memrise.com/course/*/garden/*
// @match          http://www.memrise.com/garden/water/*
// @version        0.1.1
// @updateURL      https://userscripts.org/scripts/source/174712.meta.js
// @downloadURL    https://userscripts.org/scripts/source/174712.user.js
// @grant          none
// ==/UserScript==

var onLoad = function($) {

  var handlers = [];
  var keydowns = $._data($('body').get(0), 'events').keydown;

  for (var i = keydowns.length - 1; i >= 0; i--){
    handlers.push(keydowns[i]);
  }

  var trigger = function(event) {
    if ($(event.target).is('textarea'))
      return;

    for (var i = handlers.length - 1; i >= 0; i--) {
      handlers[i].handler(event);
    }
  };

  $('body').off('keydown');
  $('body').on('keydown', function(e) {
    try {
      var copytyping = $('.garden-box').hasClass('copytyping');
      if (!copytyping && $(e.target).is('input') && (e.which===9 || e.which===40) ) {
        console.log("Verify press of tab or down key");
        if (!confirm("You haven't answered yet.  Did you mean to give up and open the review panel?")) return false;
      }
      trigger(e);
    } catch (err) {
      console.log('error - falling back to default behavior', err);
      trigger(e);
    }
    
  });
};

var injectWithJQ = function(f) {
	var script = document.createElement('script');
	script.textContent = '$(' + f.toString() + '($));';
	document.body.appendChild(script);
};
injectWithJQ(onLoad);