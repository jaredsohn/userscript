// ==UserScript==
// @name		Batbox tweaks, makes select list of projects more usable, can enter time using only numbers and it will convert
// @namespace	harry
// @version		0.4.3
// @include		https://www2.rit.edu/BatBOX/timeTrack/index.jsp*
// @include		https://www2.rit.edu/BatBOX/timeTrack/addProjectHours.jsp*
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
	var script = document.createElement("script"),
		s2 = document.createElement("script");

	script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js");
	s2.setAttribute("src", "https://twcstaff.rit.edu/impact/assets/hb_core/js/jquery/chosen/chosen.jquery.1.min.js");
	
	script.addEventListener('load', function() {
		document.body.appendChild(s2);
	}, false);
	
	s2.addEventListener('load', function() {
		var s3 = document.createElement("script");
		s3.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(s3);
	}, false);
	
	document.body.appendChild(script);
}
function addStyleSheet(style){
  var getHead = document.getElementsByTagName("HEAD")[0];
  var cssNode = window.document.createElement('style');
  var elementStyle= getHead.appendChild(cssNode);
  elementStyle.innerHTML = style;
  return elementStyle;
}
addStyleSheet('@import "https://twcstaff.rit.edu/impact/assets/hb_core/js/jquery/chosen/chosen.css";');

// the guts of this userscript
function main() {
	$('select').chosen({search_contains:true});
	
	$('input[type="text"]').bind('change', function(e) {
		var me = $(this),
			val = me.val(),
			h, m, ampm;
		
		if ($.isNumeric(val) && (val.length <= 4)) {
            if (val.length == 1 || val.length == 2) {
                h = val;
                m = '00';
            } else if (val.length == 3) {
				h = val.substr(0, 1);
				m = val.substr(1);
			} else if (val.length == 4) {
				h = val.substr(0, 2);
				m = val.substr(2);
			}
			
			if (h < 8 || h == 12) {
				ampm = 'PM';
			} else {
				ampm = 'AM';
			}
			me.val(h+':'+m+ampm);
			me.trigger('change');
		}
			
	});
}

// load jQuery and execute the main function
addJQuery(main);