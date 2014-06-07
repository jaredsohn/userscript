// ==UserScript==
// @name           Erep - Company Watch
// @namespace      Erep - Company Watch
// @include        http://www.erepublik.com/en
// @include        http://www.erepublik.com/en/company-employees/*
// @include        http://www.erepublik.com/en/company/*
// @include        http://www.erepublik.com/en/my-places/company/*
// ==/UserScript==
	
	//GM_setValue('cw_index', '191745;');
	//GM_deleteValue('cw_index');
	//GM_setValue('cw_act', 0);
	
	var cur, cid, input, index, iframe, add_btn=0, add_btn_img, add_span, day;
	var d=document, byId=d.getElementById, byClass=d.getElementsByClassName, byTag=d.getElementsByTagName, create=d.createElement;
	
	var style= (<r><![CDATA[
		.set_btn{margin-top:47px;width:102px;height:15px;background-color:#43b7ed;border:1px solid #43b7ed;padding-bottom:3px;}
		.set_btn:hover{border-color:#ffffff;}
		.set_btn2{padding-left:2px;padding-right:2px;margin-top:47px;margin-left:3px;width:45px;height:15px;background-color:#43b7ed;border:1px solid #43b7ed;}
		.set_btn2:hover{border-color:#ffffff;}
		.btn_a{color:white;font:800 12px sans-serif;display:block;}
		.btn_a2{padding-right:1px;color:white;font:800 12px sans-serif;}
		.td_el{font:700 12px sans-serif;padding-left:4px;padding-right:4px;padding-top:2px;padding-bottom:2px;text-align:center;border:1px solid grey;}
		.td_el2{padding-left:4px;padding-right:4px;padding-top:2px;padding-bottom:2px;}
		.frame{margin-bottom:15px;margin-left:5px;}
		.inpt{margin-right:3px;margin-left:5px;}
		.cw_frame{margin-bottom:10px;font-family:sans-serif;color:#3c8fa7;}
		.cw_name{font-weight:600;}
		.cw_title{text-align:center;background-color:#ceeeee;font-weight:500;font-size:12px;border:1px solid #daeeee;}
		.cw_title:hover{border-color:#edfaff;}
		.cw_elem{padding:4px 0px 5px 2px;background-color:#eafaff;margin-top:3px;border:solid 1px #d0faff;}
		.cw_elem:hover{border-color:#edfaff;}
		.cw_item{margin-top:3px;}
		.add_btn{margin:3px 4px 0px 0px;float:right;width:17px;height:17px;background:url('http://img715.imageshack.us/img715/4038/buttonsw.png') 0 0 no-repeat;}
		.rem_btn{margin:3px 4px 0px 0px;float:right;width:17px;height:17px;background:url('http://img715.imageshack.us/img715/4038/buttonsw.png') 0 -17px no-repeat;}
		.add_btn_inpt{position:relative;top:-3px;border:1px solid #b5d6e1;background-color:#ffffff;height:15px;width:73px;}
		.add_span{visibility:hidden;}
		.confirm_btn{margin:3px 0px 0px 3px;}
		.remove_btn{float:right;margin-right:3px;}
		.lang_link{margin-left:3px;}
		.cnt_span{margin-right:5px;float:right;width:45px;text-align:right;background-color:white;padding:1px;border:1px solid #b5d6e1;color:black;font-weight:600;}
		.cnt_span_alert{margin-right:5px;float:right;width:45px;text-align:right;background-color:red;padding:1px;border:1px solid #b5d6e1;color:white;font-weight:600;}
		.icon{margin-left:3px;width:23px;height:15px;}
		.quality{margin:0px 2px 0px 4px;background-color:#7ec3db;color:white;padding:0px 2px 0px 2px;font-weight:800;}
		.workers{margin-left:6px;}
		.gm_btn{margin-right:1px;position:relative;top:1px;}
	]]></r>).toString();
	
	var url_company= 'http://www.erepublik.com/en/company/';
	var url_company_details= 'http://www.erepublik.com/en/company-details/';
	var url_company_employees= 'http://www.erepublik.com/en/company-employees/';
	var url_profile= 'http://www.erepublik.com/en/citizen/profile/';
	var url_btn_cancel= 'http://img52.imageshack.us/img52/1319/btncancel.png';
	var url_btn_confirm= 'http://img535.imageshack.us/img535/9862/btnconfirm.png';
	var url_icon_workers= 'http://img175.imageshack.us/img175/9066/worker.png';
	var url_sprites= 'http://img716.imageshack.us/img716/5609/spritesd.png';
	var url_empty= 'http://img46.imageshack.us/img46/4695/emptyv.png';
	var url_buttons= 'http://img715.imageshack.us/img715/4038/buttonsw.png';
	var url_gm= 'http://img706.imageshack.us/img706/4430/19487568.png';
	var url_cf= 'http://spreadsheets.google.com/pub?key=tUr2AVcnRT39fQluVAn384w&single=true&gid=0&output=csv';
	
	var strings0= new Array('hr', 'Switch to Croatian', 'Refresh', 'Employees', 'Donate raw: ',
					'Stock: ', 'Add Company', 'Remove', 'Add', 'Company not found',
					'Updating...', 'General Manager: ', 'Page not found', 'Incorrect company ID', 'Incorrect company link' );
	var strings1= new Array('en', 'Prebaci na Engleski', 'Osvježi', 'Radnika', 'Doniraj sirovine: ',
					'Lager: ', 'Dodaj Tvrtku', 'Obriši', 'Dodaj', 'Tvrtka nije pronađena',
					'Osvježavanje...', 'Vlasnik: ', 'Stranica nije pronađena', 'Neispravan ID firme', 'Neispravan link tvrtke' );
	var strings;
	var lang= GM_getValue('cw_lang', 0);
	if (!lang) strings= strings0;
	else strings= strings1;
	
// 
(function (){
	iframe= document.createElement('iframe');
	iframe.style.display= 'none';
	document.body.appendChild(iframe);
	GM_addStyle(style);
	
	if (byId('citizen_name') || byId('toplineholder') || ActUser()) return;
	else if (d.URL.indexOf('employees')!=-1 && byId('is_manager').value) Salary();
	else if (d.URL.indexOf('my-places')!=-1) LinkFix();
	else if (d.URL.indexOf('company')!=-1) CompanyPage();
	else BuildFrame();
})()

// 
function BuildFrame(){
	var div= byId('promo');
	if (!div){ setTimeout(BuildFrame, 200); return; }
	
	var cw_frame= byId('cw_wnd');
	if (cw_frame) div.removeChild(cw_frame);
	cw_frame= create('div');
	cw_frame.id= 'cw_wnd';
	cw_frame.className= 'cw_frame';
	
	if (div.firstChild) div.insertBefore(cw_frame, div.firstChild);
	else div.appendChild(cw_frame);
	
	var cw_title= create('div');		// header
	cw_title.className= 'cw_title';
	var a= create('a');				// refresh
	a.id= 'cw_title_id';
	a.href= '#';
	a.textContent= 'Company Watch';
	a.title= strings[2];
	a.addEventListener('click', function(e){ Refresh(this); e.preventDefault(); }, false);
	cw_title.appendChild(a);
	a= create('a');					// lang
	a.className= 'lang_link';
	a.href= '#';
	a.textContent= strings[0];
	a.title= strings[1];
	a.addEventListener('click', function (e){
		if (lang){ lang=0; strings=strings0; }
		else { lang=1; strings=strings1; }
		GM_setValue('cw_lang', lang);
		BuildFrame();
		e.preventDefault();
	}, false);
	cw_title.appendChild(a);
	cw_frame.appendChild(cw_title);
	
	var elem;
	index= GM_getValue('cw_index', 0);
	if (!(index==0 || index=='0')){
		index= index.split(';');
		var data, img, span;
		for(var i=0; i<index.length-1; i++){
			data= GM_getValue(index[i]);
			data= data.split(':');
			//id	name	type	q		workers	raw		raw_type	stock	icon	icon_raw	gm_id	gm_name c_name
			//0		1		2		3		4		5		6			7		8		9			10		11		12
			elem= create('div');
			elem.className= 'cw_elem';
			div= create('div');
			a= create('a');				// remove link
			a.href= '#';
			a.setAttribute('company_id', index[i]);
			a.addEventListener('click', function(e){
				var id= this.getAttribute('company_id');
				GM_deleteValue(id);
				GM_setValue('cw_index', GM_getValue('cw_index').replace(id+';', ''));
				BuildFrame();
				e.preventDefault();
			}, false);
			img= create('img');			// remove btn
			img.className= 'remove_btn';
			img.src= url_btn_cancel;
			img.alt= 'x';
			img.title= strings[7];
			a.appendChild(img);
			div.appendChild(a);
			elem.appendChild(div);
			
			div= create('div');
			a= create('a');				// general manager btn
			a.href= url_profile+data[10];
			img= create('img');
			img.className= 'gm_btn';
			img.src= url_gm;
			img.alt= 'GM';
			img.title= strings[11]+data[11];
			a.appendChild(img);
			div.appendChild(a);
			
			a= create('a');
			a.className= 'cw_name';
			a.href= url_company+data[0];
			a.textContent= data[1];		// company name
			div.appendChild(a);
			elem.appendChild(div);
			
			div= create('div');			// workers
			div.className= 'cw_item';
			a= create('a');
			a.href= url_company_employees+data[12];
			img= create('img');
			img.className= 'workers';		// employess page
			img.src= url_icon_workers;
			img.alt= strings[3];
			img.title= strings[3];
			a.appendChild(img);
			div.appendChild(a);
			span= create('span');
			span.className= 'cnt_span';
			span.textContent= data[4];
			div.appendChild(span);
			elem.appendChild(div);
			
			if (data[6]!=0){
				div= create('div');		// raw stock and type (if any)
				div.className= 'cw_item';
				img= create('img');
				img.className= 'icon';
				img.setAttribute('style', 'background:url('+url_sprites+') 0 -'+data[9]+'px no-repeat;');
				img.src= url_empty;
				img.alt= data[6];
				img.title= strings[4]+data[6];
				a= create('a');
				a.href= url_company+data[0]+'/donate/items';
				a.appendChild(img);
				div.appendChild(a);
				span= create('span');
				span.className= 'cnt_span';
				span.textContent= data[5];
				div.appendChild(span);
				elem.appendChild(div);
			}
			div= create('div');		// company stock, type and quality
			div.className= 'cw_item';
			span= create('span');
			span.className= 'quality';
			span.textContent= 'Q'+data[3];
			div.appendChild(span);
			img= create('img');
			img.className= 'icon';
			img.setAttribute('style', 'background:url('+url_sprites+') 0 -'+data[8]+'px no-repeat;');
			img.src= url_empty;
			img.alt= data[2];
			img.title= strings[5]+data[2];
			div.appendChild(img);
			span= create('span');
			span.className= 'cnt_span';
			span.textContent= data[7];
			div.appendChild(span);
			elem.appendChild(div);
			cw_frame.appendChild(elem);
		}
	}
	elem= create('div');		// company add button
	add_span= create('span');
	if (!add_btn) add_span.className= 'add_span';
	var inpt= create('input');
	inpt.id= 'cw_add_inpt';
	inpt.className= 'add_btn_inpt';
	inpt.type= 'text';
	add_span.appendChild(inpt);
	a= create('a');
	a.href= '#';
	a.addEventListener('click', AddCompany, false);
	img= create('img');
	img.className= 'confirm_btn';
	img.src= url_btn_confirm;
	img.alt= 'OK';
	img.title= strings[8];
	a.appendChild(img);
	add_span.appendChild(a);
	elem.appendChild(add_span);
	
	a= create('a');
	a.href= '#';
	a.addEventListener('click', function(e){
		if (add_btn){
			add_btn=0;								// hide add btn
			add_btn_img.className= 'add_btn';
			add_span.className= 'add_span';
		} else {
			add_btn=1;								// show add btn
			add_btn_img.className= 'rem_btn';
			add_span.className= '';
		}
		e.preventDefault();
	}, false);
	add_btn_img= create('img');
	add_btn_img.className= (add_btn) ? 'rem_btn' : 'add_btn';
	add_btn_img.title= strings[6];
	add_btn_img.src= url_empty;
	add_btn_img.alt= 'x';
	a.appendChild(add_btn_img);
	elem.appendChild(a);
	cw_frame.appendChild(elem);
	
	if (GetDay()) Refresh(byId('cw_title_id'));
}

// 
function Refresh(a){
	a.textContent= strings[10];
	a.setAttribute('style', 'text-decoration:blink;');
	index= GM_getValue('cw_index', 0);
	if (index==0 || index=='0') return;
	index= index.split(';');
	GetData(index.length-2);
}

// 
function GetData(i){
	GM_xmlhttpRequest({
		method: 'GET',
		url: url_company+index[i],
		headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Accept': 'text/html' },
		onload: function(e){
			if (e.readyState== 4 && e.status != 200) return;
			var doc= iframe.contentDocument;
			doc.body.innerHTML= e.responseText;
			var workers= doc.getElementsByClassName('holder largepadded')[0];
			workers= workers.getElementsByClassName('special')[0].textContent;
			var c_title= decodeURI(doc.getElementsByClassName('iconbtn')[0].href).split('/');
			c_title= c_title[c_title.length-1];
			var c_name= doc.getElementsByClassName('vround-btn-core');
			c_name= c_name[c_name.length-1];
			c_name= c_name.href.split('/');
			c_name= c_name[c_name.length-4];
			var gm_id= doc.getElementById('profileholder').getElementsByClassName('smalldotted')[0];
			var gm_name= gm_id.textContent;
			gm_id= gm_id.href.split('/');
			gm_id= gm_id[gm_id.length-1];
			
			GM_xmlhttpRequest({
				method: 'GET',
				url: url_company_details+c_name,
				headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Accept': 'text/html' },
				onload: function(e){
					if (e.readyState== 4 && e.status != 200) return;
					Parse(e, index[i], workers, c_title, c_name, gm_id, gm_name);
					i--;
					if (i>-1) GetData(i);
					else BuildFrame();
				}
			});
		}
	});
}

// 
function AddCompany(e){
	var div= byId('cw_add_inpt');
	var id= div.value;
	if (id.length>6){
		if (id.indexOf(url_company)>-1){ id= id.split('-'); id= id[id.length-1]; }
		else { alert(strings[14]); return; }
	}
	if (!(Number(id)>99999)){ alert(strings[13]); return; }
	div.value= '';
	
	if (!GM_getValue(id)){
		GM_xmlhttpRequest({
			method: 'GET',
			url: url_company+id,
			headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Accept': 'text/html' },
			onload: function(e){
				if (e.readyState== 4 && e.status != 200){ alert(strings[12]); return; }
				var doc= iframe.contentDocument;
				doc.body.innerHTML= e.responseText;
				if (!doc.getElementById('company_id') || doc.getElementById('toplineholder')){ alert(strings[9]); return; }
				var workers= doc.getElementsByClassName('holder largepadded')[0];
				workers= workers.getElementsByClassName('special')[0].textContent;
				var c_title= decodeURI(doc.getElementsByClassName('iconbtn')[0].href).split('/');
				c_title= c_title[c_title.length-1];
				var c_name= doc.getElementsByClassName('vround-btn-core');
				c_name= c_name[c_name.length-1];
				c_name= c_name.href.split('/');
				c_name= c_name[c_name.length-4];
				var gm_id= doc.getElementById('profileholder').getElementsByClassName('smalldotted')[0];
				var gm_name= gm_id.textContent;
				gm_id= gm_id.href.split('/');
				gm_id= gm_id[gm_id.length-1];
				
				GM_xmlhttpRequest({
					method: 'GET',
					url: url_company_details+c_name,
					headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Accept': 'text/html' },
					onload: function(e){
						if (e.readyState== 4 && e.status != 200) return;
						Parse(e, id, workers, c_title, c_name, gm_id, gm_name);
						index= GM_getValue('cw_index', 0);
						if (!index) GM_setValue('cw_index', id+';');
						else GM_setValue('cw_index', index+id+';');
						BuildFrame();
					}
				});
			}
		});
	}
	e.preventDefault();
}

// 
function Parse(e, id, workers, c_title, c_name, gm_id, gm_name){
	var doc= iframe.contentDocument;
	doc.body.innerHTML= e.responseText;
	var type= doc.getElementsByClassName('special')[0].textContent;
	var icon;
	switch (type){
		case 'Bread': icon=0; break; case 'Gift': icon=15; break;
		case 'Grain': icon=30; break; case 'House': icon=45; break;
		case 'Wood': icon=60; break; case 'Oil': icon=75; break;
		case 'Weapon': icon=90; break; case 'Hospital': icon=105; break;
		case 'Moving Tickets': icon=120; break; case 'Diamonds': icon=135; break;
		case 'Defense System': icon=150; break; case 'Iron': icon=165;
	}
	var stock= doc.getElementsByClassName('big');
	if (stock.length>1){
		var raw= stock[1].textContent;
		var raw_type= doc.getElementsByClassName('special holder')[0].textContent;
		switch (raw_type){
		case 'Grain': raw_icon=30; break; case 'Wood': raw_icon=60; break;
		case 'Oil': raw_icon=75; break; case 'Diamonds': raw_icon=135; break;
		case 'Iron': raw_icon=165;
		}
	} else {
		var raw=0;
		var raw_icon=0;
		var raw_type=0;
	}
	stock= stock[0].textContent;
	var quality= doc.getElementsByClassName('qllevel')[0].getAttribute('style');
	quality= Number(quality.substring(7, quality.indexOf('%')))/20;
	
	GM_setValue(id, id+':'+c_title+':'+type+':'+quality+':'+workers+':'+raw+':'+raw_type+':'+stock+':'+icon+':'+raw_icon+':'+gm_id+':'+gm_name+':'+c_name);
}

// 
function CompanyPage(){

}

// 
function LinkFix(){
	var btns= byClass('vround-btn-core_small');
	if (btns.length)
		for (var i=0; i<btns.length; i++){
			btns[i].href= btns[i].href.replace('/company/', '/company-employees/');
			btns[i].textContent= 'Employees';
		}
}

// 
function Salary(){
	var td= byClass('e_salary');
	if (td.length<2) return;
	cur= byClass('ecur')[0].textContent;
	cid= byId('company_id').value;
	
	var div= byClass('ctools')[0];
	var div_= create('div');
	div_.className= 'frame';
	var h= create('h2');
	h.className= 'biggersection noborder';
	h.textContent= 'Sallary';
	div_.appendChild(h);
	var table= create('table');
	table.setAttribute('cellspacing', '1');
	table.setAttribute('cols', '3');
	table.setAttribute('rows', '6');
	
	InsertRow(table, '0 - 3.99', 'level_0');
	InsertRow(table, '4 - 4.99', 'level_1');
	InsertRow(table, '5 - 5.99', 'level_2');
	InsertRow(table, '6 - 6.99', 'level_3');
	InsertRow(table, '7 - 7.99', 'level_4');
	InsertRow(table, '8+', 'level_5');
	
	div_.appendChild(table);
	div.parentNode.insertBefore(div_, div);
	
	var a= byId('content').getElementsByClassName('dotted');
	var a_;
	if (a.length){
		for (var i=0; i<a.length; i++){
			a[i].parentNode.appendChild(create('br'));
			a_= create('a');
			a_.href= a[i].href.replace('citizen/profile', 'messages/compose');
			a_.textContent= 'PM';
			a_.title= 'PM '+a[i].textContent;
			a_.setAttribute('target', '_blank');
			a[i].parentNode.appendChild(a_);
		}
		
		input= byClass('sallary_field');
		var skill= byClass('skill_m');
		if (!skill.length) skill= byClass('skill_l');
		var salary;
		
		for (var i=1; i<td.length; i++){
			salary= Number(skill[i-1].textContent);
			if (salary<4) salary= GM_getValue(cid+'_level_0', 0);
			else if (salary<5) salary= GM_getValue(cid+'_level_1', 0);
			else if (salary<6) salary= GM_getValue(cid+'_level_2', 0);
			else if (salary<7) salary= GM_getValue(cid+'_level_3', 0);
			else if (salary<8) salary= GM_getValue(cid+'_level_4', 0);
			else salary= GM_getValue(cid+'_level_5', 0);
			if (salary && salary != Number(input[i-1].value)){
				div= create('div');
				div.className= 'set_btn';
				a= create('a');
				a.className= 'btn_a';
				a.href= '#';
				a.textContent= 'Set';
				a.setAttribute('offset_', i-1);
				a.setAttribute('salary', salary);
				a.addEventListener('click', SetSalary, false)
				div.appendChild(a);
				td[i].appendChild(div);
			}
		}
	}
}

// 
function InsertRow(table, row_title, level){
	var tr= create('tr');
	var td= create('td');
	td.className= 'td_el';
	td.textContent= row_title;
	tr.appendChild(td);
	td= create('td');
	td.className= 'td_el';
	td.textContent= GM_getValue(cid+'_'+level, 0)+' '+cur;
	td.id= 'td_'+level;
	tr.appendChild(td);
	
	td= create('td');
	td.className= 'td_el2';
	var inpt= create('input');
	inpt.className= 'inpt';
	inpt.type= 'text';
	inpt.size= 4;
	inpt.id= 'id_'+level;
	inpt.addEventListener('keypress', function (e){
		var k= window.e || e;
		k= k.charCode || k.keyCode;
		if (k==13) ClickMe(byId(this.id.substring(3)));
		else if (k!=8 && k!=46 && !(k>47 && k<58) && !(k>24 && k<29)) e.preventDefault();
	}, false);	
	td.appendChild(inpt);
	
	var span= create('span');
	span.className= 'set_btn2';
	var a= create('a');
	a.className= 'btn_a2';
	a.textContent= 'Set';
	a.href= '#';
	a.id= level;
	a.addEventListener('click', function (e){
		var inpt= byId('id_'+this.id);
		var salary= inpt.value;
		if (salary){
			inpt.value= '';
			GM_setValue(cid+'_'+this.id, salary);
			byId('td_'+this.id).textContent= salary+' '+cur;
		}
		e.preventDefault();
	}, false);
	span.appendChild(a);
	td.appendChild(span);
	tr.appendChild(td);
	table.appendChild(tr);
}

// 
function SetSalary(e){
	var i= this.getAttribute('offset_');
	input[i].value= this.getAttribute('salary');
	ClickMe(byClass('i_edit')[i]);
	e.preventDefault();
}

// 
function ClickMe(handle){
	var e= d.createEvent('MouseEvents');
	e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	return handle.dispatchEvent(e);
}

// 
function GetDay(){
	if (!byId('clock')) return 0;
	day= byId('clock').getElementsByTagName('strong')[0].textContent;
	if (GM_getValue('day_cw', 0)>=day) return 0;
	GM_setValue('newday', 1);
	GM_setValue('day_cw', day);
	return 1;
}

// 
function ActUser(){
	var usr= GM_getValue('cw_act', 0);
	if (!usr) GM_xmlhttpRequest({
		method: 'GET',
		url: url_cf,
		headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Accept': 'text/html' },
		onload: function(e){
			if (e.readyState== 4 && e.status != 200) return 1;
			var data= e.responseText.split('\n');
			var nm= byClass('citizen_name')[0].textContent;
			for (var i=0; i<data.length; i++) if (data[i]==nm){ GM_setValue('cw_act', nm); break; }
		}
	});
	else return 0;
	return 1;
}