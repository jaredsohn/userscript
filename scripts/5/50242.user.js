// ==UserScript==
// @name           ASCIImator Special Events
// @namespace      http://userscripts.org/users/92331
// @description    Special days get a background or a message on the front page of ASCIImator. The special days currently includerd are: Christmas, Halloween, Bonfire Night, New Year, April Fools, Pancake Day, Gecko's birthday, Origamiguy's birthday, and Easter.
// @include        http://asciimator.net/
// ==/UserScript==
var mydate=new Date()
var day=mydate.getDay()
var month=mydate.getMonth()+1
if (month<10)
month="0"+month
var daym=mydate.getDate()
if (daym<10)
daym="0"+daym
var date = daym+"."+month
if(date == "25.12"){
document.body.background="http://img136.imageshack.us/img136/6522/convertpro1.gif";
}
if(date == "31.10"){
document.body.background="http://img529.imageshack.us/img529/6522/convertpro1.gif";
}
if(date == "05.11"){
document.body.background="http://img529.imageshack.us/img529/5849/convertpro1b.gif";
}
if(date == "01.01"){
document.body.background="http://img529.imageshack.us/img529/5849/convertpro1b.gif";
}
if(date == "01.04"){
alert("We are sorry to announce that ASCIImator will be closed for the next three months due to server issues. Please make the most of the next few days on the site.")
alert("APRIL FOOLS! (Lol, I had you scared there didn't I?)")
}
if(date == "05.02"){
document.body.background="http://img297.imageshack.us/img297/6522/convertpro1.gif";
}
if(date == "18.10"){
alert("It's Gecko's birthday today. \n   ___'< \n(G) ' '")
}
if(date == "23.03"){
document.body.background="http://img139.imageshack.us/img139/6522/convertpro1.gif"
}
if(date == "28.03"){
input_box=confirm("It's OrigamiguyIsEpic's Birthday! \nView his ASCIImations?");
if (input_box==true){
window.location = "http://asciimator.net/?module=profile&user_id=484";}
}