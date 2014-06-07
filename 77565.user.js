// ==UserScript==
// @name           OpenGrok Outline View
// @namespace      http://sin-web-01/*
// @description    Adds an Eclipse-like Outline view to the Opengrok display
// @include        http://sin-web-01/*
// ==/UserScript==

// Add an alert and test
var $;

// Add jQuery
    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
    
            GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
            GM_JQ.type = 'text/javascript';
            GM_JQ.async = true;
    
            GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
        }
        GM_wait();
    })();

// Check if jQuery's loaded
    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 100);
        } else {
            $ = unsafeWindow.jQuery.noConflict(true);
            letsJQuery();
        }
    }

     // All your GM code must be inside this function
    function letsJQuery() {
        $('pre').css({'font-family' : 'Consolas, Monaco, Courier New, monospace', 'font-size' : '13px' });
		// $('a.l,a.hl').remove();
		var results = $('pre').text();
        var find = Array();
		find = results.match(/[a-zA-Z]+\s+[^0-9]+\s*\(.*\)\s*[0-9]*\s*[0-9]*.*\{.*/g);
		var i = 0;
		console.log(find.length);
		var string = '';
		for(; i < find.length; i++) {
		  var temp = find[i].replace(/^\s*/, "").replace(/\s*$/, ""); 
			var splitarray = temp.split(')');
			var numbers = Array();
			numbers = splitarray[1].match(/\d+/);
			if (numbers && numbers.length > 0) {
			  var lineno = Number(numbers[0]);
			  lineno--;
			  if (lineno <= 0)
			    continue;
		      var link = '<a href="#' + lineno + '">' + splitarray[0] + ')</a>'; 
		      string += link + '<br/><br/>';
			  console.log(link);
			}
		}
		console.log(string);
		$('#content').css('right', 'auto').css('width', '60%');
		$('#content').after('<div class="outline" style="float:right;width:37%;margin-top:104px;overflow:scroll;height:600px;font-family:Consolas, Monaco, Courier New, monospace;font-size:13px;right: 0;"><div style="text-align:center;display:block;padding:6px;border:solid thin #333; background-color:#ccc;"><b>Outline</b></div>' + string + '</div>').hide().fadeIn('slow');
	}
