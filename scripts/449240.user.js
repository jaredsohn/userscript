// ==UserScript==
// @name			Enhansed Youtube Eperience
// @namespace		        http://use.i.E.your.homepage/
// @version			0.8
// @description		        Thing are there with me
// @updateURL                   https://userscripts.org/scripts/source/449240.meta.js
// @installURL                  https://userscripts.org/scripts/source/449240.user.js
// @match			http*://www.youtube.com/*
// @match			*://www.youtube.com/*
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @require			http://code.jquery.com/ui/1.10.4/jquery-ui.min.js
// @require			http://zurb.com/playground/uploads/upload/upload/5/jquery.textchange.min.js
// @require			https://raw.github.com/jquery/jquery-ui/master/tests/jquery.simulate.js
// @require			https://raw.github.com/riklomas/quicksearch/master/jquery.quicksearch.js
// @require			https://raw.github.com/Sjeiti/TinySort/master/src/jquery.tinysort.js
// @require			https://raw.github.com/meetselva/attrchange/master/attrchange.js
// @require			https://raw.github.com/darcyclarke/jQuery-Watch-Plugin/master/watch.js
// @require			https://raw.github.com/techfoobar/jquery-style-listener/master/stylelistener.jquery.js
// @grant			GM_xmlhttpRequest
// @grant			unsafeWindow
// @run-at			document-end
// @copyright		        2014+, Magnus Fohlström
// ==/UserScript==

(function ($) {

    /**
    * @function
    * @property {object} jQuery plugin which runs handler function once specified element is inserted into the DOM
    * @param {function} handler A function to execute at the time when the element is inserted
    * @param {bool} shouldRunHandlerOnce Optional: if true, handler is unbound after its first invocation
    * @example $(selector).waitUntilExists(function);
    */   
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


(function () { 
    
    var playerSize = '',
        changeMe = 0;
    
    String.prototype.lpad = function(padString, length) {
        var str = this;
        while (str.length < length) {
            str = padString + str; }
        return str;
    };
    
    $('#zommMenue').bind('destroyed', function() {
        alert("Element was destroyed");console.log('Element was destroyed'); 
    });
    $('#eow-title').bind('textchange', function (event, previousText) {
        alert("Element text has changed");console.log('Element text has changed'); 
    });
    function ScrollZoomTune(selection,zomms,tune,ani){    
        var position = $( selection ).position(), 
            astr = window.location.href,
            ares = astr.split("/");
        $('body').css('zoom',zomms);    
        if( position == "undefined" ) { 
            console.log('is undis'); 
        } else {
            if( ares[3] != "embed" ) { 
                position = position.top;
                position = position + tune;
                if( ani == 1 ){
                    $('body').animate({ scrollTop: position * zomms });}
                else{
                    $('body').scrollTop( position * zomms);
                }
            }
        }  
    } 
    
    function returnFalse(e) { return false; }
    
    function tsorting(sortType,sortOrder){
        
        $('.created-at, .created-exact-at, .updated-at, .AlistToPlay').hide();
        $('.playlist-public-private').show();
        
        switch ( sortType ){
            case 'latest':
                console.log('latest');
                $('ul.playlist-items>li').tsort({attr:'data-time-updated', order: sortOrder });
                $( '#asc' ).text('Oldest'); 
                $( '#desc' ).text('Latest'); 
                $('.updated-at').show();
                break;
            case 'play':
                console.log('play-playlist');
                $('.playlist-public-private').hide();
                $('.AlistToPlay').show();
                break;
            case 'selected':
                console.log('selected');
                $( '#asc' ).text('OFF'); 
                $( '#desc' ).text('ON'); 
                $('ul.playlist-items>li').tsort({attr:'data-sortSeclected', order: sortOrder });
                break;
            case 'name':
                console.log('name');
                $('ul.playlist-items>li').tsort({attr:'data-title', order: sortOrder });
                $( '#asc' ).text('A-Ö'); 
                $( '#desc' ).text('Ö-A');  
                $('.created-at').show();
                break;
            case 'added':
                console.log('added');
                $('ul.playlist-items>li').tsort({attr:'data-time-created', order: sortOrder });
                $( '#asc' ).text('Oldset'); 
                $( '#desc' ).text('Newest');  
                $('.created-exact-at').show();
                break;            
            case 'amount':
                $('ul.playlist-items>li').tsort('span.playlist-video-count-container',{ order: sortOrder }); 
                $( '#asc' ).text('Smalest'); 
                $( '#desc' ).text('Biggest'); 
                $('.created-at').show();
                break;
            case 'priv':
                $('.created-at, .created-exact-at, .updated-at').show();
                $('.playlist-public-private').hide();
                break;
        }    
        
    }
        
    function MenueInsert(){
        
        var sortMenueInsert = '', zommMenueInsert = '';
        
		zommMenueInsert +=
			'<div id="zommMenue">'
//		+		'<div id="sharedBoxLink">restart swf </div>'
		+		'<span id="small" class="menueBox hand">Small</span>'
		+		'<span id="normals" class="menueBox hand">Norm</span>'
		+		'<span id="big" class="menueBox hand">Big</span>'
		+		'<div id="sharedBox" class="menueBox">'
		+			'<span id="share" class="menueBox hand">show-guide</span>'
		+			'<span id="shared" class="menueBox hand">hide-guide</span>'
		+		'</div>'
		+	'</div>';
        $( zommMenueInsert ).insertBefore( "#watch-headline-title" );
        
		sortMenueInsert += ' '
		+	'<div id="sortMenue" class="">'
		+		'<span id="latest" class="sortBox hand">Updated</span>'
		+		'<span id="selected" class="sortBox hand">Selected</span>'
		+		'<span id="added" class="sortBox hand">Added</span>'
		+		'<span id="play" class="sortBox hand">Play-list</span>'
		+		'<span id="amount" class="sortBox hand">Amount</span>'
		+		'<span id="priv" class="sortBox hand">Show all</span>'
		+		'<span id="name" class="sortBox hand">Name</span>'
		+		'<div id="order" class="sortBox">'
		+			'<span id="asc" class="sortBox hand"></span>'
		+			'<span id="desc" class="sortBox hand"></span>'
		+		'</div>'
		+		'<lable class="sortBox fl"><b>Search</b></lable>'
		+		'<input id="id_search" class="sortBox fl">'
		+	'</div>';
		$("#watch7-action-panels").prepend( sortMenueInsert );
        
    }
    
    function CheckHeadCss(){
        
        var newRulesSortMenue = ' ',
            newRulesZommMenue = ' '
		+	'#zommMenue {'
		+		'}'
		+	'.menueBox {'
		+		'margin-top: 4px;'           
		+		'float: right;'
		+		'width:50px;'
		+		'height:16px;'
		+		'line-height: 16px;'
		+		'text-align: center;'
		+		'}'
		+	'#share {'
		+		'display: none;'
		+		'background-color: lightgreen;'
		+		'}'
		+	'#sharedBox {'
		+		'display:none;'
		+		'}'
		+	'#shared {'
		+		'background-color: sandybrown;}'
		+	'#small {'
		+		'background-color: gainsboro;}'
		+	'#normals {'
		+		'background-color:rgb(220, 220, 238);'
		+		'display:none;'
		+		'}'
		+	'#big {'
		+		'background-color:rgb(225, 241, 225);'
		+		'}'
		+	'#watch7-headline h1 {'
		+		'float: left;'
		+		'}'
		+	'.hand {'
		+		'cursor: pointer;'
		+		'}';
        $('style#tamper').append( newRulesZommMenue );
        
        newRulesSortMenue = ' '
		+	'.sortBox {'
		+		' float: right;'
		+		' padding: 0 7px;'
		+		' height: 16px;'
		+		' line-height: 16px;'
		+		' text-align: center;'
		+		'}'
		+	'#sortMenue>.sortBox {'
		+		' margin-top: 3px !important;'
		+		' }'
		+	'#sortMenue {'
		+		' display: inline-block;'
		+		' width: inherit;'
		+		' padding-bottom: 7px;'
		+		' border-bottom: rgb(129, 139, 148);'
		+		' border-bottom-style: double;'
		+		' }'
		+	'#asc, .active {'
		+		'background-color: lightgreen;'
		+		'}'
		+	'#desc {'
		+		'background-color: sandybrown;'
		+		'}'
		+	'#id_search {'
		+		' position: relative;'
		+		' top: -1px;'
		+		' text-align: left;'
		+		' width: 100px;'
		+		'}'
		+	'.fl {'
		+		'float: left;'
		+		'padding-left: 0px;'
		+		'}';    
        $("style#tamper").append( newRulesSortMenue );        
       
        $('#sortMenue').hide();
    }    

    function RplayerBig(){ 
        
        $('style#videoSize').empty();
        
        var focustimerId,
            newRulesVideoSize = ' '
		+	'#player {'
		+		'margin-bottom: 0px !important;'
		+		'height: 1080px !important;'
		+		'max-width: 1282px !important;'        
		+		'}'
		+	'.player-height {'
		+		'height: 1080px !important;'
		+		'}'
		+	'.player-width {'
		+		'width: 1849px !important;'
		+		'position: relative !important;'
		+		'left: -284px !important;'
		+		'}'
		+	'#html5id, embed#movie_player, .video-stream {'
		+		'height: 1080px !important;'
		+		'width: 1849px !important;'
		+		'position: relative !important;'
		+		'left: 0px !important;'
		+		'}'
		+	'#masthead-positioner {'
		+		'}'
		+	'#masthead-positioner-height-offset {'
		+		'}'
		+	'#content.content-alignment {'
		+		'width: 1335px !important;'
		+		'margin-top: 1080pdx;'       
		+		'}'
		+	'#watch7-sidebar {'
		+		'margin-top: 0 !important;'
		+		'}'
		+	'#watch7-container {'
		+		'width: 1335px !important;'
		+		'}'
		+	'#watch7-main-container {'
		+		'position: relative !important;'
		+		'left: 232px !important;'       
		+		'}'
		+	'#guide{'
		+		'position: relative;'
		+		'top: 1090px !important;'       
		+		'left: 283px !important;'       
		+		'}'
		+	'.appbar-guide-menu-visibility {'
		+		'opacity:1;'      
		+		'}'
		+	'.appbar-guide-menu-layout {'
		+		'visibility: visible !important;'
		+		'opacity: 1 !important;'       
		+		'}';
		$("style#videoSize").append(newRulesVideoSize);  
        
        $('#masthead-positioner').off().on('mouseenter', function(e) {
                $( this ).stop();
                $( this ).animate({top:'0px'},100);          
        }).on('mouseleave', function(e) {
            if( $('#masthead-positioner-height-offset').css('height') == '4px' ){                
                $( this ).animate({top:'-39px'},1200);                
            }            
        });

        $('#masthead-positioner').css('cssText', 'top: -39px;');
        $('#masthead-positioner-height-offset').css('cssText', 'height: 4px;');        
                
        $('#player').addClass('watch-large'); $('#player').removeClass('watch-small');
        $('#small').show(); $('#normals').show();         
        $('.appbar-guide-menu').removeClass('appbar-guide-menu-visibility');   
        
        focustimerId = setTimeout(function() {
            ScrollZoomTune('#body-container',1,-21,1);
        }, 2000);
        setTimeout(focustimerId);        
    }
    
    function RplayerSmall(){ 

        $('#player').addClass('watch-small'); $('#player').removeClass('watch-large');
        $('#normals').show(); $('#big').show();
        $('.appbar-guide-menu').addClass('appbar-guide-menu-visibility'); 
        
        $('style#videoSize').empty();
        
        var newRulesVideoSize = ' '
		+	'#player {'
		+		'margin-bottom: 0px !important;'
		+		'height: 437px !important;'
		+		'position: relative !important;'
		+		'left: -30px !important;'
		+		'max-width: 1040px !important;'        
		+		'}'
		+	'.player-height {'
		+		'height: 437px !important;'
		+		'}'
		+	'.player-width {'
		+		'width: 700px !important;'
		+		'position: relative;'
		+		'left: 0px !important;'
		+		'}'
		+	'#html5id, embed#movie_player, .video-stream {'
		+		'height: 437px !important;'
		+		'width: 700px !important;'
		+		'position: relative;'
		+		'left: 0px !important;'
		+		'}'
		+	'#masthead-positioner {'
		+		'top: 0px !important;'
		+		'}'
		+	'#masthead-positioner-height-offset {'
		+		'height: 50px !important;'
		+		'}'
		+	'#content.content-alignment {'
		+		'width: 1102px !important;'       
		+		'}'
		+	'#watch7-sidebar {'
		+		'margin-top: -437px !important;'
		+		'}'
		+	'#watch7-container {'
		+		'}'
		+	'#watch7-main-container {'
		+		'position: relative;'
		+		'left: 0px !important;'       
		+		'}'
		+	'#guide{'
		+		'position: absolute;'
		+		'}'
		+	'.appbar-guide-menu-visibility {'     
		+		'}'
		+	'.appbar-guide-menu-layout {'      
		+		'}';
		$("style#videoSize").append(newRulesVideoSize);  
       
    } 
    
    function RplayerMedum(){
        
        $('style#videoSize').empty();
        var mHeight = 750, mWidth = 1280,
            newRulesVideoSize = ' '
        	+	'#player {'
		+		'margin-bottom: 10px !important;'
		+		'height: 750px !important;'
		+		'width: 1280px !important;'
		+		'max-width: 1270px !important;'        
		+		'}'
		+	'.player-height {'
		+		'height: 750px !important;'
		+		'}'
		+	'.player-width {'
		+		'height: 750px !important;'
        	+		'position: relative;'
		+		'left: 0px !important;'
		+		'}'
		+	'.player-width, #html5id, embed#movie_player, .video-stream {'
		+		'height: 750px !important;'
		+		'width: 1280px !important;'
        	+		'position: relative;'
		+		'left: 0px !important;'
		+		'}'
		+	'#masthead-positioner {'
		+		'top: 0px !important;'
		+		'}'
		+	'#masthead-positioner-height-offset {'
		+		'height: 50px !important;'
		+		'}'
		+	'#content.content-alignment {'
		+		'width: 1335px; !important;'       
		+		'}'
		+	'#watch7-sidebar {'
		+		'margin-top: 0px !important;'
		+		'}'
		+	'#watch7-container {'
		+		'width:1335px !important;'
		+		'}'
		+	'#watch7-main-container {'
		+		'position: relative !important;'
		+		'left: 232px !important;'       
		+		'}'
		+	'#guide {'
		+		'position: absolute !important;'
		+		'top: 770px !important;'
		+		'left: 283px !important;'
		+		'}'
		+	'.appbar-guide-menu-visibility {'     
		+		'visibility: visible; !important'
		+		'}'
		+	'.appbar-guide-menu-layout {'      
		+		'position: relative !important;'
		+		'visibility: visible !important;'
		+		'left: 0px !important;'
		+		'opacity: 1 !important'
		+		'}';
		$("style#videoSize").append(newRulesVideoSize);          

		$('#player').removeClass('watch-large'); $('#player').removeClass('watch-small');         
        $('#small').show(); $('#big').show();
        $('.appbar-guide-menu').removeClass('appbar-guide-menu-visibility');  
               
    }
    
    function checkPlayerSize(playerSize){
        
        if ( playerSize == 'medium' ) 
        { 
            RplayerMedum();  changeMe = 0; console.log('playerSize medium');      
        }
        else if ( playerSize == 'small' ) 
        { 
            RplayerSmall();  changeMe = 0; console.log('playerSize small'); 
        }            
        else if ( playerSize == 'big' ) 
        { 
            RplayerBig();  changeMe = 0; console.log('playerSize big'); 
        } 
        
    }  
    
    function listerZommMenue(){

        $('.menueBox').bind("contextmenu",function(e) { return false; }); // disable contextmenu
    
        var myVideo=document.getElementById("movie_player"); 
        
        $('#big').off().on('mousedown', function(e) { 
            if( e.which == 1 ){ 
				playerSize = 'big';
                checkPlayerSize( playerSize );
                $(this).hide();
	            ScrollZoomTune('#body-container',1,-21,1);
                var focustimerId = setTimeout(function() {
                    myVideo.focus();
                    //myVideo.playVideo();
                }, 500);
                setTimeout(focustimerId);
            }  
            if( e.which == 2 || e.which == 3 ){ e.preventDefault(); return false; }            
        });   
        
        $('#normals').off().on('mousedown', function(e) {
            if( e.which == 1 ){ 
				playerSize = 'medium';
                checkPlayerSize( playerSize );
                $(this).hide();
                ScrollZoomTune('#body-container',1,-10,1);
                var focustimerId = setTimeout(function() {
                    myVideo.focus();
                }, 500);
                setTimeout(focustimerId);
            }  
            if( e.which == 2 || e.which == 3 ){ e.preventDefault(); return false; }            
        });
        
        $('#small').off().on('mousedown', function(e) {
            if( e.which == 1 ){ 
				playerSize = 'small';
                checkPlayerSize( playerSize );
                $(this).hide();               
                ScrollZoomTune('#body-container',1,-10,1);
                var focustimerId = setTimeout(function() {
                    myVideo.focus();
                }, 500);
                setTimeout(focustimerId);
            }  
            if( e.which == 2 || e.which == 3 ){ e.preventDefault(); return false; }            
        });
        
        $('#share').off().on('mousedown', function(e) {
            if( e.which == 1 ){ 
				$('html').toggleClass('show-guide');
                $(this).hide();
                $('#shared').show();                                
            }  
            if( e.which == 2 || e.which == 3 ){ e.preventDefault(); return false; }            
        });
        
        $('#shared').off().on('mousedown', function(e) {
            if( e.which == 1 ){ 
                $('html').toggleClass('show-guide');
                $(this).hide();
                $('#share').show();                               
            }  
            if( e.which == 2 || e.which == 3 ){ e.preventDefault(); return false; }            
        });
        
        myVideo.focus();
               
        $('#watch7-secondary-actions').off().on('mouseenter', function(e) {
			$('[data-trigger-for=aaction-panel-shared]').attr('data-trigger-for','action-panel-share');
        }).on('mouseleave', function(e) {
			$('[data-trigger-for=action-panel-share]').attr('data-trigger-for','aaction-panel-shared');
        });        
        
        $('#watch7-container, #watch7-main, #watch7-main-container, #player, #page').off().on('click', function(e){
            if ( e.target == this ){     
                ScrollZoomTune('#body-container',1,-21,1);   
                var watch7focustimerId = setTimeout(function() {
                    myVideo.focus();
                    myVideo.playVideo();
                }, 500);
                setTimeout(watch7focustimerId);
            }    
        }); 
     
    }
        
    function playlistaddto(){
        
        $('form.create-playlist').waitUntilExists(function(){  
            
            $('.watch-playlists-drawer .playlist-addto-title-options, .watch-playlists-drawer h3').hide();  
            $('#sortMenue').insertBefore('#action-panel-addto .playlist-items');
            $('#sortMenue').show();
            
            var selectedAddedToPlaylist = 0;
            $('ul.playlist-items>li').each(function(){
                
                var playupdated = $(this).attr('data-time-updated') * 1000;
                playupdated = $.datepicker.formatDate('yy-mm-dd', new Date(playupdated));        
                $(this).find('.created-at').before( '<span class="updated-at">' + playupdated + ' </span>' );
                
                var playcreated = $(this).attr('data-time-created') * 1000;
                playcreated = $.datepicker.formatDate('yy-mm-dd', new Date(playcreated));        
                $(this).find('.created-at').before( '<span class="created-exact-at">' + playcreated + ' </span>' );
                
                var playplaylist = "<a href='http://www.youtube.com/playlist?list="  + $(this).attr('data-full-list-id') +  "'>Play</a>";
                $(this).find('.created-at').before( '<span class="AlistToPlay">' + playplaylist + ' </span>' );
                
                $(this).find('.created-at, .created-exact-at, .updated-at, .AlistToPlay').hide();        
                
                if( $(this).hasClass('contains-all-selected-videos') ) { 
                    selectedAddedToPlaylist = 1;
                    $(this).attr( 'data-sortSeclected','1' );
                } else {
                    $(this).attr( 'data-sortSeclected','0' );
                }

            });
            
            $('span.playlist-video-count').each(function(){
                
                var str = $(this).text();
                str = str.lpad("0", 3);
                $(this).text(str);
                
            });            
            
            var sortOrder = 'desc', sortType = 'latest', hideSort;   
            if ( selectedAddedToPlaylist == 1 ){sortType = 'selected';}
            $( '#' + sortType ).addClass('active');   
            if( sortOrder == 'desc' ){ hideSort = '#asc'; } else { hideSort = '#desc'; }
            
            tsorting(sortType,sortOrder);
            $( hideSort ).hide();  
            
            $('input#id_search').quicksearch('ul.playlist-items>li[data-title]'); 
            
            $('#asc').off().on('mousedown', function(e) {
                if( e.which == 1 ){ 
                    sortOrder = 'desc';
                    sortType = $('.active').prop('id');
                    tsorting(sortType,sortOrder); 
                    $(this).hide();
                    $('#desc').show();                                
                }  
                if( e.which == 2 ){ e.preventDefault();return false; }            
            });
            
            $('#desc').off().on('mousedown', function(e) {
                if( e.which == 1 ){ 
                    sortOrder = 'asc';
                    sortType = $('.active').prop('id');
                    tsorting(sortType,sortOrder);
                    $(this).hide();
                    $('#asc').show();                               
                }  
                if( e.which == 2 ){ e.preventDefault();return false; }            
            });  
            
            $('#sortMenue>span').off().on('mousedown', function(e) {
                if( e.which == 1 ){ 
                    
                    $('#sortMenue>span').each(function() {
                        $(this).removeClass('active');             
                    });
                    
                    $(this).addClass('active');                      
                    var sortType = $(this).prop('id');                    
                    tsorting(sortType,sortOrder);
                    
                }  
                if( e.which == 2 || e.which == 3 ){ e.preventDefault();return false; }                 
            });
        });        
        
        $('#guide-subscriptions-section h3').waitUntilExists(function(){
            
            $('#appbar-guide-iframe-mask').css('cssText', 'height: 1111px;');
            
            $('#guide-subs-footer-container').before('<div id="NewSubscription"></div>');
            
            $('ul#guide-channels').appendTo('#NewSubscription');    
            $('ul.overflow-list').appendTo('ul#guide-channels');              
            $('ul.overflow-list>li').unwrap();
            $('ul.overflow-list').remove();        
            
            $('#guide-subs-footer-container').remove();
            
            $('#appbar-guide-iframe-mask').hide();
                        
            $('<span id="subscriptionSearch"><span class="guide-sort-choice yt-uix-button-menu-item"><input id="sub_search" ></span></span>')
            .insertAfter('#guide-subscriptions-section .guide-sort-container.yt-uix-button-group');    
            $('input#sub_search').quicksearch('#guide-channels>li');
            
            
            
        });
        
        $('.branded-page-v2-container').waitUntilExists(function(){  
            
            $('#guide').css('cssText', 'position: absolute; left: -3px; top: -2px; height: 1348px;');
            
            $('#masthead-appbar-container').css('cssText', 'display: none;');
            
            $('.branded-page-v2-top-row #channel-subheader').css('cssText', 'height: 40px;');
            
            $('#page-container').css('cssText', 'min-height: 1444px;');
            
            $('#footer-container').css('cssText', 'position: static; bottom: 0px;');
            
            ScrollZoomTune('#body-container',1,-10,1);
            
        });
        
        
        $('#behavior-id-guide-playlists-section .guide-channels-list').waitUntilExists(function(){
            
            $( '#behavior-id-guide-playlists-section .guide-channels-list').before('<ul id="NewPlaylist"></ul>');
            $( '#behavior-id-guide-playlists-section .guide-channels-list' ).appendTo('#NewPlaylist'); 
            $( '#behavior-id-guide-playlists-section .guide-channels-list>li').unwrap();
            $( '#behavior-id-guide-playlists-section .guide-channels-list' ).remove();   
            
            $('#guide-subscriptions-section').insertBefore('#behavior-id-guide-playlists-section');
            $('#NewPlaylist').css('cssText', 'max-height: 500px; overflow-y: scroll;');
            
            $('#NewPlaylist').addClass('notChecked');
            
        });
    } 
    
    function youtubeWatch(){  
        
        var newRule;
        newRule = ' '
		+	'body {'
		+		'background: rgba(129, 119, 114, 1) !important;'
		+		'padding:3px !important; }'
		+	'.ytg-base.cookie-alert {'
		+		'display:none;}';
    
        /* Video Content */
        $('#watch7-playlist-bar-toggle-button').css('cssText', 'display: inline-block !important;');  
        newRule += ' '
		+	'#watch7-playlist-tray-container.watch-sidebar {'
		+		'min-width: 0px; }'
		+	'.watch7-playlist-bar-left.watch-content {'
		+		'width: 920px; }'
		+	'#clickberry_tag_button {'
		+		'display: none !important; }';
            
        /* Containter that holds Left Middle Right column */
        newRule += ' '
		+	'#watch7-user-header, #watch7-headline {'
		+		'background-color: transparent !important; }'
		+	'.site-center-aligned .watch #content.content-alignment {'
		+		'width: 1335PX;'
		+		'min-width: 1003px;'
		+		'max-width: initial;'
		+		'}'; 
        $("style#tamper").append(newRule);
        
        /* Left side Content */
        /* SideBar User Interaction */
        // Moves User Interaction to easier place to control
    
        newRule = ' '      
		+	'#guide{'
		+		'float:left; '
		+		'width: 232px !important; '
		+		'padding-left: 0px !important; }'
		+	'#guide-container{ '
		+		'width: inherit !important; '
		+		'left: 0px !important; '
		+		'position: relative !important; '
		+		'padding: 15px 0 10px 0px !important; }'
		+	'.watch-content { '
		+		'clear: none !important; }'
		+	'.display-name.no-count, .display-name{'
		+		'width: 120px;}'
		+	'.display-name{'
		+		'font-size: 125%;'
		+		'line-height: 16px;'
		+		'font-family: -webkit-pictograph;'
		+		'display: inline-flex !important;}'
		+	'.guide-channels-list .guide-channel a {'
		+		'width: 216px !important;}'
		+	'.site-left-aligned .guide-channels-list {'
		+		'max-height: 525px;}'
		+	'.yt-thumb-18 {'
		+		'zoom: 1.25; }'
		+	'.exp-appbar-onebar #appbar-guide-menu, .appbar-guide-menu-layout {'
		+		'margin-top: 0px !important;}'
		+	'#appbar-guide-menu, #appbar-guide-iframe-mask {'
		+		'position: initial;}'
		+	'.appbar-guide-menu-visibility {'
		+		'visibility: visible;'
		+		'}'
		+	'.site-center-aligned .guide-channels-list {'
		+		'width: 230px !important;'
		+		'max-height: 787px;}'
		+	'.guide-flyout-visibility {'
		+		'width: 232px !important;}'
		+	'#guide-channels {'
		+		'margin-top: 3px;}'
		+	'li.guide-section.without-filter h3, li.guide-section.without-filter h3 a {'
		+		'width: 88px !important;}'
		+	'#subscriptionSearch {'
		+		'float: right;'
		+		'position: relative;'
		+		'top: -4px;'
		+		'right: 3px; }'
		+	'#sub_search {'
		+		'display: none;'
		+		'width: 112px;}'
		+	'#guide-subscriptions-section:hover #sub_search {'
		+		'display: block; }'
		+	'#guide-container h3 {'
		+		'padding-top: 4px; }';
        $("style#tamper").append(newRule);
        
        /* Middle Content */
        newRule = ' ' 
		+	'#watch7-main-container {'
		+		'position: relative;'
		+		'left: 232px;}'
		+	'#watch-headline-title {'
		+		'width: 555px;}'
		+	'#watch7-content {'
		+		'min-height: 1636px;'
		+		'width: 700px;'
		+		'background: #FFF4F4; '
		+		'border-left-width: 1px !important;'
		+		'border-left-style: solid !important;'
		+		'border-right-width: 1px !important;'
		+		'border-right-style: double !important;'
		+		'border-color: rgba(44, 113, 146, 0.59) !important;'
		+		'}'
		+	'.yt-uix-button-default:hover, .yt-uix-button-text:hover {'
		+		'box-shadow: 2px 2px 4px rgba(0,0,0,0.10);'
		+		'}'
            		//Move show more right
		+	'#watch-description-toggle .yt-uix-button-text {'
		+		'margin-left: 60px;'
		+		'}'
		+	'.comments-iframe-container, #comments-test-iframe, #comments-test-iframe iframe {'
		+		'width:661px !important;'
		+		'max-width:661px !important;'
		+		'}'
		+	'#watch7-action-panels #watch7-action-panel-footer {'
		+		'background-color: rgb(240, 223, 234);'
		+		'border-bottom-width: 1px;'
		+		'border-bottom-color: rgb(194, 146, 74);'
		+		'border-bottom-style: solid; '
		+		'height: 4px;'
		+		'}'
		+	'.yt-subscription-button-subscriber-count-branded-horizontal {'
		+		'display: inline-block !important; '
		+		'}'
		+	'#action-panel-addto > div.watch-playlists-drawer {'
		+		'float: left;'
		+		'width: inherit;'
		+		'}'
		+	'.watch-playlists-drawer ul {'
		+		'max-height: 512px;'
		+		'position: relative;'
		+		'top: 10px;}'
		+	'.action-panel-content {'
		+		'margin-top: -8px;'
		+		'width: 660px;'
		+		'}';
        $("style#tamper").append(newRule);
            $('[data-trigger-for=action-panel-details]').attr('data-tooltip-text','Details about this clip');
            $('[data-trigger-for=action-panel-share]').attr('data-tooltip-text','Share this on socialmedia');
            $('[data-trigger-for=action-panel-addto]').attr('data-tooltip-text','Add to playlist');
            $('[data-trigger-for=action-panel-stats]').attr('data-tooltip-text','--Statistics--');
            //after awhile it resets, this is a fix
            $('#watch-discussion .comments-iframe-container').css('cssText', 'max-width:661px !important;');
            
        /* Right side Content */
        $('#watch7-sidebar').css('cssText', 'margin-top: 0px;');
        $('#watch7-sidebar-contents').css('cssText', 'margin-top: 17px;');
         
        newRule = ' '
		+	'.yt-thumb-120 {'
		+		'zoom: 1.50 }'
		+	'#watch7-sidebar {'
		+		'margin-top: 0px;'
		+		'background-color: whitesmoke;'
		+		'-webkit-transition: inherit !important;'
		+		'transition: inherit !important; }';
        
        
        //printout to style   
        $("style#tamper").append(newRule);
        
        $('[data-trigger-for=action-panel-share]').attr('data-trigger-for','aaction-panel-shared');
        
    }
    
    function refreshDiv(){

        var container = document.getElementById("player-api"),
            content = container.innerHTML;
        container.innerHTML= content;
        
    }    
    
    function listerness(){
        
        listerZommMenue();
        playlistaddto();
        $('#watch7-views-info').off().on('mousedown', function() { 
            refreshDiv(); 
            //console.log('refreshDialer');
        }); 
        
        $('[data-trigger-for=action-panel-share]').attr('data-trigger-for','aaction-panel-shared');  
        $('[data-trigger-for=action-panel-details]').attr('data-tooltip-text','Details about this clip');
        $('[data-trigger-for=action-panel-share]').attr('data-tooltip-text','Share this on socialmedia');
        $('[data-trigger-for=aaction-panel-shared]').attr('data-tooltip-text','Share this on socialmedia');
        $('[data-trigger-for=action-panel-addto]').attr('data-tooltip-text','Add to playlist');
        $('[data-trigger-for=action-panel-stats]').attr('data-tooltip-text','--Statistics--');
        
    }
    
    function triggerSortMenue(){
                
        var triggerSortMenueTimerId = setInterval(function() {            
            if( $('#action-panel-addto').hasClass('hid') ){
                $('#sortMenue').hide();
            } else {
                $('#sortMenue').show();
            }                
        }, 1000 );
    }
        
    function CheckzommMenue(){
        
        var str = window.location.href,
            res = str.split("?"),
            Ures = str.split("/"),
            SmallWidthTimerId,
        listernessTimerId = setTimeout(function() {  
            
            if ($('#zommMenue').length == 0) {
                
                console.log('zommMenue'); 
                MenueInsert();
                listerness();
                
            }
            
            if ($('#tamper').length == 0) {
                
                console.log('tamper');
                $('<style id="tamper"></style>').appendTo('head');
                
                $('style#videoSize').remove();
                $('<style id="videoSize"></style>').appendTo('head');
                
                CheckHeadCss();
                youtubeWatch();
                playerSize ='medium';
                
                if ( res[0] !== "http://www.youtube.com/results" || res[0] !== "https://www.youtube.com/results" ) {  checkPlayerSize( playerSize ); console.log('results 2');}
                console.log('res[0]',res[0]);

            } 
            
        }, 110 );       
        
        SmallWidthTimerId = setTimeout(function() {
            
            if ( res[0] == "http://www.youtube.com/results"  || res[0] == "https://www.youtube.com/results"  || Ures[3] == "user" ) {
                
                    $('.appbar-guide-menu-visibility').css('cssText', 'opacity:0;');
                    $('.appbar-guide-menu-layout').css('cssText', 'visibility: hidden; opacity: 0 !important');
                    $('.appbar-guide-menu').addClass('appbar-guide-menu-visibility');

            }
            else if( changeMe == 1 ){ 
                
                $('#footer').waitUntilExists(function(){ 
                    checkPlayerSize( playerSize );
					CheckzommMenue();
																										console.log('playerSize');
                });
            }
                
        }, 188 );   
        
        console.log('Ures',Ures);
        console.log('res',res);

	}
    
	CheckzommMenue();
    
    function youtubePageChange(){

        
        CheckzommMenue();
        $('body').on('transitionend', function(event){ 
            
		    var str = window.location.href,
                res = str.split("?"),
                Ures = str.split("/");
            console.log('Ures-ypc',Ures);console.log('res-ypc',res);
                        
            if ( $('#NewPlaylist').hasClass('notChecked') ) {
                
                $('#NewSubscription ul#guide-channels>li').each(function(){
                    
                    var str = $( this ).attr('id'); console.log('NewSubscription',str);                       
                    if ( str.substring(0,4) == 'VLPL' || str.substring(0,4) == 'VLLL' ) {  $( this ).addClass('movedByMe'); $( this ).appendTo('#NewPlaylist'); }
                    
                });  
                
                $('#NewPlaylist').removeClass('notChecked').addClass('checked');
                
            }                        
                
            if ( $('#NewPlaylist').hasClass('notChecked') ) {
                
                $('#NewSubscription ul#guide-channels>li').each(function(){
                    
                    var str = $( this ).attr('id'); console.log('NewSubscription',str);                       
                    if ( str.substring(0,4) == 'VLPL' || str.substring(0,4) == 'VLLL' ) {  $( this ).addClass('movedByMe'); $( this ).appendTo('#NewPlaylist'); }
                    
                });  
                
                $('#NewPlaylist').removeClass('notChecked').addClass('checked');
                
            }

            if ( event.target.id == 'progress' || event.target.id == 'masthead-search-terms' ) {
                
                changeMe = 1;
                checkPlayerSize( playerSize );
                CheckzommMenue(); 
                console.log('transitionend');
                
            }
            
            if ( res[0] == "http://www.youtube.com/results"  || res[0] == "https://www.youtube.com/results" || Ures[3] == "user" || Ures[3] == "" || Ures[3] == "feed" ) {
                
                    $('.appbar-guide-menu-visibility').css('cssText', 'opacity:0;');
                    $('.appbar-guide-menu-layout').css('cssText', 'visibility: hidden; opacity: 0 !important');
                    $('.appbar-guide-menu').addClass('appbar-guide-menu-visibility');

            } else if ( res[0] == "https://www.youtube.com/watch"  || res[0] == "http://www.youtube.com/watch" ) {
                
                    $('.appbar-guide-menu-visibility').css('cssText', 'opacity:1;');
                    $('.appbar-guide-menu-layout').css('cssText', 'visibility: visible; opacity: 1 !important');
                    $('.appbar-guide-menu').addClass('appbar-guide-menu-visibility'); 
                
                triggerSortMenue();
            }

            console.log('transitionend',event);

        });
    }
    
    $(youtubePageChange);
    
})();
























