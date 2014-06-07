// ==UserScript==
// @name        Restore Front Page Dates
// @namespace   none
// @description This brings back the functionality of the front page to show deals by day, instead of the "deals you may have missed" blob.
// @include     http://*slickdeals.net/*
// @include     https://*slickdeals.net/*
// @version     1.2
/*
1.2 - clicking on a deal now properly shows the dropdown javascript event, instead of loading the permapage
	- new issue found: this script does not work properly if user has all deals expanded by default
1.1.2 - removed jquery require altogether. slickdeals loads it, and this script loading it again was causing problems.
1.1.1 - fixed jquery include to be the version used by slickdeals. newer versions cause slickdeals to break
1.1 - removed page 2 button and updated next page to go to page 3
1.0 - initial script
*/
// ==/UserScript==

$(document).ready(function(){
	if ($('#deal_header_missed')){
		// get the last 3 days from page 2 and remove 'deals you may have missed' items.
		// Only run on page 1, where the deal_header_missed div exists. We don't want this ajax to run on all the other pages!
		$.ajax({
		url: "index.php?page=2",
		success: function(data) {
		    
			$('#deal_header_missed').nextAll('.dealitem').remove(); // removes all items after the 'deals you may have missed' header

			pagetwo = $(data).find('.deal_header_date, .dealitem:not(.populardeals)'); // grabs page 2 deals and date headers
			
			//$('a.dealitem',pagetwo).click(deal_list_item_click);
			

			$('#deal_header_missed').after(pagetwo); // inserts the deals and dates
			$('#deal_header_missed').nextAll('.dealitem').click(deal_list_item_click); // applies the javascript event handlers
			$('#deal_header_missed').nextAll('.deal_header_date_link')
				.click(function (data) {
					var id = $(this)
					    .attr('id')
					    .replace('link_', '');
					var populardeals = [];
					var ddids = [];
					$('#' + id)
					    .nextUntil('.deal_header_date')
					    .filter('.localdealitem')
					    .each(function () {
					    var ddid = $(this)
						.attr('id')
						.replace('deal_header_localdailydeal_', '');
					    ddids.push(ddid);
					});
					if (ddids.length > 0) {
					    var fplist = ddids.join(',');
					    sdlocalfpdeal_get(fplist);
					}
				}); // applies the javascript handler to the date header - clicking the date expands all deals for that date

			$('#deal_header_missed').remove(); // removes the header 'deals you may have missed'
		
			//update the 'next' page button and remove page 2
			$($('.search_pagenav')[1]).remove();

			href = $('.search_pagenav:contains("Next")').attr("href")
			href = href.substr(0,href.length-1) + 3
			$('.search_pagenav:contains("Next")').attr("href", href)
		}
		});
	}
});
