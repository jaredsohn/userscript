// ==UserScript==
// @name           Erep : Public Defense
// @namespace      www.userscript.org/sripts/show
// @include        http://www.erepublik.com/en/battles/show/*
// @include        http://www.erepublik.com/en
// ==/UserScript==

	var command_url = 'http://spreadsheets.google.com/pub?key=tPNT5OzMnTyv_-OvzuNZTmA&single=true&gid=0&output=csv';
	var url_update = 'http://userscripts.org/scripts/show/66333';
	var url_script = 'http://userscripts.org/scripts/source/66333.user.js';
	
	var style = '.frame_class{background-color:rgb(233, 245, 250);font-family:"Calibri",Georgia,Serif;} .title_class{padding:4px 0px 4px 5px;font-size:13px;color:rgb(144, 188, 201);font-weight:900;} .ctext_class{margin-left:5px;margin-right:5px;padding:1px 3px 3px 3px;font-size:18px;background-color:rgb(255, 255, 255);border:1px solid rgb(181, 214, 225);font-size:17px;color:rgb(30, 30, 30);} .sig_class{padding:4px 0px 8px 10px;font-size:10px ! important;color:rgb(50, 50, 50);}  .sig_class_u{padding:4px 0px 0px 10px;font-size:10px ! important;color:rgb(50, 50, 50);} .update_class{text-align:right;margin-top:0px;margin-bottom:3px;padding:0px 3px 3px 0px;text-decoration:blink;}';
	
	var day=0, version = '1.00', strings = new Array('Civilne naredbe za dan: ', 'update skripte', 'Klikni za novu verziju skripte');
	var d=document, byId=d.getElementById, byClass=d.getElementsByClassName, byTag=d.getElementsByTagName, create=d.createElement;
	
(function (){
	if (byId('citizen_name')) return;
	else Command();
})()

function Command(){
	var div = byId('latestnews');
	if (!div){ setTimeout(Command, 200); return; }
	
	GM_addStyle(style);
	if (GetDay()) Update();
	
	var frame = create('div'); frame.className = 'frame_class';
	var title = create('div'); title.className = 'title_class';
	frame.appendChild(title);
	var c_frame = create('div');
	var command = create('div'); command.className = 'ctext_class';
	c_frame.appendChild(command);
	frame.appendChild(c_frame);
	var sig = create('div');
	frame.appendChild(sig);
	if (GM_getValue('update_pd', 0)){
		sig.className = 'sig_class_u';
		var update = create('p'); update.className = 'update_class';
		var a = create('a'); a.textContent = strings[1];
		a.href = url_script; a.title = strings[2];
		a.addEventListener('click', function(){ GM_setValue('update_pd', 0); }, false);
		update.appendChild(a);
		frame.appendChild(update);
	} else sig.className = 'sig_class';
	
	div.parentNode.insertBefore(frame, div);
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: command_url,
		headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Accept': 'text/html' },
		onload: function(e){
			if (e.readyState == 4 && e.status != 200) return;
			var data = (e.responseText).split('\n');
			command.textContent = data[0];
			a = create('a'); a.href = data[1]; a.textContent = data[1];
			GM_setValue('battle_url', data[1]);
			sig.appendChild(a);
			title.textContent = strings[0]+day;
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

function Update(){
	iframe = document.createElement('iframe');
	iframe.style.display = 'none';
	document.body.appendChild(iframe);
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: url_update,
		headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Accept': 'text/html' },
		onload: function(e){
			if (e.readyState == 4 && e.status != 200) return;
			var doc = iframe.contentDocument;
			doc.body.innerHTML = e.responseText;
			if (doc.getElementById('full_description').getElementsByTagName('span')[1].textContent != version) GM_setValue('update_pd', 1); else GM_setValue('update_pd', 0);
		}
	});
}

