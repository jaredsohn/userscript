// ==UserScript==
// @name           Lafa comments
// @namespace      http://userscripts.org/users/zhekanax
// @include        http://lafa.garin.su/post/*
// ==/UserScript==


var comments_image = document.createElement("img");
comments_image.src="data:image/gif;base64,R0lGODlhFAAOAMQAANvk6S6q5/X4+fb4+UZ4mfX4+aTJ4eft8eft8uft8XaXr9rk6W+Trfv9/eHo7eHp7vv8/eft8ujt8e/y9dvj6e/y9tfg5wCHz6zAzn6etRxIaf///////wAAAAAAAAAAACH5BAEAABwALAAAAAAUAA4AAAVoICdyWWkqDDGua7a98IapbBvDmUXX5Bb8l8smg9LwereXBWPkZRqBYNDQgDCPmUFhq+VenRWp1DD51jIJSSSSaLPNrIxDfDE8HPAWYA+gABZ/eSM5FoWGhYIiORiMjY1NNRqSk5SSKyEAOw==";



$ = unsafeWindow.jQuery;
if($) init();


function init() {
  if (!$('#comments').length) return;
  initComments();
  updateCommentButton();
  checkComments();
  window.setInterval(checkComments, 60000);
}

function initComments() {
  if (!getCookie('read_comments')) {
    $('#comments div.blog-post-block').each(function() {
      readComment(String(this.id).replace('comment', ''));
    });
  }
  else {
    $('#comments div.blog-post-block').each(function() {
      var id = String(this.id).replace('comment', '');
      if (!isRead(id, $(this))) {
        $(this).css('background', '#cfc').addClass('unread');
        readComment(id);
      }
    });
  }
}

function updateCommentButton() {
  $('#next-unread').remove();
  var unread_count = $('#comments .unread').length;

  if (!unread_count) return;

  $('<a href="#" id="next-unread"/>').css({
      display: 'block',
      position: 'fixed',
      top: '49%',
      right: '15px',
      cursor: 'pointer',
      'text-align': 'center',
      'text-decoration': 'none'
    })
    .append(comments_image)
    .append('<br/>'+unread_count)
    .click(function() {
      var $next_unread = $('#comments .unread:first');
      window.scrollTo(0, $next_unread.offset().top - 250);
      $next_unread.removeClass('unread').css('background', 'transparent').hide().fadeIn('slow');
      updateCommentButton();
      return false;
    })
    .appendTo('body')
    .hide()
    .fadeIn();
}

function checkComments() {
  GM_xmlhttpRequest({
    method: 'GET',
    url: window.location.href,
    onload: function(r){
      $data = $(r.responseText);
      $data.find('#comments div.blog-post-block').each(function() {
        if (!$('#'+this.id).length) {
          var $this = $(this);
          var $prev = $this.prev();

          if (!isRead(this.id, $this)) {
            $this.css('background', '#cfc').addClass('unread')
          }

          if ($prev.length) {
            $('#'+$prev.attr('id')).after($this);
          }
          else {
            $('#comments').append($this);
          }
          $this.find('a.opin').click(function () { return unsafeWindow.comment_showForm($(this)); }); 

          readComment(String(this.id).replace('comment', ''));
        }
      });
      updateCommentButton();
    }
  });
}


function readComment(id) {
  if (!id) return;
  var data = getCookie('read_comments') ? getCookie('read_comments').split(',') : [];
  data[data.length] = id;
  setCookie('read_comments', data.join(','));
}

function isRead(id, $div) {
  if (!id) return;
  var data = getCookie('read_comments') ? getCookie('read_comments').split(',') : [];
  for (i in data) if (data[i] == id) return true;
  if ($div && $('.head-block h5:first').text() == $div.find('p a').eq(0).text()) return readComment(id) || true;
  return false;
}


function setCookie(name, value) {
  path = String(window.location.href).replace(/^.+garin\.su/,'').replace('//', '/').replace(/#.*$/,'');
  document.cookie = name+"="+value+"; path="+path;
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

