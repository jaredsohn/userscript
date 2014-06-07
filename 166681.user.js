// ==UserScript==
// @name        Laaptu Hack script for Fact or Fart and Guessing Game by hars39.
// @namespace   Laaptu 2.0.
// @description Just login and this Scripts does restand automatically logs out.
// @include     *laaptu.com*
// @grant        none
// @version     2.0.1
// @author       hars39

// ==/UserScript==


var p=window.location.href;
var i=document.getElementsByTagName("a")[0].getAttribute("href");
var a=i.replace("homepage.action?id=","");
if(p=="http://www.laaptu.com/homepage.action?id="+a)
document.getElementById("menuFact").click();
else if(p=="http://www.laaptu.com/guessgame1.action?id="+a||p=="http://www.laaptu.com/guessgame1.action?id="+a+"&msg=Not+valid")
{var msg=document.getElementById('invitelist').innerHTML;
if (msg=="<p>You have submitted 30 guesses and earned 60 paisa today. Well, that's the maximum you can earn in the guessing game in one day. Come again to submit guesses tomorrow.To earn more you can also play fact or fart.\n</p>")
window.location.href="http://www.laaptu.com/logout.action";
else
{document.getElementById("g1_380").value=random();
document.getElementById("g2_58").value=random();
document.getElementById("g3_972").value=random();
document.getElementById("g4_761").value=random();
document.getElementById("g5_935").value=random();
document.getElementsByClassName("grbtn bdr3")[0].click();}}
else if(p=="http://www.laaptu.com/GuessConfirmation1.action")
document.getElementsByName("confirmBtn")[0].click();
else if(p=="http://www.laaptu.com/factOrFart.action?id="+a||p=="http://www.laaptu.com/playquiz.action?id="+a)
{var z=document.getElementsByTagName("span")[2].innerHTML;
if(z==" Share with FB friends ")
window.location.href="http://www.laaptu.com/guessgame1.action?id="+a;
else
document.getElementsByClassName("grbtn bdr4")[0].click();}
else if(p==("http://www.laaptu.com/playquiz.action?id="+a+"&state=find&valueCheck=Hifi...you+made+it+right")||("http://www.laaptu.com/playquiz.action?id="+a+"&state=find&valueCheck=Perfect....you+just+answered+right")||("http://www.laaptu.com/playquiz.action?id="+a+"&state=find&valueCheck=You+answered+wrong+!+try+next+statement")||("http://www.laaptu.com/playquiz.action?id="+a+"&state=find&valueCheck=Oops....+you+got+it+wrong!!")||("http://www.laaptu.com/factOrFart.action?id="+a+"&state=find&valueCheck=Hifi...you+made+it+right")||("http://www.laaptu.com/factOrFart.action?id="+a+"&state=find&valueCheck=Perfect....you+just+answered+right")||("http://www.laaptu.com/factOrFart.action?id="+a+"&state=find&valueCheck=You+answered+wrong+!+try+next+statement")||("http://www.laaptu.com/factOrFart.action?id="+a+"&state=find&valueCheck=Oops....+you+got+it+wrong!!"))
document.getElementsByClassName("grbtn bdr4")[0].click();
function random()
{var b=Math.random();return Math.floor(9*b+1);}
