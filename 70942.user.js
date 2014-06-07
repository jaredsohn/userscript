// ==UserScript==
// @name           Juick Hierarchical comments
// @namespace      http://juick.com
// @include        http://juick.com/*
// @description    Располагает комментарии в треде в древовидном порядке. Работает только в chrome, кто-то запускал под opera.
// @Copyright      2010, Vladimir Lagunov
// ==/UserScript==

// function dbg(x) {
// 	if (x) {
// 		var a = x.innerHTML;
// 		if (a === undefined) {
// 			a = new String(x);
// 		}
// 		var escapedHTML=a.split("&").join("&amp;").split( "<").join("&lt;").split(">").join("&gt;");
// 		debug_div.innerHTML += '<p>' + escapedHTML + '</p>';
// 	} else {
// 		debug_div.innerHTML += '<p>undefined</p>';
// 	}
// }

spacerstring = '&nbsp;&#8226;&nbsp;';

function deleteAllPopupDivs(event) {
	var msgs_unstable = document.getElementsByClassName('popupmessage');
	var msgs = new Array();
	for (var i in msgs_unstable) {
		msgs[msgs.length] = msgs_unstable[i];
	}
	for (var i in msgs) {
		var p = msgs[i].parentNode;
		if (msgs[i] && p) {
			p.removeChild(msgs[i]);
		}
	}
}

function popupMessage(event) {
	if (!event) {
		event = windows.event;
	}
	var target = event.target;
	if (!target) {
		target = event.srcElement;
	}
	var id = target.getAttribute('href').substring(1);
	var html = document.evaluate('//li[@id="' + id + '"]//div[@class="liavwrapper"]', 
								 document, null, XPathResult.ANY_TYPE, null).iterateNext();
	var div = html.cloneNode(true);
	div.className = 'popupmessage';
	div.style['border'] = '5px solid gray';
	div.style['position'] = 'absolute';
	div.style['width'] = '400px';
	div.style['left'] = event.pageX - 200 + 'px';
	div.style['top'] = event.pageY - 30 + 'px';
	var content_div_style;
	if (document.defaultView && document.defaultView.getComputedStyle) {
		content_div_style = document.defaultView.getComputedStyle(document.getElementById('content')); 
	} else {
		content_div_style = document.getElementById('content').style;
	}
	if (content_div_style['background-color']) {
		div.style['background-color'] = content_div_style['background-color'];
	} else if (content_div_style['background-color']) {
		div.style['background'] = content_div_style['background'];
	}  else {
		div.style['background-color'] = 'white';
	}
	document.body.appendChild(div);
	var link_to_answer = document.evaluate(
		'.//small/a[starts-with(@href, "#")]',
		div, null, XPathResult.ANY_TYPE, null).iterateNext();
	if (link_to_answer) {
		link_to_answer.onmouseover = popupMessage;
	}
}

function buildTreeForComment (x) {
	var replies = document.getElementById('replies');
	var link_to_answer = document.evaluate(
		'.//small/a[starts-with(@href, "#")]',
		x, null, XPathResult.ANY_TYPE, null).iterateNext();
	if (link_to_answer) {
		link_to_answer.onmouseover = popupMessage;
	}
	var answers_xpath = document.evaluate(
		'//li[.//small/a[@href="#' + x.id + '"]]', document,
		null, XPathResult.ANY_TYPE, null);
	var answers = new Array();
	var i = answers_xpath.iterateNext();
	while (i) {
		answers[answers.length] = i;
		i = answers_xpath.iterateNext();
	}
	for (var i in answers) {
		replies.removeChild(answers[i]);
	}
	var ins_bef = x.nextSibling;
	for (var i in answers) {
		replies.insertBefore(answers[i], ins_bef);
		var wrapper = answers[i].getElementsByClassName('liavwrapper')[0];
		var left_part = answers[i].getElementsByClassName('left')[0];
		var x_wrapper = x.getElementsByClassName('liavwrapper')[0];
		var x_left_part = x.getElementsByClassName('left')[0];
		if (x.clientWidth - x_left_part.clientWidth >= 400) {
			left_part.innerHTML = x_left_part.innerHTML + spacerstring;
		}
		buildTreeForComment(answers[i]);
	}
}

function makeTreeView () {
	var replies = document.getElementById('replies');
	var liav = replies.firstChild;
	while (liav != null) {
		if (liav.tagName && liav.className == 'liav') {
			var wrapper = document.createElement('div');
			wrapper.className = 'liavwrapper';
			wrapper.style['display'] = 'inline-block';
			// wrapper.style['border'] = '1px dashed gray';
			wrapper.style['background'] = liav.style['background'];
			wrapper.style['background-repeat'] = 'no-repeat';
			wrapper.style['padding-left'] = '42px';
			wrapper.style['margin-left'] = '0px';
			liav.style['background'] = '';
			liav.style['padding-left'] = '0';
			var liav_child = liav.firstChild;
			// TODO: копирование стилей
			while(liav_child) {
				var clone = liav_child.cloneNode(true);
				wrapper.appendChild(clone);
				liav_child = liav_child.nextSibling;
			}
			//wrapper.innerHTML = liav.innerHTML;
			liav.innerHTML = '<table style="padding: 0; border-spacing: 0"><tbody><tr><td class="left"></td><td class="right"></td></tr></tbody></table>';
			var right_part = liav.getElementsByClassName('right')[0];
			right_part.appendChild(wrapper);
		}
		liav = liav.nextSibling;
	}
	var root_posts_xpath = document.evaluate(
		'//li[@id and count(.//small/a)=1]', replies,
		null, XPathResult.ANY_TYPE, null
	);
	var root_posts = new Array();
	var i = root_posts_xpath.iterateNext();
	while (i) {
		if (i.nodeType == i.ELEMENT_NODE) {
			root_posts[root_posts.length] = i;
		}
		i = root_posts_xpath.iterateNext();
	}
	for (var i in root_posts) {
		// dbg(root_posts[i].id);
		root_posts[i].style.marginLeft = '0px';
		buildTreeForComment(root_posts[i]);
	}
	var maybe_headless_posts_xpath = document.evaluate(
		'//li[count(./table/tbody/tr/td[@class="right"]/div/small/a)=2]', replies,
		null, XPathResult.ANY_TYPE, null);
	var maybe_headless_posts = new Array();
	i = maybe_headless_posts_xpath.iterateNext();
	while (i) {
		maybe_headless_posts[maybe_headless_posts.length] = i;
		i = maybe_headless_posts_xpath.iterateNext();
	}
	// dbg('безголовые комментарии');
	var headless_posts = new Array();
	for (var i in maybe_headless_posts) {
		var post = maybe_headless_posts[i];
		var parent = document.evaluate(
			'./table/tbody/tr/td[@class="right"]/div/small/a[starts-with(@href, "#")]', post,
			null, XPathResult.ANY_TYPE, null).iterateNext();
		// dbg('проверяю существование ' + parent.href.split('#')[1]);
		if (!document.getElementById(parent.href.split('#')[1])) {
			headless_posts[headless_posts.length] = replies.removeChild(post);
		}
	}
	if (headless_posts.length != 0) {
		var deleted_comment_li = document.createElement('li');
		deleted_comment_li.id = 'deleted_comment';
		deleted_comment_li.innerHTML = '<h4>[ Бесформенный удаленный комментарии в жуйке ]</h4>';
		deleted_comment_li.style.marginLeft = '0px';
		replies.appendChild(deleted_comment_li);
	}
	for (var i in headless_posts) {
		var post = headless_posts[i];
		post.style.marginLeft = '30px';
		replies.appendChild(post);
	}
	for (var i in headless_posts) {
		buildTreeForComment(headless_posts[i]);
	}
}

function makeLinearView () {
	var replies = document.getElementById('replies');
	var liavwrappers = document.getElementsByClassName('liavwrapper');
	var liavs = new Array();
	for (var i = 0; i < liavwrappers.length; i++) {
		liavs[liavs.length] = liavwrappers[i].parentNode.parentNode.parentNode.parentNode.parentNode;
	}
	for (var i in liavs) {
		var wrapper = liavs[i].getElementsByClassName('liavwrapper')[0];
		liavs[i].style['background'] = wrapper.style['background'];
		liavs[i].style['padding-left'] = wrapper.style['padding-left'];
		liavs[i].innerHTML = wrapper.innerHTML;
	}
	var deleted_comment = document.getElementById('deleted_comment');
	if (deleted_comment) {
		replies.removeChild(deleted_comment);		
	}
	var posts_xpath = document.evaluate(
		'./li', replies, null, XPathResult.ANY_TYPE, null);
	var i = posts_xpath.iterateNext();
	var posts = new Array();
	while (i) {
		posts[i.getAttribute('id')] = i;
		i = posts_xpath.iterateNext();
	}
	for(post_n in posts) {
		post = posts[post_n];
		post.parentNode.removeChild(post);
	}
	for(post_n in posts) {
		post = posts[post_n];
		replies.appendChild(post);
		post.style.marginLeft = "0px";
	}
}

function changeTLMode () {
	var link = document.getElementById('treelineartrigger');
	if (link.innerText == 'Древовидные комментарии') {
		link.innerText = 'Линейные комментарии';
		makeTreeView();
	} else {
		link.innerText = 'Древовидные комментарии';
		makeLinearView();
	}
}

function getCookie () {
	var xx = document.cookie.split(';');
	for (a in xx) {
		if (xx[a].match('^ *treelinear=')) {
			return xx[a].replace(/^ *treelinear=/, '');
		}
	}
	document.cookie = 'treelinear=linear; path=/';
	return 'linear';
}

function setCookie () {
	var time = new Date();
	var date = new Date(time.getFullYear() + 1, time.getMonth(), time.getDay(), 0, 0, 0);
	var link = document.getElementById('treelineartrigger');
	if (link.innerText == 'Древовидные комментарии') {
		document.cookie = 'treelinear=linear; path=/; expires=' + date;
	} else {
		document.cookie = 'treelinear=tree; path=/; expires=' + date;
	}
}

function initializeTrigger () {
	var nest = document.evaluate(
		'//div[@id="content"]/p[last()]',
		document, null, XPathResult.ANY_TYPE, null
	).iterateNext();
	var bar = document.createElement('span');
	bar.innerHTML = ' [ ';
	var trigger = document.createElement('a');
	trigger.id = 'treelineartrigger';
	trigger.href = 'javascript:void(0);';
	if (getCookie() == 'linear') {
		makeLinearView();
		trigger.innerText = 'Древовидные комментарии';
	} else {
		makeTreeView();
		trigger.innerText = 'Линейные комментарии';
	}
	bar.appendChild(trigger);
	bar.innerHTML += ' | ';
	var setter = document.createElement('a');
	setter.innerText = 'Запомнить';
	setter.id = 'setter';
	setter.href = 'javascript:void(0)';
	setter.addEventListener('click', setCookie, false);
	bar.appendChild(setter);
	bar.innerHTML += ' ]';
	nest.appendChild(bar);

	document.getElementById('treelineartrigger').onclick = changeTLMode;
	document.getElementById('setter').onclick = setCookie;
	document.body.onclick = deleteAllPopupDivs;
}

// function debugIt() {
// 	var u = document.getElementById('user');
// 	if (!u) {
// 		return false;
// 	}
// 	debug_div = document.createElement('div');
// 	debug_div.setAttribute('style', 'background-color: #EEF5EE');
// 	var u = document.getElementById('user');
// 	u.parentNode.insertBefore(debug_div, u);
// 	debug_div.innerHTML = '<h3>Отладка</h3><br />';
// 	initializeTrigger();
// }

function startScript () {
	var u = document.getElementById('user');
	if (!u) {
		return false;
	}
	initializeTrigger();
}

startScript();
// debugIt();
