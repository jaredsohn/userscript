// ==UserScript==
// @name			MAL Plan to Watch: Sorted
// @description		Sort your Plan to Watch anime on airing, aired and not yet aired
// @include			http://myanimelist.net/animelist/*&status=6*
// @version			0.0.2
// ==/UserScript==

(function() {

function main () {
$('.header_ptw:last').clone().attr('id','airing').insertBefore('.header_ptw:last');
$('#airing .header_title span').html('Plan to Watch - Airing');
$('.header_ptw:last').clone().attr('id','notairing').insertBefore('.header_ptw:last');
$('#notairing .header_title span').html('Plan to Watch - Not Yet Aired');
$('.header_ptw:last').next().clone().insertAfter('#airing');
$('<br /><br />').insertBefore('#notairing');
$('.header_ptw:last').next().clone().insertAfter('#notairing');
$('<br /><br />').insertBefore('.header_ptw:last');

$('.animetitle').next().each(function(){
	
	if($(this).html() == "Airing"){
		
		$('#notairing').prev().prev().before($(this).parent().parent().parent().parent());

	} else if($(this).html() == "Not Yet Aired"){

		$('.header_ptw:last').prev().prev().before($(this).parent().parent().parent().parent());
	}	

});

$('.animetitle:odd').parent().parent().find('td').removeClass('td2').addClass('td1');
$('.animetitle:even').parent().parent().find('td').removeClass('td1').addClass('td2');

}

var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ main +')();'));
(document.body || document.head || document.documentElement).appendChild(script);

})();