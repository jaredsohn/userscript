// ==UserScript==
// @name	zzz
// @namespace	http://userscripts.org/users/21452
// @description	system error may occur! 
// @include	http://www.facebook.com/home.php?filter=app_10979261223&show_hidden=true
// @version	97
// @license	GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

window.setTimeout(function (){
	if( (new Date()).getTime() - parseInt(GM_getValue('heartbeat', '0')) < 18100 ) return
	attach = document.getElementsByClassName('UIFullPage_Container')[0]
	var d = attach.insertBefore(document.createElement('div'), attach.firstChild )
	d.style.marginLeft = d.style.marginTop = "1em"
	links = d.appendChild(document.createElement('span'))
	links.innerHTML = '<a href="http://www.facebook.com/joseph.huang.fb" target="_blank"><img src="http://profile.ak.fbcdn.net/v230/1139/105/q1306573929_6697.jpg" />Joseph Huang (script author)</a> | <a href="http://www.facebook.com/pages/autohelp-mafia-wars-script/159309131124" target="_blank">fan page</a> | add to mafia: <a href="http://www.facebook.com/profile.php?id=100000212017623" target="_blank">Dutch Oven</a>, <a href="http://www.facebook.com/profile.php?id=816384480" target="_blank">Krishna Santhanam</a>, <a href="http://www.facebook.com/profile.php?id=100000367387498" target="_blank">Ace Larson</a>, <a href="http://www.facebook.com/sdtorch" target="_blank">David Torch Hansen</a> | <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=8335810" target="_blank">Donate now!</a><p>if social attacks is checked, it will attack opponents upon a mafia member requests | <a href="http://docs.google.com/View?id=dcdwj9t6_89z8m2tdgb" target="_blank">increase the number of members shown in news feed</a>'
	t = d.appendChild(document.createElement('table'))
	t.id = 'AHtable'
	tr = t.appendChild(document.createElement('tr'))
	tr.innerHTML = '<th><a href="http://userscripts.org/scripts/show/57429" target="_blank">autohelp</a> version <span id="version">97</span></th><th>attempt</th><th>success</th><th>percent</th><th>exp gain</th>'
	makeCheckbox('ny', true)
	makeCheckbox('cuba', true)
	makeCheckbox('moscow', true)
	makeCheckbox('boost', true)
	makeCheckbox('war', false)
	makeCheckbox('achievement', true)
	makeCheckbox('social attack', false)
	tr = t.appendChild(document.createElement('tr'))
	tr.id = 'overall'
	tr.innerHTML = '<td>overall</td><td>0</td><td>0</td><td>NA</td><td>0</td>'
	b = d.appendChild(document.createElement('button'))
	b.type = 'button'
	b.setAttribute('onclick', "tb = document.getElementsByTagName('table')[0].childNodes;for(i=1;i<tb.length-1;i++)tb[i].childNodes[2].textContent = tb[i].childNodes[1].textContent = tb[i].childNodes[4].textContent = 0")
	b.textContent = 'reset all counters'
	refreshTimer = d.appendChild(document.createElement('input'))
	refreshTimer.value = GM_getValue('refreshDelay', 1000)
	refreshTimer.maxlength = 5
	refreshTimer.size = 5
	refreshTimer.id = 'AHrefreshDelay'
	refreshTimer.parentNode.appendChild(document.createElement('span')).textContent = '(ms) refresh delay.'
	b = d.appendChild(document.createElement('button'))
	b.id = 'AH_updateButton'
	b.textContent = 'check 4 updates'
	b.addEventListener('click', AH_updateCheck, false)
	lu = d.appendChild(document.createElement('span'))
	lu.id = 'lastUp'
	date = new Date()
	date.setTime(parseInt( GM_getValue('lastCheck', '0') ) )
	lu.textContent = 'last update check: ' + date.toString()

	function makeCheckbox(name, defaultval) {
		r = t.appendChild(document.createElement('tr'))
		r.id = name
		n = r.appendChild(document.createElement('td'))
		n.innerHTML = '<label><input type="checkbox" />' + name + '</label>'
		if (name == 'war') {
			n.innerHTML = n.innerHTML + '<label title="if checked, picks a side for wars where both sides are friends"><input type="checkbox" id="AHbetray" />betray</label> <label title="if checked, do not attack if all top mafia are taken out for the published side"><input type="checkbox" id="chicken" />chicken</label>'
			n.getElementsByTagName('input')[1].checked = GM_getValue('betray', true)
			n.getElementsByTagName('input')[2].checked = GM_getValue('chicken', false)
		}
		else if (name == 'social attack')
			n.innerHTML += '<label title="only attack opponents whose level is less than or equal to this number"> max level:<input id="level" value="' + GM_getValue('level', 0) + '" maxlength="5" size="5"/></label>'
		
		r.appendChild(document.createElement('td')).textContent = GM_getValue(name +'Attempt', 0)
		r.appendChild(document.createElement('td')).textContent = GM_getValue(name +'Success', 0)
		r.appendChild(document.createElement('td'))
		r.appendChild(document.createElement('td')).textContent = GM_getValue(name +'Exp', 0)
		n.getElementsByTagName('input')[0].checked = GM_getValue(name, defaultval)
		return r
	}
	content = d.appendChild(document.createElement('div'))
	content.id = 'AHcontent'
	
	window.setInterval(function(){
		GM_setValue('heartbeat', (new Date()).getTime() + '' )
		tb = document.getElementsByTagName('table')[0].childNodes
		for( var i = 1; i < tb.length - 1; i++ ) {
			n = tb[i].id
			GM_setValue(n + 'Attempt', parseInt(tb[i].childNodes[1].textContent))
			GM_setValue(n + 'Success', parseInt(tb[i].childNodes[2].textContent))
			GM_setValue(n + 'Exp', parseInt(tb[i].childNodes[4].textContent))
			GM_setValue(n, tb[i].getElementsByTagName('input')[0].checked)
			if (n == 'war') {
				GM_setValue('betray', tb[i].getElementsByTagName('input')[1].checked)
				GM_setValue('chicken', tb[i].getElementsByTagName('input')[2].checked)
			}
		}
		GM_setValue('level', parseInt(document.getElementById('level').value ) )
		if( (new Date()).getTime() - parseInt(GM_getValue('lastCheck', '0') ) > 43200000 )
			AH_updateCheck()
		v = parseInt(document.getElementById('AHrefreshDelay').value)
		if(!v)
			 v = 1000
		else if (v < 800)
			v = 800
		else if (v > 22000)
			v = 22000
		if( !timer || v != GM_getValue('refreshDelay', 1000) ){
			document.getElementById('AHrefreshDelay').value = v
			GM_setValue('refreshDelay', v)
			window.clearInterval(timer)
			timer = window.setInterval( function(){ httpHelp('http://www.facebook.com/ajax/intent.php?filter=app_10979261223&show_hidden=true&hidden_count=0&newest=' + GM_getValue('newest') + '&ignore_self=true&load_newer=true&request_type=4&__a=1', AH_go ) }, v )
		}
	}, 18000)

	window.setTimeout( function(){ httpHelp('http://www.facebook.com/ajax/intent.php?filter=app_10979261223&show_hidden=true&request_type=4&__a=1', AH_go ) }, 5000 )

}, 8400)

function AH_updateCheck() {
	t = (new Date()).getTime() + ''
	GM_setValue('lastCheck', t)
	document.getElementById('lastUp').textContent = 'last update check: ' + Date()
	GM_xmlhttpRequest({method:'get', url:'http://userscripts.org/scripts/source/57429.meta.js', onload:function(r){
		s = r.responseText.toString()
		if( m = /@version\s+(\S+)/.exec(s) ){
			v = document.getElementById('version').textContent
			u = document.getElementById('AH_updateButton')
			if (m[1] == v)
				u.textContent = 'up-to-date; check again'
			else {
				u.textContent = 'update now! your version: ' + v + ' latest: ' + m[1]
				u.addEventListener( 'click', function(){
					u=document.getElementById('AH_updateButton')
					u.textContent = 'reload the page'
					u.addEventListener('click', function(){window.location.reload()}, false )
					window.location.href = 'http://userscripts.org/scripts/source/57429.user.js'
				}, false)
			}
		}
	} } )
}

var timer = false

function AH_go(str) {
	str = str.substring(9)
	json = typeof JSON == 'undefined' ? eval('(' + str+ ')') : JSON.parse(str)
	var newest = ''
	if ( ! (newest = json.payload.newestStoryTime ) ) return
	GM_setValue('newest', newest + '')
	var p = document.getElementById('AHcontent')
	p.innerHTML = json.payload.html.replace(/src="\S+"/g, '')
	var c = a = s = 0
	tb = document.getElementById('AHtable').childNodes
	for(i = 1; i < tb.length - 1; i++){
		c += parseInt(tb[i].childNodes[4].textContent)
		a += parseInt(tb[i].childNodes[1].textContent)
		s += parseInt(tb[i].childNodes[2].textContent)
		num = tb[i].childNodes[1].textContent == '0' ? 100 : parseInt(tb[i].childNodes[2].textContent)*100.0/parseInt(tb[i].childNodes[1].textContent)
		tb[i].childNodes[3].textContent = Math.round(num) + '%'
	}
	row = tb[tb.length - 1].childNodes
	row[4].textContent = c
	row[1].textContent = a
	row[2].textContent = s
	num = a == '0' ? 100 : s *100.0 / a
	row[3].textContent=(Math.round(num * 100) / 100) + '%'

	functions = [function(s){job(s,1)}, function(s){job(s,2)}, function(s){job(s,3)}, boost, war, achievement, social_attack]
	var link = p.getElementsByTagName('a')
	for(j = 0; j < link.length; j++){
		l = link[j]
		if (l.href && (/UIActionLinks_bottom/.test(l.parentNode.className) || l.href == l.textContent) && ( m = /(\/track\.php\?.+(job_city%22%3A%22(\d)|boost_claim|story_war_helped|story_war_declared|ach_celeb|social_attack).+)/.exec(l.href) ) ){
			URL = m[1]
			function procHelp(n){	
				if (n == 7 && parseInt(/level (\d+)/.exec(l.parentNode.parentNode.parentNode.parentNode.textContent)[1]) > parseInt(document.getElementById('level').value) )
					return
				row = tb[n]
				inputs = row.getElementsByTagName('input')
				if(inputs[0].checked ) {
					tb[n].childNodes[1].textContent = parseInt(tb[n].childNodes[1].textContent) + 1
					URL = 'http://mwfb.zynga.com/mwfb' + URL
					httpHelp(URL, functions[n - 1])
				}
			}
			switch( m[2] ) {
				case 'boost_claim': procHelp(4);break
				case 'story_war_helped' : case 'story_war_declared': procHelp(5); break;
				case 'ach_celeb': procHelp(6); break
				case 'social_attack':procHelp(7); break
				default: procHelp(parseInt(m[3]) );break;
			}
			j++
		}
	}
}

function job(s, r){
	row = document.getElementsByTagName('table')[0].childNodes[r].childNodes
	if (q = /<span class="good">(\d+) experience points<\/span>/.exec(s) ) {
		row[4].textContent = parseInt(row[4].textContent) + parseInt(q[1])
		row[2].textContent = parseInt(row[2].textContent) + 1
	}
}

function boost(s){
	if (/You received a/.test(s) ){
		success = document.getElementById('boost').childNodes[2]
		success.textContent = parseInt(success.textContent) + 1
	}
}

function war(st){
	function attack(st, num) {
		if (num > 5) return false
		if (document.getElementById('chicken').checked) st = st.substring(s.lastIndexOf('Top Mafia'))
		var end = st.lastIndexOf('<span class="sexy_fight">Attack')
		if (end == -1) return false
		start = st.lastIndexOf('href="http://apps.facebook.com/inthemafia/remote/html_server.php?', end)
		end = st.indexOf('"',start + 8)
		httpHelp(  st.substring(start + 6, end).replace(/&amp;/g, '&'), function(s){
			if(/WON|LOST/.test(s)) {
				row = document.getElementById('war').childNodes
				row[4].textContent = parseInt(row[4].textContent) + 3
				row[2].textContent = parseInt(row[2].textContent) + 1
			}
		} )
		attack(st, num + 1)
		return true
	}
	if( !attack(st, 0) ) {
		var end = st.lastIndexOf( '<span class="sexy_fight">Betray')
		if (end == -1 || !document.getElementById('AHbetray').checked) return
		start = st.lastIndexOf('href="http://apps.facebook.com/inthemafia/remote/html_server.php?', end)
		end = st.indexOf('"',start + 8)
		httpHelp( 'http://apps.facebook.com/inthemafia/index.php?'  + st.substring(start + 65, end).replace(/&amp;/g, '&'), attack)
	}
}

function achievement(s){
	row = document.getElementById('achievement').childNodes
	if( /You got a bonus in celebration of/.test(s) ) {
		row[2].textContent = parseInt(row[2].textContent) + 1
		if (q = /<span class="good">(\d+) Experience<\/span>/.exec(s) ) {
			row[4].textContent = parseInt(row[4].textContent) + parseInt(q[1])
		}
	}
}

function httpHelp(u, func, n){
	GM_xmlhttpRequest({method:'get', url:u, onload:function(r){
			if (n == undefined) n = 0
			else if (n > 5) return
			s = ''
			try{
				s = r.responseText.toString()
			} catch (e) { GM_log(e) }
			if (!s) httpHelp(u, func, n + 1)
			else if( /top\.location\.href = /.test(s) )
				httpHelp(s.split('top.location.href = "', 2)[1].split('"', 2)[0], func)
			else
				func(s)
		}
	})
}

function social_attack(s){
	row = document.getElementById('social attack').childNodes
	if (/You fought/.test(s) ) {
		row[2].textContent = parseInt(row[2].textContent) + 1
		if (q = /\+(\d+)\s+Experience/.exec(s) ) {
			row[4].textContent = parseInt(row[4].textContent) + parseInt(q[1])
		}
	}
}