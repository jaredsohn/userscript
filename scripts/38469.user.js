// ==UserScript==
// @name           Wikipedia IPA Helper
// @namespace      http://dodob.shackspace.com/greasemonkey/
// @description    Popup an IPA pronunciation key when hovering over an IPA  link on Wikipedia.
// @include        http://*.wikipedia.org/*
// @include        http://wikipedia.org/*
// @exclude        http://*.wikipedia.org/wiki/Wikipedia:IPA
// @exclude        http://wikipedia.org/wiki/Wikipedia:IPA
// ==/UserScript==

(function() {
    function getTime() { benchmarkTimer = new Date(); return benchmarkTimer.getTime(); }
    var benchmarkTimer = null;
    var scriptStartTime = getTime();
	const MAX_SYM_LEN = 3;
	var ipa_popup = {};
    
	var ipa_table = {
		'b': '<b>b</b>ut, we<b>b</b>',
		'd': '<b>d</b>o, o<b>dd</b>',
		'ð': '<b>th</b>is, brea<b>the</b>, fa<b>th</b>er',
		'dʒ': '<b>g</b>in, <b>j</b>oy, e<b>dge</b>',
		'f': '<b>f</b>ool, enou<b>gh</b>, lea<b>f</b>, <b>ph</b>oto',
		'ɡ': '<b>g</b>o, <b>g</b>et, be<b>g</b>',
		'h': '<b>h</b>am, a<b>h</b>ead',
		'j': '<b>y</b>es, hallelu<b>j</b>ah',
		'k': '<b>c</b>at, <b>k</b>ill, s<b>k</b>in, <b>q</b>ueen, thi<b>ck</b>',
		'l': '<b>l</b>eft, be<b>ll</b>',
		'm': '<b>m</b>an, ha<b>m</b>',
		'n': '<b>n</b>o, ti<b>n</b>',
		'ŋ': 'ri<b>ng</b>er, si<b>ng</b>, si<b>n</b>k',
		'ŋɡ': 'fi<b>ng</b>er',
		'θ': '<b>th</b>ing, tee<b>th</b>',
		'p': '<b>p</b>en, s<b>p</b>in, ti<b>p</b>',
		'r': '<b>r</b>un, ve<b>r</b>y',
		's': '<b>s</b>ee, <b>c</b>ity, pa<b>ss</b>, <b>sc</b>issors',
		'ʃ': '<b>sh</b>e, <b>s</b>ure, emo<b>ti</b>on, lea<b>sh</b>, se<b>ss</b>ion',
		't': '<b>t</b>wo, s<b>t</b>ing, be<b>t</b>',
		'tʃ': '<b>ch</b>air, na<b>t</b>ure, tea<b>ch</b>',
		'v': '<b>v</b>oice, ha<b>ve</b>',
		'w': '<b>w</b>e, q<b>u</b>een',
		'ʍ': '<b>wh</b>at',
		'z': '<b>z</b>oo, ro<b>s</b>e',
		'ʒ': 'plea<b>s</b>ure, vi<b>si</b>on, bei<b>g</b>e',
		'x': 'u<b>gh</b>, lo<b>ch</b>, <b>Ch</b>anukah',
		'ʔ': 'uh<b>-</b>oh /ˈʌʔoʊ/, Hawai<b>‘</b>i /həˈwaɪʔiː/',
		'æ': 'b<b>a</b>d, p<b>a</b>t',
		'ær': 'b<b>arr</b>ow, m<b>arr</b>y',
		'ɑː': 'b<b>a</b>lm, f<b>a</b>ther, p<b>a</b>',
		'ɑr': 'b<b>ar</b>, m<b>ar</b>',
		'ɒ': 'b<b>o</b>d, p<b>o</b>t, c<b>o</b>t',
		'ɒr': 'm<b>or</b>al, f<b>or</b>age',
		'ɔː': 'b<b>aw</b>d, p<b>aw</b>, c<b>augh</b>t',
		'ɔr': 'b<b>or</b>n, f<b>or</b>',
		'oʊ': 'b<b>eau</b>, h<b>oe</b>, p<b>o</b>ke',
		'ɔər': 'b<b>oar</b>, f<b>our</b>, m<b>ore</b>',
		'ʊ': 'g<b>oo</b>d, f<b>oo</b>t, p<b>u</b>t',
		'ʊər': 'b<b>oor</b>, m<b>oor</b>',
		'uː': 'b<b>oo</b>ed, f<b>oo</b>d',
		'ʌ': 'b<b>u</b>d, b<b>u</b>tt',
		'ʌr': 'h<b>urr</b>y, M<b>urr</b>ay',
		'ɜr': 'b<b>ir</b>d, m<b>yrrh</b>, f<b>urr</b>y',
		'ɝː': 'b<b>ir</b>d, m<b>yrrh</b>, f<b>urr</b>y',
		'ɛ': 'b<b>e</b>d, p<b>e</b>t',
		'ɛr': 'b<b>err</b>y, m<b>err</b>y',
		'eɪ': 'b<b>ay</b>, h<b>ey</b>, f<b>a</b>te',
		'ɛər': 'b<b>ear</b>, m<b>are</b>, M<b>ar</b>y',
		'ɪ': 'b<b>i</b>d, p<b>i</b>t',
		'ɪr': 'm<b>irr</b>or',
		'i': 'happ<b>y</b>, cit<b>y</b>, toff<b>ee</b>',
		'ɪər': 'b<b>eer</b>, m<b>ere</b>',
		'iː': 'b<b>ea</b>d, p<b>ea</b>t, f<b>ee</b>t',
		'аɪ': 'b<b>uy</b>, h<b>igh</b>, r<b>i</b>de, wr<b>i</b>te',
		'ə': 'Ros<b>a</b>’s, <b>a</b>bove',
		'aʊ': 'b<b>ough</b>, h<b>ow</b>, p<b>ou</b>t',
		'əl': 'bott<b>le</b>',
		'ɔɪ': 'b<b>oy</b>, h<b>oy</b>',
		'əm': 'rhyth<b>m</b>',
		'juː': 'b<b>eau</b>ty, h<b>ue</b>, p<b>ew</b>, d<b>ew</b>',
		'ən': 'butt<b>on</b>',
		'ər': 'runn<b>er</b>, merc<b>er</b>',
		'ɚ': 'runn<b>er</b>, merc<b>er</b>',
		'.': '<i>syllabification</i>, e.g.: moai /ˈmoʊ.аɪ/',
		'ɨ': 'ros<b>e</b>s, busin<b>e</b>ss ',
		'ˈ': '<i>into<b>na</b>tion</i> /ˌɪntəˈneɪʃən/',
		'ˌ': '<i><b>in</b>tonation</i> /ˌɪntəˈneɪʃən/'
	};
	
	function parse_ipa(ipatext) {
		ipatext = ipatext.replace(/\[/,'').replace(/\]/,'').replace(/^\s\s*/,'').replace(/\s\s*$/, '');
		ipatext = ipatext.replace(':','ː');	// use triangular colons
		ipatext = ipatext.replace(/\//g,'');
		return ipatext;
	}

	function add_key(key, example) {
		var tr = document.createElement('tr');
		var td_left = document.createElement('td');
		var td_right = document.createElement('td');
		td_left.innerHTML = '/' + key + '/';
		td_right.innerHTML = example;
		td_left.setAttribute('class', 'ipahelper_key');
		td_right.setAttribute('class', 'ipahelper_example');
		tr.appendChild(td_left);
		tr.appendChild(td_right);
		return tr;
	}

	function getpos(ele) {
		var x = ele.offsetLeft;
		var y = ele.offsetTop;
		while (ele = ele.offsetParent) {
			x += ele.offsetLeft;
			y += ele.offsetTop;
		}
		return [x, y];
	}

	function toggle_popup(event) {
		var ipatext = parse_ipa(get_text(this));
		if (!ipa_popup[ipatext]) { ipa_popup[ipatext] = create_popup(ipatext); }

		var popup = ipa_popup[ipatext];
		// getpos every time in case page is zoomed in/out
		popup.style.left = getpos(this)[0] + 'px';
		popup.style.top = getpos(this)[1]+this.scrollHeight+1 + 'px';	// +1 prevents flicker
		popup.style.display = (popup.style.display == 'none')? 'block':'none';
		event.stopPropagation();
		event.preventDefault();
	}

	function create_popup(ipatext) {
		//GM_log('creating popup for ' + ipatext);
		var popup;
		popup = document.createElement('div');
		popup.style.display = 'none';
		popup.setAttribute('class', 'ipahelper_popup');
		
		var legend;
		legend = document.createElement('table');

		var key;
		for (var c=0; c<ipatext.length;) {
			for (var s=MAX_SYM_LEN; s>0; s--) {
				if (c+s > ipatext.length) { continue; }
				key = ipatext.substr(c, s);
				//GM_log(key);

				if (ipa_table[key]) {
					//GM_log('/' + key + '/ '+ ipa_table[key]);
					legend.appendChild(add_key(key, ipa_table[key]));
					break;
				}
			}
			if (s == 0) {
				//GM_log(key);
				legend.appendChild(add_key(key, ''));
				c++;
			} else {
				c = c + s;
			}
		}
		
		popup.appendChild(legend);
		popup.addEventListener('mouseover', function(e) { this.style.display='block'; }, true);
		popup.addEventListener('mouseout', function(e) { this.style.display='none'; }, true);
		document.getElementsByTagName('body')[0].appendChild(popup);
		return popup;
	}

	function get_text(ele) {
		var text;
		text = document.evaluate(
				'.//text()',
				ele,
				null,
				XPathResult.FIRST_ORDERED_NODE_TYPE,
				null).singleNodeValue.data;
		return text;
	}

	var ipas = document.evaluate(
		'//span[@class="IPA"]',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);

	for (var i=0, ipalink=null; ipalink = ipas.snapshotItem(i); i++) {
		//GM_log(ipalink.text);
		var ipatext = parse_ipa(get_text(ipalink));
		//GM_log(ipatext);

		//if (!ipa_popup[ipatext]) { ipa_popup[ipatext] = create_popup(ipatext); }

		ipalink.title = '';
		if (ipalink.firstChild.tagName == 'A') { ipalink.firstChild.title = ''; }
		//ipalink.addEventListener('click', toggle_popup, true);
		ipalink.addEventListener('click', function(e){e.preventDefault();e.stopPropagation();}, true);
		ipalink.addEventListener('mouseover', toggle_popup, true);
		ipalink.addEventListener('mouseout', toggle_popup, true);
	}

	GM_addStyle(<><![CDATA[
		div.ipahelper_popup {
			position: absolute;
			border: 1px solid rgb(170,170,170);
			padding: 2px;
			background-color: LightYellow;
			z-index: 99;
		}
		div.ipahelper_popup > table {
			background-color: transparent;
			border-spacing: 0px;
			font-size: 12.7px;
			padding: 2px;
		}
		.ipahelper_key {
			background-color: rgb(204, 204, 255);
			/*background-color: PaleGreen;*/
			font-weight: bold;
		}
		.ipahelper_example {
			/*align: right;*/
		}
	]]></>);
	
    GM_log((getTime() - scriptStartTime) + 'ms');

})();
