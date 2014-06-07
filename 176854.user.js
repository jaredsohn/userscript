// ==UserScript==
// @name		Encontre Mais Trackers
// @namespace	Letério
// @version		0.3.1
// @downloadURL	http://userscripts.org/scripts/source/176854.user.js
// @updateURL	http://userscripts.org/scripts/source/176854.meta.js
// @description	Adiciona um link ao HASH do torrent que te redireciona para o torrentz.eu para que encontre mais trackers
// @match		*thepiratebay.sx/torrent/*
// @match		*filmestorrent.net.br/filme/*
// @match		*torrentz.eu/*
// @exclude		*torrentz.eu/search*
// @exclude		*torrentz.eu/announcelist*
// @copyright	2013+, Vinícius Letério
// @history		0.3.1 Adicionado opção de ir direto para a lista de Trackers no torrentz.eu
// @history		0.3 Revisão
// @history		0.2 Adicionado filmestorrent.net.br
// @history		0.1 Início
// ==/UserScript==

//Vars
var versao = "0.3.1";

console.info("---------------------------------\nEncontre Mais Trackers v"+versao+" iniciado\n---------------------------------");

if(document.URL.lastIndexOf("torrentz.eu") != -1) inTorrentz_eu();
else if(document.URL.lastIndexOf("thepiratebay.sx/torrent") != -1) thepiratebay_sx();
else if(document.URL.lastIndexOf("filmestorrent.net.br/filme") != -1) filmestorrents_net_br();

function inTorrentz_eu() {
    var link = document.getElementsByClassName('trackers')[0].getElementsByTagName('p')[0].getElementsByTagName('a')[0].getAttribute('href');
    if(link != null && confirm("Deseja ir direto para a lista de Trackers?"))
        window.location.replace("https://torrentz.eu" + document.getElementsByClassName('trackers')[0].getElementsByTagName('p')[0].getElementsByTagName('a')[0].getAttribute('href'));
}

function thepiratebay_sx() {
	var a = document.getElementById('details').getElementsByClassName('col2')[0];
	var hash = a.innerHTML.substring(a.innerHTML.lastIndexOf("</dd>")+5, a.innerHTML.length);
	hash = hash.substring(hash.lastIndexOf(" ")+1, hash.length-1);
	var html = a.innerHTML.substring(0, a.innerHTML.lastIndexOf("</dd>")+5);
	a.innerHTML = html+"<a target='_blank' href='http://torrentz.eu/"+hash+"'>"+hash+"</a>";
    return;
}

function filmestorrents_net_br() {
    var BtnDownload = document.getElementById('t2Tab1').getElementsByClassName('bt-download-interna')[0];
    var hash = BtnDownload.getElementsByTagName('a')[0].getAttribute('href').substring(20, BtnDownload.getElementsByTagName('a')[0].getAttribute('href').lastIndexOf("&dn"));
    BtnDownload.style.width = BtnDownload.style.height = 'auto';
    BtnDownload.style.float = 'center';
    BtnDownload.innerHTML = BtnDownload.innerHTML + "</br><a target='_blank' href='http://torrentz.eu/" + hash + "'><i class='icon-download'></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Trackers</a>";
    return;
}