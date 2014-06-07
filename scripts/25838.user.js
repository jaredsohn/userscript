// ==UserScript==
// @name           Overclockers.Ru Ajaxmod
// @namespace      http://overclockers.ru/
// @include        http://forums.overclockers.ru/*
// @include        http://overclockers.ru/*
// @include        http://www.overclockers.ru/*
// @include        http://people.overclockers.ru/*
// ==/UserScript==

var
// user config
	LOAD_FULL_ARTICLE = 1,
	LINK_TO_PRINT = 1,
	CHECK_AND_HIDE = { 'rules_readed': 1, 'search_used': 1, 'notify': 0 }; // 1 = hide, 0 = only check
// end of user config

// loading bug
var elt = document.getElementById('ar_container_1');
elt && elt.parentNode.removeChild(elt);

// forum-specific
if (location.host == 'forums.overclockers.ru') {
	// ajax login
	if (elt = $n('login', true)) elt.addEventListener('click', function(e) {
		e.preventDefault();
		with (this) value = 'Подождите...', disabled = true, style.color = 'grey';
		xhr('login.php', function(data) { location.hash = ''; },
			'username=' + $n('username', true).value + '&password=' + $n('password', true).value + '&autologin=1&login=1', true);
	}, false);

	// message input field customizations
	var message = $n('message');
	if (message) {
		var smilies = [':?:', ':abuse:', ':applause:', ':bandhead:', ':beer:', ':bow:', ':dance:', ':fingal:', ':grob:', ':gun:', ':haha:', ':hi:', ':hitrost:', ':insane:',
			':lol:', ':mad2:', ':neutral:', ':oops:', ':rip:', ':roll:', ':shock:', ':slobber:', ':spy:', ':super:', ':tooth:', ':up:', ':weep:', ':wink:', ':writer:'];
		with (message) removeAttribute('onclick'), removeAttribute('onselect'), removeAttribute('onkeyup');
		function textareamod(tarea) {
			tarea.addEventListener('focus', function() { message = this; }, false);
			tarea.addEventListener('keyup', function(e) {
				var tv = this.value, ts = this.selectionStart, te = this.selectionEnd, kC = e.keyCode;
				if (this.qson) {
					if (kC == 8 || kC == 46 || tv.substr(this.smst, ts).indexOf(':') > 0) { this.qson = false; return; }
					var rus = tv.charCodeAt(te - 1) > 1000, smi = rus ? tv.substring(this.smst, te-1) + String.fromCharCode(kC).toLowerCase() : tv.substring(this.smst, te), sprt = ts - this.smst, qsf = false;
					for (var i = 0, l = smilies.length; i < l; i++) {
						if (smilies[i].substr(0, sprt) == smi) {
							var saveScr = this.scrollTop;
							this.value = tv.substr(0, this.smst) + smilies[i] + tv.substr(ts);
							this.setSelectionRange(ts, this.smst + smilies[i].length);
							this.scrollTop=saveScr;
							qsf = true;
							break;
						}
					}
					if (!qsf) this.qson = false;
				}
				else {
					if(e.shiftKey && (kC == 59 || kC == 54)) {
						switch (tv.charAt(ts - 2)) {
						case ' ': case '\n': case '': case '\t':
							this.qson = true;
							this.smst = te - 1;
						}
					}
				}
			}, false);
			tarea.addEventListener('keydown', function(e) {
				if(e.ctrlKey && !e.altKey && !e.shiftKey) switch(e.keyCode) {
					case 66: bbstyle(0); e.preventDefault(); break;
					case 73: bbstyle(2); e.preventDefault(); break;
					case 85: bbstyle(4); e.preventDefault(); break;
					case 81: bbstyle(0, 'quote'); e.preventDefault(); break;
					case 80: bbstyle(14); e.preventDefault(); break;
		//	Ctrl-W	case 87: bbstyle(16); e.preventDefault(); break;
					case 76: bbstyle(0, 'color'); e.preventDefault(); break;
					case 83: bbstyle(0, 'size'); e.preventDefault(); break;
					case 69: bbstyle(0, 'url'); e.preventDefault(); break;
					case 70: bbstyle(24); e.preventDefault();
				}
			}, false);
			var resizer = tarea.parentNode.insertBefore(document.createElement('div'), tarea.nextSibling);
			resizer.style.cssText = 'position:relative;top:-2px;height:5px;background-color:dimgray;cursor:n-resize';
			resizer.addEventListener('mousedown', function() {
				this.previousSibling.focus();
				message.style.cursor = document.body.style.cursor = 'n-resize';
				var resOffs = offs(message, 'offsetTop'), resizeMsg = function(e) {
					message.style.height = (e.pageY - resOffs) + 'px';
				};
				document.body.addEventListener('mousemove', resizeMsg, false);
				document.body.addEventListener('mouseup', function() {
					this.removeEventListener('mousemove', resizeMsg, false);
					message.style.cursor = this.style.cursor = null;
				}, false);
			}, false);
		}
		textareamod(message);
		// insert at cursor
		function paste(txt, sel) {
			with (message) {
				var ss = selectionStart, se = ss + txt.length, saveScr = scrollTop;
				value = value.substr(0, ss) + txt + value.substr(ss);
				setSelectionRange(sel ? ss : se, se);
				scrollTop = saveScr;
				focus();
			}
		}
		unsafeWindow.emoticon = unsafeWindow.emoticon_nofocus = paste;
		function bbstyle(bn, sp) {
			var bbtags = unsafeWindow.bbtags, bbtl = (sp || bbtags[bn]).length;
			with (message) {
				var msgs = selectionStart, msge = selectionEnd, msgt = value, saveScr = scrollTop;
				value = msgt.substr(0, msgs) + (sp ? '[' + sp + '=]' : bbtags[bn]) + msgt.substring(msgs, msge) + (sp ? '[/'+sp+']' : bbtags[bn+1]) + msgt.substr(msge);
				setSelectionRange(sp ? msgs + bbtl + 2 : msgs + (msgs == msge ? bbtl : 0), sp ? msgs + bbtl + 2 : msge + (msgs == msge ? bbtl : bbtl*2 + 1));
				scrollTop = saveScr;
				focus();
			}
		};
		unsafeWindow.bbstyle = bbstyle;
	}
	
	// unfolding '...'
	function pagesUnfold() {
		function unfold(e) {
			this.style.display = 'none';
			if (elt = this.nextSibling) {
				elt.style.display = null;
				return;
			}
			var tcell = this.parentNode, trow = tcell.parentNode, ci = tcell.cellIndex, i = parseInt(trow.cells[ci - 1].textContent), end = parseInt(trow.cells[ci + 1].textContent) - 1, cont = '',
				h = this.href, re = h.match(/start=\d+/), incr = location.pathname == '/viewtopic.php' ? 20 : 50;
			tcell.GM_foldElt = elt = tcell.appendChild(document.createElement('div'));
			elt.style.overflow = 'hidden';
			for (; i < end;) cont += '<a href="' + h.replace(re, 'start=' + i * incr) + '" class="gensmall widespace">' + ++i + '</a>';
			elt.innerHTML = cont;
			if (elt.scrollWidth > elt.clientWidth) elt.addEventListener('mousemove', scrollspeed, false), setInterval(scrolllist, 10, elt);
		}
		function fold(e) {
			if (elt = this.GM_foldElt) {
				var y = offs(this, 'offsetTop'), x = offs(this, 'offsetLeft');
				if (this.GM_foldTO) clearTimeout(this.GM_foldTO), this.GM_foldTO = 0;
				if (e.pageX > x && e.pageX < x + this.offsetWidth && e.pageY > y && e.pageY < y + this.offsetHeight) return;
				this.GM_foldTO = setTimeout(function() { elt.scrollLeft = 0; elt.style.display = 'none'; elt.previousSibling.style.display = null; }, 1000);
				elt.GM_scspeed = 0;
			}
		}
		function scrollspeed(e) {
			var w = this.clientWidth/4, o = e.layerX - this.scrollLeft, maxspeed = 50;
			if (o < w) this.GM_scspeed = Math.floor(maxspeed*(o/w - 1));
			else if (o > 3*w) this.GM_scspeed = Math.floor(maxspeed*(o/w - 3));
			else this.GM_scspeed = 0;
		}
		function scrolllist(list) {
			if (list.GM_scspeed) list.scrollLeft += list.GM_scspeed;
		}
		for (var xp = $x('.//td/a[.="..."] | .//td/a[.=" ... "]'), i = 0; elt = xp.snapshotItem(i); i++)
			elt.addEventListener('mouseover', unfold, false),
			elt.parentNode.addEventListener('mouseout', fold, false);
	}

	// page-specific
	switch (location.pathname) {
	case '/viewtopic.php':
		if ($n('login')) break;
		var pageNum = $x('.//td[@class="pagesel"]', null, 1), maintbl = $x('.//table[@class="forumline"]', null, 2), hasHead = $x('.//img[@alt="Прилепленное сообщение"]', maintbl, 1) ? 1 : 0;
		pageNum = pageNum ? parseInt(pageNum.textContent) - 1 : 0;
		var hasPoll = maintbl.rows[0].cells[0].tagName == 'TH' ? 0 : 1;

		// get posts
		function fetch(from, num, drop, callback) {
			xhr('viewtopic.php?t=' + $n('t').value + '&start=' + from, function(data) {
				if (!data) { callback(); return; }
				var i = data.indexOf('<table class="forumline"'), trlvl = 0, trst, trs = [], st = new Date();
				data = data.substring(i, data.indexOf('<!-- ###Overmod | Quickreply -->', i));
				for (i = 0; (i = data.indexOf('<', ++i)) != -1 && trs.length < num;) {
					if (data.substr(i, 4) == '<tr>')	{ if (!trlvl) trst = i + 4; trlvl++; }
					if (data.substr(i, 5) == '</tr>')	{ trlvl--; if (!trlvl) drop ? drop-- : trs.push(data.substring(trst, i).replace('<form method="post" action="card.php">', '')); }
				}
				callback(trs);
			});
		}

		// UTF-8 -> Windows-1251
		function encode(str) {
			for (var j = 0, c, r = ''; j < str.length; j++) {
				if ((c = str.charCodeAt(j)) == 0x401) c = 0xA8;
				else if (c == 0x451) c = 0xB8;
				else if (c >= 0x410 && c <= 0x44F) c -= 0x350;
				else if (c == 43) { r += '%2B'; continue; }
				if (c <= 0xFF) r += escape(String.fromCharCode(c));
				else r += '%26%23' + c + '%3B';
			}
			return r;
		}

		// reply with quote
		function reply(e) {
			e.preventDefault();
			if (this.textContent == '[...]') return;
			this.textContent = '[...]';
			var t = this;
			xhr(this.href, function(data) {
				if (data) {
					var st = data.indexOf('<textarea');
					paste(data.substring(st = data.indexOf('>', st) + 1, data.indexOf('</', st)), true);
				}
				t.textContent = '[ответить]';
			});
		}
		for (var xp = $x('.//a[starts-with(@href,"posting.php?mode=quote")]', maintbl), i = 0; elt = xp.snapshotItem(i); i++)
			elt.addEventListener('click', reply, false);

		// edit post
		function edit(e) {
			e.preventDefault();
			if (this.style.color) return;
			this.style.color="#dd6900";
			this.textContent='[...]';
			var t = this;
			xhr(this.href, function(data) {
				t.textContent='[правка]';
				if (data) {
					var tbl = t.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode, edCell = tbl.insertRow(-1).insertCell(-1), editbox = {},
						rst = data.indexOf('<textarea') + 191, rowIndex = tbl.parentNode.parentNode.parentNode.rowIndex - 1 - hasPoll, subj = rowIndex == 0 && (pageNum < 2 || hasHead);
					if (subj) subj = $x('.//span[@class="nav"]/text()[2]', null, 1).textContent.substr(3);
					edCell.setAttribute('colspan', 2);
					edCell.setAttribute('align', 'center');
					tbl.rows[2].style.display = 'none';
					edCell.innerHTML = (subj ? '<input type="text" style="width:100%" value="' + subj + '"><br>' : '') + '<textarea rows="5">' + data.substring(rst, data.indexOf('</textarea>', rst)) +
						'</textarea><input type="button" class="mainoption editbutton" value="Отправить"> <input type="button" class="liteoption" value="Отмена">';
					editbox.submit = edCell.childNodes[subj ? 3 : 1];
					editbox.cancel = edCell.lastChild;
					if (subj) editbox.subject = edCell.firstChild;
					message = editbox.message = edCell.childNodes[subj ? 2 : 0];
					textareamod(message);
					function cancel() { tbl.rows[2].style.display = null; tbl.deleteRow(3); t.style.color = null; message = $n('message'); }
					function submit() {
						with (editbox.submit) disabled = true, style.color = 'grey', value = 'Отправка сообщения...';
						with (editbox.cancel) disabled = true, style.color = 'grey';
						with (message) disabled = true, style.backgroundColor = 'lightgrey';
						if (subj) with (editbox.subject) disabled = true, style.backgroundColor = 'lightgrey';
						data = 'message=' + encode(message.value) + (subj ? (hasHead ? '&firstup=1' : '') + '&subject=' + encode(editbox.subject.value) : '') +
							($n('attach_sig').checked ? '&attach_sig=1' : '') + ($n('notify').checked ? '&notify=1' : '') + '&sid=' + $n('sid').value + '&mode=editpost&post=1&p=' + t.href.match(/\d+/);
						xhr('posting.php', function(data) {
							if (!data || data.indexOf('Ваше сообщение было успешно добавлено') == -1) {
								data && alert('Сообщение не было изменено.');
								with (editbox.submit) disabled = false, style.color = null, value = 'Отправить';
								with (editbox.cancel) disabled = false, style.color = null;
								with (message) disabled = false, style.backgroundColor = null;
								if (subj) with (editbox.subject) disabled = false, style.backgroundColor = null;
							} else {
								editbox.submit.value = 'Обновление сообщения...';
								var from = subj ? 0 : pageNum * 20 + rowIndex - hasHead;
								fetch(from, 1, 1 + (subj ? 0 : hasHead) + hasPoll, function(msg) {
									if (!msg) {
										fetch(from, 1, 1 + hasHead + hasPoll, arguments.callee);
										return;
									}
									var st = msg[0].indexOf('<td colspan="2" onMouseUp="get_selection()">') + 44;
									tbl.rows[2].innerHTML = msg[0].substring(st, msg[0].indexOf('</td>', st));
									tbl.rows[2].style.display = null;
									tbl.deleteRow(3);
									t.style.color = null;
									if (subj) $x('.//span[@class="nav"]/text()[2]', null, 1).textContent = ' » ' + editbox.subject.value;
								});
							}
						}, data);
					}
					editbox.submit.addEventListener('click', submit, false);
					editbox.cancel.addEventListener('click', cancel, false);
					edCell.addEventListener('keypress', function(e) {
						if (e.keyCode == 13 && e.ctrlKey) submit();
						if (e.keyCode == 27) cancel();
					}, false);
					setTimeout(function() { with (message) if (scrollHeight > 81) style.height = scrollHeight + 20; }, 0);
				} else {
					t.style.color = null;
				}
			});
		}
		for (var xp = $x('.//a[starts-with(@href,"posting.php?mode=editpost")]', maintbl), i = 0; elt = xp.snapshotItem(i); i++)
			elt.addEventListener('click', edit, false);

		// delete
		function drop(e) {
			e.preventDefault();
			if (this.textContent == '[...]') return;
			var msgr = this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
			msgr.style.opacity = '0.5';
			if (!confirm('Вы уверены, что хотите удалить это сообщение?')) { msgr.style.opacity = null; return; }
			var t = this, pars = this.getAttribute('href').substr(12) + '&confirm=1';
			this.textContent = '[...]';
			xhr('posting.php', function(data) {
				if (data) {
					if (data.indexOf('успешно') != -1) msgr.parentNode.removeChild(msgr);
					else { alert('Произошла ошибка!'); msgr.style.opacity=null; }
				}
				else msgr.style.opacity = null;
			}, pars);
		}
		for (var xp = $x('.//a[starts-with(@href,"posting.php?mode=delete")]', maintbl), i = 0; elt = xp.snapshotItem(i); i++)
			elt.addEventListener('click', drop, false);

		// post
		$x('.//input[@name="post"]', maintbl, 1).addEventListener('click', function(e) {
			e.preventDefault();
			message = $n('message');
			if (!message.value.length) return;
			with (this) disabled = true, style.color = 'grey', value = 'Отправка сообщения...';
			with (message) disabled = true, style.backgroundColor = 'lightgrey';
			with ($n('preview')) disabled = true, style.color = 'grey';
			var t = this;
			xhr('posting.php', function(data) {
				if (!data || data.indexOf('Ваше сообщение было успешно добавлено') == -1) {
					data && alert('Сообщение не было добавлено!');
					with (t) disabled = false, style.color = null, value = 'Отправить';
					with (message) disabled = false, style.backgroundColor = null;
					with ($n('preview')) disabled = false, style.color = null;
					return;
				}
				t.value = 'Обновление сообщений...';
				var from = pageNum*20 + maintbl.rows.length - hasHead - hasPoll - 6, drops = 1 + hasHead + hasPoll;
				fetch(from, 20, drops, function(msgs) {
					if (!msgs) { t.value = 'Повторная попытка...'; fetch(from, 20, drops, arguments.callee); return; }
					msgs.pop();
					maintbl.deleteRow(maintbl.rows.length - 5);
					for (var i = 0, nrplace = maintbl.rows.length - 4; i < msgs.length; i++) {
						var nrow = maintbl.insertRow(nrplace++), rowcls = nrplace % 2 ? 'row2':'row1';
						nrow.innerHTML = msgs[i];
						nrow.cells[0].className = nrow.cells[1].className = rowcls;
						if (elt = $x('.//a[starts-with(@href,"posting.php?mode=editpost")]', nrow.cells[1], 1))
							elt.addEventListener('click', edit, false);
						if (elt = $x('.//a[starts-with(@href,"posting.php?mode=delete")]', nrow.cells[1], 1))
							elt.addEventListener('click', drop, false);
						if (elt = $x('.//a[starts-with(@href,"posting.php?mode=quote")]', nrow.cells[1], 1))
							elt.addEventListener('click', reply, false);
					}
					with (t) disabled = false, style.color = null, value = 'Отправить';
					with (message) disabled = false, style.backgroundColor = null, value = '';
					with ($n('preview')) disabled = false, style.color = null;
				});
			}, 'message=' + encode(message.value) + '&mode=reply&t=' + $n('t').value + ($n('attach_sig').checked ? '&attach_sig=1' : '') + ($n('notify').checked ? '&notify=1' : '') +
				'&sid=' + $n('sid').value + '&post=1');
		}, false);

		//smilies
		function loadsmilies(e) {
			e.preventDefault();
			elt = this;
			xhr(this.href, function(data) {
				if (data) {
					var st = data.indexOf('<a h');
					elt.parentNode.parentNode.parentNode.cells[0].innerHTML = data.substring(st, data.indexOf('</table', st)).replace(/<t(r|d)[^>]*>/g, '');
				}
			});
		}
		with ($x('.//a[@target="_phpbbsmilies"]', maintbl, true)) addEventListener('click', loadsmilies, true), removeAttribute('onclick');

		pagesUnfold();
		
		break;
	case '/viewforum.php':
		pagesUnfold();

		// filter search mode
		var slk = $x('.//td[@class="b_search"]/span/a', null, 1);
		with (slk.parentNode.insertBefore(document.createElement('label'), slk)) {
			innerHTML = '<input type="checkbox"> Фильтр';
			firstChild.addEventListener('click', function() {
				var filterquery = {'search_terms': 'any', 'search_forum': location.search.match(/f=(\d+)/)[1], 'show_results': 'topics'}, searchform = ($n('search_keywords').form);
				for (var par in filterquery) {
					if (this.checked)
						with (searchform.appendChild(document.createElement('input'))) type = 'hidden', name = par, value = filterquery[par];
					else
						searchform.removeChild($n(par));
				}
				$n('search_fields').value = this.checked ? 'titleonly' : 'all';
			}, false);
		}
		slk.parentNode.insertBefore(document.createTextNode(' / '), slk);
		break;
	case '/profile.php':
		elt = $x('.//a[text()="[icq]"]', null, 1);
		if (elt) {
			var icq = elt.href.match(/\d+/);
			elt.textContent = icq;
			elt.parentNode.parentNode.addEventListener('click', function(e) { e.preventDefault(); prompt('Скопируйте номер ICQ:', icq); }, true);
		}
		break;
	case '/posting.php':
		if (location.search == '?mode=smilies') {
			var message = opener.document.getElementsByName('message')[0], preventDouble;
			unsafeWindow.emoticon = function(txt) {
				if (preventDouble) return;
				preventDouble = true;
				setTimeout(function() { preventDouble = false; }, 1);
				txt = ' ' + txt + ' ';
				with (message) {
					var ss = selectionStart, se = ss + txt.length, saveScr = scrollTop;
					value = value.substr(0, ss) + txt + value.substr(ss);
					setSelectionRange(sel ? ss : se, se);
					scrollTop = saveScr;
					focus();
				}
			};
			break;
		}
		for (var chk in CHECK_AND_HIDE)
			if (elt = $n(chk)) { 
				elt.checked = true;
				if (CHECK_AND_HIDE[chk]) elt.parentNode.parentNode.style.display = 'none';
			}
		break;
	case '/search.php':
		if (elt = $n(' show_results')) elt.name = 'show_results';
	}
}

// site-specific
else {
	// pagination
	if (elt = $x('.//select[@onchange]', null, 1)) {
		elt = elt.parentNode.parentNode.parentNode.parentNode;
		function loadart() {
			var nd = document.createElement('div');
			xhr(location.pathname.replace('lab', 'lab/print'), function(data) {
				if (!data) return;
				var i = data.indexOf('</page>') + 7;
				while (true) {
					i = data.indexOf('<page', i);
					if (i < 0) break;
					var st = data.indexOf('>', i) + 1;
					i = data.indexOf('</page>', st);
					nd.innerHTML += data.substring(st, i);
				}
				elt.parentNode.replaceChild(nd, elt);
			});
		}
		if (LOAD_FULL_ARTICLE) {
			// toc links to current page
			for (var toc = $x('.//div[@style="width: 700px;"]/ul[1]//a'), tocl, i = 0; tocl = toc.snapshotItem(i); i++)
				tocl.href = tocl.hash;
			loadart();
		}
		else {
			elt.style.textAlign = 'center';
			elt.innerHTML = '<a href="#">Читать дальше</a>';
			elt.firstChild.addEventListener('click', function(e) {
				e.preventDefault();
				this.blur();
				this.innerHTML = '<img src="chrome://browser/skin/Throbber.gif" style="cursor:default;border:none"/>';
				loadart();
			}, false);
		}
	}
	// link to print version
	if (LINK_TO_PRINT) for (var xp = $x('.//a[contains(@href, "/lab/")]'), i = 0, x; x = xp.snapshotItem(i); i++)
		if (x.href.indexOf('/print/') == -1 && x.href.substr(-4) == 'html') x.href = x.href.replace('/lab/', '/lab/print/');
}

// utility functions

function $x(x, context, n) {
	try { var xp = document.evaluate(x, context || document.body, null, 6, null); }
	catch(e) { GM_log('XPath error!\n\n$x(' + x + ', ' + context + ', ' + n); return; }
	if (!n) return xp;
	return xp.snapshotItem(n - 1);
}

function $n(n) {
	return document.getElementsByName(n)[0];
}

function xhr(url, callback, data, drop) {
	var req = new XMLHttpRequest();
	req.open(data ? 'POST' : 'GET', url, true);
	if (data) req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=Windows-1251'), req.setRequestHeader("Content-Length", data.length);
	req.onreadystatechange = function() {
		if (drop && req.readyState == 2) req.abort();
		if (req.readyState == 4) {
			if (req.status == 200) setTimeout(callback, 1, req.responseText);
			else {
				alert('Ошибка сервера!\n\nHTTP ' + req.status + ' ' + req.statusText);
				setTimeout(callback, 1);
			}
		}
	};
	req.send(data || null);
}

function offs(a,b){var c=0;while(a){c+=a[b];a=a.offsetParent}return c}