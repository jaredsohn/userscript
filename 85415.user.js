// ==UserScript==
// @name	Pennergame - Spam automatisch loeschen
// @version	0.2
// @author	abwasch - pennerhack.foren-city.de
// @include	*pennergame.de*
// @exclude	http://board.*
// @exclude	http://dontknow.me/*
// @exclude	*/redirect/*
// ==/UserScript==


var spam_link = 'http://'+document.URL.split('/')[2];
var spam_filter = GM_getValue('spam_rules', 'Kronkorken');

setTimeout(function (){msg_auslesen();}, 6000);

if (document.URL == spam_link+'/messages/'){
	var btn = document.getElementsByClassName('submenu')[0].getElementsByTagName('li').length+1;
	document.getElementsByClassName('submenu')[0].innerHTML += '<li><a id=\"spam_rules\" style=\"cursor:pointer\" class=\"btn'+btn+'\">Spam-Rules</a></li>';
	document.getElementById('spam_rules').addEventListener('click', function (){
		if (!document.getElementById('spam_save')){
			var spam_div = '<div style=\"position:absolute; bottom:10px; right:300px; width:320px; background-color:#fcfcdf; color:#000000; padding:4px; z-index:50; '
				+'border:1px solid #000000; -moz-border-radius:3px\"><b>Spam Blacklist</b> <i>(Wortliste, durch Komma getrennt)</i><br>'
				+'<input style=\"width:260px; height:16px; background-color:#ffffff; color:#000000; bottom:4px; right:4px\" name=\"spam_rules\" type=\"text\" size=\"50\" maxlength=\"200\">'
				+'<div id=\"spam_save\" style=\"position:absolute; bottom:4px; right:4px; width:40px; background-color:#901010; color:#e4e4e4; cursor:pointer; '
				+'font-size:12px; font-weight:bold; text-align:center; padding:2px; border:1px solid #000000; -moz-border-radius:3px\">save</div></div>';
			var spam_setup = document.getElementById('messageslist').appendChild(document.createElement('div'));
		
			spam_setup.innerHTML = spam_div;
			document.getElementsByName('spam_rules')[0].value = spam_filter;
			
			document.getElementById('spam_save').addEventListener('click', function(){
				spam_filter = document.getElementsByName('spam_rules')[0].value;
				GM_setValue('spam_rules', spam_filter);
				document.getElementById('messageslist').removeChild(spam_setup);
				msg_abfrage()
			},false);
		}
	},false);
}

function msg_auslesen(){
	if (document.getElementById('ntext').getElementsByTagName('h2')[0].innerHTML = 'Neue Nachricht') msg_abfrage();
	else if (document.body.innerHTML.match(/new_msg.gif/)) msg_abfrage();
	else if (document.getElementsByClassName('trash')) msg_abfrage();
}

function msg_abfrage(){
	var spam_msg = 0;
	GM_xmlhttpRequest({
		method: 'GET',
		url: spam_link+'/messages/',
		onload: function(content){
			var msg_list = html2dom(content.responseText).getElementsByClassName('msglist');
			var filter = spam_filter.split(',');
			for (i in filter){
				for (a in msg_list){
					if (msg_list[a].getElementsByTagName('strong')[0].innerHTML.match(trim(filter[i])) && filter[i] != ''){
						msg_loeschen(msg_list[a].getElementsByClassName('trash')[0])
						spam_msg++;
					}
				}
			}
			if (spam_msg > 0) showMsg('Success!', spam_msg+' Spam-'+(spam_msg > 1 ? 'Nachrichten' : 'Nachricht')+' beseitigt.', 'ok');
		}
	});
}

function msg_loeschen(del_link){
	GM_xmlhttpRequest({
		method: 'GET',
		url: del_link,
	});
}

function showMsg(title, text, pic){		//meldung - ueberschrift, hinweistext, bild
	window.setTimeout("PgFunction.showMsg($('notifyme'), '"+title+"', '<b>"+text+"</b>', '"+pic+"')", 100);
}

function html2dom(content){		//make a valid DOM-document
	var dt = document.implementation.createDocumentType("html", "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd");
	var doc = document.implementation.createDocument('', '', dt);
	var html = doc.createElement('html');
	html.innerHTML = content;
	doc.appendChild(html);
	return doc;
}

function trim(s){
	while (s.substring(0,1) == ' ') s = s.substring(1,s.length);
	while (s.substring(s.length-1,s.length) == ' ') s = s.substring(0,s.length-1);
	return s;
}
