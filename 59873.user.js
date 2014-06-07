// ==UserScript==
// @name           Twitter Emoji Support
// @namespace      http://d.hatena.ne.jp/Yuichirou/
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

var emojiRegExp = /[\uDBB8-\uDBBA]./;
var emojiURL = location.protocol + "//mail.google.com/mail/e/"

function decodeSurrogatePair(str) {
  var upper = str.charCodeAt(0) - 0xD800;
  var lower = str.charCodeAt(1) - 0xDC00;
  //if (upper < 0 || 0x400 <= upper) throw new Error(upper);
  //if (lower < 0 || 0x400 <= lower) throw new Error(lower);
  return 0x10000 + (upper * 0x400) + lower;
}

function replaceEmojiFromTextNode(textNode) {
  var text = textNode.nodeValue;

  while (!!(res = text.match(emojiRegExp))) {
    var emoji_num = decodeSurrogatePair(res[0]) - 0xFE000;

    var newTextNode = document.createTextNode(text.slice(0, res.index));
    textNode.parentNode.insertBefore(newTextNode, textNode);

    var img = document.createElement("img");
    img.src = emojiURL + ("00" + emoji_num.toString(16).toUpperCase()).slice(-3);
    img.style.height = "1.04em";
    img.style.verticalAlign = "text-top";
    textNode.parentNode.insertBefore(img, textNode);

    textNode.nodeValue = text.slice(res.index + 2);

    text = textNode.nodeValue;
  }
}

function replaceEmoji(elm) {
  if (emojiRegExp.test(elm.textContent)) {
    if (elm.nodeName === "#text") {
      replaceEmojiFromTextNode(elm);
    } else if (elm.childNodes) {
      Array.forEach(elm.childNodes, replaceEmoji);
    }
  }
}

var tweets = document.getElementsByClassName("entry-content");
Array.forEach(tweets, replaceEmoji);

var timeline = document.getElementById('timeline');
if (timeline) {
  timeline.parentNode.addEventListener('DOMNodeInserted', function (evt) {
    var elm = evt.target;
    if (elm.className && elm.className.match(/status/i)) {
      var contentElm = elm.getElementsByClassName("entry-content")[0];
      replaceEmoji(contentElm);
    }
  }, false);
}
