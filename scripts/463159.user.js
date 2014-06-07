// ==UserScript==
// @name       xhamster.com
// @namespace  http://use.i.E.your.homepage/
// @version    0.83
// @description  Several enhancements.
// @match      *://xhamster.com/*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @require	   https://raw.github.com/riklomas/quicksearch/master/jquery.quicksearch.js
// @require	   https://raw.githubusercontent.com/carhartl/jquery-cookie/master/jquery.cookie.js
// @require	   https://raw.github.com/Sjeiti/TinySort/master/src/jquery.tinysort.js
// @require	   http://xxbililite.com/inc/bililiteRange.js
// @require	   http://xxbililite.com/inc/jquery.sendkeys.js
// @require    http://eu-st.xhamster.com/js/tpl2.gallery.slide.js
// @grant      GM_log
// @copyright  2014+, You
// ==/UserScript==

function searchMenue(){

    $( "#searchFrom > div:nth-child(6)" ).insertAfter( "#searchFrom .menu2" );
    
    var newSearchMenue = ' '
	+	'<div class="box">'
	+		'<div class="head gr">Filter Search</div>'
	+		'<div class="boxC radio" style="height: 105px">'
	+			'<label class="sel"><input type="radio" name="unFiltered" value="" checked=""> Unfiltered</label>'
	+			'<label class=""><input type="radio" name="exactMatch" value=""> Exact Match</label>'
	+			'<label><input type="radio" name="filterMore" value=""> Filter More<div id="searhthis" style="margin-top:10px;"><input id="sub_search"></div></label>'
	+		'</div>'
	+	'</div>';
    $( "#searchFrom .menu2" ).after( newSearchMenue ); 
    
    $("#sub_search, #searchRes2 > div.box > div.boxC > table > tbody > tr > td > div:nth-child(2) > u").on("change keyup paste", function(){
        
        $('input#sub_search').quicksearch('.video');
        
        var newinputtext = $( '#sub_search' ).val();
        $.cookie( "inputtext", newinputtext );

	});
      
}

function wideVideo(){
    
    function wideButton(){
        
        var newButtonWideVideo = ' '
        +	'.clear {'
        +		' display: none;'
        +		' }'           
        $("style#tamper").append( newButtonWideVideo );  
        
        if ( $('#buttonWide').size() == 0 )
        {          
            var newSearchMenue = ' '
            +	'<td>'
            +		'<a id="buttonWide" href="#" hint="" overicon="iconFlagOver">'
            +			'<div class="icon iconFlag"></div>'
            +		'</a>'
            +	'</td>';
            $( "#searchFrom .menu2" ).after( newSearchMenue );                                    
        }
    }
    
    wideButton();

    function wideVideoCss(){
        
        $('<style id="wideVideo"></style>').appendTo('head');
        
        var newWideVideo = ' '
        +	'.clear {'
        +		' display: none;'
        +		' }'
        +	'.video {'
        +		' height: 240px;'
        +		' max-height: none;'
        +		' width: 245px;'
        +		' }'
        +	'#searchResR, .video .xhSprite {'
        +		' display: none;'
        +		' }'
        +	'.video .thumb, .video .hSprite {'
        +		' zoom: 1.53 !important;'
        +		' }'
        +	'.video b, .video .hPaid {'
        +		' top: 166px;'
        +		' color: antiquewhite;'
        +		' background: rgba(139, 0, 0, 0.45);'
        +		' }';           
        $("style#wideVideo").append( newWideVideo ); 
    }
    
    var wide = $('style#wideVideo').size();
    
    if ( wide == 1 )
    {
    	$("style#wideVideo").remove();
    }
    else if ( wide == 0 )
    {
    	wideVideoCss();        
    }
}

function basic(){
    
    var newRulesSortMenue = ' '
	+	'.clear {'
	+		' display: none;'
	+		' }'
	+	'.video {'
	+		' height: 240px;'
	+		' max-height: none;'
	+		' width: 245px;'
	+		' }'
	+	'#searchResR, .video .xhSprite {'
	+		' display: none;'
	+		' }'
	+	'.video .thumb, .video .hSprite {'
	+		' zoom: 1.53 !important;'
	+		' }'
	+	'.video b, .video .hPaid {'
	+		' top: 166px;'
	+		' color: antiquewhite;'
	+		' background: rgba(139, 0, 0, 0.45);'
	+		' }';           
    $("style#tamper").append( newRulesSortMenue );   
}

function movies(){
    
    var newRulesSortMenue = ' '
	+	'#idxFeach {'
	+		' display: none !important;'
	+		' }'
	+	'.adVideo2 {'
	+		' display: none;'
	+		' }'
	+	'#playerBox, #commentBox, #related {'
	+		' width: 1350px !important;'
	+		' position: relative;'
	+		' left: -186px;'
	+		' }'
	+	'#player, #player object, #playerSwf, #player .noFlash {'
	+		' height: 800px !important;'
	+		' width: 1330px !important;'
	+		' }'
	+	'#relatedVidList, #relatedVidList .loader {'
	+		' width: 898px;'
	+		' height: 380px;'
	+		' }'
	+	'#relatedVid .arrowL, #relatedVid .arrowR {'
	+		' width: 50px;'
	+		' }';
    
    newRulesSortMenue += ' '
	+	'.video {'
	+		' zoom: 1.4;'
	+		' height: 150px;'
	+		' width: 160px;'
	+		' max-height: inherit;'
	+		' }'
	+	'#relatedVidList {'
	+		' width: 1246px;'
	+		' }'
	+	'.video u {'
	+		' zoom: 0.7;'
	+		' }'
	+	'.hRate, .hUnrate, .hNorate {'
	+		' zoom: 0.7;'
	+		' }'
	+	'.video b, .video .hPaid {'
	+		' zoom: 0.7;'
	+		' top: 154px;'
	+		' background: rgba(107, 74, 74, 0.56);'
	+		' }'
	+	'.tabs .content {'
	+		' max-width: inherit;'
	+		' }'
	+	'#relatedVid .arrowR a, #relatedVid .arrowL a {'
	+		' margin-top: 194px;'
	+		' } ';           
    $("style#tamper").append( newRulesSortMenue );  
    
    $('#buttonWide').on('click',function(){

        wideVideoCss();
        
    });   
}

function search(){
    
    basic();
    
    if ( $("#searchMenu").length != 0 ) { 
        $('.main').css('cssText','width: 1507px;'); 
        $('#searchFrom, #searchMenu').css('cssText','width: 222px;');
        searchMenue(); 
    } else {
        $('.main').css('cssText','width: 1275px;'); 
    }
    
}

function channel(){
    
    basic();

    $('.main').css('cssText','width: 1422px;'); 
    $(".pager").before('<div class="clear" style="display: block;"></div>');
    
}

function preSorter(){
    
    if( !$('.boxTL .boxC>div').hasClass('sortedBYme') )
    {        
        var counter = 1;
        $('.boxTL .boxC>div').each(function(counter)
        {            
            $( this ).addClass('sortedBYme');
            $( this ).attr( 'data-SortCounts', counter );
            $( this ).attr( 'data-SortLength', $( this ).find('b').text() );
            counter++;              
        });    
    }
}

function pager(){
    
    $(".boxTL .boxC>div.pager").attr('id','pager-bottom');
    $(".box.boxTL .boxC").attr('id','target-GPM');

    $( "#pager-bottom" ).insertAfter( $( "#target-GPM" ) );
    
    var field1 = $('#pager-bottom').clone();
    field1.attr('id','pager-top');
    field1.insertBefore( $( "#target-GPM" ) );
    
    $( "#pager-top, #pager-bottom" ).css('cssText','width: 1277px; margin-left: 0px; padding-bottom: 10px; ');
    
}

function SizeDate(){
      
    var newButtonsMenue = '', sortOrder = '', buttonToSelect = $.cookie( "newSizeDate" );
    
    newButtonsMenue = 
        '<a id="sortbydate" class="sel">Date</a>' +
		'<a id="sortbylength" class="">Length</a>';        
    $( "div.btnsRight" ).append( newButtonsMenue );     
    if ( ares[3] == 'new') { 
        $( ".box .head .btnsBetween" ).append( newButtonsMenue ); 
    }
        
    function selButton(){
        
        console.log('buttonToSelect',buttonToSelect);
        
        if ( buttonToSelect == 'date' ){
            sortOrder = 'asc';
            $('#sortbylength').removeClass('sel');
            $('#sortbydate').addClass('sel');       
            $('.vDate, .fl').css('cssText','display: block;');
            pager();
            preSorter();       
            $('.boxTL .boxC>div').tsort({attr:'data-SortCounts', order: sortOrder });
            
        } else if ( buttonToSelect == 'lenght' ){
            sortOrder = 'decs';
            $('#sortbydate').removeClass('sel');
            $('#sortbylength').addClass('sel');
            $('.vDate, .fl').css('cssText','display: none;');
            pager();
            preSorter();  
            $('.boxTL .boxC>div').tsort({attr:'data-SortLength', order: sortOrder });
        } else {        
            buttonToSelect = 'lenght';
            selButton();            
        }
    }
    
    selButton();
    
    $('#sortbydate').on('click', function(){
        var newSizeDate = 'date',sortOrder = 'asc';    
        $('#sortbylength').removeClass('sel');
        $('#sortbydate').addClass('sel');
        $('.vDate, .fl').css('cssText','display: block;');
        $.cookie( "newSizeDate", newSizeDate );
        $('.boxTL .boxC>div').tsort({attr:'data-SortCounts', order: sortOrder });        
    });

    $('#sortbylength').on('click', function(){
        var newSizeDate = 'lenght',sortOrder = 'decs';
        $('#sortbydate').removeClass('sel');
        $('#sortbylength').addClass('sel');
        $('.vDate, .fl').css('cssText','display: none;');
        $.cookie( "newSizeDate", newSizeDate );        
        $('.boxTL .boxC>div').tsort({attr:'data-SortLength', order: sortOrder });        
    });
    

}

function photo(){
    
    $('<style id="photos"></style>').appendTo('head');
    
    var photos = ' '
    +	'.gallery .thumb span {'
    +		' zoom: .7;'
    +		' }'
    +	' .gallery .thumb {'
    +		' zoom: 1.5;'
    +		' }';           
    $("style#photos").append( photos ); 
    
}

function userProfile(){
    
    $(".profile .breff tr.title").css('height','41px');
    
    var firstPart = 'http://xhamster.com/user/',
        lastPart = window.location.href.match(/user\/(.*)/)[1],
        videoPageLink = firstPart + 'video/' + lastPart + '/new-1.html',
        InsertHtml = '<tr><td><span>Videos:</span></td><td><a href="'+videoPageLink+'" style="color:blue">Go there</a></td></tr><tr></tr>';
    $( InsertHtml ).insertAfter( $( ".profile .breff tr:last-child" ) );
        
}

if ("onhashchange" in window) {
//$(document).ready(function(){
    
    var astr = window.location.href;														console.log('astr',astr);
    var ares = astr.split("/");
    
    $('<style id="tamper"></style>').appendTo('head');
           
    if ( astr == 'http://xhamster.com/ee' )
    {        
		$('div#vPromo, div#idxFeach').css('margin-top','40px');
        console.log('root');          
    }
    else if ( ares[3] == 'movies' )
    {        
        movies();
        wideVideoCss();
    }
    else if ( ares[3] == 'user' )
    {    
        if ( ares[4] !== 'video' ){ userProfile(); }  
        else if ( ares[4] == 'video' ){ channel(); } 
    } 
    else if ( ares[3].substring(0,6) == 'search' )
    {       
        search();
        
        var arrayQuery = astr.split("?"); 
        arrayQuery = arrayQuery[1].split("&");												
        
        $.each(arrayQuery, function(Index, value)
        {        
            if( value.substring(0,1) === 'q' && value.substring(0,4) != 'qcat') 
            {                
                var searchQuery = value.split("=");											console.log(Index,value);									
                if ( searchQuery[1] == $.cookie("searchQuery") ) 
                {
                    var inputtext = $.cookie("inputtext");									console.log('sameSearchQuery',$.cookie("searchQuery"));
                    $('input#sub_search').val( inputtext ).focus();
                } 
                else if ( searchQuery[1] != $.cookie("searchQuery") ) 
                {																			console.log('newSearch');console.log('oldSearchQuery',$.cookie("searchQuery"));
                    $.cookie( "searchQuery", searchQuery[1] );
                    $('input#sub_search').focus();                
                }
            }
        });
    }
    else if ( ares[3] == 'photos' && ares[4] == 'view')
    {        
        document.addEventListener('keydown', function(e) {
            GM_log(e.keyCode);
            if (e.keyCode == 37) {
                slide.showPrev(true);
                $("a.prev").click();
            }
            if (e.keyCode == 39) {
                slide.showNext(true);
                $("a.next").click();
            }
        }, false);
        
        console.log('ViewPhotos');        
    } 
    else if ( ares[3] == 'photos' || ares[3] == 'channels' || ares[3] == 'new')
    {        
        channel();
        SizeDate();
        if ( ares[3] == 'photos'){
        	photo();
        }    
        console.log('pcn');  
    } 
    else 
    {        
       // channel();        
    }    
           
}