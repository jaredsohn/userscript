// ==UserScript==
// @name        Topic enhancement
// @namespace   org.upsuper.bangumi
// @include     http://bgm.tv/ep/*
// @include     http://bgm.tv/character/*
// @include     http://bgm.tv/group/topic/*
// @include     http://bgm.tv/subject/topic/*
// @include     http://bgm.tv/rakuen/topic/ep/*
// @include     http://bgm.tv/rakuen/topic/crt/*
// @include     http://bgm.tv/rakuen/topic/group/*
// @include     http://bgm.tv/rakuen/topic/subject/*
// @exclude     http://bgm.tv/ep/*/*
// @exclude     http://bgm.tv/character/*/*
// @exclude     http://bgm.tv/group/topic/*/*
// @exclude     http://bgm.tv/subject/topic/*/*
// @include     http://chii.in/ep/*
// @include     http://chii.in/character/*
// @include     http://chii.in/group/topic/*
// @include     http://chii.in/subject/topic/*
// @include     http://chii.in/rakuen/topic/ep/*
// @include     http://chii.in/rakuen/topic/crt/*
// @include     http://chii.in/rakuen/topic/group/*
// @include     http://chii.in/rakuen/topic/subject/*
// @exclude     http://chii.in/ep/*/*
// @exclude     http://chii.in/character/*/*
// @exclude     http://chii.in/group/topic/*/*
// @exclude     http://chii.in/subject/topic/*/*
// @include     http://bangumi.tv/ep/*
// @include     http://bangumi.tv/character/*
// @include     http://bangumi.tv/group/topic/*
// @include     http://bangumi.tv/subject/topic/*
// @include     http://bangumi.tv/rakuen/topic/ep/*
// @include     http://bangumi.tv/rakuen/topic/crt/*
// @include     http://bangumi.tv/rakuen/topic/group/*
// @include     http://bangumi.tv/rakuen/topic/subject/*
// @exclude     http://bangumi.tv/ep/*/*
// @exclude     http://bangumi.tv/character/*/*
// @exclude     http://bangumi.tv/group/topic/*/*
// @exclude     http://bangumi.tv/subject/topic/*/*
// @grant       none
// @version     4.2
// ==/UserScript==

(function () {
  var PREFIX_POST_READ = 'PostRead_'
    , PREFIX_TOPIC_TITLE = 'TopicTitle_';

  function $(q) { return document.querySelectorAll(q); }

  function getTopicID(url) {
    var url = url.split('/');
    if (url[2] != 'bgm.tv' &&
        url[2] != 'chii.in' &&
        url[2] != 'bangumi.tv')
      return false;

    var topicID = url.slice(3);
    if (topicID[0] == "rakuen") {
      switch (topicID[2]) {
        case "ep":
          topicID = ["ep", topicID[3]]; break;
        case "crt":
          topicID = ["character", topicID[3]]; break;
        case "group": case "subject":
          topicID = [topicID[2], topicID[1], topicID[3]];
      }
    }

    var idPos = {ep: 1, character: 1, group: 2, subject: 2}[topicID[0]];
    if (!idPos)
      return false;
    if (idPos == 2 && topicID[1] != 'topic')
      return false;

    topicID.splice(idPos + 1);
    topicID[idPos] = parseInt(topicID[idPos]);
    topicID = topicID.join("_");
    return topicID;
  }

  function saveTopicTitle(topicID, title) {
    var key = PREFIX_TOPIC_TITLE + topicID;
    localStorage[key] = title;
  }

  var topicID = getTopicID(location.href);
  saveTopicTitle(topicID, document.title);

  function updateTopicTitle($link) {
    if ($link.title)
      return;

    var url = $link.href
      , topicID = getTopicID(url);
    if (!topicID)
      return;

    var key = PREFIX_TOPIC_TITLE + topicID;
    if (localStorage[key]) {
      $link.title = localStorage[key];
      return;
    }

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var title = /<title>(.+)<\/title>/m.exec(xhr.responseText);
        if (!title)
          return;
        title = title[1];
        saveTopicTitle(topicID, title);
        $link.title = title;
      }
    };
    xhr.open('GET', url, true);
    xhr.send(null);
  }

  // update link title
  var $links = $('#main a.l:not([title])');
  for (var i = 0; i < $links.length; i++)
    updateTopicTitle($links[i]);

  function getPostIDs() {
    var $replies = $('div[id^="post_"]')
      , postIDs = [];
    for (var i = 0; i < $replies.length; i++)
      postIDs.push(parseInt($replies[i].id.substr(5)));
    return postIDs;
  }

  // highlight new posts
  var postIDs = getPostIDs()
    , key = PREFIX_POST_READ + topicID;
  if (localStorage[key]) {
    var lastMaxID = parseInt(localStorage[key]);
    for (var i = 0; i < postIDs.length; i++) {
      var postID = postIDs[i];
      if (postID <= lastMaxID)
        continue;

      postID = '#post_' + postID;
      if ($('.reply_highlight~' + postID)[0])
        continue;
      if ($('.reply_highlight ' + postID)[0])
        continue;
      if ($('.reply_highlight~div ' + postID)[0])
        continue;
      $(postID)[0].classList.add('reply_highlight');
    }
  }
  window.addEventListener('unload', function () {
    localStorage[key] = Math.max.apply(Math, getPostIDs());
  });
})();
