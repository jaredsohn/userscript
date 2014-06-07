// ==UserScript==
// @name        GreenHopper Columns
// @author      Ross Merrigan 
// @namespace   RM
// @description Show hide columns in Atlassian GreenHopper
// @include     http://*RapidBoard.jspa?rapidView*
// @include     https://*RapidBoard.jspa?rapidView*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require     http://cachedcommons.org/cache/jquery-cookie/0.0.0/javascripts/jquery-cookie.js
// @version     2.3
// @license     GNU License
// ==/UserScript==


$(document).ready(function() {

		$( "<style>#js-view-hide-list { display: none; position: absolute; z-index: 1000; background-color: #FFFFFF; border: 1px solid #BBBBBB;margin-left: -80px; box-shadow:5px 5px 5px rgba(0,0,0,0.4);-ms-box-shadow:5px 5px 5px rgba(0,0,0,0.4);-moz-box-shadow:5px 5px 5px rgba(0,0,0,0.4);-webkit-box-shadow:5px 5px 5px rgba(0,0,0,0.4); }</style>" ).appendTo( "head" );

		$( "<style>#js-view-hide-list a.hidden-column { background-color: #326CA6; border-radius: 0 0 0 0; color: #FFFFFF; }</style>" ).appendTo( "head" );
		
		$( "<style>#js-view-hide-list a:hover { background-color: #326CA6; border-radius: 0 0 0 0; color: #FFFFFF; }</style>" ).appendTo( "head" )			
		
		$( "<style>#ghx-hero-columns { list-style-type: none; padding-left: 10px; } #ghx-view-hide { margin-left: 0px; }</style>" ).appendTo( "head" )		

		setTimeout(function() {

			var value = $.cookie('iTropics');
			var items = new Array();
			if (value !== null) {
				items = value.split(',');
			}			
			
			var btn = $('<ul id="ghx-hero-columns" class="ghx-hero"><li><button id="js-view-actions" class="aui-button ghx-actions-tools ghx-dropdown-trigger">Columns</button><div id="js-view-hide-list" class="aui-list" ><ul style="margin-top: 4px;" id="list-column" class="aui-list-section aui-first"></ul><ul style="margin-bottom: 4px;"  class="aui-list-section aui-last"><li style="display: block; margin: 0px;" class="aui-list-item js-view-action-column-show"><a class="aui-list-item-link" style="display: block; margin: 0px; border-radius: 0px;" href="#" role="button">Show All</a></li></ul></div></li></ul>');
	
			var list = $('#list-column', btn);
			
			var column = $('#ghx-column-headers li.ghx-column');
			
			var foundIds = new Array();
			column.each(function(index, element) {
				if (foundIds.indexOf($(element).attr('data-id'), 0) === -1) {
					list.append('<li style="display: block; margin: 0px;" class="aui-list-item js-view-action-column" data-id-btn="' + $(element).attr('data-id') + '"><a style="border-radius: 0px;" class="aui-list-item-link" role="button">' + $(element).find('h2').html() + '</a></li>');
					
					foundIds.push($(element).attr('data-id'));
				}
			});
						
			$("#ghx-view-hide").live("click", function(e){ 
				$('#js-view-hide-list').toggle();
				e.stopPropagation();
				return false;    
			});
			
			$(document).click(function() {
				$('#js-view-hide-list').hide();				
			});
			
			$("li.js-view-action-column-show").live("click", function(){ 
				$.cookie('iTropics', null);
				items = [];
				$('li[data-id]').show(); 
				$('li[data-column-id]').show(); 
				
				$('li a', btn).removeClass('hidden-column');
			});
			
			$("li.js-view-action-column").live("click", function(){ 
				var data = $(this).attr('data-id-btn');
				
				if ($('li[data-id|="' + data + '"]').is(":visible")) {
					items.push(data)
					$.cookie('iTropics', items, { expires: 356 });
					$('a', $(this)).addClass('hidden-column');
				} else {	
					if (items.length > 0 ) {
					items.splice(items.indexOf(data), 1)
						$.cookie('iTropics', items, { expires: 356 });
					}
					$('a', $(this)).removeClass('hidden-column');
				}
							
				$('li[data-id|="' + data + '"]').toggle(); 
				$('li[data-column-id|="' + data + '"]').toggle(); 							
			});
			
			$('#ghx-modes-tools').append('<div id="ghx-view-hide" style="display: inline-block"></div>');
			$('#ghx-view-hide').append(btn);

			for(i in items) {
				$('li[data-id|="' + items[i] + '"]').hide(); 
				$('li[data-column-id|="' + items[i] + '"]').hide(); 
				$('li[data-id-btn|="' + items[i] + '"] a', btn).addClass('hidden-column');
			}			
			
        }, 3000 );

});    

 