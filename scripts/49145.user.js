// ==UserScript==
// @name           HighlightFolders
// @namespace      http://www.zoho.com/
// @description    Highlights folders for which subfolders have unread mail
// @include        http://mail.zoho.com/*
// @version        0.0.1
// @author         karthik dot krshnakumar at gmail dot com
// ==/UserScript==

var $;

// Check if jQuery's loaded
var checker=setInterval(function(){
  if(typeof ($ = unsafeWindow.jQuery) != "undefined") {
    clearInterval(checker);
    highlightFolders();

    fetch = unsafeWindow.getFetchList;
    unsafeWindow.getFetchList = function() {
      fetch();
      highlightFolders();
    };
  }
},100);

// All your GM code must be inside this function
function highlightFolders() {
  var folder = unsafeWindow.treedata;
  $('#view span').each(
    function(index) {
      var id = $( this ). attr ("id");
      if (id. indexOf ( "sp" ) > 0 ) {
	var fNum = id.substring(0, id.length-2);
	if (!! folder[fNum]) {
	  var obj = folder[fNum]["child"];
	  var hasData = "";
	  for (var i = 0 ; i < obj.length ; ++i ) {
	    if ( obj[i][0]. indexOf ( "span" ) > 0 ) {
	      hasData = "1";
	      break;
	    }
	  }
	  if ( !! hasData ) {
	    $( this ). html ( "<span class=bldtxt>" + $( this ). text() + "</span>");
	  }
	}

      }
    }
  );

};


