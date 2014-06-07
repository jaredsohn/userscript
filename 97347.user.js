// ==UserScript==
// @name           klavogonki: PostOptions+
// @description    Allows to insert poster's nickname or quote selected text with poster's nickname
// @version        2.0.2
// @author         olimo
// @namespace      klavogonki.ru
// @include        http://klavogonki.ru/forum/*
// ==/UserScript==
function remember_sel() {
	sel_text = $selection.getText().trim();
}
function cite_selected(postnumber) {
	var username = document.getElementById('username-'+postnumber).innerHTML;
	var cite_sel = '[quote='+username+']'+sel_text+'[/quote]';
	var rep = document.getElementById('fast-reply_textarea');
	if (rep.value == '')
		rep.value += cite_sel;
	else
		rep.value += '\r\n'+cite_sel;
	document.getElementById('write-block').style.display = '';
	document.getElementById('write-link').style.display = 'none';
}
function ins_name(postnumber) {
	var username = document.getElementById('username-'+postnumber).innerHTML;
	var inserted_name = '[b]'+username+'[/b], ';
	var rep = document.getElementById('fast-reply_textarea');
	if (rep.value == '')
		rep.value += inserted_name;
	else
		rep.value += '\r\n'+inserted_name;
	openWrite();
}
if (document.getElementById('fast-reply_textarea')) {
	var cite_links = document.getElementsByClassName('post-opts');
	for(i=0;i<cite_links.length;i++) {
		cite_links[i].setAttribute('style', 'margin-top:25px');
		cite_links[i].getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[1].setAttribute('style', 'display:none;');
		cite_links[i].getElementsByTagName('table')[0].setAttribute('width', '100%;');
		var postnumber = cite_links[i].parentNode.getElementsByTagName('div')[0].getAttribute('id').substring(5);
		var createElem = document.createElement('td');
		createElem.innerHTML = '<a style="margin-left:0px; margin-right:15px;" onclick = ins_name("'+postnumber+'");>Имя</a> <a style="margin-left:0px; margin-right:15px;" onclick = cite_selected("'+postnumber+'"); onmouseover = remember_sel(); >Цитата</a>';
		createElem.setAttribute('style', 'text-align:left;', 'width:50%');
		cite_links[i].getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[0].parentNode.insertBefore(createElem,document.getElementsByClassName('post-opts')[i].getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[0]);
	}
}
var s = document.createElement('script');
s.innerHTML = "var sel_text = '';" + cite_selected + remember_sel + ins_name;
document.body.appendChild(s);