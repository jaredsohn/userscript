// ==UserScript==
// @name           Ikariam - Buddy search with groups
// @namespace      http://hcs.ewyxk4.hu/ikariam
// @description    Search for the nearest buddy (who can help you) and list users by group
// @include        http://s*.ikariam.*/index.php?view=embassy*
// ==/UserScript==
///////////////////////////////////////////////////////////////////////////////////////
// Base functions
///////////////////////////////////////////////////////////////////////////////////////
function id(_id){return document.getElementById(_id);}
function tag(_p,_tag){return _p.getElementsByTagName(_tag);}
function zz(_n){return _n<10?'0'+_n:_n;}
function names(){_n=Array();for(i=0;i<users.length;i++){_n[i]=users[i].name;}return _n.join(',');}
function user(_name){for(i=0;i<users.length;i++){if(users[i].name.toLowerCase().indexOf(_name.toLowerCase())!=-1){return users[i];}}}
function cities(_name){_u=user(_name);_c=Array();for(i=0;i<_u.city.length;i++){_c[i]=_u.city[i].name;}return _c.join(',');}

///////////////////////////////////////////////////////////////////////////////////////
// Base data gathering
///////////////////////////////////////////////////////////////////////////////////////
// get table rows which are containing user's data
var lines = id('memberList').getElementsByTagName('tbody')[0].getElementsByTagName('tr');
// process user's data
var users = Array();
var actuser = {};
var u_online = 0;
var u_today = 0;
var u_old = 0;
var dt = new Date();
for(i=0;i<lines.length;i++) {
	users[i] = {};
	
	// get table cols
    var cols = tag(lines[i],'td');
	// get ul that contains data of cities
	var city_links = tag(cols[2].childNodes[1].firstChild.childNodes[1],'a');
	
	// set actual user's data
	users[i].active = cols[0].getAttribute('title').split(' : ')[1].split('.').reverse().join('-');
	u_online += cols[0].getAttribute('class').indexOf('online') >= 0 ? 1 : 0;
	users[i].online = cols[0].getAttribute('class').indexOf('online') >= 0 ? true : false;
	u_today += users[i].active == dt.getFullYear() + '-' + zz(dt.getMonth()+1) + '-' + zz(dt.getDate()) ? 1 : 0;
	users[i].name = cols[1].innerHTML;
	users[i].city = Array();
	for(k=0;k<city_links.length;k++)
		users[i].city.push({
			name: city_links[k].innerHTML.split(' [')[0],
			x: city_links[k].innerHTML.split(' [')[1].split(':')[0],
			y: city_links[k].innerHTML.split(' [')[1].split(':')[1].split(']')[0],
			link: city_links[k].href.toString()
		});
	users[i].rank = tag(cols[3],'a').length==1?tag(cols[3],'a')[0].innerHTML:cols[3].innerHTML;
	var raw = users[i].rank.split(' ');
	if(raw.length>1&&users[i].rank.split(',').length==1) {
		users[i].group = raw.slice(0,raw.length-1).join(' ');
		users[i].grouporder = ( raw[raw.length-1].indexOf('vezető')!=-1 ? 11 : ( raw[raw.length-1].indexOf('helyettes')!=-1 ? 12 : ( raw[raw.length-1].indexOf('tag')!=-1 ? 13 : 14 ) ) );
	} else {
		if(users[i].rank.indexOf('Vezető')!=-1) {
			users[i].group = 'Vezetőség';
			users[i].grouporder = 1;
		} else if(users[i].rank.indexOf('Tábornok')!=-1) {
			users[i].group = 'Vezetőség';
			users[i].grouporder = 2;
		} else if(users[i].rank.indexOf('Diplomata')!=-1) {
			users[i].group = 'Vezetőség';
			users[i].grouporder = 3;
		} else if(users[i].rank.indexOf('Titkár')!=-1) {
			users[i].group = 'Vezetőség';
			users[i].grouporder = 4;
		} else {
			users[i].group = users[i].rank;
			users[i].grouporder = ( raw[raw.length-1].indexOf('Újonc')!=-1 ? 6 : 5 );
		}
	}
	users[i].point = cols[4].innerHTML.replace(',','').replace(',','');
	if(lines[i].getAttribute('class').indexOf('highlight')>=0)
		actuser = users[i];
}
u_old = users.length - u_today;
u_today -= u_online;
users.sort(function(a,b){return a.name>b.name;});

///////////////////////////////////////////////////////////////////////////////////////
// Search functions
///////////////////////////////////////////////////////////////////////////////////////
var results = Array();
function search_buddy() {
	var x = id('t_x').value;
	var y = id('t_y').value;
	var d = id('t_d').value;
	searchByDistance(x,y,d);
}
function searchByDistance(x,y,d) {
	results = Array();
	for(i=0;i<users.length;i++) {
		for(k=0;k<users[i].city.length;k++) {
			var c = users[i].city[k];
			var l = Math.sqrt(Math.pow(c.x-x,2)+Math.pow(c.y-y,2));
			if(l<=d)
				results.push({buddy:users[i].name+" ("+users[i].rank+")",city:c.name,link:c.link,x:c.x,y:c.y,distance:Math.round(l*10)/10,online:(users[i].online?'on':'off'),name:users[i].name});
		}
	}
	writeResults();
}
function results2table() {
	results.sort(function(a,b){return a.distance>b.distance;});
	var tbl = '<table>';
	if(results.length==0) {
		tbl += '<tr><td><b>Nincs ilyen közelségben szövetséges :(<br/><small>No buddy in this distance :(</small></b></td></tr>';
	} else {
		tbl += '<thead><tr><th>Tag/<small>Buddy</small></th><th>Város/<small>City</small></th><th>X</th><th>Y</th><th>Táv/<small>Distance</small></th></tr></thead>';
		tbl += '<tbody>';
		for(i=0;i<results.length;i++) {
			if(results[i].name!=actuser.name) {
				tbl += '<tr>';
				tbl += '<td><img src="skin/layout/bulb-'+results[i].online+'.gif" height="12"/> '+results[i].buddy+'</td>';
				tbl += '<td><a href="'+results[i].link+'">'+results[i].city+'</a></td>';
				tbl += '<td align="center">'+results[i].x+'</td>';
				tbl += '<td align="center">'+results[i].y+'</td>';
				tbl += '<td align="center">'+results[i].distance+'</td>';
				tbl += '</tr>';
			}
		}
		tbl += '</tbody>';
	}
	tbl += '</table>';
	return tbl;
}
function writeResults() {
	document.getElementById('t_results').innerHTML = results2table();
}
function calcNearestDistance(u1,u2) {
	var nd = 1000000;
	var tnd = 1000000;
	for(var i=0;i<u1.city.length;i++)
		for(var k=0;k<u2.city.length;k++)
			if((tnd = Math.sqrt(Math.pow(u1.city[i].x-u2.city[k].x,2)+Math.pow(u1.city[i].y-u2.city[k].y,2))) < nd)
				nd = tnd;
	return Math.round(nd*10)/10;
}
function groups2table() {
	var u = users;
	u.sort(function(a,b){return a.group>b.group;});
	u.sort(function(a,b){return a.group==b.group&&a.grouporder>b.grouporder;});
	var g = '';
	var leaders = '';
	var own = '';
	var others = '';
	var tbl = '<table>';
	tbl += '<thead><tr><th>Tag/<small>Buddy</small></th><th>Rang/<small>Rank</small><th>Táv/<small>Distance</small></th></tr></thead>';
	tbl += '<tbody>';
	for(i=0;i<u.length;i++) {
		if(i>0&&u[i].group!=u[i-1].group)
			g = (g==''?'alt':'');
		if(u[i].group==actuser.group) {
			own += '<tr class="highlight">';
			own += '<td><img src="skin/layout/bulb-'+(u[i].online?'on':'off')+'.gif" height="12"/> '+u[i].name+'</td>';
			own += '<td align="center">'+u[i].rank+'</td>';
			own += '<td align="center">'+calcNearestDistance(actuser,u[i])+'</td>';
			own += '</tr>';
		} else if(u[i].grouporder<=4) {
			leaders += '<tr class="'+g+'">';
			leaders += '<td><img src="skin/layout/bulb-'+(u[i].online?'on':'off')+'.gif" height="12"/> '+u[i].name+'</td>';
			leaders += '<td align="center">'+u[i].rank+'</td>';
			leaders += '<td align="center">'+calcNearestDistance(actuser,u[i])+'</td>';
			leaders += '</tr>';
		} else {
			others += '<tr class="'+g+'">';
			others += '<td><img src="skin/layout/bulb-'+(u[i].online?'on':'off')+'.gif" height="12"/> '+u[i].name+'</td>';
			others += '<td align="center">'+u[i].rank+'</td>';
			others += '<td align="center">'+calcNearestDistance(actuser,u[i])+'</td>';
			others += '</tr>';
		}
	}
	tbl += leaders + own + others;
	tbl += '</tbody>';
	tbl += '</table>';
	return tbl;
}

///////////////////////////////////////////////////////////////////////////////////////
// Search display
///////////////////////////////////////////////////////////////////////////////////////
var curr_x = 0, curr_y = 0;
var cities = document.getElementById('citySelect').getElementsByTagName('option');
for(i=0;i<cities.length;i++) {
    if(cities[i].getAttribute('selected')=='selected') {
        curr_x = cities[i].innerHTML.split('[')[1].split(':')[0];
		curr_y = cities[i].innerHTML.split('[')[1].split(':')[1].split(']')[0];
		break;
	}
}

var t_mainview = document.getElementById('mainview').innerHTML.split('contentBox01h');
document.getElementById('mainview').innerHTML = t_mainview[0] + 'contentBox01h"><h3 class="header"><span class="textLabel">Szövetséges keresése / Buddy search</span></h3><div class="content" id="t_container"><div id="t_stat" style="font-size:10px;text-align:center;overflow:visible;border-bottom:1px solid #F3DDB5;color:#906646;">Szövetséges Elérhetőségi Statisztika / <small>Buddy Online Stats</small> - Online: '+u_online+' ('+(Math.round(u_online/users.length*1000)/10)+'%), Ma / <small>Today</small>: '+u_today+' ('+(Math.round(u_today/users.length*1000)/10)+'%), Régebben / <small>Formerly</small>: '+u_old+' ('+(Math.round(u_old/users.length*1000)/10)+'%)</div><div id="t_search" style="border-bottom:1px solid #E4B873;text-align:center;"><b>Koordináták és relatív távolság / <small>Coordinates and relative distance</small></b> &rarr; X: <input type="text" id="t_x" value="'+curr_x+'" size="2" style="width:20px"/> Y: <input type="text" id="t_y" value="'+curr_y+'" size="2" style="width:20px"/> Táv / <small>Distance</small>: <input type="text" id="t_d" value="1" size="2" style="width:20px"/> <input type="button" value="OK" id="t_search_btn" class="button" style="cursor:pointer"/></div><div id="t_results"></div><div id="t_groups">'+groups2table()+'</div></div><div class="footer"></div></div><div class="contentBox01h' + t_mainview.splice(1,t_mainview.length-1).join('contentBox01h');
searchByDistance(curr_x,curr_y,0);
document.getElementById('t_search_btn').addEventListener('click',search_buddy,false);