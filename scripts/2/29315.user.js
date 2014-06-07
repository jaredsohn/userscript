// ==UserScript==
// @name           FriendFeed highlight your own comments
// @namespace      http://oleb.de/
// @description    Highlights your own comments on FriendFeed with an orange icon instead of the standard yellow. This makes it easier to scan for your own comments in a long conversation.
// @include        http://friendfeed.com/*
// @include        http://www.friendfeed.com/*
// @exclude        http://friendfeed.com/settings/*
// @exclude        http://www.friendfeed.com/settings/*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function xpath(query, scope) {
    return document.evaluate(query, scope, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

// 2. Highlight the comments of the owner of each entry
// Does not work on the "me" page but does not have to. Highlight own comments works there.

// Find all entries and identify their owners
var allEntries, thisEntry, ownerURL, allComments, thisCommentOwner;
allEntries = xpath("//div[@class='summary']/a[contains(@class, 'friend')][1]", document); // entries begin with <div class="summary">
for (var i=0; i < allEntries.snapshotLength; i++) {
  thisEntry = allEntries.snapshotItem(i);

  // firstChild is an <a href="/OWNER">
  ownerURL = thisEntry.attributes.getNamedItem("href").value;
  
  // Look for owner comments below the entry
  // <div class="body">
  //   <div class="summary">
  //     <a class="friend">
  //   <div class="entries">
  //     <div class="comments">
  //       <div class="comment">
  //         <a href="/OWNER">
  allComments = xpath("div[@class='entries']/div/div[@class='comments']//div[contains(@class, 'comment')]//a[@href='" + ownerURL + "']",
    thisEntry.parentNode.parentNode);
  for (var j=0; j < allComments.snapshotLength; j++) {
    thisCommentOwner = allComments.snapshotItem(j);
    // Add class "ownercomment" to comments matching ownerURL
    thisCommentOwner.parentNode.parentNode.className += " ownercomment";
  }
}

// Add style for owner comments
addGlobalStyle('div.comment.ownercomment .quote { background-image: url(http://oleb.de/linked_files/ff-cust-oquote-ownercomments.png) ! important; background-repeat: no-repeat ! important; }');

// 1. Highlight your own comments
addGlobalStyle('div.comment.owner .quote { background-image: url(http://oleb.de/linked_files/ff-cust-oquote-mycomments.png) ! important; background-repeat: no-repeat ! important; }');