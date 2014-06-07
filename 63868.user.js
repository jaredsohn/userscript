// ==UserScript==
// @name           Quiqi
// @author         Zach Dwiel
// @namespace      http://quiqi.org
// @description    Insert answers to google searches
// @include        http://www.google.com/search?*
// @include        http://www.google.com/#hl=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var url = document.location.href;
var begin = url.indexOf('q=');
var end = url.indexOf('&', begin);
var fromsave = false;
var query = '';
// var query;
// if(end == -1) {
//  query = url.substring(begin+2);
// } else {
//  query = url.substring(begin+2, end);
// }
// query = query.replace(/%22/g, "%5C%22").replace(/%27/g, "%5C%27");

$.post = function(url, options, fn) {
  GM_xmlhttpRequest({
    method: 'POST',
    url: url,
    headers: {
      'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
      'Content-type' : 'application/x-www-form-urlencoded',
    },
    data:$.param(options),
    onload: function(responseDetails) {
      fn(responseDetails.responseText);
    }
  });
}

function safe(s) {
  return s.replace(/</g,'&#60;').replace(/>/g,'&#62;').replace(/\n/g,'<br>');
}
function unsafe(s) {
    return s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/<br>/g, '\n');
}

function save() {
  var q = $('input[name="q"]').val();
  var a = $('#ai').val();
  $.post('http://quiqi.org/post.php',
    {q:q, a:a}, function (data) {
      $('#google_answers_form').hide();
      if(data == "please login first") {
        $('#msg').html('please login first');
        $('#login').slideDown();
      }
    }
  );
  $('#answer').html(safe(a)).show();
  fromsave = true;
}


toggle_add_answer = function() {
  $('#google_answers_form').toggle();
  $('#answer').toggle();
  $('#ai').val(
    unsafe($('#answer').html())
  );
}

function login() {
  $.post('http://quiqi.org/login_submit.php', {username: $('#username').val(), password: $('#password').val()}, function (data) {
    if(data == "logged in") {
      $('#login').hide();
      $('#msg').html('logged in');
      setTimeout("$('#msg').fadeOut()", 3000);
      if(fromsave) {
        save();
        fromsave = false;
      }
    } else {
      alert(data);
    }
  });
}
function register() {
  $.post('http://quiqi.org/register_submit.php', {username: $('#username').val(), password: $('#password').val()}, function (data) {
    if(data == "registration complete") {
      $('#login').hide();
      $('#msg').html('registered');
      setTimeout("$('#msg').fadeOut()", 3000);
      if(fromsave) {
        save();
        fromsave = false;
      }
    } else {
      alert(data);
    }
  });
}
function cancel_login() {
  $('#login').slideUp();
  $('#msg').fadeOut();
  $('#answer').show();
  fromsave = false;
}

function nop() {}

$(function() {
  query = $('input[name="q"]').val();
  
  GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://quiqi.org/q/'+query,
    headers: {
      'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
    },
    onload: function(responseDetails) {
      answer = safe(responseDetails.responseText);
      answer_html = '<div id="answer" style="margin-left:1em;">'+answer+'</div>';
      $('#ssb').after(answer_html);
      $('#ai').html(answer);
    },
  });

  form = '<form action="javascript:save()" method="post" id="google_answers_form">' +
            '<input type="text" name="content" size="60" id="ai"/>' +   
            '<a id="add"><b>add</b></a>' + 
          '</form>' +
          '<div id="msg"></div>' +
          '<div id="login">' +
            'username: <input type="text" name="username" id="username"/><br/>' +
            'password: <input type="password" name="password" id="password"/><br/>' +
            '<a href="javascript:nop()" id="alogin">login</a> ' +
            '<a href="javascript:nop()" id="acancel_login">cancel</a> ' +
            '<a href="javascript:nop()" id="aregister">register</a>' +
          '</div>';
  $('#ssb').after(form);
  $('#add').click(save);
  $('#acancel_login').click(cancel_login);
  $('#alogin').click(login);
  $('#aregister').click(register);
  $('#google_answers_form').hide();
  $('#login').hide();
  
  $('#prs').after('<div id="ans" style="color:#DDD"><b>answer</b></div>');
  $('#ans').click(toggle_add_answer);
});
