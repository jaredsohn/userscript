// ==UserScript==
// @name        Youtube Playlist Filter
// @namespace   http://www.youtube.com
// @description Some playlists tend to be very long. This script adds filter search field to filter the playlist. 
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include     http://userscripts.org/scripts/show/153778
// @grant       none
// @version     1
// ==/UserScript==

  
(function ($) {
	  jQuery.expr[':'].Contains = function(a,i,m){
		  return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase())>=0;
	  };

	  function listFilter(header, list) {
		var form = $("<form>").attr({"class":"filterform","action":"#"}),
			input = $("<input>").attr({"class":"filterinput","type":"text"});
		$(form).append(input).prependTo(header);

		$(input)
		  .change( function () {
			var filter = $(this).val();
			if(filter) {
			  $(list).find("a:not(:Contains(" + filter + "))").parent().slideUp();
			  $(list).find("a:Contains(" + filter + ")").parent().slideDown();
			} else {
			  $(list).find("li").slideDown();
			}
			return false;
		  })
		.keyup( function () {
			$(this).change();
		});
	  }

	  $(function () {
		listFilter($("#watch7-playlist-tray"), $("#watch7-playlist-tray"));
	  });
	}(jQuery));



	  /**
 * Define GM_addStyle function if one doesn't exist
 */

 $(function () {
	if( typeof GM_addStyle != 'function' )
	function GM_addStyle(css)
	{
	    var style = document.createElement('style');
	    style.innerHTML = css;
	    style.type='text/css';
	    document.getElementsByTagName('head')[0].appendChild(style);
	}
    GM_addStyle('@media screen { .filterform { padding:4px; } }');
  });