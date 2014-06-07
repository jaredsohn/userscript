// ==UserScript==
// @name           LQFBEmbedDiscussion
// @namespace      janschejballqfb
// @description    Bettet in LQFB Diskussionen aus dem Wiki oder Pad ein. "Akkordeon"-Ansicht verwenden!
// @include        https://lqfb.piratenpartei.de/*
// @include        https://lqfb.piratenpartei-hessen.de/*
// ==/UserScript==

var discussionLink = document.evaluate("/html/body/div[6]/div/div/div/div[2]/div/div[2]/span/a",document,null,XPathResult.ANY_UNORDERED_NODE_TYPE,null).singleNodeValue;
var discussionURL = discussionLink.href;;
if (discussionURL.match(/^(http|https):\/\/(wiki\.piratenpartei\.de|(www\.)?piratenpad\.de)\//)) { 
  var target = document.evaluate("/html/body/div[6]/div/div/div/div[2]/div/div[3]",document,null,XPathResult.ANY_UNORDERED_NODE_TYPE,null).singleNodeValue;
  target.innerHTML += '<iframe style="width: 100%; height: 500px;" src="' + discussionURL + "\"></iframe>";
}