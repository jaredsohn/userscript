// ==UserScript==
// @name        Girlshop
// @description aup
// @include     *girlshop.it/*
// @version     1.4
// @run-at        document-end
// by chobeat
// ==/UserScript==

    rOnProfil = new RegExp("Cliente"),
    rOnSearch = new RegExp("Clienti"),
    rIdPage   = new RegExp("/\d+$/");
   
function aff(){   
    var allChicks= $(".listimage a")
   allChicks.each(function(){

        window.open("http://girlshop.it/"+$(this).attr("href"));
    })
  
    console.log(window.location.href)
    
    console.log(rIdPage.exec(window.location.href))
    idString=window.location.href.match(/([0-9]+)$/)
    if(idString)
    idPageSearch = parseInt(idString[0]);
   	else
        idPageSearch=0
   if(allChicks.length >0)window.open("http://girlshop.it/Clienti?city=Milano&&p="+(idPageSearch+1),"_blank");
}   
       
if (rOnProfil.test(window.location.pathname)){
    setTimeout(function aa() {cls(); }, 500, this)
    function cls(){
        window.open('about:blank','_parent','');
        window.close();
    }
}
else if(rOnSearch.test(window.location.pathname)) 
{la page + stylisation
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
     setTimeout(function(){  document.getElementById("itsatrap").click(); window.close();},4000)
     
}