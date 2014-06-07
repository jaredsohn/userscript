// ==UserScript==
// @name        fast-forward badge
// @namespace   https://github.com/sinsoku/fastforward_badge
// @version     0.4.0
// @downloadURL https://userscripts.org/scripts/source/183136.user.js
// @updateURL   https://userscripts.org/scripts/source/183136.meta.js
// @include     https://github.com/*/pull/*
// ==/UserScript==

// If you use this script in private repositories, then it is necessary to create an access token.
// https://help.github.com/articles/creating-an-access-token-for-command-line-use
var access_token = "";

function addBadge(enable) {
  var text;
  var tagName = "span";
  var style = "border-radius: 3px;" +
    "font-weight: bold;";
  var enableStyle = "color: #fff;" +
    "background-color: #6cc644;";
  var disabledStyle = "color: #fff;" +
    "background-color: #777;";
  if (enable) {
    text = "fast-forward";
    style += enableStyle;
  } else {
    text = "non-fast forward";
    style += disabledStyle;
  }
  var badge = '<' + tagName + ' class="commit-ref" style="' + style + '">' + text + '</' + tagName + '>';
  $(".gh-header-meta").append(", and this is " + badge);
}
var pullreq, commits, baseBranch;
var s = document.location.pathname.split('/');
var owner = s[1];
var repo = s[2];
var number = s[4];
var apiURL = "https://api.github.com/";
var token_param = "";
if (access_token !== "") {
  token_param = "?access_token=" + access_token;
}

function getPullReq() {
  var url = apiURL + "repos/" + owner + "/" + repo + "/pulls/" + number + token_param;
  return $.getJSON(url, function(json) { pullreq = json; });
}
function getCommits() {
  var url = apiURL + "repos/" + owner + "/" + repo + "/pulls/" + number + "/commits" + token_param;
  return $.getJSON(url, function(json) { commits = json; });
}
function getBaseBranch() {
  var url = apiURL + "repos/" + owner + "/" + repo + "/branches/" + pullreq.base.ref + token_param;
  return $.getJSON(url, function(json) { baseBranch = json; });
}

function isFastForward() {
  return commits[0].parents[0].sha == baseBranch.commit.sha;
}
function isOpen() {
  return pullreq.state == "open";
}

$.when(getPullReq(), getCommits())
  .then(getBaseBranch)
  .then(function() {
    if (isOpen()) { addBadge(isFastForward()); }
  });
