// ==UserScript==
// @name mobsters_profile
// @namespace org.positrium.gm
// @include http://www.playmobsterworld.com/*
// @description show calc earned money, total cost, total attack, total defence
// in profile page for playmobsterworld.com .
// @version 0.17.0
// ==/UserScript==
(function() {
	// =============================================================================
	// mode settings
	// -- for spket folding

	var mode_style = true;
	var mode_income = true;
	var mode_cost = true;
	var mode_atk = true;
	var mode_def = true;
	var mode_link = true;
	var log_level = 'info';
	
	// =============================================================================
	// CSS
	if(mode_style){
		 GM_addStyle(<><![CDATA[
		 .nav_bar tr td { font-size:9pt !important; }
		 .item_li { border:1px dashed #333 !important; }
		 .half_page td { font-size:9pt !important; }
		 .full_page td { font-size:9pt !important; }
		 .stats_table .col_0,.skills_table .col_0 { width:15% !important;}
		 .stats_table .gain { width:100% !important; }
		 .canvasbody td { padding:0.5ex !important;border-left:1px dashed #333
		 !important; border-bottom:1px solid #333 !important; }
		 .canvasbody .stages td,.canvasbody .success_box td { padding:0px
		 !important; border:0px !important; }
		 .canvasbody .leaderboard td { vertical-align:top !important }
		 table { width:100% !important; }
		 .stage_title { font-size:9pt !important; }
		 ]]></>);
	}

	// logger
	function Logger() {
		this.LV_DEBUG = 4;
		this.LV_INFO = 3;
		this.LV_WARN = 2;
		this.LV_ERROR = 1;
		this.LV_FATAL = 0;
		this.initialize.apply(this, arguments);
	}
	Logger.prototype = {
		initialize : function(level) {
			if ('debug' == level)
				this.level = this.LV_DEBUG;
			if ('info' == level)
				this.level = this.LV_INFO;
			if ('warn' == level)
				this.level = this.LV_WARN;
			if ('error' == level)
				this.level = this.LV_ERROR;
			if ('fatal' == level)
				this.level = this.LV_FATAL;
		},
		debug : function(str) {
			if (this.level >= this.LV_DEBUG) {
				GM_log('[debug]' + str);
			}
		},
		info : function(str) {
			if (this.level >= this.LV_INFO) {
				GM_log('[info   ]' + str);
			}
		},
		warn : function(str) {
			if (this.level >= this.LV_WARN) {
				GM_log('[warn   ]' + str);
			}
		},
		error : function(str) {
			if (this.level >= this.LV_ERROR) {
				GM_log('[error ]' + str);
			}
		},
		fatal : function(str) {
			if (this.level >= this.LV_FATAL) {
				GM_log('[fatal]' + str);
			}
		}
	};
	var log = new Logger(log_level);

	// =============================================================================
	// param check
	//

//	var bank = x_zero('/html/body/div[2]/div/table[2]/tbody/tr/td/div/a');
//	var bank_c = GM_getValue('bank_cash', 'plz access your bank.');
//	if(Number(bank_c)>0){
//		bank_c = cashcomma(bank_c);
//	}
//	bank.setAttribute('title',bank_c);
//	
//	if (location.href.match('bank')){
//		var bank_cash = cashDecomma(x_zero('/html/body/div[2]/div[2]/h1/span').textContent);
//		GM_setValue('bank_cash', bank_cash);
//		
//		var bank = x_zero('/html/body/div[2]/div/table[2]/tbody/tr/td/div/a');
//		var bank_c = GM_getValue('bank_cash', 'plz access your bank.');
//		if(Number(bank_c)>0){
//			bank_c = cashcomma(bank_c);
//		}
//		bank.setAttribute('title',bank_c);
//	}
//	else 
	if (location.href.match('profile')) {
		// ** items db ( beta )
		var weapon_db = {
			'baseball_bat' : {
				'attack' : 1,
				'defense' : 0,
				'upkeep' : 0
			},

			'crowbar' : {
				'attack' : 1,
				'defense' : 1,
				'upkeep' : 0
			},
			
			'pistol' : {
				'attack' : 2,
				'defense' : 2,
				'upkeep' : 0
			},

			'mp-433_grach' : {
				'attack' : 3,
				'defense' : 1,
				'upkeep' : 0
			},

			'pump-action_shotgun' : {
				'attack' : 2,
				'defense' : 3,
				'upkeep' : 0
			},

			'44_magnum' : {
				'attack' : 6,
				'defense' : 3,
				'upkeep' : 0
			},

			'tommy_gun' : {
				'attack' : 6,
				'defense' : 4,
				'upkeep' : 0
			},

			'assault_rifle' : {
				'attack' : 6,
				'defense' : 6,
				'upkeep' : 0
			},

			'm14_rifle' : {
				'attack' : 8,
				'defense' : 6,
				'upkeep' : 0
			},

			'chain_gun' : {
				'attack' : 8,
				'defense' : 8,
				'upkeep' : 0
			},

			'machine_pistol' : {
				'attack' : 12,
				'defense' : 10,
				'upkeep' : 1500
			},

			'grenade' : {
				'attack' : 16,
				'defense' : 14,
				'upkeep' : 2500
			},
			
			'machine_gun' : {
				'attack' : 18,
				'defense' : 16,
				'upkeep' : 5000
			},

			'wesson_ppc' : {
				'attack' : 10,
				'defense' : 6,
				'upkeep' : 0
			}
		};

		var vehicle_db = {
			'Sedan' : {
				'attack' : 4,
				'defense' : 5,
				'upkeep' : 50
			},

			'delivery_truck' : {
				'attack' : 3,
				'defense' : 3,
				'upkeep' : 30
			},

			'Motorcycle' : {
				'attack' : 2,
				'defense' : 2,
				'upkeep' : 20
			},

			'armored_sedan' : {
				'attack' : 4,
				'defense' : 6,
				'upkeep' : 200
			},

			'town_car' : {
				'attack' : 6,
				'defense' : 8,
				'upkeep' : 200
			},

			'getaway_cruiser' : {
				'attack' : 10,
				'defense' : 12,
				'upkeep' : 1500
			}
		};
			
		var armor_db = {
			'Bullet-proof Vest' : {
				'attack' : 2,
				'defense' : 4,
				'upkeep' : 0
			},

			'Body Armor' : {
				'attack' : 4,
				'defense' : 7,
				'upkeep' : 600
			},

			'stab-proof_vest' : {
				'attack' : 7,
				'defense' : 10,
				'upkeep' : 2500
			}
		};
		
		// I can not use Array.concat() .
		for(var i=0;i<vehicle_db.length;i++){
			weapon_db.push(vehicle_db[i]);
		}
		for(var i=0;i<armor_db.length;i++){
			weapon_db.push(armor_db[i]);
		}
		var item_db = weapon_db;

		// ** income
		if (mode_income) {
			var container = x_zero('/html/body/div[2]/div[2]/table[2]/tbody/tr/td[2]');

			var income = container.childNodes[0].textContent.replace('$', '')
					.replace(/[,]+/g, '').trim();
			var income_tw = container.childNodes[1].textContent.replace(
					/[a-zA-Z\(\)\+%]+/g, '').trim();
			var income_total = income;

			var income_span = container;

			log.debug("income:" + income_total);
			log.info("tweet bonus:" + income_tw);
			if (income_tw > 0) {
				log.info("tweet bonus avail!");
				income_total *= (1 + income_tw / 100);
				log.debug("income:" + income_total);
			} else {
				log.info("no tweet bonus..");
			}

			var container = x_zero('/html/body/div[2]/div[2]/table[2]/tbody/tr/td[2]/span');
			var income_tw_span = container.childNodes[1];
		}
		// ** upkeep
		var upkeeps = 0;
		var weapons = boughtWeaponArray();
		if (mode_cost) {
			for (var k in weapons) {
				if (item_db[k]) {
					var upkeep = item_db[k]['upkeep'] * weapons[k];
					upkeeps += upkeep;
					log.debug('[upk-item]'+k+'[@'+item_db[k]['upkeep']+'] * '+weapons[k]+' = '+upkeep)
				}
			}
		}
		log.info('[upk-total]:'+upkeeps);
		
		// ** attack value
		if (mode_atk) {
			var container = x_zero('/html/body/div[2]/div[2]/table/tbody/tr/td[2]');
			var atk = container.childNodes[0].textContent.trim();
			log.info("[ATK]:" + atk);
			var atk_total = 0;
			for (var k in weapons) {
				if (item_db[k]) {
					var atk_item = item_db[k]['attack'] * weapons[k];
					atk_total += Number(atk_item);
					log.debug('[atk-item]'+k+'[@'+item_db[k]['attack']+'] * '+weapons[k]+' = '+atk_item)
				}
			}
			atk_total += Number(atk);
			log.info("[atk-total]:"+atk_total);
			
			var atk_span = container;
			
			var atkIncrease = atk_total - atk;
			atk_span.appendChild(cT(' + ' + cashcomma(atkIncrease) + ' = ' + cashcomma(atk_total)));
		}
		// ** defense value
		if (mode_def) {
			var container = x_zero('/html/body/div[2]/div[2]/table/tbody/tr[2]/td[2]');
			var def = container.childNodes[0].textContent.trim();
			log.info("[DEF]:" + def);
			var def_total = 0;
			for (var k in weapons) {
				if (item_db[k]) {
					var def_item = item_db[k]['defense'] * weapons[k];
					def_total += Number(def_item);
					log.debug('[def-item]'+k+'[@'+item_db[k]['defense']+'] * '+weapons[k]+' = '+def_item)
				}
			}
			def_total += Number(def);
			log.info("[def-total]:"+def_total);
			
			var def_span = container;
			
			var defIncrease = def_total - def;
			def_span.appendChild(cT(' + ' + cashcomma(defIncrease) + ' = ' + cashcomma(def_total)));
		}

		// ====================================================
		// output
		var total = income_total - upkeeps;

		var incomeIncrease = 0;
		if (income_tw > 0) {
			incomeIncrease = income * income_tw / 100;
		}
		income_tw_span.appendChild(cT('[$' + cashcomma(incomeIncrease) + ']'));
		income_span.appendChild(cT('=$' + cashcomma(income_total)));
		var cost_span = cE('span',{style:'color:red;'});
		cost_span.appendChild(cT(' - $'+cashcomma(upkeeps)));
		income_span.appendChild(cost_span);
		var total_span = new Object();
		if(total<0){
			total_span = cE('span',{style:'color:#7F605F;'});
		}else{
			total_span = cE('span',{style:'color:#BCD2EA;'});
		}
		total_span.appendChild(cT(' = $'+cashcomma(total)));
		income_span.appendChild(total_span);
		
	}
	else if (location.href.match('main')) {
		
		if(mode_style){
			GM_addStyle(<><![CDATA[
			canvasbody td { padding:0px !important; border:0px !important; }
			]]></>);
		}
		
	}
	else if (location.href.match('invite_friends')) {
		
		if(mode_style){
			GM_addStyle(<><![CDATA[
			.canvasbody td { padding:0px !important; border:0px !important; }
			]]></>);
		}
		
	}
	else if (location.href.match('jobs')){
		// my mobs
		var container = x_zero('/html/body/div[2]/div/table[3]/tbody/tr/td[9]/a');
		var myMobs = Number(container.textContent.replace(/[a-zA-Z\(\)]/g,'').trim());
		
		log.debug('[mobs]'+myMobs);
		
		// job require mobs amount
		container = x('/html/body/div[2]/div[2]/table[2]/tbody/tr/td[3]/span[2]');
		var job_tr_container = x('/html/body/div[2]/div[2]/table[2]/tbody/tr');
		
		for(var i=0;i<container.length;i++){
			var req_mobs = Number(container[i].textContent);
			if(req_mobs>myMobs){
				var tr = job_tr_container[i+1];
				tr.setAttribute('style','background-color:#4F3C3B');
			}
		}
		
		container = x('/html/body//img');
		var item_strip = 'http://www.playmobsterworld.com/img/wicked/mymobwars/items/';
		var mark_strip = 'http://www.playmobsterworld.com/img/wicked/mymobwars/';
		for(var i=0;i<container.length;i++){
			var image = container[i];
			var src = image.src;
			if(src.match(item_strip)){
				var alt_src = src.replace(item_strip,'');
				log.debug(alt_src.substring(0, alt_src.length-4));
				
				image.setAttribute('title',alt_src.substring(0, alt_src.length-4));
			}
		}
		
		container = x('/html/body/div[2]/div[2]/table[2]/tbody/tr/td/div/span');
		for(var i=0;i<container.length;i++){
			var job_mastery = container[i].textContent.replace(' Job Mastery: ','').toUpperCase();
			if(job_mastery=='COMPLETED'){
				var tr = job_tr_container[i+1];
				tr.setAttribute('style','background-color:#1F1F1F');
			}
		}
		
		container = x('/html/body/div[2]/div[2]/table[2]/tbody/tr/td[2]/span[@class="gain"]');
		var experi = x('/html/body/div[2]/div[2]/table[2]/tbody/tr/td[2]/span[@class="requirement"]');
		var req_energy = x('/html/body/div[2]/div[2]/table[2]/tbody/tr/td[3]/span[1]');
		
		for(var i=0;i<container.length;i++){
			var job_cash_span = container[i];
			var job_cash = cashDecomma(job_cash_span.textContent);
			
			var job_exp_span = experi[i];
			var job_exp  = Number(job_exp_span.textContent.replace('+','').trim());
			var job_req_en = Number(req_energy[i].textContent);
			
			var job_cash_rate = String(job_cash/job_req_en);
			var result_job_cash_rate = job_cash_rate;
			if(job_cash_rate.indexOf('.')>0){
				result_job_cash_rate = job_cash_rate.substring(0, job_cash_rate.lastIndexOf('.')+3);
			}
			
			var job_exp_rate = String(job_exp/job_req_en);
			var result_job_exp_rate = job_exp_rate;
			if(job_exp_rate.indexOf('.')>0){
				result_job_exp_rate = job_exp_rate.substring(0, job_exp_rate.lastIndexOf('.')+3);
			}
			
			job_cash_span.appendChild(cE('br'));
			job_cash_span.appendChild(cT(" ( $"+result_job_cash_rate+"/e )"));
			job_exp_span.appendChild(cE('br'));
			job_exp_span.appendChild(cT(" ( +"+result_job_exp_rate+"/e )"));
			
			log.debug("Cash:"+job_cash+"("+result_job_cash_rate+")/Exp:"+job_exp+"("+result_job_exp_rate+")/Req:"+job_req_en);
		}
		
	}
	else if (location.href.match('fight')){
		// **********************************
		// mob size check
		// **********************************
		// my mobs
		var container = x_zero('/html/body/div[2]/div/table[3]/tbody/tr/td[9]/a');
		var myMobs = Number(container.textContent.replace(/[a-zA-Z\(\)]/g,'').trim());
		
		// enemy mob size
		container = x('/html/body/div[2]/div[2]/table/tbody/tr/td[3]');
//		var enem_tr_container = x('/html/body/div[2]/div[2]/table/tbody/tr');
		
		log.debug('[my]'+myMobs);
		log.debug('[enems]'+container.length);
		for(var i=1;i<container.length;i++){
			var enem_td = container[i];
			var enem_mobs = Number(enem_td.textContent.trim());
			log.debug('[enem]'+enem_mobs);
			if(enem_mobs==myMobs){
				enem_td.setAttribute('style','background-color:#6A577F')
			}else if(enem_mobs<myMobs){
//				var tr = enem_tr_container.snapshotItem(i);
//				tr.setAttribute('style','background-color:#647F5F');
				enem_td.setAttribute('style','background-color:#647F5F');
			}
		}
		
		// **********************************
		// level check
		// **********************************
		var myLv = Number((x_zero('//*[@id="attr_level"]')).textContent.trim());
		container = x('/html/body/div[2]/div[2]/table/tbody/tr/td[2]');
		var idx_enem_name = 0,idx_enem_lv = 1;
		for(var i=1;i<container.length;i++){
			var lv_td = container[i];
			var lv_txt = lv_td.childNodes[idx_enem_lv].textContent;
			var enem_lv = Number(
				lv_txt
				.replace(', Level ','')
				.replace('Bulletproof','')
				.replace('Tycoon','')
				.replace('Insomniac','')
				.trim()
				);
				log.debug(enem_lv);
				if(enem_lv==myLv){
					lv_td.setAttribute('style','background-color:#6A577F')
				}else if(enem_lv<myLv){
					lv_td.setAttribute('style','background-color:#647F5F');
				}
		}
		
		// image fix
		var imgs = x('/html/body/div[2]/div[2]/table/tbody/tr/td/a/img');
		for(var i in imgs){
			imgs[i].setAttribute('width','24px');
			imgs[i].setAttribute('height','24px');
		}
		
	}
	else if(location.href.match('property')){
		var income_container = x('/html/body/div[2]/div[2]/table/tbody/tr/td[2]/span[@class="gain"]');
		var price_container = x('/html/body/div[2]/div[2]/table/tbody/tr/td[3]/div/span[@class="gain"]');
		
		var my_money = cashDecomma(x_zero('//*[@id="cash"]').textContent);
		
		for(var i=0;i<income_container.length;i++){
			var income_span  = income_container[i];
			var price_span  = price_container[i];
			
			var income_value = cashDecomma(income_span.textContent);
			var price_value = cashDecomma(price_span.textContent);
			
			log.debug('[income_value('+i+')]'+income_value);
			log.debug('[price_value ('+i+')]'+price_value);
			
			var interest_rate = income_value/price_value*100;
			
			log.debug('=====('+i+')'+String(interest_rate).substring(0,4)+'%');
			var interest_text = String(interest_rate).substring(0,4)+'%';
			
			var parent_td = income_span.parentNode;
			parent_td.appendChild(cE('br'));
			parent_td.appendChild(cT("Interest: "+interest_text));
			
			if(my_money<price_value){
				price_span.setAttribute('style','color:red;');
			}
		}
	}
	else if(location.href.match('items')){
		var my_money = cashDecomma(x_zero('//*[@id="cash"]').textContent);
		log.debug('[my money]'+my_money);
		
		// item_price container
		var price_container = x('/html/body/div[2]/div[2]/table/tbody/tr/td[5]/span');
		var atk_container = x('/html/body/div[2]/div[2]/table/tbody/tr/td[3]/strong');
		var def_container = x('/html/body/div[2]/div[2]/table/tbody/tr/td[4]/strong');
		
		for(var i=0;i<price_container.length;i++){
			var item_price_span = price_container[i];
			var item_price = cashDecomma(item_price_span.textContent);
			
			var item_atk_span = atk_container[i];
			var item_atk = Number(item_atk_span.textContent.replace(' Attack: ',''));
			var item_atk_rate = String(item_price/item_atk);
			if(item_atk_rate.indexOf('.')>0){
				item_atk_rate = item_atk_rate.substring(0, item_atk_rate.lastIndexOf('.'));
			}
			item_atk_span.appendChild(cE('br'));
			item_atk_span.appendChild(cT('$'+cashcomma(item_atk_rate)+'/atk'));
			
			var item_def_span = def_container[i];
			var item_def = Number(item_def_span.textContent.replace(' Defense: ',''));
			var item_def_rate = String(item_price/item_def);
			if(item_def<1){
				item_def_rate = '0';
			}
			if(item_def_rate.indexOf('.')>0){
				item_def_rate = item_def_rate.substring(0, item_def_rate.lastIndexOf('.'));
			}
			item_def_span.appendChild(cE('br'));
			item_def_span.appendChild(cT('$'+cashcomma(item_def_rate)+'/def'));
			
			log.debug('[item cash]'+item_price);
			
			if(my_money<item_price){
				item_price_span.setAttribute('style','color:red;');
			}
		}
	}	
	else {
		log.fatal('url unmatch!');
		// ==
		// ==
		// ==
		// ==
		// ==
	}
	
		// =================
		// link to userscripts.org
	if (mode_link) {
		var end_div = x_zero('//*[@id="main"]'); // out put place 1
		// var end_div = x_zero('/html/body/div[2]/div'); // out put place 2
		end_div.appendChild(cE('hr'));
		var script_link = cE('a', {
					href : 'http://userscripts.org/scripts/show/59422'
				});
		end_div.appendChild(script_link);
		script_link.appendChild(cT('GM:mobsters_profile'));
	}
		

	// =====================
	// functions and library
	
	/**
	 * create TextNode.
	 * @argument value String
	 */
	function cT(value) {
		var d = document.createTextNode(value);
		return d;
	}
	
	/**
	 * create ElementNode.
	 * @argument name element name
	 * @argument array atribute array
	 */
	function cE(name, array) {
		var d = document.createElement(name);
		for (var i in array) {
			d.setAttribute(i, array[i]);
		}
		return d;
	}
	/**
	 * get nodes array from xpath.
	 * @argument xpath String
	 * @return nodesArray Array
	 */
	function x(xpath) {
		var nodes = document.evaluate(xpath, document, null,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var nodesArray = [];
		for(var i=0;i<nodes.snapshotLength;i++){
			nodesArray.push(nodes.snapshotItem(i));
		}
		return (nodesArray.length>=1)?nodesArray:null;
	}
	/**
	 * get first node from xpath.
	 * @argument path String
	 * @return node Object
	 */
	function x_zero(xpath) {
		var nodes = x(xpath);
		return nodes[0];
	}
	
	/**
	 * append trim function looks like PHP<br>
	 *  to String(native) object.
	 */
	String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$$/g, '');
	}
	
	/**
	 * set comma to pure value.<br/>
	 * <b>10000 -&gt; 10,000</b> 
	 * @argument value String
	 * @return value_with_comma String
	 */
	function cashcomma(value) {
		var ret = Math.abs(value);
		var result = ret.toString();
		if (value.toString().length % 3 > 0) {
			var digit = ret.toString().length % 3;

			var append = 0;
			if (digit > 0)
				append = 3 - digit;

			for (var i = 0; i < append; i++) {
				result = 'A' + result;
			}
		}

		var concarr = Array('');
		for (var i = 0; i < result.length / 3; i++) {
			concarr[i] = result.substring((i) * 3, (i + 1) * 3);
		}
		ret = concarr.join(',').replace(/[A]+/g, '');

		if(value<0){
			ret = '-'+ret;
		}
		return ret;
	}
	
	/**
	 * unset comma from value with comma.<br/>
	 * <b>10,000 -&gt; 10000</b> 
	 * @argument value_with_comma String
	 * @return pure_value String
	 */
	function cashDecomma(value){
		return Number(value.replace('$','').replace(/,/g,'').trim());
	}

	// bought waepon name and amount.
	function boughtWeaponArray() {
		var container = x('/html/body/div[2]/div[2]/ul/li/div/img');
		var am_container = x('/html/body/div[2]/div[2]/ul/li/div[2]');

		var split_word = 'http://www.playmobsterworld.com/img/wicked/mymobwars/items/';
		var split_word_am = 'X ';

		var weapons = Array();

		for (var i = 0; i < container.length; i++) {
			var item = (container[i].src);
			var amount = (am_container[i].textContent);
			if (item.match('items')) {
				item = item.substring(split_word.length, item.length - 4);
				amount = amount.substring(split_word_am.length, amount.length);
				weapons[item] = amount;
			}
		}

		return weapons;
	}

})();