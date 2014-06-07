// ==UserScript==
// @name 		9gag.com - Image-UN-blocker
// @author	 Christian Lehmann <nospam@grunwalski.de>
// @namespace cl9gag
// @version 	1
// @description	Removes nasty HTML-Elements, which prevent downloading images by rightclick
// @license 	WTFPL
// @match http://9gag.com/*
// ==/UserScript==

;(function(){
  
  function getElementsByClassName(classname, node)  {
    var a = [], re = new RegExp('\\b' + classname + '\\b'), els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
      if(re.test(els[i].className))a.push(els[i]);
    return a;
  }
  
  var 
    doc = this.document,
    bigfatdicks = typeof doc.getElementsByClassName == 'function' ? doc.getElementsByClassName('bigfatdick') : getElementsByClassName('bigfatdick', doc.body),
    bigfatdick,
    pNode
  ;
  
  for (i in bigfatdicks) {
    bigfatdick = bigfatdicks[i];
    if (bigfatdick.hasOwnProperty('parentNode')) {
      pNode = bigfatdick.parentNode;
      pNode.removeChild(bigfatdick);
    }
  }
  
}());