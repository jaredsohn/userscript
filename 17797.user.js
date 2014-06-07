// ==UserScript==
// @name            OGame (v 0.78a) Left Menu Links with DragoSim 
// @namespace       http://www.skullcrusher.org
// @description     en : Put links to left menu and reads scan reports from OGame into DragoSim. Work with v 0.78a <br> <br>tr : Sol menuye linkler koyar ve savas raporlarini DragoSim ile simule eder. 
// @author          Skullcrusher
// @include         http://*ogame*/game/*
// ==/UserScript==
var SID = document.URL.match(/session=([0-9a-zA-Z]+)/); 
SID = SID ? SID[1] : ''; 
//------------------------------------------------------------------------------------
if (document.URL.indexOf("ogame.org") > -1) { // server main link.
var cur_language = 'english'; // for dragosim lang
var cur_msg = 'Messages'; // for Messages link txt
var cur_cmsg = 'Circular Message'; // for Circular Message link txt
var cur_mlist = 'Member List'; // for Member List link txt
var crlangtxt = 'CR Converter'; // for CR Converter link txt
var crlanglink = 'http://www.stogame.net/Cr4Forum/index.php?lang=en'; // for CR Converter link
var dragosimtxt = '- Simulate fight with DragoSim 2 -' // for DragoSim txt in reports
var raksimlink = 'http://raksim.owiki.de/english/Raksim_e.html' // for raksim link
}
//------------------------------------------------------------------------------------
if (document.URL.indexOf("ogame.com.tr") > -1) {
var cur_language = 'turkish';
var cur_msg = 'Haberler';
var cur_cmsg = 'Sirk&#252;ler Mesaj';
var cur_mlist = '&#220;ye listesi';
var crlangtxt = 'SR Renklendirici';
var crlanglink = 'http://www.stogame.net/Cr4Forum/index.php?lang=tr';
var dragosimtxt = '- Sava&#351;&#305; DragoSim 2 ile simule et -'
var raksimlink = 'http://raksim.owiki.de/turkish/Raksim_tr.html'
}
//------------------------------------------------------------------------------------
if (document.URL.indexOf("game/index.php") > -1)
{
	var as = document.getElementsByTagName('a');
	for (var i = 0; i < as.length; i ++)
	{
		var cur_a = as[i];
		if (cur_a.href.indexOf('/game/index.php?page=messages&') > -1 && cur_a.parentNode.tagName == 'FONT' &&
			cur_a.parentNode.parentNode.tagName == 'DIV' && cur_a.parentNode.parentNode.parentNode.tagName == 'TD')
		/*if ((cur_a.href.indexOf('http://impressum.gameforge.de/') > -1 || cur_a.href.indexOf('http://ogame.com.tw/portal/') > -1) && cur_a.parentNode.tagName == 'FONT' &&
			cur_a.parentNode.parentNode.tagName == 'DIV' && cur_a.parentNode.parentNode.parentNode.tagName == 'TD')*/
		{
			var msg_tr = cur_a.parentNode.parentNode.parentNode.parentNode;
			var menu_table = msg_tr.parentNode;

			var drago_tr = document.createElement('tr');
			var drago_td = document.createElement('td');
			drago_td.innerHTML = '<div align="center">'+'<hr>'+'<a href="/game/index.php?page=messages&dsp=1&session='+SID+'">'+cur_msg+'</a>'+'<br>'
			+'<a href="/game/index.php?page=allianzen&session='+SID+'&a=17">'+cur_cmsg+'</a>'+'<br>'
			+'<a href="/game/index.php?page=allianzen&session='+SID+'&a=4&sort1=5&sort2=0">'+cur_mlist+'</a>'+'<br>'+'<hr>'
			+'<a target="_blank" href="'+raksimlink+'">RakSiM</a>'+'<br>'
			+'<a target="_blank" href="http://drago-sim.com/?lang=' + cur_language + '&referrer=drago-script">DragoSim 2</a>'+'<br>'
			+'<a target="_blank" href="'+crlanglink+'">'+crlangtxt+'</a>'+'<br>'
			+'<hr>'+'</div>';
			
			drago_tr.appendChild(drago_td);
			//menu_table.appendChild(drago_tr);
			menu_table.insertBefore(drago_tr, msg_tr);

			break;
		}
	}
}

if (document.URL.indexOf("page=buildings") > -1 && document.body.innerHTML.indexOf('gid=111') > -1)
{
	function setCookie(name, value) {
		document.cookie = name + "=" + escape(value) + '; expires=Sunday, 17-Jan-2038 00:00:00 GMT';
	}
	function saveTech(gid, curnode)
	{
		var curtech = curnode.innerHTML;
		curtech = curtech.substring(curtech.indexOf('('));
		curtech = curtech.substring(curtech.indexOf(' ') + 1);
		curtech = curtech.substring(0, curtech.indexOf(')'));
		if (!curtech)
			curtech = 0;
		setCookie('techs[' + gid + ']', curtech);
	}

	var as = document.getElementsByTagName('a');
	for (var i = 0; i < as.length; i ++)
	{
		var cur_a = as[i];
		if (cur_a.href.indexOf('gid=') > -1 && cur_a.innerHTML.indexOf('img') == -1)
		{
			var gid = cur_a.href;
			gid = gid.substring(gid.indexOf('gid=') + 4);
			if (gid.indexOf('&') > -1)
				gid = gid.substring(0, gid.indexOf('&'));
			saveTech(gid, cur_a.parentNode);
		}
	}
}

if (document.URL.indexOf("page=messages") > -1)
{
	function getCookie(name) {
		var dc = document.cookie;
		var prefix = name + "=";
		var begin = dc.indexOf("; " + prefix);
		if (begin == -1) {
			begin = dc.indexOf(prefix);
			if (begin != 0)
				return null;
		} else
			begin += 2;
		var end = document.cookie.indexOf(";", begin);
		if (end == -1)
			end = dc.length;
		return unescape(dc.substring(begin + prefix.length, end));
	}

	var trs = document.getElementsByTagName('tr');
	var techs = '&techs[0][0][w_t]=' + getCookie('techs[109]') + '&techs[0][0][s_t]=' + getCookie('techs[110]') + '&techs[0][0][r_p]=' + getCookie('techs[111]');
	for (var i = 0; i < trs.length; i ++)
	{
		if (trs[i].className != 'header' && trs[i].innerHTML.indexOf('espionagereport') > -1)
		{
			var scanfield = trs[i].nextSibling;
			if (!window.opera)
				scanfield = scanfield.nextSibling;
			var a1 = scanfield.innerHTML.replace(/<div(.*?)\/div>/g, '');
			var a2 = a1.match(/<(.*?)>/g);
			for (var j = 0; j < a2.length; j++) { a1 = a1.replace(a2[j], ''); }
			a1 = a1.replace(/\./g, '');
			code = '<br /><br /><a target="_blank" href="http://drago-sim.com/?lang=' + cur_language + '&referrer=drago-script&scan=' + a1.replace(/\n/g, '') + techs + '"><span style="color: red; font-size: 16;"><b>'+dragosimtxt+'</b></span></a></center>';
			scanfield.innerHTML = scanfield.innerHTML.replace(/<\/center>/i, code);
		}
	}

	/*var spans = document.getElementsByTagName('span');
	var techs = '&techs[0][0][w_t]=' + getCookie('techs[109]') + '&techs[0][0][s_t]=' + getCookie('techs[110]') + '&techs[0][0][r_p]=' + getCookie('techs[111]');
	for (var i = 0; i < spans.length; i ++)
	{
		if (spans[i].className == 'espionagereport')
		{
			var scanfield = spans[i].parentNode.parentNode.nextSibling;
			if (!window.opera)
				scanfield = scanfield.nextSibling;
			var a1 = scanfield.innerHTML.replace(/<div(.*?)\/div>/g, '');
			var a2 = a1.match(/<(.*?)>/g);
			for (var j = 0; j < a2.length; j++) { a1 = a1.replace(a2[j], ''); }
			a1 = a1.replace(/\./g, '');
			code = '<br /><br /><a target="_blank" href="http://drago-sim.com/?lang=' + cur_language + '&referrer=drago-script&scan=' + a1.replace(/\n/g, '') + techs + '"><span style="color: red;"><b>DragoSim 2</b></span></a></center>';
			scanfield.innerHTML = scanfield.innerHTML.replace(/<\/center>/i, code);
		}
	}*/
}