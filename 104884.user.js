// ==UserScript==
// @name          Clien My Comment search
// @namespace     http://nuridol.egloos.com
// @description   내가 쓴 댓글을 한번에 검색하는 버튼을 만들어 줍니다.
// @version       1.0.0
// @author        NuRi
// @require       http://code.jquery.com/jquery-latest.js
// @include       http://www.clien.net/cs2/bbs/board.php?bo_table=*
// @exclude       http://www.clien.net/cs2/bbs/board.php?bo_table=*&wr_id=*
// ==/UserScript==

// ...script by NuRi

// Add jQuery
/*
var GM_JQ = document.createElement('script');
GM_JQ.type = 'text/javascript';
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();
*/
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://code.jquery.com/jquery-latest.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

addJQuery(letsJQuery);

function letsJQuery() {
	function getParameter(paramName) {
	  var searchString = window.location.search.substring(1), i, val, params = searchString.split("&");
	  for (i=0;i<params.length;i++) {
	    val = params[i].split("=");
	    if (val[0] == paramName) {
	      return unescape(val[1]);
	    }
	  }
	  return null;
	}

 $(document).ready(function() {
 	 try {
 	 if (!$("#account p.member_info a")) {
 	 	 return;
 	 }
 	 var id = $("#account p.member_info a")[0].href.split(",")[1];
 	 id = id.replace(/%20|'/g, "");
 	 if (!id) {
 	 	 return;
 	 }

 	 // add css
 	 // from http://www.webdesignerwall.com/demo/css-buttons.html
 	 $("<style type='text/css'>.myButton { display: inline-block; zoom: 1; /* zoom and *display = ie7 hack for display:inline-block */ *display: inline; vertical-align: baseline; margin: 0 2px; outline: none; cursor: pointer; text-align: center; text-decoration: none; font: 14px/100% Arial, Helvetica, sans-serif; padding: .5em 2em .55em; text-shadow: 0 1px 1px rgba(0,0,0,.3); -webkit-border-radius: .5em;  -moz-border-radius: .5em; border-radius: .5em; -webkit-box-shadow: 0 1px 2px rgba(0,0,0,.2); -moz-box-shadow: 0 1px 2px rgba(0,0,0,.2); box-shadow: 0 1px 2px rgba(0,0,0,.2); } .myButton:hover { text-decoration: none; } .myButton:active { position: relative; top: 1px; } .mySmall { font-size: 11px; padding: .2em 1em .275em; } .myWhite { color: #606060; border: solid 1px #b7b7b7; background: #fff; background: -webkit-gradient(linear, left top, left bottom, from(#fff), to(#ededed)); background: -moz-linear-gradient(top, #fff, #ededed); filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffff', endColorstr='#ededed'); } .myWhite:hover { color: #606060; background: #ededed; background: -webkit-gradient(linear, left top, left bottom, from(#fff), to(#dcdcdc)); background: -moz-linear-gradient(top, #fff, #dcdcdc); filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffff', endColorstr='#dcdcdc'); } .myWhite:active { color: #999; background: -webkit-gradient(linear, left top, left bottom, from(#ededed), to(#fff)); background: -moz-linear-gradient(top, #ededed, #fff); filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ededed', endColorstr='#ffffff'); }</style>").appendTo("head");

 	 // make button
 	 var table = getParameter("bo_table");
 	 if (!table) {
 	 	 return;
 	 }

 	 var link = "http://www.clien.net/cs2/bbs/board.php?bo_table=" + escape(table) + "&sca=&sfl=mb_id%2C0&stx=" + escape(id);
 	 var search = "<a href=\"" + link + "\" class='myButton mySmall myWhite'>내 댓글 찾기</a>";
 	 $("div.search_board input.search_input_img").after(search);

 	 }
 	 catch(err) {
 	 }
 });
}
