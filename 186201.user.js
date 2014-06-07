// ==UserScript==
// @name           Orkut Ignorar
// @description    Ignorar gente chata no Orkut
// @include        http://www.orkut.com.br/*
// ==/UserScript==

var uid = new Array(
    "9014813248517595870",
    "17849270933197230144",
    "13077133829287558700",
    "427522270730090861"
);


function procurarTopicosePostagens() {
    var urls = document.getElementsByClassName("EHB");
    
    if (urls.length == 0) {
        urls = document.getElementsByClassName("FRB");
    }
    
    for (j = 0; j < urls.length; j++) {
       for (k = 0; k < uid.length; k++) {
            if (urls[j].innerHTML.search(uid[k]) != -1) {
                urls[j].parentNode.parentNode.style.display = "none";
                
                break;
            }
       }
    }
}

var procurar_topico = setInterval(procurarTopicosePostagens, 150);