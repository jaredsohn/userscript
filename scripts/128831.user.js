// ==UserScript==
// @name         BetterRunKeeper
// @description	 Add kilometer speed to RunKeeper
// @id           me.zilliox.BetterRunKeeper
// @homepageURL  http://userscripts.org/scripts/show/128831
// @supportURL   http://userscripts.org/scripts/discuss/128831
// @updateURL    http://userscripts.org/scripts/source/128831.meta.js
// @version      2013.05.19
// @author       tzilliox, Mickael Hoareau
// @namespace    http://zilliox.me
// @include      *runkeeper.com/user/*/activity/*
// ==/UserScript==

(function(){
	var execute = function(){

		var timer = setInterval( function() {
			if ( $('#distanceSplits .pace').length > 1 ) {
				clearInterval( timer );
				$('#distanceSplits .pace').each(function( index, el ){
				    var paceNode = this;
					var parts = el.innerHTML.split( ':' );
					if ( parts.length == 2 ) { 
						 var min = parseInt( parts.slice( 0, 1 ).join('') );
						 var sec = parseInt( parts.slice( 1, 2 ).join('') );
						 var kmh = Math.round( 6000 / ( min + sec / 60 ) ) / 100;
						 $( '<div class="span4 kmhour micro-text">' + kmh + '</div>' ).insertAfter( paceNode );
					}
				});

				$( '<div class="span4 labelHeader">Speed <span class="details">(km/h)</span></td>' )
					.insertAfter( 
						$('#distanceSplits .labelHeader:nth-child(2)')
					);
				$('#distanceSplits .span4').each(function( index, el ){
				    $(this).css({
				        'width':'25%',
				        'padding-left':'0',
				        'margin-left':'0',
				        'text-align':'center'});
				});
			}
		}, 1000);

	}
	var script = document.createElement("script");
	script.innerHTML = '(' + execute.toString() + ')();';
	document.head.appendChild(script);
})();