// ==UserScript==
// @name           vegzetkviz
// @namespace      vegzetur
// @include        http://*.doomlord.net/index.php?m=vadaszat*
// @include        http://*.vegzetur.hu/index.php?m=vadaszat*
// @include        http://*.vegzetur.hu/index.php?m=kalandok*
// ==/UserScript==

// --- nehany konfiguracios beallitas --- ///

var config = {
	auto_hunt: false,			// Vadászat automata folytatasa
	autohunt_wait: 10,			// Vadászat folytatása előtti max várakozás (perc)
	auto_submit: true,			// Kész gomb kattintás
	auto_random: true,			// hianyzo valasznal random valaszolas
	autorandom_idle_time: 40	// ido (mp) a random valaszolas elott autorandom eseten
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
				setTimeout(submit_form,1000);
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

function mload(data){
	xml = new DOMParser().parseFromString(data.responseText.substring(0, data.responseText.indexOf('</html>')+7), "text/xml");
	var answers = xml.getElementsByTagName('span');
	if (answers.length>0){
		valaszok = '';
		for (i=0; i<answers.length; i++){
			for (j=0; j<radios.length; j++){
				if (radios[j].parentNode.childNodes[1].textContent.substring(1)==answers[i].textContent) {
					settings.talalat = true;
					radios[j].click();
					ans('<span style="color: lightgreen">'+answers[i].textContent+'</span>');
					status('Válasz bejelölve.');
					if (config.auto_submit) {
						setTimeout(submit_form,1000);
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
	} 
	autorandom();
}

function starthunt(){
	id('vadaszatform').submit();
}

function besCsekk(){
	modneed = false;
	data = eval(GM_getValue(vilag+'.data'));
	bes1s = id('besorolas_1');
	if (bes1s && bes1s.selectedIndex !=-1 && data.bes1 != bes1s[bes1s.selectedIndex].value) {
		data.bes1 = bes1s[bes1s.selectedIndex].value;
		modneed = true;
	}
	bes2s = id('besorolas_2');
	if (bes2s && bes2s.selectedIndex !=-1 && data.bes2 != bes2s[bes2s.selectedIndex].value) {
		data.bes2 = bes2s[bes2s.selectedIndex].value;
		modneed = true;
	}
	bes3s = id('besorolas_3');
	if (bes3s && bes3s.selectedIndex !=-1 && data.bes3 != bes3s[bes3s.selectedIndex].value) {
		data.bes3 = bes3s[bes3s.selectedIndex].value;
		modneed = true;
	}
	if (modneed) GM_setValue(vilag+'.data', data.toSource());
}

doomlord_msg = {
	nothunting: 'You are not hunting now',
	correct: 'The answer is correct',
	hunting: 'You are going to hunt'
};

vegzetur_msg = {
	nothunting: 'Jelenleg nem vadászol',
	correct: 'A válasz helyes',
	hunting: 'Vadászaton vagy'
};

settings = {
	version: "4.11",
	server_url: "http://vk001.freeiz.com/",
	talalat: false
};

doomlord = strpos('doomlord',window.location.href);
msg = doomlord ? doomlord_msg : vegzetur_msg;
olimpia = strpos('olimpia', window.location.href);
username = id('welcome').getElementsByTagName('strong')[0].innerHTML;
vilag = strcut('//','.',window.location.href) + (doomlord ? '.doomlord' : '.vegzetur');
scriptbox = document.createElement('div');
scriptbox.setAttribute('class', 'message_center');
scriptbox.setAttribute('style', 'margin: 5px;');
if (olimpia) {scriptbox.setAttribute('style', 'display: none');}
scriptbox.innerHTML = '<p>Kérdés: <span id="question_span">nincs</span></p><p id="answer_p"></p><p>Állapot: <span id="status_span">Tétlen. (v'+settings.version+')</span></p>';
eval(GM_getValue('vegzetkviz','kviz_init = true;'));
jobbcontent = getByClass('div','jobb_content')[getByClass('div','jobb_content').length-1];
vadaszdiv = getFirstByClass('div','vadaszat');
jobbcontent.insertBefore(scriptbox, vadaszdiv);

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
		if (!olimpia && doomlord) {
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
		gmpost(settings.server_url, '&upload=1&kerdes='+csomag.kerdes+'&jovalasz='+jovalasz+'&opt1='+csomag.opt1+'&opt2='+csomag.opt2+'&opt3='+csomag.opt3+'&opt4='+csomag.opt4+'&invalid='+invalid+'&talalat='+talalat+'&bes1='+csomag.bes1+'&bes2='+csomag.bes2+'&bes3='+csomag.bes3, function(data){eval(data.responseText);});
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
if (getByClass('div','kerdes').length>0 && radios.length==4) {

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
		opt1: radios[0].parentNode.childNodes[1].textContent.substring(1),
		opt2: radios[1].parentNode.childNodes[1].textContent.substring(1),
		opt3: radios[2].parentNode.childNodes[1].textContent.substring(1),
		opt4: radios[3].parentNode.childNodes[1].textContent.substring(1)
	};
	GM_setValue(vilag+'.data', data.toSource());
	for (i=0; i<radios.length; i++){
		radios[i].addEventListener('click',function(){
			data = eval(GM_getValue(vilag+'.data'));
			config.auto_random = false;
			data.vanvalasz = true;
			data.talalat = settings.talalat;
			data.valasz = this.parentNode.childNodes[1].textContent.substring(1);
			GM_setValue(vilag+'.data', data.toSource());
			settings.talalat = false;
		}, true);
	}	

	setInterval(besCsekk, 200);		
	if (getFirstByClass('div','text_first')) {
		getFirstByClass('div','text_first').setAttribute('style','display: none');
	}
	status('Keresés az adatbázisban...');
	gmpost(settings.server_url,'&kerdes='+kerdes+'&opt1='+data.opt1+'&opt2='+data.opt2+'&opt3='+data.opt3+'&opt4='+data.opt4, mload);
} else {
	if (getByName('select','vadaszat_num').length>0)  {
		getByName('select','vadaszat_num')[0].value = getByName('select','vadaszat_num')[0].length;
		wait = Math.round(Math.random()*config.autohunt_wait*60)*1000;
		if (config.auto_hunt) {
			setTimeout(starthunt, wait);
		}
	} else {
		setTimeout("window.location.reload(true)", 10*60*1000);
	}
}


// end