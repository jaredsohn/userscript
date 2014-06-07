// ==UserScript==
// @name           Erep : Navarch
// @namespace      www.userscript.org/sripts/show
// @description    Erep : Vojne Naredbe
// @date           2009-12-17
// @creator        mkey
// @include        http://www.erepublik.com/en
// @include        http://www.erepublik.com/en/citizen/profile/*
// @include        http://erep.orders.freehostia.com/orders/hr/1gb/com/*
// ==/UserScript==
	
	var url_orders = 'http://erep.orders.freehostia.com/orders/';
	var url_profile = 'http://www.erepublik.com/en/citizen/profile/';
	var url_query = 'http://www.erepublik.com/en/search/?q=';
	var url_tdm = 'http://ereptools.net/battles/playerFights/id/';
	var url_company = 'http://www.erepublik.com/en/company/';
	var url_company_details = 'http://www.erepublik.com/en/company-details/';
	
	var strings = new Array('Naredbe 1.GB za dan: ', 'hr/1gb/', 'Autentifikacija neuspjela', 'Naredba nepoznata', 'Korisnik nije pronađen', 'Ček...', 'Dodaj', 'Tvrtka nije pronađena');
	
	var style = '.cframeclass{padding:2px 10px 2px 10px;} .frameclass{background-color:rgb(233, 245, 250);font-family:"Calibri",Georgia,Serif;} .titleclass{padding:3px 0px 3px 5px;font-size:15px;color:rgb(144, 188, 201);font-weight:900;} .ctextclass{padding:1px 3px 3px 3px;font-size:18px;background-color:rgb(255, 255, 255);border:1px solid rgb(181, 214, 225);font-size:17px;color:rgb(30, 30, 30);} .sigclass{padding:4px 0px 8px 10px;font-size:13px;color:rgb(50, 50, 50);} .linkclass{text-decoration:underline;} .sepclass{padding-bottom:8px;}';
	
	var key='', iframe, day=0, input, links, set_nv=0;
	var d=document, byId=d.getElementById, byClass=d.getElementsByClassName, byTag=d.getElementsByTagName, create=d.createElement;
	
(function(){
	if (byId('citizen_name')) return;
	else if (d.URL.indexOf('/orders/')!=-1) ControlPanel();
	else if (d.URL.indexOf('/company/')!=-1) Company();
	else if (d.URL == byId('miniprofile').getElementsByTagName('a')[0].href) Profile();
	else Main();
})()

function Main(){
	var div = byId('latestnews');
	var a = byClass('citizen_name')[0];
	if (!div || !a) { setTimeout(Main, 200); return; }
	var user = a.textContent;
	var id = a.href.substring(44);
	
	GM_addStyle(style);
	GetDay();
	
	var frame = create('div'); frame.className = 'frameclass';
	var title = create('div'); title.className = 'titleclass';
	frame.appendChild(title);
	var c_frame = create('div'); c_frame.className = 'cframeclass';
	var command = create('div'); command.className = 'ctextclass';
	c_frame.appendChild(command);
	frame.appendChild(c_frame);
	var sig = create('div'); sig.className = 'sigclass';
	frame.appendChild(sig);
	var sep = create('div'); sep.className = 'sepclass';
	sep.appendChild(frame);
	div.parentNode.insertBefore(sep, div);
	GM_xmlhttpRequest({
		method: 'POST',
		url: url_orders+strings[1],
		headers: { 'Content-type' : 'application/x-www-form-urlencoded' },
		data: encodeURI('user='+user+'&id='+id+'&day='+day+GM_getValue('user_data', '&well=0&exp=0&lvl=0&str=0&fgs=0&tdm=0&sk1=0&sk2=0&sk3=0&wp=0&cid=0&cnt=0&rgn=0')),
		onload: function(e){
			var data, i, j, a, link;
			if (e.readyState == 4 && e.status != 200) { return; }
			if (e.responseText.length == 1)	{ title.textContent = strings[2]; command.textContent = strings[3]; }
			else {
				data = e.responseText.split(';;;;;');
				i = data[0].indexOf('http:');
				if (i == -1) command.textContent = data[0];
				else {
					a = create('a');
					a.className = 'linkclass';
					link = data[0].substring(i);
					j = link.indexOf(' ');
					if (j == -1) { a.href = link; a.textContent = link; command.textContent = data[0].substring(0, i); }
					else { a.href = link.substring(0, j); a.textContent = link.substring(0, j); command.textContent = data[0].substring(0, i) + link.substring(j, 0); }
					c_frame.appendChild(a);
				}
				title.textContent = strings[0] + day;
				sig.textContent = data[1];
				if (GM_getValue('newday', 0)){ GM_setValue('newday', 0); }
			}
		}
	});
}

function Profile(){
	var wp, cid;
	var well = Number(byClass('wellnessvalue tooltip')[0].textContent);			// well
	var a = byClass('goright special');
	var fgs = a[0].textContent;										// fights
	var tdm = a[1].textContent;
	tdm = Number(tdm.split('/')[0]);								// total damage
	a = byClass('entity largepadded')[0];
	if (a){
		cid = a.getElementsByTagName('a')[0].href;
		if (cid.indexOf('/company/')==-1){
			wp = '';
			cid = 0;
		} else {
			wp = a.getElementsByTagName('img')[0].alt;
			cid = cid.split('-');
			cid = cid[cid.length-1];
		}
	}
	var lvl = byClass('xplevel tooltip')[0].textContent;			// lvl
	var exp = byClass('xppoints')[0].textContent;					// exp
	exp = exp.split('/')[0];
	a = byClass('special');											// skills
	var sk1 = Number(a[2].textContent);
	var sk2 = Number(a[3].textContent);
	var sk3 = Number(a[4].textContent);
	var str = Number(a[5].textContent);								// strength
	a = byId('profile_stat').getElementsByTagName('a');
	var cnt = a[1].textContent;										// get the player country
	var rgn = a[2].textContent;										// get the player region
	GM_setValue('user_data', '&well='+well+'&exp='+exp+'&lvl='+lvl+'&str='+str+'&fgs='+fgs+'&tdm='+tdm+'&sk1='+sk1+'&sk2='+sk2+'&sk3='+sk3+'&wp='+wp+'&cnt='+cnt+'&rgn='+rgn+'&cid='+cid);
	alert(GM_getValue('user_data'));
}

// orders window
function ControlPanel(){
	if (byId('btn_update_user')) byId('btn_update_user').addEventListener('click', UpdateUser, false);		// button handlers
	if (byId('btn_add_user')) byId('btn_add_user').addEventListener('click', AddUser, false);
	if (byId('add_user_input')) byId('add_user_input').addEventListener('keypress', function(event){ var k = window.event || event; k = k.charCode || k.keyCode; if (k==13) AddUser(event); }, false);
	if (byId('btn_update_company')) byId('btn_update_company').addEventListener('click', UpdateCompany, false);
	if (byId('btn_add_company')) byId('btn_add_company').addEventListener('click', AddCompany, false);
	if (byId('add_company_input')) byId('add_company_input').addEventListener('keypress', function(event){ var k = window.event || event; k = k.charCode || k.keyCode; if (k==13) AddCompany(event); }, false);
	
	iframe = create('iframe');												// iframe
	iframe.style.display = 'none';
	d.body.appendChild(iframe);
	
	//UpdateCompany();
}

function UpdateCompany(){
	input = byId('company_update_form').getElementsByTagName('input');
	links = byId('company_list').getElementsByTagName('a');
	if (!links.length) return;
	GetCompanyData(links.length-1);
}

function GetCompanyData(i){
	GM_xmlhttpRequest({
		method: 'GET',
		url: links[i].href,
		headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Accept': 'text/html' },
		onload: function(e){
			if (e.readyState == 4 && e.status != 200) return;
			var doc = iframe.contentDocument;
			doc.body.innerHTML = e.responseText;
			input[i*3+2].value = doc.getElementsByClassName('special')[0].textContent;
			var url = doc.getElementsByClassName('vround-btn-core');
			url = url[url.length-1].href.split('/');
			url = url[url.length-4];
			GM_log(url);
			
			GM_xmlhttpRequest({
				method: 'GET',
				url: url_company_details+url,
				headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Accept': 'text/html' },
				onload: function(e){
					if (e.readyState == 4 && e.status != 200) return;
					var doc = iframe.contentDocument;
					doc.body.innerHTML = e.responseText;
					input[i*3+0].value = doc.getElementsByClassName('special')[0].textContent;
					input[i*3+1].value = doc.getElementById('number_of_products').textContent;
					GM_log(i);
					i--;
					if (i<0) byId('company_update_form').submit();
					else GetCompanyData(i);
				}
			});
		}
	});	
}

// update the user data table
function UpdateUser(){
	input = byId('user_update_form').getElementsByTagName('input');
	links = byId('member_list').getElementsByTagName('a');
	if (!links) return;
	GetUserData(links.length/5-1);
}

function GetUserData(i){
	GM_xmlhttpRequest({
		method: 'GET',
		url: links[i*5].href,
		headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Accept': 'text/html' },
		onload: function(e){
			if (e.readyState == 4 && e.status != 200) return;
			var doc = iframe.contentDocument;
			doc.body.innerHTML = e.responseText;
			input[i*14+0].value = Number(doc.getElementsByClassName('wellnessvalue tooltip')[0].textContent);		// well
			var a = doc.getElementsByClassName('goright special');
			input[i*14+4].value = a[0].textContent;													// fights
			var temp = a[1].textContent;
			input[i*14+5].value = Number(temp.split('/')[0]);											// total damage
			a = doc.getElementsByClassName('entity largepadded')[0];
			if (a){
				temp = a.getElementsByTagName('a')[0].href;
				if (temp.indexOf('/company/')==-1){
					input[i*14+9].value = '';
					input[i*14+13].value = 0;
				} else {
					input[i*14+9].value = a.getElementsByTagName('img')[0].alt;
					temp = temp.split('-');
					input[i*14+13].value = temp[temp.length-1]
				}
			}
			input[i*14+2].value = doc.getElementsByClassName('xplevel tooltip')[0].textContent;		// lvl
			temp = doc.getElementsByClassName('xppoints')[0].textContent;									// exp
			input[i*14+1].value = temp.split('/')[0];
			a = doc.getElementsByClassName('special');														// skills
			input[i*14+6].value = Number(a[2].textContent);
			input[i*14+7].value = Number(a[3].textContent);
			input[i*14+8].value = Number(a[4].textContent);
			input[i*14+3].value = Number(a[5].textContent);											// strenght
			a = doc.getElementById('profile_stat').getElementsByTagName('a');
			input[i*14+10].value = a[1].textContent;													// get the player country
			input[i*14+11].value = a[2].textContent;													// get the player region
			input[i*14+12].value = doc.getElementById('clock').getElementsByTagName('strong')[0].textContent;
			i--;
			if (i<0) byId('user_update_form').submit();
			else GetUserData(i);
		}
	});
}

// fetch user id, get the profile, the stats and update the control panel form
function AddUser(e){
	var input = byId('add_user_form').getElementsByTagName('input');
	if (!input || !input[0].value) return;
	byId('btn_add_user').value = strings[5];
	GM_xmlhttpRequest({															// get the user id
		method: 'GET',
		url: url_query+input[0].value,
		headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Accept': 'text/html' },
		onload: function(e){
			if (e.readyState == 4 && e.status != 200) return;
			var doc = iframe.contentDocument;
			doc.body.innerHTML = e.responseText;
			var a = doc.getElementById('content').getElementsByClassName('dotted');
			if (!a.length){ byId('btn_add_user').value = strings[6]; alert(strings[4]); }
			else {
				var i=0;
				while (1){
					if (a[i].textContent == input[0].value){
						var id = a[i].href.substring(53);
						GM_xmlhttpRequest({														// get the profile
							method: 'GET',
							url: url_profile+id,
							headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Accept': 'text/html' },
							onload: function(e){
								var doc, a, temp;
								if (e.readyState == 4 && e.status != 200) return;
								doc = iframe.contentDocument;
								doc.body.innerHTML = e.responseText;
								input[1].value = id;
								input[2].value = Number(doc.getElementsByClassName('wellnessvalue tooltip')[0].textContent);		// well
								temp = doc.getElementsByClassName('xppoints')[0].textContent;							// exp
								input[3].value = temp.split('/')[0];
								input[4].value = doc.getElementsByClassName('xplevel tooltip')[0].textContent;			// lvl
								a = doc.getElementsByClassName('goright special');
								input[6].value = a[0].textContent;														// fights
								temp = a[1].textContent;
								input[7].value = Number(temp.split('/')[0]);											// total damage
								a = doc.getElementsByClassName('special');												// skills
								input[8].value = Number(a[2].textContent);
								input[9].value = Number(a[3].textContent);
								input[10].value = Number(a[4].textContent);
								input[5].value = Number(a[5].textContent);												// strenght
								a = doc.getElementsByClassName('entity largepadded')[0];
								GM_log(a);
								if (a){
									id = a.getElementsByTagName('a')[0].href;
									if (id.indexOf('/company/')==-1){
										input[11].value = '';
										input[15].value = 0;
									} else {
										input[11].value = a.getElementsByTagName('img')[0].alt;
										id = id.split('-');
										input[15].value = id[id.length-1];
									}
								}
								a = doc.getElementById('profile_stat').getElementsByTagName('a');
								input[12].value = a[1].textContent;														// get the player region
								input[13].value = a[2].textContent;														// get the player country
								input[14].value = doc.getElementById('clock').getElementsByTagName('strong')[0].textContent;
								byId('add_user_form').submit();
							}
						});
						break;
					}
					i++;
					if (i == a.length){ byId('btn_add_user').value = strings[6]; alert(strings[4]); break; }
				}
			}
		}
	});
}

function AddCompany(){
	var input = byId('add_company_form').getElementsByTagName('input');
	var id = input[0].value;
	
	if (!id) return;
	byId('btn_add_company').value = strings[5];
	if (id.length>10){
		id = id.split('-');
		id = id[id.length-1];
	}
	GM_xmlhttpRequest({
		method: 'GET',
		url: url_company+id,
		headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Accept': 'text/html' },
		onload: function(e){
			if (e.readyState == 4 && e.status != 200) return;
			var doc = iframe.contentDocument;
			doc.body.innerHTML = e.responseText;
			if (!doc.getElementsByClassName('special').length){
				byId('btn_add_company').value = strings[6];
				alert(strings[7]); 
			} else {
				input[1].value = id;
				input[2].value = doc.getElementsByTagName('h1')[0].textContent;
				byId('add_company_form').submit();
			}
		}
	});
}

function GetDay(){
	day = byId('clock').getElementsByTagName('strong')[0].textContent;
	if (GM_getValue('day_navarch', 0)>=day) return 0;
	GM_setValue('newday', 1);
	GM_setValue('day_navarch', day);
	return 1;
}

function ClickMe(handle){
	var e = d.createEvent('MouseEvents');
	e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	return handle.dispatchEvent(e);
}


