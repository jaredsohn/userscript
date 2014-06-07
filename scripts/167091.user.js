// ==UserScript==
// @name                        JV Color Topic
// @namespace                   Matt' & Naptu
// @description                 Transforme l'icône des topics en fonction des messages
// @include                     http://www.jeuxvideo.com/forums/*
// @include                     http://*.forumjv.com/*
// @include                     http://www.jeuxvideo.com/forums/0-*-0-1-0-1-2-*.htm
// @version                     1.1
// ==/UserScript==

function colorT() {
    var array = [], array2 = [], td = 3, wut, x = 0, arrNb = 0, tdNb = 0, c = 0, utpan, tdF, tdsuiv,
        modero = document.getElementsByClassName('col_moder')[0],    	
    	tdER   = 'http://image.jeuxvideo.com/pics/forums/topic_marque_off.gif',
        tdB    = 'http://image.jeuxvideo.com/pics/forums/topic_cadenas.gif',
    	tdEV   = 'http://image.jeuxvideo.com/pics/forums/topic_marque_on.gif';
    
    if(modero == undefined) {
        td = 3;
        tdsuiv = 5;
    } else {
        td = 4;
        tdsuiv = 6;
    }  
  
    while(x <= 24) {
        wut = document.getElementById('liste_topics').getElementsByTagName('td')[td];
        if(modero == undefined) {
            utpan = document.getElementById('liste_topics').getElementsByTagName('img')[x];
            	} else {
            utpan = document.getElementById('liste_topics').getElementsByTagName('img')[c]; 
        }
       	utpan =	utpan.getAttribute('src');
       	td = td + tdsuiv;
        c = c + 2;
       	array.push(wut.textContent);
       	array2.push(utpan);
       	x++;
   	}
	
   	while(arrNb <= 24) {
       	if(array[arrNb] >= 100) 
		{
           	tdF = document.getElementById('liste_topics').getElementsByTagName('td')[tdNb].innerHTML = '<img src="http://image.noelshack.com/fichiers/2013/03/1358607603-dossier3.gif" alt>';
       	} 
		if(array[arrNb] >= 1000) 
		{
           	tdF = document.getElementById('liste_topics').getElementsByTagName('td')[tdNb].innerHTML = '<img src="http://image.noelshack.com/fichiers/2013/03/1358607608-dossier4.gif" alt>';
       	} 
		if(array[arrNb] >= 50000) 
		{
           	tdF = document.getElementById('liste_topics').getElementsByTagName('td')[tdNb].innerHTML = '<img src="http://image.noelshack.com/fichiers/2013/03/1358607614-dossier5.gif" alt>';
       	} 
       	if(array2[arrNb] == tdEV) 
		{
           	tdF = document.getElementById('liste_topics').getElementsByTagName('td')[tdNb].innerHTML = '<img src="'+ tdEV +'" alt>';
       	}
       	if(array2[arrNb] == tdER) 
		{
           	tdF = document.getElementById('liste_topics').getElementsByTagName('td')[tdNb].innerHTML = '<img src="'+ tdER +'" alt>';
       	}
       	if(array2[arrNb] == tdB) 
		{
           	tdF = document.getElementById('liste_topics').getElementsByTagName('td')[tdNb].innerHTML = '<img src="'+ tdB +'" alt>';
       	}
       	tdNb = tdNb + tdsuiv;
       	arrNb++;
   	}
}

colorT();