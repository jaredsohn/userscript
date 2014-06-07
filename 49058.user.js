// ==UserScript==
// @name           Facebook - Mouse Hunt Auto-Hunt
// @namespace      Facebook - Mouse Hunt Auto-Hunt
// @description    Facebook - Mouse Hunt Auto-Hunt
// @include        http://apps.facebook.com/mousehunt/*
// @include        http://apps.new.facebook.com/mousehunt/*
// ==/UserScript==

//Attempt to hunt every 15 minutes plus some delay, regardless what page in Mouse Hunt you are on except Claim a King's Reward!'s page
//this script will automate your hunt and it's not allowed by MouseHunt. 
//i already make some enhancement e.g: you wont sound the horn precisely every 15 minutes and you wont sound the horn if u are in 
//Claim a King's Reward!'s page but still it doesn't give u any warranty that MouseHunt wont ban u :p

if (document.title != "MouseHunt on Facebook | Claim a King's Reward!")
{
//DHTMLSound("http://furoma.com/mousehunt_horn_timer_sound1.wav");
var timeoutxxx = Math.floor(Math.random()*30+30) * 1000; //give delay for 30.000 - 60.000 miliseconds (in other words, 0,5 - 1 minutes)

setTimeout(function() { document.location = 'http://apps.facebook.com/mousehunt/soundthehorn.php'; } , 900000 + timeoutxxx); //sound the horn every 15,5 minutes - 16 minutes
}

else if (document.title == "MouseHunt on Facebook | Claim a King's Reward!")
{
setTimeout(function() { document.location = 'http://apps.facebook.com/mousehunt/soundthehorn.php'; } , 5700000 + timeoutyyy); // sound the horn after 95 minutes

var timeoutxxx = Math.floor(Math.random()*30+30) * 1000; //give delay for 30.000 - 60.000 miliseconds (in other words, 0,5 - 1 minutes)

setTimeout(function() { document.location = 'http://apps.facebook.com/mousehunt/soundthehorn.php'; } , 900000 + timeoutxxx); //sound the horn every 15,5 minutes - 16 minutes
}