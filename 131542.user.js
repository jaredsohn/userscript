// ==UserScript==
// @name           yssy web hotkey
// @namespace      https://bbs.sjtu.edu.cn/bbstdoc
// @include        https://bbs.sjtu.edu.cn/bbstdoc*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==
var curserString = "<span id=curser style='{color:red;}'>\></span>" 
var baseurl = "https://bbs.sjtu.edu.cn"
var threadlist = "";
var curser = 0;
var init = function (from){
  threadlist = $("tr");
  if ( from == 'j') {
    curser = 1;
  } else {
    curser = threadlist.length-1;
  }
  $($("td", threadlist[curser])[0]).replaceWith( function() {
    return "<td>" + curserString + $(this).text() + "</td>";
  });
}
function updateCurser( _curser, next) {
  $($("#curser", threadlist[_curser])[0]).remove( );
  $($("td", threadlist[next])[0]).replaceWith( function() {
    return "<td>" + curserString + $(this).text() + "</td>";
  });
}

function go(link, from) {
  $.get(link,
      function(page){
        $("center").replaceWith("<center>" + $("center",$(page)).html() + "<p>Current Page:<a href=\""+link+"\">"+link+"</a></p></center>");
        init(from);
      });
}
function getBoard() {
  var board = $(location).attr('href');
  var patt=/.*board,([^,]+).*/;
  return board.replace(patt,"$1");
}
function g() {
  board = getBoard();
  go( baseurl+"/bbstdoc,board,"+board+",page,0.html", 'j');
}
function G() {
  board = getBoard();
  go( baseurl+"/bbstdoc,board,"+board+".html");
}
function k() {
  if ( curser > 1) {
    updateCurser( curser, curser-1);
    curser -= 1;
  } else {
    var link = ($("a:contains(上一页)").attr("href"));
    if ( link ) {
      go( baseurl+"/"+link, 'k');
    } else {
      G();
    }
  }
}
function j() {
  if ( curser < threadlist.length-1) {
    updateCurser( curser, curser+1);
    curser += 1;
  } else {
    var link = ($("a:contains(下一页)").attr("href"));
    if ( link ) {
      go( baseurl+"/"+link, 'j');
    } else {
      g();
    }
  }
}
function l() {
  var link = $($("a", threadlist[curser])[1]).attr("href");
  window.location.href = (baseurl+"/"+link);
}
function a() {
  var link = $($("a", threadlist[curser])[0]).attr("href");
  window.location.href = (baseurl+"/"+link);
}
function p() {
  var link = ($("a:contains(发表文章)").attr("href"));
  window.location.href = (baseurl+"/"+link);
}
function h() {
  alert(
      "j:	next thread;\n"+
      "k:	previous thread;\n"+
      "l:	read thread;\n"+
      "a:	user info;\n"+
      "p:	post new;\n"+
      "G:	last page;\n"+
      "G: first page;\n"+
      "h:	show this message"
      );
}
$(document).ready(function() {
  init();
  $(document).keypress( function(event) {
    if ( event.which == 106 ) {
      j();
    } else if ( event.which == 107 ) {
      k();
    } else if ( event.which == 108 ) {
      l();
    } else if ( event.which == 97 ) {
      a();
    } else if ( event.which == 112 ) {
      p();
    } else if ( event.which == 104 ) {
      h();
    } else if ( event.which == 71 ) {
      G();
    } else if ( event.which == 103 ) {
      g();
    }
  });
});
