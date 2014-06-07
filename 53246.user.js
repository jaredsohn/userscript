// ==UserScript==
// @name           xchat.cz - idle time
// @version        0.3
// @description    Prida na sklo velky cas neaktivity
// @homepage       http://Kub4jz.cz

// @include http://*xchat.centrum.cz/*/modchat?op=startframe&rid=*
// @exclude http://*xchat.centrum.cz/*/modchat?op=startframe*&wfrom=*
// ==/UserScript==

// vytvorime velky cas
var div_idle_time = document.createElement('div');
div_idle_time.setAttribute('id', 'idle_time_id');
document.getElementsByTagName("body")[0].appendChild(div_idle_time);

// nastylujeme
div_idle_time.style.color = '#888';
div_idle_time.style.fontSize = '100px';
div_idle_time.style.fontFamily = 'Arial';

div_idle_time.style.position = 'fixed';
div_idle_time.style.right = '8px';
div_idle_time.style.bottom = '-10px';
div_idle_time.style.zIndex = '100';
div_idle_time.style.opacity = '0.2';

function reload(event){
	// zjistit idle time
	idle_time = parent.parent.frames[2].document.getElementById("idle").innerHTML;
	
	// nastavime dalsi obnoveni
	refresh = parent.parent.frames[2].document.getElementById("refresh").innerHTML;
	refresh = refresh * 1000;
	window.setTimeout(reload, refresh);

	var mins = idle_time.substring(0, 2);
	var secs = idle_time.substring(3, 5);
	
	// nastylujeme podle doby neaktivity
	if(mins >= 4){	// pokud jsme nemluvili dele jak 4 minuty, text bude cerveny
	
		div_idle_time.style.color = 'red';
		
	}else	if(mins >= 15){	// pokud jsi nemluvil/a dele jak 15 minut, text bude jeste cervenejsi
	
		div_idle_time.style.color = 'red';
		div_idle_time.style.opacity = '1';
		
	}else {
	
		div_idle_time.style.color = '#888';
		div_idle_time.style.opacity = '0.2';
		
	}
	
	// vypiseme
	div_idle_time.innerHTML = mins+':'+secs;
}

reload();