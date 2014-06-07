// ==UserScript==
// @name          fotocommunity fancybox-plugin v2.2
// @namespace     http://www.fotocommunity.*/
// @description	  EN :: view nude images without an account on fotocommunity.de (reloads jQuery and fancybox) || DE :: Umgehung des geschützten (Akt) Bereich von fotocommunity.de (lädt jQuery und fancybox nach) 
// @author        CCD
// @include       http://www.fotocommunity.*/*
// @version       2.2
// ==/UserScript==

// Add jQuery
var G_JQ = document.createElement('script');
G_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.js';
G_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(G_JQ);
// Add Fancybox JS
var G_JQ_FC = document.createElement('script');
G_JQ_FC.src = 'http://www.myownroot.de/fancybox.js';
G_JQ_FC.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(G_JQ_FC);
// Add Fancybox CSS
var G_JQ_FC_STYLE = document.createElement('link');
G_JQ_FC_STYLE.rel = 'stylesheet';
G_JQ_FC_STYLE.href = 'http://www.myownroot.de/fancybox.css';
G_JQ_FC_STYLE.type = 'text/css';
document.getElementsByTagName('head')[0].appendChild(G_JQ_FC_STYLE);

// Check if jQuery's loaded
window.G_wait = function G_wait() {
  if(typeof unsafeWindow.jQuery == 'undefined') { 
    window.setTimeout(G_wait,100); 
  } else { 
    $ = unsafeWindow.jQuery; start_fancy(); 
  }
}

window.G_fancy = function G_fancy() {
  
  if(typeof $("a.fancy").fancybox == 'undefined') { 
    window.setTimeout(G_fancy,100); 
  } else { 

    try{
      $("a.fancy").fancybox({
	'hideOnContentClick': false
      });
    }catch(e){
      alert(e)
    }

  }

}

G_wait();

function start_fancy() {

  var images = $("img");
  var regex = /\/thumbs\/([0-9]*)/;

  images.each(function(i){

      var Erg = this.src.match(regex);

      if(Erg!=null){

	$(this).parent().attr("href","http://cdn.fotocommunity.com/photos/"+Erg[1]+".jpg");
	$(this).parent().attr("class","fancy");
	$(this).parent().attr("rel","group1");

	var bildtitel = $(".img_thumb_txt .bildtitel",$(this).parent().parent().parent().parent()).text();

	var temp = "";

	$(".img_thumb_txt .small",$(this).parent().parent().parent().parent()).each(function(i){
	    if(i<1){
	      temp += " ("+$(this).text()+"";
	    }else{
	      temp += ", Am "+$(this).text()+") ";
	    }
	})

	bildtitel += temp;

	$(this).parent().attr("title",bildtitel);

      }
  })

  G_fancy();

}