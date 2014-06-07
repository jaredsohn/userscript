// ==UserScript==
// @name           SLMaMeSortablize
// @namespace      http://keimar.slmame.com/
// @description    Sortablize SLMaMe top page
// @include        http://www.slmame.com/
// @author         Keimar Kuhn http://keimar.slmame.com/
// @version        3.0
// ==/UserScript==
//
// This userscript is based on pd image dragger 
//   by psychedesire http://userscripts.org/scripts/review/47714
//

(function() {

	// set up jQuery variable
	var $;
	var gmkey = "sortable_" + document.location + "_";
	var pos = {'c': '#center', 'l': '#left', 'r': '#right'};
	var my_value = {};

	var counter = function(){
		var pain = {'c': 0, 'l': 0, 'r': 0};	
		return function(p){ return p + pain[p]++;};		
	}();
				
	// get data from GM_getValue		
	for(i in pos){
		my_value[i] = eval(GM_getValue(gmkey + pos[i]));
		if(my_value[i]){
			my_value[i].reverse();
		}
	}
		
	// Add jQuery
	var GM_JQ = document.createElement("script");
	GM_JQ.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js";
	GM_JQ.type = "text/javascript";

	document.body.appendChild(GM_JQ);

	// Check if jQuery's loaded
	var checker=setInterval(function(){
		if(typeof ($ = unsafeWindow.jQuery) != "undefined") {
			clearInterval(checker);
			var GM_JQu = document.createElement("script");
			GM_JQu.src = "http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/jquery-ui.js";
			GM_JQu.type = "text/javascript";
			document.body.appendChild(GM_JQu);
			var uchecker = setInterval(function(){
				if(typeof(sortable = unsafeWindow.jQuery.effects) != "undefined"){
					clearInterval(uchecker);
					letsJQuery();
				}
			},100);
		}
	},100);
	
	function letsJQuery() {
		
		// Remove!
		$('script').remove();

		// left
		$('#left div:not([class]),#left p.bnr:lt(2)').each(function(){
			$(this).addClass('sortable').addClass(counter('l'));
		});
		
		$('<div>').addClass('box').append('<h2 class="title">[PR]</h2>')
			.append($("#left iframe:eq(0)"))
			.insertAfter('#left div.space5:first');
		$('<div>').addClass('box').append('<h2 class="title">[PR]</h2>')
			.append($("#left iframe:eq(1)"))
			.insertAfter('#left #tag:eq(2)');
		
		// right
		$('#right p.bnr:first').addClass('sortable').addClass(counter('r'));
		$('#right iframe').insertAfter($('#register').addClass('sortable')
			.addClass(counter('r')));
		$('<div>').addClass('box').append('<h2 class="title">[PR]</h2>')
			.append($('#right iframe'))
			.insertBefore('#register');

		// center
		$('#center strong:first').addClass('sortable').addClass(counter('c'));
		$('<div>').addClass('box').append('<h2 class="title">[PR]</h2>')
			.append($("#center p.bnr"))
			.insertAfter('#center div.space5:first');

		$('#center div:has(fieldset)').addClass('sortable').addClass(counter('c'));

		$.each(pos,function(i,val){
			
			// add classname
			$(val + ' div.box').each(function(){
				$(this).addClass('sortable').addClass(counter(i));
			});
			
			// sort div.box and others
			if(my_value[i]){
				$.each(my_value[i],function(j,p){
					$('.' + p).insertAfter($(val + ' div.space5:first'));	
				});
			}
			
			// set sortable
			$(val).sortable({ items: '.sortable' , update: function(event, ui){
				var order = [];
				$(val + ' .sortable').each(function(){
					order.push(("" + $(this).attr('class')).split(" ").pop());
				});
				
				// use window.setTimeout because unsafe window can't use GM_setValue and GM_getValue
				window.setTimeout(GM_setValue, 0, gmkey + val, uneval(order));
				
			}});
		});
	}

}());
