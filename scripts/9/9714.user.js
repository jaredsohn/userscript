// ==UserScript==
// @name           fix recommended tags
// @namespace      http://fg-180.katamayu.net/userscripts
// @include        http://b.hatena.ne.jp/add?*
// @include        http://b.hatena.ne.jp/*/edit?*
// ==/UserScript==

function fixRecommendedTags() {
  var userTags = new Object();
  unsafeWindow.tags.each(function (tag) { userTags[tag.toLowerCase()] = tag; });

  var otherTags = unsafeWindow.otherTags;

  otherTags.each(function (tag, i) {
                   var userTag = userTags[tag];
                   if (userTag) {
                     otherTags[i] = userTag;

                     var elm = document.getElementById('otherTag' + i);
                     elm.style.border = '1px dotted black';
                     elm.firstChild.nodeValue = userTag;

                     if (unsafeWindow.isAdded(userTag)) {
                       unsafeWindow.selectTag(elm.wrappedJSObject);
                     } else {
                       unsafeWindow.unselectTag(elm.wrappedJSObject);
                     }
                   }
                 });
}

window.addEventListener('load', fixRecommendedTags, false);