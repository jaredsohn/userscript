// ==UserScript==
// @name        Link to Pivotal
// @version     0.0.3
// @namespace   https://github.com/tricknotes
// @description Auto link to Pivotal Tracker from Github.
// @license     MIT License
// @include     https://github.com/*
// ==/UserScript==
!function() {
  const PIVOTAL_STORY_URL = 'https://www.pivotaltracker.com/story/show/'
      , STORY_ID_MATCHER = /(?:[a-zA-Z]+ )?#([0-9]{7,8})/
      , STORY_ID_SPLITER = /((?:[a-zA-Z]+ )?#[0-9]{7,8})/
      , LINK_TEMPLATE = '<a href="'+PIVOTAL_STORY_URL+'%s" class="issue-link">%s</a>'
      , QUERIES = [
          '.commit .commit-title'
        , '.commit .commit-desc'
        , 'table.tree-browser td.message'
        , 'td.message code'
        , '.message blockquote'
        , '.content-title'
        , '.content-body'
      ]

  var linkToPivotal = function(text) {
    return text.replace(STORY_ID_MATCHER, function(matched, id) {
      var values = [id, matched]
        , i = 0
      var linked = LINK_TEMPLATE.replace(/%s/g, function() {
        return values[i++ % 2];
      });
      return linked;
    });
  };

  QUERIES.forEach(function(query) {
    var messages = document.querySelectorAll(query);
    var i, message, anchor;
    for (i = messages.length; i--;) {
      message = messages.item(i);
      anchor = message.querySelector('a');
      if (anchor) {
        var nodes = message.childNodes;
        for (var j = nodes.length; j--;) {
          var node = nodes.item(j);
          if ('A' === node.nodeName) {
            var edge = node.outerHTML.split(node.innerHTML)
              , tail = edge.pop()
              , head = edge.join(node.innerHTML)
              , splitted
              , mapped
            splitted = node.textContent.split(STORY_ID_SPLITER);
            mapped = splitted.map(function(text, i) {
              if (STORY_ID_SPLITER.test(text)) {
                return linkToPivotal(text);
              } else {
                return head + text + tail;
              }
            });
            node.outerHTML = mapped.join('');
          }
        }
      } else {
        message.innerHTML = linkToPivotal(message.innerHTML);
      }
    }
  });
}();
