// ==UserScript==
// @name        Ultoo Hack by Pi
// @namespace   Answer it, Poll, SMS
// @description This script works on ultoo
// @grant       none
// @include     *sms.ultoo.com*
// @version     1.0.0
// @author      Pi
// @icon         http://img13.imageshack.us/img13/4417/piwallpaperbyoytiselie.jpg
// ==/UserScript==

var url=window.location.href;var d;var e;var no;var x;var y;var src;var f;
var msg="say that love is in every cor;ner... I must be walking in circles.;Love is the fartOf e;very heartFor when held inDoth pain thy hostBut when l;et outPains others most;Last night I hugge;d my pillow and dreamt of you... I wish that; someday I'd dream about my pillow and I'd be hugging yo;u.;He broke my heart, so I broke his jaw.;My love for; you is like diahrea, I just can't hold it in.;True lo;ve is like a pillowYou can hug it when you're in trouble;You can cry on it when you're in painYou can embrace i;t when you're happySo when you need true loveBuy a pillow;B;oys are great. Every girl should have one;Your smile ca;n be compared to a flowerYour voice can be compared to; a cuckooYour to a childBut in stupidi;ty you have no comparisonYou're the best!;You ;always stop and stare, why not just take a picture?;If I ;kiss him, will he stop talking?;People tel;l me there's plenty of fish in th;e sea. But who wants to date a fish?;You tr;ipped me, so I fell for you.;Every thing is Ea;sy,When you are CrazyandNothing is;When you are Lazy.;Man outside phone boot;h: Excuse me !!You are holding the phone ;since 20 mins&haven't spoken a word..!!!Ma;n inside: I'm talking to my wife.....; For the; best momwho always had a smile for meI know we ma;y be far apart right nowSo here's a great big hug; and kiss;If you weren’t here I'd be the hottest person i;n this place.;Wouldn't we look cute on a wedding cake; together?;My boyfriend is an idiot but I love him an;yway.;If you were a booger, I would pick you ;first.;If you're cute, you can call me bab;yIf you're nice, you can call me swee;tieBut if you're hot, you can call me ton;ight;I trip every time I see you or hear your name;. I guess I really did fall for you.;I w;ant you to have a candle-lit dinner and say tho;se magical three words to you... Pay the bill!;The police are on the; way to arrest you for stealing my h;eart, hijacking my feelings, and driving me cra;zy. See you in court!;Love is like peeing you;r pants everyone can see it but only you can fe;el it. Thanks for being the pee in my pants.;My love for you is like a far;t. Everything about it is powered by m;y heart.;Hallo Door";
var ans="Anand;Bravo;Reporter;Baseball;Armenia;Hussey;Chennai;Gayle;Toyota;Bristol Academy;Jessica Alba;Mrinal Sen;Saif;Wankhede;ajnikanth;Rangers;John;Tsonga;Pierce;Assam;Japan;Barcelona;Watson;2002;Model;Rishi Kapoor;Kvitova;Akshay;Film;Kamal Hassan;Cibulkova;Preeti;Volkswagen;Jaegar;Aman Arya;Roja;Webber;Cricket;Sonali Bendre;Murray;Argentinian;Pigiron;Jiah;Freedom";
var pat=/^http:\/\/sms.ultoo.com\/mywallet.php/g;
if(url.search(pat)==0)
window.location.href=url.replace("mywallet","poll");
var pat=/^http:\/\/sms.ultoo.com\/poll.php/g;
if(url.search(pat)==0)
{var num=(Math.floor((Math.random()*100000000000000+1))%4)+1;
document.getElementById("OptionId_"+num).click();document.form1.submit();}
var pat=/^http:\/\/sms.ultoo.com\/PollResult.php/g;
if(url.search(pat)==0)
document.getElementsByTagName("img")[3].click();
var pat=/^http:\/\/sms.ultoo.com\/middleAdPoll.php/g;
if(url.search(pat)==0)
document.getElementsByTagName("a")[9].click();
var pat=/^http:\/\/sms.ultoo.com\/PollCompletion.php/g;
if(url.search(pat)==0)
document.getElementsByTagName("img")[3].click();
var pat=/^http:\/\/sms.ultoo.com\/PollCompleted.php/g;
if(url.search(pat)==0)
{if(document.getElementsByClassName("success_full_msg")[0].innerHTML.match("No earnings will be credited for this submission"))
window.location.href=url.replace("PollCompleted","home");
else
{localStorage.setItem('c',"a");document.getElementsByName('PollUserName')[0].value="Pi";
document.getElementsByName('PollUserQuestion')[0].value="What is the value of Pi????"+Math.floor((Math.random()*100000)+1);
document.getElementById('OptionId1').value="22/7";
document.getElementById('OptionId2').value="333/106";
document.getElementById('OptionId3').value="103993/33102";
document.getElementById('OptionId4').value="Who cares ....";document.form1.submit();}}
var pat=/^http:\/\/sms.ultoo.com\/QuestionSaved.php/g;
if(url.search(pat)==0)
window.location.href=url.replace("QuestionSaved","home");
var pat=/^http:\/\/sms.ultoo.com\/home.php/g;
if(url.search(pat)==0)
{if(document.getElementsByTagName('font')[0]!="undefined")
{for(d=6;document.getElementsByTagName("input")[d].getAttribute("value")=="10 digit mobile number";d++)
{if(document.getElementsByTagName("input")[d].style.display=='')
document.getElementsByTagName("input")[d].value="9876543210";}
for(e=0;e<$(".txtfieldcontent").length;e++)
{if(document.getElementsByTagName("textarea")[e].style.display=='')
document.getElementsByTagName("textarea")[e].value=msg.split(";")[(Math.floor((Math.random()*100000000)+1))%70]+"   the no is 99"+(Math.floor((Math.random()*100000000)+1));}
document.getElementById("sendNowbtnDiv").click();}
else
{if(localStorage.getItem('c')=="a")
window.location.href=url.replace("home","AnswereIt");
else if(localStorage.getItem('c')=="l")
window.location.href=url.replace("home","logout");}}
var pat=/^http:\/\/sms.ultoo.com\/AnswereItGraph.php/g;
if(url.search(pat)==0)
document.getElementsByTagName("img")[3].click();
var pat=/^http:\/\/sms.ultoo.com\/AICompletion.php/g;
if(url.search(pat)==0)
{localStorage.setItem('c',"l");window.location.href=url.replace("AICompletion","home");}
var pat=/^http:\/\/sms.ultoo.com\/AnswereIt.php/g;
if(url.search(pat)==0)
{for(x=3;x<7;x++)
{y=document.getElementsByTagName("img")[x].getAttribute("src").length;
var src=document.getElementsByTagName("img")[x].getAttribute("src").slice(y-7,y-4);
for(no=0;no<44;no++)
if(ans.split(";")[no].search(src)==0)
{for(f=0;document.getElementsByTagName("input")[f].getAttribute("value")=="Type your answer here";f++)
{if(document.getElementsByTagName("input")[f].getAttribute("style")=="border:0 none;")
document.getElementsByTagName("input")[f].value=ans.split(";")[no];}
document.forms[0].submit();}}}
var pat=/^http:\/\/sms.ultoo.com\/msgSent.php/g;
if(url.search(pat)==0)
{if(document.getElementsByTagName('span')[1].innerHTML.search("Dear")!=0)
window.location.href=url.replace("msgSent","home");
else
{if(localStorage.getItem('c')=="a")
window.location.href="http://sms.ultoo.com/AnswereIt.php";
else if(localStorage.getItem('c')=="l")
window.location.href="http://sms.ultoo.com/logout.php?LogOut=1";}}
