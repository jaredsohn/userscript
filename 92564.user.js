// ==UserScript==
// @name           titulky.com mod
// @author         Sigi_cz
// @version        1.1.1
// @description    see below
// @namespace      http://www.titulky.com
// @include        http://www.titulky.com/*
// @include        http://premium.titulky.com/*
// ==/UserScript==

/*
ispired by nohajc http://userscripts.org/scripts/show/79561
description:
stahovani zacne automaticky
vytvori linky pro stahnuti titulku primo ve vysledcich hledani
umoznuje "stahovat" i z premium webu (stahuje se porad z bezneho webu, ne z premium, ale dl funguje)
*/

function onClick(elm, func) { (typeof elm === 'string' ? $('#'+elm) : elm).addEventListener('click', func, false); }

function checkLink(){
// try click idown iframe download link

	if(document.getElementById('downdiv').style.display!='block')
		setTimeout(checkLink,1000);
	else{
		document.location=document.getElementById('downlink').getAttribute('href');
	}
}

function formatIdown(){
// format idown iframe

	var idn=document.getElementById('idown');
	idn.style.display='block';
	idn.style.height='105px';
	idn.style.width='612px';
	idn.style.border='1px dotted grey';
}

function xOpenDownload(id,zip,hs){
// load idown iframe content

	var Stamp=new Date();
	var odkaz='http://www.titulky.com/idown.php?R='+Stamp.getTime()+'&titulky='+id+'&zip='+zip+'&histstamp='+hs;
	document.documentElement.scrollTop=0;
	document.getElementById('idown').src=odkaz;
}

function process(){
	if(document.location.href.indexOf('idown.php')>-1){
	// idown iframe have content -> download

		if(document.forms[0]) document.forms[0].elements[0].focus();
		setTimeout(checkLink,1000);
	}
	else if(document.getElementById('idown')){
	// idown iframe exists -> subtitle details page

		var id=0;
		if(document.getElementById('opendown')){
		// opendown exists -> normal page

			var ipt=document.getElementsByTagName('input');
			for(i=0;i<ipt.length;i++){
				if(ipt[i].getAttribute('name')=='film'){
					id=ipt[i].getAttribute('value');
					break;
				}
			}
		}
		else{
		// opendown don't exists -> premium page

			var lnkk=document.getElementById('contcont').getElementsByTagName('a');
			for(i=0;i<lnkk.length;i++){
				if(lnkk[i].getAttribute('class')=='titulkydownloadajax'){
					lnkk[i].id='opendown';
					id=lnkk[i].getAttribute('href').split('&titulky=');
					id=id[1].split('&zip')[0];
					break;
				}
			}

		}

		if(id!=0){
		// id obtained > create download element

			var dll=document.getElementById('opendown');
			var newopendown=document.createElement('a');
			newopendown.innerHTML='Download';
			newopendown.href='javascript:void(0)';
			newopendown.id='opendown';
			newopendown.style.color='blue';
			dll.parentNode.replaceChild(newopendown, dll);
			onClick(newopendown, function(){ formatIdown(); xOpenDownload(id,'z',''); });
		}

	}
	else{
	// idown iframe don't exists -> subtitles list

		// create idown iframe
		var cwr=document.getElementById('contwrap');
		var dlb=document.createElement('div');
		dlb.innerHTML='<div id="downinfo"></div><iframe id="idown" frameborder="0"></iframe>';
		cwr.insertBefore(dlb,cwr.firstChild);

		// modify results table
		var id, release, iconn='<img src="img/ico/rel.gif" atl="release"/>';
		var trow=cwr.getElementsByTagName('tr');
		for(i=0;i<trow.length;i++){
			if(trow[i].getAttribute('class')=='row1' || trow[i].getAttribute('class')=='row2'){
				id=trow[i].cells[0].lastChild.getAttribute('href').split('-');
				id=id[id.length-1].split('.')[0];

				release=trow[i].cells[1].childNodes.length==0?'':trow[i].cells[1].firstChild.getAttribute('title');

				trow[i].cells[1].innerHTML='<a title="download '+release+'" href="javascript:void(0)">'+iconn+'</a>';
				onClick(trow[i].cells[1], function(){ formatIdown(); xOpenDownload(id,'z',''); });
			}
			else if(trow[i].getAttribute("class")=="row_head"){
				trow[i].cells[1].innerHTML="Download"
			}
		}
	}

}

document.addEventListener('load',process(),false);
