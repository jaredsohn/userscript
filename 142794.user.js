// ==UserScript==
// @name           Detect untouched threads on KAP forum
// @author         Sebastian Kaliszewski
// @author         Erik Vergobbi Vold
// @version        2012.9.1
// @namespace      http://userscripts.org/scripts/show/48293
// @updateURL      https://userscripts.org/scripts/source/48293.meta.js
// @download       http://userscripts.org/scripts/source/48293.user.js
// @description    Detect untouched threads on "Notes on Kite Aerial Photography" forum.
// @include        http://arch.ced.berkeley.edu/kap/*
// //include        http*://arch.ced.berkeley.edu/kap/discuss/index.php?p=/discussions*
// //include        http*://arch.ced.berkeley.edu/kap/discuss/index.php?p=/categories*
// //include        http*://arch.ced.berkeley.edu/kap/discuss/
// @exclude        http*://arch.ced.berkeley.edu/kap/discuss/index.php?p=/discussion/*
// //require        http://code.jquery.com/jquery-1.8.1.min.js
// ==/UserScript==
// Set class 'AllNew' to each thread header which contains all new, unread
// messages, i.e. number of new messages equaling total messages.

// a function that loads jQuery and calls a callback function 
// when jQuery has finishedloading by Erik Vergobbi Vold
// http://erikvold.com/blog/index.cfm/2010/6/14/using-jquery-with-a-user-script
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
// "http://code.jquery.com/jquery-1.8.1.min.js"
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main() {
  jQuery('li.New div.Meta strong').each(function(i, entry) {
    var container = jQuery(entry).parents('li.New').first();
    var commentCountQuery = jQuery(entry).parent().children('.CommentCount').first()
    var newCountQuery = jQuery(entry);
    var commentCount = parseInt(commentCountQuery.text());
    var newCount = parseInt(newCountQuery.text());
    if (commentCount == newCount && newCount > 0) {
      container.addClass('AllNew');
    }
  });
}

// load jQuery and execute the main function
addJQuery(main);