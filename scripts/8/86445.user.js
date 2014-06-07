// ==UserScript==
// @name           Izbesözlük Favori Başlık
// @author         sercankd
// @version        BETA
// @description    izbe sözlük favori başlıklar
// @include        http://www.izbesozluk.com/nedir*
// @include        http://www.izbesozluk.com/nedirki*
// ==/UserScript==

const fix_Pseud0ch = true


var threadWatcher = document.createElement('div')
threadWatcher.setAttribute('style', 'text-align: left; font-size:16px; z-index:1; position:absolute; border:2px ridge; padding:10px; line-height:1')
threadWatcher.style.backgroundColor = fix_Pseud0ch ? '#F0F0F0' : 'inherit'
threadWatcher.className = 'thread'
threadWatcher.innerHTML = 
'<div style="cursor: move;">\
	<u>Favori Başlıklar</u>\
</div><br />\
<div>\
</div>'

const titleDiv = threadWatcher.firstChild
const watcherDiv = threadWatcher.lastChild
const read = /oku/.test(window.location.href)
const board = "izbesozluk.com"



//hareket
if(GM_getValue('left', true))
	threadWatcher.style.left = GM_getValue('left', 0)
else
	threadWatcher.style.right = GM_getValue('right')
threadWatcher.style.top = GM_getValue('top', 0)

var initial_mouseX
var initial_mouseY
var initial_boxX
var initial_boxY
titleDiv.addEventListener('mousedown', startMove, true)
function startMove(event){
	initial_mouseX = event.clientX
	initial_mouseY = event.clientY
	if(threadWatcher.style.right)
		initial_boxX = parseInt(threadWatcher.style.right)
	else
		initial_boxX = document.body.clientWidth - threadWatcher.offsetWidth - parseInt(threadWatcher.style.left)
	initial_boxY = parseInt(threadWatcher.style.top)
	document.addEventListener('mousemove', move, true)
	document.addEventListener('mouseup', endMove, true)
}


function move(event){
	var right = initial_boxX + initial_mouseX - event.clientX
	var left = document.body.clientWidth - threadWatcher.offsetWidth - right
	threadWatcher.style.left = ''
	if(left < right){
		threadWatcher.style.right = ''
		threadWatcher.style.left = left + 'px'
		if(left < 25)
			threadWatcher.style.left = 0}
	else if(right < 25)
		threadWatcher.style.right = 0
	else
		threadWatcher.style.right = right + 'px'
	var top =  initial_boxY - initial_mouseY + event.clientY
	if(top < 25)
		threadWatcher.style.top = 0
	else
		threadWatcher.style.top = top + 'px'
}

function endMove(){
	document.removeEventListener('mousemove', move, true)
	document.removeEventListener('mouseup', endMove, true)
	GM_setValue('right', threadWatcher.style.right)
	GM_setValue('left', threadWatcher.style.left)
	GM_setValue('top', threadWatcher.style.top)
}

if(read){
	var temp = document.evaluate('//div[@id="title"]/preceding-sibling::H1/a', document.body, null, 8, null).singleNodeValue//
	var threadX = document.createElement('a')
	threadX.style.cursor = 'pointer'
	var re = new RegExp(window.location.href, '')
	threadX.textContent = re.test(GM_getValue(board)) ? 'X Bu Başlık Favorim Olsun' : 'x Bu Başlık Favorim Olsun'
	temp.insertBefore(document.createTextNode(' '), temp.firstChild)
	temp.insertBefore(threadX, temp.firstChild)
	threadX.addEventListener('click', function(){toggleThread(this)}, true)
	}
else
	Array.forEach(document.getElementsByClassName('highlight'), function(el){
		var threadX = document.createElement('a')
		threadX.style.cursor = 'pointer'
		re = new RegExp(el.nextSibling.nextSibling.href, '')
		threadX.textContent = re.test(GM_getValue(board)) ? 'X Bu Başlık Favorim Olsun' : 'x Bu Başlık Favorim Olsun'
		el.parentNode.insertBefore(threadX, el.nextSibling)
		el.parentNode.insertBefore(document.createTextNode(' '), el.nextSibling)
		threadX.addEventListener('click', function(){toggleThread(this)}, true)
		})


var boardValue = GM_getValue(board)
var tempArray
var re = /(.+)\n(.+)\n/g
while( tempArray = re(boardValue) )
	addThread(null, tempArray[1], tempArray[2])

document.body.appendChild(threadWatcher)

//Utilities
function addThread(el, url, subject){
	if(el){
		var threadLink = el.nextSibling.nextSibling
		//Store thread in GM, capitalize X
		var url = window.location
		var subject = document.title;
		var boardValue = GM_getValue(board, '')
		GM_setValue(board, boardValue + url + '\n' + subject + '\n')
		el.textContent = 'X'
		}
	var watcherLink = document.createElement('a')
	watcherLink.href = url
	watcherLink.textContent = subject
	var watcherX = document.createElement('a')
	watcherX.textContent = '[Sil]'
	watcherX.style.cursor = 'pointer'
	watcherX.addEventListener('click',
		function(){
			var boardValue = GM_getValue(board)
			var link = this.nextSibling.nextSibling
			var re = new RegExp(link.href , '')
			GM_setValue(board, boardValue.replace(re, ''))
			if(link == window.location.href)
				var threadX = document.evaluate('//div[@class="header"]/preceding-sibling::A', document.body, null, 8, null).singleNodeValue
			else
				threadX =  document.evaluate('//a[@href="' + link.pathname.slice(1) + '"]/preceding-sibling::a', document.body, null, 8, null).singleNodeValue
			if(threadX)
				threadX.textContent = 'x'
			watcherDiv.removeChild(this.parentNode)
		},
		true)
	var span = document.createElement('span')
	span.appendChild(watcherX)
	span.appendChild(document.createTextNode(' '))
	span.appendChild(watcherLink)
	span.appendChild(document.createElement('br'))
	watcherDiv.appendChild(span)
}

function toggleThread(el){
	var threadLink = el.nextSibling.nextSibling
	var url =  "/nedir/" 
	var re = new RegExp(url + '\n.*\n', '')
	var boardValue = GM_getValue(board)
	if( el.textContent == 'X' ){
		GM_setValue( board, boardValue.replace(re, '') )
		el.textContent = 'x'
		Array.forEach(watcherDiv.getElementsByTagName('a'), function(el){if(el.href == url) watcherDiv.removeChild(el.parentNode)})
		}
	else
		addThread(el)
}
