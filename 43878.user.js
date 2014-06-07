// ==UserScript==
// @name		Webcomic Advancer
// @description		Script to advance webcomics.  Left arrow to go back, Right arrow to go forwards.  the ` key turns it on and off.
// @include		*
// ==/UserScript==

document.addEventListener("keypress", function keyFunc(event) {
 re = null;
        kkd = (event.which) ? event.which : event.keyCode;
 on = GM_getValue("on", true);
 switch(kkd) {
  case 37:
   re = re != null ? re : /<a.*href="(.*?)".*(back|prev(ious)?).*<\/a>/i;
  case 39:
   re = re != null ? re : /<a.*href="(.*?)".*(next).*<\/a>/i;
   if(on) {
    arr = re.exec(document.body.innerHTML);
    window.location.href = arr[1];
   }
   break;
  case 96:
   on = !on;
   GM_setValue("on", on);
   var box=document.getElementById('zebAdvEle');
   box.style.backgroundColor=on?'#229922':'#992222';
   box.style.display=on?'':'none';
   break;
 }
}, true);

var box = document.createElement('div');
var on = GM_getValue('on');
box.id = "zebAdvEle";
box.style.position='fixed';
box.style.width='10px';
box.style.height='10px';
box.style.backgroundColor=on?'#229922':'#992222';
box.style.display=on?'':'none';
box.style.top='0px';
box.style.left='0px';
document.body.appendChild(box);

