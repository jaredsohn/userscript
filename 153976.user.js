// ==UserScript==
// @name         Twitter Instagram Photo Viewer
// @version      1.0
// @description  Based on Twitter Instagram Cards - Photo Viewer, with our improvments
// @include      https://twitter.com/*
// @require      http://code.jquery.com/jquery-latest.js
// @grant        none
// ==/UserScript==

$documentHeight = '';

function height(){
    
    if($documentHeight != document.body.scrollHeight)
	{
       loadInstagram();
    }
    setTimeout(function(){ height(); },3000);
    
}

function loadInstagram(){
    $documentHeight = document.body.scrollHeight;
    $('body').find('.js-tweet-text').each(function(key,value)
	{
        if ( value.innerHTML.indexOf("instagr.am") >= 0 )
		{			
            if( value.innerHTML.indexOf('div class="instagram"') == -1 && 
			    value.innerHTML.indexOf('inprocess="true"') == -1         )			
			{				
                $instagram = value.innerHTML.split('http://instagr.am/p/');
                $instagram = $instagram[1].split('/"');
                $instagram = $instagram[0];
                $(this).append('<div inprocess="true" class="instagram" style="margin-top: 10px; margin-bottom: 5px;"><img width="435" src="http://instagr.am/p/'+$instagram+'/media" /></div>');
            }
        }
    });
}
$(document).ready(function(){
    loadInstagram(); 
    height();
});