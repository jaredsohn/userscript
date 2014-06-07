// ==UserScript==
// @name           TechRepublic Rectify
// @namespace      http://chipstips.com/?tag=jstr
// @description    Fix display of TechRepublic
// @include        http://www.techrepublic.com/*
// @exclude        http://www.techrepublic.com/none
// ==/UserScript==
// This script is distributed under the terms of the Open Works License:
//   http://owl.apotheon.org
// Mercurial Repository:
//   https://bitbucket.org/sterlingcamden/tr-rectify
//
GM_addStyle('div.tr-rectify-middleman { display:block; min-height: 1em;}');
GM_addStyle('.tr-rectify-expbutton { float:left; background: #003377; color: white; padding: 0px; font-size: 0.7em; font-family: courier fixed; text-align: center; min-width: 1em;}');

function tr_rectify_showHide(exp, div) {
  if (exp.innerHTML == "+") {
    div.style.display = "none";
  } else {
    div.style.display = 'block';
    div.style.clear = 'both';
  }
}

function tr_rectify_collapse(div, pref, start_expanded) {
  if (div.parentNode.className != "tr-rectify-middleman") {
    div.tr_rectify_collapsible = true;
    var newdiv = document.createElement("div");
    newdiv.className = "tr-rectify-middleman";
    var exp = document.createElement("span");
    exp.className = "tr-rectify-expbutton";
    exp.innerHTML = GM_getValue(pref, start_expanded ? "-" : "+");
    newdiv.appendChild(exp);
    div.parentNode.insertBefore(newdiv,div);
    newdiv.appendChild(div);
    tr_rectify_showHide(exp, div);
    exp.addEventListener("click", function() {
      exp.innerHTML = (exp.innerHTML == '+') ? '-' : '+';
      tr_rectify_showHide(exp, div);
      GM_setValue(pref, exp.innerHTML);
    }, false);
  }
}

function tr_rectify_collapse_all(cls, start_expanded) {
  var div;
  var divs = document.getElementsByClassName(cls);
  for (i=0; i<divs.length; i++) {
    div = divs[i]
    tr_rectify_collapse(div, cls + '#' + (div.id ? div.id : i), start_expanded);
  }
}

GM_addStyle('h1.h { font-size: 120%!important;}');
GM_addStyle('h2.h { font-size: 110%!important;}');
GM_addStyle('h3.h { font-size: 105%!important;}');
GM_addStyle('h4.h { font-size: 100%!important;}');
GM_addStyle('h5.h { font-size: 95%!important;}');
GM_addStyle('h6.h { font-size: 100%!important; font-weight: bold}');
GM_addStyle('h6.h a:visited { color: #666; }');
GM_addStyle('p { padding-top: 0.5em!important; }');
GM_addStyle('div.entry { font-size: 0.84em!important;}');
GM_addStyle('div.cmnt { margin:0px;}');
GM_addStyle('div.cmnt-group { padding: 3px!important; margin:0px;}');
tr_rectify_collapse_all('cmnt-feature', 
   document.getElementsByClassName('thread-exp').length == 0);
tr_rectify_collapse_all("cmnt", true);	// Allow comments to be collapsed individually
GM_addStyle('div.contain { margin-left: 0px; width: 98%!important;}');
GM_addStyle('div.pad-2-a { padding: 3px!important;}');
GM_addStyle('div.space-2 { margin-bottom: 5px!important;}');
tr_rectify_collapse(document.getElementById("header"), 'header');
tr_rectify_collapse_all('post-paging');
GM_addStyle('div.thumb-3 { padding:0px!important; }');
GM_addStyle('div.space-1 { margin-bottom:0px!important; }');
GM_addStyle('div.area-16 { width: 70%; background: white;}');
GM_addStyle('div.area-8 { width: 25%; }');
tr_rectify_collapse_all('clearleft');
GM_addStyle('h2.c-2 { padding: 3px; background: #236; }');
GM_addStyle('div.rubics-b2btr { background: #236; }');

/* code tags should not be block elements;      */
/* it breaks formatting for inline code samples */
GM_addStyle('code { display: inline!important; margin-bottom: 0!important; padding-top: 0; padding-bottom: 0; background-color: #eee!important; }');

/* pre tags is where the block display should happen, instead of code tags */
GM_addStyle('pre { display: block!important; margin-top: 10px; border: thin solid #ccc; padding: 10px; background-color: #eee!important; }');

tr_rectify_collapse_all('footer');
tr_rectify_collapse_all('leader');

/* Set off the new thread reply form so it doesn't get confused with replying to a comment */
GM_addStyle('div#leavecomment { border:medium solid #aaa; padding-top:20px!important; background:#ddd}');

var newthread = document.getElementById('leavecomment');
if (newthread) {
   var h6 = newthread.getElementsByTagName('h6')[0];
   if (h6) {
   	h6.innerHTML = 'Start a New Discussion Thread';
   }
}
