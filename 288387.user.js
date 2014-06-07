// ==UserScript==
// @name           Maknyos AutoIn
// @namespace      
// @include        http://*.sendspace.com/file/*
// @include        http://*.zippyshare.com/v/*
// @include        http://*.mediafire.com/download/*
// @include        http://*.2shared.com/*
// @include        http://*.taruhsini.com/*
// @include        http://*.subscene.com/subtitles/*
// @include        http://*.putlocker.com/file/*
// @include        http://*.fileswap.com/*
// @include        http://*.uptobox.com/*
// @include        /^https?://(|www\.)howfile.com/file/*/
// @include        /^https?://(|www\.)uppit.com/*/
// @include        /^https?://(|www\.)taruhsini.com/*/
// @include        /^https?://(|www\.)subscene.com/subtitles/*/
// @include        /^https?://(|www\.)inafile.com/*/
// @include        /^https?://(|www\.)filecloud.ws/*/
// @include        /^https?://(|www\.)idup.in/*/
// @include        /^https?://(|www\.)sharebeast.com/*/
// @include        /^https?://(|www\.)imzupload.com/*/
// @include        /^https?://(|www\.)bebasupload.com/*/
// @include        /^https?://(|www\.)jumbofiles.com/*/
// @include        /^https?://(|www\.)asixfiles.com/*/
// @include        /^https?://(|www\.)amshare.co/*/
// @include        /^https?://(|www\.)sendmyway.com/*/
// @version        2.0
// @description    Auto submit then get link on Maknyos/inafile/taruhsini
// @author         idx (http://userscripts.org/users/idx)
// ==/UserScript==
(function() {
	var gvar = function() {};
	gvar.__DEBUG__ = !1;
	function init() {
		gvar.wait_interval = false;
		gvar.loc = location.href;
		gvar.ctitle = getTitle();
		gvar.whereAmI = whereAmI();
		clog('whereAmI='+gvar.whereAmI);

		var pattern, tgt, nfoo, alink, el, kads;

		// healer (a*d*s)
		kads = rSRC.getHealer(gvar.whereAmI);
		kads && GM_addGlobalStyle(kads);
		switch(gvar.whereAmI) {
			case "jumbofiles":
				pattern = $D('//input[@class="btn2"]', null, 1);
				if(!pattern) {
					pattern = $D('.//input[@name="down_direct"]', null, 1);
					if(!pattern) {
						do_firstlevel()
					}else {
						do_secondjumbo()
					}
				}else {
					do_thirdjumbo()
				}
			break;

			case "zippyshare":
				$D("#dlbutton") && SimulateMouse($D("#dlbutton"), "click", true);
			break;

			case "sharebeast":
				nfoo = $D(".infoo");
				nfoo = "undefined" != typeof nfoo[0] ? nfoo[0] : null;
				if(nfoo) {
					tgt = $D('.//input[contains(@class,"download")]', nfoo, 1);
					tgt && SimulateMouse(tgt, "click", true)
				}
			break;

			case "sendspace":
				$D("#download_button") && SimulateMouse($D("#download_button"), "click", true);
			break;

                case "subscene":
				$D("#downloadButton") && SimulateMouse($D("#downloadButton"), "click", true);
			break;
                
                case "taruhsini":
				$D("#btn_download") && SimulateMouse($D("#btn_download"), "click", true);
			break;
                
			case "uppit":
				if( $D('#countdown',null,1) )
					waiting_upit();
				else{
					tgt = $D('//a[contains(@class,"m-btn") and contains(.,"ownl")]', null, 1);
					tgt && SimulateMouse(tgt, "click", true)
				}
			break;

			case "fileswap":
				el = $D('#share_index_dlslowbutton',null,1);
				el && setTimeout(function(){
					SimulateMouse(el, "click", true);
				}, 2222);
			break;

			case "uptobox":
				var formF1 = getByQS('form[name="F1"]');
				tgt = getByQS('input[name="method_free"]');
				tgt && (el = find_parent_byType(tgt, "FORM"));
				if( !formF1 && tgt ){
					tgt.setAttribute('name', 'foobar');
					var hEl = createEl('input', {name:"method_free", type:"hidden", value:"Free Download"});
					el.appendChild(hEl);
					el.submit();
				}
				else if( formF1 ){
					do_secondlevel();
				}
				else{
					do_thirdlevel()
				}
			break;

			case "putlocker":
				el = $D('#submitButton',null,1);
				el && (el = find_parent_byType(el, "FORM"));
				if( el ){
					el && setTimeout(function(){
						var hEl = createEl('input', {name:"confirm", type:"hidden"});
						el.appendChild(hEl);
						el.submit();
					}, 3212);
				}
				else{
					el = getByQS('.file_splash a:last-child');
					el && setTimeout(function(){
						location.href = location.protocol + '//' + location.hostname + el.getAttribute('href');
					}, 1222);
				}
			break;

			case "howfile":
				tgt = $D('#floatdiv',null,1);
				if( tgt ){
					el = getByQS('a[onclick*="setCookie"]:first-child', tgt);
					el && setTimeout(function(){
						alink = el.getAttribute('href');
						location.href = alink;
					}, 2222);
				}
			break;

			case "sendmyway":
				if( $D("#btn_download") )
					SimulateMouse($D("#btn_download"), "click", true);
				else
					do_thirdlevel()
			break;

			case "2shared":
				el = $D('.//a[contains(@href,"javascript:")]', $D("#fileinfo"), 1);
				el && SimulateMouse(el, "click", true);
			break;

			case "mediafire":
				if( $D('.captcha_box').length ){
					setTimeout(function(){
						$D('#recaptcha_response_field').length &&
							$D('#recaptcha_response_field').focus()
					}, 100);
				}
				else{
					tgt = $D('.download_link', null);
					if( tgt.length ){
						el = $D('.//a[@href and starts-with(text(), "Download")]', tgt[0], 1);
						alink = (el && el.getAttribute('href') ? el.getAttribute('href') : '');
						alink && window.setTimeout(function() {
							create_trans_iframe(alink);
						}, 1200);
					}
				}
			break;

			default:

				pattern = getByXPath_containing(".//h3", null, "Download Link Generated");
				if(pattern.length == 0) {
					pattern = getByXPath_containing(".//h3", null, "Download File");
					if(pattern.length == 0) {
						do_firstlevel()
					}else {
						do_secondlevel()
					}
				}else {
					do_thirdlevel()
				}
			break
		}
	}
	function whereAmI() {
		return location.hostname.replace(/^(?:www(?:\d+)?|)\./i, "").replace(/\.\w+$/i, "")
	}
	function idws_waitclick() {
		var ptimer = $D("#counter-seconds"), timer = $D('.//input[@name="dl2"]', ptimer, 1);
		var tgt = $D("#link-download"), title = "[%d] %t";
		title = title.replace(/(?:\%d)/, timer.value).replace(/(?:\%t)/, gvar.ctitle);
		if(timer && tgt.style.display == "none") {
			$D("//title", null, 1).innerHTML = title;
			gvar.wait_interval = window.setTimeout(function() {
				idws_waitclick()
			}, 1E3)
		}else {
			$D("//title", null, 1).innerHTML = gvar.ctitle;
			clearTimeout(gvar.wait_interval);
			ptimer.style.display = "none";
			if(tgt) {
				create_trans_iframe(tgt.href)
			}else {
				alert("Failed get download link")
			}
		}
	}
	function do_thirdlevel() {
		clog('inside, do_thirdlevel');

		var drlink = $D('//a[contains(@href, "' + (gvar.whereAmI == "maknyos" ? "maknyos.com/files/" : gvar.whereAmI == "imzupload" ? "imzupload.com/files/" : "/files/") + '")]', null);

		if( !drlink.snapshotLength ){
			clog('try another node #download');
			drlink = $D('//a[contains(@id,"download")]', null);
		}

		if( !drlink.snapshotLength ){
			clog('try another node span*dotted/a');
			drlink = $D('//span[contains(@style," dotted ")]/a[contains(@href,"'+gvar.whereAmI+'.")]', null);
		}
		
		if(drlink.snapshotLength > 0) {
			var title = $D(".//b", $D("//nobr", null, 1), 1);
			$D("//title", null, 1).innerHTML = ":Ready:-" + title.innerHTML;
			window.setTimeout(function() {
				create_trans_iframe(drlink.snapshotItem(0))
			}, 1500)
		}
	}
	function do_secondlevel() {
		clog('inside, do_secondlevel');

		var table, el, frm = $D('//form[@name="F1"]', null, 1);

		if( (table = $D('.//table[contains(@class,"file_slot")]', frm, 1)) || $D('#btn_download') ) {
			
			var img_capcay, pwd, title, tgt_input_capcay, capcay, timer, foo;
			timer = $D("#countdown_str");

			if( title = $D(".//b", frm, 1) ) 
				title.innerHTML = ":auto-aubmit-activated:"

			if( pwd = $D('.//input[@type="password"]', frm, 1) ) 
				gvar.ctitle = "[Password]? " + gvar.ctitle

			if( img_capcay = $D('.//img[contains(@src,"/captchas/")]', frm, 1) ) {
				img_capcay.setAttribute("style", "width:150px");
				if(timer && timer.style.display != "none") {
					if(pwd) {
						try {
							pwd.focus()
						}catch(e) {
						}
					}else {
						try {
							var inpc = $D(".captcha_code")[0];
							inpc.setAttribute("autocomplete", "off");
							inpc.focus()
						}catch(e) {
						}
					}
					gvar.wait_interval = window.setTimeout(function() {
						wait_then_click()
					}, 1E3)
				}else {
					// imzupload had this now
					capcay = $D('.captcha_code',null,1);
					capcay.length && (capcay = capcay[0]);
					if(capcay && !capcay.value){
						foo = $D('.tbl1', frm, 1);
						foo.length && (foo = foo[0]) && foo.setAttribute('style', 'display:none');
						
						window.setTimeout(function() { capcay.focus() }, 1E3);
						return;
					}

					download_now()
				}
			}
			else if( (capcay = fetch_capcay()) && (tgt_input_capcay = $D('.//input[@class="captcha_code"]', null, 1)) ){
				if( capcay && tgt_input_capcay ) {
					tgt_input_capcay.value = capcay;
					if(timer && timer.style.display != "none") {
						if(pwd) {
							try {
								pwd.focus()
							}catch(e) {}
						}
						gvar.wait_interval = window.setTimeout(function() {
							wait_then_click()
						}, 1E3)
					}else {
						download_now()
					}
				}
				else{
					alert('Something went wrong...');
				}
			}
			else if( el = $D('#btn_download', null, 1) ){
				download_now()
			}
			else{
				alert('Something went wrong [2]...');
			}
		}
		else {
			el = $D(".err");
			if( isDefined(el[0]) ) {
				var match = /wait\s(\d+)\s(\w+)/i.exec(el[0].innerHTML);
				if(match) {
					var wait = parseInt(match[1]);
					var unit = 1;
					if(match[2].indexOf("hour") != -1) {
						unit = unit * 60 * 60
					}else {
						if(match[2].indexOf("minut") != -1) {
							unit = unit * 60
						}
					}
					window.setTimeout(function() {
						clearTimeout(gvar.wait_interval);
						$D("#delayed").innerHTML = "0";
						location.href = gvar.loc
					}, (wait + 1) * 1E3 * unit);
					gvar.wait_interval = window.setTimeout(function() {
						wait_then_reload()
					}, 1E3);
					el[0].innerHTML += '<p><blink>waiting to reload...</blink> <span id="delayed">' + wait * unit + "</span> secs.</p>"
				}
			}
			else if($D("#recaptcha_response_field")){
				table = $D('.//table[contains(@class,"file_slot")]', frm, 1);
				window.scrollTo(0, findPos(table) - 40);
				$D("#recaptcha_response_field").focus();
			}
		}
	}
	function do_firstlevel() {
		clog('inside, do_firstlevel');

		var frm = $D('//form[@action=""]', null, 1), submits = $D('.//input[@name="method_free"]', frm, 1);
		SimulateMouse(submits, "click", true)
	}
	function do_secondjumbo() {
		$D('//form[@name="F1"]', null, 1).submit()
	}
	function do_thirdjumbo() {
		var frm = $D('//form[@method="LINK"]', null, 1), submits = $D('.//input[@type="submit"]', frm, 1);
		SimulateMouse(submits, "click", true)
	}
	function fetch_capcay() {
		var paddings, assoc, spans, el, padVal, ret = "", st_el, par;
		st_el = $D('//input[@name="code"]', null, 1);
		spans = null;
		if( st_el ){
			par = find_parent_byType(st_el, "TABLE");
			spans = $D(".//span", par);
			assoc = {};
			paddings = [];
		}

		if(spans && spans.snapshotLength > 0) {
			for(var i = 0;i < spans.snapshotLength;i++) {
				el = spans.snapshotItem(i);
				padVal = el.style.paddingLeft.replace(/px/i, "");
				assoc[padVal] = String(el.innerHTML);
				paddings.push(padVal)
			}
			paddings.sort(function(a, b) {
				return a - b
			});
			for(var i in paddings) {
				if(!isString(paddings[i])) {
					continue
				}
				ret += assoc[paddings[i]]
			}
		}
		return ret
	}
	function find_parent_byType(st_el, par_ndName) {
		var par = st_el.parentNode, maxJump = 5, i = 0;
		par_ndName = par_ndName.toUpperCase();
		if(par.nodeName.toUpperCase() == par_ndName) {
			return par
		}
		while(i < maxJump && par.nodeName.toUpperCase() != par_ndName) {
			par = par.parentNode;
			i++
		}
		par = par.nodeName != par_ndName ? null : par;
		return par
	}
	function wait_then_reload() {
		if($D("#delayed")) {
			$D("#delayed").innerHTML = String(parseInt($D("#delayed").innerHTML) - 1)
		}
	}
	function wait_then_click(passworded) {
		var el, timer = $D("#countdown_str");
		if(timer) {
			var title = "[%d] %t";
			var match = /Wait(?:[^\>]+.)(\d+)/i.exec(timer.innerHTML);
			if(match) {
				title = title.replace(/(?:\%d)/, match[1]).replace(/(?:\%t)/, gvar.ctitle)
			}
		}
		if(timer && timer.style.display != "none") {
			$D("//title", null, 1).innerHTML = title;
			gvar.wait_interval = window.setTimeout(function() {
				wait_then_click("countdown_str")
			}, 1E3)
		}else {
			$D("//title", null, 1).innerHTML = gvar.ctitle;
			clearTimeout(gvar.wait_interval);
			window.setTimeout(function(){
				el = $D('//input[contains(@class,"captcha_code")]', null, 1);
				if(el && !el.value) {
					return
				}else {
					$D('#btn_download') && download_now()
				}
			}, 1E3);
		}
	}
	function waiting_upit(){
		var timer = $D("#countdown", null, 1);
		if( timer ) {
			$D("//title", null, 1).innerHTML = 'Waiting: ' + gvar.ctitle;
			gvar.wait_interval = window.setTimeout(function() {
				waiting_upit()
			}, 1E3)
		}
		else{
			clearTimeout(gvar.wait_interval);
			window.setTimeout(function() { download_now() }, 1E3)
		}
	}
	function download_now() {
		var btn = $D("#btn_download");
		var frm = $D('//form[@name="F1"]', null, 1);
		var pwd = $D('.//input[@type="password"]', frm, 1);
		if(pwd && pwd.value == "") {
			try {
				pwd.focus()
			}catch(e) {
			}
			show_alert("Please insert password", 1);
			return
		}
		if(!btn) {
			btn = $D('.//input[@type="submit"]', frm, 1);
			if(!btn) {
				show_alert("Failed find download button", 1)
			}
		}else {
			SimulateMouse(btn, "click", true)
		}
	}
	function create_trans_iframe(link) {
		var ifrm = $D("#fake_iframe");
		if(!ifrm) {
			ifrm = createEl("iframe", {id:"fake_iframe", src:link, style:"height:0;width:0;border:0;position:absolute:left:-10000px;"});
			$D("//body", null, 1).appendChild(ifrm)
		}else {
			ifrm.setAttribute("src", link)
		}
	}
	function getTitle() {
		var t = $D("//title", null, 1);
		if(t) {
			t = t.innerHTML.replace(/^Download\s/, "")
		}
		return t
	}
	function isDefined(x) {
		return!(x == null && x !== null)
	}
	function isUndefined(x) {
		return x == null && x !== null
	}
	function findPos(selector) {
		var node = ("string" == typeof selector ? $D(selector) : selector), curtop=0, curtopscroll=0;
		if (node.offsetParent) {
			do {
				curtop += node.offsetTop;
				curtopscroll += node.offsetParent ? node.offsetParent.scrollTop : 0;
			} while (node = node.offsetParent);
		}
		return (curtop - curtopscroll);
	}
	function isString(x) {
		return typeof x != "object" && typeof x != "function"
	}
	function SimulateMouse(elem, event, preventDef) {
		if(typeof elem != "object") {
			return
		}
		var evObj = document.createEvent("MouseEvents");
		preventDef = isDefined(preventDef) && preventDef ? true : false;
		evObj.initEvent(event, preventDef, true);
		try {
			elem.dispatchEvent(evObj)
		}catch(e) {
		}
	}
	function getByQS(selector, par) {
		!par && (par = document);
		return par.querySelector(selector);
	}
	function getByXPath_containing(xp, par, contain) {
		if(!par) {
			par = document
		}
		if(typeof contain != "string") {
			return
		}
		var rets = [];
		var ev = document.evaluate(xp, par, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if(ev.snapshotLength) {
			for(var i = 0;i < ev.snapshotLength;i++) {
				if(ev.snapshotItem(i).innerHTML.indexOf(contain) != -1) {
					rets.push(ev.snapshotItem(i))
				}
			}
		}
		return rets
	}
	function createTextEl(a) {
		return document.createTextNode(a)
	}
	function createEl(type, attrArray, html) {
		var node = document.createElement(type);
		for(var attr in attrArray) {
			if(attrArray.hasOwnProperty(attr)) {
				node.setAttribute(attr, attrArray[attr])
			}
		}
		if(html) {
			node.innerHTML = html
		}
		return node
	}
	function show_alert(msg, force) {
		if(arguments.callee.counter) {
			arguments.callee.counter++
		}else {
			arguments.callee.counter = 1
		}
		GM_log("(" + arguments.callee.counter + ") " + msg);
		if(force == 0) {
			return
		}
	}
	function clog(msg) {
		if(!gvar.__DEBUG__)
			return
		show_alert(msg)
	}
	var $D = function(q, root, single) {
		if(root && typeof root == "string") {
			root = $D(root, null, true);
			if(!root) {
				return null
			}
		}
		if(!q) {
			return false
		}
		if(typeof q == "object") {
			return q
		}
		root = root || document;
		if(q[0] == "#") {
			return root.getElementById(q.substr(1));
		}else {
			if(q[0] == "/" || q[0] == "." && q[1] == "/") {
				if(single) {
					return document.evaluate(q, root, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
				}
				return document.evaluate(q, root, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
			}else {
				if(q[0] == ".") {
					return root.getElementsByClassName(q.substr(1))
				}
			}
		}
		return root.getElementsByTagName(q)
	};
	var GM_addGlobalStyle = function (a, b, c) {
		var d, e;
		if (a.match(/^https?:\/\/.+/)) {
			d = createEl("link", { type: "text/css", rel:'stylesheet', href:a });
		}else{
			d = createEl("style", { type: "text/css" });
			d.appendChild(createTextEl(a));
		}
		if (isDefined(b) && isString(b)) d.setAttribute("id", b);
		if (isDefined(c) && c) {
			document.body.insertBefore(d, document.body.firstChild)
		} else {
			e = document.getElementsByTagName("head");
			if (isDefined(e[0]) && e[0].nodeName == "HEAD") setTimeout(function () {
				e[0].appendChild(d)
			}, 100);
			else document.body.insertBefore(d, document.body.firstChild)
		}
		return d
	};

	// getHealer('mediafire')
	var rSRC = {
		getHealer: function(target){
			var i = '!important';
			switch(target){
				case "mediafire":
				var wrp = '.dl_options_innerblock.cf'
				return ''
					+'.captchaInstructions, .captchaSteps,'
					+wrp+' .left, '+wrp+' .top, .bottomAdLeaderboard, #modal_window_popup'
					+ '{display:none'+i+';}'
					+'form[name="form_captcha"], .dl-box{height:330px'+i+';}'
					+wrp+'{position:static'+i+'; float:none; margin:auto'+i+'; margin-top:15px'+i+';}'
					+'.captcha_box{margin-top:100px;}'
					+'.captchaPromo{top:120px'+i+';}'
					+'.dl_startlink{top:270px;}'
					+''
					+wrp+' .center{right:none'+i+'; position:relative'+i+'; float:none'+i+'; margin:0 auto'+i+';z-index: 10;}'
				;
				break;
				case "putlocker":
				return ''
					+'.file_splash iframe'
					+ '{display:none'+i+';}'
				;
				break;
				case "howfile":
				return ''
					+'*[id*="_QY_CP"]'
					+ '{display:none'+i+';}'
				;
				break;
				case "uptobox":
				return ''
					+'iframe'
					+ '{display:none'+i+';}'
				;
				break;
			}
		}
	};
	init()
})();

/* Mod By Idx. */