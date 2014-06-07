// ==UserScript==
// @name        Trello Kanban WIP red colourisation
// @namespace   ip.trello
// @description A script that colours cards with too high or too low card limits red.
// @include     https://trello.com/b/*
// @version     1
// @grant       none
// ==/UserScript==

// access the real "window"
// http://stackoverflow.com/questions/5006460/userscripts-greasemonkey-calling-a-websites-javascript-functions
let exec = function(fn) {
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = '(' + fn + ')();';
  document.body.appendChild(script); // run the script
  document.body.removeChild(script); // clean up
}

exec(function() {

  var repeatedly = function(f, timeout, args) {
    var t = this;
    f.apply(this, args);
    setTimeout(function() {
      f.apply(t, args);
      repeatedly.call(t, f, timeout, args);
    }, timeout);
  };

  var red_colour = '#FF8282',
      gray_colour = '#E3E3E3',
      orange_colour = '#F9DAB8';

  var update = function ($items) {
    var rgs = ($items || $('#board .list')).
      map(function() {
        var title  = $(this).find("div[attr='name'] h2").text();
        var actual = Number((/(\d+) cards/.exec($(this, '.num-cards').text()) || [0, 0])[1]);
        var nums   = /\[(\d+)(?:-(\d+)){0,1}\]/.exec(title) || [-Infinity, 0, Infinity];
        return {
          "title"     : title,
          "min_lim"   : Number((!!nums[2]) ? nums[1] : 0),
          "max_lim"   : Number((!!nums[2]) ? nums[2] : nums[1]),
          "num_cards" : Number(actual || 0),
          "list"      : $(this)
        };
      }).get().
      reduce(function(acc, t, i, arr) {
        if (t.num_cards < t.min_lim) acc.orange.push(t);
        else if (t.num_cards > t.max_lim) acc.red.push(t);
        else acc.green.push(t);
        return acc;
      }, {red:[], green:[], orange: []});
      
    rgs.red.forEach(function(x) {
      console.info("Consider the amount of work in '" + x.title +
        "'. You have " + x.num_cards +
        " cards there...");
      x.list.css("background", red_colour);
      x.list.find('.num-cards').css("color", "black").show();
    });

    rgs.green.forEach(function(x) {
      x.list.css("background", gray_colour);
      x.list.find('.num-cards').hide();
    });
    
    rgs.orange.forEach(function(x) {
      console.info("Consider adding more work in '" + x.title +
        "' to improve throughput, you only have " + x.num_cards +
        " cards.");
      x.list.css("background", orange_colour);
    });
  };

  var observer = new MutationObserver(function(mutations)
    mutations.forEach(function(mutation)
      update( $(mutation.target).closest('.list') ), 1)
  );

  $("#board .list").each(function() observer.observe(this, {childList: true, subtree: true}));

  repeatedly(update, 5000);
});
