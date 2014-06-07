// ==UserScript==
// @name Trello Github Pull Request Links
// @namespace http://davidmason.org
// @version 0.1
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @description Looks for card titles with 'PR#\d+' and adds link to github pull request. Based on http://userscripts.org/scripts/source/171323.user.js
// @match https://trello.com/*
// @copyright 2013+, David Mason
// ==/UserScript==

// change this to your project
var project = 'zanata/zanata-server';

// change this to use a prefix other than 'PR#'
var pattern = /PR#(\d+)/;

(function (githubProject) {
  var pullRequestLink = 'https://github.com/' + githubProject + '/pull/';
  var pullReqImg = '<svg style="height: 16px; width: 16px;" xmlns="http://www.w3.org/2000/svg" version="1.1"><circle cx="8" cy="8" r="8" fill="#00CC00" /></svg>';

  var addPullRequestLink = function() {
    jQuery(".list-card-title, card-detail-title").each(function(i,val){
      if (jQuery(this).html().match(pattern)) {
        var regexMatch = jQuery(this).html().match(pattern);
        if (jQuery(this).parent().find(".pullreq").length < 1) {
          var pullReqLink = '<a class="pullreq" target="_blank" href="'+ pullRequestLink + regexMatch[1] +'">' + pullReqImg + '</a>';
          jQuery(this).parent().children('.badges').append(pullReqLink);
        }
      }
    });
    jQuery(".badges .pullreq").click(function(e) {
      e.stopPropagation();
    });
  };

  setInterval(addPullRequestLink, 5000);

})(project);