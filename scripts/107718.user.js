// ==UserScript==
// @name            8bc Ajax Like and Comment
// @namespace       http://userscripts.org/scripts/show/107718
// @description     Use the "Like" button and comment on 8bc.org without reloading the page
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js
// @resource unlike http://i895.photobucket.com/albums/ac158/shigekikitajima/btn_unlike.png
// @include         https://8bc.org/music/*
// @include         http://8bc.org/music/*
// @include         https://8bc.org/images/*
// @include         http://8bc.org/images/*
// ==/UserScript==

var ajax_to, flash, like_button, unlike_button;
var comment_form, comment_textarea, comments_wrapper;
var reload_comments, reload_likes, reload_both, reload_timer;

// Get `Like' button
like_button = $('#media_actions .button.like a:first');

// Create `Unlike' button
unlike_button = like_button.clone();
unlike_button.attr('id', 'unlike_button');
$('#media_actions .button.like').after(unlike_button);
$('#unlike_button img:first').attr('src', GM_getResourceURL('unlike'));
unlike_button.attr('href', unlike_button.attr('href').replace(/action=like/gi, 'action=unlike'));

// Create flash area
$('#content .col1').prepend('<div id="ajax_flash"></div>');

// Add notice to top of page
flash = function(s) {
  return $('#ajax_flash').prepend('<p class="success">' + s + '</p>');
};

// Get comment form
comment_form = $('.colleft .col2 form:first');
comment_textarea = $('#comment');

// Get comment wrapper
comments_wrapper = '<span id="comments_wrapper">';
$('.colleft .col2 ul.comments').wrap(comments_wrapper);
$('.colleft .col2 > p:first').wrap(comments_wrapper);

// Get likes wrapper
$('ul.likes').wrap('<span id="likes_wrapper">');

// Get comment count wrapper
$('.colleft .col2 h5:first').wrap('<span id="comment_count_wrapper">');

// Get like count wrapper
$('h5.likes').wrap('<span id="like_count_wrapper">');

// Post a comment
comment_on = function(post_url, text) {
  return $.ajax({
    type: 'POST',
    url: post_url,
    data: { 'comment' : text, 'from' : 'comment' },
    dataType: 'html',
    success: flash('Thanks for your comment.')
  });
}

// Reload comment area
reload_comments = function() {
  $('#comments_wrapper').load(comment_form.attr('action') + ' .colleft .col2 ul.comments');
  $('#comment_count_wrapper').load(comment_form.attr('action') + ' .colleft .col2 h5:first');
  return true;
}

reload_likes = function() {
  $('#likes_wrapper').load(comment_form.attr('action') + ' ul.likes');
  $('#like_count_wrapper').load(comment_form.attr('action') + ' h5.likes');
  return true;
}

reload_both = function() {
  reload_comments();
  /* Disable on firefocks until fix'd
     reload_likes();
   */ 
  return true;
}

// Do liking/unliking in background
ajax_to = function(link_url, str) {
  return $.ajax({
    url: link_url,
    success: flash(str),
  });
};

// Trap click events for like button
like_button.click(function(event) {
  ajax_to($(this).attr('href'), 'Item added to likes.');
  return event.preventDefault();
});

// Trap click events for unlike button
unlike_button.click(function(event) {
  ajax_to($(this).attr('href'), 'Item removed from likes.');
  return event.preventDefault();
});

// Trap form submit for comments
comment_form.submit(function(event) {
  var text = comment_textarea.val();
  var form_url = comment_form.attr('action');
  
  comment_on(form_url, text);
  
  // Reset comment textarea
  comment_textarea.val('');
  return event.preventDefault();
});

// Reload both every 5 seconds
reload_timer = setInterval(reload_both, 5000);

// Lol
if (Math.random() >= 0.75) {
  $('#header h1 a').prepend('xX ');
  $('#titleCollective').text('champion');
  $('#titleCollective').append(' Xx')
}