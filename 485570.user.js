// ==UserScript==
// @name           JVBalance
// @author         keywc
// @description    JVBalance pour le forum minecraft
// @version        1.2
// @include        http://www.jeuxvideo.com/forums/*
// @grant          none
// ==/UserScript==

if(localStorage.getItem('jvbalance') == 'undefined' || localStorage.getItem('jvbalance') == null)
{
	localStorage.setItem('jvbalance', prompt('Collez ici le formulaire de réponse du topic de modération').split('#')[0]);
	location.reload(true);
}

var topicBalance = localStorage.getItem('jvbalance');

function checkMate() {
    try {
        if(document.URL.split('&').length > 1) {
            document.getElementById('newmessage').value = document.URL.split('&')[1] + '\n\n';
            window.location.hash = '#form_post';
        }
    } catch(e) {
        setTimeout(checkMate, 100);
    }
}
checkMate();

var len = document.getElementsByClassName('date').length;
for(var i=0;i<len;i++) {
        
    var boutonBalance = document.createElement('a');
    boutonBalance.title = "Balancer";
    boutonBalance.style.paddingLeft = '3px';
    // nique firefox qui rend mon code moche pour qu'il fonctionne
    if(document.URL.contains('#form_post')) {
        var numero = document.getElementsByClassName('date')[i].lastChild.href.split('&')[4].replace('numero=', '');
        var url = document.URL.replace('/forums/1-', '/forums/3-').replace('#form_post', '#message_' + numero);
    } else {
        var url = document.getElementsByClassName('ancre')[i].firstChild.href
    }
    boutonBalance.href = topicBalance + '#&' + url;
    
    var imageBalance = document.createElement('img');
    imageBalance.width = 11;
    imageBalance.height = 12;
    imageBalance.alt = "Balancer ce membre";
    imageBalance.src = "http://puu.sh/8pkSI.gif";
    imageBalance.addEventListener('contextmenu', function(ev) {
        ev.preventDefault();
	    localStorage.setItem('jvbalance', prompt('Collez ici le formulaire de réponse du topic de modération').split('#')[0]);
		location.reload(true);
        return false;
    }, false);
    
    boutonBalance.appendChild(imageBalance);
    
    try {
       document.getElementsByClassName('date')[i].appendChild(boutonBalance);
    } catch(e) {}
}
