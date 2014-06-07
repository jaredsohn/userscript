// ==UserScript==
// @name           GameFAQs DBG avatars
// @description    Adds avatars to the DBG board at GFs. All credit goes to Hell Bovine at the PotD boards. Yoshi merely edited it to work for the DBG board and uploaded it so they can use it easier.
// @include        http://www.gamefaqs.com/boards/gentopic.php?board=2000113*
// ==/UserScript==

function authorAvatarClosure(link, author, source) {
  return function(responseDetails) {
    if (responseDetails.status == 200) {
      var avatar = document.createElement('IMG');
      avatar.src = source;
      avatar.style.maxWidth = '100px';
      avatar.style.maxHeight = '100px';
      avatar.style.border = '1px solid #000000';
      avatar.alt = link.innerHTML;
      author.insertBefore(avatar, link.nextSibling);
      author.insertBefore(document.createElement('BR'), avatar);
    }
  }
}

function messageAvatarClosure(link, message, source) {
  return function(responseDetails) {
    if (responseDetails.status == 200) {
      var avatar = document.createElement('IMG');
      avatar.src = source;
      avatar.style.maxWidth = '100px';
      avatar.style.maxHeight = '100px';
      avatar.style.border = '1px solid #000000';
      avatar.style.cssFloat = 'right';
      avatar.style.marginLeft = '5px';
      avatar.style.marginRight = '10px';
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
      var source = 'http://gs94.photobucket.com/groups/l96/D7DSFPE5M8/' + link.innerHTML.split(' ').join('') + '.jpg';
      if (link.parentNode.className.search(/author/) != -1) {
        GM_xmlhttpRequest({
          method: 'GET',
          url: source,
          headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey'},
          onload: authorAvatarClosure(link, link.parentNode, source)})
      } else if (link.parentNode.tagName == 'TD') {
        var row = link.parentNode.parentNode;
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
