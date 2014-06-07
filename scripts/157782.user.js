// ==UserScript==
// @name        Adopte Un Mec - Autovisit
// @namespace   SuxxA
// @description aup
// @include     http://www.adopteunmec.com/*
// @version     1.4
// @run-at        document-end
// by suxxa & brouette
// ==/UserScript==

var myIdPage = document.querySelector('#my-page > a:nth-child(1)').href,
    rOnProfil = new RegExp("profile"),
    rOnSearch = new RegExp("mySearch"),
    rIdPage   = new RegExp("[0-9]{1,2}","g"),
    idPageSearch = parseInt(rIdPage.exec(window.location.href));
   
// Ouverture des onglets depuis la page Recherche (ex: http://www.adopteunmec.com/mySearch/?page=1)
function aff(){   
    var allChicks= document.getElementsByClassName('person large');
    for (var i =0, len= allChicks.length; i< len ;i++)
        window.open("http://www.adopteunmec.com/profile/"+allChicks[i].getAttribute("data-id"));
       
    window.open("http://www.adopteunmec.com/mySearch/?page="+(idPageSearch+1));
}   
       
// Fermeture des profiles si on se trouve avec dans l'url le mot "profile" & que nous ne sommes pas dans le notre
if (myIdPage != window.location.href && rOnProfil.test(window.location.pathname)){
    setTimeout(function aa() {cls(); }, 500, this)
    function cls(){
        window.open('about:blank','_parent','');
        window.close();
    }
}
else if(rOnSearch.test(window.location.pathname)) // Affichage du bouton de recherche
{
    // DOM : Ajout d'éléments en haut à gauche de la page + stylisation
    var sContainer = document.createElement('div'),
        sDoTheStuff = document.createElement('img');

    document.body.style.backgroundImage = "url('http://images2.layoutsparks.com/1/198896/leopard-skin-original-spotted-31000.gif')";

    sDoTheStuff.id = 'itsatrap';
    sDoTheStuff.src = 'http://userserve-ak.last.fm/serve/64/86880359.png';
    sDoTheStuff.title = 'DO IT §§';
    sDoTheStuff.style.cursor = 'pointer';

    sContainer.style.position= 'fixed';
    sContainer.style.top= '0px';
    sContainer.style.left= '0px';
    sContainer.style.backgroundColor = 'rgba(42, 42, 42, 0.75)';
    sContainer.style.border= '1px solid grey';
    sContainer.style.padding= '5px';
    sContainer.style.zIndex= '1337';

    document.body.appendChild(sContainer);
    sContainer.appendChild(sDoTheStuff);
   
    // OnClick sur l'image lance la moulinette
    document.getElementById("itsatrap").addEventListener("click", function(event)
    {
        this.src = "http://i.imgur.com/qb388zF.gif";
        aff();
    }, true);
}