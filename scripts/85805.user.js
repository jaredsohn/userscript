// ==UserScript==
// @name          Twitter Reply to all
// @description   Reply to all without copy and paste
// @author        Khaled Alhourani
// @include       http://twitter.com*
// @include       http://www.twitter.com*
// @include       https://twitter.com*
// @include       https://www.twitter.com*
// @require       http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @version       1.5
// ==/UserScript==


var icon = "iVBORw0KGgoAAAANSUhEUgAAACAAAAAQCAYAAAB3AH1ZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjAwRUYwODU2QkM1OTExREZCOTY4QThBREU0OUEyRUJDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjAwRUYwODU3QkM1OTExREZCOTY4QThBREU0OUEyRUJDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDBFRjA4NTRCQzU5MTFERkI5NjhBOEFERTQ5QTJFQkMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDBFRjA4NTVCQzU5MTFERkI5NjhBOEFERTQ5QTJFQkMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7EOVKSAAABC0lEQVR42sSVLwvCQBiHb2OizWqUgSCY/B4WrRo0DQwWDX4Ao2ITLhm0GP0GIlgUm00Y+hHswvmbvCvqdu/dgi88cOz2vPdnP5hQSgkbolIyGtq5b19I5YmPCsMwHq7BHJzjB77vC10FQZDoSym/3ncT+kxBm+ZzwrzY/q8NLMCQxgdwBF3gMBc38l1NszuogSVoWdyE1v+1gT6Y0bgJKmAHBsxFjfykGxiBG6jTKSZ0Em6x/bQQlsEV5EEPrAxDyPJ1IdyDE3iAsUUItT4nhFX6rg3LEKb6fw+hlxKiEiiAC4VoYxhClu+lNOnQvGsRQrbvaZo8QRFsCdPS+//+GzpRE5GlAplJfwkwAMTs80PYBZ3FAAAAAElFTkSuQmCC";
var css = ".hentry .actions-hover span.reply-to-all-icon {background-image:url(data:image/png;base64," + icon + "); cursor:pointer; height:15px; margin-right:1px; width:15px;} .hentry .actions-hover .reply_to_all:hover .reply-to-all-icon {background-position: -16px 0;}";
GM_addStyle(css);


$.fn.focusEnd = function() {
  return this.each(function() {
    var A = this;
    if (A.style.display!="none") {
      if ($.browser.msie) {
	A.focus();
	var B = A.createTextRange();
	B.collapse(false);
	B.select()
      } else {
	A.setSelectionRange(A.value.length,A.value.length);
	A.focus();
      }
    }
  }
)};

$.fn.exists = function() {
  return this.length > 0;
}


function getTweeps(status, sep) {
  if (status.hasClass('mine')) {
    return 0;
  }

  var my_username = $('meta[name=session-user-screen_name]').attr("content");
  var username = '';
  var tweeps = '';
  
  if (status.find('a.screen-name').exists()) {
    username = status.find('a.screen-name').text();
  } else {
    if ($('.status .user-info a.screen-name').exists()) {
      username = $('.status .user-info a.screen-name').text();
    }
  }

  if (username != '') {
    tweeps = '@' + username;
  }

  status.find('.entry-content a.username').each(function() {
    var tweep = $(this).text();
    if (my_username != tweep) {
      tweeps += sep + '@' + $(this).text();
    }
  });

  return tweeps;
}


function replyToAllHtml(selector) {
  $(selector).each(function() {
    if (!$(this).find('.reply_to_all').exists()) {
      var status = $(this);
      var status_id = status.attr('id').replace(/status_/,"");
      var username = '';

      if (status.find('a.screen-name').exists()) {
	username = status.find('a.screen-name').text();
      } else {
	if ($('.status .user-info a.screen-name').exists()) {
	  username = $('.status .user-info a.screen-name').text();
	}
      }

      var tweeps = getTweeps(status, '+');
      if (!tweeps) {
	return;
      }

      var reply_to_all_html = '<li><span class="reply_to_all"><span class="reply-to-all-icon icon"></span><a title="reply to all" href="/?status=' + tweeps + '&amp;in_reply_to_status_id=' + status_id + '&amp;in_reply_to=' + username + '">Reply to all</a></span></li>';

      status.find('.actions-hover').prepend(reply_to_all_html);
    }

    $(this).die('mouseover');
  });
}


function init() {
  replyToAllHtml('#timeline.statuses .hentry.status, #show .hentry.status');

  $(".reply_to_all").live("click",function(event) {
    event.preventDefault();
    var E = $(this);
    var C = E.parents(".hentry:first");
    var G = C.attr("id").replace(/status_/,"");
    var B = getTweeps(C, ' ');
    var A = C.attr("class").match(/u-([A-Za-z0-9_]+)/);
    var R = A[1];

    if (!B) {
      alert(_("Whoops! Something went wrong. Please refresh the page and try again!"));return
    }

    if (C.hasClass("status") || C.hasClass("share")) {
      var F = $("#status");

      if (F.size()) {
	F.val(B+" ").trigger("update");
	$("#status").focusEnd();
	$("#in_reply_to_status_id").val(G);
	$("#in_reply_to").val(R);
	window.scroll(0,0);
      } else {
	window.location = E.find("a").attr("href");
	return false;
      }
    }

    window.scroll(0,0);
    return false;
  },this);

  // The new tweets link that appears when new tweets available
  // here we need only live click event on that link
  // because all new tweets are here but are hidden
  // and click the link displays them
  $('#results_update').live('click', function() {
    replyToAllHtml('#timeline.statuses .hentry.status');
  });

  // We can't do the same for more link that appears on the bottom to load more tweet,
  // the same as new tweets above, because more link brings the older tweets by ajax call
  // so the only possible way I found (if you find better one tell me please)
  // is to bind a live hover event on the new tweets to insert reply_to_all tag
  // then call die() on the tweet after inserting the tag for performance
  $('.hentry.status').live('mouseover', function() {
    if (!$(this).find('.reply_to_all').exists() && !$(this).hasClass('mine')) {
      var id = '#' + $(this).attr('id');
      replyToAllHtml(id);
    }
  });
}


// Add event listener!
window.addEventListener('load', init, false);