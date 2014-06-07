// ==UserScript==
// @name       Link Hack for dpstream.net
// @namespace  http://www.google.com
// @version    0.4
// @description  Change automatiquement les liens des vidéos avec un débrideur.
// @include      http://dpstream.net*
// @include      http://*.dpstream.net*
// @copyright  2013+, Kursion
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==
$(function(){
    var list = "";
    var counter = 0;
    var hack = function(){
        
        $("a").each(function(){
            
            var link = $(this).attr("href");
            if(link.indexOf("mixturecloud.com")>-1 || link.indexOf("purevid.com")>-1){
                if(link != "http://www.purevid.com" && link != "http://www.mixturecloud.com"){
                    counter++;
                    link =  "<a href='http://mondebrideur.com/debrideurmixture.php?url="+link+"'>"+counter+" "+link+"</a>";
                    $(this).attr("href", link);
                    list += link+"<br>";
                }   
        	}
        });
        
        $("body").prepend(list);
    };

    setTimeout(function(){ hack(); }, 2500);  
});
