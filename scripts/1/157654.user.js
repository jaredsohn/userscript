// ==UserScript==
// @name       SIN Sidebar
// @namespace  http://outwardb.com
// @version    0.3
// @description  Crew Sidebar
// @author    Shady
// @include      *.outwar.com*
// @copyright  None
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js
// ==/UserScript==
var iBarWidth = 160;
var sHost;

$(document).ready(function(){
    sHost = window.location.hostname;
    EmbedGUI();
});

function EmbedGUI(){
    var css = "<link rel='stylesheet' type='text/css' href='http://outwardb.com/shady/TFO/tmstyle.css'>";
    var sideBar = $(document.createElement('div')).attr('id', 'shadySideBar');
    var container = $('center > div');

    if(container.length > 1){
        container = $(container[0]);
    }

    container.children('div').css('width', container.css('width'));
    container.css('width', parseInt(container.css('width')) + iBarWidth);
    container.prepend(sideBar);

    $('head').append(css);

	GM_xmlhttpRequest({
	  method: "GET",
	  url: "http://outwardb.com/shady/TFO/sidebar1.php",
	  onload: function(response) {
		$('#shadySideBar').html(response.responseText);
	  }
	});
}