// ==UserScript==
// @author       Herrjeanke
// @namespace    http://userscripts.org/users/64220/scripts
// @name         Herrjeanke_RemainingTime_V2_timerscript.js
// @description  This code can not be used
// ==/UserScript==

function display(){	
	s-=1;
	if (s<0){
		m-=1;
			if (m<0){
				h-=1;
				if (h<0){
					window.location.reload();
				}
				m=59;
			}
		s=59;
	}
	var t = '';
	var t = h + ':';
	if(m < 10){t += '0';}
	t += m + ':';
	if(s < 10){t += '0';}
	t += s;	
	
	//document.getElementById('timer0').innerHTML = t ;	
	
	var pointer, newelement, oldelement;
	pointer = document.getElementById('timer0');
	
	oldelement = document.getElementById('afteller');
	if(oldelement){
		oldelement.parentNode.removeChild(oldelement);
	}
	
	newelement = document.createElement('span');
	newelement.id='afteller';
	newelement.innerHTML = t + " "; 
	pointer.parentNode.insertBefore(newelement,pointer);
	
	
	setTimeout('display()',1000);
}
display();