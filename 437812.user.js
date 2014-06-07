// ==UserScript==
// @name       www.pornhub.com Tabed New
// @namespace  http://use.i.E.your.homepage/
// @version    0.841
// @description  A few enhancements, this is my first official script, this script is compatible with TM and chrome --- The functions is set up that way. Later version it may get fixed. 
// @updateURL      https://userscripts.org/scripts/source/437812.meta.js
// @installURL     https://userscripts.org/scripts/source/437812.user.js
// @match      http://www.pornhub.com/*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @require	   https://code.jquery.com/ui/1.10.4/jquery-ui.min.js
// @require	   https://raw.github.com/jquery/jquery-ui/master/tests/jquery.simulate.js
// @run-at     document-start
// @grant      GM_getValue
// @grant      GM_setValue
// @grant      GM_deleteValue
// @grant      GM_log
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

(function ($) {
    Podium = {};
    Podium.keydown = function(k) {
        var oEvent = document.createEvent('KeyboardEvent');
    
        // Chromium Hack
        Object.defineProperty(oEvent, 'keyCode', {
                    get : function() {
                        return this.keyCodeVal;
                    }
        });     
        Object.defineProperty(oEvent, 'which', {
                    get : function() {
                        return this.keyCodeVal;
                    }
        });     
    
        if (oEvent.initKeyboardEvent) {
            //oEvent.initKeyboardEvent("keydown", true, true, document.defaultView, false, false, false, false, k, k);
            oEvent.initKeyboardEvent("keydown", true, true, document.defaultView, k, k, "", "", false, "");
        } else {
            oEvent.initKeyEvent("keydown", true, true, document.defaultView, false, false, false, false, k, 0);
        }
    
        oEvent.keyCodeVal = k;
    
        if (oEvent.keyCode !== k) {
            alert("keyCode mismatch " + oEvent.keyCode + "(" + oEvent.which + ")");
        }
    
        document.dispatchEvent(oEvent);
    }
}(jQuery));

function tamper(){
    
    if ( $('style#viewVideo').length != 1 ) { 

        $('<style id="viewVideo"></style>').appendTo('head');    
        
        var newRule_viewVideo =  ' '  
		+	'#commentList .comment .contents {' 
		+		'width: 82%;' 
		+		'}' 
		+	'#under-player-comments {' 
		+		'width: 557px !important;' 
		+		'}'   
		+	'.video-action-tab.about-tab .show-more-btn {' 
		+		'left: 46.2% !important;' 
		+		'}' 
		+	'#relatedVideosVPage ul {' 
		+		'padding-top: 0px;' 
		+		'padding-left: 5px;' 
		+		'}' 
		+	'#relatedVideosVPage ul.videos.row-2-thumbs li .wrap, #relatedVideosVPage .attach_box ul.videos li .wrap {'
		+		'width: 95%;' 
        +		'margin-top: 10px;' 
		+		'}' 
		+	'#main-container {' 
		+		'width: inherit;' 
		+		'}' 
		+	'#main-container .video-wrapper #player {' 
		+		'height: 878px;' 
		+		'}'   
		+	'#under-player-playlists {' 
		+		'width: 1122px !important;' 
		+		'margin-top: 10px;' 
		+		'}'
        +	'#main-container .video-wrapper .ad-below-player {'
        +		'display:none;' 
		+		'}'
		+	'ul.videos li .wrap .linkWrapper .borderLink {' 
		+		'border: 0px solid #333;' 
		+		'}' 
		+	'#main-container #hd-rightColVideoPage .tabs_video .related_tabs {' 
		+		'width: inherit;' 
		+		'height: inherit;' 
		+		'}' 
		+	'#main-container #hd-rightColVideoPage .tabs_video {' 
		+		'width: inherit;' 
		+		'position: absolute;' 
		+		'}' 
		+	'#relatedVideosVPage {' 
		+		'position: relative;' 
		+		'top: 27px;' 
		+		'}' 
		+	'.add-to-playlist-icon, .subscribe-to-pornstar-icon {' 
		+		'left: 3px;' 
		+		'}';       
        $("style#viewVideo").append( newRule_viewVideo );
    }   
}

function DefaultConfig(){
	
	$('<style id="configCss"></style>').appendTo('head');
	
	var newRule_configCss = ' '
	+	'#ResetConfig {'
	+		'position: relative;  top: -17px;  left: 2px;  color: #acabab;'
	+		'}'
	+	'#ResetConfig:hover {'
	+		'color: red;'
	+		'cursor: url(http://cur.cursors-4u.net/others/oth-5/oth436.cur), progress !important;'
	+		'}'
	+	'#myConfigButton {'
	+		'position: relative;'
	+		'}'
	+	'#myConfigButtonText {'
	+		'position: relative;'
	+		'display: inline-block;'
	+		'padding-top: 8px;'
	+		'text-transform: uppercase;'
	+		'cursor: pointer;'
	+		'color: #acabab;'
	+		'}'
	+	'#myConfigButtonText:hover {'
	+		'color: white;'
	+		'}'
	+	'#formConfig {'
	+		'position: absolute;'
	+		'background-color: #414141;'
	+		'padding: 5px;'
	+		'top: 50px;'
	+		'margin-left: -66px !important;'
	+		'width: 198px;'
	+		'height: 48px;'
	+		'}'
	+	'#constate {'
	+		'padding: 5px;'
	+		'}'
	+	'.constate {'
	+		'float: left;'
	+		'}'
	+	'#conchoice {'
	+		'margin-top: 27px;'
	+		'background-color: #414141;'
	+		'margin-left: 5px;'
	+		'padding: 0 20px 10px;'
	+		'width: 151px;'
	+		'}'
	+	'.conchoice {'
	+		'float: none;'
	+		'text-align: center;'
	+		'}'
	+	'.conchoice > a > span {'
	+		'width: 132px;'
	+		'display: inline-block;'
	+		'}'
	+	'.conchoice, .constate {'
	+		'padding: 10px 8px;'
	+		'height: 18px;'
	+		'background-color: #222222;'
	+		'}'
	+	'.conchoice > a, .constate > a {'
	+		'color: #acabab;'
	+		'padding: 5px;'
	+		'}'
	+	'.conchoice > a:hover, .constate > a:hover {'
	+		'text-decoration: none;'
	+		'color: white;'
	+		'}'
	+	'.choiceAsel {'
	+		'background-color: #acabab;'
	+		'color: #414141 !important;'
	+		'position: relative;'
	+		'display: -webkit-box;'
	+		'top: -5px;'
	+		'}'
	+	'choiceSpansel {'
	+		'width: 132px;'
	+		'display: inline-block;'
	+		'}';
	$("style#configCss").append( newRule_configCss );

	var newHtml_configButton = ' '
	+	'<div id="myConfigButton">'
	+		'<div id="myConfigButtonText">TM</div>'
	+	'</div>'
	+	'<div id="formConfig">'
	+		'<ul id="constate">'
	+			'<li id="cNormal" class="constate"><a><span>Normal</span></a></li>'
	+			'<li id="cWide" class="constate"><a><span>Wide</span></a></li>'
	+			'<li id="cOrginal" class="constate"><a><span>Orginal</span></a></li>'
	+		'</ul>'
	+		'<div id="ResetConfig">x</div>'
	+		'<ul id="conchoice">'
	+			'<li id="cTiny" class="conchoice"><a><span>Tiny</span></a></li>'
	+			'<li id="cxSmall" class="conchoice"><a><span>xSmall</span></a></li>'
	+			'<li id="cSmall" class="conchoice"><a><span>Small</span></a></li>'
	+			'<li id="cMedium" class="conchoice"><a><span>Medium</span></a></li>'
	+			'<li id="cLarge" class="conchoice"><a><span>Large</span></a></li>'
	+			'<li id="cXLarge" class="conchoice"><a><span>XLarge</span></a></li>'
	+			'<li id="cAsIs" class="conchoice"><a><span>AsIs</span></a></li>'
	+		'</ul>'
	+	'</div>';
	$("#topRightProfileMenu").prepend( newHtml_configButton );
	
	$('#c' + GM_getValue( 'pornhub_state' ) ).find('a').addClass('choiceAsel');
	$('#c' + GM_getValue( 'pornhub_SelectedButton' ) ).find('a').addClass('choiceAsel');
	if ( $( '.choiceAsel' ).text() == 0 ) { 
        $( '#cOrginal a' ).attr('title','Defualt - there are no configuration set').addClass('choiceAsel'); 
    }
	
	$('#formConfig, #conchoice').hide();
	
	$('#myConfigButtonText').on('mousedown', function(){
		
		if ( $( '#formConfig' ).is(":visible ") ) {
			$('#formConfig, #conchoice').hide();
		} else {
			$('#formConfig').show();
		}
		
        if( $('li a.choiceAsel').size() > 0 && $('li#cOrginal a.choiceAsel').size() == 0 ) { $('#conchoice').show(); }
		
		setTimeout(function(){
			if ( $( '#formConfig' ).is(":visible ") ) {
				$('#formConfig, #conchoice').hide();
			}
		},12500);
		
	});
	
	$('.constate').on('mousedown', function(){
	
		if ( $(this).attr('id') == 'cOrginal' ){
		 	$('#conchoice').hide();
		} else {
			$('#conchoice').show();
		}
		
		GM_setValue("pornhub_state", $(this).text() );
		
		$('#constate .choiceAsel').removeClass('choiceAsel');
		$(this).find('a').addClass('choiceAsel');
	
	});
	
	$('.conchoice a').on('mousedown', function(){
		
		GM_setValue("pornhub_SelectedButton", $(this).text() );
		
		$('#conchoice .choiceAsel').removeClass('choiceAsel');
		$('#conchoice .choiceSpansel').removeClass('choiceSpansel');
		$(this).addClass('choiceAsel');
		$(this).find('a').addClass('choiceSpansel');
	
	});
	
	$('#formConfig').on('mouseleave', function(){
		$('#formConfig, #conchoice').hide();
	});
	
	$('#ResetConfig').on('click', function(){  
	
		GM_deleteValue("pornhub_ws"); GM_deleteValue("pornhub_ss");
        
        GM_deleteValue( 'pornhub_SelectedButton' );
		GM_deleteValue( 'pornhub_state' );
		$( '.choiceAsel' ).removeClass('choiceAsel');
		$( '#cOrginal a' ).attr('title','Defualt - there are no configuration set').addClass('choiceAsel');
		
		alert('your configuration is deleted and default are set');
	});
}

function Basic(){
	
	$('#player').parent('.video-wrapper').css('cssText','width: inherit;');
	$('#main-container').css('cssText','width: inherit;');
    $('.show-more-btn').text('Show Less');
	$('.video-action-tab.about-tab .video-detailed-info .showLess').css('cssText','display: block;');
    $("h1.title").css('max-width','930px');
	
}

function WideRelated(SelectedButton){
	
	$("style#orginal").remove();
	$("style#headSwitchButtons").remove();
	$('<style id="headSwitchButtons"></style>').appendTo('head');
	
	tamper();
	
	$('#main-container #hd-rightColVideoPage').css('cssText','width: inherit; margin-top: -1px;').insertBefore( $( "#under-player-comments" ) );
	$('#under-player-comments').css('cssText','width: inherit !important; margin-top: 40px;');
	$('#under-player-playlists').css('cssText','');
	
	Basic();
	
	$( '#SelectedButton, #all' ).show();
    $( '#MaxiOFF').show();
	
	var newWidth;
	switch(SelectedButton)
	{
		case 'Tiny':   newWidth = '8.05%'; break;
		case 'xSmall': newWidth = '16.35%'; break;
		case 'Small':  newWidth = '19.7%';  break;
		case 'Medium': newWidth = '24.7%';  break;
		case 'Large':  newWidth = '32.97%'; break;
		case 'XLarge': newWidth = '49.5%';  break;
		case 'AsIs':   newWidth = 'initial';  break;
	}
	$("style#headSwitchButtons").append('.row-2-thumbs li { width: '+newWidth+'; display: inline-block;}');
	
	$("#Tiny, #xSmall, #XLarge").show();
	$("#" + SelectedButton ).hide();
	SelectedButton = $( '.row-2-thumbs li' ).css('width'); //console.log('thumbWidht',thumbWidht);
	
	switch(SelectedButton)
	{
		case '90px':  SelectedButton = 'Tiny'; break;
		case '183px': SelectedButton = 'xSmall'; break;
		case '220px': SelectedButton = 'Small'; break;
		case '276px': SelectedButton = 'Medium'; break;
		case '369px': SelectedButton = 'Large'; break;
		case '553px': SelectedButton = 'XLarge'; break;
		default:	  SelectedButton = 'AsIs'; break;   
	}
	
	if (  SelectedButton == 'Tiny' || SelectedButton == 'xSmall' || SelectedButton == 'Small' || SelectedButton == 'Medium' || SelectedButton == 'Large' || SelectedButton == 'XLarge' || SelectedButton == 'AsIs' ) { 
		$( '#SelectedButton > a' ).text( SelectedButton );
	}
}

function NormalRelated(SelectedButton){
	
	$("style#orginal").remove();
	$("style#headSwitchButtons").remove();
	$('<style id="headSwitchButtons"></style>').appendTo('head');
	
	tamper();
	
	$('#main-container #hd-rightColVideoPage').css('cssText','width: 557px; margin-top: -1px;').insertAfter( $( "#under-player-comments" ) );
	$('#under-player-comments').css('cssText','width: 557px !important;');
	$('#under-player-playlists').css('cssText','margin-top: 40px;');
	
	Basic();
	
	switch(SelectedButton)
	{
		case 'Tiny': SelectedButton = 'Small'; break;
		case 'xSmall': SelectedButton = 'Small'; break;
	}
	
	$("#xSmall, #Tiny").hide(); //, #XLarge
	$("#" + SelectedButton ).hide();
	
    $( '#MaxiOFF').show();   console.log('MaxiOFF');
	$( '#SelectedButton, #all' ).show();
	$( '#SelectedButton > a' ).text( SelectedButton );
	
	var newWidth;
	switch(SelectedButton)
	{
		case 'Small':  newWidth = '24.2%';  break;
		case 'Medium': newWidth = '32.6%';  break;
		case 'Large':  newWidth = '49.3%';  break;
		case 'XLarge': newWidth = '99%';	break;
		case 'AsIs':   newWidth = 'initial';  break; 
	}
	$("style#headSwitchButtons").append('.row-2-thumbs li { width: '+newWidth+'; display: inline-block;}');
}

function OrginalRelated(){
	
	$("style#viewVideo").remove();
	$("style#headSwitchButtons").remove();
	
	$('#main-container #hd-rightColVideoPage').css('cssText','').insertBefore( $( "#under-player-comments" ) );
	$('#SelectedButton, #all').hide();
    $('#MaxiOFF, #MaxiON').hide();
	
	$('#under-player-comments').css('cssText','');
	$('#under-player-playlists').css('cssText','');
	
	$('#player').parent('.video-wrapper').css('cssText','');
	$('#main-container').css('cssText','');
    $("h1.title").css('max-width','675px');
    
    $('.show-more-btn').text('Show More');
	$('.video-action-tab.about-tab .video-detailed-info .showLess').css('cssText','display: none;');
    
	$('<style id="orginal"></style>').appendTo('head'); 
	
	var newRule = ' '
	+	'#main-container #hd-rightColVideoPage .tabs_video .related_tabs {'
	+		'width: inherit;'
	+		'height: inherit;'
	+		'}'
	+	'#main-container #hd-rightColVideoPage .tabs_video {'
	+		'width: inherit;'
	+		'position: absolute;'
	+		'}'
	+	'#relatedVideosVPage {'
	+		'position: relative;'
	+		'top: 27px;'
	+		'}';
	$("style#orginal").append(newRule); 
    
}

function ChoiceState(State,SelectedButton){

	switch(State)
	{
		case 'Wide':
			WideRelated(SelectedButton);
			break;
		case 'Normal':
			NormalRelated(SelectedButton);
			break;
		case 'Orginal':
			OrginalRelated();
			break;
	}
}

function ChoiceMenue(){
    
    $('<style id="ChoiceMenue"></style>').appendTo('head');
    
    var newRule_ChoiceMenue = ' '
	+	'ul.related_tabs li.omega.right {'
	+		'float: right !important;' 
	+		'list-style-type:none;' 
	+		'padding:0px;' 
	+		'width: 79px;' 
	+		'}' 
	+	'ul.related_tabs li.omega.right ul {' 
	+		'display: none;' 
	+		'padding-left: 4px;' 
	+		'padding-right: 5px;'
	+		'}' 
	+	'ul.related_tabs li.omega.right:hover ul {' 
	+		'display: block;'
	+		'}' 
	+	'.related_tabs li ul li a {' 
	+		'width: 39px;'
	+		'}';
	$("style#ChoiceMenue").append( newRule_ChoiceMenue );

}

function SwitchButtons(){
	
	var SelectedButton = '', State = '', newHtml_buttons = '';
	
	$('<style id="headSwitchButtons"></style>').appendTo('head');

	newHtml_buttons = ' '
	+	'<li id="SelectedButton" class="omega right"><a>-----</a>'
	+		'<ul>'
	+			'<li id="Tiny" class="omega choice" data-state="Wide"><a>Tiny</a></li>' 
	+			'<li id="xSmall" class="omega choice" data-state="Wide"><a>xSmall</a></li>' 
	+			'<li id="Small" class="omega choice" data-state="Wide"><a>Small</a></li>'
	+			'<li id="Medium" class="omega choice" data-state="Wide"><a>Medium</a></li>' 
	+			'<li id="Large" class="omega choice" data-state="Wide"><a>Large</a></li>' 
	+			'<li id="XLarge" class="omega choice" data-state="Wide"><a>XLarge</a></li>'   
	+			'<li id="AsIs" class="omega choice" data-state="AsIs"><a>AsIs</a></li>' 
    +		'</ul>' 
	+	'</li>' 
	+	'<li id="state" class="omega right"><a>-----</a>'
	+		'<ul>'
	+			'<li id="Normal" class="omega state"><a>Normal</a></li>' 
	+			'<li id="Wide" class="omega state"><a>Wide</a></li>' 
	+			'<li id="Orginal" class="omega state"><a>Orginal</a></li>'
	+		'</ul>' 
	+	'</li>' 
	+	'<li id="all" class="omega right"><a>Show All</a>' 
	+	'</li>';
	$("#main-container #hd-rightColVideoPage .tabs_video .related_tabs").append( newHtml_buttons );

	State = GM_getValue("pornhub_state");
	SelectedButton = GM_getValue("pornhub_SelectedButton");
	
	function noConfig(State,SelectedButton){
		$( '#state > a' ).text( State ); 
		$( '#' + State + ', #' + SelectedButton ).hide();
		$( '#SelectedButton > a' ).text( SelectedButton );
	}
	noConfig(State,SelectedButton);
	
	if ( $( '#state > a' ).text() == '-----' ) {
		State = 'Orginal';
		SelectedButton = 'Small';
		noConfig(State,SelectedButton);
	}
    
	ChoiceState(State,SelectedButton);
	
	$('.state').on('click',function(){ 
		$( '.state' ).show(); $( this ).hide();
		var State = $( this ).attr('id');
		var SelectedButton = $( '#SelectedButton > a' ).text(); 
		$( '#state > a' ).text( State ); 
		ChoiceState(State,SelectedButton);
	});
	
	$('.choice').on('click',function(){
		$( '.choice' ).show();
		var SelectedButton = $( this ).attr('id');
		var State = $( '#state > a' ).text();
		ChoiceState(State,SelectedButton);
	});
    
	$('#SelectedButton').on('click',function(e){
        
        console.log('SelectedButton');
        if( e.target == this && e.which == 1 ){
            
        }
	});
    
    $( "#MW-slider" ).slider({
        value: 333,
        min: 830,
        max: 1600,
        step: 20,
        slide: function( event, ui ) 
        {
            
        }
    });
}

function ShowThumbs(){

	function RelatedVideoCatch(){
		if ( $('#relatedVideosVPage .videos-list ul').length > 1 ){
			$('#relatedVideosVPage .videos-list ul:last-child').addClass('Xed').appendTo( $( '#relatedVideosVPage .videos-list ul:first-child' ) );
			$('#relatedVideosVPage .Xed>li').unwrap();
		}
	}
	
	$( '#relatedVideosVPage' ).on('resize', function() {
		RelatedVideoCatch();
		console.log('thumbs',$('li.videoblock').size());
	}); 
	
	$('#all').on('mousedown', function(){
        
		var counter = 1;
		function clickloop(counter){						
			var maximum = 2500, minimum = 1000,
				randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

			$('#relatedVideosVPage .more_related_btn.nav-related').simulate('click');
				
			$('#all a').text('process ' + counter).css('cssText','color: coral; width: 100px; margin-left: -7px;');
				
			if ( counter < 6 ) {
				setTimeout(function(){
					counter++;
					clickloop(counter);
				},randomnumber);
			} 
			else if ( counter == 6 ) {
				$('#all a').text('All Is There').css('cssText','color: red; width: 100px; margin-left: -7px;');
			}
		}
		clickloop(counter);
	}); 
   
}

function mydropdownTrigger(){
	$('<style id="droppDown"></style>').appendTo('head');
	var newRule = ' '
	+	'.mydropdownTrigger:hover {'
	+		'background: #363636;'
	+		'}'
	+	'.mydropdownTrigger {'
	+		'background: #1f1f1f;'
	+		'height: 25px;'
	+		'line-height: 25px;'
	+		'padding: 0 23px;'
	+		'color: #ccc;'
	+		'cursor: pointer;'
	+		'float: left;'
	+		'position: relative;'
	+		'border-radius: 2px;'
	+		'-webkit-border-radius: 2px;'
	+		'}';
	$("style#droppDown").append(newRule);	  
}

function hd_buttom(){

	mydropdownTrigger();
	
	var newHtml =
		'<span id="HDButton" class="mydropdownTrigger">HD</span>';
	$( newHtml ).appendTo( $( '.filters.mainFilter.float-right' ) );
	
	$('#HDButton').on('click',function()
    {
		if( $("#HDButton.done").size() == 0 ){
			$(".videos.row-4-thumbs .hd-thumbnail").each(function(index){
				$(this).parents('.videoblock').addClass('hasHD');
			});
			$('#HDButton').addClass('done');
		}		
		if( $("#HDButton.HDSorted").size() == 0 ){
			$('.videoblock').hide();
			$('.hasHD').show();
			$('#HDButton').addClass('HDSorted');
			$('#HDButton.mydropdownTrigger').css('cssText','color: red;');
		}
		else {
			$('.hasHD').hide();
			$('.videoblock').show();
			$('#HDButton').removeClass('HDSorted');
			$('#HDButton.mydropdownTrigger').css('cssText','');
		}		
	});
}

function slide()
{
    var newHtml =
        '<div id="slider-container">'
	+		'<div id="width-slider" class="sliders" data-store="0"></div>'
    +		'<div id="size-slider" class="sliders" data-store="0"></div>'
    +	'</div>';
	$( newHtml ).appendTo( $( '.section_bar' ) );
    
    $('<style id="slide"></style>').appendTo('head');
    
	var newRule = ' '
	+	'.ui-slider-horizontal .ui-slider-handle {'
	+		'top: -4px;'
	+		'margin-left: 0px;'
	+		'}'
	+	'.ui-slider .ui-slider-handle {'
	+		'position: relative;'
	+		'z-index: 2;'
	+		'cursor: default;'
	+		'}'
	+	'#slider-container {'    
	+		'width: 138px;'
    +		'margin: 0 auto;'    
	+		'margin-top: 10px;'        
	+		'}'
	+	'.sliders {'    
	+		'background-color: rgb(235, 235, 192);'
	+		'height: 8px;'
	+		'float: left;'
    +		'}'
    +	'#width-slider {'
	+		'width: 100px;'
	+		'}'
    +	'#size-slider {'
	+		'width: 25px;'    
	+		'margin-left: 10px;'    
	+		'}'
	+	'.ui-state-default, .ui-widget-content .ui-state-default, .ui-widget-header .ui-state-default {'
	+		'border: 2px solid #DD9719;'
	+		'}'
	+	'ul.videos li {'
	+		'margin-bottom: 5px;'
	+		'}'
	+	'div.wrap {'
	+		'width: initial !important;'
	+		'margin-left: 10px !important;'
	+		'}'
	+	'#welcome {'
	+		'width: initial;'
	+		'}'
	+	'div.bar_body div.bar_items {'
	+		'width: 940px !important;'
	+		'}';
	$("style#slide").append(newRule);
    
    $( 'link[href*="large.css"]' ).remove();
    
    var ws = GM_getValue("pornhub_ws"),
        ss = GM_getValue("pornhub_ss");
    
	function WidthSlide(newWidth)
    {
        $( "div.container, #headerContainer" ).css('width',newWidth + 'px');
        $( "div.nf-videos" ).css('width',newWidth - 170 + 'px');   
    }
	function SizeSlide(newWidth)
    {
           $("style#newWidth").remove();
            switch(newWidth)
            {
                case 1:	newWidth = '98.5%';  break;
                case 2:	newWidth = '49.5%';  break;
                case 3:	newWidth = '33.0%';  break;
                case 4:	newWidth = '24.2%';	 break;
                case 5:	newWidth = '19.7%';  break; 
                case 6:	newWidth = '16.3%';  break;
                case 7:	newWidth = '14.0%';  break;
            }            
            $('<style id="newWidth">.row-4-thumbs li{ width: ' + newWidth + ' !important; }</style>').appendTo('head');       
	}    

    WidthSlide(ws);
    SizeSlide(ss);
        
    $( "#width-slider" ).slider({
        value: ws, min: 830, max: 1750, step: 20,
        slide: function( event, ui ) {
            WidthSlide( ui.value );
            GM_setValue("pornhub_ws", ui.value );
        }
    });    
    $( "#size-slider" ).slider({
        value: ss, min: 1, max: 7, step: 1,
        slide: function( event, ui ) {            
			SizeSlide( ui.value );
            GM_setValue("pornhub_ss", ui.value );
        }
    });
    
    function triggerKeyE(el, keyCode)
    {
        var eventObj = document.createEventObject ?
            document.createEventObject() : document.createEvent("Events");
      
        if(eventObj.initEvent){
          eventObj.initEvent("keydown", true, true);
        }
      
        eventObj.keyCode = keyCode;
        eventObj.which = keyCode;
        
        el.dispatchEvent ? el.dispatchEvent(eventObj) : el.fireEvent("onkeydown", eventObj); 
      
    } 
    
    
	$("#width-slider, #size-slider").on('mousewheel', function(e) {	
        $(this).focus();
        if(e.originalEvent.wheelDelta < 0 ) { 
            //scroll down
            Podium.keydown(38);
            triggerKeyE(this, 38);console.log('triggerKeyE',38); 
        } else {
            //scroll up
            Podium.keydown(40);
            triggerKeyE(this, 40);console.log('triggerKeyE',40); 
        } 
        e.preventDefault();
	});
    
}

function filterCatNone(){	
	$('#categoryFilterList .subSearchFilter .alpha').waitUntilExists(function(){ 
		
		if ( $('#inputAll').size() == 0 ) {
		
			$("#scrollbar_sidebar > ul > li.alpha > a").attr('id','inputAll');
			
			var href = $("#scrollbar_sidebar > ul > li.alpha > a").attr('href');
			href = href.replace("&filter_category=3","&filter_category=0");
			
			$("#categoryFilterList .subSearchFilter .alpha").removeClass('alpha');
			
			var newRule =
				'<li id="catAll" class="alpha"><a href="'+href+'">All</a></li>';
			$( newRule ).prependTo( $( '#categoryFilterList .subSearchFilter' ) );
		}
		
		var selected = window.location.href;
		if( selected.search( "filter_category=0" ) > 1 || selected.search( "filter_category" ) == -1 ) {
			$("#catAll a").addClass('selected');
		}																										
	});	   
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

function maxiPlayerSimple(){
	console.log('maxiPlayerSimple'); 
    
	function MaximizePlayerCss(){
        
		$('<style id="maxiPlayer"></style>').appendTo('head');
        
		var newRule = ' '
		+	'html {'
		+		'overflow: hidden;'
		+		'}'
		+	'body {'
		+		'background: black;'
		+		'}'
		+	'#main-container > div.video-wrapper.filbunke > div.title-container {'
		+		'opacity: .4;'
		+		'}'
		+	'#main-container > div.video-wrapper.filbunke > div.title-container > h1 {'
		+		'opacity: 0.2;'
		+		'}'
		+	'#main-container > div.video-wrapper.filbunke > div.title-container:hover,'
		+	'#main-container > div.video-wrapper.filbunke > div.title-container > h1:hover {'
		+		'opacity: 0.9;'
		+		'}'
		+	'.abovePlayer,'
		+	'#flagDiv,'
		+	'#PornhubNetworkBar,'
		+	'#header,'
		+	'.filbunke > div.video-actions-menu,'
		+	'#main-container > div.video-wrapper.filbunke > div.video-actions-container,'
		+	'#main-container > div.video-wrapper.filbunke > div.ad-below-player,'
		+	'#hd-rightColVideoPage,'
		+	'#under-player-comments,'
		+	'#under-player-playlists,'
		+	'body > div.wrapper > h2,'
		+	'body > div.wrapper > p,'
		+	'#footer,'
		+	'body > div.wrapper > div.logoFooterWrapper {'
		+		'display:none'
		+		'}';
		$("style#maxiPlayer").append(newRule);  
	}

	function addMaxiPlayerButton(){
		
		mydropdownTrigger();
		
		var newHtml_configButton =
			'<div id="MaxiPlayerButton" style="float: right; margin-right: 10px; margin-top: -2px;">'
		+		'<span id="MaxiON" class="mydropdownTrigger">Normilize</span>'
		+		'<span id="MaxiOFF" class="mydropdownTrigger">Maximize</span>'
		+		'<span id="Reload" class="mydropdownTrigger">R</span>'
		+	'</div>';  
		$( newHtml_configButton ).insertAfter('#flagDiv');
		
		$( '#MaxiON, #MaxiOFF' ).hide();
		$( '#MaxiPlayerButton span' ).css('color','#636363');		
	}
	
	addMaxiPlayerButton();
	
	$( '#MaxiPlayerButton span').on('mouseenter',function(){ 
		$(this).css('color','white');  
	}).on('mouseleave',function(){ 
		$(this).css('color','#636363');  
	});     
	
	$( '#player' ).parent().addClass('filbunke');
	$( '#MaxiPlayerButton span').on('click',function(){ 
		
		if ( $( this ).attr('id') == 'MaxiOFF' ) {
            $( '#MaxiPlayerButton span').show();
            $( this ).hide();			
			MaximizePlayerCss();
            window.playerWidth = $('body').width() - 20;
            $('#player').css('height',$('body').height() - 66)
			$('body > div.wrapper > div.container').css('cssText', 'width:'+window.playerWidth+'px !important; top: 0px; position: relative;').addClass('zoomon');
			if ( $( '#player' ).hasClass('wide') ) { 
                $( '#player' ).removeClass('wide'); 
                var storeWide = 'on';
            }			
			$('body > div.wrapper > div.container').prop('data-zoom','100'); 
			$('body > div.wrapper > div.container').prop('data-top','0'); 
            $('.title-container').prop('data-zoom','100');
            
            ScrollZoomTune('#main-container',1,1,1);
            
            //document.addEventListener('keydown', function(e) { GM_log(e.keyCode); if (e.keyCode == 27) { $("#MaxiON").click(); } }, false); 
            //$( document ).keydown(function( event ) { if ( event.which == 27 ) { $("#MaxiON").click(); GM_log(event.keyCode); } });
            $( document ).on('keydown', function( event ) { 
                GM_log(event.keyCode); 
                if ( event.which == 27 ) { 
                    $("#MaxiON").click();  
                } 
            });
            
		} else if( $( this ).attr('id') == 'MaxiON' ){
            $( '#MaxiPlayerButton span').show();
            $( this ).hide();			
			$('body > div.wrapper > div.container').css('cssText', '').removeClass('zoomon');
            $('.title-container').css('cssText', '');
            $('#player').css('height','')
			$("style#maxiPlayer").remove();
			if ( storeWide == 'on' ) { $( '#player' ).addClass('wide'); storeWide = 'off'; }
        } else {
            $(".filbunke").prepend( $("#player") ); 
        }		
	});
    
    function Resizing(){
        if( $('body > div.wrapper > div.container').hasClass('zoomon') ){
            window.playerWidth = $('body').width() - 20;
        	window.playerZoom = $('.wrapper > .container').prop('data-zoom');
            window.playerTop = $('body > div.wrapper > div.container').css('top');
            $('#player').css('height',$('body').height() - 66)
			$('body > div.wrapper > div.container').css('cssText', 'width:'+playerWidth+'px !important; top: '+playerTop+'px; position: relative; zoom:'+playerZoom+'%;');
        }  
    }
    
    $(window).on('resize', function(e) {  Resizing();  });

    $('.wrapper, body').on('mousedown', function(e) { 
        if( $('body > div.wrapper > div.container').hasClass('zoomon') && e.target == this ){
            $('.title-container').prop('data-zoom','70');
            $('body > div.wrapper > div.container').prop('data-zoom','100'); 
            $('body > div.wrapper > div.container').prop('data-top','0');         
            Resizing();            
        } else {
            if( e.which == 1 && e.target == this){ 
				ScrollZoomTune('.container',1,30,1);  
            } else {
                $(this).on('contextmenu', function(e) {  
                    if( e.which == 2 && e.target == this || e.which == 3 && e.target == this ){ 
                        //return false; 
                        e.preventDefault();
                    }
                }); 
            }              
        }
    });
 
	$(document).on('mousewheel', function(e) {	
			
		if( $('body > div.wrapper > div.container').hasClass('zoomon') ){
			
			var dataZoomVideoOld, dataZoomVideo = $('.wrapper > .container').prop('data-zoom');
			dataZoomVideo = parseInt(dataZoomVideo);
			dataZoomVideoOld = dataZoomVideo;
            
			var containerTopOld, containerTop = $('.wrapper > .container').css('top');
			containerTop = containerTop.slice(0, -2);
			containerTop = parseInt(containerTop);
            containerTopOld = containerTop;
            
            var dataZoomTitleOld, dataZoomTitle = $('.title-container').prop('data-zoom');
            dataZoomTitle = parseInt(dataZoomTitle);
            dataZoomTitleOld = dataZoomTitle;
            
            var margin = parseInt($('.wrapper > .container').css('margin-left').replace("px", ""));                       
                
            if(e.originalEvent.wheelDelta < 0 ) { 
                //scroll down console.log('Down',e.originalEvent.wheelDelta);
                dataZoomVideo = dataZoomVideo - 5;
                dataZoomTitle = dataZoomTitle + 5;
                containerTop = containerTop + 10;
            } else {
                //scroll up console.log('Up',e.originalEvent.wheelDelta);
                dataZoomVideo = dataZoomVideo + 5;
                dataZoomTitle = dataZoomTitle - 5;
                containerTop = containerTop - 10;
            } 
            
            $('body > div.wrapper > div.container')
                .css('cssText', 'width:'+window.playerWidth+'px !important; position: relative; top:' + containerTop + 'px; zoom:' + dataZoomVideo + '%;')
                .prop('data-zoom',dataZoomVideo)
                .prop('data-top',containerTop); 
            $('.title-container').css('cssText', 'zoom:' + dataZoomTitle + '%;')
            	.prop('data-zoom',dataZoomTitle);

            //prevent page fom scrolling
            return false;
        }					
	}); 
}

function maxiPlayer(){
	
	function MaximizePlayerCss(){
		$('<style id="maxiPlayer"></style>').appendTo('head');
		var newRule = ' '
		+	'body {'
		+		'background: none;'
		+		'background-color: rgb(20, 20, 20);'
		+		'}'
		+	'div.container {'
		+		'top: 1123px;'
		+		'}'
		+	'#footer {'
		+		'position: relative;'
		+		'top: 1135px;'
		+		'}'
		+	'#player {'
		+		'position: absolute;'
		+		'margin: auto;'
		+		'height: 1135px;'
		+		'width: 1500px;'
		+		'z-index: 1000;'
		+		'left: 0px;'
		+		'right: 0px;'
		+		'}'
		+	'#header, #PornhubNetworkBar {'
		+		'display: none;'
		+		'}';
		$("style#maxiPlayer").append(newRule);  
	}
}

$(document).ready(function(){
	
	var astr = window.location.href;
	var ares = astr.split("/");
	
	setTimeout(function(){
		DefaultConfig();
	},550);
	
	if ( ares[3].substring(0,10) == 'view_video' ){
		ChoiceMenue();
		setTimeout(function(){
            maxiPlayerSimple();
			SwitchButtons();
			ShowThumbs();
		},200);

	} else if ( ares[3] == 'pornstar' || ares[3] == 'categories' || ares[3].substring(0,5) == 'video' ){		

		$('.pagination2').waitUntilExists(function(){

			if( $("style#pagination").size() == 0 ){ 
				
				$('<style id="pagination"></style>').appendTo('head');
				var newRule = ' '
				+	'.pagination2.playing {'
				+		'top: -20px;'
				+		'zoom: 0.75;'
				+		'}';
				$("style#pagination").append(newRule); 
			}
                                                     
            $(".pagination2").each(function(index){  
                $(this).attr('id','count'+index); 
            });
                                                     
            if( $('#count0.playing').size() == 0 ){
                $("#count0").addClass('playing').insertAfter( $(".row-4-thumbs") );
                $("#count0").clone().insertBefore( $(".row-4-thumbs") );
            }                                    
		});
		
		setTimeout(function(){ 
			if( $(".hd-thumbnail").size() > 0 ){ hd_buttom(); }
		},550);

		filterCatNone();
        slide();
	}
});
