// ==UserScript==
// @name        Yahoo Finance Messageboards Total Ignore
// @namespace   yahoo
// @description Yahoo Finance Messageboards Total Ignore: removes ignored users' posts and topics from the messageboards completely. Because of the way Yahoo Finance Messageboards was designed, linked arrows to ignored users' posts cannot be eliminated.
// @include     *finance.yahoo.com/*
// @version     .13
// ==/UserScript==

void function () {
 var stylesheet_new = document.createElement('style')
 document.head.appendChild (stylesheet_new)
 stylesheet_new.sheet.insertRule ('.yom-primary {visibility:hidden !important}', 0)
 setInterval (function () {
  if (document.getElementsByClassName('mb-tab-loading').length == 1) return
  remove_ignored_user_topics_test ()
  remove_ignored_user_posts_test ()
 }, 50)
 
 function remove_ignored_user_topics_test () {
  var message_inner_list = document.getElementsByClassName('mb-iu-msg')
  for (var i = message_inner_list.length - 1; i >= 0; i--) {
   var message_inner = message_inner_list[i]
   if (message_inner.innerHTML == 'Topic hidden because you ignored this user') {
    message_inner.parentNode.parentNode.parentNode.removeChild (message_inner.parentNode.parentNode)
   }
  }
 }
 
 function remove_ignored_user_posts_test () {
  var message_inner_list = document.getElementsByClassName('mb-iu-msg')
  for (var i = message_inner_list.length - 1; i >= 0; i--) {
   var message_inner = message_inner_list[i]
   if (message_inner.innerHTML == 'Post hidden because you ignored this user') {
    var parent_parent = message_inner.parentNode.parentNode
    // Remove or re-count arrows.
    var expand_link_arrows = parent_parent.parentNode.parentNode.getElementsByClassName('mb-reply-arrow')
    if (expand_link_arrows.length != 0) {
     expand_link_arrow = expand_link_arrows[0]
     var expand_link_text  = expand_link_arrow.nextSibling
     var just_one_reply = (expand_link_text.innerHTML.substr(0, 10) == '1 Reply to')
     if (just_one_reply) {expand_link_arrow.parentNode.parentNode.parentNode.removeChild (expand_link_arrow.parentNode.parentNode)}
     var expand_link_text_split_array = expand_link_text.innerHTML.split(' ')
     expand_link_text_split_array[0] = +expand_link_text_split_array[0] - 1
     expand_link_text.innerHTML = expand_link_text_split_array.join(' ')
    }
    parent_parent.parentNode.parentNode.parentNode.removeChild (parent_parent.parentNode.parentNode)
   }
  }
  if (typeof stylesheet_new != "undefined") {document.head.removeChild (stylesheet_new); stylesheet_new = undefined}
 }
} ()