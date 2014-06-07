// ==UserScript==
// @name           color management
// @namespace      klavogonki
// @include        http://klavogonki.ru/play/*
// ==/UserScript==
(function() {
function changeTextColor(value) {
	document.getElementById('typetext').style.color=value;
	var b=new Date();
	b.setTime(b.getTime()+3600*1000*24*365*30);
	setCookie("textcolor", value, b);
}
function changeBackgroundColor(value) {
	$('typetext').setStyle({backgroundColor:value});
	var b=new Date();
	b.setTime(b.getTime()+3600*1000*24*365*30);
	setCookie("textbackground", value, b);
}
function changeHighlightColor(value) {
	if(getCookie('highlighttype') == 'bg') $('typefocus').setStyle({backgroundColor:value});
	else $('typefocus').setStyle({color:value});
	var b=new Date();
	b.setTime(b.getTime()+3600*1000*24*365*30);
	setCookie('highlightcolor', value, b);
}
function changeHighlightType() {
	var type=getCookie('highlighttype');
	if(type == 'bg') type='text';
	else type='bg';
	var b=new Date();
	b.setTime(b.getTime()+3600*1000*24*365*30);
	setCookie("highlighttype", type, b);
	if(type == 'text') document.getElementById('param_highlight_type').innerHTML="текст";
	else document.getElementById('param_highlight_type').innerHTML="фон";
}
function addWidgets() {
	if(typeof getCookie != 'function') return
		link_value=(getCookie('highlighttype') == 'bg') ? 'фон' : 'текст';
		var color_tools=document.createElement('div');
		color_tools.innerHTML="Тип подсветки — <a id=\"param_highlight_type\" onclick=\"changeHighlightType()\" href=\"javascript:void(0);\">"+link_value+"</a><br>Цвет текста: <input type=\"text\" id=\"param_textcolor\" value=\""+getCookie('textcolor')+"\" maxlength=7> <button onclick=\"changeTextColor(document.getElementById('param_textcolor').value);\">OK</button><br>Цвет фона текста: <input type=\"text\" id=\"param_textbackground\" value=\""+getCookie('textbackground')+"\" maxlength=7><button onClick=\"changeBackgroundColor(document.getElementById('param_textbackground').value)\">OK</button><br>Цвет подсветки: <input type=\"text\" id=\"param_highlightcolor\" value=\""+getCookie('highlightcolor')+"\" maxlength=7><button onClick=\"changeHighlightColor(document.getElementById('param_highlightcolor').value)\">OK</button>";
		if(getCookie('textcolor')) $('typetext').setStyle({color:getCookie('textcolor')});
		if(getCookie('textbackground')) $('typetext').setStyle({backgroundColor:getCookie('textbackground')});
		if(getCookie('highlighttype'))
			if(getCookie('highlighttype') == 'bg') {
				if(getCookie('highlightcolor'))
					$('typefocus').setStyle({backgroundColor:getCookie('highlightcolor')});
				else $('typefocus').setStyle({backgroundColor:"#3333AA"});
			}
			else {
				if(getCookie('highlightcolor'))
					$('typetext').setStyle({color:getCookie('highlightcolor')});
					else $('typetext').setStyle({color:"#3333AA"});
			}
		var shadow_checkbox=document.getElementById('param_shadow');
		shadow_checkbox.parentNode.insertBefore(color_tools, shadow_checkbox);
		clearInterval(document.getElementById('colortools_init').value);
}
var hidden_elm_init=document.createElement('input');
hidden_elm_init.type="hidden";
hidden_elm_init.id="colortools_init";
document.body.appendChild(hidden_elm_init);
var s=document.createElement('script');
s.innerHTML=changeTextColor+changeBackgroundColor+changeHighlightColor+changeHighlightType+addWidgets+"document.getElementById('colortools_init').value=setInterval('addWidgets()', 1000);";
document.body.appendChild(s);
})();