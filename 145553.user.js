// ==UserScript==
// @name	derStandard.at: Ansichtssache vertikal
// @description	Stellt die Bilder einer Slideshow untereinander dar
// @license GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @namespace	http://userscripts.org/users/484567
// @require	http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @include	http*://derstandard.at/*
// @include	http*://diestandard.at/*
// @include	http*://dastandard.at/*
// ==/UserScript==

if($("div.diashow").length>0&&$("div.diashow.list").length==0){
    
    jQuery.ajaxSetup({async:false});
    
    var objContent = $("#objectContent");
    
    $("span.prev").remove();
    $("span.next").remove();
    $("p.next").remove();
    
    $("div.screen img").unwrap();

    var numOfSlides = parseInt($("span.volume").text().substr(11));    
  
    for(var i=2;i<=numOfSlides;i++){
        
        $.get("document.URL"+"?_slideNumber="+i, function(data) {
                       
            var slidesCanvas = $("div.slidesCanvas",data);
            
            $("span.prev",slidesCanvas).remove();
            $("span.next",slidesCanvas).remove();
            $("p.next",slidesCanvas).remove();
            
            $("div.screen img",slidesCanvas).unwrap();
                        
            objContent.append(slidesCanvas);            
        });       
    }        
}
