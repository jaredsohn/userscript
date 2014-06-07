// ==UserScript==// @encoding utf-8
// @name csgo bumper
// @version 1.0
// @namespace 
// @author OGREgyrocopter
// @description Lounge auto-bump
// @include http://csgolounge.com/mytrades
// @run-at document-end
// ==/UserScript==
var numMinutes = 2;
window.setTimeout("document.location.reload();", numMinutes*60*1000);
(function(){
window.onload = function() {
var elements = document.getElementsByClassName('buttonright'), i=0,j=0,n=0,m=0,k=0,t=30000,r=50000;
// t = время в милисекундах между бампами, установлено в 30 сек. Можно сделать чтобы все трейды взлетали разом, но если там покупка+продажа, то будет палевно.
// r = время, через которое обновляется страница, 300000=5 минут.
// Скрипт будет циклически проверять каждые r милисекунд с загрузки страницы, завершена ли очередь бампов, и если да, перезагружать страницу.


j = elements.length;
k = t/1000;
function f5(){
if(i<j){setTimeout(f5,r); m=m+1;}
else {
if (m<1){
m=1;
setTimeout(f5,r);
}
else document.location.reload(true);
};
}


function f(){
var kk=0;
k=k-1;
if(k > 0)
{
setTimeout(f,"1000");
for (n=i;n<j;n++) {kk=k+(n-i)*t/1000; elements[n].innerHTML='Autobump: '+kk;};
}
else {
k=t/1000;
elements.click();
i=i+1;
if (i<j) setTimeout(f, "1000")
};
}
if(j>0)f();
f5(); 


}
})();