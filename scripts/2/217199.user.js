// ==UserScript==
// @name       prog1k
// @namespace  http://use.i.E.your.homepage/
// @version    0.2
// @description  enter something useful
// @copyright  2012+, You
// @require  http://ajax.microsoft.com/ajax/jQuery/jquery-1.9.1.min.js
// @include http://www.progsport.com/*
// ==/UserScript==
//document.write("\nAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
//alert("aaaa");
$( document ).ready(function() {
    //alert("bbbb"); 
    
    //$('table tr').each(function(){
    //var $this = $(this);
    //if ($this.find('h3').text() == 'Foo') $this.hide();
    
    $('img').each(function(i){
      var imgSrc = this.src;
      if(imgSrc.indexOf("AUT.gif") !== -1){
        //alert("index: "+imgSrc.indexOf("AUT.gif")+" "+imgSrc);
        $(this).closest('tr').hide();
        $(this).closest('tr').next('tr').hide();
     }
      if(imgSrc.indexOf("ISR.gif") !== -1){
        //alert("index: "+imgSrc.indexOf("AUT.gif")+" "+imgSrc);
        $(this).closest('tr').hide();
       $(this).closest('tr').next('tr').hide();
       }
      if(imgSrc.indexOf("MEX.gif") !== -1){
        //alert("index: "+imgSrc.indexOf("AUT.gif")+" "+imgSrc);
        $(this).closest('tr').hide();
       $(this).closest('tr').next('tr').hide();
     }
      if(imgSrc.indexOf("COL.gif") !== -1){
        //alert("index: "+imgSrc.indexOf("AUT.gif")+" "+imgSrc);
        $(this).closest('tr').hide();
       $(this).closest('tr').next('tr').hide();
     }
    if(imgSrc.indexOf("BRA.gif") !== -1){
        //alert("index: "+imgSrc.indexOf("AUT.gif")+" "+imgSrc);
        $(this).closest('tr').hide();
       $(this).closest('tr').next('tr').hide();
    }    
    if(imgSrc.indexOf("CAN.gif") !== -1){
        //alert("index: "+imgSrc.indexOf("AUT.gif")+" "+imgSrc);
        $(this).closest('tr').hide();
       $(this).closest('tr').next('tr').hide();
     } 
    if(imgSrc.indexOf("KBL.gif") !== -1){
        //alert("index: "+imgSrc.indexOf("AUT.gif")+" "+imgSrc);
        $(this).closest('tr').hide();
       $(this).closest('tr').next('tr').hide();
     }
    if(imgSrc.indexOf("SVK.gif") !== -1){
        //alert("index: "+imgSrc.indexOf("AUT.gif")+" "+imgSrc);
        $(this).closest('tr').hide();
       $(this).closest('tr').next('tr').hide();
     }   
    
    }); 
})
    
    
;
