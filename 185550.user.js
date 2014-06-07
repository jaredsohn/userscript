// ==UserScript==
// @name       	Bing <=> Google
// @namespace  	http://bing
// @version    	0.1
// @description Switch from Bing to Google and vice versa, hover over the bing/google logo, when the logo flips over click to go to that search site
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @match     	http://www.bing.com/search*
// @match     	http://www.google.com/search*
// @match     	https://www.bing.com/search*
// @match     	https://www.google.com/search*
// @copyright  	Prathiraj Chakka
// ==/UserScript==

jQuery.fn.outerHtml = function(s) {
	return (s)
		? this.before(s).remove()
		: jQuery("<p>").append(this.eq(0).clone()).html();
}

function IsGoogle() {
	return $('div#gbq1').length > 0;
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.flip { -webkit-perspective: 800; -ms-perspective: 800; -moz-perspective: 800; -o-perspective: 800; width: 100px; height: 40px; position: relative; }');
addGlobalStyle('.flip .card.flipped { transform:rotatey(-180deg); -ms-transform:rotatey(-180deg); -moz-transform:rotatey(-180deg); -webkit-transform:rotatey(-180deg); -o-transform:rotatey(-180deg); }');
addGlobalStyle('.flip .card { width: 100%; height: 100%; -webkit-transform-style: preserve-3d; -webkit-transition: 0.5s; -moz-transform-style: preserve-3d; -moz-transition: 0.5s; -ms-transform-style: preserve-3d; -ms-transition: 0.5s; -o-transform-style: preserve-3d; -o-transition: 0.5s; transform-style: preserve-3d; transition: 0.5s; }');
addGlobalStyle('.flip .card .face { width: 100%; height: 100%; position: absolute; z-index: 2; font-family: Georgia; font-size: 3em; backface-visibility: hidden; -webkit-backface-visibility: hidden; -moz-backface-visibility: hidden; -ms-backface-visibility: hidden; -o-backface-visibility: hidden; }');
addGlobalStyle('.flip .card .front { position: absolute; z-index: 1; }');
addGlobalStyle('.flip .card .back { transform:rotatey(-180deg); -ms-transform:rotatey(-180deg); -moz-transform:rotatey(-180deg); -webkit-transform:rotatey(-180deg); -o-transform:rotatey(-180deg); }');

if (IsGoogle()) {
	addGlobalStyle('.bing_logo { width: 73px; height: 29px; vertical-align: top; text-indent: -999px; margin: 16px auto; background-image: url(http://www.bing.com/sa/simg/sw_mg_l_4c_lg.png); background-repeat: no-repeat; }');
    var ghtml = $('div#gbq1').html();
	$('div#gbq1').addClass('flip');
	$('div#gbq1').html('<div class="card"></div>');
	$('div.card').html(ghtml);
	$('div.gb_ha').addClass('face').addClass('front');
	$('div.card').append($('<div>').addClass('face').addClass('back'));
	$('div.face.back').append($('<a>').addClass('b_logoArea'));
	$('a.b_logoArea').append($('<h1>').addClass('bing_logo'));
    $('a.b_logoArea').attr('href', 'javascript:window.location.href="http://www.bing.com/search?q="+encodeURIComponent(document.getElementById("gbqfq").value);');
} else {
	addGlobalStyle('.google_logo { background-image: url(http://ssl.gstatic.com/gb/images/v1_53a1fa6a.png); background-size: 536px 341px; display: block; background-position: -444px -69px; height: 33px; width: 92px; }');
    var logoHtml = $('a.b_logoArea').outerHtml();
    $('a.b_logoArea').remove();
    var bhtml = $('form#sb_form').html();
    $('form#sb_form').html('<div class="flip" style="display: inline-block; height: 25px;"></div>' + bhtml);
    $('div.flip').html('<div class="card"></div>');
	$('div.card').append($('<div>').addClass('face').addClass('front'));
    $('div.face.front').append(logoHtml);
	$('div.card').append($('<div>').addClass('face').addClass('back'));
    $('div.face.back').append($('<a>').addClass('g_logoArea'));
	$('a.g_logoArea').append($('<span>').addClass('google_logo'));    
    $('a.g_logoArea').attr('href', 'javascript:window.location.href="http://www.google.com/search?q="+encodeURIComponent(document.getElementById("sb_form_q").value);');
}

$('.flip').hover(function() {
  $(this).find('.card').toggleClass('flipped');
  return false;
});