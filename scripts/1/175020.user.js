// ==UserScript==
// @name           Animeflv.net - No anuncios, buen diseño (No ADS, nice design)
// @namespace      ninguno
// @description    Quitar la publicidad de las paginas de Animeflv.net y mejorar los visuales con un nuevo diseño dinamico (Remove every single ads from any page of Animeflv.net and enhance the visuals with a new dynamic design)
// @version        3.6.6
// @author         Gabriel Gonzalez
// @grant          none
// @match        http://animeflv.net/*
// @match        http://animeflv.net
// @match        http://animeflv.net/*/
// @match        http://animeflv.net/*/*
// @match        http://animeflv.net/*/*/
// @include        http://animeflv.net/*
// @include        http://animeflv.net
// @include        http://animeflv.net/*/
// @include        http://animeflv.net/*/*
// @include        http://animeflv.net/*/*/
// @match        http://www.animeflv.net
// @match        http://www.animeflv.net/*
// @match        http://www.animeflv.net/*/
// @match        http://www.animeflv.net/*/*
// @match        http://www.animeflv.net/*/*/
// @include        http://www.animeflv.net
// @include        http://www.animeflv.net/*
// @include        http://www.animeflv.net/*/
// @include        http://www.animeflv.net/*/*
// @include        http://www.animeflv.net/*/*/
// @match		   http://*.animeflv.net/*/*
// @include        http://*.animeflv.net/*/*
// ==/UserScript==

jQuery.fn.exists = function(){return this.length>0;}
$( document ).ready(
function() {
    $("embed").each(
        function(index,element){
            if(index > 0){
                $( element ).css( "display", "none" );
            }
        }
    );
}
);

function readyFn( jQuery ){
	
    $("html").attr("style", "");
    
    if ($('script').exists()) {$('script').remove();}
    
    if ($('#cboxOverlay').exists()) {$('#cboxOverlay').remove();}
    
    if ($('#colorbox').exists()) {$('#colorbox').remove();}
    
    if($('#fb-root').exists()) {$('#fb-root').remove();}
    
    if($("#footer").exists()) {$('#footer').remove();}
    
    if($(".ads").exists()) {$('.ads').remove();}
    
    if($(".adspl").exists()) {$(".adspl").remove();}
    
    if($(".sub_bloque").exists()) {$(".sub_bloque").remove();}
    
    if($(".bloques").exists()) {$(".bloques").remove();}
    
    if($(".gao").exists()) {$(".gao").remove();}
    
    if($(".publi_head").exists()) {$(".publi_head").remove();}
    
    if($(".publi_1.blt").exists()) {$(".publi_1.blt").remove();}
    
    if($(".publi_1.brt").exists()) {$(".publi_1.brt").remove();}
    
    if($(".ads_der").exists()) {$(".ads_der").remove();}
    
    if($(".bloque_pos").exists()) {$(".bloque_pos").remove();}
    
    if($(".bloque_ads").exists()) {$(".bloque_ads").remove();}
    
    if($("#ext-chrome").exists()) {$("#ext-chrome").remove();}
    
    $("#header").hide();
    
    $("#cpmstar-site-skin-l").hide();
    
    $("#cpmstar-site-skin-r").hide();
    
    if($("#cpmstar-site-skin-l").exists()) {$('#cpmstar-site-skin-l').remove();}
    
    if($("#cpmstar-site-skin-r").exists()) {$("#cpmstar-site-skin-r").remove();}
    
    if($("#adv1").exists()) {$("#adv1").remove();}

    $('#video_player').next().remove();
    
    $('#ppuoverlay').attr('id', 'shit');
    
    $('#shit').attr('style', 'none');
    
    var marginmore = "",
        morebigpx = "",
        $s1 = 0,
        $s2 = "";
	$s1 = document.body.innerHTML.search("a4gss");
	if($s1.length>0){
	$s2 = document.body.innerHTML.substr($s1,16);
    if($("#"+$s2).exists()) {$("#"+$s2).remove();}
    }
    marginmore = "-82px";morebigpx = "134px"; $('.ttip').attr('onclick', 'vidconf()');
    
    var css = 'html {background: black; height:100%;} body {transition: all 0.5s; min-height: 100%; height: auto;} input[type="submit"] {width: 20px;} input[type="text"] {box-shadow: 0px 0px 0px rgb(255, 163, 0); border-left: solid 3px rgba(255, 130, 0, 0.55);} input[type="text"]:hover, input[type="text"]:focus {border-left: solid 3px rgba(255, 130, 0, 1); box-shadow: 0px 0px 10px rgb(255, 163, 0);} .centrar_bloque {box-shadow: inset 31px 46px 42px -30px rgb(233, 233, 233);} .jsonSuggest{border-bottom: solid 1px black; margin-top: 12px; box-shadow: -8px 8px 20px -5px rgba(0, 0, 0, 0.78); width: 219px; z-index: -1; height: 350px; overflow-y: auto; overflow-x: hidden; border-left: none; border-top: none; background: rgb(37, 37, 37);} .suggest-element small{color:rgb(185, 185, 185);} .suggest-element .tx{height: 20px; line-height: 20px; width: 140px; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; color:rgb(185, 185, 185);} .suggest-element .suggest-hover{border-left: solid 3px rgba(255, 130, 0, 1); background: rgb(116, 60, 0);} #navbar .suggest-element a {display: block; padding: 5px; height: 40px; cursor: pointer; width: 350px; color: black!important; border-left: solid 3px rgba(255, 130, 0, 0.5);} .suggest-element{border-bottom:none; width: 390px;} #busqueda_rapida{border-left: solid 3px rgba(255, 130, 0, 0.5); border-right: solid 3px rgba(255,130,0,0.5);} #busqueda_rapida:hover, #busqueda_rapida:focus{border-left: solid 3px rgba(255, 130, 0, 1); border-right: solid 3px rgba(255, 130, 0, 1);} .suggest-hover .tx {width: auto;overflow: visible;position: absolute;text-shadow: 1px 1px 3px black;color: white;background: rgb(255,130,0);margin-left: 45px;padding: 0 5px;box-shadow: 0px 0px 6px black;border-right: 3px solid black;z-index: 0;height: 41px;min-width: 154px;} .suggest-hover small {width: auto;overflow: visible;position: absolute;text-shadow: 1px 1px 3px black;color: white;margin-top: 21px;padding: 0 5px;z-index: 1;} .suggest-hover strong {text-decoration: underline;font-weight: normal;} .epi_box ul.opvid li:hover {background: rgba(255, 130, 0, 0.42);} .hoverer:hover {width: 156px;border: solid 1px rgb(255,130,0);background: rgb(255, 201, 145);padding: 9px;} .episodio_titulo a:hover img {-webkit-filter: drop-shadow(0 2px 0px rgb(250,130,0));filter: drop-shadow(0 2px 0px rgb(250,130,0));} .centrar_bloque li:hover {z-index: 999;position: relative;box-shadow: 0px 0px 40px 5px rgb(255,130,0);background: rgba(252, 128, 0, 0.75);}.centrar_bloque ul li.activo {background: #fc8000;} #navbar {width:1000px; margin-left:0px; transition: margin-top 0.5s;} #navbar ul li.activo {background: #fc8000;} .centrar_bloque ul {background: url(http://animeflv.net/temas/v1/css/img/logo_naranja.png);background-size: 92px;background-repeat: no-repeat;padding-left: 92px;}#header{visibility: hidden;height: 2px;} .buscador ul {border-bottom: solid 3px rgb(255,130,0);margin-top: 12px;box-shadow: -8px 8px 20px -5px rgba(0, 0, 0, 0.78);width: 219px;height: 350px;overflow-y: auto;overflow-x: hidden;border-left: none;border-top: none;background: rgb(37, 37, 37);margin-left: 0;padding-left: 0;} .centrar_bloque .buscador .jsonSuggest {background: rgb(37, 37, 37);margin-left: 0;padding-left: 0;} .night {opacity: 0.5;background: black;} .day {opacity:1; background: url(http://animeflv.net/temas/v1/css/img/squares.png) #fff;} .black_bg{background: rgba(0, 0, 0, 0.5);} #player_big {background: black; position: relative; padding: 5px; display: block; height: 10px;} #video_player {position:relative; margin-top: 0px; left: 0px;top: 0px; height: 463px;} #video_player.bigplayer {position:fixed;top: 0px;z-index: 990;left: 0px;top: 0px;height: calc(100%); width:calc(100%); background: black; padding:0px;} #closeplayer {float:left; display: inline-block; background: rgba(255, 143, 0, 0.31); position: relative; top: 0; width: 127px; padding: 8px 0;} #closeplayer a {height: 30px; color:white; line-height: 1.0; font-size:9px;}  #videosize {width: 775px;padding: 10px;height: 300px;} #navbar.fullnavbar {z-index: 991; width:-webkit-calc(100%); width:calc(100%);left: 0px; margin-top: -44px;} #overvideo {z-index:-2;background:rgba(31, 31, 31, 0.72); color: white; font-family: segoe ui; font-size: 2em; border-bottom-left-radius: 12px; border-bottom-right-radius: 12px; position: fixed; height:32px; margin-top: 3px; left: 30px; border-bottom: solid 1px; box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5); border-color: rgb(134, 134, 134); opacity: 0; transition: all 0.1s linear 0s;} #overvideo a {padding: 0 12px;line-height: 43px; text-shadow: 0 1px 1px black;} #navbar.fullnavbar.shownav{margin-top:0px;} .black .aboxy_lista .generos_links a:link, .black .aboxy_lista .generos_links a:visited, .black .aboxy_lista:nth-child(odd), .black .noticias_der .menu a:link, .black #mostrar_generos, .black .anime_info .menu a:visited {color:white; background:black;}',
        head = document.getElementsByTagName('head')[0],
        style = document.createElement('style');
    
    style.type = 'text/css';
    if (style.styleSheet){
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    
    head.appendChild(style);
    
    var css2 = '#navbar.fullnavbar #overvideo {animation:overvideostart 10s; -webkit-animation:overvideostart 10s;} @-webkit-keyframes overvideostart {0%   {opacity:0;}\n\n3%  {opacity:0;}\n\n40%  {opacity: 1; box-shadow: 0 5px 100px 30px white;}\n\n100% {);}} @keyframes overvideostart {0%   {opacity:0;}\n\n3%  {opacity:0;}\n\n40%  {opacity: 1; box-shadow: 0 5px 100px 30px white;}\n\n100% {);}} .epi_cont {min-height: 75ch;} .more {height: 36px; display: block; float: right;} .more a {font-family: segoe ui;} #contenido {width: 100%;display: inline-block;} #moreblock {border-bottom: solid 1px #222222; height:calc(100%); height:-webkit-calc(100%); margin-top: ' + marginmore + '; box-shadow: inset 0px -5px 15px black; background: #1A1A1A; -webkit-transition: all 0.5s; transition: all 0.5s;} #navbar {box-shadow: 0 7px 10px -5px black; height: auto;} #moreblock.big {margin-top: 0px;}#morecontent {height:52px;-webkit-transition: all 0.5s; transition: all 0.5s;} #morecontent.big {height: ' + morebigpx + ';} #moreblock .left {cursor: default; color: rgb(182, 182, 182); font-size: 1.2em; font-family: segoe ui; text-shadow: 0px 1px 1px black;} #moreblock ol li {height: 24px;} #moreblock ol {column-count:3; -moz-column-count:3; -webkit-column-count: 3; height: 77px; list-style: square; padding-left: 26px; color: gray; margin-top: -17px;} #navbar.navunhidden{margin-top:0px;} #contenido.fullnavbar {height: 0px; overflow: hidden;} .about__keyboardShortcutsContent__inner>dl>dt>kbd>kbd {padding: 0 3px; float: left;background: #666;height: 22px;line-height: 22px;min-width: 24px;text-align: center;border-radius: 3px;text-transform: capitalize;font-weight: 700;margin: 0 0 0 3px;} .about__keyboardShortcutsContent__inner>dl {float: left;margin: 0 4% 5px 4%;width: 25%;height: 22px;line-height: 22px;color: #ccc;font-size: 11px;} .about__keyboardShortcutsContent__inner.atajos{background: rgba(10, 10, 10, 0.8);margin-top: -160px;position: relative; display: inline-block; z-index:999;} .about__keyboardShortcutsContent__inner {position: absolute; width: 100%;overflow: hidden;padding: 12px 0; transition: all 0.3s; -webkit-transition: all 0.3s;} .about__legalList {height: 26px; padding: 0 0 0 15px;line-height: 14px;background-color: #333;border-bottom: 1px solid #3d3d3d;width: 100%;font-size: 10px;z-index: 1002;position: relative;} a.about__close {background: url(https://a2.sndcdn.com/assets/images/about/close-30bd149b.png) no-repeat right 12px;right: 7px;position: absolute;text-shadow: none!important;z-index: 1003;opacity: .4;-webkit-transition: opacity .3s;-moz-transition: opacity .3s;-o-transition: opacity .3s;transition: opacity .3s;margin-top: -6px;} a.about__close:hover, .about a.about__close:focus {opacity: 1;} .about__legalList>li {float: left; color: #999;display: block;padding: 7px 0 5px;font-size: 13px;} dd {padding-left: 75px;} .about__legal {overflow:hidden;background-color: #333;border-bottom: 1px solid #111;width: 100%;font-size: 10px;z-index: 1002;position: relative;height: 27px;} .atajos.show {font-family: arial, helvetica, sans-serif; margin-top:-54px;padding: 46px 0;} ::-webkit-scrollbar {width: 10px;} ::-webkit-scrollbar-track {-webkit-box-shadow: inset 0 0 3px black; background: rgb(150,150,150); border-radius: 10px;} ::-webkit-scrollbar-thumb {border-radius: 10px; background: white; -webkit-box-shadow: inset 0 0 0px 1px rgba(0,0,0,0.5);} .more a {font-family: arial, helvetica, sans-serif;} #navbar.fullnavbar #overvideo{-webkit-transition: all 0.5s ease 0.8s;} #navbar {-webkit-transition: margin-top 0.5s;} #overvideo a {font-family: arial, helvetica, sans-serif;} #video_player.bigplayer {width:-webkit-calc(100%); height:-webkit-calc(100%);} #navbar.fullnavbar #overvideo{transition: all 0.5s ease 0.8s; opacity:0.6;} #navbar.fullnavbar #overvideo:hover{opacity:1;} #cpmstar-site-skin-l, #cpmstar-site-skin-r {display:none;} #adv1 {display: none;} #navbar #closeplayer a {margin: 0;width: auto;} .center_nav #night_frame {float:left;} .center_nav #night_frame a {width: 36px;} .center_nav #night_frame span {color: rgba(255, 133, 0, 0.67); width: 80px;text-align: center; box-shadow: 0px 0px 0px 3px rgba(255, 130, 0, 0.4);} .center_nav #night_frame .link_night {display: inline-block;background: black;}',
        head = document.getElementsByTagName('head')[0],
        style = document.createElement('style');
    
    style.type = 'text/css';
    if (style.styleSheet){
        style.styleSheet.cssText = css2;
    } else {
        style.appendChild(document.createTextNode(css2));
    }
    
    head.appendChild(style);
    
    var css3 = 'button, html input[type="button"], input[type="reset"], input[type="submit"] {-webkit-appearance: button;cursor: pointer;} .header__farRight {border-right: 0;float: left;display: inline-flex;position: inherit;} .header__navMenu {padding:0px;} .header__container, .header__navMenu {box-shadow: 0px 0px 0px 1px rgba(255,255,255,.05);-webkit-backface-visibility: hidden;} .header ul {margin: 0;list-style: none;} .header__iconMenu {border-left: 0;-webkit-box-shadow: none;box-shadow: none;margin:0;} .header__navMenu>li {float: left;position: relative;} .header__playbackControl {padding: 0 6px;height: 40px;} .skipControl.disabled {opacity: .5;} .skipControl__previous {background: url(https://a2.sndcdn.com/assets/images/header/playback/previous-38b02b00.png) no-repeat left center;} .skipControl {opacity:0.6;width: 19px;height: 39px;border: 0;} .disabled {opacity: .5;} .playControl {background: url(https://a2.sndcdn.com/assets/images/header/playback/play-38b02b00.png) no-repeat 0 12px;width: 21px;margin: 0 -4px;height: 45px;border: 0;} .skipControl:hover{opacity: 1;-webkit-filter: drop-shadow(0px 0px 14px #fff); filter: drop-shadow(0px 0px 14px #fff);} .skipControl__next {background: url(https://a2.sndcdn.com/assets/images/header/playback/next-38b02b00.png) no-repeat left center;} .header__navMenu>li>a {display: block;padding: 13px 16px 10px;text-shadow: 0 1px 0 #000;-webkit-transition: color .2s linear,-webkit-box-shadow .2s linear;-moz-transition: color .2s linear,box-shadow .2s linear;-o-transition: color .2s linear,box-shadow .2s linear;transition: color .2s linear,box-shadow .2s linear;} .g-dark a, .g-dark .sc-type-light {color: #ccc;text-shadow: 0 1px 0 #000;}.playbackTitle {width:auto; max-width: 177px;height: 40px;line-height: 45px;font-size: 13px;border: 0!important;padding: 0 6px!important;-webkit-transition: none!important;transition: none!important;} .sc-truncate {overflow: hidden;white-space: nowrap;text-overflow: ellipsis;} a, a:visited {color: #06c;text-decoration: none;} .skipControl.skipControl__previous, .skipControl.skipControl__next {padding: 0;} .header__playbackControl.header__playbackControls {width:15px;} #navbar a.skipControl{padding:0;} .playbackTitle center {height: 40px;margin-top: -2px; overflow: hidden;text-overflow: ellipsis;} .skipControl.disabled:hover {opacity: .5; -webkit-filter:none; filter:none;} .epihere {background-color: #FFF5D5;} .antepisodes {overflow-x: hidden;overflow-y: auto; max-height: 148px; height: auto; position:relative; display: inline-block;} .antepisodes li:last-child {border-bottom: 0;} .antepisodes li {font-family: arial, helvetica, sans-serif; width: auto;color: #585858;text-shadow: #FFF 0 1px 0;border-bottom: 1px dashed #d2d2d2;line-height: 20px;position: relative;list-style: none;-webkit-transition: all 300ms ease-in-out;} .antepisodes li a:visited {display: block;} .antepisodes li a {position: relative;z-index: 60;display: block;width: 100%;text-decoration: none;color: inherit;position: relative;text-shadow: none;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;padding: 5px 85px 5px 26px;} .antepisodes li:hover {background-color: #edf4ff;} #navbar .antepisodes li a:hover {color:black;} #navbar .antepisodes a:link, #navbar .antepisodes a {text-align: center;padding: 5px 0;} #navbar .epihere a {color: black;} #navbar a.lihere {color: white;} .about__close {font-family: arial, helvetica, sans-serif;} .sc-clearfix a {font-family: arial, helvetica, sans-serif;} #navbar a {color: #999;display: block;padding: 0 15px 0 15px; cursor: pointer;} .playbackTitle.sc-truncate.big {max-width: 530px;width: 530px;} .antepisodes.a-none {height: 30px;} .center_nav{display: inline-block;} span.nightspan {display: inline-block;cursor: default;} .menu_n {width: 80px;position:fixed;height: 0px;overflow: hidden;transition: all 0.5s; background: black; border: solid 3px rgb(255, 130, 0);border-top: 0;margin-left: -3px; box-shadow: 0px 0px 0px 0px black;} span:hover + .menu_n, .menu_n:hover {height: 80px; box-shadow: -1px 5px 20px -4px black;} span:hover + .menu_n.add_close, .menu_n.add_close:hover {height: 118px;} .dot {display: inline-block;background: #555;width: 8px;height: 8px;border-radius: 50%;vertical-align: middle;margin: 0 0 2px 2px;} .night .dot.night-dot {background: rgb(255,112,0);} .black .dot.black-dot {background: rgb(255,112,0);} .black, .black #contenedor, .black .inicio_box, .black .bloque_der h1, .black .lista_estrella li a, .black .lista_simple li, .black .lista_simple li a, .black .menu_epi, .black .menu_epi .opt, .black .epi_box .opcion, .black .epi_box .opcion a, .black .lista_episodios, .black .epi_cont, .black .anime_box, .black .aboxy_lista .titulo:visited, .black .aboxy_lista .titulo:link {background: black;color: white;} .nightspan:hover{background:rgba(255,130,0,0.3);box-shadow:0px 0px 0px 3px rgba(255, 130, 0, 1);} .center_nav #night_frame span:hover {box-shadow: 0px 0px 0px 3px rgba(255,130,0,1);}',
        head = document.getElementsByTagName('head')[0],
        style = document.createElement('style');
    
    style.type = 'text/css';
    if (style.styleSheet){
        style.styleSheet.cssText = css3;
    } else {
        style.appendChild(document.createTextNode(css3));
    }
    
    head.appendChild(style);
    
    $("html").attr("style", "");
    
    document.getElementById('navbar').style.position = 'fixed';
    
    document.getElementById('navbar').style.top = '0';
    
    document.getElementById('navbar').style.minWidth = '1000px';
    
    document.getElementById('navbar').style.borderBottom = '3px solid #ff8200';
    
    document.getElementById('navbar').style.webkitBoxShadow = "0px 7px 17px -5px black";
	
	$('#navbar').append("<div class='center_nav'></div>");
    
    document.getElementById('header').style.paddingTop = '40px';
    
    document.getElementById('header').style.background = 'none';
    
    document.getElementById('contenido').style.paddingTop = '0px';
    
    document.getElementById('contenido').style.paddingBottom = '0px';
    
    document.getElementById('busqueda_rapida').style.height = '31px';
    
    document.getElementById('busqueda_rapida').style.marginTop = '5px';
    
    document.getElementById('busqueda_rapida').style.lineHeight = '20px';
    
    $("#cpmstar-site-skin-l").remove();
    
    $("#cpmstar-site-skin-r").remove();
    
    $( "#navbar" ).append( "<div id='overvideo'><a title='Mostrar Barra de Navegaci&oacute;n' onclick='shownavbar()'>^</a></div>" );
    
    $( "head" ).append( "<script type='text/javascript'>function playerbig() { $('#video_player').toggleClass('bigplayer');\n\n$('#navbar').toggleClass('fullnavbar');\n\n$('#contenido').toggleClass('fullnavbar');\n\nif ($( '#navbar' ).hasClass( 'shownav' ) === true ) { $( '#navbar' ).removeClass( 'shownav' );}\n\nif ($( '#moreblock' ).hasClass( 'big' ) === true ) { $( '#moreblock' ).removeClass( 'big' );\n\n$( '#morecontent' ).removeClass( 'big' ); }\n\nif ($('#navbar').hasClass( 'fullnavbar' ) === false ) { $('#navbar').removeClass('navunhidden'); } \n\n$('.playbackTitle').toggleClass('big'); }\n\nfunction closeplayer(){$('#video_player').css({\n\n'zIndex': '60',\n\n'position': 'relative'\n\n});}</script>" );
    
    $( "head" ).append( "<script type='text/javascript'>function more() { if ($('#topnav1').hasClass( 'lihere' ) === false ) {$('#topnav1').addClass('lihere'); \n\n$('#topnav2').removeClass('lihere');}\n\n$('#moreblock').toggleClass('big');\n\n$('#morecontent').toggleClass('big');\n\nif ($('#navbar').hasClass( 'fullnavbar' ) === true ) { $('#navbar').toggleClass('navunhidden');}\n\nif ($( '.atajos' ).hasClass( 'show' ) === true ) {	$('.atajos').removeClass('show');	} }</script>" );
    
    $( "body" ).append( "<script type='text/javascript'> function nightpage() { $(document.body).toggleClass('night'); } $( '#ppuover' ).load(function() {$( '#ppuover' ).css({'height':'0','width':'0','position':'','z-index':'-100'});});</script>" );
    
    $( "body" ).append( "<script type='text/javascript'> function blackpage() { $(document.body).toggleClass('black'); } </script>" );
    
    $( "head" ).append( "<script type='text/javascript'> function atajos() { $('.atajos').toggleClass('show');\n\nif ($('#topnav1').hasClass( 'lihere' ) === true ) { $('#topnav2').addClass('lihere'); \n\n$('#topnav1').removeClass('lihere'); } else {$('#topnav1').toggleClass('lihere'); \n\n$('#topnav2').removeClass('lihere');} } </script>" );
    
    $( "head" ).append( "<script type='text/javascript'> function closeat() { if ($( '.atajos' ).hasClass( 'show' ) === true ) { $('.atajos').removeClass('show');}\n\nif ($('#topnav1').hasClass( 'lihere' ) === false ) { $('#topnav1').addClass('lihere'); \n\n$('#topnav2').removeClass('lihere'); }} </script>" );
    
    $( "head" ).append( "<script type='text/javascript'> function shownavbar() { $('.fullnavbar').toggleClass('shownav');} </script>" );
    
    $( "head" ).append( "<script>function vidconf(){ $('#video_player embed').attr('width', '100%');\n\n$('#video_player embed').attr('height', '100%');\n\n$('#video_player object').attr('width', '100%');\n\n$('#video_player object').attr('height', '100%');\n\n$('#video_player object embed').attr('width', '100%');\n\n$('#video_player object embed').attr('height', '100%');\n\n$('#flashplayer embed').attr('width', '100%');\n\n$('#flashplayer embed').attr('height', '100%');\n\n$('#video_player iframe').attr('width', '100%');\n\n$('#video_player iframe').attr('height', '100%');\n\n$('#video_player iframe').css('width', '100%');\n\n$('#video_player iframe').css('height', '100%');}</script>" );
    
    $( ".buscador" ).before("<div class='more'><a title='M&aacute;s' onclick='more()' accesskey='m' style='cursor: pointer;'>M&aacute;s</a></div>");
    
    $( "#contenido" ).prepend("<div id='morecontent'></div>");
    
    $("<ul class='jsonSuggest' role='listbox' style='top: 31px; left: 0px; width: 226px; z-index: 999; height: 350px; overflow-x: hidden; overflow-y: auto; '>").replaceWith("<ul class='jsonSuggest' role='listbox' style='top: 31px; left: 0px; width: 390px; z-index: 999; height: auto; overflow-y: auto; display: block; overflow-x: visible;'>");
    
    $('.centrar_bloque').css('width', 'auto');
    
    $('.jsonSuggest').css('-webkit-box-shadow', '0px 0px 20px -5px');
	
	$( ".center_nav" ).prepend( "<div id='night_frame'><span class='nightspan'>Modo</span><div class='menu_n'><div class='link_night'><a onclick='nightpage()' accesskey='o' style='width:auto;'>Oscuro<div class='dot night-dot'></div></a></div><div class='link_black'><a onclick='blackpage()' accesskey='n' style='width:auto;'>Negro <div class='dot black-dot'></div></a></div></div></div>" );
    
    $("#navbar").prepend("<div id='moreblock'><div class='left'><a class='about__close' onclick='more()'>Cerrar</a><div class='about__legal'><ul class='sc-list-nostyle about__legalList sc-clearfix'><li><a id='topnav1' onclick='closeat()' class='lihere'>&Uacute;ltimo Episodio Visto</a></li><li><a id='topnav2' onclick='atajos()'>Atajos de teclado</a></li></ul></div><div class='about__keyboardShortcutsContent__inner antepisodes'></div><div class='about__keyboardShortcutsContent__inner atajos'><dl class='kbd-big'><dt><kbd><kbd class='sc-font'>Alt</kbd><kbd class='sc-font'>O</kbd></kbd></dt><dd>Visualizaci&oacute;n modo Oscuro</dd></dl><dl class=''><dt><kbd><kbd class='sc-font'>Alt</kbd><kbd class='sc-font'>N</kbd></kbd></dt><dd>Visualizaci&oacute;n modo Negro</dd></dl><dl class='kbd-big'><dt><kbd><kbd class='sc-font'>Alt</kbd><kbd class='sc-font'>C</kbd></kbd></dt><dd>Cambiar tama&ntilde;o de Reproductor</dd></dl><dl class=''><dt><kbd><kbd class='sc-font'>Alt</kbd><kbd class='sc-font'>I</kbd></kbd></dt><dd>Ir a Inicio</dd></dl><dl class=''><dt><kbd><kbd class='sc-font'>Alt</kbd><kbd class='sc-font'>A</kbd></kbd></dt><dd>Ir a Animes</dd></dl><dl class=''><dt><kbd><kbd class='sc-font'>Alt</kbd><kbd class='sc-font'>P</kbd></kbd></dt><dd>Ir a Peliculas</dd></dl><dl class=''><dt><kbd><kbd class='sc-font'>Alt</kbd><kbd class='sc-font'>A</kbd></kbd></dt><dd>Episodio Anterior</dd></dl><dl class=''><dt><kbd><kbd class='sc-font'>Alt</kbd><kbd class='sc-font'>S</kbd></kbd></dt><dd>Episodio Siguiente</dd></dl><dl class=''><dt><kbd><kbd class='sc-font'>Alt</kbd><kbd class='sc-font'>L</kbd></kbd></dt><dd>Lista de Episodios</dd></dl></div></div><div style='visibility:hidden; display:none;'><a href='http://animeflv.net/' accesskey='1'>Inicio</a><a href='http://animeflv.net/animes/' accesskey='2'>Animes</a><a href='http://pelisgg.com//' accesskey='3'>Peliculas</a></div></div>")
    
    if (window.location.href.indexOf("ver") > -1)
    {
	
		$( '.menu_n' ).append("<div id='closeplayer' style='padding: 5px 0; width: 80px;'><center><a onclick='playerbig()' accesskey='c'>Cambiar Tama&ntilde;o de Reproductor</a></center></div>");
        
        $( '.menu_n' ).addClass('add_close');
		
		$(".center_nav").append("<div class='header__farRight header__container'><ul class='header__navMenu header__iconMenu'><li class='header__playbackControl header__playbackControls'>	<a class='skipControl skipControl__previous'></a></li><li class='header__playbackControl header__playbackTitle header__bordered'><a class='playbackTitle sc-truncate' accesskey='l' title='Lista de Episodios'></a></li><li class='header__playbackControl header__playbackControls'><a class='skipControl skipControl__next'></a></li></ul></div>");
        
        $("#flashplayer").attr("width", "100%");
        
        $("#flashplayer").attr("height", "100%");
        
        $("#flashplayer").prepend('<param name="scale" value="noScale" />');
        
        var completevideo = ""
        videointro = "<embed allowfullscreen='true' src='/archivos/player.swf' bgcolor='#000' type='application/x-shockwave-flash' wmode='transparent' pluginspage='http://www.macromedia.com/go/getflashplayer' flashvars='";
        videofile = ""
        videoend = "stretching=uniform&amp;screencolor=000&amp;plugins=backstroke-1,timeslidertooltipplugin-1' width='auto' class='' height='auto' style='height: calc(100%); height: -webkit-calc(100%); width: 100%; min-height: 463px;' scale='noscale'><div class='videosize'></div>";
        
        videofile = document.getElementById("video_player").innerHTML.substr(198, 153);
        
        completevideo = videointro + videofile + videoend;
        
        $("#video_player embed").remove();
        
        $( "#video_player" ).prepend( completevideo );
        
        $("#flashplayer embed").attr("width", "100%");
        
        $("#flashplayer embed").attr("height", "100%");
        
        var $listaepi = $(".lista_episodios").attr("href");
        
        var animetitlethis = $(".episodio_titulo").children().last().html();
        
        var animetitle = animetitlethis.lastIndexOf(" ");
        
        var animeepi = animetitlethis.substr(animetitle + 1);
        
        animetitle = animetitlethis.substr(0, animetitle);
        
        $(".playbackTitle").attr("href", $listaepi);
        
        $(".playbackTitle").attr("title", animetitle + " - " + animeepi);
        
        $(".playbackTitle").html("<center>" + animetitle + " - " + animeepi + "</center>");
        
        animeepi = animeepi - 1;
        
        var locatenum = window.location.href.lastIndexOf("-");
        
        var windowlocate = window.location.href.substr(0,locatenum + 1);
        
        /**for (animeepi; animeepi>0; animeepi--)
        *{
        *    $(".antepisodes").append("<li><a href='" + windowlocate + animeepi + ".html'>" + animetitle + " " + animeepi + "</a></li>");
        *}
        */
    }
        
    var episodes = $(".episodio_head").html();
    
    var $epiante = $(".episodio_titulo").children("a").first().attr("href");
    
    var $comprobacion = $(".episodio_titulo").children("a").first().attr("style");
    
    var $episig = $(".episodio_titulo").children("a").eq(1).attr("href");
    
    if ($comprobacion == "float: left;")
    {
        
        $(".skipControl__previous").attr("href", $epiante);
        
        $(".skipControl__previous").attr("title", "Episodio Anterior");
        
        $(".skipControl__previous").attr("accesskey", "a");
        
        if ($episig == undefined)
        {
            
            $(".skipControl__next").addClass("disabled");
            
            $(".skipControl__next").attr("title", "No Existe");
            
        }
        else
        {
            
            $(".skipControl__next").attr("href", $episig);
            
            $(".skipControl__next").attr("title", "Episodio Siguiente");
            
            $(".skipControl__next").attr("accesskey", "s");
        }
        
    }
    else if ($comprobacion == "float: right;") {
        
        $(".skipControl__previous").addClass("disabled");
        
        $(".skipControl__previous").attr("title", "No Existe");
        
        $(".skipControl__next").attr("href", $epiante);
        
        $(".skipControl__next").attr("title", "Episodio Siguiente");
        
        $(".skipControl__next").attr("accesskey", "s");
        
    }
        else
    {
        
        $(".skipControl__previous").addClass("disabled");
        
        $(".skipControl__next").addClass("disabled");
        
        $(".skipControl__previous").attr("title", "No Existe");
        
        $(".skipControl__next").attr("title", "No Existe");
        
    }
    
    $(".antepisodes").html("<li><a href='#'>NO HAY HISTORIAL DISPONIBLE</a></li>");
    
    
    if ($('.jsonSuggest').is(":visible")){
        $('.buscador').css('box-shadow', '0px 9px 20px -5px black');
    }
    else {
        $('.buscador').css('box-shadow', '0px 0px 0px -5px black');
    }
    
    $('.opcion span').each(function(){ $(this).remove(); });
    
    $('.opcion').each(function(){ $(this).attr('class', 'opt'); });
    
    $descargasbox = $('#descargas_box.box_opc').html();
    
    $('#menu_epi').html('<div class="opt title">Descargas</div>' + $descargasbox );
    
    $('#menu_epi .opt a').each(
		function()
		{
			$var1 = $( this ).attr("href");
			$var1 = $var1.replace("/d.php?url=", "");
			$var1 = $var1.replace("%3A", ":");
			$var1 = $var1.replace("%2F", "/");
			$var1 = $var1.replace("%2F", "/");
			$var1 = $var1.replace("%2F", "/");
			$var1 = $var1.replace("%2F", "/");
			$var1 = $var1.replace("%2F", "/");
			$var1 = $var1.replace("%2F", "/");
			$var1 = $var1.replace("%2F", "/");
			$( this ).attr("href",$var1);
		}
    );
    
    function getCookie(c_name)
    
    {
        
        var c_value = document.cookie;
        
        var c_start = c_value.indexOf(' ' + c_name + '=');
        
        if (c_start == -1)
            
        {
            
            c_start = c_value.indexOf(c_name + '=');
            
        }
        
        if (c_start == -1)
            
        {
            
            c_value = null;
            
        }
        
        else
            
        {
            
            c_start = c_value.indexOf('=', c_start) + 1;
            
            var c_end = c_value.indexOf(';', c_start);
            
            if (c_end == -1)
                
            {
                
                c_end = c_value.length;
                
            }
            
            c_value = unescape(c_value.substring(c_start,c_end));
            
        }
        
        return c_value;
        
    }
    
    function setCookie(c_name,value,exdays)
    
    {
        
        var exdate=new Date();
        
        exdate.setDate(exdate.getDate() + exdays);
        
        var c_value=escape(value) + ((exdays==null) ? '' : '; expires='+exdate.toUTCString());
        
        document.cookie=c_name + '=' + c_value;
        
    }
    
    function checkCookie()
    
    {
        var thisLoc=getCookie('thisLoc');
        
        var LocationHere = thisLoc;
        
        if (window.location.href.indexOf('ver') > -1)
            
        {
            
            thisLoc = window.location.href.replace('#', '');
            
            setCookie('thisLoc',thisLoc,365);
            
        }
        
        return LocationHere;
    }
    var cookieAnime = checkCookie();
    if (cookieAnime!=null || cookieAnime!="")
    {
		var lastName="";
		if(cookieAnime){
		if(cookieAnime.length>15){
        lastName = cookieAnime.replace("http://animeflv.net/ver/", "");
		}else{lastName = cookieAnime;}
        lastName = lastName.replace(/-/gi, " ");
        lastName = lastName.replace(".html", "").toUpperCase();
        $(".antepisodes").html("<li><a href='" + cookieAnime + "'>" + lastName + "</a></li>");
		}
        else
        {
            $(".antepisodes").html("<li><a href='#'>Sin Historial</a></li>");
        }
    }
    
}

$( window ).load( readyFn );