// ==UserScript==
// @name           Cars.com Thumbnail killer 
// @namespace      7null.com/GM_scripts
// @description    Replaces dumbnails with larger image on search results
// @include        http://www.cars.com/for-sale/searchresults*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==



var doit={init:function sevennull() {


$('.photoColumnDiv img').each(function(){
x=$(this).attr('src').replace(/preview/g,'main');
x=x.replace(/w:...\/h:../g,'w:310\/h:232');
$(this).attr('src', x);
$(this).attr('width','310');
});

}
};
doit.init();
