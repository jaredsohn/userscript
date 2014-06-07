// ==UserScript==
// @name       		Stri.ms - Bajery
// @version    		0.4
// @downloadurl    	http://userscripts.org/scripts/source/180533.user.js
// @updateurl      	http://userscripts.org/scripts/source/180533.meta.js
// @description  	Zwijanie lewego menu, sortowanie subskrybowanych.
// @match      		http://stri.ms/*
// @require        	http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js
// @grant    		GM_getValue
// @grant    		GM_setValue
// ==/UserScript==
$('body').append('<button class="vbtn lmbtn"><<</button>');
$('body').append('<button class="vbtn azbtn">az</button>');
$('body').append('<button class="vbtn zabtn">za</button>');
$('body').append('<button class="vbtn 12btn">12</button>');
$('body').append('<button class="vbtn 0btn">>0</button>');
$('.vbtn').css({
			float:'left',
    		fontSize:'10px',
    		padding:'1px 3px 0',
    		backgroundColor:'#111',
    		color:'orange',
    		border:'1px',
    		position:'fixed',
    		top:'40px',
    		left:'5px'
})
$('.azbtn').css({left:'25px'});
$('.zabtn').css({left:'44px'});
$('.12btn').css({left:'63px'});
$('.0btn').css({left:'83px'});

splitList();

if(GM_getValue('lm')=='closed'){    
    $('#leftMenu').hide(0);
    $('.span7').css({width:'75%'});
    $('.lmbtn').html('>>');
    $('.azbtn').hide();
    $('.zabtn').hide();
    $('.12btn').hide();
    $('.0btn').hide();
}
if(GM_getValue('hide')=='>0'){  
	hide0();
    $('.0btn').html('all');
}

switch (GM_getValue('sort')){
    case 'az':
      	sortAZ();
      	break;
    case 'za':
      	sortZA();
      	break;
}

$('.lmbtn').on('click', function(){
    if(GM_getValue('lm') != 'closed'){
        GM_setValue( 'lm', 'closed' );
        $('#leftMenu').hide(500);
        $('.span7').animate({width:'75%'},500);
        $('.lmbtn').html('>>');
        $('.azbtn').hide(500);
        $('.zabtn').hide(500);
        $('.12btn').hide(500);
        $('.0btn').hide(500);
        
        
    } else {
        GM_setValue( 'lm', '');   
        $('.span7').animate({width:'670px'},500);
        $('#leftMenu').show(1000);
        $('.lmbtn').html('<<');
        $('.azbtn').show(500);
        $('.zabtn').show(500);
        $('.12btn').show(500);
        $('.0btn').show(500);
    }
})

$('.azbtn').on('click', function(){
	GM_setValue( 'sort', 'az' );
    sortAZ();
})
$('.zabtn').on('click', function(){
	GM_setValue( 'sort', 'za' );
    sortZA();
})
$('.12btn').on('click', function(){
	GM_setValue( 'sort', '' );
	$('#leftMenu ul li').sort(sort12).prependTo($('#leftMenu ul')); 
})
$('.0btn').on('click', function(){
    if(GM_getValue('hide') == ''){
        GM_setValue( 'hide', '>0' );
        hide0();
        $('.0btn').html('all');
    } else {
        GM_setValue( 'hide', '' );
    	$("#leftMenu ul li").show();
        $('.0btn').html('>0');
    }
})

function getStrim(i){
	var strim = $("#leftMenu ul li:nth-child("+i+") a"); 
    return strim;
}
function getLink(i){
	var link =  $("#leftMenu ul li:nth-child("+i+")").html(); 
    return link;
}
function split(i){
	var strim = getStrim(i).html();
    var name = strim.split(' ');
    var newest = name[1].match(/[0-9]+/);
    var html = name[0] + "<span style='float:right'>" + newest + "</span>"; 
    getStrim(i).html(html);
}
function splitList(){
    for(var i = 1; i <= $('#leftMenu ul li').length; i++){
        split(i);
    }
}
function sortAZ(){
   	$('#leftMenu ul li').sort(function(a, b){
       return $('a', a).text().localeCompare($('a', b).text())
    }).appendTo('#leftMenu ul');
}
function sortZA(){
   	$('#leftMenu ul li').sort(function(a, b){
       return $('a', b).text().localeCompare($('a', a).text())
    }).appendTo('#leftMenu ul');
}
function sort12(a,b){
  return parseInt($('span', a).text()) < parseInt($('span', b).text()) ? 1 : -1;
}
function hide0(){
    var l = $('#leftMenu ul li');   
    for(var i = 1; i <= l.length; i++){
        var span = parseInt($("#leftMenu ul li:nth-child("+i+") a span").html());
        if(span == '0'){
            $("#leftMenu ul li:nth-child("+i+")").hide();
        }
    }
}

