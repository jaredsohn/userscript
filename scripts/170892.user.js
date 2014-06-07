// ==UserScript==
// @name        PCHF Snippet manager Pro
// @namespace   PCHF
// @include     http://www.pchelpforum.com/xf/*
// @author      mkey
// @version     1.0.1
// ==/UserScript==


// **************************************************

function byClass(n){return document.getElementsByClassName(n);}
function byId(n){return document.getElementById(n);}
function byTag(n){return document.getElementsByTagName(n);}
function create(n){return document.createElement(n);}
function _clickme(h){var e= document.createEvent("MouseEvents");e.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);return h.dispatchEvent(e);}
function _del(n){GM_deleteValue(n);}
function _get(n,v){return GM_getValue(n,v);}
function _lst(){return GM_listValues();}
function _set(n,v){GM_setValue(n,v);return v;}
function _style(n){var a= create('style'); a.type="text/css"; a.textContent= n; document.head.appendChild(a); }

// ********************************************************

var psm = {
	shift:	false,
	ctrl:	false,
	canc:	false,
	style:	'.pchfh { float:left; margin-right:4px; min-width:20px!important; } ' +
			'.submitUnit > input.pchfh_btn + input + input { width:50px; } ' +
			'.ctrlUnit.fullWidth .pchfh_bar { margin-left:30px; } ' +
			'.pchfh_btn { width:20px; } ' +
			'.pchfh_lst { font-size:1.25em; height:25px; width:150px; } ' +
			'.xenForm .ctrlUnit.submitUnit > dd { text-align:right; } ' +
			'.xenForm .ctrlUnit > dd { width:400px; } ' +
			'.xenForm .ctrlUnit > dt { padding-left:7px; width:320px; } ' +
			'#QuickReply textarea { height:240px; } ' +
			'.pchfh_bar { background-color:#F6F6F6; font-size:12px; } ' +
			'.pchfh_bar select, .pchfh_bar .btn, .pchfh_bar .c_pick > span > div { background-color:#FEFEFE; border:1px solid #D7D7D7; box-shadow:0 1px 3px rgba(0, 0, 0, 0.08); } ' +
			'.pchfh_bar .btn { cursor:default; display:inline-block; height:15px; margin:0 3px 5px 0; min-width:15px; padding:2px; text-align:center; -moz-border-radius:1px; -webkit-border-radius:1px; border-radius:1px; -moz-user-select:none; -webkit-user-select:none; user-select:none; } ' +
			'.pchfh_bar .btn:hover { background-color:#B2BBD0; border-color:#0A246A; } ' +
			'.pchfh_bar select { font-size:13px; height:20px; margin-right:3px; } ' +
			'.pchfh_bar br + span { font-weight:800; } ' +
			'.pchfh_bar br + span + span { font-style:italic; } ' +
			'.pchfh_bar br + span + span + span { text-decoration:underline; } ' +
			'.pchfh_bar br + span + span + span + span { text-decoration:line-through; } ' +
			'.pchfh_bar .spacer { border:1px solid #D7D7D7; display:inline; margin:0 4px 0 1px; padding:0; } ' +
			'.pchfh_bar .c_pick { text-align:left; width:21px; } ' +
			'.pchfh_bar .c_pick span { display:inline-block; } ' +
			'.pchfh_bar .c_pick > span:first-child { margin-right:1px; width:15px; } ' +
			'.pchfh_bar .c_pick > span + span { background-color:#D7D7D7; height:15px; position:absolute; width:5px; } ' +
			'.pchfh_bar .c_pick > span > div { display:none; height:84px; left:-2px; padding:3px; position:relative; top:-6px; width:128px; } ' +
			'.pchfh_bar .c_pick > span + span:hover > div { display:block; } ' +
			'.pchfh_bar .c_pick > span + span > div > span { border:1px solid #D7D7D7; display:inline-block; height:12px; margin:0 1px; width:12px; }'
};

psm.Main = function()
{
	_style(psm.style);
	
	var pa = byClass('textCtrl MessageEditor');
	
	if (pa.length > 0)
	{
		var d = pa[0].parentNode.parentNode.getElementsByClassName('submitUnit');
		if (d.length > 0)
			d = d[0];
		
		else
			d = pa[0].parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('submitUnit')[0].getElementsByTagName('dt')[0];
		
		psm.Interface(d, pa[0]);
	}
};

psm.Interface = function(d, pa)
{
	var del = create('input');
	del.className = 'button primary pchfh pchfh_btn';
	del.type = 'button';
	del.value = '-';
	
	del.addEventListener('click', function()
	{
		if (!lst.childNodes.length)
			return;
		
		if (!confirm('Delete?'))
			return;
		
		var n = lst.childNodes[lst.selectedIndex];
		_del(n.textContent);
		lst.removeChild(n);
	}
	, false);
	
	var add = create('input');
	add.className = 'button primary pchfh pchfh_btn';
	add.type = 'button';
	add.value = '+';
	
	add.addEventListener('click', function()
	{
		var n = prompt('Input the entry name');
		if (!n)
			return;
		
		if (pa.selectionStart == pa.selectionEnd)
			_set(n, pa.value);
		
		else
			_set(n, pa.value.substring(pa.selectionStart, pa.selectionEnd));
		
		var n1 = create('option');
		n1.textContent = n;
		lst.appendChild(n1);
	}
	, false);
	
	var ins = create('input');
	ins.className = 'button primary pchfh';
	ins.type = 'button';
	ins.value = 'Insert';
	
	ins.addEventListener('click', function()
	{
		if (!lst.childNodes.length)
			return;
		
		var i = pa.selectionStart,
		j = pa.selectionEnd;
		
		if (i > j)
		{
			i = j;
			j = pa.selectionStart;
		}
		
		var e = _get(lst.childNodes[lst.selectedIndex].textContent);
		
		pa.value = pa.value.substring(0, i) + e + pa.value.substring(j);
		
		j += e.length;
		pa.focus();
		pa.setSelectionRange(j, j);
	}
	, false);
	
	var lst = create('select');
	lst.className = 'pchfh pchfh_lst';
	
	var n = _lst();
	if (n.length)
	{
		for (var i = 0, t = ''; i < n.length; i++)
			t += '<option>' + n[i] + '</option>';
		
		lst.innerHTML = t;
	}
	
	d.insertBefore(ins, d.firstChild);
	d.insertBefore(add, d.firstChild);
	d.insertBefore(lst, d.firstChild);
	d.insertBefore(del, d.firstChild);
	
	psm.Toolbar(pa);
};

psm.Toolbar = function(pa)
{
	var d = create('div');
	d.className = 'pchfh_bar';
	d.innerHTML = 
		'<select>' +
			'<option>Font</option>' +
			'<option>Andale Mono</option>' +
			'<option>Arial</option>' +
			'<option>Arial Black</option>' +
			'<option>Book Antiqua</option>' +
			'<option>Calibri</option>' +
			'<option>Courier New</option>' +
			'<option>Georgia</option>' +
			'<option>Helvetica</option>' +
			'<option>Impact</option>' +
			'<option>Tahoma</option>' +
			'<option>Times New Roman</option>' +
			'<option>Trebuchet MS</option>' +
			'<option>Verdana</option>' +
		'</select>' +
		'<span class="btn" title="Apply selected font">Set</span>' +
		'<span class="btn c_pick" title="Apply text color (R)">' +
			'<span style="background-color:#000000;">&nbsp;</span>' +
			'<span>&nbsp;<div id="pchfh_col">' +
				'<span style="background-color:#000000;"></span><span style="background-color:#993300;"></span><span style="background-color:#333300;"></span><span style="background-color:#003300;"></span><span style="background-color:#003366;"></span><span style="background-color:#000080;"></span><span style="background-color:#333399;"></span><span style="background-color:#333333;"></span>' +
				'<span style="background-color:#800000;"></span><span style="background-color:#FF6600;"></span><span style="background-color:#808000;"></span><span style="background-color:#008000;"></span><span style="background-color:#008080;"></span><span style="background-color:#0000FF;"></span><span style="background-color:#666699;"></span><span style="background-color:#808080;"></span>' +
				'<span style="background-color:#FF0000;"></span><span style="background-color:#FF9900;"></span><span style="background-color:#99CC00;"></span><span style="background-color:#339966;"></span><span style="background-color:#33CCCC;"></span><span style="background-color:#3366FF;"></span><span style="background-color:#800080;"></span><span style="background-color:#999999;"></span>' +
				'<span style="background-color:#FF00FF;"></span><span style="background-color:#FFCC00;"></span><span style="background-color:#FFFF00;"></span><span style="background-color:#00FF00;"></span><span style="background-color:#00FFFF;"></span><span style="background-color:#00CCFF;"></span><span style="background-color:#993366;"></span><span style="background-color:#C0C0C0;"></span>' +
				'<span style="background-color:#FF99CC;"></span><span style="background-color:#FFCC99;"></span><span style="background-color:#FFFF99;"></span><span style="background-color:#CCFFCC;"></span><span style="background-color:#CCFFFF;"></span><span style="background-color:#99CCFF;"></span><span style="background-color:#CC99FF;"></span><span style="background-color:#FFFFFF;"></span>' +
			'</div></span>' +
		'</span>' +
		'</span>' +
		'<span class="spacer"></span>' +
		'<span class="btn" title="Font size 1">1</span>' +
		'<span class="btn" title="Font size 2">2</span>' +
		'<span class="btn" title="Font size 3">3</span>' +
		'<span class="btn" title="Font size 4">4</span>' +
		'<span class="btn" title="Font size 5">5</span>' +
		'<br/>' +
		'<span class="btn" title="Bold (B)">B</span>' +
		'<span class="btn" title="Italic (I)">I</span>' +
		'<span class="btn" title="Underline (U)">U</span>' +
		'<span class="btn" title="Strikethrough (S)">S</span>' +
		'<span class="spacer"></span>' +
		'<span class="btn" title="Left align">L</span>' +
		'<span class="btn" title="Center align">C</span>' +
		'<span class="btn" title="Right align">R</span>' +
		'<span class="spacer"></span>' +
		'<span class="btn" title="Bulleted list">BL</span>' +
		'<span class="btn" title="Ordered list">NL</span>' +
		'<span class="spacer"></span>' +
		'<span class="btn" title="Hyperlink (H)">URL</span>' +
		'<span class="btn" title="Insert image (M)">IMG</span>' +
		'<span class="btn" title="Insert code tags (C)">CODE</span>' +
		'<span class="btn" title="Insert Quote tags (Q)">QUOTE</span>';
	
	var fnt = d.getElementsByTagName('select')[0],
	s = d.getElementsByClassName('btn');
	
	s[0].addEventListener('click', Font, false);		// FONT
	s[1].addEventListener('click', Color, false);		// COLOR
	
	// SIZE
	s[2].addEventListener('click', Size, false);		// 1
	s[3].addEventListener('click', Size, false);		// 2
	s[4].addEventListener('click', Size, false);		// 3
	s[5].addEventListener('click', Size, false);		// 4
	s[6].addEventListener('click', Size, false);		// 5
	
	s[7].addEventListener('click', Single, false);		// B
	s[8].addEventListener('click', Single, false);		// I
	s[9].addEventListener('click', Single, false);		// U
	s[10].addEventListener('click', Single, false);		// S
	
	s[11].addEventListener('click', Align, false);		// L
	s[12].addEventListener('click', Align, false);		// C
	s[13].addEventListener('click', Align, false);		// R
	
	s[14].addEventListener('click', List, false);		// BL
	s[15].addEventListener('click', List, false);		// NL
	
	s[16].addEventListener('click', Url, false);		// URL
	
	s[17].addEventListener('click', Img, false);		// IMG
	
	s[18].addEventListener('click', Single2, false);	// CODE
	s[19].addEventListener('click', Single2, false);	// QUOTE
	
	pa.parentNode.insertBefore(d, pa);
	
	var sp = byId('pchfh_col').getElementsByTagName('span');
	
	for (var i = 0; i < sp.length; i++)
		sp[i].addEventListener('click', ColorSet, false);
	
	psm.Shortcuts(s);
	
	function Align()
	{
		var i = pa.selectionStart,
		j = pa.selectionEnd,
		v = (this.textContent == 'L') ? 'LEFT' : (this.textContent == 'C') ? 'CENTER' : 'RIGHT';
		
		if (i == j)
			return;
		
		if (i > j)
		{
			i = j;
			j = pa.selectionStart;
		}
		
		pa.value = pa.value.substring(0, i) + '[' + v + ']' + pa.value.substring(i, j) + '[/' + v + ']' + pa.value.substring(j);
		pa.focus();
		
		if (psm.ctrl)
		{
			i += 2 + v.length;
			j += 2 + v.length;
			pa.setSelectionRange(i, j);
		}
		else
		{
			j += 5 + 2*v.length;
			pa.setSelectionRange(j, j);
		}
	}
	
	function Color()
	{
		if (psm.canc == true)
		{
			psm.canc = false;
			return;
		}
		
		var i = pa.selectionStart,
		j = pa.selectionEnd;
		
		if (i == j)
			return;
		
		if (i > j)
		{
			i = j;
			j = pa.selectionStart;
		}
		
		var c = this.firstChild.style.backgroundColor;
		if (c.length > 7)
		{
			c = c.replace(/[rgba{}()\s]/g,'').split(',');
			c = '#' + toHex(c[0]) + toHex(c[1]) + toHex(c[2]);
		}
		
		pa.value = pa.value.substring(0, i) + '[COLOR=' + c + ']' + pa.value.substring(i, j) + '[/COLOR]' + pa.value.substring(j);
		pa.focus();
		
		if (psm.ctrl)
		{
			i += 8 + c.length;
			j += 8 + c.length;
			pa.setSelectionRange(i, j);
		}
		else
		{
			j += 23;
			pa.setSelectionRange(j, j);
		}
	}
	
	function ColorSet()
	{
		this.parentNode.parentNode.previousSibling.style.backgroundColor = this.style.backgroundColor;
		psm.canc = true;
	}
	
	function Font()
	{
		var i = pa.selectionStart,
		j = pa.selectionEnd,
		v = fnt.options[fnt.selectedIndex].textContent;
		
		if (i == j || fnt.selectedIndex == 0)
			return;
		
		if (i > j)
		{
			i = j;
			j = pa.selectionStart;
		}
		
		pa.value = pa.value.substring(0, i) + '[FONT=' + fnt.options[fnt.selectedIndex].textContent + ']' + pa.value.substring(i, j) + '[/FONT]' + pa.value.substring(j);
		pa.focus();
		
		if (psm.ctrl)
		{
			i += 7 + v.length;
			j += 7 + v.length;
			pa.setSelectionRange(i, j);
		}
		else
		{
			j += 14 + v.length;
			pa.setSelectionRange(j, j);
		}
	}
	
	function Img()
	{
		var url = prompt('Input the image URL'),
		ctrl = psm.ctrl;
		
		if (!url)
			return;
		
		if (url.indexOf('http://') != 0 && url.indexOf('https://') != 0)
		{
			alert('Invalid URL');
			return;
		}
		
		var i = pa.selectionStart,
		j = pa.selectionEnd;
		
		if (i > j)
		{
			i = j;
			j = pa.selectionStart;
		}
		
		pa.value = pa.value.substring(0, i) + '[IMG]' + url + '[/IMG]' + pa.value.substring(j);
		pa.focus();
		
		if (ctrl && i != j)
		{
			i += 5 + url.length;
			j += 5 + url.length;
			pa.setSelectionRange(i, j);
		}
		else
		{
			j += 11 + url.length;
			pa.setSelectionRange(j, j);
		}
	}
	
	function List()
	{
		var i = pa.selectionStart,
		j = pa.selectionEnd,
		v = (this.textContent == 'BL') ? '' : '=1';
		
		if (i == j)
			return;
		
		if (i > j)
		{
			i = j;
			j = pa.selectionStart;
		}
		
		var l = pa.value.substring(i, j).split('\n');
		var t = '';
		
		for (var k = 0; k < l.length; k++)
			t += '\n[*]' + l[k];
		
		pa.value = pa.value.substring(0, i) + '[LIST' + v + ']' + t + '[/LIST]' + pa.value.substring(j);
		pa.focus();
		
		j += 14 + v.length + 3*l.length;
		pa.setSelectionRange(j, j);
	}
	
	function Single()
	{
		var i = pa.selectionStart,
		j = pa.selectionEnd,
		v = this.textContent;
		
		if (i == j)
			return;
		
		if (i > j)
		{
			i = j;
			j = pa.selectionStart;
		}
		
		pa.value = pa.value.substring(0, i) + '[' + v + ']' + pa.value.substring(i, j) + '[/' + v + ']' + pa.value.substring(j);
		pa.focus();
		
		if (psm.ctrl)
		{
			i += 2 + v.length;
			j += 2 + v.length;
			pa.setSelectionRange(i, j);
		}
		else
		{
			j += 5 + 2*v.length;
			pa.setSelectionRange(j, j);
		}
	}
	
	function Single2()
	{
		var i = pa.selectionStart,
		j = pa.selectionEnd,
		v = this.textContent;
		
		if (i > j)
		{
			i = j;
			j = pa.selectionStart;
		}
		
		pa.value = pa.value.substring(0, i) + '[' + v + ']' + pa.value.substring(i, j) + '[/' + v + ']' + pa.value.substring(j);
		pa.focus();
		
		if (i == j)
			j += 2 + this.textContent.length;
		else
			j += 5 + 2*this.textContent.length;
			
		pa.setSelectionRange(j, j);
	}
	
	function Size()
	{
		var i = pa.selectionStart,
		j = pa.selectionEnd;
		
		if (i == j)
			return;
		
		if (i > j)
		{
			i = j;
			j = pa.selectionStart;
		}
		
		pa.value = pa.value.substring(0, i) + '[SIZE=' + this.textContent + ']' + pa.value.substring(i, j) + '[/SIZE]' + pa.value.substring(j);
		pa.focus();
		
		if (psm.ctrl)
		{
			i += 8;
			j += 8;
			pa.setSelectionRange(i, j);
		}
		else
		{
			j += 15;
			pa.setSelectionRange(j, j);
		}
	}
	
	function toHex(c)
	{
		return ((c<10) ? '0' : '') + Number(c).toString(16);
	}
	
	function Url()
	{
		var url = prompt('Input the URL'),
		ctrl = psm.ctrl;
		
		if (!url)
			return;
		
		if (url.indexOf('http://') != 0 && url.indexOf('https://') != 0)
		{
			alert('Invalid URL');
			return;
		}
		
		var i = pa.selectionStart,
		j = pa.selectionEnd;
		
		if (i > j)
		{
			i = j;
			j = pa.selectionStart;
		}
		
		if (i == j)
		{
			var lbl = prompt('Input the label', url);
			
			if (!lbl)
				return;
		}
		else
			lbl = pa.value.substring(i, j);
		
		pa.value = pa.value.substring(0, i) + '[URL=' + url + ']' + lbl + '[/URL]' + pa.value.substring(j);
		pa.focus();
		
		if (ctrl && i != j)
		{
			i += 6 + url.length;
			j += 6 + url.length;
			pa.setSelectionRange(i, j);
		}
		else
		{
			j += 12 + url.length + ((i == j) ? lbl.length : 0);
			pa.setSelectionRange(j, j);
		}
	}
};

psm.Shortcuts = function(s)
{
	document.onkeyup = function(e)
	{
		// if (document.activeElement.id != 'ctrl_message')
			// return;
		
		e = e.charCode || e.keyCode;
		
		if (e == 16)
			psm.shift = false;
		
		else if (e == 17)
			psm.ctrl = false;
	};
	
	document.onkeydown = function(e)
	{
		if (document.activeElement.id != 'ctrl_message')
			return;
		
		e = e.charCode || e.keyCode;
		
		if (e == 16)
		{
			psm.shift = true;
			return;
		}
		else if (e == 17)
		{
			psm.ctrl = true;
			return;
		}
		
		if (!psm.shift || !psm.ctrl)
			return;
		
		switch (e)
		{
			case 66:		// B
				e = 7;
				break;
			case 67:		// C
				e = 18
				break;
			case 72:		// H
				e = 16;
				break;
			case 73:		// I
				e = 8;
				break;
			case 77:		// M
				e = 17;
				break;
			case 81:		// Q
				e = 19;
				break;
			case 82:		// R
				e = 1;
				break;
			case 85:		// U
				e = 9;
				break;
			default:
				return;
		}
		
		_clickme(s[e]);
		return false;
	};
};

if (byId('ctrl_message') != null && byId('ctrl_message_html_ifr') == null)
	psm.Main();
