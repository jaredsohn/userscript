// ==UserScript==
// @name           4banners
// @namespace      fourchan
// @description    Removes Banner & Ad divs -- use along with 4and4 script to see more pages
// @include        http*://boards.4chan.org/*/*
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main() {
  $(".boardBanner").hide();
  $("#postForm").hide();
  $("#globalMessage").hide();
  $('a[href*="jlist"]').parent().hide();
  
  
//inline image expansion:
$("a.fileThumb").attr("alt","");
$("a.fileThumb").live('click', function (e) {
       e.preventDefault();
	   aLink=$(this).attr("href");
	   aAlt=$(this).attr("alt");
	   iSrc=$(this).children("img").attr("src");
	   iStyle=$(this).children("img").attr("style");
	   $(this).children("img").attr("src",aLink);
	   $(this).children("img").attr("style",aAlt);
	   $(this).attr("href",iSrc);
	   $(this).attr("alt",iStyle);
	   	
    });
}

// load jQuery and execute the main function
addJQuery(main);