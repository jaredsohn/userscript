// ==UserScript==
// @name           Last.fm Artist Info
// @namespace      http://www.last.fm
// @description    If artist information is not found on you native language, English information is shown instead, like in old Last.FM
// @include        http://www.lastfm.*/music/*
// @exclude        http://www.lastfm.*/music/*/*
// @exclude        http://www.lastfm.*/music/*/*/*
// @exclude        http://www.lastfm.*/music/*/*/*/*
// @author         Cüneyt Aliustaoğlu
// ==/UserScript==


strInfo= document.getElementById('wikiAbstract').innerHTML;

if (strInfo.indexOf('messageBox')>0) //eğer sanatçı bilgileri mevcut değilse
{

//Hangi sanatçının sayfasında olduğumuz bilgisini al
adres=(window.location.href);
artistadi=adres.substr(adres.lastIndexOf("/")+1);
yukle();

}

window.fazlaGoster=function()
{
	//window.info_summary.innerHTML=window.info_fulltext.innerHTML;
	window.wikiAbstract.removeChild(document.getElementById('spn_info_summary'));
	window.wikiAbstract.appendChild(window.info_fulltext);
}
window.azGoster=function()
{
	window.wikiAbstract.removeChild(document.getElementById('spn_info_fulltext'));
	window.wikiAbstract.appendChild(window.info_summary);
}

function yukle()
{
	GM_xmlhttpRequest(
        {
	    method: 'GET',
	    url: 'http://ws.audioscrobbler.com/2.0/artist/' + artistadi + '/info.xml',
	    headers: {
	        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	        'Accept': 'application/atom+xml,application/xml,text/xml',
	    },
	    onload: function(responseDetails) 
	    {

		 var parser = new DOMParser();
		 var dom = parser.parseFromString(responseDetails.responseText,"application/xml");
		 var entries = dom.getElementsByTagName('bio');
		 var icerik;

		window.wikiAbstract= document.getElementById('wikiAbstract');
		window.info_summary= document.createElement('span');
		window.info_summary.id='spn_info_summary';
		window.info_summary.innerHTML= entries[0].getElementsByTagName('summary')[0].textContent + "<br>&nbsp;<br>";

		window.info_fulltext=document.createElement('span');
		window.info_fulltext.id='spn_info_fulltext';
		window.info_fulltext.innerHTML=entries[0].getElementsByTagName('content')[0].textContent + "<br>&nbsp;<br>";

		window.btn_readmore= document.createElement('a');
		window.btn_readmore.innerHTML='Read more...';
		window.btn_readmore.addEventListener('click',fazlaGoster,false)
		window.btn_readmore.style.cursor= 'pointer';

		window.btn_readless= document.createElement('a');
		window.btn_readless.innerHTML='Read less...';
		window.btn_readless.addEventListener('click',azGoster,false)
		window.btn_readless.style.cursor= 'pointer';

		window.info_summary.appendChild(btn_readmore);
		window.info_fulltext.appendChild(btn_readless);

		window.wikiAbstract.appendChild(info_summary);

	    }
	});
}