// ==UserScript==
// @name           Over11k
// @namespace      Over11k
// @include        *animecubed.com/billy/bvs/partyhouse.html
// @include        http://*bvsmysql.freehostingcloud.com/get.php
// ==/UserScript==


var a = document.getElementById('time');
var b = document.getElementById('oldtime');
if(a != null) {
GM_setValue("newtime", a.textContent);
GM_setValue("oldtime", b.textContent);
}

var newtime = GM_getValue("newtime");
var oldtime = GM_getValue("oldtime");
var winn = GM_getValue("winner");
var over = document.getElementsByTagName('b');
var winner;
var number;
 

if(over[5].textContent == "Over 11,000" || over[6].textContent == "Over 11,000" || over[3].textContent == "Over 11,000") {
DoOver()                    }


function DoOver() {

var txt = document.documentElement.innerHTML; // get everything between body tags

var ntxt = txt.match("Most Recent Winner: (.*)"); // finds matching text returns array

var wtxt = ntxt.toString(); // converts array to string

var nwtxt = wtxt.replace(/<.*?>/g, ''); // removes html tags
// line 100
var wins = nwtxt.substring(20); // removes everything upto postion 20

var len = (wins.length - 1) / 2; // calculates the length, removes 1 and divides by 2

var win = wins.substr(0,len); // takes the chars from start to len see above


if(winn != win) {


GM_setValue("newtime", oldtime);
GM_setValue("winner", win);

var send = "Name=" + win;

GM_xmlhttpRequest({
    method: 'POST',
    url: 'http://bvsmysql.freehostingcloud.com/update.php',
    data: send,
    headers: {'Content-type' : 'application/x-www-form-urlencoded'},
                  });

var chg = document.getElementsByTagName('b');
var i = chg.length;
var nchg;
var text;

while (i--)
{
    nchg = chg[i];
    text = nchg.innerText || nchg.textContent;
    if (text === win)
    {
      chg[i].textContent = text + " Updated!";
    }
}

        setTimeout('window.open("http://bvsmysql.freehostingcloud.com/get.php")', 3000)
                                }


else if(oldtime == newtime) {

       while (i--)
{
    nchg = chg[i];
    text = nchg.innerText || nchg.textContent;
    if (text === win)
    {
      chg[i].textContent = text + " Check Site!";
    }
}
        setTimeout('window.open("http://bvsmysql.freehostingcloud.com/get.php")', 2000)
                                                 }

else {

var chg = document.getElementsByTagName('b');
var i = chg.length;
var nchg;
var text;

while (i--)
{
    nchg = chg[i];
    text = nchg.innerText || nchg.textContent;
    if (text === win)
    {
      chg[i].textContent = text + " Won around " + newtime + " Bvs time";
    }
}
     }

                      }