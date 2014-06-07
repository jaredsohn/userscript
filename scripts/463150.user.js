// ==UserScript==
// @name       Swefilmer
// @namespace  http://use.i.E.your.homepage/
// @version    0.9242
// @description  Easier Navigation, when you see TV-series. Works on all language.
// @updateURL      https://userscripts.org/scripts/source/463150.meta.js
// @installURL     https://userscripts.org/scripts/source/463150.user.js
// @match      http://www.swefilmer.com/*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @run-at     document-end
// @grant      GM_getValue
// @grant      GM_setValue
// @grant      GM_deleteValue
// @copyright  2014+, Magnus Fohlström
// ==/UserScript==

(function ($) { 
    $.fn.waitUntilExists	= function (handler, shouldRunHandlerOnce, isChild) {
        var found	= 'found';
        var $this	= $(this.selector);
        var $elements	= $this.not(function () { return $(this).data(found); }).each(handler).data(found, true);   
        if (!isChild) {
            (window.waitUntilExists_Intervals = window.waitUntilExists_Intervals || {})[this.selector] =
                window.setInterval(function () { $this.waitUntilExists(handler, shouldRunHandlerOnce,     
        true); }, 500);
        } else if (shouldRunHandlerOnce && $elements.length) {
            window.clearInterval(window.waitUntilExists_Intervals[this.selector]);
        }
		return $this;
	}   
}(jQuery));

function navMenue()
{
    $('<style id="navMenue"></style>').appendTo('head');
    
    var newRule_navMenue = ' '
    +	'.navMenue {'
    +		'border-color: rgb(117, 98, 69);'
    +		'border-radius: 10px;'
    +		'border-width: 2px;'
    +		'border-style: solid;'
    +		'background-color: rgb(146, 133, 117);'
    +		'padding: 3px 16px;'
    +		'margin-right: 6px;'
    +		'top: 1px;'
    +		'position: relative;'
    +		'}'
    +	'#myConfigButton {'
    +		'float: left;'
    +		'font-size: 17px;'
    +		'margin-left: 2px;'
    +		'margin-top: 5px;'
    +		'}'
    +	'#myConfigButton img {'
    +		'margin-right: 5px;'
    +		'height: 29px;'
    +		'border-radius: 10px;'
    +		'}'
    +	'#lightHolder:hover {'
    +		'cursor: pointer;'
    +		'}'
    +	'a:focus, .navMenue:hover a, a:active {'
    +		'text-decoration: none;'
    +		'color: aliceblue;'
    +		'}';
    $("style#navMenue").append( newRule_navMenue );
    
    var newHtml_navMenue =
        '<span id="myConfigButton" style="float:left">'
    +		'<span id="lightHolder"></span>'
    +		'<span id="prevMenue" class="navMenue"><a href="#"> Previous </a></span>'
    +		'<span id="nextMenue" class="navMenue"><a href="#"> Next </a></span>'
    +		'<span id="wideMenue" class="navMenue sizeing"><a href="#"> Wide </a></span>'
    +		'<span id="orginMenue" class="navMenue sizeing"><a href="#"> Orginal </a></span>'
    //+		'<span id="playMenue" class="navMenue"><a href="#"> Play </a></span>'
    +	'</span>';
    $( newHtml_navMenue ).insertAfter( ".fsol" );
    $( "#lightHolder" ).prepend( $( "#lightningOff" ) );
}

function widePlayer()
{
    $('<style id="widePlayer"></style>').appendTo('head');
    
    var newRule_widePlayer = ' '
    +	'#content > div.filmborder {'
    +		'margin-left: 0px;'
    +		'width: 975px;'
    +		'}'
    +	'#content > div.filmborder > div.filmcontent {'
    +		' width: 975px;'
    +		'}'
    +	'.filmicerik object, .filmicerik embed, .filmicerik iframe, .filmicerik {'
    +		'width: 958px;'
    +		'}'
    +	'.filmcontent {'
    +		'width: 732px;'
    +		'}'
    +	'.filmicerik object, .filmicerik embed, .filmicerik iframe {'
    +		'height: 714px;'
    +		'}';
    $("style#widePlayer").append( newRule_widePlayer );	    	
}

function lightning()
{
    $('<style id="lightning"></style>').appendTo('head');
    
    var newRule_lightning = ' '
    +	'div#sidebar, .filmborder, .alt2, .alt .fsol, .facebok, .facepaylas, .alt .fsag, .center, .yazitip, .fast_part, .fast_rating, #topnavbar, #header, #navbarborder, .navMenue {'
    +		'opacity: 0.0;'
    +		'}'
    +	'body, div.alt {'
    +		'background: #191919;'
    +		'}'
    +	'body {'
    +		'background: rgb(18, 18, 18);'
    +		'}';
    $("style#lightning").append( newRule_lightning );
}

function ScrollZoomTune(selection,zomms,tune,ani)
{    
    var position = $( selection ).position(); 
    $('body').css('zoom',zomms);
    
    if( position == "undefined" )
    {
        console.log('is undis');
    } else {
        position = position.top;
        position = position + tune;
        if( ani == 1 ){
            $('body').animate({ scrollTop: position * zomms });}
        else{
            $('body').scrollTop( position * zomms);
        }
    }
}

function Colorize(thisnode)
{
    $(thisnode).prevAll().css('color','').attr('id','');
    $(thisnode).prev().css('color','lightblue').attr('id','next');
    $(thisnode).css('color','rgb(246, 120, 120)').attr('id','');
    $(thisnode).nextAll().css('color','').attr('id','');
    $(thisnode).next().css('color','rgb(146, 218, 146)').attr('id','prev'); 
}

$('#lightsoff').waitUntilExists(function()
{   
    $( "#lightsoff img" ).attr('id','lightningOff');
    
    navMenue();
    
    $('#prevMenue, #nextMenue, #OrginMenue').hide();
    
    $('#content > div.leftC > div:nth-child(1)').attr('id','movies');
    
    $( "#lightningOff" ).on('click',function(){	
        if( $('style#lightning').size() == 0 ) {
        	lightning();
            $('.yazitip').css('opacity','0.4');
            $('#movies').css('opacity','1');
            $('#lightHolder').css('opacity','0.5');
            $('#wideMenue, #orginMenue, #prevMenue, #prev, #nextMenue, #lightningOff').css('opacity','0.05');
            $('#lightningOff').css('opacity','1');
            $('#wideMenue, #orginMenue, #prevMenue, #prev, #nextMenue, #lightningOff').on('mouseenter', function(){
                $(this).css('opacity','0.75');
            }).on('mouseleave', function(){
                $(this).css('opacity','0.05');
            });
            $('#lightHolder').on('mouseenter', function(){
                $(this).css('opacity','0.95');
            }).on('mouseleave', function(){
                $(this).css('opacity','0.5');
            });
        } else {
        	$('style#lightning').remove();
            $('#wideMenue, #orginMenue, #prevMenue, #prev, #nextMenue, #lightningOff, .yazitip, #lightHolder').css('opacity','1');
            $('#wideMenue, #orginMenue, #prevMenue, #prev, #nextMenue, #lightningOff, #lightHolder').on('mouseenter', function(){
                $(this).css('opacity','1');
            }).on('mouseleave', function(){
                $(this).css('opacity','1');
            });
        }
    });
    
    $('#wideMenue').on('click',function(){
        
        $( "#content" ).prepend( $( "#movies" ) );
        widePlayer();
        $('#orginMenue').show();
		$(this).hide();

        GM_setValue( "swefiler_state", "wide" );
    });
    
    $('#orginMenue').on('click',function(){	
        
        $( ".leftC" ).prepend( $( "#movies" ) );  
        $("style#widePlayer").remove(); 
        $('#wideMenue').show();
		$(this).hide();  
        
        GM_setValue( "swefiler_state", "orgin" );         
    });
    
    //GM_deleteValue( "swefiler_state" );     
    function state()
    {
        $('#' + GM_getValue( 'swefiler_state' ) + 'Menue' ).click().addClass('gotGM');
        
        if( $('.gotGM').size() == 0 ) {
            GM_setValue( "swefiler_state", "orgin" );
            state();
        }
    }    
    state();

    document.addEventListener('keydown', function(e) {
        GM_log(e.keyCode);
        if (e.keyCode == 66) {
            $("#prev").click();
        }
        if (e.keyCode == 78) {
            $("#next").click();
        }
        if (e.keyCode == 76) {
            $("#lightningOff").click().css('opacity',$('#nextMenue').css('opacity'));
        }
        if (e.keyCode == 87) {
            $('.sizeing:visible').click();
        }
    }, false);  
      
});
//while ( $('#fastdizidata > a:nth-child(1)').size() != 1 )
$('#fastdizidata > a:nth-child(1)').waitUntilExists(function()
{
    $('#prevMenue, #nextMenue').show();
    
    $('#fastdizidata > a:contains(' + $('#yazibasligi').text() + ')').each(function(){
        Colorize(this);
    });

    function scrollIt(time)
    {
        setTimeout(function() {
            if( $(window).height() <= 866 ){
                ScrollZoomTune('#movies',1,100,1);
            } else {
                ScrollZoomTune('#movies',1,1,1);
            }
        }, time);
    }
    $('#movies').focus();
    scrollIt(1000);
    $(window).resize(function(){ 
        scrollIt(120);
    });
    $('body').on('click',function(e){
        if( e.target == this ){ 
        	scrollIt(50);
        }
    });

    $('#fastdizidata > a').on('click',function(){
        Colorize(this);
        scrollIt(500);
    });
    
    $('#prevMenue').on('click',function(){
        $('#prev').click();
    });
    
    $('#nextMenue').on('click',function(){
        $('#next').click();
    });
    
    $('.yazitip.cpointer').click();
});

$(document).ready(function(){

    if( $('#header .headerleft a').size() > 0 && $('.yazitip.cpointer').size() > 0 )
    {
        $('.yazitip.cpointer').click();
    }

});