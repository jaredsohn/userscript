 // ==UserScript==
		   // @name		   Password Composer
		   // @namespace   Rajputgal's pasword composer
		   // @description  Generate site specific passwords based on a master password
		   // @include	   *
		   // @version	   1.08
		   // ==/UserScript==

		   // based on code by Rajptgal
		   // and included here with their gracious permission

		   var clearText = false; // show generated passwds in cleartext
		   var topDomain = false; // use top domain instead of full host
		   function errLog(msg) {
			   if (typeof(GM_log == "function")) {
				   GM_log(msg);
			   } else {
				   window.status = msg;
			   }
		   }
		   
		   function hex_md5(s) {
			   return binl2hex(core_md5(str2binl(s), s.length * 8));
		   }
		   function core_md5(x, len) {
			   x[len >> 5] |= 0x80 << ((len) % 32);
			   x[(((len + 64) >>>9) << 4) + 14] = len;
			   var a = 1732584193;
			   var b = -271733879;
			   var c = -1732584194;
			   var d = 271733878;
			   for (var i = 0; i < x.length; i += 16) {
				   var olda = a;
				   var oldb = b;
				   var oldc = c;
				   var oldd = d;
				   a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
				   d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
				   c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
				   b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
				   a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
				   d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
				   c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
				   b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
				   a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
				   d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
				   c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
				   b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
				   a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
				   d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
				   c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
				   b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
				   a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
				   d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
				   c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
				   b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
				   a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
				   d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
				   c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
				   b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
				   a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
				   d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
				   c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
				   b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
				   a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
				   d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
				   c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
				   b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
				   a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
				   d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
				   c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
				   b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
				   a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
				   d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
				   c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
				   b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
				   a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
				   d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
				   c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
				   b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
				   a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
				   d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
				   c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
				   b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
				   a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
				   d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
				   c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
				   b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
				   a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
				   d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
				   c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
				   b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
				   a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
				   d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
				   c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
				   b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
				   a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
				   d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
				   c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
				   b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
				   a = safe_add(a, olda);
				   b = safe_add(b, oldb);
				   c = safe_add(c, oldc);
				   d = safe_add(d, oldd);
				}
				return Array(a, b, c, d);
			} 
			function md5_cmn(q, a, b, x, s, t) {
				return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),
			b);
		}
		function md5_ff(a, b, c, d, x, s, t) {
			return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
		}
		function md5_gg(a, b, c, d, x, s, t) {
			return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
		}
		function md5_hh(a, b, c, d, x, s, t) {
			return md5_cmn(b ^ c ^ d, a, b, x, s, t);
		}
		function md5_ii(a, b, c, d, x, s, t) {
			return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
		}
		function safe_add(x, y) {
			var lsw = (x & 0xFFFF) + (y & 0xFFFF);
			var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
			return (msw << 16) | (lsw & 0xFFFF);
		}
		function bit_rol(num, cnt) {
			return (num << cnt) | (num >>>(32 - cnt));
		}
		function str2binl(str) {
			var bin = Array();
			var mask = (1 << 8) - 1;
			for (var i = 0; i < str.length * 8; i += 8) {
				bin[i >> 5] |= (str.charCodeAt(i / 8) & mask) << (i % 32);
			}
			return bin;
		}
		function binl2hex(binarray) {
			var hex_tab = '0123456789abcdef';
			var str = '';
			for (var i = 0; i < binarray.length * 4; i++) {
				str+=hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF)+
				hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF);
			}
			return str;
		}

		function mpwd_getHostname() {
			var re = new RegExp('https*://([^/]+)');
			var url = document.location.href.toLowerCase();
			var host = url.match(re)[1];
			// look at minimum domain instead of host
			// see http://labs.zarate.org/passwd/
			if (topDomain) {
				host = host.split('.');
				if (host[2] != null) {
				s = host[host.length-2] + '.' + host[host.length-1];
				domains='ab.ca|ac.ac|ac.at|ac.be|ac.cn|ac.il|ac.in|ac.jp|'+
		'ac.kr|ac.nz|ac.th|ac.uk|ac.za|adm.br|adv.br|agro.pl|ah.cn|aid.pl|alt'+
		'.za|am.br|arq.br|art.br|arts.ro|asn.au|asso.fr|asso.mc|atm.pl|auto.p'+
		'l|bbs.tr|bc.ca|bio.br|biz.pl|bj.cn|br.com|cn.com|cng.br|cnt.br|co.ac'+
		'|co.at|co.il|co.in|co.jp|co.kr|co.nz|co.th|co.uk|co.za|com.au|com.br'+
		'|com.cn|com.ec|com.fr|com.hk|com.mm|com.mx|com.pl|com.ro|com.ru|com.'+
		'sg|com.tr|com.tw|cq.cn|cri.nz|de.com|ecn.br|edu.au|edu.cn|edu.hk|edu'+
		'.mm|edu.mx|edu.pl|edu.tr|edu.za|eng.br|ernet.in|esp.br|etc.br|eti.br'+
		'|eu.com|eu.lv|fin.ec|firm.ro|fm.br|fot.br|fst.br|g12.br|gb.com|gb.ne'+
		't|gd.cn|gen.nz|gmina.pl|go.jp|go.kr|go.th|gob.mx|gov.br|gov.cn|gov.e'+
		'c|gov.il|gov.in|gov.mm|gov.mx|gov.sg|gov.tr|gov.za|govt.nz|gs.cn|gsm'+
		'.pl|gv.ac|gv.at|gx.cn|gz.cn|hb.cn|he.cn|hi.cn|hk.cn|hl.cn|hn.cn|hu.c'+
		'om|idv.tw|ind.br|inf.br|info.pl|info.ro|iwi.nz|jl.cn|jor.br|jpn.com|'+
		'js.cn|k12.il|k12.tr|lel.br|ln.cn|ltd.uk|mail.pl|maori.nz|mb.ca|me.uk'+
		'|med.br|med.ec|media.pl|mi.th|miasta.pl|mil.br|mil.ec|mil.nz|mil.pl|'+
		'mil.tr|mil.za|mo.cn|muni.il|nb.ca|ne.jp|ne.kr|net.au|net.br|net.cn|n'+
		'et.ec|net.hk|net.il|net.in|net.mm|net.mx|net.nz|net.pl|net.ru|net.sg'+
		'|net.th|net.tr|net.tw|net.za|nf.ca|ngo.za|nm.cn|nm.kr|no.com|nom.br|'+
		'nom.pl|nom.ro|nom.za|ns.ca|nt.ca|nt.ro|ntr.br|nx.cn|odo.br|on.ca|or.'+
		'ac|or.at|or.jp|or.kr|or.th|org.au|org.br|org.cn|org.ec|org.hk|org.il'+
		'|org.mm|org.mx|org.nz|org.pl|org.ro|org.ru|org.sg|org.tr|org.tw|org.'+
		'uk|org.za|pc.pl|pe.ca|plc.uk|ppg.br|presse.fr|priv.pl|pro.br|psc.br|'+
		'psi.br|qc.ca|qc.com|qh.cn|re.kr|realestate.pl|rec.br|rec.ro|rel.pl|r'+
		'es.in|ru.com|sa.com|sc.cn|school.nz|school.za|se.com|se.net|sh.cn|sh'+
		'op.pl|sk.ca|sklep.pl|slg.br|sn.cn|sos.pl|store.ro|targi.pl|tj.cn|tm.'+
		'fr|tm.mc|tm.pl|tm.ro|tm.za|tmp.br|tourism.pl|travel.pl|tur.br|turyst'+
		'yka.pl|tv.br|tw.cn|uk.co|uk.com|uk.net|us.com|uy.com|vet.br|web.za|w'+	
		'eb.com|www.ro|xj.cn|xz.cn|yk.ca|yn.cn|za.com';
				domains=domains.split('|');
				for(var i=0; i<domains.length; i++) {
				if (s==domains[i]) {
				s=host[host.length-3]+'.'+s;
				break;
				}
				}
				} else {
				s = host.join('.');
				}
				return s;
			} else {
				// no manipulation (full host name)
				return host;
			}
		}
		
		// generate the password and populate original form
		function mpwd_doIt() {
			if (!mpwd_check_password()) { return; }
			var master = document.getElementById('masterpwd').value;
			var domain = document.getElementById('mpwddomain').value.toLowerCase();
			// remove panel before messing with passwd fields
			mpwd_remove();
			if (master != '' && master != null) {
				var i=0, j=0, p=hex_md5(master+':'+domain).substr(0,8);
				var inputs = document.getElementsByTagName('input');
				for(i=0;i<inputs.length;i++) {
				var inp = inputs[i];
				if(inp.getAttribute('type') == 'password') {
				inp.value=p;
				if (clearText) {
				inp.type = 'text';
				var cl = inp.getAttribute("class") || "";
				// hack to mark passwd fields by setting class name
				// intentde to find them on a second pass, if
				// type is modified to text
				if (cl.indexOf("mpwdpasswd") == -1) {
				inp.setAttribute("class", cl + " mpwdpasswd");
				}
				}
				// inp.focus();
				} else if(inp.getAttribute('type') == 'text') {
				var nm = inp.getAttribute('name').toLowerCase();
				var cl = inp.getAttribute("class") || "";
				// field named something like passwd or class mpwdpasswd
				if (nm.indexOf('password')!=-1 ||
				nm.indexOf('passwd')!=-1 ||
				cl.indexOf("mpwdpasswd") != -1) {
				inp.value=p;
				if (! clearText) inp.type = 'password';
				// inp.focus();
				}
				}
			}
			// give focus to first password field
			getPwdFld().focus();
		}
	};

	// check for multiple passwd fields per form (e.g. 'verify passwd')
	function hasMultiplePwdFields() {
		// find any form that has 2+ password fields as children
		// note literal '>' char in xpath expression!
		var xpres = document.evaluate(
			"count(//form[count(//input[@type='password']) > 1])",
			document, null, XPathResult.ANY_TYPE, null);
		return(xpres.numberValue > 0);
	}
	// find first password field
	function getPwdFld() {
		var L = document.getElementsByTagName('input');
		for (var i = 0; i < L.length; i++) {
			var nm, tp, cl;
			try { nm = L[i].getAttribute("name") || ""; } catch(e) { };
			try { tp = L[i].getAttribute("type") || ""; } catch(e) { };
			try { cl = L[i].getAttribute("class") || ""; } catch(e) { };
			if ((tp == "password") ||
				(tp == "text" && nm.toLowerCase().substring(0,5) == "passw") ||
				(cl.indexOf("mpwdpasswd") > -1)) {
				return L[i];
			}
		}
		return null;
	}
	function mpwd_remove() {
		var body = document.getElementsByTagName('body')[0];
		body.removeChild(document.getElementById('mpwd_bgd'));
		body.removeChild(document.getElementById('mpwd_panel'));
	}
	function mpwd_keyup(e) {
		mpwd_check_password();
		if (e.keyCode == 13 || e.keyCode == 10) {
			mpwd_doIt();
		} else if (e.keyCode == 27) {
			mpwd_remove();
		}
	}
	function mpwd_check_password() {
		var pwd = document.getElementById('masterpwd');
		var pwd2 = document.getElementById('secondpwd');
		if (!pwd2) return 1;
		if (pwd.value != pwd2.value && pwd2.value != '') {
			pwd2.style.background='#f77';
			pwd2.style.borderColor='red';
			return 0;
		} else {
			pwd2.style.background = 'white';
			pwd2.style.borderColor='#777';
			return 1;
		}
	}
	function mpwd_panel(event) {
		var pwdTop = 0;
		var pwdLeft = 0;
		if (document.getElementById('mpwd_panel')) {
			mpwd_remove();
			return;
		}
		try {
			var obj = getPwdFld();
			if (obj.offsetParent) {
				while (obj.offsetParent) {
				pwdTop += obj.offsetTop;
				pwdLeft += obj.offsetLeft;
				obj = obj.offsetParent;
				}
			}
		} catch (e) {
		  pwdTop = 10;
		  pwdLeft = 10;
		}
		// full document width and height as rendered in browser:
		var html = document.getElementsByTagName('html')[0];
		var pag_w = parseInt(document.defaultView.getComputedStyle(html,
			'').getPropertyValue('width'));
		var pag_h = parseInt(document.defaultView.getComputedStyle(html,
			'').getPropertyValue('height'));

		var div = document.createElement('div');
		div.style.color='#777';
		div.style.padding='5px';
		div.style.backgroundColor='white';
		div.style.border='1px solid black';
		div.style.borderBottom='3px solid black';
		div.style.borderRight='2px solid black';
		div.style.MozBorderRadius='10px';
		div.style.fontSize='9pt';	
		div.style.fontFamily='sans-serif';
		div.style.lineHeight='1.8em';
		div.style.position='absolute';
		div.style.width='230px';
		// keep panel at least 10 px away from right page edge
		div.style.left = ((250 + pwdLeft > pag_w)? pag_w - 250 : pwdLeft) +
	'px';
		div.style.top = pwdTop + 'px';
		div.style.zIndex = 9999; // make sure we're visible/on top
		div.setAttribute('id', 'mpwd_panel');
		div.appendChild(document.createTextNode('Master password: '));

		var icnShow = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAA'+
	'AAMCAIAAADZF8uwAAAAkUlEQVR4nGL4TwRgwCWxc%2BfOU6dOQRUZowKI6N%2B%2Ff93c'+
	'3Ly8vBCKMI3Ztm1bZ2dnenr65cuXcSoKCwt7%2BPDh4cOHs7KysCt6%2Ffo1Pz%2B%2Fs'+
	'7Ozk5MTkPH582csiiZMmDBlyhQIu6amZubMmVgUGRkZvXr1CsK%2Bffu2oaEhdjdBAFyK'+
	'aEV4AFQRLmOQAQAAAP%2F%2FAwB27VC%2BrCyA0QAAAABJRU5ErkJggg%3D%3D';
		var icnHide = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAA'+
	'AAMAgMAAAArG7R0AAAADFBMVEX%2F%2F%2F%2FMzMxmZmYzMzM7z8wMAAAAJ0lEQVQImW'+
	'NgAIMEhv%2FH0hgOMEYwHGAD0kD%2BAaAoBBuA8f%2F%2FH0AKARI5DD%2FY1kZdAAAAA'+
	'ElFTkSuQmCC';
		var show = document.createElement('img');
		show.setAttribute('src', (clearText) ? icnShow : icnHide);
		show.setAttribute('id', "icnShow");
		show.setAttribute('title', 'Show or hide generated password');
		show.style.paddingRight = '4px';
		show.style.display='inline'; // some stupid sites set this to block
		show.style.cursor = 'pointer';
		show.addEventListener('click', function(event) {
			clearText = !clearText;
			document.getElementById("icnShow").setAttribute('src',
				(clearText) ? icnShow : icnHide);
			document.getElementById('masterpwd').focus();
		}, true);
		div.appendChild(show);

		var pwd = document.createElement('input');
		pwd.style.border='1px solid #777';
		pwd.setAttribute('type','password');
		pwd.setAttribute('id','masterpwd');
		pwd.style.width = '100px';
		pwd.style.fontSize='9pt';
		pwd.style.color='#777';
		// fire action if RETURN key is typed
		div.appendChild(pwd);
		div.appendChild(document.createElement('br'));
		if (hasMultiplePwdFields()) {
			// only of a 'verify field' is on original page
			div.appendChild(document.createTextNode('Check password: '));
		var pwd2 = document.createElement('input');
		pwd2.setAttribute('type','password');
		pwd2.setAttribute('id','secondpwd');
		pwd2.style.width = '100px';
		pwd2.style.color='#777';
		pwd2.style.border='1px solid #777';	
		pwd2.style.fontSize='9pt';
		div.appendChild(pwd2);
		div.appendChild(document.createElement('br'));
	}
	
	div.appendChild(document.createTextNode('Domain: '));
	
	var subicn = document.createElement('img');
	subicn.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAAN'+
  'SUhEUgAAAAkAAAAJCAAAAADF%2BlnMAAAAGUlEQVR42mNogQGGlv8QgIvFAAL%2FCaqDA'+
  'QCbtDxVGHcjrgAAAABJRU5ErkJggg%3D%3D');
	subicn.setAttribute('id', "icnSubdom");
	subicn.setAttribute('title', 'Toggle use sub domain');
	subicn.style.display='inline';
	subicn.style.paddingRight = '4px';
	subicn.style.cursor = 'pointer';
	subicn.addEventListener('click', function(event) {
		toggleSubdomain();
		document.getElementById('masterpwd').focus();
	}, true);
	div.appendChild(subicn);

	var domn = document.createElement('input');
	domn.setAttribute('type','text');
	domn.setAttribute('value', mpwd_getHostname());
	domn.setAttribute('id','mpwddomain');	
	domn.setAttribute('title','Edit domain name for different password');
	domn.style.width = '150px';
	domn.style.border = 'none';
	domn.style.fontSize='9pt';
	domn.style.color='#777';
	div.appendChild(domn);

	div.addEventListener('keyup', mpwd_keyup, true);

	var bgd = document.createElement('div');
	bgd.setAttribute('id','mpwd_bgd');
	bgd.style.position='absolute';
	bgd.style.top='0px';
	bgd.style.left='0px';
	bgd.style.backgroundColor='black';
	bgd.style.opacity='0.35';
	bgd.style.height = pag_h + 'px';
	bgd.style.width = pag_w + 'px';
	bgd.style.zIndex='9998';
	bgd.addEventListener('click', mpwd_remove, true);
		var body = document.getElementsByTagName('body')[0];
		body.appendChild(bgd);
		body.appendChild(div);
		setTimeout("document.getElementById('masterpwd').focus();", 333);
		initSubdomainSetting();
	};

	// Setting: use sub domain
	function initSubdomainSetting() {
		if (typeof(GM_getValue) == 'function') {
			topDomain = GM_getValue('topDomain', false);
		}
		updateSubDomainSetting();
	}

	function toggleSubdomain() {
		topDomain = !topDomain;
		if (typeof(GM_setValue) == 'function') {
			GM_setValue('topDomain', topDomain);
		}
		updateSubDomainSetting();
	}
	
	function updateSubDomainSetting() {
		var icnPlus = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAA'+
	'AAJCAAAAADF%2BlnMAAAAHUlEQVR42mNogQGGlv8QAGExYLAYQACnLFwvDAAA6Fk4WdfT'+
	'%2FgAAAAAASUVORK5CYII%3D';
		var icnMin = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAA'+
	'AJCAAAAADF%2BlnMAAAAGUlEQVR42mNogQGGlv8QgIvFAAL%2FCaqDAQCbtDxVGHcjrgA'+
	'AAABJRU5ErkJggg%3D%3D';
		 document.getElementById("icnSubdom").setAttribute('src',
			(topDomain) ? icnMin : icnPlus);
		document.getElementById("mpwddomain").setAttribute('value',
			 mpwd_getHostname());
	}

	function mpwd_launcher() {
		// image 12px
		var bullet = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAA'+
	'AMCAYAAABWdVznAAAAX0lEQVR4nGL4%2F%2F8%2FAykYwkhL%2B08IR0VFIWkAUn%2F%2'+
	'B%2FMGJoRqysGoASRKtAWw9SOjMGRTN%2BG0AKgYLQzUT1AC3iVgNcGdBMVE2EOVpQhhV'+
	'AxCDBAhhFA3EYgAAAAD%2F%2FwMAKhyYBtU1wpoAAAAASUVORK5CYII%3D';
		var pwdTop = 0;
		var pwdLft = 0;
		var obj;
		try {
			obj = getPwdFld();
			if (obj.offsetParent) {
				while (obj.offsetParent) {
				pwdTop += obj.offsetTop;
				pwdLft += obj.offsetLeft;
				obj = obj.offsetParent;
				}
				}
				} catch (e) {
				    pwdTop = 10;
				pwdLft = 10;
				}
				// return if no passwd field is found
				if (! obj) return;
				var bull = document.createElement('img');
				bull.style.position='absolute';
				bull.style.top = pwdTop + 'px';
				bull.style.left = (pwdLft - 12) + 'px';
				bull.setAttribute('src', bullet);
				bull.setAttribute('title', 'Open Password Composer');
				bull.style.cursor = 'pointer';
				bull.addEventListener('click', mpwd_panel, true);
				bull.style.zIndex = 9999;
				document.getElementsByTagName('body')[0].appendChild(bull);
			}
			
			mpwd_launcher();
			// add menu command to manually launch passwd composer
			if (typeof(GM_registerMenuCommand == 'function')) {
				GM_registerMenuCommand("Show Password Composer", mpwd_panel);
			}