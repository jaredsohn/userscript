// ==UserScript==
// @name propocracy
// @version 2013.04.11
// @description Gives prop bombs on fitocracy. To use, go to any page on fitocracy, and press F9 on your keyboard. It will click all Give Props links and load more. Does not auto prop comments.
// @match https://www.fitocracy.com/*
// @updateURL		http://userscripts.org/scripts/source/155319.meta.js
// @installURL		http://userscripts.org/scripts/source/155319.user.js
// ==/UserScript==

version = '2013.04.11'

var t = window.setInterval(checkProps, 5000)

div = document.createElement('div')
ds = div.style
ds.color = 'black'
ds.backgroundColor = 'white'
ds.position = 'fixed'
ds.bottom = '130px'
ds.left = '60px'
ds.zIndex = '5000'
d1 = document.createElement('div')
d2 = document.createElement('div')
d3 = document.createElement('div')

d1.id = 'd1'
d1.textContent = '0 prop buttons'
d1.style.color = 'red'

d2.id = 'd2'
d2.textContent = 'scanning for prop buttons'
d3.innerHTML = '<a href="http://userscripts.org/scripts/show/155319">propocracy</a> ' + version + ' by ' + '<a href="/profile/bftjoe">bftjoe</a>'
div.appendChild(d1)
div.appendChild(d2)
div.appendChild(d3)
document.body.appendChild(div)

var isProfile = document.location.toString().indexOf('profile') !== -1

function checkProps(){
	var d1 = document.getElementById('d1')
	var d2 = document.getElementById('d2')
	var p = document.getElementsByClassName('give_prop')
	if (p.length === 0){
		d1.textContent = 'No prop buttons found'
	}
	else {
	   d1.textContent = p.length + ' prop buttons.'
	   d2.textContent = 'Press F9 to prop bomb'
       window.addEventListener('keydown', k, true )
    }
}

var t2, t3

function k(e){
	if (e.keyCode !== 120) return

	window.clearInterval(t)

	d1.textContent = '0 props given'
	d2.textContent = 'Press ESC to cancel'
	window.removeEventListener('keypress', k)
	window.addEventListener('keypress', checkEscape)
	if (!isProfile) {
	   t2 = window.setInterval(scroll, 1000)
	   t3 = window.setInterval(go, 4000)
	   
	   window.setTimeout(stop, 900000, 'auto stop after 15 minutes')
	}
	else {
	   window.setTimeout(go, 6000)
	   window.setTimeout(stop, 9000, 'limit reached for profile page')
	}

}

function checkEscape(e){
    if (e.keyCode === 27)
        stop('Esc pressed')
}

function scroll(){
    window.scrollTo(0,document.body.scrollHeight)
}


function go(){
	var props = parseInt(d1.textContent)
	var c = document.getElementsByClassName('stream_item')
	while(c.length !== 0) {
		var p = c[0].getElementsByClassName('give_prop')
		if (p.length !== 0) {
			var e = document.createEvent('HTMLEvents')
			e.initEvent ('click', true, true)
			p[0].dispatchEvent(e)
			props++
			d1.textContent = props + ' props given'
		}
		c[0].parentNode.removeChild(c[0])
	}
	if (document.getElementsByClassName('empty-state').length !== 0)
	   stop('end of feed detected')
}


function stop(reason){
    window.clearInterval(t)
    window.clearInterval(t2)
    window.clearInterval(t3)
    window.removeEventListener('keypress', checkEscape)
    window.removeEventListener('keypress', k)    
    d2.textContent = 'stopped: ' + reason
}