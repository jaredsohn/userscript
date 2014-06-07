// ==UserScript==
// @name           Youtube Bimawa НИЯУ МИФИ FIX
// @namespace      meh
// @require	http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @description    Fix bug НИЯУ МИФИ
// @include        http://*youtube.com*
// ==/UserScript==

$(document).ready(function() {
   fixBug(); 
});

function fixBug(){
	$('meta[itemprop="channelId"][content="UCFJOp3A0Sza94wcAEZgiQsg"]').each(function(tag) {
        //Наш клиент
     
       $('link[itemprop="url"]').each(function(tag) {
           var attributeContent = $('link[itemprop="url"]').attr("href"); 
           if(attributeContent.search(/^http:\/\/www\.youtube\.com\/user\/NRNUMEPhI/)>-1){
              return;
           }
           if(attributeContent.search(/&t=6s$/)>-1)
           {
               console.log("Правильный урл");
           }
           else 
           {
               window.location.href = attributeContent+"&t=6s";    
           }
       });  
    
    });
}

