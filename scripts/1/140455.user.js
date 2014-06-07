// ==UserScript==
// @name       JSS payout checker
// @version    1.0
// @description  payout script
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @include http://synergy.justbeenpaid.com/withdraw.php
// @copyright  2012+, Jumper002
// ==/UserScript==


$(document).ready(
function() {
    var checker;
    var params;
    var procesor=new Array('lr', 'stp', 'ego', 'pm');
    var name_processor=new Array('LibertyReserve', 'SolidTrustPay', 'EgoPay', 'PerfectMoney');
    var processor;
    var work;
    var iter=0;
    var date;
    var time;
    var field='<table border=1 align=center width=800><tbody><tr><td><center>JSS payout checker</center></td></tr><tr><td><textarea cols=100 rows=20 readonly=readonly id=field>JSS payout checker is running!</textarea></td></tr></tbody></table>';

     function getXMLHttpRequest()
{
  var request = false;
    
  try {
    request = new XMLHttpRequest();
  } catch(err1) {
    try {
      request = new ActiveXObject('Msxml2.XMLHTTP');
    } catch(err2) {
      try {
        request = new ActiveXObject('Microsoft.XMLHTTP');                
      } catch(err3) {
        request = false;
      }
    }
  }
  return request;
}
    
    
    function get_date() {
        date=new Date();
        var hour = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();
 
        if (min < 10)
            min = '0' + min;
        if (sec < 10)
            sec = '0' + sec;
        time=hour + ':' + min + ',' + sec;
        

    }
    
    
    
    function send() {
            work.open('POST', 'http://synergy.justbeenpaid.com/withdrawamount.php', true);
 work.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
work.setRequestHeader("Content-length", params.length);
work.setRequestHeader("Connection", "close");

work.onreadystatechange = processResponse;
        work.send(params); }
         function processResponse()
{
  if (work.readyState == 4) {
    if (work.status == 200) {
        var message=work.responseText;
        var n=message.search("JSS Withdraw Amount");
        if(n<0) {
            get_date();
            $('#field').append("\n"+processor+" is closed. (Time: "+time+")");
            if(iter<4)
        {
         params='pp='+procesor[iter];
        processor=name_processor[iter];
        iter++;
         send();
        }
        else
        {
            iter=0;
        }
        }
        if(n>0) {
            clearInterval(checker);
            get_date();
            $('#field').append("\n"+processor+" is now open! (Time: "+time+")");
            window.open('').document.write(message); }
      
        
         
       
       
        }
    }

       
  }
    

      work = getXMLHttpRequest();
    
   
    function check() {
        params='pp='+procesor[iter];
        processor=name_processor[iter];
        iter++;
        send();
      
    }

            

    $('form#form1').append(field);
    check();
   checker=setInterval(check, 60000);
    
   
    
    
    

  
    
    
    
});