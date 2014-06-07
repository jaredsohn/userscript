// ==UserScript==
// @name           up2dateBP
// @namespace      http://www.martufone.info/gm
// @description    makes usernames clickable on the UOL & BOL chats (bate-papo), makes resizeable frames
// @include        http://bps.uol.com.br/room.html*
// @include        http://bpsbol.uol.com.br/room.html*
// ==/UserScript==

// 20070504_1 12:05 DST CET

(function(){

function xpath(path, frame) {
	return document.evaluate(
		path,
		frame.document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null)
}

function eURIs(str) {
	// encodeURI w/o space encoding... not sure it's ok
	return encodeURI(str).replace(/%20/g, ' ')
}

function frameMaquillage() {
	var fs = document.getElementsByTagName('FRAME')
	for(var i=0; i<fs.length; i++) {
		fs[i].setAttribute("scrolling", "auto")
		fs[i].removeAttribute("noresize")
		fs[i].setAttribute("frameborder", "1")
		fs[i].setAttribute("framespacing", "1")
		fs[i].setAttribute("border", "2")

		if (fs[i].name == 'view_panel') {
			view_panel_idx = i
		}
		if (fs[i].name == 'users_list') {
			users_list_idx = i
		}
		if (fs[i].name == 'user_panel') {
			user_panel_idx = i
		}
	}

	fs = document.getElementsByTagName('FRAMESET')
	for(var i=0; i<fs.length; i++) {
		fs[i].setAttribute("scrolling", "auto")
		fs[i].removeAttribute("noresize")
		fs[i].setAttribute("frameborder", "1")
		fs[i].setAttribute("framespacing", "1")
		fs[i].setAttribute("border", "2")
	}
}

function limpaTela() {
	var list

	if(!confirm("Apagar as velhas frases da tela?\nVão ficar só as últimas 5, cuidado!\n"))
		return

	list = xpath('//table|//br|//font|//script|//iframe', top.frames[view_panel_idx])
	for (var i=0; i<list.snapshotLength-25; i++) {
		elem = list.snapshotItem(i)
		// memory leak? I think so...
		elem.parentNode.removeChild(elem)
	}
}

function makeCleanButton() {
	var doc = top.frames[user_panel_idx].document
	if (doc.getElementsByTagName('FORM').length == 0) {
		return
	}
	clearInterval(intId)
	var aNode = doc.getElementsByName('ty')[0]
	var btn = doc.createElement('INPUT')
	btn.setAttribute('type', 'button')
	btn.setAttribute('value', 'Limpa Tela')
	btn.setAttribute('name', 'limpa')
	btn.style.fontSize = '9pt'
	btn.style.color = 'red'
	btn.style.height = '18px'
	btn.addEventListener('click', limpaTela, false)
	aNode.parentNode.insertBefore(btn, aNode)
}

function BPupdate() {
	var hash = new Array()
	var buf = ''
	var ebuf = ''
	var elem

	var list = xpath('//layer/a[@class="nick"]', top.frames[users_list_idx])
	for (var i=0; i<list.snapshotLength; i++) {
		elem = list.snapshotItem(i)
		elem.href.match(/"([^"]+)", "([^"]+)"/)
		hash[RegExp.$1] = RegExp.$2
	}

	list = xpath('//b/font', top.frames[view_panel_idx])
	for (var i=list.snapshotLength; i>=1 && i>=list.snapshotLength-9; i--) {
		elem = list.snapshotItem(i-1)
		buf = elem.innerHTML

		if (elem.firstChild.nodeName == 'A') {
			buf = elem.firstChild.innerHTML
		}

		ebuf = eURIs(buf)
		if (hash[ebuf]) {
			elem.innerHTML = 
			'<a style="color:inherit;text-decoration:underline" ' +
			'href=\'javascript:top.frames[' +
			users_list_idx + 
			'].SelecUser("' + ebuf + '", "' + hash[ebuf] + '")\'>' +
			buf + "</a>"
		} else {
			elem.innerHTML = buf
		}
	}
}

////////////// main

var view_panel_idx
var users_list_idx
var user_panel_idx
frameMaquillage()
var intId = window.setInterval(makeCleanButton, 1000)
window.setInterval(BPupdate, 5000)


// OLD frame index retrieval
// if (/^http:\/\/bps.uol.com.br/.test(window.location.href)) {
//	view_panel_idx = 1
//	users_list_idx = 5
// } else if (/^http:\/\/bps.bol.com.br/.test(window.location.href)) {
//	view_panel_idx = 2
//	users_list_idx = 6
// } else {
//	return
// }
//GM_log(top.frames[view_panel_idx].name + top.frames[users_list_idx].name+'\n')
// i don't know why it doesn't work with frame's names as:
// top.view_panel , top.users_list 
// security reasons? wrapper limitation?

})();
