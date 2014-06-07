// ==UserScript==
// @name        404/forbidden, you should not pass/mode changer
// @namespace   *
// @include     *
// @version     1
// ==/UserScript==
// ==UserScript==
var  h1 = false;
if(typeof(document.body.getElementsByTagName('h1')) != undefined){
 h1 = document.body.getElementsByTagName('h1')[0];
}
if((document.title == '403 Forbidden' || document.title == 'Error 403 - Forbidden') && h1){
	document.title= '403 Forbid-dent';
	document.body.getElementsByTagName('h1')[0].innerHTML= 'Forbid-dent<br/><img src="http://www.vadeker.net/humanite/apercu/you_shall_not_pass/Gandalf_you-shall-not-pass.jpg" />';
}


if(document.title == '404 Not Found' || document.title == 'Objet non trouvé!' || document.title == 'Error 404 - Not Found'){
	document.title= '404';
	if(typeof(document.body.getElementsByTagName('h1')[0]) != 'undefined'){

		var title = document.body.getElementsByTagName('h1')[0];
		title.innerHTML= '404'
		title.style.fontSize='10em';
		title.style.margin='0 auto';
		title.style.width='270px';

		var p = document.body.getElementsByTagName('p');
		var address = document.body.getElementsByTagName('address');
		p[0].style.color ='transparent';
		p[0].style.margin='0';
		p[0].style.height='0';
		p[1].style.color ='transparent';
		p[1].style.margin='0';
		p[1].style.height='0';
		address[0].style.color ='transparent';
	}
}
var buttonStyle = {
    'padding' : '5px 8px',
    'border':'solid 1px #ccc',
    'display':'block',
    };
    
var url = window.location;
var baseUrl = url.protocol+'//';
var endUrl = url.pathname+url.search+url.hash;
var urlLocal = baseUrl+url.hostname.replace('preprod.','www.').replace('.com','.local').replace('.fr','.local')+endUrl;
var urlPreprodCom = baseUrl+url.hostname.replace('www.','preprod.').replace('.local','.com').replace('.fr','.com')+endUrl;
var urlPreprodFr = baseUrl+url.hostname.replace('www.','preprod.').replace('.local','.fr').replace('.com','.fr')+endUrl;
var urlProdCom = baseUrl+url.hostname.replace('preprod.','www.').replace('.local','.com').replace('.fr','.com')+endUrl;
var urlProdFr = baseUrl+url.hostname.replace('preprod.','www.').replace('.local','.fr').replace('.com','.fr')+endUrl;

var buttonLocal = $('<a>').text('local').attr('href',urlLocal).css(buttonStyle);
var buttonPreprodCom = $('<a>').text('preprod .com').attr('href',urlPreprodCom).css(buttonStyle);
var buttonPreprodFr = $('<a>').text('preprod .fr').attr('href',urlPreprodFr).css(buttonStyle);
var buttonProdCom = $('<a>').text('prod .com').attr('href',urlProdCom).css(buttonStyle);
var buttonProdFr = $('<a>').text('prod .fr').attr('href',urlProdFr).css(buttonStyle);
var modeContainer = $('<div>').attr('id', 'mode_changer');
modeContainer.hover(function(){
    $(this).css({'background':'#fff'});
    $(this).find('a').show();
}, function () {
    $(this).css({'background':'none'});
    $(this).find('.current').show();
    $(this).find(':not(.current)').hide();
});
modeContainer.append(buttonLocal, buttonPreprodCom, buttonPreprodFr, buttonProdCom, buttonProdFr)
.css({
    'position' : 'fixed',
    'bottom' : '0px',
    'right' : '0px',
    'transition': 'height 0.5s',
    'z-index': '9999'
    });
$('body').append(modeContainer);
var current = false;
$('#mode_changer a').each(function(e){
    current = ($(this).attr('href') ==  url.href);
    
    if(current){
       $(this).css({'text-decoration' : 'underline'}).addClass('current');
    }
    else{
       $(this).css({'text-decoration' : 'none'}).removeClass('current');
    }
});
$('#mode_changer').find('.current').show();
$('#mode_changer').find(':not(.current)').hide();