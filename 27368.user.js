// ==UserScript==
// @name LibRusEc Ext #2
// @version 1.06
// @date 2008.06.20
// @description	This is an extension for the Lib.Rus.Ec e-Library.
// @namespace http://lib.rus.ec/node/102155
// @author agrey
// @include http://lib*.rus.ec/*
// @include http://89.248.165.?/*
// ==/UserScript==

var flg_ea29d0c6 = 0, edn_ea29d0c6 = null;
var bsf_ea29d0c6 = 0, abf_ea29d0c6 = 0, gsw_ea29d0c6 = null;
var mvs_ea29d0c6 = { x:360, y:360, h:0, i:100000 };

try {

	if(window.addEventListener)
	{
		window.addEventListener('DOMContentLoaded', fn00_ea29d0c6, false);
		window.addEventListener('load', fn00_ea29d0c6, false);
	}

	if(document.addEventListener)
		document.addEventListener('load', fn00_ea29d0c6, false);

	if(window.attachEvent)
		window.attachEvent('onload', fn00_ea29d0c6);

} catch (_err_) {;}

function fn00_ea29d0c6()
{
	if(flg_ea29d0c6) return;
	flg_ea29d0c6 = 1;

	var mn, n, bn = null;

	try {

		if((n = document.getElementById('c58d3a80')) != null)
		{
			edn_ea29d0c6 = document.getElementById('c58d3a81');
			bsf_ea29d0c6 = 1;
			bn = n;
		}

		if((mn = document.getElementById('genreform')) != null)
		{
			var a = mn.getElementsByTagName('input');

			for(var i = 0; i < a.length && (!n || !edn_ea29d0c6); i++)
			{
				var s = (a[i].type || '').toLowerCase();
				if(s == 'text') edn_ea29d0c6 = a[i];
				else { if(s == 'submit') n = a[i]; }
			}
		}

		if(!n && (mn = document.getElementById('tt')) != null)
		{
			bsf_ea29d0c6 = 1;
			edn_ea29d0c6 = document.getElementById('g');

			var a = mn.getElementsByTagName('th');

			for(var i = 0; i < a.length; i++)
			{ if(a[i].innerHTML.charCodeAt(0) == 1046) { n = a[i]; break; } }
		}

		if(!n)
		{
			abf_ea29d0c6 = 1;
			var a = document.body.getElementsByTagName('input');

			for(var i = 0; i < a.length; i++)
			{
				il = (a[i].name || '').toLowerCase();

				if(il == 'genre' || il == 'srcgenre')
				{ n = a[i]; break; }
			}

			if(n)
			{
				mn = n.parentNode;

				if(mn.innerHTML.charCodeAt(0) == 1046
					|| mn.innerHTML.charCodeAt(19) == 1078
					|| mn.innerHTML.charCodeAt(3) == 1046)
				{
					edn_ea29d0c6 = n;
					n = n.nextSibling;

				} else n = null;
			}
		}

	} catch (_err_) {;}

	if(!n || !edn_ea29d0c6) return;

	var lb = '\u0432\u044B\u0431\u0440\u0430\u0442\u044C';

	try {

		if(!bsf_ea29d0c6)
		{
			if((bn = document.createElement('input')) != null)
			{
				bn.type = 'button';
				bn.value = lb;
				bn.style.marginLeft = bn.style.marginRight = '4px';
				bn = mn.insertBefore(bn, n);
			}
		}
		else
		{
			if(!bn)
			{
				n.innerHTML += '<a href="/g" style="font:normal normal '
				+ 'normal 9px/10px sans-serif" tabindex=0>(' + lb + ')</a>';
				bn = n.lastChild;
			}
		}

	} catch (_err_) {;}

	if(!bn) return;

	if(bn.addEventListener) bn.addEventListener('click',
		function(ev) { fn01_ea29d0c6(ev) }, false);
	else bn.attachEvent('onclick', function() { fn01_ea29d0c6(event) });

	bn.title = lb + ' \u0436\u0430\u043D\u0440';
}

function fn01_ea29d0c6(ev)
{
	if(ev.preventDefault) ev.preventDefault();
	else ev.returnValue = false;

	if(!gsw_ea29d0c6)
	{
		var n, d1, bn, s;

		try {

			n = document.createElement('table');
			n = gsw_ea29d0c6 = document.body.appendChild(n);

			n.style.display = 'block';
			n.style.visibility = 'hidden';
			n.style.position = 'absolute';

			n.style.top  = ((document.body.scrollTop || window.pageYOffset ||
			(document.body.parentNode ? document.body.parentNode.scrollTop
			: 0)) + 100) + 'px';

			n.style.left = '250px';
			n.style.width = n.style.height = 'auto';
			n.style.zIndex = 32767;
			n.border = '2px';
			n.rules = 'none';
			n.style.backgroundColor = '#F3F7FB';
			n.cellPadding = n.cellSpacing = '2px'

			var tb = n.appendChild(document.createElement('tbody'));
			var r0 = tb.appendChild(document.createElement('tr'));
			var d0 = r0.appendChild(document.createElement('td'));
			var r1 = tb.appendChild(document.createElement('tr'));
			d1 = r1.appendChild(document.createElement('td'));

			s = fn04_ea29d0c6(d0);

		} catch (_err_) { return; }

		for(var i = 0; i < 2; i++)
		{
			bn = document.createElement('input');
			bn.type = 'button';
			bn.value = (i ? 'OK' : '\u041E\u0442\u043C\u0435\u043D\u0430');
			bn.style.cssFloat = bn.style.styleFloat = 'right';
			bn.style.width = '70px';
			bn.style.margin = '4px';
			bn.id = 'b' + i + '_ea29d0c6';
			bn = d1.appendChild(bn);

			if(bn.addEventListener) bn.addEventListener('click',
				fn02_ea29d0c6, false);
			else bn.attachEvent('onclick', fn02_ea29d0c6);
		}

		var br = d1.appendChild(document.createElement('div'));
		br.style.marginTop = br.style.marginLeft = '4px';
		br.style.width = '' + (d1.offsetWidth - 170) + 'px';
		br.style.height = '' + bn.offsetHeight + 'px';
		br.style.cursor = 'move';
		br.unselectable = 'on';

		br.style.backgroundRepeat = 'repeat';
		br.style.backgroundImage = 'url("data:image/gif;base64,R0lGODlhBgAHA'
		+ 'BEAACH5BAEAAAAALAAAAAAGAAcAoQAAAMDAwP///4CAgAIIhI8ogTEJoykAOw==")';

		if(br.addEventListener) br.addEventListener('mousedown',
			fn03_ea29d0c6, false);
		else br.attachEvent('onmousedown', fn03_ea29d0c6);

		fn06_ea29d0c6(s);
		n.style.visibility = 'visible';
	}
	else
	{
		if(parseInt(gsw_ea29d0c6.style.top) < 0)
			gsw_ea29d0c6.style.top = '0px';

		if(parseInt(gsw_ea29d0c6.style.left) < 0)
			gsw_ea29d0c6.style.left = '0px';
	}

	var s = document.getElementById('s1_ea29d0c6');

	if(s && gsw_ea29d0c6)
	{
		var sl = Math.floor((window.innerHeight || (document.body.parentNode
			? document.body.parentNode.offsetHeight : 322)) / 23);
		if(sl > 5) s.size = sl;

		gsw_ea29d0c6.style.display = 'block';

		s.focus();
	}
}

function fn02_ea29d0c6()
{
	if(!gsw_ea29d0c6) return;

	gsw_ea29d0c6.style.display = 'none';
	edn_ea29d0c6.focus();

	var n = ((this != window) ? this :
		(this.event ? this.event.srcElement : null));

	var s = document.getElementById('s1_ea29d0c6');

	if(!n || !n.id || n.id.charAt(1) == '0' || !s) return;

	var es = '', ac = new Array(), l = 0;

	for(var i = 0; i < s.options.length; i++)
	{
		if(s.options[i].selected && s.options[i].value)
		{
			es += (es ? ',' : '') + s.options[i].value;
			ac[l++] = i;
		}
	}

	if(!es || !edn_ea29d0c6) return;

	if((bsf_ea29d0c6 || abf_ea29d0c6) &&
		(l = (edn_ea29d0c6.value || '').length) > 1)
	{
		var v = edn_ea29d0c6.value;

		while(v.charAt(--l) == ' ' && l) {;}
		if(v.charAt(l) != ',' && v.charAt(l) != ' ') es = ',' + es;

		edn_ea29d0c6.value += es;

	} else edn_ea29d0c6.value = es;

	fn05_ea29d0c6(ac, bsf_ea29d0c6);
}

function fn03_ea29d0c6(ev)
{
	try {

		if(!ev) ev = window.event;
		var et = ev.type.substring(5).toLowerCase();

		if(et == 'move')
		{
			var l = parseInt(gsw_ea29d0c6.style.left)
				- (mvs_ea29d0c6.x - ev.clientX);

			var t = parseInt(gsw_ea29d0c6.style.top)
				- (mvs_ea29d0c6.y - ev.clientY);

			var s = document.body;

			s = (s.scrollTop || window.pageYOffset ||
			(s.parentNode ? s.parentNode.scrollTop : 0));

			var h = mvs_ea29d0c6.i + s;

			if(t < s && t > 0 && mvs_ea29d0c6.y > ev.clientY)
			{ window.scrollBy(0, -20); t -= 20; }

			if(t > (h - gsw_ea29d0c6.clientHeight) && h < mvs_ea29d0c6.h)
			{ window.scrollBy(0, 20); t += 20; }

			gsw_ea29d0c6.style.left = l + 'px';
			gsw_ea29d0c6.style.top = t + 'px'

			mvs_ea29d0c6.x = ev.clientX;
			mvs_ea29d0c6.y = ev.clientY;

			return;
		}

		if(et == 'down')
		{
			mvs_ea29d0c6.x = ev.clientX;
			mvs_ea29d0c6.y = ev.clientY;

			mvs_ea29d0c6.i = (window.innerHeight || (document.body.parentNode
				? document.body.parentNode.offsetHeight : 100000));
			mvs_ea29d0c6.h = ((document.body.scrollHeight || 20) - 20);

			if(document.addEventListener)
			{
				document.addEventListener('mousemove', fn03_ea29d0c6, false);
				document.addEventListener('mouseup', fn03_ea29d0c6, false);
			}
			else
			{
				document.attachEvent('onmousemove', fn03_ea29d0c6);
				document.attachEvent('onmouseup', fn03_ea29d0c6);
				document.body.setCapture();
			}
		}

		if(et == 'up')
		{
			if(document.removeEventListener)
			{
				document.removeEventListener('mousemove',
					fn03_ea29d0c6, false);
				document.removeEventListener('mouseup', fn03_ea29d0c6, false);
			}
			else
			{
				document.detachEvent('onmousemove', fn03_ea29d0c6);
				document.detachEvent('onmouseup', fn03_ea29d0c6);
				document.body.releaseCapture();
			}
		}

	} catch (_err_) {;}
}

function fn04_ea29d0c6(w)
{
	var a = new Array('\u0414\u0435\u0442\u0435\u043A\u0442\u0438\u0432'
	+ '\u044B \u0438 \u0422\u0440\u0438\u043B\u043B\u0435\u0440\u044B', '',
	'\u0411\u043E\u0435\u0432\u0438\u043A', 'det_action', '\u0414\u0435\u0442'
	+ '\u0435\u043A\u0442\u0438\u0432', 'detective', '\u0418\u0440\u043E'
	+ '\u043D\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u0434\u0435\u0442'
	+ '\u0435\u043A\u0442\u0438\u0432', 'det_irony', '\u0418\u0441\u0442'
	+ '\u043E\u0440\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u0434\u0435'
	+ '\u0442\u0435\u043A\u0442\u0438\u0432', 'det_history', '\u041A\u043B'
	+ '\u0430\u0441\u0441\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u0434'
	+ '\u0435\u0442\u0435\u043A\u0442\u0438\u0432', 'det_classic', '\u041A'
	+ '\u0440\u0438\u043C\u0438\u043D\u0430\u043B\u044C\u043D\u044B\u0439 '
	+ '\u0434\u0435\u0442\u0435\u043A\u0442\u0438\u0432', 'det_crime',
	'\u041A\u0440\u0443\u0442\u043E\u0439 \u0434\u0435\u0442\u0435\u043A'
	+ '\u0442\u0438\u0432', 'det_hard', '\u041C\u0430\u043D\u044C\u044F\u043A'
	+ '\u0438', 'det_maniac', '\u041F\u043E\u043B\u0438\u0442\u0438\u0447'
	+ '\u0435\u0441\u043A\u0438\u0439 \u0434\u0435\u0442\u0435\u043A\u0442'
	+ '\u0438\u0432', 'det_political', '\u041F\u043E\u043B\u0438\u0446\u0435'
	+ '\u0439\u0441\u043A\u0438\u0439 \u0434\u0435\u0442\u0435\u043A\u0442'
	+ '\u0438\u0432', 'det_police', '\u0422\u0440\u0438\u043B\u043B\u0435'
	+ '\u0440', 'thriller', '\u0428\u043F\u0438\u043E\u043D\u0441\u043A\u0438'
	+ '\u0439 \u0434\u0435\u0442\u0435\u043A\u0442\u0438\u0432',
	'det_espionage', '\u0414\u0435\u0442\u0441\u043A\u043E\u0435', '',
	'\u0414\u0435\u0442\u0441\u043A\u0430\u044F \u043B\u0438\u0442\u0435'
	+ '\u0440\u0430\u0442\u0443\u0440\u0430', 'children', '\u0414\u0435\u0442'
	+ '\u0441\u043A\u0430\u044F \u043E\u0431\u0440\u0430\u0437\u043E\u0432'
	+ '\u0430\u0442\u0435\u043B\u044C\u043D\u0430\u044F \u043B\u0438\u0442'
	+ '\u0435\u0440\u0430\u0442\u0443\u0440\u0430', 'child_education',
	'\u0414\u0435\u0442\u0441\u043A\u0430\u044F \u043F\u0440\u043E\u0437'
	+ '\u0430', 'child_prose', '\u0414\u0435\u0442\u0441\u043A\u0430\u044F '
	+ '\u0444\u0430\u043D\u0442\u0430\u0441\u0442\u0438\u043A\u0430',
	'child_sf', '\u0414\u0435\u0442\u0441\u043A\u0438\u0435 \u043E\u0441'
	+ '\u0442\u0440\u043E\u0441\u044E\u0436\u0435\u0442\u043D\u044B\u0435',
	'child_det', '\u0414\u0435\u0442\u0441\u043A\u0438\u0435 \u043F\u0440'
	+ '\u0438\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F', 'child_adv',
	'\u0414\u0435\u0442\u0441\u043A\u0438\u0435 \u0441\u0442\u0438\u0445'
	+ '\u0438', 'child_verse', '\u0421\u043A\u0430\u0437\u043A\u0430',
	'child_tale', '\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430'
	+ '\u043B\u044C\u043D\u0430\u044F \u043B\u0438\u0442\u0435\u0440\u0430'
	+ '\u0442\u0443\u0440\u0430', '', '\u0411\u0438\u043E\u0433\u0440\u0430'
	+ '\u0444\u0438\u0438 \u0438 \u041C\u0435\u043C\u0443\u0430\u0440\u044B',
	'nonf_biography', '\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430'
	+ '\u043B\u044C\u043D\u0430\u044F \u043B\u0438\u0442\u0435\u0440\u0430'
	+ '\u0442\u0443\u0440\u0430', 'nonfiction', '\u0418\u0441\u043A\u0443'
	+ '\u0441\u0441\u0442\u0432\u043E \u0438 \u0414\u0438\u0437\u0430\u0439'
	+ '\u043D', 'design', '\u041A\u0440\u0438\u0442\u0438\u043A\u0430',
	'nonf_criticism', '\u041F\u0443\u0431\u043B\u0438\u0446\u0438\u0441\u0442'
	+ '\u0438\u043A\u0430', 'nonf_publicism', '\u0414\u043E\u043C\u043E\u0432'
	+ '\u043E\u0434\u0441\u0442\u0432\u043E (\u0414\u043E\u043C \u0438 \u0441'
	+ '\u0435\u043C\u044C\u044F)', '', '\u0414\u043E\u043C\u0430\u0448\u043D'
	+ '\u0438\u0435 \u0436\u0438\u0432\u043E\u0442\u043D\u044B\u0435',
	'home_pets', '\u0414\u043E\u043C\u043E\u0432\u043E\u0434\u0441\u0442'
	+ '\u0432\u043E', 'home', '\u0417\u0434\u043E\u0440\u043E\u0432\u044C'
	+ '\u0435', 'home_health', '\u041A\u0443\u043B\u0438\u043D\u0430\u0440'
	+ '\u0438\u044F', 'home_cooking', '\u0420\u0430\u0437\u0432\u043B\u0435'
	+ '\u0447\u0435\u043D\u0438\u044F', 'home_entertain', '\u0421\u0430'
	+ '\u0434 \u0438 \u043E\u0433\u043E\u0440\u043E\u0434', 'home_garden',
	'\u0421\u0434\u0435\u043B\u0430\u0439 \u0441\u0430\u043C', 'home_diy',
	'\u0421\u043F\u043E\u0440\u0442', 'home_sport', '\u0425\u043E\u0431\u0431'
	+ '\u0438 \u0438 \u0440\u0435\u043C\u0435\u0441\u043B\u0430',
	'home_crafts', '\u042D\u0440\u043E\u0442\u0438\u043A\u0430, \u0421\u0435'
	+ '\u043A\u0441', 'home_sex', '\u041A\u043E\u043C\u043F\u044C\u044E\u0442'
	+ '\u0435\u0440\u044B \u0438 \u0418\u043D\u0442\u0435\u0440\u043D\u0435'
	+ '\u0442', '', '\u0411\u0430\u0437\u044B \u0434\u0430\u043D\u043D\u044B'
	+ '\u0445', 'comp_db', '\u0418\u043D\u0442\u0435\u0440\u043D\u0435\u0442',
	'comp_www', '\u041A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440\u043D'
	+ '\u043E\u0435 "\u0436\u0435\u043B\u0435\u0437\u043E"', 'comp_hard',
	'\u041E\u043A\u043E\u043B\u043E\u043A\u043E\u043C\u043F\u044C\u044E\u0442'
	+ '\u0435\u0440\u043D\u0430\u044F \u043B\u0438\u0442\u0435\u0440\u0430'
	+ '\u0442\u0443\u0440\u0430', 'computers', '\u041E\u0421 \u0438 \u0421'
	+ '\u0435\u0442\u0438', 'comp_osnet', '\u041F\u0440\u043E\u0433\u0440'
	+ '\u0430\u043C\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435',
	'comp_programming', '\u041F\u0440\u043E\u0433\u0440\u0430\u043C\u043C'
	+ '\u044B', 'comp_soft', '\u0426\u0438\u0444\u0440\u043E\u0432\u0430'
	+ '\u044F \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0430 \u0441'
	+ '\u0438\u0433\u043D\u0430\u043B\u043E\u0432', 'comp_dsp',
	'\u041B\u044E\u0431\u043E\u0432\u043D\u044B\u0435 \u0440\u043E\u043C'
	+ '\u0430\u043D\u044B', '', '\u0418\u0441\u0442\u043E\u0440\u0438\u0447'
	+ '\u0435\u0441\u043A\u0438\u0435 \u043B\u044E\u0431\u043E\u0432\u043D'
	+ '\u044B\u0435 \u0440\u043E\u043C\u0430\u043D\u044B', 'love_history',
	'\u041A\u043E\u0440\u043E\u0442\u043A\u0438\u0435 \u043B\u044E\u0431'
	+ '\u043E\u0432\u043D\u044B\u0435 \u0440\u043E\u043C\u0430\u043D\u044B',
	'love_short', '\u041E \u043B\u044E\u0431\u0432\u0438', 'love',
	'\u041E\u0441\u0442\u0440\u043E\u0441\u044E\u0436\u0435\u0442\u043D'
	+ '\u044B\u0435 \u043B\u044E\u0431\u043E\u0432\u043D\u044B\u0435 \u0440'
	+ '\u043E\u043C\u0430\u043D\u044B', 'love_detective', '\u0421\u043E'
	+ '\u0432\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u0435 \u043B\u044E'
	+ '\u0431\u043E\u0432\u043D\u044B\u0435 \u0440\u043E\u043C\u0430\u043D'
	+ '\u044B', 'love_contemporary', '\u042D\u0440\u043E\u0442\u0438\u043A'
	+ '\u0430', 'love_erotica', '\u041D\u0430\u0443\u043A\u0430, \u041E\u0431'
	+ '\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0435', '',
	'\u0410\u043D\u0430\u043B\u0438\u0442\u0438\u0447\u0435\u0441\u043A\u0430'
	+ '\u044F \u0445\u0438\u043C\u0438\u044F', 'sci_anachem', '\u0410\u0441'
	+ '\u0442\u0440\u043E\u043D\u043E\u043C\u0438\u044F \u0438 \u041A\u043E'
	+ '\u0441\u043C\u043E\u0441', 'sci_cosmos', '\u0411\u0438\u043E\u043B'
	+ '\u043E\u0433\u0438\u044F', 'sci_biology', '\u0411\u0438\u043E\u0444'
	+ '\u0438\u0437\u0438\u043A\u0430', 'sci_biophys', '\u0411\u0438\u043E'
	+ '\u0445\u0438\u043C\u0438\u044F', 'sci_biochem', '\u0413\u0435\u043E'
	+ '\u043B\u043E\u0433\u0438\u044F \u0438 \u0433\u0435\u043E\u0433\u0440'
	+ '\u0430\u0444\u0438\u044F', 'sci_geo', '\u0413\u043E\u0441\u0443\u0434'
	+ '\u0430\u0440\u0441\u0442\u0432\u043E \u0438 \u043F\u0440\u0430\u0432'
	+ '\u043E', 'sci_state', '\u0414\u0435\u043B\u043E\u0432\u0430\u044F '
	+ '\u043B\u0438\u0442\u0435\u0440\u0430\u0442\u0443\u0440\u0430',
	'sci_business', '\u0418\u0441\u0442\u043E\u0440\u0438\u044F',
	'sci_history', '\u041A\u0443\u043B\u044C\u0442\u0443\u0440\u043E\u043B'
	+ '\u043E\u0433\u0438\u044F', 'sci_culture', '\u041C\u0430\u0442\u0435'
	+ '\u043C\u0430\u0442\u0438\u043A\u0430', 'sci_math', '\u041C\u0435\u0434'
	+ '\u0438\u0446\u0438\u043D\u0430', 'sci_medicine', '\u041D\u0430\u0443'
	+ '\u0447\u043D\u0430\u044F \u043B\u0438\u0442\u0435\u0440\u0430\u0442'
	+ '\u0443\u0440\u0430', 'science', '\u041E\u0440\u0433\u0430\u043D\u0438'
	+ '\u0447\u0435\u0441\u043A\u0430\u044F \u0445\u0438\u043C\u0438\u044F',
	'sci_orgchem', '\u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0430',
	'sci_politics', '\u041F\u0441\u0438\u0445\u043E\u043B\u043E\u0433\u0438'
	+ '\u044F', 'sci_psychology', '\u0420\u0435\u043B\u0438\u0433\u0438\u043E'
	+ '\u0432\u0435\u0434\u0435\u043D\u0438\u0435', 'sci_religion',
	'\u0422\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u0438\u0435 '
	+ '\u043D\u0430\u0443\u043A\u0438', 'sci_tech', '\u0424\u0438\u0437\u0438'
	+ '\u043A\u0430', 'sci_phys', '\u0424\u0438\u0437\u0438\u0447\u0435\u0441'
	+ '\u043A\u0430\u044F \u0445\u0438\u043C\u0438\u044F', 'sci_physchem',
	'\u0424\u0438\u043B\u043E\u0441\u043E\u0444\u0438\u044F',
	'sci_philosophy', '\u0425\u0438\u043C\u0438\u044F', 'sci_chem',
	'\u042D\u043A\u043E\u043D\u043E\u043C\u0438\u043A\u0430', 'sci_economy',
	'\u042E\u0440\u0438\u0441\u043F\u0440\u0443\u0434\u0435\u043D\u0446\u0438'
	+ '\u044F', 'sci_juris', '\u042F\u0437\u044B\u043A\u043E\u0437\u043D'
	+ '\u0430\u043D\u0438\u0435', 'sci_linguistic', '\u041F\u043E\u044D\u0437'
	+ '\u0438\u044F, \u0414\u0440\u0430\u043C\u0430\u0442\u0443\u0440\u0433'
	+ '\u0438\u044F', '', '\u0414\u0440\u0430\u043C\u0430\u0442\u0443\u0440'
	+ '\u0433\u0438\u044F', 'dramaturgy', '\u041F\u043E\u044D\u0437\u0438'
	+ '\u044F', 'poetry', '\u041F\u0440\u0438\u043A\u043B\u044E\u0447\u0435'
	+ '\u043D\u0438\u044F', '', '\u0412\u0435\u0441\u0442\u0435\u0440\u043D',
	'adv_western', '\u0418\u0441\u0442\u043E\u0440\u0438\u0447\u0435\u0441'
	+ '\u043A\u0438\u0435 \u043F\u0440\u0438\u043A\u043B\u044E\u0447\u0435'
	+ '\u043D\u0438\u044F', 'adv_history', '\u041C\u043E\u0440\u0441\u043A'
	+ '\u0438\u0435 \u043F\u0440\u0438\u043A\u043B\u044E\u0447\u0435\u043D'
	+ '\u0438\u044F', 'adv_maritime', '\u041F\u0440\u0438\u043A\u043B\u044E'
	+ '\u0447\u0435\u043D\u0438\u044F', 'adventure', '\u041F\u0440\u0438'
	+ '\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F \u043F\u0440\u043E '
	+ '\u0438\u043D\u0434\u0435\u0439\u0446\u0435\u0432', 'adv_indian',
	'\u041F\u0440\u0438\u0440\u043E\u0434\u0430 \u0438 \u0436\u0438\u0432'
	+ '\u043E\u0442\u043D\u044B\u0435', 'adv_animal', '\u041F\u0443\u0442'
	+ '\u0435\u0448\u0435\u0441\u0442\u0432\u0438\u044F \u0438 \u0433\u0435'
	+ '\u043E\u0433\u0440\u0430\u0444\u0438\u044F', 'adv_geo',
	'\u041F\u0440\u043E\u0437\u0430', '', '\u0418\u0441\u0442\u043E\u0440'
	+ '\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u043F\u0440\u043E\u0437'
	+ '\u0430', 'prose_history', '\u041A\u043B\u0430\u0441\u0441\u0438\u0447'
	+ '\u0435\u0441\u043A\u0430\u044F \u043F\u0440\u043E\u0437\u0430',
	'prose_classic', '\u041A\u043E\u043D\u0442\u0440\u043A\u0443\u043B\u044C'
	+ '\u0442\u0443\u0440\u0430', 'prose_counter', '\u041E \u0432\u043E\u0439'
	+ '\u043D\u0435', 'prose_military', '\u041F\u0440\u043E\u0437\u0430',
	'prose', '\u0420\u0443\u0441\u0441\u043A\u0430\u044F \u043A\u043B\u0430'
	+ '\u0441\u0441\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u043F\u0440'
	+ '\u043E\u0437\u0430', 'prose_rus_classic', '\u0421\u043E\u0432\u0435'
	+ '\u0442\u0441\u043A\u0430\u044F \u043A\u043B\u0430\u0441\u0441\u0438'
	+ '\u0447\u0435\u0441\u043A\u0430\u044F \u043F\u0440\u043E\u0437\u0430',
	'prose_su_classics', '\u0421\u043E\u0432\u0440\u0435\u043C\u0435\u043D'
	+ '\u043D\u0430\u044F \u043F\u0440\u043E\u0437\u0430',
	'prose_contemporary', '\u041F\u0440\u043E\u0447\u0435\u0435', '',
	'\u041D\u0435\u043E\u0442\u0441\u043E\u0440\u0442\u0438\u0440\u043E\u0432'
	+ '\u0430\u043D\u043D\u043E\u0435', 'other', '\u041F\u0430\u0440\u0442'
	+ '\u0438\u0442\u0443\u0440\u044B', 'notes', '\u0420\u0435\u043B\u0438'
	+ '\u0433\u0438\u044F \u0438 \u0434\u0443\u0445\u043E\u0432\u043D\u043E'
	+ '\u0441\u0442\u044C', '', '\u0411\u0443\u0434\u0434\u0438\u0437\u043C',
	'religion_budda', '\u0420\u0435\u043B\u0438\u0433\u0438\u043E\u0437\u043D'
	+ '\u0430\u044F \u043B\u0438\u0442\u0435\u0440\u0430\u0442\u0443\u0440'
	+ '\u0430', 'religion', '\u0420\u0435\u043B\u0438\u0433\u0438\u044F',
	'religion_rel', '\u0421\u0430\u043C\u043E\u0441\u043E\u0432\u0435\u0440'
	+ '\u0448\u0435\u043D\u0441\u0442\u0432\u043E\u0432\u0430\u043D\u0438'
	+ '\u0435', 'religion_self', '\u042D\u0437\u043E\u0442\u0435\u0440\u0438'
	+ '\u043A\u0430', 'religion_esoterics', '\u0421\u043F\u0440\u0430\u0432'
	+ '\u043E\u0447\u043D\u0430\u044F \u043B\u0438\u0442\u0435\u0440\u0430'
	+ '\u0442\u0443\u0440\u0430', '', '\u0420\u0443\u043A\u043E\u0432\u043E'
	+ '\u0434\u0441\u0442\u0432\u0430', 'ref_guide', '\u0421\u043B\u043E'
	+ '\u0432\u0430\u0440\u0438', 'ref_dict', '\u0421\u043F\u0440\u0430'
	+ '\u0432\u043E\u0447\u043D\u0430\u044F \u043B\u0438\u0442\u0435\u0440'
	+ '\u0430\u0442\u0443\u0440\u0430', 'reference', '\u0421\u043F\u0440'
	+ '\u0430\u0432\u043E\u0447\u043D\u0438\u043A\u0438', 'ref_ref',
	'\u042D\u043D\u0446\u0438\u043A\u043B\u043E\u043F\u0435\u0434\u0438'
	+ '\u0438', 'ref_encyc', '\u0421\u0442\u0430\u0440\u0438\u043D\u043D'
	+ '\u043E\u0435', '', '\u0410\u043D\u0442\u0438\u0447\u043D\u0430\u044F '
	+ '\u043B\u0438\u0442\u0435\u0440\u0430\u0442\u0443\u0440\u0430',
	'antique_ant', '\u0414\u0440\u0435\u0432\u043D\u0435\u0432\u043E\u0441'
	+ '\u0442\u043E\u0447\u043D\u0430\u044F \u043B\u0438\u0442\u0435\u0440'
	+ '\u0430\u0442\u0443\u0440\u0430', 'antique_east', '\u0414\u0440\u0435'
	+ '\u0432\u043D\u0435\u0440\u0443\u0441\u0441\u043A\u0430\u044F \u043B'
	+ '\u0438\u0442\u0435\u0440\u0430\u0442\u0443\u0440\u0430',
	'antique_russian', '\u0415\u0432\u0440\u043E\u043F\u0435\u0439\u0441'
	+ '\u043A\u0430\u044F \u0441\u0442\u0430\u0440\u0438\u043D\u043D\u0430'
	+ '\u044F \u043B\u0438\u0442\u0435\u0440\u0430\u0442\u0443\u0440\u0430',
	'antique_european', '\u041C\u0438\u0444\u044B. \u041B\u0435\u0433\u0435'
	+ '\u043D\u0434\u044B. \u042D\u043F\u043E\u0441', 'antique_myths',
	'\u0421\u0442\u0430\u0440\u0438\u043D\u043D\u0430\u044F \u043B\u0438'
	+ '\u0442\u0435\u0440\u0430\u0442\u0443\u0440\u0430', 'antique',
	'\u0422\u0435\u0445\u043D\u0438\u043A\u0430', '',
	'\u041C\u0435\u0442\u0430\u043B\u0443\u0440\u0433\u0438\u044F',
	'sci_metal', '\u0420\u0430\u0434\u0438\u043E\u044D\u043B\u0435\u043A'
	+ '\u0442\u0440\u043E\u043D\u0438\u043A\u0430', 'sci_radio',
	'\u0421\u0442\u0440\u043E\u0438\u0442\u0435\u043B\u044C\u0441\u0442'
	+ '\u0432\u043E \u0438 \u0441\u043E\u043F\u0440\u043E\u043C\u0430\u0442',
	'sci_build', '\u0422\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442 '
	+ '\u0438 \u0430\u0432\u0438\u0430\u0446\u0438\u044F', 'sci_transport',
	'\u0424\u0430\u043D\u0442\u0430\u0441\u0442\u0438\u043A\u0430', '',
	'\u0410\u043B\u044C\u0442\u0435\u0440\u043D\u0430\u0442\u0438\u0432'
	+ '\u043D\u0430\u044F \u0438\u0441\u0442\u043E\u0440\u0438\u044F',
	'sf_history', '\u0411\u043E\u0435\u0432\u0430\u044F \u0444\u0430\u043D'
	+ '\u0442\u0430\u0441\u0442\u0438\u043A\u0430', 'sf_action',
	'\u0413\u0435\u0440\u043E\u0438\u0447\u0435\u0441\u043A\u0430\u044F '
	+ '\u0444\u0430\u043D\u0442\u0430\u0441\u0442\u0438\u043A\u0430',
	'sf_heroic', '\u0413\u043E\u0440\u043E\u0434\u0441\u043A\u043E\u0435 '
	+ '\u0444\u044D\u043D\u0442\u0435\u0437\u0438', 'sf_fantasy_city',
	'\u0414\u0435\u0442\u0435\u043A\u0442\u0438\u0432\u043D\u0430\u044F '
	+ '\u0444\u0430\u043D\u0442\u0430\u0441\u0442\u0438\u043A\u0430',
	'sf_detective', '\u041A\u0438\u0431\u0435\u0440\u043F\u0430\u043D\u043A',
	'sf_cyberpunk', '\u041A\u043E\u0441\u043C\u0438\u0447\u0435\u0441\u043A'
	+ '\u0430\u044F \u0444\u0430\u043D\u0442\u0430\u0441\u0442\u0438\u043A'
	+ '\u0430', 'sf_space', '\u041D\u0430\u0443\u0447\u043D\u0430\u044F '
	+ '\u0424\u0430\u043D\u0442\u0430\u0441\u0442\u0438\u043A\u0430', 'sf',
	'\u041F\u043E\u0441\u0442\u0430\u043F\u043E\u043A\u0430\u043B\u0438\u043F'
	+ '\u0441\u0438\u0441', 'sf_postapocalyptic', '\u0421\u043E\u0446\u0438'
	+ '\u0430\u043B\u044C\u043D\u043E-\u043F\u0441\u0438\u0445\u043E\u043B'
	+ '\u043E\u0433\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0444\u0430'
	+ '\u043D\u0442\u0430\u0441\u0442\u0438\u043A\u0430', 'sf_social',
	'\u0423\u0436\u0430\u0441\u044B \u0438 \u041C\u0438\u0441\u0442\u0438'
	+ '\u043A\u0430', 'sf_horror', '\u0424\u044D\u043D\u0442\u0435\u0437'
	+ '\u0438', 'sf_fantasy', '\u042D\u043F\u0438\u0447\u0435\u0441\u043A'
	+ '\u0430\u044F \u0444\u0430\u043D\u0442\u0430\u0441\u0442\u0438\u043A'
	+ '\u0430', 'sf_epic', '\u042E\u043C\u043E\u0440\u0438\u0441\u0442\u0438'
	+ '\u0447\u0435\u0441\u043A\u0430\u044F \u0444\u0430\u043D\u0442\u0430'
	+ '\u0441\u0442\u0438\u043A\u0430', 'sf_humor', '\u042E\u043C\u043E'
	+ '\u0440', '', '\u0410\u043D\u0435\u043A\u0434\u043E\u0442\u044B',
	'humor_anecdote', '\u042E\u043C\u043E\u0440', 'humor', '\u042E\u043C'
	+ '\u043E\u0440\u0438\u0441\u0442\u0438\u0447\u0435\u0441\u043A\u0430'
	+ '\u044F \u043F\u0440\u043E\u0437\u0430', 'humor_prose', '\u042E\u043C'
	+ '\u043E\u0440\u0438\u0441\u0442\u0438\u0447\u0435\u0441\u043A\u0438'
	+ '\u0435 \u0441\u0442\u0438\u0445\u0438', 'humor_verse');

	var v = new Array('det,thriller', 'child', 'nonf,design', '',
	'comp', '', 'sci', '', 'adv', '', '', '', 'ref', '',
	'sci_metal,sci_radio,sci_build,sci_transport', '', '');

	var r = new Array(60, 102, 194, 212, 244, 272, 290);

	var n = document.createElement('select');
	var g = n, iv = 0, ir = 0;

	if(!n || !a || !r || !v) return;

	n.size = '14';
	n.style.margin = '3px';
	n.style.padding = '2px';
	n.style.marginBottom = '-2px';
	if(bsf_ea29d0c6 || abf_ea29d0c6) n.multiple = true;
	n.id = 's1_ea29d0c6';

	for(var i = 0; i < a.length; i += 2)
	{
		if(a[i + 1] != '')
		{
			var o = g.appendChild(document.createElement('option'));
			o.innerHTML = a[i] + ' (' + a[i + 1] + ')';
			o.value = a[i + 1];

			if(bsf_ea29d0c6 && r[ir] == i)
			{
				o.style.color = '#A00000';
				o.innerHTML += ' *';
				ir++;
			}
		}
		else
		{
			if(bsf_ea29d0c6 && i && v[iv++] != '')
			{
				var o = g.appendChild(document.createElement('option'));
				o.innerHTML = '* (' + v[iv - 1] + ')';
				o.value = v[iv - 1];
				o.style.color = '#A00000';
			}

			g = n.appendChild(document.createElement('optgroup'));
			g.label = a[i];
			g.style.fontStyle = 'normal';
		}
	}

	delete a; delete v; delete r;

	if(n.addEventListener) n.addEventListener('dblclick',
		fn02_ea29d0c6, false);
	else n.attachEvent('ondblclick', fn02_ea29d0c6);

	return w.appendChild(n);
}

function fn05_ea29d0c6(a, f)
{
	var c = document.cookie, p = '0,0,0,0,0,0,0,0,0', i;
	var d = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);

	if(c && (i = c.indexOf('ea29d0c6')) >= 0)
	{
		c = (c.substring(i + 9)).split(';')[0];
		p = c.split('!')[f ? 0 : 1];
	}

	for(i = 0; i < a.length; i++)
	{ d[0 | (a[i] / 16)] |= 1 << (a[i] % 16); }

	d = d.join(',');

	document.cookie = 'ea29d0c6=' + (f ? p : d) + '!' + (f ? d : p)
	+ '; path=/; expires=Mon, 31 Dec 2040 23:59:59 GMT';
}

function fn06_ea29d0c6(n)
{
	var c = document.cookie, i, p = null, d, j, t = 0, s = 0;

	if(c && (i = c.indexOf('ea29d0c6')) >= 0)
	{
		c = (c.substring(i + 9)).split(';')[0];
		p = (c.split('!')[bsf_ea29d0c6]).split(',');
	}

	n.options[0].selected = !p;
	if(!p) return;

	for(i = 0; i < p.length; i++)
	{
		if(isNaN(d = parseInt(p[i]))) break;

		for(j = 1; j <= d; j *= 2)
		{
			if((d & j) && n.options[t])
			{
				n.options[t].selected = true;
				if(!bsf_ea29d0c6 && !abf_ea29d0c6) break;
			}

			t++;
		}

		s += 16; t = s;
	}
}
