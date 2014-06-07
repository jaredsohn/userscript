// ==UserScript==
// @name           reply popup
// @namespace      http://4chon.net/
// @description    makes the post being replied to appear when you mouse over the >>link.
// @include        http://4chon.net/*  https://4chon.net/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

try {
  var test_assignment = unsafeWindow; 
} catch(e) {
  unsafeWindow = window;
}


// Loads Jquery
(function() {
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js';
  script.addEventListener('load', function() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.textContent = '(' + script_main + ')();';
    head.appendChild(script);
  }, false);
  head.appendChild(script);
})();



function script_main() {
  $('a').each(function(i) {
    if(this.onclick) {
      var popup = $('<div/>');
      if(this.innerHTML.substring(0, 3*4) == "&gt;&gt;&gt;") {
        // the link starts with >>>, it is a cross board link. Not supported currently.
        return;
      } else if(this.innerHTML.substring(0, 2*4) == "&gt;&gt;") {
        // the link goes to a post.
        var post_number = this.innerHTML.substring(2*4); // skip 2 > characters, which are actually &gt;
        var post_id = 'reply_' + post_number;
        var matching_posts = $('#' + post_id);
        if(matching_posts.length == 1) {
          var post = matching_posts[0];
          popup.html(post.innerHTML);
        } else {
          // post not found. It is either deleted, or not on this page.
          //   A more complete solution
          //   would xmlhttprequest the thread containing the post
          //   and search for the post, but this might not be acceptable for
          //   slow internets.
          popup.html('click to view');
        }
        popup.addClass('post reply');
      } else {
        return;
      }
      popup.css('position', 'absolute');

      // the reference counting business keeps track if the mouse is
      //   either on the reply link, or on the pop up window. If either
      //   is true, the pop up should not be destroyed. A timer is used
      //   when checking to see if the pop up should be destroyed so that
      //   the user can jump the gap between the link and the pop up with
      //   the mouse without the pop up suddenly closing as soon as the mouse
      //   leaves the link.
      var popup_reference_count = [0];
      var add_popup_reference = function(event) {
        popup_reference_count[0]++;
      };
      var check_reference_count = function(event) {
        if(popup_reference_count[0] <= 0) {
          popup.remove();
        }
      };
      var remove_popup_reference = function(event) {
        popup_reference_count[0]--;
        setTimeout(check_reference_count, 200);
      };


      $(this).hover(function(event) {
        popup.hover(add_popup_reference, remove_popup_reference);
        $(document.body).append(popup);
        var x = event.pageX;
        var y = event.pageY;
        popup.css('left', x - 5);
        popup.css('top', y - popup[0].clientHeight - 5);
        add_popup_reference(event);
      }, remove_popup_reference);
    }
  });
}

