// ==UserScript==
// @name fix_mylendlist_pagesize
// @namespace idv.elleryq.library2
// @include http://hylib.lib.cute.edu.tw/webpac/member/personal.jsp
// ==/UserScript==

(function(){
  var elements = document.getElementsByTagName("a");
  for(var start=0,end=elements.length;start!=end;start++)
  {
    var href=elements[start].getAttribute("href");
console.log( href );
    if (href=="MyLendList.jsp"){
      // We need more pageSize.
elements[start].setAttribute( "href", href + "?pageSize=30" );
}
  }
})();

