// ==UserScript==
// @name        The Portal
// @namespace   Made by Heya on Neofriends.net
// @description Portal load functions
// @include     nowhere
// @version     1
// ==/UserScript==
	
function load_portal_shortcut() {
		var one = "document.getElementById('sip').src='http://images.neopets.com/portal/images/switch1_on.gif'";
		var two = "document.getElementById('sip').src='http://images.neopets.com/portal/images/switch1.gif'";

		document.getElementsByClassName('user medText')[0].innerHTML = document.getElementsByClassName('user medText')[0].innerHTML+' | <a href="http://www.neopets.com/portal.phtml" class="tl">Portal&nbsp;<img src="http://images.neopets.com/portal/images/switch1.gif" id="sip" onMouseOver="'+one+'" onMouseOut="'+two+'" title="Use site in Portal" height="22" width="22" border="0" align="absmiddle"></a>';
	}
	
	function load_button_events() {
		document.getElementsByName('ssw_search_button')[0].addEventListener('click', ssw_search, true);
					
					if(GM_getValue('shop_source', '').match("Your account must be at least 24 hours old to create a shop") || GM_getValue('shop_source', '').match("You don't have your own shop yet!")) {
						document.getElementsByName('create_shop')[0].addEventListener('click', create_shop, true);
					} else {
						document.getElementsByName('withdraw_till')[0].addEventListener('click', withdraw_till, true);
					}
					
					if(GM_getValue('bank_source', '').match("If you wish to upgrade your account to the next level")) {
						if(GM_getValue('bank_source', '').match('This means you will not be able to collect any interest until tomorrow.') || GM_getValue('bank_source', '').match('you might want to deposit a few more Neopoints') || GM_getValue('bank_source', '').match('You have already collected your interest today.')) {
						} else{
							document.getElementsByName('collect_interest')[0].addEventListener('click', collect_interest, true);
						} 
					
						document.getElementsByName('withdraw_button')[0].addEventListener('click', withdraw, true);
						document.getElementsByName('deposit_button')[0].addEventListener('click', deposit, true);
					} else {
						document.getElementsByName('create_bank_acc')[0].addEventListener('click', create_bank_acc, true);
					}
					
					var inv_id = GM_getValue('inv_ids', '').split('|');
					for(var i=0; i<inv_id.length; i++) {
						document.getElementsByName(inv_id[i])[0].addEventListener('click', function() {  }, true);
					}
	}

	function load_inventory(load_in) {
		get_request('http://www.neopets.com/objects.phtml?type=inventory', function(inventory) {
			if(inventory.match("You aren't carrying anything!")) {
				var num_in_inv = '0';
				var inv_code = "";
			} else {
				var source = document.createElement('div');
				source.innerHTML = inventory;
				var num_in_inv = source.getElementsByClassName('contentModuleContent')[0].innerHTML; //getbetween(inventory, 'You currently hold ', 'items. The maximum you should hold is');
				num_in_inv = parseInt(getbetween(num_in_inv, "<b>", "</b>"));
				var item_source = source.getElementsByClassName('contentModuleContent')[1].innerHTML.split('</td>');
				var inv_code = "<table><tr>";
				var inv_ids = "";
				for(var i=0; i<num_in_inv; i++) {
					if(i==6 || i==12 || i==18 || i==24 || i==30 ||i==36 ||i==42 ||i==48 ||i==52) {
						inv_code = inv_code+"</tr><tr>";
					}
					var id = getbetween(item_source[i], 'onclick="openwin(', ');">');
					if(inv_ids == "") {
						inv_ids = id;
					} else {
						inv_ids = inv_ids+"|"+id;
					}
					var temp_source = document.createElement('div');
					temp_source.innerHTML = item_source[i];
					var code = 'window.open("http://www.neopets.com/iteminfo.phtml?obj_id='+id+'","","width=400,height=450")';
					var image = temp_source.getElementsByTagName('img')[0].src;
					inv_code = inv_code+"<td><input type='image' src='"+image+"' style='cursor:pointer;cursor:hand' width='30' height='30' name='"+id+"'></td>";
				}
				GM_setValue('inv_ids', inv_ids);
				inv_code = inv_code+"</tr></table>";
			}
			GM_setValue('inventory_code', '<div class="contentModule" style="height: 100%; width: 230px;"><table cellpadding="3" cellspacing="0" border="0" class="contentModuleTable"><tr><td class="contentModuleHeader">Inventory</td></tr><tr><td align="left" valign="top" class="contentModuleContent"><center>You currently hold <b>'+num_in_inv+'</b> items.<br /><br />'+inv_code+'</center></td></tr></table></div>');
			load_in();
		});
	}
	
	function load_stocks(load_st) {
		get_request('http://www.neopets.com/stockmarket.phtml?type=portfolio',function(stocks) {
			if(stocks.match('Mkt Value')) {
				var stock_code = getbetween(stocks, "name='_ref_ck'", "<span id='show_sell'");
				stock_code = "This is a list of all your stocks. To sell your stocks, go to your <a href='http://www.neopets.com/stockmarket.phtml?type=portfolio'><b>portfolio</b></a>!<br /><br />"+getbetween(stock_code+"m", "'>", "m")+"<br /><center><b>Jump to: <a href='http://www.neopets.com/stockmarket.phtml?type=list&full=true'>Full List</a> | <a href='http://www.neopets.com/stockmarket.phtml?type=portfolio'>Portfolio</a></b></center>";
			} else {
				var stock_code = "You have no stocks. Click <a href='http://www.neopets.com/stockmarket.phtml?type=list&full=true'><b>here</b></a> to buy stocks!";
			}
    		GM_setValue('stock_code', '<div class="contentModule" style="height: 100%; width: 560px;"><table cellpadding="3" cellspacing="0" border="0" class="contentModuleTable"><tr><td class="contentModuleHeaderAlt">Stock Market</td></tr><tr><td align="left" valign="top" class="contentModuleContent">'+stock_code+'</td></tr></table></div>');
			load_st();
		});
	}
	
	function load_bank(load_ba) {
		get_request('http://www.neopets.com/bank.phtml',function(bank) {
			GM_setValue('bank_source', bank);
			if(bank.match("If you wish to upgrade your account to the next level")) {
				var bank_np = getbetween(bank, '<td align="center" style="font-weight: bold;">', '</td>');
					
				if(bank_np == '0 NP') {
					var withdraw_code = "<table><tr><td><input type='text' style='width: 80px;' disabled='disabled' name='withdraw_amount'></td><td><input type='button' disabled='disabled' name='withdraw_button' value='Withdraw'></td></tr></table>";
				} else {
					var withdraw_code = "<table><tr><td><input type='text' style='width: 80px;' name='withdraw_amount'></td><td><input type='button' name='withdraw_button' value='Withdraw'></td></tr></table>";
				}
	
				var deposit_code = "<table><tr><td><input type='text' style='width: 80px;' name='deposit_amount'></td><td><input type='button' name='deposit_button' value=' Deposit '></td></tr></table>";
	
				if(bank.match('This means you will not be able to collect any interest until tomorrow.') || bank.match('you might want to deposit a few more Neopoints') || bank.match('You have already collected your interest today.')) {
					var interest_button = "<input type='button' name='collect_interest' disabled='disabled' value='Collect Interest'>";
				} else {
					var interest_button = "<input type='button' name='collect_interest' value='Collect Interest'>";
				}
				var bank_code = '<div id="current_balance">Current Balance: <b>'+bank_np+'</b></div><br />'+withdraw_code+'<br />'+deposit_code+'<br />'+interest_button+'<br /><br /><b>Jump to: <a href="http://www.neopets.com/bank.phtml">Bank</a></b>';
			} else {
				var bank_code = 'You do not have a bank account!<br /><br /><input type="button" name="create_bank_acc" value="Create Bank Account">';
			}
	
			GM_setValue('bank_code', '<div class="contentModule" style="height: 100%; width: 230px;"><table cellpadding="3" cellspacing="0" border="0" class="contentModuleTable"><tr><td class="contentModuleHeader">Bank</td></tr><tr><td align="left" valign="top" class="contentModuleContent"><div id="bank_content"><center>'+bank_code+'</center></div></td></tr></table></div>');
			load_ba();
		});
	}
	
	function load_shop(load_sh) {
		get_request('http://www.neopets.com/market.phtml?type=till',function(shoptill) {
			if(shoptill.match("your till")) {
				var shoptill_np = getbetween(shoptill, 'You currently have <b>', '</b> in your till.')
				GM_setValue('shoptill_np', getbetween("m"+shoptill_np, "m", " NP").split(',').join(''));
				if(shoptill_np == "0 NP") {
					var till_code = '<input type="button" name="withdraw_till" disabled="disabled" value="Withdraw Till">';
				} else {
					var till_code = '<input type="button" name="withdraw_till" value="Withdraw Till">';
				}
				var shop_code = '<div id="current_till">Current Balance: <b>'+shoptill_np+'</b></div>'+till_code+'<br /><br />';
			} else {
				var shop_code = 'You do not have a shop!<br /><br /><input type="button" name="create_shop" value="Create Shop">';
			}
					
			loading_bar('content', 5, 5, 10);

			get_request('http://www.neopets.com/market.phtml?type=your',function(shopyour) {
				GM_setValue('shop_source', shopyour);
				if(shopyour.match("When you sell an item, the Neopoints will go into your")) {
					if(shopyour.match("There are no items in your shop!")) {
						var myshop_code = "<b>There are no items in your shop!</b>";
					} else {
						var myshop_stock = getbetween(shopyour, 'Items Stocked : <b>', '</b> &middot;');
						var myshop_open = getbetween(shopyour, ' Free Space : <b>', '</b></center><p>');
						var myshop_code = 'Items Stock: <b>'+myshop_stock+'</b> &middot; Free Space: <b>'+myshop_open+'</b>';	
					}
				} else {
					var myshop_code = "";	
				}
					
				GM_setValue('shop_code', '<div class="contentModule" style="height: 100%; width: 230px;"><table cellpadding="3" cellspacing="0" border="0" class="contentModuleTable"><tr><td class="contentModuleHeader">My Shop</td></tr><tr><td align="left" valign="top" class="contentModuleContent"><center>'+shop_code+myshop_code+'<br /><br /><b>Jump to: <a href="http://www.neopets.com/market.phtml?type=your">My Shop</a></b></center></td></tr></table></div>');
				load_sh();
			});
		});
	}

	function load_dailies() {
		GM_setValue('dailies_code', '<div class="contentModule" style="height: 100%; width: 230px;"><table cellpadding="3" cellspacing="0" border="0" class="contentModuleTable"><tr><td class="contentModuleHeader">Dalies</td></tr><tr><td align="left" valign="top" class="contentModuleContent"><center><table align="center"><tr><td><a href="http://www.neopets.com/pirates/anchormanagement.phtml"><img src="http://images.neopets.com/items/fur_pirate_anchor.gif" width="20" height="20"></a></td><td><a href="http://www.neopets.com/pirates/anchormanagement.phtml">Anchor Management</a></td></tr><tr><td><a href="http://www.neopets.com/halloween/applebobbing.phtml"><img src="http://images.neopets.com/items/spf_slimy_apple.gif" width="20" height="20"></a></td><td><a href="http://www.neopets.com/halloween/applebobbing.phtml">Apple Bobbing</a></td></tr><tr><td><a href="http://www.neopets.com/desert/shrine.phtml"><img src="http://images.neopets.com/items/bd_desert_deathmask.gif" width="20" height="20"></a></td><td><a href="http://www.neopets.com/desert/shrine.phtml">Coltzans Shrine</a></td></tr><tr><td><a href="http://www.neopets.com/altador/council.phtml"><img src="http://images.neopets.com/items/toy_kingaltador_figure.gif" width="20" height="20"></a></td><td><a href="http://www.neopets.com/altador/council.phtml">Council Chamber</a></td></tr><tr><td><a href="http://www.neopets.com/worlds/geraptiku/tomb.phtml"><img src="http://images.neopets.com/items/bd_ger_goldtalisman.gif" width="20" height="20"></a></td><td><a href="http://www.neopets.com/worlds/geraptiku/tomb.phtml">Deserted Tomb</a></td></tr><tr><td><a href="http://www.neopets.com/pirates/forgottenshore.phtml"><img src="http://images.neopets.com/items/bg_forgotten_shore.gif" width="20" height="20"></a></td><td><a href="http://www.neopets.com/pirates/forgottenshore.phtml">Forgotten Shore</a></td></tr><tr><td><a href="http://www.neopets.com/desert/fruitmachine.phtml"><img src="http://images.neopets.com/items/food_desert3.gif" width="20" height="20"></a></td><td><a href="http://www.neopets.com/desert/fruitmachine.phtml">Fruit Machine</a></td></tr><tr><td><a href="http://www.neopets.com/lab.phtml"><img src="http://images.neopets.com/battledome/opponent_pics/104.gif" width="20" height="20"></a></td><td><a href="http://www.neopets.com/lab.phtml">Lab Ray</a></td></tr><tr><td><a href="http://images.neopets.com/woon/meteor.phtml"><img src="http://images.neopets.com/items/bd_meteor_rock.gif" width="20" height="20"></a></td><td><a href="http://www.neopets.com/moon/meteor.phtml">Meteor</a></td></tr><tr><td><a href="http://www.neopets.com/petpetlab.phtml"><img src="http://images.neopets.com/items/petpetlab_soot.gif" width="20" height="20"></a></td><td><a href="http://www.neopets.com/petpetlab.phtml">Petpet Lab Ray</a></td></tr><tr><td><a href="http://www.neopets.com/games/game.phtml?game_id=905"><img src="http://images.neopets.com/items/bat_desert_scarab.gif" width="20" height="20"></a></td><td><a href="http://www.neopets.com/games/game.phtml?game_id=905">Qasalan Expellibox</a></td></tr><tr><td><a href="http://www.neopets.com/shop_of_offers.phtml?slorg_payout=yes"><img src="http://images.neopets.com/items/mall_roamingwindslorg.gif" width="20" height="20"></a></td><td><a href="http://www.neopets.com/shop_of_offers.phtml?slorg_payout=yes">Rich Slorg</a></td></tr><tr><td><a href="http://www.neopets.com/medieval/symolhole.phtml"><img src="http://images.neopets.com/items/symol_brown.gif" width="20" height="20"></a></td><td><a href="http://www.neopets.com/medieval/symolhole.phtml">Symol Hole</a></td></tr><tr><td><a href="http://www.neopets.com/faerieland/tdmbgpop.phtml"><img src="http://images.neopets.com/items/toy_bluegrundo.gif" width="20" height="20"></a></td><td><a href="http://www.neopets.com/faerieland/tdmbgpop.phtml">The Discarded Magical Blue Grundo Plushie of Prosperity</a></td></tr><tr><td><a href="http://www.neopets.com/island/tombola.phtml"><img src="http://images.neopets.com/items/toy_squeezy_tombola.gif" width="20" height="20"></a></td><td><a href="http://www.neopets.com/island/tombola.phtml">Tombola</a></td></tr><tr><td><a href="http://www.neopets.com/petpetpark/daily.phtml"><img src="http://images.neopets.com/items/toy_bb_royaltoybox.gif" width="20" height="20"></a></td><td><a href="http://www.neopets.com/petpetpark/daily.phtml">Weltrudes Toy Chest</a></td></tr><tr><td><a href="http://www.neopets.com/water/fishing.phtml"><img src="http://images.neopets.com/items/vor_evilcarp.gif" width="20" height="20"></a></td><td><a href="http://www.neopets.com/water/fishing.phtml">Ye Olde Fishing Vortex</a></td></tr></table></center></td></tr></table></div>');
	}