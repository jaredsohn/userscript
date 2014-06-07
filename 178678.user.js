// ==UserScript==
// @name Trello Github Issue Links
// @namespace http://fanzter.com/
// @version 0.2
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @description Looks for card titles with 'ORG_NAME/REPO#ISSUE' (aka: Github flavored Markdown reference style) and adds link to github issue. Based on http://userscripts.org/scripts/show/171323
// @match https://trello.com/*
// @copyright 2013+, Ryan Wilcox, originally from David Mason
// ==/UserScript==

// Github formatted markdown's issue reference style
var pattern = /\((.+)\/(.+)#(\d+)\)/;

(function () {
  var pullRequestLink;
  var pullReqImg = '<svg style="height: 16px; width: 16px;" xmlns="http://www.w3.org/2000/svg" version="1.1"><circle cx="8" cy="8" r="8" fill="#00CC00" /></svg>';

  var addPullRequestLink = function() {
    jQuery(".list-card-title, card-detail-title").each(function(i,val){
      if (jQuery(this).html().match(pattern)) {
        var regexMatch = jQuery(this).html().match(pattern);
        if (jQuery(this).parent().find(".issue_link").length < 1) {
          pullRequestLink = 'https://github.com/' + regexMatch[1] + '/' + regexMatch[2] + '/issues/' + regexMatch[3];
          var pullReqLink = '<a class="issue_link" target="_blank" href="'+ pullRequestLink + '">' + pullReqImg + '</a>';
          jQuery(this).parent().children('.badges').append(pullReqLink);
        }
      }
    });
    jQuery(".badges .issue_link").click(function(e) {
      e.stopPropagation();
    });
  };

  setInterval(addPullRequestLink, 5000);

})();
