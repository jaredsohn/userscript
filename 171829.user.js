// ==UserScript==
// @name       		Hocam +
// @namespace  		http://www.caglarcaglayan.com/
// @version    		1.0
// @require      	http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js
// @description  	Hocam kolay resim görme ve 500 hatası çözümü
// @copyright  		2013, Çağlar Çağlayan
// @match      		http://*.hocam.com/*
// @include       	http://hocam.com/*
// @updateURL 		http://userscripts.org/scripts/source/171829.meta.js
// @downloadURL 	http://userscripts.org/scripts/source/171829.user.js
// ==/UserScript==

$(document).on("mouseover", "img", function() {
    var alt = $(this).attr("alt");
    if(alt == "Anasayfa"){
        
    }else{
    var iid = $(this).attr("id");
    var isr = $(this).attr("src");
    var loc = $(this).offset();
    var resim = isr.replace("mini", "maxi");
    $("body").append('<img class="grown" id="o' + iid + '" src="' + resim + '" style="position: fixed; z-index: 1505; top:1px; left:1px;" />');
    }
}).on("mouseleave", "img", function() {
	$(".grown").remove(); 
});

var icerik = document.body.innerHTML;
var hata = "Internal Server Error";
var i = icerik.indexOf(hata, 0);
if (i != (-1) && icerik.length < 1000) {
    location.reload(true);
}