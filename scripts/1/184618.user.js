// ==UserScript==
// @name        ENT_UBO
// @namespace   http://userscripts.org/users/64230
// @description CocheAutomatiqueEmploiDuTemps
// @include     https://ent.univ-brest.fr/ade/standard/projects.jsp
// @include     https://cas.univ-brest.fr/cas/login?service=https://ent.univ-brest.fr/Login
// @version     1
// @grant       none
// ==/UserScript==

if(document.URL == "https://cas.univ-brest.fr/cas/login?service=https://ent.univ-brest.fr/Login"){

    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent("click", true, true, window,0, 0, 0, 0, 0, false, false, false, false, 0, null);
    



    var formName = document.getElementById("fm1");
    var bouttonName = document.getElementsByTagName("input");
    var button;
    var monButton;
    for (var i = 0; i < bouttonName.length; i++){
        button = bouttonName[i].getAttribute("value");
        if(button == "Se connecter"){
            monButton = bouttonName[i];
        }
    }
    var identifiantChamp = document.getElementById("username");
    var pwdChamp = document.getElementById("password");
    
    
    // init champ
    identifiantChamp.setAttribute("value","******");
    pwdChamp.setAttribute("value","******");
    
    monButton.dispatchEvent(evt);
}



if(document.URL == "https://ent.univ-brest.fr/ade/standard/projects.jsp"){
    var selectList = document.getElementsByTagName("option");
    //alert(selectList.length);
    var ecoleNum;
    for (var i = 0; i < selectList.length; i++){
    
        ecoleNum = selectList[i].getAttribute("value");
        //alert(ecoleNum);
        
        
        if(ecoleNum == 43){
            selectList[i].setAttribute("selected","selected");
        }
    }
}
//document.location='tree.jsp?category=trainee&expand=false&forceLoad=false&reload=false&scroll=0';