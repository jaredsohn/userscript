// ==UserScript==
// @name           WWE HQ
// @namespace      xpsdeset
// @description    Make any images on wwe.com big if possible
// @include        http://www.wwe.com/*
// ==/UserScript==


function wwehqx(){
jq=jQuery;
jq('body').append("<div id='wwehqstuff'/>");

jq('<a href="javascript:;"/>').insertBefore('.pane-inner .content .shop').text('HQ').click(function(){
links=""
jq('img[src*=styles][src*=public]').each(
function(){
g=this.src;
links+="<img src='"+g.replace(/\/styles(.*)public/g,'')+"'/>";
});
jq('#wwehqstuff').html(links);

jq('html, body').animate({ 
   scrollTop: jq(document).height()-jq(window).height()}, 
   1400, 
   "easeOutQuint"
);


});}



var head= document.body;
var script= document.createElement('script');
script.type= 'text/javascript';
script.text= wwehqx.toString()+"wwehqx();";
head.appendChild(script);



