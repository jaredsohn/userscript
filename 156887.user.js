// ==UserScript==
// @name        Auto Ultoo Polls and Ultoo AnswerIt by thefuturehack.blogspot.com.
// @namespace   Ultoo
// @description This script answers all the Polls and AnswerIt questions automatically. So you will have to just login, and go to the poll or the AnswerIt page, and let the script do its job. You will be notified on completion of the poll, or AnswerIt quiz. Check back for updates. If you like this script check out other hacks at http://thefuturehack.blogspot.com
// @include     http://*ultoo.com/*
// @version     v1.0
// ==/UserScript==
// Author       

var path = window.location.pathname;

if (path == "/poll.php")
{
  var rand = computeRandom();
  var opt = "AnchorId_"+rand;
  ImplementClass(opt);
  document.form1.submit();
}

else if (path == "/home.php")
    alert("If you Like this script please like us on facebook http://facebook.com/thefuturehack.";

else if (path == "/PollResult.php")
  location.href = 'http://ultoo.com/poll.php';

else if (path == "/AnswereIt.php")
{
  if (document.getElementById('AnsTxt').value == 'Type your answer here' || document.getElementById('AnsTxt').value == '')
  {
    var x= computeRandom()
    if (x==1)
      document.getElementById('AnsTxt').value = document.getElementById('option1').innerHTML;
    else if (x==2)
      document.getElementById('AnsTxt').value = document.getElementById('option2').innerHTML;
    else if (x==3)
      document.getElementById('AnsTxt').value = document.getElementById('option3').innerHTML;
    else if (x==4)
      document.getElementById('AnsTxt').value = document.getElementById('option4').innerHTML;
    else
      alert("Error");
    document.evaluate("//input[@value='Submit' and @type='submit']", document, null, 9, null).singleNodeValue.click();
  }
}

else if (path == "/AnswereItGraph.php")
  location.href= 'http://www.ultoo.com/AnswereIt.php'

else if (path == "/msgSent.php")
  location.href='http://ultoo.com/home.php'

else if (path == "/AICompletion.php")
  alert("Hurray! All the Ultoo AnswerIt questions have been answered and Rs. 1 has been credited in your account.");

else if (path == "/PollCompletion.php")
  alert("Hurray! All the Ultoo Poll Questions have been answered and Rs. 0.50 has been credited to your account. Submit a question to get a Bonus Rs. 0.50 in your account.")


function computeRandom()
{
return Math.round(Math.random() * (4-1) + 1);
}