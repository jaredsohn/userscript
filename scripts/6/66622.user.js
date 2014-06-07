// ==UserScript==
// @name           Facebook chat button
// @namespace      shenstra.com
// @description    Allows you to open a chat with the person whose Facebook profile you're currently viewing. Doesn't work for accounts with registered usernames.
// @include        http://www.facebook.com/*profile.php?id=*
// ==/UserScript==

function openChat(user_id) {
  return function() {
    unsafeWindow.buddyList.itemOnClick(user_id);
  }
}

function addChatButton() {
  var profile_name = document.getElementById('profile_name');
  if (!profile_name) {
    return;
  }
  var container = profile_name.parentNode;
  var re = new RegExp('id=(\\d+)');
  var match = location.href.match(re);
  if (!match) {
    var error_node = document.createElement('DIV');
    error_node.style.color = '#C00';
    error_node.style.fontWeight = 'bold';
    error_node.innerHTML = 'cannot add chat button';
    container.parentNode.insertBefore(error_node, container.nextSibling);
    return;
  }
  var user_id = parseInt(match[1]);
  var chat_button = document.createElement('A');
  chat_button.style.fontWeight = 'bold';
  chat_button.innerHTML = '[chat]';
  chat_button.addEventListener('click', openChat(user_id), true);
  container.parentNode.insertBefore(chat_button, container.nextSibling);
}

window.addEventListener('load', addChatButton, true);
