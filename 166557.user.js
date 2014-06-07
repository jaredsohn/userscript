// ==UserScript==
// @name        Unbaby
// @namespace   com.codybrumfield.unbaby
// @description Remove photos from Facebook
// @include     https://www.facebook.com/*
// @include     http://www.facebook.com/*
// @version     1.0.2
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require  https://gist.github.com/BrockA/2625891/raw/fd02ec05e3079cdd52cf5892a7ba27b67b6b6131/waitForKeyElements.js
// @grant    GM_addStyle
// @run-at         document-end
// ==/UserScript==
function unBaby() {
    babywords = ['beautiful family','year old','so adorable','our family','just learned to walk','years old','month old','months old','so adorable','pajamas','eating solid foods','crawling','so cute','is precious','is too cute','look at those cheeks','cutest baby ever','newborn','and mommy','looks like dad','toesies','just like mom','looks like mom','mother and','father and','cute baby',"can't wait to meet",'gorgeous baby','infant','new addition to the family','first ballgame','day old','bundle of joy','birth','ultrasound','baby feet','lbs oz','toddler','carriage','cradle','gave birth','little one','sonogram','preschool','first day at school','gerber','wait to meet him','wait to meet her','little gift','pregnancy','born today','now a father','first birthday','grow up so fast','baby boy','baby girl','1st birthday','is growing up','diaper','diapers','tiny toes','all snuggly','binky','pacifier','bib','onesie','sockies','gerber','such an angel','what an angel','little angel','little princess','daycare','tantrum',"won't stop crying",'is finally napping','first steps','carseat','handsome devil'];
//Parent's caption
 $('li').each(function(e) {
        var caption = $(this).find(".userContent").text();
        for (var i=0;i<babywords.length;i++) { 
            if ( caption.toLowerCase().indexOf(babywords[i]) > -1) {
                $('a.uiPhotoThumb',this).children('img').attr("src","http://distilleryimage1.ak.instagram.com/4f06aa76b41411e2a67b22000a9f188a_7.jpg");
            }
        }
 });
return false;
}
unBaby();
setInterval(unBaby, 1000);