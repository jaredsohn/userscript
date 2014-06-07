// ==UserScript==
// @name        AO3: Kudos tools
// @namespace   http://poulpette.dreamwidth.org
// @description Highlights the kudos button and your username if kudos have already been given.
//              The script will also highlight other usernames in the list if you've decided
//              to track some.
// @grant       none
// @include     http://archiveofourown.org/works/*
// @include     http://archiveofourown.org/chapters/*
// @include     https://archiveofourown.org/works/*
// @include     https://archiveofourown.org/chapters/*
// @version     1.4
// @history     1.4 - Highlight kudos summary text if username in collapsed section of the kudos list.
// @history     1.3 - Fix missing kudo button highlight.
// @history     1.2 - Tampermonkey/Opera fix.
// @history     1.1 - Adjustments for 04.04.2013 AO3.org update.
// @history     1.0 - Creation.
// ==/UserScript==
// 
window.unsafeWindow || (
  unsafeWindow = (function() {
    var el = document.createElement('p');
    el.setAttribute('onclick', 'return window;');
    return el.onclick();
  }())
);

(function($) {
  $(document).ready(function(){

    var kudos = $(".kudos a", $("#feedback")),
        k_btn = $('#new_kudo input'),
        k_sum = $('#kudos_summary'),
        usr   = 'YOUR_USERNAME', // Your username
        tlist = []
          // Usernames of people whose kudos you want to see more easily.
          // Follow the example to list the names:
          // ['user_a', 'user_b', 'user_c']
    ;

    // Add the needed CSS rules
    add_css($('head'));

    // Go through each name in the kudos list
    var
      found_self = false,
      tracked    = 0
    ;

    kudos.each(function (){
      var kudo       = $(this),
          username   = kudo.attr('href').substring('/users/'.length)
      ;

      // if all the tracked usernames are found, exit the each loop.
      if (tracked >= tlist.length && found_self)
        return false;

      // If kudos have been given to the work:
      // change display of username in kudos list and of the kudo button.
      else if (!found_self && username == usr) {
        found_self = true;
        kudo.addClass('usr');
        k_btn.addClass('given');

        //if username in kudos summary, highlight it too.
        if (kudo.parent().hasClass('kudos_expanded'))
            k_sum.addClass('sum');
      }

      // Highlight kudos from specific users.
      else if (tracked < tlist.length && tlist.length > 0) {
        for (var i = tlist.length - 1; i >= 0; i--) {
          if (tlist[i] == username) {
            tracked++;
            kudo.addClass('highlight');
            i = -1; // exit loop
          }
        }
      }

    });
  });

  /**
   * Adds script specific CSS to AO3
   *
   * @param head the page's <head></head> element
   */
  function add_css(head){
    var
      style = $('style'),
      css = ".kudos a {margin-bottom:.25em; border:none;}\
        .kudos a.usr, .kudos a.highlight {color: #fff; padding-left: 5px; padding-right: 5px; border-radius:8px / 10px;}\
        .kudos a.usr {background-color: #398235;}\
        .kudos a.highlight {background-color: #3f4c6b;}\
        #kudos_summary.sum {color: #398235; font-weight:bold;}\
        #new_kudo .given {color: #fff; background: linear-gradient(#c9de96 0%, #8ab66b 31%, #398235 100%) repeat scroll 0% 0% #398235;}"
    ;

  if (!(style.length > 0)){
    style =  $("<style>").prop("type", "text/css").appendTo(head);
  }

    style.append(css);
  }

})(unsafeWindow.jQuery);