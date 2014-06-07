// ==UserScript==
// @name           Universal Comments Remover
// @namespace      Comments Remover
// @description    Hide user comments from articles in news sites and other popular hangouts. This is a great tool for people who had enough of trolls, who want to avoid filthy commentary, and/or who waste too much time reading comments when they have better things to do.
// @author         KAISTAR
// @include     http://*.cnn.com/*
// @include     http://*.youtube.com/*
// @include     http://news.yahoo.com/*
// @include     http://*.nypost.com/*
// @include     http://*.nytimes.com/*
// @include     http://*.ign.com/*
// @include     http://*.computerworld.com/*
// @include     http://*.wired.com/*
// @include     http://*.gamespot.com/*
// @include     http://*.huffingtonpost.com/*
// @include     http://*.washingtonpost.com/*
// @include     http://*.bbc.co.uk/*
// @include     http://abcnews.go.com/*
// @include	http://*.popsci.com/*
// @include	http://*.time.com/*
// @include	http://*.npr.org/*
// @include	http://*.slate.com/*
// @include	http://*.thedailybeast.com/*
// @include	http://*.usnews.com/*
// @include	http://*.politico.com/*
// @include	http://*.salon.com/*
// @include	http://*.newyorker.com/*
// @include	http://*.theatlantic.com/*
// @include	http://*.villagevoice.com/*
// @include	http://*.commondreams.org/*
// @include	http://crooksandliars.com/*
// @include	http://*.moveon.org/*
// @include	http://*.thenation.com/*
// @include	http://thinkprogress.org/*
// @include	http://*.rawstory.com/*
// @include	http://politicalwire.com/*
// @include	http://*.truthdig.com/*
// @include	http://americablog.com/*
// @include	http://*.michaelmoore.com/*
// @include	http://*.bloomberg.com/*
// @include	http://*.latimes.com/*
// ==/UserScript==

function addGlobalStyle(css) {
  var head, style;
  head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = css;
  head.appendChild(style);
}

addGlobalStyle('#comments { display:none ! important; }');
addGlobalStyle('.comments { display:none ! important; }');
addGlobalStyle('#comments-view { display:none ! important; }');
addGlobalStyle('.commentFrame { display:none ! important; }');
addGlobalStyle('#disqus_thread, .cnn_divln3pxblck { display:none ! important; }');
addGlobalStyle('#yom-comments { display:none ! important; }');
addGlobalStyle('#comments_block { display:none ! important; }');
addGlobalStyle('.dna-comment-list { display:none ! important; }');
addGlobalStyle('#livefyre { display:none ! important; }');
addGlobalStyle('#twitter_module_wrapper { display:none ! important; }');
addGlobalStyle('.comments_block_holder { display:none ! important; }');
addGlobalStyle('.commentlist { display:none ! important; }');
addGlobalStyle('.commentBlock { display:none ! important; }');
addGlobalStyle('.content2 { display:none ! important; }');
addGlobalStyle('#commentBlock { display:none ! important; }');
addGlobalStyle('.sl-comments { display:none ! important; }');
addGlobalStyle('#conversation { display:none ! important; }');
addGlobalStyle('.twitterEmbed { display:none ! important; }');
addGlobalStyle('#block-disqus-disqus_comments { display:none ! important; }');
addGlobalStyle('#comments-area { display:none ! important; }');
addGlobalStyle('#comments-holder { display:none ! important; }');
addGlobalStyle('#commentsContainer { display:none ! important; }');
addGlobalStyle('#gallery-subcontent { display:none ! important; }');
