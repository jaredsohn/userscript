// ==UserScript==
// @name           Add import feature
// @namespace      
// @include        http://www.memrise.com/set/*/*/edit/
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

function main() {

	importarea = $('<textarea />');
	row = $('<tr/>');
	row.append(importarea);
	$('table.add-item-search.itemsearch').append(row);

	link = $('<a href="javascript:void()">Import</a>');
	row.append(link);

	link.click(function () {
	
		console.log('link clicked'); 

		var lines = importarea.val().split("\n");
		
		console.log(lines);
		
		for ( time in lines) {
		
			console.log(lines[time]);
			
			pair = lines[time].split("  -->   ");
			
			console.log(pair);
			
			$('.word-input').val(pair[0]);
			$('.defn-input').val(pair[1]);
			
			var clickEvent  = document.createEvent ("HTMLEvents");
			clickEvent.initEvent ("click", true, true);
			$('a.btn.submit')[0].dispatchEvent (clickEvent);
		}
	});
}

addJQuery(main);