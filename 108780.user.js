// ==UserScript==
// @name           bingo
// @namespace      bingo
// @include        http://*animecubed.com/billy/bvs/bingo*
// ==/UserScript==

var title = document.getElementsByTagName('b');
var ntitle = title[2].textContent;
var btitle = ntitle.substr(0,10);
var nttitle = title[3].textContent;
var bttitle = nttitle.substr(0,10);

if(btitle == "Bingo Book") { 

display()                     
                           }

else if(bttitle == "Bingo Book") { 

display()
                                  }

if(btitle == "Track down") { 

setnames();                        
                           }

else if(bttitle == "Track down") { 

setnames();
                                  }


function setnames() {

var txt = document.documentElement.innerHTML;

var ntxt = txt.match("Track down (.*)");

var btxt = ntxt.toString();

var bing = btxt.replace(/<.*?>/g, '');

var bingo = bing.substring(11);

var len = (bingo.length - 1) / 2;

var bingod = bingo.substr(0,len-1);

var ci = GM_getValue("namecount")

GM_setValue(ci, bingod)

GM_setValue("namecount", ci +1)

}


function display() {

var j = GM_getValue("namecount")

while (j--)
{

var win = GM_getValue(j);
var chg = document.getElementsByTagName('a');
var t = chg.length;
var nchg;
var text;

while (t--)
{

    nchg = chg[t];
    text = nchg.innerText || nchg.textContent;
    if (text == win)
    {
      chg[t].textContent = "Bingo'd" ;
    }
}

}
                   }


function resetnames(event) 
{

if (event.keyCode==67) // c
           {
           GM_setValue("namecount", 0);
           alert(GM_getValue("namecount"));
           }

if (event.keyCode==66)
           {
if(document.forms.namedItem("lookinto")) {
document.forms.namedItem("lookinto").wrappedJSObject.submit();
                                         }
if(document.forms.namedItem("bingofight")) {
document.forms.namedItem("bingofight").wrappedJSObject.submit();
                                           }
if(document.forms.namedItem("attack")) {
document.forms.namedItem("attack").wrappedJSObject.submit();
                                           }
if(document.forms.namedItem("bingogo")) {
document.forms.namedItem("bingogo").wrappedJSObject.submit();
                                           }
           }

}


window.addEventListener("keyup", resetnames, false);