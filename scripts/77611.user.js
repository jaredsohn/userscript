// ==UserScript==
// @name           Training Assistant
// @namespace      http://goallineblitz.com/game/
// @description    A script that tries to make it easier to choose training tactics.
// @include        http://goallineblitz.com/game/training.pl?player_id=*
// @copyright	   2010, garrettFoster
// @version	       2010.05.25.1
// ==/UserScript==

window.setTimeout(main,10); //needed by greasemonkey to start

function main(){
	console.log('script started');
	var option = document.getElementById('training1_intense').getElementsByTagName('option');
	document.getElementById('training1_intense').style.width = '400px';
	setSp(option,1);	
	option = document.getElementById('training1_normal').getElementsByTagName('option');
	document.getElementById('training1_normal').style.width = '400px';
	setSp(option,2);
	option = document.getElementById('training1_light').getElementsByTagName('option');
	document.getElementById('training1_light').style.width = '400px';
	setSp(option,3);
	update();
	var select = document.getElementsByTagName('select');
	for(i=3;i<select.length;i++){
	    select[i].addEventListener('click',update,false);
    }	
}

function update(){	
    console.log('update');
	var option = document.getElementById('training1_multi').getElementsByTagName('option');
	document.getElementById('training1_multi').style.width = '400px';
	setSp(option,0);
	option = document.getElementById('training2').getElementsByTagName('option');
	document.getElementById('training2').style.width = '500px';
	setSp(option,2);
}

function setSp(option,bonusTokens){
	for(var i=0;i<option.length;i++){
		if(option[i].innerHTML == 'none'){
		    continue;
	    }
		var percent = parseInt(option[i].innerHTML.split('+')[1].split('%')[0]);
		var spToRaise = 1;
		var stat = document.getElementsByClassName('stat_head_tall');
		var statName = option[i].innerHTML.split(' ')[0];
		for(var j=0;j<stat.length;j++){			
			if(stat[j].innerHTML.split(':')[0] == statName){
				var sp = parseFloat(stat[j].nextSibling.innerHTML);
				spToRaise = parseInt(Math.exp(.0003 * Math.pow(sp, 2)));
				break;
			}
		}
		var spGained = (percent/100)*spToRaise+(bonusTokens/12);
		
		//write to option
		
		var txt = option[i].innerHTML.split(')')[0];
		option[i].innerHTML = txt + ') >> ' + spGained.toFixed(2) + 'sp gained';
	}
}
			
