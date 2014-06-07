// ==UserScript==
// @name         Easy preview of blue posts content on d3db.com
// @namespace    easyBlueForD3db
// @include      http*://*d3db.com/blue/browse*
// @author       tomt610
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
		
	var divv = document.createElement('div');
	$(divv).attr('id', 'userscriptbluediv');
	$(divv).css('display', 'none');
	$(divv).css('position', 'fixed');
	$(divv).css('width', '950px');
	$(divv).css('height', '95%');
	$(divv).css('z-index', '999');
	$(divv).css('margin-left', '2px');
	$(divv).css('top', '2%');
	$(divv).css('overflow-y', 'auto');
	$('#wrapper-inner').append(divv);
	
	
	var back = document.createElement('div');
	$(back).attr('id', 'userscriptback');
	$(back).css('display', 'none');
	$(back).css('background-color', 'black');
	$(back).css('opacity', '0.5');
	$(back).css('position', 'fixed');
	$(back).css('width', '100%');
	$(back).css('height', '100%');
	$(back).css('top', '0px');
	$(back).css('z-index', '500');
	$('body').append(back);
	
	$(document).ready(function(){
		
		$("a", $(".data-list")).click(function() {
			$.get($(this).attr('href'), '', function(data){
				var cut = data.substring(data.indexOf('<div id="insidecontent">'), data.indexOf('<div id="footer">'));
				$('#userscriptbluediv').html(cut);
				$('#userscriptbluediv').css('display', 'block');
				$('#userscriptback').css('display', 'block');
			});
			return false;
		});
		
		$("#userscriptback").click(function(){
			$('#userscriptbluediv').css('display', 'none');
			$('#userscriptback').css('display', 'none');
		});
	});
}

addJQuery(main);