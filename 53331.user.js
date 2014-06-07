// ==UserScript==
// @name           Wishmaster
// @description    Some tweaks for 2-ch.ru imageboard
// @namespace      http://2-ch.ru/
// @include        http://2-ch.ru/*
// ==/UserScript==

try { if ((parent != self) && (parent.location.pathname.length > 1)) { window.stop(); return; } }
catch (e) { /* iichan->2ch access denial */ }

var url = location.pathname.substr(1), url_ = url.split('/'), elt, delform = $('delform'),
	host_strings = {name:	{'2-ch.ru': 'akane',		'iichan.ru': 'nya1'},
					email:	{'2-ch.ru': 'nabiki',	'iichan.ru': 'nya2'},
					topic:	{'2-ch.ru': 'kasumi',	'iichan.ru': 'nya3'},
					message:{'2-ch.ru': 'shampoo',	'iichan.ru': 'nya4'},
					capurl:	{'2-ch.ru': '',			'iichan.ru': '/'},
					gb2:	{'2-ch.ru': 'gb2" value="thread', 'iichan.ru': 'postredir" value="1'}};

if (url == '/') { document.body.cols = '230,*'; return; }

// SETUP MENU
if (url.indexOf('/') == -1 && url != 'front.htm') return;

function $n(x){return document.getElementsByName(x)[0]}
function $(x){return document.getElementById(x)}
function offs(a,b){var c=0;while(a){c+=a[b];a=a.offsetParent}return c}
function clickme(me){var evt=document.createEvent('MouseEvents');evt.initMouseEvent('click',true,true,window,1,0,0,0,0,false,false,false,false,0,null);me.dispatchEvent(evt)}

var default_cfg = [1, 1, 0, 0, 'pa55w0rd', 0, '', 1, 1, 1, 1, 500, 375, 1, 1, 1, 0, 1, 0, 1, 1, 500, 112, 1, 1, 1, 1, 0, 0, 1],
	config = GM_getValue('cfg', '').split('|');
// CONFIG FORMAT: sage|move_captcha|bold_text|pass_type|pass_value|cens_on|cens_regexps|copypasta|images|mp3|flash|fla_x|fla_y|^H|>>HOVER|>>AJAX|movero|bm|bm_rep|bm_new|resize|resx|resy|thr|long|F5|arrow|rules
//					0		1			2		  3			4		  5			6			7		8	  9	  10	11	  12   13	14		15		16	17	18		19		20	21	  22	23	24 25	26	27
//				№>>|reply
//				28	29

if (config.length < default_cfg.length)
	for (var i = config.length; i < default_cfg.length; i++) config[i] = default_cfg[i];

var badphrase = unescape(config[6]).split('\n');
badphrase.forEach(function(v, i) {
	if (!v) return;
	var l = v.lastIndexOf('/');
	badphrase[i] = new RegExp(v.substr(1, l - 1), v.substr(l + 1));
});

//CREATE CONFIGURATION MENU
with (document.body.appendChild(document.createElement('div')))
	style.cssText = 'position:fixed;z-index:99;top:0px;left:50px;background-color:#000;color:#fff;-moz-border-radius:15px;padding:0 10px 10px 10px;display:none',
	innerHTML = '<center><h2>Настройки</h2></center>\
				<label><input type="checkbox" name="cfg_moverp"/> Форма ответа в конце треда</label><br/>\
				<label><input type="checkbox" name="cfg_sage"/> Sage</label><br/>\
				<label><input type="checkbox" name="cfg_cap"/> Перемещение капчи на дваче</label><br/>\
				<label><input type="checkbox" name="cfg_bold" style="margin-bottom: 3px;"/> Ctrl+B: Bold</label>   \
				<label><input type="checkbox" name="cfg_strike" style="margin-bottom: 3px;"/> Ctrl+H: зачёркивание</label><br/>\
				<label><input type="radio" name="cfg_pass" value="1"/> Постоянный пароль: </label><input type="text" size="8" name="cfg_passwd"/>    \
				<label><input type="radio" name="cfg_pass" value="0"/> Случайный пароль</label><br/>\
				<label><input type="checkbox" name="cfg_rsz"/> Изменяемый размер поля ввода</label><input type="hidden" name="cfg_rsz_x"/><input type="hidden" name="cfg_rsz_y"/><br/>\
				<label><input type="checkbox" name="cfg_rulz"/> Скрыть правила</label><br/>\
				<label><input type="checkbox" name="cfg_cens"/> Цензура постов</label><br/><textarea rows="3" cols="70" style="margin-left: 25px; font: 10pt Tahoma;" name="cfg_regexp"></textarea><br/>\
				<label><input type="checkbox" name="cfg_copy"/> Урезание копипаст</label><br/>\
				<label><input type="checkbox" name="cfg_img"/> Открытие картинок в треде</label><br/>\
				<label><input type="checkbox" name="cfg_mp3"/> MP3-плеер</label><br/>\
				<label><input type="checkbox" name="cfg_fla"/> Кнопка открытия флэшек в треде</label> (Размер: <input type="text" size="3" name="cfg_fla_x"/> x <input type="text" size="3" name="cfg_fla_y"/>)<br/>\
				<label><input type="checkbox" name="cfg_pop"/> Просмотр >>ссылок по наведению мыши</label>    <label><input type="checkbox" name="cfg_popa"/> AJAX</label><br/>\
				<label><input type="checkbox" name="cfg_bm"/> Включить закладки</label>\
				<br/>     Добавлять: <label><input type="checkbox" name="cfg_bm_rep"/> при ответе</label>, <label><input type="checkbox" name="cfg_bm_new"/> при создании треда</label><br/>\
				Ещё AJAX: <label><input type="checkbox" name="cfg_thr"/> разворачивание тредов</label>, <label><input type="checkbox" name="cfg_long"/> длинные комментарии</label><br/>\
				<label><input type="checkbox" name="cfg_rpl"/> Быстрый ответ</label><br/>\
				Навигация: <label><input type="checkbox" name="cfg_f5"/> F5 обновляет только правый фрейм</label>, \
				<label><input type="checkbox" name="cfg_arrow"/> Ctrl+←→</label><br/>\
				<label><input type="checkbox" name="cfg_fix"/> Ремонт: заменять № на активные ссылки</label><br/>\
				<br/><center><input type="button" name="cfg_save" value="Сохранить"/>    <input type="button" name="cfg_cancel" value="Отмена"/>    \
				<input type="button" name="cfg_reset" value="По умолчанию"/></center>',
	id = 'cfg';

with (document.body.appendChild(document.createElement('div')))
	style.cssText = 'position:fixed;z-index:99;top:0;right:20px;background-color:#000;color:#fff;-moz-border-radius:0 0 15px 15px;padding:0 10px 10px 10px;cursor:pointer',
	innerHTML = '<img src="data:image/gif;base64,\
		R0lGODdhGQAXALMAAAQCBIyOjNTS1Ozq7LSytPz6/GxqbKSmpOTi5Ly+vJyanNza3PTy9Pz+/Hx+fMTGxCwAAAAAGQAXAAAEphDIKVNpwtDNqWhgwzhd6SwfmEgaZQmcgzzhUSbN0z1ESJSAwapzCC0Ktk6jQJIMAIJ\
		UY8AAJSkOENNRGCBCGFqNEriELgdHdSmRNpJF8FQh4U4n7oMYhOicNm5gT0AcgQ19hB1rIS2JHnJ3jhMDkCADTYmUIVFgTCUEi5ttnQEcOAhmIDB4clcSDH0KPoWtHhNiJYE6HAEiQHkdF0O5Vh0IDMO/SREAOw=="/>',
	addEventListener('click', function() { $('cfg').style.display = 'block'; }, false);

var cfgnames = ['sage', 'cap', 'bold', 'pass', 'passwd', 'cens', 'regexp', 'copy', 'img', 'mp3', 'fla', 'fla_x', 'fla_y', 'strike', 'pop', 'popa', 'moverp', 'bm', 'bm_rep', 'bm_new',
				'rsz', 'rsz_x', 'rsz_y', 'thr', 'long', 'f5', 'arrow', 'rulz', 'fix', 'rpl'],
	fillcfg = function() {
	cfgnames.forEach(function(v, i) {
		if (i == 3) return;
		with ($n('cfg_' + v)) type == 'checkbox' ? checked = config[i] : value = unescape(config[i]);
	});
	document.getElementsByName('cfg_pass')[config[3] ? 0 : 1].checked = 1;
}

fillcfg();

$n('cfg_cancel').addEventListener('click', function(e) {
	fillcfg();
	e.stopPropagation();
	this.parentNode.parentNode.style.display = 'none';
}, false);

$n('cfg_save').addEventListener('click', function() {
	config = [];
	cfgnames.forEach(function(v) {
		with ($n('cfg_' + v)) config.push(((type == 'checkbox') || (type == 'radio')) ? (checked ? '1' : '') : escape(value));
	});
	GM_setValue('cfg', config.join('|'));
	this.parentNode.parentNode.style.display = 'none';
}, false);

$n('cfg_reset').addEventListener('click', function() {
	var tmp = config;
	config = default_cfg;
	fillcfg();
	config = tmp;
}, false);

var replies = document.getElementsByTagName('blockquote');

// BOOKMARKING
if (config[17]) {
	var storebm = function() {
		var val = '';
		for (var i in subs) {
			val += i + ',';
			for (var j in subs[i]) val += j + ' ' + subs[i][j] + ',';
			val = val.replace(/.$/, '|');
		}
		GM_setValue('subscriptions', val.substr(0, val.length - 1));
	}, deletelk = function(e) {
		e.preventDefault();
		var ptr = this.id.split('_');
		with (this.parentNode) {
			if (parentNode.childNodes.length == 2) subdiv.removeChild(parentNode), delete subs[ptr[0]];
			else parentNode.removeChild(this.parentNode), delete subs[ptr[0]][ptr[1]];
		}
		storebm();
	}, addbm = function(vis) {
		var bo = url_[0], titlebar = $n('delete').parentNode, id = titlebar.nextSibling.nextSibling.textContent.match(/\d+/), topic = titlebar.childNodes[2].textContent,
			preview = (topic ? '[' + topic + '] ' : '') + replies[0].innerHTML.replace(/^\s+/, '').replace(/<[^>]+>/g, ' ');
		preview = preview.substr(0, 40).replace(/\s+$/, '') + (preview.length > 40 ? '...' : '');
		var desc = escape(preview) || titlebar.childNodes[titlebar.childNodes.length - 1].textContent;
		if (subs[bo] && id in subs[bo]) return;
		else {
			subs[bo] || (subs[bo] = {});
			subs[bo][id] = escape(preview);
		}
		storebm();
		if (vis === true) {
			var add2 = document.evaluate('div[b="/' + bo + '/"]', subdiv, null, 8, null).singleNodeValue, newdiv = document.createElement('div');
			if (!add2) add2 = subdiv.appendChild(document.createElement('div')), add2.innerHTML = '<b>/' + bo + '/</b>';
			newdiv.innerHTML = '<a href="http://2-ch.ru/' + bo + '/res/' + id + '.html">' + id + '</a> (<a href="#" id="' + bo + '_' + id + '">x</a>) - ' + preview;
			add2.appendChild(newdiv);
			newdiv.childNodes[2].addEventListener('click', deletelk, false);
		}
	};
	// creating menu, loading collection
	var subs1 = GM_getValue('subscriptions', '').split('|'), subs = {}, subdiv = document.createElement('div');
	subdiv.innerHTML = '<center><h3 style="margin: 0">Закладки <a href="#" onclick="this.parentNode.parentNode.parentNode.className=\'subdiv\';event.stopPropagation();return false">&gt;&gt;</a></h3></center>';
	subdiv.className = 'subdiv';
	GM_addStyle ('.subdiv,.subdiv2{background-color:#eee;border:2px solid black;-moz-border-radius:15px 0 0 15px;position:fixed;width:500px;top:100px;overflow-y:auto;max-height:85%;z-index:10}\
		.subdiv{right:-510px;padding-left:20px}.subdiv2{padding:5px;right:10px;padding-right:25px}.subdiv:hover{background-color:#f60}');
	subdiv.addEventListener('click', function() {
		if (this.className == 'subdiv') this.className = 'subdiv2';
	}, false);

	for (var i = 0, l = subs1.length; i < l; i++) {
		if (!subs1[i]) break;
		var subsect = subs1[i].split(',');
		subs[subsect[0]] = {};
		var sectdiv = document.createElement('div'), sect = '<b>/' + subsect[0] + '/</b>';
		for (var j = 1; j < subsect.length; j++)  {
			var nfo = subsect[j].split(' ');
			subs[subsect[0]][nfo[0]] = nfo[1];
			sect += '<div><a href="http://2-ch.ru/' + subsect[0] + '/res/' + nfo[0] + '.html">' + nfo[0] + '</a> (<a href="#" id="' + subsect[0] + '_' + nfo[0] + '">x</a>) - ' + unescape(nfo[1]) + '</div>';
		}
		sectdiv.innerHTML = sect;
		subdiv.appendChild(sectdiv);
	}
	document.body.appendChild(subdiv);
	// delayed bookmarking
	if (GM_getValue('bmonload', false)) {
		GM_setValue('bmonload', false);
		delform && addbm(true);
	}
	// delete link handlers
	for (var xp = document.evaluate('div/div', subdiv, null, 6, null), lk, i = 0; lk = xp.snapshotItem(i); i++)
		lk.childNodes[2].addEventListener('click', deletelk, false);

	// watch 404
	if ((document.title == '404 Not Found') && (elt = $(url_[0] + '_' + url.match(/\d+/)))) clickme(elt);

	// auto bookmark on reply/create
	if (elt = $('postform')) {
		elt = document.evaluate('.//input[@type="submit"]', elt, null, 8, null).singleNodeValue;
		if (config[18] && (url_[1] == 'res') && elt) elt.addEventListener('click', addbm, false);
		if (config[19] && (url_[1] != 'res') && elt) elt.addEventListener('click', function() { GM_setValue('bmonload', true); }, false);
	}
	// manual bookmark links
	if (delform) {
		var bmonclick = function(e) {
			e.preventDefault();
			var tid = this.hash.substr(1), boarddiv;
			if (subs[url_[0]] && subs[url_[0]][tid]) {
				clickme($(url_[0] + '_' + tid));
				this.textContent = 'В закладки';
				return;
			}
			if (!subs[url_[0]]) {
				subs[url_[0]] = {};
				boarddiv = subdiv.appendChild(document.createElement('div'));
				boarddiv.innerHTML = '<b>/' + url_[0] + '/</b>';
			}
			else boarddiv = document.evaluate('div[b="/' + url_[0] + '/"]', subdiv, null, 8, null).singleNodeValue;
			var topic = this.parentNode.parentNode.getElementsByTagName('label')[0].childNodes[2].textContent,
				preview = (topic ? '[' + topic + '] ' : '') + this.parentNode.nextSibling.innerHTML.replace(/^\s+/, '').replace(/<[^>]+>/g, ' ');
			preview = preview.substr(0, 40).replace(/\s+$/, '') + (preview.length > 40 ? '...' : '');
			subs[url_[0]][tid] = escape(preview);
			var newdiv = document.createElement('div');
			newdiv.innerHTML = '<a href="/' + url_[0] + '/res/' + tid + '.html">' + tid + '</a> (<a href="#" id="' + url_[0] + '_' + tid + '">x</a>) - ' + preview;
			newdiv.childNodes[2].addEventListener('click', deletelk, false);
			boarddiv.appendChild(newdiv);
			storebm();
			this.textContent = 'Снять закладку';
		};
		for (var xp = document.evaluate('div', delform, null, 6, null), i = 0; elt = xp.snapshotItem(i); i++) {
			var bmspan = elt.insertBefore(document.createElement('span'), elt.getElementsByTagName('blockquote')[0]), tid = elt.id.substr(7);
			bmspan.innerHTML = '[<a href="#' + tid + '"></a>]';
			with (bmspan.childNodes[1])
				textContent = (subs[url_[0]] && subs[url_[0]][tid]) ? 'Снять закладку' : 'В закладки',
				addEventListener('click', bmonclick, false);
		}
	}
}

/*// BACK LINK (xpath can't find it. any ideas?)
if (elt = document.evaluate('//a[.="Назад"]', document, null, 8, null).singleNodeValue) {
	elt.addEventListener('click', function(e) { e.preventDefault(); history.back(); }, false);
}*/
// CONTENT PAGE BREAKPOINT
if (!delform) return;

if (config[25] || config[26]) window.addEventListener('keydown', function(e) {
// F5 TO REFRESH CONTENT ONLY
	if (config[25] && (top != self) && (e.keyCode == 116)) { e.preventDefault(); location.hash = ''; return; }
// CTRL+ARROW NAVIGATION
	if (!config[26] || url_[1] == 'res') return;
	var not4input = ((e.originalTarget.tagName != 'TEXTAREA') && (e.originalTarget.tagName != 'INPUT')) || !e.originalTarget.value;
	if (not4input && e.ctrlKey) {
		if ((e.keyCode == 37) && (elt = document.evaluate('//input[@value="Предыдущая"]', document, null, 8, null).singleNodeValue)) elt.click();
		if ((e.keyCode == 39) && (elt = document.evaluate('.//input[@value="Следующая"]', document, null, 8, null).singleNodeValue)) elt.click();
	}
}, true);

if (elt = $n('password')) with (elt) type = 'text', config[3] && (value = config[4]);
if (config[3] && (elt = document.evaluate("//input[@type='password']", delform, null, 8, null).singleNodeValue)) elt.value = config[4];
if ((elt = $n('file')) && $n('nofile'))	$n('nofile').checked = true,
										elt.addEventListener('input', function() { $n('nofile').checked = (this.value == ''); }, false),
										elt.addEventListener('change', function() { $n('nofile').checked = (this.value == ''); }, false);

// INVISIBLE RULES
var hndrulz = function(o) {
	($('rules') || document.evaluate('//div[@class="rules"]', document, null, 8, null).singleNodeValue).style.display = o.checked ? 'none' : '';
};
$n('cfg_rulz').addEventListener('click', function() { hndrulz(this); }, false);
hndrulz($n('cfg_rulz'));

// FIT BIG CAPTCHA BETTER
if (elt = $n('captcha')) {
	if (config[1] && location.host == '2-ch.ru') {
	/*	var captd = $('postblock').cells[1], tbl = document.getElementsByTagName('table')[0].rows;
		alert(' ololo ');
		tbl[tbl.length - 1].cells[0].setAttribute('colspan', '3');
		with($('trgetback').insertCell(-1)) appendChild(captd.removeChild(captd.getElementsByTagName('img')[0])).name = 'imgcaptcha', setAttribute('rowspan', '2');
		for (var i = tbl.length - 2; i >= 0; i--)
			with (tbl[i]) {
				if ((id != 'trgetback') && (id != 'trcaptcha')) cells[1].setAttribute('colspan', '2');
				else cells[1].width = '500';
			}*/
	}

// FORCE ENG INPUT FOR CAPTCHA
	var caphnd = function(e) {
		if (e.charCode > 1039) {
			e.preventDefault();
			var val = this.value, ss = this.selectionStart, offset = (e.charCode < 1072 ? 1040 : 1072),
				chars = ['f', 0, 'd', 'u', 'l', 't', 0, 'p', 'b', 'q', 'r', 'k', 'v', 'y', 'j', 'g', 'h', 'c', 'n', 'e', 'a', 0, 'w', 'x', 'i', 'o', 0, 's', 'm', 0, 0, 'z'];
			this.value = val.substr(0, ss) + (chars[e.charCode - offset] || '') + val.substr(this.selectionEnd);
			this.selectionStart = this.selectionEnd = ++ss;
		}
	};
	elt.addEventListener ('keypress', caphnd, false);

// REFRESH CAPTCHA
	if (elt = document.evaluate(".//img[contains(@src, 'captcha')]", $('postform'), null, 8, null).singleNodeValue) {
		var caprld = function() { this.style.opacity = null; this.removeEventListener('load', caprld, false); },
			capclk = function() {
				this.src = this.src.replace(/dummy=\d*/, 'dummy=' + Math.floor(Math.random()*1e16).toString(16));
				this.style.opacity = '.5';
				this.addEventListener('load', caprld, false);
			};
		elt.removeAttribute('onclick');
		elt.addEventListener('click', capclk, false);
	}
}

// NOW SAFE TO MOVE POSTFORM
if (config[16] && (url_[1] == 'res')) {
	var b = document.body, replyhdr = document.evaluate("div[@class='theader']", b, null, 8, null).singleNodeValue, postform = document.evaluate(".//div[@class='postarea']", b, null, 8, null).singleNodeValue;
	postform && b.insertBefore(document.body.removeChild(postform), delform.nextSibling);
	replyhdr && b.insertBefore(document.body.removeChild(replyhdr), delform.nextSibling);
}

// CTRL+B TO BOLD TEXT, CTRL+H TO STRIKETHRU
if (elt = $n(host_strings.message[location.host])) {
	var textfunc = function(e) {
		if (e.ctrlKey) switch (e.charCode) {
		case 98: // B
			if (!config[2]) break;
			e.preventDefault();
			var ss = this.selectionStart, se = this.selectionEnd, sv = this.value, hstr, st = this.scrollTop;
			if (ss == se) hstr = '**';
			else hstr = '**' + sv.substr(ss, se) + '**';
			this.value = sv.substr(0, ss) + hstr + sv.substr(se);
			this.scrollTop = st;
			if (ss == se) this.selectionStart = this.selectionEnd = ss + 2;
			else this.selectionEnd = se + 4;
			break;
		case 104: // H
			if (!config[13]) break;
			e.preventDefault();
			var ss = this.selectionStart, se = this.selectionEnd, sv = this.value, hstr = '', st = this.scrollTop;
			if (ss == se) hstr = '^H';
			else for (; ss < se; ss++) hstr += '^H';
			this.value = sv.substr(0, ss) + hstr + sv.substr(ss);
			this.selectionStart = this.selectionEnd = ss + hstr.length, this.scrollTop = st;
			break;
		}
		if (e.ctrlKey && e.keyCode == 13) document.evaluate('ancestor::table//input[@type="submit"]', this, null, 8, null).singleNodeValue.click();
	};
	elt.addEventListener('keypress', textfunc, false);
//RESIZER
	if (config[20]) {
		with (elt.style) width = config[21] + 'px', height = config[22] + 'px';
		var resizer = elt.parentNode.appendChild(document.createElement('img')), resnow = false, shampoo = elt;
		resizer.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABlBMVEUAAAAAAAClZ7nPAAAAAWJLR0QAiAUdSAAAAAF0Uk5TAEDm2GYAAAAWSURBVHjaY2BAAYyMDMNagBENYAgAABMoAD3fBUDWAAAAAElFTkSuQmCC';
		resizer.addEventListener('load', function() { this.style.cssText = 'position:relative;left:-12px;top:8px;cursor:se-resize'; }, false);
		resizer.addEventListener('mousedown', function(e) { e.preventDefault(); resnow = true; }, false);
		document.body.addEventListener('mousemove', function(e) {
			if(resnow) {
				shampoo.style.width = e.pageX - offs(shampoo, 'offsetLeft') + 'px';
				shampoo.style.height = e.pageY - offs(shampoo, 'offsetTop') + 'px';
			}
		}, false);
		document.body.addEventListener('mouseup', function() {
			resnow = false;
			config[21] = parseInt(shampoo.style.width);
			config[22] = parseInt(shampoo.style.height);
			GM_setValue('cfg', config.join('|')); }
		, false);
	}
}

// SAGE
if (config[0] && (url_[1] == 'res') && (elt = $n(host_strings.email[location.host])))
	elt.parentNode.innerHTML = '<label><input type="checkbox" name="' + host_strings.email[location.host] + '" value="sage" style="margin-left:0pt;padding-left:0pt"/> sage</label>';

// MAIN FUNCTION FOR PAGE CONTENT
function mainLoop(container) {
	var posts = container.getElementsByTagName('blockquote');
	// BAD PHRASES FILTER
	if (config[5])
		for (var i = 0, post, combo = 0, comboSt; post = posts[i]; i++) {
			if (badphrase.some(function(re) { return re.test(this) }, post.textContent.replace(/\xAD/g, '')) && post.parentNode.className == 'reply') {
				if (combo)
					post.parentNode.parentNode.parentNode.parentNode.style.display = 'none', comboSt.innerHTML = '[censored x ' + ++combo + ']';
				else
					comboSt = post.parentNode, comboSt.innerHTML = '[censored]', i--, combo = 1;
			} else
				combo = 0;

			if (combo) continue;
		}

	// COPYPASTA DETECTOR
	if (config[7]) {
		(function(n) {
			var post = posts[n], stfrom = 4;
			if (!post) return;
			var s = post.innerHTML.replace(/\s\s+/g, ' ').replace(/\s*<br>/g, '\n'), changed = false;
			for (var lastlt = 4, maxlt = (s.length - stfrom) / 3; lastlt < maxlt; lastlt++) {
				var cmatch = s.substr(stfrom, lastlt), matchcnt = 1, trailspace = (cmatch[lastlt - 1] == ' ') || (cmatch[lastlt - 1] == '\n'), trimd = cmatch.substr(0, lastlt - 1), fixxor = 0;

				while ((s.substr(stfrom + lastlt * matchcnt - fixxor, lastlt) == cmatch) || (trailspace && trimd == s.substr(stfrom + lastlt * matchcnt - fixxor, lastlt - 1) && ++fixxor)) matchcnt++;

				if (matchcnt > 2) {
					s = s.substr(0, stfrom) + '<span style="color:grey">' + cmatch.replace(/\n$/, '') + ' * ' + matchcnt + ' </span>' + s.substr(stfrom + lastlt * matchcnt - fixxor);
					changed = true;
					break;
				}
			}
			if (changed) post.innerHTML = s.replace(/\n/g, '<br>');
			setTimeout(arguments.callee, 0, n + 1);
		})(0);
	}

	// >> FIX
	if (config[28]) for (var xp = document.evaluate('.//p/text()', container, null, 6, null), t, i = 0, numRE = /№(\d+)/; t = xp.snapshotItem(i); i++) {
			var remains =  t.textContent, st, matched = false, op = document.evaluate('ancestor::div', t, null, 8, null).singleNodeValue.id.substr(7);
			while ((st = remains.search(numRE)) != -1) {
				t.parentNode.insertBefore(document.createTextNode(remains.substr(0, st)), t);
				with (t.parentNode.insertBefore(document.createElement('a'), t))
					textContent = '>>' + RegExp.$1, href = (RegExp.$1 == op ? '#' : '#reply') + RegExp.$1, setAttribute('onclick', 'highlight(' + RegExp.$1 + ')');
				matched = true;
				remains = remains.substr(st + RegExp.$1.length + 1);
			}
			if (matched) t.textContent = remains;
	}

	// MU MP3 PLAYER
	if (config[9] && (url_[0] == 'mu')) {
		for (var xp = document.evaluate('.//img[@src="/mu/icons/audio-mp3.png"]', container, null, 6, null), mp3, i = 0; mp3 = xp.snapshotItem(i); i++) {
			var pl = document.createElement('embed');
			with (pl)
				src = 'http://2-ch.ru/mu/mediaplayer.swf',
				setAttribute('flashvars', 'type=mp3&file=' + escape(mp3.parentNode.href)),
				width = 320,
				height = 20;
			mp3.parentNode.parentNode.replaceChild(pl, mp3.parentNode);
		}
	}

	// IMAGES HANDLING
	if (config[8]) {
		if (typeof actimgs == 'undefined') var actimgs = [], imghnd = function(e) {
			e.preventDefault();
			this.style.display = 'none';
			if(actimgs.indexOf(this) >= 0) {
				this.previousSibling.style.display = 'block';
				this.parentNode.parentNode.width = "100%";
				setTimeout(function(x) { x.removeAttribute('width'); }, 0, this.parentNode.parentNode);
			} else {
				actimgs.push(this);
				var full = document.createElement('img'), size = this.parentNode.parentNode.getElementsByTagName('em')[0].textContent.match(/\d+/g);
				with (full) src = this.parentNode.href, className = 'thumb', width = size[1], height = size[2], addEventListener('click', function(e) {
					e.preventDefault();
					this.style.display = 'none';
					this.nextSibling.style.display = 'block';
				}, true);
				this.parentNode.insertBefore(full, this);
				this.parentNode.parentNode.width = "100%";
				this.parentNode.parentNode.height = "100%";
				setTimeout(function(x) { x.removeAttribute('width'); }, 0, this.parentNode.parentNode);
			}
		};
		var imgs = container.getElementsByTagName('img');
		for (var i = 0, img; img = imgs[i]; i++) {
			if (img.getAttribute('profit') || img.src.indexOf('/thumb/') == -1) continue;
			img.addEventListener('click', imghnd, true);
			img.setAttribute('profit', 1);
		}
	}

	// FLASH
	if (config[10] && (url_[0] == 'f')) {
		for (var xp = document.evaluate('.//img[@src="/f/icons/flash.png"]', container, null, 6, null), fl, i = 0; fl = xp.snapshotItem(i); i++) {
			var lk = document.createElement('img');
			lk.src = '/f/wakaba.ico';
			lk.style.cssText = 'border:1px solid #f60;position:absolute;visibility:hidden';
			lk.addEventListener('mouseout', function(e) {
				if(e.relatedTarget != this.nextSibling) this.style.visibility = 'hidden';
			}, false);
			lk.addEventListener('click', function(e) {
				e.preventDefault();
				var state = this.getAttribute('state'), postbody = this.parentNode.parentNode.getElementsByTagName('blockquote')[0];
				switch (state) {
					case null:
						var pl = document.createElement('embed'), fsrc = this.parentNode.href;
						with (pl) src = fsrc, id = 'f' + src.substr(25, 13), width = config[11], height = config[12];
						with (postbody) insertBefore(pl, firstChild);
						this.setAttribute('state', '1');
						break;
					default:
						with (postbody) removeChild(firstChild);
						this.removeAttribute('state');
				}
			}, false);
			fl.parentNode.insertBefore(lk, fl);
			fl.addEventListener('mouseover', function() {
				with (this.previousSibling.style) visibility = 'visible', left = this.x + 68 + 'px', top = this.y + 'px';
			}, false);
			fl.addEventListener('mouseout', function(e) {
				if(e.relatedTarget != this.previousSibling) this.previousSibling.style.visibility = 'hidden';
			}, false);
		}
	}

	// ANCHORS MOUSEOVER
	if (config[14]) {
		for (var anc = document.evaluate('.//a[starts-with(@onclick,"highlight")]', delform, null, 6, null), an, i = 0; an = anc.snapshotItem(i); i++) {
			an.addEventListener('mouseover', hover_anc, false);
			an.addEventListener('mouseout', remove_anc, false);
			an.addEventListener('click', followhash, false);
	//		if ($('reply' + an.textContent.substr(2)) || $('thread-' + an.textContent.substr(2))) an.href = an.hash || '#' + an.textContent.substr(2);
		}
		if (url_[0] == 'o')
			for (var anc = document.evaluate('.//small/a', delform, null, 6, null), an, i = 0; an = anc.snapshotItem(i); i++) {
				an.addEventListener('mouseover', hover_img, false);
				an.addEventListener('mouseout', remove_anc, false);
			}
	}

	// FIX № LINKS
	if (config[29] && url_[1] != 'res') for (var xp = document.evaluate(".//a[starts-with(text(),'№')]", container, null, 6, null), i = 0; elt = xp.snapshotItem(i); i++)
		elt.addEventListener('click', inslk, false);
}

// ANCHORS MOUSEOVER FUNCTIONS
if (config[14]) {
	var hover_anc = function() {
		var tip, ptr = this.textContent.substr(2), thr = $('thread-' + ptr);
		if (thr) {
			tip = document.createElement('div');
			for (var celt = thr.firstChild; (celt.tagName != 'TABLE') && (celt.className != 'omittedposts'); celt = celt.nextSibling) {
				if (celt.nodeType == 3) continue;
				tip.appendChild(celt.cloneNode(true));
			}
			tip.className = 'reply'; tip.style.cssText = 'padding:0 8px 0 0;background-color:#eee;max-width:75%'
		}
		else {
			if (tip = $('reply' + ptr))
				tip = tip.parentNode.parentNode.parentNode.cloneNode(true), tip.rows[0].cells[1].id = '';
			else {
				tip = document.createElement('div'); tip.className = 'reply'; tip.textContent = config[15] ? '...' : 'Ссылка на другую страницу.';
				var addr = this.pathname.match(/\d+/);
				config[15] && loadajax(addr, function(error) { tip.innerHTML = error || threads[addr][ptr] || 'Пост, видимо, запилен.'; });
			}
		}
		var offl = offs(this, "offsetLeft") + this.offsetWidth + 5;
		with (tip.style) position = 'absolute', top = offs(this, "offsetTop") + 'px', left = offl + 'px', fontSize = '80%';
		tip.id = 'pop' + ptr;
		document.body.appendChild(tip);
		if (parseInt(getComputedStyle(tip, '').right) < document.body.clientWidth / 4) tip.width = document.body.clientWidth * .75 - offl;
	}, remove_anc = function() {
		document.body.removeChild($('pop' + (this.textContent.substr(2))));
	}, followhash = function(e) {
		var ptr = this.textContent.substr(2);
		if ($('reply' + ptr) || $('thread-' + ptr)) e.preventDefault(), location.hash = this.hash || '#' + ptr;
	};
	if (url_[0] == 'o') {
		var hover_img = function() {
			var tip = document.createElement('div'), src = this.textContent;
			with (tip.style) position = 'absolute', top = (offs(this, "offsetTop")+ this.offsetHeight + 5) + 'px', left = offs(this, "offsetLeft") + 'px', padding = '5px';
			tip.className = 'reply';
			tip.innerHTML = '<img alt="" src="' + src.substr(0, src.indexOf('/', 1)) + '/thumb/' + src.substr(7, src.length - 11) + 's.jpg"/>';
			tip.id = 'pop' + src.substr(2);
			document.body.appendChild(tip);
		};
	}
}

// ajax GET function for anchors & threads, incl. cache handling
if (config[15] || config[23] || config[24] || config[29]) var threads = {}, serialize = function(tid, text) {
	text = text.substring(text.indexOf('<div id="thread'), text.indexOf('</div>', text.lastIndexOf('</blockquote>'))).split('<table>');
	threads[tid] = {keys: []};

	for (var i = 0; i < text.length; i++) {
//			alert(text[i]);
		var key = text[i].match(/\d+/);//[0];
		threads[tid].keys.push(parseInt(key));
		threads[tid][key] = text[i].substring(text[i].indexOf(key) + key.length + 2, text[i].lastIndexOf('</blockquote') + 13);
	}
}, loadajax = function(addr, callback, cparams) {
	// callback(error, params);
	if (addr in threads) {
		callback(null, cparams);
		return;
	}
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				serialize(addr, xhr.responseText);
				callback(null, cparams);
			}
			else
				callback('Запрос запилен! HTTP ' + xhr.status + ' ' + xhr.statusText);
		}
	};
	xhr.open('GET', '/' + url_[0] + '/res/' + addr + '.html', true);
	xhr.send(null);
}, fillthread = function(thr, src) {
	var tbls = thr.getElementsByTagName('table'), tgt = 0, newtbl, tid = parseInt(thr.id.substr(7));
	for (var i = 0; i < tbls.length; i++) {
		var tblid = parseInt(tbls[i].rows[0].cells[1].id.substr(5));
		if ((tblid < threads[tid].keys[src]) || document.evaluate('.//div[@class="abbrev"]', tbls[i], null, 8, null).singleNodeValue) {
			thr.removeChild(tbls[i]);
			i--;
			continue;
		}
		while (tblid > threads[tid].keys[src]) {
			newtbl = document.createElement('table');
			newtbl.innerHTML = '<tbody><tr><td class="doubledash"></td><td class="reply" id="reply' + threads[tid].keys[src] + '">' + threads[tid][threads[tid].keys[src]] + '</td></tr></tbody>';
			thr.insertBefore(newtbl, tbls[i]);
			i++, src++;
		}
		src++;
	}
	for (i--; src < threads[tid].keys.length; src++) {
		newtbl = document.createElement('table');
		newtbl.innerHTML = '<tbody><tr><td class="doubledash"></td><td class="reply" id="reply' + threads[tid].keys[src] + '">' + threads[tid][threads[tid].keys[src]] + '</td></tr></tbody>';
		thr.insertBefore(newtbl, i > 0 ? tbls[i].nextSibling : thr.lastChild);
	}
	mainLoop(thr);
};

// QUICK REPLY
if (config[29] && (url_[1] != 'res')) {
	var createform = function(e) {
		e.preventDefault();
		var tid = this.parentNode.parentNode.id.substr(7);
		switch (this.textContent) {
			case 'Ответить':
				this.textContent = 'Отмена';
				var nocap = ($n('captcha') == null),
					dummyfrm = delform.insertBefore(document.createElement('div'), $('thread-' + tid).nextSibling),
					realfrm = document.body.appendChild(document.createElement('div'));
				dummyfrm.innerHTML = '<table class="reply"><tbody><tr><td class="postblock">Имя</td><td colspan="3"><input type="text" name="' + host_strings.name[location.host] + '" size="28"/></td></tr><tr><td class="postblock">E-mail</td><td colspan="3"><label><input type="checkbox" name="' + host_strings.email[location.host] + '" value="sage" style="margin-left:0pt;padding-left:0pt"/> sage</label></td></tr><tr><td class="postblock">Тема</td><td colspan="3"><input type="text" name="' + host_strings.topic[location.host] + '" size="35"/></td></tr><tr><td class="postblock">Комментарий</td><td colspan="3"><textarea name="' + host_strings.message[location.host] + '" ' + (config[20] ? 'style="width: ' + config[21] + 'px;height:' + config[22] + 'px' : 'cols="60" rows="6') + '" id="txt' + tid + '"></textarea></td></tr>'+ ({'r': 1, 'd': 1}[url_[0]] ? '' : '<tr><td class="postblock">Файл</td><td colspan="3"><input type="file" name="file" size="35"/></td></tr>') + (nocap ? '' : '<tr><td class="postblock">Подтверждение</td><td><input type="text" name="captcha" size="10" id="cap' + tid + '"/></td><td rowspan="2"><img alt="" src="/cgi-bin/captcha.pl/' + url_[0] + host_strings.capurl[location.host] + '?key=res' + tid + '&dummy=" id="imgcap' + tid + '"/></td><td rowspan="2" valign="middle"><input type="submit" value="Отправить" id="submit' + tid + '"/></td></tr>') + '<tr><td class="postblock">Пароль</td><td><input type="text" name="password" size="8" value="' + $n('password').value + '"/></td>' + (nocap ? '<td colspan="2" align="right"><input type="submit" value="Отправить" id="submit' + tid + '"/></td>' : '') + '</tr></tbody></table>';
				dummyfrm.style.cssText = 'float:left;clear:both';
				dummyfrm.id = 'dummy' + tid;
				realfrm.innerHTML = '<form action="/cgi-bin/wakaba.pl/' + url_[0] + '" method="post" enctype="multipart/form-data" target="replytgt' + tid + '"><input type="hidden" name="task" value="post"/><input type="hidden" name="' + host_strings.gb2[location.host] + '"/><input type="hidden" name="parent" value="' + tid + '"/><input name="' + host_strings.name[location.host] + '"/><input name="' + host_strings.email[location.host] + '"/><input name="' + host_strings.topic[location.host] + '"/><textarea name="' + host_strings.message[location.host] + '"></textarea>'+ (nocap ? '' : '<input name="captcha"/>') + '<input name="password"/></form><iframe name="replytgt' + tid + '" src="about:blank"></iframe>';
				realfrm.style.display = 'none';
				realfrm.id = 'rpl' + tid;
				$('submit' + tid).addEventListener('click', function(e) {
					e.preventDefault();
					var form = realfrm.firstChild, file = form.elements.namedItem('file');
					if (file) form.removeChild(file);
					for (var xp = document.evaluate('.//input[@name]|.//textarea', dummyfrm, null, 6, null), i = 0; elt = xp.snapshotItem(i); i++) {
						if (elt.type != 'file') form.elements.namedItem(elt.name).value = (elt.type == 'checkbox' ? (elt.checked ? elt.value : '' ) : elt.value);
						else form.appendChild(elt.cloneNode(true));
					}
					form.submit();
				}, false);
				// usual form stuff
				if (!nocap) {
					$('cap' + tid).addEventListener ('keypress', caphnd, false);
					$('imgcap' + tid).addEventListener ('click', capclk, false);
				}
				$('txt' + tid).addEventListener('keypress', textfunc, false);
				break;
			default:
				delform.removeChild($('dummy' + tid));
				document.body.removeChild($('rpl' + tid));
				this.textContent = 'Ответ';
		}
	}, iframeload = function(e) {
		var frm = e.originalTarget.contentDocument, tid = e.originalTarget.parentNode.id.substr(3), thr = frm.getElementById('thread-' + tid), thrdiv = $('thread-' + tid), hascap = ($n('captcha') != null),
			rplhnd = $('rplhnd' + tid);
		if (frm.location == 'about:blank') return;
		if (elt = frm.getElementsByTagName('h1')[0]) {
			alert(elt.firstChild.textContent);
			frm.location.replace('about:blank');
			if (hascap) with ($('dummy' + tid).firstChild.rows[{'r': 4, 'd': 4}[url_[0]] || 5]) {
				cells[1].firstChild.value = '';
				clickme(cells[2].firstChild);	
			}
			return;
		}
		serialize(tid, thr.parentNode.innerHTML);
		// delete form
		clickme(rplhnd);
		fillthread(thrdiv, rplhnd.parentNode.textContent.indexOf('Пропущено') == -1 ? 1 : threads[tid].keys.length - (url_[0] == 'b' ? 5 : 10));
	};
	for (var thrdivs = document.evaluate('div', delform, null, 6,null), i = 0, thr; thr = thrdivs.snapshotItem(i); i++) {
		with (thr.appendChild(document.createElement('div'))) {
			className = 'omittedposts';
			innerHTML = '[<a href="/' + url_[0] + '/res/' + thr.id.substr(7) + '.html" id="rplhnd' + thr.id.substr(7) + '">Ответ</a>]';
			childNodes[1].addEventListener('click', createform, false);
		}
	}
	window.addEventListener('DOMFrameContentLoaded', iframeload, false);
	// FIX № LINKS
	var inslk = function(e) {
		if (typeof(e) == 'object') e.preventDefault();
		var thr = document.evaluate('ancestor::div', this, null, 8, null).singleNodeValue, tid = thr.id.substr(7), rpl = $('rpl' + tid);
		if (!rpl) clickme($('rplhnd' + tid)), rpl = $('dummy' + tid);
		with ($('txt' + tid))
			value = value.substr(0, selectionStart) + '>>' + this.textContent.substr(1) + '\n' + value.substr(selectionStart);
	};
}

// LOAD FULL THREAD
if (config[23] && (url_[1] != 'res')) {
	var ldhnd = function(e) {
		e.preventDefault();
		var thrdiv = this.parentNode.parentNode, tid = thrdiv.id.substr(7),
			lkspos = ldlks.indexOf(this), mirr = ldlks[lkspos % 2 ? lkspos - 1 : lkspos + 1];
		switch (this.textContent) {
		case '...': return;
		case 'Свернуть':
			var limit = (url_[0] == 'b' ? 5 : 10), omitted = threads[tid].keys.length - 1 - limit, pics = 0;
			mirr.textContent = this.textContent = 'Развернуть тред';
			for (var currpls = thrdiv.getElementsByTagName('table'); currpls.length > limit;) {
				if (currpls[0].getElementsByTagName('img').length) pics++;
				thrdiv.removeChild(currpls[0]);
			}
			this.previousSibling.textContent = mirr.previousSibling.textContent = 'Пропущено ' + omitted + ' ответов' + (pics ? ', из них ' + pics + ' с изображениями. [' : '. [');
			if (lkspos % 2) window.scroll(window.scrollX, this.offsetTop);
			break;
		default:
			this.textContent = '...';
			var ts = this;
			loadajax(tid, function(error) {
				if (error) { alert(error); return; }
				var tbls = thrdiv.getElementsByTagName('table'), tgt = 0, newtbl;
				fillthread(thrdiv, 1);
				mirr.textContent = ts.textContent = 'Свернуть';
				mirr.previousSibling.textContent = ts.previousSibling.textContent = 'Тред развёрнут. [';
				if (lkspos % 2) window.scroll(window.scrollX, mirr.offsetTop);
			});
		}
	}, ldlks = [];
	for (var oms = document.evaluate('.//span[@class="omittedposts"]', delform, null, 6, null), i = 0, om; om = oms.snapshotItem(i); i++) {
		var thr = om.parentNode, oldtxt = om.innerHTML, fixdHTML = oldtxt.substr(0, oldtxt.indexOf('.')) + '. [<a href="/' + url_[0] + '/res/' + thr.id.substr(7) + '.html">Развернуть тред</a>]',
			mirr = config[29] ? thr.childNodes[thr.childNodes.length - 1] : thr.appendChild(document.createElement('div'));
		om.innerHTML = fixdHTML;
		om.childNodes[1].addEventListener('click', ldhnd, false);
		ldlks.push(om.childNodes[1].wrappedJSObject);
		with (mirr) {
			if (config[29]) {
				var x = childNodes[1];
				innerHTML = fixdHTML + ' [<i></i>]';
//				replaceChild(x, childNodes[3]);
			}
			else className = 'omittedposts', innerHTML = fixdHTML;
			//ldlks[ldlks.length] = childNodes[1].wrappedJSObject;
			//childNodes[1].addEventListener('click', ldhnd, false);
		}
	}
}

mainLoop(delform);

// LONGCOMMENT IS LONG
if (config[24] && (url_[1] != 'res')) {
	var longhnd = function(e) {
		e.preventDefault();
		if (this.textContent == '...') return;
		this.textContent = '...'
		var addr = this.pathname.match(/\d+/g), tgt = this.parentNode.parentNode, ptr = this.hash.substr(1) || addr;
		loadajax(addr, function(error) {
			if (error) { alert(error); return; }
			tgt.innerHTML = threads[addr][ptr].substring(threads[addr][ptr].indexOf('<blockquote') + 12, threads[addr][ptr].lastIndexOf('</blockquote>'));
			mainLoop(tgt);
		});
	};
	for (var abbs = document.evaluate('.//div[@class="abbrev"]', delform, null, 6, null), i = 0, abb; abb = abbs.snapshotItem(i); i++)
		abb.childNodes[1].addEventListener('click', longhnd, false);
}