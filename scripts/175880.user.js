// ==UserScript==
// @name           Neoquest attacker
// @namespace      http://userscripts.org/users/useridnumber
// @include        http://www.neopets.com/games/neoquest/*
// ==/UserScript==
function pausecomp(millis)
 {
  var date = new Date();
  var curDate = null;
  do { curDate = new Date(); }
  while(curDate-date < millis);
}

var neoquest=document.body.innerHTML.split('NeoQuest is brought to you by')[1];
var health=eval(neoquest.split('Health: <b>')[1].split(' <img')[0].replace('</b>',''));
if(neoquest.search('to see what you found')!=-1){
    pausecomp(Math.random()*500);
	location.href='http://www.neopets.com/games/neoquest/neoquest.phtml';

}

for(i=0;i<document.forms.length;i++){
               
    if(document.forms[i].elements[0].value=="Click here to return to the map"){

                         document.forms[i].submit();
    }
}

if(neoquest.search('navarrows.gif')!=-1){
    pausecomp(Math.random()*500);
	location.href='http://www.neopets.com/games/neoquest/neoquest.phtml?action=move&movedir=';
	
}

if(neoquest.search('to begin the fight')!=-1){
    pausecomp(Math.random()*500);
	location.href='http://www.neopets.com/games/neoquest/neoquest.phtml';

}


if(health<(0.5)&&((neoquest.search('Spirit of Growth')!=-1)||(neoquest.search('Healing Potion')!=-1))){

	if(neoquest.search('Spirit of Growth')!=-1){
				 	
		location.href="javascript:setdata('special',200019);";

	}else if(neoquest.search('Standard Healing Potion')!=-1){
		 
		 location.href="javascript:setdata('item', 220001);";//replace with pot id
	
	}
	else if(neoquest.search('Strong Healing Potion')!=-1){
		 
		 location.href="javascript:setdata('item', 220002);";//replace with pot id
	
	}
}else if(neoquest.search('Cast Absorption')!=-1){

	location.href="javascript:setdata('special', 4003)";
	
}else if(neoquest.search('Attack')!=-1){

	location.href="javascript:setdata('attack', 0);";

}else if(neoquest.search('Do nothing')!=-1){

	location.href="javascript:setdata('noop', 0);";
	
}
