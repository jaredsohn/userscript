// ==UserScript==
// @name       Dizimag exterminator
// @description Dizi-mag.com'da AdBlock kullanabilmenizi sağlar AdBlock kullanıcılarına karşı getirilen yasaklamaları kaldırır ve AdBlock'un kapatmadığı birtakım reklamları kapatır
// @match      http://www.dizi-mag.com/*
// @copyright  2012+, You
// ==/UserScript==

jQuery('a[href*=tatilbudur]').remove();
jQuery('a[href*=commissionlounge]').remove();
jQuery('#backkapat').remove();

var divs = document.getElementsByTagName('div'),i,object;

for (i=0;i<divs.length;i++) {
    object=divs[i];
    if(object.id != undefined && object.id.match(/d.*g/g) != null) 
       		object.parentNode.removeChild(object);
}

jQuery("div[style*='height:90px;padding-top:15px;xbackground-color:red']").remove();
  DiziFiltre2 = function(d,a) {
  DiziFiltre3(a);
  jQuery.ajax({
    type:"GET",url:"/service/?ser=sezon&d="+d+"&s="+a,
    success:function(a){
    jQuery("#sezonac").html(a);
    if(uid!=0){
      asdblo='0';
      setTimeout("izlenenler()",100)};
    },
    error:function(){aktifsezon=999;jQuery("#sezonac").html(a+'. Sezon listesi alynamady. Tekrar deneyin.')}})
}

asdblo='0';
if(typeof(izlenenler) == "function")
izlenenler();


function DELETE()
{
   	jQuery( "div:contains('AdBlock kullandığınız için bazı fonksiyonlar')" ).filter("[style*='block']").remove();
}
addEventListener ('DOMSubtreeModified', DELETE, false);