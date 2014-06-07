// ==UserScript==
// @name        Leszar
// @namespace   InGame
// @include     http://www.dreadcast.net/Main
// @version     1.03
// @grant       none
// ==/UserScript==



function checkSalle(){
    var x = engine.getMap().getOffsetX();
    var y = engine.getMap().getOffsetY();
//    console.log(x+" "+y);
    if($('#lieu_actuel').text().contains("23 Avenue de l'Ether"))
    {
         $('#zone_quete').css('background-image','url(http://nsa33.casimages.com/img/2014/05/01/140501070935740377.png)');
         $('#zone_inventaire .personnage_image').css('background-image','url()');   
        
        //$('#zone_gauche').css('background-image','url(http://nsa33.casimages.com/img/2014/05/01/140501071515658417.png)'); //1
        $('#zone_gauche').css('background-image','url(http://nsa33.casimages.com/img/2014/05/01/140501072611430802.png)') //2
          
        $('#zone_droite').css('background-image', 'url(http://nsa33.casimages.com/img/2014/05/01/140501073054323378.png)');
        //$('#zone_droite').css('background-image', 'url(http://nsa34.casimages.com/img/2014/05/01/140501073253687366.png)');
        
        if(y <= -14 && y >= -19) //concert
        {
          $('#iframePsycho').css("display","none");
          $('#iframeGallerie').css("display","none");
          $('#iframeErotikPoufs').css("display","none");
          $('#iframeBiblio').css("display","none");
            
          if($('#iframeConcert').css("display") == "none")
          {          
             $('#iframeConcert').css("display","block");    
             var index = Math.floor((Math.random()*6)); 
             $('#iframeConcert').attr("src","https://www.youtube.com/embed/videoseries?list=PLx6qNksJnePyicH4nT5CuetWrGa5K5rna&index="+index+"&rel=0&autoplay=1&loop=1");
          }
            
          $('#carte_fond').css('background-image','url(http://nsa34.casimages.com/img/2014/04/28/140428105721644893.gif)');
        }
        else if(y <= -23) //psycho
        {
          $('#iframeConcert').css("display","none");
          $('#iframeGallerie').css("display","none");
          $('#iframeErotikPoufs').css("display","none");
          $('#iframeBiblio').css("display","none");
          $('#iframeErotikPoufsNord').css("display","none");
          $('#iframeErotikPoufsSud').css("display","none");


          if($('#iframePsycho').css("display") == "none")
          {          
             $('#iframePsycho').css("display","block");    
             var temps = Math.floor((Math.random()*6600)); 
             $('#iframePsycho').attr("src","https://www.youtube.com/embed/2a9jH8yT454?rel=0&autoplay=1&loop=1&playlist=2a9jH8yT454&start="+temps);
          }            
            
            
          if(x <= -18)
          {
             $('#iframePsycho').css("width","99%");
             $('#iframePsycho').css("height","99%");
             $('#iframePsycho').css("position","absolute").css('top','0px');
             $('#carte_fond').css('background-image','url(http://img15.hostingpics.net/pics/689227batLeszar1.png)');
          }
          else
          {
             $('#iframePsycho').css("width","300px");
             $('#iframePsycho').css("height","60px");
             $('#iframePsycho').css("position","absolute").css('top','30px');
             $('#carte_fond').css('background-image','url(http://nsa33.casimages.com/img/2014/04/28/140428102243428972.gif)');
          }
        }
        else if(x == -22 && (y == -8 || y==-9 || y==-10))   //poufs erotik
        {       
          $('#carte_fond').css('background-image','url(http://img15.hostingpics.net/pics/689227batLeszar1.png)');

          $('#iframeConcert').css("display","none");
          $('#iframeGallerie').css("display","none");
          $('#iframePsycho').css("display","none");
          $('#iframeBiblio').css("display","none");
          $('#iframeErotikPoufsNord').css("display","none");
          $('#iframeErotikPoufsSud').css("display","none");

          $('#iframeErotikPoufs').css("display","block");
        }
        else if((x == -20 && (y == -11 || y==-10)) || (x==-21 && y==-10))   //poufs erotik nord
        {       
          $('#carte_fond').css('background-image','url(http://img15.hostingpics.net/pics/689227batLeszar1.png)');

          $('#iframeConcert').css("display","none");
          $('#iframeGallerie').css("display","none");
          $('#iframePsycho').css("display","none");
          $('#iframeBiblio').css("display","none");
          $('#iframeErotikPoufs').css("display","none");
          $('#iframeErotikPoufsSud').css("display","none");        
          
          $('#iframeErotikPoufsNord').css("display","block");
        }
        else if((x == -20 && (y == -8 || y==-7)) || (x==-21 && y==-8))   //poufs erotik sud
        {       
          $('#carte_fond').css('background-image','url(http://img15.hostingpics.net/pics/689227batLeszar1.png)');

          $('#iframeConcert').css("display","none");
          $('#iframeGallerie').css("display","none");
          $('#iframePsycho').css("display","none");
          $('#iframeBiblio').css("display","none");
          $('#iframeErotikPoufsNord').css("display","none");
          $('#iframeErotikPoufs').css("display","none");
    
          $('#iframeErotikPoufsSud').css("display","block");
        }
        else if(x >=-8 && y <= -6 && y >=-11)   //biblio
         {
           $('#carte_fond').css('background-image','url(http://img15.hostingpics.net/pics/354861Leszarbibli.png)');

          $('#iframeConcert').css("display","none");
          $('#iframeGallerie').css("display","none");
          $('#iframePsycho').css("display","none");
          $('#iframeErotikPoufs').css("display","none");
          $('#iframeErotikPoufsNord').css("display","none");
          $('#iframeErotikPoufsSud').css("display","none");

             
          if($('#iframeBiblio').css("display") == "none")
          {          
             $('#iframeBiblio').css("display","block");    
             var index = Math.floor((Math.random()*27)+3); 
             $('#iframeBiblio').attr("src","https://www.youtube.com/embed/videoseries?list=PLE34477149C14B623&index="+index+"&rel=0&autoplay=1&loop=1");
          }
        }
        else //galerie
        {
          $('#carte_fond').css('background-image','url(http://img15.hostingpics.net/pics/689227batLeszar1.png)');

          $('#iframePsycho').css("display","none");
          $('#iframeConcert').css("display","none");
          $('#iframeErotikPoufs').css("display","none");
          $('#iframeBiblio').css("display","none");
          $('#iframeErotikPoufsNord').css("display","none");
          $('#iframeErotikPoufsSud').css("display","none");
 
          if($('#iframeGallerie').css("display") == "none")
          {          
             $('#iframeGallerie').css("display","block");    
             var index = Math.floor((Math.random()*42)); 
             $('#iframeGallerie').attr("src","https://www.youtube.com/embed/videoseries?list=PL2AB6EC89EFA95999&index="+index+"&rel=0&autoplay=1&loop=1");
          }
        }
    }
    else
    {
          $('#iframeConcert').css("display","none");
          $('#iframeGallerie').css("display","none");
          $('#iframePsycho').css("display","none");
          $('#iframeErotikPoufs').css("display","none");
          $('#iframeErotikPoufsNord').css("display","none");
          $('#iframeErotikPoufsSud').css("display","none");
          $('#iframeBiblio').css("display","none");
        
        
          $('#zone_gauche').css('background-image',zoneGauche);
          $('#zone_droite').css('background-image', zoneDroite);
          $('#zone_inventaire .personnage_image').css('background-image', linkPerso);    
          $('#zone_quete').css('background-image',zoneQuete);
    }
}


(function() {         
    zoneGauche =  $('#zone_gauche').css('background-image');
    zoneDroite = $('#zone_droite').css('background-image');
    linkPerso = $('#zone_inventaire .personnage_image').css('background-image');
    zoneQuete = $('#zone_quete').css('background-image');
          
    var iframePsycho = document.createElement('iframe');
    iframePsycho.id = "iframePsycho";
    document.body.appendChild(iframePsycho);
    $('#iframePsycho').css("width","300px");
    $('#iframePsycho').css("height","60px");
    $('#iframePsycho').css("position","absolute").css('top','30px');
    $('#iframePsycho').attr("src","https://www.youtube.com/embed/2a9jH8yT454?rel=0&autoplay=1&loop=1&playlist=2a9jH8yT454");
    $('#iframePsycho').css("display","none");
    
    var iframeConcert = document.createElement('iframe');
    iframeConcert.id = "iframeConcert";
    document.body.appendChild(iframeConcert);
    $('#iframeConcert').css("width","300px");
    $('#iframeConcert').css("height","60px");
    $('#iframeConcert').css("position","absolute").css('top','30px');
    $('#iframeConcert').attr("src","https://www.youtube.com/embed/videoseries?list=PLx6qNksJnePyicH4nT5CuetWrGa5K5rna&rel=0&autoplay=1&loop=1");
    $('#iframeConcert').css("display","none");
    
    
    var iframeGallerie = document.createElement('iframe');
    iframeGallerie.id = "iframeGallerie";
    document.body.appendChild(iframeGallerie);
    $('#iframeGallerie').css("width","300px");
    $('#iframeGallerie').css("height","60px");
    $('#iframeGallerie').css("position","absolute").css('top','30px');
    $('#iframeGallerie').attr("src","https://www.youtube.com/embed/videoseries?list=PL2AB6EC89EFA95999&rel=0&autoplay=1&loop=1");
    $('#iframeGallerie').css("display","none");

    var iframeErotikPoufs = document.createElement('iframe');
    iframeErotikPoufs.id = "iframeErotikPoufs";
    document.body.appendChild(iframeErotikPoufs);
    $('#iframeErotikPoufs').css("width","300px");
    $('#iframeErotikPoufs').css("height","60px");
    $('#iframeErotikPoufs').css("position","absolute").css('top','30px');
    $('#iframeErotikPoufs').attr("src","https://www.youtube.com/embed/cpeP5eLklZ4?rel=0&autoplay=1&loop=1&playlist=cpeP5eLklZ4");
    $('#iframeErotikPoufs').css("display","none");
    
    
    var iframeErotikPoufsNord = document.createElement('iframe');
    iframeErotikPoufsNord.id = "iframeErotikPoufsNord";
    document.body.appendChild(iframeErotikPoufsNord);
    $('#iframeErotikPoufsNord').css("width","300px");
    $('#iframeErotikPoufsNord').css("height","60px");
    $('#iframeErotikPoufsNord').css("position","absolute").css('top','30px');
    $('#iframeErotikPoufsNord').attr("src","https://www.youtube.com/embed/HG6b9GjLhtU?rel=0&autoplay=1&loop=1&playlist=HG6b9GjLhtU");
    $('#iframeErotikPoufsNord').css("display","none");
    
    
    var iframeErotikPoufsSud = document.createElement('iframe');
    iframeErotikPoufsSud.id = "iframeErotikPoufsSud";
    document.body.appendChild(iframeErotikPoufsSud);
    $('#iframeErotikPoufsSud').css("width","300px");
    $('#iframeErotikPoufsSud').css("height","60px");
    $('#iframeErotikPoufsSud').css("position","absolute").css('top','30px');
    $('#iframeErotikPoufsSud').attr("src","https://www.youtube.com/embed/u-nFIo4f71g?rel=0&autoplay=1&loop=1&playlist=u-nFIo4f71g");
    $('#iframeErotikPoufsSud').css("display","none");
    
    var iframeBiblio = document.createElement('iframe');
    iframeBiblio.id = "iframeBiblio";
    document.body.appendChild(iframeBiblio);
    $('#iframeBiblio').css("width","300px");
    $('#iframeBiblio').css("height","60px");
    $('#iframeBiblio').css("position","absolute").css('top','30px');
    $('#iframeBiblio').attr("src","https://www.youtube.com/embed/videoseries?list=PLE34477149C14B623&index=4&rel=0&autoplay=1&loop=1");
    $('#iframeBiblio').css("display","none");
    
    var myVar = setInterval(function(){checkSalle()},3000);
})();