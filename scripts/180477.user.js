// ==UserScript==
// @name       Homestuck reread
// @version    0.5.1
// @description  show you where you should be
// @downloadURL http://userscripts.org/scripts/source/180477.user.js
// @updateURL http://userscripts.org/scripts/source/180477.user.js
// @include      http://mspaintadventures.com/?s=6*
// @copyright  2013, Lord Laneus
// ==/UserScript==
var startingDay = new Date(2013, 9, 21, 0,0,0,0);
var totalPages = 6851;
var totalDays = 174.0;


function getCurrentPage() {
    
    var url = window.location.href;
    var index = url.indexOf("6&p=");
    var number;
    if (url == "http://mspaintadventures.com/?s=6")
    {
        return(1901);
    }
    if (index ==-1)
    {
        number = "000000";
    }    else
    {
        number = url.substr(index+4,6);
        
    }
    return(parseInt(number,10));
}
function getDay(start)
{
    var curTime = new Date().getTime();
    var startTime = start.getTime();
    var seconds = curTime-startTime;
    return Math.floor(seconds/86400000)+1;
}

var curDay = getDay(startingDay);
var goalPage = -0.2468* curDay *curDay + 82.227*curDay + 1907.4;

var currentPage = getCurrentPage();
var pagesLeft  = Math.floor(goalPage-currentPage);

var msg;
if (currentPage == 0)msg = "<h2 style= \"font-weight: bold; font-family: courier, monospace; color: #000000; size: \">You have ???? pages left to read today</h2>" ;
else if (pagesLeft>1) msg = "<h2 style= \"font-weight: bold; font-family: courier, monospace; color: #000000; size: \">You have "+pagesLeft + " pages left to read today</h2>" ;
else if (pagesLeft==1) msg = "<h2 style= \"font-weight: bold; font-family: courier, monospace; color: #000000; size: \">This is the last page left to read today</h2>" ;
else if (pagesLeft==0)  msg = "<h1 style= \"font-weight: bold; font-family: courier, monospace; color: #00ff00; size: \">Your Done!</h1>" ;
else if (pagesLeft==-1)  msg = "<h2 style= \"font-weight: bold; font-family: courier, monospace; color: #000000; size: \">You are 1 page ahead today</h2>" ;
else  msg = "<h2 style= \"font-weight: bold; font-family: courier, monospace; color: #000000; size: \">You are "+ -pagesLeft +" pages ahead</h2>" ;






var menuobj = document.createElement('ul');
menuobj.style.background = "#c6c6c6";
menuobj.style.textAlign="center";


menuobj.innerHTML =msg;


var body = document.getElementsByTagName('body')[0];
body.insertBefore(menuobj,body.firstChild);

