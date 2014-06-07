// ==UserScript==
// @name           GameFAQs PotD avatars
// @description    Adds avatars to forum through Photobucket
// @include        http://www.gamefaqs.com/boards/*
// ==/UserScript==

function authorAvatarClosure(link, author, source) {
  return function(responseDetails) {
    if (responseDetails.status == 200 && responseDetails.responseText.search('<!DOCTYPE') == -1) {
      var avatar = document.createElement('IMG');
      avatar.src = source;
      avatar.style.maxWidth = '90px';
      avatar.style.maxHeight = '150px';
      avatar.style.border = '1px solid #000000';
      avatar.alt = link.innerHTML;
      author.insertBefore(avatar, link.nextSibling);
      author.insertBefore(document.createElement('BR'), avatar);
    }
  }
}

function messageAvatarClosure(link, message, source) {
  return function(responseDetails) {
    if (responseDetails.status == 200 && responseDetails.responseText.search('<!DOCTYPE') == -1) {
      var avatar = document.createElement('IMG');
      avatar.src = source;
      avatar.style.maxWidth = '100px';
      avatar.style.maxHeight = '100px';
      avatar.style.border = '1px solid #000000';
      avatar.style.cssFloat = 'right';
      avatar.style.marginLeft = '1px';
      avatar.alt = link.innerHTML;
      message.insertBefore(avatar, message.firstChild);
    }
  }
}

function addAvatars() {
  var links = document.getElementsByTagName('a');
  for (var i = 0; i < links.length; i++) {
    var link = links[i];
    if (link.className.search(/name/) != -1) {
      var name = link.innerHTML.split(' ').join('');
      var source = 'http://kirei.net84.net/avatar/' + name + '.jpg';
      if (link.parentNode.className.search(/msg_stats_left/) != -1) {
        GM_xmlhttpRequest({
          method: 'GET',
          url: source,
          headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey'},
          onload: authorAvatarClosure(link, link.parentNode, source)})
      } else if (link.parentNode.className.search(/msg_stats/) != -1) {
        var row = link.parentNode.parentNode.parentNode;
        do {
          row = row.nextSibling;
        } while (row.tagName != 'TR');
        var message = row.firstChild;
        GM_xmlhttpRequest({
          method: 'GET',
          url: source,
          headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey'},
          onload: messageAvatarClosure(link, message, source)})
      }
    }
  }
}

addAvatars();