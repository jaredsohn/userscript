// ==UserScript==
// @name         Laaptu by pankaj
// @namespace    Laapu
// @description  only for wf
// @include      *laaptu.com*
// @grant        none
// @version     1
// @author       pankaj
// ==/UserScript==


var path=window.location.href;
var i=document.getElementsByTagName("a")[0].getAttribute("href");
var a=i.replace("homepage.action?id=","");
if(path==("http://www.laaptu.com/homepage.action?id="+a))
document.getElementById("menuFact").click();
else if(path==("http://www.laaptu.com/guessgame1.action?id="+a))
{document.getElementById("g1_380").value=0;
document.getElementById("g2_58").value=random();
document.getElementById("g3_972").value=random();
document.getElementById("g4_761").value=random();
document.getElementById("g5_935").value=random();
document.getElementsByClassName("grbtn bdr3")[0].click();}
else if(path=="http://www.laaptu.com/GuessConfirmation1.action")
document.getElementsByName("confirmBtn")[0].click();
else if(path==("http://www.laaptu.com/factOrFart.action?id="+a)||path==("http://www.laaptu.com/playquiz.action?id="+a))
{var z=document.getElementsByTagName("span")[2].innerHTML;
if(z==" Share with FB friends ")
window.location.href="http://www.laaptu.com/guessgame1.action?id="+a;
else
document.getElementsByClassName("grbtn bdr4")[0].click();}
else if(path==("http://www.laaptu.com/playquiz.action?id="+a+"&state=find&valueCheck=Hifi...you+made+it+right")||("http://www.laaptu.com/playquiz.action?id="+a+"&state=find&valueCheck=Perfect....you+just+answered+right")||("http://www.laaptu.com/playquiz.action?id="+a+"&state=find&valueCheck=You+answered+wrong+!+try+next+statement")||("http://www.laaptu.com/playquiz.action?id="+a+"&state=find&valueCheck=Oops....+you+got+it+wrong!!")||("http://www.laaptu.com/factOrFart.action?id="+a+"&state=find&valueCheck=Hifi...you+made+it+right")||("http://www.laaptu.com/factOrFart.action?id="+a+"&state=find&valueCheck=Perfect....you+just+answered+right")||("http://www.laaptu.com/factOrFart.action?id="+a+"&state=find&valueCheck=You+answered+wrong+!+try+next+statement")||("http://www.laaptu.com/factOrFart.action?id="+a+"&state=find&valueCheck=Oops....+you+got+it+wrong!!"))
document.getElementsByClassName("grbtn bdr4")[0].click();
function random()
{var b=Math.random();return Math.floor(9*b+1);}