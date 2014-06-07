// ==UserScript==
// @name Erep : Sktipta za mentorje v slovenski univerzi!
// @namespace http://userscripts.org/scripts/show/
// @description Erep : Doda korisne stvari za mentore
// @date 2010-03-14
// @creator Matevzs1
// @include http://www.erepublik.com/en
// @include http://www.erepublik.com/en/citizen/profile/*
// @include http://www.erepublik.com/en/search/?q=*
// @include http://www.erepublik.com/en/messages/*
// ==/UserScript==
	
	var url_profile= 'http://www.erepublik.com/en/citizen/profile/';
	var url_compose= 'http://www.erepublik.com/en/messages/compose/';
	var url_rgn= 'http://www.erepublik.com/en/region/';
	var url_wars= 'http://www.erepublik.com/en/wars/';
	var url_main= 'http://www.erepublik.com/en';
	var url_graph= 'http://chart.apis.google.com/chart?cht=ls&chs=25x15';
	var icon_msg= 'http://img163.imageshack.us/img163/4032/messagew.png';
	var icon_del= 'http://img214.imageshack.us/img214/4116/buttonw.jpg';
	var icon_skill= new Array('http://img97.imageshack.us/img97/4928/manuw.png', 'http://img231.imageshack.us/img231/333/land.png', 'http://img685.imageshack.us/img685/8024/cons.png');
	var icon_str= 'http://img193.imageshack.us/img193/8167/strn.png';
	var icon_up= 'http://img685.imageshack.us/img685/3349/uparrowe.png';
	var icon_down= 'http://img685.imageshack.us/img685/3349/uparrowe.png';
	var icon_hospital= 'http://img695.imageshack.us/img695/322/hospital.png';
	var url_update= 'http://userscripts.org/scripts/show/63642';
	var url_script= 'http://userscripts.org/scripts/source/63642.user.js';
	var url_not_yel= 'http://img18.imageshack.us/img18/4224/exyelloww.png';
	var url_not_red= 'http://img513.imageshack.us/img513/7523/exred.png';
	var url_battle= 'http://img38.imageshack.us/img38/7049/fistz.png';
		
	var style= (<r><![CDATA[
		.padlr4{padding:0px 4px 0px 4px;}
		.padlr2{padding:0px 2px 0px 2px;}
		.pad1{padding:0px 0px 1px 1px;}
		.padl1{padding:1px 1px 0px 2px;}
		.padl2{padding:1px 0px 0px 2px;}
		.qlink{padding-left:5px;font-size:10px;}
		.pl_name{font-weight:600;padding-right:3px;}
		.battle{background-color:#eeeeee;border:1px solid #eeeeee;padding-right:3px;float:right;}
		.battle:hover{border-color:#edfaff;}
		.pm_icon{padding-right:3px;float:right;}
		.pm_rem{padding-right:3px;float:right;}
		.well{padding:0px 2px 0px 2px;color:white;font:800 12px;background-color:#43b7ed;}
		.wellr{padding:0px 2px 0px 2px;color:black;font:800 12px;background-color:#ec0e0e;}
		.exp{padding:0px 2px 0px 2px;color:white;font:800 12px;background-color:#93cf32;}
		.mwstyle{padding:4px 0px 5px 1px;background-color:#eafaff;margin-top:3px;border:solid 1px #d0faff;}
		.mwstyle:hover{border-color:#edfaff;}
		.mwtitle{text-align:center;background-color:#ceeeee;font:500 12px sans-serif;border:1px solid #daeeee;}
		.mwtitle:hover{border-color:#edfaff;}
		.notify{padding:2px 0px 0px 3px;}
		.graph{padding-right:5px;float:right;}
		.storage{margin:4px 0px 4px 0px;padding:4px 2px 4px 4px;background-color:#e9f5fa;}
		.storage_title{background-color:#e9f5fa;padding:4px 5px 4px 5px;font:800 12px sans-serif;color:#3c8fc3;margin-left:20px; width:60px;}
		.btns{background-color:#7ec3db;border:1px solid #7ec3db;margin-right:3px;margin-top:3px;color:white;font:10px sans-serif;padding-left:1px;padding-right:1px;}
		.btns:hover{border-color:white;}
		.inpt{background-color:white;border:1px solid #b5d6e1;margin-left:26px;overflow:auto;width:629px;}
		.slide2l{margin-left:2px;}
		.frame{padding-bottom:4px;margin-top:100px;};
	]]></r>).toString();
	
	var user, day=0, iframe, intID, version='1.4', version_data='1.3', indexG;
	var strings, lang; const lang_max=2;
	var d=document, byId=d.getElementById, create=d.createElement, byClass=d.getElementsByClassName, byTag=d.getElementsByTagName;
	
	strings0= new Array('Mentors', 'Message the player', 'PM', 'Refresh', 'Remove this player from MW',
		'Displays wellness levels for the past five days', 'Displays experience changes for the past five days', 'Remove from MW', 'Add to list', 'WS',
		'Day:Well diff ', 'Day:Exp diff ', 'Day:Str diff ', 'Day:Skill diff ', 'STR',
		'H', 'script update', 'Click to get the update', 'The player has lost ', ' wellness in past few days',
		'W', 'This player is not developing', 'E', 'Battle available', 'B',
		"'s profile", 'Message storage', 'Do not write here', 'Clear', 'Save',
		'Load', 'en', 'slo', 'Change language', 'Updating...');
		
	strings1= new Array('Mentorji', 'Pošlji PM', 'PM', 'Osveži', 'Izbriši tega igralca',
		'Prikazuje informacije za zadnje dni!a', 'Prikazuje napredek za zadnjih nekaj dni!', 'Izbriši iz seznama', 'Dodaj v mentorstvo', 'seznam',
		'Dan:Well razlika ', 'Dan:Exp razlika ', 'Dan:Vojaška moč razlika ', 'Dan:Skill razlika ', 'STR',
		'H', 'update skripte', 'Klikni za update skripte', 'Igralec je izgubil ', ' zdravja v nekaj zadnjih neh',
		'W', 'Ta igralec se ne razvija', 'E', 'Odprte bitke', 'B',
		" - profil", 'Sporočila', 'Ne piši tukaj (Absentee:p)', 'Izbriši', 'Spremeni',
		'Naloži', 'en', 'slo', 'Spremeni jezik', 'Upadajtanje...');
	
// 
(function(){
	lang= GM_getValue('lang_mw', 0);
	strings= (lang) ? strings1 : strings0;
	
	if (byId('toplineholder')) return;
	else if (d.URL.indexOf('compose')!=-1 || d.URL.indexOf('read/in')!=-1) Composer();
	else if (byId('citizen_name')) return;		// must be!!!
	else if (d.URL.indexOf('profile')!=-1) CreateButton();
	else if (d.URL.indexOf('search')!=-1) Query();
	VersionCheck();
	BuildFrame();
})()

// 
function BuildFrame(){
	var div= byId('promo');
	if (!div){ setTimeout(BuildFrame, 200); return; }
	
	GM_addStyle(style);
	var mw_wnd= byId('mw_wnd');
	if (mw_wnd) div.removeChild(mw_wnd);
	mw_wnd= create('div');
	mw_wnd.id= 'mw_wnd';
	
	if (byId('cw_wnd')) div.insertBefore(mw_wnd, byId('cw_wnd').nextSibling);
	else if (div.firstChild) div.insertBefore(mw_wnd, div.firstChild);
	else div.appendChild(mw_wnd);

	var index= GM_getValue('index_mw', 0);
	if (index=='' || index==0) return;
	
	div= create('div');
	div.className= 'mwtitle';
	var a= create('a');				// mw title
	a.textContent= strings[0];
	a.id= 'mw_title_id';
	a.href= '#';
	a.title= strings[3];
	a.addEventListener('click', function (e){ Refresh(this); e.preventDefault(); }, false);
	div.appendChild(a);
	var a= create('a');
	a.className= 'slide2l';
	a.textContent= (lang) ? strings[31] : strings[32];
	a.href= '#';
	a.title= strings[33];
	a.addEventListener('click', function (e){
		lang++;
		if (lang==lang_max){ lang=0; strings= strings0;} else strings= strings1;
		GM_setValue('lang_mw', lang);
		BuildFrame();
		e.preventDefault();
	}, false);
	div.appendChild(a);
	mw_wnd.appendChild(div);
	
	index= index.split(';');
	for (var i=0; i<index.length-1; i++) mw_wnd.appendChild(CreateEntry(index[i]));
	if (GM_getValue('battle_mw', 0)){
		div= create('div');
		var img= create('img');
		img.className= 'notify';
		img.title= strings[23];
		img.alt= strings[24];
		img.src= url_battle;
		a= create('a');
		a.className= 'battle';
		a.href= GM_getValue('battle_mw');
		a.appendChild(img);
		div.appendChild(a);
		mw_wnd.appendChild(div);
	}
	if (GM_getValue('update_mw', 0)){
		a= create('a');
		a.textContent= strings[16];
		a.href= url_script;
		a.title= strings[17];
		a.addEventListener('click', function (e){ GM_setValue('update_mw', 0); }, false);
		mw_wnd.appendChild(a);
	}
	
	if (GetDay()){		// check if it's a new day and refresh all players in the list if it is
		Refresh(byId('mw_title_id'));
		var updt= GM_getValue('update_t_mw', 0);
		if (updt>2){ updt=0; Update(); }
		else updt++;
		GM_setValue('update_t_mw', updt);
	}
	
	if (d.URL==url_main){
		var ctr= GM_getValue('counter_mw', 0);
		if (ctr>2) { ctr=0; Refresh(byId('mw_title_id')); }
		else ctr++;
		GM_setValue('counter_mw', 0);
	}
}

// create single entry
function CreateEntry(name_){
	var data= GM_getValue(name_).split(';');
	var div= create('div');
	div.className= 'mwstyle';
	
	var name= create('div');
	name.className= 'pad1';
	var a= create('a');			// player name and link to the profile
	a.className= 'pl_name';
	a.href= url_profile+data[0];
	a.title= name_+strings[25];
	a.textContent= (name_.length>12) ? name_.substring(0, 10)+'..' : name_;
	name.appendChild(a);
	
	a= create('a');				// delete link
	a.href= '#';
	a.title= strings[4];
	a.setAttribute('user', name_);
	a.addEventListener('click', RemoveUser, false);
	img= create('img');			// delete icon
	img.className= 'pm_rem';
	img.src= icon_del;
	img.alt= 'X';
	a.appendChild(img);
	name.appendChild(a);
	
	a= create('a');				// pm link
	a.href= url_compose+data[0];
	a.title= strings[1];
	var img= create('img');		// pm icon
	img.className= 'pm_icon';
	img.src= icon_msg;
	img.alt= strings[2];
	a.appendChild(img);
	name.appendChild(a);
	div.appendChild(name);
	
	var class_= (data[1]>40) ? 'well' : 'wellr';
	// wellness
	div.appendChild(InsertState(strings[10]+day+':'+(Math.round((data[1]-data[2])*10)/10)+' '+(day-1)+':'+(Math.round((data[2]-data[3])*10)/10)+' '+(day-2)+':'+(Math.round((data[3]-data[4])*10)/10)+' '+(day-3)+':'+(Math.round((data[4]-data[5])*10)/10),
		Math.round((data[2]-data[3])*10)/10, class_, data[1], url_graph+'&chds='+0.75*Math.min(data[1], data[2], data[3], data[4], data[5])+','+Math.max(data[1],
		data[2], data[3], data[4], data[5])+'&chd=t:'+data[5]+','+data[4]+','+data[3]+','+data[2]+','+data[1],	strings[5]));
	
	// experience
	div.appendChild(InsertState(strings[11]+day+':'+(data[6]-data[7])+' '+(day-1)+':'+(data[7]-data[8])+' '+(day-2)+':'+(data[8]-data[9])+' '+(day-3)+':'+(data[9]-data[10]),
		data[7]-data[8], 'exp', data[6], url_graph+'&chd=t:'+(data[9]-data[10])+','+(data[8]-data[9])+','+(data[7]-data[8])+','+(data[6]-data[7]), strings[6]));
	
	var elem= create('div');			// status bar
	// skill
	var skill= data[26];
	InsertIcon(elem, strings[13]+day+':'+(Math.round((data[21]-data[22])*100)/100)+' '+(day-1)+':'+(Math.round((data[22]-data[23])*100)/100)+' '+(day-2)+':'+(Math.round((data[23]-data[24])*100)/100)+' '+(day-3)+':'+(Math.round((data[24]-data[25])*100)/100), strings[9], icon_skill[skill], Math.round(data[21]*10)/10);
	
	// strength
	InsertIcon(elem, strings[12]+day+':'+(Math.round((data[16]-data[17])*100)/100)+' '+(day-1)+':'+(Math.round((data[17]-data[18])*100)/100)+' '+(day-2)+':'+(Math.round((data[18]-data[19])*100)/100)+' '+(day-3)+':'+(Math.round((data[19]-data[20])*100)/100), strings[14], icon_str, Math.round(data[16]*10)/10);
	
	// hospital
	InsertIcon(elem, data[28], strings[15], icon_hospital, data[27]);
	div.appendChild(elem);
	//id	well	exp		fights	str		skill	skill_type	hospital	region
	//0	 	1-5		6-10	11-15	16-20	21-25	26			27			28
	
	elem= create('div');
	InsertStatus(elem, data[2]-data[3], data[8]-data[7], data[29]);
	div.appendChild(elem);
	return div;
}

// 
function InsertIcon(elem, title, alt, src, value){
	var img= create('img');
	img.title= title;
	img.alt= alt;
	img.src= src;
	elem.appendChild(img);
	var span= create('span');
	span.className= 'padlr2';
	span.textContent= value;
	elem.appendChild(span);
}

// 
function InsertState(title, value, class_, status, src, title_g){
	var elem= create('div');			// 
	elem.className= 'padl1';
	elem.title= title;
	span= create('span');
	span.className= class_;
	span.textContent= status;
	elem.appendChild(span);
	if (value!=0){						// trend icon
		img= create('img');
		img.className= 'padl2';
		if (value>0){ img.src= icon_up; img.alt= '+'; }
		else { img.src= icon_down; img.alt= '-'; value= -value; }
		elem.appendChild(img);
	}
	span= create('span');
	span.className= 'padlr4';
	span.textContent= value;
	elem.appendChild(span);
	img= create('img');				// graph
	img.className= 'graph';
	img.src= src;
	img.title= title_g;
	elem.appendChild(img);
	return elem;
}

// 
function InsertStatus(elem, wll_d, exp_d){
	var img;
	if (wll_d>=4){						// food
		img= create('img');
		img.className= 'notify';
		img.title= strings[18]+(Math.round(wll_d*10)/10)+strings[19];
		img.alt= strings[20];
		img.src= url_not_yel;
		elem.appendChild(img);
	}
	if (!exp_d){						// experience
		img= create('img');
		img.className= 'notify';
		img.title= strings[21];
		img.alt= strings[22];
		img.src= url_not_red;
		elem.appendChild(img);
	}
}

// 
function Query(){
	var a= byId('content');
	if (!a) setTimeout(Query, 200);
	else {
		a= a.getElementsByClassName('dotted');
		if (a.length){
			var name= byId('miniprofile').getElementsByTagName('img')[0].alt;
			for (var i=0; i<a.length; i++){
				user= a[i].textContent;
				if (user==name) continue;
				var a_= create('a');
				a_.className= 'qlink';
				a_.href= a[i].href;
				a_.textContent= (GM_getValue(user, 0)) ? strings[7] : strings[8];
				a_.title= user;
				a_.addEventListener('click', StoreData, false);
				a[i].parentNode.appendChild(a_);
			}
		}
	}
}

// 
function StoreData(e){
	iframe= create('iframe');
	iframe.style.display= 'none';
	document.body.appendChild(iframe);
	var name= this.title;
	
	if (GM_getValue(name, 0)){
		this.textContent= strings[8];
		GM_deleteValue(name);
		GM_setValue('index_mw', GM_getValue('index_mw', 0).replace(name+';', ''));
		BuildFrame();
	} else {
		this.textContent= strings[7];
		var index= GM_getValue('index_mw', 0);
		if (index == '0' || index == 0) GM_setValue('index_mw', name+';'); else GM_setValue('index_mw', index+name+';');
		var id= this.href.substring(44);
		GM_xmlhttpRequest({
			method: 'GET',
			url: this.href,
			headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Accept': 'text/html' },
			onload: function(e){
				if (e.readyState == 4 && e.status != 200) return;
				var doc= iframe.contentDocument;
				doc.body.innerHTML= e.responseText;
				var wll= Number(doc.getElementsByClassName('wellnessvalue tooltip')[0].textContent);			// well
				var fgs= doc.getElementsByClassName('goright special')[0].textContent;							// fights
				var exp= doc.getElementsByClassName('xppoints')[0].textContent									// exp
				exp= exp.split('/')[0];
				var span= doc.getElementsByClassName('special');												// skills
				var skl= Number(span[2].textContent);
				var skill_type= 0;
				if (skl<Number(span[3].textContent)) { skl= Number(span[3].textContent); skill_type= 1; }
				if (skl<Number(span[4].textContent)) { skl= Number(span[4].textContent); skill_type= 2; }
				str= Number(span[5].textContent);																// str
				var ctr= doc.getElementById('profile_stat').getElementsByClassName('smalldotted');
				var rgn= ctr[1].title;							// get the player region
				ctr= ctr[0].textContent;						// get the player country
				GetHospital(url_rgn+rgn.replace(' ', '-'));
				
				wll += ';' + wll + ';' + wll + ';' + wll + ';' + wll;
				exp += ';' + (exp-1) + ';' + (exp-2) + ';' + (exp-3) + ';' + (exp-4);
				fgs += ';' + fgs + ';' + fgs + ';' + fgs + ';' + fgs;
				str += ';' + str + ';' + str + ';' + str + ';' + str;
				skl += ';' + skl + ';' + skl + ';' + skl + ';' + skl;
				GM_setValue(name, id + ';' + wll + ';' + exp + ';' + fgs + ';' + str + ';' + skl + ';' + skill_type + ';' + GM_getValue('hospital', 0) + ';' + rgn + ';' + ctr);
				BuildFrame();
			}
		});
	}
	e.preventDefault();
}

// 
function Composer(){
	var content= byId('content');
	if (!content) setTimeout(Composer, 200);
	else {
		var div= create('div');
		div.className= 'frame';
		var span= create('span');
		div.appendChild(span);
		span.className= 'storage_title';
		span.textContent= strings[26];
		content.appendChild(div);
		for (var i=0; i<3; i++) content.appendChild(Storage(i));
	}
}

// 
function Storage(i){
	var div= create('div');
	div.className= 'storage';
	var inpt= create('textarea');
	inpt.title= strings[27];
	inpt.className= 'inpt';
	inpt.id= 'inpt'+i;
	inpt.rows= 2;
	inpt.setAttribute('readonly', 'readonly');
	var store= create('a');
	store.setAttribute('style', 'margin-left:30px;');
	store.id= 'store'+i;
	store.className= 'btns';
	store.href= '#';
	store.setAttribute('row', i);
	store.addEventListener('click', ComposeHandler, false);
	var clear= create('a');
	clear.className= 'btns';
	clear.textContent= strings[28];
	clear.href= '#';
	clear.setAttribute('row', i);
	clear.addEventListener('click', ComposeHandler, false);
	
	var data= GM_getValue('store'+i, 0);
	if (!data) store.textContent= strings[29];
	else {
		inpt.value= data;
		store.textContent= strings[30];
	}
	div.appendChild(inpt);
	div.appendChild(create('br'));
	div.appendChild(store);
	div.appendChild(clear);
	return div;
}

// 
function ComposeHandler(e){
	var i= this.getAttribute('row');
	switch (this.textContent){
		case 'Save':
			var data= byId('message_subject').value+'/-/'+byId('message_body').value;
			GM_setValue('store'+i, data);
			byId('inpt'+i).value= data;
			this.textContent= 'Load';
			break;
		case 'Load':
			var data= GM_getValue('store'+i).split('/-/');
			byId('message_subject').value= data[0];
			byId('message_body').value= data[1];
			break;
		case 'Clear':
			GM_setValue('store'+i, 0);
			byId('inpt'+i).value= '';
			byId('store'+i).textContent= 'Save';
			break;
	}
	e.preventDefault();
}

// 
function RemoveUser(e){
	var user_= this.getAttribute('user');
	GM_deleteValue(user_);
	GM_setValue('index_mw', GM_getValue('index_mw', 0).replace(user_+';', ''));
	BuildFrame();
	e.preventDefault();
}

// reload users data
function Refresh(a){
	a.textContent= strings[34];
	a.setAttribute('style', 'text-decoration:blink;');
	iframe= create('iframe');
	iframe.style.display= 'none';
	d.body.appendChild(iframe);
	
	indexG= GM_getValue('index_mw', 0);
	if (indexG=='0' || indexG==0) return;
	indexG= indexG.split(';');
	var ctr= GM_getValue(indexG[0]).split(';');
	GM_setValue('battle_mw', 1)
	GetWars(1, ctr[29]);
	e.preventDefault();
}

// 
function GetWars(i, ctr){
	GM_xmlhttpRequest({
		method: 'GET',
		url: url_wars+i,
		headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Accept': 'text/html' },
		onload: function(e){
			if (e.readyState == 4 && e.status != 200) return;
			var doc= iframe.contentDocument;
			doc.body.innerHTML= e.responseText;
			var a= doc.getElementsByClassName('warholder');
			var b, k, j=0;
			
			while (1){
				b= a[j].getElementsByClassName('middle');
				if (b[0].textContent.indexOf('no')!=-1){
					GM_setValue('battle_mw', 0);
					break;
				}
				
				b= a[j].getElementsByTagName('img');
				for (k=0; k<b.length; k++){
					if (b[k].title == ctr){
						b= a[j].getElementsByClassName('details');
						GM_setValue('battle_mw', b[0].href);
						GetData(indexG.length-2)
						return;
					}					
				}
				
				j++;
				if (j==a.length && GM_getValue('battle_mw')==1){
					GetWars(i+1, ctr);
					break;
				}
			}
		}
	});
}

// 
function GetData(i){
	var data= GM_getValue(indexG[i]);
	data= data.split(';');
	GM_xmlhttpRequest({
		method: 'GET',
		url: url_profile+data[0],
		headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Accept': 'text/html' },
		onload: function(e){
			if (e.readyState == 4 && e.status != 200) return;
			var doc= iframe.contentDocument;
			doc.body.innerHTML= e.responseText;
			var wll= Number(doc.getElementsByClassName('wellnessvalue tooltip')[0].textContent);			// well
			var fgs= doc.getElementsByClassName('goright special')[0].textContent;							// fights
			var exp= doc.getElementsByClassName('xppoints')[0].textContent									// exp
			exp= exp.split('/')[0];
			var span= doc.getElementsByClassName('special');												// skills
			var skl= Number(span[2].textContent);
			var skill_type= 0;
			if (skl<Number(span[3].textContent)) { skl= Number(span[3].textContent); skill_type= 1; }
			if (skl<Number(span[4].textContent)) { skl= Number(span[4].textContent); skill_type= 2; }
			var str= Number(span[5].textContent);															// str
			var ctr= doc.getElementById('profile_stat').getElementsByClassName('smalldotted');
			var rgn= ctr[1].title;			// get the player region
			ctr= ctr[0].textContent;		// get the player country
			GetHospital(url_rgn+rgn.replace(' ', '-'));
			
			if (GM_getValue('newday_mw', 0)) {
				// make calculations for the new day
				wll += ';' + data[1] + ';' + data[2] + ';' + data[3] + ';' + data[4];
				exp += ';' + data[6] + ';' + data[7] + ';' + data[8] + ';' + data[9];
				fgs += ';' + data[11] + ';' + data[12] + ';' + data[13] + ';' + data[14];
				str += ';' + data[16] + ';' + data[17] + ';' + data[18] + ';' + data[19];
				skl += ';' + data[21] + ';' + data[22] + ';' + data[23] + ';' + data[24];
			} else {
				// refresh the data for today only
				wll += ';' + data[2] + ';' + data[3] + ';' + data[4] + ';' + data[5];
				exp += ';' + data[7] + ';' + data[8] + ';' + data[9] + ';' + data[10];
				fgs += ';' + data[12] + ';' + data[13] + ';' + data[14] + ';' + data[15];
				str += ';' + data[17] + ';' + data[18] + ';' + data[19] + ';' + data[20];
				skl += ';' + data[22] + ';' + data[23] + ';' + data[24] + ';' + data[25];
			}
			GM_setValue(indexG[i], data[0] + ';' + wll + ';' + exp + ';' + fgs + ';' + str + ';' + skl + ';' + skill_type + ';' + GM_getValue('hospital', 0) + ';' + rgn + ';' + ctr);
			//				 	  0	 		  1-5		  6-10		  11-15	 16-20	 	 21-25		 26				 27
			i--;
			if (i>-1) GetData(i);
			else { GM_setValue('newday_mw', 0); BuildFrame(); }
		}
	});
}

// 
function GetHospital(url){
	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Accept': 'text/html' },
		onload: function(e){
			var doc, q;
			if (e.readyState==4 && e.status!=200) return;
			doc= iframe.contentDocument;
			doc.body.innerHTML= e.responseText;
			q= doc.getElementsByClassName('qllevel')[0].getAttribute('style');
			q= q.substring(7, q.indexOf('%'));
			GM_setValue('hospital', 'Q'+(q/20));
		}
	});
}

// create the add/remove button in the profile
function CreateButton(){
	// get the players name
	user= byId('profileavatar').getElementsByTagName('img')[0].getAttribute('alt');
	
	// skip if mentor is looking at his own profile
	if (user == byId('miniprofile').getElementsByTagName('a')[1].textContent) return;
	var li= create('li');
	var a= create('a');
	a.href= '#';
	a.textContent= (GM_getValue(user, 0)) ? strings[7] : strings[8];
	li.appendChild(a);
	byId('user_menu').appendChild(li);
	a.addEventListener('click', UserList, false);
}

// add/remove handler
function UserList(e){
	if (GM_getValue(user, 0)){
		this.textContent= strings[8];
		GM_deleteValue(user);
		GM_setValue('index_mw', GM_getValue('index_mw').replace(user+';', ''));
		BuildFrame();
	} else {
		this.textContent= strings[7];
		AddUser();
	}
	e.preventDefault();
}

// add a new user name to the index list
function AddUser(){
	var index= GM_getValue('index_mw', 0);
	if (index == '0' || index == 0) GM_setValue('index_mw', user+';'); else GM_setValue('index_mw', index+user+';');		// check if this is the first entry
	var id= d.URL.substring(44);														// user id
	var wll= Number(byClass('wellnessvalue tooltip')[0].textContent);					// well
	var fgs= byClass('goright special')[0].textContent;								// fights
	var exp= byClass('xppoints')[0].textContent;										// exp
	exp= exp.split('/')[0];
	var span= byClass('special');														// skills
	var skl= Number(span[2].textContent);
	var skill_type=0;
	if (skl<Number(span[3].textContent)){ skl= Number(span[3].textContent); skill_type=1; }
	if (skl<Number(span[4].textContent)){ skl= Number(span[4].textContent); skill_type=2; }
	var str= Number(span[5].textContent);												// strength
	
	var ctr= byId('profile_stat').getElementsByClassName('smalldotted');
	var rgn= ctr[1].title;		// get the player region
	ctr= ctr[0].textContent;
	GetHospital(url_rgn+rgn.replace(' ', '-'));
	
	wll += ';' + wll + ';' + wll + ';' + wll + ';' + wll;
	exp += ';' + (exp-1) + ';' + (exp-2) + ';' + (exp-3) + ';' + (exp-3);
	fgs += ';' + fgs + ';' + fgs + ';' + fgs + ';' + fgs;
	str += ';' + str + ';' + str + ';' + str + ';' + str;
	skl += ';' + skl + ';' + skl + ';' + skl + ';' + skl;
	GM_setValue(user, id + ';' + wll + ';' + exp + ';' + fgs + ';' + str + ';' + skl + ';' + skill_type + ';' + GM_getValue('hospital', 0) + ';' + rgn + ';' + ctr);
	BuildFrame();
}

// 
function GetDay(){
	day= byId('clock').getElementsByTagName('strong')[0].textContent;
	if (GM_getValue('day_mw', 0)==day) return 0;
	GM_setValue('newday_mw', 1);
	GM_setValue('day_mw', day);
	return 1;
}

// check for script version/data format
function VersionCheck(){
	if (GM_getValue('version', 0) == version_data) return;
	GM_setValue('version', version_data);
	var index= GM_getValue('index_mw', 0);
	if (!index) return;
	index= index.split(';');
	GM_deleteValue('index_mw', 0);
	for(var i=0; i<index.length; i++) GM_deleteValue(index[i], 0);
}

// 
function Update(){
	iframe= document.createElement('iframe');
	iframe.style.display= 'none';
	document.body.appendChild(iframe);
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: url_update,
		headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Accept': 'text/html' },
		onload: function(e){
			if (e.readyState == 4 && e.status != 200) return;
			var doc= iframe.contentDocument;
			doc.body.innerHTML= e.responseText;
			if (doc.getElementById('full_description').getElementsByTagName('span')[1].textContent!=version) GM_setValue('update_mw', 1); else GM_setValue('update_mw', 0);
		}
	});
}

// 
function ClickMe(handle){
	var e= d.createEvent('MouseEvents');
	e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	return handle.dispatchEvent(e);
}