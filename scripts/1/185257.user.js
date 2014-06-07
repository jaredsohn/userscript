// ==UserScript==
// @author          bodinho
// @name            Karácsonyi visszaszámlálás
// @version         1.0
// @description     Javascript visszaszámlálás Karácsonyig a logórészt átalakítva
// @include         http://teracod.com/main
// @version         1.1
// @grant           none
// ==/UserScript==






karacsony=document.createElement('h2');
karacsony.id="kara";
document.body.insertBefore(karacsony, document.getElementById("content"));






countIt();

function countIt(){
    year = 2013;
    month = 12;
    day = 25;
    hours = 00;
    minutes = 00;
    seconds = 00;
    
    setTimeout(function(){
    endDate = new Date(year, month, day, hours, minutes, seconds, 00);
    thisDate  = new Date();
    thisDate  = new Date(thisDate.getFullYear(), thisDate.getMonth() + 1, thisDate.getDay(), thisDate.getHours(), thisDate.getMinutes(), thisDate.getSeconds(), 00, 00);
    
    var daysLeft = parseInt((endDate-thisDate)/86400000);
    var hoursLeft = parseInt((endDate-thisDate)/3600000); 
    var minutsLeft = parseInt((endDate-thisDate)/60000);
    var secondsLeft = parseInt((endDate-thisDate)/1000);
    
    seconds = minutsLeft*60;
    seconds = secondsLeft-seconds;
    
    minutes = hoursLeft*60;
    minutes = minutsLeft-minutes;
    
    hours = daysLeft*24;
    hours = (hoursLeft-hours) < 0 ? 0 : hoursLeft-hours;
    
    days = daysLeft;
        
    startCount(days, hours, minutes,seconds);
    }, 1000);
}

function startCount(days, hours, minutes, seconds){
    document.getElementById("kara").innerHTML="<center><br><h1>Karácsonyi visszaszámlálás:</h1><br>"+days+" nap, "+hours+" óra, "+minutes+" perc, "+seconds+" másodperc</center>";
    countIt();
}






function addGlobalStyle(css){

    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
	
}


addGlobalStyle('#header .row-2 {background: none !important;}')
addGlobalStyle('#header .row-2 .logo {padding: 0 0 0 380px;}')
addGlobalStyle('#kara{height:200px;background-image: url(http://kepfeltoltes.hu/131202/621980913hatter_www.kepfeltoltes.hu_.png);background-repeat:no-repeat;background-position: top center;text-shadow:0px 0px 10px #000;}')






