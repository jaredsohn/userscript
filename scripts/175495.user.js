// ==UserScript==
// @name       Pokemon RPG Online Battle Script
// @version    1.2.0
// @description  Easy scripts for battle
// @copyright Bit Bytes Team
// @author laurenceHR
// @match *ori.pokemonrpgonline.com/bin/*
// ==/UserScript==

console.log('########################## Pokemon RPG Online Battle Script ###############################');

//////////// ADD jQuery & Script //////////////////////////////////
function addJS(js){
	//if(js==null){ js = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';}
	var d = document;var s = d.createElement("script");s.type="text/javascript";s.src=js;
	var h = d.getElementsByTagName("head")[0];
	h || (h=d.body.parentNode.appendChild(d.createElement("head")));h.appendChild(s);
}
// exec function
//addJS('http://daxes.host22.com/PRO/js/main.js'); //add PRO Script
addJS('http://dl.dropboxusercontent.com/s/k6j2qhexwsr2sp0/main.js');
//////////////////////////////////////////////////////
