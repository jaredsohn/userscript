// ==UserScript==
// @name          JAV Junkie Fixer
// @namespace     http://userscripts.org/scripts/show/133036
// @description	  Removes ads while downloading torrent. Add actress link
// @author        S1M0N
// @include       http://javjunkies.com/main/*
// ==/UserScript==

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

// load jQuery and execute the main function
addJQuery(main);

// the guts of this userscript
function main() {
	$( 'div.entry div.image span' ).each(function(){
		var $span = $(this);
		var girl = /<br>Actress:(\s)*(\w+)<br>/.exec( $span.html());
		if ( girl && girl.length >= 2) {
			var girlName = girl[girl.length-1];
			// console.info( girlName );
			var $a = $( '<a href="http://javjunkies.com/main/?s=' + girlName +'">' + girlName + '</a>' );
			// console.info( $a );
			$span.closest('div.image').after( $a );
		}
	});
	// 調中間的寬度
	$( 'div.entry' )
		.css({
			'width': '900px',
		});
		
	// 下載torrent
	/*
	$( 'div.image a[href^="/JAV.php"]' )
		.attr( 'href', function(){
			return $(this).attr('onclick').replace(/"/g, '').replace(/location.href=/, '');
		})
		.removeAttr('onclick')
		.removeAttr('target');
	*/
	// 所有連結
	$( 'a[onclick^="location.href"]')
		.attr( 'href', function(){
			return $(this).attr('onclick').replace(/"/g, '').replace(/location.href=/, '');
		})
		.removeAttr('onclick')
		.removeAttr('target');
/*	
	// 跳頁
	$( 'div.entry p a[href*="void()"][onclick^="location.href"]')
		.attr( 'href', function(){
			return $(this).attr('onclick').replace(/"/g, '').replace(/location.href=/, '');
		})
		.removeAttr('onclick')
		.removeAttr('target');
		
	// 前後頁 (<<Previous Entries, Next Entries>>)
	$('div.navigation div a[href*="void()"][onclick^="location.href"]')
		.attr( 'href', function(){
			return $(this).attr('onclick').replace(/"/g, '').replace(/location.href=/, '');
		})
		.removeAttr('onclick')
		.removeAttr('target');
*/
}