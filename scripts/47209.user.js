// ==UserScript==
// @name           LessWrong boo vote
// @description    A script for the LessWrong community blog ( http://lesswrong.com ). Allows to vote down comments stochastically (probability=30%).
// @include        http://*lesswrong.com/*
// @include        http://*.lesswrong.com/*
// ==/UserScript==

// LessWrong boo vote version 0.1 by Vladimir Nesov

// Modify the next line to change voting probability
const downvote_probability = 0.30

function forallElts(pattern, fn){
  var allElts = document.evaluate(pattern,
      document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for(var i = 0 ; i < allElts.snapshotLength ; i++){
    fn(allElts.snapshotItem(i));
  }
}

function forallVotes(fn){
  forallElts("//li//a[contains(@class,'down')]", fn)
}

function extract_down(n) {
  return n.getAttribute("onclick")
}

function create_marg(down_foo) {
 var marg = document.createElement("a")
 marg.appendChild(document.createTextNode("Vote boo"))
 marg.setAttribute("class", "down")
 marg.setAttribute("onclick", "if(Math.random()<" + downvote_probability + ") " + down_foo)
 return marg
}

function create_li(n) {
 var li = document.createElement("li")
 li.appendChild(create_marg(extract_down(n)))
 return li
}

function add_boo(n) { 
  var n2 = n.parentNode
  var par = n2.parentNode
  par.insertBefore(create_li(n), n2)
}

forallVotes(add_boo)