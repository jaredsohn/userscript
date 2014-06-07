// ==UserScript==
// @name        phpMyAdmin inline convert epoch time
// @namespace   PylonPants + JEA
// @include     */phpmyadmin/*
// @version     0.2
// @require		https://ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js
// ==/UserScript==

$(go);

function doHighlight(frames) {
   
	var table;
    if(frames) {
        table = document.getElementById("frame_content").contentDocument.getElementById('table_results');
    } else {
    	table = document.getElementById('table_results');
    }
    if( table ) {
		var td = table.getElementsByTagName('td');
        for( var i=0; i<td.length; i++ ) {
            var h = td[i];
            var t = h.innerText || h.textContent;
            if( t.search(/1[0-9]{9}/) == 0 ) {
                var date = new Date(parseInt(t)*1000);
                h.innerHTML = date.toLocaleString().replace(/ /g,"&nbsp;");
                h.style.color = 'red';
            }
        }
    }
}
function go() {
    var frames = $('#mainFrameset').length > 0;
    if(frames || $('#pma_navigation').length ) {
    	var $link = $("<div style='background:#DDDDDD;border-radius:0 0 0 10px;box-shadow:0 0 6px rgba(0, 0, 0, 0.3);padding:5px 5px 10px 10px;position:fixed;right:0;top: 0;cursor:pointer;z-index: 1000000000;'>").text("Epoch Convert").click(function(){doHighlight(frames)});
    	$("html").append(
        	 $link
    	);
    }
};