// ==UserScript==
// @author         Gazonk Foo
// @name           All My MM Offers
// @namespace      eAllMyOffers
// @description    Display my monetary market offers on a single page
// @version        1.0.2
// @include        http://www.erepublik.com/en/exchange/myOffers*
// ==/UserScript==

var script = document.createElement('script'); 
script.type = "text/javascript"; 
script.innerHTML = (<><![CDATA[
	function populateOfferList(page) {
		var url_for_list = $j('a#ajax_action_select_link').attr('href');
		var select_page = $j('#select_page').val();
		var account_type = $j('#account_type').val();
		var action_path = $j('#action_path').val();
		
		$j('#table_list_offers').fadeOut('slow');
		$j('#pagination_pager').fadeOut('slow');
		$j('#list_offers_ajax_loader').fadeIn('slow');
		
		$j.ajax({
			type: 'GET',
			url: url_for_list,
			dataType: 'html',
			data: {
				select_page: select_page,
				buy_currency_history_id: buy_currency_id,
				sell_currency_history_id: sell_currency_id,
				account_type: account_type,
				action_path: action_path,
				page: "page=1"
			},
			success: function(html) {
				$j('#populateOffers').replaceWith(html);
				
				var navIndex = $j(html).find('#pagination_pager li:has(a[class="on"])').index();
				var nextIndex = $j(html).find('#pagination_pager li:has(a[class="next"])').index() - 1;
				if (navIndex < nextIndex) {
					populateOfferPage(2);
				}
				
				$j('#pagination_pager').remove();
			}
		});
	}
	
	function deleteOffer_onClick(object) {
		var offer_id = object.id.split('_')[3];
		var _token = $j('#_token').val();
		var account_type = $j('#account_type').val();
		var sell_currency = $j('#sell_currency').val();
		var buy_currency = $j('#buy_currency').val();
		var delete_message_confirm = $j('#delete_message_confirm').val();
		var delete_button = $j('#delete_form_edit_' + offer_id);

		var url_for_remove = $j('#url_for_remove').attr('href');

		if (!confirm(delete_message_confirm)) {
			return false;
		}

		$j.ajax({
			type: 'POST',
			url: url_for_remove,
			dataType: 'html',
			data: {
				offer_id: offer_id,
				_token: _token,
				page: "page=1",
				account_type: account_type,
				buy_currency: buy_currency,
				sell_currency: sell_currency
			},
			success: function(html) {
				$j('#table_list_offers tr:eq(1)').replaceWith($j(html).find('#table_list_offers tr:eq(1)'));
				
				if($j(html).find('#table_list_offers tr:eq(1) div[class~="validicon"]').length != 0) {
					$j('#'+object.id).parents('tr').remove();
				}
			}
		});
	}
	
	function editOffer_onClick(object) {
		var offer_id = object.id.split('_')[3];
		var submit_amount_form = $j('#form_amount_edit_' + offer_id).val();
		var submit_exchange_rate_form = $j('#form_exchange_rate_edit_' + offer_id).val();
		var submit_amount = $j('#form_amount');
		var submit_exchange_rate = $j('#form_exchange_rate');
		var edit_message_confirm = $j('#edit_message_confirm').val();

		submit_amount.val(submit_amount_form);
		submit_exchange_rate.val(submit_exchange_rate_form);
		
		if (validate_amount(object) && validate_exchange_rate(object) && validate_change_onEdit(object)) {
			if (confirm(edit_message_confirm)) {
				sendEdit(object);
			}
		} else {
			return false;
		}
	}

	function sendEdit(object) {
		var offer_id = object.id.split('_')[3];
		var url_for_edit = $j('a#url_for_edit').attr('href');
		var account_type = $j('#account_type').val();
		var amount_to_edit = $j('#form_amount').val();
		var exchange_rate_to_edit = $j('#form_exchange_rate').val();
		var old_amount_value = $j('#old_amount_offer_' + offer_id).val();
		var old_exchange_rate_value = $j('#old_exchange_rate_offer_' + offer_id).val();
		var sell_currency = $j('#sell_currency_id_' + offer_id).val();
		var buy_currency = $j('#buy_currency_id_' + offer_id).val();
		var _token = $j('#_token').val();
		var buy_currency_history_id = $j('a#buy_selector').attr('title');
		var sell_currency_history_id = $j('a#sell_selector').attr('title');
		var select_page = $j('#select_page').val();

		$j.ajax({
			type: 'POST',
			url: url_for_edit,
			dataType: 'html',
			data: {
				select_page: select_page,
				account_type: account_type,
				page: "page=1",
				form_amount: amount_to_edit,
				form_exchange_rate: exchange_rate_to_edit,
				_token: _token,
				buy_currency_history_id: buy_currency_id,
				sell_currency_history_id: sell_currency_id,
				buy_currency: buy_currency,
				sell_currency: sell_currency,
				old_amount_value: old_amount_value,
				old_exchange_rate_value: old_exchange_rate_value,
				offer_id: offer_id
			},
			success: function(html) {
				$j('#table_list_offers tr:eq(1)').replaceWith($j(html).find('#table_list_offers tr:eq(1)'));
			}
		});
	}
	
	function populateOfferPage(page) {
		var url_for_list = $j('a#ajax_action_select_link').attr('href');
		var select_page = $j('#select_page').val();
		var account_type = $j('#account_type').val();
		var action_path = $j('#action_path').val();
		
		$j.ajax({
			type: 'GET',
			url: url_for_list,
			dataType: 'html',
			data: {
				select_page: select_page,
				buy_currency_history_id: buy_currency_id,
				sell_currency_history_id: sell_currency_id,
				account_type: account_type,
				action_path: action_path,
				page: "page="+page
			},
			success: function(html) {
				$j('#table_list_offers').append($j(html).find('#table_list_offers tr:gt(1)'));
				
				var navIndex = $j(html).find('#pagination_pager li:has(a[class="on"])').index();
				var nextIndex = $j(html).find('#pagination_pager li:has(a[class="next"])').index() - 1;
				if (navIndex < nextIndex) {
					populateOfferPage(page+1);
				}
			}
		});
	}
]]></>).toString();
document.getElementsByTagName('head')[0].appendChild(script);