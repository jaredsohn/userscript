// ==UserScript==
// @name           Baidu Search Site-block
// @description    Selected web-sites aren't displayed from Baidu search result.
// @version        1.0
// @author         Kris
// @namespace      http://maqiming.com
// @homepage       http://
// @include        http://www.baidu.*
// @Note           Do not Supported 'AutoPagerize' 0.0.12 or later.
// ==/UserScript==

/* Copy and modify from  
 * Google Search Site-block Plus
 * By Shinya
 * http://userscripts.org/scripts/show/12504
 */

/* == The Original Script Copyright =========
 * Written by leva.
 * http://note.openvista.jp/212/
 * 
 * Released under the CCL by-nc-na ja license.
 * http://creativecommons.org/licenses/by-nc-sa/2.1/jp/
/* ======================================= */

// Therefore, the license of this script is under the CCL by-nc-na ja license, too.


(function() {

  // Blocked sites
  var blocks = new Array(
    "doc88.com",
    "download.csdn.net",
    "pudn.com",
	"docin.com"
  );
  
  var mode = "weaken"; // "hidden" or "weaken"
  
  
  siteBlock($X("//table[@class='result']"));
  
  //var filter = function(elm){
  //  siteBlock($X(".//li[@class='g']", elm[0]));
  //}
  //addFilter(filter);
  
  function siteBlock(results){
  //alert(results.length);
    for(var i = 0, l = results.length; i < l; i++){
      var anchorList = $X(".//span[@class='g']", results[i]);
	  for(var k = 0, al = anchorList.length; k < al; k++){
		  var anchor = anchorList[k];
		for(var j = 0, b = blocks.length; j < b; j++){
      	  var regexp = new RegExp(blocks[j].replace(".", "\.") , "i");
      	 
	  	  //alert(anchor.innerHTML+"("+regexp+")");
	  	  var innerText = anchor.innerHTML.replace(/\s*<.*?>\s*/g,"");
      	  if(innerText.match(regexp) != null){
      	  //alert("match!!!!!");
      	    if(mode == "hidden"){
      	      results[i].style.display = "none";
      	    }
      	    else if (mode == "weaken"){
      	      //var headline = $X(".//h2[@class='r']", results[i])[0];
      	      //anchor.style.color = "#999"; // for other scripts
      	      //headline.style.color = "#999";
      	      //headline.nextSibling.style.display = "none";
				results[i].style.color = "#999";
				anchor.style.color = "#999";
				
				results[i].innerHTML = results[i].innerHTML
					.replace(/[\r\n]*/g,"")
					.replace(/<\/?em>/g,"")
					.replace(/<((\/)a|a( ))(.*?)>/g,"<$2span$3$4>");

      	    }
	  	    break;
      	  }
      	}
	  }
    }
  }
  
  /*
   * $X function from nulog
   * http://lowreal.net/logs/2006/03/16/1
   *
   * Thanks, cho45.
   */
  function $X (exp, context) {
  //alert(exp);
    if (!context) context = document;
    var resolver = function(prefix){
      var o = document.createNSResolver(context)(prefix);
      return o ? o : (document.contentType == "text/html") ? "" : "http://www.w3.org/1999/xhtml";
    }
    var exp = document.createExpression(exp, resolver);
    
    var result = exp.evaluate(context, XPathResult.ANY_TYPE, null);
    
    switch(result.resultType){
      case XPathResult.STRING_TYPE : return result.stringValue;
      case XPathResult.NUMBER_TYPE : return result.numberValue;
      case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
      case XPathResult.UNORDERED_NODE_ITERATOR_TYPE: {
        result = exp.evaluate(context, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        var ret = [];
        for(var i = 0, len = result.snapshotLength; i < len ; i++){
          ret.push(result.snapshotItem(i));
        }
        return ret;
      }
    }
    
    return null;
  }
  
//  // For Autopagerize 0.0.12
//  function addFilter(filter, i) {
//    i = i || 4;
//    if(window.AutoPagerize && window.AutoPagerize.addFilter){
//      window.AutoPagerize.addFilter(filter);
//    }
//    else if(i > 1){
//      setTimeout(arguments.callee, 1000, filter, i - 1);
//    }
//  }
  
})();
