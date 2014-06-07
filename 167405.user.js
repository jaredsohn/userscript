// ==UserScript==
// @name           saleoff
// @description    Add special button to game chernobyl-soul.com to turn off saling all items
// @version	   1
// @versionnumber  1
// @author         shift2501
// ==/UserScript==

object = window.addEventListener || window.attachEvent ? window : document.addEventListener ? document : null;
type = 'load';
object.addEventListener(type,function(){
        if(location.href.indexOf('http://chernobyl-soul.com/php/inv.php')>-1){
            s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = 'http://s11.ucoz.net/src/jquery-1.7.2.js';
            document.body.appendChild(s);
            s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = 'http://darkzona.net/clocks/no_sale.js';
            document.body.appendChild(s);
            document.getElementsByClassName('div-scales')[0].innerHTML = document.getElementsByClassName('div-scales')[0].innerHTML + "<a href='javascript://' onclick='saleoff()' title='Снять с продажи все вещи'><img border='0' src='http://darkzona.net/clocks/saleoff.png' /></a>";
            var hint = document.createElement('DIV');
hint.setAttribute('id','hint');
document.getElementsByTagName('body')[0].appendChild(hint);
hint.style.visibility = 'hidden';
var hintmarker = ['a','img','button','div','input'];
var textmarker = ['title','alt','title','title'];
var lenmarker = hintmarker.length;
for(var i=0; i<lenmarker; i++) {
atr = document.getElementsByTagName(hintmarker[i]);
for(var j=0; j<atr.length; j++)
if(viewhint=atr[j].getAttribute(textmarker[i])){
  atr[j].removeAttribute(textmarker[i]);
  HINT.show(atr[j],viewhint);
}
}
            }
},false);