// ==UserScript==
// @name           autohelp
// @namespace	http://userscripts.org/users/21452
// @description	automatically does jobs, boosts, & wars for the mafia wars facebook app. 
// @include	http://www.facebook.com/home.php?filter=app_10979261223&show_hidden=true
// @version	79
// @license GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

window.setTimeout(function (){
	var d = document.body.insertBefore(document.createElement('div'), document.body.firstChild )
	b = d.appendChild(document.createElement('button') )
	b.id = 'AH_RLButton'
	b.type = 'button';
	b.style.display = 'none'
	b.setAttribute('onclick', document.getElementsByClassName('UIIntentionalStream_ShowNewStories_Msg')[0].getAttribute('onclick') )
	d.style.marginLeft = d.style.marginTop = "1em"
	links = d.appendChild(document.createElement('span'))
	links.innerHTML = ' <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=8335810" target="_blank">Donate now!</a> | add to mafia: <a href="http://www.facebook.com/joseph.huang.fb" target="_blank">Joseph Huang (script author)</a>, <a href="http://www.facebook.com/profile.php?id=100000212017623" target="_blank">Dutch Oven</a>, <a href="http://www.facebook.com/profile.php?id=816384480" target="_blank">Krishna Santhanam</a>,<a href="http://www.facebook.com/profile.php?id=100000367387498" target="_blank">Ace Larson</a>, <a href="http://www.facebook.com/sdtorch" target="_blank">David Torch Hansen</a><br />this script is supposed to delete the news feed items. it automatically unchecks the boxes when you hit the 25 limit, and checks again every 30 minutes.'
	t = d.appendChild(document.createElement('table'))
	tr = t.appendChild(document.createElement('tr'))
	tr.innerHTML = '<th><a href="http://userscripts.org/scripts/show/57429" target="_blank">autohelp</a> version <span id="version">79 (_nn_)</span></th><th>attempt</th><th>success</th><th>percent</th><th>exp gain</th>'
	makeCheckbox('ny', true)
	makeCheckbox('cuba', true)
	makeCheckbox('moscow', true)
	makeCheckbox('boost', true)
	makeCheckbox('war', false)
	makeCheckbox('achievement', true)
	tr = t.appendChild(document.createElement('tr'))
	tr.id = 'overall'
	tr.innerHTML = '<td>overall</td><td>0</td><td>0</td><td>NA</td><td>0</td>'
	b = d.appendChild(document.createElement('button'))
	b.type = 'button'
	b.setAttribute('onclick', "tb = document.getElementsByTagName('table')[0].childNodes;for(i=1;i<tb.length-1;i++)tb[i].childNodes[2].textContent = tb[i].childNodes[1].textContent = tb[i].childNodes[4].textContent = 0")
	b.textContent = 'reset all counters'
	refreshTimer = d.appendChild(document.createElement('input'))
	refreshTimer.value = GM_getValue('refreshDelay', 2400)
	refreshTimer.id = 'AH_refreshDelay'
	refreshTimer.parentNode.appendChild(document.createElement('span')).textContent = '(ms) refresh delay.'
	b = d.appendChild(document.createElement('button'))
	b.id = 'AH_updateButton'
	b.textContent = 'check 4 updates'
	b.addEventListener('click', AH_updateCheck, false)
	function makeCheckbox(name, defaultval) {
		r = t.appendChild(document.createElement('tr'))
		r.id = name
		n = r.appendChild(document.createElement('td'))
		n.innerHTML = '<label><input type="checkbox" /> ' + name + '</label>'
		if (name == 'war') {
			n.innerHTML = n.innerHTML + '<label title="if checked, picks a side for wars where both sides are friends"><input type="checkbox" id="AH_betray" />betray</label> <label title="if checked, do not attack if all top mafia are taken out for the published side"><input type="checkbox" id="chicken" />chicken</label>'
			n.getElementsByTagName('input')[1].checked = GM_getValue('betray', true)
			n.getElementsByTagName('input')[2].checked = GM_getValue('chicken', false)
		}
		if (name == 'moscow')
		{
			n.innerHTML = n.innerHTML + '<label title="if checked, only attempts top job for this city"><input type="checkbox" />filter</label>'
			n.getElementsByTagName('input')[1].checked = GM_getValue(name + 'Filter', true)
		}
		r.appendChild(document.createElement('td')).textContent = GM_getValue(name +'Attempt', 0)
		r.appendChild(document.createElement('td')).textContent = GM_getValue(name +'Success', 0)
		r.appendChild(document.createElement('td'))
		r.appendChild(document.createElement('td')).textContent = GM_getValue(name +'Exp', 0)
		n.getElementsByTagName('input')[0].checked = GM_getValue(name, defaultval)
		return r
	}

	div = d.appendChild(document.createElement('div'))
	div.id = 'AH_log'
	
	window.setInterval(function(){
		document.getElementById('ny').getElementsByTagName('input')[0] = true
		document.getElementById('cuba').getElementsByTagName('input')[0] = true
		document.getElementById('moscow').getElementsByTagName('input')[0] = true
		}, 1800000 )

	window.setInterval(function(){
		tb = document.getElementsByTagName('table')[0].children
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
			else if (n == 'moscow')
				GM_setValue(n + 'Filter', tb[i].getElementsByTagName('input')[1].checked)
		}
	}, 18000)
	window.setTimeout(function(){AH_go()}, 400)
	s = document.getElementById('home_sidebar')
	while(s.childNodes[1])
		s.removeChild(s.childNodes[1])
}, 3000)

function AH_updateCheck(){
	GM_xmlhttpRequest({method:'get', url:'http://userscripts.org/scripts/source/57429.meta.js', onload:function(r){
		s = r.responseText.toString()
		if( m = /@version\s+(\S+)/.exec(s) ){
			v = document.getElementById('version').textContent
			u = document.getElementById('AH_updateButton')
			if (m[1] == v)
				u.textContent = 'you have the latest version: ' + v
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

function AH_go() {
	document.getElementById('AH_RLButton').click()
	v = parseInt(document.getElementById('AH_refreshDelay').value)
	if(!v || v < 1100 || v > 22000)
		 v = 2400
	GM_setValue('refreshDelay', v)
	document.getElementById('AH_refreshDelay').value = v
	var p = document.getElementById('home_stream').getElementsByClassName('UIIntentionalStream_Content')[0]
	var c = a = s = 0
	tb = document.getElementsByTagName('table')[0].children
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

	functions = [function(s){job(s,1)}, function(s){job(s,2)}, function(s){job(s,3)}, boost, war, achievement]
	visted = {}
	while( d = p.firstChild ){
		var link = d.getElementsByClassName('UIActionLinks_bottom')[0].getElementsByTagName('a')
		while(l = link[0]) {
			if (URL = /(\/track\.php\?.*sendkey=(\w+?)&.+)/.exec(l.href) ){
				k = URL[2]
				if (!visted[k]){
					URL = URL[1]
					if (m = /(give_help|boost_claim|story_war_helped|story_war_declared|ach_celeb)/.exec(URL) ){
						function procHelp(i){
							row = tb[i] 
							inputs = row.getElementsByTagName('input')
							if(inputs[0].checked ) {
								if ( i == 3 && inputs[1].checked && !/Rob The RossijaBanc Central Repository/.test(d.textContent) )
									return
								tb[i].childNodes[1].textContent = parseInt(tb[i].childNodes[1].textContent) + 1
								URL = 'http://mwfb.zynga.com/mwfb' + URL
								httpHelp(URL, function(s){httpHelp(s.split('top.location.href = "', 2)[1].split('"', 2)[0], functions[i - 1] )})
							}
						}
						switch( m[1] ) {
							case 'give_help': procHelp(parseInt(/job_city.........(.)/.exec(URL)[1])); break
							case 'boost_claim': procHelp(4);break
							case 'story_war_helped' : case 'story_war_declared': procHelp(5); break
							case 'ach_celeb': procHelp(6); break
						}
						
					}
					visted[k] = true
				}
			}
			l.parentNode.removeChild(l)
		}
		p.removeChild(d)
	}
	window.setTimeout(AH_go, v)
}

function job(s, r){
	row = document.getElementsByTagName('table')[0].children[r]
	if (q = /<span class="good">(\d+) experience points<\/span>/.exec(s) ) {
		row.childNodes[4].textContent = parseInt(row.childNodes[4].textContent) + parseInt(q[1])
		row.childNodes[2].textContent = parseInt(row.childNodes[2].textContent) + 1
	}
	else if( /Sorry, you can only help 25 friends/.test(s) )
		row.getElementsByTagName('input')[0].checked = false
}

function boost(s){
	if( /You received a/.test(s) ){
		success = document.getElementById('boost').children[2]
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
				row = document.getElementById('war').children
				row[4].textContent = parseInt(row[4].textContent) + 3
				row[2].textContent = parseInt(row[2].textContent) + 1
			}
		} )
		attack(st, num + 1)
		return true
	}
	if( !attack(st, 0) ) {
		var end = st.lastIndexOf( '<span class="sexy_fight">Betray')
		if (end == -1 || !document.getElementById('war').getElementsByTagName('input')[1].checked) return
		start = st.lastIndexOf('href="http://apps.facebook.com/inthemafia/remote/html_server.php?', end)
		end = st.indexOf('"',start + 8)
		httpHelp( 'http://apps.facebook.com/inthemafia/index.php?'  + st.substring(start + 65, end).replace(/&amp;/g, '&'), attack)
	}
}

function achievement(s){
	row = document.getElementById('achievement').children
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
			s = r.responseText.toString()
			if (!s) httpHelp(u, func, n + 1)
			else func(s)
		}
	})
}
