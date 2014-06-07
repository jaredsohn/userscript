// ==UserScript==
// @name         Blackit!	
// @version      v1.0
// @description  Created by Lagi :)
// @author       Lagi
// @include	http://*.the-west.*/game.php*
// @require	http://code.jquery.com/jquery-1.7.1.min.js
// ==/UserScript==

var blackit_button_off = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wCDwgUJnk7NtIAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAACKElEQVQ4y62SvUsjcRCGn3U35oP1t9wKrgSLS6GIQiBHAlrINWkUwU4CcsR/wvwLghZqaXGlthYekgQtrrwmrYjBOqYI6G7U7NdcIdnr9R6YZoZ5eZl3tHJhTv78avGyuspnyF5eUv5Rg+j2VlylJLq/l48SDwbiKiVhuy24Skl0dyefJgzFVUoMgImFBQCGwyG9Xg8RwXEcpqamGI1G9Pt9RAQRwTAMLMvC8zxGoxEAcRwzVygAYIxv8Pj4yMnJCTc3N8RxzNraGo1Gg36/z97eHrquk06nmZ2dZWtri4uLCx4eHjBNk+FwyM/zc76MBQPg7OyM/f196vU6k5OTHB0dYds2lUqFdrtNuVxmfX0d27bRNI3r62tSqRSbm5vouk4mk/nn8CUIaDabLC8vc3BwgGmadDodms0mxWIRwzDwPI9ut8v8/DyLi4ukUileX1/pdrsUi0VyuRwyFtQAXdcJwzCpKIrQdR0AESGfz7OysoLjOLy9vRHHMTMzM1QqFQqFAvrEBCGAq5QEInJ6eiqAVKtV2djYEECOj4+l1WoJII1GIwm00+mI4ziyu7srYRgm/SRlA9je3sb3fa6urgiCgMPDQ+r1Or1ej52dHUqlUvLE09PT1Go1lpaW8H2fbDabzDRXKTGfngDwfZ/n52dEBKUU6XSaMAxxXZdMJpMsRlGE53kYhkEul0MD0DQ8y3oXBBiLfhTPst4dfvual98Dj//Bd9vkL7rbhS04ZkFiAAAAAElFTkSuQmCC";

var blackit_button_on = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wCDwgjHVg3f8IAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAABlUlEQVQ4y62SsYoaARCGv929gGgkzVYhQmQbUUEMFhHkIgSFgKWN1TW+gQ/gC4j4EGJlHwjEwkKChhSKlZVaaJQrkiJ7ouufQm/JJZcm5uummI+Zf8bIRF/ozee3vN93uYR3T8p8TH+A2u2N4uuQarc3+lcm37/4Di6V+RwOiq9DJ+GvLBYL5fN5OY6jdDqt4XAoSdrtdnIcR41GQ5LkeZ5isZharZbf+4dws9nIsiwBSiaTMk1TgPr9vlzXFSBAo9FIh8NBgGq12gOhCbA/B9tut/E8j06nw2QyYTqdAtDr9ZDkH+D6+hrXdR89jgnwY39SLpdLAGzbBiAYDALQ7XY5Ho++DKBarT4qvAIwzkU0GgVgPp8DsFqtAKhUKpimCUCpVCKTydBsNgEwjFP33b0xvg5pf85gu90qHA7LMAwFAgE/z8Fg4GdYr9el0/5/z/DqLLdtm9lsRrlcJhKJkMvlGI/HZLNZLMuiWCySSCQAkEShUCCVSj3c+fe3uQR/wsTXp1zKvcN49fK57j59438QeP2Mn32AxQCwMUrlAAAAAElFTkSuQmCC";
var on = 0;
var msgnodes = "";
function blackened () {
msgnodes.removeEventListener ('DOMNodeInserted', blackened, false);
var chats = document.getElementsByClassName('chat_text');

for (var i=0;i<chats.length;i++) {
var chatselect = chats[i].innerHTML;
if (chatselect.search("div")>=0)
{
do {
chatselect = chatselect.replace(/#(?!000)\S{3}/,"#000");
}
while (chatselect.search(/#(?!000)\S{3}/)>0);
chats[i].innerHTML = chatselect;

}

}
msgnodes.addEventListener ('DOMNodeInserted', blackened, false);
}
var blackitbutton = document.createElement('div');
    blackitbutton.setAttribute('id', 'on_off');
    blackitbutton.setAttribute('title', 'Blackit!');
    blackitbutton.setAttribute('style', 'position:absolute;z-index:1002000;width:0px;cursor:pointer;text-align:center;color:#9f9f9f;font-size:12px;padding:5px 5px 0px 2px;right:200px;');
    blackitbutton.innerHTML = '<img id="blackit_button_off" src=' +blackit_button_off+ ' />';
    blackitbutton.onclick = function(){
if (on==0)
{
msgnodes = document.getElementById('chatwindow_msgs');
msgnodes.addEventListener ('DOMNodeInserted', blackened, false);
blackitbutton.innerHTML = '<img id="blackit_button_off" src=' +blackit_button_on+ ' />';
on=1;
}
else
{
msgnodes.removeEventListener ('DOMNodeInserted', blackened, false);
blackitbutton.innerHTML = '<img id="blackit_button_off" src=' +blackit_button_off+ ' />';
on=0;
}
};

document.body.appendChild(blackitbutton);
