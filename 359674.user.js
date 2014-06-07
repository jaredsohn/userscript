// ==UserScript==
// @name        mjb_clikingScrpt
// @namespace   mjb_clicking
// @description mjb_clikingScrpt
// @include     http://www.capitalclicking.com/?x=advertisements

// @version     1
// @grant       none
// ==/UserScript==

window.onload=function(){
    var res=prompt("r u ready with delay(in seconds)",60);
    if(res==null)
    {
        console.log('aborted');        
    }
    else
    {
        ca(res);
    }
}

function ca(res)
{
    console.log('working...');
    speed=res;//sec
	
	speed*=1000;
	//$('.blocked').removeClass('tmp');
	$('.tmp .dot').each(function(i,e){
		setTimeout(function(){
			window.open(e.href, '_blank');
		},i*speed);
	});
}