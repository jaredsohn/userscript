// ==UserScript==
// @name           Facebook Commentbox Reverter
// @namespace      http://userscripts.org/users/jamielandegjones
// @require        http://usocheckup.dune.net/101251.js?maxage=3
// @include        http://*.facebook.com/*
// @include        http://facebook.com/*
// @include        https://*.facebook.com/*
// @include        https://facebook.com/*
// @include        http://*.facebook.tld/*
// @include        http://facebook.tld/*
// @include        https://*.facebook.tld/*
// @include        https://facebook.tld/*

// @exclude        http://*.channel.facebook.tld/*
// @exclude        http://static.*.facebook.tld/*
// @exclude        http://*.facebook.tld/ai.php*
// @exclude        http://*.facebook.tld/pagelet/generic.php/pagelet/home/morestories.php*

// @exclude        https://*.channel.facebook.tld/*
// @exclude        https://static.*.facebook.tld/*
// @exclude        https://*.facebook.tld/ai.php*
// @exclude        https://*.facebook.tld/pagelet/generic.php/pagelet/home/morestories.php*

// ==/UserScript==


// Modified version. Original version by Matt Kruse : http://userscripts.org/scripts/show/99127

var version = 1.0;
function addGlobalStyle(css)
  {
    var style = document.createElement('style');

    style.textContent = css;
    document.getElementsByTagName('head')[0].appendChild(style);
  }

function hasClass(o,re) {if (typeof re=="string") {re = new RegExp("(^|\\s)"+re+"(\\s|$)");}return (o.className && re.test(o.className));}
function removeClass(o,re) {if(!o){return;} if (!hasClass(o,re)) { return; } if (typeof re=="string") { re = new RegExp("(^|\\s)"+re+"(\\s|$)"); } o.className = o.className.replace(re,' '); }

var parse_textarea = function()
  {
    var textarea = document.getElementsByTagName("textarea");

    for(var i=0; i < textarea.length; i++)
      removeClass(textarea[i],"enter_submit");
  }

// Restore the comment button
addGlobalStyle('.sendOnEnterTip, .commentUndoTip, .child_is_active .sendOnEnterTip, .child_is_active .commentUndoTip {display:none !important;} #facebook .child_is_active .hidden_elem.commentBtn {display:block !important;}');

document.body.addEventListener("DOMNodeInserted", parse_textarea, false);
