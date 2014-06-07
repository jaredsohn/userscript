// ==UserScript==
// @name        Dardanos - Vorschaufix
// @namespace   http://milkau.name/2013/greasemonkey-ns/dardanos/preview-fix
// @include     http://*.dardanos-logd.de/*
// @include     http://*.proxy.milkau.name/*
// @exclude     http://*.dardanos-logd.de/forum/*
// @exclude     http://*.proxy.milkau.name/forum/*
// @version     1.0
// ==/UserScript==

var colors = {"1":"rgb(0, 0, 176)","2":"rgb(0, 176, 0)","3":"rgb(0, 176, 176)","4":"rgb(176, 0, 0)","5":"rgb(176, 0, 204)","6":"rgb(176, 176, 0)","7":"rgb(176, 176, 176)","8":"rgb(221, 255, 187)","9":"rgb(0, 112, 255)","v":"rgb(170, 187, 238)","í":"rgb(126, 172, 226)","Ó":"rgb(39, 142, 203)","U":"rgb(0, 128, 192)","ó":"rgb(9, 115, 187)","M":"rgb(0, 73, 255)","Û":"rgb(27, 86, 175)","€":"rgb(36, 73, 170)","u":"rgb(0, 64, 128)","û":"rgb(18, 68, 107)","x":"rgb(36, 73, 85)","!":"rgb(0, 0, 255)","(":"rgb(146, 255, 255)","#":"rgb(0, 255, 255)","a":"rgb(64, 128, 128)","P":"rgb(0, 128, 128)","y":"rgb(36, 109, 85)","Y":"rgb(36, 255, 170)","F":"rgb(173, 255, 116)","g":"rgb(170, 255, 153)","G":"rgb(128, 255, 128)","r":"rgb(109, 219, 85)","l":"rgb(0, 255, 85)","@":"rgb(0, 255, 0)","A":"rgb(0, 128, 0)","+":"rgb(0, 36, 0)","&":"rgb(255, 255, 255)","t":"rgb(248, 219, 131)","p":"rgb(255, 255, 128)","O":"rgb(109, 146, 0)","W":"rgb(128, 128, 64)","w":"rgb(128, 128, 0)","T":"rgb(107, 86, 63)","S":"rgb(36, 36, 0)","Á":"rgb(194, 31, 85)","á":"rgb(213, 21, 85)","Â":"rgb(237, 9, 86)","â":"rgb(255, 0, 86)","É":"rgb(255, 0, 168)","%":"rgb(255, 0, 255)","R":"rgb(255, 0, 128)","m":"rgb(182, 36, 85)","B":"rgb(255, 182, 255)","è":"rgb(216, 143, 203)","k":"rgb(182, 109, 170)","é":"rgb(188, 61, 249)","j":"rgb(160, 0, 185)","J":"rgb(130, 0, 151)","K":"rgb(100, 1, 116)","L":"rgb(71, 1, 82)","V":"rgb(154, 91, 238)","È":"rgb(164, 96, 197)","o":"rgb(127, 0, 255)","X":"rgb(103, 0, 207)","Z":"rgb(95, 0, 191)","À":"rgb(73, 0, 145)","à":"rgb(51, 0, 102)","$":"rgb(255, 0, 0)","C":"rgb(220, 17, 0)","s":"rgb(182, 36, 0)","e":"rgb(128, 0, 0)","E":"rgb(99, 0, 0)","N":"rgb(182, 255, 0)","f":"rgb(179, 204, 0)","^":"rgb(255, 255, 0)","q":"rgb(255, 153, 0)","Q":"rgb(255, 102, 0)","h":"rgb(204, 51, 0)",")":"rgb(153, 153, 153)","D":"rgb(68, 68, 68)","d":"rgb(51, 51, 51)","~":"rgb(34, 34, 34)","ê":"rgb(72, 62, 32)","Î":"rgb(121, 81, 37)","î":"rgb(132, 78, 18)","Í":"rgb(153, 80, 0)","Ì":"rgb(124, 230, 101)","ì":"rgb(71, 228, 85)","Ô":"rgb(36, 142, 104)","ô":"rgb(36, 170, 121)","Ò":"rgb(36, 195, 135)","ò":"rgb(36, 220, 150)"};
var elements = 
{
	'c' : '<center>|</center>', // zentriert
	'i' : '<em>|</em>', // kursiv/emphasis
	'b' : '<strong>|</strong>', // fett/strong
	'¬' : '<pre>|</pre>', // preformatted
	'H' : '<span class="navhi">|</span>', // hotkey
	'µ' : '<marquee scrolldelay="100" scrollamount="2" behavior="alternate">|</marquee>', // laufschrift langsam
	'-' : '<marquee direction="right">|</marquee>', // laufschrift left to right
	'_' : '<marquee direction="left">|</marquee>'  // laufschrift right to left
};
var replace =
{
	'n' : '<br>'
}
var entities =
{
	'&' : 'amp',
	'<' : 'lt',
	'>' : 'gt'
};

for (var i in elements)
{
	elements[i] = elements[i].split('|');
}
for (var i in entities)
{
	entities[i] = '&' + entities[i] + ';';
}

function appo_encode(source)
{
	var work = source;
	var result = '<br>Vorschau:<br>';
	var stack = [];
	var color = '0';
	
	work = work.replace(/[&<>]/g, function (s) { return entities[s]; });
	work = work.split('`');
// 	result += '###"' + work + '"###';
	result += work.shift();
	
	for (var j = 0; j < work.length; j++)
	{
		var chip = work[j];
		var code = chip.substring(0,1);
// 		result += '###`' + chip + '`###';
		
		if (code == '0')
		{
			if (color != '0') result += '</span>';
			color = code;
		}
		else if (code in colors)
		{
			if (color != '0') result += '</span>';
			color = code;
			result += '<span style="color: ' + colors[color] + '">';
		}
		else if (code in elements)
		{
			var stack_pos = stack.indexOf(code);
			var is_closing = stack_pos >= 0 ? 1 : 0;

			if (color != '0') result += '</span>';
			if (is_closing == 0) stack_pos = stack.length;
			
			for (var i = stack.length - 1; i > stack_pos; i--)
			{
				result += elements[stack[i]][1];
			}
			result += elements[code][is_closing];
			for (var i = stack_pos + 1; i < stack.length; i++)
			{
				result += elements[stack[i]][0];
			}
			
			if (is_closing == 0) 
			{
				stack.push(code);
			}
			else
			{
				stack.splice(stack_pos, 1);
			}
// 			result += '###:' + stack + ':###'
			if (color != '0') result += '<span style="color: ' + colors[color] + '">';
		}
		else if (code in replace)
		{
			result += replace[code];
		}
		else
		{
			result += '`' + code;
		}
		
		result += chip.substring(1);
	}
	if (color != '0') result += '</span>';
	for (var i = stack.length - 1; i >= 0; i--)
	{
		result += elements[stack[i]][1];
	}
	
	return result;
}

var textareas = document.getElementsByTagName('textarea');
for (var i = 0; i < textareas.length; i++)
{
	var ta = textareas[i];
	if (ta.onkeyup)
	{
		ta.onkeyup = function() { document.getElementById('chatpreview').innerHTML = appo_encode(this.value); };
		
	}
	if (ta.name == 'bio')
	{
		var preview = document.createElement('div');
		preview.id = 'chatpreview';
		ta.parentNode.appendChild(preview);
		ta.onkeyup = function() { document.getElementById('chatpreview').innerHTML = appo_encode('`^' + this.value.replace(/\n/g, '`n')); };
	}
}