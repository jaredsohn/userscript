// ==UserScript==
// @name           Travian Totalny Ignorant
// @include        http://forum.travian.pl/*
// ==/UserScript==

(function() {
    var allT; 
    var allR;
    var plonk = new Array(); 
    
    allT = document.getElementsByTagName('table');
    for (var i = 0; i < allT.length; i++) {
        if(allT[i].innerHTML.match(/Ta wiadomość jest ukryta, ponieważ <strong>(\w+)<\/strong> jest na Twojej <a href=\"profile/)){
            allT[i].style.display="none";
            
            //Dodaje ignorowanego użytkownika do listy ignorowanych
            plonk[RegExp.$1] = RegExp.$1;
            }
        }

// usuwa posty cytujące ignorowanego
    for (var i = 0; i < allT.length; i++) {
        for (var x in plonk) {
            if(allT[i].innerHTML.match("Napisane przez <strong>"+plonk[x]+"</strong>")){
                allT[i].style.display="none";
                }
            if(allT[i].innerHTML.match("<div>[^]*Ta wiadomość jest ukryta, ponieważ <strong>"+plonk[x]+"<\/strong> jest na Twojej <a href=\"profile")){
            allT[i].style.display="none";
            }
            
            if(allT[i].innerHTML.match("<a.*>"+plonk[x]+"</a>[^]*?<img.*alt=\""+plonk[x])){
            allT[i].style.display="none";
            }
            }
        }


  allR = document.getElementsByTagName('tr');
    // usuwa posty ignorowanego
    for (var i = 0; i < allR.length; i++) {
           for (var x in plonk) {
            if(allR[i].innerHTML.match("<span .*>"+plonk[x]+"</span>")){
                allR[i].style.display="none";
                }
            }
        }

        
})();