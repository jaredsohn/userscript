// ==UserScript==
// @name           HighlightOwnerComments
// @namespace      vispillo
// @version		   1.0
// @description    Highlights the photographer's own comments on his/her photos on photo and activity pages as well as group discussions.
// @include        http://www.flickr.com/photos/*
// @include		   http://www.flickr.com/activity*
// @include		   http://www.flickr.com/groups/*/discuss
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
  var foo = String(window.location).split(/\//);
  switch(foo[3]) {
	case 'photos':
	  var head = document.getElementsByTagName('head')[0];
	  var style = document.createElement('style');
	  style.type = 'text/css';
	  style.innerHTML = '.photo-owner-comment { background-color: #eaeaea }';
	  head.appendChild(style);
      break;
    case 'activity':
  	  $("#recent-activity").find("li.act-item").each(function (i) {
		if ($("div.act-thumb > p > a",this).html() != null) {
		  var user = ($("div.act-thumb > p > a",this).html());	
		  $("div.act-data > ul.act-details > li.f-their-photo-their-comment").each( function (n) {
			if ($("div.act-content > a",this).html() == user) {
			  $(this).css("background-color","#eaeaea");
			}
		  });
		}
	  });
	  break;
    case 'groups':
  	  var uname = $("table tr td.Said h4 a").html();
  	  $("table.TopicReply tr").each(function (i) {
    	if ($("td.Said h4 a",this).html() == uname) {
		  $(this).css("background-color","#eaeaea");
		}
  	  });
	  break;
   }
}

// load jQuery and execute the main function
addJQuery(main);
