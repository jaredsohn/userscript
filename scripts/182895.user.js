// ==UserScript==
// @name        setprice
// @namespace   ss
// @description 淘宝直通车调价
// @include     http://subway.simba.taobao.com/bidword/bidwordmanage.htm*
// @version     1
// @grant       none
// @require     http://code.jquery.com/jquery.js   
// ==/UserScript==



//加法
 function accAdd(arg1,arg2){ 
 var r1,r2,m; 
 try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0} 
 try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0} 
 m=Math.pow(10,Math.max(r1,r2)) 
 return (arg1*m+arg2*m)/m 
 }
//减法 
 function Subtr(arg1,arg2){
     var r1,r2,m,n;
     try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
     try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
     m=Math.pow(10,Math.max(r1,r2));
     n=(r1>=r2)?r1:r2;
     return ((arg1*m-arg2*m)/m).toFixed(n);
 }



//等待dom元素加载完毕.



$(document).keydown(function(e){

    var key=(e.keyCode) || (e.which) || (e.charCode);
    if (key == "85"){ // U

$("form#bidwordManageForm > input:submit").click(); 

$("tr#delete_46650876799 > td > input").attr("checked","true");
showBatchModPriceTip();
var t=$("input#bidwordprice_46650876799").val();
t=accAdd(t,"0.50");
//alert(t);
$("input#bidwordprice_46650876799").val(t);


$("div#batchModPriceTip > div > div >input:first").click();


    };
    
    if (key == "68"){ // D
        
$("form#bidwordManageForm > input:submit").click(); 
        
$("tr#delete_46650876799 > td > input").attr("checked","true");
showBatchModPriceTip();
var t=$("input#bidwordprice_46650876799").val();
t=Subtr(t,"0.50");
//alert(t);
$("input#bidwordprice_46650876799").val(t);
$("div#batchModPriceTip > div > div >input:first").click();

        
    }
}); 

