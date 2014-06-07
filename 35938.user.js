// ==UserScript==
// @name           Automatically show comments on Stack Overflow
// @include        http://stackoverflow.com/questions/*
// ==/UserScript==

// jQuery hack, enjoy :)
var $ = unsafeWindow.$;

/**
 * Kind of global variable, true if the user moved the view.
 */
var view_moved = false;

$(window).scroll(function() {
			  view_moved = true;
			});

/**
 * Scroll to an element.
 */
function scroll_to_element(element) {
  var x = 0, y = 0;

  while (element) {
    x += element.offsetLeft;
    y += element.offsetTop;

    element = element.offsetParent;
  }

  window.scroll(x, y);
}

/**
 * Wait for all comments to load (if one uses the last block of comments
 * as argument), and then preform action.
 */
function wait_for_comments_to_load(comments, action) {
  if (comments.style.display != "none")
    action();
  else
    setTimeout(function() { wait_for_comments_to_load(comments, action); },
	       500);
}

/**
 * Map over an array of elements, and click them in order with
 * a delay between; after that is done, call the callback.
 */
function click_elements_with_delay(elements, delay, callback) {
  function click_elements_with_delay_hlp(elements, i, delay, callback) {
    if (i < elements.length) {
      $(elements[i]).click();
      setTimeout(function() {
	click_elements_with_delay_hlp(elements, i + 1, delay, callback); },
		 delay);
    } else {
      callback();
    }
  }

  click_elements_with_delay_hlp(elements, 0, delay, callback);
}

/**
 * If the link points to an element inside the document (id or name), _try_
 * to move to that position.
 */
function move_to_linked_comments(last_comments) {
  if (!view_moved && window.location.hash != "" && last_comments)
    wait_for_comments_to_load(
      last_comments.parentNode.getElementsByTagName("div")[0],
      function() {
	setTimeout(function() {
		     var hash = window.location.hash.substr(1);
		     var scroll_to = document.getElementById(hash);

		     if (!scroll_to)
		       scroll_to = document.getElementsByName(hash);

		     if (scroll_to.length > 0)
		       scroll_to_element(scroll_to[0]);
		     else
		       window.scroll(0, 0);
		   }, 500);
      });
}

var comments = $("a.comments-link-accepted, a.comments-link").filter(
  function() {
    return !!$(this).html().match("comments");
  });

click_elements_with_delay(comments, 2200, function() {
  move_to_linked_comments(comments[comments.length - 1]); });
