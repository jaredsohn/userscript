// ==UserScript==
// @name Delicious.com - Slash Tag Emboldener
// @description Makes tags that have forward slashes in them stand out better in Delicious.
// @include http://delicious.com/*
// @include http://www.delicious.com/*
// ==/UserScript==


(function(){
  
  var main_node, tag_links;  
  main_node = document.getElementById("bd");
  tag_anchors = document.evaluate("//li[contains(@class,'tag-chain-tag')]/a", main_node, null,
                                XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                                null);
                                  
  for (var i = 0; i < tag_anchors.snapshotLength; i++) {      
    tag_a = tag_anchors.snapshotItem(i);    
    if (tag_a.innerHTML.indexOf("/") != -1) {  
      tag_a.style.color = "#3274D0";  
      tag_a.style.fontWeight = "bold";     
    }
  }
  
})()