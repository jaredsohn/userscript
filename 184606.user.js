// ==UserScript==
// @name        LDO comments
// @namespace   nooooord
// @description Adds comments functionality to LDO translate system
// @require     http://scripts.1dea.ru/cdn/jquery/jquery-1.10.2.min.js
// @require     http://scripts.1dea.ru/cdn/jqueryui/jquery-ui.min.js
// @require     http://scripts.1dea.ru/cdn/jquery.cookie/jquery.cookie.js
// @require     http://scripts.1dea.ru/cdn/jquery.colorbox/jquery.colorbox-min.js
// @require     http://scripts.1dea.ru/cdn/md5/md5-min.js
// @resource    uicss http://scripts.1dea.ru/cdn/jqueryui/jquery-ui.css
// @resource    cbcss http://scripts.1dea.ru/cdn/jquery.colorbox/jquery.colorbox.css
// @resource    adcss http://scripts.1dea.ru/userscripts/ldo/comments/ldo_comments.css
// @include     https://localize.drupal.org/translate/*
// @version     v1.3
// @grant       GM_xmlhttpRequest 
// @grant       GM_getResourceText
// @grant       GM_addStyle
// ==/UserScript==

GM_addStyle (GM_getResourceText ("uicss"));
GM_addStyle (GM_getResourceText ("cbcss"));
GM_addStyle (GM_getResourceText ("adcss"));


//==========//
// ON LOAD //
//========//

// open_comments link
$('.l10n-table .source ul.actions').append('<li class="comments"><label title="Comments"></label></li>');
var comments = '<div id="comments" style="height: 400px;" class="dialog"><table></table><textarea></textarea></div>';
var login = '<div id="login" class="dialog"><input id="logname" placeholder="login" /><input id="logpass" type="password" placeholder="password" /></div>';
var logged_span = '<span id="logged_as">Logged in as <strong></strong>. <a href="">[Logout]</a></span>';
var replyto_span = '<span id="reply_to">reply to #<strong></strong> <a href="">x</a></span>';

// Just lonely lonely variables
sid = 0;
reply_to = 0;

// check login
if ($.cookie('ldo_auth')) {
  var name_pass = $.cookie('ldo_auth').split(',');
  var name = name_pass[0];
  var pass = name_pass[1];
}
  
// comments prefetch
var tr = $('.l10n-table tr');
for (i=1; i<tr.length; i++) {
  var prefetch_sid = $(tr[i]).find('td.sid a.active').attr('href').split('sid=')[1];
  GM_xmlhttpRequest({
    method : 'GET',
    url    : 'http://scripts.1dea.ru/userscripts/ldo/comments/get.php?act=pref&pref=' + prefetch_sid + '&tr=' + i,
    onload : function(resp) {
      var data = resp.responseText;
      var data_arr = data.split('=>');
      var li_comments = $('tr:eq(' + data_arr[0] + ')').find('li.comments');
      if ($(data_arr[1]).text() == '') li_comments.css('opacity', '0.4');
      li_comments.after(data_arr[1]);
    }
  });
}

//============//
// FUNCTIONS //
//==========//

// INSERT MESSAGES INTO TABLE
function insert_messages(sid_num) {
  GM_xmlhttpRequest({
    method : 'GET',
    url    : 'http://scripts.1dea.ru/userscripts/ldo/comments/get.php?act=read&sid=' + sid_num,
    onload : function(resp) {
      var data = resp.responseText;
      $('#comments table').html(data);
      $('#comments').scrollTop(10000).dialog('option', 'position', {my: 'center', at: 'center', of: window});
      $('.colorbox').colorbox({
        transition : 'none',
        maxWidth   : 900,
        maxHeight  : 650,
        opacity    : 0.3,
        fadeOut    : 50,
        title      : function() {
          var url = $(this).attr('href');
          return '<a href="' + url + '" target="_blank">Open in new window</a>';
        }
      });
    }
  });
}

// COMMENTS COUNT
function refresh_comments_count(this_sid) {
  GM_xmlhttpRequest({
    method : 'GET',
    url    : 'http://scripts.1dea.ru/userscripts/ldo/comments/get.php?act=pref&pref=' + this_sid + '&tr=0',
    onload : function(resp) {
      var data = resp.responseText;
      var new_count = $(data.split('=>')[1]).text();
      if (new_count == '(1)') $('tr.current li.comments').css('opacity', '1');
      $('tr.current li.count').text(new_count);
    }
  });
}


//==========//
// BUTTONS //
//========//

// POST BUTTON
var button_comment = {
  text  : 'Add comment',
  click : function() {
    var comment = $('#comments textarea').val();
    if (comment.length) {
      GM_xmlhttpRequest({
        method: 'POST',
        data: 'sid=' + sid + '&name=' + name + '&pass=' + pass + '&comment=' + encodeURIComponent(comment) + '&rto=' + reply_to + '&act=post',
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        url: 'http://scripts.1dea.ru/userscripts/ldo/comments/get.php',
        onload: function(post_resp) {
          if (post_resp.responseText == 'success') {
            insert_messages(sid);
            $('#comments textarea').val('');
            var current_count = $('tr.current li.count').text().replace(/\D/g, '') * 1 + 1;
            $('tr.current li.count').text('(' + current_count + ')');
            $('#reply_to').hide();
            reply_to = 0;
          } else {
            alert(post_resp.responseText);
          }
        }
      });
    } else {
      $('#comments textarea').focus();
    }
  }
};
  
// LOGIN BUTTON
var button_login = {
  text  : 'Log in',
  class : 'login',
  click : function() {
    if (!$('#login').length) $('body').append(login);
    $('#login').dialog({
      title     : 'Enter stuff',
      width     : 188,
      minHeight : 55,
      resizable : false,
      buttons   : [button_login_ok]
    });
  }
};

// LOGIN_OK BUTTON
var button_login_ok = {
  text  : 'OK',
  click : function() {
    var login_name = $('#logname').val();
    var login_pass = hex_md5($('#logpass').val());
    GM_xmlhttpRequest({
      method : 'GET',
      url    : 'http://scripts.1dea.ru/userscripts/ldo/comments/get.php?act=auth&name=' + login_name + '&pass=' + login_pass,
      onload : function(resp) {
        if (resp.responseText == '1') {
          $('#comments').dialog('option', 'buttons', [button_comment]);
          if (!$('#logged_as').length)
            $('#comments textarea').before(logged_span).prev().find('strong').text(login_name).closest('#comments').scrollTop(100000);
          $.cookie('ldo_auth', [login_name, login_pass]);
          name = login_name;
          pass = login_pass;
        } else {
          $('#logged_as').remove();
          $('.ui-dialog .login .ui-button-text').text('Fail! Try again?');
        }
      }
    });
    $(this).dialog('close');
  }
}

// EDIT_SAVE BUTTON
var button_save = {
  text  : 'Save',
  click : function() {
    var comment = $('#comments textarea').val();
    if (comment.length) {
      GM_xmlhttpRequest({
        method: 'POST',
        data: 'id=' + id + '&name=' + name + '&pass=' + pass + '&comment=' + encodeURIComponent(comment) + '&act=edit',
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        url: 'http://scripts.1dea.ru/userscripts/ldo/comments/get.php',
        onload: function(post_resp) {
          if (post_resp.responseText == 'success') {
            insert_messages(sid);
            $('#comments textarea').removeClass('edit').val('');
            $('#comments').dialog('option', 'buttons', [button_comment]);
          } else {
            alert(post_resp.responseText);
          }
        }
      });
    } else {
      $('#comments textarea').focus();
    }
  }
};

// EDIT_CANCEL BUTTON
var button_cancel = {
  text  : 'Cancel',
  click : function() {
    $('#comments textarea').removeClass('edit').val('');
    $('#comments').dialog('option', 'buttons', [button_comment]);
  }
};


//===========//
// HANDLERS //
//=========//

$(document)

// COMMENTS ICON
.on('click', 'li.comments label', function() {
  // Check tr as current
  $('.l10n-table tr').removeClass('current');
  $(this).closest('tr').addClass('current');
  
  // Destroy dialog window for new SID click
  var new_sid = $(this).closest('td').prev().find('a.active').attr('href').split('sid=')[1];
  if (sid != new_sid) $('#comments').remove();
  sid = new_sid;
  
  // Open dialog
  if (!$('#comments').length) $('body').append(comments);
  $('#comments').dialog({
    title     : 'Comments related to SID: ' + sid,
    width     : 600,
    minWidth  : 600,
    minHeight : 200,
    maxHeight : 600,
    close     : function() {
      $('#comments textarea').css('height', '20').removeClass('edit').val('');
      $('#comments').dialog('option', 'buttons', []);
      refresh_comments_count(sid);
    }
  }).scrollTop(100000);
  
  // check login and show buttons
  var auth = $.cookie('ldo_auth');
  if (auth && auth.length) {
    name = auth.split(',')[0];
    pass = auth.split(',')[1];
    if (!$('#logged_as').length)
      $('#comments textarea').before(logged_span).prev().find('strong').text(name).closest('#comments').scrollTop(100000);
    var buttons = [button_comment];
  } else {
    var buttons = [button_login];
  }
  $('#comments').dialog('option', 'buttons', buttons);
  insert_messages(sid);
})

// TEXTAREA
.on('click', '#comments textarea', function() {
  if ($(this).height() < 35) $(this).height(35);
  $('#comments').scrollTop(100000);
})

// NAME IN LOG
.on('click', '.timeby strong', function() {
  var ins_name = '<strong>' + $(this).text() + '</strong>, ';
  var textarea = $('#comments textarea');
  textarea.val(textarea.val() + ins_name);
})

// CHANGE TEXTAREA CONTENT
.on('change', '#comments textarea', function() {
  $(this).height($(this)[0].scrollHeight);
})

// HOVER ON TR
.on({
  mouseenter: function () {
    if ($.cookie('ldo_auth')) {
      if ($(this).find('.timeby strong').text() == name)
        $(this).find('.author_links').show();
      else
        $(this).find('.mate_links').show();
    }
  },
  mouseleave: function () {
    $(this).find('.links_line div').hide();
  }
}, '#comments tr')

// EDIT LINK
.on('click', '.author_links .edit', function() {
  $('#comments tr').removeClass('current_edit');
  $(this).closest('tr').addClass('current_edit');
  id = $('tr.current_edit .anchor a').attr('href').split('&id=')[1];
  $('#comments textarea').addClass('edit').val($('tr.current_edit .comment-source').html())
    .height($('#comments textarea')[0].scrollHeight);
  $('#comments').dialog('option', 'buttons', [button_save, button_cancel]).scrollTop(100000);
  return false;
})

// DELETE LINK
.on('click', '.author_links .delete', function() {
  var this_tr = $(this).closest('tr');
  var this_id = this_tr.find('.anchor a').attr('href').split('&id=')[1];
  GM_xmlhttpRequest({
    method : 'GET',
    url    : 'http://scripts.1dea.ru/userscripts/ldo/comments/get.php?act=del&name=' + name + '&pass=' + pass + '&id=' + this_id,
    onload : function(resp) {
      if (resp.responseText == 'success') {
        this_tr.addClass('deleted');
        var current_count = $('tr.current li.count').text().replace(/\D/g, '') * 1 - 1;
        $('tr.current li.count').text('(' + current_count + ')');
      } else {
        alert(resp.responseText);
      }
    }
  });
  return false;
})

// UNDELETE LINK
.on('click', '.author_links .undelete', function() {
  var this_tr = $(this).closest('tr');
  var this_id = this_tr.find('.anchor a').attr('href').split('&id=')[1];
  GM_xmlhttpRequest({
    method : 'GET',
    url    : 'http://scripts.1dea.ru/userscripts/ldo/comments/get.php?act=udel&name=' + name + '&pass=' + pass + '&id=' + this_id,
    onload : function(resp) {
      if (resp.responseText == 'success') {
        this_tr.removeClass('deleted');
        var current_count = $('tr.current li.count').text().replace(/\D/g, '') * 1 + 1;
        $('tr.current li.count').text('(' + current_count + ')');
      } else {
        alert(resp.responseText);
      }
    }
  });
  return false;
})

// REPLY LINK
.on('click', '.mate_links .reply', function() {
  reply_to = $(this).closest('tr').find('.anchor a').attr('href').split('&id=')[1];
  $('#reply_to').remove();
  $('#comments textarea').before(replyto_span).focus().parent().scrollTop(100000);
  $('#reply_to strong').text(reply_to).parent().show();
  return false;
})

// GO2REPLY LINK
.on('click', '.go2reply, .goquote', function() {
  var item = $($(this).attr('href'));
  var comments = $('#comments');
  var total_offset = item.offset().top + comments.scrollTop() - comments.offset().top - 20;
  comments.animate({
    scrollTop: total_offset
  }, 400, function() {
    item.closest('tr').effect('highlight', 2000);
  });
  return false;
})

// QUOTE LINK
.on('click', '.links_line .quote', function() {
  var selected = window.getSelection();
  var this_tr = $(this).closest('tr');
  var this_id = this_tr.find('.anchor a').attr('href').split('&id=')[1];
  var this_name = this_tr.find('.timeby strong').text();
  if (selected != '') {
    select_id = $(selected.anchorNode).closest('tr').find('.anchor a').attr('href').split('&id=')[1];
    if (select_id != this_id)
      selected = this_tr.find('.comment-source').html();
    else
      selected = selected.toString();
  } else {
    selected = this_tr.find('.comment-source').html();
  }
  selected = selected.replace(/\[q=\d*(=.*)?\][^\]]*\[\/q\]/gi, ''); // delete old quotes
  var current_val = $('#comments textarea').val();
  $('#comments textarea').val(current_val + '[q=' + this_id + '=' + this_name + ']' + selected + '[/q]')
    .focus().height($('#comments textarea')[0].scrollHeight).parent().scrollTop(100000);
  return false;
})

// X ON REPLY_TO
.on('click', '#reply_to a', function() {
  reply_to = 0;
  $('#reply_to').hide();
  return false;
})

// LOGOUT LINK
.on('click', '#logged_as a', function() {
  $.removeCookie('ldo_auth');
  pass = name = '';
  $('#comments').dialog('close');
  $('#logged_as').remove();
  return false;
});

