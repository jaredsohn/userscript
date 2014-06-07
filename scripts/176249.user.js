// ==UserScript==
// @name       Zbiorki PAF - test
// @namespace  http://polish-armed-forces.pl
// @version    1.0
// @description  Skrypt do zbiórek PAF
// @include        http://www.erepublik.com/*
// @exclude        http://www.erepublik.com/*/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @copyright  2012+, Sebaci
// ==/UserScript==


$title = $('<h1>Rozkazy</h1>');
$title.css('margin-bottom', '10px');
$channel = '<a href="http://webchat.quakenet.org/?channels=paf" style="color: #04346C;" target=_blank>#paf</a>';

$descr = $('<span><strong>Polish Armed Forces</strong><br /><strong>Odwiedź kanał: '+$channel+'</strong></span>');
$descr.css('position', 'absolute');
$descr.css('left', '15px');
$descr.css('top', '25px');
$descr.css('color', 'white');

$top = $('<div></div>');
$top.css('position', 'relative');
$top.append($descr);
$top.css('background-image', 'url(http://www.erepublik.net/images/modules/homepage/boxes_v2.png?1366787185)');
$top.css('background-position', '0 -241px');
$top.css('height', '78px');

$content = $('<div></div>');
$content.css('position', 'relative');
$content.css('background-image', 'url(http://www.erepublik.net/images/modules/homepage/boxes_v2.png?1366787185)');
$content.css('background-position', '0 -356px');
$content.css('min-height', '30px');
$content.css('padding-top', '12px');
$content.css('padding-bottom', '12px');
$content.css('width', '92%');
$content.css('padding-left', '4%');
$content.css('padding-right', '4%');

$bottom = $('<div></div>');
$bottom.css('position', 'relative');
$bottom.css('background-image', 'url(http://www.erepublik.net/images/modules/homepage/boxes_v2.png?1366787185)');
$bottom.css('background-position', '0 -607px');
$bottom.css('height', '10px');


$orderDiv = $('<div class="boxes rozkazy"></div>');
$orderDiv.append($title);
$orderDiv.append($top);
$orderDiv.append($content);
$orderDiv.append($bottom);


$('div.column').first().prepend($orderDiv);

var timerOn=false;
var timerStarted=false;
var secs;
/*
function refresh_orders(){
    timerOn = false;
	$.ajax({
    	type: "GET",
    	url: "http://polish-armed-forces.pl/zbiorka_",
        dataType: "html"
    }).done(function( msg ) {
        $content.html(msg);
        
        secs = 120;
        timerOn = true;
    });
    
}
refresh_orders();
$('div.rozkazy').on('click','#refresh_btn', function(){refresh_orders()});


$(document).ajaxComplete(function(){
    if(timerStarted==false){
        timerStarted=true;
        count();
    }
});

function count(){
    $('#ref_counter').html(secs);
    if(timerOn) secs--;
    if(secs > 0){
        t=setTimeout(count, 1000);
    }
    else{
        timerStarted=false;
        refresh_orders();
    }
}
*/

