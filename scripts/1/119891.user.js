// ==UserScript==
// @name           The-West Info+
// @author      Blood Killer
// @include        http://*.the-west.*
// @version        1.0
// ==/UserScript==

new function(){
setTimeout('var cash_value=document.getElementById("cash").innerHTML;'+
                    'var deposit_value=document.getElementById("deposit").innerHTML;'+
                    'var val1=+cash_value;'+
                    'var val2=+deposit_value;'+
                    'var total=eval(val1+val2);'+
                    'document.getElementById("character_money_text").innerHTML="Stav účtu:   "+total+" $";', 2000);

setInterval('var cash_value=document.getElementById("cash").innerHTML;'+
                   'var deposit_value=document.getElementById("deposit").innerHTML;'+
                   'var val1=+cash_value;'+
                   'var val2=+deposit_value;'+
                   'var total=eval(val1+val2);'+
                   'document.getElementById("character_money_text").innerHTML="Stav účtu:   "+total+" $";', 2100);
};

new function(){
setTimeout('var actual_experience=(document.getElementById("experience_text").innerHTML).split(" / ")[0];'+
                    'var max_experience=(document.getElementById("experience_text").innerHTML).split(" / ")[1];'+
                    'var val3=+actual_experience;'+
                    'var val4=+max_experience;'+
                    'var missing=eval(val4-val3);'+
                    'document.getElementById("experience_text").innerHTML=actual_experience+" / "+max_experience+" (-"+missing+")";', 2000);

setInterval('var actual_experience=(document.getElementById("experience_text").innerHTML).split(" / ")[0];'+
                   'var max_experience=((document.getElementById("experience_text").innerHTML).split(" / ")[1]).split(" (")[0];'+
                   'var val3=actual_experience;'+
                   'var val4=max_experience;'+
                   'var missing=eval(val4-val3);'+
                   'document.getElementById("experience_text").innerHTML=actual_experience+" / "+max_experience+" (-"+missing+")";', 2100);
};