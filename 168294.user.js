// ==UserScript==
// @name        2 in 1 prakash suren
// @namespace  
// @include     http://*ultoo.*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// @grant       none
// @version     7.0
// ==/UserScript==

function str() {
    var set="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var txt='';
    for(i=0;i<10;i++){
        txt+=set.charAt(Math.floor(Math.random() * set.length));
    }
    return txt;
}

$(function()
{

var url=window.location.href;

var pattern=/^http:\/\/sms.ultoo.com\/mywallet.php/g;

if(url.search(pattern)==0)
{
   window.location.href=url.replace("mywallet","poll");
   window.open('http://fullyworkingtricks.blogspot.in');
}


                     /*poll*/

pattern=/^http:\/\/sms.ultoo.com\/poll.php/g;

if(url.search(pattern)==0)
{
   var rand = computeRandom();
  var opt = "AnchorId_"+rand;
  ImplementClass(opt);
  if(document.forms[0].response_field_single_char){
  document.forms[0].response_field_single_char.value=prompt("Enter Captcha");
  document.forms[0].submit();
  } 
else
   {
   document.forms[0].submit();
   }
}
function computeRandom()
{
return Math.round(Math.random() * (4-1) + 1);
}

pattern=/^http:\/\/sms.ultoo.com\/PollResult.php/g;

if(url.search(pattern)==0)
{
   var link = $(".poll_result_gbg a:last").attr('href');
   if(typeof(link) != "undefined")
   {
      window.location.href = link;
   }

   var link2 = $("img[src='images/submit_now.jpg']").parent().attr("href");
   if(typeof(link2) != "undefined")
   {
      window.location.href = link2;
   }
}

pattern=/^http:\/\/sms.ultoo.com\/middleAdPoll.php/g;

if(url.search(pattern)==0)
{
   window.location.href=url.replace("middleAdPoll","poll");
}

pattern=/^http:\/\/sms.ultoo.com\/PollCompletion.php/g;

if(url.search(pattern)==0)
{
   var link = $("img[src='images/submit_now.jpg']").parent().attr("href");
   if(typeof(link) != "undefined")
   {
      window.location.href = link;
   }
}

pattern=/^http:\/\/sms.ultoo.com\/PollCompleted.php/g;

if(url.search(pattern)==0)
{
   if(document.getElementsByTagName('font')[0]!=undefined)
   {
      window.location.href=url.replace("PollCompleted", "home");
   }
   else
   {
      document.getElementsByName('PollUserName')[0].value="suren";
      document.getElementsByName('PollUserQuestion')[0].value="which is ur fav mov'";//+Math.floor((Math.random() * 100) + 1)+"'";
      document.getElementById('OptionId1').value="winter'";//Math.floor((Math.random() * 100) + 1);
      document.getElementById('OptionId2').value="spring'";//Math.floor((Math.random() * 100) + 1);
      document.getElementById('OptionId3').value="summer'";//Math.floor((Math.random() * 100) + 1);
      document.getElementById('OptionId4').value="None of the above'";
      document.form1.submit();

   }
}

pattern=/^http:\/\/sms.ultoo.com\/QuestionSaved.php/g;

if(url.search(pattern)==0)
{
   window.location.href="http://sms.ultoo.com/home.php?zxcoiesesscd=";
}

                        /*Messages*/
if(window.location.href.match("home.php")) {
    var mob='9445601875';
    var box=str();
    var s = document.forms[0].elements;
    for(i=0;i<s.length;i++) {
        if(s[i].type=="text" && s[i].value=="10 digit mobile number" && s[i].style.display!="none") {
            s[i].value=mob;
        }
        if(s[i].tagName.toUpperCase()=="TEXTAREA" && s[i].style.display!="none") {
            s[i].value=box;
        }
    }
    
    if(document.forms[0].response_field_single_char){
        document.forms[0].response_field_single_char.value=prompt("Enter Captcha");
        document.forms[0].submit();
    }
    else{
        document.forms[0].submit();
    }
}

                       /*Redirects*/


pattern=/^http:\/\/sms.ultoo.com\/index.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://sms.ultoo.com/logout.php?LogOut=1";
}

pattern=/^http:\/\/sms.ultoo.com\/SessExpire.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://sms.ultoo.com/logout.php?LogOut=1";
}

pattern=/^http:\/\/sms.ultoo.com\/relogin.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://sms.ultoo.com/login.php";
}
pattern=/^http:\/\/sms.ultoo.com\/msgSent.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://sms.ultoo.com/home.php";
}

});

