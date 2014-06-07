// ==UserScript==
// @name        testxpath
// @namespace   testxpath
// @description see topic http://userscripts.org/topics/115267
// @include     http://www.crossfire.nu/news
// @version     1
// ==/UserScript==
var userid=1234; // nodes of this user will be removed

// start script function remove() after page is loaded 
window.addEventListener("load", function(e) {remove();}, false);

// get_xpath helper for XPesult
function get_xpath(str,obj) {
return document.evaluate(str, obj, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
/*
 * find div with class=contentItem it is 4 steps above from span class=author /../../. .
  <div class=contentItem
   <div
     <div class=contentInfo   <--- XPath look for this as start followed by
      <span class=author      <---- span followed by
       <a href= ..../id/...   <---  a where href contains /id/
  then it goes up with /.. to the div class=contenItem
 *
 */ 
function remove(){
var news = get_xpath("//div[@class='contentInfo']/span[@class='author']/a[contains(@href,'/"+userid+"/')]/../../../..",document);
if(news!=null) { //found userid
GM_log("found userid");
 for(i=0;i<news.snapshotLength;i++){
	var node=news.snapshotItem(i); 	
 	GM_log("remove "+node.innerHTML);
 	node.parentNode.removeChild(node); // remove it
 	}
}
}//end remove()