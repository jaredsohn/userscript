// ==UserScript==
// @name           continue my library books
// @namespace      idv.elleryq.library
// @description    續借學校圖書
// @include        http://lib1.cute.edu.tw:81/cgi-bin/spydus?PG_NAME=BRW&UMODE=WRNWQ&ULG=CHI&UCODE=BIG5*
// ==/UserScript==

(function(){
  var elements = document.getElementsByTagName("input");
  for(var start=0,end=elements.length;start!=end;start++)
  {
    var name=elements[start].getAttribute("name"); 
    if (name=="cmdCAN"){
      var parent = elements[start].parentNode;
      
      // The button for check all
      var check_all_button = document.createElement("input");
      check_all_button.setAttribute("type", "button");
      check_all_button.setAttribute("value", "Check all");
      check_all_button.setAttribute("name", "check_all_button");
      check_all_button.setAttribute("onclick", "javascript: var elements = document.getElementsByTagName(\"input\");for(var start=0,end=elements.length;start!=end;start++) { var name=elements[start].getAttribute(\"name\"); if( name && name.substring(0,3)==\"CPS\" ){ elements[start].checked=true; } }");
      
      // The button for uncheck all
      var uncheck_all_button = document.createElement("input");
      uncheck_all_button.setAttribute("type", "button");
      uncheck_all_button.setAttribute("value", "Uncheck all");
      uncheck_all_button.setAttribute("name", "uncheck_all_button");
      uncheck_all_button.setAttribute("onclick", "javascript: var elements = document.getElementsByTagName(\"input\");for(var start=0,end=elements.length;start!=end;start++) { var name=elements[start].getAttribute(\"name\"); if( name && name.substring(0,3)==\"CPS\" ){ elements[start].checked=false; } }");
      
      parent.appendChild( check_all_button );
      parent.appendChild( uncheck_all_button );
    }
  }
})();

