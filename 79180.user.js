// ==UserScript==
// @name           4chan
// @namespace      4chan
// @description    4chan
// @include        http://sys.4chan.org/*/post*
// @include        http://boards.4chan.org/*
// ==/UserScript==

/* TODO:
 * move post box to top right corner and make it visible on hover
 * set up post templates
 * main forum page:
 *  - wrap each thread in its own div
 *  - remove spam threads
 *  - check for 404s and get more threads every xx seconds
 */


var head = document.getElementsByTagName('head')[0];

var scripts = [
  'http://code.jquery.com/jquery-1.4.3.min.js',
  'https://gist.github.com/raw/741639/5357c0ec8ac15acf8ea468bf7406ee922b598bbc/jquery.form.js'
];
for (var i in scripts) {
  var script = document.createElement('script');
  script.src = scripts[i];
  head.appendChild(script);
}

var style = document.createElement('style');
style.appendChild(document.createTextNode([
  'span.replyhl blockquote {',
    'background-color: #F0C0B0;',
  '}',
  '.img-popup {',
    'position: absolute;',
    'border: 2px solid #D9BFB7;',
    'padding: 2px;',
    'background-color: white;',
    'cursor: pointer;',
    'z-index: 1000',
  '}',
  '.quote-wrapper {',
    'display: none;',
    'position: absolute;',
    'padding: 0;',
  '}',
  '.quote-wrapper .reply {',
    'background-color: white;',
    'margin: 0;',
    'border: 2px solid #D9BFB7;',
    'min-width: 340px;',
  '}',
  '.grippie {',
    'text-align: center;',
    'cursor: ns-resize;',
    'font-size: 9px;',
    'border: 1px solid #aaa;',
    'border-width: 0 1px 1px;',
  '}',
  '.inputtext:focus + .grippie {',
    'border-color: #ea8;',
  '}',
  'textarea.dragging {',
    'color: #aaa;',
    'background-color: #eee',
  '}'
].join('\n')));
head.appendChild(style);




window.addEventListener('load', function() {


// Problem, greasemonkey?  Problem, security experts?
unsafeWindow.gmOp = '';
unsafeWindow.gmKey = '';
unsafeWindow.gmValue = '';
unsafeWindow.gmCallback = '';
setInterval(function() {
  if(unsafeWindow.gmOp) {
    switch(unsafeWindow.gmOp) {
      case 'set':
        GM_setValue(unsafeWindow.gmKey, unsafeWindow.gmValue);
        break;
      case 'get':
        var v = GM_getValue(unsafeWindow.gmKey, '');
        unsafeWindow.gmCallback(v);
        break;
      case 'delete':
        GM_deleteValue(unsafeWindow.gmKey);
        break;
    }
    unsafeWindow.gmOp = '';
  }
}, 50);


var script = document.createElement('script');
script.appendChild(document.createTextNode('(' + (function() {
(function($) {

/// Begin main code


// Problem?
function gm_setValue(k, v) {
  window.gmKey = k;
  window.gmValue = v;
  window.gmOp = 'set';
}
function gm_getValue(k, cb) {
  window.gmKey = k;
  window.gmCallback = cb;
  window.gmOp = 'get';
}
function gm_deleteValue(k) {
  window.gmKey = k;
  window.gmOp = 'delete';
}


/*
  jQuery TextAreaResizer plugin
  Created on 17th January 2008 by Ryan O'Dell
  Modified by this motherfucker right here
  Version 1.0.4

  Converted from Drupal -> textarea.js
  Found source: http://plugins.jquery.com/misc/textarea.js
  $Id: textarea.js,v 1.11.2.1 2007/04/18 02:41:19 drumm Exp $

  1.0.1 Updates to missing global 'var', added extra global variables,
        fixed multiple instances, improved iFrame support
  1.0.2 Updates according to textarea.focus
  1.0.3 Further updates including removing the textarea.focus and
        moving private variables to top
  1.0.4 Re-instated the blur/focus events, according to information
        supplied by dec
*/
(function($) {
  var textarea, staticOffset;
  var iLastMousePos = 0;
  var iMin = 32;
  var grip;
  /* TextAreaResizer plugin */
  $.fn.TextAreaResizer = function() {
    return this.each(function() {
      textarea = $(this).addClass('processed'), staticOffset = null;

      /* 18-01-08 jQuery bind to pass data element rather than direct
       * mousedown - Ryan O'Dell
       *
       * When wrapping the text area, work around an IE margin bug.
       * See http://jaspan.com/ie-inherited-margin-bug-form-elements-and-haslayout
       */
      $(this).wrap('<div class="resizable-textarea"><span></span></div>')
      .parent().append($('<div class="grippie">====</div>')
      .bind("mousedown",{el: this} , startDrag));

      var grippie = $('div.grippie', $(this).parent())[0];
      grippie.style.width = $(this)[0].offsetWidth - 3 + 'px'; // JCN
    });
  };
  /* private functions */
  function startDrag(e) {
    textarea = $(e.data.el);
    textarea.blur();
    iLastMousePos = mousePosition(e).y;
    staticOffset = textarea.height() - iLastMousePos;
    textarea.addClass('dragging'); // JCN
    $(document).mousemove(performDrag).mouseup(endDrag);
    return false;
  }

  function performDrag(e) {
    var iThisMousePos = mousePosition(e).y;
    var iMousePos = staticOffset + iThisMousePos;
    if (iLastMousePos >= (iThisMousePos)) {
      iMousePos -= 5;
    }
    iLastMousePos = iThisMousePos;
    iMousePos = Math.max(iMin, iMousePos);
    textarea.height(iMousePos + 'px');
    if (iMousePos < iMin) {
      endDrag(e);
    }
    return false;
  }

  function endDrag(e) {
    $(document).unbind('mousemove', performDrag).unbind('mouseup', endDrag);
    textarea.removeClass('dragging'); // JCN
    textarea.focus();
    textarea = null;
    staticOffset = null;
    iLastMousePos = 0;
  }

  function mousePosition(e) {
    return {
      x: e.clientX + document.documentElement.scrollLeft,
      y: e.clientY + document.documentElement.scrollTop
    };
  }
})(jQuery);

jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};

//} end helper functions


//{ custom jQuery plugins

$.fn.hrefForImage = function() {
  /* If you control a server, pointing to the following PHP script
   * will ensure that you can see images even after the thread dies:
<?php
set_time_limit(0);
$url = explode(basename($_SERVER['SCRIPT_FILENAME']) . '/', $_SERVER['REQUEST_URI']);
$url = $url[1];
if(!preg_match('@^http://images\.4chan\.org/[a-z0-9]+/src/\d+\.(gif|jpe?g|png)$@i', $url)) die('bad URL');
$filename = explode('/', $url);
$filename = $filename[count($filename)-1];
$filename_parts = explode('.', $filename);
$dirname = date('Y-m-d', $filename_parts[0] / 1000);
$filename = "$dirname/$filename";
$mime_type = $filename_parts[count($filename_parts)-1];
$mime_type = 'image/' + str_replace('jpg', 'jpeg', strtolower($mime_type));
if(!file_exists($filename)) {
  if(!is_dir($dirname) && !mkdir($dirname, 0755)) die('mkdir failed');
  $tmp = tempnam(sys_get_temp_dir(), '4ch');
  $data = file_get_contents($url);
  if(!$data) die('file_get_contents failed');
  if(!file_put_contents($tmp, $data)) die('file_put_contents failed');
  if(!rename($tmp, $filename)) die('rename failed');
  chmod($filename, 0644);
}
header("Content-type: $mime_type");
die(file_get_contents($filename));
?>
  */

  // return 'http://localhost/4chan/image.php/' + this.attr('href');
  return this.attr('href');
}

$.fn.preloadHref = function() {
  this.each(function() {
    if(!$(this).attr('hrefChanged')) {
      $(this).attr({
        href: $(this).hrefForImage(),
        hrefChanged: true
      });
    }

    $(new Image()).attr('src', $(this).attr('href'));
  });
}

//}


//{ global functions

function movePostForm() {
  // move form to end of thread
  $('body>table').attr('id', 'posting-mode');
  $('div.postarea').css({
    paddingLeft: 0,
    textAlign: 'left',
    clear: 'both'
  }).attr('id', 'post-area');

  //$('#posting-mode, #post-div').appendTo($('#post-area'));
  // can't move recaptcha? alright we'll move stuff around it
  $('form[name=delform]').insertAfter('div.logo');
  $('span[style^=left]:last ~ *').appendTo('body');
  $('#footer').appendTo('body');
  $('span[style^=left]').insertAfter('div.logo').css({
    position: '',
    display: 'block',
    margin: '2px 0 8px 0'
  }).last().remove();

  $('form[name=delform] table[align=right]').attr('id', 'delform-container');
  $('form[name=delform] table').not('#delform-container').last().attr('id', 'last-post');
  $('#last-post ~ br, hr[width=90%]').remove();

  $('#post-area form').attr('id', 'post-form');
  $('#last-post').next('hr').attr('id', 'end-thread');
  var $br;
  while(($br = $('#posting-mode + br')).length) $br.remove();

  $('#post-form input[type=submit]').after('<span id="post-status">&nbsp;</span>');
  $('#post-status').css({
    width: '100px',
    paddingLeft: '5px'
  });

  $('#post-form table tr:has(td.rules)').remove();

  $('#recaptcha_area').each(function() {
    $(this).css('position', 'relative').append('<button type="button" id="recaptcha-refresh-big" />');
    $('#recaptcha-refresh-big').html('FUCKING BIG RECAPTCHA REFRESH BUTTON')
    .css({
      position: 'absolute',
      left: '450px',
      top: '30px',
      width: '150px',
      height: '100px'
    }).click(function() {
      if(Recaptcha && Recaptcha.reload) {
        Recaptcha.reload();
      }
    });
  });
}

function removeAds() {
  // remove ads and other bullshit
  $('center:has(font[color=red]>b)').remove();
  $('div>a>img, center>a>img').closest('div, center').remove();
  $('br:first, img', 'div.logo').remove();
  $('hr + hr, hr + script + hr').not('#end-thread').remove();
}

function clearForm() {
  $('.inputtext, input[type=file]', '#post-form').not('[name=pwd]').attr('value', '');
}

function clickImgLink(e) {
  if(e && e.button) {
    return true;
  }

  if(!$(this).prev('.img-popup').length) {
    $(this).before([
      '<div class="img-popup">',
        '<img src="' + $(this).attr('href') + '">',
      '</div>'
    ].join(''));
    $(this).prev('.img-popup').click(function(e) {
      if(e && e.shiftKey) {
        window.open($(this).children('img').attr('src'), 'img' + new Date().getTime());
      } else {
        var offset = $(this).parents('.reply, .first-post').not('[id=]').offset().top - 2;
        if(document.body.scrollTop > offset) {
          document.body.scrollTop = offset;
        }
        $(this).hide();
      }
    }).find('img').load(function() {
      $(this).css('maxWidth', $(window).width() - 100 + 'px');
    });
  }
  $(this).prev('.img-popup').show();
  return false;
}

var postPrefsKey = new Date().getTime();
var postedSecsAgo = 0;
var postedSecsAgoMax = 60;
var postedSecsAgoInterval;

function updatePostedSecsAgo() {
  if(++postedSecsAgo > postedSecsAgoMax) {
    $('#posted-secs-ago').prepend('>');
    window.clearInterval(postedSecsAgoInterval);
    postedSecsAgo = 0;
  } else {
    $('#posted-secs-ago').html(postedSecsAgo);
  }
}

function ajaxifyPostForm(key, cbDone, cbBefore) {
  var success = function(d) {
    var result = $.trim($(d).find('td b').text()).replace(/Return$/, '');
    var ok = /(uploaded|successful)!$/.test(result);

    $('#post-status').html('<span id="posted-secs-ago">0</span>s ago: ' + result);
    postedSecsAgo = 0;
    window.clearInterval(postedSecsAgoInterval);
    postedSecsAgoInterval = window.setInterval(updatePostedSecsAgo, 1000);
    if(ok && $('#clear-after-post:checked').length) {
      clearForm();
    }
    if(typeof cbDone == 'function') {
      var matches = d.match(/thread:([0-9]+),no:([0-9]+)/);
      cbDone(ok && matches.length >= 3 ? parseInt(matches[2]) : 0);
    }
  };

  $('#post-form').each(function() {
    $(this).attr('action', $(this).attr('action') + '?gm_4chan_' + key + '=' + postPrefsKey);
  }).ajaxForm({
    beforeSubmit: function() {
      var ok = true;
      $('#recaptcha_response_field').each(function() {
        ok = !!$(this).val();
      });
      if(!ok) {
        $('#com_submit').val('(Fill out the recaptcha first)');
        window.setTimeout(function() {
          $('#com_submit').val('Submit');
        }, 2000);
        return false;
      }

      window.clearInterval(postedSecsAgoInterval);
      $('#post-status').html('Posting...');
      if(typeof cbBefore == 'function') {
        var b = cbBefore();
        if(b !== undefined && !b) {
          return false;
        }
      }
      var interval = window.setInterval(function() {
        gm_getValue(postPrefsKey, function(v) {
          if(v) {
            window.clearInterval(interval);
            window.setTimeout(function() {
              gm_deleteValue(postPrefsKey);
            }, 50);
            $('iframe').remove();
            success(v);
            if(Recaptcha && Recaptcha.reload) {
              Recaptcha.reload();
            }
          }
        });
      }, 250);
      return true;
    },
    success: function() {
      alert("This shit doesn't work!");
    }
  });
}

function addPostFormControls() {
  $('#post-form>table tr:eq(2)').after([
    '<tr><td></td><td class="postblock" align="left"><b>Controls</b></td>',
    '<td>',
      '<input type="checkbox" id="clear-after-post" checked="checked" />',
      '<label for="clear-after-post">clear after post</label>',
      ' | <a href="#" id="clear-now">clear now</a>',
      ' | <a href="#" id="clear-file">clear file only</a>',
    '</td></tr>'
  ].join(''));

  if(!$.browser.msie) {
    $('input[type=password]').each(function() {
      this.type = 'text';
    });
  }

  $('textarea').TextAreaResizer();

  // Setup

  clearForm();
  $('#clear-now').click(function() {
    clearForm();
    return false;
  });

  $('#clear-file').click(function() {
    $('input[name=upfile]').attr('value', '');
    return false;
  });
}

//}


/// begin 4chan enhancement code for threads

function processThread() {
  //$.noConflict();
  //$.fn.ajaxSubmit.debug = true;

  window.replyhl = function() {};

  var autoRefresh = 0;
  var num = {posts: 0, images: 0};

  function refresh(isAuto) {
    if(isAuto && !$('#auto-refresh').is(':checked')) {
      return;
    }

    function renewAutoRefresh() {
      //if(isAuto && $('#auto-refresh').is(':checked')) { // ??
      if($('#auto-refresh').is(':checked')) {
        window.clearTimeout(autoRefresh);
        autoRefresh = window.setTimeout(function() {
          refresh(true);
        }, 1000 * (parseInt($('#refresh-interval').attr('value')) || 10));
      }
    }

    $('#refresh').html('Refreshing...');
    $.ajax({
      url: document.location.href,
      success: function(html) {
        $('#refresh').html('Refresh');
        var $h = $(html);
        if($h.find('#bd .boxcontent img[alt=404]').length) {
          addContent(404);
          return;
        }
        var $content;
        $h.find('table:has(td.reply)').each(function() {
          if(!$('#' + $(this).find('td.reply').attr('id')).length) {
            var $a = $(this).prev('a');
            $content ? $content.append($a) : $content = $($a);
            $content.append(this);
          }
        });
        if($content) {
          addContent($content);
        }
        delete $h;

        renewAutoRefresh();
        if(!isAuto && !$content) {
          addContent(304);
        }
      }, error: function(xhr, status) {
        $('#refresh').html('Refresh');
        if(status == 'notmodified' || xhr.status == 304) {
          renewAutoRefresh();
          addContent(304);
        } else if(xhr.status == 404) {
          addContent(404);
        } else {
          renewAutoRefresh();
          addContent($('<span class="refresh-error">Error: status=' + status + ' code=' + xhr.status + '</span>'));
        }
      }
    });
  }

  function addContent($content) {
    var newPosts = false;
    if($content === 404) {
      var title404 = '[404] ';
      if(document.title.substr(0, title404.length) != title404) {
        document.title = title404 + document.title;
      }
      $content = $('<span class="thread-404">Baww (404)</span>');
    } else if($content === 304) {
      $content = $('<span>No new posts</span>');
    } else {
      newPosts = true;
    }
    var $div = $('<span class="ajax-refresh">');
    if(num.posts > 2) {
      $div.append('<hr>');
    }
    $div.append($content);
    $('#end-thread').before($div);
    if(newPosts) {
      processPosts($div);
    }
  }

  function processPosts(el) {
    $('.reply, .first-post', el).each(function() {
      num.posts++;
      if($('img', this).length) {
        num.images++;
      }
    });
    for(var k in num) {
      $('#num-' + k).html(num[k]);
      $('#num-' + k + '-s').html(num[k] == 1 ? '' : 's');
    }

    $('span[id^=no] a.quotejs:first-child', el).each(function() {
      $(this).next('a').css({
        paddingLeft: '4px',
        color: '#f00'
      }).html('[' + $(this).attr('href').split('#')[1] + ']');
    });

    var $links = $('a[target=_blank]:has(img)', el);
    $links.addClass('clickable-img-link');
    if($('#preload-images').is(':checked')) {
      $links.preloadHref();
    }
  }

  $(function() {
    if($('#bd .boxcontent img[alt=404]').length) {
      return;
    }

    movePostForm();
    addPostFormControls();

    removeAds();

    ajaxifyPostForm('reply', function(ok) {
      var auto = $('#auto-refresh').is(':checked');
      if(ok || auto) {
        window.clearTimeout(autoRefresh);
        autoRefresh = window.setTimeout(function() {
          refresh(auto);
        }, 900);
      }
    }, function() {
      window.clearTimeout(autoRefresh);
    });

    // Wrap first post in a tag
    var firstPostId = $('span[id^=nothread]').attr('id').replace(/nothread/, '');
    $('form[name=delform]').prepend('<span id="' + firstPostId + '" class="first-post">');
    var $fp = $('span.first-post');
    while(!$fp.next().appendTo($fp).is('blockquote'));
    $fp.find('span.filetitle').append(' ');
    var text = $.trim($('form[name=delform]').text().split('>>')[0].split('\n\n\nPosting mode: Reply')[0]).split('\n');
    $fp.find('span.postername').after(text[text.length-1] + ' ');

    // Set page title based on first post
    var subj = $.trim($fp.find('span.filetitle').text());
    var name = $.trim($fp.find('span.postername').text());
    var title = document.location.href.match(/boards\.4chan\.org(\/[a-z0-9]+\/)/);
    title = (title.length > 1 ? title[1] + ' - ' : '');
    if(subj) title += '[' + subj + '] ';
    if(name && name != 'Anonymous') title += name + ' - ';
    var $tdiv = $('<div>');
    $tdiv.html($('.first-post blockquote').html().replace(/<br>/g, '&nbsp;&nbsp;'));
    document.title = title + $tdiv.text();

    // Improve clicking on quote links (don't change URL, etc.)
    $('a.quotelink').attr('onclick', '').live('click', function(e) {
      if(e && e.button) {
        return true;
      }

      $('.replyhl').removeClass('replyhl');
      var $td = $($(this).attr('href').replace(/^.*#/, '#'));
      if($td.length) {
        document.body.scrollTop = $td.offset().top;
        if($(this).hasClass('nohl')) {
          $(this).parents('.back-link').remove();
        } else {
          $td.addClass('replyhl');
          $td.find('span[id^=no]')
          .find('.back-link').remove().end()
          .append('<span class="back-link"> | <a class="quotelink nohl" href="#' + $(this).parents('.reply').not('[id=]').attr('id') + '">Back to quote</a></span>');
        }
      }// TODO: else external link (open in new tab?)
      return false;
    });

    // Show quoted posts on mouse-over
    $('a.quotelink').live('mouseover', function() {
      if($(this).hasClass('nohl')) {
        return;
      }

      if(!$(this).prev('.quote-wrapper').length) {
        if($(this).siblings('.quotelink').length) {
          $(this).parent().removeClass('unkfunc');
        }
        if(!$(this).parent().is('font.unkfunc')) {
          $(this).wrap('<font class="unkfunc">');
        }

        $(this).before('<div class="quote-wrapper">');

        var $p = $($(this).attr('href').replace(/^.*#/, '#')).clone();
        $p.find('.quote-wrapper, .img-popup').remove();
        if($p.is('.first-post')) {
          $p = $p.wrap('<td class="reply">').parent();
        } else {
          $p.addClass('reply');
        }
        $p.find('*').add($p).attr('id', '');

        var over = function(o) {
          //$(o).siblings('font.unkfunc').children('.quote-wrapper').hide();
          $(o).children('.quote-wrapper').show();
        }

        var parentOffset = $(this).parents('.quote-wrapper').offset();
        $(this).prev('.quote-wrapper').css({
          left: $(this).offset().left
                - (parentOffset ? parentOffset.left : 0)
                + 25 + 'px',
          top: $(this).offset().top + $(this).height()
               - (parentOffset ? parentOffset.top : 0)
               - 3 + 'px'
        }).append($p);

        $(this).parent().hover(function(e) {
          //e.stopPropagation();
          over(this);
        }, function(e) {
          //e.stopPropagation();
          $(this).find('.quote-wrapper, .img-popup').hide();
        });
        over($(this).parent());
      }

    });

    // Add image click-to-load functionality and preload existing images
    $('a.clickable-img-link').live('click', clickImgLink);

    // Add refresh links
    $('#delform-container').after([
      '<div id="refresh-container">',
        '<a href="#" id="refresh">Refresh</a>',
        ' | <span id="num-posts" /> post<span id="num-posts-s" />',
        ' (<span id="num-images" /> image<span id="num-images-s" />)',
        '<br><br>',
        '<input type="checkbox" id="auto-refresh" checked="checked" />',
        '<label for="auto-refresh">auto-refresh every</label> ',
        '<input type="text" id="refresh-interval" value="10" size="2" /> seconds',
        ' | <input type="checkbox" id="preload-images" checked="checked" />',
        '<label for="preload-images">preload images on refresh</label>',
        ' | <a href="#" id="preload-now">preload all images now</a>',
      '</div>'
    ].join(''));

    $('#refresh').click(function() {
      refresh(false);
      return false;
    });

    $('#preload-now').click(function() {
      $('form[name=delform] a[target=_blank]:has(img)').preloadHref();
      return false;
    });

    $('#auto-refresh').click(function() {
      if($(this).is(':checked')) {
        refresh(true);
      } else {
        window.clearTimeout(autoRefresh);
      }
    });
    if($('#auto-refresh').is(':checked')) {
      refresh(true);
    }

    processPosts('body');

  });

}


// helper function
function setValue(type, text) {
  var key = document.location.href.split('gm_4chan_' + type + '=')[1];
  gm_setValue(key, $('body').html());
  //alert('set value for ' + type + key);
}


/// begin 4chan enhancement code for posted replies

function processPostReply() {
  setValue('reply');
}


/// begin 4chan enhancement code for posted threads

function processPostThread() {
  setValue('thread');
}


/// begin 4chan enhancement code for main forum page

function processForumIndex() {
  movePostForm();
  addPostFormControls();
  removeAds();

  ajaxifyPostForm('thread', function(threadid) {
    if(threadid) {
      var url = document.location.href + 'res/' + threadid;
      $('#post-status').append(' (<a href="' + url + '">link to thread</a>)');
      window.open(url, 't' + threadid);
    }
  });
}


/// call a function based on URL

var which = [
  ['boards\\.4chan\\.org/[a-z0-9]+/res/.*', processThread],
  ['sys\\.4chan\\.org/.*/post\\?gm_4chan_reply=', processPostReply],
  ['sys\\.4chan\\.org/.*/post\\?gm_4chan_thread=', processPostThread],
  ['boards\\.4chan\\.org/[a-z0-9]+/[0-9]*$', processForumIndex]
];

for(var i = 0; i < which.length; i++) {
  var w = which[i];
  if(new RegExp(w[0]).test(document.location.href)) {
    w[1]();
    break;
  }
}




})(jQuery);
}).toString() + ')();'));
head.appendChild(script);

}, false);
