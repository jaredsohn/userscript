// ==UserScript==
// @name           TC Slut
// @description    Morphing out
// @namespace      http://userscripts.org/users/65879
// @include        http://www.torncity.com/item.ph*
// @include        http://torncity.com/item.ph*
// @include        http://www.torn.com/item.ph*
// @include        http://torn.com/item.ph*
// @include        http://www.torncity.com/usemedical.ph*
// @include        http://torncity.com/usemedical.ph*
// @include        http://www.torn.com/usemedical.ph*
// @include        http://torn.com/usemedical.ph*
// ==/UserScript==

var $cronId = 0;
var $slut_mode = GM_getValue('slut_mode', 0);
var $slut_min_refresh = GM_getValue('slut_min_refresh', 20000);
var $slut_max_refresh = GM_getValue('slut_max_refresh', 60000);
var $slut_min_morphing = GM_getValue('slut_min_morphing', 1000);
var $slut_max_morphing = GM_getValue('slut_max_morphing', 4000);
var $slut_cron_time = GM_getValue('slut_cron_time', 100);
var $slut_dead_line = GM_getValue('slut_dead_line', '-');
var $slut_timeout = GM_getValue('slut_timeout', 7200000);
var $slut_use_s = GM_getValue('slut_use_s', 1);
var $slut_use_f = GM_getValue('slut_use_f', 1);
var $slut_use_m = GM_getValue('slut_use_m', 1);
var $slut_refresh_mode = 0;
var $slut_morph_mode = 0;
var $slut_return_mode = 0;
var $refresh_time = 0;
var $usemedical_url = '';
var $die = 0;

function TCSlut() {
	//this.slut_min_morphing = GM_getValue('slut_min_morphing', 1000);
	//this.slut_max_morphing = GM_getValue('slut_max_morphing', 3000);
	
	this.init = function () {
		// reset dedline if not selected
		if($slut_dead_line == '-') {
			this.setDeadline();
		}

		link = document.location.toString();
		if (link.match("item.php")) {
			// if items page draw config box and refreshing page
			this.drawBox();
			$refresh_time = this.rnd($slut_min_refresh, $slut_max_refresh);
			this.cronMode();
		} else {
			// if used med page wait and redirect to items page
			this.drawBox();
			$slut_return_mode = 1;
			$refresh_time = this.rnd($slut_min_morphing, $slut_max_morphing);
			this.cronMode();
		}
	}
	
	this.backToItems = function () {
		document.location = "item.php";
	}
	
	this.drawBox = function () {
		var frag = document.createDocumentFragment();

		var box_div = document.createElement('div');
		box_div.setAttribute('id', 'box_div');
		box_div.setAttribute('style', 'position: absolute; top: 8px; left: 43px; border: 1px solid #000000; background: #dfdfdf; padding:5px; font-size:12px;');

		var box_table = document.createElement('table');
		box_div.appendChild(box_table);

		var box_style = document.createElement('style');
		box_style.innerHTML = '.unit{float:left; padding: 2px 0px 0px 2px} .tcs-show{dispay:block} .tcs-hide{display:none} .fl{float:left} .clear{clear:both;height:2px} .ww{width: 130px; padding-top:2px} .tcs-inp{width: 40px; height: 18px; fontsize: 11px;}';
		box_div.appendChild(box_style);

		//box_span.setAttribute('id', 'box_span');

		var box_tr = document.createElement('tr');
		box_table.appendChild(box_tr);

		var box_td1 = document.createElement('td');
		box_td1.setAttribute('style', 'font-size:12px;');
		box_tr.appendChild(box_td1);

		var box_td2 = document.createElement('td');
		box_tr.appendChild(box_td2);

		var box_td3 = document.createElement('td');
		box_tr.appendChild(box_td3);

		var box_td4 = document.createElement('td');
		box_td4.setAttribute('style', 'font-size:12px;');
		box_td4.innerHTML = "|";
		box_tr.appendChild(box_td4);

		var box_td5 = document.createElement('td');
		box_td5.setAttribute('style', 'font-size:12px;');
		box_tr.appendChild(box_td5);

		var box_td6 = document.createElement('td');
		box_td6.setAttribute('style', 'font-size:12px;');
		box_tr.appendChild(box_td6);

		var box_label = document.createElement('label');
		box_label.setAttribute("for", "box_ch");
		box_label.innerHTML = "Slutting mode";
		box_td1.appendChild(box_label);

		var box_cb = document.createElement("input"); // create input node
		box_cb.type = "checkbox"; // set type
		box_cb.id = "box_ch";
		box_cb.checked = box_cb.defaultChecked = false; // make it checked now and by default
		box_td2.appendChild(box_cb);

		var box_span = document.createElement('span');
		box_span.setAttribute('id', 'box_span');
		box_span.setAttribute('style', 'font-size: 12px;');
		box_span.innerHTML = "00.0";
		box_td3.appendChild(box_span);

		var box_span2 = document.createElement('span');
		box_span2.setAttribute('id', 'box_span2');
		box_span2.setAttribute('style', 'font-size: 12px;');
		box_span2.innerHTML = "00.0";
		box_td5.appendChild(box_span2);

		var options_button = document.createElement('div');
		options_button.innerHTML = "▼";
		options_button.setAttribute('style', 'cursor: pointer');
		options_button.setAttribute('id', 'option_button');
		box_td6.appendChild(options_button);

		var box_tr2 = document.createElement('tr');
		box_tr2.setAttribute('id', 'opt_tr');
		box_tr2.setAttribute('class', 'tcs-hide');
		box_table.appendChild(box_tr2);

		var box_tdb1 = document.createElement('td');
		box_tdb1.setAttribute('colspan', '6');
		box_tdb1.setAttribute('style', 'font-size:12px; border-top:1px solid black; padding-top:4px;');
		box_tr2.appendChild(box_tdb1);

		var opt_div1 = document.createElement('div');
		opt_div1.setAttribute('class', 'fl ww');
		opt_div1.innerHTML = 'min refresh time';
		box_tdb1.appendChild(opt_div1);
		var opt_inp1 = document.createElement('input');
		opt_inp1.setAttribute ('class', 'tcs-inp fl');
		opt_inp1.setAttribute ('id', 'slut_min_refresh');
		opt_inp1.value = $slut_min_refresh / 1000;
		box_tdb1.appendChild(opt_inp1);
		var opt_div1b = document.createElement('div');
		opt_div1b.setAttribute('class', 'unit');
		opt_div1b.innerHTML = 's';
		box_tdb1.appendChild(opt_div1b);
		var opt_div1b_cc = document.createElement('div');
		opt_div1b_cc.setAttribute('class', 'clear');
		box_tdb1.appendChild(opt_div1b_cc);

		var opt_div2 = document.createElement('div');
		opt_div2.setAttribute('class', 'fl ww');
		opt_div2.innerHTML = 'max refresh time';
		box_tdb1.appendChild(opt_div2);
		var opt_inp1 = document.createElement('input');
		opt_inp1.setAttribute ('class', 'tcs-inp fl');
		opt_inp1.setAttribute ('id', 'slut_max_refresh');
		opt_inp1.value = $slut_max_refresh / 1000;
		box_tdb1.appendChild(opt_inp1);
		var opt_div2b = document.createElement('div');
		opt_div2b.setAttribute('class', 'unit');
		opt_div2b.innerHTML = 's';
		box_tdb1.appendChild(opt_div2b);
		var opt_div2b_cc = document.createElement('div');
		opt_div2b_cc.setAttribute('class', 'clear');
		box_tdb1.appendChild(opt_div2b_cc);

		var opt_div3 = document.createElement('div');
		opt_div3.setAttribute('class', 'fl ww');
		opt_div3.innerHTML = 'min morphing time';
		box_tdb1.appendChild(opt_div3);
		var opt_inp1 = document.createElement('input');
		opt_inp1.setAttribute ('class', 'tcs-inp fl');
		opt_inp1.setAttribute ('id', 'slut_min_morphing');
		opt_inp1.value = $slut_min_morphing / 1000;
		box_tdb1.appendChild(opt_inp1);
		var opt_div3b = document.createElement('div');
		opt_div3b.setAttribute('class', 'unit');
		opt_div3b.innerHTML = 's';
		box_tdb1.appendChild(opt_div3b);
		var opt_div3b_cc = document.createElement('div');
		opt_div3b_cc.setAttribute('class', 'clear');
		box_tdb1.appendChild(opt_div3b_cc);

		var opt_div4 = document.createElement('div');
		opt_div4.setAttribute('class', 'fl ww');
		opt_div4.innerHTML = 'max morphing time';
		box_tdb1.appendChild(opt_div4);
		var opt_inp1 = document.createElement('input');
		opt_inp1.setAttribute ('class', 'tcs-inp fl');
		opt_inp1.setAttribute ('id', 'slut_max_morphing');
		opt_inp1.value = $slut_max_morphing / 1000;
		box_tdb1.appendChild(opt_inp1);
		var opt_div4b = document.createElement('div');
		opt_div4b.setAttribute('class', 'unit');
		opt_div4b.innerHTML = 's';
		box_tdb1.appendChild(opt_div4b);
		var opt_div4b_cc = document.createElement('div');
		opt_div4b_cc.setAttribute('class', 'clear');
		box_tdb1.appendChild(opt_div4b_cc);

		var opt_div5 = document.createElement('div');
		opt_div5.setAttribute('class', 'fl ww');
		opt_div5.innerHTML = 'timeout';
		box_tdb1.appendChild(opt_div5);
		var opt_inp1 = document.createElement('input');
		opt_inp1.setAttribute ('class', 'tcs-inp fl');
		opt_inp1.setAttribute ('id', 'slut_timeout');
		opt_inp1.value = $slut_timeout / 3600000;
		box_tdb1.appendChild(opt_inp1);
		var opt_div5b = document.createElement('div');
		opt_div5b.setAttribute('class', 'unit');
		opt_div5b.innerHTML = 'h';
		box_tdb1.appendChild(opt_div5b);
		var opt_div5b_cc = document.createElement('div');
		opt_div5b_cc.setAttribute('class', 'clear');
		box_tdb1.appendChild(opt_div5b_cc);

		var opt_div6 = document.createElement('div');
		opt_div6.setAttribute('class', 'fl ww');
		opt_div6.innerHTML = 'update';
		box_tdb1.appendChild(opt_div6);
		var option_update = document.createElement('input');
		option_update.setAttribute ('type', 'button');
		option_update.setAttribute ('class', 'tcs-inp');
		option_update.setAttribute ('id', 'option_update');
		option_update.value = 'up';
		box_tdb1.appendChild(option_update);


		frag.appendChild(box_div);

		document.body.appendChild(frag);

		document.getElementById('box_ch').addEventListener('click', this.boxClick, true);
		document.getElementById('option_button').addEventListener('click', this.showOptions, true);
		document.getElementById('option_update').addEventListener('click', this.updateOptions, true);

		if ($slut_mode) {
			document.getElementById('box_ch').checked = true;
		} else {
			document.getElementById('box_ch').checked = false;
		}
		
	}

	this.cronMode = function () {
		$cronId++;
		//console.log("slut mode:" + $slut_mode + " morph mode:" + $slut_morph_mode + " count_down:" + $refresh_time);
		if($slut_mode && !$slut_refresh_mode && !$slut_return_mode) {
			slut.checkHospital();
		}
		if($slut_refresh_mode && $slut_mode || $slut_morph_mode && $slut_mode || $slut_return_mode && $slut_mode) {
			$d2 = new Date();
			document.getElementById('box_span2').innerHTML = slut.formatTime($slut_dead_line - $d2.getTime(), true);
			if ($slut_dead_line - $d2.getTime() < 0) {
				$slut_mode = 0;
				$refresh_time = 0;
				document.getElementById('box_ch').checked = false;
				GM_setValue('slut_mode', 0);
			}
			$refresh_time = $refresh_time - $slut_cron_time;
			document.getElementById('box_span').innerHTML = slut.formatTime($refresh_time, false);
			if($slut_refresh_mode) {
				document.getElementById('box_span').setAttribute("style", "color: #000099; font-size: 12px; font-weight: bold;");
			}
			if($slut_morph_mode) {
				document.getElementById('box_span').setAttribute("style", "color: #009900; font-size: 12px; font-weight: bold;");
			}
		}
		if($refresh_time <= 0 && $slut_refresh_mode){
			$die = 1;
			slut.refreshPage();
		}
		if($refresh_time <= 0 && $slut_morph_mode){
			$die = 1;
			slut.useMedical();
		}
		if($refresh_time <= 0 && $slut_return_mode){
			$die = 1;
			slut.backToItems();
		}
		if(!$die) {
			window.setTimeout(slut.cronMode, $slut_cron_time);
		}
	}
	
	this.showOptions = function () {
		opt_div = document.getElementById('opt_tr');
		if(opt_div.className == 'tcs-hide') {
			opt_div.className = 'tcs-show';
		} else {
			opt_div.className = 'tcs-hide';
		}
	}

	this.updateOptions = function () {
		inp_min_refresh = parseInt(document.getElementById('slut_min_refresh').value);
		console.log(inp_min_refresh);
		inp_max_refresh = parseInt(document.getElementById('slut_max_refresh').value);
		inp_min_morphing = parseInt(document.getElementById('slut_min_morphing').value);
		inp_max_morphing = parseInt(document.getElementById('slut_max_morphing').value);
		inp_timeout = parseInt(document.getElementById('slut_timeout').value);
		
		if(inp_min_refresh >= 1 && inp_min_refresh <= 300) {
			$slut_min_refresh = inp_min_refresh * 1000;
			GM_setValue('slut_min_refresh', $slut_min_refresh);
		}
		
		if(inp_max_refresh >= 1 && inp_max_refresh <= 300) {
			$slut_max_refresh = inp_max_refresh * 1000;
			GM_setValue('slut_max_refresh', $slut_max_refresh);
		}
		
		if(inp_min_morphing >= 1 && inp_min_morphing <= 300) {
			$slut_min_morphing = inp_min_morphing * 1000;
			GM_setValue('slut_min_morphing', $slut_min_morphing);
		}
		
		if(inp_max_morphing >= 1 && inp_max_morphing <= 300) {
			$slut_max_morphing = inp_max_morphing * 1000;
			GM_setValue('slut_max_morphing', $slut_max_morphing);
		}
		
		if(inp_timeout >= 1 && inp_timeout <= 24) {
			$slut_timeout = inp_timeout * 3600000;
			GM_setValue('slut_timeout', $slut_timeout);
		}
		
		document.getElementById('opt_tr').className = 'tcs-hide';
	}

	this.boxClick = function () {
		if(document.getElementById('box_ch').checked) {
			GM_setValue('slut_mode', 1);
			$slut_mode = 1;
			$refresh_time = $slut_max_morphing;
			slut.setDeadline();
		} else {
		  GM_setValue('slut_mode', 0);
		  $slut_mode = 0;
		}
	}

	this.checkHospital = function () {
		if($slut_mode) {
			var allLinks, thisLink;
			allLinks = document.evaluate('//a[@href]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			use_med = 0;
			med_url = 0;
			use_s_url = ""; // small first aid kit
			use_f_url = ""; // first aid kit
			use_m_url = ""; // morphine
			for (var i = 0; i < allLinks.snapshotLength; i++) {
				thisLink = allLinks.snapshotItem(i);
				hrefas = thisLink.href;
				if (hrefas.match("/index.php") && thisLink.target == "_self" && thisLink.innerHTML == 'Hospital') {
					use_med = 1;
				}
				if (hrefas.match("/usemedical.php")) {
					thisLink.setAttribute("style", "color: #bb0000");
					if (thisLink.parentNode.firstChild.innerHTML.match("XID=66")) {
						use_m_url = thisLink.href;
					}
					if (thisLink.parentNode.firstChild.innerHTML.match("XID=67")) {
						use_f_url = thisLink.href;
					}
					if (thisLink.parentNode.firstChild.innerHTML.match("XID=68")) {
						use_s_url = thisLink.href;
					}
				}
			}
			// extension using only sfak | fak | morph and by the line
			if(use_m_url != "" && $slut_use_m) {
				$usemedical_url = use_m_url;
			}
			if(use_f_url != "" && $slut_use_f) {
				$usemedical_url = use_f_url;
			}
			if(use_s_url != "" && $slut_use_s) {
				$usemedical_url = use_s_url;
			}
			
			if (use_med == 1) {
				if($usemedical_url != "") {
					if (!$slut_morph_mode) {
						$refresh_time = this.rnd($slut_min_morphing, $slut_max_morphing);
					}
					$slut_morph_mode = 1;
				} else {
					$slut_mode = 0;
					document.getElementById('box_ch').checked = false;
					document.getElementById('box_span').innerHTML = "OUT OF MEDS";
					document.getElementById('box_span').setAttribute("style", "color: #bb0000; font-size: 12px; font-weight: bold;");
				}
			} else {
				$slut_refresh_mode = 1;
			}
		} 
	}
	
	this.setDeadline = function () {
		dd = new Date();
		$slut_dead_line = dd.getTime() + $slut_timeout;
		GM_setValue('slut_dead_line', $slut_dead_line.toString());
	}
	
	this.refreshPage = function () {
		document.location.reload(true);
	}
	
	this.useMedical = function (){
		document.location = $usemedical_url;
	}
	
	this.rnd = function (val_from, val_to) {
		return (Math.floor(Math.random() * (val_to - val_from + 1)) + val_from);
	}
	
	this.formatTime = function (val, mode) {
		if (mode) {
			new_val = (Math.ceil(val / 1000));
			str_val = new_val.toString();
			hh = Math.floor(new_val / 3600);
			hh_str = "00";
			if(hh > 0) {hh_str = "0" + hh;} 
			
			mm = Math.floor((new_val - (hh * 3600)) / 60);
			mm_str = "00";
			if(mm > 0){
				if(mm < 10){
					mm_str = "0" + mm;
				} else {
					mm_str = mm;
				}
			}
			
			ss = new_val - (hh * 3600) - (mm * 60);
			ss_str = "00";
			if(ss > 0){
				if(ss < 10){
					ss_str = "0" + ss;
				} else {
					ss_str = ss;
				}
			}
			
						
			hh_mm_ss = hh_str + ":" + mm_str + ":" + ss_str;
			return hh_mm_ss;
		} else {
			new_val = (Math.ceil(val / 100) / 10);
			str_val = new_val.toString();
			if (new_val == Math.ceil(new_val)) {str_val = str_val + '.0';}
			if (new_val < 10) {str_val = '0' + str_val;}
			if (new_val <= 0) {str_val = '00.0';}
		}
		return str_val;
	}
	
}

slut = new TCSlut();
slut.init();
