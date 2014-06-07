// ==UserScript==
// @name           twitter toLocaltime
// @version        2.2
// @namespace      http://twitter.com/inmoutan
// @auther         inmoutan
// @description    Rewrite twitter timestamp to localtime for old UI.
// @include        https://twitter.com/*
// @include        http://twitter.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.0/jquery.min.js
// ==/UserScript==

(function() {
var filter = function(elem){
		$(elem).find('a.entry-date').each(function(){
				var data = eval("("+$(this).children('span.timestamp').attr('data')+")");
                if(data!=null){
                var td=new Date(data.time);
                $(this).html(td.toLocaleString());
                }
        });
}


$(document).ready(function() { 
  filter('.hentry');
    });


$('#timeline').bind('DOMNodeInserted', function(event) {
	var elem = event.target;
    if ((/hentry/).test(elem.getAttribute('class'))) {
      filter(elem);
     }
   });

})();