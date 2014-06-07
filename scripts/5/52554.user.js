// ==UserScript==
// @name           HWM_Arcomage_Notify
// @namespace      http://diveintogreasemonkey.org/download/
// @description    HWM_Arcomage_Notify
// @include        http://www.heroeswm.ru/tavern.php*
// 
// ==/UserScript==

//
// ========================================================
//var hunt_icon = 'i/top/line/lapa.gif';
var hunt_icon = 'i/top/line/cards.gif';


var all_td_Elements, this_td_Element;
all_td_Elements = document.getElementsByTagName('td');
	//alert("found " + all_td_Elements.length + "  TD elements!");

// Write YOUR path to file below	
var snd_url = "file://localhost/E:/temp/hwm_sound1/hwm_sound1.html";


function addSndWin(){
	//window.open(snd_url, "_blank", "alwaysLowered=yes");
	var w = window.open(snd_url, "_blank");
	//window.focus();
}

/**/
for (var i = 0; i < all_td_Elements.length; i++) {
    this_td_Element = all_td_Elements[i];
    
	if(this_td_Element.innerHTML.indexOf(hunt_icon) != -1  ) {		
		
		addSndWin();		
				
		break;		
	}	
}





// ========================================================