// ==UserScript==
// @name           Hide comments written by trolls at polygamia.pl
// @namespace      milosz.galazka@gmail.com
// @include        http://polygamia.pl/*
// ==/UserScript==


var usersToHide = ['user_to_hide_1', 'user_to_hide_2', 'user_to_hide_3'];

comments = document.evaluate("//div[@id='article_comments']/div/div/ul/li", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null)

for(var i = 0; i < comments.snapshotLength; i++) {
  comment = comments.snapshotItem(i);
  user_link = document.evaluate("div[2]/div/div/span/a", comment, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  user_name = (user_link.snapshotItem(0)).innerHTML

  if (usersToHide.indexOf(user_name) != -1 )
    comment.parentNode.removeChild(comment);
}
