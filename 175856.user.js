// ==UserScript==
// @name        Adotta un ragazzo autovisit
// @namespace   chb
// @include     http://www.adottaunragazzo.it/*
// @version     1.1
// @run-at        document-end
// by chobeat
// ==/UserScript==

var myIdPage = document.querySelector('#my-page > a:nth-child(1)').href,
    rOnProfil = new RegExp("profile"),
    rOnSearch = new RegExp("mySearch"),
    rIdPage   = new RegExp("[0-9]{1,2}","g"),
   
    idPageSearch = parseInt(rIdPage.exec(window.location.href));
   
function aff(){   
    var allChicks= document.getElementsByClassName('person large');
    for (var i =0, len= allChicks.length; i< len ;i++)
        window.open("http://www.adottaunragazzo.it/profile/"+allChicks[i].getAttribute("data-id"),"_blank");
    
  
    if(allChicks.length >0)window.open("http://www.adottaunragazzo.it/mySearch/?page="+(idPageSearch+1),"_blank");
}   
console.log(window.location.pathname)
       
if (myIdPage != window.location.href && rOnProfil.test(window.location.pathname)){
    setTimeout(function aa() {cls(); },1500, this)
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
   
    document.getElementById("itsatrap").addEventListener("click", function(event)
    {
        this.src = "http://i.imgur.com/qb388zF.gif";
        aff();
    }, true);
    str=window.location.href
    console.log("ricerca"+str)
    console.log("lastchar"+str.charAt( str.length-1))
    if(str.charAt( str.length-1)!=1){
    setTimeout(function(){  document.getElementById("itsatrap").click(); window.close();},6000)
    }
}
    
    else if(window.location.pathname=="/"){
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
     document.getElementById("itsatrap").addEventListener("click", function(event)
    {
        this.src = "http://i.imgur.com/qb388zF.gif";
        for(i=0;i<50;i++){
            setTimeout(function(){ 
                window.open(document.querySelector('#zapped-one > div > div > a').href,"_blank");
                document.getElementById("zapping-next").click();},
                       i*2*1000)
        }
    }, true);
        
    }