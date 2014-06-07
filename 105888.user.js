// ==UserScript==
// @name			Statementer for Envato's marketplaces
// @creator			userscripts@revaxarts.com
// @namespace		revaxarts.com
// @description		Envato Statement beautifier
// @date			2012-08-22
// @version			1.9.6.1
// @include			http://activeden.net/statement*
// @include			http://audiojungle.net/statement*
// @include			http://themeforest.net/statement*
// @include			http://videohive.net/statement*
// @include			http://graphicriver.net/statement*
// @include			http://3docean.net/user/statement*
// @include			http://codecanyon.net/statement*
// @include			http://photodune.net/statement*
// ==/UserScript==

(function () {

			
			if (/page=/.test(location.search)) {
				$('#content .content-l').prepend('<span style="font-style:italic">Statementer is disbaled if you use pagination. <a href="' + location.href.replace(/page=(\d+)/, '') + '">go back</span>');
				return;
			}
			
			var version = '1.9.6.1',
				exchangeinterval = 3600,
				rates = {},
				currentcurrency = 'USD',
				currencies = {"AUD": "Australian Dollar","AED": "United Arab Emirates Dirham","AFN": "Afghan Afghani","ALL": "Albanian Lek","AMD": "Armenian Dram","ANG": "Netherlands Antillean Guilder","AOA": "Angolan Kwanza","ARS": "Argentine Peso","AWG": "Aruban Florin","AZN": "Azerbaijani Manat","BAM": "Bosnia-Herzegovina Convertible Mark","BBD": "Barbadian Dollar","BDT": "Bangladeshi Taka","BGN": "Bulgarian Lev","BHD": "Bahraini Dinar","BIF": "Burundian Franc","BMD": "Bermudan Dollar","BND": "Brunei Dollar","BOB": "Bolivian Boliviano","BRL": "Brazilian Real","BSD": "Bahamian Dollar","BTN": "Bhutanese Ngultrum","BWP": "Botswanan Pula","BYR": "Belarusian Ruble","BZD": "Belize Dollar","CAD": "Canadian Dollar","CDF": "Congolese Franc","CHF": "Swiss Franc","CLF": "Chilean Unit of Account (UF)","CLP": "Chilean Peso","CNY": "Chinese Yuan","COP": "Colombian Peso","CRC": "Costa Rican Colon","CUP": "Cuban Peso","CVE": "Cape Verdean Escudo","CZK": "Czech Republic Koruna","DJF": "Djiboutian Franc","DKK": "Danish Krone","DOP": "Dominican Peso","DZD": "Algerian Dinar","EGP": "Egyptian Pound","EUR": "Euro","ETB": "Ethiopian Birr","FJD": "Fijian Dollar","FKP": "Falkland Islands Pound","GBP": "British Pound Sterling","GEL": "Georgian Lari","GHS": "Ghanaian Cedi","GIP": "Gibraltar Pound","GMD": "Gambian Dalasi","GNF": "Guinean Franc","GTQ": "Guatemalan Quetzal","GYD": "Guyanaese Dollar","HKD": "Hong Kong Dollar","HNL": "Honduran Lempira","HRK": "Croatian Kuna","HTG": "Haitian Gourde","HUF": "Hungarian Forint","IDR": "Indonesian Rupiah","IEP": "Irish Pound","ILS": "Israeli New Sheqel","INR": "Indian Rupee","IQD": "Iraqi Dinar","IRR": "Iranian Rial","ISK": "Icelandic Krona","JMD": "Jamaican Dollar","JOD": "Jordanian Dinar","JPY": "Japanese Yen","KES": "Kenyan Shilling","KGS": "Kyrgystani Som","KHR": "Cambodian Riel","KMF": "Comorian Franc","KPW": "North Korean Won","KRW": "South Korean Won","KWD": "Kuwaiti Dinar","KZT": "Kazakhstani Tenge","LAK": "Laotian Kip","LBP": "Lebanese Pound","LKR": "Sri Lankan Rupee","LRD": "Liberian Dollar","LSL": "Lesotho Loti","LTL": "Lithuanian Litas","LVL": "Latvian Lats","LYD": "Libyan Dinar","MAD": "Moroccan Dirham","MDL": "Moldovan Leu","MGA": "Malagasy Ariary","MKD": "Macedonian Denar","MMK": "Myanma Kyat","MNT": "Mongolian Tugrik","MOP": "Macanese Pataca","MRO": "Mauritanian Ouguiya","MUR": "Mauritian Rupee","MVR": "Maldivian Rufiyaa","MWK": "Malawian Kwacha","MXN": "Mexican Peso","MYR": "Malaysian Ringgit","MZN": "Mozambican Metical","NAD": "Namibian Dollar","NGN": "Nigerian Naira","NIO": "Nicaraguan Cordoba","NOK": "Norwegian Krone","NPR": "Nepalese Rupee","NZD": "New Zealand Dollar","OMR": "Omani Rial","PAB": "Panamanian Balboa","PEN": "Peruvian Nuevo Sol","PGK": "Papua New Guinean Kina","PHP": "Philippine Peso","PKR": "Pakistani Rupee","PLN": "Polish Zloty","PYG": "Paraguayan Guarani","QAR": "Qatari Rial","RON": "Romanian Leu","RSD": "Serbian Dinar","RUB": "Russian Ruble","RWF": "Rwandan Franc","SAR": "Saudi Riyal","SBD": "Solomon Islands Dollar","SCR": "Seychellois Rupee","SDG": "Sudanese Pound","SEK": "Swedish Krona","SGD": "Singapore Dollar","SHP": "Saint Helena Pound","SLL": "Sierra Leonean Leone","SOS": "Somali Shilling","SRD": "Surinamese Dollar","STD": "Sao Tome and Principe Dobra","SVC": "Salvadoran Colon","SYP": "Syrian Pound","SZL": "Swazi Lilangeni","THB": "Thai Baht","TJS": "Tajikistani Somoni","TMT": "Turkmenistani Manat","TND": "Tunisian Dinar","TOP": "Tongan Pa'anga","TRY": "Turkish Lira","TTD": "Trinidad and Tobago Dollar","TWD": "New Taiwan Dollar","TZS": "Tanzanian Shilling","UAH": "Ukrainian Hryvnia","UGX": "Ugandan Shilling","USD": "United States Dollar","UYU": "Uruguayan Peso","UZS": "Uzbekistan Som","VEF": "Venezuelan Bolivar","VND": "Vietnamese Dong","VUV": "Vanuatu Vatu","WST": "Samoan Tala","XAF": "CFA Franc BEAC","XCD": "East Caribbean Dollar","XDR": "Special Drawing Rights","XOF": "CFA Franc BCEAO","XPF": "CFP Franc","YER": "Yemeni Rial","ZAR": "South African Rand","ZMK": "Zambian Kwacha","ZWD": "Zimbabwean Dollar (1980-2008)","ZWL": "Zimbabwean Dollar"
				};

			var $content = $('<div>', {
				id: 'statementer'
			}).prependTo('#content .content-l');
			var raw, sales = {},
				reversals = [],
				referrals = [],
				purchases = [],
				deposits = [],
				withdrawal = [],
				items = [],
				lastdate, firstdate, total_sales,

				allitems = 'all items',
				
				sortby = 'name', sortdir = 'DESC',

				currenttab = currentitem = 0,
				
				from, to;

			var total_sales = total_sales_volume = total_referrals = total_referrals_money = total_deposits = total_deposits_money = total_purchases = total_purchases_money = total_withdrawal = total_withdrawal_money = total_earning = total_reversals_money = total_reversals = 0;
				
			var lastbalance = 0,
				currentbalance = 0;
				
			var now = new Date(), timestamp = now.getTime(), envatotimeoffsetinhours = 12+now.getTimezoneOffset()/60;
				now = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes() + (now.getTimezoneOffset()+ 60*parseInt(envatotimeoffsetinhours,10)), now.getSeconds());
			
			var current = location.pathname.split('/'),
				monthnames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
				currentmonth = current[2] ? parseInt(current[2].split('-')[1],10)-1 : now.getMonth(),
				currentyear = current[2] ? parseInt(current[2].split('-')[0],10) : now.getFullYear(),
				csvfile = '/statement/'+currentyear+'-'+(currentmonth < 9 ? '0'+(currentmonth+1) : (currentmonth+1))+'.csv';
				
			var color = {};
			var marketplace = location.hostname.split('.').shift();
			color['activeden'] = 'e86223';
			color['audiojungle'] = '65992e';
			color['themeforest'] = '69472a';
			color['videohive'] = 'f4950c';
			color['graphicriver'] = '0568b3';
			color['3docean'] = '802836';
			color['codecanyon'] = 'db592b';
			color['tutsplus'] = 'e86223';
			color['photodune'] = '499ba1';

			color = color[marketplace] || '333333';
			

			var prepareUI = function () {
					lastbalance = getCookie('statementer_lastbalance');
					currentcurrency = getCookie('statementer_currentcurrency') || 'USD';
					currentbalance = parseInt($('.header-logo-account__balance').html().substr(1).replace(',', '').replace('.', ''), 16);

					$content.html('<span style="font-style:italic">loading Statement... <a href="javascript:localStorage.clear();setCookie(\'statementer_lastbalance\', \'\', -1);location.reload();">Click here if it stucks...</a></span>');
					style = $('<link id="statementer_css" media="all" type="text/css" href="http://dashboardplus.revaxarts-themes.com/css/statementer-1.8.css" rel="stylesheet">');
					style.appendTo('head');
					
					loadStatementer();

				},
				makeUI = function () {

					$('table.general_table').find('td').eq(0).attr('width', 90);

					var html = '';

					html += '<div id="statementer_daterange"><span id="statementer_date_from"></span> - <span id="statementer_date_to"></span></div>';
					html += '<div id="statementer_dateslider"></div>';
					html += '<div id="statementer_content">';
					html += '</div>';

					$content.hide().html(html).show();


					$('#statementer_content').delegate('.statementer_itemlink', 'click', function () {
						window.location = this.href;
						return false;
					});
					
					html = '<h2 class="box-heading">Statementer</h2><div class="content-box">';
					html += '<ul class="statementer_menu feature-list">';
					var _first = new Date(currentyear, currentmonth, 1, 0, 0, 0),
						_last = new Date(currentyear, currentmonth + 1, 0, 23, 59, 59),
						_firstmonday = (_first.getTime() + ((8 - _first.getDay()) * 864e5));
						//fix if 1st day is sunday
						if(!_first.getDay()) _firstmonday -= 864e5*7;
					html += '<li><a data-from="' + (new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0).getTime()) + '" data-to="' + (new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59).getTime()) + '">Today</a></li>';
					html += '<li><a data-from="' + (new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 0, 0, 0).getTime()) + '" data-to="' + (new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 23, 59, 59).getTime()) + '">Yesterday</a></li>';
					html += '</ul><hr/>';
					html += '<ul class="statementer_menu feature-list">';
					html += '<li><a data-offset-from="' + (-1 * 864e5) + '" data-dimension="' + (1 * 864e5 - 1000) + '">- one Day</a></li>';
					html += '<li><a data-offset-from="' + (1 * 864e5) + '" data-dimension="' + (1 * 864e5 - 1000) + '">+ one Day</a></li>';
					html += '<li><a data-offset-from="' + (-7 * 864e5) + '" data-dimension="' + (7 * 864e5 - 1000) + '">- one Week</a></li>';
					html += '<li><a data-offset-from="' + (7 * 864e5) + '" data-dimension="' + (7 * 864e5 - 1000) + '">+ one Week</a></li>';
					html += '</ul><hr/>';
					html += '<ul class="statementer_menu feature-list">';
					html += '<li><a data-from="' + _first.getTime() + '" data-to="' + _last.getTime() + '">Month</a></li>';
					html += '<li><a data-from="' + _first.getTime() + '" data-to="' + (_firstmonday - 1000) + '">1st week</a></li>';
					if((_firstmonday + (6048e5) - 1000) < _last.getTime()) html += '<li><a data-from="' + _firstmonday + '" data-to="' + (_firstmonday + (6048e5) - 1000) + '">2nd week</a></li>';
					if((_firstmonday + (6048e5)) < _last.getTime()) html += '<li><a data-from="' + (_firstmonday + (6048e5)) + '" data-to="' + (_firstmonday + (6048e5 * 2) - 1000) + '">3rd week</a></li>';
					if((_firstmonday + (6048e5 * 2)) < _last.getTime()) html += '<li><a data-from="' + (_firstmonday + (6048e5 * 2)) + '" data-to="' + (_firstmonday + (6048e5 * 3) - 1000) + '">4th week</a></li>';
					if((_firstmonday + (6048e5 * 3)) < _last.getTime()) html += '<li><a data-from="' + (_firstmonday + (6048e5 * 3)) + '" data-to="' + (_firstmonday + (6048e5 * 4) - 1000) + '">5th week</a></li>';
					if((_firstmonday + (6048e5 * 4)) < _last.getTime()) html += '<li><a data-from="' + (_firstmonday + (6048e5 * 4)) + '" data-to="' + (_firstmonday + (6048e5 * 5) - 1000) + '">6th week</a></li>';
					html += '</ul><hr/>';
					html += '<ul class="feature-list">';
					html += '<li><a id="statementer_fetch_all" href="#">fetch all</a></li>';
					html += '</ul>';
					html += '<ul class="feature-list">';
					html += '<li><a id="statementer_clear_cache_current" href="#">clear current storage</a></li>';
					html += '<li><a id="statementer_clear_cache" href="#">clear storage</a></li>';
					html += '</ul>';
					html += '<a class="donate" href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=U4V8TKF6WNYZ2&lc=AT&item_name=revaxarts%20Statementer&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHosted" title="for those who are too enthusiastic about">buy me a beer</a>';
					html += '</div>';
					//html += '<h2 class="box-heading">Currency</h2><div class="content-box" id="statementer_currency">loading...</div>';
					
					$('.sidebar-s.sidebar-right').prepend(html);
					$('.statementer_menu').delegate('a', 'click', function () {
						var _this = $(this),
							_from, _to;
						if (_this.attr('data-from')) {
							_from = _this.attr('data-from');
							_to = _this.attr('data-to');
							if(_from > now.getTime()) return false;
						} else {
							var _values = $('#statementer_dateslider').slider('option', 'values');
							_from = _values[0] + parseInt(_this.attr('data-offset-from'), 10);
							_to = _from + parseInt(_this.attr('data-dimension'), 10);
						}
						window.location.hash = '#from=' + _from + '&to=' + _to + '';
						calculate();
					});
					$('#statementer_fetch_all').on('click', function () {
						if (confirm("Ok, let's fetch!\n\nIt's not possible to make graphs or calculate something with this data. This just puts all CSV files into a textarea.\n\n Continue? (This could take a while...)")) {
							if ($('#statementer_fetch_area').length) {
								var t = $('#statementer_fetch_area');
								var info = $('#statementer_fetch_info');
							} else {
								var t = $('<textarea id="statementer_fetch_area">').insertBefore('#statementer_daterange');
								var info = $('<div id="statementer_fetch_info">').insertAfter($('#content').find('h2').eq(0));
							}
							var stopit = false;
							$('body').on('click', '#statementer_cancelfetch', function () {
								stopit = true;
								return false;
							});
							t.val('');
							var fetchData = function (month, year) {
									var csvfile = '/statement/'+year+'-'+(month < 9 ? '0'+(month+1) : (month+1))+'.csv';
									info.html('Fetching ' + monthnames[month] + ' ' + year + '... <a id="statementer_cancelfetch" href="#">cancel</a>');
									$.get(csvfile, function (data) {
										if (stopit) return false;
										raw = data.replace(/"Date","Type","Detail","Item ID","Amount","Rate","Price"/g, '');
										raw = $.trim(raw);
										if (raw) t.val(t.val() + raw.replace(/","/g, "\t").replace(/"/g, "") + "\n");
										if (month == 0) {
											month = 12;
											year--;
										}
										if (year == 2006 && month == 7) {
											info.html('Finished!');
										} else {
											fetchData(month - 1, year);
										}

									});
								};
							fetchData(new Date().getMonth(), new Date().getFullYear());
						}
						return false;
					});
					$('#statementer_clear_cache').on('click', function () {
						localStorage.removeItem('statementer');
						setCookie('statementer_lastbalance', '', -1);
						alert('Data cleared!');
						return false;
					});
					$('#statementer_clear_cache_current').on('click', function () {
						save('statement_' + currentyear + '_' + currentmonth, '');
						if (now.getMonth() == currentmonth && now.getFullYear() == currentyear) {
							setCookie('statementer_lastbalance', '', -1);
						}
						alert('Data cleared!');
						return false;
					});

					$('#statementer')
					.delegate('area', 'click', function (event) {
						var data = $(this).data();
						if (event.shiftKey) {
							from = Math.min(from, data.from) || data.from;
							to = Math.max(to, data.to) || data.to;
						} else {
							from = data.from;
							to = data.to;
						}
						location.hash = '#from=' + from + '&to=' + to;
						calculate();
						return false;
					})
					.delegate('.percentage', 'click', function(){
						$(this).select();
					})
					.delegate('.percentage', 'change', function(){
						
						var val = $(this).val(),
							id = $(this).data('id'),
							p = get('percentages');
							
						if(!id) return;
						if(isNaN(val)) val = 100;
						if(!p) p = {};
						
						val = Math.max(0, Math.min(100, val));
						$(this).val(val);

						p[id] = val/100;
						
						
						save('percentages', p);
						to = null;
						calculate();
						return;
					});
					$('#statementer_currency').delegate('select', 'change', function (event) {
						currentcurrency = $(this).val();
						setCookie('statementer_currentcurrency', currentcurrency);
						$('#statementer_ratio').html('1 : '+rates[currentcurrency]);
						from = from || firstdate;
						calculate();
					});
					
					
					//currency();
					
					
				},
				currency = function () {
					return false;
					var lastcurrencyupdate = getCookie('statementer_lastcurrencyupdate');
						rates = get('statementer_rates');
					
						
					if(timestamp - lastcurrencyupdate > exchangeinterval*1000 || !rates){
						$.ajax({
							url: 'http://openexchangerates.org/latest.json',
							dataType: 'jsonp',
							success: function(data){
							rates = data.rates;
							save('statementer_rates', JSON.stringify(rates));
							setCookie('statementer_lastcurrencyupdate', timestamp);
							currencyDropdown(rates);
							},
							error: function(){
								$('#statementer_currency').html('couldn\'t load currencies :('); 
							}
						});
					}else{
						currencyDropdown(rates);
					}
				},
				currencyDropdown = function () {
					var html = '<select style="width:180px;">';
					$.each(currencies, function(id, name){
						var selected = (id == currentcurrency) ? 'selected' : '';
						html += '<option value="'+id+'" '+selected+'>'+id+' - '+name+'</option>';
					});
					html += '</select>';
					html += '<span style="font-size:9px;">last update: '+Math.ceil(((timestamp-parseInt(getCookie('statementer_lastcurrencyupdate')))/1000)/60)+' min ago</span>';
					if(rates) html += '<br><span id="statementer_ratio">1 : '+rates[currentcurrency]+'</span>';
					html += '<br><span style="font-size:9px;">source: <a href="http://openexchangerates.org">openexchangerates.org</a></span>';
					$('#statementer_currency').html(html);
				},
				makeContent = function () {
					
					var lastdateday = new Date(lastdate).getDate()-1;
					
					var daysrange = ((to || lastdate) - (from || firstdate))/864e5;
					
					if (raw == '"Date","Type","Detail","Amount","Rate","Price"') {
						$('#statementer_content').html('<h2>Sorry, no action this month!</h2>');
						return false;
					}
					var html = '', story = '';
					html += '<div id="statementer_summary">';
					html += '<ul>';
					html += '<li>you\'ve sold<h4>' + total_sales + '</h4>' + _n('item', 'items', total_sales) + ' and earned<h4>' + _d(total_earning) + '</h4></li>';
					html += '<li>you\'ve purchased<h4>' + total_purchases + '</h4>' + _n('item', 'items', total_purchases) + ' and spent<h4>' + _d(total_purchases_money) + '</h4></li>';
					html += '<li>you\'ve referred<h4>' + total_referrals + '</h4>' + _n('user', 'users', total_referrals) + ' and earned<h4>' + _d(total_referrals_money) + '</h4></li>';
					html += '<li>you\'ve withdrawn<h4>' + total_withdrawal + '</h4>' + _n('time', 'times', total_withdrawal) + ' with an amount of<h4>' + _d(total_withdrawal_money) + '</h4></li>';
					html += '</ul>';
					html += '</div>';
					
					c = 0;
					if (total_sales) {

						html += '<h2 style="padding-bottom:0;">Sales: <span class="sortby">Sort by: <a data-sort="name">Name</a> | <a data-sort="totalsales">Sales</a> | <a data-sort="totalearnings">Earnings</a> | <a data-sort="maxearnings_day">max. Earnings/day</a> | <a data-sort="maxsales_day">max. Sales/day</a> | <a data-sort="id">release date</a></span><span class="sortorder" style="color:#'+color+'">'+(sortdir == 'DESC' ? '&#9660;': '&#9650;' )+'</span></h2>';
						html += 'You have sold <strong>' + total_sales + '</strong> ' + _n('item', 'items', total_sales) + ' within <strong>'+Math.ceil(daysrange)+'</strong>  ' + _n('day', 'days', Math.ceil(daysrange)) + '  with a total value of <strong>'+_d(total_earning) +'</strong>. That\'s <strong>'+(total_sales/daysrange).toFixed(2)+'</strong> items and <strong>' + _d(total_earning/daysrange) + '</strong> per day.';
						html += '<div id="accordion">';

						$.each(items, function (i, name) {
							
							if(sales[name].totalsales <= 0) return;

							var linktext = (name != allitems) ? '<a href="/item/goto/' + sales[name].id + '" title="visit item page" class="statementer_itemlink" onclick="return false;">&rarr;</a> ' : '';

							html += '<div id="tabh_' + sales[name].id + '" class="accordion-label"><span class="arrow">&#9656;</span> ' + name.replace('_'+sales[name].id, '') + ' ' + linktext + '<span class="right">' + sales[name].totalsales + ' total ' + _n('sale', 'sales', sales[name].totalsales) + ' &ndash; ' + _d(sales[name].totalearnings) + ' ' +(sales[name].percentage < 1 ? ' <span title="you get ' + (sales[name].percentage*100) + '% of this items profit">('+(sales[name].percentage*100)+'%)</span>' : '') + '</span></div>';
							html += '<div style="height:355px;" data-name="' + name + '"></div>';
							c++;

						});
						html += '</div>';
						

					}

					if (total_reversals && reversals.length) {

						var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
						var year = "" + reversals[0].date.getFullYear();
						month = month[reversals[0].date.getMonth()];

						year = year.substr(2);

						html += '<h3 style="padding-bottom:0;">Sale Reversals:</h3>';
						html += 'You have <strong>' + total_reversals + '</strong> ' + _n('reversal', 'reversals', total_reversals) + ' within <strong>'+Math.ceil(daysrange)+'</strong> ' + _n('day', 'days', Math.ceil(daysrange)) + ' with a total value of <strong>'+_d(total_reversals_money) +'</strong>. That\'s <strong>'+(total_reversals/daysrange).toFixed(2)+'</strong> items and <strong>'+_d(total_reversals_money/daysrange)+'</strong> per day.';
						html += '<div class="general_table_border">';
						html += '<table class="general_table" cellspacing="0" cellpadding="0">';
						html += '<thead><tr>';
						html += '<td width="70">date</td><td>detail</td><td width="50">amount</td><td width="70">price</td>';
						html += '</tr></thead>';

						$.each(reversals, function (i, data) {
							var url = data.type == 'other_adjustments_earnings' ? '' : '/item/' + urlify(data.name) + '/' + data.id;
							html += '<tr>';
							html += '<td title="' + data.date.toString().substr(0, 21) + '">' + data.date.getDate() + ' ' + month + ' ' + year + '</td><td>';
							html += url ? '<a href=" ' + url + '">' + data.name + '</a>' : data.name;
							html += '</td><td class="number">1</td><td class="number">- ' + _d(data.earnings) + '</td>';
							html += '</tr>';
						});

						html += '<tr>';
						html += '<td colspan="2" class="number strong">Summary:</td><td class="number strong">' + total_reversals + '</td><td class="number strong">- ' + _d(total_reversals_money) + '</th>';
						html += '</tr>';
						html += '</table>';
						html += '</div>';
						
					}

					if (total_purchases) {

						var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
						var year = "" + purchases[0].date.getFullYear();
						month = month[purchases[0].date.getMonth()];

						year = year.substr(2);

						html += '<h3 style="padding-bottom:0;">Purchases:</h3>';
						html += 'You have purchased <strong>' + total_purchases + '</strong> ' + _n('item', 'items', total_purchases) + ' within <strong>'+Math.ceil(daysrange)+'</strong> ' + _n('day', 'days', Math.ceil(daysrange)) + ' with a total value of <strong>'+_d(total_purchases_money) +'</strong>. That\'s <strong>'+(total_purchases/daysrange).toFixed(2)+'</strong> items and <strong>'+_d(total_purchases_money/daysrange)+'</strong> per day.';
						html += '<div class="general_table_border">';
						html += '<table class="general_table" cellspacing="0" cellpadding="0">';
						html += '<thead><tr>';
						html += '<td width="70">date</td><td>detail</td><td width="50">amount</td><td width="70">price</td>';
						html += '</tr></thead>';

						$.each(purchases, function (i, data) {
							html += '<tr>';
							html += '<td title="' + data.date.toString().substr(0, 21) + '">' + data.date.getDate() + ' ' + month + ' ' + year + '</td><td><a href="/item/' + urlify(data.name) + '/' + data.id + '">' + data.name + '</a></td><td class="number">1</td><td class="number">' + _d(data.price) + '</td>';
							html += '</tr>';
						});

						html += '<tr>';
						html += '<td colspan="2" class="number strong">Summary:</td><td class="number strong">' + total_purchases + '</td><td class="number strong">' + _d(total_purchases_money) + '</th>';
						html += '</tr>';
						html += '</table>';
						html += '</div>';
						
					}

					if (total_referrals) {

						var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
						var year = "" + referrals[0].date.getFullYear();
						month = month[referrals[0].date.getMonth()];

						year = year.substr(2);

						html += '<h3 style="padding-bottom:0;">Referrals:</h3>';
						html += 'You have referred <strong>' + total_referrals + '</strong>  ' + _n('user', 'users', total_referrals) + '  within <strong>'+Math.ceil(daysrange)+'</strong> ' + _n('day', 'days', Math.ceil(daysrange)) + ' and earned <strong>'+_d(total_referrals_money) +'</strong>. That\'s <strong>'+(total_referrals/daysrange).toFixed(2)+'</strong> users and <strong>'+_d(total_referrals_money/daysrange)+'</strong> per day.';
						html += '<div class="general_table_border">';
						html += '<table class="general_table" cellspacing="0" cellpadding="0">';
						html += '<thead><tr>';
						html += '<td width="70">date</td><td>detail</td><td width="50">amount</td><td width="70">price</td>';
						html += '</tr></thead>';

						$.each(referrals, function (i, data) {
							html += '<tr>';
							html += '<td title="' + data.date.toString().substr(0, 21) + '">' + data.date.getDate() + ' ' + month + ' ' + year + '</td><td>' + data.name.replace(data.username, '<a href="/user/' + data.username + '">' + data.username + '</a>') + ((data.purchased) ? '&nbsp;&nbsp;<span style="font-size:10px;">purchased ' + data.purchased[2] + '</span>' : '') + '</td><td class="number">1</td><td class="number">' + _d(data.earnings) + '</td>';
							html += '</tr>';
						});

						html += '<tr>';
						html += '<td colspan="2" class="number strong">Summary:</td><td class="number strong">' + total_referrals + '</td><td class="number strong">' + _d(total_referrals_money) + '</th>';
						html += '</tr>';
						html += '</table>';
						html += '</div>';
					}


					if (total_deposits) {

						var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
						var year = "" + deposits[0].date.getFullYear();
						month = month[deposits[0].date.getMonth()];

						year = year.substr(2);

						html += '<h3 style="padding-bottom:0;">Deposits:</h3>';
						html += 'You have deposited <strong>' + total_deposits + '</strong> times within <strong>'+Math.ceil(daysrange)+'</strong> ' + _n('day', 'days', Math.ceil(daysrange)) + ' and spent <strong>'+_d(total_deposits_money) +'</strong>. That\'s <strong>'+(total_deposits/daysrange).toFixed(2)+'</strong> deposits and <strong>'+_d(total_deposits_money/daysrange)+'</strong> per day.';
						html += '<div class="general_table_border">';
						html += '<table class="general_table" cellspacing="0" cellpadding="0">';
						html += '<thead><tr>';
						html += '<td width="70">date</td><td>detail</td><td width="50">amount</td><td width="70">price</td>';
						html += '</tr></thead>';

						$.each(deposits, function (i, data) {
							html += '<tr>';
							html += '<td title="' + data.date.toString().substr(0, 21) + '">' + data.date.getDate() + ' ' + month + ' ' + year + '</td><td>' + data.name + '</td><td class="number">1</td><td class="number">' + _d(data.price) + '</td>';
							html += '</tr>';
						});

						html += '<tr>';
						html += '<td colspan="2" class="number strong">Summary:</td><td class="number strong">' + total_deposits + '</td><td class="number strong">$' + total_deposits_money + '</th>';
						html += '</tr>';
						html += '</table>';
						html += '</div>';
					}


					html += '<div id="statementer_copyright">Version '+version+' &copy; <a href="/user/revaxarts">revaxarts</a>.com. Licensed under the MIT license</div><hr>';


					$('#statementer_content').html(html);
					if (!currentitem || !$(currentitem).length) currentitem = 0;
					if($('#accordion').data('accordion')) $('#accordion').accordion('destroy');
					$('#accordion').accordion({
						active: currentitem,
						autoHeight: false,
						changestart: function (event, ui) {
							currentitem = (ui.newHeader[0].id) ? '#' + ui.newHeader[0].id : 0;
							loadCharts(ui.newContent);
						}
					});
					
					$('span.sortby').delegate('a', 'click', function(){
						to = null;
						if(sortby == $(this).data('sort')){
							sortdir = (sortdir == 'DESC') ? 'ASC' : 'DESC';
						}else{
							sortdir = 'DESC';
						}
						sortby = $(this).data('sort');
						calculate();
						return false;
					}).find('[data-sort='+sortby+']').addClass('active');
					
					//
					if($('#accordion').data('accordion')) loadCharts($('#accordion').data('accordion').active.next());

					var firstofmonth = new Date(new Date(firstdate).getFullYear(), new Date(firstdate).getMonth(), 1).getTime();
					var lastofmonth = new Date(new Date(lastdate).getFullYear(), new Date(lastdate).getMonth() + 1, 0, 23, 59, 59).getTime();
					if($('#statementer_dateslider').data('slider')) $('#statementer_dateslider').slider('destroy');
					$('#statementer_dateslider').slider({
						range: true,
						min: firstofmonth,
						max: lastofmonth,
						step: 36e5,
						values: [from || firstofmonth, to || lastofmonth],
						slide: function (event, ui) {
							from = ui.values[0];
							to = ui.values[1];
							$('#statementer_date_from').html(new Date(from).toString().substr(0, 21));
							$('#statementer_date_to').html(new Date(to).toString().substr(0, 21));
						},
						change: function (event, ui) {
							from = ui.values[0];
							to = ui.values[1];
							window.location.hash = '#from=' + from + '&to=' + to + '';
							calculate();
						}
					}).find('a').css('background-color', '#' + color).end().find('.ui-slider-range').css('background-color', '#' + color);
					$('#statementer_date_from').html(new Date(from || firstofmonth).toString().substr(0, 21));
					$('#statementer_date_to').html(new Date(to || lastofmonth).toString().substr(0, 21));
					//";
					

				},

				loadCharts = function (element) {
					if (element.data('loaded')) return false;

					var name = element.data('name');

					var lastday = new Date(currentyear, currentmonth + 1, 0, 23, 59, 59).getDate();
					var day_values = [];
					var earnings_values = [];
					var date_values = [];
					var hour_values = [];
					var hours = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
					var steps = Math.ceil(sales[name].maxsales_hour / 30);
					var esteps = Math.ceil(sales[name].maxearnings_day / 10);


					$.each(sales[name].days, function (day, value) {
						if (lastday >= parseInt(day, 10)) {
							day_values.push(value);
							date_values.push(day);
						}
					});
					$.each(sales[name].hours, function (day, value) {
						hour_values.push(value);
					});
					$.each(sales[name].earningsperday, function (day, value) {
						if (lastday >= parseInt(day, 10)) {
							earnings_values.push(parseInt(value, 10));
						}
					});
					
					
					html = '' + '<div class="tabs"><ul><li><a href="#tabs' + c + '1">Sales per day</a></li><li><a href="#tabs' + c + '2">Sales per hour</a></li><li><a href="#tabs' + c + '3">Earnings per day ($)</a></li></ul>' + ( (typeof sales[name].percentage == 'number') ? '<span class="percentage" title="you get ' + (sales[name].percentage*100) + '% of this items profit"><input type="text" value="' + (sales[name].percentage*100) + '" class="percentage" maxlength="3" data-id="' + sales[name].id + '">%</span>' : '') + '<div class="tab" id="tabs' + c + '1">' + '	<img src="' + getGoogleChart(day_values, date_values, sales[name].maxsales_day, steps, sales[name].percentage) + '" width="750" height="300" usemap="#graph' + c + '1"></div><div class="tab" id="tabs' + c + '2"><img src="' + getGoogleChart(hour_values, hours, sales[name].maxsales_hour, steps, sales[name].percentage) + '" width="750" height="300"></div><div class="tab" id="tabs' + c + '3">' + '<img src="' + getGoogleChart(earnings_values, date_values, sales[name].maxearnings_day, esteps, sales[name].percentage) + '" width="750" height="300" usemap="#graph' + c + '2"></div></div>';
					map1 = '<map name="graph' + c + '1">';
					map2 = '<map name="graph' + c + '2">';
					var x, d, h, w = 716 / lastday;

					for (var i = 0; i < lastday; i++) {
						x = (i * w + 18);
						d = new Date(currentyear, currentmonth, i + 1).getTime();
						h = '<area shape="rect" coords="' + x + ',0,' + (x + w) + ',300" href="#" title="show day ' + (i + 1) + '" data-from=' + d + ' data-to="' + (d + 864e5 - 1) + '" >';
						map1 += h;
						map2 += h;
					}
					map1 += '</map>';
					map2 += '</map>';
					html += map1 + map2;
					element.html(html).tabs({
						selected: currenttab,
						select: function (event, ui) {
							currenttab = ui.index;
						}
					});
					element.data('loaded', true);
				},

				getGoogleChart = function (values, dates, maxvalue, steps, percentage) {
					var url = 'http://chart.apis.google.com/chart?cht=bvg',
						yaxis = (function () {
							ret = '';
							for (var i = 0; i <= maxvalue; i += steps) {
								ret += '|' + i;
							}
							return ret + '|' + (i);
						})(),
						chart = {
							chxr: "0,0," + (dates.length) + "|1,0," + (maxvalue + steps) + "|2,0," + (maxvalue + steps),
							chxt: "x,y,r",
							chxl: "0:|" + dates.join('|') + "|1:" + yaxis + "|2:" + yaxis,
							chs: "760x300",
							chbh: "a,2,2",
							chds: "0," + (maxvalue + steps) + "," + (maxvalue + steps) + "",
							chco: "" + color + "",
							chf: "bg,s,BFBFBF",
							chd: "t:" + values.join(','),
							chg: "" + (100 / (dates.length)) + "," + (100 / (maxvalue + steps) * steps) + ""
						};
					$.each(chart, function (key, value) {
						url += '&' + key + '=' + value;
					});
					return url;
				},

				urlify = function (name) {
					slug = name.replace(/ /g, '-').replace(/(-){2,}/g, '-').replace(/[^A-Za-z0-9-]/, '').toLowerCase();
					return slug;
				},

				_n = function (single, plural, number) {
					return (number == 1) ? single : plural;
				},
				
				_d = function (value, decimal, raw) {
					if(!rates) return (raw) ? value : _e(currentcurrency)+''+(value*1).toFixed(2);
					return (raw) ? value*(rates[currentcurrency] || 1) : _e(currentcurrency)+''+(value*(rates[currentcurrency] || 1)).toFixed(2);
				},
				
				_e = function (currency) {
					currency = currency || 'USD';
					var pres = {
						'AUD': '$',
						'BBD': '$',
						'BMD': '$',
						'BND': '$',
						'BSD': '$',
						'BZD': '$',
						'CAD': '$',
						'FJD': '$',
						'GYD': '$',
						'HKD': '$',
						'JMD': '$',
						'LRD': '$',
						'MZD': '$',
						'SBD': '$',
						'SGD': '$',
						'SRD': '$',
						'TTD': '$',
						'USD': '$',
						'ARS': '$',
						'CUP': '&#8369;',
						'DOP': '&#8369;',
						'PHP': '&#8369;',
						'UYU': '&#8369;',
						'THB': '&#3647;',
						'PYG': '&#8370;',
						'LAK': '&#8365;',
						'NGN': '&#8358;',
						'MNT': '&#8366;',
						'KPW': '&#8361;',
						'KRW': '&#8361;',
						'UAH': '&#8372;',
						'INR': '&#8360;',
						'LKR': '&#8360;',
						'MUR': '&#8360;',
						'NPR': '&#8360;',
						'PKR': '&#8360;',
						'SCR': '&#8360;',
						'IRR': '&#65020;',
						'CNY': '&#13136;',
						'EUR': '&euro;',
						'GBP' : '&pound;',
						'IEP' : '&pound;',
						'JPY' : '&yen;'
					};
					return pres[currency] || '<span class="statementer_currency">'+currency+'</span> ';
				},

				calculate = function () {
					
					if (location.hash) {
						var parts = location.hash.substr(1).split('&');
						from = parseInt(parts[0].split('=')[1], 10);
						to = parseInt(parts[1].split('=')[1], 10);
						var d = new Date(from);
						if (d.getMonth() != currentmonth) {
							location.href = 'statement?month=' + (d.getMonth() + 1) + '&year=' + (d.getFullYear()) + '' + location.hash;
							return false;
						}
					}
					if (raw == '"Date","Type","Detail","Item ID","Amount","Rate","Price"') {
						$content.html('<span>No action here :(</span>');
						return false;
					}
					
					
					var percentages = get('percentages');
					
					statementcount = raw.length;

					sales = {}, referrals = [], purchases = [], deposits = [], withdrawal = [], reversals = [], items = [];

					total_sales = total_sales_volume = total_referrals = total_referrals_money =

					total_deposits = total_deposits_money = total_purchases = total_purchases_money = total_withdrawal = total_withdrawal_money = total_reversal = total_reversal_money = total_earning = 0;

					sales[allitems] = {
						id: 'all',
						totalsales: 0,
						totalearnings: 0,
						maxsales_day: 0,
						maxsales_hour: 0,
						maxearnings_day: 0,
						hours: {
							0: 0,1: 0,2: 0,3: 0,4: 0,5: 0,6: 0,7: 0,8: 0,9: 0,10: 0,11: 0,12: 0,13: 0,14: 0,15: 0,16: 0,17: 0,18: 0,19: 0,20: 0,21: 0,22: 0,23: 0
						},
						days: {
							1: 0,2: 0,3: 0,4: 0,5: 0,6: 0,7: 0,8: 0,9: 0,10: 0,11: 0,12: 0,13: 0,14: 0,15: 0,16: 0,17: 0,18: 0,19: 0,20: 0,21: 0,22: 0,23: 0,24: 0,25: 0,26: 0,27: 0,28: 0,29: 0,30: 0,31: 0
						},
						earningsperday: {
							1: 0,2: 0,3: 0,4: 0,5: 0,6: 0,7: 0,8: 0,9: 0,10: 0,11: 0,12: 0,13: 0,14: 0,15: 0,16: 0,17: 0,18: 0,19: 0,20: 0,21: 0,22: 0,23: 0,24: 0,25: 0,26: 0,27: 0,28: 0,29: 0,30: 0,31: 0
						}
					};
					
					var dateparts;
					
					for (var i = statementcount - 1; i >= 0; i--) {


						line = raw[i].split('","');

						//correct timezone
						//line[0] = line[0].replace(/(\+1100|\+1000)/, '');

						line[0] = line[0].substr(1);
						
						dateparts = line[0].replace(/(-|:)/g, ' ').split(' ');
						
						line[5] = line[5].substr(1);
						data = {
							date: new Date(dateparts[0], dateparts[1]-1, dateparts[2], dateparts[3], dateparts[4], dateparts[5] ),
							type: line[1],
							name: line[2],
							id: parseInt(line[3], 10) || null,
							earnings: parseFloat(line[4], 10),
							rate: parseFloat(line[5], 10) || null,
							price: parseInt(line[6], 10) || null
						};
						
						if (from <= data.date.getTime() && data.date.getTime() <= to || !to) {
							switch (data.type) {
							case 'referral_cut':
								data.username = data.name.substr(19);
								referrals.push(data);
								total_referrals++;
								total_referrals_money += data.earnings;
								if(raw[i - 1]){
									nextline = raw[i - 1].substr(1).split('","');
									(parseInt(nextline[6])*.3 == data.earnings && new Date(nextline[0].replace(/(\+1100|\+1000)/, '')).getTime()-data.date.getTime() <= 1000) ? data.purchased = nextline : data.purchased = false;
								}else{
									data.purchased = false;
								}
								//total_earning += data.earnings;
								break;

							case 'deposit':
								data.price = data.earnings;
								deposits.push(data);
								total_deposits++;
								total_deposits_money += data.earnings;
								break;
								
							case 'purchase':
								data.price = -data.earnings;
								purchases.push(data);
								total_purchases++;
								total_purchases_money -= data.earnings;
								//total_earning += data.earnings;
								break;

							case 'other_adjustments_earnings':
							case 'sale_reversal':
								reversals.push(data);
								data.earnings *= -1;
								total_reversals++;
								total_reversals_money += data.earnings;
							case 'sale':
								var add = (data.type == 'sale' ? 1 : -1),
								name = data.name+'_'+data.id;
								
								if ($.inArray(name, items) == -1) {
									items.push(name);
									sales[name] = {
										id: data.id,
										percentage: percentages[data.id] ? percentages[data.id] : 1,
										totalsales: 0,
										totalearnings: 0,
										maxsales_day: 0,
										maxsales_hour: 0,
										maxearnings_day: 0,
										hours: {
											0: 0,1: 0,2: 0,3: 0,4: 0,5: 0,6: 0,7: 0,8: 0,9: 0,10: 0,11: 0,12: 0,13: 0,14: 0,15: 0,16: 0,17: 0,18: 0,19: 0,20: 0,21: 0,22: 0,23: 0
										},
										days: {
											1: 0,2: 0,3: 0,4: 0,5: 0,6: 0,7: 0,8: 0,9: 0,10: 0,11: 0,12: 0,13: 0,14: 0,15: 0,16: 0,17: 0,18: 0,19: 0,20: 0,21: 0,22: 0,23: 0,24: 0,25: 0,26: 0,27: 0,28: 0,29: 0,30: 0,31: 0
										},
										earningsperday: {
											1: 0,2: 0,3: 0,4: 0,5: 0,6: 0,7: 0,8: 0,9: 0,10: 0,11: 0,12: 0,13: 0,14: 0,15: 0,16: 0,17: 0,18: 0,19: 0,20: 0,21: 0,22: 0,23: 0,24: 0,25: 0,26: 0,27: 0,28: 0,29: 0,30: 0,31: 0
										}
									};
								}
								
								sales[name].totalsales += add;
								sales[name].totalearnings += (data.earnings*sales[name].percentage)*add;
								sales[name].hours[data.date.getHours()] += add;
								sales[name].days[data.date.getDate()] += add;
								sales[name].earningsperday[data.date.getDate()] += parseInt(data.earnings*sales[name].percentage, 10);

								sales[name].maxsales_hour = Math.max(sales[name].hours[data.date.getHours()], sales[name].maxsales_hour);
								sales[name].maxsales_day = Math.max(sales[name].days[data.date.getDate()], sales[name].maxsales_day);
								sales[name].maxearnings_day = Math.max(sales[name].earningsperday[data.date.getDate()], sales[name].maxearnings_day);

								sales[allitems].totalsales += add;
								sales[allitems].totalearnings += (data.earnings*sales[name].percentage)*add;
								sales[allitems].hours[data.date.getHours()] += add;
								sales[allitems].days[data.date.getDate()] += add;
								sales[allitems].earningsperday[data.date.getDate()] += parseInt(data.earnings*sales[name].percentage, 10);

								sales[allitems].maxsales_hour = Math.max(sales[allitems].hours[data.date.getHours()], sales[allitems].maxsales_hour);
								sales[allitems].maxsales_day = Math.max(sales[allitems].days[data.date.getDate()], sales[allitems].maxsales_day);
								sales[allitems].maxearnings_day = Math.max(sales[allitems].earningsperday[data.date.getDate()], sales[allitems].maxearnings_day);

								total_sales += add;
								total_sales_volume += (data.price)*add;
								total_earning += (data.earnings*sales[name].percentage)*add;
								break;

							case 'withdrawal':
								withdrawal.push(data);
								(data.earnings < 0) ? total_withdrawal++ : total_withdrawal--;
								total_withdrawal_money -= data.earnings;
								break;
								
							}

							firstdate = (firstdate > data.date.getTime() || !firstdate) ? data.date.getTime() : firstdate;
							lastdate = (lastdate < data.date.getTime() || !lastdate) ? data.date.getTime() : lastdate;
							
						}

						lastdata = data;

					}
					to = to || ((now.getMonth() == currentmonth && now.getFullYear() == currentyear) ? now : null);
					sortfunc = (sortdir == 'DESC') ? function(a,b){return b-a;} : function(a,b){return a-b;};
					if(sortby == 'name'){
						items.sort();
					}else{
						items = sortitby(sales, sortby, sortfunc);
					}
					items.unshift(allitems);
					
					makeContent();
					
				},

				sortitby = function (sales, sortby, sortfunc) {
					var sortarray = [];
					var returnitem = [];
					var used = [];
					$.each(sales, function(name, itemdata){
						sortarray.push(itemdata[sortby]);
					});
					sortarray.sort(sortfunc);
					$.each(sales, function(name, itemdata){
						if(name != allitems){
							var pos = parseInt($.inArray(itemdata[sortby], sortarray))*10;
							returnitem[next(pos, returnitem)] = name;
							
						}
					});
					
					function next(pos, arr){
						return (!arr[pos]) ? pos : next(++pos, arr);	
					}
					
					return $.map(returnitem, function(name){if(name) return name;});
				},
				

				loadStatementer = function () {
					$.ajax({
						url: 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min.js',
						dataType: "script",
						cache: true,
						success: function () {
						//current month
						if (now.getMonth() == currentmonth && now.getFullYear() == currentyear) {
							if (lastbalance != currentbalance) {
								$content.html('<span style="font-style:italic">fetching data...</span>');
								$.get(csvfile, function (data) {
									raw = $.trim(data.replace(/"Date","Type","Detail","Item ID","Amount","Rate","Price"\n/g, ''));
									save('statement_' + currentyear + '_' + currentmonth, raw);
									setCookie('statementer_lastbalance', currentbalance, 30);
									initCalc();
								});
							} else {
								raw = get('statement_' + currentyear + '_' + currentmonth);
								if (raw) {
									initCalc();
								} else {
									setCookie('statementer_lastbalance', '', -1);
									alert("Couldn't restore saved data. Please reload the page!");
									//location.reload();
								}
							}
							//other month
						} else {
							save('statement_' + currentyear + '_' + currentmonth, '');
							$content.html('<span style="font-style:italic">fetching data...</span>');
							$.get(csvfile, function (data) {
								raw = $.trim(data.replace(/"Date","Type","Detail","Item ID","Amount","Rate","Price"\n/g, ''));
								initCalc();
							});
						}
					}

					});

				},

				save = function (name, value){
					var obj = localStorage['statementer'] ? $.parseJSON(localStorage['statementer']) : {};
					
					obj[name] = value;
					localStorage.setItem('statementer', JSON.stringify(obj));
					
				},
				
				get = function (name){
					var obj = localStorage['statementer'] || false;
					
					if(!obj) return false;
					
					obj = $.parseJSON(obj);
					
					return (obj[name]) ? obj[name] : false;
				},

				initCalc = function () {
					raw = raw.split('\n');
					makeUI();
					calculate();
				},

				setCookie = function (cookieName, value, daysToExpire, path, domain, secure) {
					var expiryDate;

					if (daysToExpire) {
						expiryDate = new Date();
						expiryDate.setTime(expiryDate.getTime() + (daysToExpire * 8.64e7));
					}

					document.cookie = cookieName + '=' + (value.toString()) + (daysToExpire ? ';expires=' + expiryDate.toGMTString() : '') + ';path=' + (path ? path : '/') + (domain ? ';domain=' + domain : '') + (secure ? ';secure' : '');
					return getCookie(cookieName);
				},

				getCookie = function (cookieName) {
					var cookiePattern = new RegExp('(^|;)[ ]*' + cookieName + '=([^;]*)'),
						cookieMatch = cookiePattern.exec(document.cookie);
					if (cookieMatch) {
						return cookieMatch[2];
					}
					return 0;
				};

			prepareUI();


})();
