// ==UserScript==
// @name 140mafia_profile
// @namespace org.positrium.gm
// @include http://140mafia.com/*
// @description similar with mobsters_profile .
// @version 0.5.4
//
//
// ==/UserScript==
(function() {
	/* --------------------------------- init ------------------------------- */
	// for confirmation
	var gm_init_values = {
		current_cash:0,
		bank_cash:0,
		current_lvl:0,
		current_mob:0,
		owned_item_obj:0
	}

	// -------------------------------
	// personal data
	// -------------------------------
	var current_cash = GM_getValue('current_cash',0);
	var bank_cash = GM_getValue('bank_cash',0);
	var current_mob = GM_getValue('current_mob',0);
	var current_lvl = GM_getValue('current_lvl',0);
	
	var owned_item_init = {
		'crowbar':0
	};
	
	var _g_owned_item_db = eval(GM_getValue('owned_item_obj',owned_item_init.toSource()));
	
	// constance
	const IS_SHOWING_USORG_LINK = true;
	const userscript_cmd_text = 'Firefox MenuBar : Tool > Greasemonkey > userscript command > ';

	// user script command
	const toggle_prefix = '140plf';
	makeMenuToggle(
		"isUsingCustomCSS", 
		true, 
		"custom CSS [on]", 
		"custom CSS [off]", 
		toggle_prefix);
	makeMenuToggle(
		"isSimpleExp",
		true,
		"[simple]",
		"[detail]",
		toggle_prefix);
	makeMenuToggle(
		"isShowingWeaponsList",
		false,
		"fight result [list]",
		"fight result [inline]",
		toggle_prefix);

	var note = {
		fight_result : {
			type : 'HINT',
			msg : {
				en: [
					'If you want to show rival weapon list in fight result, you click this menu item. ',
					'<br>',
					userscript_cmd_text,
					toggle_prefix+': fight result [list]'
				]
			}
		}
	}
	
	var lng = 'en';//window.navigator.language;
	GM_setValue('user_lng',lng);
	
	/* --------------------------------- utils ------------------------------ */
	/** cash converter class<br><br>
	 *  cash#comma(value,digit,msg):String withComma <br>
	 *  cash#decomma(string):Number withoutComma 
	 */
	var cash = new Cash();
	/** recyle string */
	var xpath = new String();
	
	/* --------------------------------- logger ----------------------------- */
	const DEBUG = false;
	/** firebug logger */
	log = console; // console -- firebug logger instance.
	log.debug = function (text) { if(DEBUG) log.log(text);};
	log.ast = function (expr,msg) { 
		if(DEBUG){
			log.group('assert '+parseInt(Math.random()*10000));
			log.log(msg);
			log.assert(expr);
			log.groupEnd();
		}
	}
	log.dummy = function () {};

	
	/* --------------------------------- CSS -------------------------------- */
	if(isUsingCustomCSS){
		// unique key : TQad8unv
		 GM_addStyle(<><![CDATA[
		 	 /* override */
		 	 div#body td { 
		 		padding:0.5ex !important;
		 		border-left:1px dashed #333 !important; 
		 		border-bottom:1px solid #333 !important;
		 	 }
		 	 img.userpic {
			 	width:24px !important;
			 	height:24px !important;
			 }
			 /* create */
			 .TQad8unv_job_invalid {
			 	background-color:#4F3C3B !important;
			 }
			 .TQad8unv_hide {
			 	display:none;
			 }
			 .TQad8unv_bank_cash { 
			 	color:#94CF67;
			 }
			 .TQad8unv_bank_cash_link:link,
			 .TQad8unv_bank_cash_link:visited,
			 .TQad8unv_bank_cash_link:active {
			 	color:#94CF67;
			 	text-decoration:none;
			 }
			 .TQad8unv_tipicon {
			 	font-weight:bolder;
			 	font-family:'Verdana';
			 }
			 .TQad8unv_note_HINT {
			 	padding:.5ex;
			 	padding-left:1ex;
			 	margin:1ex;
			 	
			 	border:2px dashed #333;
			 	color:#333;
			 	background-color:#FFF6BF;
			 }
			 .TQad8unv_note_QUESTION {
			 	padding:.5ex;
			 	padding-left:1ex;
			 	margin:1ex;
			 	
			 	border:2px dashed #333;
			 	color:#333;
			 	background-color:#A7D6DF;
			 }
			 .TQad8unv_note_CAUTION {
			 	padding:.5ex;
			 	padding-left:1ex;
			 	margin:1ex;
			 	
			 	border:2px dashed #EFE795;
			 	color:#EFE795;
			 	background-color:#333;
			 }
			 .TQad8unv_note_WARN {
			 	padding:.5ex;
			 	padding-left:1ex;
			 	margin:1ex;
			 	
			 	border:2px dashed #EF6459;
			 	color:#EF6459;
			 	background-color:#333;
			 }
			 .TQad8unv_job_exprate:before {
			 	content:" ( +";
			 }
			 .TQad8unv_job_exprate:after {
			 	content:"/e ) ";
			 }
			 .TQad8unv_job_cashrate:before {
			 	content:" " url('http://server.140mafia.com/img/mafia/money.png');
			 }
			 .TQad8unv_job_cashrate:after {
			 	content:'/e';
			 }
			 .TQad8unv_fight_even {
			 	background-color:#6A577F;
			 }
			 .TQad8unv_fight_weak {
			 	background-color:#647F5F;
			 }
			 .TQad8unv_fight_enemimg {
			 	width:24px;
			 	height:24px;
			 }
			 .TQad8unv_item_atkrate:before {
			 	content:"$";
			 }
			 .TQad8unv_item_atkrate:after {
			 	content:"/atk";
			 }
			 .TQad8unv_item_defrate:before {
			 	content:"$";
			 }
			 .TQad8unv_item_defrate:after {
			 	content:"/def";
			 }
			 .TQad8unv_cash_notenough {
			 	color:red;
			 }
			 .TQad8unv_item_count_total {
			 	text-align:center;
			 	font-weight:bolder;
			 	background-color:#ffcb03;
			 	color:#333;
			 }
			 .TQad8unv_item_count_reqire {
			 	text-align:center;
			 	font-weight:bolder;
			 	background-color:#f00;
			 	color:#fff;
			 }
			 .TQad8unv_item_count_reqire:before {
			 	content:"req: ";
			 }
			 .TQad8unv_item_count_reqire:after {
			 	content:"";
			 }
			 .TQad8unv_item_count_enough{
			 	text-align:center;
			 	font-weight:bolder;
			 	background-color:#00f;
			 	color:#fff;
			 }
			 .TQad8unv_item_count_enough:before {
			 	content:"enough(";
			 }
			 .TQad8unv_item_count_enough:after {
			 	content:")";
			 }
			 .TQad8unv_prop_interest:before {
			 	content:"Interest: ";
			 }
			 .TQad8unv_prop_interest:after {
			 	content:"%";
			 }
			 .TQad8unv_prof_link {
			 	color:#25FF00;
			 }
			 .TQad8unv_prof_origcomment {
			 	color:#999;
			 }
			 .TQad8unv_item_canbuy:before {
			 	content:"Can: ";
			 }
			 .TQad8unv_prop_suburban {
			 	background-color:#4F5F35;
			 }
			 .TQad8unv_prop_city {
			 	background-color:#5F5F5F;
			 }
			 .TQad8unv_prop_downtown {
			 	background-color:#5F4641;
			 }
			 .TQad8unv_prop_island {
			 	background-color:#17465F;
			 }
		 ]]></>);
	}
	
	/* ====================== *
	 * PAGE PATTERN
	 * ====================== */
	log.group('PAGE PATTERN');
	
	var PAGE = String(location.href);
	log.debug(PAGE);
	
	if (PAGE.match('jobs')){
		// -------------------------------
		// for TR coloring
		// -------------------------------
		xpath = [
			'/html/body/div/div[5]/div/table/tbody/tr'
			];
		var _job_tr = x_try(xpath,'job tr');
		_job_tr.shift();
		
		// -------------------------------
		// job require mobs amount
		// with TR coloring 
		// -------------------------------
		log.group('job require mob');
		xpath = [
			'/html/body/div/div[5]/div/table/tbody/tr/td[3]'
			];
		var _job_req_mob = x_try(xpath, 'job req mob');
		
		var strip_word1 = 'energy';
		var strip_word2 = 'mobsters';
		for(var i in _job_req_mob){
			var _req_mob = _job_req_mob[i].textContent;
			if(_req_mob.match('mobsters')){
				// 7 energy[ 1 ]mobsters
				var _req_mobs_value = Number(
						_req_mob.substring(_req_mob.indexOf(strip_word1)+strip_word1.length)
						.replace(strip_word2,'').trim()
						);
//				log.debug('TR('+i+') req mob: '+_req_mobs_value);
							
				if(_req_mobs_value > current_mob){
					_job_tr[i].setAttribute('class','TQad8unv_job_invalid');
				}
			}else{
//				log.debug('TR('+i+') req mob: 0');
			}
		}
		log.groupEnd();
		
		// -------------------------------
		// cash average and cash/energy.
		// experience/energy.
		// -------------------------------
		log.group('job cash/e, exp/e');
		// earn min cash
		xpath = [
			'/html/body/div/div[5]/div/table/tbody/tr/td[2]/span[1]'
			];
		var _cash1 = x_try(xpath, 'job earn cash min');
		
		// earn max cash
		xpath = [
			'/html/body/div/div[5]/div/table/tbody/tr/td[2]/span[2]'
			];
		var _cash2 = x_try(xpath, 'job earn cash max');
		
		// earn experience
		xpath = [
			'/html/body/div/div[5]/div/table/tbody/tr/td[@class="col_1 col_odd"]'
			];
		var _experi = x_try(xpath, 'job earn exp');
		
		// require energy
		xpath = [
			'/html/body/div/div[5]/div/table/tbody/tr/td[3]/img'
			];
		var _req_energy = x_try(xpath, 'job req energy');
		
//		log.info('_req_energy.length:'+_req_energy.length);
//		log.info('_cash1.length:'+_cash1.length);

		// require_item
		xpath = [
			'/html/body/div/div[5]/div/table/tbody/tr/td[4]'
			];
		var _req_item = x_try(xpath, 'job req item td');
		
		log.ast(_job_tr.length==_req_energy.length,'344');
		
		var _job_tr_length = _cash1.length;
		log.debug('[TR.len]:'+_job_tr_length);
		for(var i=0;i<_job_tr_length;i++){
			log.group('TR('+i+')');
			// ---------------
			// require energy
			// ---------------
			var req_energy_text = _req_energy[i].parentNode.textContent;
//			log.info('cashMIN = '+_cash1[i].textContent+' / req en txt = '+req_energy_text);
			
			var job_req_en = Number(req_energy_text.substring(0, req_energy_text.indexOf('energy')).replace('energy','').trim());
			log.debug('energy:'+job_req_en);//+' text( '+req_energy[i+1].textContent+' )');
			
			// ---------------
			// cash rate
			// ---------------
			var job_cash1_span = _cash1[i];
			var job_cash2_span = _cash2[i];
			var job_cash1 = cash.decomma(job_cash1_span.textContent);
			var job_cash2 = cash.decomma(job_cash2_span.textContent);
			var job_cash = (job_cash1+job_cash2)/2; // avg
			log.debug("cash:"+job_cash+" (= "+job_cash1+" + "+job_cash2+" / 2)");
			
			var job_cash_rate = String(job_cash/job_req_en);
			var result_job_cash_rate = job_cash_rate;
			if(job_cash_rate.indexOf('.')>0){
				result_job_cash_rate = job_cash_rate.substring(0, job_cash_rate.lastIndexOf('.')+3);
			}
			log.debug('cash rate:'+result_job_cash_rate);
			
			// ---------------
			// exp rate
			// ---------------
			var job_exp_span = _experi[i+1];
			var job_exp_text = job_exp_span.textContent;
			var job_exp  = Number(job_exp_text.substring(job_exp_text.indexOf('+')+1).trim());
			log.debug('exp:'+job_exp);
			
			var job_exp_rate = String(job_exp/job_req_en);
			var result_job_exp_rate = job_exp_rate;
			if(job_exp_rate.indexOf('.')>0){
				result_job_exp_rate = job_exp_rate.substring(0, job_exp_rate.lastIndexOf('.')+3);
			}
			log.debug('exp rate:'+result_job_exp_rate);
			
			// view
			job_cash2_span.innerHTML += '<span class="TQad8unv_job_cashrate">'+result_job_cash_rate+'</span>';
			job_exp_span.innerHTML += '<span class="TQad8unv_job_exprate">'+result_job_exp_rate+'</span>';
			
			// rewrite 'Experience' to 'Exp'
			_experi[i+1].innerHTML = _experi[i+1].innerHTML.replace('Experience','Exp');
//				log.debug('[innerHTML]'+experi[i+1].innerHTML);
			
			
			var _req_item_td = _req_item[i];
			var item_arr = _req_item_td.innerHTML.split('<br>');
			for(var j in item_arr){
				var out = item_arr[j].trim().replace(/ /g, '');
				out = out.replace('x<imgclass="icon"src="http://server.140mafia.com/img/mafia/items/small/',';');
				out = out.substring(0,out.indexOf('.'));
				var item = out.split(';');
				if(item[0]>_g_owned_item_db[item[1]]){
					_req_item[i].setAttribute('class','TQad8unv_job_invalid');
				}
				log.debug(out);
			}
			log.groupEnd();
		} // END of for-loop
		
		// -------------------------------
		// set item image tooltip
		// -------------------------------
		log.group('item image tooltip');
		xpath = [
			'/html/body/div/div[5]/div/table/tbody/tr/td[4]/img'
			];
		var _job_item_obj = x_try(xpath, 'job item');
		var item_strip = 'http://server.140mafia.com/img/mafia/items/small/';
		for(var i in _job_item_obj){
			var img = _job_item_obj[i];
			var src = img.src;
			if(src.match(item_strip)){
				var alt_name = src.replace(item_strip,'');
				var item_title = alt_name.substring(0, alt_name.length-4);
//				log.debug('item-name:'+ item_title);
				img.setAttribute('title',item_title+'['+_g_owned_item_db[item_title]+']');
			}
		}
		log.groupEnd();
		
		log.groupEnd();
		
	}
	else if (PAGE.match('fight')){
		// -------------------------------
		// enemy mob size.
		// -------------------------------
		log.group('fight enemy mobsize');
		xpath = [
			'/html/body/div/div[5]/div/table/tbody/tr/td[3]'
			];
		var _fight_enem_mobs = x_try(xpath, 'fight enem mobs');
		_fight_enem_mobs.shift(); // strip first record that is column titles.
		log.debug('enems length:'+_fight_enem_mobs.length)
		for(var i in _fight_enem_mobs){
			var enem_td = _fight_enem_mobs[i];
			var enem_mobs = Number(enem_td.textContent.trim());
//			log.debug('enem_size:'+enem_mobs);
			if(current_mob == enem_mobs){
				// even
				enem_td.setAttribute('class','TQad8unv_fight_even')
			}
			else if(current_mob > enem_mobs){
				// weak
				enem_td.setAttribute('class','TQad8unv_fight_weak');
			}
		}
		log.groupEnd();
		
		// -------------------------------
		// enemy level
		// -------------------------------
		log.group('fight enemy level');
		xpath = [
			'/html/body/div/div[5]/div/table/tbody/tr/td[2]'
			];
		var _fight_enem_lvl = x_try(xpath, 'fight enem level');
		_fight_enem_lvl.shift(); // strip first record that is column titles.
		for(var i in _fight_enem_lvl){
			var lv_td = _fight_enem_lvl[i];
			var lv_txt = lv_td.textContent;
			var enem_lv = Number(
				lv_txt
				.replace('Level','')
				.replace('Hustler','')
				.replace('Adrenaline','')
				.replace('Street Smart','')
				.trim()
				);
//				log.debug('enem-lvl:'+enem_lv);
				if(current_lvl == enem_lv){
					// even
					lv_td.setAttribute('class','TQad8unv_fight_even')
				}
				else if(current_lvl > enem_lv){
					// weak
					lv_td.setAttribute('class','TQad8unv_fight_weak');
				}
		}
		log.groupEnd();
		
		// -------------------------------
		// fix enem image size
		// -------------------------------
		xpath = [
			'/html/body/div/div[5]/div/table/tbody/tr/td/a/img',
			'/html/body/div/div[5]/div/table/tbody/tr/td/img'
			];
		var imgs = x_try(xpath,'fight enem imgs');
		for(var i in imgs){
			if(imgs[i].nodeName=='IMG'){
				imgs[i].setAttribute('class','TQad8unv_fight_enemimg');
			}
		}
		
		// -------------------------------
		// list to fight result ( items )
		// -------------------------------
		if(isShowingWeaponsList){
			xpath = [
				'/html/body/div/div[5]/div/div/div/div/p[1]'
				];
			var my_mesg = x_zero_try(xpath, 'my_result_mesg');
			if(my_mesg!=null){
				my_mesg.innerHTML = '<b>'+my_mesg.innerHTML.replace(':',':</b><br/>').replace(/,/g,',<br/>');
			}
			xpath = [
				'/html/body/div/div[5]/div/div/div/div/p[2]'
				];
			var enem_mesg = x_zero_try(xpath, 'enem_result_mesg');
			if(enem_mesg!=null){
				enem_mesg.innerHTML = '<b>'+enem_mesg.innerHTML.replace(':',':</b><br/>').replace(/,/g,',<br/>');
			}
		}else{
			xpath = [
				'/html/body/div/div[5]/div/div'
				];
			var result_div = x_zero_try(xpath, 'fight result');
			var tip_div = cDivTip(note['fight_result']);
			result_div.appendChild(tip_div);
		}
		
		
	}
	else if(PAGE.match('properties') || PAGE.match('property')){
		// ----------
		// income
		// ----------
		xpath = [
			'/html/body/div/div[5]/div/table/tbody/tr/td[2]/span[@class="money"]'
			];
		var prop_income_list = x_try(xpath, 'property income list');
		
		// ----------
		// price
		// ----------
		xpath = [
			'/html/body/div/div[5]/div/table/tbody/tr/td[3]/span[@class="money"]'
			];
		var prop_price_list = x_try(xpath, 'property price list');
		
		for(var i in prop_income_list){
			var income_span  = prop_income_list[i];
			var price_span  = prop_price_list[i];
			
			var income_value = cash.decomma(income_span.textContent, 'prop income');
			var price_value = cash.decomma(price_span.textContent, 'prop price');
			
			log.debug('[income_value('+i+')]'+income_value);
			log.debug('[price_value ('+i+')]'+price_value);
			
			// ---------------
			// calc interest
			// ---------------
			var interest_rate = income_value/price_value*100;
			var interest_text = cash.comma(interest_rate,2,'test');
			log.debug('=====('+i+')'+interest_text);
			
			var parent_td = income_span.parentNode;
			var interest_span = cE('span',{class:'TQad8unv_prop_interest'});
			interest_span.appendChild(cT(interest_text));
			parent_td.appendChild(cE('br'));
			parent_td.appendChild(interest_span);
			
			// ---------------
			// balance check
			// ---------------
			if(current_cash < price_value){
				price_span.setAttribute('class','TQad8unv_cash_notenough');
			}
			
			// ------------
			// How much can you buy it?
			// ------------
			var prop_price_span = prop_price_list[i];
			var crrbank_amount = cash.comma((current_cash+bank_cash)/price_value,null,'buyable with current+bank');
			var current_amount = cash.comma((current_cash)/price_value, null, 'buyable with current');
			var can_buy_div = cE('div',{class:'TQad8unv_item_canbuy'});
			can_buy_div.appendChild(cT(current_amount+'('+crrbank_amount+')'));
			prop_price_span.parentNode.appendChild(can_buy_div);
			
			// ------------
			// require lot coloring
			// ------------
			var prop_income_td = prop_income_list[i].parentNode;
			var prop_income_tr = prop_income_td.parentNode;
			var prop_income_txt = prop_income_td.textContent;
			if(prop_income_txt.match("Suburban Lot")){
				prop_income_tr.setAttribute('class','TQad8unv_prop_suburban');
			}
			else if(prop_income_txt.match("City Lot")){
				prop_income_tr.setAttribute('class','TQad8unv_prop_city');
			}
			else if(prop_income_txt.match("Prime Downtown Lot")){
				prop_income_tr.setAttribute('class','TQad8unv_prop_downtown');
			}
			else if(prop_income_txt.match("Island")){
				prop_income_tr.setAttribute('class','TQad8unv_prop_island');
			}
		}
		
	}
	else if(PAGE.match('item')){
		
		GM_setValue('owned_item_obj',owned_item_init.toSource());
		// -------------------------------
		// products price, attack, defense
		// -------------------------------
		xpath = [
			'/html/body/div/div[5]/div/table/tbody/tr/td[5]/span[@class="money"]'
			];
		var item_price_list = x_try(xpath, 'item prices');
		
		xpath = [
			'/html/body/div/div[5]/div/table/tbody/tr/td[3]'
			];
		var item_atk_list = x_try(xpath, 'item attack');
		
		xpath = [
			'/html/body/div/div[5]/div/table/tbody/tr/td[4]'
			];
		var item_def_list = x_try(xpath, 'item defense');
		
		log.ast(item_price_list.length==item_atk_list.length,'price.len == atk.len');
		log.ast(item_price_list.length==item_def_list.length,'price.len == def.len');
		log.ast(item_def_list.length==item_atk_list.length,'def.len == atk.len');
		
		// -------------------------------
		// owned items count weapons, armors, vehicles
		// for enough distribution.
		// -------------------------------
		xpath = [
			'/html/body/div/div[5]/div/table[1]/tbody/tr/td[5]'
			];
		var owned_weapon_list = x_try(xpath, 'item owned weapons');
		var weapons_range = owned_weapon_list.length;
		
		xpath = [
			'/html/body/div/div[5]/div/table[2]/tbody/tr/td[5]'
			];
		var owned_armor_list = x_try(xpath, 'item owned armors');
		var armors_range = owned_armor_list.length;
		
		xpath = [
			'/html/body/div/div[5]/div/table[3]/tbody/tr/td[5]'
			];
		var owned_vehicle_list = x_try(xpath, 'item owned vehicles');
		var vehicles_range = owned_vehicle_list.length;
		
		var weapon_cnt = 0, armor_cnt = 0, vehicle_cnt = 0;
		
		/* weapon distribution */
		var stripword = "Owned:";
		var family = current_mob+1; // current_mob + yourself

		/* owned item db */
		const ITEM_NAME_STRIP01 = "http://server.140mafia.com/img/mafia/items/";
		// item name Weapon
		xpath = [
			'/html/body/div/div[5]/div/table[1]/tbody/tr/td[1]/img'
			];
		var weapon_name = x_try(xpath, 'weapon name');
		
		// item name Armor
		xpath = [
			'/html/body/div/div[5]/div/table[2]/tbody/tr/td[1]/img'
			];
		var armor_name = x_try(xpath, 'armor name');
		
		// item name Vehicle
		xpath = [
			'/html/body/div/div[5]/div/table[3]/tbody/tr/td[1]/img'
			];
		var vehicle_name = x_try(xpath, 'vehicle name');
		
		
		
		/* item */
		for(var i in item_price_list){
			
			// ----------
			// price
			// ----------
			var item_price_span = item_price_list[i];
			var item_price = cash.decomma(item_price_span.textContent, 'item price values');

			// ----------
			// attack
			// ----------
			var item_atk_td = item_atk_list[i];
			var item_atk = Number(item_atk_td.textContent.replace(' Attack',''));
			var item_atk_rate = '0';
			if(item_atk>=1) item_atk_rate = String(item_price/item_atk);
			item_atk_rate = cash.getIntegerStr(item_atk_rate, 'item attack rate');
			item_atk_td.appendChild(cE('br'));
			var atk_rate_span = cE('span', {class:'TQad8unv_item_atkrate'});
			atk_rate_span.appendChild(cT(cash.comma(item_atk_rate,null,'item attack rate')));
			item_atk_td.appendChild(atk_rate_span);
			
			// ----------
			// deffense
			// ----------
			var item_def_td = item_def_list[i];
			var item_def = Number(item_def_td.textContent.replace(' Defense',''));
			var item_def_rate = '0'
			if(item_def>=1) item_def_rate = String(item_price/item_def);
			item_def_rate = cash.getIntegerStr(item_def_rate, 'item deffense rate');
			item_def_td.appendChild(cE('br'));
			var def_rate_span = cE('span', {class:'TQad8unv_item_defrate'});
			def_rate_span.appendChild(cT(cash.comma(item_def_rate,null,'item deffense rate')));
			item_def_td.appendChild(def_rate_span);
			

			// ----------
			// balance check
			// ----------
			if(current_cash < item_price){
				item_price_span.setAttribute('class','TQad8unv_cash_notenough');
			}
			
			
//		}
//		for(var i in item_price_list){
			
			if(i<weapons_range){
				// ----------
				// count owned weapons
				// ----------
				var idx = i;
				
				var owned_td = owned_weapon_list[idx].textContent;
				// Owned:[X]
				var owned_cnt = owned_td.substring(owned_td.lastIndexOf(stripword)+stripword.length).trim();
				log.debug('[waepon('+idx+')]:'+owned_cnt);
				var item_name = (weapon_name[idx].src).replace(ITEM_NAME_STRIP01,'');
				item_name = item_name.substring(0, item_name.lastIndexOf('.'));
				_g_owned_item_db[item_name]=owned_cnt;
				
				weapon_cnt += Number(owned_cnt);
				
				if(idx==weapons_range-1){
					var total_cnt = cT('TOTAL: '+weapon_cnt);
					var div_total = cE('div',{class:'TQad8unv_item_count_total'});
					div_total.appendChild(total_cnt);
					owned_weapon_list[idx].appendChild(div_total);
					
					var req_cnt = family-weapon_cnt;
					if(req_cnt>0){
						var div_req = cE('div',{class:'TQad8unv_item_count_reqire'});
						div_req.appendChild(cT(req_cnt));
						owned_weapon_list[idx].appendChild(div_req);
					}else{
						var div_req = cE('div',{class:'TQad8unv_item_count_enough'});
						div_req.appendChild(cT(family));
						owned_weapon_list[idx].appendChild(div_req);
					}
				}
				
			}
			else if(i < (armors_range + weapons_range)){
				// ----------
				// count owned armors
				// ----------
				var idx = i-weapons_range;
				
				var owned_td = owned_armor_list[idx].textContent;
				var owned_cnt = owned_td.substring(owned_td.lastIndexOf(stripword)+stripword.length).trim();
				log.debug('[armor('+idx+')]:'+owned_cnt);
				var item_name = (armor_name[idx].src).replace(ITEM_NAME_STRIP01,'');
				item_name = item_name.substring(0, item_name.lastIndexOf('.'));
				_g_owned_item_db[item_name]=owned_cnt;
				
				armor_cnt += Number(owned_cnt);
				if(idx == (armors_range-1)){
					var total_cnt = cT('TOTAL: '+armor_cnt);
					var div_total = cE('div',{class:'TQad8unv_item_count_total'});
					div_total.appendChild(total_cnt);
					owned_armor_list[idx].appendChild(div_total);
					
					var req_cnt = family-armor_cnt;
					if(req_cnt>0){
						var div_req = cE('div',{class:'TQad8unv_item_count_reqire'});
						div_req.appendChild(cT(req_cnt));
						owned_armor_list[idx].appendChild(div_req);
					}else{
						var div_req = cE('div',{class:'TQad8unv_item_count_enough'});
						div_req.appendChild(cT(family));
						owned_armor_list[idx].appendChild(div_req);
					}
				}
				
			}
			else if(i < (vehicles_range + armors_range + weapons_range)){
				// ----------
				// count owned vehicles
				// ----------
				var idx = i-weapons_range-armors_range;
				
				var owned_td = owned_vehicle_list[idx].textContent;
				var owned_cnt = owned_td.substring(owned_td.lastIndexOf(stripword)+stripword.length).trim();
				log.debug('[vehicle('+idx+')]:'+owned_cnt);
				var item_name = (vehicle_name[idx].src).replace(ITEM_NAME_STRIP01,'');
				item_name = item_name.substring(0, item_name.lastIndexOf('.'));
				_g_owned_item_db[item_name]=owned_cnt;
				
				vehicle_cnt += Number(owned_cnt);
				if(idx == ( vehicles_range-1)){
					var total_cnt = cT('TOTAL: '+vehicle_cnt);
					var div_total = cE('div',{class:'TQad8unv_item_count_total'});
					div_total.appendChild(total_cnt);
					owned_vehicle_list[idx].appendChild(div_total);
					
					var req_cnt = family-vehicle_cnt;
					if(req_cnt>0){
						var div_req = cE('div',{class:'TQad8unv_item_count_reqire'});
						div_req.appendChild(cT(req_cnt));
						owned_vehicle_list[idx].appendChild(div_req);
					}else{
						var div_req = cE('div',{class:'TQad8unv_item_count_enough'});
						div_req.appendChild(cT(family));
						owned_vehicle_list[idx].appendChild(div_req);
					}
				}
				
			}
			// ------------
			// How much can you buy it?
			// ------------
			var item_price_span = item_price_list[i];
			var crrbank_amount = cash.comma((current_cash+bank_cash)/item_price,null,'buyable with current+bank');
			var current_amount = cash.comma((current_cash)/item_price, null, 'buyable with current');
			var can_buy_div = cE('div',{class:'TQad8unv_item_canbuy'});
			can_buy_div.appendChild(cT(current_amount+'('+crrbank_amount+')'));
			item_price_span.parentNode.appendChild(can_buy_div);
		}
		
		GM_setValue('owned_item_obj',_g_owned_item_db.toSource());
		
		log.debug(weapon_cnt+' / '+armor_cnt+' / '+vehicle_cnt);
		
	}	
	else if(PAGE.match('profile') || PAGE.match('train')){
		// ---------------
		// fix document title
		// ---------------
		xpath = [
			'/html/body/div/div[5]/div/h1'
			];
		var _prof_name = x_zero_try(xpath,'fix document title').textContent;
		log.info('[name]:'+_prof_name);
		document.title = '[140Mafia]'+_prof_name;
		
		// ---------------
		// fix direct_link on comment
		// ---------------
		xpath = [
			'/html/body/div/div/div/div/div[@class="story"]/p'
			];
		var comments = x_try(xpath,'fix direct link');
		log.info('[comments.len]:'+comments.length);
		
		const dummy_len = 'http://140mafia.com/invite/direct_link?uid=0000000000'.length;
		const MAX_REPLACE = 20;
		
		for(var i in comments){
			log.group("[comment-orig]: "+i); // COMMENT
			
			var comment_obj = comments[i];
			var comment = comment_obj.textContent;
			
			if(comment.match(/direct_link/)){
				var links = [];
				
				var cnt = 0;
				while(comment.match(/direct_link/)){
					var prefix = comment.substring(0,comment.indexOf('http'));
					var suffix = comment.substring(comment.indexOf('http'), comment.indexOf('http')+dummy_len).trim();
					links.push( prefix );log.debug('[prefix]:'+prefix);
					links.push( suffix );log.debug('[suffix]:'+suffix);
					comment = comment.substring(prefix.length+dummy_len);
					log.debug('[comment-fix '+cnt+' ]: '+comment);
					cnt++;
					if(cnt>MAX_REPLACE){
						log.warn('comment replace count is over !');
						break;
					}
				}
				log.info('cnt:'+cnt);
				
				var parent = comment_obj.parentNode;
				parent.replaceChild(cE('SPAN'), comment_obj);
				
				for(var j in links){
					log.debug('[links '+i+' ]:'+links[j]);
					if(String(links[j]).indexOf('http')==0){
						var a = cE('A', {href:links[j], class:'TQad8unv_prof_link'});
						a.appendChild(cT(links[j]));
						parent.appendChild(a);
					}else{
						parent.appendChild(cT(links[j]));
					}
				}
				
				parent.appendChild(cE('hr'));
				var span = cE('span',{class:'TQad8unv_prof_origcomment'});
				span.appendChild(cT(comments[i].textContent));
				parent.appendChild(span);
			}else{
				log.debug(comments[i].textContent);
			}
			
			log.groupEnd(); // COMMENT END
		}
		
		// ---------------
		// protect brother
		// ---------------
		xpath = [
			'/html/body/div/div[5]/div/h1/img[@class="icon"]'
			];
		var brother = x_zero_try(xpath,'protect brother')!=null?true:false;
		log.debug('[isBrother]'+brother);
		if(brother){
			x_zero('//*[@id="fight"]').setAttribute('disabled','disabled');
			x_zero('//*[@id="punch"]').setAttribute('disabled','disabled');
			x_zero('//*[@id="mark"]').setAttribute('disabled','disabled');
		}
		
		
	}
	else if(PAGE.match('bank')){
		xpath = [
			'/html/body/div/div[5]/div/p/span'
			];
		var _bank_cash_obj = x_zero_try(xpath, 'bank_cash');
		var _bank_cash = cash.decomma(
			_bank_cash_obj.textContent, 
			'get bank cash');
		log.info('[bank cash]:'+_bank_cash);
		GM_setValue('bank_cash',_bank_cash);
		log.dummy();
		log.dummy();
		log.dummy();
		log.dummy();
		log.dummy();
	}
	else {
		log.info('url unmatch!');
	}
	
	
	
	log.groupEnd(); // PAGE PATTERN END
	
	/* ====================== *
	 * GLOBAL PATTERN
	 * ====================== */
	log.group('GLOBAL PATTERN');
	
	// current cash
	// ----------------------
	log.group('global cash');
	
	xpath = [
		'/html/body/div/div[3]/table/tbody/tr/td/span[@class="money"]'
		];
	var _g_cash_obj = x_zero_try(xpath,'current cash');
	var _g_current_cash = cash.decomma(_g_cash_obj.textContent,'get current cash');
	log.info('[current_cash]:'+_g_current_cash);
	GM_setValue('current_cash',_g_current_cash);
	
	log.groupEnd();
	
	// require exp (next level)
	// with ReWRITE
	// ----------------------
	if(isSimpleExp){
		log.group('global exp');
		
		xpath = [
			'/html/body/div/div[3]/table/tbody/tr/td[5]'
			];
		var _g_exp_obj = x_zero_try(xpath,'require exp');
		var _g_exp = _g_exp_obj.textContent.trim().replace('Experience','');
		var _g__exp = _g_exp.split('/');
		const EXP_CUR=0,EXP_NXT=1;
		var _g_exp = Number(_g__exp[EXP_NXT])-Number(_g__exp[EXP_CUR]);
		log.debug('EXP_NEXT:'+_g__exp[EXP_NXT]);
		log.debug('EXP_CUR :'+_g__exp[EXP_CUR]);
		var _g_exp_inner = _g_exp_obj.innerHTML;
		log.debug('inner:'+_g_exp_inner);
		var _g_exp_title = _g_exp_inner.substring(0, _g_exp_inner.lastIndexOf('<br>'));
		log.debug('title:'+_g_exp_title);
		_g_exp_obj.innerHTML = _g_exp_title+'<br/>'+_g_exp;
		log.info('[next exp]:'+_g_exp);
		
		log.groupEnd();
	}
	
	// current level
	// ----------------------
	log.group('global level');
	
	xpath = [
		'/html/body/div/div[3]/table/tbody/tr/td[6]'
		];
	var _g_lvl_obj = x_zero_try(xpath,'current_lvl');
	var _g_lvl = Number(_g_lvl_obj.textContent.trim().replace('Level',''));
	log.info('[current_lvl]:'+_g_lvl);
	GM_setValue('current_lvl',_g_lvl);
	
	log.groupEnd();
	
	// current mob
	// ----------------------
	log.group('global mob');
	
	xpath = [
		'/html/body/div/div[2]/table/tbody/tr/td[2]/a[4]'
		];
	var _g_mob_obj = x_zero_try(xpath,'current_mob');
	var _g_mob = Number(_g_mob_obj.textContent.replace(/[a-zA-Z\(\)]/g,'').trim());
	log.info('[current_mob]:'+_g_mob);
	GM_setValue('current_mob',_g_mob);
	
	log.groupEnd();
	
	// append bank cash
	// ----------------------
	log.group('global bank');
	
	xpath = [
		'/html/body/div/div[3]/table/tbody/tr/td[6]'
		];
	var _g_bank_insert_td = x_zero_try(xpath,'bank_cash');
	var _g_bank = GM_getValue('bank_cash',0);
	log.info('[bank cash]:'+_g_bank);
	var _g_bank_UI = 'access your bank';
	if(_g_bank > 0){
		_g_bank_UI = '$'+cash.comma(_g_bank, null, 'get bank cash');
	}
	log.debug('bank UI:'+_g_bank_UI);
	var _g_bank_insert_div = cE('div',{class:'TQad8unv_bank_cash'});
	var _g_bank_insert_link = cE('a',
		{
			title:'access to update',
			href:'/bank',
			class:'TQad8unv_bank_cash_link'
		});
	_g_bank_insert_link.appendChild(cT(_g_bank_UI));
	_g_bank_insert_div.appendChild(_g_bank_insert_link);
	_g_bank_insert_td.appendChild(_g_bank_insert_div);
	
	log.groupEnd();
	
	{
		/* test */
		log.group('global test');
		for(var i in gm_init_values){
			log.info('[GMget '+i+']:'+GM_getValue(i,0));
		}
		log.groupEnd();
	}
	
	log.groupEnd();
	
	/* --------------------------------- link ------------------------------- */
	if(IS_SHOWING_USORG_LINK){
		var end_div = x_zero('//*[@id="main"]'); // out put place 1
		end_div.appendChild(cE('hr'));
		var script_link = cE('a', {
					href : 'http://userscripts.org/scripts/show/59777'
				});
		end_div.appendChild(script_link);
		script_link.appendChild(
			cT('GM:140mafia_profile')
			);
	}

	log.info('< LOG END >');
	/* --------------------------------- libs ------------------------------- */
	/**
	 * get nodes array from xpath.
	 * 
	 * @argument _xpath String
	 * @return nodesArray Array
	 */
	function x(_xpath,msg) {
		var nodes = document.evaluate(_xpath, document, null,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var nodesArray = [];
		for(var i=0;i<nodes.snapshotLength;i++){
			nodesArray.push(nodes.snapshotItem(i));
		}
		if(nodesArray.length<1){
			if(DEBUG)log.warn(msg+":node array is NULL.");
		}
		return (nodesArray.length>=1)?nodesArray:null;
	}
	
	/**
	* get first node from xpath.
	* 
	* @argument _xpath String
	* @return node Object
	*/
	function x_zero(_xpath,msg) {
		var nodes = x(_xpath,msg);
		return nodes!=null?nodes[0]:null;
	}
	
	/**
	 * try multiple xpath
	 * @argument xpath_array Array
	 * @argument msg String
	 * @return node Object
	 */
	function x_try(xpath_array,msg){
		var ret = [];
		for(var i in xpath_array){
			var nodes = x(xpath_array[i],msg);
			if(nodes!=null){
				for(var j in nodes){
					ret.push(nodes[j]);
				}
			}
		}
		return ret;
	}
	
	function x_zero_try(xpath_array,msg){
		var nodes = x_try(xpath_array,msg);
		return nodes!=null?nodes[0]:null;
	}
	
	/**
	 * Cash decoration class
	 */
	function Cash(){
		/** append comma only. */
		this.comma = function(value,digit,_msg){
			var msg = _msg!=null?_msg:'';
			
			if(DEBUG)log.group('Cash.comma('+msg+')');
			var ret = Math.abs(value);
			var deco_str = ret.toString();
			const PADDING = 'P';
			const C_DIGIT = 3;
			
			var decpoint = 0;
			if(deco_str.indexOf('.')>0){
				log.debug('[input value is DECIMAL]');
				log.debug('decoration before:'+deco_str);
				// to Integer ( XXXX.000 )
				deco_str = deco_str.substring(0,deco_str.indexOf('.'));
				log.debug('integer:'+deco_str);
				// decpoint ( 0.XXXX )
				decpoint = String(ret);
				decpoint = decpoint.substring(decpoint.indexOf('.')+1);
				log.debug('float:'+decpoint);
			}
			
			if (deco_str.toString().length % 3 > 0) {
				var insert_idx = deco_str.length % 3;
				var append = 0;
				if (insert_idx > 0) append = 3 - insert_idx;
				for (var i = 0; i < append; i++) {
					deco_str = PADDING + deco_str;
				}
				log.debug('decoration padding:'+deco_str);
			}
			
			var concarr = [];
			for (var i = 0; i < deco_str.length / C_DIGIT; i++) {
				concarr[i] = deco_str.substring((i) * C_DIGIT, (i + 1) * C_DIGIT);
			}
			var regexp = new RegExp('['+PADDING+']+','g');
//			log.dir(concarr);
			deco_str = concarr.join(',').replace(regexp, '');
			log.debug('decoration after:'+deco_str);
	
			if(value<0){
				deco_str = '-'+deco_str;
			}
			
			if(digit!=null && decpoint.length>0){
				decpoint = decpoint.substring(0, (digit));
				deco_str += "."+decpoint;
				log.debug('float digit:'+digit);
			}
			ret = deco_str;
			log.debug('decoration completed:'+ret);
			
			if(DEBUG)log.groupEnd();
			return ret;
		};
		
		/** remove comma and currency. */
		this.decomma = function(str,_msg){
			var msg = _msg!=null?_msg:'';
			if(DEBUG)log.group('Cash.decomma('+msg+')');
			var ret = Number(str.replace('$','').replace(/,/g,'').trim());
			if(DEBUG)log.groupEnd();
			return ret;
		};
		
		/** remove decimal point */
		this.getIntegerStr = function(str,_msg){
			var msg = _msg!=null?_msg:'';
			var ret = str;
			if(str.indexOf('.')>0){
				if(DEBUG)log.group('Cash.getInteger('+msg+')');
				ret = str.substring(0, str.lastIndexOf('.'));
				if(DEBUG)log.groupEnd();
			}
			return ret;
		}
	};
	
	/**
	 * append trim function looks like PHP<br>
	 * to String(native) object.
	 */
	String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$$/g, '');
	}
	
	/**
	 * GreaseMonkey menu toggle
	 * @argument key boolean_key
	 * @argument defaultValue default_value
	 * @argument toggleOn on_string
	 * @argument toggleOff off_string
	 * @argument prefix ui_prefix
	 */
	function makeMenuToggle(key, defaultValue, toggleOn, toggleOff, prefix) {
	  // Load current value into variable
	  window[key] = GM_getValue(key, defaultValue);
	  // Add menu toggle
	  GM_registerMenuCommand((prefix ? prefix+": " : "") + (window[key] ? toggleOff : toggleOn), function() {
	    GM_setValue(key, !window[key]);
	    location.reload();
	  });
	}
	
	// ========== add from snippet ================
	function cE(name, array) {
		var d = document.createElement(name);
		for (var i in array) {
			d.setAttribute(i, array[i]);
		}
		return d;
	}

	// ========== add from snippet ================
	function cT(value){
		var d = document.createTextNode(value);
		return d;
	}
	
	function cDivTip(_arg_array){
		var word = {
			HINT:{
				mark:'[ # ]'
			},
			QUESTION:{
				mark:'( ? )'
			},
			CAUTION:{
				mark:'< ! >'
			},
			WARN:{
				mark:'{ x }'
			}
		};
		var lng = GM_getValue('user_lng','en');
		
		var type = _arg_array['type'];
		var text_array = _arg_array['msg'][lng];
		
		var note_div = cE('div', {class:'TQad8unv_note_'+type});
		var note_tipicon = cE('span',{class:'TQad8unv_tipicon'});
		note_tipicon.appendChild(cT(word[type]['mark']));
		note_div.appendChild(note_tipicon);
		note_div.appendChild(cE('br'));
		
		for(var i in text_array){
			if(text_array[i]=='<br>'){
				note_div.appendChild(cE('br'));
			}else{
				note_div.appendChild(cT(text_array[i]));
			}
		}
		log.debug('[view note]:"'+word[type]['mark']);
		return note_div;
	}

})();