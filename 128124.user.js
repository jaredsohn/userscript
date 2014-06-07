// ==UserScript==
// @name continue my library books 2
// @namespace idv.elleryq.library2
// @description 續借學校圖書
// @include http://hylib.lib.cute.edu.tw/webpac/member/MyLendList.jsp*
// ==/UserScript==

(function(){
 
  // search all button named 'formExport' and push to list.
  var list = new Array();
  var list_len= 0;
  var elements = document.getElementsByTagName("input");
  for(var start=0,end=elements.length;start!=end;start++)
  {
    var name=elements[start].getAttribute("name");
    if (name=="formExport"){
list[ list_len++ ] = elements[start];
}
  }

  // Add new buttons to right of 'formExport'
  for(var start=0, end=list.length;start!=end;start++ )
  {
// The button for check all
var check_all_button = document.createElement("input");
check_all_button.setAttribute("class", "allbtn" );
check_all_button.setAttribute("type", "button");
check_all_button.setAttribute("value", "Check all");
check_all_button.setAttribute("name", "check_all_button");
check_all_button.setAttribute("onclick", "javascript: var elements = document.getElementsByTagName(\"input\");for(var start=0,end=elements.length;start!=end;start++) { var name=elements[start].getAttribute(\"name\"); if( name && name==\"extendId\" ){ elements[start].checked=true; } }");

// The button for uncheck all
var uncheck_all_button = document.createElement("input");
uncheck_all_button.setAttribute("class", "allbtn" );
uncheck_all_button.setAttribute("type", "button");
uncheck_all_button.setAttribute("value", "Uncheck all");
uncheck_all_button.setAttribute("name", "uncheck_all_button");
uncheck_all_button.setAttribute("onclick", "javascript: var elements = document.getElementsByTagName(\"input\");for(var start=0,end=elements.length;start!=end;start++) { var name=elements[start].getAttribute(\"name\"); if( name && name==\"extendId\" ){ elements[start].checked=false; } }");

    var parent = list[start].parentNode;
    parent.appendChild( check_all_button );
    parent.appendChild( uncheck_all_button );
  }
})();

