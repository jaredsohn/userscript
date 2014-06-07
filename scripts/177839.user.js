// ==UserScript==
// @name           Strims.pl - LeftMenu
// @namespace      strims_leftmenu
// @downloadurl    http://userscripts.org/scripts/source/177839.user.js
// @updateurl      http://userscripts.org/scripts/source/177839.meta.js 
// @description    Dodaje menu po lewej stronie podobne do tego z pierwszych wersji strony.
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js
// @include        *strims.pl*
// @version        0.2.3
// @grant          none
// ==/UserScript==
// pobieranie danych
function simivarData( link, id ){
    $.getJSON( link, function(e){
        if( e.status && e.status == "OK" ){
           $( id ).html( e.content );
           localStorage.setItem( "strimsLeftMenu_" + id, e.content );
        }
    });
}
// data
function siDate( hours ){
    var date = Math.round((new Date().getTime() / 1000));
    if( hours > 0 ){
        var min = hours*60*60;
        return date + min;
    }
	return date;
}

// pobiera dane i zapisuje w localStorage
function dataLocal(){
    localStorage.setItem( "strimsLeftMenu_date", siDate( 1 ) );
    simivarData( 'http://strims.pl/ajax/utility/submenu?section_type=s&section_name=Subskrybowane', '#s');
    simivarData( 'http://strims.pl/ajax/utility/submenu?section_type=s&section_name=Glowny', '#g');
    simivarData( 'http://strims.pl/ajax/utility/submenu?section_type=s&section_name=Moderowane', '#m');
    simivarData( 'http://strims.pl/ajax/utility/submenu?section_type=u&section_name=Subskrybowani', '#z');
}
// 
function dateCheck(){
    var date = siDate( 0 );
    if( localStorage.getItem( "strimsLeftMenu_date" ) ){
        if( date > localStorage.getItem( "strimsLeftMenu_date" ) ){
            dataLocal();
        } else {
            $("#s").append( localStorage.getItem("strimsLeftMenu_#s") ); 
            $("#g").append( localStorage.getItem("strimsLeftMenu_#g") );
            $("#m").append( localStorage.getItem("strimsLeftMenu_#m") );
            $("#z").append( localStorage.getItem("strimsLeftMenu_#z") );
            localStorage.setItem( "strimsLeftMenu_date", siDate( 1 ) );
        }    
    } else {
        dataLocal();
    }
}

$(function() {    
    // stylujemy
    if( page_template.night === true ){
        color = "#1E1E1E";
        colorHover = "#282828";
        border = "#505050";
    } else {
        color = "#F7F7F7";
        colorHover = border = "#C8C8C8";
    } 
    var style = "<style type=\"text/css\">#left-menu-simivar .top_bar_submenu ul li:hover{background:"+colorHover+";}#left-menu-simivar .top_bar_submenu ul li a{width:192px;float:left;margin-left:8px}#left-menu-simivar .count{color:#8C8C8C;float:right;margin-right:8px}#left-menu-simivar .top_bar_submenu ul li{width:200px;min-height:24px;border-bottom:1px solid "+colorHover+";padding-top:5px;float:left}#left-menu-simivar .top_bar_submenu_more{float:right}#left-menu-simivar .current{background:"+colorHover+";float:left;height:100%}#left-menu-simivar .hide{position:absolute;top:-9999px;left:-9999px}#s,#m,#z,#g{margin-top:15px}.template_wrapper{padding:0 50px;max-width:100%;margin:0}.column.center.with_right{margin-left:230px}div.column.center{width:auto}</style>";
    $(document.head)
       .append(style,'<script type="text/javascript" src="http://strims.swimg.pl/ses/js/leftmenu-organictabs.js" type="text/css"></script>') ;
    $('.column.right').css('float','right');

    // tworzymy menu
    $('<div />')
        .html( $('<ul />').css({"background":color,"width":"99px","height":"24px","border":"1px solid "+border}).addClass('nav') )
        .addClass('column left')
        .attr('id', 'left-menu-simivar')
        .css({"float":"left","margin-right":"-150px","max-width":"150px"})
        .prependTo( $(".template_wrapper .page") );
    var menu = [$('<li />').html('<a href="#s"><img src="http://i.imgur.com/wVbhQuR.png" title="Subskrybowane"/></a>').addClass('nav-one').css({"display":"inline","border-right":"1px solid "+border,"float":"left","height":"100%"}),
        $('<li />').html('<a href="#g"><img src="http://i.imgur.com/GPVLreT.png" title="Główny"/></a>').addClass('nav-two').css({"display":"inline","border-right":"1px solid "+border,"float":"left","height":"100%"}),
        $('<li />').html('<a href="#m"><img src="http://i.imgur.com/LQRK8ZE.png" title="Moderowane"/></a>').addClass('nav-three').css({"display":"inline","border-right":"1px solid "+border,"float":"left","height":"100%"}),
        $('<li />').html('<a href="#z"><img src="http://i.imgur.com/AjqDeEu.png" title="Znajomi"/></a>').addClass('nav-four last').css("display","inline") ]
    $('.nav').append( menu[0], menu[1], menu[2], menu[3] );
	$('.nav-one a').addClass('current');

    // tworzymy podstrony  
    var lists = [ $('<ul />').attr('id', 's'),  $('<ul />').addClass('hide').attr('id', 'g'),
    $('<ul />').addClass('hide').attr('id', 'm'),  $('<ul />').addClass('hide').attr('id', 'z')];
    $('#left-menu-simivar').append( lists[0], lists[1], lists[2], lists[3] );
      
    dateCheck();
});