// ==UserScript==
// @name        Ultoo Auto POLL & ANSWER by Vikash 2.
// @namespace   Ultoo
// @description Updated on 27-01-2013, this script answers all the Polls and Answer It questions automatically. So you will have to just Login.
// @include     http://www.ultoo.com/*
// @homepage		http://userscripts.org/scripts/show/157690
// @updateURL		http://userscripts.org/scripts/source/157690.meta.js
// @downloadURL		http://userscripts.org/scripts/source/157690.user.js
// @version        2.0.0
// @author         Vikash
// @icon           http://img341.imageshack.us/img341/3755/14060001.png
// @licence        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==


var path = window.location.pathname;

if (path == "/poll.php")
{
  var rand = computeRandom();
  var opt = "AnchorId_"+rand;
  ImplementClass(opt);
  document.form1.submit();
}

else if (path == "/home.php")
  alert("Ultoo Hack Is Running");

else if (path == "/mywallet.php")
 location.href = 'http://www.ultoo.com/poll.php';

else if (path == "/PollResult.php")
  location.href = 'http://www.ultoo.com/poll.php';

else if (path == "/AnswereIt.php")
{
  if (document.getElementById('gbjuymhb').value == 'Type your answer here' || document.getElementById('gbjuymhb').value == '')
  {
    var spanArray = document.getElementsByTagName('img');
    var x= computeRandom()+2;
    var temp = (spanArray[x].src).substring(58);
    var done = temp.substring(0, temp.length-4);
    document.getElementById('gbjuymhb').value = done;
    document.sgvyhdv.submit();
  }
  else
    alert("Error");
}

else if (path == "/AnswereItGraph.php")
  location.href= 'http://www.ultoo.com/AnswereIt.php'

else if (path == "/msgSent.php")
  location.href='http://www.ultoo.com/home.php'

else if (path == "/AICompletion.php")
location.href = 'http://www.ultoo.com/transaction.php?credit=1&debit=0';

else if (path == "/transaction.php")
alert("You Have Successfully Earn Money For Today. Now Login With New Account");

else if (path == "/PollCompletion.php")
location.href = 'http://www.ultoo.com/AnswereIt.php';

function computeRandom()
{
return Math.round(Math.random() * (4-1) + 1);
}