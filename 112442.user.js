// ==UserScript==
// @name           fbHidePoll
// @namespace      facebook
// @version        1.7
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// @grant          none
// ==/UserScript==

var debug = false; // if true, make red border around element instead of remove
var interval = 3; // for slow browser/computer you can add some seconds here
  
var xpath = [
  "//ul[@id='profile_minifeed']/li",
  "//ul[@id='home_stream']/li ", // news feed
  "//div[@id='timeline_tab_content']/div/div/ol/li", // news in user profile
  "//div[@id='timeline_tab_content_extra']/div/div/ol/li" // older news in profile
].join('|');

var rexp = new RegExp([
  "\/questions\/\d+\/|\/ajax\/questions|QuestionAggregateUnit|QuestionUnit", // questions
  "UCC 1 1-308-308", // legal notice spammers
  "sushi", // all about sushi
  "otsi.{,6}kodu", // kittens, dogs searching for new home
  "(учавствуй|участие).{,4}розыгрыш|loosi|loterii|jaga.{,4}võid|jagatud", // lotteries
  "подели.{,2}сь.{,5}новость|share.{,9}(photo|image)|please.{,5}(share|like)", // share something
  "(поставь|нажми|нажать|поставить|pane|pange).{,9}(лайк|like)|vajuta.{,9}(jaga|meeldib)" // like something
].join('|'),"gi");

function fbHidePoll() {
    
  var found = document.evaluate( xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE , null ); 
  for ( var i=0 ; i < found.snapshotLength; i++ )
    if ( inViewport (found.snapshotItem(i) ) && rexp.exec( found.snapshotItem(i).innerHTML ) )
      debug ? found.snapshotItem(i).style.border = '1px solid red'
            : found.snapshotItem(i).parentNode.removeChild( found.snapshotItem(i) );
      
}

function inViewport(el) {
  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;

  while(el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top < (window.pageYOffset + window.innerHeight) &&
    left < (window.pageXOffset + window.innerWidth) &&
    (top + height) > window.pageYOffset &&
    (left + width) > window.pageXOffset
  );
}

setInterval( function(){ fbHidePoll() }, interval*1000);
