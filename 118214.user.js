// ==UserScript==
// @name           新增教材下載連結
// @namespace      stdinfosys.meterial.download
// @description    新增教材下載連結
// @include        http://192.192.78.86/stdinfosys/StudyMeterialDownload_V2.aspx*
// ==/UserScript==
(function(){
  var elements = document.getElementsByTagName("div");
  for(var start=0,end=elements.length;start!=end;start++)
  {
    var onclick=elements[start].getAttribute("onclick"); 
    var style=elements[start].getAttribute("style"); 
    if (style && style=="CURSOR: hand" ){
      var parent = elements[start].parentNode;
	  var s = 24;
	  var e = onclick.indexOf( "'", s+1 );
	  var href = onclick.substring( s, e );
      
      // Create anchor
      var a = document.createElement("a");
      a.setAttribute("href", href );
	  a.setAttribute("title", href );
	  a.innerHTML="download";
      
      parent.appendChild( a );
    }
  }
})();
