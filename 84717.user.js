// ==UserScript==
// @name           RegExp highlight
// @namespace      http://tax4.blog115.fc2.com/
// @include        http://*
// @include        https://*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// ==/UserScript==

/* ORIGINAL "highlight" license */
/*
highlight v3
Highlights arbitrary terms.
<http://johannburkard.de/blog/programming/javascript/highlight-javascript-text-higlighting-jquery-plugin.html>
MIT license.

Johann Burkard
<http://johannburkard.de>
<mailto:jb@eaio.com>
*/

jQuery.fn.highlight = function(pat,classname) {
 function innerHighlight(node, pat) {
  var skip = 0;
  if (node.nodeType == 3) {
   var mat = pat.exec(node.data);
   var pos=(mat==null)?-1:mat.index;
   if (pos >= 0 && mat[0].length > 0) {
    var spannode = document.createElement('span');
    spannode.className = classname;
    var middlebit = node.splitText(pos);
    var endbit = middlebit.splitText(mat[0].length);
    var middleclone = middlebit.cloneNode(true);
    spannode.appendChild(middleclone);
    middlebit.parentNode.replaceChild(spannode, middlebit);
    skip = 1;
   }
  }
  else if (node.nodeType == 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
   for (var i = 0; i < node.childNodes.length; ++i) {
    i += innerHighlight(node.childNodes[i], pat);
   }
  }
  return skip;
 }
 return this.each(function() {
  innerHighlight(this, pat);
 });
};

jQuery.fn.removeHighlight = function(classname) {
 return this.find("span."+classname).each(function() {
  /*this.parentNode.firstChild.nodeName;*/
  with (this.parentNode) {
   replaceChild(this.firstChild, this);
   normalize();
  }
 }).end();
};


//====sample====
var myclassname = "http---tax4-blog115-fc2-com";
GM_addStyle("."+myclassname+"{background-color:yellow;}");

var div = $("<div><form><input type='text'></input><input type='submit'></input></form></div>");
div.css("position", "fixed");
div.css("top", "50px");
div.css("right", "0px");
//div.css("zIndex",1000);
$("body").append(div);
div.find("form").submit(function(){
  var s = div.find(":text").val();
  var re = null;
  try{
    if(s=="") throw "";
    re = new RegExp(s,"i");
    if(re.test("")) throw "";
  }
  catch(e){
    alert("regexp error");
    return false;
  }

  $("body").removeHighlight(myclassname);
  $("body").highlight(re, myclassname);
  return false;
});

