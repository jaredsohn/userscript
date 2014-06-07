// ==UserScript==
// @name           travian
// @namespace      travian
// @description    Csatajelentés
// @include        http://*.travian*.*/berichte.php?id=*
// ==/UserScript==

var save_rep = {'en':'Csatajelentés', 'es':'Guardar informe', 'ru':'Сохранить отчет', 'ua':'Створити звіт','de':'Speichern Bericht'};
var anonymous = {'en':'Névtelen', 'es':'Anonimo', 'ru':'Анонимно', 'ua':'Анонімно', 'de':'Anonym'};
var hide_def = {'en':'Védelem elrejtése', 'es':'Ocultar def', 'ru':'Скрыть деф', 'ua':'Сховати деф', 'de':'Ausblenden Verteidiger'};

var server = location.hostname;

try	{
	var ext = document.getElementById('lplus1').src.match(/.*img\/(\w+)\/a\//)[1];
} catch(e) {
	var ext = server.substring(server.lastIndexOf('.')+1);
	if (ext == 'com') {
		var ext1 = server.substr(0,2);
		if (ext1 == 'rs') ext = ext1;
	}
}

var lang_tr = ext;
if (!save_rep[ext]) lang_tr = 'en';

var gv='';
var rep_div = document.getElementById('lmid2');
if (!rep_div) {
	rep_div = document.getElementById('content');
	gv='3.5';
}
var rep_table = $tags('table',rep_div)[0];
var rep = xhtml(rep_table);

var logme_div = $elem("div", "", {
			"align": "right"
		}, {});
		
var logme_form = $elem("form", "", {
		'action': 'http://4travian.org/post.php',
		'method': 'post',
		'target': '_blank',
		'style': 'margin-top:10px'
	}, {}, logme_div);

var in_html = 
	'<input type="hidden" name="version" value="1.0"/>'  + 
	'<input type="hidden" name="gv" value="'+gv+'"/>'  + 
	'<input type="hidden" name="lang" value="'+ext+'"/>'  + 
	'<input type="hidden" name="server" value="'+server+'"/>'  + 
	'<input type="checkbox" name="anonymous"/>' + anonymous[lang_tr] + '&nbsp;&nbsp;' + 
	'<input type="checkbox" name="hide_def"/>' + hide_def[lang_tr] + '&nbsp;&nbsp;' +
	'<input type="submit" value="'+save_rep[lang_tr]+'"/>';		
logme_form.innerHTML = in_html;
$elem("input", "", {
			"type": "hidden",
			"name": "rep",
			"value": rep
		}, {}, logme_form);
		
rep_div.appendChild(logme_div);

function xhtml(node) {
	if (node.nodeType == 3) {
		str = node.nodeValue;
	} else {
		var name = node.nodeName.toLowerCase();
		if (name.indexOf('/') == -1) {
			str = '<'+name;
			if (node.attributes) {
				for (var i=0;i<node.attributes.length;i++) {
					var attrName = node.attributes[i].name;
					var value = node.attributes[i].value;
					if (attrName == 'src' || attrName == 'class' || attrName == 'href') {
						str+=' ' + attrName + '="' +value.replace(/&/g,'&amp;') +'"';
					}
				}
			}
			str+='>';
			if (node.childNodes) {
				for (var j=0;j<node.childNodes.length;j++) {
					str += xhtml(node.childNodes[j]);
				}
			}
			str+= '</'+name+'>';
		} else {
			str = '';
		}
	}
	return str;
}

function $tags(tag, doc) {
	if(!doc)
		var doc = document;
	return doc.getElementsByTagName(tag);
}

function $elem(tag, content, attributes, style, parent)	{
	var ret = document.createElement(tag);
	if (content)
		ret.innerHTML = content;

	if (attributes)
		for (a in attributes)
			ret.setAttribute(a, attributes[a]);

	if (style)
		for (a in style)
			ret.style[a] = style[a];

	if (parent)
	{
		parent = (typeof(parent) == 'string') ? get(parent) : parent;
		parent.appendChild(ret);
	}
	return ret;
}
