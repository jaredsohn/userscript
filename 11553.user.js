// ==UserScript==
// @name          reWhim
// @namespace     forums.whirlpool.net.au
// @description   for people to lazy to cut and paste  ;-)
// @include       http://forums.whirlpool.net.au/forum-replies.cfm*
// @include       http://forums.whirlpool.net.au/whim-send.cfm*
// ==/UserScript==

if(navigator.userAgent.toLowerCase().indexOf('firefox')){
	
	$ = unsafeWindow.jQuery;
	
}


if(document.URL.indexOf('forum-replies')){

  $('a[@title=send user a private message]').each(function(){

      $(this).click( function() { 

        GM_setValue('reTitle', 'RE: '+$('.threadhead').text());
        
        GM_setValue('reUrl', 'RE: '+document.URL);
          

      } );

  });

}

if((document.URL.indexOf('whim-send')) && (GM_getValue('reTitle') != undefined) && (GM_getValue('reTitle') != '')){

  $('input[@name=subject]').attr('value', GM_getValue('reTitle'));

  $('#body').attr('value', GM_getValue('reUrl'));
  
    GM_setValue('reTitle', '');
        
    GM_setValue('reUrl', '');    
  


}