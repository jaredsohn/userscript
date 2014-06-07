// ==UserScript==
// @name        Steam: Complete My Package
// @description Helps you to find games and dlcs in the package that you don't already own
// @include     http://store.steampowered.com/sub/*
// @include     http://store.steampowered.com/app/*
// @include		http://store.steampowered.com/search/*
// @version     0.0.6
// ==/UserScript==

(function() {
	
function main () {

var script = document.createElement('script');
script.setAttribute('src','https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js');
script.setAttribute('id','jquery');
document.head.appendChild(script);

find = function(){
	var page;
	if(/\/app\//.test(location.href)){
		page = 'app';
    } else if(/\/sub\//.test(location.href)){
    	page = 'sub';
    } else {
    	page = 'search';
    }

	var game_row;

	if(page == 'app'){
		game_row = '.game_area_dlc_row';
		game_price = '.game_notown .game_area_dlc_price';
		game_purchase_price = '.game_purchase_price';
	} else if (page == 'sub'){
		game_row = '.tab_row .tab_overlay a';
		game_price = '.game_notown .tab_price';
		game_purchase_price = '.package_totals_row';
    } else if (page == 'search') {
    	game_row = '.search_result_row';
    }

	jQuery.noConflict();
	var checked_games = 0;
	var all_games = jQuery(game_row).length;
	window.apps_to_buy = [];
	window.apps_added = 0;
	window.addToCartComplete = function(){
		jQuery.each(apps_to_buy, function(index, value){
			jQuery.post(
				"http://store.steampowered.com/cart/",
				{
					"action": "add_to_cart",
					"subid": value
				},
				function(data){
					apps_added++;
					if(apps_added == apps_to_buy.length){
						window.location.href = "http://store.steampowered.com/cart/";
					}
				}
				);
		});
		return false;
	};

	window.addToCartMy = function(appid){
		jQuery.post(
			"http://store.steampowered.com/cart/",
			{
				"action": "add_to_cart",
				"subid": appid
			},
			function(data){
				window.location.href = "http://store.steampowered.com/cart/";
			}
		);
		return false;
	};

	var sum_games = function(){
		var total_price = 0;

		jQuery(game_price).each(function(index, elem){
			var matches = /(?:$|£)?(\d+)(?:\.|,)?(\d+)?(?:&nbsp;)?(?: pуб.|€)?(?:\s+)?(?:<\/div>\s*)*$/.exec(jQuery(elem).html().trim());
			if(matches !== null){
				var price = parseInt(matches[1], 10);
				if(matches[2] !== undefined){
					price += parseInt(matches[2], 10)/100;
				}
				total_price += price;
			}
		});

		if(total_price === 0){
			return false;
		}

		var currency = /(pуб.|\$|£|€)/.exec(jQuery(jQuery(game_purchase_price)[0]).html());
		var price_string = '';
		switch(currency[1]){
			case 'pуб.':
				price_string = total_price + '&nbsp;pуб.';
				break;
			case '$':
				price_string = "$" + total_price.toFixed(2);
				break;
			case '£':
				price_string = "£" + total_price.toFixed(2);
				break;
			case '€':
				price_string = total_price.toFixed(2).toString().replace('.',',') + "€";
				break;
			default:
				price_string = total_price.toFixed(2);
		}

		if(page == 'sub'){
			var bundle_price = 0;
			var bundle_cost = /(?:$|£)?(\d+)(?:\.|,)?(\d+)?(?:&nbsp;)?(?:pуб.|€)?(?:\s+)?$/.exec(jQuery(jQuery('.package_totals_row')[0]).html());
			if(bundle_cost !== null){
				bundle_price = parseInt(bundle_cost[1], 10);
				if(bundle_cost[2] !== undefined){
					bundle_price += parseInt(bundle_cost[2], 10)/100;
				}
			}

			var price_class = 'green';
			if(bundle_price < total_price){
				price_class = 'red';
			}

			jQuery('<div class="package_totals_row package_total_' + price_class + '"><div class="price package_total_' + price_class + '">' + price_string + '</div>Price of the games you don\'t own:</div>').appendTo('.package_totals_area');
		}

		var text = 'Complete my package';
		if(page == 'app'){
			text = 'Complete my DLC collection';
		}

		var block_html = '<div id="game_area_purchase_complete"><div class="game_area_purchase_game"><h1>' + text + '</h1><div class="game_purchase_action game_purchase_action_bg"><div class="game_purchase_price price">' + price_string + '</div><div class="btn_addtocart"><div class="btn_addtocart_left"></div><a class="btn_addtocart_content" href="javascript:addToCartComplete();">Add to Cart</a><div class="btn_addtocart_right"></div></div></div></div></div>';

		if(page == 'app'){
			jQuery(block_html).insertAfter('.game_area_dlc_section');
		} else if (page == 'sub') {
			jQuery(block_html).appendTo('.game_description_column');
		}
	};

	if(localStorage.getItem('complete_games') === null){
		localStorage.setItem('complete_games', JSON.stringify({"apps":[]}));
	}

	var check_cache = function(url){
		var matches = /http:\/\/store.steampowered.com\/app\/(\d+)\//.exec(url);
		if (matches === null) {
			return true;
		}
		var cache = JSON.parse(localStorage.getItem('complete_games'));
		return cache["apps"].indexOf(matches[1]) !== -1;
	};

	var save_cache = function(url){
		var matches = /http:\/\/store.steampowered.com\/app\/(\d+)\//.exec(url);
		var cache = JSON.parse(localStorage.getItem('complete_games'));
		cache["apps"].push(matches[1]);
		localStorage.setItem('complete_games', JSON.stringify(cache));
	};

	window.check_games = function(){
		jQuery(game_row).each(function(index, elem){
			(function(elem){
				var url = jQuery(elem).attr('href');
				console.log(url);
				if(check_cache(url)){
					if(page == 'app' || page == 'search'){
						jQuery(elem).addClass('game_own');
					} else {
						jQuery(elem).parent().parent().addClass('game_own');
					}
					checked_games++;

					if(checked_games == all_games && page != 'search'){
						sum_games();
					}
				} else {
					jQuery.get(url, function(data){
						if(jQuery(data).find('.game_area_already_owned').html()){
							save_cache(url);
							//расставляем стили
							if(app){
								jQuery(elem).addClass('game_own');
							} else {
								jQuery(elem).parent().parent().addClass('game_own');
							}
						} else {
							if(page == 'app' || page == 'search'){
								jQuery(elem).addClass('game_notown');
							} else {
								jQuery(elem).parent().parent().addClass('game_notown');
								var link = jQuery(jQuery(data).find('.btn_addtocart_content')[0]).attr('href');
								var app_id = /javascript:addToCart\(\s?(\d+)\);/.exec(link);
								if(app_id !== null){
									apps_to_buy.push(app_id[1]);
									
									if(page == 'sub'){
										jQuery(elem).parent().parent().append('<div class="add_to_cart_userscript"><a href="javascript:addToCartMy(' + app_id[1] + ');"><img src="http://i.imgur.com/Rhv4ccC.png"></a></div>');
									}
								}
							}
						}
						checked_games++;

						if(checked_games == all_games && page != 'search'){
							sum_games();
						}
							
					});
				}
				
			})(elem);
			
		});
	};

	
	setTimeout(function() {
		window.check_games();
	}, (page == 'search' ? 5000 : 100));

	console.log('change!');
	jQuery(window).bind('hashchange', function() {
		setTimeout(function() {
			window.check_games();
		}, 5000);
	});
};

document.getElementById('jquery').onload = find;

}

var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ main +')();'));
(document.body || document.head || document.documentElement).appendChild(script);

var style = document.createElement('style');
style.appendChild(document.createTextNode('.add_to_cart_userscript{position:relative;top:27px;left:522px;z-index:10000;width:30px;}.game_own{opacity:0.3;}.package_total_red{color:#f66 !important;}.package_total_green{color:#8BC53F !important;}.tab_discount.discount_pct{height:26px;line-height:26px;top:27px;right:96px;}'));
(document.body || document.head || document.documentElement).appendChild(style);

})();