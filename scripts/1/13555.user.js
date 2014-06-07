   1. // ==UserScript==
   2. // @name           Dictionary on Orkut
   3. // @namespace      http://gverma.blogspot.com
   4. // @description    Adds AJAX Dictionary to Orkut
   5. // @include        http://www.orkut.com/Scrapbook.aspx*
   6. // @include        http://www.orkut.com/CommMsgPost.aspx*
   7. // ==/UserScript==
   8. function xpath(query) {
   9.     return document.evaluate(query, document, null,
  10.         XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  11. }
  12. function addDict() {
  13.      var c = document.getElementById('scrapInputContainer');
  14.      if(!c)
  15.      c = document.getElementById('messageBody');
  16.      if(!c){
  17.         return;}
  18.      if(c.type == "textarea")
  19.         c.parentNode.parentNode.innerHTML = '<div id="dictresult" style="margin: 30px 0px; height: 270px; position: absolute; width: 22%;overflow-x:hidden;overflow-y:auto;"></div>' + c.parentNode.parentNode.innerHTML;
  20.      else
  21.             c.innerHTML = '<div id="dictresult" style="margin: 0px 545px; height: 85px; position: absolute; width: 290px;overflow-x:hidden;overflow-y:auto;"></div>' + c.innerHTML;
  22.         var allDivs, thisDiv;
  23.         allDivs = document.evaluate(
  24.             "//div[@class='parabtns']",
  25.             document,
  26.             null,
  27.             XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  28.             null);
  29.             thisDiv = allDivs.snapshotItem(allDivs.snapshotLength-1);
  30.             thisDiv.innerHTML = thisDiv.innerHTML+'<span>Find Meaning of : <input type="text" id="word" size=10>&nbsp;<span class="grabtn"><a id="sb" class="btn" href="javascript:void(0);">search</a></span><span class="btnboxr"><img width="5" height="1" alt="" src="http://img1.orkut.com/img/b.gif"/></span></span>';
  31.     if (!GM_xmlhttpRequest) {
  32.     alert('Please upgrade to the latest version of Greasemonkey.');
  33.     return;
  34.     }
  35. }
  36. function showM(){
  37.             var w = document.getElementById('sb');
  38.             if(w.innerHTML == "search"){
  39.             GM_xmlhttpRequest({
  40.             method: 'GET',
  41.             url: 'http://www.dictionary.hm/search_function.php?q='+document.getElementById('word').value,
  42.             headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'application/atom+xml,application/xml,text/xml',},
  43.             onreadystatechange: function(responseDetails){document.getElementById('dictresult').innerHTML = "Loading...";},
  44.             onload: function(responseDetails){document.getElementById('dictresult').innerHTML = responseDetails.responseText;}});
  45.             w.innerHTML = "clear";
  46.             }else{
  47.                 //document.getElementById('dictresult').innerHTML = "";
  48.                 //document.getElementById('word').value="";
  49.                 //w.innerHTML = "search";
  50.                 clear();
  51.             }
  52.     }
  53. function clear(){
  54.     document.getElementById('dictresult').innerHTML = "";
  55.     document.getElementById('word').value="";
  56.     w.innerHTML = "search";
  57. }
  58.    
  59. addDict();
  60. var w = document.getElementById('sb');
  61.     if(!w)
  62.         return;
  63.     w.addEventListener('click',showM,false);
  64. var t = document.getElementById('word');
  65.     if(!t)
  66.         return;
  67.     t.addEventListener('focus',clear,false);