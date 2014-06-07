// ==UserScript==
// @name           AutoTraderImprovedListing 
// @namespace      7null.com/GM_scripts
// @description    Rearranges page with vehicle details on top and full size images below. 
// @include        http://www.autotrader.com/fyc/vdp.jsp*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==


var doit={init:function sevennull() {

$('#thumbs').prependTo('#vehicle-info-wrapper')
$('.photos-container img').each(function(){
riptitle=$(this).attr('title');
$(this).attr('src',riptitle);
});

$('#vehicle-description-module').prependTo('#vehicle-info-wrapper')
$('#main-image p:nth-child(4)').prependTo('#vehicle-info-wrapper')
$('#photos-dealer img').each(function(){
x=$(this).attr('src').replace(/scaler.[0-9]*.[0-9]*./g,'');
$(this).attr('src', x);
});



}
};
doit.init();
