// ==UserScript==
// @name       4chan Morpher script
// @namespace  none
// @version    0.1
// @description  Have all the images on the page joined aside
// @match      *boards.4chan.org/*
// @copyright  2012+, You
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==
var style = '<style type="text/css">';
style += '#blank {display:none;position:absolute;background:#999;opacity:0.60;top:0;left:0;width:100%;height:100%;x-index:100;}';
style += '#morphContent {display:none;padding:90px 10px 10px;position:absolute;backgr ound:#999;top:0;left:0;width:100%;height:100%;x-index:200;}';
style += '.morphedImg {margin: 10px;z-index:300;}';
style += '.mini {max-width:300px;max-height:300px;}';
style += '#morpher, #minimorpher {cursor:pointer;color:#0088CC;}';
style += '#morpher:hover, #minimorpher:hover {text-decoration:underline;}';
style += '#unmorph {cursor:pointer;color:#0088CC;}';
style += '</style>';
$('head').append(style);
$('body').prepend('<div id="blank"></div><div id="morphContent"><strong id="unmorph">[x] unmorph</strong><br /></div>');

function morph(mini){
    var winW = $(window).width();
    var winH = $(window).height();
    //console.log('morphing...');
    $('#blank').show();
    setTimeout(function(){
        if(mini=='mini'){imgmini = ' mini';imgfull='';}else{imgmini = '';imgfull = ' style="max-width: '+winW+'px;max-height: '+winH+'px;"';}
	    $('.topPageNav, .click-me, #recaptcha_response_field').hide();
	    $('#morphContent').fadeIn();
	    $('#morpher').attr('class','on').html('&lt;MORPHED&gt;');
	    //if( $('#morphContent').html() ){ return false; }
	    $('a.fileThumb > img:first-child').each(function(e){
            e++;
	        src = $(this).parent().attr('href');
	        console.log( src );
			$('#morphContent').append('<img'+imgfull+' class="morphedImg'+imgmini+'" onclick="this.parentNode.removeChild(this);" id="mImg'+e+'" src="'+ src +'" />');
    	});
        $('#morphContent').append('<br /><a href="#blank" style="background:black;cursor:pointer;color:white;font-weight:bold;">/\\ TOPO /\\</a>');
    },250);
}

function unmorph(){
    //console.log('unmorphing...');
    $('.topPageNav, .click-me, #recaptcha_response_field').show();
    $('#morphContent, #blank').fadeOut().children('img').remove();
    $('#morpher').attr('class','off').html('MORPH !');
}

function preload(){
	console.log('pre-loading full images');
    $('a.fileThumb > img:first-child').each(function(e){
        src = $(this).parent().attr('href');
        $('body').append('<img style="display:none;" src="'+ src +'" />');
    });
}

$(function(){

    //var winW = $(window).width();
    //var winH = $(window).height();
    
    //$('.morphedImg').css({ maxWidth: winW, maxHeight: winH });
    
    preload();
    
    $('#boardNavDesktop').after('<div> [<strong id="morpher">Morph</strong>] [<strong id="minimorpher">Mini-Morph</strong>] </div>');
    //$('.navLinks').append(' [<strong id="morpher">Morph</strong>] [<strong id="minimorpher">Mini-Morph</strong>] ');
    
    $('#morphContent, #blank').height( $('#morphContent').parent().height() );
    
    $('#minimorpher').click(function(){
    	morph('mini');
    });
    $('#morpher').click(function(){
    	morph();
    });
    $('#unmorph').click(function(){
    	unmorph();
    });

});