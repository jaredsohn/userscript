// ==UserScript==
// @name           PGHE V0.2.1
// @namespace      11235813[Bande:DABEI]
// @description    PGHE
// @include        http://*pennergame.de/highscore/*
// @require		   http://dabei.kilu.de/script.class.js
// ==/UserScript==
count = 0;
count1 = 0;
init();
prog = 0;
perc = 0;
stack = Array();
user = Array();
data = new Object();
s_data = new Object();
rang = 'DESC';
vars = new Object();
TaskManager('run');
link_col = new Object({
			'Blog':'http://blog.farbflut.de/blog/',
			'News':Global.url.static+'news/',
			'Lets Fight':Global.url.static+'fight/overview/',
			'Übersicht':Global.url.static+'overview/',
			'Bande':Global.url.static+'gang/',
			'Bandenhighscore':Global.url.static+'highscore/gang/'
					  });

function TaskManager(stat) {
	//alert(stat);
	switch(stat) {		
		case 'fightdata':
			httpReq(Global.url.static+'fight/overview/','GET','',fightHandler,'');
			break;
		case 'dashboard':
			dash();
			break;
		case 'run':
			collectUserids();
			//status('Sammle Fight-Daten',0);
			break;	

		case 'createLayout':
			createLayout();
			break;
		case 'userids:collected':
			status('Lade User-API Daten',0);
			userHandler('api:load');
			break;
		case 'userapi:complete':
			status('Lade Gang-API Daten',0);
			userHandler('gang:load');
			break;
			
		case 'gangapi:complete':
			status('Lade Profil-Daten',0);
			userHandler('profile:load');
			break;
		case 'profile:complete':
			status('Daten gesammelt',0);
			arr = objToArray(data);
			vars.arr = arr;
			renderTable(arr);
			status('Fertig.',0);
			//alert(stack);
			break;
		case 'data:finished':
		
	}
}
function userApiHandle(resp,id) {
	try {
	count1++;
	status('',perc);
	var dom = setParser(resp.responseText,'XML');
	data[id].api.name = getTC('name',dom)[0];
	data[id].api.punkte = getTC('points',dom)[0];
	data[id].api.platz = getTC('position',dom)[0];
	data[id].api.rankingpoints = getTC('rankingpoints',dom)[0];
	data[id].api.cash = getTC('cash',dom)[0] ? getTC('cash',dom)[0] : '-';
	data[id].api.reg = getTC('reg_since',dom)[0];
	data[id].api.sig = getsig(id);
	
	data[id].gang.id = getTC('id',dom)[1];
	data[id].api.city = getTC('city',dom)[0];
	
	if(data[id].gang.id != '0') {
	data[id].gang.name = getTC('name',dom)[1];
	try{
	var gs = dom.getElementsByTagName('status')[0].textContent;
	switch(gs) {
		case "1": gs = 'Mitglied'; break;
		case "2": gs = 'CoAdmin'; break;
		case "3": gs = 'Admin'; break;
	}
	data[id].gang.status = gs;
	} catch(e) {
	}
	data[id].gang.joined = getTC('joined',dom)[0];
	} else {
		
		data[id].gang.status = '-';
		data[id].gang.joined = '-';
		data[id].gang.name = '-';
		data[id].gang.id = '-';
		data[id].gang.punkte = '-';
		data[id].gang.platz = '-';
		data[id].gang.mitglieder = '-';
		data[id].gang.avg = '-';
	}
	} catch(e) {
		error('userApiHandle:'+id+':'+e);
	}
	userHandler('api:load');
}

function gangApiHandle(resp,id) {
	try {
	count1++;
	status('',perc);
	var dom = setParser(resp.responseText,'XML');
	data[id].gang.name = getTC('name',dom)[0];
	var pkte = getTC('points',dom)[0];
	var mit = getTC('member_count',dom)[0];
	data[id].gang.platz = getTC('position',dom)[0];
	data[id].gang.punkte = pkte;
	data[id].gang.mitglieder = mit;
	var avg = pkte/mit;
	var avg = Math.round(avg);
	data[id].gang.avg = avg;
	} catch(e) {
		error('gangApiHandle:'+id+':'+e);
	}
	userHandler('gang:load');
}
function ProfileHandle(resp,id) {
	try {
	count1++;
	status('',perc);
	var cont = resp.responseText;
	
	var cont = cont.replace(/[\s]+/g,'');
	try{
	var tier = cont.match(/BeidemTierhandeltessichumeinselbsterstelltesHaustierundbasiertaufdenBasiswertenvon<b>(.*?)<\/b>/)[1];
	var tier = petH[tier];
	//alert(tier);
	} catch(e) {
		try {
			var tier = cont.match(/http:\/\/media\.pennergame\.de\/img\/tiere\/\d+\.jpg/)[0];
			//alert(tier);
		} catch(e) {
			var tier = '';
		}
	}
	if(tier==false) {
		var tier= '-';
	}
		

		data[id].profil.pet = tier;

	
		 if(cont.match(/Online/)) {
			 data[id].profil.status='<img class="no" img src="http://static.bitcrunch.de/images/pg-user-online.gif" />'
		 } else if(cont.match(/gebannt/)) {
			data[id].profil.status = '<img class="no" src="http://dabei.kilu.de/pg-user-bann.gif" />';
		 } else {
			data[id].profil.status = '';
		 }
	} catch(e) {
		error('ProfileHandle:'+id+':'+e);
	}
	userHandler('profile:load');
}
function collectUserids() {
	try{
	var table = document.getElementsByTagName('table')[0];
	var tr = table.getElementsByTagName('tr');
	for(i=1;i<tr.length;i++) {
		var id = tr[i].innerHTML.match(/\profil\/id:(\d+)\//)[1];
		var id = id.toString();
		user.push(id);
		data[id] = new Object();
		data[id].api = new Object();
		data[id].gang = new Object();
		data[id].profil = new Object();
	}
	perc = 100/3/user.length;
	
	document.body.innerHTML = "";
document.getElementsByTagName("head")[0].innerHTML = '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><title>PGHE V0.2.1</title><link rel="stylesheet" href="http://dabei.kilu.de/style_pghe.css" />';
	} catch(e) {
		error('collectUserids:'+e);
	}
	TaskManager('fightdata');
}
function userHandler(task) {
		
		switch(task) {
			case 'api:load':
				if(count1==0) {
				for(var cnt1=0;cnt1<user.length;cnt1++) {
					id = user[cnt1];
					httpReq(Global.url.static+'dev/api/user.'+id+'.xml','GET','',userApiHandle,id);
					count++;
				} 
				}
				if(count1==(user.length)) {
					count = 0;
					count1 = 0;
					TaskManager('userapi:complete');
				}
				break;
			case 'gang:load':
				if(count1==0) {
				for(var cnt1=0;cnt1<user.length;cnt1++) {
					id = user[cnt1];
					gangid = data[id].gang.id;
					count++;
					if(gangid != '-') {
					httpReq(Global.url.static+'dev/api/gang.'+gangid+'.xml','GET','',gangApiHandle,id);
					} else {
						userHandler('gang:load');
					}
					
				} 
				}
				if(count1==(user.length)) {
					count = 0;
					count1 = 0;
					TaskManager('gangapi:complete');
				}
				break;
			case 'profile:load':
				if(count1==0) {
				for(var cnt1=0;cnt1<user.length;cnt1++) {
					id = user[cnt1];
					httpReq(Global.url.static+'profil/id:'+id+'/','GET','',ProfileHandle,id);
					count++;
				}
				}
				if(count1==(user.length)) {
					count = 0;
					count1 = 0;
					TaskManager('profile:complete');
				}
				break;
					
		}
}







function objToArray(obj) {
	try {
	var array = Array();
	array[0] = ['Platz','Spieler','Punkte','Rankingpoints','RegDatum','Geld','Signatur','Haustier','Stadtteil','Status','Bande','Bandenplatz','Bandenpunkte','Mitglieder','Schnitt','Beitrittsdatum'];
	
	for(var k=0;k<user.length;k++) {
		userid = user[k];
		userdata = data[userid];
		
		if(parseInt(s_data.lim_min)<=parseInt(userdata.api.punkte)&&parseInt(s_data.lim_max)>=parseInt(userdata.api.punkte)){
		 var code ='<br><a href="'+Global.url.static+'/fight/?to='+userdata.api.name+'"><img  class="att" src="http://media.pennergame.de/de/img/att.png" /></a>';
		} else {
			var code = '';
		}
		if(userdata.profil.status) {
			var append = '<br>';
		} else {
			var append = '';
		}
		arr1 = Array(userdata.api.platz,'<a href="'+Global.url.static+'profil/id:'+userid+'/">'+userdata.api.name+'</a>'+append+userdata.profil.status+code,userdata.api.punkte,userdata.api.rankingpoints,userdata.api.reg,format(userdata.api.cash),userdata.api.sig,userdata.profil.pet!='-'?makeimg(userdata.profil.pet,40,50,true):'-',userdata.api.city,userdata.gang.status,'<a href="'+Global.url.static+'profil/bande:'+userdata.gang.id+'/">'+userdata.gang.name+'</a>',userdata.gang.platz,userdata.gang.punkte,userdata.gang.mitglieder,userdata.gang.avg,userdata.gang.joined);
		
		array[k+1] = arr1;
		
	}
	}catch(e) {
		error('objToArray:'+obj+':'+e);
	}
	return array;
	
}
function renderTable(arr) {
	try{
		
		var table = document.getElementsByTagName("table")[3];	
		table.innerHTML = "";
		var sit = true;
	}catch(e){
		var table = document.createElement("table");
		var div = document.createElement("div");
		var sit = false;
	}

	var tr = document.createElement("tr");
	
	for(i=0;i<arr[0].length;i++) {
		var th = document.createElement("th");
		th.innerHTML = arr[0][i];
		if(th.innerHTML != 'Signatur' && th.innerHTML != 'Haustier') {
		th.addEventListener('click',sortit,true);
		} else {
			th.className = 'nonclick';
		}

		tr.style.backgroundColor = '#272727';
		tr.appendChild(th);
	}
	table.appendChild(tr);
	for(var q=1;q<arr.length;q++) {
		var tr = document.createElement("tr");
		if(q%2==0) {
		tr.className = 'zeileB';
		} else {
			tr.className = 'zeileA';
		}
		for(var p=0;p<arr[q].length;p++) {
			var td = document.createElement("td");
			td.innerHTML = arr[q][p];
			if(td.innerHTML.indexOf(",")>=0) {
				ih = arr[q][p];
				ih = ih.match(/[\d]+/g);
				ih = ih.join('');
				color(ih,td);
			}
			if(td.innerHTML.indexOf('tier')>=0) {
				td.className = 'center';
			}
			td.align = 'left';
			td.vAlign = 'middle';
			tr.appendChild(td);
		}
		table.appendChild(tr);
		
	}
	if(sit==false) {
		div.appendChild(table);
		document.body.appendChild(div);
	} else {
		
	}	
}



col = 0;
function sortit() {
	var sortby = this.textContent;
	var arr = vars.arr;
	for(var r=0;r<arr[0].length;r++) {
		if (arr[0][r] == sortby) {
			col = r;
			break;
		}
	}

	switch(sortby) {
		case 'Geld':
			func = gelds;
			break;			
		case 'RegDatum':
		case 'Beitrittsdatum':
			func =regsort;
			break;
		case 'Status':
			func = statsort;
			break;
		case 'Spieler':
		case 'Bande':
			func = buchs;
			break;
		case 'Signatur':
		case 'Haustier':
			func = no;
		default:
			func = ssort;
			break;

	}
	vals = arr.shift();
	arr.sort(func);
	if(rang=='DESC') {
		arr.reverse();
	}
	arr.unshift(vals);
	
	renderTable(arr);
	if(rang=='ASC') {
		rang = 'DESC';
	} else {
		rang = 'ASC';
	}
}
function gelds(a,b) {
a = a[col];
b = b[col];
if(a=='-'){ 
a= 0;
} else {
a = a.match(/[\d]+/g);
a = a.join('');
}
if(b=='-'){ 
b=0;
}else {
b = b.match(/[\d]+/g);
b = b.join('');
}

return (parseInt(a,10)-parseInt(b,10));

}
function ssort(a,b) {
	a = a[col];
	b = b[col];
	if(a=='-'){ 
	a= 0;
	}
	if(b=='-'){ 
	b= 0;
	}
	return parseInt(a)-parseInt(b);
}
function buchs(a,b) {
	a = a[col];
	a = a.match(/>(.*?)<\//)[1];
	
	b = b[col];	
	b = b.match(/>(.*?)<\//)[1];
	a = a.toLowerCase();
	b = b.toLowerCase();
	if(a<b) {
		return -1;
	} else if(a==b) {
		return 0;
	} else {
		return 1;
	}
}
function regsort(a,b) {
	a = a[col];
	a = a.match(/(\d+)\.(\d+)\.(\d+)/);
	
	b = b[col];
	b = b.match(/(\d+)\.(\d+)\.(\d+)/);
	aa = a[3]+a[2]+a[1];
	bb = b[3]+b[2]+b[1];
	return parseInt(aa) -parseInt(bb);
}
function statsort(a,b) {
	a = a[col];
	b = b[col];
	if(a=='Admin') {
		sa = 3;
	} else if(a=='CoAdmin') {
		sa = 2;
	} else if(a=='Mitglied') {
		sa = 1;
	} else {
		sa = 0;
	}
	if(b=='Admin') {
		sb = 3;
	} else if(b=='CoAdmin') {
		sb = 2;
	} else if(b=='Mitglied') {
		sb = 1;
	} else {
		sb = 0;
	}
	return sa-sb;
}
function no(a,b) {
	return 0;
}
function createLayout() {
navi();
TaskManager('userids:collected');
	
}
function status(text,toadd) {
	try {
	var balken = document.getElementById("fortschritt");
	var status = document.getElementById("status");
	if(text != '') {
	status.innerHTML = text;
	}	
	balken.style.width = (toadd+prog)+'%';

	} catch(e) {
		error('status:'+text+':'+toadd+':'+e);
	}
	prog += toadd;
}
function navi() {
	try {
	var url = Global.url.static;
	var url = url.replace('http://','http://highscore.');
	var main = document.createElement('div');
	try {
	var current = parseInt(document.location.href.match(/\d+/)[0]);
	} catch(e) {
		current = 1;
	}
	if(document.location.href.match(/range/)) {
		var url1 = url+'highscore/range/';
		var url2 = document.location.href.match(/\/\?max_points=\d+&min_points=\d+/)[0];
		var current = 1;
	} else if(document.location.href.match(/name/)) {
		var url1 = url+'highscore/';
		var url2 = '/';
		var current = 1;
	} else {
		var url1 = url+'highscore/';
		var url2 = '/';
	}
	var ul = document.createElement("table");
	ul.className = 'paginationdiv';
	ul.width='30%';
	var tr = document.createElement("tr");
	for(var j=(current-5);j<(current+5);j++) {
		if(j>0) {
				var li = document.createElement("td");
				li.width = '9%';
				if(j==current) {
				li.className="act";
				} 
				li.innerHTML = '<div align="center"><a href="'+url1+j+url2+'">'+j+'</a></div>';

				tr.appendChild(li);
		}
	}
	var li = document.createElement("td");
	li.innerHTML = '<form method="GET" action="/highscore/search/"><input name="name" maxlength="30" type="text"><input class="formbutton" value="Spieler suchen" type="submit"></form>';
		
	tr.appendChild(li);
	ul.appendChild(tr);
	main.appendChild(ul);
	main.innerHTML +="<br>";
	stat(main);
	} catch(e) {
		error('Layout:'+e);
	}
	function stat(main) {
		var div = document.createElement("div");
		div.className = 'paginationdiv';
		var balken = document.createElement('div');
		balken.className = 'balkenwrap';
		var balk = document.createElement('div');
		balk.style.height = '100%';
		balk.id = 'fortschritt';
		balken.appendChild(balk);
		div.appendChild(balken);
		main.appendChild(div);
		var div = document.createElement('div');
		div.id = 'status';
		main.appendChild(div);
		main.id = 'statusfeld';
		
		
		document.body.appendChild(main);
	}
}
function fightHandler(resp,nothing) {
	var cont = resp.responseText;
	var cont = cont.replace(/[\s]+/g,'');
	var id = cont.match(/avatare\/(\d+)_small\.jpg/)[1];
	s_data.ava = Global.url.ava+id+'.jpg';
	var lim = cont.match(/DeinZielmuss(\d+)bis(\d+)Punktehaben/);
	s_data.lim_min = lim[1];
	s_data.lim_max = lim[2];
	var vals = cont.match(/>(\d+)<aclass="tooltip"/g);
	var att = vals[0].match(/(\d+)/)[0];
	var def = vals[1].match(/(\d+)/)[0];
	var wonlost = cont.match(/(Gewonnen:|Verloren:)<\/td><td>(\d+)<\/td>/g);
	var won = wonlost[0].match(/(\d+)/)[1];
	var lost = wonlost[1].match(/(\d+)/)[1];
	s_data.att = att;
	s_data.def = def;
	s_data.won = won;
	s_data.lost =lost
	var out = cont.match(/<ahref="\/profil\/id:(\d+)\/"style="text-decoration:none">(.*?)</);
	if(out) {
		s_data.out_name = out[2];
		s_data.out_id = out[1];
		var out2 = cont.match(/Endeca.(\d+).(\d+).(\d{4,4})(\d+):(\d+):(\d+)/);
		s_data.out_end = out2[1]+'.'+out2[2]+'.'+out2[3]+' um '+out2[4]+':'+out2[5]+':'+out2[6]+' Uhr';
		
	} else {
		s_data.out_name = '-';
		s_data.out_id = '-';
		s_data.out_end = '-';
	}
	TaskManager('dashboard');
	
}
function dash() {
	var div0 = document.createElement('table');
	div0.width = '100%';	
	div0.className = "test";
	text0 = '<tr>';
	for(var i in link_col) {
		text0 += "<td class='navlink'><a href='"+link_col[i]+"'>"+i+"</a></td>";
	}
	text0+='</tr>';
	
	div0.innerHTML = text0;
	document.body.appendChild(div0);
	var div1 = document.createElement('table');
	div1.width = '100%';
	var url = Global.url.static;
	url = url.replace('http://','http://highscore.');
	div1.id = 'dashboard';
	text = "<tr><td colspan='4'><h1>PennergameHighscoreExtension</h1></td></tr>";
	

	text += "</tr><tr><td rowspan='6' width='108px'><img src='"+s_data.ava+"' class='avatar'/></td>";
	text += "<td width='60px'>ATT:</td><td width='150px'>"+s_data.att+"</td><td>Ausgehender Kampf:</td></tr><tr><td>DEF:</td><td>"+s_data.def+"</td><td>";
	text += s_data.out_name!='-'?"<a href='"+Global.url.static+"profil/id:"+s_data.out_id+"/'>"+s_data.out_name+"</a>": "-";
	text += "</td></tr>";
	text += "<tr><td>Gewonnen:</td><td>"+s_data.won+"</td><td>Ende:</td>";
	
	text+="</tr><tr><td>Verloren:</td><td>"+s_data.lost+"</td><td>"+s_data.out_end+"</td></tr>";
	text += "<tr><td>Bereich:</td><td>"+s_data.lim_min+" bis "+s_data.lim_max+" Punkte.</td>";
	text += "<td><a class='searchlink' href='"+url+"highscore/range/1/?max_points="+s_data.lim_max+"&min_points="+s_data.lim_min+"'>Zeige Gegner</a></td></tr>";
	div1.innerHTML=text;
	document.body.appendChild(div1);
	TaskManager('createLayout');
	
}
function error(msg) {
	stack.push(msg);
	//alert(msg);
}