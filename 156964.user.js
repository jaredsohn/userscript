// ==UserScript==
// @name Outlook Title Emails
// @description View title of emails in Outlook.com
// @author Tafarel Carvalho
// @include http*://*.mail.live.com/*
// @version 3.3
// ==/UserScript==

//var firstTitle=document.title;

function main() {
  
	var boxEmails,froms,subjects,element,flag,texto,area;

	boxEmails=document;
	
	//from
	area=boxEmails.getElementsByClassName('Fm');
	for(var iArea=0; iArea<area.length; ++iArea) { //percorre a area para o evento
			
		texto=area[iArea].getElementsByClassName('t_qtc');
		
		element = texto[0].getElementsByTagName('span')[0];
		try {
			flag=element.getAttribute('email');
			if(flag) {
				area[iArea].setAttribute('title',' ' + element.innerHTML + ' ');
			}
		}
		catch (err) {}
	}
	
	//subject
	subjects=boxEmails.getElementsByClassName('Sb');
	for(var iArea=0; iArea<subjects.length; ++iArea) { //percorre a area para o evento

	    area=subjects[iArea];
	    texto=area.getElementsByTagName('a')[0].innerHTML;
	    var regex = /(<([^>]+)>)/ig;
	    texto=texto.replace(regex,'');
	    area.setAttribute('title',texto);
	    //area.setAttribute('onclick','document.title="Outlook - '+texto+'";');
	    
	}
	
	//document.getElementsByClassName('g_close')[0].setAttribute('onclick','document.title="'+firstTitle+'";');
}

setInterval(function(){main()},6000);
