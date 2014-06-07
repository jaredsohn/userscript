// ==UserScript==
// @name		Govno 2.6
// @version		2.6.1
// @description	Govno 2.6 imgboard script
// @namespace	http://bit.ly/govno3
// @include		*0chan.ru*
// @include		*2-ch.ru*
// @include		*iichan.ru*
// @include		*dobrochan.ru*
// @include		*wakachan.org*
// @include		*nowere.net*
// @include		*uchan.org.ua*
// @include		*sibirchan.ru*
// @match		http://0chan.ru/*
// @match		http://2-ch.ru/*
// @match		http://iichan.ru/*
// @match		http://dobrochan.ru/*
// @match		http://wakachan.org/*
// @match		http://nowere.net/*
// @match		http://uchan.org.ua/*
// @match		http://sibirchan.ru/*
// @match		http://*.0chan.ru/*
// @match		http://*.2-ch.ru/*
// @match		http://*.iichan.ru/*
// @match		http://*.dobrochan.ru/*
// @match		http://*.wakachan.org/*
// @match		http://*.nowere.net/*
// @match		http://*.uchan.org.ua/*
// @match		http://*.sibirchan.ru/*

// ==/UserScript==

(function() {
var defaultCfg = [
	1,		// 0	anti-wipe detectors
	0,		// 1	hide posts with sage
	0,		// 2	hide posts with theme
	0,		// 3	hide posts without text
	0,		// 4	hide posts without img
	0,		// 5	-
	0,		// 6	hide post names
	1,		// 7	text format btns
	0,		// 8	hide posts by text size
	500,	// 9		text size in symbols
	0,		// 10	hide posts by regexp
	1,		// 11	additional hider menu
	0,		// 12	process hidden posts (0=no, 1=merge, 2=full hide)
	1,		// 13	apply filter to threads
	1,		// 14	fast hidden posts preview
	1,		// 15	>>links map
	1,		// 16	'quick reply' btns
	1,		// 17	'add to favorities' btns
	0,		// 18	show btns as text
	1,		// 19	show SAGE in posts
	2,		// 20	2-ch captchas (0,1,2)
	1,		// 21	hide board rules
	1,		// 22	hide 'goto' field
	2,		// 23	expand images (0=no, 1=simple, 2=+preview)
	1,		// 24	expand shorted posts
	1,		// 25	hide scrollers in posts
	1,		// 26	>>links preview
	1,		// 27	YouTube player
	1,		// 28	mp3 player
	0,		// 29	move replyform down
	530,	// 30	textarea width
	140,	// 31	textarea height
	0,		// 32	reply with SAGE
	0,		// 33	apply user password
	'',		// 34		user password value
	0,		// 35	apply user name
	'',		// 36		user name value
	2,		// 37	upload new posts (0=no, 1=by click, 2=auto)
	1,		// 38	reply without reload (verify on submit)
	1,		// 39	open spoilers
	1,		// 40	hide password field
	1		// 41	email field -> sage btn
],

Cfg = [],
Visib = [],
Posts = [],
oPosts = [],
Expires = [],
postByNum = [],
ajaxPosts = {},
ajaxThrds = [],
doc = document,
HIDE = 1,
UNHIDE = 0,
STORAGE_LIFE = 259200000; // 3 days

/*=============================================================================
									UTILS
=============================================================================*/

function $X(path, rootNode) {
	return doc.evaluate(path, rootNode || doc, null, 6, null);
}
function $x(path, rootNode) {
	return doc.evaluate(path, rootNode || doc, null, 8, null).singleNodeValue;
}
function $id(id) {
	return doc.getElementById(id);
}
function $n(name) {
	return doc.getElementsByName(name)[0];
}
function $next(el) {
	do el = el.nextSibling;
	while(el && el.nodeType != 1);
	return el;
}
function $prev(el) {
	do el = el.previousSibling;
	while(el && el.nodeType != 1);
	return el;
}
function $up(el, i) {
	if(!i) i = 1;
	while(i--) el = el.parentNode;
	return el;
}
function $each(list, fn) {
	if(!list) return;
	var i = list.snapshotLength;
	if(i > 0) while(i--) fn(list.snapshotItem(i), i);
}
function $html(el, html) {
	var cln = el.cloneNode(false);
	cln.innerHTML = html;
	el.parentNode.replaceChild(cln, el);
	return cln;
}
function $attr(el, attr) {
	for(var key in attr) {
		if(key == 'html') {el.innerHTML = attr[key]; continue}
		if(key == 'text') {el.textContent = attr[key]; continue}
		if(key == 'value') {el.value = attr[key]; continue}
		el.setAttribute(key, attr[key]);
	}
	return el;
}
function $event(el, events) {
	for(var key in events)
		el.addEventListener(key, events[key], false);
}
function $revent(el, events) {
	for(var key in events)
		el.removeEventListener(key, events[key], false);
}
function $append(el, childs) {
	var child;
	for(var i = 0, len = childs.length; i < len; i++) {
		child = childs[i];
		if(child) el.appendChild(child);
	}
}
function $before(el, inserts) {
	for(var i = 0, len = inserts.length; i < len; i++)
		if(inserts[i]) el.parentNode.insertBefore(inserts[i], el);
}
function $after(el, inserts) {
	var i = inserts.length;
	while(i--)
		if(inserts[i]) el.parentNode.insertBefore(inserts[i], el.nextSibling);
}
function $new(tag, attr, events) {
	var el = doc.createElement(tag);
	if(attr) $attr(el, attr);
	if(events) $event(el, events);
	return el;
}
function $New(tag, childs, attr, events) {
	var el = $new(tag, attr, events);
	$append(el, childs);
	return el;
}
function $txt(el) {
	return doc.createTextNode(el);
}
function $if(cond, el) {
	if(cond) return el;
}
function $del(el) {
	if(el) el.parentNode.removeChild(el);
}
function delNexts(el) {
	while(el.nextSibling) $del(el.nextSibling);
}
function delChilds(el) {
	while(el.hasChildNodes()) el.removeChild(el.firstChild);
}
function toggleDisp(el) {
	el.style.display = (el.style.display != 'none') ? 'none' : '';
}
function toggleChk(box) {
	box.checked = !box.checked
}
function getOffset(a, b) {
	var c = 0;
	while (a) {c += a[b]; a = a.offsetParent}
	return c;
}
function rand10() {
	return Math.floor(Math.random()*1e10).toString(10);
}
function incc(arr, w) {
	if(arr[w]) arr[w] += 1;
	else arr[w] = 1;
}
function InsertInto(x, text) {
	var start = x.selectionStart;
	var end = x.selectionEnd;
	x.value = x.value.substr(0, start) + text + x.value.substr(end);
	x.setSelectionRange(start + text.length, start + text.length);
	x.focus();
}
String.prototype.trim = function() {
	var str = this.replace(/^\s\s*/, '');
	var i = str.length;
	while(/\s/.test(str.charAt(--i)));
	return str.substring(0, i + 1); 
};
function txtSelection() {
	return nav.Opera ? doc.getSelection() : window.getSelection().toString();
}

var jsonParse = function() {var u={'"':'"','/':'/','\\':'\\','b':'\b','f':'\f','n':'\n','r':'\r','t':'\t'};function v(h,j,e){return j?u[j]:String.fromCharCode(parseInt(e,16))}var w=new String(""),x=Object.hasOwnProperty;return function(h,j){h=h.match(new RegExp('(?:false|true|null|[\\{\\}\\[\\]]|(?:-?\\b(?:0|[1-9][0-9]*)(?:\\.[0-9]+)?(?:[eE][+-]?[0-9]+)?\\b)|(?:\"(?:[^\\0-\\x08\\x0a-\\x1f\"\\\\]|\\\\(?:[\"/\\\\bfnrt]|u[0-9A-Fa-f]{4}))*\"))','g'));var e,c=h[0],l=false;if("{"===c)e={};else if("["===c)e=[];else{e=[];l=true}for(var b,d=[e],m=1-l,y=h.length;m<y;++m){c=h[m];var a;switch(c.charCodeAt(0)){default:a=d[0];a[b||a.length]=+c;b=void 0;break;case 34:c=c.substring(1,c.length-1);if(c.indexOf('\\')!==-1)c=c.replace(new RegExp('\\\\(?:([^u])|u(.{4}))','g'),v);a=d[0];if(!b)if(a instanceof Array)b=a.length;else{b=c||w;break}a[b]=c;b=void 0;break;case 91:a=d[0];d.unshift(a[b||a.length]=[]);b=void 0;break;case 93:d.shift();break;case 102:a=d[0];a[b||a.length]=false;b=void 0;break;case 110:a=d[0];a[b||a.length]=null;b=void 0;break;case 116:a=d[0];a[b||a.length]=true;b=void 0;break;case 123:a=d[0];d.unshift(a[b||a.length]={});b=void 0;break;case 125:d.shift();break}}if(l){if(d.length!==1)throw new Error;e=e[0]}else if(d.length)throw new Error;if(j){var p=function(n,o){var f=n[o];if(f&&typeof f==="object"){var i=null;for(var g in f)if(x.call(f,g)&&f!==n){var q=p(f,g);if(q!==void 0)f[g]=q;else{i||(i=[]);i.push(g)}}if(i)for(g=i.length;--g>=0;)delete f[i[g]]}return j.call(n,o,f)};e=p({"":e},"")}return e}}();

function Log(txt) {
	var newTime = (new Date()).getTime();
	timeLog += '\n' + txt + ': ' + (newTime - oldTime).toString() + 'ms';
	oldTime = newTime;
}

/*=============================================================================
								STORAGE / CONFIG
=============================================================================*/

function setCookie(name, value, life) {
	if(!name) return;
	var life = (life == 'delete') ? -10 : STORAGE_LIFE;
	var date = (new Date((new Date()).getTime() + life)).toGMTString();
	doc.cookie = escape(name) + '=' + escape(value) + ';expires=' + date + ';path=/';
}

function getCookie(name) {
	var arr = doc.cookie.split('; ');
	var i = arr.length;
	while(i--) {
		var one = arr[i].split('=');
		if(one[0] == escape(name)) return unescape(one[1]);
	}
}

function turnCookies(name) {
	var max = ch._0ch ? 10 : 15;
	var data = getCookie(ID('Cookies'));
	var arr = data ? data.split('|') : [];
	arr[arr.length] = name;
	if(arr.length > max) {
		setCookie(arr[0], '', 'delete');
		arr.splice(0, 1);
	}
	setCookie(ID('Cookies'), arr.join('|'));
}

function getStored(name) {
	if(sav.GM) return GM_getValue(name);
	if(sav.local) return localStorage.getItem(name);
	return getCookie(name);
}

function setStored(name, value) {
	if(sav.GM) {GM_setValue(name, value); return}
	if(sav.local) {localStorage.setItem(name, value); return}
	setCookie(name, value);
}

function ID(name, pNum) {
	var c = !sav.cookie ? '_' + domain : '';
	if(name == 'Posts' || name == 'Threads')
		return 'DESU_' + name + c + '_' + board + (!pNum ? '' : '_' + pNum);
	if(name == 'Config' || name == 'Cookies' || name == 'RegExpr')
		return 'DESU_' + name + c;
}

function setDefaultCfg() {
	Cfg = defaultCfg;
	setStored(ID('Config'), defaultCfg.join('|'));
}

function saveCfg(num, val) {
	Cfg[num] = val;
	setStored(ID('Config'), Cfg.join('|'));
}

function toggleCfg(num) {
	var cnf = Cfg[num] == 0 ? 1 : 0;
	saveCfg(num, cnf);
}

function initCfg() {
	var data = getStored(ID('Config'));
	if(!data) setDefaultCfg();
	else Cfg = data.split('|');
	if(!getStored(ID('RegExpr')))
		setStored(ID('RegExpr'), '');
}

function getVisib(pNum) {
	var key = !sav.cookie ? board + pNum : postByNum[pNum].Count;
	if(key in Visib) return Visib[key];
	return null;
}

function readPostsVisib() {
	if(!sav.cookie) {
		var data = getStored(ID('Posts'));
		if(!data) return;
		var arr = data.split('-');
		var i = arr.length/3;
		while(i--) {
			if((new Date()).getTime() < arr[i*3 + 2]) {
				Visib[arr[i*3]] = arr[i*3 + 1];
				Expires[arr[i*3]] = arr[i*3 + 2];
			} else setStored(ID('Posts'), arr.splice(i*3, 3).join('-'));
		}
	} else if(!main) {
		var data = getStored(ID('Posts', oPosts[0].Num));
		if(!data) return;
		for(var i = 0, len = data.length; i < len; i++)
			Visib[i + 1] = data[i];
	}
	forAll(function(post) {post.Vis = getVisib(post.Num)});
}

function storePostsVisib() {
	if(!sav.cookie) {
		var arr = [];
		for(var key in Visib)
			arr[arr.length] = key + '-' + Visib[key] + '-' + Expires[key];
		setStored(ID('Posts'), arr.join('-'));
	} else {
		if(!main) {
			var name = ID('Posts', oPosts[0].Num);
			if(!getStored(name)) turnCookies(name);
			setStored(name, Visib.join(''));
		}
	}
}

function readThreadsVisib() {
	var data = getStored(ID('Threads'));
	if(!data) return;
	var arr = data.split('-');
	var ar = [];
	var i = arr.length;
	while(i--) ar[arr[i]] = 1;
	forOP(function(post) {
		if(board + post.Num in ar) {
			hideThread(post);
			post.Vis = HIDE;
		}
	});
}

function storeThreadVisib(post, vis) {
	if(post.Vis == vis) return;
	post.Vis = vis;
	var key = board + post.Num;
	var data = getStored(ID('Threads'));
	var arr = data ? data.split('-') : [];
	if(vis == HIDE) {
		if(sav.cookie && arr.length > 80) arr.splice(0, 1);
		arr[arr.length] = key;
	} else {
		var i = arr.length;
		while(i--) if(arr[i] == key) arr.splice(i, 1);
	}
	setStored(ID('Threads'), arr.join('-'));
}

function storeFavorities(post) {
	var txt = getTitle(post).replace(/\|/g, '');
	txt = !sav.cookie ? txt.substring(0, 70) : txt.substring(0, 25);
	var pNum = post.Num;
	var data = getStored('DESU_Favorities');
	var arr = data ? data.split('|') : [];
	if(sav.cookie && arr.length/4 > 25) return;
	for(var i = 0; i < arr.length/4; i++)
		if(arr[i*4 + 1] == board && arr[i*4 + 2] == pNum) return;
	arr[arr.length] = domain + '|' + board + (/\/arch/.test(location.pathname) ? '/arch|' : '|') + pNum + '|' + txt;
	setStored('DESU_Favorities', arr.join('|'));
}

function removeFavorities(node) {
	var key = node.textContent.replace('arch/', '').replace('res/', '').split('/');
	var arr = getStored('DESU_Favorities').split('|');
	for(var i = 0; i < arr.length/4; i++)
		if(arr[i*4] == key[0] && arr[i*4 + 1].split('/')[0] == key[1] && arr[i*4 + 2] == key[2])
			arr.splice(i*4, 4);
	$del($up(node));
	if(arr.length == 0) $id('favorities_div').firstChild.innerHTML = '<b>Избранные треды отсутствуют...</b>';
	setStored('DESU_Favorities', arr.join('|'));
}


/*=============================================================================
							CONTROLS / COMMON CHANGES
=============================================================================*/

function addControls() {
	var chkBox = function(num, fn, id) {
		if(!fn) fn = toggleCfg;
		var box = $new('input', {'type': 'checkbox'}, {'click': function() {fn(num)}});
		box.checked = Cfg[num] == 1;
		if(id) box.id = id;
		return box;
	},
	trBox = function(num, txt, fn, id) {
		return $New('tr', [chkBox(num, fn, id), $txt(' ' + txt)]);
	},
	optSel = function(id, arr, num, fn) {
		for(var i = 0; i < arr.length; i++)
			arr[i] = '<option value="' + i + '">' + arr[i] + '</option>';
			var x = $new('select', {'id': id, 'html': arr.join('')}, {'change': fn});
			x.selectedIndex = Cfg[num];
			return x;
	};
	
	var postarea = $x('.//div[@class="postarea" or @align="center"]') || delform;
	var txt = '<input type="button" value="';
	var tools = $new('div', {'html': txt+'Настройки"> '+txt+'Скрытое"> '+txt+'Избранное"> '+txt+'Обновить" id="refresh_btn"> ' + (main && postform ? txt+'Создать тред"> ' : '') + '<div><table class="reply" id="controls_div" style="display:none; overflow:hidden; width:370px; min-width:0; border:1px solid grey; margin:5px 0px 5px 20px; padding:5px; font-size:small"><tbody></tbody></table></div> <div id="hiddenposts_div"></div> <div id="favorities_div"></div>'});
	var btn = $X('.//input', tools);
	$event(btn.snapshotItem(0), {'click': function() {
		delChilds($id('hiddenposts_div'));
		delChilds($id('favorities_div'));
		toggleDisp($id('controls_div'));
	}});
	$event(btn.snapshotItem(1), {'click': hiddenPostsPreview});
	$event(btn.snapshotItem(2), {'click': favorThrdsPreview});
	$event(btn.snapshotItem(3), {'click': function(e) {
		window.location.reload();
		e.stopPropagation();
		e.preventDefault();
	}});
	if(main) eventSelMenu(btn.snapshotItem(3), selectAjaxPages);
	if(main && postform) $event(btn.snapshotItem(4), {'click': function() {
		toggleDisp($x('.//div[@class="postarea"]', $up(delform)));
		toggleDisp($prev(delform));
	}});
	$before(postarea, [tools, $new('div', {'class': 'logo'}), $new('hr')]);
	
	$append($x('.//tbody', tools), [
		$new('tr', {'text': 'Govno 2.6', 'style': 'width:100%; text-align:center; font-weight:bold; font-family:sans-serif'}),
		trBox(0, 'Анти-вайп детекторы'),
		$if(!(ch.iich || ch.sib), trBox(1, 'Скрывать sage посты', toggleSage, 'sage_hider')),
		$if(!ch.sib, trBox(2, 'Скрывать посты с полем "Тема"', toggleTitle)),
		trBox(3, 'Скрывать посты без текста', toggleNotext, 'notext_hider'),
		trBox(4, 'Скрывать посты без изображений', toggleNoimage, 'noimage_hider'),
		$New('tr', [
			chkBox(8, toggleMaxtext, 'maxtext_hider'),
			$txt(' Скрывать с текстом более '),
			$new('input', {
				'type': 'text',
				'id': 'maxtext_field',
				'value': Cfg[9],
				'size': 4}, {
				'keypress': function(e) {if(e.which == 13) {e.preventDefault(); e.stopPropagation()}}}),
			$txt(' символов')
		]),
		$New('tr', [
			chkBox(10, toggleRegexp, 'regexp_hider'),
			$txt(' Скрытие по выражению '),
			$new('span', {
				'html': '[<a>?</a>]',
				'style': 'cursor:pointer'}, {
				'click': function() {alert('Поиск в тексте/теме поста:\nвыраж.1\nвыраж.2\n...\n\nРегулярные выражения: $exp выраж.\n$exp /[bб].[tт]+[hх].[rр][tт]/i\n$exp /кукл[оа]([её]б|бляд|быдл)/i\n\nКартинки: $img [<,>,=][вес][@ширxвыс]\n$img <35@640x480\n$img >@640x480\n$img =35\n\nИмя/трипкод: $name [имя][!трипкод][!!трипкод]\n$name Sthephan!ihLBsDA91M\n$name !!PCb++jGu\nЛюбой трипкод: $alltrip')}}),
			$new('input', {
				'type': 'button',
				'value': 'Применить',
				'style': 'float:right'}, {
				'click': applyRegExp}),
			$new('br'),
			$new('textarea', {
				'id': 'regexp_field',
				'value': getStored(ID('RegExpr')),
				'rows': 5,
				'cols': nav.Opera ? 47 : 41})
		]),
		$New('tr', [
			optSel('prochidden_sel', ['Не изменять', 'Объединять', 'Удалять'], 12,
				function() {processHidden(this.selectedIndex, Cfg[12])}),
			$txt(' скрытые посты')
		]),
		trBox(14, 'Быстрый просмотр скрытых постов'),
		trBox(11, 'Дополнительное меню по кнопке скрытия'),
		trBox(13, 'Применять фильтры к тредам'),
		$new('hr'),
		$New('tr', [
			optSel('upload_sel', ['Отключена', 'По клику', 'Авто'], 37,
				function() {saveCfg(37, this.selectedIndex)}),
			$txt(' подгрузка новых постов в треде*')
		]),
		trBox(38, 'Постить без перезагрузки (проверять ответ)*'),
		trBox(15, 'Карта >>ссылок на посты*'),
		trBox(26, 'Просмотр постов по >>ссылкам*'),
		$if(postform, trBox(16, 'Кнопки быстрого ответа*')),
		trBox(17, 'Кнопки добавления в избранное*'),
		$if(!(ch.iich || ch.sib || ch.dc),
			trBox(19, 'Индикатор сажи в постах*')),
		trBox(18, 'Отображать кнопки в виде текста*'),
		trBox(7, 'Кнопки форматирования текста', function() {
			toggleCfg(7);
			$each($X('.//span[@id="txt_btns"]'), function(div) {toggleDisp(div)});
		}),
		$if(wk, $New('tr', [
			optSel('imgexpand_sel', ['Не', 'Обычно', 'С превью'], 23,
				function() {saveCfg(23, this.selectedIndex)}),
			$txt(' раскрывать изображения')
		])),
		$if(wk, trBox(24, 'Раскрывать сокращенные посты*')),
		$if(ch._2ch, trBox(25, 'Убирать прокрутку в постах', function() {toggleCfg(25); scriptStyles()})),
		trBox(6, 'Скрывать имена в постах', function() {toggleCfg(6); scriptStyles()}),
		trBox(39, 'Раскрывать спойлеры', function() {toggleCfg(39); scriptStyles()}),
		trBox(27, 'Плейер к YouTube ссылкам*'),
		trBox(28, 'Плейер к mp3 ссылкам*'),
		$if(Rmail, trBox(41, 'Sage вместо поля E-mail*')),
		$if(postform, trBox(29, 'Форма ответа внизу*')),
		$if(Rname, $New('tr', [
			$new('input', {
				'type': 'text',
				'id': 'usrname_field',
				'value': Cfg[36],
				'size': 20}),
			chkBox(35, toggleUserName, 'usrname_box'),
			$txt(' Постоянное имя')
		])),
		$if(Rpass, $New('tr', [
			$new('input', {
				'type': 'text',
				'id': 'usrpass_field',
				'value': Cfg[34],
				'size': 20}),
			chkBox(33, toggleUserPassw, 'usrpass_box'),
			$txt(' Постоянный пароль')
		])),
		$New('tr', [
			$txt('Не отображать: '),
			$if(Rrules, chkBox(21, function() {toggleCfg(21); toggleDisp(Rrules)})),
			$if(Rrules, $txt(' правила ')),
			$if(Rgoto_tr, chkBox(22, function() {toggleCfg(22); toggleDisp(Rgoto_tr)})),
			$if(Rgoto_tr, $txt(' поле goto ')),
			$if(Rpass, chkBox(40, function() {toggleCfg(40); toggleDisp($up(Rpass, 2))})),
			$if(Rpass, $txt(' пароль '))
		]),
		$if(ch._2ch, $New('tr', [
			$txt(' Количество отображаемых капч* '),
			optSel('capnum_sel', [0, 1, 2], 20, function() {saveCfg(20, this.selectedIndex)})
		])),
		$new('hr'),
		$New('tr', [
			$new('span', {
				'id': 'process_time',
				'title': 'v.2.6.1, storage: ' + (sav.GM ? 'greasemonkey' : (sav.local ? 'localstorage' : 'cookies')),
				'style': 'font-style:italic; cursor:pointer'}, {
				'click': function() {alert(timeLog)}}),
			$new('input', {
				'type': 'button',
				'value': 'Сброс настроек',
				'style': 'float:right'}, {
				'click': function() {setDefaultCfg(); window.location.reload()}})
		])
	]);
}

function hiddenPostsPreview() {
	delChilds($id('favorities_div'));
	$id('controls_div').style.display = 'none';
	var div = $id('hiddenposts_div');
	if(div.hasChildNodes()) {delChilds(div); return}
	div.innerHTML = '<table style="margin:5px 0px 5px 20px"><tbody></tbody></table>'
	var table = $x('.//tbody', div);
	var clones = [], tcnt = 0, pcnt = 0;
	forAll(function(post) {if(post.Vis == HIDE) {
		var pp = !post.isOp;
		var clone = $attr(($x('.//span[@id="hiddenthr_' + post.Num + '"]') || post).cloneNode(true), {'id': '', 'style': 'cursor:default'});
		clones[clones.length] = clone;
		clone.pst = post;
		clone.vis = HIDE;
		$event(pp ? $attr($x('.//span[@id="phide_' + post.Num + '"]', clone), {'id': ''}) : $x('.//a', clone), {
			'click': function(node) {return function() {
				node.vis = (node.vis == HIDE) ? UNHIDE : HIDE;
				if(pp) modPostDisp(node, node.vis);
				else if(node.vis == HIDE) toggleDisp($next(node));
			}}(clone)});
		$event($x('.//span[@class="reflink"]', clone) || $x('.//a', clone), {
			'mouseover': function(node) {return function() {
				if(node.vis == HIDE) {
					if(pp) modPostDisp(node, UNHIDE);
					else $next(node).style.display = 'block';
				}
			}}(clone),
			'mouseout': function(node) {return function() {
				if(node.vis == HIDE) {
					if(pp) modPostDisp(node, HIDE);
					else $next(node).style.display = 'none';
				}
			}}(clone)
		});
		$append(table, [
			$if(!pp && tcnt == 0, $new('tr', {'html': '<b>Скрытые треды:<b>'})),
			$if(pp && pcnt == 0, $new('tr', {'html': '<b>Скрытые посты:<b>'})),
			$New('tr', [clone, $if(!pp, $attr(post.cloneNode(true), {'class': 'reply', 'style': 'display:none'}))])
		]);
		if(!pp) {modPostDisp($next(clone), UNHIDE); tcnt++}
		else pcnt++;
		refPrewiev(clone);
	}});
	if(!table.hasChildNodes()) {table.innerHTML = '<b>Скрытое отсутствует...</b>'; return}
	$append(table.insertRow(-1), [
		$new('input', {
			'type': 'button',
			'value': 'Раскрыть все'}, {
			'click': function() {
				if(/все/.test(this.value)) {
					this.value = 'Вернуть назад';
					for(var clone, i = 0; clone = clones[i++];)
						setPostVisib(clone.pst, UNHIDE);
				} else {
					this.value = 'Раскрыть все';
					for(var clone, i = 0; clone = clones[i++];)
						setPostVisib(clone.pst, clone.vis);
				}
			}}),
		$new('input', {
			'type': 'button',
			'value': 'OK'}, {
			'click': function() {
				for(var clone, i = 0; clone = clones[i++];)
					if(clone.vis != HIDE) setPostVisib(clone.pst, UNHIDE);
				storePostsVisib();
				delChilds(div);
			}})
	]);
}

function favorThrdsPreview() {
	delChilds($id('hiddenposts_div'));
	$id('controls_div').style.display = 'none';
	var div = $id('favorities_div');
	if(div.hasChildNodes()) {delChilds(div); return}
	var data = getStored('DESU_Favorities');
	var table = $new('table', {'style': 'margin:5px 0px 5px 20px'});
	div.appendChild(table);
	if(!data) {table.innerHTML = '<b>Избранные треды отсутствуют...</b>'; return}
	else table.insertRow(-1).appendChild($new('b', {'text': 'Избранные треды:'}));
	table = table.firstChild;
	var arr = data.split('|');
	for(var i = 0; i < arr.length/4; i++) {
		var url = arr[i*4] + '/' + arr[i*4 + 1] + '/res/' + arr[i*4 + 2];
		var title = arr[i*4 + 3];
		if((!sav.cookie && title.length >= 70) || (sav.cookie && title.length >= 25)) title += '..';
		$append(table, [$new('tr', {
			'class': 'reply',
			'id': 'favnote_' + i,
			'style': 'cursor:default',
			'html': '&nbsp;<span class="hide_icn" style="vertical-align:middle"></span> <a href="http://' + url + (arr[i*4] != 'dobrochan.ru' ? '.html">' : '.xhtml">') + url + '</a> - ' + title})]);
		$event($x('.//tr[@id="favnote_' + i + '"]/span'), {'click': function() {removeFavorities($next(this))}});
	}
}

/*-----------------------------Dropdown select menus-------------------------*/

function removeSelMenu(x) {
	if(!$x('ancestor-or-self::*[@id="sel_menu"]', x)) $del($id('sel_menu'));
}

function addSelMenu(id, dx, dy, arr) {
	$before(delform, [$new('div', {
		'class': 'reply',
		'id': 'sel_menu',
		'style': 'position:absolute; left:' + (getOffset($id(id), 'offsetLeft') + dx).toString() + 'px; top:' + (getOffset($id(id), 'offsetTop') + dy).toString() + 'px; z-index:250; cursor:pointer; width:auto; min-width:0; border:solid 1px #575763; padding:0 5px 0 5px',
		'html': '<a>' + arr.join('</a><br><a>') + '</a>'}, {
		'mouseout': function(e) {removeSelMenu(e.relatedTarget)}})]);
	return $X('.//a', $id('sel_menu'));
}

function eventSelMenu(el, fn) {
	$event(el, {'mouseover': fn, 'mouseout': function(e) {removeSelMenu(e.relatedTarget)}});
}

function selectPostHider(post) {
	if(Cfg[11] == 0 || (Cfg[13] == 0 && post.isOp)) return;
	var a = addSelMenu('phide_' + post.Num, 0, 14, ['Скрывать выделенное', 'Скрывать изображение', 'Скрыть схожий текст', 'Скрыть схожие изобр.']);
	$event(a.snapshotItem(0), {
			'mouseover': function() {quotetxt = txtSelection().trim()},
			'click': function() {applyRegExp(quotetxt)}});
	$event(a.snapshotItem(1), {'click': function() {regExpImage(post)}});
	$event(a.snapshotItem(2), {'click': function() {hideBySameText(post)}});
	$event(a.snapshotItem(3), {'click': function() {hideBySameImage(post)}});
}

function selectExpandThread(post) {
	var p = ' постов';
	$each(addSelMenu('expthrd_' + post.Num, 0, 14, [5+p, 15+p, 30+p, 50+p, 100+p]),
		function(a) {$event(a, {'click': function() {ajaxExpandThread(post, parseInt(this.textContent))}})});
}

function selectAjaxPages() {
	var p = ' страниц';
	$each(addSelMenu('refresh_btn', 2, 21, [1+p+'а', 2+p+'ы', 3+p+'ы', 4+p+'ы', 5+p]),
		function(a, i) {$event(a, {'click': function() {ajaxPages(i + 1)}})});
}

/*-------------------------------Changes in postform-------------------------*/

function capRefresh(img) {
	img.src = img.src.replace(/dummy=\d*/, 'dummy=' + rand10());
}

function capRefresh_2ch(img) {
	$each($X('.//img', $up(img)), function(cap) {capRefresh(cap)});
}

function getCaptcha(isMain, tNum) {
	if(!isMain && !tNum) tNum = oPosts[0].Num;
	return $new('img', {
		'id': 'imgcaptcha',
		'style': 'display:block',
		'alt': 'загрузка..',
		'src': (!isMain
			? '/' + board + '/captcha.pl?key=res' + tNum + '&amp;dummy=' + rand10()
			: '/' + board + '/captcha.pl?key=mainpage&amp;dummy=' + rand10())}, {
		'click': function() {capRefresh_2ch(this)}});
}

function forceCaptcha(e) {
	if(e.which == 0 || ch.dc) return;
	var code = e.charCode || e.keyCode;
	var ru = 'йцукенгшщзхъфывапролджэячсмитьбюё';
	var en = 'qwertyuiop[]asdfghjkl;\'zxcvbnm,.`';
	var chr = String.fromCharCode(code).toLowerCase();
	var i = en.length;
	if(wk) {
		if(code < 0x0410 || code > 0x04FF) return;
		while(i--) if(chr == ru[i]) chr = en[i];
	}
	if(ch._0ch) {
		if(code < 0x0021 || code > 0x007A) return;
		while(i--) if(chr == en[i]) chr = ru[i];
	}
	e.preventDefault();
	InsertInto(e.target, chr);
}

function sageBtnFunc(mail, form) {
	var s = Cfg[32] == 1;
	var sage = $x('.//span[@id="sage_btn"]', form);
	if(Cfg[32] == 0) {
		sage.innerHTML = '<i>(без сажи)</i>';
		sage.style.color = '';
		if(mail.type == 'text') mail.value = '';
		else mail.checked = false;
	} else {
		sage.innerHTML = '&nbsp;<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAbCAYAAABr/T8RAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kKDxYYNFAyXJ4AAAb9SURBVEjHnZbLb1xXHcc/5z7n3jtP2+Oxx+NXIuokbiCpAKWgIktQtRUrFskOiQXiP2CHVPdvYMGCJUJISTcIqRIsigUNFWpRkqZ+pLYTJ/Fj7JnxvOe+5t7DYsap82qhRzrSkc495/P7/u7vcYSUEoQQLCPYRyVAxUABICCmS7xSIV5aImYZiZSSZ8fp8yYKO6iHWQRA3ED6o8RzBhFFopM7hATBVRRKGK0qtq5ih31MU0WaJmE3xncUPBwCuvRPH34CvYoCGKSxXA9b0TCRqIN9oljHtyQ9WrhAwA1iIZdRWMWsmGSloOD6FKVCxtLAUujYBo0YmnGfViKmzSi9lVuESytEAFxFIYdJj0xXpeCHTISQNVQMAF3gImiEIRXDoOzkaLJLoLGPyhgJy2Ws7nF+1+VSw6dkqig5g0bG4NDUKFuwHyfYtWscLl2gSZ6AHBIXgz6Z0KTk+pzb7fFqJ6JoKegAmkIXKKsqGzmBiGuEqRx9DROlVyfRVxjzfM41D3jjWE8V+1IaTVX66bTdTpviSJO19Vk1uqNo3BMee2GStmwjdRtHjZj0Ys5XeuLKkZf53pGvjieVWE2LKA4819vww8pMBmchw/FIiioBXQ1AKChCoOVdcmfr5mzrh2+NB16oqF4PY3oq7srO/KdrHxRUpZeetkkmVNKmShUbGUTkQslcxeOS17W+/5PpN15xU8WE1+kKtdOR5e3N+G+PVzMpkx2RxRYR2oGFolFGWglCVNyKQ+XPKb/y+/ffz+/0BpFtgDKn41zKc2ZxHiMcI1WwmEjqVIiRbsxozWd+o8aicr93Rv7jA+vXvhRbcYwNYiwB356jO5OintTxvIg4qiM1KsS8gq+GHGcsHkxOsOZUKNUDRnr9QUo8CBGTVSxTMNPvkUpmmC9Y1BWBrLpkem3Gm0eMzgYZ65duU9waZllJhfEs7usT7MwmeZjQqGU1etmQSF3+BVADX0FYGmpCw4ok+XsNxusB6knSHkSIn7poxTb23Q6jjzraxKOWPlXbjyYWy2THeqbxm3pX3B5+bwm44NB/Z57dH4zzaT7BrazJfU1QJyBQl1eALLRtpKYiDBXdEKT3XaYednC8aKC6B+zGYAYoP9fS2puv/ci4UjxvLBwH2kcHdeV3QSRuAfEQ/C0DeW6S1lvT3J1J8UlaZ83W2MemyyyRhpTyvfdE/G4NH5dGLNibT7PxzjRnV+tk79axCjG8AYwBIfCHeovwL39FAiYQAJeBBWANqCpQSBMsFdmZS7LqaGzJmEMMupTp81ukeFIyr6KQwvZjJoCLX7T48R83eft4i9nLLqoFeEOwB8ihOhXQh9MAUsChTdw7y/7SHP+cTfNhRuU/DjzCpc0NQqSUGsCg/ImYa/hmkkYoeDST5LO3i0zdrjL6WkDajxDdIUzCwP/DNUMDskBaQ+6N0F0ssF20WbM17is6FZr0WKTP9UGp1b6s9FKCiNDpRh5Hqsr2TIbbvRLTTpuLcx303tCtJ2B5am0CIwLWkvTnSuzNptmwNTbVmAOvSduqELKM5N0BTXuqy9wgZpkgsU8ziNkbtbk3Mc78aoXSNZ+8CBH9Uyo5pVYBIoN4a5z6TI57eZNVU+FRyqFGFo9FYv7+ZWdTnrph0HFiTLywT91ReTSeYn1ums12El+KgaX6M1MBpC74MIOfK3K/lOZuQmPTUDmgOwyo5aftVZ7rrctIyvQdhW6kUBlNsJUeY/WjAkeU8jG6/twRmUlDQkayRHkiy7qtsGno7PoBTaxBG3y2jz8PllJynZg2fujR0ASPx1N8PjXN2l7c6MkLC1AogGmC48CZM/DqgvzTKB0lz2beYj1p8EAJqGUMXIpEL3o8PA/mSchGSehGKkcJhe10ljuPS+IhxVxfXr4ECwuwuIi8uEjnaDsoTLEzlWLN0dgyBGXboMPO8y4+GdoLwVJKhIj5FUFCpRHA7pjNem80mL1T2574zpWfjVCcEtIwoN+KPs661WyO9ZTOug6PA5+62cdn5cVqX674BF4kwsU1YqqWxoN0is9FurVJ+zCQF87DZF7eXLvZVdPuvbzN3aTKpmFS7qSGOfsS6FeDTwJth/6xTydSKOcMNnSrc/vmg3+XaR71ebjqOU51uzjCHUdnQ5HsWy6tySLBy1z85G9+hVFPnpBcQydJJhTMHvtc6lUTb86G869/0ttrOOOtf02k+NhS+SxO8DhVp8V1wkFBevnQ+Hos8ioROl1d4cCKMWTKY6O6cZAYk618kk3b4Atbp0ydLov0vw76PyoePmGXUPkuJsdkOpJ822UkaRCZCnWjTxVBCw/vRTn7jRSfivII8LlMPenhCsmhoyHRCUjgsfviQvHNgutZ+AoRGXwiOs4cxzSpU6BNBv//gQL8F7wiVI90+2REAAAAAElFTkSuQmCC" alt="Сажа" style="vertical-align: middle !important; border: none !important" />';
		sage.style.color = 'red';
		if(mail.type == 'text') mail.value = 'sage';
		else mail.checked = true;
	}
}

function sageBtnEvent(e) {
	toggleCfg(32);
	sageBtnFunc(Rmail, postform);
	if(QR) sageBtnFunc($prev($x('.//span[@id="sage_btn"]', QR)), QR);
	e.preventDefault();
	e.stopPropagation();
}

function textareaResizer(form) {
	$del($x('.//img[@id="resizer"]', form));
	var node = $x('.//textarea', form);
	$event(node, {'keypress': function(e) {
		var code = e.charCode || e.keyCode;
		if((code == 33 || code == 34) && e.which == 0) {e.target.blur(); window.focus()}
	}});
	var resmove = function(e) {
		node.style.width = e.pageX - getOffset(node, 'offsetLeft') + 'px';
		node.style.height = e.pageY - getOffset(node, 'offsetTop') + 'px';
	};
	var resstop = function() {
		$revent(doc.body, {'mousemove': resmove, 'mouseup': resstop});
		saveCfg(30, parseInt(node.style.width));
		saveCfg(31, parseInt(node.style.height));
	};
	var x = !(ch._0ch || ks) ? 14 : 19;
	var y = (nav.Opera) ? 9 : (nav.Chrome ? 2 : 6);
	node.style.cssText = 'width:' + Cfg[30] + 'px; height:' + Cfg[31] + 'px';
	$up(node).appendChild($new('img', {
		'id': 'resizer',
		'src': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABlBMVEUAAAAAAAClZ7nPAAAAAWJLR0QAiAUdSAAAAAF0Uk5TAEDm2GYAAAAWSURBVHjaY2BAAYyMDMNagBENYAgAABMoAD3fBUDWAAAAAElFTkSuQmCC',
		'style': 'position:relative;left:-' + x + 'px;top:' + y + 'px;cursor:se-resize'}, {
		'mousedown': function(e) {
			e.preventDefault();
			$event(doc.body, {'mousemove': resmove, 'mouseup': resstop});
		}}));
}

function toggleUserName() {
	toggleCfg(35);
	saveCfg(36, $id('usrname_field').value);
	var val = ($id('usrname_box').checked) ? Cfg[36] : '';
	Rname.value = val;
	if(QR) ($x('.//input[@name="nya1" or @name="akane" or @name="field1"]', QR) || $x('.//input[@name="name"]', QR)).value = val;
}

function toggleUserPassw() {
	toggleCfg(33);
	saveCfg(34, $id('usrpass_field').value);
	var val = $id('usrpass_box').checked ? Cfg[34] : rand10().substring(0, 8);
	Rpass.value = val;
	del_passw.value = val;
	if(QR) $x('.//input[@type="password"]', QR).value = val;
}

function doChanges() {
	var logo = $x('.//div[@class="logo"]');
	//logo.textContent = logo.textContent.split('Два.ч').join('Govno');
	//doc.title = !main
	//    ? board + ' - ' + getTitle(oPosts[0]).substring(0, 50)
	//    : doc.title.split(/\s/)[0].split('Два.ч').join('Govno') + ' - /' + board + '/';		
	if(ch.ua) toggleDisp($up($x('.//div[@class="gbBlock"]')));
	if(!main) {
		if(wakaba) allImgExpander();
		$before($x('.//div[@class="theader" or @class="replymode"]'), [
			$if(!ch._0ch, $new('span', {
				'html': '[<a href="' + window.location + '" target="_blank">В новой вкладке</a>]'})),
			$if(Posts.length > 50 && !ks, $new('span', {
				'html': ' [<a href="#">Последние 50</a>]'}, {
				'click': showLast50}))]);
	}
	if(ch.iich || ch.sib || ch.dc) Cfg[19] = 0;
	if(!postform) return;
	textFormatPanel(postform);
	textareaResizer(postform);
	$each($X('.//input[@type="text"]', postform), function(el) {el.size = 35});
	if(captcha) {
		if(Cfg[20] == 0) toggleDisp($up(captcha, 2));
		$event($attr(captcha, {'autocomplete': 'off'}), {'keypress': forceCaptcha});
	}
	if(Cfg[21] == 1) toggleDisp(Rrules);
	if(Cfg[40] == 1 && Rpass) toggleDisp($up(Rpass, 2));
	if(Cfg[35] == 1 && Rname) setTimeout(function() {Rname.value = Cfg[36]} , 10);
	if(Cfg[22] == 1 && Rgoto_tr) toggleDisp(Rgoto_tr);
	del_passw = $X('.//input[@type="password"]').snapshotItem(1);
	if(del_passw) setTimeout(function() {
		if(Cfg[33] == 1) {
			Rpass.value = Cfg[34];
			del_passw.value = Cfg[34];
		} else del_passw.value = Rpass.value;
	}, 10);
	var hr = $prev(delform);
	var b = $up(delform);
	var postarea = $x('.//div[@class="postarea"]', b);
	if(main) {
		toggleDisp(postarea);
		toggleDisp(hr);
	}
	if(Cfg[29] == 1 && !main)
		$after(delform, [$x('.//div[@class="theader" or @class="replymode"]', b), postarea, hr]);
	if(captcha && wakaba) {
		var td = $x('./ancestor::td', captcha);
		var img = $x('.//img', td);
		if(ch._2ch) {
			var div = $id('captchadiv');
			if(div) {
				captcha.removeAttribute('onfocus');
				$del($prev(captcha));
				$del(div);
			} else $del($id('imgcaptcha'));
			for(var i = 0; i < Cfg[20]; i++)
				td.appendChild(getCaptcha(main));
		} else {
			$event(img, {'click': function() {capRefresh(this)}});
			img.style.display = 'block';
		}
	}
	if(Cfg[41] == 1 && Rmail) {
		toggleDisp(Rmail);
		if(Rname && $up(Rname).className != 'trap' && Rname.type != 'hidden') {
			delNexts(Rname);
			var mail_tr = !ch._0ch ? $up(Rmail, 2) : $up(Rmail, 3);
			$up(Rname).appendChild(Rmail);
			$del(mail_tr);
		}
		delNexts(Rmail);
		$append($up(Rmail), [$txt(' '), $new('span', {'id': 'sage_btn', 'style': 'cursor:pointer'}, {'click': sageBtnEvent})]);
		sageBtnFunc(Rmail, postform);
	}
	if(Cfg[38] == 1) {
		$x('.//body').appendChild($new('div', {'html': '<iframe name="submitcheck" id="submitcheck" src="about:blank" style="visibility:hidden; width:0px; height:0px; border:none"></iframe>'}));
		$attr(postform, {'target': 'submitcheck'});
		if(nav.Opera) $event(window, {'DOMFrameContentLoaded': iframeLoad});
		else $event($id('submitcheck'), {'load': iframeLoad});
	}
}

/*----------------------------Text formatting buttons------------------------*/

function insertTags(node, tag1, tag2) {
	var x = $x('ancestor::form//textarea', node);
	var start = x.selectionStart, end = x.selectionEnd;
	if(tag1 == '' && tag2 == '') {
		var i = (end - start);
		while(i--) tag2 += '^H';
	}
	var text = x.value.substring(start, end);
	x.value = (text != '')
		? x.value.substr(0, start) + tag1 + text + tag2 + x.value.substr(end)
		: tag1 + x.value + tag2;
}

function tfBtn(title, tag, bb, txt, src) {
	return $new('img', {
		'title': title,
		'alt' : title,
		'src' : 'data:image/png;base64,' + src,
		'style': (Cfg[18] == 0 ? 'vertical-align: middle !important; background: no-repeat; border: none !important' : ''),
		/*'html': (Cfg[18] == 1 ? '<b>|<a>' + txt + '</a>|</b>' : '')*/}, {
		'click': function() {
			if(ch._0ch || ch.sib) insertTags(this, '[' + bb + ']', '[/' + bb + ']');
			else insertTags(this, tag, tag);
		}});
}

function textFormatPanel(form) {
	var pre = 'R0lGODlhFwAWAMQAAP//////AP8A//8AAAD//wD/AAAA/wAAAPb2+Onq7Bc/e053qitemNXZ3Wmdypm92';
	$after($x('.//input[@type="submit"]', form), [$New('span', [
		tfBtn('Жирный', '**', 'b', 'B', 'iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAAZiS0dEAMkAvgCJRuLZSwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kKDw4YMTJtWtkAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAEjklEQVRIx7WWzWtUVxjGf2cyY0ZH0YQJxsQQE5xCkdBRO2kiokQ3WWWR7PwDjAUx6Epm4aodKqIQNKgoNYt2IX7gwoVS2nRnqVn4lYxSKZXW+NGQimPM3Ln3vG8X987N3CS70guHe+85nPOc932e98MQPHomXQ9sBur5748D/GWOzToApgagh/Z9P/Ph5bIdqooqKArq/1fnwV9bfIObbGLt7K99wD1zbNYxAUAvm3dN8PYxrE5DXWIRoHpYCKIEZ0b/AxAjLnWVd5TXZUj986APuBcH2mjvm+DVJDR1QfcRWNsCGBTF8yzWelixWE9Q8fCsImKxVrBWEBFEPVSU+MJrGp5/R7L0G6XGzyfWzU1m4kA9H2Z8C7qPwOZdUJcEQKyLuhZrLZ7nhW8RwVobDhHBqgURyvXN2A6huThKwvkboD4WeATiq2Btqw9gDKIWzyqugBVBg4EaUOO7sWagBhVQk8BNptFYonoy8ZWkIeLhutVbVm+qwbDYYE5EUNXwW9SAKiIm5BMgFjlc4eTJb0il1pHL5Xj6tIiI0NDQQDqdZuPGjbS0tNDW1kZ7ezudnZ2oKs+ePWNgYIAdO7J8Oz4eqpGlIKpgxfLV1wUcxyGfz3Pw4DDWWmZmZrhx82bE2mvXrlIsFrGqHD9+nJGRERzH4fz58zU21IBooH3PenR359izZw/9/f00NTVx584dTJ3hi56eyMbt23cSi8X44e5dNm3aRN/eveRyObq6upAohs9JGFSe5daNW3jq85HP5xkeHmb37t0YY5bwJriuy+joKGdOn0aAy5cvIyLw4Y+aKKtaEgSSZy2udRHPl+jWT7aSyWQoFArMl0oRkI8fP3Lu3DkymQwdnZ1RIRDBCDhR9YGs5wOoi7UW13FpbW3l4sWLfLptWwQkm81y4cIFmpubqVQqCBIQriASXH0JJyhYq3hSDTZlbGwsIBJOnDgRAcnn8wBcuXKFS5cuoaqYAERVI9THajKUHwPW4nnCq1cvOXv2LADpdJrBwcEIyMDAABs2bABgfHyct6/fhm5SogKrURdBLvKBTp06xcLCAgCHDx9mdX20AqRSKQ59eQiAcrnM2NhYGJiqK0jYz6AaRveTJ0+4fv06AB0dHQwNDfluXqKuocEhtmzZAsDt27cpFosrFpdFTvA5efPmDfl8PrzN0aNHAXj4+GFk49TUFMYYRkZGwtpSKBSYm5vzc9zSOCEsRpbe3t7Qndlslv3797NtibIADhw4AMDk5CS5XI779+9TLBbp7+/nwY9XIxqO11oiIkxPT6MxQAi1/+jRo4i/VU1gqb9e5SMc8y8izIe5y0iFuvnXYB0I6kP14CqgqmKMYowNARbLcxAjtkLCmcWIG3FXxU2mWf1umsbfv8eq4tanqQvymQSmxoMgE8CoYmvrfwgmrHJmaZ25QcJ7TymVYc3Cn47RM+kk0DPf8NlEsvQcL7HeLzhVnpZ3FUH/ocDydSMuCe8982s6WF+a6gN+qXYrSaC31Ljzp4QzG5K0HCA6u+IFjMFJNNLw/uG+oFspm5q+K/k/9F1lgH8Bw4whn+9+4KQAAAAASUVORK5CYII='),
		tfBtn('Наклонный', '*', 'i', '<i>i</i>', 'iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAAZiS0dEAMkAvgCJRuLZSwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kKDw4bEFUpGUQAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAEVklEQVRIx7WWT2hUVxTGfzeZScYxooYnSLSIi8mitAyNf6oxi07cuAriMtJko3Un6Mp1dlUQupCQjRRicaHduSmKiYg1VRctxVYwhgRTx9rQSP44mbx7zuni3XmZSdJV6WMu7+/c75zv++65xxEOuxq1AnuBVv77UQVm3cW5KoCrAzjCvt5xlv7Y8A8zwwwMA0vua88hebd2hji3i7a5JyXgsbs4V3UB4Ch7u8d49ytsiaA5uwZQmywFMcKcjfcBxGlM8+p7VrYV2Dr/cwl4nAE+Yl9pjPIz2PUpHD4PbR2AwzC8F0Q8ooJ4xdTjxVAVRBQRRVVR85gamcpbdk7eILf4ksX2g2Pb/n5WyACtLL1JMjh8HvZ2Q3MOAJUYiwURwXufnlUVEUmHqiImoMpK625kv7L792/IVv8CaG0KjECmBdr2JADOoSZ4MWIFUcXCwByYS2isG5jDFMxliXMR1pStzUxmM2uoeuK4FmUtUgtDkPBMVTGz9FrNgRmqLtUToKlhcgOJ4xTATCiXy1y+fJkoiujo6ODKlSs8ffoTCsQiXLp0iWKxyLlz5zATtM6NrAcxA1HB1/HtvRJFEWfPngXg1KlTXLhwgQOfHQD1fHv9Ol+UShw/fpzZ2dk0q7Uc6uiy4H0vHvUeqaUfAB/9+AiAvpMnE4oUFpaWePHiBQMDA/SWSqj3qFkC1IhRAwmLygvqE6fUAFSVe3fvkc/n+fzQocC9MjIywuDgYEKNCOZcYo4k4rpVVgMJK9mL4CXGlERgE1SU8fFxeo4dI5PJoKrcunWLXC5HZ2dnkhk0GoEGjKCJGYZh4kMmcZKFV6amppiZmeHPd+/o6+uj+1g3La0tnPnqTBA4uAtN7wm62HpNAEQMrx6cIQJmyv2x+wAMDw8zPT1Nf38/09PToMFFbq2OObNUl3pZmuoqVEJRcJWqx8R4MP6AQqFAFEV0dXVR6i1xY/QGlUolZJFQRfJbY2m9hWtaJbVorVx8+PCBiYkJenp6sGCCLwcGmZ+f586dO4hJInot+kCdWaO90kySDxpdNfHkCZVKhe7u7jTig10HKRQ6GR0dxcQ2AGx2NK3XZK3gGXfv/gBAsVhMojbDTDh9up/JyUkePny4AcDMkhq3qSZhAlXl1atXjAwPc/v2bQCuXbtGuVxOqThx4gQ7duxgaGiImzdvsrq6Wre51VOVXDu7Gn1cbdv/HKDcNcRKfh/WRCKk6qZ8m7kwmTZmEEZueYbOl18DkK+8/iStXU5XaV5+C1KFsD+kNNQBOmc4J/8KgKySrc7hNG4oK6txLmLL+99on/oOMSNujWgO9UyDaJmwyBRwZkj9/p+CKS3VOfa8+Z6sX2Bxa4F85XXV2dUoBxxZ3lkcyy1O4rPbkw2n1jRs7CpC/2HAxvdOY7J+geX8frYvPi8BE7VuJQccXWw/cD9bnUvtthGg8emmAThHNdvOzoVfekO3suLq+q7c/9B3rQD8A268xe7YpkfWAAAAAElFTkSuQmCC'),
		$if(!ch.dc && !ch._410, tfBtn('Подчеркнутый', '__', 'u', '<u>U</u>', 'iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAAZiS0dEAMkAvgCJRuLZSwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kKDw4lDXfqbuAAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAADw0lEQVRIx7WWTWubRxDHfxtL0eM3go0CpnGxU3AKxaGH2sZOenGu/gD+Fj7k5nNfoBdBae6GoBz7EWr3Jtv40NLGhTYUY7Vp2oo2WLZsSTszPew+L6p8SunCw8PusvOf+c9/ZtcRh9WqFWAWqPDfRxf4xT1udQFcAWCVuUdfc/7r0AkzwwwMAwvzdB3CXv6HfnKbidbhOtBwj1tdFwHWmH2wxx/fwWgVRso5QGosAzGizcF5BHHaZ6T3mqvJBcb//mYdaJSAt5lb3+O3I7h9H1a2YOItwGEY3gsiHlFBvGLq8WKoCiKKiKKqqHlMjdLlK6Ze1EnaP9GeXtqb/OtooQRUOH8ZIljZgtkHMJIAoNLH+oKI4L3P/qqKiGSfqiImoMpVZQa5q8z88Dnl7p8AlVJkBEo3YeJOAHCO3d2vqNefsbOzw/z8PGurq6hZRp2acnBwQLPZZHNzk42NDVaWljBXpp9UsRvl1DKl66Sh6nn48EMWF++zs7PD8vIyXzx5MuT91tYWzWaT7e1tKpUKooAZqi7L5xCIGli/jzdDRBgfH81UJCKYBeOgaMFIkiSoKmaaCSVV2gCIGYhGfiPnwWA4pID4kGSTAERByukXztgAM6UUwMzw4lHvEY2KSUEIkSgEEAVJ85NKXDUHGsRIQWJReUF9UEqqIABTQ6OqglxjRClIdMAyYVihylKQWMleBC/96KkEWaaHRdBIRzFKAnHZWkptMfOlNCEGmHjUK+oEERvIiUQAMcGwmPpUjYqS00XMi/07JwAihlcPzhABM80cyjwlgmvew1JHnFlWS8aQusKSWKiB1GjmbJEmwvoAXaqhQIss2TXqCpHoAEjnvANAp9PJcxKsYmZ0Ovl+kiSZhIsRAtwg66Ch6aWqajQafPTJxwA0Gg2ePq1zcnKCeuX0tEm9Xufw8BCAWq3G0dHRQHTF4axWfa83+c5zgN+XPqU3MRciidIsFllebGTzwSIMuamcn7Dw42cAjF2eLuY5MfK24Rzv3rv3Rlfi/v5+8brL6YqNNaPq3hsCNBqNXMaFzGe9y2mPkYtXUJnh+Ph7xCxTkTMX6sMM51J6GKAoMy49yt0WTvuh3UeQXj+pMvr6mOmfnyFm9CtVRixvjJhRikWmgDNDivd/Bqbc7La48/JLyv6M9vgCY5fNrrNaNQFWL6be30vaL/DlW9GD9F4felXE94cBw/tO+5T9GRdjd7nVfr4O7KevlQRYa09/sFvutvIWPgQwuHqtA87RLU8zdfbto/hauXKFd1fyP7y7rgD+AXdedl2Vuy8jAAAAAElFTkSuQmCC')),
		tfBtn('Зачеркнутый', '', 's', 'S', 'iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAAZiS0dEAMkAvgCJRuLZSwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kKDw4lKUvpijEAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAEH0lEQVRIx7WWT2hURxzHP5Psy64ao2ZXSJotxoO5lSItQSUI8eYtl6Citzb2JkQvekiQUnMUCubiuUUQejGHxktTpGgsEVpKm0MTZWk10m5qmkTN7pvf79fDm327m82llA4Mw3tvd77z/TMzP0dodrOQBYpAlv/eKsDv7nK5AuAaAI5x6NS3bD5v+YeZYQaGgSXPtfeQfKuPEOcO0ln+fhh45C6XKy4AHKd4Yo4/foJdBWiP6gC1yVIQI8zZ/BxAnMa0V9fY2nuEPa9+GAYeZYB3OTQ8x8oCHHwPBi9B5zuAwzC8F0Q8ooJ4xdTjxVAVRBQRRVVR85gambcvObD0BbmNX9no/nBu718LRzJAls0XCYPBS1A8Ae05AFRiLBZEBO99OqoqIpJ2VUVMQJWtbA9yWOlZ/Jyo8idAti0oApkO6OxLAJxDTfBixAqiioWOOTCXyNjQMYcpmIuIcwWsLarNTGanaKh64sCgs3MP09PTLC8vMzMzQ6lUYv/+/YyMjDA+Pk4URYlcqqg5MEPVpX4CtDVNbiBxnAKYCQDj4+P09/dz//7XPH78mKGhIW7fvs3E5GRIXq0L2pBGtoOYgajgG/T2XlOQ0TNn6OjIkc/n+fT6dQBm7t1DmkAMVW3g0CCXhex78aj3SI2+JiCjZ0YTgwFV5dmzEgC9vb2YSBJx1TpQM0YNJGwqL6hPklJL0MrKSsKqWmV1dZWHDx8yNTVFPp/nxo0bycTSKFOyd2hwJRO2ERh4EbzEmIKYJGBhH/T396crGxgYYHp6mr6+PlQVCww1sFGaMIInZhiGiQ9M4kQeX5dtcXGR2dlZLn5ykaWlJc6ePUupVEp9UOpyEXyx7Z4AiBhePTjDOagWi+nqs8AAcDV0Vlfh9Okm7f9+8gSthYCWdCWeiNVT9ba3718du7tWnqcyGc0B28YkMdsAnj6F4I2qgioS9H6zucng4CDZbJb5+XnMjFcvXqbSmTXHK2WS/KCeKlXlo7GPuXPnTvAlmOuVBw++A+Do0aM77JHW1uJJjYkC165d5cKFCywvL3P+/HkKhQILCwtMTX1GV1cXV65caQEws+SM2w5CehlJUySLxSJ3797l1q1bnDt3jrW1NfL5PCdPnmRsbIyenp5WgCaprJVJTSoLZ7Oqks/nmZycZGJiItXbzIVRWwDqQNZ6djmt0v76JUglmCz1VQY/zAznDOcE2BkAqRJVyjiNm+SqxrkCu9Z+ofvpl4gZcbZAezjPNFDNhE2mgDNDGu//FEzpqJTpe/EVkV9nY88Rdr/9reLsZiEHHHt94P253MYSPtqXXDg1n1qrilB/GND63WlM5Nd5vfsw+zZ+Hgbma9VKDji+0f3BN1GlnJrUCtD8dscFOEcl6ubA+o+nQrWy5Rrqrtz/UHdtAfwDZfV5VijJQF8AAAAASUVORK5CYII='),
		tfBtn('Спойлер', '%%', 'spoiler', '%', 'iVBORw0KGgoAAAANSUhEUgAAACcAAAAZCAYAAACy0zfoAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kKDxEWFYeXd8sAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAC8klEQVRIx8WXzW4URxSFv5rpZhowQrYGyQrjIJR4iVgEIWBnHogFD4KUd0iWeQOEsyOKWICiwALDJgmgZJQgDxZud917sujqnl8WzCTjkko9GnVXf33vuafqBtLQg34PGAA9Pn98Bbxi9VECv4f7wxIgTIDd4srdH/nwx9wTkpBACLT8myVNXOs1x1eoiktsDH/eAx6H+8MyJLDbDO7s8+cvcLYP3Xy8YLNYC7c8XWJp10moSBC8onvynuMLu5z/5+ke8DgDdriyt8/bJ3DpGty8BxtfAAEhYjTMIuaGRUcel4aLJtwNM8fMcXdcEbnIPr5j8+A7itFLRls39i/8/WQ3A3p8eFNH7OY9GNyBbgGAW4Uqw8yIMbbXZYe7Y2btdHdMBu4c97axq872i2/Jy78AelkTbbIzsHG5BgsB90g0ER3MHaWJwgqiC7VMJiYKyEEhpyr6qJO3us4Wf2Hk4cNHrGsMBl+ChHsYa3MWzgWqKuIKol+uiq0tvMlXZ+MbwDzpwL29odPp/G9Qnt4jKf2eDkrWgEkiWsRjnIJbT+RUA84kLJsyxWh4TBV0CnDjnGoCLjl/NCNahdYbONy9jtyUWzeaS24ti3h0PJxS5JLuNKs5ADMRPUJYb7UGCU+AYq5a679MtXOvF402nWK6YGci56cC11iJtMBKmpOBJ5/zNZuwf8K65jQ3Gzlfk+dJqvfuhZpTvY24+6mkdTqlmo9cc6RRB3Z2dlodtA6+QBefBxHS8z61dU3OyYpo99bgJ3SP3kFvG8ixdPp1d4ICrhosrGQznrQ9D4adkJdDglf1sSnBnVRFn7Pvn7P1+ntMour16ab91lNos2SSvqKf2QKNSc6ZcsjlNz+Qx0NG53c59/G3MuhBvwBuHW1e3y9GB8T8YiJv+oa53KyC16ZtdpXgFXk85OjcVS6Oft0Dfmq6rwK4Pdr65lFeDlsAfapDWbUAFn1wCJT5FpuHz+6m7us4TPStxQp969fAwX/Ytx4D/Avt/GC/55FUuAAAAABJRU5ErkJggg=='),
		tfBtn('Код', "`", 'code', 'C', 'iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kKDw4sN2AkDBsAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAADvElEQVRIx7WW304bRxTGf+M/sZM4RIAjAqEOpEZG/EmFqKIkd+SBcpEHidR3aC/7CqV3iaogFVm4VmJx4VCKWtNGOCiYnXNOL3Z2vYu5q7rSaGd3dueb833fOTOOcNnregVYBCr892sEHLlXgxGAywA85eGLn/n8+8QfZoYZGAYWPyfvIR4b3yGq3qM2+GUHeONeDUYuADxj8fkuf7bhZh2K5TFAMlkKYoQ5888BxGlE8fITF3dWuP3PrzvAmxLwFQ93dvnjHdzbhCcvobYAOAzDe0HEIyqIV0w9XgxVQUQRUVQVNY+pUfpywnTve6rDDwxnvt298/e7lRJQ4fNxHMGTl7D4HIpVAFQiLBJEBO99eldVRCRtqoqYgCoXlfvIsnL/t+8oj/4CqBQCI1C6AbUHMYBzqAlejEhBVLHQMAfmYhozDXOYgrkyUbWOFcrJzJSus4aqJ4qSVSYrtdAECe9UFTNL+2oOzFB1qZ4AhdzkBhJFKYCZMDU1ldIzNzfHwsICoCigQLPZDO4zzATNuJGrIGYgKvgM37XaFKenp8zOzqLA0dFRvBivoJ7mo0d0379ndXU1BVLVTAwZuix434tHvUdC+AAikt41pRMkyZUwTqDOzNA8RgISksoL6mOnXAXR4CogN54k5pimOHfIqFIIaYQZeBEiiWIgEY5Pjpmfn6ff72MiLC0tQdBBVel0OqytrdFut/NGIIcR3BWy1sSjXlEniMT89vv94Byj1+shJin3ZjYGYEwXQZecuwJbiBhek2SLJ2o0GkiYtNls0lppxVQprK+vs7m5mdLmUpdZTvpCpkLFOSCC94qqp9FocHh4yNfLy6gq3W6XRABVpd1uB81jUM2yZNe4KxY51sKSHzPCmwiaiByoEpNMlbYcjRPuSipokt2acJsBUwW1cd9MMbUcSPLt1auQj8QyBc/odru0Wi06nQ5iwsbGBgCPH2+gqmxtbQGwvb2ds7RdAUsjibeGGMAylBwcHKT9/f39HDV7e3u5CCzDQNbDOU2SGmWhNmsmi7N8m7l0N7wKMAayydrl9JLi+QnICML+kK5Sx4DOGc5JXCSvAUAuKY8GOI1ydF1G1To3P3WYOfwBMSOq1CmGeqYh1FJIMgWcGZLd/1Mw5cZowIPjHyn7M4a3V7j15ePI2et6FXh6Pv3NbnXYw5fvxhtOotPkqSKcPwyYHHcaUfZnnN9a5u7wYAd4m5xWqsCz4cz2T+XRIBVpEiD/9toFOMeoPMP02f6LcFq5cJlzV/V/OHddAPwL37CyC3NhW/kAAAAASUVORK5CYII='),
		$new('span', {
			'title': 'Цитировать',
			'style': (Cfg[18] == 0 ? 'padding:0 27px 27px 0; background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oGCxAVCux2SzIAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAEAElEQVRIx7WWz2tcVRTHP3cy05nmh2kmiYZ0klIkpQRjisaSFjfpLiCCq7aCuKvgoovsXbqTgvgHuPAHFerGIliERlBpCRUTxbRgtE1b0zSmP8wkJDPvnnNcvPve5GVmJ164c9+97835nvM9P+5xhGEX+opABSjy30cNuO9m1msAbhfAJIdOfcfmX03/MDPMwDCweJ+cQ/yusUJU6qdzfW4KuOZm1msuAJygcnKWtV9hfx+0FRoAibAUxAgys/sA4jSirf6Una4ROp7MTwHX8sAQh6ZmeXAD+sfg+HnoHAQchuG9IOIRFcQrph4vhqogoogoqoqax9TIb6/Ss/QppervVMsTs12Pb4zkgSKbK7EFx89D5SS0lQBQibBIEBG89+mqqohIOlUVMQFVdooDyGFl4OaHFGp/AxRzgRHI74POgzGAc6gJXoxIQVSxMDEH5mIad03MYQrmCkSlPixXSCSTbxUaqp4oSrRMNLUwBQlnqoqZpc9qDsxQdak/AXIZ4QYSRUSRsLz6E2YNYSKS7kGJf5PIS6bsOmvIzTXCFEQFHwR+fOUtPvn2HHdW52KLAO+Dxl5BPSaCZEAsKGEZZvIJgJnhxaPeI6oUC50sr82xvDbHYO84EyNvU+mdiClSkCDQAmWE1czQLEZsSZpUXlAfW/LO9GVeHX2X9mKZlUcLfHV9hks/nOP2wx8Ry/rERDLUNbiyXZaETPYieIkwhbZciZdG3uSF4TdYvPs1P9++yNo/t7gy/x7lzucZHz5DpTwZC4ZsIJDBCNEVPjTxqFfUCSIxHTlXYHTodY4MTrP04Crzdy7yePMPZhffp7t9mNeOfRQD0KCL4Bfb6xMAEcOrB2eIgFmcZGoELdNyl2pqrlHHnBmaBMFexyd2icW5kZiPgpcat+5/w8LyF2zuPASgp+MwY5XTVMqTqBKSlJQmIxtgeyzRFGSnvsnNe5f55e4ltutPAOjtPMLY8GkqPa9gITFNmkPYrEUIJxU0yW414/Pvz1L3WwA8+8woLw6dZeDAOKox5WaKaascaR5NPkksqfstBg6MMz58hue6xxrhahpKj7YEMLOYvpY+MdKyYcD0sQ/o7zqaoWCv4JYAGaqs2ZK0RuWgv+toS23jZ5fehnsBGkDWXLuc1mnbWgWpQbgfUi21QY9zhnMSF8kWAEidQm0dp1GGrnpU6mP/00XKf36GmBEV+2gL9UyDqfmQZAo4M2T3/Z+CKftq6xxc+ZKC36DaMUL79r2aswt9JWByq2d8tlRdwhe64wsn8VNzVxES0oDm904jCn6DrfbDdFd/mwKuJ91KCThRLb98tVBbT53UDJA9bamAc9QKZXo2Fk6FbmXH7eq7Sv9D37UD8C90FLsqh7b8PAAAAABJRU5ErkJggg==") no-repeat' : ''),
			'html': (Cfg[18] == 1 ? '<b>|<a>&gt;</a>|</b>' : '')}, {
			'mouseover': function() {quotetxt = txtSelection()},
			'click': function() {InsertInto($x('.//textarea', form), '>' + quotetxt.replace(/\n/gm, '\n>') + '\n')}})
		], {
		'id': 'txt_btns',
		'html': '&nbsp;',
		'style': 'padding:0 0 2px 0; cursor:pointer; width:195px;' + (Cfg[7] == 0 ? 'display:none' : '')}
	)]);
}

/*-----------------------------Quick Reply under post------------------------*/

function quickReply(post) {
	var tNum = getThread(post).id.match(/\d+/);
	var pNum = post.Num;
	if(!QR) {
		var first = true;
		QR = $attr(postform.cloneNode(true), {'class': 'reply'});
		$del($x('.//span[@id="txt_btns"]', QR));
		textareaResizer(QR);
		textFormatPanel(QR);
		$x('.//textarea', QR).value = '';
		var sage = $x('.//span[@id="sage_btn"]', QR);
		if(sage) $event(sage, {'click': sageBtnEvent});
		if(ch.ua || ch._410 || ch._0ch) $del($x('.//small', QR));
		if(captcha && (ch._0ch || ks)) {
			captcha.value = ' ';
			var a = $up($x('.//img[@id="captchaimage" or @id="faptchaimage"]', QR));
			$before(a, [$new('img', {'src': 'http://' + domain + (!ch._410 ? '/captcha.php?' + Math.random() : '/faptcha.php?board=' + board), 'style': 'cursor:pointer'}, {'click': function(e) {this.src = this.src.replace(/\?[^?]+$|$/, (!ch._410 ? '?' : '?board=' + board + '&') + Math.random())}})]);
			$del(a);
		}
	}
	if($next(post) == QR) {toggleDisp(QR); return}
	$after(post, [QR]);
	QR.style.display = 'block';
	if(main) {
		if(wakaba) {
			if(first) $before(
				$x('.//div[@class="trap" or @class="its_a_tarp"]|.//input[@name="name" or @name="akane"]', QR),
				[$new('input', {'type': 'hidden', 'id': 'thr_id', 'name': 'parent', 'value': tNum})]);
			else $id('thr_id').value = tNum;
		} else $x('.//input[@name="thread_id"]|.//input[@name="replythread"]', QR).value = tNum;
	}
	var cap = $x('.//input[@name="captcha"]', QR);
	if(cap) $event(cap, {'keypress': forceCaptcha});
	if(cap && wk) {
		if(ch._2ch) {
			$each($X('.//img[@id="imgcaptcha"]', QR), function(img) {$del(img)});
			for(var i = 0; i < Cfg[20]; i++)
				$up(cap).appendChild(getCaptcha(false, tNum));
		} else {
			var img = $x('.//img', $up(cap));
			var key = '?key=res' + tNum + '&amp;dummy=' + rand10();
			$event(img, {'click': function(e) {capRefresh(this)}});
			img.src = (ch.iich ? '/cgi-bin/captcha.pl/' + board + '/' : '/' + board + '/captcha.pl') + key;
		}
	}
	var ms = Rmess.value.trim();
	InsertInto($x('.//textarea', QR), (first && ms != '' ? ms + '\n' : '') + '>>' + pNum + '\n' + (quotetxt != '' ? '>' + quotetxt.replace(/\n/gm, '\n>') + '\n' : ''));
	$event($x('.//input[@type="submit"]', QR), {'click': function() {Rmess.value = $x('.//textarea', QR).value}});
}

/*----------------------Check for correct reply submit-----------------------*/

function iframeLoad(e) {
	var frame = (e.srcElement || e.originalTarget).contentDocument;
	if(!frame.body || frame.location == 'about:blank' || !frame.body.innerHTML) return;
	var err = frame.getElementsByTagName('h2')[0] || frame.getElementsByTagName('h1')[0];
	if(!ch.dc && (err || !frame.getElementById('delform'))) {
		alert(!err ? 'Ошибка:\n' + frame.innerHTML : (err.firstChild || err).textContent);
		frame.location.replace('about:blank');
		return;
	}
	if(/error/.test(frame.location.pathname)) {
		var nodes = frame.getElementsByTagName('td');
		for(var node, i = 0; node = nodes[i++];)
			if(node.className == 'post-error') alert('Ошибка: ' + node.textContent);
		frame.location.replace('about:blank');
		return;
	}
	Rmess.value = '';
	if(Rfile) Rfile.value = '';
	if(QR || !main) {
		if(main) ajaxExpandThread(postByNum[getThread(QR).id.match(/\d+/)], 8);
		else {$del(QR); ajaxNewPosts()}
		QR = undefined;
		if(captcha) captcha.value = '';
		if(wk && captcha) {
			var img = $x('.//img', $x('./ancestor::td', captcha));
			if(ch._2ch) capRefresh_2ch(img);
			else capRefresh(img);
		}
	} else window.location = frame.location;
	frame.location.replace('about:blank');
}

/*---------------------------Append styles for elements----------------------*/

function scriptStyles() {
	var icn = function(nm, src) {return nm + ' {padding-left:18px; cursor:pointer; background:url(data:image/png;base64,' + src + ') no-repeat} '};
	var pre = 'R0lGODlhDgAPALMAAP//////AP8A//8AAAD//wD/AAAA/wAAAN3d3cDAwJmZmYCAgGBgYEtLS////wAAACH5BAEAAA4ALAAAAAAOAA8AAAR';
	var txt =
		icn('.hide_icn', pre + 'U0MlJq7o4X7dQ+mCILAuohOdHfgpQJguQLowSA+7tKkxt4wgEbnHpkWhCAIJxNJIYyWWTSQMmqUYGDtBobJmMxhOAJZO6LM3l0/WE3oiGo0uv0x0RADs=') +
		icn('.unhide_icn', pre + 'N0MlJq7o4X7dQ+mCILEuYMIxJfheDIMz1LTHGAEDd1uidozsaAvciMmhHF3EIgCFJPVwPeiTRpFZaI+tyWhsN1g7zAXtMooYDzG6zHREAOw==') +
		icn('.rep_icn', pre + 'O0MlJq7o4X7dQ+mCILAt4hSD5LQCghgtzsa27YIys0LV75SRGr4VgxIyxIaB4DPYQiEYQ2SBGpUFsA9rAkhZdUFejSHQ9KFHD0W27244IADs=') +
		icn('.sage_icn','R0lGODlhDgAPALMAAP//////AP8A//8AAAD//wD/AAAA/wAAAO7u7oCAgGBgYEtLS////wAAAAAAAAAAACH5BAEAAAwALAAAAAAOAA8AAARBkMlJq7o4X6aS/6B3fVonmomCrAiqLNiyeHIMXwuL3K/sz4mfUKYbCmnGxUG3OvwwS9bBlolObSfF4WpaMJI/RgQAOw==')+
		icn('.expthr_icn', pre + 'P0MlJq7o4X7dQ+gsALF+CLCSIiGeJqiKbLkzGIEiNMfp15zYGCtXANYY04bCIOA55SKYTBV0akQxnMQZoEhulbRf8aRTDIrKp4TC7325HBAA7') +
		icn('.fav_icn', pre + 'T0MlJq7o4X7dQ+skFJsiyjAqCKKOJAgALLoxpInBpMzUM4D8frcbwGQHEGi1hTCh5puLxWWswAY0GLNGgdbVYE/hr5ZY/WXTDM2ojGo6sfC53RAAAOw==') +
	'td.reply {width:auto} .pcount {font-size:13px;font-weight:bold;cursor:default;color:#4f7942} .pcountb {font-size:13px;font-weight:bold;cursor:default;color:#c41e3a} ';
/*	if((ch._2ch && getCookie('wakabastyle') != 'Futaba') || ch._0ch)
		txt += '.postblock {background:#bbb} '; // gray postform color - не нужно.*/
	if(Cfg[39] == 1) txt += '.spoiler {background:#888 !important; color:#CCC !important} '; // open spoilers
	if(Cfg[25] == 1) txt += 'blockquote {max-height:100% !important; overflow:visible !important} '; // no scroller
	if(Cfg[6] == 1) txt += '.commentpostername, .postername, .postertrip {display:none}'; // no post names
	if(!$id('desustyle')) {
		$x('.//head').appendChild($new('style', {'id': 'desustyle', 'type': 'text/css', 'text': txt}));
		if(nav.Chrome) toggleDisp(delform);
	} else $id('desustyle').textContent = txt;
}


/*=============================================================================
							FOR POSTS AND THREADS
=============================================================================*/

function forPosts(fn) {
	for(var post, i = 0; post = Posts[i++];)
		fn(post);
}

function forOP(fn) {
	for(var post, i = 0; post = oPosts[i++];)
		fn(post);
}

function forAll(fn) {
	forOP(fn); forPosts(fn);
}

function getThread(node) {
	return $x('ancestor::div[@class="thread"]', node);
}

function getPost(node) {
	return !ch._0ch
		? $x('./ancestor::table', node)
		: $x('./ancestor::div[@class="postnode"]|./ancestor::table[@class="replypost"]', node);
}

function getTitle(post) {
	var t = $x('.//span[@class="filetitle" or @class="replytitle"]', post);
	if(t) t = t.textContent.trim();
	if(!t || t == '') t = post.Text.trim();
	return t.replace(/\s/g, ' ');
}

function getPostMsg(post) {
	return wk ? $x('.//blockquote', post) 
		: (ch._0ch ? $x('.//div[@class="postmessage"]', post)
		: (ch.dc ? $x('.//div[@class="message"]|.//div[@class="postbody"]', post)
		: null));
}

function getText(node) {
	var n = node.nodeName;
	if(n == '#text') return node.data;
	if(n == 'BR' && !ch.dc) return '\n';
	var t = [];
	if(n == 'P' || n == 'BLOCKQUOTE') t[t.length] = '\n';
	var arr = node.childNodes;
	for(var x, i = 0; x = arr[i++];)
		t[t.length] = getText(x);
	return t.join('');
}

function isSagePost(post) {
	if(ch.iich || ch.sib) return false;
	if(wk) {
		var a = $x('.//a[starts-with(@href,"mailto")]', post);
		return a && /mailto:sage/i.test(a.href);
	}
	if(ch.dc && $x('.//img[@alt="Сажа"]', post)) return true;
	if(ch._0ch && $x('.//a[@href="mailto:sage"]', post)) return true;
	return false;
}

/*----------------------------------Posts buttons----------------------------*/

function addHideThreadBtn(post) {
	var x = $new('span', {
		'id': 'phide_' + post.Num}, {
		'click': function() {hideThread(post); storeThreadVisib(post, HIDE)}});
	eventSelMenu(x, function() {selectPostHider(post)});
	if(Cfg[18] == 0) x.className = 'hide_icn';
	else {x.innerHTML = '[<a>Скрыть</a>] '; x.style.cursor = 'pointer'};
	return x;
}

function addExpandThreadBtn(post) {
	var x = $new('span', {
		'id': 'expthrd_' + post.Num}, {
		'click': function() {ajaxExpandThread(post, 1)}});
	eventSelMenu(x, function() {selectExpandThread(post)});
	if(Cfg[18] == 0) x.className = 'expthr_icn';
	else {x.innerHTML = '[<a>Развернуть</a>] '; x.style.cursor = 'pointer'};
	return x;
}

function addFavorBtn(post) {
	var x = $new('span', {
		'title': 'В избранное'}, {
		'click': function() {storeFavorities(post)}});
	if(Cfg[18] == 0) x.className = 'fav_icn';
	else {x.innerHTML = '[<a>В избранное</a>] '; x.style.cursor = 'pointer'};
	return x;
}

function addHidePostBtn(post) {
	var x = $new('span', {
		'id': 'phide_' + post.Num,
		'class': 'hide_icn'}, {
		'click': function() {togglePostVisib(post)}});
	eventSelMenu(x, function() {selectPostHider(post)});
	return x;
}

function addQuickRepBtn(post) {
	if(ch.dc) $del($x('.//a[@class="reply_ icon"]', post));
	var x = $new('span', {
		'title': 'Быстрый ответ'}, {
		'mouseover': function() {quotetxt = txtSelection()},
		'click': function() {quickReply(post)}});
	if(!(Cfg[18] == 1 && post.isOp)) x.className = 'rep_icn';
	else {x.innerHTML = '[<a>Быстрый ответ</a>] '; x.style.cursor = 'pointer'}
	return x;
}

function addSageMarker() {
	return $new('span', {
		'class': 'sage_icn',
		'title': 'SAGE'}, {
		'click': function() {toggleSage(); toggleChk($id('sage_hider'))}});
}

function addPostCounter(post) {
	return $new('i', {
		'class': (post.Count < 500 ? 'pcount' : 'pcountb'),
		'text': post.Count});
}

function addNote(post, text) {
	post.Btns.appendChild($new('a', {
		'id': 'note_' + post.Num,
		'style': 'font-size:12px; font-style:italic',
		'text': text}, {
		'click': function() {$del(this)}}));
}

function addPostButtons(post) {
	var div = $new('span');
	var x = [], i = 0, C = Cfg;
	if(ch.dc || ks) div.innerHTML = '&nbsp;';
	if(ch._0ch || ks) $del($x('.//span[@class="extrabtns"]', post));
	if(!post.isOp) {
		div.className = 'reflink';
		if(!main || post.isLoad) x[i++] = addPostCounter(post);
		if(C[19] == 1 && post.isSage) x[i++] = addSageMarker();
		if(C[16] == 1 && postform) x[i++] = addQuickRepBtn(post);
		x[i++] = addHidePostBtn(post);
	} else {
		if(C[18] == 0) div.className = 'reflink';
		if(C[19] == 1 && post.isSage) x[i++] = addSageMarker();
		if(C[17] == 1) x[i++] = addFavorBtn(post);
		if(C[16] == 1 && postform) x[i++] = addQuickRepBtn(post);
		if(main) x[i++] = addExpandThreadBtn(post);
		x[i++] = addHideThreadBtn(post);
	}
	var i = x.length;
	while(i--) div.appendChild(x[i]);
	$after($x('.//span[@class="reflink"]', post), [div]);
	post.Btns = div;
}

/*------------------------------------Players---------------------------------*/

function insertYouTube(link, pNum) {
	var div = $id('ytube_' + pNum);
	if($x('.//embed[@src="' + link + '"]', div)) delChilds(div);
	else $html(div, '&nbsp;<embed src="' + link + '" type="application/x-shockwave-flash" wmode="transparent" width="320" height="262"></embed>');
}

function addYouTube(post) {
	if(!/youtube/.test(post.Text)) return;
	var msg = post.Msg;
	var pNum = post.Num;
	var pattern = /^http:\/\/(www\.)?youtube\.com\/watch\?v=([^&]+).*$/;
	var template = 'http://www.youtube.com/v/desu&hl=en_US&fs=1&';
	var thumbn = $x('.//span[@class="thumbnailmsg"]', post);
	if(thumbn) $html(thumbn, thumbn.innerHTML + '. Просмотр YouTube.');
	$before(msg.firstChild, [$new('div', {'id': 'ytube_' + pNum})]);
	$each($X('.//a[contains(@href,"youtube")]', msg), function(link, i) {
		if(pattern.test(link.href)) {
			var yLink = template.replace('desu', link.href.match(pattern)[2]);
			$after(link, [$new('span', {
				'style': 'cursor:pointer',
				'html': '<b> ' + unescape('%u25BA') + '</b>'}, {
				'click': function(link, num) {return function() {insertYouTube(link, num)}}(yLink, pNum)})]);
			if(i == 0) insertYouTube(yLink, pNum);
		}
	});
}

function addMP3(post) {
	var links = $X('.//a[contains(@href,".mp3") or contains(@href,".wav")]', post);
	if(links.snapshotLength == 0) return;
	var msg = post.Msg;
	var mp3 = $new('div');
	$before(msg.firstChild, [mp3]);
	$each(links, function(link) {
		if(!$x('.//param[contains(@value,"' + link.href + '")]', mp3))
			mp3 = $html(mp3, '<object data="http://junglebook2007.narod.ru/audio/player.swf" wmode="transparent" type="application/x-shockwave-flash" width="220" height="16"><param value="http://junglebook2007.narod.ru/audio/player.swf" name="movie"><param value="playerID=1&amp;bg=0x808080&amp;leftbg=0xB3B3B3&amp;lefticon=0x000000&amp;rightbg=0x808080&amp;rightbghover=0x999999&amp;rightcon=0x000000&amp;righticonhover=0xffffff&amp;text=0xffffff&amp;slider=0x222222&amp;track=0xf5f5dc&amp;border=0x666666&amp;loader=0x7fc7ff&amp;loop=yes&amp;autostart=no&amp;soundFile=' + link.href + '&amp;" name="FlashVars"><param value="high" name="quality"><param value="true" name="menu"><param value="transparent" name="wmode"></object><br>  ');
	});
}

function searchMP3() {
	if($X('.//a[contains(@href,".mp3") or contains(@href,".wav")]', delform).snapshotLength > 0) forAll(addMP3);
}

/*--------------------------------Expand images------------------------------*/

function expandImg(a, post) {
	var img = $x('.//img[@class="thumb"]', a);
	var pre = $x('.//img[@id="pre_img"]', a);
	var full = $x('.//img[@id="full_img"]', a);
	toggleDisp(img);
	if(pre) {toggleDisp(pre); return}
	if(full) {toggleDisp(full); return}
	var maxw = doc.body.clientWidth - getOffset(a, 'offsetLeft') - 20;
	var sz = getImgSize(post).split(/[x|×]/);
	var r = sz[0]/sz[1];
	var w = sz[0] < maxw ? sz[0] : maxw;
	var h = w/r;
	$append(a, [
		$if(Cfg[23] == 2, $attr(img.cloneNode(false), {
			'id': 'pre_img',
			'width': w,
			'height': h,
			'style': 'display:block'})),
		$new('img', {
			'class': 'thumb',
			'id': 'full_img',
			'src': a.href,
			'width': w,
			'height': h,
			'style': 'display:none'}, {
			'load': function() {
				$del($x('.//img[@id="pre_img"]', $up(this)));
				if(img.style.display == 'none') toggleDisp(this);
			}})
	]);
}

function expandHandleImg(post) {
	if(post.Img) $event($up(post.Img, (ks ? 2 : 1)), {'click': function(e) {
		if(Cfg[23] != 0) {e.preventDefault(); expandImg(this, post);
	}}});
}

function allImgExpander() {
	if($X('.//img[@class="thumb"]', delform).snapshotLength <= 1) return;
	var txt = '[<a>Раскрыть изображения</a>]';
	oPosts[0].appendChild($new('div', {
		'id': 'expimgs_btn',
		'style': 'cursor:pointer',
		'html': txt}, {
		'click': function() {
			forPosts(function(post) {if(post.Img && post.Vis != HIDE) expandImg($up(post.Img), post)});
			var btn = $id('expimgs_btn');
			btn.innerHTML = /Раскрыть/.test(btn.innerHTML) ? '[<a>Свернуть изображения</a>]' : txt;
		}}));
}

/*--------------------------Add map of answers to post-----------------------*/

function refMap(post) {
	var arr = [];
	$each($X('.//a[starts-with(text(),">>")]', (post ? post.Msg : delform)), function(link) {
		if(!/\//.test(link.textContent)) {
			var rNum = link.hash.match(/\d+/) || link.pathname.substring(link.pathname.lastIndexOf('/')).match(/\d+/);
			var pst = getPost(link);
			if(postByNum[rNum] && pst) {
				var pNum = pst.id.match(/\d+/);
				if(!arr[rNum]) arr[rNum] = pNum;
				else if(arr[rNum].indexOf(pNum) == -1) arr[rNum] = pNum + ', ' + arr[rNum];
			}
		}
	});
	for(var rNum in arr) {
		var ref = arr[rNum].toString().replace(/(\d+)/g, '<a href="#$1">&gt;&gt;$1</a>');
		var map = post ? $id('rfmap_' + rNum) : undefined;
		if(!map) {
			map = $new('small', {'id': 'rfmap_' + rNum, 'html': '<i><br>Ответы: ' + ref + '</i>'});
			refPrewiev(map);
			var msg = postByNum[rNum].Msg;
			if(msg) $up(msg).appendChild(map);
		} else refPrewiev($html(map.firstChild, map.firstChild.innerHTML + ', ' + ref));
	}
}

/*---------------------------Posts preview by reflinks-----------------------*/

function doPostPreview(e) {
	setTimeout(function() {$del($x('.//div[starts-with(@id,"preview")]'))}, 5);
	var tNum = this.pathname.substring(this.pathname.lastIndexOf('/')).match(/\d+/);
	var pNum = this.hash.match(/\d+/) || tNum;
	var b = this.pathname;
	if(/\//.test(b.substr(0, 1))) b = b.substr(1);
	b = b.split('/')[0];
	$del($id('pstprew_' + pNum));
	var x = e.clientX + (doc.documentElement.scrollLeft || doc.body.scrollLeft) - doc.documentElement.clientLeft;
	var y = e.clientY + (doc.documentElement.scrollTop || doc.body.scrollTop) - doc.documentElement.clientTop;
	var clone = $new('div', {
		'class': 'reply',
		'id': 'pstprew_' + pNum,
		'style': 'width:auto; min-width:0; position:absolute; z-index:900; border:solid 1px #575763; ' +
			((x < doc.body.clientWidth/2)
				? 'left:' + x + 'px;'
				: 'right:' + parseInt(doc.body.clientWidth - x - 80) + 'px;') +
			' top:' + y + 'px;'}, {
		'mouseout': function(e) {
			var el = $x('ancestor-or-self::*[starts-with(@id,"pstprew")]', e.relatedTarget);
			if(!el) delPrewievClones();
			else while(/pstprew/.test($next(el).id)) $del($next(el));
		}});
	var functor = function(clone, html) {
		clone.innerHTML = html;
		clone.Img = $x('.//img[@class="thumb"]', clone);
		refPrewiev(clone);
		expandHandleImg(clone);
	};
	if(b == board) var post = postByNum[pNum];
	var aj = ajaxPosts[tNum];
	if(post) {
		functor(clone, ($x('.//td[@class="reply"]', post) || post).innerHTML);
		if(post.Vis == HIDE) modPostDisp(clone);
	} else if(aj && aj[pNum]) functor(clone, aj[pNum]);
	else {
		clone.innerHTML = 'Загрузка...';
		AJAX('thr', b, tNum, function(err) {
			var p = ajaxPosts[tNum][pNum];
			if(p) functor(clone, p);
			else clone.textContent = err ? err : 'Пост не найден';
		});
	}
	$before(ndelform, [clone]);
}

function refPrewiev(node) {
	$each($X('.//a[starts-with(text(),">>")]', node || delform), function(link) {
		if(ch.dc) {
			if(!nav.Opera) {if(link.getAttribute('onmouseover')) link.removeAttribute('onmouseover')}
			else if(link.onmouseover) link.onmouseover = '';
		}
		$event(link, {
			'mouseover': doPostPreview,
			'mouseout': function(e) {
				if(!$x('ancestor-or-self::*[starts-with(@id,"pstprew")]', e.relatedTarget))
					delPrewievClones();
			}});
	});
}

function delPrewievClones() {
	$each($X('.//div[starts-with(@id,"pstprew")]'), function(clone) {$del(clone)});
}


/*=============================================================================
								AJAX FUNCTIONS
=============================================================================*/

function parseHTMLdata(x) {
	var threads = x.substring(x.search(/<form[^>]+del/) + x.match(/<form[^>]+del[^>]+>/).toString().length, /userdelete">/.test(x) ? x.indexOf('userdelete">') - 13 : (/deletebuttons/.test(x) ? x.indexOf('deletebuttons') - 70 : x.lastIndexOf('<form') - 5)).split(/<br clear="left"[\s<\/p>]*<h[r\s\/]*>/i);
	for(var i = 0, tLen = threads.length - 1; i < tLen; i++) {
		var tNum = parseInt(threads[i].match(/(?:<input type="ch[^\d]+)(\d+)(?:[^>]+>)/)[1]);
		var posts = threads[i].split(/<table[^>]*>/);
		ajaxThrds[i] = tNum;
		ajaxPosts[tNum] = {keys: []};
		for(var j = 0, pLen = posts.length; j < pLen; j++) {
			var x = posts[j];
			var pNum = parseInt(x.match(/(?:<input type="ch[^\d]+)(\d+)(?:[^>]+>)/)[1]);
			ajaxPosts[tNum].keys.push(pNum);
			ajaxPosts[tNum][pNum] = x.substring((!/<\/td/.test(x) && /filesize">/.test(x)) ? x.indexOf('filesize">') - 13 : x.indexOf('<label'), /<\/td/.test(x) ? x.lastIndexOf('</td') : (/omittedposts">/.test(x) ? x.lastIndexOf('</span') + 7 : (/<\/div/.test(x) && !ks ? x.lastIndexOf('</div') + 6 : x.lastIndexOf('</blockquote') + 13)));
		}
	}
}

function parseJSONdata(x) {
	var threads = jsonParse(x.substring(x.indexOf('threads') - 2, x.lastIndexOf('events') - 3)).threads;
	for(var i = 0, tLen = threads.length; i < tLen; i++) {
		var tNum = threads[i].display_id;
		var posts = threads[i].posts;
		ajaxThrds[i] = tNum;
		ajaxPosts[tNum] = {keys: []};
		for(var j = 0, pLen = posts.length; j < pLen; j++) {
			var x = posts[j];
			var pNum = x.display_id;
			ajaxPosts[tNum].keys.push(pNum);
			var farr = [];
			for(var f = 0, fLen = x.files.length; f < fLen; f++) {
				var fl = x.files[f];
				farr[farr.length] = '<div class="file"><div class="fileinfo">Файл: <a href="/' + fl.src + '" target="_blank">' + fl.thumb.substr(fl.thumb.lastIndexOf('/') + 1) + '</a><br><em>' + fl.src.substr(fl.src.indexOf('.') + 1) + ', ' + (fl.size/1024).toFixed(2) + ' KB</em><br></div><a href="/' + fl.src + '" target="_blank"><img src="/' + fl.thumb + '" class="thumb" alt="/' + fl.src + '"></a></div>';
			}
			ajaxPosts[tNum][pNum] = '<label><a class="delete icon"><img src="/images/blank.png"></a>' + (x.sage ? '<img src="/images/sage-carbon.png" alt="Сажа" title="Сажа">' : '') + (x.subject ? '<span class="replytitle">' + x.subject + '</span>' : '') + '<span class="postername">' + x.name + '</span> ' + x.date + ' </label><span class="reflink"><a href="/' + board + '/res/' + tNum + '.xhtml#i' + pNum + '">No.' + pNum + '</a></span>' + (j == 0 ? '<span class="cpanel">[<a href="/' + board + '/res/' + tNum + '.xhtml">Открыть тред</a>]</span>' : '') + '<br>' + (x.files.length > 0 ? farr.join('') + (x.files.length > 1 ? '<br style="clear: both">' : '') : '') + '<div class="postbody"><div class="message">' + x.message.replace(/>/g, '&gt;').replace(/</g, '&lt;').replace(/\n/g, '<br>').replace(/(&gt;&gt;)(\d+)/g, '<a href="/' + board + '/res/' + tNum + '.xhtml#i$2">&gt;&gt;$2</a>').replace(/(http:\/\/.*?)(\s)/ig, '<a href="$1">$1</a>$2').replace(/(\*\*)(.*?)(\*\*)/g, '<b>$2</b>').replace(/(\*)(.*?)(\*)/g, '<i>$2</i>').replace(/(%%)(.*?)(%%)/g, '<span class="spoiler">$2</span>') + '</div></div>';
		}
	}
}

function AJAX(mod, b, id, callback) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if(xhr.readyState != 4) return;
		if(xhr.status == 200) {
			if(ch.dc) parseJSONdata(xhr.responseText);
			else parseHTMLdata(xhr.responseText);
			callback(null);
		} else callback('HTTP ' + xhr.status + ' ' + xhr.statusText);
	};
	xhr.open('GET', (mod == 'thr'
		? (ch.dc 
			? '/api/thread/new/' + b + '/' + id + '.json?last_post=0'
			: '/' + b + '/res/' + id + '.html')
		: ('/' + b + '/' + (ch.dc
			? ((id != '' ? id : 'index') + '.json?last_post=0')
			: (id != '' ? id + '.html' : ''))))
	, true);
	xhr.send(false);
}

function getNewPost(pNum, html, i) {
	return $new(i > 0 ? 'table' : 'div', {
		'class': (i > 0 ? 'replypost' : 'oppost'),
		'id': 'post_' + pNum,
		'html': (i > 0 ? '<tbody><tr><td class="doubledash">&gt;&gt;</td><td class="reply" id="reply' + pNum + '">' + html + '</td></tr></tbody>' : html)});
}

function addPostFunc(post, pNum, count, isLoad) {
	if(count == 1) oPosts[oPosts.length] = post;
	else Posts[Posts.length] = post;
	postByNum[pNum] = post;
	post.Num = pNum;
	post.Count = count;
	if(!(sav.cookie && main)) post.Vis = getVisib(pNum);
	post.Msg = getPostMsg(post);
	post.Text = getText(post.Msg).trim();
	post.Img = $x('.//img[@class="thumb"]', post);
	post.isSage = isSagePost(post);
	post.isLoad = isLoad;
	post.isOp = count == 1;
	addPostButtons(post);
	doPostFilters(post);
	if(post.Vis == HIDE) setPostVisib(post, HIDE);
	if(Cfg[12] == 1) mergeHidden(post);
	if(Cfg[15] == 1) refMap(post);
	if(Cfg[23] != 0 && wk) expandHandleImg(post);
	if(Cfg[26] == 1) refPrewiev(post.Msg);
	if(Cfg[27] == 1) addYouTube(post);
	if(Cfg[28] == 1) addMP3(post);
}

function ajaxExpandPost(post) {
	if(post.Vis == HIDE || !$x('.//div[@class="abbrev"]', post)) return;
	var tNum = getThread(post).id.match(/\d+/);
	AJAX('thr', board, tNum, function() {
		var txt = ajaxPosts[tNum][post.Num];
		post.Msg = $html(post.Msg, txt.substring(txt.indexOf('<blockquote') + 12, txt.lastIndexOf('</blockquote>')));
		post.Text = getText(post.Msg);
		if(Cfg[26] == 1) refPrewiev(post.Msg);
		if(Cfg[27] == 1) addYouTube(post);
		if(Cfg[28] == 1) addMP3(post);
	});
}

function ajaxExpandThread(post, last) {
	var thread = getThread(post);
	var tNum = post.Num;
	$del($x('.//span[@class="omittedposts"]|.//div[@class="abbrev"]', thread));
	$del($id('rfmap_' + tNum));
	if(Cfg[24] == 1 && wk) ajaxExpandPost(post);
	delNexts(post);
	AJAX('thr', board, tNum, function() {
		var len = ajaxPosts[tNum].keys.length;
		if(last != 1) last = len - last;
		if(last <= 0) last = 1;
		for(var i = last; i < len; i++) {
			var pNum = ajaxPosts[tNum].keys[i];
			addPostFunc(thread.appendChild(getNewPost(pNum, ajaxPosts[tNum][pNum], i)), pNum, i + 1, true);
		}
		if(!sav.cookie) storeHiddenPosts();
	});
}

function ajaxNewPosts() {
	var thread = $x('.//div[@class="thread"]');
	var tNum = oPosts[0].Num;
	AJAX('thr', board, tNum, function() {
		for(var i = Posts.length + 1, len = ajaxPosts[tNum].keys.length; i < len; i++) {
			var pNum = ajaxPosts[tNum].keys[i];
			var post = getNewPost(pNum, ajaxPosts[tNum][pNum], i);
			if(Cfg[37] == 1) $before($id('newpst_btn'), [post]);
			else {if(ch._0ch) $before($x('.//span[@style="float: right;"]', thread), [post]);
			else thread.appendChild(post)}
			addPostFunc(post, pNum, i + 1, true);
		}
		storeHiddenPosts();
	});
	if(Cfg[37] == 1) $id('newpst_btn').innerHTML = '[<i><a>Новые посты:</a></i> 0]';
}

function initNewPosts() {
	if(Cfg[37] == 1) {
		var thread = $x('.//div[@class="thread"]');
		var tNum = oPosts[0].Num;
		var txt = '[<i><a>Новые посты:</a></i> ';
		var x = $new('span', {
			'id': 'newpst_btn',
			'style': 'cursor:pointer',
			'html': txt + '0]'}, {
			'click': ajaxNewPosts});
		if(ch._0ch) $before($x('.//span[@style="float: right;"]', thread), [x]);
		else thread.appendChild(x);
		setInterval(function() {AJAX('thr', board, tNum, function() {$id('newpst_btn').innerHTML = txt + parseInt(ajaxPosts[tNum].keys.length - Posts.length - 1) + ']'})}, 60000);
	}
	if(Cfg[37] == 2) setInterval(ajaxNewPosts, 60000);
}

function ajaxPages(len) {
	delChilds(delform);
	Posts = []; oPosts = [];
	for(var p = 0; p < len; p++) {
		AJAX('brd', board, p == 0 ? '' : p, function() {
			for(var i = 0, tLen = ajaxThrds.length; i < tLen; i++) {
				var tNum = ajaxThrds[i];
				var thread = $new('div', {'class': 'thread', 'id': tNum});
				$append(delform, [thread, $new('br', {'clear': 'left'}), $new('hr')]);
				for(var j = 0, pLen = ajaxPosts[tNum].keys.length; j < pLen; j++) {
					var pNum = ajaxPosts[tNum].keys[j];
					var post = getNewPost(pNum, ajaxPosts[tNum][pNum], j);
					thread.appendChild(post);
					addPostFunc(post, pNum, j + 1, false);
					if(Cfg[24] == 1 && wk) ajaxExpandPost(post);
				}
			}
			if(!sav.cookie) storeHiddenPosts();
		})
	}
}


/*=============================================================================
								HIDERS / FILTERS
=============================================================================*/

function hideThread(post, note) {
	if(post.Vis == HIDE) return;
	modPostDisp(post, HIDE);
	var x = $new('span', {
		'class': 'reply',
		'id': 'hiddenthr_' + post.Num,
		'style': 'display:inline; cursor:default',
		'html': 'Тред <a style="cursor:pointer">№' + post.Num + '</a> скрыт <i>(' + (!note ? getTitle(post).substring(0, 50) : 'autohide: ' + note) + ')' + '</i>'});
	$event($x('.//a', x), {'click': function() {unhideThread(post)}});
	$after($up(post), [x]);
	if(Cfg[12] == 2) {toggleDisp(x); toggleDisp($next(x)); toggleDisp($next($next(x)))}
}

function unhideThread(post) {
	if(post.Vis == UNHIDE) return;
	modPostDisp(post, UNHIDE);
	$del($id('hiddenthr_' + post.Num));
	storeThreadVisib(post, UNHIDE);
}

function prevHidden(e) {modPostDisp(getPost(this), UNHIDE)}
function unprevHidden(e) {modPostDisp(getPost(this), HIDE)}

function applyPostVisib(post, vis) {
	if(post.isOp) return;
	if(!sav.cookie) {
		Visib[board + post.Num] = vis;
		Expires[board + post.Num] = (new Date()).getTime() + STORAGE_LIFE;
	} else Visib[post.Count] = vis;
	post.Vis = vis;
	if(Cfg[12] == 2) post.style.display = (vis == HIDE) ? 'none' : '';
}

function setPostVisib(post, vis) {
	if(post.isOp) {
		if(vis == HIDE) hideThread(post);
		else unhideThread(post);
		return;
	}
	var reflink = post.Btns.previousSibling;
	post.Btns.firstChild.className = (vis == HIDE) ? 'unhide_icn' : 'hide_icn';
	modPostDisp(post, vis);
	applyPostVisib(post, vis);
	if(Cfg[14] == 0) return;
	if(vis == HIDE) $event(reflink, {'mouseover': prevHidden, 'mouseout': unprevHidden});
	else $revent(reflink, {'mouseover': prevHidden, 'mouseout': unprevHidden});
}

function togglePostVisib(post) {
	post.Vis = (post.Vis == UNHIDE) ? HIDE : UNHIDE;
	setPostVisib(post, post.Vis);
	storePostsVisib();
}

function hidePost(post, note) {
	if(!post.isOp) {
		if(post.Vis != HIDE) addNote(post, ' autohide: ' + note + ' ');
		applyPostVisib(post, HIDE);
	} else if(Cfg[13] == 1) {
		hideThread(post, note);
		storeThreadVisib(post, HIDE);
	}
}

function unhidePost(post) {
	if(!post.isOp) {
		if(detectWipe(post) != null) return;
		setPostVisib(post, UNHIDE);
		$del($id('note_' + post.Num));
		hideByWipe(post);
	} else if(Cfg[13] == 1) unhideThread(post);
}

function toggleSamePost(post, vis, expr, note) {
	if(!expr) return;
	$del($id('note_' + post.Num));
	if(vis == UNHIDE) hidePost(post, note);
	else unhidePost(post);
}

function storeHiddenPosts() {
	forPosts(function(post) {if(post.Vis == HIDE) setPostVisib(post, HIDE)});
	storePostsVisib();
}

function modPostDisp(post, vis) {
	var x = [], i = 0;
	x[i++] = 'br';
	x[i++] = 'small';
	if(!ch.dc) {
		x[i++] = 'blockquote';
		x[i++] = 'img[starts-with(@class,"thumb")]';
		x[i++] = 'span[@class="filesize"]';
		x[i++] = 'div[@class="nothumb"]'; 
	} else {
		x[i++] = 'div[@class="postbody"]';
		x[i++] = 'div[@class="file"]';
		x[i++] = 'div[@class="fileinfo"]';
	}
	if(wk) {
		$del($x('.//img[@id="full_img"]', post));
		x[i++] = 'span[@class="thumbnailmsg"]';
	}
	if(post.isOp) {
		x[i++] = 'span[@class="omittedposts"]';
		x[i++] = 'div[@class="abbrev"]';
		toggleDisp($up(post));
	}
	while(i--) $each($X('.//' + x[i], post),
		function(node) {node.style.display = (vis == HIDE) ? 'none' : ''});
}

function mergeHidden(post) {
	if(post.Vis != HIDE) return;
	var div = $prev(post);
	var next = $next(post);
	if(!/merged/.test(div.id)) {
		div = $new('div', {'id': 'merged_' + post.Num, 'style': 'display:none'});
		$before(post, [$new('span', {
			'style': 'display:block; cursor:pointer'}, {
			'click': function() {
				var hDiv = $id('merged_' + post.Num);
				$prev(hDiv).innerHTML = (hDiv.style.display == 'none' ? unescape('%u25BC') : unescape('%u25B2')) + '[<i><a>Скрыто:</a> ' + hDiv.childNodes.length + '</i>]';
				toggleDisp(hDiv)}}
		), div]);
	}
	div.appendChild(post);
	if(!next || getVisib(next.id.match(/\d+/)) == UNHIDE)
		$prev(div).innerHTML = unescape('%u25B2') + '[<i><a>Скрыто:</a> ' + div.childNodes.length + '</i>]';
}

function processHidden(newCfg, oldCfg) {
	if(newCfg == 2 || oldCfg == 2) {
		forPosts(function(post) {if(post.Vis == HIDE) toggleDisp(post)});
		if(Cfg[13] == 1) $each($X('.//span[starts-with(@id,"hiddenthr_")]'), function(x) {
			toggleDisp(x); toggleDisp($next(x)); toggleDisp($next($next(x)))});
	}
	if(oldCfg == 1) 
		$each($X('.//div[starts-with(@id,"merged_")]'), function(div) {
			var px = div.childNodes;
			var i = px.length;
			while(i--) $after(div, [px[i]]);
			$del($prev(div));
			$del(div);
		});
	if(newCfg == 1) forAll(mergeHidden);
	saveCfg(12, newCfg);
}

function showLast50() {
	var div = $id('last50');
	if(!div) {
		div = $new('div', {'id': 'last50', 'style': 'display:none'});
		$before(Posts[0], [div]);
		for(var i = 0; i < Posts.length - 50; i++)
			div.appendChild(Posts[i]);
	} else toggleDisp(div);
}

/*-----------------------------------Filters---------------------------------*/

function doPostFilters(post) {
	if(post.Vis == HIDE) return;
	var C = Cfg;
	if(C[0] == 1) hideByWipe(post);
	if(C[1] == 1 && !ch.iich) hideBySage(post);
	if(C[2] == 1 && Rtitle && !post.isOp) hideByTitle(post);
	if(C[3] == 1) hideByNoText(post);
	if(C[4] == 1) hideByNoImage(post);
	if(C[8] == 1) hideByMaxtext(post);
	if(C[10] == 1) hideByRegexp(post);
}

function hideBySage(post) {
	if(post.isSage) hidePost(post, 'sage')
}
function toggleSage() {
	toggleCfg(1);
	if(Cfg[1] == 1) forAll(hideBySage);
	else forAll(function(post) {if(post.isSage) unhidePost(post)});
	storeHiddenPosts();
}

function hideByNoText(post) {
	if(post.Text == '') hidePost(post, 'no text')
}
function toggleNotext() {
	toggleCfg(3);
	if(Cfg[3] == 1) forAll(hideByNoText);
	else forAll(function(post) {if(post.Text == '') unhidePost(post)});
	storeHiddenPosts();
}

function hideByNoImage(post) {
	if(!post.Img) hidePost(post, 'no image')
}
function toggleNoimage() {
	toggleCfg(4);
	if(Cfg[4] == 1) forAll(hideByNoImage);
	else forAll(function(post) {if(!post.Img) unhidePost(post)});
	storeHiddenPosts();
}

function hideByTitle(post) {
	if(!ch._0ch && $x('.//span[@class="replytitle"]', post).textContent.trim() == '') return;
	if(ch._0ch && !$x('.//span[@class="filetitle"]', post)) return;
	hidePost(post, 'theme field');
}
function toggleTitle() {
	toggleCfg(2);
	if(Cfg[2] == 1) forPosts(hideByTitle);
	else forPosts(function(post) {
		if(!ch._0ch && $x('.//span[@class="replytitle"]', post).textContent == '') return;
		if(ch._0ch && !$x('.//span[@class="filetitle"]', post)) return;
		unhidePost(post)});
	storeHiddenPosts();
}

function hideByMaxtext(post) {
	var len = post.Text.replace(/\n/g, '').length;
	if(len >= parseInt(Cfg[9]))
		hidePost(post, 'text n=' + len + ' > max');
}
function toggleMaxtext() {
	var fld = $id('maxtext_field');
	if(isNaN(fld.value)) {
		$id('maxtext_hider').checked = false;
		saveCfg(8, 0);
		alert('введите число знаков');
		return;
	}
	toggleCfg(8);
	saveCfg(9, fld.value);
	if(Cfg[8] == 1) forAll(hideByMaxtext);
	else forAll(function(post) {
		if(post.Text.replace(/\n/g, '').length >= parseInt(Cfg[9]))
		unhidePost(post);
	});
	storeHiddenPosts();
}

/*--------------------------Hide posts by expressions------------------------*/

function hideByRegexp(post) {
	var exp = doRegexp(post);
	if(exp) hidePost(post, 'match ' + exp.substring(0, 20) + '..');
}

function applyRegExp(txt) {
	var fld = $id('regexp_field');
	var val = fld.value.trim();
	if(txt) {
		if(txt.trim() == '') return;
		toggleRegexp();
		var nval = '\n' + val;
		var ntxt = '\n' + txt;
		val = (nval.indexOf(ntxt) > -1 ? nval.split(ntxt).join('') : val + ntxt).trim();
	}
	fld.value = val;
	setStored(ID('RegExpr'), val);
	$id('regexp_hider').checked = val != '';
	if(val != '') {
		saveCfg(10, 1);
		forAll(hideByRegexp);
		storeHiddenPosts();
	} else saveCfg(10, 0);
}

function toggleRegexp() {
	var val = $id('regexp_field').value.trim();
	setStored(ID('RegExpr'), val);
	if(val != '') {
		toggleCfg(10);
		if(Cfg[10] == 1) forAll(hideByRegexp);
		else forAll(function(post) {if(doRegexp(post)) unhidePost(post)})
		storeHiddenPosts();
	} else {
		$id('regexp_hider').checked = false;
		saveCfg(10, 0);
	}
}

function doRegexp(post) {
	var expr = getStored(ID('RegExpr')).split('\n');
	var pname = $x('.//span[@class="commentpostername" or @class="postername"]', post);
	var ptrip = $x('.//span[@class="postertrip"]', post);
	var ptitle = $x('.//span[@class="replytitle" or @class="filetitle"]', post);
	var i = expr.length;
	while(i--) {
		var x = expr[i].trim();
		if(/\$img /.test(x)) {
			if(!post.Img) continue;
			var img = doImgRegExp(post, x.split(' ')[1]);
			if(img != null) return img; else continue;
		}
		if(/\$name /.test(x)) {
			x = x.split(' ')[1];
			var nm = x.split(/!+/)[0];
			var tr = x.split(/!+/)[1];
			if(pname && nm != '' && pname.textContent.indexOf(nm) > -1 ||
				ptrip && tr != '' && ptrip.textContent.indexOf(tr) > -1) return x;
		}
		if(/\$exp /.test(x)) {
			x = x.split(' ')[1];
			var l = x.lastIndexOf('/');
			var re = new RegExp(x.substr(1, l - 1), x.substr(l + 1));
			if(post.Text.match(re)) return x;
			if(ptitle && re.test(ptitle.textContent)) return x;
		}
		if(x == '$alltrip' && ptrip) return x;
		x = x.toLowerCase();
		if(ptitle && ptitle.textContent.toLowerCase().indexOf(x) > -1) return x;
		if(post.Text.toLowerCase().indexOf(x) > -1) return x;
	}
	return null;
}

function regExpImage(post) {
	if(!post.Img) {
		toggleNoimage();
		toggleChk($id('noimage_hider'));
	} else applyRegExp('$img =' + getImgWeight(post) + '@' + getImgSize(post));
}

function doImgRegExp(post, expr) {
	if(expr == '') return null;
	var s = expr.split('@');
	var stat = s[0].substring(0, 1);
	var expK = s[0].substring(1);
	if(expK != '') {
		var imgK = getImgWeight(post);
		if((stat == '<' && imgK < expK) ||
			(stat == '>' && imgK > expK) ||
			(stat == '=' && imgK == expK))
			{if(!s[1]) return('image ' + expr)}
		else return null;
	}
	if(s[1]) {
		var x = s[1].split(/[x|×]/);
		var expW = x[0], expH = x[1];
		var sz = getImgSize(post).split(/[x|×]/);
		var imgW = sz[0], imgH = sz[1];
		if((stat == '<' && imgW < expW && imgH < expH) ||
			(stat == '>' && imgW > expW && imgH > expH) ||
			(stat == '=' && (imgW == expW && imgH == expH)))
			return 'image ' + expr;
	}
	return null;
}

function getImgWeight(post) {
	var inf = $x('.//em|.//span[@class="filesize"]', post).textContent.match(/\d+[\.\d\s|m|k|к]*[b|б]/i)[0];
	var w = parseFloat(inf.match(/[\d|\.]+/));
	if(/MB/.test(inf)) w = w*1000;
	if(/\d[\s]*B/.test(inf)) w = (w/1000).toFixed(2);
	return w;
}

function getImgSize(post) {
	return $x('.//em|.//span[@class="filesize"]', post).textContent.match(/\d+[x|×]\d+/)[0];
}

/*-------------------------Hide posts with similar text----------------------*/

function getWrds(post)
	{return post.Text.replace(/\s+/g, ' ').replace(/[\?\.\\\/\+\*\$\^\(\)\|\{\}\[\]!@#%_=:;<,-]/g, '').substring(0, 1000).split(' ')}

function hideBySameText(post) {
	if(post.Text == '') {
		toggleNotext();
		toggleChk($id('notext_hider'));
		return;
	}
	var vis = post.Vis;
	forAll(function(target) {findSameText(target, post, vis, getWrds(post))});
	storeHiddenPosts();
}

function findSameText(post, origPost, origVis, origWords) {
	var words = getWrds(post);
	var origLen = origWords.length;
	if(words.length > origLen*2.5 || words.length < origLen*0.5) return;
	var matchCount = 0;
	var i = origWords.length;
	while (i--) {
		if(origWords.length > 6 && origWords[i].length < 3) {origLen--; continue}
		var j = words.length;
		while (j--) if((words[j] == origWords[i]) || (origWords[i].substring(0, 2) == '>>' && words[j].substring(0, 2) == '>>')) matchCount++;
	}
	toggleSamePost(post, origVis, matchCount >= origLen*0.5 && words.length < origLen*2.5, ' same text as >>' + origPost.Num);
}

/*-------------------------Hide posts with similar images----------------------*/

function getPix(img, iw, ih) {
	var cn = $new('canvas', {'width': iw, 'height': ih}).getContext('2d');
	cn.drawImage(img, 0, 0);
	return cn.getImageData(0, 0, iw, ih).data;
}

function hideBySameImage(post) {
	var img = post.Img;
	if(!img) {
		toggleNoimage();
		toggleChk($id('noimage_hider'));
		return;
	}
	var iw = img.width, ih = img.height;
	var iData = getPix(img, iw, ih);
	for(var i = 0; i < ih; i += 10) 
		for(var j = 0; j < iw; j += 10) {
			var n = (i*4)*iw + (j*4);
			var mix = Math.round((iData[n] + iData[n + 1] + iData[n + 2])*0.3333);
			iData[n] = mix;
			iData[n + 1] = mix;
			iData[n + 2] = mix;
		}
	var vis = post.Vis;
	forAll(function(target) {findSameImages(target, post, vis, iData)});
	storeHiddenPosts();
}

function findSameImages(post, origPost, origVis, iData) {
	var img = post.Img;
	if(!img) return;
	var matchCount = 0, count = 0;
	var iw = img.width, ih = img.height;
	var sData = getPix(img, iw, ih);
	for(var i = 0; i < ih; i += 10) 
		for(var j = 0; j < iw; j += 10) {
			var n = (i*4)*iw + (j*4);
			var mix = Math.round((sData[n] + sData[n + 1] + sData[n + 2])*0.3333);
			if(iData[n] <= mix + 10 && iData[n] >= mix - 10) matchCount++;
			count++;
		}
	toggleSamePost(post, origVis, matchCount/count >= 0.5, ' image as >>' + origPost.Num + ' (' + parseInt(matchCount/count*100) + '%)');
}


/*=============================================================================
								WIPE DETECTORS
=============================================================================*/

function detectWipe(post) {
	var detectors = [
		detectWipe_sameLines,
		detectWipe_sameWords,
		detectWipe_specSymbols,
		detectWipe_longColumn,
		detectWipe_longWords,
		detectWipe_numbers,
		detectWipe_caseWords
	];
	for(var i = 0; i < detectors.length; i++) {
		var detect = detectors[i](post.Text);
		if(detect != null) return detect;
	}
	return null;
}

function hideByWipe(post) {
	if(post.Vis == HIDE || post.Vis == UNHIDE) return;
	var note = detectWipe(post);
	if(note != null) hidePost(post, note);
	else applyPostVisib(post, UNHIDE);
}

function detectWipe_longColumn(txt) {
	var n = 0;
	var rows = txt.split('\n');
	var len = rows.length;
	for(var i = 0; i < len; i++) {
		if(rows[i].length < 9) n++;
		else return null;
	}
	if(len > 45) return 'long text x' + len;
	if(n > 5) return 'columns x' + n;
	return null;
}

function detectWipe_sameLines(txt) {
	var lines = txt.replace(/(> )/g, '').split('\n');
	var len = lines.length;
	if(len < 5) return null;
	var arr = [], n = 0;
	for(var i = 0; i < len; i++)
		if(lines[i].length > 0) {n++; incc(arr, lines[i])}
	for(var x in arr)
		if(arr[x] > n/4 && arr[x] >= 5)
			return 'same lines: "' + x.substr(0, 20) + '" x' + parseInt(arr[x] + 1);
	return null;
}

function detectWipe_sameWords(txt) {
	txt = txt.replace(/[\.\?\!,>]/g, ' ').replace(/\s+/g, ' ').toUpperCase();
	var words = txt.split(' ');
	var len = words.length;
	if(len <= 13) return null;
	var arr = [], n = 0;
	for(var i = 0; i < len; i++)
		if(words[i].length > 1) {n++; incc(arr, words[i])}
	if(n <= 10) return null;
	var keys = 0, pop = '', mpop = -1;
	for(var x in arr) {
		keys++;
		if(arr[x] > mpop) {mpop = arr[x]; pop = x}
		if(n > 25 && arr[x] > n/3.5)
			return 'same words: "' + x.substr(0, 20) + '" x' + arr[x];
	}
	pop = pop.substr(0, 20);
	if((n > 80 && keys <= 20) || n/keys > 7)
		return 'same words: "' + pop + '" x' + mpop;
	return null;
}

function detectWipe_longWords(txt) {
	txt = txt.replace(/http:\/\/.*?(\s|$)/g, '').replace(/[\.\?!,>:;-]/g, ' ').replace(/\s+/g, ' ');
	var words = txt.split(' ');
	var n = 0, all = '', lng = '';
	for(var i = 0, len = words.length; i < len; i++)
		if(words[i].length > 1) {
			n++;
			all += words[i];
			lng = words[i].length > lng.length ? words[i] : lng;
		}
	if((n == 1 && lng.length > 70) || (n > 1 && all.length/n > 12))
		return 'long words: "' + lng.substr(0, 20) + '.."';
	return null;
}

function detectWipe_caseWords(txt) {
	txt = txt.replace(/[\.\?!,-]/g, ' ').replace(/\s+/g, ' ');
	var words = txt.split(' ');
	var len = words.length;
	if(len <= 4) return null;
	var n = 0, all = 0, caps = 0;
	for(var i = 0; i < len; i++) {
		if(words[i].length < 5) continue;
		all++;
		var word = words[i];
		var up = word.toUpperCase();
		var lw = word.toLowerCase();
		var upc = 0, lwc = 0;
		var cap = word.match(/[a-zа-я]/ig);
		if(cap) {
			cap = cap.toString().trim();
			if(cap != '' && cap.toUpperCase() == cap) caps++;
		}
		for(var j = 0; j < word.length; j++) {
			if(up.charAt(j) == lw.charAt(j)) continue;
			if(word.charAt(j) == up.charAt(j)) upc++;
			else if(word.charAt(j) == lw.charAt(j)) lwc++;
		}
		var min = upc < lwc ? upc : lwc;
		if(min >= 2 && lwc + upc >= 5) n++;
	}
	if(n/all >= 0.3 && all > 8) return 'cAsE words: ' + parseInt(n/len*100) + '%';
	if(caps/all >= 0.3 && all > 5) return 'CAPSLOCK';
	return null;
}

function detectWipe_specSymbols(txt) {
	txt = txt.replace(/\s+/g, '');
	var all = txt; 
	txt = txt.replace(/[0-9A-Za-zА-Яа-я\.\?!,]/g, '');
	var proc = txt.length/all.length;
	if(all.length > 30 && proc > 0.40)
		return 'specsymbols: ' + parseInt(proc*100) + '%';
	return null;
}

function detectWipe_numbers(txt) {
	txt = txt.replace(/\s+/g, ' ').replace(/(>>)(\d+)/g, '').replace(/http:\/\/.*?(\s|$)/g, '');
	var len = txt.length;
	var proc = (len - txt.replace(/[0-9]/g, '').length)/len;
	if(len > 30 && proc > 0.4) return 'numbers: ' + parseInt(proc*100) + '%';
	return null;
}


/*=============================================================================
								INITIALIZATION
=============================================================================*/

function initBoard() {
	var ua = navigator.userAgent;
	nav = {
		Firefox: /firefox|minefield/i.test(ua),
		Opera: /opera/i.test(ua),
		Chrome: /chrome/i.test(ua)
	};
	var ls = !nav.Firefox && typeof localStorage === 'object' && localStorage != null;
	sav = {
		GM: nav.Firefox,
		local: ls,
		cookie: !ls && !nav.Firefox
	};
	var dm = location.host.match(/(?:(?:[^.]+\.)(?=org\.))?[^.]+\.[^.]+$/)
	ch = {
		_0ch: dm == '0chan.ru',
		_2ch: dm == '2-ch.ru',
		iich: dm == 'iichan.ru',
		dc: dm == 'dobrochan.ru',
		unyl: dm == 'wakachan.org',
		nowr: dm == 'nowere.net',
		_410: dm == '410chan.ru',
		ua: dm == 'uchan.org.ua',
		sib: dm == 'sibirchan.ru'
	};
	domain = dm;
	wk = !ch.dc && !ch._0ch;
	ks = ch._410 || ch.sib;
	wakaba = wk && !ks;
	var path = location.pathname;
	main = !/\/res\//.test(path);
	board = path.substr(1).split('/')[0];
	delform = !ch.dc ? $id('delform') : $x('.//form[contains(@action, "delete")]');
	if(!delform) throw 'stop';
	ndelform = $next(delform);
	Rname = Rmail = Rgoto_tr = Rpass = Rrules = QR = undefined;
	postform = $id('postform');
	if(!postform) return;
	captcha = $n('captcha') || $n('faptcha');
	Rsubm = $x('.//input[@type="submit"]', postform);
	Rrules = $x('.//div[@class="rules"]|.//td[@class="rules"]');
	Rgoto_tr = $id('trgetback');
	if(!ch.unyl) Rpass = $n('password') || $n('postpassword');
	if(ch._2ch) {
		Rname = $n('akane');
		Rmail = $n('nabiki');
		Rtitle = $n('kasumi');
		Rmess = $n('shampoo');
		Rfile = $n('file');
	}
	if(ch._0ch || ks) {
		Rname = $n('name');
		Rmail = $n('em');
		Rtitle = $n('subject');
		Rmess = $n('message');
		Rfile = $n('imagefile');
		if(ch._0ch) Rgoto_tr = $up($n('gotothread'), 3);
	}
	if(ch.iich) {
		Rname = $n('nya1');
		Rmail = $n('nya2');
		Rtitle = $n('nya3');
		Rmess = $n('nya4');
		Rfile = $n('file');
		Rgoto_tr = $up($n('postredir'), 3);
	}
	if(ch.dc) {
		Rname = $n('name');
		Rmail = $n('sage');
		Rtitle = $n('subject');
		Rmess = $n('message');
		Rfile = $n('file_1');
	}
	if(ch.unyl || ch.nowr || ch.ua) {
		Rname = $n('field1');
		Rmail = $n('dont_bump') || $n('field2');
		Rtitle = $n('field3');
		Rmess = $n('field4');
		Rfile = $n('file');
	}
}

function initDelform() {
	if(nav.Chrome) toggleDisp(delform);
	if(wakaba && !ch.iich || (ch.sib && !main)) {
		var thrd_re = /<br clear="left"[<\/p>\s]*<hr>/i;
		var tNum_re = /(?:<a name=")(\d+)(?:">)/i;
		var threads = delform.innerHTML.split(thrd_re);
		var i = threads.length - 1;
		while(i--) {
			var posts = threads[i].split(/<table[^>]*>/i);
			var j = posts.length;
			while(j-- > 1) posts[j] = '<table class="replypost" id="post_' + posts[j].match(tNum_re)[1] + '">' + posts[j];
			var tNum = posts[0].match(tNum_re)[1];
			posts[0] = '<div class="oppost" id="post_' + tNum + '">' + posts[0] + '</div>';
			threads[i] = '<div class="thread" id="thread_' + tNum + '">' + posts.join('') + '</div>';
		}
		if(!nav.Chrome) toggleDisp(delform);
		delform = $html(delform, threads.join('<br clear="left"><hr>'));
		if(!nav.Chrome) toggleDisp(delform);
	} 
	else $each($X('./div[starts-with(@id, "thread")]', delform), function(thread) {
			$attr(thread, {'id': $prev($x('.//label', thread)).name, 'class': 'thread'})})
	if(ch.iich || ch._410 || (ch.sib && main)) {
		$each($X('.//td[@class="reply"]', delform), function(reply) {
			$attr($up(reply, 3), {'class': 'replypost', 'id': 'post_' + reply.id.match(/\d+/)})});
		$each($X('.//div[@class="thread" or starts-with(@id, "thread")]', delform), function(thread) {
			var op = $new('div', {'class': 'oppost', 'id': 'post_' + thread.id.match(/\d+/)});
			var nodes = thread.childNodes;
			var arr = [], x = 0;
			for(var node, j = 1; node = nodes[j++];) {
				if(node.tagName == 'TABLE' || $x('self::div[starts-with(@id,"replies")]', node)) break;
				arr[x++] = node;
			}
			for(var node, j = 0; node = arr[j++];)
				op.appendChild(node);
			$before(thread.firstChild, [op]);
		});
	}
	if(ch._0ch)
		$each($X('.//div[@class="postnode"]'), function(post) {
			var reply = $x('.//td[@class="reply"]', post);
			post.id = reply ? 'post_' + reply.id.match(/\d+/) : 'oppost_' + $up(post).id.match(/\d+/);
		});

	var px, opx;
	if(wk) {
		px = './/table[@class="replypost"]';
		opx = './/div[@class="oppost"]';
	}
	if(ch._0ch) {
		px = './/div[starts-with(@id,"post")]';
		opx = './/div[starts-with(@id,"oppost")]';
	}
	if(ch.dc) {
		px = './/table[starts-with(@class,"replypost")]';
		opx = './/div[starts-with(@class,"oppost")]';
	}
	$each($X(px, delform), function(post, i) {
		Posts[i] = post;
		post.isOp = false;
		post.Count = i + 2;
	});
	$each($X(opx, delform), function(post, i) {
		oPosts[i] = post;
		post.isOp = true;
		post.Count = 1;
	});
	forAll(function(post) {
		var num = post.id.match(/\d+/);
		var msg = getPostMsg(post);
		postByNum[num] = post;
		post.Msg = msg;
		post.Num = num;
		post.Text = getText(msg).trim();
		post.Img = $x('.//img[@class="thumb"]', post);
		post.isSage = isSagePost(post);
	});
}


/*=============================================================================
									MAIN
=============================================================================*/

function doScript() {
	const initTime = (new Date()).getTime();
	oldTime = initTime; timeLog = '';
	initBoard();					Log('initBoard');
	initDelform();					Log('initDelform');
	initCfg();						Log('initCfg');
	readPostsVisib();				Log('readPostsVisib');
	readThreadsVisib();				Log('readThreadsVisib');
	addControls();					Log('addControls');
	forAll(addPostButtons);			Log('addPostButtons');
	if(Cfg[26] == 1) {
		refPrewiev();				Log('refPrewiev')}
	if(Cfg[15] == 1) {
		refMap();					Log('refMap')}
	forAll(doPostFilters);			Log('doPostFilters');
	storeHiddenPosts();				Log('storeHiddenPosts');
	doChanges();					Log('doChanges');
	if(Cfg[37] != 0 && !main) {
		initNewPosts();				Log('initNewPosts')}
	if(Cfg[12] == 1) {
		forPosts(mergeHidden);		Log('mergeHidden')}
	if(Cfg[23] != 0 && wk) {
		forAll(expandHandleImg);	Log('expandHandleImg')}
	if(Cfg[24] == 1 && main && wk) {
		forAll(ajaxExpandPost);		Log('ajaxExpandPost')}
	if(Cfg[28] == 1) {
		searchMP3();				Log('addMP3')}
	if(Cfg[27] == 1) {
		forAll(addYouTube);			Log('addYouTube')}
	scriptStyles();					Log('scriptStyles');
	var endTime = oldTime - initTime;
	timeLog += '\n\nTotal: ' + endTime + 'ms';
	$id('process_time').textContent = 'Время обработки: ' + endTime + 'ms';
}

if(!/submitcheck/.test(window.name)) {
	if(window.opera) $event(doc, {'DOMContentLoaded': doScript});
	else doScript();
}
})();