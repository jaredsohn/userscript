// ==UserScript==
// @namespace     tag:edward.grech.name,2007:/dev/greasemonkey
// @name          twitter @reply to a specific message
// @description   Allows “in_reply_to_status_id” and “source” fields to be modified directly.
// @author        Edward Grech | edward@grech.name | http://twitter.com/dwardu
// @date          2009-02-10
// @include       http://twitter.com/*
// @include       http://www.twitter.com/*
// @include       https://twitter.com/*
// @include       https://www.twitter.com/*
// @version       2.0
// ==/UserScript==

(function() {
  var $ = unsafeWindow.$;
  if(!$('textarea#status').length)
    return;
  var twttr = unsafeWindow.twttr;
  $('#source').get(0).setAttribute('type', 'text');
  $('#source').before('<label for="source">Source:</label>');
  $('#in_reply_to_status_id').get(0).setAttribute('type', 'text');
  $('#in_reply_to_status_id').before('<label for="in_reply_to_status_id">In reply to status with ID:</label>');
  $('#update-submit').before('<input type="button" name="update-submit-unchecked" value="update (unchecked)" id="update-submit-unchecked" class="status-btn round-btn"/>')
  $('#update-submit-unchecked').click(function () {
    $.ajax({
      type: "POST",
      dataType: "json",
      url: "/status/update",
      data: {
        authenticity_token: twttr.form_authenticity_token,
        status: $("#status").val(),
        twttr: true,
        in_reply_to_status_id: $("#in_reply_to_status_id").val(),
        source: $("#source").val(),
        return_rendered_status: true
      },
      success: function() {
        location.reload();
      },
      fail: function() {
        location.reload();
      },
      beforeSend: twttr.loading,
      complete: twttr.loaded
    })
  });
})();