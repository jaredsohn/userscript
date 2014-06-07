// ==UserScript==
// @name      anti AEDE
// @namespace  http://www.meneame.net/
// @version    0.6.2
// @description  marcar en rojo
// @include      *
// @updateURL    https://github.com/pykiss/anti-AEDE/raw/master/script.user.js
// @copyright    Antonio Fernández Porrúa. Liberado bajo los términos de GPL  
// ==/UserScript==

var $, jQuery;

check();

function check() {

    if (typeof unsafeWindow.jQuery != 'undefined') {
        $ = jQuery = unsafeWindow.jQuery;
        main();
    } else {

      var head = document.getElementsByTagName('head')[0];
      var jq = document.createElement('script');
    
      jq.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js';
      jq.type = 'text/javascript';
    
      head.insertBefore(jq, head.firstChild);

      setTimeout(check, 500);
    }
}

function main() {

   var aede = [
   /(\/|\.)11870\.com\//,
   /(\/|\.)11824\.es\//,
   /(\/|\.)abc\.es\//,
   /(\/|\.)adn\.fm\//,
   /(\/|\.)adnradio\.cl\//,
   /(\/|\.)aede\.es\//,
   /(\/|\.)alfaguara\.com\//,
   /(\/|\.)as\.com\//,
   /(\/|\.)autocasion\.com\//,
   /(\/|\.)avanzaentucarrera\.com\//,
   /(\/|\.)besame\.fm\//,
   /(\/|\.)besame\.co\.cr\//,
   /(\/|\.)besame\.com\.mx\//,
   /(\/|\.)cadenadial\.com\//,
   /(\/|\.)cadenaser\.com\//,
   /(\/|\.)canalplus\.es\//,
   /(\/|\.)canarias7\.es\//,
   /(\/|\.)caracol\.com\.co\//,
   /(\/|\.)caracol1260\.com\//,
   /(\/|\.)castellolopesmultimedia\.com\//,
   /(\/|\.)cincodias\.com\//,
   /(\/|\.)cinemania\.es\//,
   /(\/|\.)clix\.pt\//,
   /(\/|\.)colorincolorradio\.com\//,
   /(\/|\.)concierto\.cl\//,
   /(\/|\.)continental\.com.ar\//,
   /(\/|\.)corazon\.cl\//,
   /(\/|\.)correofarmaceutico\.com\//,
   /(\/|\.)dalealplay\.com\//,
   /(\/|\.)dbalears\.cat\//,
   /(\/|\.)deia\.com\//,
   /(\/|\.)diaridegirona\.cat\//,
   /(\/|\.)diaridetarragona\.com\//,
   /(\/|\.)diarideterrassa\.es\//,
   /(\/|\.)diariocordoba\.com\//,
   /(\/|\.)diariodeavila\.es\//,
   /(\/|\.)diariodeavisos\.com\//,
   /(\/|\.)diariodeburgos\.es\//,
   /(\/|\.)diariodecadiz\.es\//,
   /(\/|\.)diariodeibiza\.es\//,
   /(\/|\.)diariodejerez\.es\//,
   /(\/|\.)diariodelaltoaragon\.es\//,
   /(\/|\.)diariodeleon\.es\//,
   /(\/|\.)diariodemallorca\.es\//,
   /(\/|\.)diariodenavarra\.es\//,
   /(\/|\.)diariodenoticias\.org\//,
   /(\/|\.)diariodesevilla\.es\//,
   /(\/|\.)diarioinformacion\.com\//,
   /(\/|\.)diariojaen\.es\//,
   /(\/|\.)diariomedico\.com\//,
   /(\/|\.)diariopalentino\.es\//,
   /(\/|\.)diariosur\.es\//,
   /(\/|\.)diariovasco\.com\//,
   /(\/|\.)dmedicina\.com\//,
   /(\/|\.)editorialaurus\.com\//,
   /(\/|\.)eladelantado\.com\//,
   /(\/|\.)elalmeria\.es\//,
   /(\/|\.)elboomeran\.com\//,
   /(\/|\.)elcomercio\.es\//,
   /(\/|\.)elcorreoweb\.es\//,
   /(\/|\.)elcorreo\.com\//,
   /(\/|\.)eldiadecordoba\.es\//,
   /(\/|\.)eldiariomontanes\.es\//,
   /(\/|\.)eleconomista\.es\//,
   /(\/|\.)elmundo\.es\//,
   /(\/|\.)elnortedecastilla\.es\//,
   /(\/|\.)elpais\.com\.uy\//,
   /(\/|\.)elmun\.do\//,
   /(\/|\.)elpais\.com\//,
   /(\/|\.)elpais\.es\//,
   /(\/|\.)elpaisaguilar\.es\//,
   /(\/|\.)elpaisclubdevinos\.es\//,
   /(\/|\.)elperiodicodearagon\.com\//,
   /(\/|\.)elperiodicoextremadura\.com\//,
   /(\/|\.)elperiodicomediterraneo\.com\//,
   /(\/|\.)elperiodico\.cat\//,
   /(\/|\.)elperiodico\.com\//,
   /(\/|\.)elpokerdeas\.com\//,
   /(\/|\.)elprogreso\.es\//,
   /(\/|\.)escolasdevalor\.com\.br\//,
   /(\/|\.)escuelaunidadeditorial\.com\.br\//,
   /(\/|\.)essayandscience\.com\//,
   /(\/|\.)europasur\.es\//,
   /(\/|\.)expansion\.com\//,
   /(\/|\.)expansionyempleo\.com\//,
   /(\/|\.)farodevigo\.es\//,
   /(\/|\.)finanzas\.com\//,
   /(\/|\.)fmdos\.cl\//,
   /(\/|\.)fundacaosantillana\.com\//,
   /(\/|\.)fundacaosantillana\.com\.br\//,
   /(\/|\.)fundacaosantillana\.org\.co\//,
   /(\/|\.)galiciae\.com\//,
   /(\/|\.)globaliza\.com\//,
   /(\/|\.)grada360\.com\//,
   /(\/|\.)gruposantillanapr\.com\//,
   /(\/|\.)granadahoy\.com\//,
   /(\/|\.)heraldodesoria\.es\//,
   /(\/|\.)heraldo\.es\//,
   /(\/|\.)hjck\.com\//,
   /(\/|\.)hoy\.es\//,
   /(\/|\.)hoycinema\.es\//,
   /(\/|\.)hoymotor\.es\//,
   /(\/|\.)huelvainformacion\.es\//,
   /(\/|\.)huffingtonpost\.es\//,
   /(\/|\.)iarc\.cl\//,
   /(\/|\.)iol\.pt\//,
   /(\/|\.)ign\.com\//,
   /(\/|\.)ideal\.es\//,
   /(\/|\.)infoempleo\.es\//,
   /(\/|\.)intereconomia\.com\//,
   /(\/|\.)inverycrea\.net\//,
   /(\/|\.)kebuena\.com\.mx\//,
   /(\/|\.)lavallenata\.com\//,
   /(\/|\.)lagacetadesalamanca\.es\//,
   /(\/|\.)laguiatv\.com\//,
   /(\/|\.)lalistawip\.com\//,
   /(\/|\.)laopinioncoruna\.es\//,
   /(\/|\.)laopiniondemalaga\.es\//,
   /(\/|\.)laopiniondemurcia\.es\//,
   /(\/|\.)laopiniondezamora\.es\//,
   /(\/|\.)laopinion\.es\//,
   /(\/|\.)laprovincia\.es\//,
   /(\/|\.)larazon\.es\//,
   /(\/|\.)larioja\.com\//,
   /(\/|\.)lasprovincias\.es\//,
   /(\/|\.)latribunadealbacete\.es\//,
   /(\/|\.)latribunadeciudadreal\.es\//,
   /(\/|\.)latribunadetalavera\.es\//,
   /(\/|\.)latribunadetoledo\.es\//,
   /(\/|\.)lavanguardia\.com\//,
   /(\/|\.)laverdad\.es\//,
   /(\/|\.)lavozdealmeria\.es\//,
   /(\/|\.)lavozdegalicia\.es\//,
   /(\/|\.)lavozdigital\.es\//,
   /(\/|\.)lasapuestasdeas\.com\//,
   /(\/|\.)levante-emv\.com\//,
   /(\/|\.)librosaguilarl\.com\//,
   /(\/|\.)librosalfaguarainfantil\.com\//,
   /(\/|\.)librosalfaguarajuvenil\.com\//,
   /(\/|\.)lne\.es\//,
   /(\/|\.)los40\.cl\//,
   /(\/|\.)los40\.com\//,
   /(\/|\.)los40\.com\.co\//,
   /(\/|\.)los40\.com\.cr\//,
   /(\/|\.)los40\.com\.ec\//,
   /(\/|\.)los40\.com\.gt\//,
   /(\/|\.)los40\.com\.mx\//,
   /(\/|\.)los40\.com\.pa\//,
   /(\/|\.)los40principales\.com\.ar\//,
   /(\/|\.)m80radio\.com\//,
   /(\/|\.)majorcadailybulletin\.es\//,
   /(\/|\.)malagahoy\.es\//,
   /(\/|\.)marca\.com\//,
   /(\/|\.)marcamotoranuncios\.com\//,
   /(\/|\.)marcamotor\.com\//,
   /(\/|\.)maxima\.fm\//,
   /(\/|\.)mediacapital\.pt\//,
   /(\/|\.)menorca\.info\//,
   /(\/|\.)meristation\.com\//,
   /(\/|\.)motormercado\.com\//,
   /(\/|\.)mundodeportivo\.com\//,
   /(\/|\.)mujerhoy\.com\//,
   /(\/|\.)noticiasdealava\.com\//,
   /(\/|\.)noticiasdegipuzkoa\.com\//,
   /(\/|\.)objetiva\.com\.br\//,
   /(\/|\.)objetiva\.pt\//,
   /(\/|\.)onstage\.es\//,
   /(\/|\.)orbyt\.tv\//,
   /(\/|\.)oxigeno\.fm\//,
   /(\/|\.)pisos\.com\//,
   /(\/|\.)planetevents\.es\//,
   /(\/|\.)pluralent\.com\//,
   /(\/|\.)pluralportugal\.pt\//,
   /(\/|\.)plus\.es\//,
   /(\/|\.)premiovivalectura\.org\.ar\//,
   /(\/|\.)premiovivaleitura\.org\.br\//,
   /(\/|\.)prisadigital\.com\//,
   /(\/|\.)prisaediciones\.com\//,
   /(\/|\.)prisalabs\.com\//,
   /(\/|\.)prisanoticias\.com\//,
   /(\/|\.)prisaradio\.com\//,
   /(\/|\.)prisarevistas\.com\//,
   /(\/|\.)prisatv\.com\//,
   /(\/|\.)pudahuel\.cl\//,
   /(\/|\.)puntodelectura\.com\//,
   /(\/|\.)que\.es\//,
   /(\/|\.)radioacktiva\.cl\//,
   /(\/|\.)radioacktiva\.com\//,
   /(\/|\.)radiocomercial\.com\//,
   /(\/|\.)radioimagina\.cl\//,
   /(\/|\.)radiole\.com\//,
   /(\/|\.)radiounochile\.cl\//,
   /(\/|\.)regio7\.cat\//,
   /(\/|\.)richmondelt\.com\//,
   /(\/|\.)rlm\.es\//,
   /(\/|\.)rockandpop\.cl\//,
   /(\/|\.)rollingstone\.es\//,
   /(\/|\.)santillana\.cl\//,
   /(\/|\.)santillana\.com\.ar\//,
   /(\/|\.)santillana\.com\.bo\//,
   /(\/|\.)santillana\.com\.br\//,
   /(\/|\.)santillana\.com\.co\//,
   /(\/|\.)santillana\.com\.do\//,
   /(\/|\.)santillana\.com\.ec\//,
   /(\/|\.)santillana\.com\.gt\//,
   /(\/|\.)santillana\.com\.hn\//,
   /(\/|\.)santillana\.com\.mx\//,
   /(\/|\.)santillana\.com\.pe\//,
   /(\/|\.)santillana\.com\.py\//,
   /(\/|\.)santillana\.com\.sv\//,
   /(\/|\.)santillana\.com\.uy\//,
   /(\/|\.)santillana\.com\.ve\//,
   /(\/|\.)santillana\.com\//,
   /(\/|\.)santillana\.cr\//,
   /(\/|\.)santillana\.pt\//,
   /(\/|\.)santillanafrancais\.com\//,
   /(\/|\.)santillanausa\.com\//,
   /(\/|\.)seminariodenarrativayperiodismo\.com\//,
   /(\/|\.)sistemauno\.com\//,
   /(\/|\.)sport\.es\//,
   /(\/|\.)sumadeletras\.es\//,
   /(\/|\.)superdeporte\.es\//,
   /(\/|\.)tareasymas\.es\//,
   /(\/|\.)telva\.com\//,
   /(\/|\.)tiramillas\.net\//,
   /(\/|\.)tropicanafm\.com\//,
   /(\/|\.)ultimahora\.es\//,
   /(\/|\.)unidadeditorial\.es\//,
   /(\/|\.)vadejuegos\.com\//,
   /(\/|\.)vodafone\.fm\//,
   /(\/|\.)vmetv\.com\//,
   /(\/|\.)wradio\.com\.co\//,
   /(\/|\.)wradio\.com\.mx\//,
   /(\/|\.)wradio690\.com\//,
   
   ];


    $(function() {

       checkForAEDELinks();
       setInterval(checkForAEDELinks, 2000);
    
       function checkForAEDELinks() {
          var domain = document.domain;
          if (domain == 'www.meneame.net' || domain== 'deportes.meneame.net' || domain== 'peta.meneame.net' || domain== 'e.meneame.net' ) {

             // Menéame
             $('span.showmytitle').each(function(){
                var thiss=this;
                $.each(aede,function(i,regex){
                   if(regex.test(thiss.title)){
                      $(thiss).parents('.news-summary').css({
                        'background-image': 'linear-gradient(0deg, rgba(255,50,50,1),rgba(255,100,0,0.5))',
                        'border-radius': '6px',
                        'margin-bottom': '5px'
                      });
                      return false;
                   }
                });
             });
             $('input#url').keypress(function(){
                var thi$ = this;
                $.each(aede,function(i,regex){
                   if(regex.test(thi$.val ())){
                      thi$.css('border', '2px solid red');
                      return false;
                   }
                });
             });

          } else if (domain == 'twitter.com' || domain == 'www.twitter.com') {

             // Twitter by @Hanxxs http://pastebin.com/f04tPcsG
             $('a.twitter-timeline-link').each(function(){
                var thiss=this;
                $.each(aede,function(i,regex){
                   if(regex.test(thiss.title)){
                      $(thiss).parents('.js-tweet-text').css('background', 'rgba(255,0,0,0.5)');
                      return false;
                   }
                });
             });

          } else {

             // Others by @paucapo
             $('a').each(function() {
                var link  = $(this);
                var href = link.attr('href');
                var text = link.text();
                $.each(aede,function(i,regex){
                   if(regex.test(href) || regex.test(text)) {
                      link.css('background', 'rgba(255,0,0,0.5)').css('color', 'white');
                      return false;
                   }
               });
             });

          }
       }

    });
    
}
