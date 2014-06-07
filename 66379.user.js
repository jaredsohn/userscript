// ==UserScript==
// @name           Just The Facts
// @namespace      http://www.defhoboz.biz/
// @description    Remove excess clutter from news sites.
// @include        http://www.huffingtonpost.com/*
// @include        http://*.huffingtonpost.com/*
// @include        http://*.talkingpointsmemo.com/*
// @include        http://talkingpointsmemo.com/*
// @include        http://*.examiner.com/*
// @include        http://examiner.com/*
// @include        http://*.time.com/*
// @include        http://time.com/*
// ==/UserScript==
var snapshotToArray = function(snapshot){var ar = new Array();for (var i = 0; i < snapshot.snapshotLength; i++) {ar.push(snapshot.snapshotItem(i));} return ar; }
var $x = function(xpath, node){ if (!node) node = document;	var result = document.evaluate(xpath, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); return snapshotToArray(result); }

// Erase!
var erasable = new Array(
  // Examiner.com
  "//*[@class='headerbg']"
  ,"//*[@id='body_content']/div[1]"
  ,"//*[@class='examiners_rightcol']"
  ,"//*[@id='clamshell']"
  
  // TPM
  ,"//*[@class='col election-sidebar']"
  ,"//*[@class='col home-ads']"
  
  // The Huffington Post
  ,"//*[@class='main_big_news_ontop_bpages']"
  ,"//*[@class='100days']"
  ,"//*[@id='gradient-wrap']"
  ,"//*[@id='top_nav']"
  ,"//*[@id='grid third flush_top']"
  ,"//*[@class='sidebarHeader']"
  ,"//*[@id='service_bottom_bar']"
  ,"//*[@id='threeup_top_wrapper']"
  
  // Time.com
  ,"//*[@class='rtCol']"
  ,"//*[@id='articleSideBar']"
  //,"//*[@class='col home-ads']"
  
)
for(var s in erasable) {
  try {
    var e = $x(erasable[s],document);
    for (var i=0;i<e.length;i++) {
      e[i].style.display="none"
    }
  } catch (e) {}
  
}

// Rearrange!

// Examiner.com
try { $x("//*[@class='examiners_main_content']",document)[0].style.width="950px"; } catch(e) {}
try { $x("//*[@class='col home-news-headlines']",document)[0].style.width="565px"; } catch(e) {}

// TPM
try { $x("//*[@id='story']",document)[0].style.width="950px"; } catch(e) {}
try {
  var e = $x("//*[@id='story']/div[@class='entry']",document)
  for (var i = 0; i<e.length;i++) {
    e[i].style.width="950px"
  } 
} catch(e) {}

try { $x("//*[@id='news_content']",document)[0].style.width="950px"; } catch(e) {}
try { $x("//*[@class='col entry_right full']",document)[0].style.width="950px"; } catch(e) {}

// Time.com
//try { $x("//*[@class='ltCol']",document)[0].style.width="800px !important"; } catch(e) {}