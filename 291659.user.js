// ==UserScript==
// @name        DiceRoller
// @namespace   VampireRol
// @description roll a dice
// @include     https://www.facebook.com/*
// 
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

$(document).ready(function() {  
$(".uiTextareaNoResize").keydown(function(e){
 var code = e.which; // recommended to use e.which, it's normalized across browsers
   if(code==13)e.preventDefault();
   if(code==13){
  
   var str = $(this).val();
   
   if(str.indexOf("/")==0&&str.indexOf("d")>0&&str.length>3)
   {
       var Dindex=str.indexOf("d");
      
       var num=parseInt(str.substr(1,Dindex-1));
       var dice=parseInt(str.substr(Dindex+1,str.length-Dindex-1));
       
      
       
       var success6=0;
       var success7=0;
       var success8=0;
       var success9=0;
       var success10=0;
       var botch=0;
       
       if(num<51&&num>0&&dice<101&&dice>1)
       {
       
           var x=0;
           var roll="{";
           for(var i=0;i<num;i++)
           {
               x= Math.ceil(Math.random()*dice);
              
               if(x>9){success6++;success7++;success8++;success9++;success10++;}
               else if(x>8){success6++;success7++;success8++;success9++;}
               else if(x>7){success6++;success7++;success8++;}
               else if(x>6){success6++;success7++;}
               else if(x>5){success6++;}
               else if(x==1){botch++;}
       
               roll=roll+" "+x+",";
           }
           roll=roll.substr(0,roll.length-1);
           roll=roll+" }";
       
           str=str.substr(1,str.length-1)+": "+roll;
           str=str+"\nExitos Dif 6: "+(success6-botch);
           str=str+"\nExitos Dif 7: "+(success7-botch);
           str=str+"\nExitos Dif 8: "+(success8-botch);
           str=str+"\nExitos Dif 9: "+(success9-botch);
           str=str+"\nExitos Dif 10: "+(success10-botch);
           //str=str+"\n\nFracasos: "+botch;
           
           $(this).val(str);
           $("input#u_0_1a").click();
        }
       
       
   }
   
   
       
   }
});


});