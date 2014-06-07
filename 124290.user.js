
// ==UserScript==
// @name           Neoquest attacker
// @namespace      http://userscripts.org/users/useridnumber
// @include        http://www.neopets.com/games/neoquest/*
// ==/UserScript==
var neoquest=document.body.innerHTML.split('NeoQuest is brought to you by')[1];
var health=eval(neoquest.split('Health: <b>')[1].split(' <img')[0].replace('</b>',''));
if(neoquest.search('to see what you found')!=-1){

        location.href='http://www.neopets.com/games/neoquest/neoquest.phtml';

}

for(i=0;i<document.forms.length;i++){
               
    if(document.forms[i].elements[0].value=="Click here to return to the map"){

                         document.forms[i].submit();
    }
}

if(neoquest.search('navarrows.gif')!=-1){

        location.href='http://www.neopets.com/games/neoquest/neoquest.phtml?action=move&movedir=';
        
}

if(neoquest.search('to begin the fight')!=-1){

        location.href='http://www.neopets.com/games/neoquest/neoquest.phtml';

}

 }else if(curHealth/maxHealth < 0.50){           
                for(i=0;i<potionList.length;i++){
                        potionCount+=potionList[i][0];
                        if (!curDamage<potionList[i][0]){
                                if((i+1<potionList.length)&&(curDamage<2.5*potionList[i+1][0])){
                                        curHeal = potionList[i+1][0];
                                        i=potionList.length;
                                        
                                }
                                else{
                                        curHeal = potionList[i][0];
                                        i=potionList.length;
                                }
                        }
                }
        
        }
}else if(neoquest.search('Cast Absorption')!=-1){

        location.href="javascript:setdata('special', 4003)";
        
}else if(neoquest.search('Attack')!=-1){

        location.href="javascript:setdata('attack', 0);";

}else if(neoquest.search('Do nothing')!=-1){

        location.href="javascript:setdata('noop', 0);";
        
}
