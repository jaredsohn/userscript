// ==UserScript==
// @name             google pager for firefox
// @namespace  
// @author       	 stansmith
// @version       	 1.55
// @description 	 autopager for google search with direct links for similar, cache, DuckDuckGo, Dogpile and Bing.
// @include          *www.google.*
// @require          http://code.jquery.com/jquery-1.8.3.min.js
// @copyright        2013+, stansmith
// @updateURL        https://userscripts.org/scripts/source/155543.meta.js
// @downloadURL      https://userscripts.org/scripts/source/155543.user.js
// ==/UserScript==
/*
 * google pager
 *
 * GPL license.
 * 
 * note : for firefox.
 *        work like in chrome minus the thumbnails.  
 *		  best used with the gogglifix script : http://userscripts.org/scripts/show/152777	 
 *	      disable instant search in google options.
 *
 */
 //
 //
$(window).scroll(function() {
		
    if ($('body').offset().top + $('body').height() <= $(document).scrollTop() + $(window).height()*2) {
            
            if (($(window).data('ajaxready') === false)||($(window).data('ajaxready') == undefined)) return;
     
            GoogleLoad();
		}
});
//
//
function cleanGoogle() {
    
             $('div.rc h3.r').each(function(){
                
                 if ($(this).find('#div_similar').length == 0) {
                     
                        var myhref = $(this).find('a').attr('href');
                        var ref2 = myhref.split("/",3);
                         
                	 	var d1 = document.createElement('div');
                     	d1.id = "div_similar";
                     
                        var a1 = '<a href="https://www.google.com/search?&q=related:'+ref2[2]+'" style="font-size: 75%">GoogleSimilar</a>';
                        var a2 = '<a href="https://webcache.googleusercontent.com/search?q=cache:'+myhref+'" style="font-size: 75%">gCache</a>';
                        var a3 = '<a href="http://www.similarsitesearch.com/q.php?URL='+ref2[2]+'" style="font-size: 75%">SimilarSiteSearch</a>';
                     	
                        $(d1).append(a1+'&nbsp;&nbsp;&nbsp;'+a2+'&nbsp;&nbsp;&nbsp;'+a3);
                     	$(this).append(d1);
                }
             });
    
//
//
//remove some junk
//    
             $('div#extrares,div#fbarcnt').remove();
             $('div#mngb:not(:first)').remove();
             $('div#top_nav:not(:first)').remove();
             $('div.vspib').remove();
             $('div#fll').remove();
             $('div#appbar:not(:first)').remove();
             $('div.tsf-p:not(:last)').remove();
             $('div#botstuff:not(:first)').remove();
             $('div#rhscol:not(:first)').remove();
    		 $('div#lu_pinned_rhs').attr('style','position:auto!important');
    		 
    		 $('div#fbarcnt').remove();
    		 $('div#foot:not(:last)').remove();
             $('div#rhscol').attr('style','margin-left:100px;!important');
    
//
// anti lazyload    
// 
if (!($.browser.opera)) {
    
    $('img[class="th late-tbn"]').each(function() {
                   
                     if  (($(this).attr('imgsrc') !== undefined)&&($(this).attr('src') == undefined)) {              		      
                         $(this).attr('src',$(this).attr('imgsrc'));
                     }
    	});
	}
//                   
}
//
//
function GoogleLoad() {
  
    $(window).data('ajaxready', false);
    
    var ref = $('a#pnnext:last').attr('href');
    
    if (ref == undefined) return;
//
// cleaning pics here is more efficient
//    
    $('img[id*=thumb]').removeAttr('id'); $('img[class*=thumb]').removeAttr('class');
//
//    
    var d1 = document.createElement('div');
   
    d1.id = "div_" + new Date().getTime().toString();
    
    $('body').append(d1);
    
    $(d1).load(ref+' #main', function() {
        	        
        cleanGoogle();
        
        $(window).data('ajaxready', true);
        
	});
    
}
//
//
$(document).ready(function() {

    $('div#rhscol').attr('style','margin-left:100px;!important');
                         
    if ($('div#gbqfbw').length > 0) {
        
       var d1 = document.createElement('div');
       d1.id = "div_search";
       var mysearch = $('input#gbqfq:first').val();
    
       var a1 = '<a href="https://duckduckgo.com/?q='+mysearch+'" id="duckduck" style="font-size: small">DuckDuckGo</a>';
       var a2 = '<a href="http://www.bing.com/?q='+mysearch+'" id="bingbing" style="font-size: small">Bing</a>';
       var a3 = '<a href="http://dogpile.com/dogpile/ws/results/Web/'+mysearch+'" style="font-size: small">DogPile</a>';  
           
       $(d1).append(a1+'&nbsp;&nbsp;&nbsp;'+a2+'&nbsp;&nbsp;&nbsp;'+a3); 
    
       $('div#gbqfbw').append(d1);
        
    }
 
  GoogleLoad();
    
});
