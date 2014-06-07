// ==UserScript==
// @name           vegzetkviz
// @namespace      vegzetur
// @include        http://*.doomlord.net/index.php?m=vadaszat*
// @include        http://*.vegzetur.hu/index.php?m=vadaszat*
// @include        http://*.vegzetur.hu/index.php?m=kalandok*
// @include        http://*.vladcaosudu.sk/index.php?m=vadaszat*
// @include        http://*.vegzetur.hu/index.php?m=kviz_olimpia*
// @include        http://*doomlord.ru/index.php?m=vadaszat*
// ==/UserScript==

// --- nehany konfiguracios beallitas --- ///

var config = {
	auto_hunt: false,			// VadĂĄszat automata folytatasa
	autohunt_wait: 5,			// VadĂĄszat folytatĂĄsa elĹtti max vĂĄrakozĂĄs (perc)
	auto_random: false,			// hianyzo valasznal random valaszolas
	auto_classify: true,		// automata besorolas
	auto_submit: true,			// KĂŠsz gomb kattintĂĄs
	autorandom_idle_time: 10,	// ido (mp) a random valaszolas elott autorandom eseten
	formsubmit_mintime: 2,			// ido (mp) kuldes elott
	formsubmit_rnd: 3			// ido (mp) kuldes elott
};

// --- innen ne valtoztass rajta --- ///
 

function id(elem){
	return document.getElementById(elem);
}

function tag(tagname){
	return document.getElementsByTagName(tagname);
}
	
function getByClass(tag, classname){
	items = [];
	elems = document.getElementsByTagName(tag);
	for (i=0; i<elems.length; i++){
		if (elems[i].className==classname) {
			items.push(elems[i]);
		}
	}
	return items;
}

function getByName(tag, name){
	items = [];
	elems = document.getElementsByTagName(tag);
	for (i=0; i<elems.length; i++){
		if (elems[i].name==name) {
			items.push(elems[i]);
		}
	}
	return items;
}

function getFirstByClass(tag, classname){
	items = getByClass(tag, classname);
	return items[0];
}

function getFirstTextByClass(tag, classname){
	items = getByClass(tag, classname);
	return items[0].innerHTML;
}

function strpos(needle, hay){
	return hay.indexOf(needle)!=-1;
}

function strcut(from, to, str){
	start = str.indexOf(from);
	if (to=='') {
		end = str.length;
	} else {
		end = str.indexOf(to);
	}
	return str.substring(start+from.length, end);
}

function gmpost(url, data, callback){
	GM_xmlhttpRequest({
		method: 'POST',
		url: url,
		headers:{'Content-type':'application/x-www-form-urlencoded'},
		data: encodeURI('version='+settings.version+'&nev='+username+'&vilag='+vilag+data),
		onload: callback
	});
}

function submit_form(){	
	document.forms[0].submit();
}

function autorandom(){
	if (!config.auto_random) {
		status('<font color="red">Válaszolj a kérdésre!</font>');
		return;
	}
	status('<font color="red">Válaszolj a kérdésre. '+config.autorandom_idle_time+' másodperced van még.</font>');
	if (config.autorandom_idle_time == 0){
		if (radios.length>0) {
			radios[0].click();
			if (config.auto_submit) {
				setTimeout(submit_form,config.formsubmit_mintime*1000+Math.floor(Math.random()*config.formsubmit_rnd)*1000+1000);
			}
		}
	} else {
		setTimeout(autorandom, 1000);
	}
	config.autorandom_idle_time--;
}

function status(str){
	id('status_span').innerHTML = str;
}

function qwe(str){
	id('question_span').innerHTML = str;
}

function ans(str){
	id('answer_p').innerHTML = str;
}

function deselectOpts(){
	opts = document.getElementsByTagName('option');
	for (i=0; i<opts.length; i++){
		opts[i].selected = "";
	}
}

function clickopt(optval){
	opts = document.getElementsByTagName('option');
	var e = document.createEvent('Events');
	e.initEvent('change',true, true);
	for (i=0; i<opts.length; i++){
		if (opts[i].value==optval){
			opts[i].selected = "selected";
			opts[i].parentNode.dispatchEvent(e);
			return;
		}
	}   
}

function mload(data){
	GM_log(data.responseText);
	xml = new DOMParser().parseFromString(data.responseText, "text/xml");
	var answers = xml.getElementsByTagName('span');
	if (answers.length>0){
		valaszok = '';
		for (i=0; i<answers.length; i++){
			for (j=0; j<radios.length; j++){
				if (radios[j].parentNode.textContent.substring(1)==answers[i].textContent) {
					settings.talalat = true;
					radios[j].click();
					ans('<span style="color: lightgreen">'+answers[i].textContent+'</span>');
					status('Válasz bejelölve.');
					if (xml.getElementById('besorolasok')){		
						besorolasok = xml.getElementById('besorolasok').getElementsByTagName('p');					
						status('Válasz bejelölve. Besorolás:<br />');
						for (b=0; b<besorolasok.length; b++) {				
							p = document.createElement('a');
							p.setAttribute('style','color: rgb(0,'+(188-b*50)+',255); margin: 0px; padding: 0px; cursor: pointer');
							p.setAttribute('class',besorolasok[b].className);
							p.innerHTML = besorolasok[b].innerHTML;
							p.addEventListener('click',function(){
								this.style.backgroundColor = "blue";
								katok = this.className.split(' ');
								deselectOpts();
								for (c=0; c<3; c++){
									setTimeout(clickopt,c*200,katok[c]);
								}
								setTimeout(besCsekk, 800);						
								setTimeout(submit_form,config.formsubmit_mintime*1000+Math.floor(Math.random()*config.formsubmit_rnd)*1000+1000);
							},true);							
							id('status_span').appendChild(p);
							id('status_span').appendChild(document.createElement('br'));
						}
						if (config.auto_classify) {
							katok = besorolasok[0].className.split(' ');
							deselectOpts();
							for (c=0; c<3; c++){
								setTimeout(clickopt,c*200,katok[c]);
							}	
						} 
					}
					if (config.auto_submit) {
						setTimeout(submit_form,config.formsubmit_mintime*1000+Math.floor(Math.random()*config.formsubmit_rnd)*1000+1000);
					}
					return;
				}
			}
			valaszok += answers[i].textContent;
			if (i<answers.length-1) {
				valaszok += ', ';
			}
		}
		ans(valaszok);
	} else {
		GM_log(data.responseText);
	}
	autorandom();
}

function starthunt(){
	id('vadaszatform').submit();
}

function besCsekk(){
	data = eval(GM_getValue(vilag+'.data'));
	bes1s = id('besorolas_1');
	if (bes1s && bes1s.selectedIndex !=-1 && data.bes1 != bes1s[bes1s.selectedIndex].value) {
		data.bes1 = bes1s[bes1s.selectedIndex].value;
	}
	bes2s = id('besorolas_2');
	if (bes2s && bes2s.selectedIndex !=-1 && data.bes2 != bes2s[bes2s.selectedIndex].value) {
		data.bes2 = bes2s[bes2s.selectedIndex].value;
	}
	bes3s = id('besorolas_3');
	if (bes3s && bes3s.selectedIndex !=-1 && data.bes3 != bes3s[bes3s.selectedIndex].value) {
		data.bes3 = bes3s[bes3s.selectedIndex].value;
	}
	GM_setValue(vilag+'.data', data.toSource());
}

doomlord_msg = {
	nothunting: 'You are not hunting now',
	correct: 'The answer is correct',
	hunting: 'You are going to hunt'
};

vladcaosudu_msg = {
	nothunting: 'MomentĂĄlne nie si na love',
	correct: 'OdpoveÄ je sprĂĄvna',
	hunting: 'VyberieĹĄ sa na lov'
};

soviet_msg = {
	nothunting: 'ĐĄĐľĐšŃĐ°Ń ŃŃ Đ˝Đľ ĐžŃĐžŃĐ¸ŃŃŃŃ',
	correct: 'ĐŃĐ°Đ˛Đ¸ĐťŃĐ˝Đž!',
	hunting: 'Đ˘Ń Đ˝Đ° ĐžŃĐžŃĐľ'
};

vegzetur_msg = {
	nothunting: 'Jelenleg nem vadĂĄszol',
	correct: 'A vĂĄlasz helyes',
	hunting: 'VadĂĄszaton vagy'
};

settings = {
	version: "4.31",
	server_url: "http://vu.helenakozmetika.hu/index.php", 
	talalat: false
};

doomlord = strpos('doomlord',window.location.href);
vladcaosudu = strpos('vladcaosudu',window.location.href);
soviet = strpos('doomlord.ru',window.location.href);
msg = doomlord ? doomlord_msg : vegzetur_msg;
olimpia = strpos('olimpia', window.location.href);
username = id('welcome').getElementsByTagName('strong')[0].innerHTML;
vilag = strcut('//','.',window.location.href) + (doomlord ? '.doomlord' : '.vegzetur');
if (vladcaosudu) {
	msg = vladcaosudu_msg;
	vilag = vilag.replace('vegzetur','vladcaosudu');
}
if (soviet) {
	msg = soviet_msg;
	vilag = 'soviet';
}

scriptbox = document.createElement('div');
scriptbox.setAttribute('class', 'message_center');
scriptbox.setAttribute('style', 'margin: 5px;');
if (olimpia) {scriptbox.setAttribute('style', 'display: none');}
scriptbox.innerHTML = '<p>Kérdés: <span id="question_span">nincs</span></p><p id="answer_p"></p><p>Állapot: <span id="status_span">Tétlen. (v'+settings.version+')</span></p>';
eval(GM_getValue('vegzetkviz','kviz_init = true;'));
jobbcontent = getByClass('div','jobb_content')[getByClass('div','jobb_content').length-1];
jobbcontent.insertBefore(scriptbox, jobbcontent.childNodes[0]);

csomag = eval(GM_getValue(vilag+'.data',{vanvalasz: false}));
if (csomag.vanvalasz) {
	mehet = false;
	if (getByClass('div','success').length==1 && strpos(msg.correct,getFirstTextByClass('div','success'))) {
		jovalasz = csomag.valasz;
		invalid = 0;
		mehet = true;
	}
	if (getByClass('div','error').length==1 && strpos(':',getFirstTextByClass('div','error'))) {
		answer = strcut(':','',getFirstTextByClass('div','error'));
		if (!olimpia && (doomlord || vladcaosudu || soviet)) {
			answer = answer.substring(1, answer.length-1);
		} else {
			answer = answer.substring(1, answer.length);
		}
		jovalasz = answer;
		invalid = 1;
		mehet = true;
	}
	if (mehet) {
		talalat = csomag.talalat ? 1 : 0;
		gmpost(settings.server_url, '&upload=1&kerdes='+csomag.kerdes+'&jovalasz='+jovalasz+'&opt1='+csomag.opt1+'&opt2='+csomag.opt2+'&opt3='+csomag.opt3+'&opt4='+csomag.opt4+'&invalid='+invalid+'&talalat='+talalat+'&bes1='+csomag.bes1+'&bes2='+csomag.bes2+'&bes3='+csomag.bes3, function(data){eval(data.responseText)});
	}
}

GM_deleteValue(vilag+'.data');

if (strpos(msg.nothunting, jobbcontent.innerHTML)) {
	gmpost(settings.server_url, '&update=1' , function(data){
		resp = eval('('+data.responseText+')');
		if (resp.good != 1) {
			scriptbox.innerHTML = '<p>'+resp.msg+'</p>';
			scriptbox.innerHTML += '<p><a style="color: yellow" href="'+resp.link+'">'+resp.link+'</a></p>';
			eval(resp.fnc);
		}
	});
}

radios = getByName('input','kviz_valasz');
if (radios.length==4) {
	var kerdes = '';
	var st = document.createElement('script');
	st.setAttribute("type", "application/javascript");
	st.textContent = 'timer0_refresh=0; timer1_refresh=0; timer2_refresh=0; timer3_refresh=0; timer4_refresh=0; timer5_refresh=0; timer6_refresh=0;';
	document.body.appendChild(st);

	if (getByClass('div','kerdes').length==1){
		if (getFirstByClass('div','kerdes').getElementsByTagName('h4').length>0){
			kerdes = getFirstByClass('div','kerdes').getElementsByTagName('h4')[0].innerHTML;
		} else if (getFirstByClass('div','kerdes').getElementsByTagName('h3').length>0) {
			kerdes = getFirstByClass('div','kerdes').getElementsByTagName('h3')[0].innerHTML;
		}
	}
	if (getByClass('div','kerdes').length==2){
		if (getByClass('div','kerdes')[1].getElementsByTagName('h4').length>0){
			kerdes = getByClass('div','kerdes')[1].getElementsByTagName('h4')[0].innerHTML;
		} else if (getFirstByClass('div','kerdes').getElementsByTagName('h3').length>0) {
			kerdes = getByClass('div','kerdes')[1].getElementsByTagName('h3')[0].innerHTML;
		} else if (getByClass('div','h3_big_out').length>0){
			kerdes = getByClass('div','h3_big_out')[0].getElementsByTagName('h3')[0].innerHTML;
		}
	}
	kerdes = kerdes.substring(0, kerdes.length-1);
	qwe(kerdes);
	
	data = {
		vanvalasz: false,
		talalat: false,
		kerdes: kerdes,
		valasz: '',
		kat: '',
		bes1: '',
		bes2: '',
		bes3: '',
		opt1: radios[0].parentNode.textContent.substring(1),
		opt2: radios[1].parentNode.textContent.substring(1),
		opt3: radios[2].parentNode.textContent.substring(1),
		opt4: radios[3].parentNode.textContent.substring(1)
	};
	GM_setValue(vilag+'.data', data.toSource());
	for (i=0; i<radios.length; i++){
		radios[i].addEventListener('click',function(){
			data = eval(GM_getValue(vilag+'.data'));
			config.auto_random = false;
			data.vanvalasz = true;
			data.talalat = settings.talalat;
			data.valasz = this.parentNode.textContent.substring(1);
			GM_setValue(vilag+'.data', data.toSource());
			settings.talalat = false;
		}, true);
	}	

	if (getFirstByClass('a','gomblink2_form')){
		getFirstByClass('a','gomblink2_form').addEventListener('click',besCsekk,true);
	}
	if (getFirstByClass('div','text_first')) {
		getFirstByClass('div','text_first').setAttribute('style','display: none');
	}
	status('KeresĂŠs az adatbĂĄzisban...');
	gmpost(settings.server_url,'&kerdes='+kerdes+'&opt1='+data.opt1+'&opt2='+data.opt2+'&opt3='+data.opt3+'&opt4='+data.opt4, mload);
} else {
	if (getByName('select','vadaszat_num').length>0)  {
		getByName('select','vadaszat_num')[0].value = getByName('select','vadaszat_num')[0].length;
		wait = Math.round(Math.random()*config.autohunt_wait*60)*1000;
		if (config.auto_hunt) {
			setTimeout(starthunt, wait);
		}
	}
}

setTimeout("window.location.reload()", 7*60*1000);
// end