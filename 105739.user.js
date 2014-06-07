// ==UserScript==
// @name Balloon Juice reply link
// @description Add missing "reply" links to comments on Balloon Juice
// @match http://www.balloon-juice.com/*
// ==/UserScript==

function onClick(event) {
  if (!event.target.classList.contains('bj-reply-link')) return;
  event.stopPropagation();
  event.preventDefault();
  var text = document.evaluate('ancestor::p[@class="commenter"]/text()',
    event.target, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.nodeValue;
  text = '@' + text.trim();
  var a = document.evaluate('ancestor::span[@class="comment-info"]//a',
    event.target, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  a = a.cloneNode(false);
  a.removeAttribute('title');
  a.appendChild(document.createTextNode(text));
  var textarea = document.getElementById('comment');
  text = a.outerHTML + ':\n';
  textarea.value = textarea.value + text;
  textarea.focus();
  var len = textarea.textLength;
  textarea.setSelectionRange(len, len);
}

document.addEventListener('click', onClick, true);

var add = document.createElement('span');
add.innerHTML = '<span> </span>·<span> </span><a class="bj-reply-link" href="#">Reply</a>';

var result = document.evaluate('//span[@class="comment-info"]//a',
        document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0, ii = result.snapshotLength; i < ii; ++i) {
    var n = result.snapshotItem(i);
    n.parentNode.appendChild(add.cloneNode(true));
}

