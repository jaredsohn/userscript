// ==UserScript==
// @name           4chan deSpam
// @author         Awesumness
// @Notes          Enjoy.
// @include        *.4chan.org*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
var regs = new Array(
/hotgalleries/gi,
/anonta.*lk\.com/gi
);


$('.reply blockquote').each( function() {
  for(var x=0;x<regs.length;x++){
    if( regs[x].test($(this).text()) ){
      $(this).parent().parent().parent().parent().css({'border':'1px solid #F00'});
    }
  }
});