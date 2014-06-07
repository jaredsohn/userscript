// ==UserScript==
// @name            DragoSim-OGame-integration - Language: Turkish
// @description     Reads scan reports from OGame into DragoSim
// @author          MrMage
// @include         http://*ogame*/game/*
// ==/UserScript==

var cur_language = 'german';

if (document.URL.indexOf("ogame.com.tr") > -1)	cur_language = 'turkish';
else if (document.URL.indexOf("ogame.org") > -1) cur_language = 'english';
else if (document.URL.indexOf("ogame.com.es") > -1) cur_language = 'spanish';
else if (document.URL.indexOf("ogame.com.tw") > -1) cur_language = 'taiwanese';
else if (document.URL.indexOf("ogame.fr") > -1) cur_language = 'french';

if (document.URL.indexOf("game/index.php") > -1)
{
	var as = document.getElementsByTagName('a');
	for (var i = 0; i < as.length; i ++)
	{
		var cur_a = as[i];
		/*if (cur_a.href.indexOf('/game/index.php?page=messages&') > -1 && cur_a.parentNode.tagName == 'FONT' &&
			cur_a.parentNode.parentNode.tagName == 'DIV' && cur_a.parentNode.parentNode.parentNode.tagName == 'TD')*/
		if ((cur_a.href.indexOf('http://impressum.gameforge.de/') > -1 || cur_a.href.indexOf('http://ogame.com.tw/portal/') > -1) && cur_a.parentNode.tagName == 'FONT' &&
			cur_a.parentNode.parentNode.tagName == 'DIV' && cur_a.parentNode.parentNode.parentNode.tagName == 'TD')
		{
			var msg_tr = cur_a.parentNode.parentNode.parentNode.parentNode;
			var menu_table = msg_tr.parentNode;

			var drago_tr = document.createElement('tr');
			var drago_td = document.createElement('td');
			drago_td.innerHTML = '<div align="center"><font color="#FF0000"><a target="_blank" href="http://drago-sim.com/?lang=' + cur_language + '&referrer=drago-script" style="color: red">DragoSim 2</a></font></div>';
			drago_tr.appendChild(drago_td);
			menu_table.appendChild(drago_tr);
			//menu_table.insertBefore(drago_tr, msg_tr);

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
			code = '<br /><br /><a target="_blank" href="http://drago-sim.com/?lang=' + cur_language + '&referrer=drago-script&scan=' + a1.replace(/\n/g, '') + techs + '"><span style="color: red;"><b>DragoSim 2</b></span></a></center>';
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