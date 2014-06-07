// ==UserScript==
// @name           Glitch - Auction - Buy Now Button
// @namespace      zimzat.com
// @description    Create a button on all Glitch auction listing pages to immediately buy an item without leaving the page. Good for buying multiple items at a time. Double click the [$$] button to confirm immediate purchase.
// @include        http://www.glitch.com/auctions/*
// ==/UserScript==

// Thanks to Shog9 for this idea for making the script work in both Chrome and Firefox:
// http://meta.stackoverflow.com/questions/46562
function with_jquery(f) {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.textContent = '(' + f.toString() + ')(jQuery)';
	document.body.appendChild(script);
};

with_jquery(function($) {
	/**
	 * Sets the status text output of an auction row, hiding the timing and actions.
	 *
	 * @param jQuery $row
	 * @param string text
	 */
	var setAuctionStatus = function($row, html) {
		$row.find('td.actions, td.timing').hide();

		if (!$row.find('td.status').length) {
			$row.append('<td class="status" colspan="2"></td>');
		}

		$row.find('td.status').html(html)
			.find('.alert').css('margin', '0');
	};

	/**
	 * Starts the chain of requests necessary to purchase an auction immediately.
	 *
	 * @param jQuery $this [$$] button clicked.
	 */
	var purchaseAuction = function($this) {
		var $row = $this.parents('tr:first'),
			auctionUrl = $this.parent().find('.purchase').attr('href');

		setAuctionStatus(
			$row,
			'Confirming Auction Token...'
		);

		$.ajax({
			type: 'get',
			url: auctionUrl,
			success: function(data) {
				var $data = $(data),
					$alert = $data.find('.alert');

				if ($alert.length) {
					setAuctionStatus(
						$row,
						$('<div />').append($alert.clone()).remove().html()
					);
					return;
				}

				setAuctionStatus(
					$row,
					'Purchasing auction...'
				);

				$.ajax({
					type: 'post',
					url: auctionUrl,
					data: {
						done: '1',
						crm: $data.find('input[name="crm"]').val(),
						id: ''
					},
					success: function(confirmData) {
						setAuctionStatus(
							$row,
							$('<div />').append($(confirmData).find('.alert').clone()).remove().html()
						);
					}
				});
			}
		});
	};

	// Create the $$ buttons next to the existing purchase buttons (also: reset 
	$('.purchase')
		.width('auto')
		.after(' <a class="button direct-purchase">$$</a>');

	// Set the action handlers for double clicking on the buy now buttions.
	$('.direct-purchase').dblclick(function(e) {
		var $this = $(this);

		purchaseAuction($this);

		e.preventDefault();
		e.stopPropagation();
		e.stopImmediatePropagation();
		return false;
	});

});
