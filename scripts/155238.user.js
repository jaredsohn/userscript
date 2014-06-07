// ==UserScript==
// @name        The Portal neo functions
// @namespace   Made by Heya on Neofriends.net
// @description Portal neo functions
// @include     nowhere
// @version     1
// ==/UserScript==

function open_item(obj_id){
			alert(obj_id);
	}
	
	function create_bank_acc() {
		document.getElementById('bank_content').innerHTML = "<center><h1>Loading...</h1></center>";
		post_request('http://www.neopets.com/process_bank.phtml', "type=new_account&name=test&add1=why&add2=&add3=&employment=Chia+Custodian&salery=40%2C001+to+60%2C000+NP&account_type=0&initial_deposit=1", "http://www.neopets.com/bank.phtml", function(bank_source) {
				if(bank_source.match('Congratulations on opening an account with The National')) {
					var bank_np = getbetween(bank_source, '<td align="center" style="font-weight: bold;">', '</td>');
					
					if(bank_np == '0 NP') {
						var withdraw_code = "<table><tr><td><input type='text' style='width: 80px;' disabled='disabled' name='withdraw_amount'></td><td><input type='button' disabled='disabled' name='withdraw_button' value='Withdraw'></td></tr></table>";
					} else {
						var withdraw_code = "<table><tr><td><input type='text' style='width: 80px;' name='withdraw_amount'></td><td><input type='button' name='withdraw_button' value='Withdraw'></td></tr></table>";
					}
		
					var deposit_code = "<table><tr><td><input type='text' style='width: 80px;' name='deposit_amount'></td><td><input type='button' name='deposit_button' value=' Deposit '></td></tr></table>";
		
					if(bank_source.match('This means you will not be able to collect any interest until tomorrow.') || bank_source.match('you might want to deposit a few more Neopoints')) {
						var interest_button = "<input type='button' name='collect_interest' disabled='disabled' value='Collect Interest'>";
					} else {
						var interest_button = "<input type='button' name='collect_interest' value='Collect Interest'>";
					}
					document.getElementById('bank_content').innerHTML = '<center><div id="current_balance">Current Balance: <b>'+bank_np+'</b></div><br />'+withdraw_code+'<br />'+deposit_code+'<br />'+interest_button+'<br /><br /><b>Jump to: <a href="http://www.neopets.com/bank.phtml">Bank</a></b></center>';
					document.getElementsByName('withdraw_button')[0].addEventListener('click', withdraw, true);
					document.getElementsByName('deposit_button')[0].addEventListener('click', deposit, true);
				}
		});
	}
	
	function create_shop() {
		alert('test');
	}
	
	function withdraw_till() {
		document.getElementsByName('withdraw_till')[0].disabled="disabled";
		document.getElementById('current_till').innerHTML = "Current Balance: <b>Withdrawing...</b>";
		post_request('http://www.neopets.com/process_market.phtml', "type=withdraw&amount="+GM_getValue('shoptill_np', "0"), "http://www.neopets.com/market.phtml?type=till", function(bank_source) {
				document.getElementById('current_till').innerHTML = "Current Balance: <b>0 NP</b>";
				update_nps(bank_source);
		});
	}

	function withdraw() {
		document.getElementsByName('withdraw_button')[0].disabled="disabled";
		document.getElementsByName('withdraw_amount')[0].disabled="disabled";
		var old_balance = document.getElementById('current_balance').innerHTML;
		document.getElementById('current_balance').innerHTML = "Current Balance: <b>Withdrawing...</b>";
		post_request('http://www.neopets.com/process_bank.phtml', "type=withdraw&amount="+document.getElementsByName('withdraw_amount')[0].value, "http://www.neopets.com/bank.phtml", function(bank_source) {
				document.getElementsByName('withdraw_amount')[0].value="";
				if(bank_source.match("already attempted to withdraw Neopoints")) {
					alert("Sorry, you have already withdrawn 15 times today and can not withdraw again until tomorrow!");
					document.getElementById('current_balance').innerHTML = old_balance;
				} else {
					var banknp = getbetween(bank_source, '<td align="center" style="font-weight: bold;">', '</td>');
					document.getElementById('current_balance').innerHTML = "Current Balance: <b>"+banknp+"</b>";
					if(banknp != "0 NP") {
						document.getElementsByName('withdraw_button')[0].disabled="";
						document.getElementsByName('withdraw_amount')[0].disabled="";
					}
					update_nps(bank_source);
				}
		});
	}
	
	function deposit() {
		document.getElementsByName('deposit_button')[0].disabled="disabled";
		document.getElementsByName('deposit_amount')[0].disabled="disabled";
		document.getElementById('current_balance').innerHTML = "Current Balance: <b>Depositing...</b>";
		post_request('http://www.neopets.com/process_bank.phtml', "type=deposit&amount="+document.getElementsByName('deposit_amount')[0].value, "http://www.neopets.com/bank.phtml", function(bank_source) {
				var banknp = getbetween(bank_source, '<td align="center" style="font-weight: bold;">', '</td>');
				document.getElementsByName('deposit_button')[0].disabled="";
				document.getElementsByName('deposit_amount')[0].value="";
				document.getElementsByName('deposit_amount')[0].disabled="";
				document.getElementById('current_balance').innerHTML = "Current Balance: <b>"+banknp+"</b>";
				if(banknp != '0 NP') {
					document.getElementsByName('withdraw_button')[0].disabled="";
					document.getElementsByName('withdraw_amount')[0].disabled="";
				}
				update_nps(bank_source);
		});
	}
	
	function collect_interest() {
		document.getElementsByName('collect_interest')[0].disabled="disabled";
		document.getElementById('current_balance').innerHTML = "Current Balance: <b>Loading...</b>";
		post_request('http://www.neopets.com/process_bank.phtml', "type=interest", "http://www.neopets.com/bank.phtml", function(collect_source) { 
			document.getElementsByName('collect_interest')[0].disabled="disabled";
			var banknp = getbetween(collect_source, '<td align="center" style="font-weight: bold;">', '</td>');
				document.getElementById('current_balance').innerHTML = "Current Balance: <b>"+banknp+"</b>";
		});
	}
	
	function ssw_search() {
		var item_name = document.getElementById('ssw_search_item').value;
	
		var code = "";
		var user = new Array();
		var price = new Array();
		var source = new Array();
		var num_in_stock = new Array();
	
		loading_bar('ssw_content', 1, 8, 2);
		post_request('http://www.neopets.com/market.phtml', "type=process_wizard&feedset=0&shopwizard="+item_name+"&table=shop&criteria=exact&min_price=0&max_price=99999", "http://www.neopets.com/market.phtml?type=wizard", function(ssw1) { //REQUEST 1
			source[0] = getbetween(ssw1, "/browseshop.phtml", 'buy_obj_info_id');
				
			loading_bar('ssw_content', 2, 8, 2);
			post_request('http://www.neopets.com/market.phtml', "type=process_wizard&feedset=0&shopwizard="+item_name+"&table=shop&criteria=exact&min_price=0&max_price=99999", "http://www.neopets.com/market.phtml?type=wizard", function(ssw2) { //REQUEST 2
				source[1] = getbetween(ssw2, "/browseshop.phtml", 'buy_obj_info_id');
	
				loading_bar('ssw_content', 3, 8, 2);
				post_request('http://www.neopets.com/market.phtml', "type=process_wizard&feedset=0&shopwizard="+item_name+"&table=shop&criteria=exact&min_price=0&max_price=99999", "http://www.neopets.com/market.phtml?type=wizard", function(ssw3) { //REQUEST 3
					source[2] = getbetween(ssw3, "/browseshop.phtml", 'buy_obj_info_id');
								
					loading_bar('ssw_content', 4, 8, 2);
					post_request('http://www.neopets.com/market.phtml', "type=process_wizard&feedset=0&shopwizard="+item_name+"&table=shop&criteria=exact&min_price=0&max_price=99999", "http://www.neopets.com/market.phtml?type=wizard", function(ssw4) { //REQUEST 4
						source[3] = getbetween(ssw4, "/browseshop.phtml", 'buy_obj_info_id');
										
						loading_bar('ssw_content', 5, 8, 2);
						post_request('http://www.neopets.com/market.phtml', "type=process_wizard&feedset=0&shopwizard="+item_name+"&table=shop&criteria=exact&min_price=0&max_price=99999", "http://www.neopets.com/market.phtml?type=wizard", function(ssw5) { //REQUEST 5
							source[4] = getbetween(ssw5, "/browseshop.phtml", 'buy_obj_info_id');
												
							loading_bar('ssw_content', 6, 8, 2);
							post_request('http://www.neopets.com/market.phtml', "type=process_wizard&feedset=0&shopwizard="+item_name+"&table=shop&criteria=exact&min_price=0&max_price=99999", "http://www.neopets.com/market.phtml?type=wizard", function(ssw6) { //REQUEST 6
								source[5] = getbetween(ssw6, "/browseshop.phtml", 'buy_obj_info_id');
										
								loading_bar('ssw_content', 7, 8, 2);
								post_request('http://www.neopets.com/market.phtml', "type=process_wizard&feedset=0&shopwizard="+item_name+"&table=shop&criteria=exact&min_price=0&max_price=99999", "http://www.neopets.com/market.phtml?type=wizard", function(ssw7) { //REQUEST 7
									source[6] = getbetween(ssw7, "/browseshop.phtml", 'buy_obj_info_id');
																
									loading_bar('ssw_content', 8, 8, 2);
									post_request('http://www.neopets.com/market.phtml', "type=process_wizard&feedset=0&shopwizard="+item_name+"&table=shop&criteria=exact&min_price=0&max_price=99999", "http://www.neopets.com/market.phtml?type=wizard", function(ssw8) {
										source[7] = getbetween(ssw8, "/browseshop.phtml", 'buy_obj_info_id');
										
										var final_line = new Array();
										var obj_id;
										for(x=0; x<source.length; x++) {
											var numberofresults = source[x].match(/NP/g).length;
											if(numberofresults != 0) {
												var line = source[x].split(item_name);
												user[x] = getbetween(line[0], "<b>", "</b>");
												price[x] = getbetween(line[0], 'buy_cost_neopoints=', '"><b>');
												num_in_stock[x] = getbetween(line[1], '</td><td align="center" bgcolor="#F6F6F6">', '</td><td align="right"');
												obj_id = getbetween(line[0], "&buy_obj_info_id=", "&buy_cost_neopoints="+price[x]);
												final_line[x] = price[x]+" : "+user[x]+" = "+num_in_stock[x];
											}
										}
										
										final_line.sort(function(a,b){
											var x = parseInt(getbetween("m"+a, "m", " :"));
											var y = parseInt(getbetween("m"+b, "m", " :"));
											return x-y;
										});
										var last_user = "none";
										for(i=0; i<final_line.length; i++) {
											var pricey = getbetween("m"+final_line[i], "m", " :");
											var userx = getbetween(final_line[i], pricey+" : ", " =");
											var num_in_stockz = getbetween(final_line[i]+"$", userx+" = ", "$");
											if(userx != last_user) {
												code = code+'<tr><td align="left"><b><a href="http://www.neopets.com/browseshop.phtml?owner='+userx+'&buy_obj_info_id='+obj_id+'&buy_cost_neopoints='+pricey+'">'+userx+'</a></td><td align="center">'+num_in_stockz+'</td><td align="right">'+pricey+' NP</td></r>';
											}
											last_user = userx;
										}
	
										document.getElementsByClassName('ssw_content')[0].innerHTML = '<center><b>Searching for: <span style="font-size: 14pt;">'+item_name+'</span></b> <a href="/search.phtml?selected_type=object&string='+item_name+'"><img src="http://images.neopets.com/icons/search_sm.gif" width="11" height="11" alt="Get details on this item"alt="Item Details" title="Item Details" border="0"></a><br /><table style="padding-top: 5px;" width="350" align="center" cellpadding="3" cellspacing="0" border="0"><tr><td class="contentModuleHeaderAlt"><b>Shop Owner</b></td><td class="contentModuleHeaderAlt" width="40"><b>Stock</b></td><td class="contentModuleHeaderAlt" width="80"><div align="right"><b>Price</b></div></td></tr>'+code+"</table><br /><input type='hidden' id='ssw_search_item' value='"+item_name+"'><input type='button' name='re_search' value='Re-Search'><input type='button' name='another_search' value='Another Search'></center>";
										document.getElementsByName('re_search')[0].addEventListener('click', ssw_search, true);
										document.getElementsByName('another_search')[0].addEventListener('click', search_again, true);
																	
									});
								});
							});
						});								
					});		
				});	
			});
		});
	}
	
	function search_again() {
		document.getElementsByClassName('ssw_content')[0].innerHTML = '<b>Item Name</b><br /><input type="text" id="ssw_search_item" style="width: 200px;"><br /><br /><input type="button" name="ssw_search_button" value="Search SSW">';
		document.getElementsByName('ssw_search_button')[0].addEventListener('click', ssw_search, true);
	}