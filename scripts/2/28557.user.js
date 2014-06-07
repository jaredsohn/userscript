// ==UserScript==
// @name           Test
// @namespace      xxxxx
// @description    Exxx
// @include        htxxxx
// @include        hxx
// @version        1.0
// ==/UserScript==

var ms;
var basetitle;

function ClockItYo()	//ms, basetitle)
{
    if(ms>0)
    {
        document.title = basetitle  + " | Refreshing in " + ((ms/1000)) + "s";
		ms = ms-1000;
        window.setTimeout(ClockItYo, 1000);
    } else {
        window.location.reload('true');
    }
}
locate = location.href.split('=')[0]
if (locate == checkurl.split(' ')[0] || locate == checkurl.split(' ')[1] || locate == checkurl.split(' ')[2])
else
		location.href = locate + '=' + (id + 1)
//  update in .x minutes (30000-90000) and pass off to our title counter
var randomnumber=(Math.floor(Math.random()*60)*1000)+30000;
basetitle = document.title;
ms = randomnumber;
window.setTimeout(ClockItYo, 1000);

