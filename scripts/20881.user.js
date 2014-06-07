// ==UserScript==
// @name           Twitter - Highlight Replies
// @namespace      http://twitter.highlight.replies/kepp
// @description    Highlights replies directed at you in timelines
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @exclude        http://twitter.com/replies*
// @exclude        https://twitter.com/replies*
// ==/UserScript==

function $x(xpath, context) {
  context = context || document;
  var res = document.evaluate(xpath, context, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
  for(var i, nodes = [] ; i=res.iterateNext() ; nodes.push(i));
  return nodes;
};

function getUser() {
  var user;
  user = GM_getValue("user", $x('self::node()/descendant::*[local-name() = "img" or local-name() = "IMG"][@id = "profile-image"]/parent::node()')[0].pathname);
  GM_setValue("user", user);
  return user;
};

function getColor() {
  var rules = $x("//head/style")[0].sheet.cssRules, color;
  for (var i = 0, r; r = rules[i]; i++) {
    if (r.selectorText == "body") {
      color = r.style.color;
      break;
    }
  }

  function c(str) {
    var n = Number(str);
    return Math.round((255 - n)*9/10 + n);
  }

    /([\d]+)[^\d]*([\d]+)[^\d]*([\d]+)/g.test(color);
  color = [c(RegExp.$1), c(RegExp.$2), c(RegExp.$3)];
  return "rgb(" + color + ")";
};

var user = getUser();
if (!user) {
  return;
}
var xp = [
  'self::node()/descendant::*[local-name() = "span" or local-name() = "SPAN"]',
  '[contains(concat(" ",@class," "), " entry-title ")',
  ' and ',
  'contains(concat(" ",@class," "), " entry-content ")',
  ' and ',
  'count(descendant::*[(local-name() = "a" or local-name() = "A")',
  ' and ',
  '@href="', user, '"])>0]/parent::node()/parent::node()'
].join('');

function highlightReplies(context) {
  context = context.length ? context[0] : context;
  var replies = $x(xp, context);
  replies.forEach(function(reply) {
    reply.setAttribute("class", reply.getAttribute("class") + " reply");
  });
};


(function() {
  
  var color = getColor();
  GM_addStyle(".reply { background-color:" + color +  " !important; }");

  var i=4;
  function addFilter() {
    if(window.AutoPagerize && window.AutoPagerize.addFilter) {
      window.AutoPagerize.addFilter(highlightReplies);
    } else if(i-- > 0) {
      setTimeout(arguments.callee, 500);
    }
  }
  highlightReplies(document);
  addFilter();

})();
