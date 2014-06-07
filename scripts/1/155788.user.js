// ==UserScript==
// @name        imperionAllarmAttack
// @namespace   blogpagliaccio.wordpress.com
// @include     http://*.imperion.*/*
// @grant	GM_setValue
// @grant	GM_getValue
// @grant	GM_registerMenuCommand
// @version     1.1
// @require        http://userscripts.org/scripts/source/85398.user.js
// ==/UserScript==

try {
	lang=GM_getValue('lang');
	if (!lang) {lang='en';GM_setValue('lang','en');}
	var langMess={
		en:['you are attacked on this planet :','english','set timeout(ms)'],
		it:['sei attaccato in questi pianeti :','italiano','imposta timeout(ms)']
	};
	var ping=new Audio();
	ping.src = "http://dl.dropbox.com/u/57379789/sirena.ogg";
	ping.load();
	var msg=langMess[lang];
	var timeout=300000; // 5 minutes
	if (GM_getValue('timeout')) timeout=GM_getValue('timeout');
	console.log('timeout',timeout,'lang',lang);
	var pid=null;
	var V={};
	function got(name, value) {
		console.log('got global named', name, 'with value', value);
		if (name=='planet') {
			pid=value.options.id;
			console.log('pid value "',pid,'"');
		}
		V[name]=value;
	}
	read_content_global('planet', got);

	function allarm(planets) {
		//riprodurre suono
		sound(10);
		alert(msg[0]+planets);
	}
	function sound(sec) {
		ping.loop=true;
		ping.play();
		setTimeout(function(){ping.pause();},sec*1000);
	}
	function ctrlattack() {
		xmlhttp=new XMLHttpRequest();
		xmlhttp.open('post','/frontend/update/planetlist');
		xmlhttp.setRequestHeader ("Accept","application/json");
		xmlhttp.setRequestHeader ("Content-Type","application/x-www-form-urlencoded; charset=utf-8");
		xmlhttp.setRequestHeader ("X-Request","JSON");
		xmlhttp.setRequestHeader ("X-Requested-With","XMLHttpRequest");
		xmlhttp.setRequestHeader ("x-insight","activate");
		xmlhttp.onload=function(event) {
			data=eval(this.response);
			for (i=0;data[i].target!='Imperion.Interface.SelectPlanetList';i++);
			onattack=[];
			for (k in data[i].data.planets) {
				v=data[i].data.planets[k];
				if (v.attack) onattack.push(k);
			}
			if (onattack.length) allarm(onattack);
		}
		xmlhttp.send('planetId='+pid);
		setTimeout(ctrlattack,timeout);
	}
	//ctrlattack();
	//setInterval(ctrlattack,timeout);
	setTimeout(ctrlattack,timeout);

	GM_registerMenuCommand(msg[2],function(){timeout=prompt('timeout',timeout);GM_setValue('timeout',timeout);});
	GM_registerMenuCommand('test allarm',function(){allarm(['test']);});
	for (k in langMess)
		GM_registerMenuCommand(langMess[k][1],function(){GM_setValue('lang',k);});
}
catch(e) {
	alert(e);
}
